// SEMANA 1 · 2–8 nov · contenido completo
const { G, L } = require('./lib.js');
const { R, B, txt, lab, lines, chrome, T, wid } = L;
// helpers de composición centrada: bloque gráfico (alto gh) + texto (2 líneas) centrados juntos
const stack = (H, gh, gap = 100, th = 60) => { const y0 = H / 2 - (gh + gap + th) / 2; return { y0, ty: y0 + gh + gap + th / 2 }; };

const P = [];
// ── LUN 2 · Tachado nº 05
P.push({ d: '2026-11-02', s: 'tachado', n: 5,
  A: { th: 'N', title: 'Prometer → Cumplir.', draw: T.tachado(5, 'Prometer', 'Cumplir.'),
    cap: 'Prometer no cuesta nada. Cumplir es lo único que se nota.\nMándaselo a quien siempre dice “ya mismo”.' },
  B: { th: 'W', title: 'Esperar → Pedir.', draw: T.tachado(5, 'Esperar', 'Pedir.'),
    cap: 'Nadie adivina lo que necesitas.\nMándaselo a quien sigue esperando que se den cuenta.' } });
// ── MAR 3 · 100 veces nº 05
P.push({ d: '2026-11-03', s: 'cien', n: 5,
  A: { th: 'W', title: 'UN SEGUNDO NADA MÁS ×100', draw: T.cien2(5, 'UN SEGUNDO NADA MÁS.', 'Y SE ME FUE LA HORA.', 13),
    cap: 'Nadie decide perder una hora. Se pierde de a un segundo.\nMándaselo a quien “solo va a revisar algo”.' },
  B: { th: 'N', title: 'LO REVISO Y YA ×100', draw: T.cien2(5, 'LO REVISO Y YA.', 'Y YA ANOCHECIÓ.', 8),
    cap: 'El “y ya” más largo del día.\nMándaselo a quien abre el celular para una cosa.' } });
// ── MIÉ 4 · Ecuación nº 05
P.push({ d: '2026-11-04', s: 'ecuacion', n: 5,
  A: { th: 'N', title: 'Leer sin aplicar = 0', draw: (o, W, H) => { chrome(o, W, H, 'ecuacion', 5);
      const bw = 64, bh = 92, g = 14, cols = 5, gh = 2 * bh + g; const { y0, ty } = stack(H, gh);
      const tot = cols * bw + (cols - 1) * g, x0 = W / 2 - (tot + 390) / 2;
      for (let i = 0; i < 10; i++) { const x = x0 + (i % cols) * (bw + g), y = y0 + Math.floor(i / cols) * (bh + g); B(o, x, y, bw, bh, .85); for (let k = 0; k < 3; k++) R(o, x + 12, y + 20 + k * 16, bw - 24, 2, .5); }
      const ex = x0 + tot + 90; txt(o, '=', ex + 30, y0 + gh / 2, 48, .8); const bx = ex + 120 + 30; B(o, bx, y0 + gh / 2 - 75, 150, 150, 1, 2); txt(o, '0', bx + 75, y0 + gh / 2, 44, 1);
      lines(o, W, ty, ['10 libros sin aplicar', 'cambian lo mismo que 0.']); },
    cap: 'Leer sin aplicar es entretenimiento con buena fama.\nGuárdalo para el próximo libro que empieces.' },
  B: { th: 'W', title: '1 h de foco > 4 h a pedazos', draw: (o, W, H) => { chrome(o, W, H, 'ecuacion', 5);
      const bw = 720, gh = 220; const { y0, ty } = stack(H, gh); const x0 = W / 2 - bw / 2;
      lab(o, '1 HORA SIN INTERRUPCIONES', x0, y0, 'left', .6); R(o, x0, y0 + 24, bw * .25, 40, .95); B(o, x0, y0 + 24, bw, 40, .25, 1.5);
      txt(o, '>', W / 2, y0 + 112, 40, .8);
      lab(o, '4 HORAS A PEDAZOS', x0, y0 + 160, 'left', .6); B(o, x0, y0 + 180, bw, 40, .25, 1.5); for (let i = 0; i < 16; i++) R(o, x0 + i * (bw / 16) + 4, y0 + 184, bw / 16 * .35, 32, .55);
      lines(o, W, ty, ['Una hora sin interrupciones', 'vale más que cuatro a pedazos.']); },
    cap: 'Cada interrupción te cuesta más de lo que dura.\nMándaselo a quien trabaja con el chat abierto.' } });
// ── JUE 5 · Truco nº 05
const sopa = (word, odd, seed) => (o, W, H) => { chrome(o, W, H, 'truco', 5); let s = seed; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const cols = 6, rows = 13, cw = 150, lh = 62, gh = (rows - 1) * lh; const y0 = H / 2 - gh / 2 + 40, x0 = W / 2 - (cols - 1) * cw / 2, oi = Math.floor(rnd() * cols * rows * .6) + 20;
  txt(o, 'Encuentra el “' + odd + '”.', W / 2, y0 - 110, 36, 1);
  for (let i = 0; i < cols * rows; i++) txt(o, i === oi ? odd : word, x0 + (i % cols) * cw, y0 + Math.floor(i / cols) * lh, 22, .55, 'center', 400); };
const blanco = (msg, seed) => (o, W, H) => { chrome(o, W, H, 'truco', 5); let s = seed; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const fill = ['mañana', 'luego', 'después', 'quizás', 'otro día', 'ya veré', 'pronto', 'algún día', 'tal vez', 'más tarde'];
  const rows = 11, lh = 66, gh = (rows - 1) * lh, y0 = H / 2 - gh / 2 + 40; txt(o, 'Lee solo lo blanco.', W / 2, y0 - 110, 36, 1);
  const mw = msg.split(' '); const slots = new Set(); while (slots.size < mw.length) slots.add(Math.floor(rnd() * rows)); const sl = [...slots].sort((a, b) => a - b);
  for (let r = 0; r < rows; r++) { const k = sl.indexOf(r); const ws = [fill[Math.floor(rnd() * 10)], fill[Math.floor(rnd() * 10)], fill[Math.floor(rnd() * 10)]]; const pos = Math.floor(rnd() * 3); if (k >= 0) ws[pos] = mw[k];
    const line = ws.join('   '); let x = W / 2 - wid(o, line, 26) / 2; ws.forEach((w, j) => { txt(o, w, x, y0 + r * lh, 26, k >= 0 && j === pos ? 1 : .22, 'left'); x += wid(o, w + '   ', 26); }); } };
P.push({ d: '2026-11-05', s: 'truco', n: 5,
  A: { th: 'N', title: 'Encuentra el “hoy”', draw: sopa('mañana', 'hoy', 7), cap: '¿Cuánto tardaste? Así de escondido está el “hoy” entre tantos “mañana”.\nMándaselo a alguien y cuenta los segundos.' },
  B: { th: 'N', title: 'Lee solo lo blanco', draw: blanco('deja el celular un rato', 3), cap: 'Ya lo leíste. Ahora hazlo.\nMándaselo a quien lo necesita leer hoy.' } });
// ── VIE 6 · Fondo nº 05 (fondos + anuncio)
P.push({ d: '2026-11-06', s: 'fondo', n: 5,
  A: { th: 'N', title: 'Hazlo simple.', f: ['Hazlo simple.'], lockTh: 'N', home: { k: 'puntos', th: 'N' }, lay: 'hero', line: 'Para cada vez que lo complicas.',
    cap: 'Dos fondos para la semana. Están en historias.\nMándaselo a quien complica todo.' },
  B: { th: 'W', title: 'Una cosa. Bien hecha.', f: ['Una cosa.', 'Bien hecha.'], lockTh: 'W', home: { k: 'barra', th: 'W' }, lay: 'escalera', line: 'Para cada vez que haces diez a medias.',
    cap: 'Dos fondos nuevos. Captúralos en historias.\nMándaselo a quien tiene 20 pestañas abiertas.' } });
// ── SÁB 7 · Semana nº 05 (carrusel)
P.push({ d: '2026-11-07', s: 'semana', n: 5,
  A: { th: 'N', title: '3 cosas que hago cuando no tengo ganas', sl: [['3 cosas que hago', 'cuando no tengo ganas.'], ['01', 'Bajo la meta', 'a cinco minutos.'], ['02', 'Cambio de lugar.'], ['03', 'Lo hago mal,', 'pero lo hago.'], ['Las ganas llegan', 'después.']],
    cap: 'Ninguna necesita motivación.\nGuárdalo para el próximo día sin ganas.' },
  B: { th: 'W', title: '3 señales de que estás ocupado pero no avanzas', sl: [['3 señales de que', 'estás ocupado', 'pero no avanzas.'], ['01', 'Terminas cansado', 'y sin nada hecho.'], ['02', 'Tu lista crece', 'más de lo que tachas.'], ['03', 'Respondes todo,', 'menos lo importante.'], ['Ocupado', 'no es avanzar.']],
    cap: '¿Cuántas te pasaron esta semana?\nMándaselo a quien vive “a full”.' } });
// ── DOM 8 · Sin filtro nº 04
P.push({ d: '2026-11-08', s: 'sinfiltro', n: 4,
  A: { th: 'N', title: 'Nadie se acuerda de tus excusas', draw: (o, W, H) => { chrome(o, W, H, 'sinfiltro', 4);
      const ex = ['no tuve tiempo', 'estaba cansado', 'no era el momento', 'mañana sí', 'no sabía cómo'], lh = 70, gh = (ex.length - 1) * lh + 40; const { y0, ty } = stack(H, gh);
      ex.forEach((e, i) => { const y = y0 + 20 + i * lh, w = wid(o, e, 32); txt(o, e, W / 2, y, 32, .3); R(o, W / 2 - w / 2 - 10, y, w + 20, 2, .6); });
      lines(o, W, ty, ['Nadie se acuerda de tus excusas.', 'Se acuerdan de lo que hiciste.']); },
    cap: 'Las excusas no dejan rastro. Lo que haces, sí.\nMándaselo a quien tiene una excusa para todo.' },
  B: { th: 'W', title: 'Ver tutoriales no es aprender', draw: (o, W, H) => { chrome(o, W, H, 'sinfiltro', 4);
      const bw = 680, gh = 200; const { y0, ty } = stack(H, gh); const x0 = W / 2 - bw / 2;
      lab(o, 'VISTO', x0, y0, 'left', .6); lab(o, '100%', x0 + bw, y0, 'right', .6); B(o, x0, y0 + 24, bw, 36, .3, 1.5); R(o, x0, y0 + 24, bw, 36, .9);
      lab(o, 'APLICADO', x0, y0 + 140, 'left', .6); lab(o, '0%', x0 + bw, y0 + 140, 'right', .6); B(o, x0, y0 + 164, bw, 36, .3, 1.5);
      lines(o, W, ty, ['Ver tutoriales no es aprender.', 'Es mirar a otro hacerlo.']); },
    cap: 'Pausa el video. Hazlo tú. Mal, pero tú.\nMándaselo a quien tiene 40 videos guardados.' } });
module.exports = P;
