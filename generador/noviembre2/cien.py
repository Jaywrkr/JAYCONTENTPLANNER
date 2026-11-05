import sys; sys.path.insert(0,'/home/claude/hoy30'); from fondo_lib import *
W,H=1080,1350; bg=244; im=Image.new('RGB',(W,H),(bg,)*3); d=ImageDraw.Draw(im)
sm=F(FR,20); d.text((90,90),'@jaywrkr',font=sm,fill=col(bg,.6),anchor='lm'); d.text((990,90),'100 VECES  Nº 05',font=sm,fill=col(bg,.6),anchor='rm')
for i in range(3):
  for j in range(3): d.rectangle([90+i*11,1248+j*11,96+i*11,1254+j*11],fill=col(bg,1))
d.text((990,1260),'simple.',font=sm,fill=col(bg,.5),anchor='rm')
f=F(FR,27); A,Bx='CUANDO TENGA','YA LO TENGO.'; rows,cols,lh=23,3,44
y0=(H-(rows-1)*lh)/2
for r in range(rows):
  parts=[Bx if (r==13 and c==1) else A for c in range(cols)]
  d.text((W/2,y0+r*lh),'  '.join(parts),font=f,fill=col(bg,.9),anchor='mm')
grain(im,3).save('/home/claude/c1103/c1103-a2.jpg',quality=93)
# sticker: reveal story 1080x1920
S=Image.new('RGB',(1080,1920),(bg,)*3); d=ImageDraw.Draw(S)
d.text((540,700),'¿La encontraste?',font=F(FL,46),fill=col(bg,1),anchor='mm')
d.text((540,1480),'@jaywrkr',font=sm,fill=col(bg,.5),anchor='mm')
grain(S,3).save('/home/claude/c1103/c1103-a2-st-sticker.jpg',quality=92)
R=Image.new('RGB',(1080,1920),(10,)*3); d=ImageDraw.Draw(R)
d.text((540,860),'CUANDO TENGA',font=F(FR,40),fill=(110,110,110),anchor='mm')
tw=d.textlength('CUANDO TENGA',font=F(FR,40)); d.line([(540-tw/2-4,862),(540+tw/2+4,862)],fill=(160,160,160),width=2)
d.text((540,960),'YA LO TENGO.',font=F(FR,40),fill=(245,245,245),anchor='mm')
d.text((540,1480),'simple.',font=sm,fill=(120,120,120),anchor='mm')
grain(R,3).save('/home/claude/c1103/c1103-a2-st-revela.jpg',quality=92)
Image.open('/home/claude/c1103/c1103-a2.jpg').resize((216,270),Image.LANCZOS).save('/home/claude/c1103/th-c1103-a2.jpg',quality=80)
