// Shorts únicos 9–29 nov, animados por elemento, con sonido
const A = require('./anim_lib.js'); const { T, R, B, lab, type, pr, eo, ez, W, H, CX } = A;
const CY = H / 2 - 120;
const fw = (o, s, sz) => { o.font = `300 ${sz}px "Geist Mono"`; return o.measureText(s).width; };
const strike = (o, s, x, y, sz, k) => { const w = fw(o, s, sz); R(o, x - w / 2 - 10, y, (w + 20) * eo(k), 4, .9); };
const end2 = (o, t, t0, a, b, y = CY + 330) => { type(o, a, CX, y, 36, t0, t); if (b) type(o, b, CX, y + 56, 36, t0 + a.length * .045 + .3, t); };
const S = {
  // ── LUN 9 · tachado
  'c1109-s': { dur: 10, bg: 'N', serie: 'tachado · nº 06', draw(o, t) {
    const ns = ['mensaje', 'llamada', 'reunión', 'correo', 'urgente', 'grupo'];
    ns.forEach((s, i) => { const a = eo(pr(t, .6 + i * .3, .9 + i * .3)) * (1 - pr(t, 3.8, 4.3)); if (a <= 0) return; const y = CY - 120 + i * 62; B(o, CX - 220, y - 22, 440, 44, .35 * a, 1.5); T(o, s, CX - 196, y, 24, .7 * a, 'left', 400); });
    if (t < 4.6) { type(o, 'Ocupado', CX, CY - 260, 56, .1, t, 'center', 1 - .6 * pr(t, 3.4, 3.8)); strike(o, 'Ocupado', CX, CY - 260, 56, pr(t, 3.4, 3.8)); }
    if (t >= 4.6) { type(o, 'Enfocado.', CX, CY - 40, 56, 4.6, t); const f = ez(pr(t, 5.6, 6.6)); B(o, CX - 50, CY + 60, 100, 100, 1, 2); R(o, CX - 50, CY + 60 + 100 * (1 - f), 100, 100 * f, .95); }
    if (t > 7) end2(o, t, 7, 'Ocupado llena el día.', 'Enfocado lo cambia.'); },
    init() { this.ticks = [.6, .9, 1.2, 1.5, 1.8, 2.1, 3.5]; this.pops = [6.6]; } },
  // ── MAR 10 · 100 veces
  'c1110-s': { dur: 10, bg: 'W', serie: '100 veces · nº 06', draw(o, t) {
    const k = ez(pr(t, .5, 6)), mins = Math.round(23 * 60 + k * 180), hh = Math.floor(mins / 60) % 24, mm = mins % 60, cap = 1 + Math.floor(k * 13);
    T(o, String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0'), CX, CY - 160, 120, 1, 'center', 200);
    lab(o, 'capítulo ' + cap, CX, CY - 40, 'center', .6); const bw = 600; B(o, CX - bw / 2, CY + 20, bw, 14, .3, 1.5); R(o, CX - bw / 2, CY + 20, bw * k, 14, .9);
    if (t > .3 && t < 6.2) type(o, '“Solo un capítulo más.”', CX, CY + 140, 34, .3, t, 'center', .7);
    if (t > 6.6) end2(o, t, 6.6, 'Ningún capítulo dura una noche.', 'Todos juntos, sí.', CY + 160); },
    init() { for (let i = 1; i <= 13; i++) { const tt = .5 + 5.5 * (Math.acos(1 - 2 * i / 13.0001) / Math.PI); this.ticks.push(Math.min(6, tt)); } this.pops = [6.1]; } },
  // ── MIÉ 11 · ecuación
  'c1111-s': { dur: 10, bg: 'N', serie: 'ecuación · nº 06', draw(o, t) {
    const s = 80, g = 18, x0 = CX - (7 * s + 6 * g) / 2, y = CY - 200;
    for (let i = 0; i < 7; i++) { const a = eo(pr(t, .5 + i * .45, .75 + i * .45)); if (a <= 0) continue; R(o, x0 + i * (s + g), y + (1 - a) * 30, s, s, .9 * a); lab(o, 'sí', x0 + i * (s + g) + s / 2, y + s + 30, 'center', .5 * a); }
    const big = 260 * (1 - .92 * ez(pr(t, .5, 3.7))); B(o, CX - big / 2, CY + 80 - big / 2 + 60, big, big, 1, 2); lab(o, 'lo tuyo', CX, CY + 80 + 60 + 170, 'center', .55);
    if (t > 4.6) end2(o, t, 4.6, 'Cada sí a otros', 'es un no a lo tuyo.', CY + 420); },
    init() { this.ticks = [0, 1, 2, 3, 4, 5, 6].map(i => .5 + i * .45); this.pops = [3.7]; } },
  // ── JUE 12 · truco
  'c1112-s': { dur: 11, bg: 'W', serie: 'truco · nº 06', draw(o, t) {
    const bw = 620, bh = 320, x = CX - bw / 2, y = CY - bh / 2 - 60, show = t > .3 && t < 2.6 || t > 6;
    if (t < 2.6) lab(o, 'lee rápido', CX, y - 50, 'center', .6);
    B(o, x, y, bw, bh, 1, 2);
    if (show) { T(o, 'Deja de', CX, y + bh / 2 - 38, 50, 1); T(o, 'de pensarlo.', CX, y + bh / 2 + 38, 50, 1); }
    if (t > 2.8 && t < 6) { type(o, '¿Qué leíste?', CX, y + bh / 2, 40, 2.9, t); const n = 3 - Math.floor(t - 3.4); if (t > 3.4) T(o, String(Math.max(1, n)), CX, y + bh + 90, 44, .6); }
    if (t > 6) { const k = eo(pr(t, 6.2, 6.6)), w1 = fw(o, 'Deja de', 50), w = fw(o, 'de', 50); B(o, CX + w1 / 2 - w - 8, y + bh / 2 - 38 - 34, (w + 16) * k, 68, 1, 3); B(o, CX - fw(o, 'de pensarlo.', 50) / 2 - 8, y + bh / 2 + 38 - 34, (w + 16) * k, 68, 1, 3);
      end2(o, t, 7, 'Dos “de”. Casi nadie los ve.', 'Lees lo que esperas leer.', y + bh + 140); } },
    init() { this.ticks = [3.4, 4.4, 5.4]; this.pops = [.3, 6.2]; } },
  // ── VIE 13 · fondo
  'c1113-s': { dur: 10, bg: 'N', serie: 'fondo · nº 06', draw(o, t) {
    const pw = 380, ph = 760, px = CX - pw / 2, py = CY - ph / 2, sl = ez(pr(t, 3.6, 4.3));
    B(o, px, py, pw, ph, eo(pr(t, 0, .5)), 3); o.save(); o.beginPath(); o.rect(px + 3, py + 3, pw - 6, ph - 6); o.clip();
    const ox = -sl * pw; if (t > .8) { type(o, 'Primero', CX + ox, py + ph / 2 - 26, 34, .8, t); type(o, 'lo difícil.', CX + ox, py + ph / 2 + 26, 34, 1.3, t); }
    for (let i = 0; i < 16; i++) { const a = eo(pr(t, 4.3 + i * .06, 4.6 + i * .06)); const c = i % 4, r = Math.floor(i / 4); B(o, px + pw + ox + 50 + c * 72, py + 140 + r * 92, 50, 50, .6 * a, 1.5); }
    o.restore();
    if (t > 6.2) { const a = eo(pr(t, 6.2, 6.6)); lab(o, '2 fondos nuevos', CX, py + ph + 70, 'center', .8 * a); lab(o, 'captúralos en historias', CX, py + ph + 110, 'center', .5 * a); } },
    init() { this.ticks = [4.3, 4.6, 4.9, 5.2]; this.pops = [3.6]; } },
  // ── SÁB 14 · semana
  'c1114-s': { dur: 11, bg: 'W', serie: 'semana · nº 06', draw(o, t) {
    type(o, 'Dejé de hacer esto:', CX, CY - 300, 38, .1, t);
    const it = ['Contestar en el momento.', 'Tener el celular en la mesa.', 'Decir “dale” sin pensarlo.'];
    it.forEach((s, i) => { const t0 = 1.4 + i * 1.6, y = CY - 120 + i * 110; if (t < t0) return; const a = 1 - .55 * pr(t, t0 + .9, t0 + 1.2); type(o, s, CX, y, 34, t0, t, 'center', a); strike(o, s, CX, y, 34, pr(t, t0 + .9, t0 + 1.2)); });
    if (t > 7) end2(o, t, 7, 'El tiempo no apareció.', 'Dejó de irse.', CY + 320); },
    init() { this.pops = [2.3, 3.9, 5.5]; this.ticks = [1.4, 3, 4.6]; } },
  // ── DOM 15 · sin filtro
  'c1115-s': { dur: 10, bg: 'N', serie: 'sin filtro · nº 05', draw(o, t) {
    const pw = 320, ph = 620, px = CX - pw / 2, py = CY - ph / 2 - 40; B(o, px, py, pw, ph, eo(pr(t, 0, .4)), 3); R(o, CX - 30, py + 22, 60, 6, .5);
    const m = Math.round(252 * ez(pr(t, .6, 5.2))); T(o, Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0'), CX, CY - 60, 110, 1, 'center', 200); lab(o, 'horas hoy', CX, CY + 30, 'center', .6);
    if (t > 5.8) end2(o, t, 5.8, 'No es que no tengas tiempo.', 'Lo tiene tu celular.', py + ph + 110); },
    init() { for (let i = 0; i < 30; i++) this.ticks.push(.6 + 4.6 * Math.pow(i / 30, .7)); this.pops = [5.2]; } },
  // ── LUN 16 · tachado
  'c1116-s': { dur: 10, bg: 'W', serie: 'tachado · nº 07', draw(o, t) {
    const bw = 600, x0 = CX - bw / 2;
    if (t < 4.6) { type(o, 'Motivación', CX, CY - 260, 56, .1, t, 'center', 1 - .6 * pr(t, 3.6, 4)); strike(o, 'Motivación', CX, CY - 260, 56, pr(t, 3.6, 4));
      const v = .5 + .45 * Math.sin(t * 3.2) * Math.cos(t * 1.3); B(o, x0, CY - 60, bw, 50, .35, 1.5); R(o, x0, CY - 60, bw * Math.max(.04, v), 50, .9); lab(o, 'sube y baja', CX, CY + 30, 'center', .5); }
    else { type(o, 'Rutina.', CX, CY - 260, 56, 4.6, t); const n = Math.floor(30 * pr(t, 5.2, 7.6)), s = 16, g = (bw - 30 * s) / 29; for (let i = 0; i < 30; i++) i < n ? R(o, x0 + i * (s + g), CY - 40, s, s, .9) : B(o, x0 + i * (s + g), CY - 40, s, s, .3, 1);
      lab(o, 'se queda', CX, CY + 30, 'center', .5); }
    if (t > 8) end2(o, t, 8, 'La rutina se queda.', null, CY + 200); },
    init() { this.ticks = [3.7]; for (let i = 0; i < 30; i += 3) this.ticks.push(5.2 + 2.4 * i / 30); this.pops = [7.6]; } },
  // ── MAR 17 · 100 veces
  'c1117-s': { dur: 10, bg: 'N', serie: '100 veces · nº 07', draw(o, t) {
    const s = 130, g = 24, cols = 4, x0 = CX - (cols * s + (cols - 1) * g) / 2, y0 = CY - 300;
    for (let i = 0; i < 12; i++) { const t0 = .4 + i * .4, a = eo(pr(t, t0, t0 + .2)); if (a <= 0) continue; const x = x0 + (i % cols) * (s + g), y = y0 + Math.floor(i / cols) * (s + g), last = i === 11;
      if (last && t > t0 + .3) R(o, x, y, s, s, .95); else B(o, x, y, s, s, .45 * a, 1.5); T(o, 'LUN', x + s / 2, y + s / 2, 24, last && t > t0 + .3 ? 0 : .5 * a, 'center', 400);
      if (!last) R(o, x - 6, y + s / 2, (s + 12) * eo(pr(t, t0 + .2, t0 + .35)), 3, .8); }
    if (t > 5.6) end2(o, t, 5.6, '“El lunes empiezo.”', 'Hoy es lunes.', CY + 300); },
    init() { for (let i = 0; i < 12; i++) this.ticks.push(.6 + i * .4); this.pops = [4.9]; } },
  // ── MIÉ 18 · ecuación
  'c1118-s': { dur: 10, bg: 'W', serie: 'ecuación · nº 07', draw(o, t) {
    const tw = 150, th = 54, ov = 26, n = 20, x0 = CX - ((n - 1) * ov + tw) / 2, cl = ez(pr(t, 4.2, 5.2));
    T(o, String(Math.min(20, Math.floor(pr(t, .4, 3.6) * 20 + (t > .4 ? 1 : 0)))), CX, CY - 300, 90, 1 - cl, 'center', 200); lab(o, 'pestañas abiertas', CX, CY - 220, 'center', .55 * (1 - cl));
    for (let i = 0; i < n; i++) { const t0 = .4 + i * .16, a = eo(pr(t, t0, t0 + .15)); if (a <= 0) continue; const tx = x0 + i * ov, ty = CY - 60 + ((i % 5) - 2) * 26, X = tx + (CX - tw / 2 - tx) * cl, Y = ty + (CY - 60 - ty) * cl;
      if (i === n - 1 && t > 5.4) { R(o, CX - tw / 2, CY - 60, tw * ez(pr(t, 5.4, 6.4)), th, .95); B(o, CX - tw / 2, CY - 60, tw, th, 1, 2); } else if (cl < 1 || i === n - 1) B(o, X, Y, tw, th, (.3 + .03 * i) * a * (i === n - 1 ? 1 : 1 - cl), 1.5); }
    if (t > 6.8) end2(o, t, 6.8, 'Cierra 19.', 'Termina 1.', CY + 160); },
    init() { for (let i = 0; i < 20; i++) this.ticks.push(.4 + i * .16); this.pops = [5.2, 6.4]; } },
  // ── JUE 19 · truco
  'c1119-s': { dur: 10, bg: 'W', serie: 'truco · nº 07', draw(o, t) {
    const n = 6, s = 104, g = 22, tot = n * s + (n - 1) * g, x0 = CX - tot / 2, y0 = CY - tot / 2 - 40;
    for (let i = 0; i < n * n; i++) { const a = eo(pr(t, .2 + i * .03, .5 + i * .03)); R(o, x0 + (i % n) * (s + g), y0 + Math.floor(i / n) * (s + g), s, s, a); }
    if (t > 1.6 && t < 5.6) { type(o, '¿Cuántos puntos grises ves?', CX, y0 - 90, 34, 1.6, t); if (t > 3.2) T(o, String(Math.max(1, 3 - Math.floor(t - 3.2))), CX, y0 + tot + 90, 44, .6); }
    if (t > 6) end2(o, t, 6, 'Cero. Ninguno existe.', 'Tu cabeza los pone.', y0 + tot + 110); },
    init() { this.ticks = [3.2, 4.2, 5.2]; this.pops = [6]; } },
  // ── VIE 20 · fondo
  'c1120-s': { dur: 10, bg: 'W', serie: 'fondo · nº 07', draw(o, t) {
    const pw = 380, ph = 760, px = CX - pw / 2, py = CY - ph / 2; B(o, px, py, pw, ph, eo(pr(t, 0, .5)), 3);
    const seq = 'Perfec', y = py + ph / 2; let s = '';
    if (t < 1.8) s = seq.slice(0, Math.floor(pr(t, .5, 1.8) * seq.length)); else if (t < 2.6) s = seq.slice(0, Math.ceil((1 - pr(t, 1.8, 2.6)) * seq.length));
    if (t < 2.7) { const w = fw(o, s, 34); T(o, s, CX - w / 2, y, 34, 1, 'left'); if (Math.floor(t * 8) % 2 === 0) R(o, CX + w / 2 + 4, y - 17, 3, 34); }
    else { type(o, 'Hecho es mejor', CX, y - 26, 34, 2.8, t); type(o, 'que perfecto.', CX, y + 26, 34, 3.6, t); }
    if (t > 5.8) { const a = eo(pr(t, 5.8, 6.2)); lab(o, '2 fondos nuevos', CX, py + ph + 70, 'center', .8 * a); lab(o, 'captúralos en historias', CX, py + ph + 110, 'center', .5 * a); } },
    init() { for (let i = 0; i < 6; i++) this.ticks.push(.5 + i * .21); for (let i = 0; i < 6; i++) this.ticks.push(1.8 + i * .13); this.pops = [4.4]; } },
  // ── SÁB 21 · semana
  'c1121-s': { dur: 11, bg: 'N', serie: 'semana · nº 07', draw(o, t) {
    type(o, 'Cómo digo que no:', CX, CY - 340, 38, .1, t);
    const it = ['Ahora no puedo. ¿Te sirve el jueves?', 'Si hago esto, ¿qué dejo?', 'Esta semana no es mi prioridad.'];
    it.forEach((s, i) => { const t0 = 1.2 + i * 1.7, a = eo(pr(t, t0, t0 + .3)); if (a <= 0) return; const w = fw(o, s, 30) + 60, y = CY - 180 + i * 150, x = i % 2 ? CX + 380 - w : CX - 380;
      B(o, x, y + (1 - a) * 20, w, 80, .7 * a, 2); R(o, i % 2 ? x + w - 50 : x + 30, y + 80 + (1 - a) * 20, 20, 20, .7 * a); T(o, s, x + 30, y + 40 + (1 - a) * 20, 30, a, 'left'); });
    if (t > 7) end2(o, t, 7, 'No es ser malo.', 'Es ser claro.', CY + 360); },
    init() { this.pops = [1.2, 2.9, 4.6]; } },
  // ── DOM 22 · sin filtro
  'c1122-s': { dur: 10, bg: 'W', serie: 'sin filtro · nº 06', draw(o, t) {
    const its = ['aprender inglés', 'ir al gym', 'leer más', 'empezar el proyecto', 'ahorrar'], x0 = CX - 230;
    type(o, 'Mi lista desde enero:', CX, CY - 320, 36, .1, t);
    its.forEach((s, i) => { const t0 = 1 + i * .35, a = eo(pr(t, t0, t0 + .2)) * (1 - .7 * pr(t, 4.6, 5.2)); if (a <= 0) return; const y = CY - 160 + i * 76; B(o, x0, y - 18, 36, 36, .6 * a, 2); T(o, s, x0 + 66, y, 32, .8 * a, 'left'); });
    if (t > 2.8 && t < 4.6) { const k = Math.floor((t - 2.8) / .36) % 5, y = CY - 160 + k * 76; R(o, x0 - 40, y - 2, 20, 4, .8); }
    if (t > 5.4) end2(o, t, 5.4, 'Si nunca lo haces,', 'no es pendiente. Es deseo.', CY + 300); },
    init() { this.ticks = [1, 1.35, 1.7, 2.05, 2.4]; this.pops = [4.6]; } },
  // ── LUN 23 · tachado
  'c1123-s': { dur: 10, bg: 'N', serie: 'tachado · nº 08', draw(o, t) {
    const q = ['otra vez lo mismo', 'nadie hace nada', 'siempre me pasa', 'así no se puede'];
    q.forEach((s, i) => { const t0 = .7 + i * .5, a = eo(pr(t, t0, t0 + .2)) * (1 - pr(t, 3.9, 4.3)); if (a <= 0) return; const w = fw(o, s, 28) + 50, y = CY - 140 + i * 100, x = i % 2 ? CX + 300 - w : CX - 300; B(o, x, y, w, 64, .5 * a, 1.5); T(o, s, x + 25, y + 32, 28, .7 * a, 'left'); });
    if (t < 4.6) { type(o, 'Quejarse', CX, CY - 280, 56, .1, t, 'center', 1 - .6 * pr(t, 3.4, 3.8)); strike(o, 'Quejarse', CX, CY - 280, 56, pr(t, 3.4, 3.8)); }
    else { type(o, 'Cambiar.', CX, CY - 40, 56, 4.6, t); const f = ez(pr(t, 5.6, 6.4)); B(o, CX - 50, CY + 60, 100, 100, 1, 2); R(o, CX - 50, CY + 60, 100 * f, 100, .95); }
    if (t > 7) end2(o, t, 7, 'Quejarse se siente como hacer algo.', 'No lo es.'); },
    init() { this.ticks = [.7, 1.2, 1.7, 2.2, 3.5]; this.pops = [6.4]; } },
  // ── MAR 24 · 100 veces
  'c1124-s': { dur: 10, bg: 'W', serie: '100 veces · nº 08', draw(o, t) {
    const bw = 640, x0 = CX - bw / 2, p = Math.min(.99, ez(pr(t, .4, 3.2)) * .99), st = t > 3.2;
    lab(o, 'después', x0, CY - 130, 'left', .6); T(o, Math.floor(p * 100) + '%', x0 + bw, CY - 130, 26, .7, 'right'); B(o, x0, CY - 100, bw, 46, .35, 1.5); R(o, x0, CY - 100, bw * p, 46, .9);
    if (st && t < 6) { const k = Math.floor(t * 6) % 8; for (let i = 0; i < 8; i++) R(o, CX - 70 + i * 20, CY + 20, 12, 12, i === k ? .9 : .2); type(o, 'casi listo...', CX, CY + 100, 32, 3.4, t, 'center', .6); }
    if (t > 6) end2(o, t, 6, 'Después no existe.', null, CY + 100); },
    init() { for (let i = 0; i < 12; i++) this.ticks.push(.4 + i * .23); this.pops = [6]; } },
  // ── MIÉ 25 · ecuación
  'c1125-s': { dur: 10, bg: 'N', serie: 'ecuación · nº 08', draw(o, t) {
    const k = ez(pr(t, .4, 3.6)), bw = 200 + 460 * k, bh = 110 + 230 * k, x = CX - bw / 2, y = CY - 180 - bh / 2;
    B(o, x, y, bw, bh, .85, 2); R(o, x + 40, y + bh, 36, 36, .85); const nl = Math.floor(1 + 5 * k); for (let i = 0; i < nl; i++) R(o, x + 36, y + 34 + i * 42, (bw - 72) * (1 - (i % 3) * .2), 4, .5);
    lab(o, 'contarlo', CX, y - 36, 'center', .55);
    const s = 100, yy = CY + 160; B(o, CX - s / 2, yy, s, s, .9, 2); lab(o, 'hacerlo', CX, yy + s + 34, 'center', .55); if (t > 4) T(o, '≠', CX, CY + 90, 48, eo(pr(t, 4, 4.3)));
    if (t > 5.2) end2(o, t, 5.2, 'Contarlo se siente como hacerlo.', 'No lo es.', CY + 440); },
    init() { for (let i = 0; i < 6; i++) this.ticks.push(.4 + i * .55); this.pops = [4]; } },
  // ── JUE 26 · truco (respiración cuadrada)
  'c1126-s': { dur: 19, bg: 'N', serie: 'truco · nº 08', draw(o, t) {
    const s = 520, x = CX - s / 2, y = CY - s / 2; B(o, x, y, s, s, .8, 2);
    if (t < 1.5) type(o, 'Respira conmigo.', CX, y - 90, 36, .1, t);
    const L = ['inhala', 'sostén', 'exhala', 'sostén'], ph = Math.floor((t - 1.5) / 4), q = ((t - 1.5) % 4) / 4;
    if (t >= 1.5 && t < 17.5) { const pts = [[x, y + s], [x, y], [x + s, y], [x + s, y + s], [x, y + s]], a = pts[ph], b = pts[ph + 1], px = a[0] + (b[0] - a[0]) * q, py = a[1] + (b[1] - a[1]) * q; R(o, px - 12, py - 12, 24, 24, 1);
      T(o, L[ph], CX, CY - 30, 44, 1); T(o, String(4 - Math.floor(q * 4)), CX, CY + 40, 30, .55); }
    if (t > 17.5) { T(o, 'Una vuelta.', CX, CY - 20, 40, eo(pr(t, 17.5, 17.9))); }
    if (t > 15) end2(o, t, 15, 'Antes de abrir los mensajes.', null, y + s + 110); },
    init() { for (let i = 0; i < 16; i++) this.ticks.push(1.5 + i); this.pops = [1.5, 5.5, 9.5, 13.5, 17.5]; } },
  // ── VIE 27 · fondo
  'c1127-s': { dur: 10, bg: 'W', serie: 'fondo · nº 08', draw(o, t) {
    const pw = 380, ph = 760, px = CX - pw / 2, py = CY - ph / 2; B(o, px, py, pw, ph, eo(pr(t, 0, .5)), 3);
    for (let i = 0; i < 9; i++) { const a = eo(pr(t, .3 + i * .12, .5 + i * .12)) * (1 - eo(pr(t, 2.4 + i * .14, 2.6 + i * .14))); if (a <= 0) continue; B(o, px + 24, py + 70 + i * 70, pw - 48, 54, .5 * a, 1.5); R(o, px + 40, py + 95 + i * 70, 120 + (i * 37) % 120, 4, .5 * a); }
    if (t > 4) type(o, 'Menos ruido.', CX, py + ph / 2, 34, 4, t);
    if (t > 6) { const a = eo(pr(t, 6, 6.4)); lab(o, '2 fondos nuevos', CX, py + ph + 70, 'center', .8 * a); lab(o, 'captúralos en historias', CX, py + ph + 110, 'center', .5 * a); } },
    init() { for (let i = 0; i < 9; i++) this.ticks.push(.3 + i * .12); for (let i = 0; i < 9; i++) this.ticks.push(2.4 + i * .14); this.pops = [4]; } },
  // ── SÁB 28 · semana
  'c1128-s': { dur: 12, bg: 'W', serie: 'semana · nº 08', draw(o, t) {
    if (t < 1.6) type(o, 'Noviembre en 3 frases.', CX, CY - 40, 40, .1, t);
    const it = [['01', 'El plan perfecto', 'no se mueve.'], ['02', 'Ocupado', 'no es avanzar.'], ['03', 'Las ganas llegan', 'después.']];
    it.forEach(([n, a, b], i) => { const t0 = 1.8 + i * 2.2; if (t < t0 || t > t0 + 2.2) return; const k = eo(pr(t, t0, t0 + .3)); T(o, n, CX, CY - 200, 120 * (.85 + .15 * k), k, 'center', 200); type(o, a, CX, CY, 40, t0 + .3, t); type(o, b, CX, CY + 60, 40, t0 + .9, t); });
    if (t > 8.6) end2(o, t, 8.6, 'Diciembre empieza el lunes.', 'O hoy.', CY); },
    init() { this.pops = [1.8, 4, 6.2, 8.6]; } },
  // ── DOM 29 · sin filtro
  'c1129-s': { dur: 10, bg: 'N', serie: 'sin filtro · nº 07', draw(o, t) {
    const n = 8, s = 56, g = 26, gw = n * s + (n - 1) * g, x0 = CX - gw / 2, y0 = CY - 320;
    for (let i = 0; i < 40; i++) { const x = x0 + (i % n) * (s + g), y = y0 + Math.floor(i / n) * (s + g), a = eo(pr(t, .2 + i * .03, .5 + i * .03)), me = i === 19;
      if (me) { R(o, x, y, s, s, a); continue; } const away = eo(pr(t, 3 + (i * 7 % 40) * .04, 3.3 + (i * 7 % 40) * .04)); B(o, x, y, s, s, (.6 - .45 * away) * a, 1.5); if (t < 3 + (i * 7 % 40) * .04) R(o, x + s / 2 - 4, y + s / 2 - 4, 8, 8, .6 * a); }
    if (t < 3) type(o, 'Crees que todos te miran.', CX, y0 + 5 * (s + g) + 80, 34, .6, t);
    if (t > 5.6) end2(o, t, 5.6, 'Nadie te está mirando tanto.', 'Hazlo de una vez.', y0 + 5 * (s + g) + 80); },
    init() { for (let i = 0; i < 12; i++) this.ticks.push(3 + i * .14); this.pops = [5.6]; } },
};
(async () => { const only = process.argv.slice(2); for (const [id, sc] of Object.entries(S)) { if (only.length && !only.includes(id)) continue; await A.run(id, sc); } })();
