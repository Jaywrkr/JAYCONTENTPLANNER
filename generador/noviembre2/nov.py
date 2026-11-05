import sys; sys.path.insert(0,'/home/claude/hoy30'); from fondo_lib import *
J=[('1106','a',0,['Hazlo simple.'],'marks','Para cada vez que lo complicas.','05'),
   ('1106','b',244,['Una cosa.','Bien hecha.'],'marks','Para cada vez que haces diez a medias.','05'),
   ('1113','a',0,['Primero','lo difícil.'],'marks','Para cuando empiezas por lo fácil.','06'),
   ('1113','b',244,['Menos plan.','Más hecho.'],'bar','Para cuando planeas y no haces.','06'),
   ('1120','a',244,['Hecho es mejor','que perfecto.'],'marks','Para cada vez que lo vuelves a revisar.','07'),
   ('1120','b',0,['Lento','también llega.'],'marks','Para cada vez que te comparas.','07'),
   ('1127','a',0,['Enero','empieza hoy.'],'marks','Para cuando ya piensas en enero.','08'),
   ('1127','b',244,['Menos ruido.'],'marks','Para cada desbloqueo sin motivo.','08')]
for d,s,bg,ls,home,title,n in J:
    p=f'c{d}-{s}2'; wall(bg,ls,'lock',p+'-bloqueo.jpg'); wall(bg,'bar' if home=='bar' else None,'home',p+'-inicio.jpg')
    post(bg,title,p+'-bloqueo.jpg',p+'-inicio.jpg',p+'-fondo.jpg',n)
    Image.open(O+p+'-fondo.jpg').resize((216,270),Image.LANCZOS).save(O+'th-'+p+'-fondo.jpg',quality=80)
