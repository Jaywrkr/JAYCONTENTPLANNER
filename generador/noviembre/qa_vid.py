# QA de Shorts: formato, duración, audio, contenido dentro de zonas seguras de TikTok/Shorts, cuadro final no vacío
import sys, subprocess, json, glob
from PIL import Image, ImageFilter
C='/home/claude/campana/c/'
def probe(f):
    r=json.loads(subprocess.run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',f],capture_output=True,text=True).stdout)
    v=[s for s in r['streams'] if s['codec_type']=='video'][0]; a=[s for s in r['streams'] if s['codec_type']=='audio']
    return int(v['width']),int(v['height']),float(r['format']['duration']),bool(a)
def maxvol(f):
    o=subprocess.run(['ffmpeg','-i',f,'-af','volumedetect','-f','null','-'],capture_output=True,text=True).stderr
    for l in o.splitlines():
        if 'max_volume' in l: return float(l.split(':')[1].split()[0])
    return -99
def frame(f,t):
    p='/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/qf.png'
    subprocess.run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',f,'-frames:v','1',p]); return Image.open(p).convert('L')
def bbox(im):
    W,H=im.size; bg=im.getpixel((W//2,300)); m=im.filter(ImageFilter.MedianFilter(5)).point(lambda v:255 if abs(v-bg)>45 else 0)
    # quitar marca (fila 230 y fila H-520)
    for y0,y1 in [(200,262),(H-552,H-488)]:
        m.paste(0,(0,y0,W,y1))
    return m.getbbox()
bad=0
for f in sorted(sys.argv[1:]):
    W,H,d,au=probe(f); iss=[]
    if (W,H)!=(1080,1920): iss.append(f'{W}x{H}')
    if not 6<=d<=20: iss.append(f'duración {d:.1f}s')
    if not au: iss.append('sin audio')
    elif maxvol(f)<-35: iss.append('audio inaudible')
    for t in [d*0.3, d*0.6, d-0.6]:
        b=bbox(frame(f,t))
        if not b: iss.append(f'cuadro vacío en {t:.1f}s'); continue
        x0,y0,x1,y1=b
        if x0<60 or x1>W-130 or y0<270 or y1>H-470: iss.append(f'fuera de zona segura en {t:.1f}s {b}')
    last=bbox(frame(f,d-0.6))
    if last and abs((last[0]+last[2])/2-W/2)>40: iss.append('final descentrado')
    bad+=bool(iss); print(('✗ ' if iss else '✓ ')+f.split('/')[-1]+('  · '+'; '.join(iss) if iss else ''))
print('fallas:',bad)
