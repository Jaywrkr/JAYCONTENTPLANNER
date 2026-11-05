# JAY CONTENT PLANNER

Sistema de contenido de @jaywrkr. Campaña 5 oct – 1 nov 2026.

## Abrir la app
`app/index.html`: un día en 4 columnas (Del día · Mañana · Tarde · Noche). Descargas, captions, historias y otras redes.

## Estructura
- `app/`: la app publicada y sus imágenes y videos (`app/c/`).
- `generador/`: scripts que dibujan cada post con código (Node + skia-canvas, ffmpeg).
  - `cdata.js` + `cdata2.js`: el contenido de los 28 días (opciones A/B, captions, historias).
  - `clib.js`: marcas de serie, plantillas y gráficos. `gen.js`: fondos (negro, blanco, mesh + grano).
  - `cbuild.js`: genera imágenes y `plan.json`. `kit.js`: historias. `merge.py` / `otras.py`: Shorts, Threads/X y LinkedIn.
- `plantilla/camp.html` + `css.txt`: plantilla de la app. `revision.html`: revisión semanal.
- `datos/`: plan y kits generados.

## Reconstruir
```
cd generador
node cbuild.js && node kit.js && python3 merge.py && python3 otras.py
```
Después se inserta `css.txt` y `plan.json` en `camp.html` (`/*CSS*/` y `/*PLAN*/[]`) para obtener `app/index.html`.
Las rutas de salida están fijadas en los scripts (`/home/claude/campana`): ajústalas a tu máquina.

## Reglas de diseño
1. Negro o blanco. 2. Una sola fuente (Geist Mono, nunca gruesa). 3. Solo ángulos rectos. 4. 70% vacío.
5. El texto nunca grita. 6. Todo se invierte. 7. Termina en "simple."

## Noviembre 2026 (ajustes)
- `generador/noviembre2/`: scripts en Python (Pillow) usados desde el 28 oct: fondos de celular rehechos (`fondo_lib.py`, `fondo.py`, `nov.py`), 100 veces nuevo formato (`cien.py`, `cien2.py`), día 30 (`make.py`, `tach.py`) y reels animados (`anim.py`, `anim30.py`).
- Cada día del 6 al 30 de noviembre tiene un paso "Reel · 19:00": el Short del día también sale como Reel en Instagram.
- `youtube/mes-octubre/`: video mensual "La IA revisa mi mes" (guion alineado, render, subtítulos, miniaturas). Los .mp4 no se suben al repo.
