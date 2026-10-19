const { render, setOut } = require('./gen.js'); const L = require('./clib.js'); setOut('/home/claude/campana/c');
(async () => {
  await render(1080, 1350, 'W', 0, (o, W, H) => { L.chrome(o, W, H, 'ecuacion', 'TRABAJO');
    L.txt(o, '1 reunión de 1 hora × 8 personas', W / 2, H / 2 - 220, 36); L.txt(o, '= 1 día de trabajo.', W / 2, H / 2 - 166, 36);
    const y = H / 2 - 40; for (let i = 0; i < 8; i++) { L.B(o, 200, y + i * 34, 20, 20, 0.8); L.R(o, 240, y + i * 34 + 9, 80, 2, 0.8); }
    L.txt(o, '=', 420, y + 130, 36, 0.7); L.R(o, 500, y + 120, 380, 20, 1); L.lab(o, '8 h', 500, y + 170, 'left', 0.6); }, 'li-1020.jpg');
  await render(1080, 1350, 'N', 0, L.T.tachado('TRABAJO', 'Órdenes', 'Contexto.'), 'li-1022.jpg');
  await render(1080, 1350, 'W', 0, (o, W, H) => { L.chrome(o, W, H, 'sinfiltro', 'TRABAJO'); L.lines(o, W, H / 2, ['Un proyecto no se atrasa', 'en la última semana.', '', 'Se atrasa el primer día', 'que nadie dijo “no sé”.']); }, 'li-1027.jpg');
  await render(1080, 1350, 'N', 0, (o, W, H) => { L.chrome(o, W, H, 'ecuacion', 'TRABAJO');
    L.txt(o, 'Delega el resultado,', W / 2, H / 2 - 230, 36); L.txt(o, 'no la tarea.', W / 2, H / 2 - 176, 36);
    const y = H / 2 - 50; for (let i = 0; i < 6; i++) { L.R(o, 200, y + i * 40, 200 - i * 12, 2, 0.5); }
    L.lab(o, 'pasos', 200, y - 34, 'left', 0.5); L.txt(o, '≠', 500, y + 100, 36, 0.7); L.B(o, 600, y + 20, 160, 160, 1); L.R(o, 672, y + 92, 16, 16, 1); L.lab(o, 'resultado', 680, y + 220, 'center', 0.6); }, 'li-1029.jpg');
  console.log('ok');
})();
