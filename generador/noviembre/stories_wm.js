// Historias 9–29 nov (1080x1920). Zona segura: 250 arriba, 340 abajo.
const { G, L, OUT } = require('./lib.js'); const { Canvas, loadImage } = require('skia-canvas');
const { R, B, txt, lab, lines } = L; const W = 1080, H = 1920;
const head = (o, t) => { lab(o, '@jaywrkr', 90, 270); lab(o, t, W - 90, 270, 'right'); txt(o, 'simple.', W / 2, H - 380, 26, .45); };
const box = (o, y, h, l) => { B(o, 190, y, 700, h, .35); lab(o, l, W / 2, y + h / 2, 'center', .35); };
const F = {
  frase: (q) => o => { head(o, 'termina la frase'); lines(o, W, 700, q); box(o, 900, 300, 'aquí va la caja de pregunta'); },
  esto: (q, a, b) => o => { head(o, 'esto o aquello'); lines(o, W, 640, q); B(o, 160, 820, 340, 340, .6); B(o, 580, 820, 340, 340, .6); txt(o, a, 330, 990, 34, 1); txt(o, b, 750, 990, 34, 1); box(o, 1250, 110, 'aquí va la encuesta'); },
  slider: (q) => o => { head(o, 'historia'); lines(o, W, 700, q); box(o, 900, 200, 'aquí va el slider'); },
  elige: (a, b) => o => { head(o, 'elige tú'); lines(o, W, 560, ['¿Cuál fondo publico mañana?']); lab(o, 'A', 287, 700, 'center', .8); lab(o, 'B', 793, 700, 'center', .8); B(o, 160, 730, 254, 550, .5); B(o, 666, 730, 254, 550, .5); box(o, 1330, 110, 'aquí va la encuesta A / B'); },
  cuenta: (ep, cuando) => o => { head(o, 'youtube'); lines(o, W, 700, ['Episodio ' + ep, cuando]); box(o, 900, 220, 'aquí va la cuenta regresiva'); },
  quiz: (q, nota, ops) => o => { head(o, 'adivina'); lines(o, W, 640, q); lab(o, nota, W / 2, 800, 'center', .5); box(o, 900, 360, 'aquí va el quiz · ' + ops); },
  pregunta: (q) => o => { head(o, 'respóndeme'); lines(o, W, 640, q); box(o, 960, 300, 'aquí va la caja de pregunta'); },
  encuesta: (q, ops) => o => { head(o, 'encuesta'); lines(o, W, 660, q); ops.forEach((s, i) => { B(o, 190, 860 + i * 130, 700, 100, .5); txt(o, s, W / 2, 910 + i * 130, 32, .9); }); },
  proceso: () => o => { head(o, 'antes / después'); lab(o, 'boceto', 290, 460, 'center', .6); lab(o, 'final', 790, 460, 'center', .6); B(o, 582, 482, 416, 516, .4);
    B(o, 90, 490, 400, 500, .4); for (let i = 1; i < 6; i++) R(o, 90 + i * 400 / 6, 490, 1, 500, .15); for (let i = 1; i < 8; i++) R(o, 90, 490 + i * 500 / 8, 400, 1, .15); B(o, 150, 640, 280, 70, .5); R(o, 150, 800, 280, 3, .5); R(o, 150, 850, 200, 3, .5);
    lines(o, W, 1200, ['Primero, la idea en una cuadrícula.', 'Después, se va todo lo que sobra.']); },
  codigo: (titulo, code, cierre) => o => { head(o, 'detrás del código'); lab(o, titulo, 120, 520, 'left', .6);
    code.forEach((l, i) => txt(o, l, 120, 600 + i * 52, 30, /^\s|^for|^if/.test(l) ? .7 : 1, 'left')); lines(o, W, 1360, cierre); },
};
const S = [
  ['st-1109-frase.jpg', 'N', F.frase(['Esta semana', 'me enfoco en ___.'])],
  ['st-1110-esto.jpg', 'W', F.esto(['En la noche:'], 'libro', 'celular')],
  ['st-1111-slider.jpg', 'N', F.slider(['¿Cuántas veces dijiste “sí”', 'esta semana sin querer?'])],
  ['st-1112-elige.jpg', 'N', F.elige()],
  ['st-1113-cuenta.jpg', 'W', F.cuenta('05', 'el martes, 11:30.')],
  ['st-1114-codigo.jpg', 'N', F.codigo('así se hizo el post del miércoles', ['for i in range(7):', '    cuadro(lleno, "sí")', '', 'escribe("=")', 'cuadro(vacío, "lo tuyo")', '', 'escribe("Cada sí a otros', '         es un no a lo tuyo.")'], ['Siete líneas.', 'Esa es toda la idea.'])],
  ['st-1115-quiz.jpg', 'W', F.quiz(['¿Cuántas horas', 'de pantalla tuve ayer?'], 'mañana te digo el número real', '2 h / 4 h / 6 h')],
  ['st-1116-proceso.jpg', 'N', F.proceso()],
  ['st-1117-pregunta.jpg', 'N', F.pregunta(['¿Qué llevas meses', 'empezando “el lunes”?', '', 'Respondo algunas', 'el domingo.'])],
  ['st-1118-encuesta.jpg', 'W', F.encuesta(['¿Cuántas pestañas', 'tienes abiertas ahora?'], ['1 a 5', '6 a 20', 'más de 20'])],
  ['st-1119-elige.jpg', 'W', F.elige()],
  ['st-1120-cuenta.jpg', 'N', F.cuenta('06', 'el martes, 11:30.')],
  ['st-1121-frase.jpg', 'W', F.frase(['Me cuesta decir que no', 'cuando ___.'])],
  ['st-1122-slider.jpg', 'N', F.slider(['¿Qué tan larga es', 'tu lista de pendientes?'])],
  ['st-1123-proceso.jpg', 'W', F.proceso()],
  ['st-1124-esto.jpg', 'N', F.esto(['Cuando se te ocurre algo:'], 'lo hago', 'lo anoto')],
  ['st-1125-codigo.jpg', 'N', F.codigo('así se hizo el post de hoy', ['fila(ganas, nada)', 'escribe("= nada")', '', 'fila(sin_ganas, "5 min")', 'escribe("= algo")', '', 'if ganas:', '    no_importa()'], ['Las ganas no están', 'en la ecuación.'])],
  ['st-1126-elige.jpg', 'N', F.elige()],
  ['st-1127-cuenta.jpg', 'W', F.cuenta('07', 'el martes 1, 11:30.')],
  ['st-1128-pregunta.jpg', 'W', F.pregunta(['¿Qué una cosa', 'vas a terminar', 'antes de diciembre?'])],
  ['st-1129-slider.jpg', 'N', F.slider(['¿Cómo te fue', 'en noviembre?'])],
];
const paste = async (f, items) => { const c = new Canvas(W, H), x = c.getContext('2d'); x.drawImage(await loadImage(OUT + '/' + f), 0, 0); for (const [src, X, Y, w, h] of items) x.drawImage(await loadImage(OUT + '/' + src), X, Y, w, h); await c.toFile(OUT + '/' + f, { quality: .92 }); };
(async () => { for (const [f, th, fn] of S) { await G.render(W, H, th, 0, (o) => fn(o), f); process.stdout.write(f + ' '); }
  for (const [f, d] of [['st-1112-elige.jpg', '1113'], ['st-1119-elige.jpg', '1120'], ['st-1126-elige.jpg', '1127']]) await paste(f, [[`c${d}-a-bloqueo.jpg`, 160, 730, 254, 550], [`c${d}-b-bloqueo.jpg`, 666, 730, 254, 550]]);
  await paste('st-1116-proceso.jpg', [['c1116-a.jpg', 590, 490, 400, 500]]); await paste('st-1123-proceso.jpg', [['c1123-a.jpg', 590, 490, 400, 500]]);
  console.log('ok'); })();
