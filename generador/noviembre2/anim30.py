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

items=['aprender inglés','entrenar','ahorrar','leer más','empezar el proyecto']
def d30(d,t,bg):
    f=F(FL,40); y0=560
    strike=ease((t-4.6)/0.4); hoy=ease((t-5.1)/0.4)
    if t<5.0:
        d.text((W/2,y0),'Enero',font=f,fill=col(bg,ease(t/0.4)*(1-.6*strike)),anchor='mm')
        if strike>0:
            w=d.textlength('Enero',font=f); d.line([(W/2-w/2-4,y0+2),(W/2-w/2-4+(w+8)*strike,y0+2)],fill=col(bg,.8),width=2)
    else:
        d.text((W/2,y0),'Hoy.',font=f,fill=col(bg,hoy),anchor='mm')
    bw,bh=300,40; x=W/2-bw/2
    for k,s in enumerate(items):
        on=ease((t-0.7-k*0.55)/0.25)*(1-ease((t-4.8)/0.3))
        if on<=0: continue
        y=y0+70+k*58; d.rectangle([x,y,x+bw,y+bh],outline=col(bg,.55*on),width=2); d.text((x+14,y+bh/2),s,font=F(FR,22),fill=col(bg,.8*on),anchor='lm')
    if t>5.2:
        q=ease((t-5.4)/0.3); s=70; d.rectangle([W/2-s/2,y0+80,W/2+s/2,y0+80+s],outline=col(bg,1),width=2)
        fill=ease((t-6.0)/0.6); d.rectangle([W/2-s/2,y0+80+s*(1-fill),W/2+s/2,y0+80+s],fill=col(bg,1))
        txt='Enero llega solo. Hoy no.'; n=int(max(0,min(len(txt),(t-7.0)*18)))
        d.text((W/2,y0+260),txt[:n],font=F(FR,30),fill=col(bg,1),anchor='mm')
LABEL='TACHADO · Nº 09'
render('c1130',10,0,d30,[0.7+k*0.55 for k in range(5)]+[7.0+k/18 for k in range(0,26,2)],[4.6,6.0])
