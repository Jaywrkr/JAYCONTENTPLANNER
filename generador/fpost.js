// Posts de viernes que anuncian los fondos: 3 composiciones distintas (no texto al centro)
const { render, setOut, thumb } = require('./gen.js');
const L = require('./clib.js');
const { Canvas, loadImage } = require('skia-canvas');
const OUT = '/home/claude/campana/c'; setOut(OUT);
const R = 2796 / 1290;
const LAY = {
  hero: (W, H) => { const a = { w: 420 }; a.h = a.w * R; a.x = 150; a.y = 300; const b = { w: 270 }; b.h = b.w * R; b.x = W - 150 - b.w; b.y = a.y + a.h - b.h; return [a, b]; },
  escalera: (W, H) => { const w = 320, h = w * R; return [{ x: W / 2 - w - 30, y: 320, w, h }, { x: W / 2 + 30, y: 320 + 120, w, h }]; },
  escaleraR: (W, H) => { const w = 320, h = w * R; return [{ x: W / 2 - w - 30, y: 320 + 120, w, h }, { x: W / 2 + 30, y: 320, w, h }]; },
  corte: (W, H) => { const a = { w: 560 }; a.h = a.w * R; a.x = 120; a.y = 420; const b = { w: 250 }; b.h = b.w * R; b.x = W - 120 - b.w; b.y = 420; return [a, b]; },
};
async function make(file, n, th, lay, lock, home, line) {
  const W = 1080, H = 1350, P = LAY[lay](W, H);
  await render(W, H, th, 0, (o) => {
    L.chrome(o, W, H, 'fondo', n);
    P.forEach((p, i) => { L.B(o, p.x - 8, p.y - 8, p.w + 16, Math.min(p.h + 16, H - p.y + 8)); });
    const lx = lay === 'corte' ? 120 : lay === 'hero' ? 150 : W / 2 - 350;
    L.lab(o, '2 FONDOS · BLOQUEO + INICIO', lx, lay === 'corte' ? 250 : 200, 'left', .55);
    L.txt(o, line, lx, lay === 'corte' ? 310 : 245, 30, 1, 'left');
    if (lay === 'hero') { L.lab(o, 'BLOQUEO', P[0].x, P[0].y + P[0].h + 40, 'left', .5); L.lab(o, 'INICIO', P[1].x, P[1].y + P[1].h + 40, 'left', .5); }
    if (lay === 'corte') { L.lab(o, 'INICIO', P[1].x, P[1].y + P[1].h + 40, 'left', .5); L.lab(o, 'captúralos en historias', P[1].x, P[1].y + P[1].h + 80, 'left', .45); }
  }, file);
  const c = new Canvas(W, H), x = c.getContext('2d'); x.drawImage(await loadImage(OUT + '/' + file), 0, 0); x.imageSmoothingQuality = 'high';
  const im = [await loadImage(OUT + '/' + lock), await loadImage(OUT + '/' + home)];
  P.forEach((p, i) => { x.save(); x.beginPath(); x.rect(p.x, p.y, p.w, Math.min(p.h, H - p.y)); x.clip(); x.drawImage(im[i], p.x, p.y, p.w, p.h); x.restore(); });
  await c.toFile(OUT + '/' + file, { quality: .92 }); thumb(file);
}
(async () => {
  await make('c1023-a-fondo.jpg', 3, 'W', 'hero', 'c1023-a-bloqueo.jpg', 'c1023-a-inicio.jpg', 'Primero lo importante.');
  await make('c1023-b-fondo.jpg', 3, 'W', 'escalera', 'c1023-b-bloqueo.jpg', 'c1023-b-inicio.jpg', 'Hoy cuenta.');
  await make('c1030-a-fondo.jpg', 4, 'N', 'corte', 'c1030-a-bloqueo.jpg', 'c1030-a-inicio.jpg', 'Para cada vez que lo desbloqueas.');
  await make('c1030-b-fondo.jpg', 4, 'N', 'escaleraR', 'c1030-b-bloqueo.jpg', 'c1030-b-inicio.jpg', 'Dos fondos. Una semana.');
  console.log('ok');
})();
