import sys; sys.path.insert(0,'/home/claude/rv')
import vv
from vv import *
vv.DUR=15; vv.END=12.8
DUR=15
def H(t): return 1.0   # gancho: frase completa desde el primer cuadro
def pop(t,t0,d=.32): return eback((t-t0)/d)
N2={}
def P(c,t,k,l1,l2,t2,size=32):
    c.text(l1,CX,600,H(t)*k,size); c.text(l2,CX,646,fade(t,t2,0,.3)*k,size)

# 12 · Nadie recuerda tus excusas.
EXC=['no tuve tiempo','estaba cansado','no era el momento','mañana empiezo','no sabía cómo','era muy difícil']
def e12(c,t,k):
    P(c,t,k,'Nadie recuerda tus excusas.','Solo tus resultados.',7.4)
    X=170; Y=790
    for i,e in enumerate(EXC):
        a=fade(t,.25+i*.32,0,.2); g=ease((t-4.2-i*.12)/.7)
        y=Y+i*62+g*120; aa=a*(1-g)*k
        if aa>0.01:
            c.rect(X,y,X+340,y+44,aa*.5); c.lab(e,X+18,y+22,aa*.85,'lm')
    c.lab(f'excusas: {min(6,int(max(0,(t-.25)/.32)+1)) if t>.25 else 0:02d}  ·  recordadas: 00',X,Y-40,fade(t,.3)*k*.6,'lm',20)
    p=pop(t,5.6); s=150*p
    if p>0:
        cx,cy=760,960; c.rect(cx-s/2,cy-s/2,cx+s/2,cy+s/2,k,fill=True)
        c.lab('resultado',cx,cy+110,fade(t,5.9)*k*.9)
N2['12']=dict(fn=e12,inv=True,ticks=[.25+i*.32 for i in range(6)],pops=[5.6,7.4],whoosh=[4.2],
 title='Nadie recuerda tus excusas.',cap='Nadie recuerda tus excusas. Solo tus resultados.')

# 13 · Tu salud no avisa. Cobra.
BAD=[1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1]
def e13(c,t,k):
    P(c,t,k,'Tu salud no avisa.','Cobra.',7.6)
    X0=180; Y=820; S=18; G=6
    n=int(max(0,min(30,(t-.3)/.17)))
    debt=0
    for i in range(30):
        x=X0+i*(S+G); on=i<n
        if on:
            b=BAD[i]; debt+=b
            c.rect(x,Y,x+S,Y+S,k*(1 if b else .5),fill=bool(b))
        else: c.rect(x,Y,x+S,Y+S,k*.2)
    c.lab('30 noches',X0,Y-34,fade(t,.3)*k*.6,'lm',20)
    c.lab(f'cortas: {debt:02d}',X0+30*(S+G)-G,Y-34,fade(t,.3)*k*.9,'rm',20)
    W=(30*(S+G)-G)*debt/30
    c.lab('lo que se acumula',X0,Y+80,fade(t,.6)*k*.6,'lm',20)
    c.rect(X0,Y+100,X0+30*(S+G)-G,Y+114,k*.3); c.rect(X0,Y+100,X0+W,Y+114,k,fill=True)
    if t>6.6:
        q=ease((t-6.6)/.35); yb=lerp(-200,Y+200,q); sh=0 if q<1 else 10*np.exp(-(t-6.95)*8)*np.sin(t*70)
        c.rect(X0+sh,yb,X0+30*(S+G)-G+sh,yb+150,k,fill=True)
        c.d.text((CX+sh,yb+75),'la factura',font=F(FR,26),fill=c.paper(),anchor='mm')
N2['13']=dict(fn=e13,inv=False,ticks=[.3+i*.17 for i in range(0,30,2)],pops=[6.95],whoosh=[6.4],
 title='Tu salud no avisa. Cobra.',cap='Tu salud no avisa. Cobra.\nMándaselo a quien duerme 5 horas y dice que está bien.')

# 15 · La gente cambia por lo que ve
NODES=[(240,820),(840,820),(240,1160),(840,1160),(CX,1220)]
def e15(c,t,k):
    P(c,t,k,'La gente no cambia por lo que dices.','Cambia por lo que ve que haces.',8.6,30)
    Cn=(CX,960); a=fade(t,.2)*k
    for i,(x,y) in enumerate(NODES): c.box(x,y,30,a*.7)
    # fase 1: palabras
    said=0
    for j in range(10):
        t0=.4+j*.38
        if t0>4.6: break
        q=(t-t0)/.5
        if 0<q<1:
            x,y=NODES[j%5]; px=lerp(Cn[0],x,q); py=lerp(Cn[1],y,q) if abs(x-Cn[0])<1 else Cn[1]
            if abs(x-Cn[0])>=1: px=lerp(Cn[0],x,min(1,q*1.6)); py=lerp(Cn[1],y,max(0,q*1.6-.6)/1.0) if q>.375 else Cn[1]
            c.rect(px-6,py-3,px+6,py+3,k*.8,fill=True)
        if t>t0: said+=1
    c.lab(f'consejos: {said:02d}',170,1290,a*.6,'lm',20)
    # fase 2: haces → te siguen
    p=ease((t-5.0)/2.0)
    path=[Cn,(CX,880),(CX+120,880),(CX+120,800),(CX+240,800),(CX+240,720)]
    hx,hy=c.path(path,p,k,2,True,20) if p>0 else (Cn[0],Cn[1])
    if p<=0: c.node(Cn[0],Cn[1],a,20)
    c.lab('tú',Cn[0]-30,Cn[1],a*.8,'rm',20)
    fol=0
    for i,(x,y) in enumerate(NODES):
        q=ease((t-6.6-i*.35)/.9)
        if q>0:
            fol+=1; d=1 if x<CX else -1
            if x==CX: d=1
            c.path([(x,y),(x,y-40),(x+d*40,y-40),(x+d*40,y-80),(x+d*80,y-80)],q,k*.7,2,True,12)
    c.lab(f'cambiaron: {fol:02d}',910,1290,fade(t,6.4)*k*.9,'rm',20)
N2['15']=dict(fn=e15,inv=True,ticks=[.4+j*.38 for j in range(11)]+[6.6+i*.35 for i in range(5)],pops=[8.6],whoosh=[5.0],
 title='La gente no cambia por lo que dices.',cap='La gente no cambia por lo que dices. Cambia por lo que ve que haces.')

# 16 · El aplauso dura un día. La deuda, un año.
def e16(c,t,k):
    P(c,t,k,'El aplauso dura un día.','La deuda, un año.',7.6)
    X0,X1=180,900; a=fade(t,.2)*k; M='efmamjjasond'
    for i in range(12):
        x=X0+i*(X1-X0)/12; c.lab(M[i],x+(X1-X0)/24,1240,a*.5,size=18)
    # aplauso
    Y1=860; c.lab('aplauso',X0,Y1-30,a*.6,'lm',20)
    likes=int(min(248,max(0,(t-.3)*400)))
    ap=ease((t-.3)/.4)*(1-ease((t-2.4)/1.2))
    c.rect(X0,Y1,X0+(X1-X0)/365*6+30,Y1+16,k*ap,fill=True)
    c.lab(f'{likes} likes',X1,Y1-30,a*.9*(1-ease((t-2.6)/1.0))+a*.3,'rm',20)
    # deuda
    Y2=1080; c.lab('pago',X0,Y2-30,fade(t,2.6)*k*.6,'lm',20)
    m=int(max(0,min(12,(t-3.0)/.42)))
    for i in range(12):
        x=X0+i*(X1-X0)/12
        c.rect(x+3,Y2,x+(X1-X0)/12-3,Y2+40,fade(t,2.6)*k*.3)
        if i<m: q=pop(t,3.0+i*.42,.25); c.rect(x+3,Y2+40-40*q,x+(X1-X0)/12-3,Y2+40,k,fill=True)
    c.lab(f'cuota {m:02d}/12',X1,Y2-30,fade(t,3.0)*k*.9,'rm',20)
N2['16']=dict(fn=e16,inv=False,ticks=[3.0+i*.42 for i in range(12)],pops=[7.6],whoosh=[],
 title='El aplauso dura un día. La deuda, un año.',cap='El aplauso dura un día. La deuda, un año.\nMándaselo a quien compra para impresionar.')

# 17 · Tu entorno decide
def e17(c,t,k):
    P(c,t,k,'Tu entorno decide más','que tu fuerza de voluntad.',6.4)
    n=7; S=56; G=12; X0=CX-(n*S+(n-1)*G)/2; Y0=760
    rng=np.random.default_rng(17); order=rng.permutation(48)
    ph2=ease((t-8.6)/1.2)
    idx=0
    for r in range(n):
        for q in range(n):
            x=X0+q*(S+G); y=Y0+r*(S+G); ctr=(r==3 and q==3)
            if ctr: continue
            o=order[idx]; idx+=1
            on=pop(t,.3+o*.05,.25)
            c.rect(x,y,x+S,y+S,k*on*.5,fill=True); c.rect(x,y,x+S,y+S,k*.25)
            q2=ease((t-8.6-o*.03)/.3)
            if q2>0: c.rect(x,y,x+S,y+S,k*q2,fill=True)
    # centro: tú
    x=X0+3*(S+G); y=Y0+3*(S+G); g=ease((t-3.0)/3.0)*(1-ease((t-10.0)/1.0))
    c.rect(x-4,y-4,x+S+4,y+S+4,k,w=3)
    c.rect(x,y,x+S,y+S,k*(1-.5*g),fill=True)
    c.lab('tú',x+S/2,y-24,k*.9,size=20)
    wp=int(100-80*g)
    c.lab(f'fuerza de voluntad: {wp:3d} %',X0,Y0+n*(S+G)+20,fade(t,.4)*k*.7,'lm',20)
    c.lab('cambia tu entorno' if t>8.4 else 'te pareces a tu entorno',X0,Y0+n*(S+G)+56,fade(t,3.2)*k*.6,'lm',20)
N2['17']=dict(fn=e17,inv=True,ticks=[.3+i*.25 for i in range(10)],pops=[6.4,8.6],whoosh=[8.4],
 title='Tu entorno decide más que tu fuerza de voluntad.',cap='Tu entorno decide más que tu fuerza de voluntad.\nMándaselo a quien lo intenta solo.')

# 19 · Al año le quedan 42 días.
def e19(c,t,k):
    P(c,t,k,'Al año le quedan 42 días.','Van a pasar igual.',8.0)
    cols=25; S=22; G=6; X0=CX-(cols*(S+G)-G)/2; Y0=760
    n=int(min(323,max(0,(t-.2)*110)))
    for i in range(365):
        r,q=divmod(i,cols); x=X0+q*(S+G); y=Y0+r*(S+G)
        if i<n: c.rect(x,y,x+S,y+S,k*.85,fill=True)
        else:
            b=.35 if t<3.4 else .4+.6*abs(np.sin((t-3.4)*3+i*.15))
            c.rect(x,y,x+S,y+S,k*b*fade(t,.1))
    yl=Y0+15*(S+G)+24
    c.lab(f'día {max(1,n):03d} de 365',X0,yl,fade(t,.2)*k*.8,'lm',20)
    c.lab(f'quedan {365-max(n,0) if n<323 else 42}',X0+cols*(S+G)-G,yl,fade(t,.2)*k*.9,'rm',20)
N2['19']=dict(fn=e19,inv=False,ticks=[.2+i*.3 for i in range(10)],pops=[3.2,8.0],whoosh=[],
 title='Al año le quedan 42 días.',cap='Al año le quedan 42 días. Van a pasar igual.\n¿Qué vas a hacer con ellos?')

# 20 · Comparas tu día 1 con el día 1000 de otro.
def e20(c,t,k):
    P(c,t,k,'Comparas tu día 1','con el día 1000 de otro.',3.6)
    a=fade(t,.2)*k
    # tú
    c.lab('tú',230,780,a*.6,size=20); s=26*pop(t,.3); c.rect(230-s/2,840-s/2,230+s/2,840+s/2,k,fill=True)
    c.lab('día 1',230,890,a*.8,size=20)
    # otro: 1000
    cols=40; S=9; G=3; X0=420; Y0=770
    n=int(min(1000,max(0,(t-1.0)*420)))
    for i in range(n):
        r,q=divmod(i,cols); c.rect(X0+q*(S+G),Y0+r*(S+G),X0+q*(S+G)+S,Y0+r*(S+G)+S,k*.85,fill=True)
    c.lab('otro',X0,Y0-30,a*.6,'lm',20); c.lab(f'día {max(n,1)}',X0+cols*(S+G)-G,Y0-30,a*.8,'rm',20)
    # su día 1
    if t>6.0:
        e=fade(t,6.0); c.rect(X0-8,Y0-8,X0+S+8,Y0+S+8,k*e,w=2)
        c.path([(X0-8,Y0+S/2),(330,Y0+S/2),(330,840),(230+20,840)],ease((t-6.2)/1.2),k*e,2,False)
        c.lab('su día 1 se veía igual al tuyo',CX,1150,fade(t,7.4)*k*.9)
N2['20']=dict(fn=e20,inv=True,ticks=[1.0+i*.24 for i in range(10)],pops=[3.6,6.0],whoosh=[6.2],
 title='Comparas tu día 1 con el día 1000 de otro.',cap='Comparas tu día 1 con el día 1000 de otro.\nSu día 1 se veía igual al tuyo.')

# 22 · 4 horas al día = 61 días al año
def e22(c,t,k):
    P(c,t,k,'4 horas al día en el celular','son 61 días al año.',7.2)
    X0,X1=180,900; S=(X1-X0)/24; Y=800; a=fade(t,.2)*k
    c.lab('un día · 24 h',X0,Y-30,a*.6,'lm',20)
    for i in range(24):
        x=X0+i*S; on=i>=20 and t>.3+(i-20)*.3
        c.rect(x+2,Y,x+S-2,Y+30,k*(1 if on else .3),fill=on)
    c.lab('celular · 4 h',X1,Y-30,fade(t,1.0)*k*.9,'rm',20)
    # año
    cols=25; s=20; g=6; Y0=920; XX=CX-(cols*(s+g)-g)/2
    n=int(min(61,max(0,(t-2.6)*22)))
    for i in range(365):
        r,q=divmod(i,cols); x=XX+q*(s+g); y=Y0+r*(s+g)
        c.rect(x,y,x+s,y+s,fade(t,2.2)*k*(1 if i<n else .25),fill=i<n)
    c.lab(f'{n*24:,} h'.replace(',','.')+f'  ·  {n} días',XX,Y0+15*(s+g)+20,fade(t,2.6)*k*.85,'lm',20)
N2['22']=dict(fn=e22,inv=False,ticks=[.3,.6,.9,1.2]+[2.6+i*.3 for i in range(9)],pops=[7.2],whoosh=[2.2],
 title='4 horas al día en el celular son 61 días al año.',cap='4 horas al día en el celular son 61 días al año.\nMándaselo a quien “no tiene tiempo”.')

# 23 · Ser bueno no basta.
def e23(c,t,k):
    P(c,t,k,'Ser bueno no basta.','Tienen que saber que lo eres.',7.8)
    a=fade(t,.2)*k; A=(290,980); B=(790,980)
    for (x,y),lab in [(A,'bueno · invisible'),(B,'bueno · visible')]:
        c.node(x,y,a,22); c.lab(lab,x,1170,a*.7,size=20)
    # caja cerrada alrededor de A
    p=ease((t-.4)/1.0); c.path([(A[0]-90,A[1]-90),(A[0]+90,A[1]-90),(A[0]+90,A[1]+90),(A[0]-90,A[1]+90),(A[0]-90,A[1]-90)],p,a*.7,2,False)
    # B conecta
    tg=[(B[0]-150,820),(B[0],780),(B[0]+150,820),(B[0]+150,1060),(B[0],1080),(B[0]-150,1060)]
    n=0
    for i,(x,y) in enumerate(tg):
        q=ease((t-1.8-i*.6)/.6)
        if q>0:
            n+=1; c.path([B,(B[0],y),(x,y)] if x!=B[0] else [B,(x,y)],q,k*.6,2,False)
            c.box(x,y,26,k*q)
    c.lab('oportunidades: 00',A[0],1206,a*.9,size=20)
    c.lab(f'oportunidades: {n:02d}',B[0],1206,a*.9,size=20)
N2['23']=dict(fn=e23,inv=True,ticks=[1.8+i*.6 for i in range(6)],pops=[7.8],whoosh=[],
 title='Ser bueno no basta.',cap='Ser bueno no basta. Tienen que saber que lo eres.\nMándaselo a quien hace un gran trabajo en silencio.')

# 24 · Cada sí es un no a lo demás
def e24(c,t,k):
    P(c,t,k,'Cada sí a algo','es un no a todo lo demás.',6.6)
    a=fade(t,.2)*k; S=(CX,1230); ys=[790,860,930,1000,1070,1140]; pick=2
    c.node(S[0],S[1],a,20)
    for i,y in enumerate(ys):
        x=200 if i%2==0 else 880
        q=ease((t-.3-i*.25)/.6)
        chosen=i==pick
        dim=1 if t<4.0 or chosen else .3
        c.path([S,(S[0],y),(x,y)],q,k*(.9 if (chosen and t>4.0) else .4*dim),2 if not (chosen and t>4.0) else 3,False)
        c.box(x,y,30,k*q*dim,fill=chosen and t>4.0)
        lab='sí' if chosen else 'no'
        if t>4.0:
            c.lab(lab,x+(-40 if x>CX else 40),y,fade(t,4.2+.1*i)*k*(.95 if chosen else .5),'rm' if x>CX else 'lm',20)
            if not chosen: e=ease((t-4.6-i*.12)/.3); c.line(x-22,y,x-22+44*e,y,k*.8)
    c.lab('opciones: 6  ·  elegidas: 1',CX,1300,fade(t,4.0)*k*.6,size=20)
N2['24']=dict(fn=e24,inv=False,ticks=[.3+i*.25 for i in range(6)]+[4.6+i*.12 for i in range(5)],pops=[4.0,6.6],whoosh=[],
 title='Cada sí a algo es un no a todo lo demás.',cap='Cada sí a algo es un no a todo lo demás.\nElige qué estás dejando.')

# 26 · Lo que no dices hoy, pesa mañana.
def e26(c,t,k):
    P(c,t,k,'Lo que no dices hoy,','pesa mañana.',6.8)
    n=int(max(0,min(6,(t-.4)/.8+1))) if t>.4 else 0
    sink=n*22
    G=1260; x=CX
    c.line(200,G,880,G,fade(t,.2)*k*.4)
    yb=G-40+sink*0.0
    base=780+sink
    for i in range(n):
        q=pop(t,.4+i*.6,.28); y=base+ (n-1-i)*0 + i*0
    # pila
    top=base
    for i in range(n):
        q=ease((t-.4-i*.8)/.3); yy=lerp(700,1150-sink-(i+1)*46,q)
        c.rect(x-70,yy,x+70,yy+40,k*.7,fill=True)
    yn=1150-sink+30; c.node(x,yn+14,k,26)
    c.line(x,yn+30,x,G,k*.4)
    c.lab('tú',x+40,yn+14,k*.8,'lm',20)
    c.lab(f'cosas sin decir: {n:02d}',200,1300,fade(t,.3)*k*.7,'lm',20)
    c.lab('el peso se acumula',880,1300,fade(t,3.0)*k*.6,'rm',20)
N2['26']=dict(fn=e26,inv=True,ticks=[.4+i*.8 for i in range(6)],pops=[6.8],whoosh=[],
 title='Lo que no dices hoy, pesa mañana.',cap='Lo que no dices hoy, pesa mañana.\nMándaselo a quien se lo guarda todo.')

# 27 · La IA sube el piso. No el techo.
HTS=[.18,.32,.22,.45,.28,.82,.38,.25,.55]
def e27(c,t,k):
    P(c,t,k,'La IA sube el piso.','No el techo.',7.0)
    X0=180; W=560; n=9; bw=W/n; YB=1220; Hh=420; a=fade(t,.2)*k
    floor=.5*ease((t-2.6)/2.6)
    for i,h in enumerate(HTS):
        hh=max(h,floor)*Hh*ease((t-.3-i*.1)/.4)
        x=X0+i*bw
        c.rect(x+8,YB-hh,x+bw-8,YB,k*(1 if h>=.8 else .7),fill=True)
    c.line(X0-20,YB,X0+W+20,YB,a*.5)
    yf=YB-floor*Hh; c.line(X0-20,yf,X0+W+20,yf,fade(t,2.6)*k*.9,3)
    c.lab('piso con IA',X0+W+36,yf,fade(t,2.6)*k*.9,'lm',20)
    yc=YB-.9*Hh; c.line(X0-20,yc,X0+W+20,yc,fade(t,5.4)*k*.6)
    c.lab('techo',X0+W+36,yc,fade(t,5.4)*k*.7,'lm',20)
    c.lab('video completo en YouTube',CX,1300,fade(t,9.0)*k*.6,size=20)
N2['27']=dict(fn=e27,inv=False,ticks=[.3+i*.1 for i in range(9)],pops=[5.4,7.0],whoosh=[2.6],
 title='La IA sube el piso. No el techo.',cap='La IA sube el piso. No el techo.\nVideo completo en YouTube.')

# 29 · Te vas a arrepentir más de lo que no hiciste
def e29(c,t,k):
    P(c,t,k,'Te vas a arrepentir más','de lo que no hiciste.',7.6)
    X0,X1,YB=200,880,1180; a=fade(t,.2)*k
    c.line(X0,YB,X1,YB,a*.5); c.line(X0,YB,X0,780,a*.5)
    for i,l in enumerate(['días','meses','años']):
        c.lab(l,X0+(i+.5)*(X1-X0)/3,YB+34,a*.55,size=20)
    p=ease((t-.4)/5.0)
    did=[(X0,820),(X0+(X1-X0)/3,820),(X0+(X1-X0)/3,960),(X0+2*(X1-X0)/3,960),(X0+2*(X1-X0)/3,1100),(X1,1100)]
    nod=[(X0,1120),(X0+(X1-X0)/3,1120),(X0+(X1-X0)/3,1000),(X0+2*(X1-X0)/3,1000),(X0+2*(X1-X0)/3,840),(X1,840)]
    c.path(did,p,k*.5,2,True,12); c.path(nod,p,k,3,True,16)
    c.lab('lo que hiciste',X1,1100-30,fade(t,5.4)*k*.6,'rm',20)
    c.lab('lo que no hiciste',X1,840-30,fade(t,5.4)*k*.95,'rm',20)
    c.lab('arrepentimiento',X0+12,770,a*.55,'lm',20)
    c.lab('Gilovich y Medvec · 1995',CX,1300,fade(t,8.6)*k*.5,size=20)
N2['29']=dict(fn=e29,inv=True,ticks=[.4,2.0,3.7],pops=[7.6],whoosh=[],
 title='Te vas a arrepentir más de lo que no hiciste.',cap='Te vas a arrepentir más de lo que no hiciste.\nMándaselo a quien lo sigue pensando.')

# 30 · Lo que toleras, se repite.
EV=[.3,1.6,2.6,3.4,4.0,4.5,4.9,5.25,5.55]
def e30(c,t,k):
    P(c,t,k,'Lo que toleras,','se repite.',3.0)
    X0,X1,Y=170,910,980; a=fade(t,.2)*k; T1=6.2
    c.line(X0,Y,X1,Y,a*.4)
    n=0
    for i,e in enumerate(EV):
        x=X0+(X1-X0)*(e/7.5)
        q=pop(t,e,.25)
        if q>0: n+=1; c.rect(x-12,Y-60*q,x+12,Y,k*.8,fill=True)
    c.lab(f'veces: {n:02d}',X0,Y+50,a*.7,'lm',20)
    if t>T1:
        xl=X0+(X1-X0)*(6.2/7.5); e=ease((t-T1)/.4)
        c.line(xl,Y-120*e,xl,Y+40,k,3); c.lab('límite',xl,Y-140,fade(t,T1)*k*.95,size=20)
        c.lab('desde el límite: 00',X1,Y+50,fade(t,T1+.8)*k*.9,'rm',20)
        c.text('Lo que no toleras, se acaba.',CX,1200,fade(t,8.4)*k,26)
N2['30']=dict(fn=e30,inv=False,ticks=EV,pops=[3.0,6.2],whoosh=[],
 title='Lo que toleras, se repite.',cap='Lo que toleras, se repite.\nPon el límite.')

def make(day,prev=None):
    S=N2[day]; fr=run(S['fn'],S['inv'],int(day)*23)
    f=lambda t: fr(t,S['pops'])
    if prev:
        ims=[Image.fromarray(f(t)).resize((300,533)) for t in prev]; s=Image.new('RGB',(300*len(prev),533)); [s.paste(im,(i*300,0)) for i,im in enumerate(ims)]
        s.save(f'/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/w{day}.jpg'); return
    return encode(f'c11{day}-d',DUR,f,S['ticks'],S['pops'],S['whoosh'])
if __name__=='__main__':
    if sys.argv[1]=='prev':
        ts=[float(x) for x in sys.argv[3].split(',')]; make(sys.argv[2],ts)
    else:
        for d in sys.argv[2:]: print(make(d))
