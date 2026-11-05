from PIL import Image, ImageDraw, ImageFont
import numpy as np
FL='/home/claude/fonts/GeistMono-Light.ttf'; FR='/home/claude/fonts/GeistMono-Regular.ttf'
F=lambda p,s: ImageFont.truetype(p,s)
W,H=1280,720; O='/home/claude/mes/th/'
def grain(im):
    a=np.array(im).astype(np.int16); n=np.random.default_rng(3).normal(0,4,a.shape[:2])[...,None]; return Image.fromarray(np.clip(a+n,0,255).astype(np.uint8))
# A: split screen
im=Image.new('RGB',(W,H),(0,0,0)); d=ImageDraw.Draw(im); d.rectangle([W//2,0,W,H],fill=(244,244,244))
d.text((W*.25,H*.36),'CLAUDE',font=F(FR,40),fill=(150,150,150),anchor='mm'); d.text((W*.75,H*.36),'CHATGPT',font=F(FR,40),fill=(110,110,110),anchor='mm')
d.text((W*.25,H*.6),'acierto',font=F(FL,78),fill=(255,255,255),anchor='mm')
d.text((W*.75,H*.6),'falló',font=F(FL,78),fill=(10,10,10),anchor='mm')
grain(im).save(O+'mes-oct-a.jpg',quality=92)
# B: 96 % / 0
im=Image.new('RGB',(W,H),(0,0,0)); d=ImageDraw.Draw(im)
d.text((W*.27,H*.45),'96 %',font=F(FL,170),fill=(255,255,255),anchor='mm'); d.text((W*.27,H*.68),'TAREAS HECHAS',font=F(FR,30),fill=(150,150,150),anchor='mm')
d.text((W*.73,H*.45),'0',font=F(FL,170),fill=(255,255,255),anchor='mm'); d.text((W*.73,H*.68),'NOCHES BUENAS',font=F(FR,30),fill=(150,150,150),anchor='mm')
d.line([(W*.5,H*.28),(W*.5,H*.74)],fill=(90,90,90),width=2)
grain(im).save(O+'mes-oct-b.jpg',quality=92)
# C: stamps
im=Image.new('RGB',(W,H),(0,0,0)); d=ImageDraw.Draw(im)
d.text((W/2,H*.3),'Le di mi mes a dos IA.',font=F(FL,58),fill=(255,255,255),anchor='mm')
f=F(FR,64); w1=d.textlength('ACIERTO',font=f)+70; w2=d.textlength('FALLO',font=f)+70; gap=60; x0=W/2-(w1+gap+w2)/2; y=H*.64
d.rectangle([x0,y-65,x0+w1,y+65],fill=(255,255,255)); d.text((x0+w1/2,y),'ACIERTO',font=f,fill=(0,0,0),anchor='mm')
x1=x0+w1+gap; d.rectangle([x1,y-65,x1+w2,y+65],outline=(255,255,255),width=4); d.text((x1+w2/2,y),'FALLO',font=f,fill=(255,255,255),anchor='mm')
grain(im).save(O+'mes-oct-c.jpg',quality=92)
for k in 'abc':
    a=np.array(Image.open(O+f'mes-oct-{k}.jpg').convert('L')).astype(int)
    if k=='a': continue
    m=a>80; ys,xs=np.where(m); print(k,(xs.min()+xs.max())/2,(ys.min()+ys.max())/2)
c=Image.new('RGB',(1280*3,720)); [c.paste(Image.open(O+f'mes-oct-{k}.jpg'),(i*1280,0)) for i,k in enumerate('abc')]; c.resize((1920,360)).save('/home/claude/mes/th/sheet.jpg')
