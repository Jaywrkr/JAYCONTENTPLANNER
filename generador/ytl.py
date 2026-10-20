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

Una verdad incómoda cada dos semanas, explicada simple.
Instagram: @jaywrkr"""
EP2="""[00:00]
Fallaste un día.
Y decides que ya no vale la pena.
Que ya lo dañaste.
Que mejor empiezas el lunes.
Ahí está el problema.
Un mal día no es un mal mes.

[00:25]
Haz la cuenta.
Piensa en un mes completo.
Un día malo es una casilla.
Las demás siguen ahí.
El problema no es el día malo.
Es lo que haces al día siguiente.

[01:20]
Lo que pasa casi siempre es esto.
Fallas un día y piensas: ya da igual.
Y fallas el segundo.
Y el siguiente.
Un día malo no te cuesta el mes.
Lo que te cuesta el mes es dejarlo ahí.

[02:20]
Hay una sola regla.
Nunca dos días seguidos.
Puedes fallar uno.
Nunca dos.
Si un día no lo hiciste, al siguiente sí.
Aunque sea cinco minutos.
Aunque sea mal.
Hecho a medias le gana a no hecho.

[03:10]
Entonces, esto.
Si hoy fallaste en algo, no lo sueltes.
Mañana haz lo mínimo.
Lo mínimo cuenta.
El mes no se pierde en un día.
Se pierde en el segundo.

[03:40]
Una pregunta.
¿Cuántas veces has dejado algo después de un solo día malo?
Escribe el número.
Solo el número.

[03:55]
Un mal día es un día.
Dos son el inicio de dejarlo.
Simple.
Nos vemos en dos semanas."""
D['2026-10-20']['ytl']={'kind':'pub','ep':'01','title':'Mañana + mañana + mañana = nunca','thumb':'yt-ep01.jpg','desc':EP1_DESC,
  'pin':'¿Hay algo que llevas más de un mes posponiendo para mañana? Solo responde: sí.',
  'sub':'Sube el video que te mandé en el chat (ep01-youtube.mp4). Público · no es para niños · idioma español · categoría Educación. Pantalla final: un video + suscribirse sobre los dos recuadros. Luego fija el comentario y sube una historia con el link.'}
D['2026-10-27']['ytl']={'kind':'rec','ep':'02','title':'Un mal día no es un mal mes','script':EP2,
  'sub':'En el auto, motor y aire apagados. Notas de voz en Sin pérdida, iPhone a 15–20 cm, a un lado de la boca. Una línea, 2 segundos de pausa. Si te equivocas, repite la línea. Al terminar, mándame el audio y la transcripción de Notas de voz por el chat. Se publica el martes 3 de noviembre.'}
json.dump(p,open('plan.json','w'),ensure_ascii=False)
print('ok')
