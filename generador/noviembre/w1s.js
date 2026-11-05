// Shorts únicos de la semana 1 (2–8 nov), animados por elemento
const A = require('./anim_lib.js'); const { T, R, B, lab, type, pr, eo, ez, W, H, CX } = A;
const CY = H / 2 - 120;
const S = {
  'c1102-s': { dur: 10, bg: 'N', serie: 'tachado · nº 05', draw(o, t) {
    const items = ['investigar más', 'ver otro video', 'esperar el lunes', 'hacer una lista', 'pensarlo mejor', 'tenerlo claro'];
    const ws = 56, x = CX, y = CY - 260; const k = pr(t, 3.6, 4.0);
    if (t < 4.6) type(o, 'Planear', x, y, ws, .2, t, 'center', 1 - .6 * k); if (k > 0 && t < 4.6) { o.font = `300 ${ws}px "Geist Mono"`; const w = o.measureText('Planear').width; R(o, x - w / 2 - 10, y, (w + 20) * eo(k), 4, .9); }
    items.forEach((it, i) => { const a = eo(pr(t, .9 + i * .35, 1.2 + i * .35)) * (1 - pr(t, 4.2, 4.6)); if (a <= 0) return; const yy = CY - 120 + i * 70; B(o, CX - 230, yy - 16, 32, 32, a * .6); T(o, it, CX - 175, yy, 30, a * .7, 'left'); });
    if (t >= 4.6) { type(o, 'Empezar.', x, CY, ws, 4.7, t, 'center'); const f = eo(pr(t, 6.2, 6.5)); B(o, CX - 40, CY + 110, 80, 80, 1); R(o, CX - 40, CY + 110, 80, 80 * f, .95); }
    if (t > 7.2) type(o, 'El plan perfecto no se mueve.', CX, CY + 300, 34, 7.2, t); },
    init() { this.ticks = [.9, 1.25, 1.6, 1.95, 2.3, 2.65, 3.7]; this.pops = [6.2]; } },
  'c1103-s': { dur: 10, bg: 'W', serie: '100 veces · nº 05', draw(o, t) {
    const pw = 320, ph = 620, px = CX - pw / 2, py = CY - ph / 2; B(o, px, py, pw, ph, eo(pr(t, 0, .4)), 3); R(o, CX - 30, py + 22, 60, 6, .5 * eo(pr(t, 0, .4)));
    const n = Math.min(96, Math.floor(96 * ez(pr(t, .6, 6.2)))); T(o, String(n), CX, CY - 20, 120, 1, 'center', 200); lab(o, 'desbloqueos hoy', CX, CY + 70, 'center', .6);
    if (n > 0) R(o, px + 30, py + ph - 60, (pw - 60) * n / 96, 6, .9);
    if (t > 6.6) type(o, '¿Y no te alcanza el tiempo?', CX, py + ph + 130, 36, 6.8, t); },
    init() { for (let i = 0; i < 40; i++) { const tt = .6 + 5.6 * Math.pow(i / 40, .6); this.ticks.push(tt); } this.pops = [6.25]; } },
  'c1104-s': { dur: 10, bg: 'N', serie: 'ecuación · nº 05', draw(o, t) {
    const bw = 760, x0 = CX - bw / 2, y1 = CY - 160, y2 = CY + 60;
    lab(o, '1 hora de foco', x0, y1 - 30, 'left', .65); B(o, x0, y1, bw, 50, .3, 1.5); R(o, x0, y1, bw * ez(pr(t, .6, 4.6)), 50, .95);
    lab(o, '4 horas con interrupciones', x0, y2 - 30, 'left', .65); B(o, x0, y2, bw, 50, .3, 1.5);
    const seg = [[.6, 1.1], [1.5, 1.8], [2.3, 2.5], [3, 3.3], [3.8, 4], [4.4, 4.6], [5, 5.3]]; let acc = 0; seg.forEach(([a, b]) => { const p = pr(t, a, b); R(o, x0 + acc, y2, bw * .06 * p, 50, .55); acc += bw * .06 * p + (t > b ? 10 : 0); });
    if (t > 5.8) { T(o, '>', CX, CY - 50, 60, eo(pr(t, 5.8, 6.1)), 'center'); type(o, '1 hora entera vale más', CX, CY + 260, 36, 6.4, t); type(o, 'que cuatro a pedazos.', CX, CY + 316, 36, 7.4, t); } },
    init() { this.ticks = [1.1, 1.8, 2.5, 3.3, 4, 4.6, 5.3]; this.pops = [4.6]; } },
  'c1105-s': { dur: 10, bg: 'N', serie: 'truco · nº 05', draw(o, t) {
    type(o, 'Toca la pantalla', CX, CY - 330, 40, .1, t); type(o, 'cuando se llene.', CX, CY - 270, 40, .9, t);
    const s = 360, x = CX - s / 2, y = CY - s / 2 + 40; B(o, x, y, s, s, 1, 3); const f = ez(pr(t, 2.2, 5.2)); R(o, x, y + s * (1 - f), s, s * f, .95);
    if (t > 2.2 && t < 5.2) T(o, String(3 - Math.floor((t - 2.2))), CX, y + s + 90, 44, .7);
    if (t > 5.2 && t < 5.5) { o.fillStyle = 'rgba(255,255,255,.85)'; o.fillRect(0, 0, W, H); }
    if (t > 5.8) { type(o, '¿Llegaste a tiempo?', CX, y + s + 110, 36, 5.8, t); type(o, 'Así se siente terminar algo.', CX, y + s + 166, 36, 7, t); } },
    init() { this.ticks = [2.2, 3.2, 4.2]; this.pops = [5.2]; } },
  'c1106-s': { dur: 10, bg: 'N', serie: 'fondo · nº 05', draw(o, t) {
    const pw = 380, ph = 760, px = CX - pw / 2, py = CY - ph / 2; B(o, px, py, pw, ph, eo(pr(t, 0, .5)), 3);
    const lit = eo(pr(t, 2.4, 2.9)); if (lit > 0) { o.fillStyle = `rgba(255,255,255,${.06 * lit})`; o.fillRect(px + 3, py + 3, pw - 6, ph - 6); }
    T(o, t < 2.4 ? '06:59' : '07:00', CX, py + 150, 64, .9, 'center', 200);
    if (t > 3.1) type(o, 'Hazlo simple.', CX, py + ph / 2 + 40, 36, 3.1, t);
    if (t > 5.6) { const a = eo(pr(t, 5.6, 6)); lab(o, '2 fondos nuevos', CX, py + ph + 70, 'center', .8 * a); lab(o, 'captúralos en historias', CX, py + ph + 110, 'center', .5 * a); } },
    init() { this.ticks = []; this.pops = [2.4]; } },
  'c1107-s': { dur: 11, bg: 'W', serie: 'semana · nº 05', draw(o, t) {
    type(o, 'Sin ganas, hago esto:', CX, CY - 330, 38, .1, t);
    const it = [['3', 'Bajo la meta a 5 minutos.'], ['2', 'Cambio de lugar.'], ['1', 'Lo hago mal, pero lo hago.']];
    it.forEach(([n, s], i) => { const t0 = 1.6 + i * 2.2, on = t >= t0 && t < t0 + 2.2; if (!on && !(i === 2 && t >= t0)) return; if (i === 2 && t > 8.4) return;
      const k = eo(pr(t, t0, t0 + .3)); T(o, n, CX, CY - 60, 200 * (.8 + .2 * k), k, 'center', 200); type(o, s, CX, CY + 140, 38, t0 + .3, t); });
    if (t > 8.4) { type(o, 'Las ganas llegan', CX, CY, 44, 8.5, t); type(o, 'después.', CX, CY + 66, 44, 9.4, t); } },
    init() { this.pops = [1.6, 3.8, 6.0, 8.4]; } },
  'c1108-s': { dur: 10, bg: 'W', serie: 'sin filtro · nº 04', draw(o, t) {
    const bw = 760, x0 = CX - bw / 2, y1 = CY - 200, y2 = CY;
    lab(o, 'tutoriales vistos', x0, y1 - 30, 'left', .65); const v = ez(pr(t, .5, 3)); T(o, Math.round(100 * v) + '%', x0 + bw, y1 - 30, 26, .7, 'right'); B(o, x0, y1, bw, 50, .3, 1.5); R(o, x0, y1, bw * v, 50, .9);
    lab(o, 'aplicados', x0, y2 - 30, 'left', .65); T(o, '0%', x0 + bw, y2 - 30, 26, .7, 'right'); B(o, x0, y2, bw, 50, .3, 1.5); if (t > 3.4 && Math.floor(t * 2.5) % 2 === 0) R(o, x0 + 6, y2 + 8, 4, 34, .9);
    if (t > 4.6) { type(o, 'Ver tutoriales no es aprender.', CX, CY + 220, 36, 4.6, t); type(o, 'Es mirar a otro hacerlo.', CX, CY + 280, 36, 6.2, t); } },
    init() { for (let i = 0; i < 10; i++) this.ticks.push(.5 + i * .25); this.pops = [3.4]; } },
};
(async () => { const only = process.argv[2]; for (const [id, sc] of Object.entries(S)) { if (only && id !== only) continue; await A.run(id, sc); } })();
