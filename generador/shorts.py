# Genera Shorts 9:16 (8 s) desde el arte de cada opción, sin video propio
import json, subprocess, os
from PIL import Image
C='/home/claude/campana/c'; P=json.load(open('/home/claude/campana/plan.json'))
jobs=[]
for d in P:
  if d['date']<'2026-10-20': continue
  for k,o in d['opts'].items():
    if o.get('video'): continue
    out=f"c{d['date'][5:].replace('-','')}-{k.lower()}-short.mp4"
    jobs.append((o, out))
def bgcol(path):
  im=Image.open(path).convert('L'); v=im.getpixel((5,5)); return '0x%02x%02x%02x'%(v,v,v)
def run(o,out):
  dst=f"{C}/{out}"
  if o.get('wall'):  # fondo: el bloqueo ya es vertical
    src=f"{C}/{o['wall']['lock']}"
    vf="scale=1080:-2,crop=1080:1920,zoompan=z='1+0.0006*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=240:s=1080x1920:fps=30"
    cmd=['ffmpeg','-y','-loglevel','error','-loop','1','-i',src]
  elif len(o['files'])>1:  # carrusel: una slide cada 1.6 s
    lst=f"/tmp/claude-0/-home-claude/525290eb-24d3-57f0-908c-10012545278e/scratchpad/{out}.txt"
    with open(lst,'w') as f:
      for fn in o['files']: f.write(f"file '{C}/{fn}'\nduration 1.6\n")
      f.write(f"file '{C}/{o['files'][-1]}'\n")
    col=bgcol(f"{C}/{o['files'][0]}")
    vf=f"scale=1080:1350,pad=1080:1920:0:285:color={col},fps=30,format=yuv420p"
    cmd=['ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i',lst]
  else:
    src=f"{C}/{o['files'][0]}"; col=bgcol(src)
    vf=f"scale=1080:1350,pad=1080:1920:0:285:color={col},zoompan=z='1+0.0005*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=240:s=1080x1920:fps=30"
    cmd=['ffmpeg','-y','-loglevel','error','-loop','1','-i',src]
  cmd+=['-f','lavfi','-i','anullsrc=r=48000:cl=stereo','-t','8','-vf',vf,'-c:v','libx264','-pix_fmt','yuv420p','-b:v','1.6M','-maxrate','2M','-bufsize','4M','-c:a','aac','-shortest','-movflags','+faststart',dst]
  subprocess.run(cmd,check=True)
  subprocess.run(['ffmpeg','-y','-loglevel','error','-ss','0.5','-i',dst,'-frames:v','1','-vf','scale=540:-2','-q:v','4',dst.replace('.mp4','-poster.jpg')],check=True)
  return out
from concurrent.futures import ThreadPoolExecutor
with ThreadPoolExecutor(4) as ex: res=list(ex.map(lambda j: run(*j), jobs))
json.dump({o_out:1 for o_out in res},open('/home/claude/campana/shorts.json','w'))
print(len(res),'shorts')
