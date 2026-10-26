# Arma la app: plantilla + estilos + plan (desde START para no pasar el límite de archivos del artifact)
import json,sys
START=sys.argv[1] if len(sys.argv)>1 else '2026-10-19'
C='/home/claude/campana/'
p=[d for d in json.load(open(C+'plan.json')) if d['date']>=START]
t=open(C+'camp.html').read().replace('/*CSS*/',open(C+'css.txt').read(),1).replace('/*PLAN*/[]',json.dumps(p,ensure_ascii=False),1)
open('/home/claude/plan-octubre/index.html','w').write(t); print(len(p),'días', p[0]['date'],'→',p[-1]['date'])
