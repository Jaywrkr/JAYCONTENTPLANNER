import json
P='/home/claude/campana/plan.json'; p=json.load(open(P))
files={(r['d'],r['K']):r for r in json.load(open('/home/claude/nov/w1-files.json'))}
DOW=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']
FMT={'tachado':'Imagen 4:5','cien':'Imagen 4:5','ecuacion':'Imagen 4:5','truco':'Imagen 4:5','fondo':'Imagen 4:5 (anuncio) + 2 fondos en historias','semana':'Carrusel 4:5 · 5 slides','sinfiltro':'Imagen 4:5'}
TH={'N':'Negro','W':'Blanco'}
W1=[
 dict(d='2026-11-02',s='tachado',n=5,rec='A',
  A=dict(th='N',title='Prometer → Cumplir.',cap='Prometer no cuesta nada. Cumplir es lo único que se nota.\nMándaselo a quien siempre dice “ya mismo”.'),
  B=dict(th='W',title='Esperar → Pedir.',cap='Nadie adivina lo que necesitas.\nMándaselo a quien sigue esperando que se den cuenta.'),
  short=('El plan perfecto no se mueve. #shorts','Planear se siente como avanzar. No lo es.\nEmpieza mal, pero empieza.'),
  tx='¿Qué prometiste esta semana que todavía no cumples?\nResponde con una palabra.',
  hist=[(0,'h1','Historia 1 · comparte el post','Avión → Agregar a tu historia. Escribe solo: “¿te pasa?”',[],[]),
        (1,'h2','Historia 2 · slider','Sube el fondo y pon encima el sticker de slider (emoji 🫣) con la pregunta del fondo.',['st-1102-slider.jpg'],[['Fondo','dl','st-1102-slider.jpg']])]),
 dict(d='2026-11-03',s='cien',n=5,rec='B',
  A=dict(th='W',title='UN SEGUNDO NADA MÁS ×100',cap='Nadie decide perder una hora. Se pierde de a un segundo.\nMándaselo a quien “solo va a revisar algo”.'),
  B=dict(th='N',title='LO REVISO Y YA ×100',cap='El “y ya” más largo del día.\nMándaselo a quien abre el celular para una cosa.'),
  short=('96 veces al día. #shorts','Cada desbloqueo parece nada. Súmalos.\n¿Y no te alcanza el tiempo?'),
  tx='Nadie decide perder una hora.\n\n1/ Abres el celular para una cosa.\n2/ Ves otra. Y otra.\n3/ Levantas la vista y ya es de noche.\n\nNo fue una decisión. Fueron cien segundos.',
  li=dict(text='Algo que intento hacer al final de cada reunión:\n\nUna sola pregunta.\n¿Quién hace qué, y para cuándo?\n\nSi nadie puede responder, la reunión no terminó. Solo se acabó el tiempo.\n\nNo siempre me acuerdo. Cuando lo hago, la semana sale distinta.',nota='Texto solo, sin imagen. Revisa que sea tu práctica real antes de publicar. 8:00.'),
  hist=[(1,'h1','Historia 1 · YouTube','Sube la miniatura del episodio 03 con el sticker de enlace al video. Texto: “nuevo episodio”.',['yt-ep03-a.jpg'],[['Miniatura','dl','yt-ep03-a.jpg']]),
        (2,'h2','Historia 2 · quiz','Antes: revisa en Ajustes → Tiempo en pantalla cuántas veces tomaste el celular ayer. Sube el fondo con un quiz: 20 / 50 / 80 (marca la más cercana a tu número real). Mañana publica la respuesta.',['st-1103-quiz.jpg'],[['Fondo','dl','st-1103-quiz.jpg']])]),
 dict(d='2026-11-04',s='ecuacion',n=5,rec='A',
  A=dict(th='N',title='10 libros sin aplicar = 0',cap='Leer sin aplicar es entretenimiento con buena fama.\nGuárdalo para el próximo libro que empieces.'),
  B=dict(th='W',title='1 h de foco > 4 h a pedazos',cap='Cada interrupción te cuesta más de lo que dura.\nMándaselo a quien trabaja con el chat abierto.'),
  short=('1 hora entera > 4 a pedazos. #shorts','Cada interrupción te saca más de lo que dura.\nUna hora sin interrupciones vale más.'),
  tx='Encuesta: ¿cuántos libros leíste este año que de verdad aplicaste?\n· Ninguno\n· 1 o 2\n· 3 o más',
  hist=[(0,'h0','Historia · respuesta del quiz','Sube una historia con tu número real de ayer (solo texto, fondo negro): “Ayer: __ veces.”',[],[]),
        (1,'h1','Historia 1 · comparte el post','Avión → Agregar a tu historia. Escribe: “¿cuál fue el último?”',[],[]),
        (1,'h2','Historia 2 · antes y después','Sube la imagen del boceto contra el final. Sin sticker.',['st-1104-proceso.jpg'],[['Antes/después','dl','st-1104-proceso.jpg']])]),
 dict(d='2026-11-05',s='truco',n=5,rec='A',
  A=dict(th='N',title='Encuentra el “hoy”',cap='¿Cuánto tardaste? Así de escondido está el “hoy” entre tantos “mañana”.\nMándaselo a alguien y cuenta los segundos.'),
  B=dict(th='N',title='Lee solo lo blanco',cap='Ya lo leíste. Ahora hazlo.\nMándaselo a quien lo necesita leer hoy.'),
  short=('Toca cuando se llene. #shorts','Un juego de 3 segundos.\nAsí se siente terminar algo.'),
  tx='Lo difícil no es encontrar el tiempo.\nEs dejar de regalarlo.',
  li=dict(img='li-1105-01.jpg',pdf='li-1105.pdf',text='Antes de decir que sí a un proyecto nuevo, en el equipo nos hacemos estas preguntas.\n\nNo son mías: las fuimos armando a golpes.\n\nEl PDF tiene las 4. La última conclusión es la más útil.',nota='Carrusel: sube el PDF como documento. Revisa que sea tu práctica real. 8:00.'),
  hist=[(1,'h1','Historia 1 · comparte el post','Avión → Agregar a tu historia. Escribe: “¿en cuántos segundos?” + sticker de pregunta.',[],[]),
        (2,'h2','Historia 2 · elige tú','Sube la imagen con los dos fondos y pon encima una encuesta: A / B. Mañana publicas el que gane.',['st-1105-elige.jpg'],[['Elige tú','dl','st-1105-elige.jpg']])]),
 dict(d='2026-11-06',s='fondo',n=5,rec='A',
  A=dict(th='N',title='Hazlo simple.',cap='Dos fondos para la semana. Están en historias.\nMándaselo a quien complica todo.'),
  B=dict(th='W',title='Una cosa. Bien hecha.',cap='Dos fondos nuevos. Captúralos en historias.\nMándaselo a quien tiene 20 pestañas abiertas.'),
  short=('Fondo nuevo para tu celular. #shorts','Captúralo en mis historias de Instagram.\nUna frase para cada vez que lo desbloqueas.'),
  tx='¿Qué tienes de fondo de pantalla ahora mismo?\nResponde sin mirar.',
  hist=[(1,'w1','Historia 2 · fondo bloqueo','Publica el que ganó la encuesta de ayer. Texto: “captura esta.”',[],[]),
        (1,'w2','Historia 3 · fondo inicio','Texto: “y esta.” Después agrégalas a la destacada FONDOS.',[],[]),
        (2,'h3','Historia · cuenta regresiva','Sube el fondo con un sticker de cuenta regresiva: “Episodio 04 · martes 11:30”.',['st-1106-cuenta.jpg'],[['Fondo','dl','st-1106-cuenta.jpg']])]),
 dict(d='2026-11-07',s='semana',n=5,rec='B',
  A=dict(th='N',title='3 cosas que hago cuando no tengo ganas',cap='Ninguna necesita motivación.\nGuárdalo para el próximo día sin ganas.'),
  B=dict(th='W',title='3 señales de que estás ocupado pero no avanzas',cap='¿Cuántas te pasaron esta semana?\nMándaselo a quien vive “a full”.'),
  short=('Sin ganas, hago esto. #shorts','3 cosas que funcionan sin motivación.\nLas ganas llegan después.'),
  tx='La regla de los 2 minutos (David Allen):\nsi toma menos de dos minutos, hazlo ahora.\n\nLa mitad de tu lista desaparece hoy.',
  hist=[(1,'h1','Historia 1 · comparte el carrusel','Avión → Agregar a tu historia. Escribe: “la 2 me pasa siempre”.',[],[]),
        (2,'h2','Historia 2 · respóndeme','Sube el fondo con el sticker de pregunta. Guarda las respuestas: una se vuelve post.',['st-1107-pregunta.jpg'],[['Fondo','dl','st-1107-pregunta.jpg']])]),
 dict(d='2026-11-08',s='sinfiltro',n=4,rec='B',
  A=dict(th='N',title='Nadie se acuerda de tus excusas',cap='Las excusas no dejan rastro. Lo que haces, sí.\nMándaselo a quien tiene una excusa para todo.'),
  B=dict(th='W',title='Ver tutoriales no es aprender',cap='Pausa el video. Hazlo tú. Mal, pero tú.\nMándaselo a quien tiene 40 videos guardados.'),
  short=('Visto: 100%. Aplicado: 0%. #shorts','Ver tutoriales no es aprender.\nEs mirar a otro hacerlo.'),
  tx='Ver 10 tutoriales: 0 resultados.\nHacer 1 cosa mal: 1 resultado.',
  hist=[(1,'h1','Historia 1 · comparte el post','Avión → Agregar a tu historia. Escribe: “culpable”.',[],[]),
        (2,'h2','Historia 2 · detrás del código','Sube la imagen del código que hizo el post de hoy.',['st-1108-codigo.jpg'],[['Código','dl','st-1108-codigo.jpg']])]),
]
NEW=[]
for i,D in enumerate(W1):
  day=dict(date=D['d'],dow=DOW[i],time='11:30',serie=D['s'],n=D['n'],extra=None,opts={})
  sid='c'+D['d'][5:].replace('-','')+'-s-short.mp4'
  for K in 'AB':
    o=D[K]; r=files[(D['d'],K)]
    day['opts'][K]=dict(rec=D['rec']==K,alt=None,title=o['title'],fmt=FMT[D['s']],theme=TH[o['th']],files=r['files'],wall=r.get('wall'),video=None,poster=None,
      cap=o['cap'],st=[],pr=[],nota=None,kit={},short=sid,yt=dict(title=D['short'][0],desc=D['short'][1]+'\n\nUna verdad incómoda al día, diseñada simple.\n@jaywrkr en Instagram.\n\n#shorts #hábitos #disciplina'))
  day['otras']=dict(tx=D['tx']); 
  if 'li' in D: day['otras']['li']=dict(img=D['li'].get('img'),pdf=D['li'].get('pdf'),text=D['li']['text'],nota=D['li']['nota'])
  day['hist']=[dict(b=h[0],id=h[1],t=h[2],sub=h[3],media=h[4],acts=h[5]) for h in D['hist']]
  NEW.append(day)
ds={d['date'] for d in NEW}; p=[d for d in p if d['date'] not in ds]+NEW; p.sort(key=lambda d:d['date'])
json.dump(p,open(P,'w'),ensure_ascii=False); print(len(p))
