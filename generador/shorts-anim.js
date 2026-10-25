// Shorts animados por elemento (9:16). Uso: node anim.js <id>   → /home/claude/campana/c/<id>-short.mp4
const { Canvas, FontLibrary } = require('skia-canvas'); const fs = require('fs'); const { spawn, execSync } = require('child_process');
const FD = '/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/reel/fonts/'; FontLibrary.use('Geist Mono', fs.readdirSync(FD).map(f => FD + f));
const W = 1080, H = 1920, FPS = 30, CX = W / 2, OUT = '/home/claude/campana/c';
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x)), pr = (t, a, b) => clamp((t - a) / (b - a)), eo = x => 1 - Math.pow(1 - x, 3), ez = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
let FG = '255,255,255'; const g = a => `rgba(${FG},${a})`;
const T = (o, s, x, y, sz, a = 1, al = 'center', w = 300) => { o.font = `${w} ${sz}px "Geist Mono"`; o.fillStyle = g(a); o.textAlign = al; o.textBaseline = 'middle'; o.fillText(s, x, y); return o.measureText(s).width; };
const R = (o, x, y, w, h, a = 1) => { if (w > 0 && h > 0) { o.fillStyle = g(a); o.fillRect(x, y, w, h); } };
const B = (o, x, y, w, h, a = 1, lw = 2) => { o.strokeStyle = g(a); o.lineWidth = lw; o.strokeRect(x, y, w, h); };
const lab = (o, s, x, y, al = 'left', a = .55) => T(o, s.toUpperCase(), x, y, 24, a, al, 400);
const type = (o, s, x, y, sz, t0, t, al = 'center', a = 1) => { const n = Math.floor(clamp((t - t0) / .045, 0, s.length)); if (n <= 0) return; const full = (o.font = `300 ${sz}px "Geist Mono"`, o.measureText(s).width);
  const x0 = al === 'center' ? x - full / 2 : x; T(o, s.slice(0, n), x0, y, sz, a, 'left'); if (n < s.length && Math.floor(t * 8) % 2 === 0) R(o, x0 + o.measureText(s.slice(0, n)).width + 4, y - sz / 2, 3, sz); };
function chrome(o, serie, t) { lab(o, '@jaywrkr', 80, 150); lab(o, serie, W - 80, 150, 'right'); lab(o, 'simple.', W - 80, H - 300, 'right', .4); }

const SC = {
  'c1025-a': { dur: 10, bg: 'N', serie: 'sin filtro · nº 03', ticks: [], draw(o, t) {
    const s = 160, gg = 34, cols = 4, gh = 3 * s + 2 * gg, x0 = CX - (cols * s + (cols - 1) * gg) / 2, y0 = H / 2 - gh / 2 - 180;
    for (let i = 0; i < 12; i++) { const k = eo(pr(t, .3 + i * .05, .55 + i * .05)); if (k <= 0) continue; const x = x0 + (i % cols) * (s + gg), y = y0 + Math.floor(i / cols) * (s + gg) + 30 * (1 - k);
      const st = 1.2 + i * .33, struck = i < 11 && t >= st, last = i === 11, hoy = last && t >= 5.2;
      if (hoy) { const f = eo(pr(t, 5.2, 5.5)); R(o, x, y, s, s, f); const sv = FG; FG = '0,0,0'; T(o, 'HOY', x + s / 2, y + s / 2, 32, f, 'center', 400); FG = sv; if (f < 1) T(o, 'LUN', x + s / 2, y + s / 2, 30, 1 - f, 'center', 400); }
      else { B(o, x, y, s, s, k * (struck ? .35 : 1)); T(o, 'LUN', x + s / 2, y + s / 2, 30, k * (struck ? .35 : 1), 'center', 400); }
      if (struck) R(o, x + 22, y + s / 2 - 1, (s - 44) * eo(pr(t, st, st + .12)), 3, .9); }
    const n = Math.min(11, Math.max(0, Math.floor((t - 1.2) / .33) + 1)); if (t > 1.2 && t < 5.2) T(o, n + (n === 1 ? ' lunes' : ' lunes'), CX, y0 - 90, 34, .8);
    type(o, '“Empiezo el lunes.”', CX, y0 + gh + 150, 44, 6.0, t); type(o, 'Lo dijiste hace 11 lunes.', CX, y0 + gh + 220, 44, 7.0, t); },
    init() { for (let i = 0; i < 11; i++) this.ticks.push(1.2 + i * .33); this.pops = [5.2]; } },
  'c1025-b': { dur: 10, bg: 'W', serie: 'sin filtro · nº 03', ticks: [], draw(o, t) {
    const cw = 130, ch = 70, gh = 8 * ch, x0 = CX - 7 * cw / 2, y0 = H / 2 - gh / 2 - 180;
    'LMMJVSD'.split('').forEach((d, i) => lab(o, d, x0 + i * cw + cw / 2, y0 - 40, 'center', .5 * eo(pr(t, .2 + i * .06, .5 + i * .06))));
    for (let c = 0; c < 7; c++) { const k = ez(pr(t, .3 + c * .1, .8 + c * .1)); for (let r = 0; r < 8; r++) { if (r / 8 < k) B(o, x0 + c * cw, y0 + r * ch, cw, ch, .3, 1.5); } }
    if (t > 1.6 && t < 4.4) { const j = Math.floor((t - 1.6) / .2), c = (j * 3) % 7, r = (j * 5) % 8; R(o, x0 + c * cw + 6, y0 + r * ch + 6, cw - 12, ch - 12, .85); }
    if (t > 4.4 && t < 5.4) T(o, 'nada.', CX, y0 + gh / 2, 40, eo(pr(t, 4.4, 4.7)) * (1 - pr(t, 5.1, 5.4)));
    type(o, 'Si no está en tu calendario,', CX, y0 + gh + 150, 42, 5.4, t); type(o, 'no te importa.', CX, y0 + gh + 215, 42, 6.8, t);
    if (t > 8) { const f = eo(pr(t, 8, 8.4)); R(o, x0 + 2 * cw + 6, y0 + 3 * ch + 6, (cw - 12), (ch - 12) * f, .92); const sv = FG; FG = '250,250,248'; T(o, 'hoy', x0 + 2 * cw + cw / 2, y0 + 3 * ch + ch / 2, 22, f, 'center', 400); FG = sv; } },
    init() { for (let j = 0; j < 14; j++) this.ticks.push(1.6 + j * .2); this.pops = [8]; } },
};
(async () => {
  const id = process.argv[2], S = SC[id]; S.init();
  const vid = `${OUT}/${id}-short-v.mp4`;
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${W}x${H}`, '-framerate', '' + FPS, '-i', '-', '-c:v', 'libx264', '-crf', '20', '-pix_fmt', 'yuv420p', vid], { stdio: ['pipe', 'inherit', 'inherit'] });
  const c = new Canvas(W, H), o = c.getContext("2d"); globalThis.__keep = [c];
  const grain = new Canvas(W, H); globalThis.__keep.push(grain); { const q = grain.getContext('2d'), d = q.createImageData(W, H); for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 10; } q.putImageData(d, 0, 0); }
  for (let f = 0; f < S.dur * FPS; f++) { const t = f / FPS; FG = S.bg === 'N' ? '255,255,255' : '10,10,10';
    o.fillStyle = S.bg === 'N' ? '#050505' : '#f6f6f4'; o.fillRect(0, 0, W, H); const z = 1 + .03 * t / S.dur; o.setTransform(z, 0, 0, z, CX * (1 - z), H / 2 * (1 - z)); S.draw(o, t); o.setTransform(1, 0, 0, 1, 0, 0); chrome(o, S.serie, t); o.drawImage(grain, (f % 3) * 7, 0);
    const buf = Buffer.from(o.getImageData(0, 0, W, H).data.buffer); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  // sonido: clic por elemento + golpe suave en el giro
  const ev = [...S.ticks.map(t => ['tk', t]), ...S.pops.map(t => ['pp', t])];
  const fc = ["sine=f=1800:d=0.035,volume=0.12,afade=t=out:st=0.005:d=0.03[tk]", "sine=f=220:d=0.25,volume=0.35,afade=t=out:st=0.02:d=0.23[pp]"];
  const tk = ev.filter(e => e[0] === 'tk'), pp = ev.filter(e => e[0] === 'pp');
  fc.push(`[tk]asplit=${tk.length}${tk.map((_, i) => `[t${i}]`).join('')}`); if (pp.length > 1) fc.push(`[pp]asplit=${pp.length}${pp.map((_, i) => `[p${i}]`).join('')}`);
  const parts = []; tk.forEach((e, i) => { fc.push(`[t${i}]adelay=${Math.round(e[1] * 1000)}:all=1[T${i}]`); parts.push(`[T${i}]`); });
  pp.forEach((e, i) => { fc.push(`[${pp.length > 1 ? 'p' + i : 'pp'}]adelay=${Math.round(e[1] * 1000)}:all=1[P${i}]`); parts.push(`[P${i}]`); });
  fc.push(`anullsrc=r=48000:cl=stereo,atrim=0:${S.dur}[base]`); fc.push(`[base]${parts.join('')}amix=inputs=${parts.length + 1}:normalize=0:duration=first[a]`);
  fs.writeFileSync(`/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/${id}-fc.txt`, fc.join(';\n'));
  execSync(`ffmpeg -y -loglevel error -i ${vid} -filter_complex_script /tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/${id}-fc.txt -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 160k -shortest -movflags +faststart ${OUT}/${id}-short.mp4`);
  execSync(`ffmpeg -y -loglevel error -ss ${S.dur - 1} -i ${OUT}/${id}-short.mp4 -frames:v 1 -vf scale=540:-2 -q:v 4 ${OUT}/${id}-short-poster.jpg`); fs.unlinkSync(vid);
  console.log(id, 'ok');
})();
