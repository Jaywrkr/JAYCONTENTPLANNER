import json
P='/home/claude/campana/plan.json'; p=json.load(open(P))
files={(r['d'],r['K']):r for r in json.load(open('/home/claude/nov/wm-files.json'))}
meta={m['d']:m for m in json.load(open('/home/claude/nov/wm-meta.json'))}
DOW=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']
FMT={'tachado':'Imagen 4:5','cien':'Imagen 4:5','ecuacion':'Imagen 4:5','truco':'Imagen 4:5','fondo':'Imagen 4:5 (anuncio) + 2 fondos en historias','semana':'Carrusel 4:5 · 5 slides','sinfiltro':'Imagen 4:5'}
TH={'N':'Negro','W':'Blanco'}
share=lambda txt:(1,'h1','Historia 1 · comparte el post','Avión → Agregar a tu historia. Escribe: “'+txt+'”',[],[])
st=lambda b,i,t,sub,f:(b,i,t,sub,[f],[['Fondo','dl',f]])
walls=[(1,'w1','Historia 2 · fondo bloqueo','Publica el que ganó la encuesta de ayer. Texto: “captura esta.”',[],[]),(1,'w2','Historia 3 · fondo inicio','Texto: “y esta.” Después agrégalas a la destacada FONDOS.',[],[])]
X={ # rec, short(title, desc), tx (X/Threads), hist, li
'2026-11-09':dict(rec='A',short=('Ocupado no es enfocado. #shorts','Seis cosas a la vez se sienten como trabajo.\nUna sola, bien, se nota.'),tx='Encuesta: ¿qué te saca más del foco?\n· Mensajes\n· Reuniones\n· Tu propia cabeza',
  hist=[share('¿cuál eres hoy?'),st(2,'h2','Historia 2 · termina la frase','Sube el fondo con el sticker de pregunta. Comparte 3 respuestas el miércoles.','st-1109-frase.jpg')]),
'2026-11-10':dict(rec='A',short=('Solo un capítulo más. #shorts','23:00 → 02:00 sin decidirlo.\nNingún capítulo dura una noche. Todos juntos, sí.'),tx='“Solo un capítulo más” es la frase más cara de la noche.',
  li=dict(text='Una costumbre que intentamos en el equipo:\n\nLos viernes, cada uno escribe una sola línea.\nLo que terminó esta semana.\n\nNo lo que hizo. Lo que terminó.\n\nAl principio costaba. Ahora es lo que más me gusta leer de la semana.',nota='Texto solo, sin imagen. Úsalo solo si es una práctica real del equipo; si no, cámbialo por algo que sí hagan. 8:00.'),
  hist=[share('culpable'),st(2,'h2','Historia 2 · esto o aquello','Sube el fondo y pon una encuesta: libro / celular.','st-1110-esto.jpg')]),
'2026-11-11':dict(rec='A',short=('Cada sí cuesta algo. #shorts','Siete síes a otros. Mira qué le pasa a lo tuyo.'),tx='Cada vez que dices sí a algo que no te importa,\nle dices no a algo que sí.',
  hist=[(0,'h0','Historia · 3 respuestas','Comparte 3 respuestas del lunes (“esta semana me enfoco en…”), sin nombres.',[],[]),share('¿cuántos esta semana?'),st(2,'h2','Historia 2 · slider','Sube el fondo con un slider (emoji 😬).','st-1111-slider.jpg')]),
'2026-11-12':dict(rec='A',short=('¿Lo leíste bien? #shorts','Un truco de 3 segundos.\nTu cabeza lee lo que espera leer.'),tx='Hilo corto:\n\n1/ Tu cabeza no lee. Adivina.\n2/ Por eso no ves el error repetido.\n3/ Ni el hábito repetido.\n\nLéete despacio una vez al día.',
  li=dict(img='li-1112.jpg',text='Lo que más me ha costado aprender liderando:\n\nEl equipo no necesita más proyectos. Necesita terminar los que tiene.\n\nCuando decimos que no a algo nuevo, casi siempre es para que lo de ahora salga bien.\n\nSigo aprendiendo a hacerlo.',nota='Una imagen. Revisa que el tono sea el tuyo. 8:00.'),
  hist=[share('¿lo viste a la primera?'),st(2,'h2','Historia 2 · elige tú','Sube la imagen con los dos fondos y una encuesta A / B. Mañana publicas el que gane.','st-1112-elige.jpg')]),
'2026-11-13':dict(rec='A',short=('Fondo nuevo: primero lo difícil. #shorts','Captúralo en mis historias de Instagram.'),tx='Lo difícil no se pone más fácil a la tarde.\nSolo más cansado.',
  hist=[walls[0],walls[1],st(2,'h3','Historia · cuenta regresiva','Sube el fondo con un sticker de cuenta regresiva: “Episodio 05 · martes 11:30”.','st-1113-cuenta.jpg')]),
'2026-11-14':dict(rec='B',short=('Dejé de hacer esto. #shorts','Tres cosas que dejé y me devolvieron tiempo.'),tx='El domingo en la noche decides cómo va a ser tu lunes.\nAunque no lo decidas.',
  hist=[share('la 2 me cuesta'),st(2,'h2','Historia 2 · detrás del código','Sube la imagen del código del post del miércoles.','st-1114-codigo.jpg')]),
'2026-11-15':dict(rec='A',short=('4 horas y 12 minutos. #shorts','Mira tu tiempo en pantalla antes de decir que no tienes tiempo.'),tx='“No tengo tiempo.”\nTiempo en pantalla: 4 h 12 min.',
  hist=[share('mira tu número'),st(2,'h2','Historia 2 · quiz','Antes: revisa tu tiempo en pantalla de ayer. Quiz: 2 h / 4 h / 6 h (marca la más cercana). Mañana publicas la respuesta.','st-1115-quiz.jpg')]),
'2026-11-16':dict(rec='B',short=('Motivación sube y baja. #shorts','La rutina no. Por eso se queda.'),tx='No esperes tener ganas.\nPon la hora y llega.',
  hist=[(0,'h0','Historia · respuesta del quiz','Sube una historia solo con texto: “Ayer: __ h de pantalla.” (tu número real).',[],[]),share('¿cuál publicas tú?'),st(2,'h2','Historia 2 · antes y después','Sube el boceto contra el final. Sin sticker.','st-1116-proceso.jpg')]),
'2026-11-17':dict(rec='A',short=('El lunes empiezo. #shorts','Once lunes tachados. Hoy es lunes.'),tx='Empezar el lunes es la forma más elegante de no empezar.',
  li=dict(text='Una pregunta que me hago antes de marcar algo como urgente:\n\n¿Qué pasa si esto sale el lunes?\n\nCasi siempre la respuesta es: nada.\n\nY me ahorra mover a todo el equipo por algo que podía esperar.\n\nNo siempre lo logro. Pero cada vez que me acuerdo, la semana sale más tranquila.',nota='Texto solo. Revisa que sea tu práctica real. 8:00.'),
  hist=[share('¿cuántos lunes llevas?'),st(2,'h2','Historia 2 · respóndeme','Sube el fondo con el sticker de pregunta. Guarda las respuestas.','st-1117-pregunta.jpg')]),
'2026-11-18':dict(rec='A',short=('20 pestañas. 0 terminadas. #shorts','Cierra 19. Termina 1.'),tx='Encuesta: ¿cuántas pestañas tienes abiertas ahora?\n· 1 a 5\n· 6 a 20\n· Prefiero no decir',
  hist=[share('cerré 14'),st(2,'h2','Historia 2 · encuesta','Sube el fondo y pon una encuesta con las tres opciones.','st-1118-encuesta.jpg')]),
'2026-11-19':dict(rec='A',short=('¿Cuántos puntos grises ves? #shorts','Ninguno existe. Tu cabeza los pone.'),tx='Tu cabeza ve cosas que no están.\nLos puntos grises. Y la mayoría de tus excusas.',
  li=dict(img='li-1119-01.jpg',pdf='li-1119.pdf',text='Estas son las reglas que tratamos de seguir con las reuniones.\n\nNo siempre las cumplimos. Cuando sí, la semana rinde más.\n\n¿Cuál agregarías?',nota='Carrusel: sube el PDF como documento. Cambia las reglas si en tu equipo son otras. 8:00.'),
  hist=[share('¿cuántos viste?'),st(2,'h2','Historia 2 · elige tú','Sube la imagen con los dos fondos y una encuesta A / B.','st-1119-elige.jpg')]),
'2026-11-20':dict(rec='A',short=('Hecho es mejor que perfecto. #shorts','Fondo nuevo. Captúralo en mis historias.'),tx='Publicado y mejorable le gana a perfecto y guardado.',
  hist=[walls[0],walls[1],st(2,'h3','Historia · cuenta regresiva','Sticker de cuenta regresiva: “Episodio 06 · martes 11:30”.','st-1120-cuenta.jpg')]),
'2026-11-21':dict(rec='B',short=('Cómo digo que no. #shorts','Tres frases. Ninguna es grosera.'),tx='Hilo:\n\n1/ “Ahora no puedo. ¿Te sirve el jueves?”\n2/ “Si hago esto, ¿qué dejo?”\n3/ “Esta semana no es mi prioridad.”\n\nGuárdalo para el lunes.',
  hist=[share('la 2 funciona'),st(2,'h2','Historia 2 · termina la frase','Sube el fondo con el sticker de pregunta.','st-1121-frase.jpg')]),
'2026-11-22':dict(rec='B',short=('Cansado de evitarlo. #shorts','Mi lista desde enero. Ni un ✓.\nSi nunca lo haces, no es pendiente.'),tx='No estás cansado de trabajar.\nEstás cansado de evitarlo.',
  hist=[share('me dolió'),st(2,'h2','Historia 2 · slider','Sube el fondo con un slider (emoji 📋).','st-1122-slider.jpg')]),
'2026-11-23':dict(rec='A',short=('Quejarse no es hacer. #shorts','Cuatro quejas. Un cuadro lleno.'),tx='Cuenta cuántas veces te quejas hoy de lo mismo.\nEse número es tu lista de pendientes real.',
  hist=[share('yo: 3 hoy'),st(2,'h2','Historia 2 · antes y después','Sube el boceto contra el final.','st-1123-proceso.jpg')]),
'2026-11-24':dict(rec='B',short=('Casi listo... #shorts','99%. Para siempre.\nDespués no existe.'),tx='“No es el momento.”\nNunca lo es. Por eso se elige.',
  li=dict(text='Una frase que trato de usar más:\n\n“No sé. Lo averiguo y te cuento.”\n\nAntes sentía que tenía que tener todas las respuestas. No las tengo.\n\nY cuando lo digo, el equipo también se anima a decirlo.',nota='Texto solo. 8:00.'),
  hist=[share('¿después cuándo?'),st(2,'h2','Historia 2 · esto o aquello','Encuesta: lo hago / lo anoto.','st-1124-esto.jpg')]),
'2026-11-25':dict(rec='A',short=('Contarlo no es hacerlo. #shorts','Mientras más lo cuentas, menos lo haces.'),tx='No le cuentes tu plan a nadie esta semana.\nCuéntales el resultado.',
  hist=[share('me pasa siempre'),st(2,'h2','Historia 2 · detrás del código','Sube la imagen del código del post de hoy.','st-1125-codigo.jpg')]),
'2026-11-26':dict(rec='A',short=('Respira conmigo. #shorts','Respiración cuadrada: 4 segundos por lado.\nUna vuelta antes de abrir los mensajes.'),tx='Antes de abrir los mensajes:\ninhala 4, sostén 4, exhala 4, sostén 4.\n\nUna vuelta. Después decides.',
  li=dict(img='li-1126.jpg',text='Quedan cinco semanas del año.\n\nEn vez de abrir cosas nuevas, en el equipo vamos a elegir una sola para terminar bien.\n\nUna.\n\nEn enero les cuento cómo nos fue.',nota='Una imagen. Publícalo solo si de verdad lo van a hacer. 8:00.'),
  hist=[share('una vuelta. hecho.'),st(2,'h2','Historia 2 · elige tú','Sube la imagen con los dos fondos y una encuesta A / B.','st-1126-elige.jpg')]),
'2026-11-27':dict(rec='B',short=('Menos ruido. #shorts','Fondo nuevo. Captúralo en mis historias.'),tx='Apaga las notificaciones de una sola app hoy.\nMañana me cuentas.',
  hist=[walls[0],walls[1],st(2,'h3','Historia · cuenta regresiva','Sticker de cuenta regresiva: “Episodio 07 · martes 1, 11:30”.','st-1127-cuenta.jpg')]),
'2026-11-28':dict(rec='A',short=('Noviembre en 3 frases. #shorts','El plan perfecto no se mueve.\nOcupado no es avanzar.\nLas ganas llegan después.'),tx='Noviembre en una línea:\nmenos empezar, más terminar.',
  hist=[share('¿cuál te sirvió?'),st(2,'h2','Historia 2 · respóndeme','Sube el fondo con el sticker de pregunta.','st-1128-pregunta.jpg')]),
'2026-11-29':dict(rec='B',short=('Nadie te está mirando tanto. #shorts','Todos están en lo suyo.\nHazlo de una vez.'),tx='Ya sabes lo que tienes que hacer.\nNo te falta otro video.',
  hist=[share('ya sé.'),st(2,'h2','Historia 2 · slider','Sube el fondo con un slider (emoji 🗓).','st-1129-slider.jpg')]),
}
NEW=[]
for i,(d,m) in enumerate(sorted(meta.items())):
  E=X[d]; day=dict(date=d,dow=DOW[i%7],time='11:30',serie=m['s'],n=m['n'],extra=None,opts={})
  sid='c'+d[5:].replace('-','')+'-s-short.mp4'
  for K in 'AB':
    o=m[K]; r=files[(d,K)]
    day['opts'][K]=dict(rec=E['rec']==K,alt=None,title=o['title'],fmt=FMT[m['s']],theme=TH[o['th']],files=r['files'],wall=r.get('wall'),video=None,poster=None,
      cap=o['cap'],st=[],pr=[],nota=None,kit={},short=sid,yt=dict(title=E['short'][0],desc=E['short'][1]+'\n\nUna verdad incómoda al día, diseñada simple.\n@jaywrkr en Instagram.\n\n#shorts #hábitos #disciplina'))
  day['otras']=dict(tx=E['tx'])
  if 'li' in E: L=E['li']; day['otras']['li']=dict(img=L.get('img'),pdf=L.get('pdf'),text=L['text'],nota=L['nota'])
  day['hist']=[dict(b=h[0],id=h[1],t=h[2],sub=h[3],media=h[4],acts=h[5]) for h in E['hist']]
  NEW.append(day)
ds={d['date'] for d in NEW}; p=[d for d in p if d['date'] not in ds]+NEW; p.sort(key=lambda d:d['date'])
json.dump(p,open(P,'w'),ensure_ascii=False); print(len(p), p[-1]['date'])
