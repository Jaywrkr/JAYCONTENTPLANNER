import sys; sys.path.insert(0,'/home/claude/hoy30'); from fondo_lib import *
import subprocess, numpy as np, math
W,H,FPS=1080,1920,30
def ease(x): x=max(0,min(1,x)); return 1-(1-x)**3
LABEL=''
def render(name,dur,bg,draw,ticks,pops):
    out='/home/claude/n30/'+name
    p=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-c:v','libx264','-crf','20','-pix_fmt','yuv420p',out+'-v.mp4'],stdin=subprocess.PIPE)
    G=np.random.default_rng(5).normal(0,3,(H,W,1))
    for i in range(int(dur*FPS)):
        t=i/FPS; im=Image.new('RGB',(W,H),(bg,)*3); d=ImageDraw.Draw(im)
        d.text((90,230),'@JAYWRKR',font=F(FR,24),fill=col(bg,.55),anchor='lm'); d.text((W-90,230),LABEL,font=F(FR,24),fill=col(bg,.55),anchor='rm'); d.text((W/2,1400),'simple.',font=F(FR,20),fill=col(bg,.4),anchor='mm')
        draw(d,t,bg); a=np.clip(np.array(im).astype(np.int16)+G,0,255).astype(np.uint8); p.stdin.write(a.tobytes())
    p.stdin.close(); p.wait()
    fc=[]; ins=[]
    for k,tt in enumerate(ticks): fc.append(f"sine=f=1800:d=0.04,volume=0.12,afade=t=out:st=0.005:d=0.035,adelay={int(tt*1000)}:all=1[t{k}]"); ins.append(f'[t{k}]')
    for k,tt in enumerate(pops): fc.append(f"sine=f=520:d=0.18,volume=0.35,afade=t=out:st=0.02:d=0.16,adelay={int(tt*1000)}:all=1[p{k}]"); ins.append(f'[p{k}]')
    fc.append(f"aevalsrc='0.04*sin(2*PI*110*t)+0.025*sin(2*PI*164.8*t)':s=48000:d={dur},afade=t=in:d=1,afade=t=out:st={dur-1.5}:d=1.5[pad]"); ins.append('[pad]')
    fc.append(''.join(ins)+f"amix=inputs={len(ins)}:normalize=0:duration=longest,atrim=0:{dur},alimiter=limit=0.9[a]")
    subprocess.run(['ffmpeg','-v','error','-y','-i',out+'-v.mp4','-filter_complex',';'.join(fc),'-map','0:v','-map','[a]','-c:v','copy','-c:a','aac','-b:a','160k','-movflags','+faststart',out+'-reel.mp4'],check=True)
# ---- 30 nov
def d30(d,t,bg):
    fh=F(FL,34); d.text((W/2,560),'Mañana empieza diciembre.',font=fh,fill=col(bg,ease(t/0.5)),anchor='mm')
    c,gp,cols=52,14,7; x0=W/2-(cols*(c+gp)-gp)/2; y0=650
    for k in range(31):
        on=ease((t-0.6-k*0.12)/0.15)
        if on<=0: continue
        x=x0+(k%cols)*(c+gp); y=y0+(k//cols)*(c+gp)
        if k==0 and t>6.5: d.rectangle([x,y,x+c,y+c],fill=col(bg,1))
        else: d.rectangle([x,y,x+c,y+c],outline=col(bg,.6*on),width=2)
    f=F(FL,34); d.text((W/2,1050),'Quedan 31 días.',font=f,fill=col(bg,ease((t-4.8)/0.4)),anchor='mm')
    d.text((W/2,1100),'Termina una cosa.',font=f,fill=col(bg,ease((t-6.7)/0.4)),anchor='mm')
LABEL='SIN FILTRO · Nº 08'
render('c1130',10,0,d30,[0.6+k*0.12 for k in range(31)],[6.5])
# ---- 10 nov
A,Bx='SOLO UN CAPÍTULO MÁS.','Y YA SON LAS 2:00 AM.'
def d10(d,t,bg):
    d.text((W/2,520),'Busca la línea distinta.',font=F(FL,34),fill=col(bg,ease(t/0.5)),anchor='mm')
    f=F(FR,28); rows=12; y0=610; lh=46
    for r in range(rows):
        on=ease((t-0.6-r*0.22)/0.2)
        if on<=0: continue
        hid=(r==8); s=Bx if hid else A
        a=on*(1 if (hid or t<6.3) else max(.18,1-ease((t-6.3)/0.4)*.82))
        d.text((W/2,y0+r*lh),s,font=f,fill=col(bg,a),anchor='mm')
    d.text((W/2,y0+rows*lh+60),'¿La encontraste?',font=F(FL,34),fill=col(bg,ease((t-7)/0.4)),anchor='mm')
LABEL='100 VECES · Nº 06'
render('c1110',10,244,d10,[0.6+r*0.22 for r in range(12)],[6.3])
