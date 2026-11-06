import sys; sys.path.insert(0,'/home/claude/rv'); from lib import *
rng=np.random.default_rng(11)
N=30
# caos: rectángulos ortogonales
R=[(rng.uniform(260,820),rng.uniform(560,1160),rng.uniform(40,220),rng.uniform(30,160),rng.uniform(0,6.28)) for _ in range(N)]
# orden: grilla 6x5
gs,gg=44,16; gx0=W/2-(6*gs+5*gg)/2; gy0=860-(5*gs+4*gg)/2
GRID=[(gx0+(k%6)*(gs+gg),gy0+(k//6)*(gs+gg)) for k in range(N)]
blobs=[(.5,.45,.06,.05,.45,.38,0,.34,1.0),(.15,.8,.25,.15,.52,.41,1.7,.22,.75),(.88,.2,.2,.18,.47,.33,3.1,.2,.7),(.6,.95,.3,.08,.38,.55,4.2,.2,.6),(.1,.1,.15,.2,.6,.44,2.2,.16,.55)]
def frame(t):
    pulse=0.25*np.exp(-((t-6.2)/0.35)**2)
    bg=mesh(t,blobs,base=pulse).convert('RGB'); d=ImageDraw.Draw(bg); ink=(10,10,10)
    chrome(bg,d)
    # textos
    def txt(s,y,a,size=34): 
        if a>0: d.text((W/2,y),s,font=F(FL,size),fill=tuple(int(255-(245)*a*0.95) for _ in range(3)),anchor='mm')
    txt('Así se ve tu plan.',520,ease((t-.3)/.4)*(1-ease((t-2.6)/.3)))
    txt('Así lo ordenas.',520,ease((t-3.0)/.4)*(1-ease((t-4.5)/.3)))
    txt('Así lo haces.',520,ease((t-4.9)/.4)*(1-ease((t-6.1)/.3)))
    for k,(x,y,w,h,ph) in enumerate(R):
        on=ease((t-.35-k*.07)/.15)
        if on<=0: continue
        jx=4*np.sin(t*6+ph); jy=4*np.cos(t*5+ph)
        p=eio((t-2.8-k*.02)/1.0)          # caos -> grilla
        q=eio((t-4.7-(N-1-k)*.035)/0.45)  # grilla -> uno, uno por uno
        gx,gy=GRID[k]
        cx=lerp(x+jx*(1-p),gx,p); cy=lerp(y+jy*(1-p),gy,p); ww=lerp(w,gs,p); hh=lerp(h,gs,p)
        if q>0:
            cx=lerp(cx,W/2-gs/2,q); cy=lerp(cy,860-gs/2,q)
        alpha=on*(1 if k==0 else (1-q))
        if alpha<=0.01: continue
        v=int(255-245*alpha)
        d.rectangle([cx,cy,cx+ww,cy+hh],outline=(v,v,v),width=2)
    if t>5.9:
        f=ease((t-5.9)/0.4); pop=1+0.35*np.exp(-((t-6.25)/0.15)**2); s=gs*pop; x0=W/2-s/2; y0=860-s/2
        d.rectangle([x0,y0+s*(1-f),x0+s,y0+s],fill=ink)
    a=ease((t-6.5)/0.5)
    if a>0: d.text((W/2,1000),'Hazlo simple.',font=F(FL,40),fill=tuple(int(255-245*a) for _ in range(3)),anchor='mm')
    return finish(bg)
if '--prev' in sys.argv:
    for t in [1.5,4.2,5.5,8.0]: Image.fromarray(frame(t)).resize((360,640)).save(f'/home/claude/rv/p{t}.jpg')
else:
    print(encode('c1106',10,frame,ticks=[.35+k*.07 for k in range(N)]+[4.95+(N-1-k)*.035 for k in range(0,N,2)],pops=[6.2],whoosh=[2.8]))
