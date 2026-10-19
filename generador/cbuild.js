const { render, thumb, setOut } = require('./gen.js');
const L = require('./clib.js');
const DATA = require('./cdata2.js');
const { Canvas, loadImage } = require('skia-canvas');
const fs = require('fs');
const OUT = '/home/claude/campana/c'; setOut(OUT);
const DOW = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const TH = { N: 'Negro', W: 'Blanco', M: 'Mesh' };
const FMT = { tachado: 'Imagen 4:5', cien: 'Imagen 4:5', ecuacion: 'Imagen 4:5', truco: 'Reel 9:16', fondo: 'Imagen 4:5 + 2 fondos', semana: 'Carrusel 4:5 · 5 slides', sinfiltro: 'Imagen 4:5' };
const only = process.argv[2];

(async () => {
  const cnt = {}, plan = [];
  for (const day of DATA) {
    const n = cnt[day.s] = (cnt[day.s] || 0) + 1, dt = new Date(day.d + 'T12:00:00');
    const P = { date: day.d, dow: DOW[dt.getDay()], time: day.h, serie: day.s, n, extra: day.extra || null, opts: {} };
    const go = !only || day.d.endsWith(only);
    for (const K of ['A', 'B']) {
      const o = day[K], id = 'c' + day.d.slice(5).replace('-', '') + '-' + K.toLowerCase();
      let files = [], wall = null, video = null, poster = null, title = '', fmt = FMT[day.s];
      let idx = o.idx ?? (n * 3 + (K === 'B' ? 1 : 0));
      const R = async (th, fn, f) => go ? render(1080, 1350, th, idx, fn, f) : f;
      if (o.k) { title = `${o.k[0]} → ${o.k[1]}`; files = [await R(o.th, L.T.tachado(day.s === 'tachado' ? n : 'EXTRA', o.k[0], o.k[1]), id + '.jpg')]; }
      if (o.c) { if (o.c[0].length !== o.c[1].length) throw new Error('largo distinto ' + day.d + K + ' ' + o.c[0].length + '/' + o.c[1].length); title = o.c[0].replace(/\.$/, '') + ' ×100'; files = [await R(o.th, (o.v2 ? L.T.cien2 : L.T.cien)(n, o.c[0], o.c[1], o.row ?? 5), id + '.jpg')]; }
      if (o.e) { title = { uno: '1% al día', motivacion: 'Motivación vs. hábito', matriz: 'Urgente vs. importante', si: 'Decir sí a todo', pantalla: '4 h de pantalla = 60 días', racha: 'Un mal día ≠ mala racha', libros: '10 páginas = 12 libros', avance: 'Más tareas ≠ más avance', manana: 'mañana + mañana + mañana = nunca', pantalla2: '4 h de pantalla = 60 días al año', racha2: 'Un mal día no es un mal mes', cinco: '5 minutos al día = 30 horas al año', haces: 'Lo que haces ÷ lo que dices = quién eres' }[o.e];
        files = [await R(o.th, (c, W, H) => { L.chrome(c, W, H, 'ecuacion', n); L.EQ[o.e](c, W, H); }, id + '.jpg')]; }
      if (o.ts) { title = { zoom: 'Haz zoom', letras: 'Letras escondidas', distinto: 'El cuadrado distinto', check: 'Doble toque si ya está', dedo: 'Tapa el “No” con tu dedo', sopa: '6 excusas y 1 acción' }[o.ts]; fmt = 'Imagen 4:5';
        files = [await R(o.th, (c, W, H) => { L.chrome(c, W, H, 'truco', n); L.TS[o.ts](c, W, H); }, id + '.jpg')]; }
      if (o.r) { title = { captura: 'Haz captura ahora', punto: 'Mira el punto', cuadrados: 'Cuenta los cuadrados', barra: '¿Llegas a 7 segundos?' }[o.r]; video = id + '-reel.mp4'; poster = id + '-reel-poster.jpg'; }
      if (o.sf) { title = o.t; files = [await R(o.th, (c, W, H) => { L.chrome(c, W, H, 'sinfiltro', n); L.SFG[o.sf](c, W, H); }, id + '.jpg')]; }
      if (o.sl) { title = o.sl[0].join(' '); for (let i = 0; i < o.sl.length; i++) files.push(await R(o.th, L.T.slide(n, i + 1, o.sl.length, o.sl[i]), `${id}-${String(i + 1).padStart(2, '0')}.jpg`)); }
      if (o.f) {
        title = o.f.join(' '); const lock = id + '-bloqueo.jpg', home = id + '-inicio.jpg', post = id + '.jpg';
        if (go) {
          await render(1290, 2796, o.lockTh || o.th, o.lockIdx ?? idx, L.T.lock(o.f), lock);
          if (o.home && o.home.k !== 'mesh') await render(1290, 2796, o.home.th, 0, L.HOME[o.home.k](o.home.p), home);
          else await render(1290, 2796, 'M', o.home ? o.home.idx : (o.th === 'N' ? 2 * n + 1 : 2 * n), () => {}, home);
          const PW = 380, PH = Math.round(380 * 2796 / 1290);
          await render(1080, 1350, o.th === 'N' ? 'W' : 'N', 0, L.T.fondoPost(n, PW, PH), post);
          const c = new Canvas(1080, 1350), x = c.getContext('2d'); x.drawImage(await loadImage(OUT + '/' + post), 0, 0);
          const y0 = Math.round((1350 - PH) / 2 - 20); x.imageSmoothingQuality = 'high';
          x.drawImage(await loadImage(OUT + '/' + lock), 540 - PW - 30, y0, PW, PH); x.drawImage(await loadImage(OUT + '/' + home), 540 + 30, y0, PW, PH);
          await c.toFile(OUT + '/' + post, { quality: 0.92 }); thumb(post);
        }
        if (o.single && go) { await render(1080, 1350, o.th, idx, (c, W, H) => { L.chrome(c, W, H, 'fondo', n); L.lines(c, W, H / 2, [o.f[0], { t: o.f[1] || '', big: true }].filter(x => typeof x === 'string' ? x : x.t)); }, post); }
        if (o.single) fmt = 'Imagen 4:5 (frase) + 2 fondos en historias';
        files = [post]; wall = { lock, home };
      }
      if (o.k && day.s !== 'tachado') fmt = 'Imagen 4:5 · Tachado extra';
      if (o.reel) { video = o.reel; poster = o.reel.replace('.mp4', '-poster.jpg'); fmt = 'Reel 6 s + imagen 4:5' + (day.s !== 'tachado' ? ' · Tachado extra' : ''); }
      P.opts[K] = { rec: !!o.rec, alt: o.k && day.s !== 'tachado' ? 'tachado' : null, title, fmt, theme: o.th ? TH[o.th] : 'Negro', files, wall, video, poster, cap: o.cap, st: o.st, pr: o.pr, nota: o.nota || null };
    }
    plan.push(P); process.stdout.write(day.d.slice(5) + ' ');
  }
  if (!only) fs.writeFileSync('/home/claude/campana/plan.json', JSON.stringify(plan));
  console.log('ok');
})().catch(e => { console.error(e); process.exit(1); });
