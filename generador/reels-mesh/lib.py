import numpy as np, subprocess
from PIL import Image, ImageDraw, ImageFont
W,H,FPS=1080,1920,30
FL='/home/claude/fonts/GeistMono-Light.ttf'; FR='/home/claude/fonts/GeistMono-Regular.ttf'
_fc={}
def F(p,s):
    k=(p,s)
    if k not in _fc: _fc[k]=ImageFont.truetype(p,s)
    return _fc[k]
def ease(x): x=max(0.,min(1.,x)); return 1-(1-x)**3
def eio(x): x=max(0.,min(1.,x)); return 4*x*x*x if x<.5 else 1-(-2*x+2)**3/2
def lerp(a,b,p): return a+(b-a)*p
gw,gh=216,384
yy,xx=np.mgrid[0:gh,0:gw].astype(np.float32)
def mesh(t,blobs,base=0.0):
    f=np.zeros((gh,gw),np.float32)
    for (cx,cy,ax,ay,fx,fy,ph,r,a) in blobs:
        x=(cx+ax*np.sin(t*fx+ph))*gw; y=(cy+ay*np.cos(t*fy+ph*1.3))*gh; rr=r*gw
        f+=a*np.exp(-((xx-x)**2+(yy-y)**2)/(2*rr*rr))
    f+=1.25*np.exp(-(((xx-.5*gw)/(.40*gw))**2+((yy-.47*gh)/(.21*gh))**2)/2)
    f=np.clip(base+f,0,1); f=f*f*(3-2*f)
    im=Image.fromarray((f*255).astype(np.uint8)).resize((W,H),Image.BILINEAR)
    return im
G=np.random.default_rng(7).normal(0,4,(H,W)).astype(np.int16)
def finish(im):
    a=np.array(im.convert('L')).astype(np.int16)+G
    a=np.clip(a,0,255).astype(np.uint8)
    return np.repeat(a[:,:,None],3,2)
def adapt(im,x,y,a):
    L=im.getpixel((int(x),int(y)))[0]
    return (int(L*(1-a)),)*3 if L>128 else (int(L+(255-L)*a),)*3
def chrome(im,d):
    d.text((90,230),'@JAYWRKR',font=F(FR,24),fill=adapt(im,110,230,.6),anchor='lm')
    d.text((W/2,1640),'simple.',font=F(FR,22),fill=adapt(im,W/2,1640,.55),anchor='mm')
def encode(name,dur,frame,ticks=(),pops=(),whoosh=()):
    out=f'/home/claude/rv/{name}'
    p=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-c:v','libx264','-crf','19','-preset','medium','-pix_fmt','yuv420p',out+'-v.mp4'],stdin=subprocess.PIPE)
    for i in range(int(dur*FPS)): p.stdin.write(frame(i/FPS).tobytes())
    p.stdin.close(); p.wait()
    fc=[];ins=[]
    for k,t in enumerate(ticks): fc.append(f"sine=f=1900:d=0.035,volume=0.10,afade=t=out:st=0.005:d=0.03,adelay={int(t*1000)}:all=1[t{k}]"); ins.append(f'[t{k}]')
    for k,t in enumerate(pops): fc.append(f"sine=f=440:d=0.25,volume=0.35,afade=t=out:st=0.02:d=0.23,adelay={int(t*1000)}:all=1[p{k}]"); ins.append(f'[p{k}]')
    for k,t in enumerate(whoosh): fc.append(f"anoisesrc=d=0.6:c=pink:a=0.5,highpass=f=500,lowpass=f=4000,afade=t=in:d=0.3,afade=t=out:st=0.3:d=0.3,volume=0.10,adelay={int(t*1000)}:all=1[w{k}]"); ins.append(f'[w{k}]')
    fc.append(f"aevalsrc='0.045*sin(2*PI*110*t)+0.03*sin(2*PI*164.8*t)+0.02*sin(2*PI*220*t)':s=48000:d={dur},tremolo=f=0.2:d=0.4,afade=t=in:d=1.2,afade=t=out:st={dur-1.5}:d=1.5[pad]"); ins.append('[pad]')
    fc.append(''.join(ins)+f"amix=inputs={len(ins)}:normalize=0:duration=longest,atrim=0:{dur},alimiter=limit=0.9[a]")
    subprocess.run(['ffmpeg','-v','error','-y','-i',out+'-v.mp4','-filter_complex',';'.join(fc),'-map','0:v','-map','[a]','-c:v','copy','-c:a','aac','-b:a','160k','-movflags','+faststart',out+'-reel.mp4'],check=True)
    return out+'-reel.mp4'

def blobset(seed):
    r=np.random.default_rng(seed)
    b=[(.5,.47,.06,.05,.45,.38,r.uniform(0,6),.34,1.0)]
    for k in range(4):
        b.append((r.uniform(.05,.95),r.uniform(.05,.95),r.uniform(.12,.3),r.uniform(.08,.2),r.uniform(.3,.6),r.uniform(.3,.6),r.uniform(0,6),r.uniform(.15,.24),r.uniform(.5,.8)))
    return b
class Ctx:
    def __init__(s,t,inv,blobs,pulse=0):
        m=mesh(t,blobs,base=pulse)
        if inv: m=Image.eval(m,lambda v:255-v)
        s.im=m.convert('RGB'); s.d=ImageDraw.Draw(s.im); s.inv=inv; s.t=t
    def c(s,a):  # ink con alpha a sobre centro
        a=max(0,min(1,a)); return (int(255-245*a),)*3 if not s.inv else (int(10+245*a),)*3
    def paper(s,a=1): return (255,)*3 if not s.inv else (10,)*3
    def text(s,txt,x,y,a=1,size=34,font=None,anchor='mm'):
        if a<=0.01: return
        s.d.text((x,y),txt,font=F(font or FL,size),fill=s.c(a),anchor=anchor)
    def tw(s,txt,size=34,font=None): return s.d.textlength(txt,font=F(font or FL,size))
    def rect(s,x0,y0,x1,y1,a=1,fill=False,w=2):
        if a<=0.01 or x1<=x0 or y1<=y0: return
        if fill: s.d.rectangle([x0,y0,x1,y1],fill=s.c(a))
        else: s.d.rectangle([x0,y0,x1,y1],outline=s.c(a),width=w)
    def strike(s,txt,x,y,p,a=1,size=34):
        w=s.tw(txt,size); s.text(txt,x,y,a*(1-.6*p),size)
        if p>0: s.d.line([(x-w/2-4,y+2),(x-w/2-4+(w+8)*p,y+2)],fill=s.c(.8*a),width=2)
    def typed(s,txt,x,y,t0,cps=20,a=1,size=34,font=None):
        n=int(max(0,min(len(txt),(s.t-t0)*cps)))
        if n: s.text(txt[:n],x,y,a,size,font)
    def out(s):
        chrome(s.im,s.d); return finish(s.im)
