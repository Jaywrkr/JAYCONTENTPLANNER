import sys; sys.path.insert(0,'/home/claude/hoy30'); from fondo_lib import *
import subprocess, numpy as np
O='/home/claude/n30/'
def chrome(d,bg,W,H,label,mark='sq'):
    sm=F(FR,20); d.text((90,90),'@jaywrkr',font=sm,fill=col(bg,.6),anchor='lm'); d.text((990,90),label,font=sm,fill=col(bg,.6),anchor='rm')
    d.rectangle([90,1250,104,1264],fill=col(bg,1)); d.text((990,1260),'simple.',font=sm,fill=col(bg,.5),anchor='rm')
def post(name,bg,lines,draw):
    W,H=1080,1350; im=Image.new('RGB',(W,H),(bg,)*3); d=ImageDraw.Draw(im); chrome(d,bg,W,H,'SIN FILTRO  Nº 08')
    gh=draw(d,bg)  # returns bottom y of graphic
    f=F(FL,34)
    for i,s in enumerate(lines): d.text((W/2,gh+80+i*54),s,font=f,fill=col(bg,1),anchor='mm')
    grain(im,3).save(O+name+'.jpg',quality=93); Image.open(O+name+'.jpg').resize((216,270),Image.LANCZOS).save(O+'th-'+name+'.jpg',quality=80)
def gridA(d,bg):
    c,gp,cols=48,18,7; x0=540-(cols*(c+gp)-gp)/2; y0=435
    for k in range(31):
        x=x0+(k%cols)*(c+gp); y=y0+(k//cols)*(c+gp); d.rectangle([x,y,x+c,y+c],outline=col(bg,.45),width=2)
    return y0+5*(c+gp)
def boxB(d,bg):
    s=110; d.rectangle([540-s/2,527,540+s/2,527+s],outline=col(bg,1),width=3); return 527+s+40
post('c1130-a',0,['Quedan 31 días del año.','Suficientes para terminar una cosa.'],gridA)
post('c1130-b',244,['No necesitas un año nuevo.','Necesitas un día distinto.'],boxB)
