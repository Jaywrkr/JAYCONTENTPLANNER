import sys; sys.path.insert(0,'/home/claude/rv'); from lib import *
CX=540
def fade(t,a,b,d=.35): return ease((t-a)/d)*(1-ease((t-b)/d)) if b else ease((t-a)/d)
R={}  # day -> (dur, inv, fn(c,t), ticks, pops, whoosh, yt_title, caption)

# 07 · ocupado pero no avanzas
def f07(c,t):
    c.text('Te moviste todo el día.',CX,560,fade(t,.3,4.6))
    x=CX-200+400*(0.5+0.5*np.sin(t*7)) if t<5 else CX
    c.rect(x-30,760,x+30,820,1,fill=True)
    c.text('avance',CX-260,940,.6,22,FR,'lm'); c.rect(CX-260,960,CX+260,984,.5)
    p=ease((t-6.2)/1.2); c.rect(CX-256,964,CX-256+512*p*.12,980,1,fill=True)
    c.text('0 %' if t<6.2 else f'{int(12*p)} %',CX+260,940,.6,22,FR,'rm')
    c.text('Moverse no es avanzar.',CX,1120,fade(t,5.2,0))
    c.text('Una cosa terminada, sí.',CX,1180,fade(t,7.4,0),28)
R['07']=(10,False,f07,[.5+k*.45 for k in range(10)],[6.2],[5.0],'Moverse no es avanzar.','Moverse todo el día no es avanzar.\n¿Cuántas te pasaron esta semana?')

# 08 · ver tutoriales no es aprender
def f08(c,t):
    n=min(12,int(max(0,(t-.4)/.38))+ (1 if t>.4 else 0))
    c.text('Videos vistos',CX-180,560,fade(t,.3,0),22,FR); c.text(str(n),CX-180,640,1,80)
    c.text('Cosas hechas',CX+180,560,fade(t,.3,0),22,FR); c.text('0' if t<6.2 else '1',CX+180,640,1,80)
    for k in range(n):
        y=780+k*30; c.rect(CX-330,y,CX-30,y+18,.5); c.rect(CX-326,y+4,CX-34,y+14,.9,fill=True)
    if t>5.4:
        c.rect(CX+80,780,CX+280,980,ease((t-5.4)/.4))
        f=ease((t-6.2)/.5); c.rect(CX+80,980-200*f,CX+280,980,1,fill=True)
    c.text('Pausa el video. Hazlo tú.',CX,1240,fade(t,6.8,0))
R['08']=(10,True,f08,[.4+k*.38 for k in range(12)],[6.2],[5.4],'Pausa el video. Hazlo tú.','Ver tutoriales no es aprender.\nPausa el video. Hazlo tú. Mal, pero tú.')

# 09 · Ocupado -> Enfocado
rng=np.random.default_rng(9); P9=[(rng.uniform(300,780),rng.uniform(640,1080)) for _ in range(40)]
def f09(c,t):
    p=eio((t-3.4)/1.6)
    for k,(x,y) in enumerate(P9):
        on=ease((t-.3-k*.05)/.12); jx=6*np.sin(t*9+k); jy=6*np.cos(t*8+k)
        xx=lerp(x+jx,CX-12,p); yy=lerp(y+jy,860-12,p)
        c.rect(xx,yy,xx+24,yy+24,on*(1-p*.9) if k else on,fill=(k%3==0))
    if t>5: f=ease((t-5)/.5); s=24+96*f; c.rect(CX-s/2,860-s/2,CX+s/2,860+s/2,1,fill=True)
    c.strike('Ocupado',CX,560,ease((t-5.6)/.4),fade(t,.3,0),40)
    c.text('Enfocado.',CX,1060,fade(t,6.1,0),40)
    c.text('Ocupado llena el día. Enfocado lo cambia.',CX,1150,fade(t,7.2,0),26)
R['09']=(10,False,f09,[.3+k*.05 for k in range(0,40,2)],[5.0],[3.4],'Ocupado llena el día. Enfocado lo cambia.','Ocupado llena el día. Enfocado lo cambia.\nMándaselo a quien no para pero no avanza.')

# 10 · solo un capítulo más
def f10(c,t):
    hrs=['22:00','22:45','23:30','00:15','01:00','01:45','02:00']
    k=min(6,int(max(0,(t-.5)/1.0)))
    c.text('“Solo un capítulo más.”',CX,560,fade(t,.3,0))
    c.text(hrs[k],CX,760,1,110)
    for j in range(7):
        on=1 if j<=k else .25; c.rect(CX-245+j*72,900,CX-245+j*72+54,954,on,fill=j<=k)
    c.text('Y ya son las 2:00 AM.',CX,1100,fade(t,7.0,0))
R['10']=(10,True,f10,[.5+j*1.0 for j in range(7)],[6.5],[],'Solo un capítulo más.','“Solo un capítulo más.”\nMándaselo a quien siempre dice “el último”.')

# 11 · 7 síes = 0 para lo tuyo
def f11(c,t):
    c.text('tu día',CX-210,640,.6,22,FR,'lm'); c.rect(CX-210,660,CX+210,1100,1)
    for k in range(7):
        p=eio((t-.5-k*.55)/.45); y=lerp(400,1040-k*62,p); c.rect(CX-190,y,CX+190,y+52,p,fill=False)
        if p>0: c.text('sí',CX,y+26,p,26,FR)
    if t>4.6:
        p=eio((t-4.6)/.5); x=lerp(CX,CX+380,ease((t-5.6)/.8)); y=lerp(400,600,p)
        c.rect(x-110,y,x+110,y+52,1,fill=True); c.d.text((x,y+26),'lo tuyo',font=F(FR,26),fill=c.paper(),anchor='mm')
    c.text('7 síes = 0 para lo tuyo.',CX,1220,fade(t,6.6,0))
R['11']=(10,False,f11,[.95+k*.55 for k in range(7)],[5.1],[5.6],'7 síes = 0 para lo tuyo.','No está mal ayudar.\nEstá mal que lo tuyo siempre quede al final.')

# 12 · lee esto rápido
def f12(c,t):
    if t<2.6:
        c.text('Lee esto rápido:',CX,560,fade(t,.2,0))
        a=fade(t,.9,2.3,.15); c.text('Hazlo hoy, no',CX,820,a,48); c.text('mañana de de nuevo.',CX,890,a,48)
    else:
        c.text('¿Viste el “de” repetido?',CX,560,fade(t,2.7,0))
        c.text('Hazlo hoy, no',CX,820,1,48); c.text('mañana de de nuevo.',CX,890,1,48)
        w=c.tw('mañana de de nuevo.',48); x0=CX-w/2+c.tw('mañana de ',48)
        p=ease((t-3.6)/.4); c.rect(x0-8,856,x0-8+(c.tw('de',48)+16)*p,924,1)
        c.text('Lees lo que esperas, no lo que está.',CX,1100,fade(t,4.8,0),28)
R['12']=(8,True,f12,[.9],[3.6],[2.6],'Lee esto rápido.','Lee esto rápido.\n¿Viste el “de” repetido? La mayoría no.')

# 13 · primero lo difícil
H13=[380,90,160,60,120]
def f13(c,t):
    base=1150
    for k,h in enumerate(H13):
        x=CX-300+k*125; fall=ease((t-(3.0 if k==0 else 5.0+k*.18))/.4)
        y0=base-h+fall*h; c.rect(x,y0,x+95,base,1-fall*.85,fill=(k==0))
    if t<3.0: cx=CX-300+47+125*((int(t*2))%5); c.rect(cx-8,1180,cx+8,1196,1,fill=True)
    c.text('Primero lo difícil.',CX,560,fade(t,.3,0),40)
    c.text('Lo demás cae solo.',CX,1290,fade(t,6.2,0))
R['13']=(10,False,f13,[.5,1,1.5,2,2.5],[3.0],[5.2],'Primero lo difícil. Lo demás cae solo.','Primero lo difícil. Lo demás cae solo.\nMándaselo a quien deja lo importante para la tarde.')

# 14 · domingo
def f14(c,t):
    ds='LMMJVSD'; w=104; x0=CX-(7*w)/2
    for k,dl in enumerate(ds):
        x=x0+k*w; c.text(dl,x+w/2-6,700,.6,22,FR); c.rect(x,730,x+w-12,830,.5)
    p=ease((t-1.2)/.6); c.rect(x0+6*w,730,x0+6*w+w-12,830,p,fill=True)
    c.text('15 min',x0+6*w+(w-12)/2,870,p,22,FR)
    for k in range(5):
        f=ease((t-3.2-k*.55)/.4); c.rect(x0+k*w+8,738,x0+k*w+8+(w-28)*f,822,.8,fill=True)
    c.text('Lo que hago el domingo',CX,560,fade(t,.3,0))
    c.text('15 minutos el domingo.',CX,1040,fade(t,6.4,0)); c.text('Una semana tranquila.',CX,1100,fade(t,7.2,0))
R['14']=(10,True,f14,[3.2+k*.55 for k in range(5)],[1.2],[],'15 minutos el domingo. Una semana tranquila.','15 minutos el domingo valen una semana tranquila.\nGuárdalo para el domingo.')

# 15 · no es que no tengas tiempo
def f15(c,t):
    c.text('Tu día: 24 horas.',CX,560,fade(t,.3,0))
    cols=6; s=78; g=14; x0=CX-(cols*(s+g)-g)/2
    lab=['dormir']*8+['trabajo']*9+['pantalla']*4+['']*3
    for k in range(24):
        x=x0+(k%cols)*(s+g); y=680+(k//cols)*(s+g); on=ease((t-.4-k*.12)/.15)
        kind=lab[k]; a=on*(.35 if kind in('dormir','trabajo') else 1)
        if kind=='pantalla': c.rect(x,y,x+s,y+s,a*ease((t-4.0)/.4)+(.3*on),fill=True)
        else: c.rect(x,y,x+s,y+s,a)
    c.text('4 h 12 min en el celular.',CX,1150,fade(t,4.4,0))
    c.text('No te falta tiempo. Sabes dónde está.',CX,1230,fade(t,6.4,0),28)
R['15']=(10,False,f15,[.4+k*.12 for k in range(24)],[4.0],[],'No te falta tiempo. Sabes dónde está.','Ajustes → Tiempo en pantalla. Mira tu número.\nDespués hablamos de tiempo.')

# 16 · perfecto -> publicado
def f16(c,t):
    v=1+int(max(0,t-.4)*7) if t<5 else 36
    off=np.sin(t*13)*6 if t<5 else 0; s=160+np.sin(t*5)*8 if t<5 else 160
    x=CX; y=840
    if t>5.6: x=lerp(CX,CX+900,eio((t-5.6)/.8))
    c.rect(x-s/2+off,y-s/2,x+s/2+off,y+s/2,1)
    c.text(f'versión {v}',CX,1000,fade(t,.4,5.4),26,FR)
    c.strike('Perfecto',CX,560,ease((t-5.2)/.4),fade(t,.3,0),40)
    c.text('Publicado.',CX,1000,fade(t,6.2,0),40)
    c.text('Lo perfecto vive en tu carpeta.',CX,1120,fade(t,7.0,0),28)
R['16']=(10,True,f16,[.4+k/7 for k in range(0,32,3)],[5.6],[5.6],'Perfecto → Publicado.','Lo perfecto vive en tu carpeta. Lo publicado, en el mundo.')

# 17 · el lunes empiezo
def f17(c,t):
    c.text('“El lunes empiezo.”',CX,560,fade(t,.3,0))
    for k in range(12):
        x=CX-330+(k%6)*114; y=700+(k//6)*130; on=ease((t-.5-k*.35)/.15)
        c.rect(x,y,x+96,y+96,on*.7); c.text('LUN',x+48,y+48,on*.7,22,FR)
        st=ease((t-.65-k*.35)/.15)
        if st>0: c.d.line([(x+10,y+48),(x+10+76*st,y+48)],fill=c.c(.8),width=2)
    c.text('Hoy no es lunes.',CX,1100,fade(t,5.4,0)); c.text('Empieza igual.',CX,1160,fade(t,6.4,0))
R['17']=(10,False,f17,[.65+k*.35 for k in range(12)],[6.4],[],'El lunes empiezo.','Hoy no es lunes. Pero casi nunca lo es.\nMándaselo a quien empieza todos los lunes.')

# 18 · 20 pestañas
def f18(c,t):
    n=min(20,int(max(0,(t-.4)/.12))); w=900/max(n,1)
    close=ease((t-3.6)/.8)
    for k in range(n):
        keep=(k==7); a=1 if keep else 1-close
        x=CX-450+k*w; ww=w-6
        if keep: x=lerp(x,CX-450,ease((t-4.4)/.6)); ww=lerp(ww,900,ease((t-4.4)/.6))
        c.rect(x,700,x+ww,760,a*.8)
        prog=.1+.05*(k%4); pf=lerp(prog,1,ease((t-5.4)/1.2)) if keep else prog
        c.rect(x+4,780,x+4+(ww-8)*pf,800,a,fill=True)
    c.text('20 pestañas = 0 terminadas',CX,560,fade(t,.3,3.4))
    c.text('Cierra 19. Termina 1.',CX,560,fade(t,3.8,0))
    c.text('100 %',CX,880,fade(t,6.6,0),40)
R['18']=(10,True,f18,[.4+k*.12 for k in range(20)],[6.6],[3.6],'Cierra 19. Termina 1.','Cierra 19. Termina 1.\nMándaselo a quien tiene 20 pestañas abiertas.')

# 19 · puntos grises (ilusión)
def f19(c,t):
    s=110; g=24; n=5; x0=CX-(n*s+(n-1)*g)/2; y0=640
    c.d.rectangle([x0-g,y0-g,x0+n*s+(n-1)*g+g,y0+n*s+(n-1)*g+g],fill=(255,255,255))
    for i in range(n):
        for j in range(n): c.d.rectangle([x0+i*(s+g),y0+j*(s+g),x0+i*(s+g)+s,y0+j*(s+g)+s],fill=(10,10,10))
    c.text('Cuenta los puntos grises.',CX,540,fade(t,.3,4.2))
    c.text('Cero. Ninguno existe.',CX,540,fade(t,4.6,0))
    c.text('Tu cabeza los pone. Como muchas excusas.',CX,1340,fade(t,6.0,0),26)
R['19']=(10,False,f19,[],[4.6],[],'Cuenta los puntos grises.','Cuenta los puntos grises.\nRespuesta: cero. Tu cabeza los pone.')

# 20 · hecho es mejor que perfecto
def f20(c,t):
    c.text('perfecto',CX-300,700,.6,22,FR,'lm'); c.rect(CX-300,720,CX+300,750,.5)
    p=min(.99,ease((t-.4)/3.5)*.99)+ (0.004*np.sin(t*10) if t>3.9 else 0)
    c.rect(CX-296,724,CX-296+592*p,746,1,fill=True); c.text(f'{p*100:.0f} %',CX+300,700,.6,22,FR,'rm')
    c.text('hecho',CX-300,880,fade(t,3.6,0)*.6,22,FR,'lm'); c.rect(CX-300,900,CX+300,930,fade(t,3.6,0)*.5)
    q=ease((t-4.2)/1.0); c.rect(CX-296,904,CX-296+592*q,926,1,fill=True); c.text('100 %' if q>.99 else '',CX+300,880,.6,22,FR,'rm')
    c.text('Hecho es mejor que perfecto.',CX,1100,fade(t,5.6,0))
R['20']=(10,True,f20,[],[5.2],[4.2],'Hecho es mejor que perfecto.','Hecho es mejor que perfecto.\nMándaselo a quien no publica nada por “no está listo”.')

# 21 · 3 frases para decir que no
def f21(c,t):
    c.rect(CX-340,620,CX+80,690,fade(t,.3,0)); c.text('¿Puedes hoy?',CX-320,655,fade(t,.3,0),30,FL,'lm')
    for k,s in enumerate(['Hoy no puedo.','Esta semana no. ¿El lunes?','No es para mí, gracias.']):
        t0=1.4+k*1.8; y=760+k*120; a=fade(t,t0,0)
        if a>0:
            w=c.tw(s,30)+60; c.rect(CX+340-w,y,CX+340,y+70,a,fill=True)
            c.d.text((CX+310,y+35),s[:int(max(0,(t-t0)*22))],font=F(FL,30),fill=c.paper(),anchor='rm')
    c.text('Claro no es grosero.',CX,1200,fade(t,7.2,0))
R['21']=(10,False,f21,[1.4,3.2,5.0],[7.2],[],'3 frases para decir que no.','Ninguna es grosera. Todas son claras.\nGuárdalo para la próxima vez que no sepas cómo decir que no.')

# 22 · cansado de evitarlo
def f22(c,t):
    if t<4.6: bx=CX+220*np.sin(t*2.2); cx=CX+220*np.sin((t-.35)*2.2)
    else: bx=CX; cx=lerp(CX+220*np.sin((4.6-.35)*2.2),CX,ease((t-4.6)/.3))
    done=ease((t-5.0)/.3)
    c.rect(bx-60,760,bx+60,880,1,fill=done>0.5); c.rect(cx-10,920,cx+10,940,1,fill=True)
    e=min(.87,t*.19); c.text('cansancio',CX-300,1060,.6,22,FR,'lm'); c.rect(CX-300,1080,CX+300,1104,.5); c.rect(CX-296,1084,CX-296+592*e,1100,1,fill=True)
    c.text('Llevas días evitándolo.',CX,560,fade(t,.3,4.4))
    c.text('Hacerlo tomó 30 segundos.',CX,560,fade(t,5.0,0))
    c.text('Evitarlo cansa más que hacerlo.',CX,1220,fade(t,6.4,0),30)
R['22']=(10,True,f22,[],[5.0],[4.6],'Evitarlo cansa más que hacerlo.','Evitar algo cansa más que hacerlo.\nPruébalo hoy.')

# 23 · quejarse -> cambiar
def f23(c,t):
    n=min(8,int(max(0,(t-.4)/.45))+ (1 if t>.4 else 0))
    for k in range(n): c.rect(CX-360,660+k*48,CX-360+[220,160,260,190,240,170,230,200][k],660+k*48+30,.5,fill=True)
    c.text('quejas',CX-360,630,fade(t,.3,0)*.6,22,FR,'lm')
    c.rect(CX+120,760,CX+300,940,1); c.text('tu situación',CX+210,980,.6,22,FR)
    f=ease((t-5.2)/.6); c.rect(CX+120,940-180*f,CX+300,940,1,fill=True)
    c.strike('Quejarse',CX,540,ease((t-4.6)/.4),fade(t,.3,0),40)
    c.text('Cambiar.',CX,1120,fade(t,5.6,0),40)
    c.text('Quejarse se siente como hacer algo. No lo es.',CX,1200,fade(t,6.8,0),26)
R['23']=(10,False,f23,[.4+k*.45 for k in range(8)],[5.2],[4.6],'Quejarse → Cambiar.','Quejarse se siente como hacer algo. No lo es.\nMándaselo a quien se queja de lo mismo cada semana.')

# 24 · no es el momento
def f24(c,t):
    c.rect(CX-400,860,CX+400,862,.6,fill=True)
    mx=lerp(CX-380,CX+40,ease((t-.4)/4.5)) if t<5.2 else CX+40
    spot=mx+90+30*np.sin(t*3) if t<5.2 else lerp(mx+90,mx,ease((t-5.2)/.5))
    c.rect(spot-14,846,spot+14,876,1,fill=False); c.text('el momento',spot,820,fade(t,.3,5.2)*.6,22,FR)
    c.rect(mx-10,851,mx+10,871,1,fill=True); c.text('tú',mx,910,.6,22,FR)
    c.text('Esperas el momento.',CX,560,fade(t,.3,4.8))
    c.text('Ahora.',CX,560,fade(t,5.6,0),44)
    c.text('El momento no llega. Se elige.',CX,1060,fade(t,6.6,0))
R['24']=(10,True,f24,[],[5.6],[5.2],'El momento no llega. Se elige.','El momento no llega. Se elige.\nMándaselo a quien sigue esperando.')

# 25 · contarlo ≠ hacerlo
def f25(c,t):
    for k in range(4):
        a=fade(t,.4+k*.7,0); w=[420,300,380,260][k]; c.rect(CX-360,640+k*80,CX-360+w,640+k*80+56,a)
        c.text(['tengo un plan','voy a empezar','esta vez sí','ya verás'][k],CX-340,668+k*80,a,26,FL,'lm')
    c.text('sensación de avance',CX-360,1000,.6,22,FR,'lm'); c.rect(CX-360,1020,CX+360,1044,.5); c.rect(CX-356,1024,CX-356+712*ease((t-.4)/3.2),1040,1,fill=True)
    c.text('avance real',CX-360,1100,.6,22,FR,'lm'); c.rect(CX-360,1120,CX+360,1144,.5); c.text('0 %',CX+360,1100,.6,22,FR,'rm')
    c.text('Contarlo ≠ hacerlo.',CX,540,fade(t,4.4,0),40)
    c.text('Tu cabeza ya lo siente hecho.',CX,1260,fade(t,6.0,0),28)
R['25']=(10,False,f25,[.4,1.1,1.8,2.5],[4.4],[],'Contarlo no es hacerlo.','Cuando cuentas un plan, tu cabeza ya lo siente hecho.\nPor eso no lo haces. Hazlo primero.')

# 26 · sigue el cuadrado (respiración)
def f26(c,t):
    s=360; x0=CX-s/2; y0=860-s/2; c.rect(x0,y0,x0+s,y0+s,.5)
    T=max(0,t-1.0); side=int(T//4)%4; p=(T%4)/4
    pts=[(x0,y0+s),(x0,y0),(x0+s,y0),(x0+s,y0+s),(x0,y0+s)]
    (ax,ay),(bx,by)=pts[side],pts[side+1]; x=lerp(ax,bx,p); y=lerp(ay,by,p)
    if t>1.0: c.rect(x-12,y-12,x+12,y+12,1,fill=True)
    lab=['inhala','sostén','exhala','sostén'][side] if t>1.0 else ''
    c.text('Sigue el cuadrado.',CX,560,fade(t,.2,0)); c.text(lab,CX,860,1,40)
    c.text(str(int(4-(T%4))) if t>1.0 else '',CX,920,.6,26,FR)
R['26']=(17.2,True,f26,[1.0+k for k in range(16)],[1.0,5.0,9.0,13.0],[],'Sigue el cuadrado. Respira.','Respiración cuadrada: 4 segundos por lado.\nHazlo una vez antes de tu próxima reunión.')

# 27 · menos ruido
rng=np.random.default_rng(27); P27=[(rng.uniform(260,820),rng.uniform(620,1180),rng.uniform(140,300)) for _ in range(26)]
def f27(c,t):
    off=ease((t-4.2)/1.2)
    for k,(x,y,w) in enumerate(P27):
        on=ease((t-.3-k*.12)/.1); a=on*(1-off)
        c.rect(x-w/2,y,x+w/2,y+44,a*.8); c.rect(x-w/2+12,y+14,x-w/2+12+w*.5,y+30,a*.6,fill=True)
    n=min(99,int(max(0,t-.3)*30)); c.text(f'{n}+' if t<4.4 else '',CX,540,1,40)
    if t>5.2: c.rect(CX-30,870,CX+30,930,ease((t-5.2)/.6),fill=True)
    c.text('Menos ruido.',CX,1040,fade(t,5.8,0),40)
R['27']=(10,False,f27,[.3+k*.12 for k in range(26)],[5.2],[4.2],'Menos ruido.','Menos ruido. Más de lo que importa.\nMándaselo a quien tiene 99+ notificaciones.')

# 28 · noviembre en 3 frases
def f28(c,t):
    c.text('Noviembre en 3 frases.',CX,540,fade(t,.2,0))
    for k,s in enumerate(['Hazlo simple.','Primero lo difícil.','Hecho es mejor que perfecto.']):
        t0=1.0+k*2.0; y=720+k*150; c.text(f'0{k+1}',CX-330,y,fade(t,t0,0)*.6,22,FR,'lm')
        c.typed(s,CX-260,y,t0,18,1,36)
    c.text('¿Cuál te sirvió más?',CX,1250,fade(t,7.4,0),30)
def _typed_left(self,txt,x,y,t0,cps=20,a=1,size=34,font=None):
    n=int(max(0,min(len(txt),(self.t-t0)*cps)))
    if n: self.d.text((x,y),txt[:n],font=F(font or FL,size),fill=self.c(a),anchor='lm')
Ctx.typed=_typed_left
R['28']=(10,True,f28,[1.0,3.0,5.0],[7.4],[],'Noviembre en 3 frases.','¿Cuál te sirvió más este mes?\nResponde con el número.')

# 29 · ya sabes lo que tienes que hacer
def f29(c,t):
    items=['otro video','otro libro','otro curso','otro podcast','otra lista','otro plan']
    for k,s in enumerate(items):
        y=1180-k*70; on=ease((t-.4-k*.5)/.2); a=on*(1-ease((t-4.6)/.6))
        c.rect(CX-200,y,CX+200,y+56,a*.8); c.text(s,CX,y+28,a,26,FR)
    s=90; y0=600; c.rect(CX-s/2,y0,CX+s/2,y0+s,1)
    f=ease((t-5.6)/.5); c.rect(CX-s/2,y0+s*(1-f),CX+s/2,y0+s,1,fill=True)
    c.text('Ya sabes lo que tienes que hacer.',CX,540,fade(t,.2,0),30)
    c.text('No te falta información.',CX,820,fade(t,6.4,0)); c.text('Te falta hacerlo.',CX,880,fade(t,7.2,0))
R['29']=(10,False,f29,[.4+k*.5 for k in range(6)],[5.6],[4.6],'Ya sabes lo que tienes que hacer.','No necesitas otro video ni otro libro.\nMándaselo a quien sigue investigando.')

# 30 · enero -> hoy
def f30(c,t):
    for k in range(31):
        x=CX-(7*84-14)/2+(k%7)*84; y=680+(k//7)*84; on=ease((t-.4-k*.06)/.12)
        c.rect(x,y,x+70,y+70,(1 if (k==0 and t>5.4) else on*.6), fill=(k==0 and t>5.4))
    c.text('diciembre · 31 días',CX,640,fade(t,.3,0)*.6,22,FR)
    c.strike('Enero',CX,540,ease((t-4.6)/.4),fade(t,.3,0),40)
    c.text('Hoy.',CX,1170,fade(t,5.4,0),40)
    c.text('Enero llega solo. Hoy no.',CX,1240,fade(t,6.6,0),28)
R['30']=(10,True,f30,[.4+k*.06 for k in range(0,31,2)],[5.4],[4.6],'Enero llega solo. Hoy no.','Diciembre no es el mes para pensar en enero.\nMándaselo a quien ya está escribiendo sus propósitos.')

def make(day,prev=False):
    dur,inv,fn,ticks,pops,wh,_,_=R[day]; bl=blobset(int(day)*7)
    def frame(t):
        pulse=sum(0.22*np.exp(-((t-p-.1)/0.3)**2) for p in pops)
        c=Ctx(t,inv,bl,pulse); fn(c,t); return c.out()
    if prev:
        ts=[dur*x for x in (.2,.45,.7,.95)]
        ims=[Image.fromarray(frame(t)).resize((270,480)) for t in ts]; s=Image.new('RGB',(1080,480)); [s.paste(im,(i*270,0)) for i,im in enumerate(ims)]; return s
    return encode(f'c11{day}',dur,frame,ticks,pops,wh)
if __name__=='__main__':
    days=sys.argv[2:] if len(sys.argv)>2 else sorted(R)
    if sys.argv[1]=='prev':
        sheet=Image.new('RGB',(1080,480*len(days)))
        for i,d in enumerate(days): sheet.paste(make(d,True),(0,i*480))
        sheet.save('/home/claude/rv/sheet.jpg')
    else:
        for d in days: print(make(d))
