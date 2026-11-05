// La IA revisa mi mes · octubre · 1920x1080 30fps
const { Canvas, FontLibrary } = require('skia-canvas');
const { spawn } = require('child_process');
const fs = require('fs');
FontLibrary.use('Geist Mono', ['/home/claude/fonts/GeistMono-Light.ttf', '/home/claude/fonts/GeistMono-Regular.ttf']);
const W = 1920, H = 1080, FPS = 30, D = __dirname + '/';
const TL = JSON.parse(fs.readFileSync(D + 'timeline.json'));
const LN = TL.lines, DUR = TL.dur;
LN.forEach((l, i) => { l.e = LN[i + 1] ? LN[i + 1].a - .05 : DUR; });
const SECN = ['Le di mi mes a dos IA', 'Las reglas', 'Octubre en números', 'Ronda 1 · Claude', 'Ronda 2 · ChatGPT', 'El reto', 'Te toca'];
const SECA = SECN.map((_, s) => (LN.find(l => l.sec === s) || { a: DUR }).a);
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const prog = (t, a, b) => clamp((t - a) / (b - a));
const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
let INK = 255, BG = 0; // tema por escena
const g = a => { const v = Math.round(BG + (INK - BG) * a); return `rgb(${v},${v},${v})`; };
function T(o, s, x, y, size = 40, a = 1, al = 'center', w = 300) { o.font = `${w} ${size}px "Geist Mono"`; o.fillStyle = g(a); o.textAlign = al; o.textBaseline = 'middle'; o.fillText(s, x, y); return o.measureText(s).width; }
const Wd = (o, s, size = 40, w = 300) => { o.font = `${w} ${size}px "Geist Mono"`; return o.measureText(s).width; };
const R = (o, x, y, w, h, a = 1) => { if (w > 0 && h > 0) { o.fillStyle = g(a); o.fillRect(x, y, w, h); } };
const B = (o, x, y, w, h, a = 1, lw = 2) => { o.strokeStyle = g(a); o.lineWidth = lw; o.strokeRect(x, y, w, h); };
const lab = (o, s, x, y, al = 'center', a = .55, size = 20) => T(o, s.toUpperCase(), x, y, size, a, al, 400);
const fmt = n => Math.round(n).toLocaleString('es-ES').replace(/,/g, '.').replace(/\s/g, '.');
const fmtK = n => n >= 10000 ? String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : String(Math.round(n));

// texto en varias líneas que cabe en maxW
function wrap(o, s, size, maxW, w = 300) { const ws = s.split(' '), out = []; let cur = ''; for (const x of ws) { const t = cur ? cur + ' ' + x : x; if (Wd(o, t, size, w) > maxW && cur) { out.push(cur); cur = x; } else cur = t; } if (cur) out.push(cur); return out; }
function para(o, s, cx, cy, size, a, maxW = 1400, al = 'center', w = 300) { const ls = wrap(o, s, size, maxW, w), lh = size * 1.35; ls.forEach((l, i) => T(o, l, cx, cy + (i - (ls.length - 1) / 2) * lh, size, a, al, w)); return ls.length * lh; }
// palabras que aparecen una a una
function reveal(o, s, cx, cy, size, t, a0, a1, maxW = 1500) {
  const ls = wrap(o, s, size, maxW), lh = size * 1.35, words = s.split(' ').length; let k = 0;
  ls.forEach((l, i) => { const ws = l.split(' '); let x = cx - Wd(o, l, size) / 2; const y = cy + (i - (ls.length - 1) / 2) * lh;
    ws.forEach(wd => { const p = ease(prog(t, a0 + (a1 - a0) * k / words, a0 + (a1 - a0) * k / words + .25)); T(o, wd, x, y + (1 - p) * 10, size, p, 'left'); x += Wd(o, wd + ' ', size); k++; }); });
}
function typed(o, s, x, y, size, t, a0, cps, al = 'left', maxW = 1300) {
  const n = Math.floor(clamp((t - a0) * cps, 0, s.length)), sub = s.slice(0, n);
  const ls = wrap(o, s, size, maxW), lh = size * 1.4; let used = 0, lx = x, ly = y;
  ls.forEach((l, i) => { const part = sub.slice(used, used + l.length); used += l.length + 1; const yy = y + i * lh;
    const xx = al === 'left' ? x : x - Wd(o, l, size); T(o, part, xx, yy, size, 1, 'left'); if (part.length) { lx = xx + Wd(o, part, size); ly = yy; } });
  if (Math.floor(t * 2) % 2 === 0 || n < s.length) R(o, lx + 6, ly - size * .55, size * .5, size * 1.05, .9);
}
function stamp(o, txt, cx, cy, p, inv = true) {
  const s = 1 + (1 - ease(p)) * .4, w = Wd(o, txt, 64, 400) + 80, h = 120;
  o.save(); o.translate(cx, cy); o.scale(s, s); o.globalAlpha = clamp(p * 1.6);
  if (inv) { R(o, -w / 2, -h / 2, w, h, 1); const ink = INK; INK = BG; T(o, txt, 0, 4, 64, 1, 'center', 400); INK = ink; }
  else { B(o, -w / 2, -h / 2, w, h, 1, 3); T(o, txt, 0, 4, 64, 1, 'center', 400); }
  o.restore(); o.globalAlpha = 1;
}
const score = t => { let c = 0, gp = 0, gf = 0; for (const l of LN) if (l.sc.startsWith('verdict') && t >= l.a + .3) { const [, v, who] = l.sc.split(':'); if (who === 'C') c++; else if (v === 'A') gp++; else gf++; } return { c, gp, gf }; };

const grain = new Canvas(W, H); { const o = grain.getContext('2d'), d = o.createImageData(W, H); for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 9; } o.putImageData(d, 0, 0); }

function scene(o, l, t, st, dur) {
  const [kind, arg] = [l.sc.split(':')[0], l.sc.split(':').slice(1).join(':')], cy = H / 2, txt = l.t;
  const fin = ease(prog(st, 0, .3));
  switch (kind) {
    case 'words': reveal(o, txt, W / 2, cy, 64, st, .05, Math.min(dur * .55, 2.2)); break;
    case 'big': { const p = ease(prog(st, 0, .35)); o.save(); o.translate(W / 2, cy); o.scale(.9 + .1 * p, .9 + .1 * p); T(o, txt, 0, 0, 120, p, 'center', 300); o.restore(); break; }
    case 'end': { const p = ease(prog(st, 0, .8)); T(o, txt, W / 2, cy, 96, p); break; }
    case 'list': { const it = arg.split(','), n = it.length, lh = 92; it.forEach((s, i) => { const p = ease(prog(st, .1 + i * Math.min(.9, dur * .6 / n), .4 + i * Math.min(.9, dur * .6 / n))); T(o, s, W / 2 - 520 + (1 - p) * -30, cy + (i - (n - 1) / 2) * lh, 60, p, 'left'); R(o, W / 2 - 580, cy + (i - (n - 1) / 2) * lh - 4, 26 * p, 8, p); });
      if (txt !== it.join(' ')) { const p = ease(prog(st, dur * .7, dur * .7 + .4)); T(o, txt, W / 2, cy + (n / 2) * lh + 70, 48, p); } break; }
    case 'split': { R(o, W / 2, 0, W / 2, H, 1); lab(o, 'Claude', W / 4, 200, 'center', .6); { const ink = INK, bg = BG; INK = 0; BG = 255; lab(o, 'ChatGPT', W * .75, 200, 'center', .6); INK = ink; BG = bg; }
      typed(o, 'Revisa mi mes.', W / 4 - 220, cy - 40, 48, st, .3, 18);
      { const ink = INK, bg = BG; INK = 0; BG = 255; typed(o, 'Revisa mi mes.', W * .75 - 220, cy - 40, 48, st, .5, 18); INK = ink; BG = bg; }
      R(o, 0, H - 230, W, 230, 0); { const p = fin; T(o, txt, W / 2, H - 120, 52, p); } break; }
    case 'rules': { const p1 = ease(prog(st, .1, .5)), p2 = ease(prog(st, .8, 1.2)); B(o, W / 2 - 600, cy - 90, 440, 180, p1); T(o, 'LA IA HABLA', W / 2 - 380, cy, 40, p1, 'center', 400);
      R(o, W / 2 - 130, cy - 1, 260 * p2, 2, .7); B(o, W / 2 + 160, cy - 90, 440, 180, p2); T(o, 'YO RESPONDO', W / 2 + 380, cy, 40, p2, 'center', 400); T(o, txt, W / 2, cy + 230, 44, fin, 'center'); break; }
    case 'vdemo': { const p1 = prog(st, .2, .6), p2 = prog(st, Math.max(.9, dur * .55), Math.max(1.3, dur * .55 + .4)); stamp(o, 'ACIERTO', W / 2 - 330, cy, p1, true); stamp(o, 'FALLO', W / 2 + 330, cy, p2, false); break; }
    case 'num': { const N = +arg, p = ease(prog(st, .05, Math.min(1.2, dur * .6))); const s = N >= 1000 ? fmtK(N * p) : String(Math.round(N * p)); T(o, s, W / 2, cy - 50, 200, 1, 'center', 300); lab(o, txt, W / 2, cy + 110, 'center', .7, 26); lab(o, 'octubre', W / 2, cy - 230, 'center', .45); break; }
    case 'bar61': case 'bar70': { const bw = 1100, x = W / 2 - bw / 2, y = cy - 20, p = ease(prog(st, .1, 1.1)); B(o, x, y, bw, 60, .5); R(o, x + 8, y + 8, (bw - 16) * .61 * (kind === 'bar61' ? p : 1), 44, 1);
      T(o, kind === 'bar61' ? Math.round(61 * p) + ' %' : '61 %', x, y - 90, 96, 1, 'left'); lab(o, txt, x + bw, y - 90, 'right', .55, 22);
      if (kind === 'bar70') { const q = ease(prog(st, dur * .45, dur * .45 + .6)); const xm = x + 8 + (bw - 16) * .7; R(o, xm - 1, y - 24, 3, 108, q); T(o, '70 %', xm, y + 130, 64, q, 'center'); B(o, x + 8 + (bw - 16) * .61, y + 8, (bw - 16) * .09 * q, 44, q * .8, 2); }
      break; }
    case 'keep61': { const p = ease(prog(st, .3, 1.2)); const x = W / 2 + (W - 200 - W / 2) * p, y = cy + (150 - cy) * p, s = 96 - 60 * p; T(o, '61 %', x, y, s, 1, 'center'); T(o, txt, W / 2, cy + 160, 48, 1 - p * .2); break; }
    case 'round': { const p = prog(st, 0, .35); if (p < 1) { R(o, 0, 0, W, H, 1 - p); } T(o, arg, W / 2, cy - 40, 72, ease(prog(st, .2, .6)), 'center', 400); T(o, txt, W / 2, cy + 80, 44, ease(prog(st, .6, 1)), 'center'); break; }
    case 'grid440': { const cols = 40, c = 22, gp = 8, x0 = W / 2 - (cols * (c + gp) - gp) / 2, y0 = cy - 190, miss = new Set([37, 81, 122, 166, 203, 240, 251, 288, 302, 319, 344, 371, 388, 402, 417, 429, 436]);
      for (let k = 0; k < 440; k++) { const x = x0 + (k % cols) * (c + gp), y = y0 + Math.floor(k / cols) * (c + gp), on = prog(st, .1 + k * .0035, .2 + k * .0035); if (miss.has(k)) B(o, x, y, c, c, .5 * on, 1.5); else R(o, x, y, c, c, on); }
      T(o, txt, W / 2, y0 + 11 * (c + gp) + 80, 48, ease(prog(st, 1.4, 1.8))); break; }
    case 'nights': { const c = 46, gp = 12, x0 = W / 2 - (29 * (c + gp) - gp) / 2; for (let k = 0; k < 29; k++) B(o, x0 + k * (c + gp), cy - 60, c, c, .7 * prog(st, k * .05, k * .05 + .2), 2); lab(o, txt, W / 2, cy + 60, 'center', .7, 24); break; }
    case 'strike': { const [a, b] = arg.split('>'), size = 72, pre = txt ? txt + ' ' : '', wp = Wd(o, pre, size), wa = Wd(o, a, size), wb = Wd(o, b, size), tot = wp + wa + 30 + wb, x = W / 2 - tot / 2, s1 = prog(st, .5, 1), p2 = ease(prog(st, 1, 1.4));
      T(o, pre, x, cy, size, fin, 'left'); T(o, a, x + wp, cy, size, 1 - .55 * s1, 'left'); R(o, x + wp - 4, cy - 1, (wa + 8) * ease(s1), 3, .9); T(o, b, x + wp + wa + 30, cy + (1 - p2) * 12, size, p2, 'left'); break; }
    case 'verdict': { const [v] = arg.split(':'); if (v === 'A') stamp(o, 'ACIERTO', W / 2, cy - 40, prog(st, .05, .35), true); else { stamp(o, 'FALLO', W / 2, cy - 40, prog(st, .05, .35), false); }
      T(o, txt, W / 2, cy + 120, 40, ease(prog(st, .4, .8))); break; }
    case 'phone': { const p = ease(prog(st, dur * .5, dur * .5 + 1)); const x = W / 2 - 70 + p * 600; B(o, x, cy - 200, 140, 280, 1 - p * .7, 3); R(o, x + 55, cy + 50, 30, 4, 1 - p * .7); T(o, txt, W / 2, cy + 220, 48, fin); if (p > .2) lab(o, 'lejos', x + 70, cy - 240, 'center', p * .7); break; }
    case 'type': lab(o, 'Claude', 260, 300, 'left', .6, 22); typed(o, '“' + txt + '”', 260, 420, 60, st, .2, 24, 'left', 1400); break;
    case 'gpt': lab(o, 'ChatGPT', W - 260, 300, 'right', .6, 22); typed(o, '“' + txt + '”', W - 260, 420, 60, st, .2, 24, 'right', 1400); break;
    case 'post': { const pw = 360, ph = 450, x = W / 2 - 600, y = cy - ph / 2, p = fin; B(o, x, y, pw, ph, p, 2); T(o, 'Después', x + pw / 2 - 70, y + ph / 2, 26, .45 * p); R(o, x + pw / 2 - 130, y + ph / 2 - 1, 120, 2, .7 * p); T(o, 'Ahora.', x + pw / 2 + 70, y + ph / 2, 26, p);
      const q = ease(prog(st, .4, 1.6)); T(o, fmtK(101000 * q), W / 2 + 280, cy - 30, 140, 1, 'center'); lab(o, 'vistas · mi post más visto', W / 2 + 280, cy + 90, 'center', .6, 22); break; }
    case 'despues': { const words = ['Después empiezo a entrenar.', 'Después arranco el proyecto.', 'Después hablo con esa persona.']; words.forEach((s, i) => T(o, s, W / 2, cy - 160 + i * 90, 54, ease(prog(st, i * dur * .18, i * dur * .18 + .3)), 'center'));
      const p = ease(prog(st, dur * .6, dur * .6 + .3)); T(o, 'Después. Después. Después.', W / 2, cy + 180, 54, p, 'center', 400); break; }
    case 'split2': { const p = fin, lx = W / 4, rx = W * .75; lab(o, 'lo que vieron', lx, 230, 'center', .55, 22); lab(o, 'mi vida real', rx, 230, 'center', .55, 22);
      const c = 40, gp = 10; for (let r = 0; r < 5; r++) for (let k = 0; k < 7; k++) { const x = lx - (7 * (c + gp)) / 2 + k * (c + gp), y = 290 + r * (c + gp); B(o, x, y, c, c, .4 * p, 1.5); if ((r * 7 + k) % 4 === 1) R(o, x + 14, y + 14, 12, 12, p); }
      const q = ease(prog(st, dur * .4, dur * .4 + .8)); const c2 = 10, g2 = 4; for (let k = 0; k < 440; k++) { const x = rx - (22 * (c2 + g2)) / 2 + (k % 22) * (c2 + g2), y = 290 + Math.floor(k / 22) * (c2 + g2); R(o, x, y, c2, c2, q * (k % 26 === 3 ? .3 : 1)); }
      lab(o, 'calendario de trabajo', lx, 580, 'center', .5, 18); lab(o, 'agenda personal', rx, 580, 'center', .5, 18); T(o, txt, W / 2, H - 230, 48, fin); break; }
    case 'half': { const s = 300, x = W / 2 - s, y = cy - s / 2 - 80, p = fin; B(o, x, y, s, s, p, 2); for (let i = 0; i < 5; i++) R(o, x + 40, y + 60 + i * 44, (s - 80 - i * 24) * p, 2, .8);
      const q = ease(prog(st, .6, 1.2)); for (let k = 0; k < s; k += 18) { R(o, W / 2 + k, y, 9, 2, .35 * q); R(o, W / 2 + k, y + s - 2, 9, 2, .35 * q); R(o, W / 2 + s - 2, y + k, 2, 9, .35 * q); } T(o, '?', W / 2 + s / 2, y + s / 2, 64, .4 * q);
      lab(o, 'lo que le das', x, y + s + 34, 'left', .6, 18); lab(o, 'lo que no ve', W / 2 + s, y + s + 34, 'right', .35 * q, 18); T(o, txt, W / 2, y + s + 140, 52, ease(prog(st, .8, 1.2))); break; }
    case 'ten': { const fills = [.3, .15, .4, .2, .1, .35, .25, .12, .45, .18], bw = 1000, x = W / 2 - bw / 2; fills.forEach((f, i) => { const y = cy - 270 + i * 46, p = ease(prog(st, .1 + i * .08, .5 + i * .08)); B(o, x, y, bw, 22, .4 * p, 1.5); R(o, x + 4, y + 4, (bw - 8) * f * p, 14, p); });
      lab(o, txt, W / 2, cy + 230, 'center', .75, 26); break; }
    case 'zero': { const p = ease(prog(st, dur * .6, dur * .6 + .3)); T(o, p > .01 ? '0' : '6', W / 2, cy - 40, 240, 1, 'center'); lab(o, p > .01 ? txt : 'episodios grabados', W / 2, cy + 140, 'center', .7, 26); break; }
    case 'score': { const s = score(t); T(o, 'CLAUDE', W / 2 - 360, cy - 120, 36, .6, 'center', 400); T(o, String(s.c), W / 2 - 360, cy + 20, 200, 1); T(o, 'CHATGPT', W / 2 + 360, cy - 120, 36, .6, 'center', 400); T(o, String(s.gp), W / 2 + 360, cy + 20, 200, 1); lab(o, '+ 1 fallo', W / 2 + 360, cy + 160, 'center', .5, 22); R(o, W / 2 - 1, cy - 150, 2, 300, .3); break; }
    case 'vs': { const p1 = ease(prog(st, .2, .7)), p2 = ease(prog(st, dur * .5, dur * .5 + .5)); lab(o, 'ChatGPT', W / 2 - 400, cy - 150, 'center', .6 * p1, 22); para(o, '3 bloques de 90 min por semana', W / 2 - 400, cy, 48, p1, 560);
      lab(o, 'Claude', W / 2 + 400, cy - 150, 'center', .6 * p2, 22); para(o, 'menos tareas + hora fija para dormir', W / 2 + 400, cy, 48, p2, 560); T(o, 'vs', W / 2, cy, 40, .5); break; }
    default: para(o, txt, W / 2, cy, 60, fin);
  }
}

function frame(o, t) {
  const l = LN.find(x => t >= x.a - .05 && t < x.e) || (t < LN[0].a ? LN[0] : LN[LN.length - 1]);
  const kind = l.sc.split(':')[0], white = kind === 'gpt';
  BG = white ? 244 : 0; INK = white ? 10 : 255;
  o.fillStyle = g(0); o.fillRect(0, 0, W, H);
  const st = t - l.a, dur = l.e - l.a, z = 1 + .025 * prog(st, 0, Math.max(dur, 1));
  o.save(); o.translate(W / 2, H / 2); o.scale(z, z); o.translate(-W / 2, -H / 2); o.globalAlpha = 1;
  scene(o, l, t, st, dur); o.restore();
  // marco fijo
  if (kind !== 'split') { lab(o, '@jaywrkr', 90, 70, 'left', .5, 18); const si = l.sec; lab(o, SECN[si], W / 2, 70, 'center', .45, 18); }
  if (l.sec >= 1 && kind !== 'split') { const s = score(t); lab(o, `Claude ${s.c} · ChatGPT ${s.gp}`, W - 90, 70, 'right', .7, 18); }
  const keep = LN.find(x => x.sc === 'keep61'), b70 = LN.find(x => x.sc === 'bar70');
  if (keep && b70 && t >= keep.e && t < b70.a && kind !== 'split') T(o, '61 %', W - 200, 150, 36, white ? 1 : .9, 'center');
  // barra de progreso por capítulos
  SECA.forEach((a, i) => { const b = SECA[i + 1] || DUR, x = 90 + i * ((W - 180) / 7), w = (W - 180) / 7 - 10; R(o, x, H - 50, w, 3, .18); R(o, x, H - 50, w * prog(t, a, b), 3, .8); });
  if (kind !== 'split') lab(o, 'simple.', W - 90, H - 80, 'right', .35, 16);
  o.drawImage(grain, 0, 0);
}

const PREVIEW = process.env.PREVIEW;
if (PREVIEW) { const c = new Canvas(W, H), o = c.getContext('2d'); PREVIEW.split(',').forEach((x, i) => { frame(o, +x); c.saveAsSync(D + `q-${i}.jpg`, { quality: .85 }); }); process.exit(0); }
const N = Math.ceil(DUR * FPS);
const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${W}x${H}`, '-r', String(FPS), '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-pix_fmt', 'yuv420p', D + 'video.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
(async () => { const c = new Canvas(W, H), o = c.getContext('2d');
  for (let i = 0; i < N; i++) { o.reset(); frame(o, i / FPS); const buf = c.toBufferSync('raw'); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); if (i % 900 === 0) console.log('frame', i, '/', N); }
  ff.stdin.end(); ff.on('close', () => console.log('done')); })();
