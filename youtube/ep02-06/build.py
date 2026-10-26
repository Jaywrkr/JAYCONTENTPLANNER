# ep: alinea frases con palabras (faster-whisper), edita silencios, mezcla audio, timeline, srt y capítulos
import json, re, subprocess, difflib, sys
D = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/yt2/'
W = json.load(open(D + 'words.json'))
L = [l.rstrip('\n').split('|') for l in open(D + 'real.txt') if l.strip()]
norm = lambda s: re.sub(r'[^a-zñ0-9]', '', s.lower().translate(str.maketrans('áéíóúü', 'aeiouu')))
NUM = {'cinco': '5', 'dos': '2', 'diez': '10', 'nueve': '9', 'uno': '1', 'veinticinco': '25'}
tok = lambda s: [NUM.get(norm(w), norm(w)) for w in re.findall(r"[\wáéíóúñü¿?¡!]+", s) if norm(w)]
A = [NUM.get(norm(w[2]), norm(w[2])) for w in W]
B, owner = [], []
for i, l in enumerate(L):
    for t in tok(l[3]): B.append(t); owner.append(i)
sm = difflib.SequenceMatcher(None, A, B, autojunk=False)
m = {}
for a, b, n in sm.get_matching_blocks():
    for k in range(n): m[b + k] = a + k
ranges = []
for i in range(len(L)):
    idx = [m[j] for j in range(len(B)) if owner[j] == i and j in m]
    ranges.append((min(idx), max(idx)) if idx else None)
# huecos: interpola
for i, r in enumerate(ranges):
    if r is None: raise SystemExit(f'sin palabras: {L[i][3]}')
seg = [(W[a][0], W[b][1]) for a, b in ranges]
for i in range(len(seg) - 1):
    if seg[i][1] > seg[i + 1][0]: seg[i] = (seg[i][0], seg[i + 1][0])
cov = sum(1 for j in range(len(B)) if j in m) / len(B)
print('cobertura', round(cov, 3))
# edición: pausas entre frases > MAXG se recortan a GAP; antes 0.6 s
PRE, GAP, MAXG, PADE = .6, .55, .75, .12
parts, t, out = [], PRE, []
for i, (a, b) in enumerate(seg):
    a0 = max(0, a - .08); b0 = b + PADE
    nxt = seg[i + 1][0] - .08 if i + 1 < len(seg) else b0 + .3
    if nxt - b0 <= MAXG - PADE: b0 = nxt  # pausa natural corta: se queda
    parts.append((a0, b0)); dur = b0 - a0
    out.append(dict(sec=int(L[i][0]), sc=L[i][1], t=L[i][2], real=L[i][3], a0=round(a0, 3), b0=round(b0, 3), a=round(t + (a - a0), 3), b=round(t + (b - a0), 3)))
    t += dur + (GAP if parts[-1][1] != nxt else 0)
VD = t
fc = [f'anullsrc=r=48000:cl=mono,atrim=0:{PRE}[pre]']; cat = ['[pre]']
for i, (a, b) in enumerate(parts):
    fc.append(f'[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,pan=mono|c0=0.5*c0+0.5*c1,afade=t=in:d=0.02,afade=t=out:st={max(0, b - a - .04):.3f}:d=0.04[s{i}]'); cat.append(f'[s{i}]')
    if i + 1 < len(parts) and parts[i + 1][0] != b:
        fc.append(f'anullsrc=r=48000:cl=mono,atrim=0:{GAP}[g{i}]'); cat.append(f'[g{i}]')
fc.append(''.join(cat) + f'concat=n={len(cat)}:v=0:a=1[c]')
fc.append('[c]highpass=f=80,afftdn=nf=-30,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,loudnorm=I=-15:TP=-1.5:LRA=7,apad=pad_dur=8[out]')
open(D + 'fc_edit.txt', 'w').write(';\n'.join(fc))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', D + 'voz.m4a', '-filter_complex_script', D + 'fc_edit.txt', '-map', '[out]', '-ar', '48000', D + 'voz_edit.wav'], check=True)
DUR = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', D + 'voz_edit.wav'], capture_output=True, text=True).stdout)
# mezcla: clic por frase, soplo por sección, colchón grave
ticks = [l['a'] - .02 for l in out]; secs = [l['a'] - .35 for i, l in enumerate(out) if i and l['sec'] != out[i - 1]['sec']]
mf = [f'sine=f=1800:d=0.04,volume=0.06,afade=t=out:st=0.005:d=0.035,asplit={len(ticks)}' + ''.join(f'[t{i}]' for i in range(len(ticks))),
      f'anoisesrc=d=0.5:c=pink:a=0.4,highpass=f=600,lowpass=f=5000,afade=t=in:d=0.25,afade=t=out:st=0.25:d=0.25,volume=0.12,asplit={len(secs)}' + ''.join(f'[w{i}]' for i in range(len(secs)))]
mf += [f'[t{i}]adelay={int(x * 1000)}:all=1[T{i}]' for i, x in enumerate(ticks)] + [f'[w{i}]adelay={int(x * 1000)}:all=1[W{i}]' for i, x in enumerate(secs)]
mf.append(f"aevalsrc='0.05*sin(2*PI*110*t)+0.035*sin(2*PI*164.81*t)+0.025*sin(2*PI*220.5*t)+0.015*sin(2*PI*329.6*t)':s=48000:d={DUR:.2f},tremolo=f=0.15:d=0.5,lowpass=f=900,afade=t=in:d=4,afade=t=out:st={DUR - 5:.2f}:d=5,volume=0.5[pad]")
mf.append('[0:a]aformat=sample_rates=48000:channel_layouts=mono[v]')
mf.append('[v][pad]' + ''.join(f'[T{i}]' for i in range(len(ticks))) + ''.join(f'[W{i}]' for i in range(len(secs))) + f'amix=inputs={2 + len(ticks) + len(secs)}:normalize=0:duration=first,alimiter=limit=0.9[mix]')
open(D + 'fc_mix.txt', 'w').write(';\n'.join(mf))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', D + 'voz_edit.wav', '-filter_complex_script', D + 'fc_mix.txt', '-map', '[mix]', '-ar', '48000', D + 'mix.wav'], check=True)
json.dump(dict(lines=out, dur=round(DUR, 3)), open(D + 'timeline.json', 'w'), ensure_ascii=False)
# srt con lo que dijo (limpio)
ts = lambda x: f'{int(x // 3600):02d}:{int(x % 3600 // 60):02d}:{int(x % 60):02d},{int(round(x % 1 * 1000)) % 1000:03d}'
def clean(s): s = s.strip(); s = s[0].upper() + s[1:]; return s if s[-1] in '.?!' else s.rstrip(',') + '.'
srt = []
for i, l in enumerate(out):
    e = out[i + 1]['a'] - .05 if i + 1 < len(out) else l['b'] + 1.5
    srt.append(f'{i + 1}\n{ts(l["a"])} --> {ts(min(e, l["b"] + 1.2))}\n{clean(l["real"])}\n')
open(D + 'subtitulos.srt', 'w').write('\n'.join(srt))
fmt = lambda x: f'{int(x // 60)}:{int(x % 60):02d}'
print('voz', round(VD, 1), 's · total', round(DUR, 1), 's')
for i, l in enumerate(out):
    if i == 0 or l['sec'] != out[i - 1]['sec']: print('cap', l['sec'], fmt(0 if i == 0 else l['a'] - .4), l['t'])
print('fin', fmt(out[-1]['a']))
