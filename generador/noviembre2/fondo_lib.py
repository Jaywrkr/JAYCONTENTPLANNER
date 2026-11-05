from PIL import Image, ImageDraw, ImageFont
import numpy as np, sys
FL='/home/claude/fonts/GeistMono-Light.ttf'; FR='/home/claude/fonts/GeistMono-Regular.ttf'
O='/home/claude/hoy30/out/'
def F(p,s): return ImageFont.truetype(p,s)
def grain(im,amt=6):
    a=np.array(im).astype(np.int16); n=np.random.default_rng(7).normal(0,amt,a.shape[:2])[...,None]
    return Image.fromarray(np.clip(a+n,0,255).astype(np.uint8))
def col(bg,a):  # ink with alpha over bg
    fg=255 if bg==0 else 10; v=round(bg+(fg-bg)*a); return (v,v,v)
def ctext(d,txt,cx,cy,font,fill):
    b=d.textbbox((0,0),txt,font=font); w=b[2]-b[0]; h=font.getmetrics()
    d.text((cx-w/2-b[0],cy),txt,font=font,fill=fill,anchor=None)
def lines_center(d,ls,cx,cy,font,fill,lh):
    tot=lh*len(ls); y0=cy-tot/2
    for i,s in enumerate(ls):
        d.text((cx,y0+i*lh+lh/2),s,font=font,fill=fill,anchor='mm')
def wall(bg,ls,kind,name):
    W,H=1290,2796; im=Image.new('RGB',(W,H),(bg,)*3); d=ImageDraw.Draw(im)
    if kind=='lock':
        lines_center(d,ls,W/2,int(H*0.60),F(FL,84),col(bg,1),124)
        d.text((W/2,int(H*0.735)),'simple.',font=F(FR,26),fill=col(bg,.4),anchor='mm')
    else:
        if ls=='bar':
            w=W-360;x=180;y=int(H*0.5)
            d.rectangle([x,y,x+w,y+28],outline=col(bg,.35),width=2); d.rectangle([x+6,y+6,x+6+(w-12)*0.9,y+22],fill=col(bg,.85))
            d.text((x+w,y+70),'90 %',font=F(FR,26),fill=col(bg,.4),anchor='rm')
        else:
            s=22; d.rectangle([W/2-s-14,H/2-s/2,W/2-14,H/2+s/2],fill=col(bg,.5)); d.rectangle([W/2+14,H/2-s/2,W/2+14+s,H/2+s/2],outline=col(bg,.5),width=2)
    grain(im,5).save(O+name,quality=93)
def post(bg,title,lock,home,name,n='04',label='2 FONDOS PARA TU CELULAR'):
    W,H=1080,1350; im=Image.new('RGB',(W,H),(bg,)*3); d=ImageDraw.Draw(im)
    small=F(FR,20)
    d.text((90,90),'@jaywrkr',font=small,fill=col(bg,.6),anchor='lm'); d.text((990,90),f'FONDO  Nº {n}',font=small,fill=col(bg,.6),anchor='rm')
    d.line([(90,1260),(118,1260)],fill=col(bg,1),width=2); d.line([(104,1246),(104,1274)],fill=col(bg,1),width=2)
    d.text((990,1260),'simple.',font=small,fill=col(bg,.5),anchor='rm')
    pw=360; ph=round(pw*2796/1290); gap=36; top=300
    d.text((W/2,190),label,font=F(FR,19),fill=col(bg,.55),anchor='mm')
    fs=40
    while d.textlength(title,font=F(FL,fs))>840: fs-=1
    d.text((W/2,240),title,font=F(FL,fs),fill=col(bg,1),anchor='mm')
    xs=[W/2-gap/2-pw, W/2+gap/2]
    for x,f,lab in zip(xs,[lock,home],['BLOQUEO','INICIO']):
        ph_im=Image.open(O+f).resize((pw,ph),Image.LANCZOS); im.paste(ph_im,(int(x),top))
        d.rectangle([x-8,top-8,x+pw+7,top+ph+7],outline=col(bg,.9),width=2)
        d.text((x+pw/2,top+ph+40),lab,font=F(FR,19),fill=col(bg,.55),anchor='mm')
    d.text((W/2,top+ph+88),'captúralos en mis historias',font=F(FL,22),fill=col(bg,.75),anchor='mm')
    grain(im,5).save(O+name,quality=93)
