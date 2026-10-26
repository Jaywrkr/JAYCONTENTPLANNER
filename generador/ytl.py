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

EP3_DESC="""Tomas el teléfono sin decidirlo. Varias veces por hora.
Por qué pasa, cuánto te cuesta, y lo único que hago para cortarlo (no es dejar el teléfono).

(capítulos: te llegan en el chat con el video)

Una verdad incómoda cada semana, explicada simple.
Instagram: @jaywrkr"""
EP4="""[00:00]
Hay días en los que no paras.
Llamadas, mensajes, pendientes.
Llegas a la noche cansado.
Y si alguien te pregunta qué avanzaste,
te quedas en blanco.
Hoy te doy la pregunta que uso para que eso no pase.

[00:25]
Estar ocupado se siente bien.
Te sientes útil.
Pero hay una diferencia simple.
Ocupado es llenar el día.
Avanzar es que algo cambie.
Puedes llenar el día y que nada cambie.

[01:05]
¿Por qué pasa?
Porque lo que llega en el momento se ve más.
Un mensaje se ve. Una llamada se ve.
Lo que más vale casi nunca te escribe.
No suena. No avisa.
Así que lo dejas para después.
Pero eso no es lo peor.

[01:50]
Lo peor es que el cansancio es el mismo.
Un día ocupado y un día que avanza cansan igual.
La diferencia es lo que queda.
Uno deja más pendientes.
El segundo deja algo hecho.

[02:35]
Ahora, la pregunta.
Cada mañana, antes de ver los mensajes,
me pregunto esto:
Si hoy solo hago una cosa, ¿cuál sería la que más cambia algo?
Esa cosa va primero.
Antes de los mensajes. Antes de las llamadas.
Lo demás puede esperar una hora.
Casi siempre puede.

[03:30]
Haz esto mañana.
Antes de ver el teléfono, escribe una sola cosa.
La que más cambia algo.
Y hazla primero.

[03:50]
Una pregunta.
¿Qué hiciste hoy que cambió algo?
Escribe solo una cosa.

[04:00]
Hacer mucho no cambia nada.
Hacer lo que vale, sí.
Simple.
Nos vemos la próxima semana."""
D['2026-11-03']['ytl']=pub_steps({'kind':'pub','ep':'03','srt':False,'title':'Por qué no puedes soltar el teléfono','desc':EP3_DESC,
  'pin':'¿Cuántas veces crees que lo tomaste hoy? Escribe solo el número.'})
D['2026-11-04']['ytl']={'kind':'rec','ep':'04','title':'La pregunta que me hago cada mañana','script':EP4,
  'sub':'Igual que siempre: en el auto, Notas de voz en Sin pérdida, una línea y 2 segundos de pausa. Mándame audio + transcripción. Se publica el martes 10.'}

# ── Noviembre: ep04 pub, ep05–ep07
def desc(a,b): return a+"\n"+b+"\n\n(capítulos: te llegan en el chat con el video)\n\nUna verdad incómoda cada semana, explicada simple.\nInstagram: @jaywrkr"
EP5="""[00:00]
Abre tu teléfono.
Mira cuántas cosas tienes a medias.
Un curso. Un libro. Un proyecto.
Una idea que ibas a empezar el lunes.
Si son más de cinco, este video es para ti.

[00:25]
Empezar se siente bien.
Todo es nuevo. Todo emociona.
La primera semana vuela.
La segunda ya cuesta un poco.
Y en la tercera llega algo nuevo.
Y empiezas de nuevo.

[01:05]
¿Por qué pasa?
Porque lo nuevo no te pide nada.
Lo que ya empezaste, sí.
Te pide paciencia. Te pide la parte aburrida.
Y la parte aburrida es justo la que hace que algo se termine.
Pero eso no es lo peor.

[01:50]
Lo peor es lo que pesa.
Cada cosa a medias se queda contigo.
En la cabeza. En la lista. En la culpa.
Diez cosas a medias cansan más que una cosa hecha.
No se ven. Pero pesan.

[02:35]
Esto es lo que hago.
Elijo una sola cosa de la lista.
La que esté más cerca del final.
Y no empiezo nada nuevo hasta acabarla.
Lo demás no se va. Solo espera.
Una a la vez.
Así de simple.

[03:30]
Haz esto hoy.
Haz la lista de todo lo que tienes a medias.
Elige la que está más cerca del final.
Y dale media hora. Solo media hora.

[03:50]
Una pregunta.
¿Cuántas cosas tienes a medias ahora mismo?
Escribe solo el número.

[04:00]
Empezar es fácil.
Lo que cuenta es acabarlo.
Simple.
Nos vemos la próxima semana."""
EP6="""[00:00]
Lunes en la mañana.
Abres tus mensajes.
Y tu semana ya tiene dueño.
Juntas. Pedidos. Cosas de último minuto.
Nada de eso lo elegiste tú.
Hoy te cuento cómo pasa, y cómo lo evito.

[00:25]
Tu semana tiene un límite.
Si no la llenas tú, se llena sola.
Y se llena con lo que piden los demás.
No es mala intención.
Cada quien llena el espacio que ve vacío.

[01:05]
¿Por qué pasa?
Porque lo de los demás tiene fecha.
Lo tuyo, no.
Y lo que tiene fecha siempre gana.
Tu proyecto no tiene a nadie que pregunte por él.
Así que siempre puede esperar.
Pero eso no es lo peor.

[01:50]
Lo peor es que no se nota.
Una semana así, no pasa nada.
Un mes así, tampoco.
Pero un año así,
y lo tuyo sigue igual.

[02:35]
Esto es lo que hago.
El domingo, antes que nadie,
pongo en mi calendario dos bloques.
Dos horas para lo mío.
Con nombre y con hora.
Como si fuera una junta con alguien importante.
Si alguien me pide ese espacio, ya está ocupado.
Y es verdad. Está ocupado.

[03:30]
Haz esto hoy.
Abre tu calendario.
Pon un bloque esta semana solo para lo tuyo.
Ponle nombre.
Y defiéndelo como cualquier junta.

[03:50]
Una pregunta.
¿Cuántas horas de esta semana elegiste tú?
Escribe solo el número.

[04:00]
Tu semana se llena igual.
La pregunta es con qué.
Simple.
Nos vemos la próxima semana."""
EP7="""[00:00]
Empiezas un hábito el lunes.
Lo haces todos los días.
Te sientes bien.
Y a las dos semanas, se acabó.
No pasó nada. Solo se acabó.
Hoy te explico por qué, y qué hago yo.

[00:25]
Al inicio tienes ganas.
Las ganas hacen todo fácil.
Pero las ganas duran poco.
Son como la batería del teléfono el lunes.
Llena. Y se gasta.

[01:05]
¿Por qué pasa?
Porque el hábito depende de las ganas.
Y las ganas dependen de cómo dormiste,
de cómo te fue, de mil cosas.
Cuando un día no hay ganas, no hay hábito.
Pero eso no es lo peor.

[01:50]
Lo peor es lo que piensas después.
Fallas un día y piensas: ya lo dañé.
Y si ya lo dañé, ¿para qué sigo?
Un día malo no acaba un hábito.
Lo acaba pensar que sí.

[02:35]
Esto es lo que hago.
Hago el hábito tan chico que no necesita ganas.
No leo un capítulo. Leo una página.
No hago una hora de ejercicio. Hago cinco minutos.
Y tengo una sola condición:
nunca dos días seguidos sin hacerlo.
Un día fallas. Dos, no.

[03:30]
Haz esto hoy.
Elige un hábito que dejaste.
Hazlo tan chico que te dé vergüenza.
Y hazlo hoy, solo eso.

[03:50]
Una pregunta.
¿Qué hábito dejaste en la segunda semana?
Escribe solo una palabra.

[04:00]
Las ganas se acaban.
Lo chico se queda.
Simple.
Nos vemos la próxima semana."""
SUB='En el auto, Notas de voz en Sin pérdida, una línea y 2 segundos de pausa. Mándame audio + transcripción. '
D['2026-11-10']['ytl']=pub_steps({'kind':'pub','ep':'04','srt':False,'title':'La pregunta que me hago cada mañana','desc':desc('Llegas a la noche cansado y no sabes qué avanzaste.','La diferencia entre ocupado y avanzar, y la pregunta que me hago antes de ver el teléfono.'),'pin':'¿Qué hiciste hoy que cambió algo? Escribe solo una cosa.'})
D['2026-11-11']['ytl']={'kind':'rec','ep':'05','title':'Por qué tienes tantas cosas a medias','script':EP5,'sub':SUB+'Se publica el martes 17.'}
D['2026-11-17']['ytl']=pub_steps({'kind':'pub','ep':'05','srt':False,'title':'Por qué tienes tantas cosas a medias','desc':desc('Un curso, un libro, un proyecto. Todo empezado, nada terminado.','Por qué pasa, lo que te cuesta sin que lo notes, y la regla simple que uso para acabar las cosas.'),'pin':'¿Cuántas cosas tienes a medias ahora mismo? Escribe solo el número.'})
D['2026-11-18']['ytl']={'kind':'rec','ep':'06','title':'Si tú no llenas tu semana, alguien más lo hace','script':EP6,'sub':SUB+'Se publica el martes 24.'}
D['2026-11-24']['ytl']=pub_steps({'kind':'pub','ep':'06','srt':False,'title':'Si tú no llenas tu semana, alguien más lo hace','desc':desc('El lunes abres los mensajes y tu semana ya tiene dueño.','Por qué lo tuyo siempre queda al final, y los dos bloques que pongo cada domingo.'),'pin':'¿Cuántas horas de esta semana elegiste tú? Escribe solo el número.'})
D['2026-11-25']['ytl']={'kind':'rec','ep':'07','title':'Por qué tus hábitos duran dos semanas','script':EP7,'sub':SUB+'Se publica el martes 1 de diciembre.'}
json.dump(p,open('plan.json','w'),ensure_ascii=False)
print('ok')
