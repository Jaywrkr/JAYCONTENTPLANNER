const { Canvas, FontLibrary } = require('skia-canvas'); const fs = require('fs');
const FD = '/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/reel/fonts/'; FontLibrary.use('Geist Mono', fs.readdirSync(FD).map(f => FD + f));
const W = 1280, H = 720;
function mk(name, inv, draw) { const c = new Canvas(W, H), o = c.getContext('2d'), fg = inv ? '#0a0a0a' : '#fafafa'; o.fillStyle = inv ? '#f4f4f2' : '#060606'; o.fillRect(0, 0, W, H);
  const T = (s, x, y, sz, a = 1, w = 300, al = 'center') => { o.font = `${w} ${sz}px "Geist Mono"`; o.globalAlpha = a; o.fillStyle = fg; o.textAlign = al; o.textBaseline = 'middle'; o.fillText(s, x, y); o.globalAlpha = 1; return o.measureText(s).width; };
  const R = (x, y, w, h, a = 1) => { o.globalAlpha = a; o.fillStyle = fg; o.fillRect(x, y, w, h); o.globalAlpha = 1; };
  const B = (x, y, w, h, lw = 3, a = 1) => { o.globalAlpha = a; o.strokeStyle = fg; o.lineWidth = lw; o.strokeRect(x, y, w, h); o.globalAlpha = 1; };
  draw({ T, R, B }); R(56, 52, 14, 14); B(76, 53, 12, 12, 2); c.toFileSync(`${__dirname}/ep02-mini-${name}.jpg`, { quality: .95 }); }
// A — un mes: 30 llenos, uno vacío
mk('a', 0, ({ T, R, B }) => { const s = 64, g = 16, cols = 10, x0 = (W - (cols * s + (cols - 1) * g)) / 2, y0 = 190;
  for (let i = 0; i < 30; i++) { const x = x0 + (i % cols) * (s + g), y = y0 + Math.floor(i / cols) * (s + g); i === 13 ? B(x, y, s, s, 3) : R(x, y, s, s, .92); }
  T('1 de 30', W / 2, y0 + 3 * (s + g) + 40, 30, .8); });
// B — tachado: mal mes → mal día
mk('b', 0, ({ T, R, B }) => { const y = 340, w1 = T('mal mes', 230, y, 88, .45, 300, 'left'); R(216, y - 2, w1 + 28, 6, .9); const x2 = 290 + w1 + 60; T('mal día.', x2, y, 88, 1, 400, 'left'); });
// C — invertido: nunca dos seguidos
mk('c', 1, ({ T, R, B }) => { const s = 120, g = 30, x0 = (W - (7 * s + 6 * g)) / 2, y = 270; for (let i = 0; i < 7; i++) { const x = x0 + i * (s + g); i === 3 ? B(x, y, s, s, 3) : R(x, y, s, s, .9); }
  T('nunca dos.', W / 2, y + s + 80, 40, 1, 400); });
