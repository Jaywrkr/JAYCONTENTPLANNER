# QA de imágenes: centrado del contenido (sin el marco de marca), márgenes y tamaño
import sys, json
from PIL import Image, ImageChops, ImageFilter
C='/home/claude/campana/c/'
def check(f, top=150, bot=160, side=80):
    im=Image.open(C+f).convert('L'); W,H=im.size; issues=[]
    if (W,H) not in [(1080,1350),(1290,2796),(1080,1920)]: issues.append(f'tamaño {W}x{H}')
    bgv=im.getpixel((W//2,top+5)); crop=im.crop((0,top,W,H-bot)).filter(ImageFilter.MedianFilter(5))
    diff=crop.point(lambda v: 255 if abs(v-bgv)>40 else 0); bb=diff.getbbox()
    if not bb: return f, ['sin contenido']
    x0,y0,x1,y1=bb; y0+=top; y1+=top
    cx=(x0+x1)/2-W/2; cy=(y0+y1)/2-H/2
    if abs(cx)>14: issues.append(f'descentrado horizontal {cx:+.0f}px')
    if abs(cy)>45: issues.append(f'descentrado vertical {cy:+.0f}px')
    if x0<side or x1>W-side: issues.append(f'contenido pegado al borde ({x0},{W-x1})')
    return f, issues
files=json.load(open(sys.argv[1]))
bad=0
for r in files:
    for f in r['files']:
        name,iss=check(f)
        if iss: bad+=1
        print(('✗ ' if iss else '✓ ')+name+('  · '+'; '.join(iss) if iss else ''))
print('fallas:',bad)
