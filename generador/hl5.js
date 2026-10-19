const { render, setOut } = require('./gen.js');
const L = require('./clib.js');
const { Canvas, loadImage } = require('skia-canvas');
const C = '/home/claude/campana/c'; setOut(C);
const W = 1080, H = 1920;
const mark = (o, x, y) => { L.R(o, x, y + 6, 16, 16); L.R(o, x + 24, y + 13.25, 60, 1.5); L.R(o, x + 84, y + 6, 1.5, 16); };
const chrome = (o, i) => { L.lab(o, '@jaywrkr', 90, 250); L.lab(o, 'EMPIEZA AQUÍ  ' + String(i).padStart(2, '0') + ' / 06', W - 90, 250, 'right'); mark(o, 90, 1590); L.lab(o, 'simple.', W - 90, 1604, 'right', 0.45); };
const TH = [['c1005-b.jpg', 'lun 5 oct', 'Tachado'], ['c1008-a-reel-poster.jpg', 'jue 8 oct', 'Truco'], ['c1010-b-01.jpg', 'sáb 10 oct', 'Semana']];
const tw = 240, th = 300, gap = 30, x0 = (W - (3 * tw + 2 * gap)) / 2, y0 = 760;
(async () => {
  await render(W, H, 'N', 0, o => {
    chrome(o, 5); L.lines(o, W, 600, ['Empieza por estas tres.']);
    TH.forEach(([, d, s], i) => { const x = x0 + i * (tw + gap); L.B(o, x - 6, y0 - 6, tw + 12, th + 12, 0.5); L.lab(o, d, x, y0 + th + 40, 'left', 0.5); L.lab(o, s, x, y0 + th + 72, 'left', 0.9); });
    L.lab(o, 'siguientes historias →', W / 2, 1300, 'center', 0.5);
  }, 'hl-empieza-05.jpg');
  const c = new Canvas(W, H), x = c.getContext('2d'); x.drawImage(await loadImage(C + '/hl-empieza-05.jpg'), 0, 0);
  for (let i = 0; i < 3; i++) {
    const im = await loadImage(C + '/' + TH[i][0]); const r = tw / th; let sw = im.width, sh = im.width / r; if (sh > im.height) { sh = im.height; sw = sh * r; }
    x.drawImage(im, (im.width - sw) / 2, (im.height - sh) / 2, sw, sh, x0 + i * (tw + gap), y0, tw, th);
  }
  await c.toFile(C + '/hl-empieza-05.jpg', { quality: 0.92 });
  // alternativas para la 01
  await render(W, H, 'N', 0, o => { chrome(o, 1); L.lines(o, W, H / 2, ['Hola, soy Jay.', '', 'Diseño con código.', 'Publico verdades incómodas.']); }, 'alt1-hl-empieza-01.jpg');
  await render(W, H, 'N', 0, o => { chrome(o, 1); L.lines(o, W, H / 2 - 40, ['Soy Jay.']); L.lab(o, 'creativo · diseño · código · música', W / 2, H / 2 + 40, 'center', 0.6); }, 'alt2-hl-empieza-01.jpg');
  console.log('ok');
})();
