// Historias de la semana 1 (1080x1920). Zona segura: 250 arriba, 340 abajo.
const { G, L, OUT } = require('./lib.js'); const { Canvas, loadImage } = require('skia-canvas');
const { R, B, txt, lab, lines, wid } = L; const W = 1080, H = 1920;
const head = (o, t) => { lab(o, '@jaywrkr', 90, 270); lab(o, t, W - 90, 270, 'right'); txt(o, 'simple.', W / 2, H - 380, 26, .45); };
const S = [
  ['st-1102-slider.jpg', 'N', o => { head(o, 'historia'); lines(o, W, 700, ['¿Cuánto de lo que prometes', 'lo cumples?']); B(o, 190, 900, 700, 200, .35); lab(o, 'aquí va el slider', W / 2, 1000, 'center', .35); }],
  ['st-1103-quiz.jpg', 'W', o => { head(o, 'adivina'); lines(o, W, 640, ['¿Cuántas veces', 'tomé el celular ayer?']); lab(o, 'mañana te digo el número real', W / 2, 800, 'center', .5); B(o, 190, 900, 700, 360, .35); lab(o, 'aquí va el quiz · 20 / 50 / 80', W / 2, 1080, 'center', .35); }],
  ['st-1104-proceso.jpg', 'N', async o => { head(o, 'antes / después'); lab(o, 'boceto', 290, 460, 'center', .6); lab(o, 'final', 790, 460, 'center', .6); B(o, 582, 482, 416, 516, .4);
     B(o, 90, 490, 400, 500, .4); for (let i = 1; i < 6; i++) R(o, 90 + i * 400 / 6, 490, 1, 500, .15); for (let i = 1; i < 8; i++) R(o, 90, 490 + i * 500 / 8, 400, 1, .15); B(o, 150, 620, 280, 110, .5); R(o, 150, 800, 280, 3, .5); R(o, 150, 850, 200, 3, .5);
     lines(o, W, 1200, ['Primero la idea en una cuadrícula.', 'Después, todo lo que sobra se va.']); }],
  ['st-1105-elige.jpg', 'N', o => { head(o, 'elige tú'); lines(o, W, 560, ['¿Cuál fondo publico mañana?']); lab(o, 'A', 287, 700, 'center', .8); lab(o, 'B', 793, 700, 'center', .8); B(o, 160, 730, 254, 550, .5); B(o, 666, 730, 254, 550, .5); B(o, 190, 1330, 700, 110, .3); lab(o, 'aquí va la encuesta A / B', W / 2, 1385, 'center', .35); }],
  ['st-1106-cuenta.jpg', 'W', o => { head(o, 'youtube'); lines(o, W, 700, ['Episodio 04', 'el martes, 11:30.']); B(o, 190, 900, 700, 220, .35); lab(o, 'aquí va la cuenta regresiva', W / 2, 1010, 'center', .35); }],
  ['st-1107-pregunta.jpg', 'N', o => { head(o, 'respóndeme'); lines(o, W, 640, ['¿Qué excusa usas más?', '', 'Una de las respuestas', 'se vuelve el post del domingo.']); B(o, 190, 960, 700, 300, .35); lab(o, 'aquí va la caja de pregunta', W / 2, 1110, 'center', .35); }],
  ['st-1108-codigo.jpg', 'N', o => { head(o, 'detrás del código'); lab(o, 'así se hizo el post de hoy', 120, 520, 'left', .6);
     ['ex = ["no tuve tiempo",', '      "estaba cansado",', '      "no era el momento",', '      "mañana sí",', '      "no sabía cómo"]', '', 'for e in ex:', '    texto(e, alfa=0.3)', '    tachar(e)', '', 'escribe("Nadie se acuerda', '         de tus excusas.")']
       .forEach((l, i) => txt(o, l, 120, 600 + i * 52, 30, l.startsWith(' ') || l.startsWith('for') ? .7 : 1, 'left'));
     lines(o, W, 1360, ['Todo lo que publico', 'está hecho con código.']); }],
];
const paste = async (f, items) => { const c = new Canvas(W, H), x = c.getContext('2d'); x.drawImage(await loadImage(OUT + '/' + f), 0, 0); for (const [src, X, Y, w, h] of items) x.drawImage(await loadImage(OUT + '/' + src), X, Y, w, h); await c.toFile(OUT + '/' + f, { quality: .92 }); };
(async () => { for (const [f, th, fn] of S) { await G.render(W, H, th, 0, (o) => fn(o), f); process.stdout.write(f + ' '); }
  await paste('st-1104-proceso.jpg', [['c1104-a.jpg', 590, 490, 400, 500]]);
  await paste('st-1105-elige.jpg', [['c1106-a-bloqueo.jpg', 160, 730, 254, 550], ['c1106-b-bloqueo.jpg', 666, 730, 254, 550]]);
  console.log('ok'); })();
