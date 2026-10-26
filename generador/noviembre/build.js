// Render de posts de una semana: node build.js w1
const { G, L, OUT } = require('./lib.js'); const { Canvas, loadImage } = require('skia-canvas');
const P = require('./' + process.argv[2] + '.js'), R = 2796 / 1290;
const LAY = { hero: (W) => { const a = { w: 380 }; a.h = a.w * R; a.x = 170; a.y = 293; const b = { w: 250 }; b.h = b.w * R; b.x = W - 170 - b.w; b.y = a.y + a.h - b.h; return [a, b]; },
  escalera: (W) => { const w = 320, h = w * R; return [{ x: W / 2 - w - 30, y: 320, w, h }, { x: W / 2 + 30, y: 440, w, h }]; } };
(async () => { const out = [];
  for (const day of P) for (const K of ['A', 'B']) { const o = day[K], id = 'c' + day.d.slice(5).replace('-', ''), f = id + '-' + K.toLowerCase(); const rec = { d: day.d, K, files: [] };
    if (o.draw) { await G.render(1080, 1350, o.th, 0, o.draw, f + '.jpg'); rec.files = [f + '.jpg']; }
    if (o.sl) { for (let i = 0; i < o.sl.length; i++) { const nm = `${f}-${String(i + 1).padStart(2, '0')}.jpg`; await G.render(1080, 1350, o.th, 0, L.T.slide(day.n, i + 1, o.sl.length, o.sl[i]), nm); rec.files.push(nm); } }
    if (o.f) { const lock = f + '-bloqueo.jpg', home = f + '-inicio.jpg';
      await G.render(1290, 2796, o.lockTh, 0, (c, W, H) => { L.chrome(c, W, H, 'fondo', day.n); L.T.lock(o.f)(c, W, H); }, lock); await G.render(1290, 2796, o.home.th, 0, L.HOME[o.home.k](o.home.p), home);
      const W = 1080, H = 1350, ph = LAY[o.lay](W), nm = f + '-fondo.jpg';
      await G.render(W, H, o.th, 0, (c) => { L.chrome(c, W, H, 'fondo', day.n); ph.forEach(p => L.B(c, p.x - 8, p.y - 8, p.w + 16, p.h + 16));
        const lx = o.lay === 'hero' ? 170 : W / 2 - 350, ly = o.lay === 'hero' ? 193 : 200; L.lab(c, '2 FONDOS · BLOQUEO + INICIO', lx, ly, 'left', .55); L.txt(c, o.line, lx, ly + 45, 30, 1, 'left');
        if (o.lay === 'hero') { L.lab(c, 'BLOQUEO', ph[0].x, ph[0].y + ph[0].h + 40, 'left', .5); L.lab(c, 'INICIO', ph[1].x, ph[1].y + ph[1].h + 40, 'left', .5); } }, nm);
      const cv = new Canvas(W, H), x = cv.getContext('2d'); x.drawImage(await loadImage(OUT + '/' + nm), 0, 0); const im = [await loadImage(OUT + '/' + lock), await loadImage(OUT + '/' + home)];
      ph.forEach((p, i) => x.drawImage(im[i], p.x, p.y, p.w, p.h)); await cv.toFile(OUT + '/' + nm, { quality: .92 }); G.thumb(nm); rec.files = [nm]; rec.wall = { lock, home }; }
    out.push(rec); process.stdout.write(f + ' '); }
  require('fs').writeFileSync('/home/claude/nov/' + process.argv[2] + '-files.json', JSON.stringify(out)); console.log('\nok');
})().catch(e => { console.error(e); process.exit(1); });
