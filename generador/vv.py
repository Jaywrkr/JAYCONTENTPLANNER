import sys; sys.path.insert(0,'/home/claude/rv'); from lib import *
CX=540; DUR=18; END=15.6   # a partir de END se limpia y queda "simple."
def fade(t,a,b=0,d=.4): return ease((t-a)/d)*(1-ease((t-b)/d)) if b else ease((t-a)/d)
def eback(x):
    x=max(0.,min(1.,x)); c1=1.4; c3=c1+1; return 1+c3*(x-1)**3+c1*(x-1)**2

class V(Ctx):
    def line(s,x0,y0,x1,y1,a=1,w=2):
        if a<=0.01: return
        s.d.line([(x0,y0),(x1,y1)],fill=s.c(a),width=w)
    def path(s,pts,p,a=1,w=2,head=True,hs=14):
        """ruta ortogonal dibujada hasta p∈[0,1]; devuelve la punta"""
        L=[abs(pts[i+1][0]-pts[i][0])+abs(pts[i+1][1]-pts[i][1]) for i in range(len(pts)-1)]
        tot=sum(L); rem=max(0,min(1,p))*tot; hx,hy=pts[0]
        for i,l in enumerate(L):
            if rem<=0: break
            q=min(1,rem/l) if l else 1; x0,y0=pts[i]; x1,y1=pts[i+1]
            hx,hy=x0+(x1-x0)*q,y0+(y1-y0)*q; s.line(x0,y0,hx,hy,a,w); rem-=l
        if head and p>0 and a>0.01: s.rect(hx-hs/2,hy-hs/2,hx+hs/2,hy+hs/2,a,fill=True)
        return hx,hy
    def node(s,x,y,a=1,size=14): s.rect(x-size/2,y-size/2,x+size/2,y+size/2,a,fill=True)
    def box(s,x,y,size=40,a=1,fill=False): s.rect(x-size/2,y-size/2,x+size/2,y+size/2,a,fill=fill,w=2)
    def lab(s,txt,x,y,a=.6,anchor='mm',size=22): s.text(txt,x,y,a,size,FR if a>.75 else FL,anchor)
    def phrase(s,lines,y=600,a=1,size=32,lh=46):
        for i,l in enumerate(lines): s.text(l,CX,y+i*lh,a,size)

def chrome2(c,t):
    im,d=c.im,c.d
    col=lambda x,y,k: adapt(im,x,y,k)
    d.text((90,250),'@jaywrkr',font=F(FR,26),fill=col(120,250,.85),anchor='lm')
    sec=int(t); fr=int((t-sec)*30)
    d.text((990,250),f'00:{sec:02d}:{fr:02d}',font=F(FR,26),fill=col(950,250,.85),anchor='rm')
    n=57; p=t/DUR
    for k in range(n):
        x=90+k*(900/(n-1)); h=22 if k%8==0 else 12
        on=k/(n-1)<=p
        d.line([(x,1605-h/2),(x,1605+h/2)],fill=col(x,1605,.85 if on else .25),width=2)

def run(fn,inv,seed):
    bl=blobset(seed)
    def frame(t,pops=()):
        pulse=sum(0.2*np.exp(-((t-p-.1)/0.3)**2) for p in pops)
        c=V(t,inv,bl,pulse)
        k=1-ease((t-END)/.6)
        if k>0.01: fn(c,t,k)
        c.text('simple.',CX,900,fade(t,END+.7),34,FR)
        chrome2(c,t); return finish(c.im)
    return frame
N={}

# ── 11 · Nadie viene a salvarte.
def f11(c,t,k):
    c.phrase(['Nadie viene a salvarte.'],a=fade(t,.4)*k)
    c.text('Sales tú. O no sales.',CX,646,fade(t,10.4)*k,32)
    # pozo
    X0,X1,Y0,Y1=340,740,800,1160
    a=fade(t,1.0)*k
    c.line(140,Y0,X0,Y0,a*.5); c.line(X1,Y0,940,Y0,a*.5)
    c.line(X0,Y0,X0,Y1,a*.5); c.line(X1,Y0,X1,Y1,a*.5); c.line(X0,Y1,X1,Y1,a*.5)
    c.lab('afuera',190,Y0-30,a*.5*(1-fade(t,11.6)),'lm')
    # tú
    tx,ty=CX,Y1-30
    # ayuda: nodos que pasan por arriba sin bajar
    for j in range(4):
        t0=2.0+j*1.6; q=(t-t0)/2.2
        if 0<q<1: x=lerp(120,960,q); c.box(x,Y0-30,22,a*.8)
    if 2.0<t<8.6: c.lab('pasan, no bajan',CX,Y0-70,fade(t,2.4,8.2)*k*.6)
    dd=int(max(0,min(365,(t-1.4)*52))) if t<8.6 else 365
    c.lab(f'esperando · día {dd:03d}',X0,Y1+60,a*fade(t,1.4,8.8)*.7,'lm')
    # sale: escalera propia
    st=[(tx,ty),(480,ty),(480,ty-90),(420,ty-90),(420,ty-180),(360,ty-180),(360,ty-270),(360,Y0),(180,Y0)]
    p=ease((t-8.8)/3.6)
    if p>0:
        hx,hy=c.path(st,p,k,2,True,18)
        c.lab('por tu cuenta',X0,Y1+60,fade(t,9.0)*k*.9,'lm')
        if p>=1: c.box(180,Y0,40,k); c.lab('saliste',180,Y0+52,fade(t,12.5)*k*.9)
    else:
        c.node(tx,ty,a,18); c.lab('tú',tx,ty+40,a*.8)
N['11']=dict(fn=f11,inv=True,ticks=[2.0+j*1.6 for j in range(4)]+[8.8+i*.5 for i in range(7)],pops=[10.4],whoosh=[8.6],
 title='Nadie viene a salvarte.',cap='Nadie viene a salvarte.\nMándaselo a quien sigue esperando.')

# ── 14 · Tu celular se carga cada noche. Tú no.
def f14(c,t,k):
    c.phrase(['Tu celular se carga cada noche.'],a=fade(t,.4)*k)
    c.text('Tú no.',CX,646,fade(t,11.4)*k,32)
    a=fade(t,.9)*k; X0,X1=230,850; T0=1.6; D=1.9
    days=['lun','mar','mié','jue','vie']
    i=int((t-T0)//D) if t>T0 else 0; ph=((t-T0)%D)/D if t>T0 else 0
    if t>=T0+5*D: i,ph=4,1.0
    yl=[.82,.66,.52,.38,.25,.14]
    d=ease(min(1,ph/.6)); n=ease(max(0,(ph-.6)/.4))
    phone=1-.78*d+.78*n if t>T0 else 1
    you=(yl[i]-(yl[i]-yl[i+1]-.05)*d+.05*n) if t>T0 else yl[0]
    for r,(lab,v,yy) in enumerate([('celular',phone,860),('tú',you,1000)]):
        c.lab(lab,X0,yy-34,a*.6,'lm'); c.lab(f'{int(round(v*100))} %',X1,yy-34,a*(.95 if r else .6),'rm')
        c.rect(X0,yy,X1,yy+14,a*.35)
        c.rect(X0,yy,X0+(X1-X0)*v,yy+14,a*(1 if r else .7),fill=True)
    # días
    for j,dn in enumerate(days):
        x=X0+j*(X1-X0)/4; on=1 if (t>T0+j*D) else .3
        c.box(x,1130,18,a*on,fill=(t>T0+(j+1)*D-.01) or (j<i)); c.lab(dn,x,1170,a*on*.7)
    night=t>T0 and ph>.6 and t<T0+5*D
    c.lab('noche · celular al cargador' if night else 'día',CX,1240,a*fade(t,T0,T0+5*D)*.6)
    c.lab(f'tú · {int(round(you*100))} %  ·  y bajando',CX,1240,fade(t,T0+5*D+.3)*k*.9)
N['14']=dict(fn=f14,inv=False,ticks=[1.6+j*1.9+1.14 for j in range(5)],pops=[11.4],whoosh=[],
 title='Tu celular se carga cada noche. Tú no.',cap='Tu celular se carga cada noche. Tú no.\nMándaselo a quien vive con el 10 %.')

# ── 18 · En 5 años vas a tener 5 años más.
def f18(c,t,k):
    c.phrase(['En 5 años vas a tener 5 años más.'],a=fade(t,.4)*k,size=30)
    c.text('La edad llega sola. Lo demás no.',CX,646,fade(t,11.6)*k,30)
    a=fade(t,.9)*k; X0,X1,YB=200,880,1160; T0=1.8; D=1.6
    c.line(X0,YB,X1,YB,a*.4)
    for j in range(6):
        x=X0+j*(X1-X0)/5; c.line(x,YB,x,YB+12,a*.4); c.lab(str(2026+j),x,YB+44,a*.55,size=20)
    p=max(0,min(1,(t-T0)/(5*D)))
    # edad: sube sola, escalón por año
    pts=[(X0,YB-40)]
    for j in range(5):
        x=X0+(j+1)*(X1-X0)/5; y=YB-40-(j+1)*58
        pts+= [(x,pts[-1][1]),(x,y)]
    hx,hy=c.path(pts,p,a,2,True,14)
    c.lab('edad · automático',X1+10,YB-40-5*58-34,fade(t,T0+5*D-.4)*k*.9,'rm')
    # lo demás: plano
    c.path([(X0,YB-40),(X1,YB-40)],p,a*.5,2,True,14)
    c.lab('lo demás · si no haces nada',X1,YB-74,fade(t,T0+5*D-.4)*k*.6,'rm')
    yr=2026+int(min(5,max(0,(t-T0)//D+ (1 if t>T0 else 0)))) if t>T0 else 2026
    c.lab(f'{min(yr,2031)}',CX,780,a*.9,size=26)
N['18']=dict(fn=f18,inv=True,ticks=[1.8+j*1.6 for j in range(6)],pops=[11.6],whoosh=[],
 title='En 5 años vas a tener 5 años más.',cap='La edad llega sola. Lo demás no.\nMándaselo a quien dice “algún día”.')

# ── 21 · “Después te llamo.”
CALLS=[0,.08,.18,.30,.45,.65,.92]   # posición en la línea: cada vez más separadas
def f21(c,t,k):
    c.phrase(['“Después te llamo.”'],a=fade(t,.4)*k)
    c.text('Después no es infinito.',CX,646,fade(t,11.8)*k,32)
    a=fade(t,.9)*k; X0,X1,Y=180,900,960; T0=1.6
    p=ease(max(0,min(1,(t-T0)/8.5)))
    c.path([(X0,Y),(X0+(X1-X0)*p,Y)],1,a*.45,2,False)
    shown=0
    for j,q in enumerate(CALLS):
        x=X0+(X1-X0)*q; on=p>=q-1e-6
        if not on: continue
        shown+=1; e=ease((p-q)*12)
        c.box(x,Y,26,a)
        c.line(x-13,Y-34,x+13,Y-34,a*.9*e) if False else None
        if j==0: c.lab('mamá llama',x,Y-42,a*.55*e,'lm',size=18)
        last=j
    if shown and t<T0+8.6:
        xl=X0+(X1-X0)*CALLS[last]; c.lab('“después”',xl,Y+44,a*.85,size=18)
    # fin de la línea
    if t>T0+8.5:
        e=fade(t,T0+8.6); c.line(X1,Y-40,X1,Y+40,e*k)
        c.lab('ya no llama',X1,Y+80,e*k*.9,'rm')
    c.lab(f'llamadas: {shown:02d}  ·  contestadas: 00',CX,1160,a*.7)
    c.lab('cada vez llama menos',CX,1210,fade(t,6.4,0)*k*.6)
N['21']=dict(fn=f21,inv=False,ticks=[1.6+8.5*q for q in CALLS],pops=[11.8],whoosh=[],
 title='“Después te llamo.”',cap='Después no es infinito.\nLlama hoy.')

# ── 25 · Prioridades
_r=np.random.default_rng(4); ORD=[]
for row in range(3):
    cols=list(range(7)); _r.shuffle(cols); ORD+= [(row,int(cc)) for cc in cols]
def f25(c,t,k):
    c.phrase(['Si no eliges tus prioridades,'],a=fade(t,.4)*k,size=30)
    c.text('otros las eligen por ti.',CX,646,fade(t,10.6)*k,30)
    a=fade(t,.9)*k; S=64; G=14; X0=CX-(7*S+6*G)/2; Y0=900
    for j,dn in enumerate(['l','m','m','j','v','s','d']): c.lab(dn,X0+j*(S+G)+S/2,Y0-36,a*.5,size=20)
    filled=0
    for idx,(r,col) in enumerate(ORD):
        x=X0+col*(S+G); y=Y0+r*(S+G)
        c.rect(x,y,x+S,y+S,a*.35)
        t0=1.8+idx*.26; q=ease((t-t0)/.3)
        if q>0:
            filled+=1; yy=lerp(y-180,y,q); c.rect(x+8,yy+8,x+S-8,yy+S-8,a*.55*q,fill=True)
    c.lab(f'libre: {21-filled:02d}',X0,Y0+3*(S+G)+30,a*.7,'lm',20)
    c.lab('reuniones · favores · urgencias',X0+7*S+6*G,Y0+3*(S+G)+30,a*.45,'rm',20)
    # lo tuyo
    q=(t-8.0)/2.0; bx,by=CX,790
    if q>0:
        if q<.4: by=lerp(790,Y0-6,ease(q/.4))
        elif q<.6: by=Y0-6-50*np.sin((q-.4)/.2*np.pi)
        else: bx=CX+ease((q-.6)/.4)*720; by=Y0-6+ease((q-.6)/.4)**2*500
    c.rect(bx-S/2,by-S/2,bx+S/2,by+S/2,a,fill=True)
    c.lab('lo tuyo',bx,by-56,a*.9*(1-ease((q-.7)/.2)) if q>0 else a*.9,size=20)
N['25']=dict(fn=f25,inv=True,ticks=[1.8+i*.26 for i in range(21)],pops=[8.8],whoosh=[9.2],
 title='Si no eliges tus prioridades, otros las eligen por ti.',cap='Si no eliges tus prioridades, otros las eligen por ti.\nMándaselo a quien nunca tiene tiempo para lo suyo.')

# ── 28 · Quedarte también es decisión
def f28(c,t,k):
    c.phrase(['Quedarte donde estás'],a=fade(t,.4)*k)
    c.text('también es una decisión.',CX,646,fade(t,10.6)*k,32)
    a=fade(t,.9)*k; J=(CX,960)
    A=(220,820); B=(860,820)
    c.path([J,(J[0],A[1]),A],ease((t-1.2)/1.2),a*.4,2,False); c.box(A[0],A[1],40,a*.6); c.lab('opción a',A[0],A[1]-50,a*.6)
    c.path([J,(J[0],B[1]),B],ease((t-1.2)/1.2),a*.4,2,False); c.box(B[0],B[1],40,a*.6); c.lab('opción b',B[0],B[1]-50,a*.6)
    # nodo quieto, luego arrastrado por "el tiempo"
    T0=4.6; p=ease((t-T0)/4.4)
    C=(CX,1220)
    if p>0:
        c.path([J,C],p,k,2,True,18); c.box(C[0],C[1],40,fade(t,T0+.2)*k*.8)
        c.lab('lo mismo',C[0]+40,C[1],fade(t,T0+.2)*k*.8,'lm')
        c.lab('sin decidir',C[0]-40,(J[1]+C[1])/2,fade(t,T0+1.0)*k*.6,'rm')
    else:
        c.node(J[0],J[1],a,18); c.lab('esperando el momento',J[0]+30,J[1]+4,fade(t,1.6,T0)*k*.6,'lm')
    yrs=int(max(0,(t-T0)*1.1)) if t>T0 else 0
    c.lab(f'tiempo pasando · {min(yrs,5)} años',CX,1300,fade(t,T0)*k*.6)
N['28']=dict(fn=f28,inv=False,ticks=[1.2,1.3],pops=[10.6],whoosh=[4.6],
 title='Quedarte donde estás también es una decisión.',cap='Quedarte donde estás también es una decisión.\nMándaselo a quien sigue esperando el momento.')

def make(day,prev=None):
    S=N[day]; fr=run(S['fn'],S['inv'],int(day)*19)
    f=lambda t: fr(t,S['pops'])
    if prev:
        ims=[Image.fromarray(f(t)).resize((360,640)) for t in prev]; s=Image.new('RGB',(360*len(prev),640)); [s.paste(im,(i*360,0)) for i,im in enumerate(ims)]
        s.save(f'/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/v{day}.jpg'); return
    return encode(f'c11{day}-vv',DUR,f,S['ticks'],S['pops'],S['whoosh'])
if __name__=='__main__':
    if sys.argv[1]=='prev':
        ts=[float(x) for x in sys.argv[3].split(',')]; make(sys.argv[2],ts)
    else:
        for d in sys.argv[2:]: print(make(d))
