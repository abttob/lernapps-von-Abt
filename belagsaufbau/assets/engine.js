
const $=s=>document.querySelector(s);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const rnd=(a)=>a[Math.floor(Math.random()*a.length)];
let C=CFG;const KEY='belag:'+CFG.slug;
function save(p){}
const root=$('#app');
var HOOK=null;
function finish(score,total,extra){
 if(HOOK){return HOOK(score,total)}
 const p=Math.round(100*score/total);save(p);
 root.innerHTML=`<div class="card res"><div class="big">${score} / ${total}</div><p>${p>=80?'Sehr gut! 🎉':p>=60?'Gut, noch etwas üben 💪':'Schau dir die Erklärungen nochmals an 📖'}</p>${extra||''}<button class="btn" onclick="start()">Nochmals versuchen</button><button class="btn sec" onclick="location.href='../'">← Zurück zur Übersicht</button></div>`;
}
const H=window.HILFE||{bar:()=>'',wire:()=>({lock(){},reset(){}}),info(){}};
function BG(x){return (x&&x.bg)||C.bg||null}
function hs(h){return h?(Array.isArray(h)?h:[h]):[]}
function pb(i,n){return `<div class="bar"><i style="width:${100*i/n}%"></i></div><small>${Math.min(i+1,n)} von ${n}</small>`}

/* ---------- QUIZ ---------- */
function quiz(){
 const qs=shuffle(C.questions).slice(0,C.count||C.questions.length);let i=0,score=0;
 function show(){
  if(i>=qs.length)return finish(score,qs.length);
  const q=qs[i];const idx=shuffle(q.opts.map((_,k)=>k));
  root.innerHTML=`<div class="card">${pb(i,qs.length)}${q.img?`<img class="img" src="${q.img}" alt="Abbildung">`:''}<div class="q">${q.q}</div>${H.bar()}<div id="o"></div><div id="w"></div></div>`;
  const elim=()=>{const wrong=shuffle([...document.querySelectorAll('#o .opt')].filter(x=>+x.dataset.k!==q.a&&!x.classList.contains('gone')));const m=q.opts.length-2;wrong.slice(0,Math.min(m,wrong.length-1)).forEach(x=>{x.classList.add('gone');x.disabled=true});return q.opts.length>2?'Ich habe falsche Antworten durchgestrichen. Eine der übrigen ist richtig.':''};
  const hc=H.wire(root,{tips:hs(q.h).concat(q.opts.length>2?[elim]:[]),bg:BG(q)});
  let n_=0;idx.forEach(k=>{const b=document.createElement('button');b.className='opt';b.dataset.k=k;b.innerHTML=`<span class="k">${'ABCDEFG'[n_++]}</span><span>${q.opts[k]}</span>`;b.onclick=()=>{
    document.querySelectorAll('.opt').forEach(x=>x.disabled=true);hc.lock();
    const ok=k===q.a;if(ok)score++;b.classList.add(ok?'ok':'no');
    document.querySelectorAll('.opt').forEach((x,n)=>{if(idx[n]===q.a)x.classList.add('ok')});
    $('#w').innerHTML=`<div class="why">${ok?'✅ Richtig. ':'❌ Nicht ganz. '}${q.why||''}</div><button class="btn" id="nx">${i+1<qs.length?'Weiter →':'Resultat'}</button>`;
    $('#nx').onclick=()=>{i++;show()}};$('#o').append(b)});
 }show();
}

/* ---------- MATCH ---------- */
function match(){
 const pairs=C.pairs;let L=shuffle(pairs.map((p,k)=>({t:p[0],k}))),R=shuffle(pairs.map((p,k)=>({t:p[1],k})));
 let sel=null,errors=0,found=0;
 root.innerHTML=`<div class="card"><div class="q">${C.task||'Ordne zu: Tippe links einen Begriff an, dann rechts den passenden.'}</div>${H.bar()}<div class="cols"><div id="l"></div><div id="r"></div></div><p id="s"></p></div>`;
 const mk=(arr,host,side)=>arr.forEach(o=>{const b=document.createElement('button');b.className='m';b.innerHTML=o.t;b.dataset.k=o.k;b.dataset.side=side;b.style.marginBottom='.5rem';b.style.width='100%';
  b.onclick=()=>{if(b.classList.contains('done'))return;
   if(side==='l'){document.querySelectorAll('#l .m').forEach(x=>x.classList.remove('sel'));document.querySelectorAll('.m.hint').forEach(x=>x.classList.remove('hint'));b.classList.add('sel');sel=b;hc.reset(mtips());return}
   if(!sel){$('#s').textContent='Wähle zuerst links einen Begriff.';return}
   if(sel.dataset.k===b.dataset.k){document.querySelectorAll('.m.hint').forEach(x=>x.classList.remove('hint'));hc.reset(mtips(true));sel.classList.remove('sel');sel.classList.add('done');b.classList.add('done');sel=null;found++;$('#s').textContent=`${found} von ${pairs.length} gefunden`;
     if(found===pairs.length)setTimeout(()=>finish(Math.max(0,pairs.length-errors),pairs.length,`<p>Fehlversuche: ${errors}</p>`),400)}
   else{errors++;b.classList.add('bad');setTimeout(()=>b.classList.remove('bad'),600);$('#s').textContent='Das passt nicht. Fehlversuche: '+errors}}
  $(host).append(b)});
 const mtips=none=>{const t=hs(C.h).slice();if(none||!sel){t.push(()=>'Tippe zuerst links einen Begriff an. Dann gibt es Tipps zu diesem Begriff.');return t}
  const k=sel.dataset.k,open=[...document.querySelectorAll('#r .m')].filter(x=>!x.classList.contains('done'));const good=open.find(x=>x.dataset.k===k);
  t.push(()=>{const other=shuffle(open.filter(x=>x!==good))[0];[good,other].filter(Boolean).forEach(x=>x.classList.add('hint'));return other?'Eines der zwei gelb markierten Felder rechts passt.':'Das gelb markierte Feld passt.'});
  t.push(()=>{document.querySelectorAll('.m.hint').forEach(x=>x.classList.remove('hint'));good.classList.add('hint');return 'Das gelb markierte Feld rechts passt zu deinem Begriff.'});return t};
 const hc=H.wire(root,{tips:[],bg:BG()});hc.reset(mtips(true));
 mk(L,'#l','l');mk(R,'#r','r');
}

/* ---------- ORDER ---------- */
function order(){
 let cur=shuffle(C.items.map((t,k)=>({t,k})));
 root.innerHTML=`<div class="card"><div class="q">${C.task}</div>${H.bar()}<small>${C.top||''}</small><div id="list"></div><small>${C.bottom||''}</small><button class="btn" id="chk">Prüfen</button><div id="fb"></div></div>`;
 let tries=0;
 function draw(res){const h=$('#list');h.innerHTML='';cur.forEach((o,n)=>{const d=document.createElement('div');d.className='ord'+(res?(o.k===n?' ok':' no'):'');
  d.innerHTML=`<span>${o.t}</span>`;const u=document.createElement('button');u.textContent='↑';u.onclick=()=>{if(n>0){[cur[n-1],cur[n]]=[cur[n],cur[n-1]];draw()}};
  const dn=document.createElement('button');dn.textContent='↓';dn.onclick=()=>{if(n<cur.length-1){[cur[n+1],cur[n]]=[cur[n],cur[n+1]];draw()}};d.append(u,dn);h.append(d)})}
 draw();
 const put=(k,pos)=>{const j=cur.findIndex(o=>o.k===k);const [o]=cur.splice(j,1);cur.splice(pos,0,o);draw()};const N=cur.length;
 const hc=H.wire(root,{bg:BG(),tips:hs(C.h).concat([()=>{put(0,0);return `Zuoberst kommt: <b>${C.items[0]}</b>. Ich habe es nach oben geschoben.`},()=>{put(N-1,N-1);return `Zuunterst kommt: <b>${C.items[N-1]}</b>. Ich habe es nach unten geschoben.`},()=>{const m=Math.floor((N-1)/2);put(m,m);return `An Position ${m+1} gehört: <b>${C.items[m]}</b>.`}])});
 $('#chk').onclick=()=>{tries++;draw(true);const ok=cur.filter((o,n)=>o.k===n).length;
  if(ok===cur.length){hc.lock();$('#fb').innerHTML=`<div class="why">✅ Alles richtig! ${C.why||''}</div><button class="btn" id="d">Fertig</button>`;$('#d').onclick=()=>finish(Math.max(1,cur.length-(tries-1)),cur.length)}
  else $('#fb').innerHTML=`<div class="why">${ok} von ${cur.length} an der richtigen Stelle. Grün = richtig, rot = falsch. Verschiebe und prüfe erneut.</div>`}
}

/* ---------- CALC ---------- */
const TAB={ZP:[30,20,10],T1:[50,30,20],T2:[60,35,25],T3:[60,35,25]};
const GENS={
 fund(){const k=rnd(['ZP','T1','T2','T3']),s=rnd([1,2,3]);return{q:`Verkehrslastklasse <b>${k}</b>, Untergrund <b>S${s}</b>: Welche Mindeststärke hat die Fundation (in cm)?`,a:TAB[k][s-1],u:'cm',tol:0,h:[`Suche in der Tabelle die Zeile <b>${k}</b> und die Spalte <b>S${s}</b>.`,`Merke: S1 = schlechter Untergrund = dickste Fundation. Zeile ${k}: ${TAB[k].join(' / ')} cm für S1 / S2 / S3.`],why:`Tabelle J5: ${k} / S${s} = ${TAB[k][s-1]} cm.`}},
 bankett(){const F=rnd([20,25,30,35,40]);const t=rnd([0,1,2]);
  if(t==0)return{q:`Fundationsstärke F = <b>${F} cm</b>. Wie breit ist das Bankett (in cm)?`,a:F/2,u:'cm',tol:0,h:['Das Bankett ist halb so breit wie die Fundation dick ist.',`F/2 = ${F} ÷ 2`],why:`Bankett = F/2 = ${F/2} cm.`};
  if(t==1)return{q:`F = <b>${F} cm</b>. Wie breit ist die Böschung (Böschung 2:3, Höhe = F) in cm?`,a:1.5*F,u:'cm',tol:0,h:['Böschung 2:3 heisst: 2 hoch, 3 breit. Die Breite ist also 1.5-mal die Höhe.',`Höhe = F = ${F} cm → ${F} × 1.5`],why:`Breite = 1.5 × F = ${1.5*F} cm.`};
  return{q:`F = <b>${F} cm</b>. Wie weit liegt das Planum neben dem Belagsrand (in cm)?`,a:2*F,u:'cm',tol:0,h:['Neben dem Belagsrand liegen zuerst das Bankett (F/2) und dann die Böschung (1.5 × F).',`F/2 + 1.5 × F = 2 × F = 2 × ${F}`],why:`F/2 + 1.5 × F = 2 × F = ${2*F} cm.`}},
 festlose(){const A=rnd([12,16.8,20,25.6,18,30]),d=rnd([0.2,0.25,0.3]);const fest=A*d;
  if(Math.random()<.7)return{q:`Fläche <b>${A} m²</b>, Fundation <b>${d*100} cm</b> (fest). Wie viel Kiesgemisch musst du <b>lose</b> bestellen (m³)?`,a:Math.round(fest*1.25*100)/100,u:'m³',tol:0.05,h:['Zuerst das feste Volumen: Fläche × Dicke (in m!). Dann mal 1.25, weil loses Material mehr Platz braucht.',`${d*100} cm = ${d} m. Fest: ${A} × ${d} = ${fest.toFixed(2)} m³. Jetzt noch × 1.25.`],why:`${A} × ${d} = ${fest.toFixed(2)} m³ fest × 1.25 = ${(fest*1.25).toFixed(2)} m³ lose.`};
  const L=Math.round(fest*1.25*100)/100;return{q:`Geliefert wurden <b>${L} m³ lose</b>. Wie viel m³ sind das <b>fest</b> (verdichtet)?`,a:Math.round(L*0.8*100)/100,u:'m³',tol:0.05,h:['Von lose zu fest wird es weniger: Teile durch 1.25 oder rechne mal 0.8.',`${L} × 0.8 = ?`],why:`${L} × 0.80 = ${(L*0.8).toFixed(2)} m³ fest.`}},
 keil(){const L=rnd([8,12,16,20,24,30]),k=rnd([['ZP',12],['T1',20]]);return{q:`Einfassung mit Betonkeil, Klasse <b>${k[0]}</b>, Länge <b>${L} m</b>. Wie viele <b>Liter</b> Beton brauchst du? (ZP: 12 l/m, T1: 20 l/m)`,a:L*k[1],u:'Liter',tol:0,h:['Länge in m mal Liter pro Meter.',`${L} × ${k[1]} = ?`],why:`${L} m × ${k[1]} l/m = ${L*k[1]} Liter.`}},
 einfass(){const s=rnd([['Naturstein-Pflasterstein 6/8',45,60],['Naturstein-Pflasterstein 8/11',50,70],['Naturstein-Pflasterstein 11/13',60,80],['Schalen-/Binderstein 10',50,75]]);const L=rnd([10,12,18,20,30]),z=rnd([1,2]);
  return{q:`Einfassung mit <b>${s[0]}</b>, <b>${z==1?'einreihig':'zweireihig'}</b>, Länge <b>${L} m</b>. Wie viel Beton in <b>Litern</b>? (einreihig ${s[1]} l/m, zweireihig ${s[2]} l/m)`,a:L*s[z],u:'Liter',tol:0,h:[`Nimm den Wert für <b>${z==1?'einreihig':'zweireihig'}</b> aus der Aufgabe.`,`${s[z]} l/m × ${L} m = ?`],why:`${L} × ${s[z]} = ${L*s[z]} Liter (= ${(L*s[z]/1000).toFixed(3)} m³).`}},
 fundlose(){const L=rnd([10,12,14,18,20]),B=rnd([1.0,1.2,1.5,2.0]),k=rnd(['ZP','T1','T2']),s=rnd([1,2,3]);const F=TAB[k][s-1];const fest=L*B*F/100;
  return{q:`Weg <b>${L} m × ${B} m</b>, Klasse <b>${k}</b>, Untergrund <b>S${s}</b>. Wie viel Kiesgemisch bestellst du <b>lose</b> für die Fundation (m³, ohne Bankett)?`,a:Math.round(fest*1.25*100)/100,u:'m³',tol:0.05,h:[`Schritt 1: Fundationsstärke aus der Tabelle (${k} / S${s}). Schritt 2: Länge × Breite × F (in m). Schritt 3: × 1.25.`,`F = ${F} cm = ${F/100} m. Fest: ${L} × ${B} × ${F/100} = ${fest.toFixed(2)} m³. Jetzt × 1.25.`],why:`F = ${F} cm. ${L} × ${B} × ${F/100} = ${fest.toFixed(2)} m³ fest × 1.25 = ${(fest*1.25).toFixed(2)} m³ lose.`}},
 planumbreite(){const B=rnd([1.0,1.2,1.5,2.5,3.2]),k=rnd(['ZP','T1','T2']),s=rnd([1,2,3]);const F=TAB[k][s-1];
  return{q:`Belagsbreite <b>${B} m</b>, Klasse <b>${k}</b>, Untergrund <b>S${s}</b>. Wie breit muss das Planum sein, wenn der Weg auf <b>beiden Seiten</b> frei liegt (m)?`,a:Math.round((B+4*F/100)*100)/100,u:'m',tol:0.01,h:[`Auf jeder Seite kommt 2 × F dazu (Bankett F/2 + Böschung 1.5 × F). F aus der Tabelle: ${k} / S${s}.`,`F = ${F} cm = ${F/100} m. Pro Seite 2 × ${F/100} = ${2*F/100} m. Breite = ${B} + 2 × ${2*F/100}`],why:`F = ${F} cm. Planum = Belag + 2 × (2 × F) = ${B} + 4 × ${F/100} = ${(B+4*F/100).toFixed(2)} m.`}},
 fahrten(){const A=rnd([20,25.6,30,45,60]),k=rnd(['ZP','T1','T2']),s=rnd([1,2]);const F=TAB[k][s-1];const lose=A*F/100*1.25;
  return{q:`Platz <b>${A} m²</b>, Klasse <b>${k}</b>, Untergrund <b>S${s}</b>. Ein Lastwagen fasst <b>10 m³</b>. Wie viele Fahrten Kiesgemisch (lose) brauchst du mindestens?`,a:Math.ceil(lose/10-1e-9),u:'Fahrten',tol:0,h:[`Fundationsstärke aus der Tabelle (${k} / S${s}), dann fest → lose (× 1.25), dann ÷ 10 m³. Immer aufrunden!`,`F = ${F} cm. Lose: ${A} × ${F/100} × 1.25 = ${lose.toFixed(2)} m³. Jetzt ÷ 10 und aufrunden.`],why:`F = ${F} cm → ${A} × ${F/100} = ${(A*F/100).toFixed(2)} m³ fest × 1.25 = ${lose.toFixed(2)} m³ lose ÷ 10 = ${(lose/10).toFixed(2)} → aufrunden: ${Math.ceil(lose/10-1e-9)}.`}},
 bettung(){const A=rnd([8,12,16.8,20,25.6]),d=rnd([3,4,5]);return{q:`Bettungsschicht aus Splitt, <b>${d} cm</b> stark, auf <b>${A} m²</b>. Wie viele <b>Liter</b> Splitt brauchst du (fest)?`,a:Math.round(A*d*10*10)/10,u:'Liter',tol:0.5,h:['Merke: 1 m² × 1 cm Dicke = 10 Liter.',`${A} m² × ${d} cm × 10 = ?`],why:`${A} m² × ${d} cm = ${A*d} m²·cm; 1 m² × 1 cm = 10 Liter → ${A*d*10} Liter.`}},
 keil2(){const k=rnd([['ZP',12],['T1',20],['T2',30]]),L=rnd([6,9,12,15,24]);const z=rnd([0,10]);
  return{q:`Betonkeil für Klasse <b>${k[0]}</b> (${k[0]=='ZP'?'12':k[0]=='T1'?'20':'30'} l/m), Länge <b>${L} m</b>${z?', dazu <b>10 % Reserve</b>':''}. Wie viele <b>Liter</b> Beton bestellst du?`,a:Math.round(L*k[1]*(1+z/100)*10)/10,u:'Liter',tol:0.5,h:[z?'Zuerst Länge × l/m, dann 10 % dazu (× 1.1).':'Länge in m mal Liter pro Meter.',`${L} × ${k[1]} = ${L*k[1]} Liter${z?', jetzt × 1.1':''}`],why:`${L} × ${k[1]} = ${L*k[1]} Liter${z?`, plus 10 % = ${(L*k[1]*1.1).toFixed(1)} Liter`:''}.`}},
 platten(){const A=rnd([12,16.8,20,25.6]),p=rnd([5,10]),pl=rnd([[0.5,0.5],[0.4,0.4],[0.6,0.4]]);const n=Math.ceil(A*(1+p/100)/(pl[0]*pl[1])-1e-9);
  return{q:`Fläche <b>${A} m²</b> mit Platten <b>${pl[0]*100}/${pl[1]*100} cm</b>, Verschnitt <b>${p} %</b>. Wie viele Platten bestellst du (aufrunden)?`,a:n,u:'Platten',tol:0,h:[`Schritt 1: Fläche + ${p} % Verschnitt. Schritt 2: Fläche einer Platte in m². Schritt 3: teilen und auf ganze Platten aufrunden.`,`${A} × ${(1+p/100).toFixed(2)} = ${(A*(1+p/100)).toFixed(2)} m². Eine Platte: ${pl[0]} × ${pl[1]} = ${(pl[0]*pl[1]).toFixed(2)} m².`],why:`${A} × ${(1+p/100).toFixed(2)} = ${(A*(1+p/100)).toFixed(2)} m² ÷ ${(pl[0]*pl[1]).toFixed(2)} m² = ${(A*(1+p/100)/(pl[0]*pl[1])).toFixed(2)} → aufrunden auf ganze Platten: ${n} Platten.`}},
 gewicht(){const V=rnd([6.25,8,10,12.5]);return{q:`Du bestellst <b>${V} m³ Kiesgemisch lose</b> (1.71 t pro m³ lose). Wie schwer ist die Ladung (in t)?`,a:Math.round(V*1.71*100)/100,u:'t',tol:0.05,h:['Volumen mal Gewicht pro m³.',`${V} × 1.71 = ?`],why:`${V} × 1.71 = ${(V*1.71).toFixed(2)} t.`}},
 verschnitt(){const A=rnd([16.8,20,25.6,12,30]),p=rnd([5,10,15,25]);return{q:`Belagsfläche <b>${A} m²</b>, Verschnitt-Zuschlag <b>${p} %</b>. Wie gross ist die Bestellfläche (m²)?`,a:Math.round(A*(1+p/100)*100)/100,u:'m²',tol:0.05,h:[`${p} % dazu heisst: mal ${(1+p/100).toFixed(2)}.`,`${A} × ${(1+p/100).toFixed(2)} = ?`],why:`${A} × ${(1+p/100).toFixed(2)} = ${(A*(1+p/100)).toFixed(2)} m².`}},
 gefaelle(){const L=rnd([4,5,6,8,10,14]),g=rnd([1.5,2,2.5]);return{q:`Weg <b>${L} m</b> lang mit <b>${g} %</b> Gefälle. Wie gross ist der Höhenunterschied (in cm)?`,a:Math.round(L*g*10)/10,u:'cm',tol:0.1,h:['1 % Gefälle = 1 cm Höhenunterschied pro Meter.',`${g} cm pro m × ${L} m = ?`],why:`${g} % = ${g} cm pro m → ${L} × ${g} = ${L*g} cm.`}},
 einheiten(){const t=rnd([0,1,2,3,4,5]);
  const L=[()=>{const v=rnd([25,6.5,45,120,80]);return{q:`${v} cm = ? m`,a:v/100,u:'m',why:`${v} ÷ 100 = ${v/100} m.`}},
   ()=>{const v=rnd([20,35,85,350]);return{q:`${v} Liter = ? m³`,a:v/1000,u:'m³',why:`${v} ÷ 1000 = ${v/1000} m³.`}},
   ()=>{const v=rnd([0.35,0.085,1.8,0.02]);return{q:`${v} m³ = ? Liter`,a:Math.round(v*1000),u:'Liter',why:`${v} × 1000 = ${Math.round(v*1000)} Liter.`}},
   ()=>{const v=rnd([3,8,50,12]);return{q:`${v} mm = ? cm`,a:v/10,u:'cm',why:`${v} ÷ 10 = ${v/10} cm.`}},
   ()=>{const v=rnd([0.25,16.8,2]);return{q:`${v} m² = ? cm²`,a:Math.round(v*10000),u:'cm²',why:`${v} × 10 000 = ${Math.round(v*10000)} cm².`}},
   ()=>{const v=rnd([1.2,0.45,2.5]);return{q:`${v} m = ? mm`,a:Math.round(v*1000),u:'mm',why:`${v} × 1000 = ${Math.round(v*1000)} mm.`}}][t]();
  return Object.assign({tol:0.0001,h:['Grössere Einheit → kleinere: malnehmen. Kleinere → grössere: teilen.','m→cm ×100 · m→mm ×1000 · cm→mm ×10 · m³→Liter ×1000 · m²→cm² ×10 000']},L)},
 gefaelle2(){const L=rnd([4,5,6,8,10]),g=rnd([1.5,2,2.5,3]);const h=Math.round(L*g*10)/10;return{q:`Ein Weg ist <b>${L} m</b> lang. Der Belagsrand am Ende liegt <b>${h} cm</b> tiefer als am Anfang. Welches Gefälle hat er (in %)?`,a:g,u:'%',tol:0.01,h:['Gefälle in % = Höhenunterschied ÷ Länge × 100. Beides in der gleichen Einheit!',`${L} m = ${L*100} cm. ${h} ÷ ${L*100} × 100 = ?`],why:`g = h ÷ L × 100 = ${h} ÷ ${L*100} × 100 = ${g} %.`}},
 kote(){const L=rnd([3,4,5,6,8]),g=rnd([1.5,2,2.5]),K=rnd([500,432.5,611.2,498.75]);const d=L*g/100;return{q:`Kote an der Hauswand: <b>${K.toFixed(2)} m ü. M.</b> Der Platz ist <b>${L} m</b> tief und hat <b>${g} %</b> Gefälle weg vom Haus. Welche Kote hat der Belagsrand am Rasen (in m ü. M.)?`,a:Math.round((K-d)*1000)/1000,u:'m ü. M.',tol:0.006,h:['Zuerst den Höhenunterschied in m rechnen (Länge × Gefälle ÷ 100). Weg vom Haus geht es nach unten: abziehen.',`${L} × ${g} ÷ 100 = ${d.toFixed(3)} m. ${K.toFixed(2)} − ${d.toFixed(3)} = ?`],why:`Höhenunterschied = ${L} × ${g} ÷ 100 = ${d.toFixed(3)} m. Kote = ${K.toFixed(2)} − ${d.toFixed(3)} = ${(K-d).toFixed(3)} m.`}},
 aushub(){const A=rnd([12,16.8,20,25.6]),t=rnd([0.3,0.4,0.5]);const fest=A*t;const lose=Math.round(fest*1.25*100)/100;
  if(Math.random()<.5)return{q:`Aushub auf <b>${A} m²</b>, <b>${t*100} cm</b> tief (gewachsener Boden, fest). Wie viel <b>lose</b> Material musst du abführen (m³)? Auflockerungsfaktor 1.25.`,a:lose,u:'m³',tol:0.05,h:['Ausgehobener Boden lockert sich auf: fest × 1.25 = lose.',`Fest: ${A} × ${t} = ${fest.toFixed(2)} m³. Jetzt × 1.25.`],why:`${A} × ${t} = ${fest.toFixed(2)} m³ fest × 1.25 = ${lose} m³ lose.`};
  return{q:`Es fallen <b>${lose} m³ lose</b> Aushub an. Ein Lastwagen fasst <b>10 m³</b>. Wie viele Fahrten brauchst du mindestens?`,a:Math.ceil(lose/10),u:'Fahrten',tol:0,h:['Teile durch die Ladung pro Fahrt. Eine halbe Fahrt gibt es nicht: aufrunden!',`${lose} ÷ 10 = ${(lose/10).toFixed(2)} → ?`],why:`${lose} ÷ 10 = ${(lose/10).toFixed(2)} → aufrunden: ${Math.ceil(lose/10)} Fahrten.`}},
 kosten(){const V=rnd([6.25,8,14.25,4.2,10]);const t=rnd([0,1]);
  if(t==0)return{q:`Du bestellst <b>${V} m³ Kiesgemisch 0/45</b> (lose) zu <b>Fr. 28.– pro m³</b> ab Werk. Wie hoch sind die Materialkosten (in Fr.)?`,a:Math.round(V*28*100)/100,u:'Fr.',tol:0.05,h:['Menge mal Preis pro m³.',`${V} × 28 = ?`],why:`${V} × 28 = Fr. ${(V*28).toFixed(2)} (Preise 2026, ohne MWST, ab Werk).`};
  return{q:`<b>${V} m³ Kiesgemisch 0/45</b> zu Fr. 28.–/m³, Transport Fr. 23.50/m³, dazu Bestellpauschale <b>Fr. 125.–</b> pro Bestellung. Wie hoch sind die Gesamtkosten (in Fr.)?`,a:Math.round((V*(28+23.5)+125)*100)/100,u:'Fr.',tol:0.05,h:['Material und Transport sind pro m³: zusammenzählen und mal Menge. Die Pauschale kommt nur einmal dazu.',`28 + 23.50 = 51.50 Fr./m³. ${V} × 51.50 + 125 = ?`],why:`${V} × (28 + 23.50) + 125 = Fr. ${(V*51.5+125).toFixed(2)} (Preise 2026, ohne MWST).`}}
};
const GBG={
 fund:{t:'Die <b>Fundationsstärke</b> hängt von zwei Dingen ab: der <b>Verkehrslast</b> (ZP, T1, T2, T3 = wie viele schwere Überfahrten pro Tag) und der <b>Tragfähigkeit des Untergrunds</b> (S1 schlecht, S2 mittel, S3 gut). Schlechter Untergrund und viel Verkehr = dicke Fundation.<ul><li>ZP: 30 / 20 / 10 cm</li><li>T1: 50 / 30 / 20 cm</li><li>T2 und T3: 60 / 35 / 25 cm</li></ul>',lm:'S. 146–147',d:'S. 16–18'},
 bankett:{t:'Die Fundation wird seitlich breiter gebaut als der Belag, damit der Rand nicht absinkt. Das <b>Bankett</b> misst F/2 und wird im Verhältnis <b>2:3</b> angeböscht. Darum braucht das Planum neben dem Belagsrand <b>2 × F</b> Platz.',lm:'S. 150',d:'S. 10'},
 planumbreite:{t:'Planumsbreite = Belagsbreite + auf jeder freien Seite <b>2 × F</b> (Bankett F/2 + Böschung 1.5 × F). An einer Hauswand braucht es kein Bankett.',lm:'S. 150',d:'S. 10'},
 festlose:{t:'Kies und Aushub nehmen <b>lose</b> mehr Platz ein als <b>fest</b> (verdichtet). Faktor <b>1.25</b>: fest × 1.25 = lose. lose × 0.8 = fest. Bestellt und transportiert wird lose.',d:'S. 13–14'},
 fundlose:{t:'Ablauf: 1. F aus der Tabelle (Verkehrslast + Untergrund). 2. Volumen fest = Länge × Breite × F (in m). 3. × 1.25 = lose bestellen.',lm:'S. 146–147',d:'S. 13 und 18–21'},
 fahrten:{t:'Ein Lastwagen fasst rund <b>10 m³</b> lose. Fahrten immer <b>aufrunden</b>: 2.1 Fahrten = 3 Fahrten.',d:'S. 14 und 21'},
 aushub:{t:'Gewachsener Boden ist fest. Beim Aushub lockert er sich auf (Faktor <b>1.25</b>). Abgeführt wird lose. Fahrten immer aufrunden.',d:'S. 13–14'},
 gewicht:{t:'Kiesgemisch lose wiegt rund <b>1.71 t pro m³</b>. Das ist wichtig für die Zuladung des Lastwagens.',d:'S. 14'},
 keil:{t:'Betonplatten und Pflaster werden am Rand mit einem <b>Betonkeil</b> gehalten. Der Keil ist ein Dreieck: Höhe × Breite ÷ 2. <b>ZP</b>: Keil 15 cm → <b>12 l/m</b>. <b>T1</b>: Keil 20 cm → <b>20 l/m</b>. <b>T2</b>: Keil 25 cm → ca. <b>30 l/m</b>. Die Oberkante des Betons liegt immer unter der Oberkante der Deckschicht.',lm:'S. 183–184',d:'S. 24–25'},
 keil2:{t:'Betonkeil: Liter pro Meter × Länge. Eine Reserve von 10 % rechnest du mit × 1.1. 1000 Liter = 1 m³.',lm:'S. 183–184',d:'S. 24–25'},
 einfass:{t:'Randsteine (Pflastersteine, Bundsteine) werden in Beton versetzt. Der Bedarf pro Meter steht in der Tabelle und hängt von Steingrösse und Anzahl Reihen ab. Pflasterstein 8/11 = Kantenlänge 8 bis 11 cm.',lm:'S. 179–182',d:'S. 23–24'},
 bettung:{t:'Die Bettung (Splitt 2/4 oder 4/8) ist 3 bis 5 cm dick. Faustregel: <b>1 m² × 1 cm = 10 Liter</b>.',lm:'S. 150',d:'S. 21'},
 platten:{t:'Bestellmenge = Fläche + Verschnitt. Dann durch die Fläche einer Platte teilen und <b>immer auf ganze Platten aufrunden</b>. Verschnitt: Bahnen ca. 5 %, Reihen/Diagonal 10 %, Kreis/Schuppen 15 bis 20 %, Mosaik bis 25 %.',lm:'S. 158',d:'S. 27–29'},
 verschnitt:{t:'Beim Zuschneiden am Rand und bei Mustern entsteht Abfall. Darum bestellst du mehr: Fläche × (1 + Verschnitt in %). Je komplizierter das Muster, desto mehr Verschnitt.',lm:'S. 158',d:'S. 27–29'},
 gefaelle:{t:'Beläge brauchen <b>Gefälle</b>, damit das Wasser abläuft. <b>1 % = 1 cm pro Meter</b>. Üblich sind 1.5 bis 2.5 %, immer weg vom Haus.',lm:'S. 145–146',d:'S. 41'},
 gefaelle2:{t:'Gefälle in % = Höhenunterschied ÷ Länge × 100. Beide Werte vorher in die gleiche Einheit umrechnen.',lm:'S. 145–146',d:'S. 41'},
 kote:{t:'Eine <b>Kote</b> ist eine Höhe in Metern über Meer (m ü. M.). Fällt der Belag vom Haus weg, ist die Kote am Rand <b>tiefer</b>: Kote Haus − (Länge × Gefälle ÷ 100).',d:'S. 41'},
 einheiten:{t:'Längen: 1 m = 100 cm = 1000 mm. Flächen: 1 m² = 10 000 cm². Volumen: 1 m³ = 1000 Liter.',d:'S. 21'},
 kosten:{t:'Kosten = Menge × Preis pro Einheit. Transport wird oft pro m³ gerechnet, Pauschalen nur einmal pro Bestellung. Preise ohne MWST.',d:'S. 43'}
};
function calc(){
 const n=C.count||8;const qs=[];for(let i=0;i<n;i++){const g=rnd(C.gens);const q=GENS[g]();q.bg=GBG[g]||C.bg;qs.push(q)}
 let i=0,score=0;
 function show(){
  if(i>=qs.length)return finish(score,qs.length);
  const q=qs[i];
  root.innerHTML=`<div class="card">${pb(i,qs.length)}<div class="q">${q.q}</div>${H.bar()}<input class="num" id="in" inputmode="decimal" placeholder="Antwort in ${q.u}" autocomplete="off"><button class="btn" id="ok">Prüfen</button><div id="w"></div></div>`;
  const hc=H.wire(root,{tips:hs(q.h),bg:q.bg||C.bg});
  const check=()=>{const v=parseFloat(String($('#in').value).replace(',','.'));if(isNaN(v))return;
   const ok=Math.abs(v-q.a)<=Math.max(q.tol,1e-9);if(ok)score++;$('#in').disabled=true;hc.lock();
   $('#w').innerHTML=`<div class="why">${ok?'✅ Richtig! ':'❌ Richtig wäre <b>'+q.a+' '+q.u+'</b>. '}${q.why}</div><button class="btn" id="nx">${i+1<qs.length?'Weiter →':'Resultat'}</button>`;
   $('#ok').style.display='none';$('#nx').onclick=()=>{i++;show()};$('#nx').focus()};
  $('#ok').onclick=check;$('#in').addEventListener('keydown',e=>{if(e.key==='Enter'&&!$('#in').disabled)check()});$('#in').focus();
 }show();
}

/* ---------- TOOL: Mengenrechner ---------- */
function tool(){
 root.innerHTML=`<div class="card"><label>Länge (m)</label><input class="fld" id="L" inputmode="decimal" value="14"><label>Breite (m)</label><input class="fld" id="B" inputmode="decimal" value="1.2">
 <label>Verkehrslastklasse</label><select id="K"><option>ZP</option><option>T1</option><option>T2</option><option>T3</option></select>
 <label>Tragfähigkeit Untergrund</label><select id="S"><option value="0">S1 (gering)</option><option value="1" selected>S2 (mittel)</option><option value="2">S3 (hoch)</option></select>
 <label>Verschnitt Belag (%)</label><input class="fld" id="V" inputmode="decimal" value="5"></div><div class="card" id="o"></div>`;
 const f=()=>{const L=parseFloat($('#L').value.replace(',','.'))||0,B=parseFloat($('#B').value.replace(',','.'))||0,V=parseFloat($('#V').value.replace(',','.'))||0;
  const F=TAB[$('#K').value][+$('#S').value];const A=L*B;const fest=A*F/100;
  const teil=F>25?`2 Lagen (z. B. ${F-5} cm + 5 cm Ausgleichsschicht)`:'1 Lage';
  $('#o').innerHTML=`<table class="t"><tr><th>Fläche</th><td>${A.toFixed(2)} m²</td></tr><tr><th>Fundationsstärke F</th><td><b>${F} cm</b> (${teil})</td></tr>
  <tr><th>Bankett (F/2)</th><td>${F/2} cm</td></tr><tr><th>Planum neben Belagsrand (2 × F)</th><td>${2*F} cm je Seite</td></tr><tr><th>Planumsbreite</th><td>${(B+4*F/100).toFixed(2)} m (ohne Hausseite)</td></tr>
  <tr><th>Fundation fest</th><td>${fest.toFixed(2)} m³</td></tr><tr><th>Fundation lose bestellen (× 1.25)</th><td><b>${(fest*1.25).toFixed(2)} m³</b></td></tr>
  <tr><th>Belag bestellen (+${V} %)</th><td><b>${(A*(1+V/100)).toFixed(2)} m²</b></td></tr></table><p><small>Vereinfacht: ohne Bankett-Mehrmenge. Werte nach Lehrmittel J5.</small></p>`};
 root.addEventListener('input',f);root.addEventListener('change',f);f();
 if(C.bg){root.insertAdjacentHTML('afterbegin',H.bar({tips:false}));H.wire(root,{bg:C.bg})}
}


/* ---------- PINS: Beschriften am Bild ---------- */
function pins(){
 const P=C.pins,groups={};P.forEach(p=>{(groups[p.g||'a']=groups[p.g||'a']||[]).push(p.a)});
 const opts={};Object.keys(groups).forEach(g=>opts[g]=shuffle([...new Set(groups[g])]));
 const gt=C.groups||{};
 root.innerHTML=`<div class="card"><div class="q">${C.task}</div>${H.bar()}<div class="pinbox"><img src="${C.img}" alt=""><div id="pn"></div></div><div id="pr"></div><button class="btn" id="chk">Prüfen</button><div id="fb"></div></div>`;
 P.forEach((p,k)=>{const d=document.createElement('span');d.className='pin';d.style.cssText=`left:${p.x}%;top:${p.y}%;background:${p.c||'#e53935'}`;d.textContent=p.l;d.id='pin'+k;$('#pn').append(d)});
 let html='',lastg=null;
 P.forEach((p,k)=>{if(p.g!==lastg){lastg=p.g;if(gt[p.g])html+=`<h4 class="pg">${gt[p.g]}</h4>`}
  html+=`<div class="prow"><span class="pin st" style="background:${p.c||'#e53935'}">${p.l}</span><select id="s${k}"><option value="">Wähle …</option>${opts[p.g||'a'].map(o=>`<option>${o}</option>`).join('')}</select></div>`});
 $('#pr').innerHTML=html;
 let tries=0,first=null;
 const fill=()=>{const k=P.findIndex((p,k)=>$('#s'+k).value!==p.a);if(k<0)return 'Alles ist schon richtig ausgefüllt. Drücke «Prüfen».';$('#s'+k).value=P[k].a;$('#s'+k).className='ok';$('#pin'+k).style.outline='3px solid #f2c94c';return `Nummer <b>${P[k].l}</b> ist: <b>${P[k].a}</b>. Ich habe es eingetragen.`};
 const hc=H.wire(root,{bg:BG(),tips:hs(C.h).concat([fill,fill,fill])});
 $('#chk').onclick=()=>{tries++;let ok=0;P.forEach((p,k)=>{const sel=$('#s'+k),good=sel.value===p.a;if(good)ok++;sel.className=good?'ok':(sel.value?'no':'');$('#pin'+k).style.outline=good?'3px solid #43a047':(sel.value?'3px solid #c62828':'none')});
  if(first===null)first=ok;
  if(ok===P.length){hc.lock();$('#fb').innerHTML=`<div class="why">✅ Alles richtig! ${C.why||''}</div><button class="btn" id="d">Fertig</button>`;$('#d').onclick=()=>finish(Math.max(1,first),P.length)}
  else $('#fb').innerHTML=`<div class="why">${ok} von ${P.length} richtig. Grün = richtig, rot = falsch. Korrigiere und prüfe erneut.</div>`}
}

/* ---------- MULTI: Lernpfad aus Stufen ---------- */
function multi(){
 const st=CFG.stages;let si=0,res=[];
 try{const j=parseInt(new URLSearchParams(location.search).get('stufe'),10);if(j>=1&&j<=st.length&&LA.user&&LA.user.role==='teacher')si=j-1}catch(e){}
 function next(){
  if(si>=st.length){HOOK=null;$('#stg').innerHTML='';const S=res.reduce((a,r)=>a+r[1],0),T=res.reduce((a,r)=>a+r[2],0);
   const rows=res.map(r=>`<tr><td>${r[0]}</td><td><b>${r[2]?r[1]+' / '+r[2]:'–'}</b></td></tr>`).join('');
   root.innerHTML=`<div class="card res"><div class="big">${S} / ${T}</div><p>${T&&S/T>=.8?'Sehr gut! 🎉 Lernpfad gemeistert.':T&&S/T>=.6?'Gut, die schwächeren Stufen nochmals üben 💪':'Schau dir die Erklärungen nochmals an 📖'}</p><table class="t">${rows}</table><button class="btn" onclick="start()">Lernpfad nochmals starten</button></div>`;
   if(T)LA.saveProgress(CFG.slug,{pct:Math.round(100*S/T),score:S,total:T,stage:st.length,stages:st.length,finished:true,progressPct:100,stagesRes:res});return}
  C=Object.assign({slug:CFG.slug},st[si]);
  $('#stg').innerHTML=`<div class="stg">${st.map((s,k)=>`<span class="${k<si?'d':k==si?'a':''}">${k+1}</span>`).join('')}<b>Stufe ${si+1} von ${st.length}: ${C.title}</b></div>${C.info?`<div class="why" style="margin-top:0">${C.info}</div>`:''}`;
  HOOK=(score,total)=>{res.push([st[si].title,score,total]);si++;LA.saveProgress(CFG.slug,{stage:si,stages:st.length,progressPct:Math.round(100*si/st.length)});next()};
  if(C.type==='tool'){tool();root.insertAdjacentHTML('beforeend','<button class="btn" id="tn">Weiter →</button>');$('#tn').onclick=()=>{res.push([st[si].title,0,0]);si++;LA.saveProgress(CFG.slug,{stage:si,stages:st.length,progressPct:Math.round(100*si/st.length)});next()}}
  else({quiz,match,order,calc,pins})[C.type]();
  window.scrollTo(0,0);
 }
 next();
}
function start(){({quiz,match,order,calc,tool,multi,pins})[CFG.type]()}
document.title=CFG.title+' – Belagsaufbau';

window.startApp=function(){document.title=CFG.title+' – Belagsaufbau';LA.requireLogin().then(()=>{LA.who(document.getElementById('who'));start()})};
