# Videos largos de YouTube en el plan: publicar y grabar
import json
p=json.load(open('plan.json')); D={d['date']:d for d in p}
EP1_DESC="""Mañana empiezo. Y casi nunca empieza.
Por qué posponer nos pasa a todos, y cómo romperlo hoy con 5 minutos.

0:00 Mañana empiezo
0:21 52 cosas al año
1:06 Mañana no existe
1:42 Lo que pasa
2:29 Empieza chico
3:02 Lo que haces hoy
3:44 Una pregunta
4:03 Simple

Una verdad incómoda cada semana, explicada simple.
Instagram: @jaywrkr"""
EP2="""[00:00]
Hoy dijiste que sí varias veces.
Y una de esas te quita la semana.
No lo notas, porque no duele en el momento.
Al final te doy la frase exacta que uso cuando no quiero algo.
Y nadie se molesta.

[00:20]
Lunes. Nueve de la mañana.
Te escriben: ¿tienes cinco minutos?
Dices que sí.
Los cinco minutos son una hora.
Después llega un mensaje más.
Y uno más.
Al final del día hiciste mucho.
Pero nada tuyo.

[01:00]
Haz la cuenta.
Un sí de una hora es una hora menos de lo tuyo.
Cinco al día son cinco horas.
En una semana, veinticinco.
Es más de media semana de tu tiempo.
Pero eso no es lo peor.

[01:40]
Lo peor es que casi nunca querías.
Dijiste sí porque el no se siente mal.
Porque no quieres que piensen mal de ti.
Así que pagas con tu tiempo
para que alguien no se moleste dos segundos.
Haz esa cuenta también.

[02:30]
Ahora, la frase.
Cuando te piden algo, no contestes en el momento.
Di esto:
Déjame ver y te aviso.
Esa pausa te devuelve la decisión.
Y si es no, di esto:
Esta semana no puedo. ¿Lo vemos el lunes?
Es un no, pero con fecha.
Nadie se molesta con una fecha.
Y muchas cosas, el lunes, ya no hacen falta.

[03:30]
Haz esto hoy.
Antes de dar un sí, espera un minuto.
Solo un minuto.
Vas a ver cuántos sí no eran tuyos.

[03:50]
Una pregunta.
¿A qué le dijiste sí esta semana sin quererlo?
Escribe solo una palabra.

[04:05]
Cada sí cuesta algo.
Elige qué pagas.
Simple.
Nos vemos la próxima semana."""

TAGS='procrastinación, posponer, hábitos, productividad, disciplina, empezar hoy, jaywrkr'
def pub_steps(E):
  ep=E['ep']; A=lambda x:'yt-ep'+ep+x
  E['steps']=[
   {'b':0,'id':'y1','t':'YouTube · sube el video','sub':'YouTube Studio → Crear → Subir video. El archivo ep'+ep+'-youtube.mp4 está en el chat.'},
   {'b':0,'id':'y2','t':'YouTube · título y descripción','sub':E['title'],'acts':[['Copiar título','copy',E['title']],['Copiar descripción','copy',E['desc']]]},
   {'b':0,'id':'y3','t':'YouTube · miniaturas A/B/C','sub':'Miniatura → Probar y comparar → Thumbnail only. Sube A, B y C. Título fijo.','media':[A('-a.jpg'),A('-b.jpg'),A('-c.jpg')],'acts':[['Las 3 miniaturas','dlall',[A('-a.jpg'),A('-b.jpg'),A('-c.jpg')]]]},
   {'b':0,'id':'y4','t':'YouTube · playlist y detalles','sub':'Playlist: Verdades incómodas (orden: más antiguo primero).\nNo es contenido para niños · sin restricción de edad.\nMostrar más → idioma Español · categoría Educación · etiquetas.','acts':[['Copiar etiquetas','copy',TAGS]]},
   {'b':0,'id':'y5','t':'YouTube · subtítulos','sub':'Elementos del video → Subtítulos → Español → Subir archivo → Con tiempos.'+('' if E.get('srt',True) else ' El archivo .srt te llega en el chat con el video.'),'acts':[['Subtítulos .srt','dl',A('.srt')]] if E.get('srt',True) else []},
   {'b':0,'id':'y6','t':'YouTube · pantalla final','sub':'Plantilla 1 video + suscribirse. Video: "El mejor para el espectador" sobre el recuadro izquierdo, suscribirse a la derecha. Desde '+E.get('endAt','el minuto que te indico en el chat')+' hasta el final.'},
   {'b':0,'id':'y7','t':'YouTube · programa 11:30','sub':'Visibilidad → Programar → hoy 11:30 (o Público si ya pasó la hora).'},
   {'b':2,'id':'y8','t':'YouTube · comentario fijado + historia','sub':'Comenta y fija. Después sube una historia en Instagram con la miniatura y el sticker de enlace al video.','media':[A('-a.jpg')],'acts':[['Copiar comentario','copy',E['pin']]]},
  ]
  return E

EP1={'endAt':'4:08','kind':'pub','ep':'01','title':'Mañana + mañana + mañana = nunca','thumb':'yt-ep01.jpg','desc':EP1_DESC,
  'pin':'¿Hay algo que llevas más de un mes posponiendo para mañana? Solo responde: sí.',
  'sub':'Sube el video que te mandé en el chat (ep01-youtube.mp4). Público · no es para niños · idioma español · categoría Educación. Pantalla final: un video + suscribirse sobre los dos recuadros. Luego fija el comentario y sube una historia con el link.'}
D['2026-10-20']['ytl']=pub_steps(EP1)
EP2_DESC="""Cada sí que das le quita horas a lo tuyo.\nCuánto te cuesta, por qué lo das, y la frase exacta para decir no sin que nadie se moleste.

(capítulos: te llegan en el chat con el video)

Una verdad incómoda cada semana, explicada simple.
Instagram: @jaywrkr"""
EP3="""[00:00]
Hoy desbloqueaste tu teléfono muchas veces.
Más de las que crees.
Y casi ninguna fue una decisión.
Te voy a dar una cosa que hago para que eso no pase.
Y no es dejar el teléfono.

[00:20]
Haz esta prueba.
Piensa en la última vez que lo tomaste.
¿Qué ibas a hacer?
Muchas veces no sabes.
Lo tomaste porque estaba ahí.
La mano llega antes que la idea.

[01:00]
Y no es tu culpa del todo.
Cada app está hecha para que vuelvas.
Un punto de color.
Un número en la esquina.
Un sonido.
Del lado de la app hay gente pagada para que no lo sueltes.
Pero eso no es lo peor.

[01:45]
Lo peor es lo que pasa después.
Cada vez que lo miras, tu cabeza deja lo que hacías.
Y volver a lo que hacías cuesta minutos.
Haz la cuenta:
Si lo tomas cincuenta veces y se van dos minutos cada vez,
son cien minutos al día.
Casi dos horas que no son tuyas.

[02:40]
El teléfono no es el problema.
El problema es que está a la mano.
Así que esto es lo que hago:
Cuando hago algo que vale, el teléfono va lejos.
Fuera de la vista. En un cajón, en la mochila, en la cocina.
No lo apago. No lo bloqueo.
Solo lo alejo.
Si tienes que ir a buscarlo, ya no es automático.

[03:30]
Haz esto hoy.
Una hora. El teléfono lejos.
Solo una hora.
Vas a ver cuántas veces tu mano lo busca.

[03:50]
Una pregunta.
¿Cuántas veces crees que lo tomaste hoy?
Escribe solo el número.

[04:00]
Lejos de la vista. Lejos de la mano.
Simple.
Nos vemos la próxima semana."""
D['2026-10-21']['ytl']={'kind':'rec','ep':'02','title':'La frase que uso para decir no (sin quedar mal)','script':EP2,
  'sub':'En el auto, motor y aire apagados. Notas de voz en Sin pérdida, iPhone a 15–20 cm, a un lado de la boca. Una línea, 2 segundos de pausa. Si te equivocas, repite la línea. Al terminar, mándame el audio y la transcripción de Notas de voz por el chat. Se publica el martes 27.'}
D['2026-10-27']['ytl']=pub_steps({'kind':'pub','ep':'02','srt':False,'title':'La frase que uso para decir no (sin quedar mal)','desc':EP2_DESC,
  'pin':'¿A qué le dijiste sí esta semana sin quererlo? Escribe solo una palabra.'})
D['2026-10-28']['ytl']={'kind':'rec','ep':'03','title':'Por qué no puedes soltar el teléfono','script':EP3,
  'sub':'Igual que el 02: en el auto, Notas de voz en Sin pérdida, una línea y 2 segundos de pausa. Mándame audio + transcripción. Se publica el martes 3 de noviembre.'}
json.dump(p,open('plan.json','w'),ensure_ascii=False)
print('ok')
