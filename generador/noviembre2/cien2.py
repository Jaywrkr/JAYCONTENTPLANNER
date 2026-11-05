import sys; sys.path.insert(0,'/home/claude/hoy30'); from fondo_lib import *
OUT='/home/claude/w45/'
def cien(name,bg,A,Bx,n,cols,size,rows,hit,lh):
    assert len(A)==len(Bx),(A,Bx)
    W,H=1080,1350; im=Image.new('RGB',(W,H),(bg,)*3); d=ImageDraw.Draw(im)
    sm=F(FR,20); d.text((90,90),'@jaywrkr',font=sm,fill=col(bg,.6),anchor='lm'); d.text((990,90),f'100 VECES  Nº {n}',font=sm,fill=col(bg,.6),anchor='rm')
    for i in range(3):
      for j in range(3): d.rectangle([90+i*11,1248+j*11,96+i*11,1254+j*11],fill=col(bg,1))
    d.text((990,1260),'simple.',font=sm,fill=col(bg,.5),anchor='rm')
    f=F(FR,size); y0=(H-(rows-1)*lh)/2
    for r in range(rows):
        parts=[Bx if (r,c)==hit else A for c in range(cols)]
        d.text((W/2,y0+r*lh),'  '.join(parts),font=f,fill=col(bg,.9),anchor='mm')
    grain(im,3).save(OUT+name+'.jpg',quality=93)
    Image.open(OUT+name+'.jpg').resize((216,270),Image.LANCZOS).save(OUT+'th-'+name+'.jpg',quality=80)
    S=Image.new('RGB',(1080,1920),(bg,)*3); d=ImageDraw.Draw(S)
    d.text((540,700),'¿La encontraste?',font=F(FL,46),fill=col(bg,1),anchor='mm'); d.text((540,1480),'@jaywrkr',font=sm,fill=col(bg,.5),anchor='mm')
    grain(S,3).save(OUT+name+'-st-sticker.jpg',quality=92)
    rb=0 if bg>128 else 244; R=Image.new('RGB',(1080,1920),(rb,)*3); d=ImageDraw.Draw(R); fr=F(FR,40)
    tw=d.textlength(A,font=fr); fs=40
    while d.textlength(A,font=F(FR,fs))>900: fs-=1
    fr=F(FR,fs); tw=d.textlength(A,font=fr)
    d.text((540,860),A,font=fr,fill=col(rb,.45),anchor='mm'); d.line([(540-tw/2-4,862),(540+tw/2+4,862)],fill=col(rb,.6),width=2)
    d.text((540,960),Bx,font=fr,fill=col(rb,1),anchor='mm'); d.text((540,1480),'simple.',font=sm,fill=col(rb,.45),anchor='mm')
    grain(R,3).save(OUT+name+'-st-revela.jpg',quality=92)
cien('c1110-a2',244,'SOLO UN CAPÍTULO MÁS.','Y YA SON LAS 2:00 AM.','06',2,30,15,(9,1),66)
cien('c1110-b2',0,'YA CASI TERMINO.','LO DIJE EN MAYO.','06',2,34,15,(6,0),66)
