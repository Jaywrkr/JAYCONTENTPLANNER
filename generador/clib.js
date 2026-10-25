// primitivas + marcas + plantillas de las 7 series (overlay: blanco = intensidad)
const F = '"Geist Mono", monospace';
const g = v => { const c = Math.round(Math.max(0, Math.min(1, v)) * 255); return `rgb(${c},${c},${c})`; };
function txt(o, s, x, y, size = 36, a = 1, al = 'center', w = 300) { o.font = `${w} ${size}px ${F}`; o.fillStyle = g(a); o.textAlign = al; o.textBaseline = 'middle'; o.fillText(s, x, y); return o.measureText(s).width; }
function wid(o, s, size = 36, w = 300) { o.font = `${w} ${size}px ${F}`; return o.measureText(s).width; }
const R = (o, x, y, w, h, a = 1) => { if (w <= 0 || h <= 0) return; o.fillStyle = g(a); o.fillRect(x, y, w, h); };
const B = (o, x, y, w, h, a = 1, lw = 1.5) => { o.strokeStyle = g(a); o.lineWidth = lw; o.strokeRect(x, y, w, h); };
const lab = (o, s, x, y, al = 'left', a = 0.6) => txt(o, s, x, y, 20, a, al, 400);

const MARK = {
  tachado: (o, x, y, s) => { B(o, x, y, s, s); R(o, x - 4, y + s / 2 - 0.75, s + 8, 1.5); },
  cien: (o, x, y, s) => { const c = s / 5; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) R(o, x + i * 2 * c, y + j * 2 * c, c, c); },
  ecuacion: (o, x, y, s) => { R(o, x, y + s / 2 - 0.75, s, 1.5); R(o, x + s / 2 - 0.75, y, 1.5, s); },
  truco: (o, x, y, s) => { B(o, x, y, s, s); R(o, x + s / 2 - 3, y + s / 2 - 3, 6, 6); },
  fondo: (o, x, y, s) => { const w = s * 0.56; B(o, x + (s - w) / 2, y, w, s); R(o, x + (s - w) / 2 + w * 0.3, y + 4, w * 0.4, 1.5); },
  semana: (o, x, y, s, k = 1) => { const c = s / 9; for (let i = 0; i < 5; i++) (i < k ? R : B)(o, x + i * 2 * c, y + s * 0.2, c, s * 0.6, 1, 1.2); },
  sinfiltro: (o, x, y, s) => { R(o, x, y, s, s); },
};
const NAME = { tachado: 'Tachado', cien: '100 veces', ecuacion: 'Ecuación', truco: 'Truco', fondo: 'Fondo', semana: 'Semana', sinfiltro: 'Sin filtro' };
function chrome(o, W, H, mk, n, extra) {
  lab(o, '@jaywrkr', 90, 90);
  lab(o, NAME[mk].toUpperCase() + (typeof n === 'string' ? ' · ' + n : '  Nº ' + String(n).padStart(2, '0')), W - 90, 90, 'right');
  if (extra) lab(o, extra, W - 90, 124, 'right', 0.45);
  lab(o, 'simple.', W - 90, H - 90, 'right', 0.45);
  MARK[mk](o, 90, H - 104, 28, extra && extra.includes('/') ? +extra.split('/')[0] : 1);
}
// bloque de líneas; una línea puede ser {t, big:true} para 56px
function lines(o, W, cy, ls) {
  const L = ls.map(l => typeof l === 'string' ? { t: l } : l), hs = L.map(l => l.big ? 64 : 54);
  let y = cy - (hs.reduce((a, b) => a + b, 0) - hs[hs.length - 1]) / 2;
  L.forEach((l, i) => { txt(o, l.t, W / 2, y, l.big ? 56 : 36, l.a ?? 1); y += hs[i]; });
}

const T = {
  tachado: (n, old, nw) => (o, W, H) => {
    chrome(o, W, H, 'tachado', n);
    const a = wid(o, old), gap = wid(o, ' ') * 1.5, b = wid(o, nw), x0 = W / 2 - (a + gap + b) / 2;
    txt(o, old, x0, H / 2, 36, 0.4, 'left'); R(o, x0 - 6, H / 2 - 0.75, a + 12, 1.5, 0.75); txt(o, nw, x0 + a + gap, H / 2, 36, 1, 'left');
  },
  cien: (n, base, odd, oddRow = 5) => (o, W, H) => {
    chrome(o, W, H, 'cien', n);
    const size = 15, lh = 25, cw = wid(o, 'M', size), cols = Math.floor((W - 180) / cw), rows = Math.floor((H - 260) / lh), y0 = (H - (rows - 1) * lh) / 2;
    const per = Math.floor((cols + 1) / (base.length + 1));
    const x0 = (W - wid(o, Array(per).fill(base).join(' '), size)) / 2;
    for (let i = 0; i < rows; i++) {
      const cells = Array(per).fill(base); if (i === oddRow) cells[0] = odd;
      txt(o, cells.join(' '), x0, y0 + i * lh, size, 0.55, 'left');
    }
  },
  // 100 veces v2: más grande y en negro sólido, legible en el feed
  cien2: (n, base, odd, oddRow = 9) => (o, W, H) => {
    chrome(o, W, H, 'cien', n);
    const size = 26, lh = 44, cw = wid(o, 'M', size), cols = Math.floor((W - 180) / cw), rows = Math.floor((H - 300) / lh), y0 = (H - (rows - 1) * lh) / 2;
    const per = Math.max(1, Math.floor((cols + 1) / (base.length + 1)));
    const x0 = (W - wid(o, Array(per).fill(base).join(' '), size)) / 2;
    for (let i = 0; i < rows; i++) { const cells = Array(per).fill(base); if (i === oddRow) cells[per > 1 ? 1 : 0] = odd; txt(o, cells.join(' '), x0, y0 + i * lh, size, 0.92, 'left'); }
  },
  sinfiltro: (n, ls) => (o, W, H) => { chrome(o, W, H, 'sinfiltro', n); lines(o, W, H / 2, ls); },
  slide: (n, i, tot, ls) => (o, W, H) => { chrome(o, W, H, 'semana', n, String(i).padStart(2, '0') + ' / ' + String(tot).padStart(2, '0')); lines(o, W, H / 2, ls); },
  lock: (ls) => (o, W, H) => { lines(o, W, H / 2, ls.map(l => typeof l === 'string' ? { t: l, s: 43 } : l).map(l => l)); },
};
// el bloqueo se dibuja a 1290 de ancho: escalar a 43px
T.lock = ls => (o, W, H) => { const k = W / 1080; let y = H / 2 - (ls.length - 1) * 34 * k; ls.forEach(l => { txt(o, l, W / 2, y, 36 * k, 1); y += 54 * k; }); lab(o, '@jaywrkr', W / 2, H - 330, 'center', 0.3); };
T.fondoPost = (n, PW, PH) => (o, W, H) => {
  chrome(o, W, H, 'fondo', n);
  const y0 = (H - PH) / 2 - 20;
  [[W / 2 - PW - 30, 'BLOQUEO'], [W / 2 + 30, 'INICIO']].forEach(([px, l]) => { B(o, px - 8, y0 - 8, PW + 16, PH + 16); lab(o, l, px + PW / 2, y0 + PH + 44, 'center'); });
  lab(o, 'Captura las historias. Guárdalo de fondo.', W / 2, y0 - 60, 'center');
  return y0;
};

// ── Ecuación: diagramas ──
const EQ = {
  // 1% al día: un punto × 365 = cuadrado hecho de puntos
  uno: (o, W, H) => {
    txt(o, '1% al día.', W / 2, H / 2 - 220, 36); const y = H / 2 + 40;
    R(o, 250, y - 4, 8, 8); R(o, 280, y - 0.75, 300, 1.5, 0.6); R(o, 580, y - 6, 1.5, 12, 0.6);
    const n = 12, c = 8, gp = (180 - n * c) / (n - 1); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) R(o, 640 + i * (c + gp), y - 90 + j * (c + gp), c, c);
    lab(o, 'hoy', 254, y + 60, 'center'); lab(o, '× 365', 430, y - 30, 'center'); lab(o, 'en un año', 730, y + 130, 'center');
  },
  // motivación cae, hábito se mantiene
  motivacion: (o, W, H) => {
    txt(o, 'Motivación vs. hábito.', W / 2, H / 2 - 260, 36);
    const x0 = 200, n = 14, c = 34, gp = 12, y1 = H / 2 - 40, y2 = H / 2 + 140;
    for (let i = 0; i < n; i++) { const h = Math.max(0, 120 * (1 - i / 8)); R(o, x0 + i * (c + gp), y1 - h + 60, c, h, 0.9); R(o, x0 + i * (c + gp), y2 - 60 + 60, c, 60, 0.9); }
    lab(o, 'motivación', x0, y1 - 90); lab(o, 'hábito', x0, y2 - 30); R(o, x0, y2 + 80, n * (c + gp) - gp, 1.5, 0.5); lab(o, 'día 1', x0, y2 + 110); lab(o, 'día 14', x0 + n * (c + gp) - gp, y2 + 110, 'right');
  },
  // matriz urgente / importante
  matriz: (o, W, H) => {
    txt(o, 'Casi todo lo urgente', W / 2, H / 2 - 290, 36); txt(o, 'no importa.', W / 2, H / 2 - 236, 36);
    const s = 260, x = W / 2 - s, y = H / 2 - 150; B(o, x, y, s * 2, s * 2); R(o, x + s - 0.75, y, 1.5, s * 2); R(o, x, y + s - 0.75, s * 2, 1.5);
    let r = 11; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647;
    for (let k = 0; k < 46; k++) R(o, x + s + 20 + rnd() * (s - 50), y + s + 20 + rnd() * (s - 50), 8, 8); // urgente, no importante
    for (let k = 0; k < 3; k++) R(o, x + 30 + rnd() * (s - 70), y + 30 + rnd() * (s - 70), 14, 14); // importante, no urgente
    lab(o, 'importa', x - 16, y + s / 2, 'right'); lab(o, 'no importa', x - 16, y + s * 1.5, 'right');
    lab(o, 'no urgente', x + s / 2, y + s * 2 + 34, 'center'); lab(o, 'urgente', x + s * 1.5, y + s * 2 + 34, 'center');
  },
  // decir sí a todo: caja llena, no cabe lo importante
  si: (o, W, H) => {
    txt(o, 'Decir sí a todo', W / 2, H / 2 - 270, 36); txt(o, 'es decir no a lo importante.', W / 2, H / 2 - 216, 36);
    const x = 240, y = H / 2 - 110, w = 400, h = 300; B(o, x, y, w, h); lab(o, 'tu día', x, y - 30);
    const c = 30, gp = 10; for (let i = 0; i < Math.floor(w / (c + gp)); i++) for (let j = 0; j < Math.floor(h / (c + gp)); j++) R(o, x + 8 + i * (c + gp), y + 8 + j * (c + gp), c - 6, c - 6, 0.85);
    B(o, 720, y + 60, 140, 140); lab(o, 'lo importante', 790, y + 240, 'center');
  },
  // 4 h al día = 60 días al año
  pantalla: (o, W, H) => {
    txt(o, '4 horas de pantalla al día', W / 2, H / 2 - 270, 36); txt(o, '= 60 días al año.', W / 2, H / 2 - 216, 36);
    const c = 26, gp = 8, x0 = (W - (24 * c + 23 * gp)) / 2, y = H / 2 - 90;
    for (let i = 0; i < 24; i++) (i >= 18 && i < 22 ? R : B)(o, x0 + i * (c + gp), y, c, c, 1, 1.2);
    lab(o, 'un día · 24 h', x0, y - 30);
    const y2 = y + 110, c2 = 12, gp2 = 6, cols = 37; const x2 = (W - (cols * (c2 + gp2) - gp2)) / 2;
    for (let k = 0; k < 365; k++) { const i = k % cols, j = Math.floor(k / cols); R(o, x2 + i * (c2 + gp2), y2 + j * (c2 + gp2), c2, c2, k < 60 ? 1 : 0.22); }
    lab(o, 'un año · 365 días', x2, y2 + 10 * (c2 + gp2) + 30);
  },
  // 3 días malos de 30
  racha: (o, W, H) => {
    txt(o, 'Un mal día', W / 2, H / 2 - 230, 36); txt(o, 'no es una mala racha.', W / 2, H / 2 - 176, 36);
    const c = 50, gp = 14, cols = 10, x0 = (W - (cols * c + (cols - 1) * gp)) / 2, y0 = H / 2 - 60, bad = [6, 13, 22];
    for (let k = 0; k < 30; k++) { const i = k % cols, j = Math.floor(k / cols); (bad.includes(k) ? B : R)(o, x0 + i * (c + gp), y0 + j * (c + gp), c, c, bad.includes(k) ? 1 : 0.9); }
    lab(o, '3 de 30', x0, y0 + 3 * (c + gp) + 30);
  },
  // 10 páginas al día = 12 libros
  libros: (o, W, H) => {
    txt(o, '10 páginas al día', W / 2, H / 2 - 250, 36); txt(o, '= 12 libros al año.', W / 2, H / 2 - 196, 36);
    const y = H / 2 + 20; for (let i = 0; i < 10; i++) R(o, 190 + i * 14, y - 40, 6, 80, 0.9);
    lab(o, 'hoy', 250, y + 80, 'center'); R(o, 360, y - 0.75, 180, 1.5, 0.6); R(o, 540, y - 6, 1.5, 12, 0.6); lab(o, '× 365', 450, y - 30, 'center');
    for (let i = 0; i < 12; i++) R(o, 600 + i * 26, y - 90, 18, 180, 0.9); lab(o, 'en un año', 600 + 6 * 26 - 4, y + 130, 'center');
  },
  // más tareas ≠ más avance
  avance: (o, W, H) => {
    txt(o, 'Más tareas', W / 2, H / 2 - 260, 36); txt(o, 'no es más avance.', W / 2, H / 2 - 206, 36);
    let r = 5; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647;
    const y1 = H / 2 - 40; for (let k = 0; k < 40; k++) R(o, 200 + rnd() * 660, y1 - 60 + rnd() * 120, 8, 8, 0.85); lab(o, 'ocupado', 200, y1 - 100);
    const y2 = H / 2 + 190; R(o, 200, y2 - 0.75, 660, 1.5); for (let i = 0; i <= 6; i++) R(o, 200 + i * 110 - 4, y2 - 4, 8, 8); lab(o, 'enfocado', 200, y2 - 40);
  },
};

// ── Truco estático ──
const TS = {
  zoom: (o, W, H) => { txt(o, 'Haz zoom.', W / 2, H / 2 - 160, 36); B(o, W / 2 - 150, H / 2 - 40, 300, 120, 0.5); txt(o, 'Si hiciste zoom, ya tienes curiosidad. Úsala hoy.', W / 2, H / 2 + 20, 7, 0.9, 'center', 400); },
  letras: (o, W, H) => {
    txt(o, 'Lee solo las letras claras.', W / 2, 250, 36);
    const msg = 'EMPIEZAHOY', AL = 'QWERTYUIOPASDFGHJKLZXCVBNM', cols = 14, rows = 12, c = 56, x0 = (W - (cols - 1) * c) / 2, y0 = 400;
    let r = 3; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647; const pos = new Set(); let k = 0;
    const picks = [[1, 2], [2, 5], [3, 1], [4, 9], [5, 4], [6, 12], [7, 7], [8, 3], [9, 10], [10, 6]];
    picks.forEach(([j, i], m) => pos.add(j * cols + i));
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const idx = j * cols + i; let ch = AL[Math.floor(rnd() * AL.length)], a = 0.3; if (pos.has(idx)) { ch = msg[picks.findIndex(p => p[0] * cols + p[1] === idx)]; a = 0.95; } txt(o, ch, x0 + i * c, y0 + j * c, 30, a); }
  },
  distinto: (o, W, H) => {
    txt(o, 'Encuentra el cuadrado distinto.', W / 2, 250, 36);
    const cols = 9, rows = 11, c = 60, gp = 26, x0 = (W - (cols * c + (cols - 1) * gp)) / 2, y0 = 360;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const odd = j === 7 && i === 6, s = odd ? 54 : c; B(o, x0 + i * (c + gp) + (c - s) / 2, y0 + j * (c + gp) + (c - s) / 2, s, s, 0.9); }
  },
  check: (o, W, H) => { B(o, 170, H / 2 - 18, 36, 36); txt(o, 'Lo que dijiste que harías hoy.', 236, H / 2, 36, 1, 'left'); lab(o, 'Doble toque si ya está.', W / 2, H / 2 + 120, 'center', 0.6); },
};

module.exports = { F, g, txt, wid, R, B, lab, MARK, NAME, chrome, lines, T, EQ, TS };

// ── Sin filtro: gráficos ──
const L = module.exports;
const SFG = {
  recibo: (o, W, H) => { // recibo ficticio
    const x = W / 2 - 200, y = 260, w = 400, h = 640; L.B(o, x, y, w, h);
    L.lab(o, 'COMPROBANTE', W / 2, y + 50, 'center'); L.lab(o, 'Nº 000000', W / 2, y + 80, 'center', 0.4);
    for (let k = 0; k < 40; k++) L.R(o, x + 20 + k * 9.2, y + 120, 4, 1.5, 0.5);
    [['Motivación adeudada', '0'], ['Ganas recibidas', '0'], ['Permisos pendientes', '0'], ['Excusas aceptadas', '0']].forEach(([a, b], i) => { L.lab(o, a, x + 24, y + 180 + i * 56, 'left', 0.8); L.lab(o, b, x + w - 24, y + 180 + i * 56, 'right', 0.8); });
    for (let k = 0; k < 40; k++) L.R(o, x + 20 + k * 9.2, y + 420, 4, 1.5, 0.5);
    L.lab(o, 'TOTAL', x + 24, y + 470, 'left'); L.txt(o, '0', x + w - 24, y + 470, 36, 1, 'right');
    for (let k = 0; k < 28; k++) L.R(o, x + 30 + k * 12.5, y + 540, k % 3 ? 3 : 6, 50, 0.9);
    L.lines(o, W, 1060, ['Nadie te debe motivación.']);
  },
  potencial: (o, W, H) => {
    const base = 880, bw = 180; L.R(o, 200, base - 0.75, 680, 1.5, 0.6);
    L.B(o, 280, base - 560, bw, 560, 0.9); for (let k = 0; k < 28; k++) L.R(o, 280 + 8, base - 560 + 10 + k * 20, bw - 16, 1, 0.25);
    L.R(o, 620, base - 60, bw, 60, 1);
    L.lab(o, 'potencial', 280 + bw / 2, base + 34, 'center'); L.lab(o, 'lo que haces', 620 + bw / 2, base + 34, 'center');
    L.lab(o, '∞', 280 + bw / 2, base - 590, 'center', 0.6); L.lab(o, 'esto paga', 620 + bw / 2, base - 90, 'center', 0.6);
    L.lines(o, W, 1080, ['Tu potencial no paga cuentas.']);
  },
  uno: (o, W, H) => {
    const cols = 20, rows = 20, c = 22, gp = 12, x0 = (W - (cols * c + (cols - 1) * gp)) / 2, y0 = 230;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) (i === 13 && j === 7 ? L.R : L.B)(o, x0 + i * (c + gp), y0 + j * (c + gp), c, c, i === 13 && j === 7 ? 1 : 0.35, 1);
    L.lab(o, 'tú', x0 + 13 * (c + gp) + c / 2, y0 + 7 * (c + gp) - 22, 'center');
    L.lab(o, 'lo que piensan los demás en un día · 1 de 400', W / 2, y0 + rows * (c + gp) + 20, 'center', 0.6);
    L.lines(o, W, 1080, ['Nadie está pensando en ti', 'tanto como crees.']);
  },
  pospuesto: (o, W, H) => {
    const D = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom', 'lun', 'mar', 'mié'];
    D.forEach((d, i) => { const y = 230 + i * 64; L.lab(o, d, 150, y + 16, 'left', 0.5); const x = 240 + i * 52; L.B(o, x, y, 260, 34, 0.9); L.lab(o, 'lo importante', x + 14, y + 17, 'left', i === D.length - 1 ? 1 : 0.7); if (i < D.length - 1) L.R(o, x + 6, y + 17, 248, 1.5, 0.6); });
    L.lines(o, W, 1020, ['Si fuera importante,', 'ya lo habrías hecho.']);
  },
  botones: (o, W, H) => {
    L.B(o, 170, 420, 340, 110, 0.5); L.lab(o, 'QUEJARME', 340, 475, 'center', 0.5);
    L.R(o, 570, 420, 340, 110, 1); L.txt(o, 'DECIDIR', 740, 475, 20, 0, 'center', 400);
    L.R(o, 860, 550, 14, 14); L.R(o, 874, 564, 6, 18);
    L.lab(o, 'mismo costo · mismo tiempo', W / 2, 600, 'center', 0.5);
    L.lines(o, W, 900, ['Quejarte también', 'es una decisión.']);
  },
  celular: (o, W, H) => {
    const x = W / 2 - 170, y = 200, w = 340, h = 640; L.B(o, x, y, w, h); L.R(o, x + w / 2 - 30, y + 18, 60, 1.5);
    for (let k = 0; k < 24; k++) { const yy = y + 50 + k * 23; (k >= 9 && k < 14 || k >= 19 && k < 21 ? L.R : L.B)(o, x + 30, yy, w - 60, 14, 0.85, 1); L.lab(o, String(k).padStart(2, '0'), x - 20, yy + 7, 'right', 0.3); }
    L.lab(o, '7 h de 24', x + w + 20, y + h / 2, 'left', 0.7);
    L.lines(o, W, 1020, ['No te falta tiempo.', 'Te sobra celular.']);
  },
  borradores: (o, W, H) => {
    const cols = 5, rows = 8, w = 140, h = 60, gx = 30, gy = 40, x0 = (W - (cols * w + (cols - 1) * gx)) / 2, y0 = 220;
    for (let k = 0; k < cols * rows; k++) { const i = k % cols, j = Math.floor(k / cols), x = x0 + i * (w + gx), y = y0 + j * (h + gy), pub = k === 38; (pub ? L.R : L.B)(o, x, y, w, h, pub ? 1 : 0.45, 1); L.lab(o, pub ? 'publicado' : 'borrador_' + String(k + 1).padStart(2, '0'), x, y + h + 14, 'left', pub ? 1 : 0.35); }
    L.lines(o, W, 1120, ['Si no lo publicas,', 'no existe.']);
  },
  fila: (o, W, H) => {
    const x = 170, y = 380, w = 740; L.B(o, x, y, w, 260);
    L.lab(o, 'Esperando a que alguien lo haga por ti', x + 30, y + 50);
    L.B(o, x + 30, y + 100, w - 60, 28, 0.8); L.R(o, x + 36, y + 106, 3, 16);
    L.lab(o, '0%', x + w - 30, y + 160, 'right', 0.6); L.lab(o, 'posición en la fila: 1 de 1', x + 30, y + 160, 'left', 0.6);
    L.lab(o, 'tiempo estimado: nunca', x + 30, y + 210, 'left', 0.6);
    L.lines(o, W, 900, ['Nadie va a', 'hacerlo por ti.']);
  },
};
module.exports.SFG = SFG;

// ── Ecuaciones nuevas (14 oct) ──
const EQ2 = module.exports.EQ;
EQ2.manana = (o, W, H) => {
  L.txt(o, 'La cuenta del “mañana”.', W / 2, H / 2 - 220, 36);
  const s = 150, gap = 46, y = H / 2 - 40, x0 = (W - (4 * s + 3 * gap)) / 2;
  for (let i = 0; i < 4; i++) { const x = x0 + i * (s + gap); L.B(o, x, y, s, s, i < 3 ? 1 : 0.5); if (i < 3) L.lab(o, 'mañana', x + s / 2, y + s / 2, 'center', 0.9); if (i < 3) L.txt(o, i < 2 ? '+' : '=', x + s + gap / 2, y + s / 2, 36, 0.7); }
  L.lab(o, 'nunca', x0 + 3 * (s + gap) + s / 2, y + s + 40, 'center', 1);
};
EQ2.cinco = (o, W, H) => {
  L.txt(o, '5 minutos al día', W / 2, H / 2 - 250, 36); L.txt(o, '= 30 horas al año.', W / 2, H / 2 - 196, 36);
  const y = H / 2 + 40; L.R(o, 240, y - 6, 12, 12); L.lab(o, '5 min', 246, y + 50, 'center');
  L.R(o, 290, y - 0.75, 260, 1.5, 0.6); L.R(o, 550, y - 6, 1.5, 12, 0.6); L.lab(o, '× 365', 420, y - 30, 'center');
  const n = 19, c = 7, gp = 3; for (let k = 0; k < 365; k++) { const i = k % n, j = Math.floor(k / n); L.R(o, 610 + i * (c + gp), y - 95 + j * (c + gp), c, c, 0.95); }
  L.lab(o, '30 horas', 610 + 95, y + 125, 'center');
};
EQ2.haces = (o, W, H) => {
  const y = H / 2 - 30; L.txt(o, 'lo que haces', W / 2 - 120, y - 46, 36); L.R(o, W / 2 - 300, y - 0.75, 360, 1.5); L.txt(o, 'lo que dices', W / 2 - 120, y + 46, 36, 0.45);
  L.txt(o, '= quién eres.', W / 2 + 230, y, 36, 1);
};

// ── semana 3: ecuaciones minimalistas + trucos nuevos + texturas de fondo ──
{
  const M = module.exports;
  M.EQ.pantalla2 = (o, W, H) => {
    const c = 26, gp = 8, x0 = (W - (24 * c + 23 * gp)) / 2, y = H / 2 - 60;
    for (let i = 0; i < 24; i++) (i >= 18 && i < 22 ? M.R : M.B)(o, x0 + i * (c + gp), y, c, c, 1, 1.2);
    M.lab(o, '4 de 24 horas', x0, y - 30, 'left', 0.6);
    M.txt(o, '= 60 días al año.', W / 2, y + 140, 36, 1);
  };
  M.EQ.racha2 = (o, W, H) => {
    const c = 22, gp = 8, x0 = (W - (30 * c + 29 * gp)) / 2, y = H / 2 - 60, bad = [6, 13, 22];
    for (let k = 0; k < 30; k++) (bad.includes(k) ? M.B : M.R)(o, x0 + k * (c + gp), y, c, c, 1, 1.2);
    M.lab(o, '3 de 30', x0, y - 30, 'left', 0.6);
    M.txt(o, 'Un mal día no es un mal mes.', W / 2, y + 140, 36, 1);
  };
  M.TS.dedo = (o, W, H) => {
    M.txt(o, 'Tapa el “No” con tu dedo.', W / 2, 330, 36, 1);
    const a = M.wid(o, 'No'), b = M.wid(o, ' puedo.'), x0 = W / 2 - (a + 60 + b) / 2, y = H / 2 + 20;
    M.B(o, x0 - 20, y - 60, a + 40, 120, 0.6);
    M.txt(o, 'No', x0, y, 36, 1, 'left'); M.txt(o, 'puedo.', x0 + a + 60, y, 36, 1, 'left');
    M.lab(o, 'tu dedo aquí', x0 + a / 2, y + 100, 'center', 0.5);
  };
  M.TS.sopa = (o, W, H) => {
    M.txt(o, '6 excusas y 1 acción.', W / 2, 250, 36, 1); M.lab(o, '¿cuál es la acción?', W / 2, 300, 'center', 0.6);
    const N = 13, cs = 56, x0 = (W - (N - 1) * cs) / 2, y0 = 400, G = Array.from({ length: N }, () => Array(N).fill(null));
    const put = (w, r, c, v) => [...w].forEach((ch, i) => { if (v) G[r + i][c] = ch; else G[r][c + i] = ch; });
    put('MANANA', 1, 1); put('DESPUES', 3, 4); put('LUNES', 5, 0); put('NOTENGOTIEMPO', 7, 0); put('ALGUNDIA', 9, 3); put('CANSADO', 11, 5); put('HAZLO', 0, 11, true);
    let r = 21; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647, AL = 'BCFGHJKLMPQRSTVXYZ';
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) M.txt(o, G[j][i] || AL[Math.floor(rnd() * AL.length)], x0 + i * cs, y0 + j * cs, 30, 0.75);
  };
  // texturas para fondo de inicio (1290×2796)
  M.HOME = {
    texto: phrase => (o, W, H) => { const P = phrase.toUpperCase(), size = 30, lh = 52; o.font = `300 ${size}px ${M.F}`; const rows = Math.floor(H / lh); for (let i = 0; i < rows; i++) { let s = ''; while (M.wid(o, s + P + ' ', size) < W + 400) s += P + ' '; M.txt(o, s, -((i * 97) % 300), 30 + i * lh, size, 0.16, 'left'); } },
    puntos: () => (o, W, H) => { const cols = 15, c = 26, gp = 30, x0 = (W - (cols * c + (cols - 1) * gp)) / 2, y0 = 820; for (let k = 0; k < 365; k++) { const i = k % cols, j = Math.floor(k / cols); (k === 292 ? M.R : M.B)(o, x0 + i * (c + gp), y0 + j * (c + gp), c, c, k === 292 ? 1 : 0.3, 1.2); } },
    barra: () => (o, W, H) => { const w = W - 300, x = 150, y = H * 0.55; M.B(o, x, y, w, 40, 0.5); M.R(o, x + 6, y + 6, (w - 12) * 0.9, 28, 0.9); M.lab(o, '90%', x + w, y + 80, 'right', 0.5); },
  };
}
{
  const M = module.exports;
  M.SFG.ocupado = (o, W, H) => { const w = 300, h = 70, x = W / 2 - w / 2, y = H / 2 - 160; M.R(o, x, y, w, h, 1); M.txt(o, 'OCUPADO', W / 2, y + h / 2, 20, 0, 'center', 400); M.lines(o, W, H / 2 + 60, ['Estar ocupado es', 'la excusa más elegante.']); };

  M.SFG.lunes = (o, W, H) => { const s = 120, g = 26, cols = 4, x0 = W / 2 - (cols * s + (cols - 1) * g) / 2, y0 = H / 2 - 375;
    for (let i = 0; i < 12; i++) { const x = x0 + (i % cols) * (s + g), y = y0 + Math.floor(i / cols) * (s + g);
      M.B(o, x, y, s, s, i === 11 ? 1 : .35); M.txt(o, 'LUN', x + s / 2, y + s / 2, 22, i === 11 ? 1 : .35, 'center', 400);
      if (i < 11) M.R(o, x + 18, y + s / 2 - .75, s - 36, 1.5, .8); }
    M.lines(o, W, H / 2 + 185, ['“Empiezo el lunes.”', 'Lo dijiste hace 11 lunes.']); };
  M.SFG.calendario = (o, W, H) => { const cw = 100, ch = 54, x0 = W / 2 - 7 * cw / 2, y0 = H / 2 - 395;
    'LMMJVSD'.split('').forEach((d, i) => M.lab(o, d, x0 + i * cw + cw / 2, y0 - 26, 'center', .5));
    for (let r = 0; r < 8; r++) for (let c = 0; c < 7; c++) M.B(o, x0 + c * cw, y0 + r * ch, cw, ch, .25, 1);
    M.lines(o, W, H / 2 + 185, ['Si no está en tu calendario,', 'no te importa.']); };
  M.SFG.nadie = (o, W, H) => { const s = 360, x = W / 2 - s / 2, y = H / 2 - 330; M.B(o, x, y, s, s, 0.5); M.R(o, x + s / 2 - 6, y + s / 2 - 6, 12, 12, 1); M.lines(o, W, H / 2 + 160, ['Lo que haces cuando nadie mira,', 'eso eres.']); };
}
