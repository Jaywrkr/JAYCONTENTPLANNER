// Episodio (genérico) — una escena por frase · 1920x1080 30fps
const { Canvas, FontLibrary } = require('skia-canvas');
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const FD = '/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/reel/fonts/';
FontLibrary.use('Geist Mono', fs.readdirSync(FD).map(f => FD + f));
const W = 1920, H = 1080, FPS = 30, CX = W / 2, CY = H * .46;
const TL = JSON.parse(fs.readFileSync(__dirname + '/timeline.json')), EP = process.env.EP || '02', LN = TL.lines, DUR = TL.dur;
LN.forEach((l, i) => l.e = LN[i + 1] ? LN[i + 1].a : DUR);
// envolvente de voz (para la barra que reacciona)
const pcm = execSync(`ffmpeg -v error -i ${__dirname}/voz_edit.wav -ac 1 -ar 3000 -f f32le -`, { maxBuffer: 1e9 });
const X = new Float32Array(pcm.buffer, pcm.byteOffset, pcm.length / 4);
const amp = t => { const i = Math.floor(t * 3000), n = 100; let s = 0; for (let k = Math.max(0, i - n); k < Math.min(X.length, i + n); k++) s += X[k] * X[k]; return Math.min(1, Math.sqrt(s / (2 * n)) * 6); };

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x)), pr = (t, a, b) => clamp((t - a) / (b - a));
const ez = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2, eo = x => 1 - Math.pow(1 - x, 3);
let FG = '255,255,255', BG = '#000';
const g = a => `rgba(${FG},${a})`;
const F = (o, s, w = 300) => o.font = `${w} ${s}px "Geist Mono"`;
const T = (o, s, x, y, size = 40, a = 1, al = 'center', w = 300) => { F(o, size, w); o.fillStyle = g(a); o.textAlign = al; o.textBaseline = 'middle'; o.fillText(s, x, y); };
const Wd = (o, s, size = 40, w = 300) => { F(o, size, w); return o.measureText(s).width; };
const R = (o, x, y, w, h, a = 1) => { if (w > 0 && h > 0) { o.fillStyle = g(a); o.fillRect(x, y, w, h); } };
const B = (o, x, y, w, h, a = 1, lw = 2) => { o.strokeStyle = g(a); o.lineWidth = lw; o.strokeRect(x, y, w, h); };
const lab = (o, s, x, y, al = 'left', a = .55) => T(o, s.toUpperCase(), x, y, 18, a, al, 400);
// rectángulo que se dibuja (perímetro progresivo)
function draw(o, x, y, w, h, p, a = 1, lw = 2) { const P = 2 * (w + h); let L = P * clamp(p); o.strokeStyle = g(a); o.lineWidth = lw; o.beginPath(); o.moveTo(x, y);
  const seg = [[w, 0], [0, h], [-w, 0], [0, -h]]; let cx = x, cy = y; for (const [dx, dy] of seg) { const len = Math.abs(dx || dy), k = Math.min(1, L / len); cx += dx * k; cy += dy * k; o.lineTo(cx, cy); L -= len; if (L <= 0) break; } o.stroke(); }

// ── tipos de escena ── (o, p = segundos desde inicio de la frase, d = duración, s = parámetros, l = frase)
const words = (o, p, txt, y = CY, size = 44, a = 1, step = .14) => { const ws = txt.split(' '), sp = Wd(o, ' ', size), tot = Wd(o, txt, size); let x = CX - tot / 2;
  ws.forEach((w, i) => { const k = eo(pr(p, i * step, i * step + .3)); T(o, w, x, y + 14 * (1 - k), size, a * k, 'left'); x += Wd(o, w, size) + sp; }); };
const typew = (o, p, txt, y = CY, size = 44) => { const n = Math.floor(clamp(p / .045, 0, txt.length)), s = txt.slice(0, n), w = Wd(o, txt, size), x = CX - w / 2;
  T(o, s, x, y, size, 1, 'left'); if (Math.floor(p * 2.5) % 2 === 0 || n < txt.length) R(o, x + Wd(o, s, size) + 6, y - size * .5, 3, size); };
const S = {
  eq: (o, p, d, s) => { const sz = s.size || 48, sp = Wd(o, ' ', sz), ws = s.t.map(x => Wd(o, x, sz)), tot = ws.reduce((a, b) => a + b) + sp * 2 * (s.t.length - 1); let x = CX - tot / 2;
    s.t.forEach((tk, i) => { const k = eo(pr(p, i * (s.st || .28), i * (s.st || .28) + .3)), last = i === s.t.length - 1; T(o, tk, x, (s.y || CY) - 18 * (1 - k), sz, k * (last ? 1 : .6), 'left', last ? 400 : 300); if (last && k > .9) R(o, x, (s.y || CY) + sz * .62, ws[i] * eo(pr(p, i * .28 + .4, i * .28 + .8)), 2, .9); x += ws[i] + sp * 2; }); },
  words: (o, p, d, s, l) => words(o, p, s.t || l.t.replace(/[.]$/, '.'), CY, s.size || 44),
  type: (o, p, d, s, l) => typew(o, p, s.t || l.t),
  key: (o, p, d, s, l) => { // frase chica arriba, palabra clave grande con caja que se dibuja
    words(o, p, l.t, CY - 120, 28, .55, .08); const w = Wd(o, s.k, 56, 400), k = eo(pr(p, .35, .7));
    T(o, s.k, CX, CY + 30, 56, k, 'center', 400); draw(o, CX - w / 2 - 40, CY + 30 - 60, w + 80, 120, ez(pr(p, .5, 1.2)), .9); },
  strike: (o, p, d, s) => { // palabra tachada → nueva
    const sz = 52, a = Wd(o, s.a, sz), b = s.b ? Wd(o, s.b, sz) : 0, gap = s.b ? 60 : 0, x0 = CX - (a + gap + b) / 2, k = ez(pr(p, .5, .9));
    T(o, s.a, x0, CY, sz, 1 - .6 * k, 'left'); R(o, x0 - 8, CY - 1, (a + 16) * k, 3, .9);
    if (s.b) { const n = Math.round(s.b.length * pr(p, 1, 1 + s.b.length * .07)); T(o, s.b.slice(0, n), x0 + a + gap, CY, sz, 1, 'left', 400); }
    if (s.pre) T(o, s.pre, CX, CY - 110, 28, .55 * eo(pr(p, 0, .3))); },
  count: (o, p, d, s) => { const n = Math.round(s.n * ez(pr(p, .2, s.dur || 1.6))); T(o, String(n), CX, CY - 10, 96, 1, 'center', 200); lab(o, s.u, CX, CY + 80, 'center', .6); R(o, CX - 200, CY + 120, 400 * n / s.n, 2, .9); B(o, CX - 200, CY + 119, 400, 4, .2, 1); },
  grid: (o, p, d, s) => { const n = s.n, cols = s.cols, sz = s.sz, gp = s.gp, rows = Math.ceil(n / cols), x0 = CX - (cols * sz + (cols - 1) * gp) / 2, y0 = CY - (rows * sz + (rows - 1) * gp) / 2;
    const f = Math.round((s.to || n) * ez(pr(p, .2, s.dur || 2))), off = s.empty ? Math.round(n * ez(pr(p, .2, s.dur || 2.5))) : 0;
    for (let i = 0; i < n; i++) { const x = x0 + (i % cols) * (sz + gp), y = y0 + Math.floor(i / cols) * (sz + gp); const on = s.empty ? i >= off : i < f; on ? R(o, x, y, sz, sz, .92) : B(o, x, y, sz, sz, .28, 1.5); }
    if (s.lab) { lab(o, s.lab, x0, y0 - 36); T(o, String(s.empty ? n - off : f), x0 + cols * (sz + gp) - gp, y0 - 36, 28, 1, 'right'); } },
  stack: (o, p, d, s) => { const rows = s.rows || 15, lh = 52, y0 = CY - (rows - 1) * lh / 2, n = Math.floor(clamp(p / (s.step || .12), 0, rows * 4));
    for (let i = 0; i < n; i++) { const r = Math.floor(i / 4), c = i % 4; T(o, s.w, CX + (c - 1.5) * 300, y0 + r * lh, 30, i === n - 1 ? 1 : .35, 'center'); } },
  cal: (o, p, d, s) => { const sz = 130, gp = 26, x0 = CX - (7 * sz + 6 * gp) / 2, y0 = CY - sz / 2, mv = s.move ? Math.min(5, Math.floor(p / 1.1)) + ez(pr(p % 1.1, .8, 1.1)) * (p < 5.5 ? 1 : 0) : 2;
    'LMMJVSD'.split('').forEach((c, i) => { B(o, x0 + i * (sz + gp), y0, sz, sz, .22); lab(o, c, x0 + i * (sz + gp) + sz / 2, y0 + sz + 36, 'center', .35); });
    const hx = x0 + mv * (sz + gp); R(o, hx, y0, sz, sz, .92); lab(o, 'hoy', hx + sz / 2, y0 - 36, 'center', .85);
    if (s.move) { B(o, hx + sz + gp, y0, sz, sz, .9, 2.5); lab(o, s.next || 'mañana', hx + sz * 1.5 + gp, y0 - 36, 'center', .85); } },
  bars: (o, p, d, s) => { const x0 = CX - 440, bw = 880; s.b.forEach(([lb, v, del], i) => { const y = CY - (s.b.length - 1) * 60 + i * 120; lab(o, lb, x0, y - 30, 'left', .65);
    B(o, x0, y, bw, 30, .2, 1.5); const k = ez(pr(p, del || .2, (del || .2) + 1.2)), vv = typeof v === 'function' ? v(p) : v; R(o, x0, y, Math.max(3, bw * vv * k), 30, .92); }); },
  choice: (o, p, d, s) => { const w = 360, h = 220, gp = 80, x1 = CX - w - gp / 2, x2 = CX + gp / 2, k = ez(pr(p, 1.2, 1.6));
    [[x1, 'ahora', 'no duele'], [x2, 'después', 'duele']].forEach(([x, a, b], i) => { B(o, x, CY - h / 2, w, h, .4); lab(o, a, x + 24, CY - h / 2 + 34, 'left', .7); T(o, b, x + w / 2, CY + 20, 34, .9, 'center'); });
    if (k > 0) { R(o, x1 - 12, CY - h / 2 - 12, (w + 24) * k, 4, 1); lab(o, 'tu cabeza elige', x1 + w / 2, CY + h / 2 + 46, 'center', .8 * k); } },
  split: (o, p, d, s) => { const k = ez(pr(p, 0, .45)), half = W / 2;
    o.fillStyle = `rgb(${FG})`; o.fillRect(s.side ? half + (1 - k) * half : 0, 0, half * k, H); // mitad clara
    const sx = s.side ? half + half / 2 : half / 2; const save = FG; FG = '0,0,0'; T(o, s.a, sx, CY - 30, 40, eo(pr(p, .3, .6))); lab(o, s.b, sx, CY + 40, 'center', .7 * eo(pr(p, .5, .8))); FG = save;
    if (s.other) { T(o, s.other[0], s.side ? half / 2 : half + half / 2, CY - 30, 40, .35); lab(o, s.other[1], s.side ? half / 2 : half + half / 2, CY + 40, 'center', .3); } },
  inv: (o, p, d, s, l) => { o.fillStyle = `rgb(${FG})`; o.fillRect(0, 0, W, H); const sv = FG; FG = '0,0,0'; words(o, p, s.t || l.t, CY, s.size || 52, 1, .12); FG = sv; },
  grow: (o, p, d, s) => { const m = s.max || 380, z = 1 + (m - 1) * ez(pr(p, .1, d - .3)); R(o, CX - z / 2, CY - z / 2, z, z, .92); if (s.ring) B(o, CX - s.ring / 2, CY - s.ring / 2, s.ring, s.ring, .25); },
  vs: (o, p, d, s) => { const k = ez(pr(p, .2, d - .4)), sm = 60 + 120 * k, bg = 360; R(o, CX - 360 - sm / 2, CY - sm / 2, sm, sm, .92); B(o, CX + 360 - bg / 2, CY - bg / 2, bg, bg, .35);
    lab(o, 'lo pequeño que haces', CX - 360, CY + 230, 'center', .7); lab(o, 'lo grande que pospones', CX + 360, CY + 230, 'center', .4); },
  page: (o, p, d, s) => { const w = s.w, h = s.h; draw(o, CX - w / 2, CY - h / 2, w, h, ez(pr(p, .1, .9)), .9); for (let i = 0; i < s.lines; i++) R(o, CX - w / 2 + 30, CY - h / 2 + 40 + i * 30, (w - 60) * (i === s.lines - 1 ? .5 : 1) * ez(pr(p, .6 + i * .12, 1 + i * .12)), 3, .6); lab(o, s.lab, CX, CY + h / 2 + 46, 'center', .7); },
  timer60: (o, p, d, s) => { const left = Math.max(0, 60 - p * 14), ss = Math.floor(left); T(o, `0:${String(ss).padStart(2, '0')}`, CX, CY, 96, 1, 'center', 200); R(o, CX - 300, CY + 90, 600 * (1 - left / 60), 3, .9); B(o, CX - 300, CY + 89, 600, 5, .2, 1); lab(o, 'antes de decir sí', CX, CY - 100, 'center', .6); },
  timer: (o, p, d, s) => { const left = Math.max(0, 300 - p * 70), mm = Math.floor(left / 60), ss = Math.floor(left % 60); T(o, `${mm}:${String(ss).padStart(2, '0')}`, CX, CY, 96, 1, 'center', 200); R(o, CX - 300, CY + 90, 600 * (1 - left / 300), 3, .9); B(o, CX - 300, CY + 89, 600, 5, .2, 1); },
  check: (o, p, d, s, l) => { const sz = 120; draw(o, CX - sz / 2, CY - sz / 2 - 40, sz, sz, ez(pr(p, .1, .7)), .9, 3); const k = eo(pr(p, .8, 1.1)); R(o, CX - 30 * k, CY - 40 - 30 * k, 60 * k, 60 * k, .92); words(o, Math.max(0, p - .9), l.t, CY + 110, 32); },
  step: (o, p, d, s) => { const b = CY + 140; R(o, CX - 500, b, 1000, 2, .4); const k = ez(pr(p, .3, 1)); B(o, CX - 360, b - 260, 160, 260, .3); lab(o, 'difícil', CX - 280, b + 36, 'center', .4); R(o, CX + 200, b - 30 * k, 160, 30 * k, .92); lab(o, 'fácil', CX + 280, b + 36, 'center', .8); },
  will: (o, p, d, s) => { const b = CY + 160, tgt = CY - 140; R(o, CX - 300, tgt, 600, 2, .5); lab(o, 'lo que hace falta', CX - 300, tgt - 24, 'left', .6); const v = Math.sin(clamp(p / 2.4) * Math.PI) * .78; R(o, CX - 60, b - 300 * v, 120, 300 * v, .92); lab(o, 'voluntad', CX, b + 36, 'center', .7); },
  wait: (o, p, d, s) => { lab(o, 'esperando las ganas', CX - 300, CY - 40, 'left', .7); B(o, CX - 300, CY, 600, 24, .25, 1.5); const v = .12 + .02 * Math.sin(p * 6); R(o, CX - 300, CY, 600 * v, 24, .9); T(o, Math.floor(v * 100) + '%', CX + 300, CY - 40, 24, .7, 'right'); },
  qa: (o, p, d, s) => { const k = eo(pr(p, .5, .8)); draw(o, CX - 180, CY - 80, 360, 160, ez(pr(p, 0, .6)), .7); const n = Math.round(2 * pr(p, .7, .9)); T(o, 'sí'.slice(0, n), CX, CY, 52, 1, 'center', 400); lab(o, 'tu respuesta', CX, CY - 120, 'center', .5 * k); },
  end: (o, p, d, s) => { const a = eo(pr(p, .2, .8)) * (1 - pr(p, 3.6, 4.2)); T(o, 'simple.', CX, CY, 48, a, 'center', 300);
    if (p > 4) { const q = p - 4; T(o, 'nos vemos la próxima semana.', CX, CY - 220, 30, .8 * eo(pr(q, 0, .5))); B(o, CX - 560, CY - 120, 520, 292, .25 * eo(pr(q, .4, 1))); B(o, CX + 40, CY - 120, 520, 292, .25 * eo(pr(q, .5, 1.1))); lab(o, '@jaywrkr', CX, CY + 250, 'center', .6 * eo(pr(q, .8, 1.4))); } },
  list: (o, p, d, s, l) => { const ws = l.t.split(' '); ws.forEach((w, i) => { const k = eo(pr(p, .3 + i * .55, .6 + i * .55)); T(o, w, CX - 300 + 0 * i, CY - 120 + i * 80, 40, k * (i === ws.length - 1 ? 1 : .55), 'left'); R(o, CX - 340, CY - 120 + i * 80 - 8, 16, 16, k * .9); }); },
  opts: (o, p, d, s) => { const it = ['60 min', '15 min', '10 min', '5 min']; it.forEach((w, i) => { const y = CY - 150 + i * 100, ww = Wd(o, w, 44); const last = i === 3, k = ez(pr(p, .3 + i * .7, .6 + i * .7));
    T(o, w, CX, y, 44, last ? eo(pr(p, 2.4, 2.8)) : 1 - .6 * k, 'center', last ? 400 : 300); if (!last) R(o, CX - ww / 2 - 8, y - 1, (ww + 16) * k, 3, .9); else draw(o, CX - ww / 2 - 30, y - 45, ww + 60, 90, ez(pr(p, 2.7, 3.4)), .9); }); },

  // ── escenas ep02 ──
  semana: (o, p, d, s) => { const sz = 150, gp = 30, x0 = CX - (5 * sz + 4 * gp) / 2, y0 = CY - sz / 2; 'LMMJV'.split('').forEach((c, i) => { const x = x0 + i * (sz + gp), k = ez(pr(p, .4 + i * .3, .8 + i * .3)); B(o, x, y0, sz, sz, .25); R(o, x, y0 + sz * (1 - k), sz, sz * k, .92); lab(o, c, x + sz / 2, y0 + sz + 36, 'center', .5); }); lab(o, 'una semana de trabajo', CX, y0 - 40, 'center', .6); },
  clock: (o, p, d, s) => { const k = eo(pr(p, 0, .4)); T(o, '09:00', CX, CY, 120, k, 'center', 200); lab(o, 'lunes', CX, CY - 110, 'center', .6 * k); if (Math.floor(p * 2) % 2 === 0) R(o, CX - 6, CY - 6, 0, 0); R(o, CX - 200, CY + 90, 400 * ez(pr(p, .3, d)), 2, .6); },
  msg: (o, p, d, s) => { const w = 640, h = 140, x = CX - w / 2, y = CY - h / 2; draw(o, x, y, w, h, ez(pr(p, 0, .5)), .9); R(o, x + 40, y + h, 30, 30 * eo(pr(p, .4, .6)), .9); if (p > .5) { const t = '¿tienes cinco minutos?', n = Math.floor(clamp((p - .5) / .045, 0, t.length)); T(o, t.slice(0, n), x + 40, y + h / 2, 38, 1, 'left'); } lab(o, 'mensaje · 09:00', x, y - 30, 'left', .5); },
  llamada: (o, p, d, s) => { const sec = Math.floor(p * 7); T(o, `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`, CX, CY, 96, 1, 'center', 200); lab(o, 'llamada en curso', CX, CY - 100, 'center', .6); const r = Math.floor(p * 3) % 3; for (let i = 0; i < 3; i++) R(o, CX - 40 + i * 32, CY + 90, 16, 16, i === r ? .9 : .25); },
  cinco: (o, p, d, s) => { const n = Math.round(5 + 55 * ez(pr(p, .6, d - .4))); T(o, String(n), CX, CY - 10, 120, 1, 'center', 200); lab(o, 'minutos', CX, CY + 90, 'center', .6); B(o, CX - 300, CY + 130, 600, 6, .2, 1); R(o, CX - 300, CY + 131, 600 * n / 60, 4, .9); if (n >= 60) lab(o, '= 1 hora', CX, CY + 180, 'center', .9); },
  msgs: (o, p, d, s) => { const w = 560, h = 90, x = CX - w / 2; for (let i = 0; i < 6; i++) { const k = eo(pr(p, .2 + i * .55, .5 + i * .55)); if (k <= 0) continue; const y = CY - 250 + i * 105 + (1 - k) * 20; B(o, x, y, w, h, .3 + .1 * k, 1.5); R(o, x + 30, y + 30, (w - 60) * (.4 + (i * 37 % 50) / 100), 4, .55 * k); R(o, x + 30, y + 56, (w - 60) * .3, 4, .35 * k); } },
  quote: (o, p, d, s) => { const sz = 48, w = Wd(o, s.q, sz) + 120, h = 150; draw(o, CX - w / 2, CY - h / 2, w, h, ez(pr(p, 0, .6)), .9); const n = Math.floor(clamp((p - .4) / .05, 0, s.q.length)); T(o, s.q.slice(0, n), CX - Wd(o, s.q, sz) / 2, CY, sz, 1, 'left', 400); lab(o, 'di esto', CX - w / 2, CY - h / 2 - 34, 'left', .6); },
  pausa: (o, p, d, s) => { const w = 640, h = 140, x = CX - w / 2, y = CY - h / 2; B(o, x, y, w, h, .5); if (Math.floor(p * 2.2) % 2 === 0) R(o, x + 40, y + h / 2 - 24, 3, 48, .9); lab(o, 'no contestes todavía', CX, y + h + 46, 'center', .7 * eo(pr(p, .8, 1.2))); },
  devuelve: (o, p, d, s) => { const sz = 200, gp = 360, x1 = CX - gp / 2 - sz, x2 = CX + gp / 2, k = ez(pr(p, .4, 1.6)); B(o, x1, CY - sz / 2, sz, sz, .35); B(o, x2, CY - sz / 2, sz, sz, .35); lab(o, 'ellos', x2 + sz / 2, CY + sz / 2 + 40, 'center', .5); lab(o, 'tú', x1 + sz / 2, CY + sz / 2 + 40, 'center', .8);
    const q = 90, x = x2 + sz / 2 - q / 2 - (x2 - x1) * k; R(o, x, CY - q / 2, q, q, .92); lab(o, 'la decisión', x + q / 2, CY - sz / 2 - 40, 'center', .8); },
  sies: (o, p, d, s) => { const cols = 6, rows = 3, gx = 200, gy = 110, x0 = CX - (cols - 1) * gx / 2, y0 = CY - (rows - 1) * gy / 2; for (let i = 0; i < cols * rows; i++) { const k = eo(pr(p, i * .1, i * .1 + .25)); if (k <= 0) continue; T(o, 'sí', x0 + (i % cols) * gx, y0 + Math.floor(i / cols) * gy + 10 * (1 - k), 48, k * (s.fade ? (i % 6 === 2 || i === 13 ? 1 : 1 - .8 * pr(p, 1.4 + (i * 7 % 18) * .05, 1.8 + (i * 7 % 18) * .05)) : .9), 'center'); } },
  word: (o, p, d, s) => { const w = 560, h = 140, x = CX - w / 2, y = CY - h / 2; draw(o, x, y, w, h, ez(pr(p, 0, .6)), .7); lab(o, 'tu respuesta · una palabra', CX, y - 40, 'center', .6); if (Math.floor(p * 2.2) % 2 === 0) R(o, CX - 2, CY - 26, 3, 52, .9); },

  out: (o, p, d, s, l) => { words(o, p, l.t, CY - 220, 32, .8); B(o, CX - 560, CY - 120, 520, 292, .25 * eo(pr(p, 1, 1.6))); B(o, CX + 40, CY - 120, 520, 292, .25 * eo(pr(p, 1.1, 1.7))); lab(o, '@jaywrkr', CX, CY + 250, 'center', .6 * eo(pr(p, 1.4, 2))); },
};
// ── guion → escenas (una por frase) ──
const MAP = {
  words: ['words'], type: ['type'], inv: ['inv'], end: ['end'],
  sies: ['sies', {}], siesno: ['sies', { fade: 1 }], semana: ['semana'], clock: ['clock'], msg: ['msg'], llamada: ['llamada'], cinco: ['cinco'], msgs: ['msgs'],
  tuyo: ['bars', { b: [['lo de otros', .95], ['lo tuyo', 0, .6]] }],
  eq1: ['eq', { t: ['1 sí', '=', '1 hora menos de lo tuyo'], st: .35, size: 44 }], eq5: ['eq', { t: ['5 síes', '=', '5 horas'], st: .3 }],
  count25: ['count', { n: 25, u: 'horas a la semana', dur: 1.6 }], grid40: ['grid', { n: 40, cols: 8, sz: 46, gp: 14, to: 25, lab: 'horas de tu semana', dur: 2 }],
  pagas: ['bars', { b: [['tu tiempo', p => 1 - .45 * ez(pr(p, .6, 1.8)), .1]] }], count10: ['count', { n: 10, u: 'segundos de incomodidad', dur: 1.4 }],
  eqpaga: ['eq', { t: ['1 hora tuya', '↔', '10 segundos'], st: .4 }], pausa: ['pausa'], devuelve: ['devuelve'],
  olvido: ['grid', { n: 12, cols: 6, sz: 70, gp: 22, lab: 'luego vemos', empty: 1, dur: 3 }], timer: ['timer60'], qa: ['word'],
};
const SC = LN.map(l => { const [k, arg] = l.sc.split(':'); if (k === 'key') return ['key', { k: arg }]; if (k === 'strike') { const [a, b] = arg.split('>'); return ['strike', { a, b, pre: l.t }]; } if (k === 'quote') return ['quote', { q: arg }]; if (!MAP[k]) throw new Error('escena ' + k); return MAP[k]; });

const NAMES = JSON.parse(process.env.NAMES);
const grains = [0, 1, 2].map(() => { const c = new Canvas(W, H), o = c.getContext('2d'), d = o.createImageData(W, H); for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 12; } o.putImageData(d, 0, 0); return c; });

function frame(c, o, t) {
  FG = '255,255,255'; o.setTransform(1, 0, 0, 1, 0, 0); o.fillStyle = '#000'; o.fillRect(0, 0, W, H);
  let i = LN.findIndex(l => t < l.e); if (i < 0) i = LN.length - 1; if (t < LN[0].a) i = 0;
  const l = LN[i], p = Math.max(0, t - l.a + (i === 0 ? .6 : 0)), d = l.e - l.a, [ty, s = {}] = SC[i];
  // cámara: zoom lento por escena
  const z = 1 + .035 * ez(clamp(p / Math.max(d, 1))); o.setTransform(z, 0, 0, z, CX * (1 - z), CY * (1 - z));
  const out = 1 - pr(t, l.e - .18, l.e); o.globalAlpha = (ty === 'inv' || ty === 'split') ? 1 : out;
  S[ty](o, p, d, s, l); o.globalAlpha = 1; o.setTransform(1, 0, 0, 1, 0, 0); FG = '255,255,255';
  // capítulo + barrido al cambiar de sección
  const first = i === LN.findIndex(x => x.sec === l.sec);
  if (first && l.sec > 0 && l.sec < 7) { const k = pr(p, 0, .45); if (k < 1) R(o, -W + 2 * W * ez(k), 0, W, H, 1); const a = eo(pr(p, .35, .7)) * (1 - pr(p, 2.6, 3.1)); if (a > 0) { lab(o, '0' + l.sec + ' / 06', CX, 200, 'center', .55 * a); T(o, NAMES[l.sec], CX, 240, 28, a); } }
  // marca
  const inv = ty === 'inv'; if (inv) FG = '0,0,0';
  lab(o, '@jaywrkr', 96, 80, 'left', .5); lab(o, l.sec && l.sec < 7 ? `0${l.sec} / 06` : 'ep. ' + EP, W - 96, 80, 'right', .5); lab(o, 'simple.', W - 96, H - 85, 'right', .4);
  // barra que reacciona a tu voz (rectángulos, ángulos rectos)
  const N = 40, bw = 6, gp = 6, x0 = 96; for (let k = 0; k < N; k++) { const v = amp(t - (N - k) * .025); R(o, x0 + k * (bw + gp), H - 84 - 2 - 26 * v, bw, 2 + 26 * v, .25 + .6 * v); }
  R(o, 0, H - 2, W * t / DUR, 2, .5); FG = '255,255,255';
  o.drawImage(grains[Math.floor(t * 12) % 3], 0, 0);
}

(async () => {
  const PV = process.env.PREVIEW, OUTF = process.env.OUT;
  if (PV) { for (const tt of PV.split(',').map(Number)) { const c = new Canvas(W, H); frame(c, c.getContext('2d'), tt); await c.toFile(`${__dirname}/q-${tt}.jpg`, { quality: .8 }); } return; }
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${W}x${H}`, '-framerate', '' + FPS, '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', __dirname + '/video.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
  const c = new Canvas(W, H), o = c.getContext('2d'), N = Math.ceil(DUR * FPS);
  for (let f = 0; f < N; f++) { frame(c, o, f / FPS); const buf = Buffer.from(o.getImageData(0, 0, W, H).data.buffer); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); if (f % 1800 === 0) process.stdout.write(f + ' '); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('video ok');
})();
