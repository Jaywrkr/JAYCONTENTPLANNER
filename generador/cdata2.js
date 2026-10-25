// Ajustes desde el 14 oct según datos de la semana 1–2
const D = require('./cdata.js').map(d => JSON.parse(JSON.stringify(d)));
const by = k => D.find(d => d.d === k);
const set = (k, K, patch) => Object.assign(by(k)[K], patch);
const SHARE_ST = 'Historia 1: comparte el post y escribe solo: “mándaselo a quien lo necesita.” Sin sticker de pregunta.';

// todo lo que viene: 11:30
D.forEach(d => { if (d.d >= '2026-10-14') d.h = '11:30'; });

// tareas del perfil (una vez)
by('2026-10-14').extra = {"title": "Perfil + destacada EMPIEZA AQUÍ", "why": "El 5 oct tuviste 69K vistas y 9 seguidores nuevos. La gente entra al perfil y no encuentra por qué seguirte.", "steps": ["Fija 2 posts: el del 5 oct (~~Después~~ Ahora) y el del 12 oct. Quita los fijados viejos de 2023–24.", "Perfil → Editar:\nNombre: Jay Jaramillo · Creativo\nBio (127 de 150):\nVerdades incómodas, diseñadas simple.\nUna nueva cada día.\n🔮 @coresolutionsec @minervostudio\n🎧 DJ-VJ @naturalnoise @jay.infinito\nEnlace: deja jaywrkr.univer.se", "Sube las 6 historias de EMPIEZA AQUÍ (abajo). En la 04 pon un sticker de mención sobre cada @.", "Justo después comparte en historias tus 3 mejores posts: Tachado del 5 oct, carrusel del 10 y reel del 8.", "Crea la destacada EMPIEZA AQUÍ con esas 9 historias. Portada abajo.", "Revisa Configuración → Privacidad → Comentarios: que no estén limitados (69K vistas y 2 comentarios es raro)."], "groups": [{"name": "Empieza aquí", "files": ["hl-empieza-01.jpg", "hl-empieza-02.jpg", "hl-empieza-03.jpg", "hl-empieza-04.jpg", "hl-empieza-05.jpg", "hl-empieza-06.jpg"], "how": "Súbelas en orden, una tras otra."}], "files": ["portada-empieza.jpg"]};
by('2026-10-16').extra = {"title": "Destacada FONDOS", "why": "Los fondos hacen que la gente vuelva. Guardados en una destacada se vuelven colección.", "steps": ["Después de subir las 2 historias de fondos de hoy, crea la destacada FONDOS con ellas.", "Agrega también las del 9 oct desde tu archivo de historias (no hace falta volver a subirlas).", "Portada abajo. Cada viernes, agrega los fondos nuevos a esta destacada."], "files": ["portada-fondos.jpg"]};
by('2026-10-17').extra = {"title": "Destacada PROCESO", "why": "Muestra al creativo que hay detrás de las frases.", "steps": ["Sube las 9 historias de PROCESO (abajo), en orden. Mejor por la tarde, separadas de las historias del post.", "Crea la destacada PROCESO. Portada abajo.", "Desde hoy, cada historia de proceso del plan también va aquí."], "groups": [{"name": "Proceso", "files": ["hl-proceso-01.jpg", "hl-proceso-02.jpg", "hl-proceso-03.jpg", "hl-proceso-04.jpg", "hl-proceso-05.jpg", "hl-proceso-06.jpg", "hl-proceso-07.jpg", "hl-proceso-08.jpg", "hl-proceso-09.jpg"], "how": "Súbelas en orden."}], "files": ["portada-proceso.jpg"]};
by('2026-10-18').extra = {"title": "Destacada PREGUNTAS", "why": "Abre la conversación que hoy no está pasando en comentarios.", "steps": ["Sube las 7 historias de PREGUNTAS (abajo). En la 07 pon el sticker de pregunta dentro del recuadro.", "Crea la destacada PREGUNTAS. Portada abajo.", "Cada domingo responde 2–3 preguntas con este mismo diseño y agrégalas aquí."], "groups": [{"name": "Preguntas", "files": ["hl-preguntas-01.jpg", "hl-preguntas-02.jpg", "hl-preguntas-03.jpg", "hl-preguntas-04.jpg", "hl-preguntas-05.jpg", "hl-preguntas-06.jpg", "hl-preguntas-07.jpg"], "how": "Súbelas en orden."}], "files": ["portada-preguntas.jpg"]};
by('2026-10-19').extra = {"title": "Revisión semanal", "why": "Cada lunes a las 8:50 se revisan tus datos de la semana y se guardan en tu página “Revisión semanal”. Te llega un aviso al celular.", "steps": ["Abre la Revisión semanal: https://claude.ai/artifact/KRxuMC3z95P1RgsdbA3RxA", "Mira 3 números: seguidores nuevos por cada 1.000 vistas, el mejor post y si el 100 veces v2 pasó de 5K.", "Si hay cambios recomendados, pídele a Claude en esta conversación que los aplique al calendario."]};
by('2026-10-24').extra = {"title": "Destacada MÚSICA (opcional)", "why": "Te humaniza y refuerza lo de creativo.", "steps": ["La próxima vez que toques, sube 2–3 historias del set y créala. Aquí puede ir también el club de la Juventus.", "Portada abajo."], "files": ["portada-musica.jpg"]};
by('2026-10-26').extra = {"title": "Revisión semanal", "why": "Segunda revisión con el plan nuevo.", "steps": ["Abre la Revisión semanal: https://claude.ai/artifact/KRxuMC3z95P1RgsdbA3RxA", "Compara con la semana anterior: ¿subieron los seguidores por cada 1.000 vistas con el perfil arreglado?", "Decide el martes 27: 100 veces o Tachado, según la regla de los 5K."]};
by('2026-11-01').extra = {"title": "Cierre del mes", "why": "Mañana lunes llega la revisión del mes completo.", "steps": ["Mañana a las 8:50 llega la revisión. Con eso armamos el plan de noviembre: qué series siguen, cuáles cambian."]};

const T = (k, K, cap, st) => set(k, K, Object.assign({ cap }, st ? { st } : {}));
// semana 2 (resto)
T('2026-10-14', 'A', 'Lo urgente grita. Lo importante espera.\nMándaselo a quien vive apagando incendios.', [SHARE_ST, 'Historia 2: quiz “¿Dónde pasaste más tiempo hoy?” Importante / Urgente / Ninguno.']);
T('2026-10-14', 'B', 'Cada sí ocupa espacio.\nEnvíaselo a alguien que no sabe decir no.', [SHARE_ST, 'Historia 2: pregunta “¿A qué vas a decir no esta semana?”']);
set('2026-10-15', 'A', { rec: true, cap: 'Mira el punto. No parpadees.\nMándaselo a alguien que pasa 4 horas en el celular.' });
set('2026-10-15', 'B', { cap: 'Lee solo las letras claras.\nMándaselo a alguien y vean quién lo lee primero.', nota: 'Los jueves sube solo uno. Recomendado: el reel (A). Esta es la alternativa si el reel no te convence.' });
const FONDO_POST = 'Publica también el post del feed (el de los dos celulares). El 9 oct solo salió en historias y se perdió ese día en el feed.';
['2026-10-16', '2026-10-23', '2026-10-30'].forEach(k => ['A', 'B'].forEach(K => { const o = by(k)[K]; o.st = [FONDO_POST, ...o.st]; }));
T('2026-10-16', 'A', 'Dos fondos para tu celular. Están en mis historias.\nMándaselo a quien necesita menos ruido.');
T('2026-10-16', 'B', 'Lo que funciona casi nunca es emocionante.\nLos dos fondos están en historias. Mándaselo a quien empieza algo nuevo.');
T('2026-10-17', 'A', 'Tres errores que ya no repito.\nGuárdalo para tu próxima reunión de equipo.');
T('2026-10-17', 'B', 'Mi mañana en tres líneas.\nMándaselo a quien dice que no tiene tiempo.');
T('2026-10-18', 'A', 'Es una buena noticia.\nMándaselo a quien vive pendiente del qué dirán.');
T('2026-10-18', 'B', 'O empiezas hoy, o lo sueltas.\nEnvíaselo a quien lleva meses con “algún día”.');
// semana 3
set('2026-10-19', 'A', { rec: true, cap: '“Intentar” ya trae la excusa incluida.\nMándaselo a quien siempre dice “lo intento”.' });
T('2026-10-19', 'B', 'Lo que parece suerte casi siempre es repetición.\nEnvíaselo a quien cree que fue suerte.');
set('2026-10-20', 'A', { v2: true, row: 9, cap: 'Hay una línea distinta.\nEnvíaselo a quien siempre dice “un día más”.',
  nota: 'Prueba del rediseño: letra más grande y en negro. Si no pasa de 5K vistas en 24 h, el 27 vamos con la B (Tachado).' });
by('2026-10-20').B = { k: ['Ahorita', 'Ahora.'], th: 'N', cap: 'En “ahorita” caben tres días.\nMándaselo a tu amigo del “ahorita lo hago”.',
  st: [SHARE_ST, 'Historia 2: encuesta “¿Cuánto dura tu ahorita?” 5 min / 3 días.'], pr: ['Graba 5 s: escribes “Ahorita”, lo tachas, escribes “Ahora.”', 'Sin texto.'],
  nota: 'Tachado extra: tu serie más fuerte (69K y 20K). Úsala si prefieres ir a lo seguro.' };
T('2026-10-21', 'A', 'Revisa tu tiempo de pantalla. No para sentir culpa. Para decidir.\nMándaselo a quien dice que no tiene tiempo.');
T('2026-10-21', 'B', 'Tres días malos de treinta no son un mes malo.\nEnvíaselo a quien tuvo una semana difícil.');
set('2026-10-22', 'A', { rec: true, cap: 'Cuenta los cuadrados antes del final.\nMándaselo a alguien y comparen cuántos vieron.' });
set('2026-10-22', 'B', { cap: 'Hay uno distinto.\nMándaselo a alguien que dice que nada se le escapa.', nota: 'Los jueves sube solo uno. Recomendado: el reel (A).' });
T('2026-10-23', 'A', 'Antes del correo. Antes del teléfono.\nLos dos fondos en historias. Mándaselo a quien empieza el día con el celular.');
T('2026-10-23', 'B', 'Dos palabras para cada vez que desbloqueas.\nEn historias. Mándaselo a quien necesita leerlo hoy.');
T('2026-10-24', 'A', 'Lo que aprendí liderando equipos.\nMándaselo a tu jefe. O a tu equipo.');
T('2026-10-24', 'B', 'Lo que más me enseña no está en ningún libro.\nMándaselo a un papá o una mamá que lo necesite.');
T('2026-10-25', 'A', 'Quejarte o decidir. Cuestan lo mismo.\nEnvíaselo a quien se queja todos los lunes.');
T('2026-10-25', 'B', 'Revisa tu tiempo de pantalla antes de decir que no tienes tiempo.\nMándaselo a quien vive con el celular en la mano.');
// semana 4
set('2026-10-26', 'A', { rec: true, cap: '“Debería” no tiene fecha.\nMándaselo a quien vive en “debería”.' });
T('2026-10-26', 'B', 'No falló. Lo intentaste.\nEnvíaselo a quien necesita leerlo hoy.');
set('2026-10-27', 'A', { v2: true, row: 9, cap: 'Hay una línea distinta.\nMándaselo a quien pide cinco minutos más cada mañana.' });
by('2026-10-27').B = { k: ['Lo veo', 'Lo hago.'], th: 'N', cap: '“Lo veo” casi siempre es no.\nMándaselo a quien todo “lo ve”.',
  st: [SHARE_ST, 'Historia 2: tapa “Lo hago.” con sticker de pregunta: “¿Qué tienes en ‘lo veo’?”'], pr: ['Graba 5 s tachando “Lo veo”.', 'Sin texto.'],
  nota: 'Si el 100 veces del 20 no pasó de 5K vistas, sube esta.' };
T('2026-10-28', 'A', 'No necesitas leer más rápido. Necesitas leer todos los días.\nMándaselo a quien tiene diez libros empezados.');
T('2026-10-28', 'B', 'Un día lleno no es un día que avanza.\nEnvíaselo a quien siempre está ocupado.');
set('2026-10-29', 'A', { rec: true, cap: 'Este video dura 7 segundos.\nMándaselo a alguien y mira si llega al final.' });
set('2026-10-29', 'B', { cap: 'Doble toque si ya lo hiciste.\nMándaselo a quien todavía no.', nota: 'Los jueves sube solo uno. Recomendado: el reel (A).' });
T('2026-10-30', 'A', 'Para todo noviembre. Los dos fondos en historias.\nMándaselo a quien empieza el mes con todo.');
T('2026-10-30', 'B', 'Un recordatorio cada vez que desbloqueas.\nEn historias. Mándaselo a quien tiene algo a medias.');
T('2026-10-31', 'A', 'Un mes publicando todos los días.\nGracias por compartir. ¿Qué serie te gustó más?');
T('2026-10-31', 'B', 'Lo que aprendí detrás de los controles.\nMándaselo a alguien con quien compartes música.');
T('2026-11-01', 'A', 'Tu idea en tu cabeza no ayuda a nadie.\nMándaselo a quien tiene algo guardado sin publicar.');
T('2026-11-01', 'B', 'Ni tu jefe. Ni tu familia. Ni el algoritmo.\nEnvíaselo a quien sigue esperando.');

// reels de 6 s para Tachado (hechos por Claude)
[['2026-10-19','A'],['2026-10-19','B'],['2026-10-20','B'],['2026-10-26','A'],['2026-10-26','B'],['2026-10-27','B']].forEach(([k,K]) => { by(k)[K].reel = 'c' + k.slice(5).replace('-', '') + '-' + K.toLowerCase() + '-reel.mp4'; });
// reciclaje del ganador
['2026-10-19', '2026-11-01'].forEach(k => { const e = by(k).extra; e.steps = [...e.steps, 'Sube la historia “Por si te lo perdiste” (abajo): recicla el Tachado del 5 oct, tu post más compartido.']; e.files = [...(e.files || []), 'st-reciclaje-1005.jpg']; });
// 14 oct: nuevas ecuaciones (Jay no estaba convencido)
by('2026-10-14').A = { e: 'manana', th: 'M', idx: 31, rec: true, cap: 'Ningún “mañana” suma.\nMándaselo a tu amigo del “mañana empiezo”.',
  st: ['Historia 1: comparte el post.', 'Historia 2: encuesta “¿Cuántos ‘mañana’ llevas esta semana?” 1 / Ya perdí la cuenta.'], pr: ['proceso'] };
by('2026-10-14').B = { e: 'cinco', th: 'M', idx: 5, cap: 'No necesitas una hora libre. Necesitas cinco minutos, todos los días.\nMándaselo a quien dice que no tiene tiempo.',
  st: ['Historia 1: comparte el post.', 'Historia 2: pregunta “¿Qué harías con 5 minutos al día?”'], pr: ['proceso'] };
// ── Ajustes desde el 20 oct (revisión semana 2) ──
// Jueves: la foto le ganó al reel → la foto es la recomendada
['2026-10-22', '2026-10-29'].forEach(k => { by(k).A.rec = false; by(k).B.rec = true; by(k).B.nota = 'Recomendada: la foto del truco del 15 oct hizo 32K vistas y 10 seguidores, más que el reel. El reel (A) queda como alternativa.'; by(k).A.nota = 'Alternativa. Esta semana la foto (B) rinde más.'; });
// Viernes: una frase fuerte en el feed; los fondos solo en historias
['2026-10-23', '2026-10-30'].forEach(k => ['A', 'B'].forEach(K => { const o = by(k)[K]; o.single = true;
  o.st = ['Historia 1: comparte el post.', 'Historia 2: el fondo de bloqueo a pantalla completa. Texto: “captura esta.”', 'Historia 3: el fondo de inicio. Texto: “y esta.”', 'Agrega las historias 2 y 3 a la destacada FONDOS.'];
  o.cap = o.cap.split('\n')[0] + '\nLos dos fondos para tu celular están en mis historias.'; }));
// Miércoles 28: la ecuación de reserva (lo que haces ÷ lo que dices) reemplaza a la de libros
by('2026-10-28').A = { e: 'haces', th: 'M', idx: 47, rec: true, cap: 'Al final, la cuenta siempre da lo mismo.\nMándaselo a quien promete mucho.',
  st: ['Historia 1: comparte el post.', 'Historia 2: encuesta “¿Qué pesa más en tu semana?” Lo que hago / Lo que digo.'], pr: ['proceso'] };
// Martes 20: destacadas pendientes
by('2026-10-20').extra = { title: 'Destacada PROCESO', why: 'Solo existen 2 de 5 destacadas. Hoy va PROCESO; mañana PREGUNTAS.',
  steps: ['Por la tarde, separadas del post: sube las 9 historias de PROCESO (abajo), en orden.', 'Crea la destacada PROCESO con ellas. Portada abajo.', 'Desde hoy, cada “Detrás del post” también va aquí.'],
  groups: by('2026-10-17').extra.groups, files: ['portada-proceso.jpg'] };
by('2026-10-21').extra = { title: 'Destacada PREGUNTAS', why: 'Abre la conversación que hoy no pasa en comentarios.',
  steps: ['Por la tarde: sube las 7 historias de PREGUNTAS (abajo), en orden. En la 07 pon el sticker de pregunta dentro del recuadro.', 'Crea la destacada PREGUNTAS. Portada abajo.', 'Cada domingo responde 2–3 preguntas con este diseño y agrégalas aquí.'],
  groups: by('2026-10-18').extra.groups, files: ['portada-preguntas.jpg'] };
// ── Semana 3 rehecha (pedido de Jay 19 oct): sin mezclar series ──
by('2026-10-20').A.nota = null; delete by('2026-10-20').A.rec;
by('2026-10-20').B = { c: ['NO ES EL MOMENTO.', 'ES EL MOMENTO YA.'], v2: true, row: 14, th: 'W', cap: 'Una sola línea dice la verdad.\nMándaselo a quien siempre espera el momento.',
  st: ['Historia 1: comparte el post.', 'Historia 2: quiz “¿En qué zona está la línea distinta?” Arriba / Centro / Abajo.'], pr: ['proceso'] };
by('2026-10-27').B = { c: ['YA LO HAGO DESPUÉS.', 'MEJOR LO HAGO AHORA'], v2: true, row: 6, th: 'W', cap: 'Una sola línea lo hizo.\nMándaselo a quien todo lo deja para después.',
  st: ['Historia 1: comparte el post.', 'Historia 2: encuesta “¿La encontraste?” Sí / Todavía no.'], pr: ['proceso'] };
by('2026-10-27').A.nota = null;
// miércoles 21: mismas ideas, más minimalistas
Object.assign(by('2026-10-21').A, { e: 'pantalla2', idx: 31 });
Object.assign(by('2026-10-21').B, { e: 'racha2', idx: 47, cap: 'Un mal día no es un mal mes.\nEnvíaselo a quien tuvo una semana difícil.' });
// jueves 22: trucos nuevos (foto), con mensaje
by('2026-10-22').A = { ts: 'dedo', th: 'N', rec: true, cap: 'Tápalo con el dedo.\nA veces lo único que sobra es una palabra.\nMándaselo a quien dice “no puedo” muy rápido.',
  st: ['Historia 1: comparte el post.', 'Historia 2: encuesta “¿Funcionó?” Sí / Ahora sí puedo.'], pr: ['proceso'] };
by('2026-10-22').B = { ts: 'sopa', th: 'W', cap: 'Hay 6 excusas y 1 acción.\nEscribe la acción en comentarios. Después, hazla.',
  st: ['Historia 1: comparte el post y escribe “¿la encontraste?”', 'Historia 2: pregunta “¿Cuál es tu excusa favorita?”'], pr: ['proceso'] };
// fondos: variedad (gradiente, letras, puntos, barra)
Object.assign(by('2026-10-23').A, { lockTh: 'M', lockIdx: 14, home: { k: 'texto', th: 'N', p: 'Primero lo importante.' } });
Object.assign(by('2026-10-23').B, { home: { k: 'puntos', th: 'N' } });
Object.assign(by('2026-10-30').A, { lockTh: 'M', lockIdx: 9, home: { k: 'texto', th: 'W', p: 'Sin prisa. Sin pausa.' } });
Object.assign(by('2026-10-30').B, { home: { k: 'barra', th: 'W' } });
// ── Sáb 24 y Dom 25 replanteados (más simples) ──
by('2026-10-24').A = { sl: [['3 cosas', 'que ya no hago.'], ['Contestar todo', 'al instante.'], ['Prometer sin revisar', 'mi agenda.'], ['Empezar algo nuevo', 'sin terminar lo anterior.'], ['simple.']], th: 'W',
  cap: 'Dejar de hacer también es avanzar.\nMándaselo a quien hace de todo y no termina nada.', st: ['Historia 1: comparte el post.', 'Historia 2: encuesta “¿Cuál te cuesta más dejar?” La 1 / La 2 / La 3.'], pr: ['proceso'] };
by('2026-10-24').B = { sl: [['3 preguntas', 'que me hago cada lunes.'], ['¿Qué es lo único', 'importante esta semana?'], ['¿Qué puedo', 'dejar de hacer?'], ['¿A quién tengo', 'que llamar?'], ['simple.']], th: 'W',
  cap: 'Tres preguntas, cinco minutos, toda la semana más clara.\nGuárdalo para el lunes.', st: ['Historia 1: comparte el post.', 'Historia 2: pregunta “¿Qué te preguntas tú cada lunes?”'], pr: ['proceso'] };
by('2026-10-25').A = { sf: 'lunes', th: 'N', t: '“Empiezo el lunes.” Lo dijiste hace 11 lunes', cap: 'El lunes no tiene nada especial. Hoy tampoco. Por eso sirve.\nMándaselo a quien empieza todos los lunes.',
  st: ['Historia 1: comparte el post.', 'Historia 2: encuesta “¿Cuántos lunes llevas con eso?” Pocos / Muchos.'], pr: ['proceso'] };
by('2026-10-25').B = { sf: 'calendario', th: 'W', t: 'Si no está en tu calendario, no te importa', cap: 'Lo que importa tiene hora. Lo demás es intención.\nMándaselo a quien dice que lo va a hacer “un día de estos”.',
  st: ['Historia 1: comparte el post.', 'Historia 2: pregunta “¿Qué vas a poner hoy en tu calendario?”'], pr: ['proceso'] };
delete by('2026-10-24').extra;
module.exports = D;
