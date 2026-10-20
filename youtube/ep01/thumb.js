const { Canvas, FontLibrary } = require('skia-canvas'); const fs = require('fs');
const FD = '/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/reel/fonts/'; FontLibrary.use('Geist Mono', fs.readdirSync(FD).map(f => FD + f));
const c = new Canvas(1280, 720), o = c.getContext('2d'); o.fillStyle = '#000'; o.fillRect(0, 0, 1280, 720);
o.textBaseline = 'middle'; o.textAlign = 'center';
o.font = '300 64px "Geist Mono"'; o.fillStyle = 'rgba(255,255,255,.55)'; o.fillText('mañana ×3 =', 640, 300);
o.font = '400 96px "Geist Mono"'; o.fillStyle = '#fff'; o.fillText('nunca', 640, 410);
o.fillRect(60, 650, 16, 16); o.strokeStyle = '#fff'; o.lineWidth = 2; o.strokeRect(84, 651, 14, 14);
c.toFile(__dirname + '/miniatura-ep01.jpg', { quality: .92 });
