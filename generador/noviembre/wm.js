// SEMANAS 2–4 · 9–29 nov · posts A/B (sin repetir mecánicas de la semana 1)
const { G, L } = require('./lib.js');
const { R, B, txt, lab, lines, chrome, T, wid } = L;
const stack = (H, gh, gap = 100, th = 60) => { const y0 = H / 2 - (gh + gap + th) / 2; return { y0, ty: y0 + gh + gap + th / 2 }; };
const rng = seed => { let s = seed; return () => (s = (s * 9301 + 49297) % 233280) / 233280; };
const P = [];
const day = (d, s, n, A, Bb) => P.push({ d, s, n, A, B: Bb });

// ═════════ SEMANA 2 ═════════
day('2026-11-09', 'tachado', 6,
  { th: 'N', title: 'Ocupado → Enfocado.', draw: T.tachado(6, 'Ocupado', 'Enfocado.'), cap: 'Ocupado llena el día. Enfocado lo cambia.\nMándaselo a quien “no tiene tiempo para nada”.' },
  { th: 'W', title: 'Opinar → Probar.', draw: T.tachado(6, 'Opinar', 'Probar.'), cap: 'Opinar es gratis. Probar enseña.\nMándaselo a quien tiene opinión de todo y no prueba nada.' });
day('2026-11-10', 'cien', 6,
  { th: 'W', title: 'SOLO UN CAPÍTULO MÁS ×100', draw: T.cien2(6, 'SOLO UN CAPÍTULO MÁS.', 'Y YA SON LAS 2 AM.', 11), cap: 'Ningún capítulo dura una noche. Todos juntos, sí.\nMándaselo a quien “ya mismo” se duerme.' },
  { th: 'N', title: 'YA CASI TERMINO ×100', draw: T.cien2(6, 'YA CASI TERMINO.', 'DIJE HACE UN MES.', 6), cap: '“Ya casi” es el lugar donde se quedan las cosas.\nMándaselo a quien lleva semanas “ya casi”.' });
day('2026-11-11', 'ecuacion', 6,
  { th: 'N', title: '7 síes = 0 para lo tuyo', draw: (o, W, H) => { chrome(o, W, H, 'ecuacion', 6);
      const s = 70, g = 16, n = 7, gh = s + 50; const { y0, ty } = stack(H, gh); const big = 120, tot = n * s + (n - 1) * g + 90 + big, x0 = W / 2 - tot / 2, cy = y0 + 30 + s / 2;
      for (let i = 0; i < n; i++) { const x = x0 + i * (s + g); R(o, x, cy - s / 2, s, s, .9); lab(o, 'sí', x + s / 2, cy + s / 2 + 30, 'center', .5); }
      const ex = x0 + n * (s + g) - g + 45; txt(o, '=', ex, cy, 44, .8); const bx = ex + 45; B(o, bx, cy - big / 2, big, big, 1, 2); lab(o, 'lo tuyo', bx + big / 2, cy + big / 2 + 30, 'center', .5);
      lines(o, W, ty + 20, ['Cada sí a otros', 'es un no a lo tuyo.']); },
    cap: 'No está mal ayudar. Está mal que lo tuyo siempre quede al final.\nMándaselo a quien dice que sí a todo.' },
  { th: 'W', title: '2 a medias < 1 hecha', draw: (o, W, H) => { chrome(o, W, H, 'ecuacion', 6);
      const bw = 300, bh = 44, gh = 3 * bh + 2 * 50; const { y0, ty } = stack(H, gh); const x0 = W / 2 - (bw + 120 + bw) / 2;
      [0, 1].forEach(i => { const y = y0 + 40 + i * (bh + 50); B(o, x0, y, bw, bh, .35, 1.5); R(o, x0, y, bw * .5, bh, .85); });
      txt(o, '<', x0 + bw + 60, y0 + gh / 2, 44, .8); const x2 = x0 + bw + 120, y2 = y0 + gh / 2 - bh / 2; R(o, x2, y2, bw, bh, .95);
      lab(o, 'dos a medias', x0, y0 + 10, 'left', .55); lab(o, 'una hecha', x2, y2 - 30, 'left', .55);
      lines(o, W, ty, ['Dos cosas a medias', 'valen menos que una hecha.']); },
    cap: 'Lo que está a medias no cuenta. Pesa.\nGuárdalo para cuando quieras empezar otra cosa.' });
day('2026-11-12', 'truco', 6,
  { th: 'W', title: 'Lee esto rápido', draw: (o, W, H) => { chrome(o, W, H, 'truco', 6); const bw = 560, bh = 300, x = W / 2 - bw / 2, y = H / 2 - bh / 2 + 40;
      txt(o, 'Lee esto rápido.', W / 2, y - 110, 36, 1); B(o, x, y, bw, bh, .9, 2); txt(o, 'Deja de', W / 2, y + bh / 2 - 34, 44, 1); txt(o, 'de pensarlo.', W / 2, y + bh / 2 + 34, 44, 1); },
    cap: '¿Viste el “de” repetido? La mayoría no.\nTu cabeza lee lo que espera leer. Igual con tus rutinas.\nMándaselo a alguien y no le digas nada.' },
  { th: 'N', title: 'Mira solo el punto', draw: (o, W, H) => { chrome(o, W, H, 'truco', 6); const r = rng(11), ws = ['mensaje', 'correo', 'like', 'noticia', 'alerta', 'oferta', 'reunión', 'story', 'grupo', 'video', 'nuevo', 'urgente'];
      const cx = W / 2, cy = H / 2 + 20; txt(o, 'Mira solo el punto. 10 segundos.', W / 2, 250 + 40, 30, 1);
      for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, d = i % 2 ? 360 : 230; txt(o, ws[i % ws.length], cx + Math.cos(a) * d, cy + Math.sin(a) * d, 22, .22, 'center', 400); }
      R(o, cx - 10, cy - 10, 20, 20, 1); },
    cap: '¿Lo lograste sin leer lo de alrededor?\nEso es concentrarse: no es ver más. Es ignorar mejor.\nMándaselo a quien no puede con una sola cosa.' });
day('2026-11-13', 'fondo', 6,
  { th: 'N', title: 'Primero lo difícil.', f: ['Primero', 'lo difícil.'], lockTh: 'N', home: { k: 'texto', p: 'primero lo difícil', th: 'N' }, lay: 'escalera', line: 'Para cuando empiezas por lo fácil.',
    cap: 'Dos fondos nuevos. Están en historias.\nMándaselo a quien deja lo importante para la tarde.' },
  { th: 'W', title: 'Termina lo que empiezas.', f: ['Termina lo', 'que empiezas.'], lockTh: 'W', home: { k: 'barra', th: 'W' }, lay: 'hero', line: 'Para cada vez que quieres abrir algo nuevo.',
    cap: 'Dos fondos para la semana. Captúralos en historias.\nMándaselo a quien tiene tres proyectos a medias.' });
day('2026-11-14', 'semana', 6,
  { th: 'W', title: '3 cosas que dejé de hacer para tener más tiempo', sl: [['3 cosas que dejé de hacer', 'para tener más tiempo.'], ['01', 'Contestar', 'en el momento.'], ['02', 'Tener el celular', 'en la mesa.'], ['03', 'Decir “dale”', 'sin pensarlo.'], ['El tiempo no apareció.', 'Dejó de irse.']],
    cap: 'Ninguna cuesta plata. Todas cuestan costumbre.\nGuárdalo y prueba una esta semana.' },
  { th: 'N', title: '3 cosas que hago el domingo para que el lunes no me gane', sl: [['3 cosas que hago el domingo', 'para que el lunes no me gane.'], ['01', 'Elijo la una cosa', 'del lunes.'], ['02', 'Bloqueo dos horas', 'para lo mío.'], ['03', 'Dejo el celular lejos', 'a las 9.'], ['El lunes empieza', 'el domingo.']],
    cap: '15 minutos el domingo valen una semana tranquila.\nGuárdalo para mañana en la noche.' });
day('2026-11-15', 'sinfiltro', 5,
  { th: 'N', title: 'No es que no tengas tiempo', draw: (o, W, H) => { chrome(o, W, H, 'sinfiltro', 5);
      const pw = 200, ph = 380, gh = ph; const { y0, ty } = stack(H, gh); const x = W / 2 - pw / 2; B(o, x, y0, pw, ph, .9, 2); R(o, W / 2 - 20, y0 + 16, 40, 4, .5);
      txt(o, '4:12', W / 2, y0 + ph / 2 - 16, 44, 1); lab(o, 'horas hoy', W / 2, y0 + ph / 2 + 36, 'center', .55);
      lines(o, W, ty, ['No es que no tengas tiempo.', 'Lo tiene tu celular.']); },
    cap: 'Ajustes → Tiempo en pantalla. Mira tu número. Después hablamos de tiempo.\nMándaselo a quien “no tiene tiempo”.' },
  { th: 'W', title: 'Nadie va a venir a buscarte', draw: (o, W, H) => { chrome(o, W, H, 'sinfiltro', 5);
      const s = 90, g = 36, n = 6, gh = s + 50; const { y0, ty } = stack(H, gh); const x0 = W / 2 - (n * s + (n - 1) * g) / 2;
      for (let i = 0; i < n; i++) { const x = x0 + i * (s + g); i === 3 ? R(o, x, y0, s, s, .95) : B(o, x, y0, s, s, .3, 1.5); }
      lab(o, 'tú', x0 + 3 * (s + g) + s / 2, y0 + s + 34, 'center', .6);
      lines(o, W, ty, ['Nadie va a venir a buscarte.', 'Levántate tú.']); },
    cap: 'La sala de espera está vacía. Solo estás tú, esperando.\nMándaselo a quien sigue esperando “su momento”.' });

// ═════════ SEMANA 3 ═════════
day('2026-11-16', 'tachado', 7,
  { th: 'W', title: 'Motivación → Rutina.', draw: T.tachado(7, 'Motivación', 'Rutina.'), cap: 'La motivación viene y va. La rutina se queda.\nMándaselo a quien espera tener ganas.' },
  { th: 'N', title: 'Perfecto → Publicado.', draw: T.tachado(7, 'Perfecto', 'Publicado.'), cap: 'Lo perfecto vive en tu carpeta. Lo publicado, en el mundo.\nMándaselo a quien tiene 30 borradores.' });
day('2026-11-17', 'cien', 7,
  { th: 'N', title: 'EL LUNES EMPIEZO ×100', draw: T.cien2(7, 'EL LUNES EMPIEZO.', 'HOY ES LUNES.', 9), cap: 'Hoy no es lunes. Pero casi nunca lo es.\nMándaselo a quien empieza todo “el lunes”.' },
  { th: 'W', title: 'CUANDO TENGA TIEMPO ×100', draw: T.cien2(7, 'CUANDO TENGA TIEMPO.', 'NUNCA LLEGÓ.', 4), cap: 'El tiempo no se tiene. Se saca.\nMándaselo a quien lo deja para “cuando tenga tiempo”.' });
day('2026-11-18', 'ecuacion', 7,
  { th: 'W', title: '20 pestañas = 0 terminadas', draw: (o, W, H) => { chrome(o, W, H, 'ecuacion', 7);
      const tw = 100, th = 42, ov = 26, n = 20, gh = th + 4 * 22; const { y0, ty } = stack(H, gh); const tot = (n - 1) * ov + tw + 80 + 120, x0 = W / 2 - tot / 2, cy = y0 + gh / 2;
      for (let i = 0; i < n; i++) { const x = x0 + i * ov, y = cy - th / 2 + ((i % 5) - 2) * 22; o.fillStyle = 'rgba(0,0,0,0)'; B(o, x, y, tw, th, .25 + .03 * i, 1.5); }
      const ex = x0 + (n - 1) * ov + tw + 40; txt(o, '=', ex, cy, 44, .8); B(o, ex + 40, cy - 60, 120, 120, 1, 2); txt(o, '0', ex + 100, cy, 44, 1);
      lines(o, W, ty, ['Veinte cosas abiertas,', 'ninguna terminada.']); },
    cap: 'Cierra 19. Termina 1.\nMándaselo a quien tiene el navegador como su escritorio.' },
  { th: 'N', title: 'Poco diario > mucho a veces', draw: (o, W, H) => { chrome(o, W, H, 'ecuacion', 7);
      const bw = 760, gh = 230; const { y0, ty } = stack(H, gh); const x0 = W / 2 - bw / 2, s = 18, g = (bw - 30 * s) / 29;
      lab(o, 'poco · todos los días', x0, y0, 'left', .6); for (let i = 0; i < 30; i++) R(o, x0 + i * (s + g), y0 + 26, s, s, .9);
      txt(o, '>', W / 2, y0 + 90, 40, .8);
      lab(o, 'mucho · de vez en cuando', x0, y0 + 136, 'left', .6); [0, 13, 26].forEach(k => R(o, x0 + k * (s + g), y0 + 162, s * 3, s * 3 + 14, .9));
      lines(o, W, ty + 20, ['Poco todos los días', 'le gana a mucho de vez en cuando.']); },
    cap: '30 cuadros chicos ocupan más que 3 grandes. Haz la cuenta.\nGuárdalo para cuando quieras hacerlo todo en un día.' });
day('2026-11-19', 'truco', 7,
  { th: 'W', title: 'Cuenta los puntos grises', draw: (o, W, H) => { chrome(o, W, H, 'truco', 7); const n = 6, s = 92, g = 20, tot = n * s + (n - 1) * g, x0 = W / 2 - tot / 2, y0 = H / 2 - tot / 2 + 50;
      txt(o, 'Cuenta los puntos grises.', W / 2, y0 - 110, 36, 1); for (let i = 0; i < n * n; i++) R(o, x0 + (i % n) * (s + g), y0 + Math.floor(i / n) * (s + g), s, s, 1); },
    cap: 'Respuesta: cero. Ninguno existe. Tu cabeza los pone.\nIgual que pone excusas donde no hay ninguna.\nMándaselo a alguien y pregúntale cuántos vio.' },
  { th: 'N', title: 'Lee la primera letra', draw: (o, W, H) => { chrome(o, W, H, 'truco', 7);
      const ls = ['Hoy no esperes al lunes.', 'Abre lo que dejaste.', 'Zanja una cosa pendiente.', 'Lee menos, aplica más.', 'Olvida el plan perfecto.'], lh = 78, gh = (ls.length - 1) * lh, y0 = H / 2 - gh / 2 + 40;
      txt(o, 'Lee solo la primera letra.', W / 2, y0 - 130, 36, 1); const mw = Math.max(...ls.map(l => wid(o, l, 34))), x0 = W / 2 - mw / 2;
      ls.forEach((l, i) => { const y = y0 + i * lh; txt(o, l[0], x0, y, 34, 1, 'left'); txt(o, l.slice(1), x0 + wid(o, l[0], 34), y, 34, .4, 'left'); }); },
    cap: 'Ya lo leíste. Ahora sí: hazlo.\nMándaselo a quien necesita leerlo hoy.' });
day('2026-11-20', 'fondo', 7,
  { th: 'W', title: 'Hecho es mejor que perfecto.', f: ['Hecho es mejor', 'que perfecto.'], lockTh: 'W', home: { k: 'puntos', th: 'W' }, lay: 'hero', line: 'Para cada vez que lo vuelves a revisar.',
    cap: 'Dos fondos nuevos. Están en historias.\nMándaselo a quien no publica nada por “no está listo”.' },
  { th: 'N', title: 'Lento también llega.', f: ['Lento', 'también llega.'], lockTh: 'N', home: { k: 'texto', p: 'lento también llega', th: 'N' }, lay: 'escalera', line: 'Para cada vez que te comparas.',
    cap: 'Dos fondos para la semana. Captúralos en historias.\nMándaselo a quien siente que va tarde.' });
day('2026-11-21', 'semana', 7,
  { th: 'N', title: '3 trampas de la productividad', sl: [['3 trampas de', 'la productividad.'], ['01', 'Organizar', 'en vez de hacer.'], ['02', 'Buscar la app', 'perfecta.'], ['03', 'Medir todo.', 'Cambiar nada.'], ['La herramienta', 'no hace el trabajo.']],
    cap: '¿En cuál caíste esta semana? Yo en la 2.\nMándaselo a quien tiene cinco apps de tareas.' },
  { th: 'W', title: '3 frases para decir que no', sl: [['3 frases que uso', 'para decir que no.'], ['01', '“Ahora no puedo.', '¿Te sirve el jueves?”'], ['02', '“Si hago esto,', '¿qué dejo?”'], ['03', '“Esta semana', 'no es mi prioridad.”'], ['No es ser malo.', 'Es ser claro.']],
    cap: 'Ninguna es grosera. Todas son claras.\nGuárdalo para la próxima vez que quieras decir que no.' });
day('2026-11-22', 'sinfiltro', 6,
  { th: 'W', title: 'No es pendiente. Es deseo.', draw: (o, W, H) => { chrome(o, W, H, 'sinfiltro', 6);
      const its = ['aprender inglés', 'ir al gym', 'leer más', 'ordenar el cuarto', 'empezar el proyecto', 'ahorrar'], lh = 62, gh = (its.length - 1) * lh + 30; const { y0, ty } = stack(H, gh);
      const mw = Math.max(...its.map(s => wid(o, s, 28))), x0 = W / 2 - (mw + 60) / 2; its.forEach((s, i) => { const y = y0 + 15 + i * lh; B(o, x0, y - 15, 30, 30, .5, 1.5); txt(o, s, x0 + 60, y, 28, .55, 'left'); });
      lines(o, W, ty, ['Si nunca lo haces,', 'no es pendiente. Es deseo.']); },
    cap: '¿Cuánto tiempo lleva lo primero de tu lista? Sé honesto.\nMándaselo a quien tiene la misma lista desde enero.' },
  { th: 'N', title: 'Cansado de evitarlo', draw: (o, W, H) => { chrome(o, W, H, 'sinfiltro', 6);
      const bw = 360, bh = 150, gh = bh; const { y0, ty } = stack(H, gh); const x = W / 2 - bw / 2 - 12; B(o, x, y0, bw, bh, .9, 2); R(o, x + bw, y0 + bh / 2 - 24, 14, 48, .9); R(o, x + 12, y0 + 12, (bw - 24) * .1, bh - 24, .9); lab(o, '10%', x + bw / 2, y0 + bh / 2, 'center', .6);
      lines(o, W, ty, ['No estás cansado de trabajar.', 'Estás cansado de evitarlo.']); },
    cap: 'Evitar algo cansa más que hacerlo. Pruébalo hoy.\nMándaselo a quien lleva una semana “agotado”.' });

// ═════════ SEMANA 4 ═════════
day('2026-11-23', 'tachado', 8,
  { th: 'N', title: 'Quejarse → Cambiar.', draw: T.tachado(8, 'Quejarse', 'Cambiar.'), cap: 'Quejarse se siente como hacer algo. No lo es.\nMándaselo a quien se queja de lo mismo cada semana.' },
  { th: 'W', title: 'Saber → Hacer.', draw: T.tachado(8, 'Saber', 'Hacer.'), cap: 'Ya sabes. Lo que falta es lo otro.\nMándaselo a quien “ya sabe” hace años.' });
day('2026-11-24', 'cien', 8,
  { th: 'W', title: 'LO HAGO DESPUÉS ×100', draw: T.cien2(8, 'LO HAGO DESPUÉS.', 'DESPUÉS NO EXISTE.', 12), cap: 'Después es un día que nunca está en el calendario.\nMándaselo a quien vive en “después”.' },
  { th: 'N', title: 'NO ES EL MOMENTO ×100', draw: T.cien2(8, 'NO ES EL MOMENTO.', 'NUNCA LO ES.', 7), cap: 'El momento no llega. Se elige.\nMándaselo a quien está esperando el momento perfecto.' });
day('2026-11-25', 'ecuacion', 8,
  { th: 'N', title: 'Contarlo ≠ hacerlo', draw: (o, W, H) => { chrome(o, W, H, 'ecuacion', 8);
      const bw = 360, bh = 200, s = 80, gh = bh + 40; const { y0, ty } = stack(H, gh); const tot = bw + 120 + s, x0 = W / 2 - tot / 2;
      B(o, x0, y0, bw, bh, .8, 2); R(o, x0 + 40, y0 + bh, 40, 40, .8); for (let k = 0; k < 3; k++) R(o, x0 + 40, y0 + 50 + k * 40, bw - 80 - k * 60, 3, .5);
      txt(o, '≠', x0 + bw + 60, y0 + bh / 2, 44, .8); R(o, x0 + bw + 120, y0 + bh / 2 - s / 2, s, s, .95);
      lines(o, W, ty, ['Contarlo se siente como hacerlo.', 'No lo es.']); },
    cap: 'Cuando cuentas un plan, tu cabeza ya lo siente hecho. Por eso no lo haces.\nGuárdalo y no se lo cuentes a nadie.' },
  { th: 'W', title: 'Ganas + nada = nada', draw: (o, W, H) => { chrome(o, W, H, 'ecuacion', 8);
      const s = 110, g = 40, gh = 2 * s + 90; const { y0, ty } = stack(H, gh); const tot = 3 * s + 2 * (g * 2 + 20), x0 = W / 2 - tot / 2;
      const row = (y, a, b, c, la, lb, lc) => { const xs = [x0, x0 + s + g * 2 + 20, x0 + 2 * (s + g * 2 + 20)]; [a, b, c].forEach((f, i) => f ? R(o, xs[i], y, s, s, .92) : B(o, xs[i], y, s, s, .35, 1.5)); txt(o, '+', xs[0] + s + g + 10, y + s / 2, 40, .7); txt(o, '=', xs[1] + s + g + 10, y + s / 2, 40, .7);
        [la, lb, lc].forEach((l, i) => l && lab(o, l, xs[i] + s / 2, y + s + 26, 'center', .5)); };
      row(y0, 1, 0, 0, 'ganas', 'nada', 'nada'); row(y0 + s + 90, 0, 1, 1, 'sin ganas', '5 min', 'algo');
      lines(o, W, ty + 30, ['Las ganas no hacen nada.', 'Cinco minutos, sí.']); },
    cap: 'No esperes tener ganas. Empieza con cinco minutos y mira qué pasa.\nGuárdalo para el próximo “no tengo ganas”.' });
day('2026-11-26', 'truco', 8,
  { th: 'N', title: 'Sigue el cuadrado', draw: (o, W, H) => { chrome(o, W, H, 'truco', 8); const s = 440, x = W / 2 - s / 2, y = H / 2 - s / 2 + 50;
      txt(o, 'Sigue el cuadrado. Una vuelta.', W / 2, y - 140, 36, 1); B(o, x, y, s, s, .9, 2); R(o, x - 8, y - 8, 16, 16, 1);
      lab(o, 'inhala · 4', W / 2, y - 34, 'center', .7); lab(o, 'sostén · 4', x + s + 30, y + s / 2, 'left', .7); lab(o, 'exhala · 4', W / 2, y + s + 40, 'center', .7); lab(o, 'sostén · 4', x - 30, y + s / 2, 'right', .7); },
    cap: 'Respiración cuadrada: 4 segundos por lado.\nHaz una vuelta antes de abrir los mensajes. Cambia la mañana.\nMándaselo a quien empieza el día acelerado.' },
  { th: 'W', title: 'Encuentra la diferencia', draw: (o, W, H) => { chrome(o, W, H, 'truco', 8); const n = 6, s = 40, g = 12, gw = n * s + (n - 1) * g, gap = 90, x0 = W / 2 - (2 * gw + gap) / 2, y0 = H / 2 - gw / 2 + 50, r = rng(5);
      txt(o, 'Encuentra la diferencia.', W / 2, y0 - 120, 36, 1); const fill = [...Array(n * n)].map(() => r() < .35), odd = 23;
      [0, 1].forEach(k => { const xx = x0 + k * (gw + gap); for (let i = 0; i < n * n; i++) { const x = xx + (i % n) * (s + g), y = y0 + Math.floor(i / n) * (s + g), f = k === 1 && i === odd ? !fill[i] : fill[i]; f ? R(o, x, y, s, s, .9) : B(o, x, y, s, s, .35, 1.5); } }); },
    cap: 'Una sola cosa distinta cambia todo el cuadro. Igual que tu día.\n¿La encontraste? Cuéntame en cuántos segundos.' });
day('2026-11-27', 'fondo', 8,
  { th: 'N', title: 'Hoy cuenta.', f: ['Hoy cuenta.'], lockTh: 'N', home: { k: 'barra', th: 'N' }, lay: 'hero', line: 'Para cada día que parece no importar.',
    cap: 'Dos fondos nuevos. Están en historias.\nMándaselo a quien ya está pensando en enero.' },
  { th: 'W', title: 'Menos ruido.', f: ['Menos ruido.'], lockTh: 'W', home: { k: 'texto', p: 'menos ruido', th: 'W' }, lay: 'escalera', line: 'Para cada desbloqueo sin motivo.',
    cap: 'Dos fondos para la semana. Captúralos en historias.\nMándaselo a quien tiene 99+ notificaciones.' });
day('2026-11-28', 'semana', 8,
  { th: 'W', title: 'Noviembre en 3 frases', sl: [['Noviembre', 'en 3 frases.'], ['01', 'El plan perfecto', 'no se mueve.'], ['02', 'Ocupado', 'no es avanzar.'], ['03', 'Las ganas llegan', 'después.'], ['Diciembre empieza', 'el lunes. O hoy.']],
    cap: '¿Cuál te sirvió más este mes? Responde con el número.\nGuárdalo para releerlo el 31.' },
  { th: 'N', title: '3 cosas para cerrar el año sin culpa', sl: [['3 cosas para cerrar', 'el año sin culpa.'], ['01', 'Elige una cosa', 'y termínala.'], ['02', 'Suelta lo que', 'no vas a hacer.'], ['03', 'Escribe lo que', 'sí hiciste.'], ['Cerrar también', 'es avanzar.']],
    cap: 'Quedan cinco semanas. Alcanzan para una cosa bien hecha.\nGuárdalo y empieza por la 3.' });
day('2026-11-29', 'sinfiltro', 7,
  { th: 'N', title: 'Nadie te está mirando tanto', draw: (o, W, H) => { chrome(o, W, H, 'sinfiltro', 7);
      const n = 8, s = 44, g = 22, gw = n * s + (n - 1) * g, gh = 4 * s + 3 * g; const { y0, ty } = stack(H, gh); const x0 = W / 2 - gw / 2;
      for (let i = 0; i < n * 4; i++) { const x = x0 + (i % n) * (s + g), y = y0 + Math.floor(i / n) * (s + g); i === 19 ? R(o, x, y, s, s, 1) : B(o, x, y, s, s, .25, 1.5); }
      lines(o, W, ty, ['Nadie te está mirando tanto.', 'Todos están en lo suyo.']); },
    cap: 'El miedo al qué dirán dura más que el qué dirán.\nMándaselo a quien no empieza por vergüenza.' },
  { th: 'W', title: 'Ya sabes lo que tienes que hacer', draw: (o, W, H) => { chrome(o, W, H, 'sinfiltro', 7);
      const s = 140, gh = s; const { y0, ty } = stack(H, gh); B(o, W / 2 - s / 2, y0, s, s, .9, 2);
      lines(o, W, ty, ['Ya sabes lo que tienes que hacer.', 'No te falta información.']); },
    cap: 'No necesitas otro video ni otro libro. Necesitas el cuadro de arriba con una ✓.\nMándaselo a quien sigue investigando.' });
module.exports = P;
