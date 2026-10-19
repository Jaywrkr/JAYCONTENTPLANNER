// Reels de 6 s para Tachado: la palabra se tacha y aparece la nueva; loop perfecto
const { makeBG } = require('./gen.js');
const L = require('./clib.js');
const { Canvas } = require('skia-canvas');
const { spawn, execSync } = require('child_process');
const W = 1080, H = 1920, FPS = 30, DUR = 6, OUT = '/home/claude/campana/c';
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), prog = (t, a, b) => clamp((t - a) / (b - a));
const ease = x => 1 - Math.pow(1 - x, 3);
const pad = n => String(Math.floor(n)).padStart(2, '0');
function hud(o, label, t) {
  L.lab(o, '@jaywrkr', 90, 250); L.lab(o, label, W - 90, 250, 'right');
  L.lab(o, `00:00:${pad(t)}:${pad((t % 1) * 30)}`, W - 90, 284, 'right', 0.45);
  L.MARK.tachado(o, 90, 1600, 28); L.lab(o, 'simple.', W - 90, 1614, 'right', 0.45);
}
async function run(old, nw, label, file, theme) {
  const bg = makeBG(W, H); bg.solid(theme === 'W' ? 250 : 4);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${W}x${H}`, '-framerate', '30', '-i', '-', '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo', '-shortest', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-b:v', '4M', '-maxrate', '5M', '-bufsize', '8M', '-c:a', 'aac', '-movflags', '+faststart', OUT + '/' + file], { stdio: ['pipe', 'inherit', 'inherit'] });
  const tmp = new Canvas(10, 10).getContext('2d');
  const a = L.wid(tmp, old), gap = L.wid(tmp, ' ') * 1.5, b = L.wid(tmp, nw), x0 = W / 2 - (a + gap + b) / 2, y = H / 2 - 40;
  for (let f = 0; f < FPS * DUR; f++) {
    const t = f / FPS, ov = new Canvas(W, H), o = ov.getContext('2d'); o.fillStyle = '#000'; o.fillRect(0, 0, W, H);
    const strike = t < 5.3 ? ease(prog(t, 0.25, 0.6)) : 1 - ease(prog(t, 5.55, 5.9));
    const nChars = t < 5.3 ? Math.round(nw.length * prog(t, 0.7, 1.3)) : Math.round(nw.length * (1 - prog(t, 5.3, 5.55)));
    const oldA = 1 - 0.6 * strike;
    L.txt(o, old, x0, y, 36, oldA, 'left');
    if (strike > 0) L.R(o, x0 - 6, y - 0.75, (a + 12) * strike, 1.5, 0.75);
    if (nChars > 0) { const s = nw.slice(0, nChars); L.txt(o, s, x0 + a + gap, y, 36, 1, 'left'); if (t < 5.3 && t < 1.6 && Math.floor(t * 4) % 2 === 0) L.R(o, x0 + a + gap + L.wid(o, s) + 4, y - 20, 2, 40); }
    hud(o, label, t);
    const buf = await bg.compose(ov, 6);
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  execSync(`ffmpeg -y -loglevel error -ss 2 -i ${OUT}/${file} -frames:v 1 -q:v 4 -vf scale=540:-2 ${OUT}/${file.replace('.mp4', '-poster.jpg')}`);
  console.log('ok', file);
}
module.exports = { run };
if (require.main === module) { const [old, nw, label, file, th] = process.argv.slice(2); run(old, nw, label, file, th); }
