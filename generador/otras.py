# Otras redes: Threads/X (diario), LinkedIn (mar y jue), YouTube Shorts (cada opción)
import json, os
P=json.load(open('/home/claude/campana/plan.json')); C='/home/claude/campana/c'
TX={
'2026-10-20':'Nadie dice “un día más” el día que empieza.\nLo dice todos los días que no empieza.',
'2026-10-21':'4 horas de celular al día son 60 días al año.\nNo te falta tiempo. Sabes dónde está.',
'2026-10-22':'Muchos “no puedo” son “no quiero” bien vestidos.',
'2026-10-23':'Primero lo importante.\nDespués el correo.\nDespués lo demás.',
'2026-10-24':'3 preguntas para cada lunes:\n1. ¿Qué es lo único importante esta semana?\n2. ¿Qué puedo dejar de hacer?\n3. ¿A quién tengo que llamar?',
'2026-10-25':'“Estoy ocupado” es la excusa que mejor suena.',
'2026-10-26':'“Debería” no tiene fecha.\n“Voy a” sí.',
'2026-10-27':'Cinco minutos todos los días le ganan a una hora cuando te acuerdas.',
'2026-10-28':'Lo que haces pesa más que lo que dices.\nSiempre. Aunque nadie lo mida.',
'2026-10-29':'Si llegaste hasta aquí, puedes terminar lo que empezaste hoy.',
'2026-10-30':'Termina lo que empiezas, o bórralo.\nLo que queda a medias también pesa.',
'2026-10-31':'Un mes publicando todos los días.\nLo que más aprendí: la constancia se nota antes que el talento.',
'2026-11-01':'Nadie va a hacerlo por ti.\nNi tu jefe, ni tu familia, ni el algoritmo.',
}
LI={
'2026-10-20':('li-1020.jpg','Una reunión de una hora con 8 personas no dura una hora.\nDura un día de trabajo.\n\nAntes de convocar, me hago tres preguntas:\n1. ¿Se puede resolver por escrito?\n2. ¿Quién tiene que estar de verdad?\n3. ¿Qué decisión sale de aquí?\n\nSi no hay decisión, no hay reunión.\n\n¿Cuántas horas de reunión tuvo tu equipo esta semana?'),
'2026-10-22':('li-1022.jpg','Liderando equipos técnicos aprendí esto tarde:\n\nCuando das órdenes, el equipo hace la tarea.\nCuando das contexto, el equipo resuelve el problema.\n\nContexto es: para qué sirve, para quién es y qué pasa si sale mal.\nCon eso, un buen ingeniero decide mejor que yo.\n\nMenos instrucciones. Más porqués.'),
'2026-10-27':('li-1027.jpg','Un proyecto no se atrasa en la última semana.\nSe atrasa el primer día que alguien no dijo “no sé”.\n\nEn proyectos de infraestructura, el problema casi nunca es técnico. Es lo que nadie se atrevió a preguntar a tiempo.\n\nPor eso en mi equipo “no sé” no es un error. Es el inicio del trabajo.'),
'2026-10-29':('li-1029.jpg','Si para delegar tienes que explicar cada paso, no delegaste. Supervisaste.\n\nDelegar es entregar el resultado que necesitas y la fecha.\nEl cómo lo decide quien lo hace.\n\nCuesta al principio. Después, el equipo crece. Y tú también.'),
}
for d in P:
  k=d['date']
  o={}
  if k in TX: o['tx']=TX[k]
  if k in LI: o['li']={'img':LI[k][0],'text':LI[k][1],'nota':'Revisa que sea tu experiencia real antes de publicar. Martes y jueves, 8:00.'}
  if o: d['otras']=o
  if k<'2026-10-20': continue
  for K,op in d['opts'].items():
    sh=f"c{k[5:].replace('-','')}-{K.lower()}-short.mp4"
    if not op.get('video') and os.path.exists(f'{C}/{sh}'):
      first=op['cap'].split('\n')[0].strip()
      op['short']=sh
      op['yt']={'title':(first if len(first)<=70 else op['title'])[:90]+' #shorts','desc':op['cap']+'\n\nUna verdad incómoda al día, diseñada simple.\n@jaywrkr en Instagram.\n\n#shorts #hábitos #disciplina #mentalidad','music':'Al subir: agrega música de la biblioteca de YouTube (volumen bajo). Estos videos no traen sonido.'}
    elif op.get('video'): op['short']=op['video']
json.dump(P,open('/home/claude/campana/plan.json','w'))
print('otras ok')
