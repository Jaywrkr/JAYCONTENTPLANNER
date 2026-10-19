// Historias para destacadas: EMPIEZA AQUÍ, PROCESO, PREGUNTAS (9:16)
const { render, setOut, thumb } = require('./gen.js');
const L = require('./clib.js');
const fs = require('fs');
const OUT = '/home/claude/campana/c'; setOut(OUT);
const W = 1080, H = 1920;
const HLMARK = {
  empieza: (o, x, y) => { L.R(o, x, y + 6, 16, 16); L.R(o, x + 24, y + 13.25, 60, 1.5); L.R(o, x + 84, y + 6, 1.5, 16); },
  proceso: (o, x, y) => { L.B(o, x, y + 4, 20, 20); L.B(o, x + 30, y + 4, 20, 20); L.R(o, x + 40, y + 4, 10, 20); L.R(o, x + 60, y + 4, 20, 20); },
  preguntas: (o, x, y) => L.txt(o, '?', x + 10, y + 14, 36, 1, 'center'),
};
const NAME = { empieza: 'EMPIEZA AQUÍ', proceso: 'PROCESO', preguntas: 'PREGUNTAS' };
function chrome(o, hl, i, n) {
  L.lab(o, '@jaywrkr', 90, 250); L.lab(o, NAME[hl] + '  ' + String(i).padStart(2, '0') + ' / ' + String(n).padStart(2, '0'), W - 90, 250, 'right');
  HLMARK[hl](o, 90, 1590); L.lab(o, 'simple.', W - 90, 1604, 'right', 0.45);
}
const lines = (o, cy, ls) => L.lines(o, W, cy, ls);

const SLIDES = {
  empieza: ['N', [
    o => lines(o, H / 2, ['Soy Jay.', { t: 'Creativo.', big: true }]),
    o => lines(o, H / 2, ['Publico una verdad incómoda', 'al día.', '', 'Diseñada simple.']),
    o => { lines(o, 520, ['Cada día tiene su forma.']);
      [['tachado', 'LUN', 'Tachado'], ['cien', 'MAR', '100 veces'], ['ecuacion', 'MIÉ', 'Ecuación'], ['truco', 'JUE', 'Truco'], ['fondo', 'VIE', 'Fondo'], ['semana', 'SÁB', 'Semana'], ['sinfiltro', 'DOM', 'Sin filtro']]
        .forEach(([k, d, nm], i) => { const y = 680 + i * 100; L.R(o, 240, y - 50, 600, 1, 0.25); L.MARK[k](o, 260, y - 14, 28); L.lab(o, d, 340, y, 'left', 0.6); L.txt(o, nm, 440, y, 36, 1, 'left'); }); },
    o => { lines(o, 560, ['En qué ando.']);
      [['trabajo', ['@coresolutionsec', '@minervostudio']], ['música · VJ', ['@naturalnoise', '@jay.infinito']]]
        .forEach(([a, hs], g) => { const y0 = 760 + g * 300; L.lab(o, a, 240, y0, 'left', 0.5); hs.forEach((h, i) => L.txt(o, h, 240, y0 + 60 + i * 64, 36, 1, 'left')); L.R(o, 240, y0 + 60 + hs.length * 64, 600, 1, 0.25); }); },
    o => { lines(o, 640, ['Empieza por estas tres.']); [0, 1, 2].forEach(i => { L.B(o, 240 + i * 210, 820, 180, 225, 0.8); L.lab(o, '0' + (i + 1), 330 + i * 210, 932, 'center'); }); L.lab(o, 'siguiente historia →', W / 2, 1160, 'center', 0.5); },
    o => lines(o, H / 2, (process.env.CIERRE || 'Una verdad al día.|Te veo mañana.').split('|')),
  ]],
  proceso: ['W', [
    o => lines(o, H / 2, ['Cómo hago', 'cada post.']),
    ...[
      ['Negro o blanco.', o => { L.R(o, 440, 700, 100, 200); L.B(o, 540, 700, 100, 200); }],
      ['Una sola fuente.', o => L.txt(o, 'Aa', W / 2, 800, 120, 1)],
      ['Solo ángulos rectos.', o => { L.B(o, 440, 700, 200, 200); L.R(o, 440, 700, 30, 1.5); L.R(o, 440, 700, 1.5, 30); }],
      ['70% vacío.', o => { for (let i = 0; i < 10; i++) (i < 3 ? L.R : L.B)(o, 330 + i * 44, 790, 30, 30, 1, 1.2); }],
      ['El texto nunca grita.', o => L.txt(o, 'shh.', W / 2, 800, 20, 0.7, 'center', 400)],
      ['Todo se invierte.', o => { L.R(o, 440, 700, 100, 200); L.R(o, 590, 700, 100, 200); L.R(o, 480, 790, 20, 20, 0); L.B(o, 630, 790, 20, 20, 0); }],
      ['Termina en “simple.”', o => L.txt(o, 'simple.', W / 2, 800, 36, 1)],
    ].map(([t, fig], i) => o => { L.lab(o, 'REGLA ' + String(i + 1).padStart(2, '0'), W / 2, 600, 'center'); fig(o); lines(o, 1060, [t]); }),
    o => { lines(o, 560, ['Todo lo hago con código.']);
      ['font  = "Geist Mono"', 'color = negro | blanco', 'vacío = 70%', 'ángulo = 90°', 'final = "simple."'].forEach((l, i) => L.txt(o, l, 260, 760 + i * 70, 30, i === 4 ? 1 : 0.75, 'left')); },
  ]],
  preguntas: ['N', [
    o => lines(o, H / 2, ['Preguntas.', '', 'Las respondo los domingos.']),
    ...[
      ['¿Qué fuente usas?', ['Geist Mono.', 'Siempre la misma.']],
      ['¿Con qué haces los diseños?', ['Con código.', 'Cada post es un programa.']],
      ['¿Vendes algo?', ['No.', 'Comparto lo que me funciona.']],
      ['¿Puedo usar tus fondos?', ['Sí.', 'Para eso están.']],
      ['¿Por qué siempre “simple.”?', ['Porque casi siempre', 'sobra algo.']],
    ].map(([q, a]) => o => { L.B(o, 190, 620, 700, 200, 0.8); L.lab(o, 'PREGUNTA', 220, 660, 'left', 0.5); L.txt(o, q, W / 2, 740, 30, 1); lines(o, 1060, a); }),
    o => { lines(o, 620, ['Pregúntame', 'lo que quieras.']); L.B(o, 240, 820, 600, 240, 0.35); L.lab(o, 'aquí va el sticker de pregunta', W / 2, 940, 'center', 0.35); },
  ]],
};

(async () => {
  const out = {};
  for (const [hl, [th, list]] of Object.entries(SLIDES)) {
    if (process.env.ONLY && hl !== process.env.ONLY) continue;
    out[hl] = [];
    for (let i = 0; i < list.length; i++) {
      const f = (process.env.PREFIX || '') + `hl-${hl}-${String(i + 1).padStart(2, '0')}.jpg`;
      await render(W, H, th, 0, o => { chrome(o, hl, i + 1, list.length); list[i](o); }, f);
      out[hl].push(f);
    }
  }
  if (!process.env.ONLY) fs.writeFileSync('/home/claude/campana/hl.json', JSON.stringify(out));
  console.log(JSON.stringify(out));
})();
