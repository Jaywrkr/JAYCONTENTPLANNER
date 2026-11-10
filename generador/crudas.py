import sys; sys.path.insert(0,'/home/claude/rv'); from lib import *
CX=540
def fade(t,a,b=0,d=.35): return ease((t-a)/d)*(1-ease((t-b)/d)) if b else ease((t-a)/d)
def eback(x):
    x=max(0.,min(1.,x)); c1=1.70158; c3=c1+1; return 1+c3*(x-1)**3+c1*(x-1)**2
def hop(p,h):  # salto parabólico
    p=max(0.,min(1.,p)); return -4*h*p*(1-p)

def person(c,x,yf,h=140,a=1,arm=0,walk=None,look=0,sit=0):
    """Pictograma de ángulos rectos. x centro, yf = pies. arm: 0 abajo, 1 brazo derecho arriba, 2 ambos.
    walk: fase (rad) para caminar. look: desplaza la cabeza arriba (mirar arriba)."""
    if a<=0.01: return
    hs=.2*h; tw=.3*h; th=.36*h; lw=.11*h; lh=.34*h*(1-.45*sit); aw=.085*h; ah=.32*h
    yl=yf-lh; yt=yl-th; yh=yt-.05*h-hs-look*.04*h
    # piernas
    o1=o2=0
    if walk is not None: o1=.09*h*np.sin(walk); o2=-o1
    c.rect(x-tw/2+o1,yl,x-tw/2+lw+o1,yf,a,fill=True)
    c.rect(x+tw/2-lw+o2,yl,x+tw/2+o2,yf,a,fill=True)
    # torso y cabeza
    c.rect(x-tw/2,yt,x+tw/2,yl+2,a,fill=True)
    c.rect(x-hs/2,yh,x+hs/2,yh+hs,a,fill=True)
    # brazos
    gx=.04*h
    L=(x-tw/2-gx-aw, x-tw/2-gx); R=(x+tw/2+gx, x+tw/2+gx+aw)
    if arm>=2: c.rect(L[0],yt-ah+.06*h,L[1],yt+.06*h,a,fill=True)
    else: c.rect(L[0],yt+.02*h,L[1],yt+.02*h+ah,a,fill=True)
    if arm>=1: c.rect(R[0],yt-ah+.06*h,R[1],yt+.06*h,a,fill=True)
    else: c.rect(R[0],yt+.02*h,R[1],yt+.02*h+ah,a,fill=True)

def block(c,x,y,s,p,a=1,fill=True):
    """bloque que aparece con rebote; x,y esquina sup-izq final"""
    if p<=0: return
    k=eback(p); cx,cy=x+s/2,y+s/2; r=s/2*k
    c.rect(cx-r,cy-r,cx+r,cy+r,a*min(1,p*3),fill=fill)

N={}

# ─────────────────────────────── 11 · Nadie viene a salvarte
def f11(c,t):
    G=760; L,R=240,840; S=100; B=G+5*S
    a=fade(t,.1)
    c.rect(90,G,L,B+30,a,fill=True); c.rect(R,G,990,B+30,a,fill=True); c.rect(L,B,R,B+30,a,fill=True)
    # escalera: columna i (de derecha a izquierda) con altura i+1
    order=[]
    for i in range(5):
        for j in range(i+1): order.append((L+(4-i)*S, B-(j+1)*S))
    TB=6.0
    for k,(x,y) in enumerate(order): block(c,x+3,y+3,S-6,(t-TB-k*.2)/.3,a)
    TC=TB+len(order)*.2+.3; HP=.45
    px,yf,look,arm,walk=790,B,0,0,None
    if t<5.4: look=1; arm=1 if (1.0<t<4.8 and int(t*3)%2==0) else 0
    if t>=TC:
        tt=t-TC; i=int(tt//HP)
        if i<5:
            p=(tt-i*HP)/HP
            x0=790 if i==0 else L+(4-(i-1))*S+S/2; y0=B if i==0 else B-i*S
            x1=L+(4-i)*S+S/2; y1=B-(i+1)*S
            px=lerp(x0,x1,ease(p)); yf=lerp(y0,y1,ease(p))+hop(p,60)
        else:
            q=tt-5*HP; px=L+S/2-ease(q/1.0)*(L+S/2-140); yf=G; walk=q*12 if q<1.0 else None
    person(c,px,yf,130,a,arm=arm,walk=walk,look=look)
    if 2.0<t<5.4:
        if t<3.0: wx=lerp(110,195,ease((t-2.0)/1.0)); wk=t*12
        elif t<4.2: wx=195; wk=None
        else: wx=lerp(195,110,ease((t-4.2)/1.0)); wk=t*12
        person(c,wx,G,130,fade(t,2.0,5.0,.4),walk=wk,look=-1 if 3.0<t<4.2 else 0)
    c.text('Esperas que alguien venga.',CX,540,fade(t,.3,5.2),30)
    c.text('Nadie viene a salvarte.',CX,540,fade(t,5.6),40)
    c.text('Sales tú. O no sales.',CX,1400,fade(t,TC+5*HP+.4),28)
N['11']=dict(dur=14,inv=True,fn=f11,ticks=[6.0+k*.2 for k in range(15)]+[9.3+k*.45 for k in range(5)],pops=[5.6],whoosh=[2.0],
 title='Nadie viene a salvarte.',cap='Nadie viene a salvarte.\nMándaselo a quien sigue esperando.')

# ─────────────────────────────── 14 · Tu celular se carga cada noche. Tú no.
def battery(c,x,y,w,h,lvl,a=1,label=''):
    c.rect(x,y,x+w,y+h,a,w=5); c.rect(x+w*.32,y-22,x+w*.68,y,a,fill=True)
    pad=14; ih=(h-2*pad)*max(0,min(1,lvl))
    c.rect(x+pad,y+h-pad-ih,x+w-pad,y+h-pad,a,fill=True)
    c.text(f'{int(round(lvl*100))} %',x+w/2,y+h+50,a*.8,30)
    if label: c.text(label,x+w/2,y-70,a*.6,22,FR)
def f14(c,t):
    days=['LUN','MAR','MIÉ','JUE','VIE']; T0=1.2; D=1.9
    k=int((t-T0)//D); ph=((t-T0)%D)/D
    phone=1.0; you=.8
    if t>=T0:
        k=min(k,4)
        # cada día: drena 0–.6, carga noche .6–1
        yl=[.8,.62,.48,.34,.22,.12]
        for i in range(k): pass
        if k<5:
            d=ease(min(1,ph/.6)); n=ease(max(0,(ph-.6)/.4))
            phone=1-.8*d+.8*n
            y0=yl[k]; y1=yl[k+1]
            you=y0-(y0-y1-.06)*d+.06*n if ph<1 else y1
        if t>=T0+5*D: phone=1; you=.12
    night=(t>=T0 and t<T0+5*D and ph>.6)
    lab=(days[min(k,4)] if t>=T0 else 'LUN')+('  ·  noche' if night else '  ·  día')
    c.text(lab,CX,600,fade(t,.3,T0+5*D)*.7,24,FR)
    a=fade(t,.2)
    battery(c,CX-300,780,200,360,phone,a,'celular')
    battery(c,CX+100,780,200,360,you,a*(1 if (t<T0+5*D or int(t*3)%2) else .35),'tú')
    if night:  # cable al celular
        c.rect(CX-300-140,954,CX-300,966,a,fill=True); c.rect(CX-300-150,940,CX-300-120,980,a,fill=True)
    c.text('Cada noche lo cargas al 100 %.',CX,520,fade(t,.3,T0+5*D),28)
    c.text('Tu celular se carga cada noche. Tú no.',CX,520,fade(t,T0+5*D+.2),28)
    c.text('¿Cuándo te cargas tú?',CX,1420,fade(t,T0+5*D+1.6),30)
N['14']=dict(dur=13.5,inv=False,fn=f14,ticks=[1.2+k*1.9+1.14 for k in range(5)],pops=[1.2+5*1.9+.2],whoosh=[],
 title='Tu celular se carga cada noche. Tú no.',cap='Tu celular se carga cada noche. Tú no.\nMándaselo a quien vive con el 10 %.')

# ─────────────────────────────── 18 · En 5 años
def f18(c,t):
    G=1240; a=fade(t,.1); S=70; Y0=1.4; DY=1.6
    c.rect(100,G,980,G+18,a,fill=True)
    yrs=int(max(0,min(5,(t-Y0)/DY+ (1 if t>Y0 else 0) -1))) if t>Y0 else 0
    yr=2026+min(5,int(max(0,(t-Y0)//DY)+ (1 if t>=Y0+DY*.5 else 0))) if t>Y0 else 2026
    n=min(5,int(max(0,(t-Y0+DY*.5)//DY)))
    c.text(str(2026+n),CX,720,a,96)
    # A quieto (izquierda)
    person(c,300,G,150,a)
    c.text('esperó',300,G+70,fade(t,Y0+5*DY)*.6,22,FR)
    # B construye escalones a la derecha
    bx=560
    for i in range(5):
        pb=(t-Y0-i*DY)/.4
        for j in range(i+1):
            block(c,bx+i*S,G-(j+1)*S,S-6,pb if j==i else (1 if pb>0 else 0),a)
    lvl=min(5,int(max(0,(t-Y0-.5)//DY)+1)) if t>Y0+.5 else 0
    # sube un escalón cada año
    tt=t-Y0-.5; i=int(tt//DY) if tt>0 else -1; p=(tt-i*DY)/.5 if tt>0 else 0
    if i<0: bxp,byf=bx-60,G
    else:
        i=min(i,4); x0=bx-60 if i==0 else bx+(i-1)*S+S/2; y0=G if i==0 else G-i*S
        x1=bx+i*S+S/2; y1=G-(i+1)*S
        if tt>=5*DY: x1,y1,p=bx+4*S+S/2,G-5*S,1
        bxp=lerp(x0,x1,ease(min(1,p))); byf=lerp(y0,y1,ease(min(1,p)))+hop(min(1,p),50)
    person(c,bxp,byf,150,a,arm=(2 if t>Y0+5*DY+.4 else 0))
    c.text('En 5 años vas a tener 5 años más.',CX,540,fade(t,.3,Y0+5*DY),28)
    c.text('La edad llega sola. Lo demás no.',CX,540,fade(t,Y0+5*DY+.2),32)
N['18']=dict(dur=13,inv=True,fn=f18,ticks=[1.4+k*1.6 for k in range(5)],pops=[1.4+5*1.6+.2],whoosh=[],
 title='En 5 años vas a tener 5 años más.',cap='La edad llega sola. Lo demás no.\nMándaselo a quien dice “algún día”.')

# ─────────────────────────────── 21 · Después los llamo
RINGS=[(.6,'Mamá','dom 8 nov'),(3.2,'Mamá','dom 22 nov'),(5.4,'Mamá','dic 2026'),(7.2,'Mamá','2028')]
def f21(c,t):
    a=fade(t,.1); W2,H2=170,330; y0=640
    ring=None
    for k,(t0,n,d) in enumerate(RINGS):
        if t0<=t<t0+1.7-k*.25: ring=(k,t0,n,d)
    sh=8*np.sin(t*60) if (ring and t-ring[1]<1.0-ring[0]*.15) else 0
    x=CX+sh
    c.rect(x-W2,y0,x+W2,y0+2*H2,a,w=5)
    c.rect(x-40,y0+22,x+40,y0+30,a,fill=True)
    date=None
    if ring:
        k,t0,n,d=ring; date=d
        c.text('llamada entrante',x,y0+160,.6,22,FR)
        c.text(n,x,y0+230,1,56)
        pr=ease((t-t0-1.0+k*.15)/.25)
        c.rect(x-110,y0+500,x-30,y0+580,1,fill=True)  # rechazar
        c.rect(x+30,y0+500,x+110,y0+580,1)            # contestar
        if pr>0: c.rect(x-124,y0+486,x-16,y0+594,pr,w=3)
    else:
        last=[r for r in RINGS if r[0]<=t]
        if last and t<RINGS[-1][0]+2.0:
            date=last[-1][2]; c.text('Llamada rechazada',x,y0+300,.7,24,FR)
            c.text('“Después te llamo.”',x,y0+360,.9,28)
        elif t>=RINGS[-1][0]+2.0:
            c.text('sin llamadas',x,y0+320,fade(t,RINGS[-1][0]+2.0)*.5,24,FR); date='2031'
    if date: c.text(date,CX,560,.7,26,FR)
    c.text('Cada vez llama menos.',CX,1420,fade(t,6.0,9.6),28)
    c.text('Después no es infinito.',CX,1420,fade(t,9.8),32)
    c.text('Llama hoy.',CX,1480,fade(t,11.2),28)
N['21']=dict(dur=13.5,inv=False,fn=f21,ticks=[r[0]+k*.12 for r in RINGS for k in range(6)],pops=[9.8],whoosh=[],
 title='“Después los llamo.”',cap='Después no es infinito.\nLlama hoy.')

# ─────────────────────────────── 25 · Prioridades
OTH0=[(0,'reunión'),(3,'favor'),(5,'urgente'),(1,'mensaje'),(6,'favor'),(2,'reunión'),(4,'pendiente'),(0,'urgente'),(5,'reunión'),(2,'favor'),(6,'mensaje'),(1,'urgente'),(3,'reunión'),(4,'favor')]
_lab=['reunión','favor','urgente','mensaje','pendiente']
_r=np.random.default_rng(3); OTH=[]
for row in range(3):
    cols=list(range(7)); _r.shuffle(cols)
    for k,col in enumerate(cols): OTH.append((int(col),_lab[(row*7+k)%5]))
def f25(c,t):
    a=fade(t,.1); X0=CX-7*62; CW=124; RH=110; Y0=780; rows=3
    for i,dn in enumerate(['L','M','M','J','V','S','D']):
        c.text(dn,X0+i*CW+CW/2,Y0-34,a*.6,22,FR)
    c.rect(X0,Y0,X0+7*CW,Y0+rows*RH,a,w=3)
    for i in range(1,7): c.rect(X0+i*CW,Y0,X0+i*CW+2,Y0+rows*RH,a*.25,fill=True)
    fill=[0]*7
    for k,(col,lab) in enumerate(OTH):
        t0=1.4+k*.27; p=ease((t-t0)/.4)
        if p<=0: continue
        r=fill[col]; fill[col]+=1
        if r>=rows: continue
        yt=Y0+(rows-1-r)*RH+6; yy=lerp(Y0-500,yt,p)+(8*np.sin((t-t0-.4)*20)*np.exp(-(t-t0-.4)*6) if p>=1 else 0)
        c.rect(X0+col*CW+6,yy,X0+(col+1)*CW-6,yy+RH-12,1,w=3)
        c.text(lab,X0+col*CW+CW/2,yy+(RH-12)/2,.8,18,FR)
    # tu bloque
    yb=600
    if t<7.6: yb=600+6*np.sin(t*3)
    pb=(t-7.6)/1.6
    bx=CX
    if pb>0:
        if pb<.35: yb=lerp(600,Y0-60,ease(pb/.35))
        elif pb<.55: yb=Y0-60-90*hop((pb-.35)/.2,1)*-1
        else: bx=CX+ease((pb-.55)/.45)*620; yb=Y0-60+ease((pb-.55)/.45)**2*700
    c.rect(bx-90,yb-40,bx+90,yb+40,a,fill=True)
    c.d.text((bx,yb),'lo tuyo',font=F(FR,24),fill=c.paper(),anchor='mm')
    c.text('Tu semana.',CX,520,fade(t,.3,9.4),30)
    c.text('Si no eliges tus prioridades,',CX,1300,fade(t,9.6),28)
    c.text('otros las eligen por ti.',CX,1350,fade(t,9.6),28)
N['25']=dict(dur=13,inv=True,fn=f25,ticks=[1.8+k*.27 for k in range(21)],pops=[8.5],whoosh=[8.9],
 title='Si no eliges tus prioridades, otros las eligen por ti.',cap='Si no eliges tus prioridades, otros las eligen por ti.\nMándaselo a quien nunca tiene tiempo para lo suyo.')

# ─────────────────────────────── 28 · Quedarte también es decisión
def f28(c,t):
    a=fade(t,.1); RW=140; jy=780
    # camino en T
    c.rect(CX-RW/2,jy,CX+RW/2,1500,a,w=4)
    c.rect(140,jy-RW,940,jy,a,w=4)
    c.rect(CX-RW/2+4,jy-4,CX+RW/2-4,jy+4,c.paper(),fill=False) if False else None
    c.text('←',190,jy-RW/2,a*.7,36); c.text('→',890,jy-RW/2,a*.7,36)
    # marcas del suelo que se mueven hacia abajo (cinta)
    mv=max(0,t-4.4)*90*ease((t-4.4)/1.0)
    for k in range(10):
        yy=jy+40+((k*90+mv)%800)
        if yy+40>1490: continue
        c.rect(CX-6,yy,CX+6,yy+40,a*.5,fill=True)
    # persona: quieta mirando el cruce; luego la cinta la arrastra
    drift=0 if t<4.4 else (t-4.4)*80*ease((t-4.4)/1.0)
    py=900+drift; h=130*(1-min(.35,drift/1400))
    person(c,CX,min(py,1460),h,a,look=1)
    c.text('Esperas el momento correcto.',CX,540,fade(t,.3,4.2),28)
    c.text('Pero el suelo se mueve igual.',CX,540,fade(t,4.4,8.4),28)
    c.text('Quedarte donde estás',CX,520,fade(t,8.6),32)
    c.text('también es una decisión.',CX,575,fade(t,8.6),32)
N['28']=dict(dur=12.5,inv=False,fn=f28,ticks=[],pops=[8.6],whoosh=[4.4],
 title='Quedarte donde estás también es una decisión.',cap='Quedarte donde estás también es una decisión.\nMándaselo a quien sigue esperando el momento.')

def make(day,prev=False):
    S=N[day]; dur=S['dur']; bl=blobset(int(day)*17)
    def frame(t):
        pulse=sum(0.22*np.exp(-((t-p-.1)/0.3)**2) for p in S['pops'])
        c=Ctx(t,S['inv'],bl,pulse); S['fn'](c,t); return c.out()
    if prev:
        ts=prev
        ims=[Image.fromarray(frame(t)).resize((360,640)) for t in ts]; s=Image.new('RGB',(360*len(ts),640)); [s.paste(im,(i*360,0)) for i,im in enumerate(ims)]; return s
    return encode(f'c11{day}-cruda',dur,frame,S['ticks'],S['pops'],S['whoosh'])
if __name__=='__main__':
    if sys.argv[1]=='prev':
        d=sys.argv[2]; ts=[float(x) for x in sys.argv[3].split(',')]
        make(d,ts).save(f'/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/p{d}.jpg')
    else:
        for d in sys.argv[2:]: print(make(d))
