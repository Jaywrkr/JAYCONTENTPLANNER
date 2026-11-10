import sys; sys.path.insert(0,'/home/claude/rv'); from lib import *
CX=540
def fade(t,a,b,d=.35): return ease((t-a)/d)*(1-ease((t-b)/d)) if b else ease((t-a)/d)
N={}  # day -> (dur, inv, fn, ticks, pops, whoosh)

# 11 · Wald: los aviones que volvieron
HITS=[(-150,0),(-120,14),(-60,-10),(110,8),(150,-6),(70,16),(-200,4),(190,12),(0,120),(8,170),(-6,230),(4,60),(-90,-6),(220,-4),(0,300),(-10,330)]
def f11(c,t):
    y0=900
    a=fade(t,.2,0)
    # fuselaje, alas, cola (solo rectángulos)
    c.rect(CX-22,y0-170,CX+22,y0+360,a)
    c.rect(CX-270,y0-24,CX+270,y0+24,a)
    c.rect(CX-110,y0+300,CX+110,y0+330,a)
    eng=[(CX-160,y0+40),(CX+160,y0+40)]
    for ex,ey in eng: c.rect(ex-16,ey,ex+16,ey+44,a)
    for k,(dx,dy) in enumerate(HITS):
        on=ease((t-.9-k*.12)/.1)*(1-.65*ease((t-6.4)/.5)); x=CX+dx; y=y0+dy
        c.rect(x-5,y-5,x+5,y+5,on,fill=True)
    c.text('Aviones que volvieron con balas.',CX,560,fade(t,.3,3.6))
    c.text('¿Dónde los reforzarías?',CX,560,fade(t,3.9,6.2))
    if t>6.4:
        f=ease((t-6.4)/.5)
        for ex,ey in eng: c.rect(ex-16,ey,ex+16,ey+44,f,fill=True)
        c.rect(CX-22,y0-170,CX+22,y0-110,f,fill=True)
    c.text('Donde NO hay balas.',CX,560,fade(t,6.4,0))
    c.text('Los que recibieron ahí no volvieron.',CX,1330,fade(t,7.6,0),28)
    c.text('No mires solo a los que llegaron.',CX,1390,fade(t,9.6,0),28)
    c.text('Abraham Wald · 1943',CX,1460,fade(t,9.6,0)*.55,20,FR)
N['11']=(13,False,f11,[.9+k*.12 for k in range(16)],[6.4],[3.8],
 'Por qué los aviones se reforzaban donde NO había balas',
 'Los consejos de los que llegaron no cuentan la historia completa.\nLos que cayeron no la pueden contar.')

# 14 · cumpleaños: 23 personas, 253 parejas
def f14(c,t):
    c.text('23 personas en un cuarto.',CX,520,fade(t,.3,3.4))
    c.text('¿Dos cumplen el mismo día?',CX,580,fade(t,1.4,3.4),28)
    # fila de 23
    a0=fade(t,.6,3.6)
    for k in range(23):
        x=CX-(23*38-10)/2+k*38; c.rect(x,760,x+28,788,a0*ease((t-.6-k*.04)/.1))
    # matriz de parejas (triángulo 22x22)
    s=20; g=2; n=22; X0=CX-(n*(s+g))/2; Y0=640
    cnt=0
    if t>3.6:
        c.text('No son 23 personas.',CX,520,fade(t,3.8,0))
        for i in range(n):
            for j in range(i+1):
                idx=i*(i+1)//2+j; on=ease((t-4.0-idx*.011)/.08)
                if on>0: cnt+=1; c.rect(X0+j*(s+g),Y0+i*(s+g),X0+j*(s+g)+s,Y0+i*(s+g)+s,on*.85,fill=True)
        c.text(f'{cnt} parejas',CX+150,Y0+130,fade(t,4.0,0)*.8,30,anchor='mm')
    c.text('Son 253 parejas.',CX,1200,fade(t,7.2,0))
    c.text('Probabilidad: 50,7 %',CX,1270,fade(t,8.4,0),28)
    c.text('Piensa en conexiones, no en personas.',CX,1380,fade(t,10.0,0),26)
N['14']=(13,True,f14,[.6+k*.04 for k in range(0,23,2)]+[4.0+k*.25 for k in range(11)],[7.2],[3.6],
 '23 personas. 50 % de que dos cumplan el mismo día.',
 'No son 23 personas. Son 253 parejas.\nPor eso pasa más de lo que crees.')

# 18 · paradoja de la amistad
ROWS=[[1,0,1,0,0,1],[1,1,0,0,1,0],[0,1,1,0,1,0],[1,0,0,1,0,0],[1,0,1,1,0,1],[0,0,0,1,1,0]]
def f18(c,t):
    c.text('Tus amigos tienen más amigos que tú.',CX,520,fade(t,.3,0),30)
    c.text('lista de amigos de cada persona',CX,640,fade(t,1.0,0)*.55,20,FR)
    for r,row in enumerate(ROWS):
        y=690+r*70; on=ease((t-1.2-r*.35)/.25)
        c.text(f'P{r+1}',CX-300,y+22,on*.55,20,FR,'lm')
        # amigo popular siempre presente salvo en la fila 6
        pop=r<5; pos=2 if pop else -1
        for k in range(6):
            x=CX-220+k*72
            if k==pos:
                f=ease((t-4.8)/.4)
                c.rect(x,y,x+44,y+44,on*(.5+.5*f),fill=f>0.5)
            elif row[k]: c.rect(x,y,x+44,y+44,on*.45)
    c.text('El popular aparece en casi todas.',CX,1170,fade(t,5.0,0),28)
    c.text('Por eso, en promedio, tus amigos',CX,1260,fade(t,7.2,0),28)
    c.text('tienen más amigos que tú.',CX,1310,fade(t,7.2,0),28)
    c.text('No es que estés solo. Es matemática.',CX,1400,fade(t,9.4,0),28)
    c.text('Scott Feld · 1991',CX,1460,fade(t,9.4,0)*.55,20,FR)
N['18']=(13,False,f18,[1.2+r*.35 for r in range(6)],[4.8],[],
 'Por qué tus amigos tienen más amigos que tú',
 'No es que estés solo. Es matemática.\nMándaselo a quien se compara en redes.')

# 21 · regresión a la media
V=[.1,-.3,.2,-1.0,.15,-.1,.35,.95,-.05,.1,-.25,.2]
def f21(c,t):
    yM=900; X0=CX-330; dx=60
    c.rect(X0-20,yM,X0+12*dx,yM+2,fade(t,.3,0)*.4,fill=True)
    c.text('tu promedio',X0+12*dx,yM+30,fade(t,.3,0)*.5,20,FR,'rm')
    for k,v in enumerate(V):
        on=ease((t-.6-k*.28)/.12); x=X0+k*dx; y=yM-v*220
        hi=(k in (3,4) and t>4.2) or (k in (7,8) and t>6.6)
        c.rect(x-12,y-12,x+12,y+12,on*(1 if hi else .55),fill=hi or on<.99 and False)
    c.text('regaño',X0+3*dx,yM+290,fade(t,4.2,0)*.8,22,FR)
    c.text('elogio',X0+7*dx,yM-280,fade(t,6.6,0)*.8,22,FR)
    c.text('Tus resultados, día a día.',CX,520,fade(t,.3,4.0),28)
    c.text('Después del regaño, mejora.',CX,520,fade(t,4.4,6.4),28)
    c.text('Después del elogio, empeora.',CX,520,fade(t,6.8,9.0),28)
    c.text('Habría pasado igual.',CX,520,fade(t,9.2,0))
    c.text('Tras un extremo, casi siempre viene lo normal.',CX,1300,fade(t,9.8,0),24)
    c.text('No fue tu regaño. Fue el promedio.',CX,1370,fade(t,10.8,0),28)
    c.text('Kahneman · regresión a la media',CX,1440,fade(t,10.8,0)*.55,20,FR)
N['21']=(14,True,f21,[.6+k*.28 for k in range(12)],[4.2,6.6],[9.0],
 'Por qué parece que regañar funciona mejor que elogiar',
 'No fue tu regaño. Fue el promedio.\nMándaselo a quien cree que la presión funciona.')

# 25 · paradoja de la inspección (bus)
BUS=[0,4,8,12,16,40]  # minutos; huecos 4,4,4,4,24 → promedio 8
ARR=np.random.default_rng(25).uniform(0,40,22)
def f25(c,t):
    X0=CX-360; S=18; y=900
    a=fade(t,.3,0)
    c.rect(X0,y,X0+40*S,y+2,a*.4,fill=True)
    for k,m in enumerate(BUS):
        on=ease((t-.5-k*.25)/.15); x=X0+m*S; c.rect(x-6,y-60,x+6,y,on,fill=True)
    c.text('Un bus cada 8 min, en promedio.',CX,520,fade(t,.3,3.6),30)
    c.text('Esperarías 4. Esperas 8.',CX,520,fade(t,3.8,0),30)
    long=0
    for k,m in enumerate(ARR):
        on=ease((t-2.4-k*.12)/.1)
        if on<=0: continue
        x=X0+m*S; inL=m>16; long+=inL
        f=ease((t-5.6)/.4)
        c.rect(x-5,y+30+(k%4)*18,x+5,y+40+(k%4)*18,on*(1 if (inL and f>0) else .45),fill=True)
    if t>5.6:
        f=ease((t-5.6)/.4); c.rect(X0+16*S,y-90,X0+40*S,y+120,f*.8)
        c.text(f'{int(round(100*24/40))} % de las veces llegas aquí',X0+28*S,y+160,f*.8,22,FR)
    c.text('Llegas más veces cuando el hueco es grande.',CX,1300,fade(t,7.4,0),24)
    c.text('No es mala suerte. Es estadística.',CX,1370,fade(t,9.2,0),28)
    c.text('paradoja de la inspección',CX,1440,fade(t,9.2,0)*.55,20,FR)
N['25']=(12,False,f25,[.5+k*.25 for k in range(6)]+[2.4+k*.24 for k in range(11)],[5.6],[3.6],
 'Por qué siempre esperas el bus más de lo que deberías',
 'No es mala suerte. Llegas más veces cuando el hueco es grande.\nMándaselo a quien siempre dice que el bus nunca llega.')

# 28 · tiempo con tus padres
def f28(c,t):
    s=40; g=8; X0=CX-(10*(s+g)-g)/2; Y0=640
    c.text('Tiempo en persona con tus padres:',CX,520,fade(t,.3,0),28)
    k_on=int(max(0,min(93,(t-1.0)*26)))
    for k in range(100):
        r,q=divmod(k,10); x=X0+q*(s+g); y=Y0+r*(s+g)
        if k<k_on: c.rect(x,y,x+s,y+s,.9,fill=True)
        else:
            on=fade(t,.6,0)
            if k>=93 and t>5.0: on=.55+.45*abs(np.sin((t-5.0)*2.2))
            c.rect(x,y,x+s,y+s,on*.7)
    yl=Y0+10*(s+g)+30
    c.text(f'{min(93,k_on)} % usado a los 18 años',CX,yl,fade(t,1.0,0)*.8,22,FR)
    c.text('Te queda el 7 %.',CX,yl+90,fade(t,5.2,0))
    c.text('No te queda poca vida. Te queda poco de esto.',CX,yl+160,fade(t,7.0,0),24)
    c.text('estimación · Tim Urban, Wait But Why',CX,yl+220,fade(t,7.0,0)*.55,20,FR)
N['28']=(12,True,f28,[1.0+k*.4 for k in range(10)],[5.0],[],
 'A los 18 ya usaste el 93 % del tiempo con tus padres',
 'No te queda poca vida. Te queda poco de esto.\nLlámalos hoy.')

def make(day,prev=False):
    dur,inv,fn,ticks,pops,wh=N[day][:6]; bl=blobset(int(day)*13)
    def frame(t):
        pulse=sum(0.22*np.exp(-((t-p-.1)/0.3)**2) for p in pops)
        c=Ctx(t,inv,bl,pulse); fn(c,t); return c.out()
    if prev:
        ts=[dur*x for x in (.25,.5,.75,.97)]
        ims=[Image.fromarray(frame(t)).resize((270,480)) for t in ts]; s=Image.new('RGB',(1080,480)); [s.paste(im,(i*270,0)) for i,im in enumerate(ims)]; return s
    return encode(f'c11{day}-idea',dur,frame,ticks,pops,wh)
if __name__=='__main__':
    days=sys.argv[2:] if len(sys.argv)>2 else sorted(N)
    if sys.argv[1]=='prev':
        sheet=Image.new('RGB',(1080,480*len(days)))
        for i,d in enumerate(days): sheet.paste(make(d,True),(0,i*480))
        sheet.save('/home/claude/rv/ideas-sheet.jpg')
    else:
        for d in days: print(make(d))
