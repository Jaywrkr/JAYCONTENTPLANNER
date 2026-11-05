// LinkedIn (imágenes y PDF) + miniaturas ep04–ep06
const { G, L, OUT } = require('./lib.js'); const { execSync } = require('child_process');
const { Canvas, FontLibrary } = require('skia-canvas'); const fs = require('fs');
const liSlide = (sl, i, n) => (o, W, H) => { L.lab(o, '@jaywrkr', 90, 90); if (n > 1) L.lab(o, String(i + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0'), W - 90, 90, 'right'); L.lines(o, W, H / 2, sl); L.txt(o, 'simple.', W - 90, H - 90, 22, .45, 'right'); };
const pdf = (name, slides, th) => (async () => { const ps = []; for (let i = 0; i < slides.length; i++) { const f = `${name}-${String(i + 1).padStart(2, '0')}.jpg`; await G.render(1080, 1350, th, 0, liSlide(slides[i], i, slides.length), f); ps.push(OUT + '/' + f); }
  execSync(`python3 -c "from PIL import Image; ims=[Image.open(p).convert('RGB') for p in ${JSON.stringify(ps).replace(/"/g, "'")}]; ims[0].save('${OUT}/${name}.pdf', save_all=True, append_images=ims[1:], resolution=150)"`); });
(async () => {
  // jue 12 · imagen única
  await G.render(1080, 1350, 'W', 0, (o, W, H) => { liSlide([], 0, 1)(o, W, H); const bw = 300, bh = 40, x0 = W / 2 - (bw * 2 + 120) / 2, y = H / 2 - 160;
    [0, 1].forEach(i => { L.B(o, x0, y + i * 70, bw, bh, .35, 1.5); L.R(o, x0, y + i * 70, bw * .5, bh, .85); }); L.txt(o, '<', x0 + bw + 60, y + 55, 40, .8); L.R(o, x0 + bw + 120, y + 35, bw, bh, .95);
    L.lines(o, W, H / 2 + 80, ['Menos proyectos.', 'Más terminados.']); }, 'li-1112.jpg');
  // jue 19 · carrusel PDF
  await pdf('li-1119', [['4 reglas simples', 'para reuniones más cortas.'], ['01', 'Sin agenda,', 'no hay reunión.'], ['02', '30 minutos por defecto.', 'No 60.'], ['03', 'Si solo es informar,', 'es un mensaje.'], ['04', 'Quien convoca, cierra', 'con los siguientes pasos.'], ['No son mías. Son del equipo.', 'Funcionan cuando las cumplimos.']], 'W')();
  // jue 26 · imagen única
  await G.render(1080, 1350, 'N', 0, (o, W, H) => { liSlide([], 0, 1)(o, W, H); const s = 120, x = W / 2 - s / 2, y = H / 2 - 220; L.B(o, x, y, s, s, .9, 2); L.R(o, x + 22, y + 22, s - 44, s - 44, .9);
    L.lines(o, W, H / 2 + 60, ['Cinco semanas.', 'Una cosa bien terminada.']); }, 'li-1126.jpg');
  console.log('li ok');
  // ── miniaturas YouTube
  const FD = '/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/reel/fonts/'; FontLibrary.use('Geist Mono', fs.readdirSync(FD).map(f => FD + f));
  const W = 1280, H = 720;
  const mk = (name, inv, draw) => { const c = new Canvas(W, H), o = c.getContext('2d'), fg = inv ? '#0a0a0a' : '#fafafa'; o.fillStyle = inv ? '#f4f4f2' : '#060606'; o.fillRect(0, 0, W, H);
    const T = (s, x, y, sz, a = 1, w = 300, al = 'center') => { o.font = `${w} ${sz}px "Geist Mono"`; o.globalAlpha = a; o.fillStyle = fg; o.textAlign = al; o.textBaseline = 'middle'; o.fillText(s, x, y); o.globalAlpha = 1; return o.measureText(s).width; };
    const R = (x, y, w, h, a = 1) => { o.globalAlpha = a; o.fillStyle = fg; o.fillRect(x, y, w, h); o.globalAlpha = 1; }, B = (x, y, w, h, lw = 3, a = 1) => { o.globalAlpha = a; o.strokeStyle = fg; o.lineWidth = lw; o.strokeRect(x, y, w, h); o.globalAlpha = 1; };
    draw({ T, R, B }); R(56, 52, 14, 14); B(76, 53, 12, 12, 2); c.toFileSync(`${OUT}/yt-${name}.jpg`, { quality: .95 }); };
  // ep04 · La pregunta que me hago cada mañana
  mk('ep04-a', 0, ({ T, R, B }) => { T('ocupado', W / 2 - 230, H / 2, 64, .45); R(W / 2 - 370, H / 2 - 2, 280, 5, .9); T('≠', W / 2, H / 2, 64, .8); T('avanzar', W / 2 + 230, H / 2, 64, 1, 400); });
  mk('ep04-b', 0, ({ T, B }) => { B(W / 2 - 300, H / 2 - 120, 600, 240, 3); T('¿cuál cambia algo?', W / 2, H / 2, 46, 1, 400); T('07:00', W / 2, H / 2 - 190, 34, .6); });
  mk('ep04-c', 1, ({ T, R }) => { T('1 pregunta', W / 2, H / 2 - 40, 84, 1, 300); R(W / 2 - 260, H / 2 + 40, 520, 4, .9); T('antes de ver el teléfono', W / 2, H / 2 + 100, 30, .7); });
  // ep05 · Por qué tienes tantas cosas a medias
  mk('ep05-a', 0, ({ T, R, B }) => { const bw = 360, x = 150; for (let i = 0; i < 5; i++) { B(x, 180 + i * 80, bw, 40, 2, .4); R(x, 180 + i * 80, bw * (.2 + .13 * i), 40, .85); } T('a medias', 860, H / 2 - 20, 72, 1, 400); T('todas', 860, H / 2 + 60, 30, .6); });
  mk('ep05-b', 0, ({ T, R, B }) => { B(W / 2 - 330, H / 2 - 40, 280, 80, 3, .4); R(W / 2 - 330, H / 2 - 40, 140, 80, .6); T('<', W / 2, H / 2, 64, .8); R(W / 2 + 50, H / 2 - 40, 280, 80, 1); T('10 a medias', W / 2 - 190, H / 2 + 110, 28, .6); T('1 hecha', W / 2 + 190, H / 2 + 110, 28, .9); });
  mk('ep05-c', 1, ({ T, R }) => { T('empiezas todo.', W / 2, H / 2 - 50, 62, .5); T('terminas nada.', W / 2, H / 2 + 50, 62, 1, 400); });
  // ep06 · Si tú no llenas tu semana, alguien más lo hace
  mk('ep06-a', 0, ({ T, R, B }) => { const s = 120, g = 20, x0 = W / 2 - (5 * s + 4 * g) / 2, y = H / 2 - s / 2 - 30; 'LMMJV'.split('').forEach((d, i) => { R(x0 + i * (s + g), y, s, s, .9); T(d, x0 + i * (s + g) + s / 2, y + s + 40, 26, .6, 400); }); T('nada tuyo', W / 2, y - 70, 40, 1, 400); });
  mk('ep06-b', 0, ({ T, R, B }) => { const s = 120, g = 20, x0 = W / 2 - (5 * s + 4 * g) / 2, y = H / 2 - s / 2; 'LMMJV'.split('').forEach((d, i) => { i === 1 || i === 3 ? R(x0 + i * (s + g), y, s, s, 1) : B(x0 + i * (s + g), y, s, s, 2, .35); }); T('2 bloques', W / 2, y - 80, 40, 1, 400); T('para lo tuyo', W / 2, y + s + 60, 30, .7); });
  mk('ep06-c', 1, ({ T }) => { T('tu semana', W / 2, H / 2 - 50, 62, 1, 400); T('ya tiene dueño.', W / 2, H / 2 + 50, 62, .55); });
  console.log('yt ok');
})();
