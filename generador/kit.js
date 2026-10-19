// Kit de historias: (1) fondo para el sticker interactivo, (2) proceso automático "detrás del post", (3) reciclaje
const { Canvas, loadImage } = require('skia-canvas');
require('./gen.js'); // registra Geist Mono
const fs = require('fs');
const P = JSON.parse(fs.readFileSync('/home/claude/campana/plan.json'));
const C = '/home/claude/campana/c', W = 1080, H = 1920, F = '"Geist Mono", monospace';
const only = process.argv[2];

function base(dark) { const c = new Canvas(W, H), o = c.getContext('2d'); o.fillStyle = dark ? '#060606' : '#f7f7f7'; o.fillRect(0, 0, W, H); const fg = dark ? '#f2f2f2' : '#0a0a0a', dim = dark ? '#8a8a8a' : '#7a7a7a'; return { c, o, fg, dim }; }
function t(o, s, x, y, size, col, al = 'center', w = 300) { o.font = `${w} ${size}px ${F}`; o.fillStyle = col; o.textAlign = al; o.textBaseline = 'middle'; o.fillText(s, x, y); return o.measureText(s).width; }
function wrap(o, s, max, size) { o.font = `300 ${size}px ${F}`; const out = []; let line = ''; for (const w of s.split(' ')) { const tr = line ? line + ' ' + w : w; if (o.measureText(tr).width > max && line) { out.push(line); line = w; } else line = tr; } if (line) out.push(line); return out; }
function chrome(k, label) { const { o, fg, dim } = k; t(o, '@jaywrkr', 90, 250, 20, dim, 'left', 400); t(o, label, W - 90, 250, 20, dim, 'right', 400); t(o, 'simple.', W - 90, 1604, 20, dim, 'right', 400); }

const KIND = [[/encuesta/i, 'ENCUESTA'], [/quiz/i, 'QUIZ'], [/slider|deslizador/i, 'SLIDER'], [/añadir el tuyo|Añadir el tuyo/i, 'AÑADE EL TUYO'], [/pregunta/i, 'PREGUNTA']];
function interactive(st) {
  for (const s of st) { if (/^Historia 1/.test(s)) continue; for (const [re, k] of KIND) if (re.test(s)) { const q = (s.match(/“([^”]+)”/) || [])[1]; const opts = (s.split('”')[1] || '').replace(/^[\s.:]+/, '').replace(/\.$/, '').trim(); if (q) return { k, q, opts: opts.includes('/') ? opts : '' }; } }
  return null;
}
async function sticker(file, dark, it, n) {
  const k = base(dark), { o, fg, dim } = k; chrome(k, it.k);
  const ls = wrap(o, it.q, 760, 40); ls.forEach((l, i) => t(o, l, W / 2, 640 + i * 58 - (ls.length - 1) * 29, 40, fg));
  o.strokeStyle = dim; o.lineWidth = 1.5; o.setLineDash([6, 8]); o.strokeRect(190, 860, 700, 300); o.setLineDash([]);
  t(o, 'pon aquí el sticker de ' + it.k.toLowerCase(), W / 2, 1010, 20, dim, 'center', 400);
  if (it.opts) t(o, it.opts, W / 2, 1220, 20, dim, 'center', 400);
  await k.c.toFile(C + '/' + file, { quality: 0.9 });
}
async function proceso(file, img, dark, info) {
  const k = base(dark), { o, fg, dim } = k; chrome(k, 'DETRÁS DEL POST');
  const im = await loadImage(C + '/' + img); let w = 720, h = Math.round(w * im.height / im.width); if (h > 860) { h = 860; w = Math.round(h * im.width / im.height); } const x = (W - w) / 2, y = 400;
  o.drawImage(im, x, y, w, h);
  o.strokeStyle = fg; o.lineWidth = 1.5; o.strokeRect(x, y, w, h);
  const m = w * 90 / 1080; o.globalAlpha = 0.55; o.setLineDash([4, 6]); o.strokeStyle = '#888';
  o.strokeRect(x + m, y + m, w - 2 * m, h - 2 * m); o.beginPath(); o.moveTo(x + w / 2, y); o.lineTo(x + w / 2, y + h); o.moveTo(x, y + h / 2); o.lineTo(x + w, y + h / 2); o.stroke(); o.setLineDash([]); o.globalAlpha = 1;
  const rows = [['fuente', 'Geist Mono Light'], ['tamaño', info.size], ['fondo', info.theme], ['vacío', '≈ 70%'], ['margen', '90 px'], ['hecho con', 'código']];
  rows.forEach(([a, b], i) => { const yy = y + h + 70 + i * 44; t(o, a, 190, yy, 22, dim, 'left', 400); t(o, b, 890, yy, 22, fg, 'right'); o.fillStyle = dim; o.globalAlpha = .3; o.fillRect(190, yy + 20, 700, 1); o.globalAlpha = 1; });
  await k.c.toFile(C + '/' + file, { quality: 0.9 });
}
async function reciclaje(file, img) {
  const k = base(true), { o, fg, dim } = k; chrome(k, 'POR SI TE LO PERDISTE');
  const im = await loadImage(C + '/' + img), w = 620, h = Math.round(w * im.height / im.width), x = (W - w) / 2, y = 520;
  t(o, 'El post que más compartieron.', W / 2, 420, 36, fg);
  o.drawImage(im, x, y, w, h); o.strokeStyle = dim; o.lineWidth = 1.5; o.strokeRect(x, y, w, h);
  t(o, 'Mándaselo a quien todavía dice “después”.', W / 2, y + h + 80, 24, dim);
  await k.c.toFile(C + '/' + file, { quality: 0.9 });
}

(async () => {
  const kit = {};
  for (const d of P) {
    if (d.date < '2026-10-14' || (only && !d.date.endsWith(only))) continue;
    for (const K of ['A', 'B']) {
      const op = d.opts[K], id = 'c' + d.date.slice(5).replace('-', '') + '-' + K.toLowerCase(), dark = op.theme !== 'Blanco', out = {};
      const it = interactive(op.st);
      if (it) { out.sticker = id + '-st-sticker.jpg'; out.it = it; await sticker(out.sticker, dark, it); }
      const img = op.files[0] && !op.wall ? op.files[0] : op.poster;
      if (img && d.serie !== 'fondo') { out.proceso = id + '-st-proceso.jpg'; await proceso(out.proceso, img, dark, { size: d.serie === 'cien' ? (op.title ? '26 px' : '15 px') : '36 px', theme: op.theme.toLowerCase() }); }
      kit[d.date + K] = out;
    }
  }
  await reciclaje('st-reciclaje-1005.jpg', 'c1005-b.jpg').catch(e => console.log('reciclaje', e.message));
  if (!only) fs.writeFileSync('/home/claude/campana/kit.json', JSON.stringify(kit, null, 1));
  console.log(Object.keys(kit).length, 'opciones');
})();
