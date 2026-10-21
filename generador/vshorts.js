// Shorts/TikTok nativos 9:16: el arte se recompone en vertical y se revela por cuadros (marca), luego zoom lento.
const { makeBG } = require('./gen.js');
const L = require('./clib.js');
const DATA = require('./cdata2.js');
const { Canvas } = require('skia-canvas');
const { spawn, execSync } = require('child_process');
const OUT = '/home/claude/campana/c', W = 1080, H = 1920, FPS = 30;
const from = process.argv[2] || '2026-10-21', only = process.argv[3];
const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2, clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const EQT = (o) => o;
function slidesFor(day, o, n) { // devuelve [{th, idx, draw}]
  const s = day.s; let idx = o.idx ?? (n * 3 + (o === day.B ? 1 : 0));
  if (o.k) return [{ th: o.th, idx, draw: L.T.tachado(s === 'tachado' ? n : 'EXTRA', o.k[0], o.k[1]) }];
  if (o.c) return [{ th: o.th, idx, draw: (o.v2 ? L.T.cien2 : L.T.cien)(n, o.c[0], o.c[1], o.row ?? 5) }];
  if (o.e) return [{ th: o.th, idx, draw: (c, w, h) => { L.chrome(c, w, h, 'ecuacion', n); L.EQ[o.e](c, w, h); } }];
  if (o.ts) return [{ th: o.th, idx, draw: (c, w, h) => { L.chrome(c, w, h, 'truco', n); L.TS[o.ts](c, w, h); } }];
  if (o.sf) return [{ th: o.th, idx, draw: (c, w, h) => { L.chrome(c, w, h, 'sinfiltro', n); L.SFG[o.sf](c, w, h); } }];
  if (o.sl) return o.sl.map((ls, i) => ({ th: o.th, idx, draw: L.T.slide(n, i + 1, o.sl.length, ls) }));
  if (o.f) { const ph = o.single ? [o.f[0], { t: o.f[1] || '', big: true }].filter(x => typeof x === 'string' ? x : x.t) : o.f;
    return [{ th: o.lockTh || o.th, idx: o.lockIdx ?? idx, draw: (c, w, h) => { L.chrome(c, w, h, 'fondo', n); L.lines(c, w, h / 2, ph); } }]; }
  return null;
}
async function make(slides, file) {
  const bg = makeBG(W, H), CELL = 60, cols = Math.ceil(W / CELL), rows = Math.ceil(H / CELL), N = cols * rows;
  const per = slides.length > 1 ? 1.8 : 9, DUR = slides.length > 1 ? per * slides.length + .6 : 9;
  const ovs = slides.map(sl => { const c = new Canvas(W, H), o = c.getContext('2d'); o.fillStyle = '#000'; o.fillRect(0, 0, W, H); sl.draw(o, W, H); return c; });
  slides.forEach(sl => { if (sl.th === 'M') sl.th = sl.idx % 2 ? 'N' : 'W'; });
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${W}x${H}`, '-framerate', '' + FPS, '-i', '-', '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo', '-shortest', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-movflags', '+faststart', OUT + '/' + file], { stdio: ['pipe', 'inherit', 'inherit'] });
  const fr = new Canvas(W, H), o = fr.getContext('2d'); let lastTh = null;
  for (let f = 0; f < Math.round(DUR * FPS); f++) {
    const t = f / FPS, si = Math.min(slides.length - 1, Math.floor(t / per)), sl = slides[si], lt = t - si * per;
    const inv = slides.length === 1 && t >= 5.5, th = inv ? (sl.th === 'N' ? 'W' : 'N') : sl.th; const key = th + ':' + sl.idx; if (key !== lastTh) { if (th === 'N') bg.solid(4); else if (th === 'W') bg.solid(250); else bg.mesh(sl.idx * 2.7, sl.idx % 2 ? 'dark' : 'light', sl.idx); lastTh = key; }
    const rv = slides.length > 1 ? ease(clamp((lt - .1) / .6)) : ease(clamp((t - .1) / 1.7)), z = 1 + (slides.length > 1 ? .02 * lt / per : .05 * clamp((t - 1.8) / 7.2));
    o.setTransform(1, 0, 0, 1, 0, 0); o.fillStyle = '#000'; o.fillRect(0, 0, W, H);
    o.setTransform(z, 0, 0, z, W / 2 * (1 - z), H / 2 * (1 - z)); o.drawImage(ovs[si], 0, 0); o.setTransform(1, 0, 0, 1, 0, 0);
    const k = Math.floor(rv * N); o.fillStyle = '#000';
    if (k < N) { const r0 = Math.floor(k / cols), c0 = k % cols; o.fillRect(c0 * CELL, r0 * CELL, W - c0 * CELL, CELL); o.fillRect(0, (r0 + 1) * CELL, W, H); }
    // borde de la celda que se revela (cursor cuadrado)
    if (k < N && rv > 0) { const r0 = Math.floor(k / cols), c0 = k % cols; o.fillStyle = '#fff'; o.fillRect(c0 * CELL + 18, r0 * CELL + 18, 24, 24); }
    const buf = await bg.compose(fr, sl.th === 'M' ? 18 : 6);
    if (!ff.stdin.write(Buffer.from(buf))) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  execSync(`ffmpeg -y -loglevel error -ss ${DUR - 1} -i ${OUT}/${file} -frames:v 1 -vf scale=540:-2 -q:v 4 ${OUT}/${file.replace('.mp4', '-poster.jpg')}`);
}
(async () => {
  const cnt = {}; let made = 0;
  for (const day of DATA) {
    const n = cnt[day.s] = (cnt[day.s] || 0) + 1;
    if (day.d < from || (only && !day.d.endsWith(only))) continue;
    for (const K of ['A', 'B']) {
      const o = day[K]; if (o.r || o.reel) continue;
      const sl = slidesFor(day, o, n); if (!sl) continue;
      const file = 'c' + day.d.slice(5).replace('-', '') + '-' + K.toLowerCase() + '-short.mp4';
      await make(sl, file); made++; process.stdout.write(file + ' ');
    }
  }
  console.log('\nok', made);
})().catch(e => { console.error(e); process.exit(1); });
