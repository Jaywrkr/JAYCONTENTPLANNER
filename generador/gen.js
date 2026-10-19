// Plan octubre · generador de artes A/B + plan.json
const { Canvas, FontLibrary, ImageData } = require('skia-canvas');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
process.chdir(__dirname);
FontLibrary.use('Geist Mono', fs.readdirSync('fonts').map(f => 'fonts/' + f));
const F = '"Geist Mono", monospace', LIGHT = 300, REG = 400;
let OUT = '/home/claude/plan-octubre/assets'; fs.mkdirSync(OUT, { recursive: true });
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const g = v => { const c = Math.round(clamp(v) * 255); return `rgb(${c},${c},${c})`; };

// ── fondo (mismo motor que los reels) ──
function makeBG(W, H) {
  const SW = Math.round(W / 8), SH = Math.round(H / 8), small = new Canvas(SW, SH), s = small.getContext('2d');
  const bg = new Canvas(W, H), b = bg.getContext('2d'), O = Buffer.alloc(W * H * 4);
  const base = [[0.22, 0.28, 0.22, 0.18, 0.11, 0.07, 0.0, 270], [0.80, 0.52, 0.18, 0.26, 0.08, 0.10, 1.7, 300], [0.35, 0.82, 0.28, 0.14, 0.06, 0.09, 3.1, 250], [0.78, 0.12, 0.16, 0.12, 0.09, 0.05, 4.4, 220]];
  let seed = 1; const rnd = () => { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return (seed >>> 0) / 4294967296; };
  function mesh(t, mode, idx = 0) {
    const img = s.createImageData(SW, SH), d = img.data, k = W / SW;
    const bs = base.map(([cx, cy, ax, ay, wx, wy, ph, r]) => [(cx + ax * Math.sin(t * wx * 2 * Math.PI / 6 + ph + idx * 1.3)) * W, (cy + ay * Math.cos(t * wy * 2 * Math.PI / 6 + ph * 1.3 + idx * 0.9)) * H, r * W / 1080]);
    for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) {
      const px = (x + 0.5) * k, py = (y + 0.5) * k; let f = 0;
      for (const [bx, by, r] of bs) { const dx = px - bx, dy = py - by; f += Math.exp(-(dx * dx + dy * dy) / (2 * r * r)); }
      f = clamp((f - 0.3) / 0.5); f = f * f * (3 - 2 * f);
      const v = mode === 'light' ? 1 - 0.96 * f : 0.02 + 0.94 * f, i = (y * SW + x) * 4, c = Math.round(v * 255);
      d[i] = d[i + 1] = d[i + 2] = c; d[i + 3] = 255;
    }
    s.putImageData(img, 0, 0); b.imageSmoothingQuality = 'high'; b.drawImage(small, 0, 0, SW, SH, 0, 0, W, H);
  }
  function solid(v) { b.fillStyle = `rgb(${v},${v},${v})`; b.fillRect(0, 0, W, H); }
  async function compose(ov, grain) {
    const B = await bg.toBuffer('raw'), X = await ov.toBuffer('raw'); seed = 4242;
    for (let i = 0; i < O.length; i += 4) {
      const bs = B[i], st = X[i] / 255, target = bs > 128 ? 0 : 255;
      let v = bs + st * (target - bs) + (rnd() - 0.5) * grain * (1 - st * 0.7);
      O[i] = O[i + 1] = O[i + 2] = v < 0 ? 0 : v > 255 ? 255 : v; O[i + 3] = 255;
    }
    return O;
  }
  return { mesh, solid, compose };
}
const BGS = {};
async function render(W, H, theme, idx, draw, file) {
  const key = W + 'x' + H; const bg = BGS[key] || (BGS[key] = makeBG(W, H));
  if (theme === 'N') bg.solid(4); else if (theme === 'W') bg.solid(250); else bg.mesh(idx * 2.7, idx % 2 ? 'dark' : 'light', idx);
  const ov = new Canvas(W, H), o = ov.getContext('2d'); o.fillStyle = '#000'; o.fillRect(0, 0, W, H);
  draw(o, W, H);
  const buf = await compose(bg, ov, theme);
  const c = new Canvas(W, H); c.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(buf), W, H), 0, 0);
  await c.toFile(path.join(OUT, file), { quality: 0.9 });
  if (H < 1500) thumb(file);
  return file;
}
async function compose(bg, ov, theme) { return bg.compose(ov, theme === 'M' ? 18 : 6); }

// ── primitivas (blanco = intensidad) ──
function font(o, s, w) { o.font = `${w} ${s}px ${F}`; }
function txt(o, s, x, y, size = 36, w = LIGHT, a = 1, al = 'center') { font(o, size, w); o.fillStyle = g(a); o.textAlign = al; o.textBaseline = 'middle'; o.fillText(s, x, y); return o.measureText(s).width; }
const label = (o, s, x, y, al = 'left', a = 0.6) => txt(o, s, x, y, 20, REG, a, al);
const hl = (o, x, y, w, a = 1) => { o.fillStyle = g(a); o.fillRect(x, y - 0.75, w, 1.5); };
function chrome(o, W, H, serie, n) {
  label(o, '@jaywrkr', 90, 90);
  if (serie) label(o, serie.toUpperCase(), W - 90, 90, 'right');
  label(o, n || 'simple.', W - 90, H - 90, 'right', 0.45);
}
function lines(o, W, cy, ls, size = 36, lh = 54, a = 1) { const y0 = cy - (ls.length - 1) * lh / 2; ls.forEach((l, i) => txt(o, l, W / 2, y0 + i * lh, size, LIGHT, a)); }

// ── plantillas ──
const T = {
  text: (ls, serie) => (o, W, H) => { chrome(o, W, H, serie); lines(o, W, H / 2, ls); },
  wall: (ls, serie) => (o, W, H) => { chrome(o, W, H, serie); lines(o, W, H > 1500 ? H * 0.62 : H / 2, ls); },
  edit: (old, nw) => (o, W, H) => {
    chrome(o, W, H, 'Edición');
    const w = txt(o, old, W / 2, H / 2 - 36, 36, LIGHT, 0.4); hl(o, W / 2 - w / 2 - 8, H / 2 - 36, w + 16, 0.75);
    txt(o, nw, W / 2, H / 2 + 36, 36, LIGHT, 1);
  },
  repeat: (phrase, variant, end) => (o, W, H) => {
    chrome(o, W, H, 'Repetir');
    const size = 15, lh = 25; font(o, size, LIGHT); const cw = o.measureText('M').width;
    const x0 = 90, cols = Math.floor((W - 180) / cw), rows = Math.floor((H - 260) / lh), y0 = (H - (rows - 1) * lh) / 2;
    const P = phrase.toUpperCase(), words = P.split(' ');
    let rnd = 7; const r = () => { rnd = (rnd * 16807) % 2147483647; return rnd / 2147483647; };
    const ROWS = []; let wi = 0;
    for (let i = 0; i < rows; i++) { let s = ''; while (true) { const w = words[wi % words.length]; if ((s ? s.length + 1 : 0) + w.length > cols) break; s += (s ? ' ' : '') + w; wi++; } ROWS.push(s); }
    for (let i = 0; i < rows; i++) {
      const y = y0 + i * lh, k = i / (rows - 1);
      let s = ROWS[i], a = 0.9;
      if (variant === 'fade') a = 0.95 - 0.85 * k;
      if (variant === 'short') { const n = Math.max(1, words.length - (i % words.length)); s = words.slice(0, n).join(' '); a = 0.9; }
      if (variant === 'lose') s = s.split('').map((ch, j) => (ch !== ' ' && r() < k * 0.95 ? ' ' : ch)).join('');
      if (variant === 'word') { a = 0.22; }
      if (end && Math.abs(i - Math.floor(rows / 2)) <= 1) continue;
      txt(o, s, x0, y, size, LIGHT, a, 'left');
    }
    if (end) txt(o, end, W / 2, y0 + Math.floor(rows / 2) * lh, 36, LIGHT, 1);
  },
  slide: (ls, i, n, serie) => (o, W, H) => { chrome(o, W, H, serie, String(i).padStart(2, '0') + ' / ' + String(n).padStart(2, '0')); lines(o, W, H / 2, ls); },
};

// ── origen externo (frames de reels / carruseles ya hechos) ──
function crop916(src, file) { execSync(`ffmpeg -y -loglevel error -i "${src}" -vf "crop=1080:1350:0:285" -q:v 3 "${OUT}/${file}"`); thumb(file); return file; }
function conv(src, file) { execSync(`ffmpeg -y -loglevel error -i "${src}" -q:v 3 "${OUT}/${file}"`); thumb(file); return file; }
function thumb(file) { execSync(`ffmpeg -y -loglevel error -i "${OUT}/${file}" -vf scale=216:-2 -q:v 5 "${OUT}/th-${file}"`); }

module.exports = { render, T, crop916, conv, thumb, makeBG, setOut: d => { OUT = d; fs.mkdirSync(d, { recursive: true }); } };
