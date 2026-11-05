const { Canvas, FontLibrary } = require('skia-canvas'); const fs = require('fs');
const FD = '/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/reel/fonts/'; FontLibrary.use('Geist Mono', fs.readdirSync(FD).map(f => FD + f));
const W = 1280, H = 720;
function mk(name, inv, draw) { const c = new Canvas(W, H), o = c.getContext('2d'), fg = inv ? '#0a0a0a' : '#fafafa'; o.fillStyle = inv ? '#f4f4f2' : '#060606'; o.fillRect(0, 0, W, H);
  const T = (s, x, y, sz, a = 1, w = 300, al = 'center', col) => { o.font = `${w} ${sz}px "Geist Mono"`; o.globalAlpha = a; o.fillStyle = col || fg; o.textAlign = al; o.textBaseline = 'middle'; o.fillText(s, x, y); o.globalAlpha = 1; return o.measureText(s).width; };
  const R = (x, y, w, h, a = 1) => { o.globalAlpha = a; o.fillStyle = fg; o.fillRect(x, y, w, h); o.globalAlpha = 1; };
  const B = (x, y, w, h, lw = 3, a = 1) => { o.globalAlpha = a; o.strokeStyle = fg; o.lineWidth = lw; o.strokeRect(x, y, w, h); o.globalAlpha = 1; };
  draw({ T, R, B, inv }); R(56, 52, 14, 14); B(76, 53, 12, 12, 2); c.toFileSync(`/home/claude/campana/c/yt-ep02-${name}.jpg`, { quality: .95 }); }
// A — cinco "sí" llenos se comen tu día; lo tuyo queda vacío
mk('a', 0, ({ T, R, B }) => { const s = 130, g = 22, lh = 26, lg = 40, gh = s + lg + lh / 2, x0 = (W - (6 * s + 5 * g)) / 2, y = Math.round((H - gh) / 2);
  for (let i = 0; i < 6; i++) { const x = x0 + i * (s + g); if (i < 5) { R(x, y, s, s, .92); T('sí', x + s / 2, y + s / 2 + 0.5, 40, 1, 400, 'center', '#060606'); } else { B(x, y, s, s, 3); T('lo tuyo', x + s / 2, y + s + lg, lh, 1, 400); } } });
// B — tachado: sí → no.
mk('b', 0, ({ T, R, B }) => { const y = 340, w1 = T('sí', 400, y, 110, .45, 300, 'left'); R(388, y - 2, w1 + 24, 7, .9); const x2 = 400 + w1 + 120; const w2 = T('no.', x2, y, 110, 1, 400, 'left'); B(x2 - 40, y - 110, w2 + 80, 220, 4); });
// C — invertido: 1 sí = 1 hora
mk('c', 1, ({ T, R, B }) => { T('1 sí', W / 2 - 240, 330, 72, 1, 400); T('=', W / 2, 330, 72, .6); T('1 h', W / 2 + 220, 330, 72, 1, 400); R(W / 2 - 300, 430, 600, 4, .9); T('que no es tuya', W / 2, 480, 28, .7); });
