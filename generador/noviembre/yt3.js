// Miniaturas episodio 03 · Por qué no puedes soltar el teléfono
const { Canvas, FontLibrary } = require('skia-canvas'); const fs = require('fs');
const FD = '/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/reel/fonts/'; FontLibrary.use('Geist Mono', fs.readdirSync(FD).map(f => FD + f));
const W = 1280, H = 720;
function mk(name, inv, draw) { const c = new Canvas(W, H), o = c.getContext('2d'), fg = inv ? '#0a0a0a' : '#fafafa'; o.fillStyle = inv ? '#f4f4f2' : '#060606'; o.fillRect(0, 0, W, H);
  const T = (s, x, y, sz, a = 1, w = 300, al = 'center') => { o.font = `${w} ${sz}px "Geist Mono"`; o.globalAlpha = a; o.fillStyle = fg; o.textAlign = al; o.textBaseline = 'middle'; o.fillText(s, x, y); o.globalAlpha = 1; return o.measureText(s).width; };
  const R = (x, y, w, h, a = 1) => { o.globalAlpha = a; o.fillStyle = fg; o.fillRect(x, y, w, h); o.globalAlpha = 1; }, B = (x, y, w, h, lw = 3, a = 1) => { o.globalAlpha = a; o.strokeStyle = fg; o.lineWidth = lw; o.strokeRect(x, y, w, h); o.globalAlpha = 1; };
  draw({ T, R, B }); R(56, 52, 14, 14); B(76, 53, 12, 12, 2); c.toFileSync(`/home/claude/campana/c/yt-ep03-${name}.jpg`, { quality: .95 }); }
mk('a', 0, ({ T, R, B }) => { const pw = 220, ph = 440, x = W / 2 - pw / 2 - 260, y = H / 2 - ph / 2; B(x, y, pw, ph, 3); R(x + pw / 2 - 25, y + 18, 50, 5, .6); T('50', x + pw / 2, y + ph / 2 - 20, 72, 1, 200); T('veces al día', x + pw / 2, y + ph / 2 + 50, 20, .7, 400);
  T('100 min', W / 2 + 220, H / 2 - 30, 72, 1, 400); T('que no son tuyos', W / 2 + 220, H / 2 + 50, 26, .7); });
mk('b', 0, ({ T, R }) => { const y = H / 2, w1 = T('en la mano', 200, y, 72, .45, 300, 'left'); R(190, y - 2, w1 + 20, 6, .9); T('lejos.', 200 + w1 + 70, y, 72, 1, 400, 'left'); });
mk('c', 1, ({ T, R, B }) => { T('1:00:00', W / 2, H / 2 - 30, 110, 1, 200); R(W / 2 - 300, H / 2 + 70, 600, 4, .9); T('teléfono lejos', W / 2, H / 2 + 120, 30, .7); });
