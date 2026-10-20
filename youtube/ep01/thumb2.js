const { Canvas, FontLibrary } = require('skia-canvas'); const fs = require('fs');
const FD = '/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/reel/fonts/'; FontLibrary.use('Geist Mono', fs.readdirSync(FD).map(f => FD + f));
const W = 1280, H = 720;
function mk(name, inv, draw) {
  const c = new Canvas(W, H), o = c.getContext('2d'), fg = inv ? '#0a0a0a' : '#fafafa', bg = inv ? '#f4f4f2' : '#060606';
  o.fillStyle = bg; o.fillRect(0, 0, W, H);
  const T = (s, x, y, sz, a = 1, w = 300, al = 'center') => { o.font = `${w} ${sz}px "Geist Mono"`; o.globalAlpha = a; o.fillStyle = fg; o.textAlign = al; o.textBaseline = 'middle'; o.fillText(s, x, y); o.globalAlpha = 1; return o.measureText(s).width; };
  const R = (x, y, w, h, a = 1) => { o.globalAlpha = a; o.fillStyle = fg; o.fillRect(x, y, w, h); o.globalAlpha = 1; };
  const B = (x, y, w, h, lw = 3, a = 1) => { o.globalAlpha = a; o.strokeStyle = fg; o.lineWidth = lw; o.strokeRect(x, y, w, h); o.globalAlpha = 1; };
  draw({ o, T, R, B });
  // marca discreta arriba a la izquierda (abajo a la derecha lo tapa la duración)
  R(56, 52, 14, 14); B(76, 53, 12, 12, 2);
  c.toFileSync(`${__dirname}/${name}.jpg`, { quality: .95 });
}
// A — la ecuación en cuadrados: tres llenos (mañana) = uno vacío (nunca)
mk('mini-A', 0, ({ T, R, B }) => {
  const s = 170, y = 250, xs = [120, 360, 600];
  xs.forEach(x => { R(x, y, s, s, .92); T('mañana', x + s / 2, y + s + 42, 30, .75); });
  T('+', 315, y + s / 2, 44, .6); T('+', 555, y + s / 2, 44, .6); T('=', 840, y + s / 2, 52, .8);
  B(930, y, s, s, 4); T('nunca', 930 + s / 2, y + s + 42, 30, 1, 400);
});
// B — tachado: mañana → hoy
mk('mini-B', 0, ({ T, R, B }) => {
  const y = 340, w1 = T('mañana', 250, y, 92, .45, 300, 'left'); R(236, y - 2, w1 + 28, 6, .9);
  T('hoy.', 300 + w1 + 70, y, 92, 1, 400, 'left');
  B(300 + w1 + 40, y - 95, 270, 190, 4);
});
// C — invertido: 7 días, ninguno hecho
mk('mini-C', 1, ({ T, R, B }) => {
  const s = 120, gp = 30, x0 = (W - (7 * s + 6 * gp)) / 2, y = 250;
  for (let i = 0; i < 7; i++) { B(x0 + i * (s + gp), y, s, s, 3, .9); T('mañana', x0 + i * (s + gp) + s / 2, y + s + 36, 20, .6); }
  T('0 / 7', W / 2, 160, 56, 1, 400);
});
['A', 'B', 'C'].forEach(()=>0);
