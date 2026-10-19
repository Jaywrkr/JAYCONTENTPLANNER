import json
P=json.load(open('/home/claude/campana/plan.json')); K=json.load(open('/home/claude/campana/kit.json'))
for d in P:
  for k,o in d['opts'].items():
    kt=K.get(d['date']+k)
    if not kt: continue
    o['kit']={x:kt[x] for x in ('sticker','proceso') if x in kt}
    st=[]
    if d['serie']=='fondo': st=[s for s in o['st']]
    else: st=['Historia 1: comparte el post (avión → Agregar a tu historia) y escribe solo: “mándaselo a quien lo necesita.”']
    if 'sticker' in kt:
      it=kt['it']; st.append(f"Historia 2: sube la imagen “Sticker” (abajo) y pon encima el sticker de {it['k'].lower()}: “{it['q']}”" + (f" · opciones: {it['opts']}" if it['opts'] else '') + ('' if it['q'][-1] in '?!' and not it['opts'] else '.'))
    if d['serie']!='fondo': st += [s for s in o['st'] if s.startswith('A las 24 h') or 'Al día siguiente' in s or 'Mañana' in s or 'revela' in s.lower()]
    o['st']=st
    o['pr']=['Historia 3: sube “Detrás del post” (abajo, ya diseñada) y guárdala en la destacada PROCESO.'] if 'proceso' in kt else o['pr']
json.dump(P,open('/home/claude/campana/plan.json','w'))
print('ok')
# ── YouTube Shorts: mismo video, título y descripción propios ──
P=json.load(open('/home/claude/campana/plan.json'))
for d in P:
  if d['date']<'2026-10-19': continue
  for k,o in d['opts'].items():
    if not o.get('video'): continue
    first=o['cap'].split('\n')[0].strip()
    t=o['title'].replace('→','por')
    o['yt']={'title':(first if len(first)<=70 else t)[:90]+' #shorts',
             'desc':o['cap']+'\n\nUna verdad incómoda al día, diseñada simple.\n@jaywrkr en Instagram.\n\n#shorts #hábitos #disciplina #mentalidad',
             'music':'Al subir: agrega música de la biblioteca de YouTube (volumen bajo). Estos videos no traen sonido.'}
json.dump(P,open('/home/claude/campana/plan.json','w'))
print('yt ok')
