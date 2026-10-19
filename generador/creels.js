const { makeBG } = require('./gen.js');
const L = require('./clib.js');
const { Canvas } = require('skia-canvas');
const { spawn } = require('child_process');
const W = 1080, H = 1920, FPS = 30, DUR = 8, OUT = '/home/claude/campana/c';
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), prog = (t, a, b) => clamp((t - a) / (b - a));
const pad = n => String(Math.floor(n)).padStart(2, '0');
function hud(o, n, t) {
  L.lab(o, '@jaywrkr', 90, 250); L.lab(o, 'TRUCO  Nº ' + pad(n), W - 90, 250, 'right');
  L.lab(o, `00:00:${pad(t)}:${pad((t % 1) * 30)}`, W - 90, 284, 'right', 0.45);
  for (let k = 0; k < 36; k++) L.R(o, 90 + k * 25.7, 1560 - (k % 8 ? 4 : 10), 1.5, k % 8 ? 8 : 20, Math.floor(t * 2) % 36 === k ? 1 : 0.4);
  L.MARK.truco(o, 90, 1600, 28); L.lab(o, 'simple.', W - 90, 1614, 'right', 0.45);
}
const PH = ['Empieza antes de estar listo.', 'Termina lo que empiezas.', 'Menos planes. Más entregas.', 'Hoy cuenta.', 'Una cosa a la vez.', 'Hazlo aunque nadie mire.', 'Primero lo importante.', 'Cumple tu palabra.', 'Deja el celular. Empieza.', 'Lo simple funciona.', 'Hazlo aburrido. Hazlo diario.', 'No esperes ganas.'];
const SQ = (() => { const a = []; for (const s of [1, 2, 3]) for (let j = 0; j + s <= 3; j++) for (let i = 0; i + s <= 3; i++) a.push([i, j, s]); return a; })(); // 9+4+1 = 14
const REELS = {
  captura: { n: 1, draw(o, t, f) {
    L.txt(o, 'Haz captura ahora.', W / 2, 640, 36);
    L.B(o, W / 2 - 380, 880, 760, 160, 0.6); L.txt(o, PH[Math.floor(f / 3) % PH.length], W / 2, 960, 36);
    L.lab(o, 'La frase que te toque es tuya.', W / 2, 1180, 'center', 0.6);
  } },
  punto: { n: 2, draw(o, t) {
    if (t < 6) {
      L.txt(o, 'Mira el punto.', W / 2, 520, 36); L.txt(o, 'No parpadees.', W / 2, 574, 36);
      L.R(o, W / 2 - 180, 780, 360, 360, 1); L.R(o, W / 2 - 4, 956, 8, 8, 0);
      L.txt(o, String(6 - Math.floor(t)), W / 2, 1260, 36, 0.6);
    } else {
      L.R(o, 0, 0, W, H, 1);
      L.txt(o, '¿Ves un cuadrado oscuro?', W / 2, 640, 36, 0);
      if (t > 6.9) L.txt(o, 'Lo que miras todo el día,', W / 2, 1240, 36, 0), L.txt(o, 'se queda.', W / 2, 1294, 36, 0);
    }
  }, invertAfter: 6 },
  cuadrados: { n: 3, draw(o, t) {
    L.txt(o, 'Cuenta los cuadrados.', W / 2, 560, 36);
    const s = 130, x0 = W / 2 - 1.5 * s, y0 = 760;
    const k = t < 2.5 ? 0 : Math.min(14, Math.floor((t - 2.5) / 0.3) + 1);
    if (k > 0 && k <= 14 && t < 6.9) { const [i, j, z] = SQ[k - 1]; L.R(o, x0 + i * s, y0 + j * s, z * s, z * s, 0.28); L.B(o, x0 + i * s, y0 + j * s, z * s, z * s, 1, 4); }
    for (let i = 0; i <= 3; i++) { L.R(o, x0 + i * s - 0.75, y0, 1.5, 3 * s); L.R(o, x0, y0 + i * s - 0.75, 3 * s, 1.5); }
    if (k > 0) L.txt(o, pad(k), W / 2, 1260, 36, t > 6.9 ? 1 : 0.6);
    if (t > 6.9) L.txt(o, 'Los que no ves también cuentan.', W / 2, 1330, 36);
    else if (k === 0) L.txt(o, '¿Cuántos ves?', W / 2, 1260, 36, 0.6);
  } },
  barra: { n: 4, draw(o, t) {
    L.txt(o, 'Este video dura 7 segundos.', W / 2, 620, 36); L.txt(o, '¿Llegas?', W / 2, 674, 36);
    const p = prog(t, 0, 7); L.B(o, W / 2 - 350, 940, 700, 40, 0.6); L.R(o, W / 2 - 350 + 6, 946, (700 - 12) * p, 28);
    L.lab(o, (Math.min(t, 7)).toFixed(1) + ' s', W / 2 + 350, 1010, 'right', 0.6);
    const m = t < 2 ? '' : t < 4 ? 'No hagas scroll.' : t < 6 ? 'Ya casi.' : t < 7 ? 'Un segundo más.' : '';
    if (m) L.lab(o, m, W / 2 - 350, 1010, 'left', 0.6);
    if (t >= 7) { L.txt(o, 'Llegaste.', W / 2, 1180, 36); L.txt(o, 'Ahora termina lo demás.', W / 2, 1234, 36); }
  } },
};
async function run(key, file) {
  const r = REELS[key], bg = makeBG(W, H); bg.solid(4);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${W}x${H}`, '-framerate', '30', '-i', '-', '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo', '-shortest', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-b:v', '5M', '-maxrate', '6M', '-bufsize', '10M', '-c:a', 'aac', '-movflags', '+faststart', OUT + '/' + file], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < FPS * DUR; f++) {
    const t = f / FPS, ov = new Canvas(W, H), o = ov.getContext('2d'); o.fillStyle = '#000'; o.fillRect(0, 0, W, H);
    r.draw(o, t, f);
    const inv = r.invertAfter && t >= r.invertAfter;
    if (!inv) hud(o, r.n, t); else { const c2 = new Canvas(W, H), q = c2.getContext('2d'); q.fillStyle = '#000'; q.fillRect(0, 0, W, H); hud(q, r.n, t); o.globalCompositeOperation = 'difference'; o.drawImage(c2, 0, 0); o.globalCompositeOperation = 'source-over'; }
    const buf = await bg.compose(ov, 6);
    if (!ff.stdin.write(buf)) await new Promise(res => ff.stdin.once('drain', res));
  }
  ff.stdin.end(); await new Promise(res => ff.on('close', res));
  require('child_process').execSync(`ffmpeg -y -loglevel error -ss 0 -i ${OUT}/${file} -frames:v 1 -q:v 4 -vf scale=540:-2 ${OUT}/${file.replace('.mp4', '-poster.jpg')}`);
  console.log('ok', file);
}
const map = { captura: 'c1008-a-reel.mp4', punto: 'c1015-a-reel.mp4', cuadrados: 'c1022-a-reel.mp4', barra: 'c1029-a-reel.mp4' };
(async () => { for (const k of (process.argv[2] ? [process.argv[2]] : Object.keys(map))) await run(k, map[k]); })();
