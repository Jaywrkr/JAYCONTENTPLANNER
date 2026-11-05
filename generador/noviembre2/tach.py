import sys; sys.path.insert(0,'/home/claude/hoy30'); from fondo_lib import *
O='/home/claude/n30/'
def post(name,bg,a,b):
    W,H=1080,1350; im=Image.new('RGB',(W,H),(bg,)*3); d=ImageDraw.Draw(im); sm=F(FR,20)
    d.text((90,90),'@jaywrkr',font=sm,fill=col(bg,.6),anchor='lm'); d.text((990,90),'TACHADO  Nº 09',font=sm,fill=col(bg,.6),anchor='rm')
    d.rectangle([90,1246,118,1274],outline=col(bg,1),width=2); d.line([(90,1260),(118,1260)],fill=col(bg,1),width=2)
    d.text((990,1260),'simple.',font=sm,fill=col(bg,.5),anchor='rm')
    f=F(FL,36); wa=d.textlength(a,font=f); wb=d.textlength(b,font=f); g=26; x=W/2-(wa+g+wb)/2; y=H/2
    d.text((x,y),a,font=f,fill=col(bg,.4),anchor='lm'); d.line([(x-3,y+1),(x+wa+3,y+1)],fill=col(bg,.6),width=2)
    d.text((x+wa+g,y),b,font=f,fill=col(bg,1),anchor='lm')
    grain(im,3).save(O+name+'.jpg',quality=93); Image.open(O+name+'.jpg').resize((216,270),Image.LANCZOS).save(O+'th-'+name+'.jpg',quality=80)
post('c1130-a',0,'Enero','Hoy.')
post('c1130-b',244,'Propósitos','Hechos.')
