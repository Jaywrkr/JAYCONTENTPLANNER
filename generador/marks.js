const { render, T } = require('./gen.js');
const { Canvas } = require('skia-canvas');
const fs=require('fs'); const OUTD='/home/claude/series-demo'; fs.mkdirSync(OUTD,{recursive:true});
const F='"Geist Mono", monospace';
const g=v=>{const c=Math.round(Math.max(0,Math.min(1,v))*255);return `rgb(${c},${c},${c})`;};
function txt(o,s,x,y,size=36,a=1,al='center',w=300){o.font=`${w} ${size}px ${F}`;o.fillStyle=g(a);o.textAlign=al;o.textBaseline='middle';o.fillText(s,x,y);return o.measureText(s).width;}
const R=(o,x,y,w,h,a=1)=>{o.fillStyle=g(a);o.fillRect(x,y,w,h);};
const B=(o,x,y,w,h,a=1,lw=1.5)=>{o.strokeStyle=g(a);o.lineWidth=lw;o.strokeRect(x,y,w,h);};
// marcas: caja 28x28 con origen arriba-izquierda
const MARK={
 tachado:(o,x,y,s)=>{B(o,x,y,s,s);R(o,x-4,y+s/2-0.75,s+8,1.5);},
 cien:(o,x,y,s)=>{const c=s/5;for(let i=0;i<3;i++)for(let j=0;j<3;j++)R(o,x+i*2*c,y+j*2*c,c,c);},
 ecuacion:(o,x,y,s)=>{R(o,x,y+s/2-0.75,s,1.5);R(o,x+s/2-0.75,y,1.5,s);},
 truco:(o,x,y,s)=>{B(o,x,y,s,s);R(o,x+s/2-3,y+s/2-3,6,6);},
 fondo:(o,x,y,s)=>{const w=s*0.56;B(o,x+(s-w)/2,y,w,s);R(o,x+(s-w)/2+w*0.3,y+4,w*0.4,1.5);},
 semana:(o,x,y,s)=>{const c=s/9;for(let i=0;i<5;i++)(i===0?R:B)(o,x+i*2*c,y+s*0.2,c,s*0.6,1,1.2);},
 sinfiltro:(o,x,y,s)=>{R(o,x,y,s,s);},
};
function chrome(o,W,H,serie,n,mk){txt(o,'@jaywrkr',90,90,20,0.6,'left',400);txt(o,serie.toUpperCase()+'  Nº '+n,W-90,90,20,0.6,'right',400);txt(o,'simple.',W-90,H-90,20,0.45,'right',400);MARK[mk](o,90,H-104,28);}
const P=[
 ['N','tachado','Tachado','01',(o,W,H)=>{o.font=`300 36px ${F}`;const a=o.measureText('Excusa').width,gap=o.measureText(' ').width*1.5,b=o.measureText('Decisión.').width,x0=W/2-(a+gap+b)/2;txt(o,'Excusa',x0,H/2,36,0.4,'left');R(o,x0-6,H/2-0.75,a+12,1.5,0.75);txt(o,'Decisión.',x0+a+gap,H/2,36,1,'left');}],
 ['W','cien','100 veces','01',(o,W,H)=>{const P='NADIE VIENE A SALVARTE.';o.font=`300 15px ${F}`;const cw=o.measureText('M').width,cols=Math.floor((W-180)/cw),rows=Math.floor((H-260)/25),y0=(H-(rows-1)*25)/2,ws=P.split(' ');let wi=0;for(let i=0;i<rows;i++){let s='';while(true){const w=ws[wi%ws.length];if((s?s.length+1:0)+w.length>cols)break;s+=(s?' ':'')+w;wi++;}if(i===Math.floor(rows/2))s=s.replace('NADIE VIENE A SALVARTE.','NADIE VIENE. SÁLVATE TÚ');txt(o,s,90,y0+i*25,15,0.55,'left');}}],
 ['M','ecuacion','Ecuación','01',(o,W,H)=>{txt(o,'1% al día.',W/2,H/2-200,36,1);const y=H/2+40;R(o,250,y-4,8,8);R(o,280,y-0.75,300,1.5,0.6);R(o,580,y-6,1.5,12,0.6);{const n=12,c=8,gp=(180-n*c)/(n-1);for(let i=0;i<n;i++)for(let j=0;j<n;j++)R(o,640+i*(c+gp),y-90+j*(c+gp),c,c);}txt(o,'hoy',254,y+60,20,0.6,'center',400);txt(o,'en un año',730,y+130,20,0.6,'center',400);txt(o,'× 365',430,y-30,20,0.6,'center',400);}],
 ['N','truco','Truco','01',(o,W,H)=>{txt(o,'00:00:03',W-90,124,20,0.45,'right',400);txt(o,'Haz captura ahora.',W/2,H/2-150,36,1);const s=60;for(let i=0;i<3;i++)for(let j=0;j<3;j++)B(o,W/2-s*1.5+i*s,H/2-60+j*s,s,s,0.8);R(o,W/2-4,H/2+26,8,8);for(let k=0;k<36;k++)R(o,90+k*25,H-180,1.5,k%8?8:16,0.5);}],
 ['W','fondo','Fondo','01',(o,W,H)=>{txt(o,'Hazlo aunque',W/2,H/2-28,36,1);txt(o,'nadie aplauda.',W/2,H/2+30,56,1);}],
 ['W','semana','Semana','01',(o,W,H)=>{txt(o,'01 / 05',W-90,124,20,0.45,'right',400);txt(o,'Esta semana',W/2,H/2-28,36,1);txt(o,'aprendí 5 cosas.',W/2,H/2+30,36,1);}],
 ['M','sinfiltro','Sin filtro','01',(o,W,H)=>{txt(o,'Nadie te debe',W/2,H/2-32,36,1);txt(o,'motivación.',W/2,H/2+32,56,1);}],
];
(async()=>{let i=3;for(const [th,mk,serie,n,fn] of P){const idx=mk==='sinfiltro'?+process.argv[2]||8:i;i++;await render(1080,1350,th,idx,(o,W,H)=>{chrome(o,W,H,serie,n,mk);fn(o,W,H);},`demo-${mk}.jpg`);}
 // leyenda de marcas
 const W=1400,H=520,c=new Canvas(W,H),o=c.getContext('2d');o.fillStyle='#fafafa';o.fillRect(0,0,W,H);
 const names=[['tachado','LUN','Tachado'],['cien','MAR','100 veces'],['ecuacion','MIÉ','Ecuación'],['truco','JUE','Truco'],['fondo','VIE','Fondo'],['semana','SÁB','Semana'],['sinfiltro','DOM','Sin filtro']];
 const gi=v=>{const c=Math.round((1-v)*250);return `rgb(${c},${c},${c})`;};
 const o2={...o};
 names.forEach(([k,d,nm],i)=>{const x=100+i*180;const ov=new Canvas(120,120),q=ov.getContext('2d');q.fillStyle='#000';q.fillRect(0,0,120,120);MARK[k](q,30,30,60);
   o.save();o.globalCompositeOperation='multiply';o.filter='invert(1)';o.drawImage(ov,x,160);o.restore();
   o.font=`400 18px ${F}`;o.fillStyle='#7a7a7a';o.textAlign='center';o.fillText(d,x+60,120);o.font=`300 22px ${F}`;o.fillStyle='#0a0a0a';o.fillText(nm,x+60,340);});
 o.font=`400 16px ${F}`;o.fillStyle='#7a7a7a';o.textAlign='left';o.fillText('@JAYWRKR · MARCAS DE SERIE · 28 PX EN LA ESQUINA INFERIOR IZQUIERDA',100,450);
 await c.toFile(OUTD+'/marcas.png');
})();
