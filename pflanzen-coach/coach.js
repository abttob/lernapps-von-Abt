/* Pflanzen-Coach L35: Training für die Prüfung Pflanzenverwendung.
   Der Coach prüft jede Eingabe gegen die Pflanzen-Datenbank (Name, Standort, Eigenschaften) und begründet sein Urteil. */
(function(){
const $=s=>document.querySelector(s), esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SLUG='pflanzen-coach', APP=$('#app');
const rnd=n=>Math.floor(Math.random()*n), pick=a=>a[rnd(a.length)], shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const sample=(a,n)=>shuffle(a).slice(0,n);
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ß/g,'ss');
const words=s=>norm(s).replace(/['"‘’«»]/g,' ').replace(/[^a-z\s-]/g,' ').split(/[\s-]+/).filter(w=>w.length>1);

/* ---------- Datenbank ---------- */
const MON=['','Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
const TYP={B:'Baum',S:'Strauch',Z:'Zwerg- oder Halbstrauch',T:'Staude',G:'Gras',F:'Farn',K:'Kletterpflanze',O:'Zwiebel-/Knollenpflanze',E:'Wechselflor (einjährig/zweijährig)',U:'Kübelpflanze (nicht winterhart)',W:'Schwimmblatt-/Unterwasserpflanze'};
const LICHT={S:'Sonne',H:'Halbschatten',X:'Schatten'}, BODEN={T:'trocken',F:'frisch',N:'feucht',W:'nass (Sumpf/Wasser)'};
const FL={i:'immergrün',e:'einheimisch',g:'stark giftig',q:'giftig',b:'wertvoll für Bienen und Insekten',d:'hat Dornen oder Stacheln',n:'essbare Früchte/Blätter',x:'invasiver Neophyt',s:'Selbstklimmer',w:'Schlinger',r:'Ranker/Spreizklimmer',h:'schnittverträglich',v:'Vogelnährgehölz',f:'schöne Herbstfärbung',k:'liebt magere, kalkhaltige Böden',c:'bodendeckend'};
function months(s){const o=new Set();if(!s)return o;String(s).split(',').forEach(p=>{const [a,b]=p.split('-').map(Number);if(!b){o.add(a);return}let m=a;for(let i=0;i<12;i++){o.add(m);if(m===b)break;m=m%12+1}});return o}
const P=window.PDB_RAW.trim().split('\n').map((l,id)=>{const [bot,de,typ,licht,boden,fl,gr,bl]=l.split('|');
 const des=de.split(';');return{id,bot,de:des[0],des,typ,licht,boden,fl:fl||'',gr:(gr||'').split(',').filter(Boolean).map(Number),bl:months(bl),bls:bl}});
const has=(p,f)=>p.fl.includes(f);
const SURE='eigdxswrq';
const NOT={i:'ist nicht immergrün',e:'ist nicht einheimisch',g:'ist nicht stark giftig',q:'ist nicht giftig',b:'ist für Bienen kaum wertvoll',d:'hat keine Dornen',n:'hat nichts zum Essen',x:'ist kein invasiver Neophyt',s:'ist kein Selbstklimmer, braucht eine Kletterhilfe',w:'ist kein Schlinger',r:'ist kein Ranker',h:'verträgt starken Schnitt schlecht',v:'ist kein Vogelnährgehölz',f:'hat keine auffällige Herbstfärbung',k:'braucht keinen mageren Boden',c:'deckt den Boden nicht dicht'};
const lab=p=>`${p.bot} (${p.de})`;
const blText=p=>{if(!p.bls)return'keine auffällige Blüte';const [a,b]=p.bls.split('-').map(Number);return b?`${MON[a]} bis ${MON[b]}`:MON[a]};

/* ---------- Namen erkennen (tolerant) ---------- */
function lev(a,b){if(a===b)return 0;const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let v=Array(n+1).fill(0).map((_,i)=>i);for(let i=1;i<=m;i++){let pr=v[0];v[0]=i;for(let j=1;j<=n;j++){const t=v[j];v[j]=Math.min(v[j]+1,v[j-1]+1,pr+(a[i-1]===b[j-1]?0:1));pr=t}}return v[n]}
const tol=w=>w.length<=4?0:w.length<=7?1:2;
function tokMatch(t,ws){let best=99;for(const w of ws){const d=lev(t,w);if(d<best)best=d;if(!best)break}return best<=tol(t)?best:-1}
const IDX=P.map(p=>{const bw=words(p.bot.replace(/ x /,' ').replace(/subsp\.?/,' ')).filter(w=>w!=='x');
 return{p,genus:bw[0],sp:bw.slice(1),des:p.des.map(d=>({w:words(d),j:norm(d).replace(/[^a-z]/g,'')}))}});
Object.entries(window.SYN||{}).forEach(([s,t])=>{const x=IDX.find(i=>i.p.bot===t);if(x){const w=words(s);x.syn=(x.syn||[]).concat([w])}});
function recognize(input){
 const ws=words(input);if(!ws.length)return null;
 const ws2=ws.concat(ws.slice(0,-1).map((w,i)=>w+ws[i+1]),ws.slice(0,-2).map((w,i)=>w+ws[i+1]+ws[i+2]));
 let best=null;
 for(const x of IDX){
  let bot=0,typo=false;const g=tokMatch(x.genus,ws);
  if(g>=0){bot=1;if(g>0)typo=true;
   if(x.sp.length){let all=true;for(const s of x.sp){const m=tokMatch(s,ws);if(m<0){all=false;break}if(m>0)typo=true}if(all)bot=2}}
  if(x.syn)for(const sw of x.syn){if(sw.every(t=>tokMatch(t,ws)>=0)){bot=2;break}}
  let de=0,deTypo=false;
  for(const d of x.des){const j=tokMatch(d.j,ws2);if(j>=0){if(4-(j?1:0)>de){de=j?3:4;deTypo=j>0}if(!j)break}
   if(d.w.length>1&&d.w.every(t=>tokMatch(t,ws)>=0)){de=Math.max(de,4)}}
  if(de&&bot===1&&g>0){bot=0;typo=false}
  if(de&&bot===1&&x.des.some(d=>d.j===norm(x.genus)))typo=false;
  const sc=(bot===2?6:bot===1?2:0)+de-(typo?1:0);
  if(sc>0&&(!best||sc>best.sc))best={p:x.p,bot,de:de?2:0,typo,deTypo,sc,genus:x.genus};
 }
 if(!best)return null;
 if(best.bot===1&&!best.de){const same=IDX.filter(x=>x.genus===best.genus);if(same.length>1)return{genusOnly:true,genus:best.p.bot.split(' ')[0],cands:same.map(x=>x.p)}}
 return best;
}

/* ---------- Kriterien prüfen ---------- */
const grpName=g=>window.GRUPPEN[g]||'';
function check(p,k){const why=[];let soft=0;
 if(k.nicht&&k.nicht.includes(p.bot))why.push(`${p.de} wollte die Kundschaft ausdrücklich nicht`);
 if(k.typ&&!k.typ.includes(p.typ))why.push(`ist ${/^[AEIOU]/.test(TYP[p.typ])?'eine':'ein'} ${TYP[p.typ]}, gesucht: ${k.typ.map(t=>TYP[t]).join(' oder ')}`);
 if(k.licht&&!p.licht.includes(k.licht))why.push(`steht gern in ${[...p.licht].map(l=>LICHT[l]).join('/')}, hier ist ${LICHT[k.licht]}`);
 if(k.boden&&!p.boden.includes(k.boden))why.push(`wächst auf ${[...p.boden].map(b=>({T:'trockenem',F:'frischem',N:'feuchtem',W:'nassem'})[b]).join(' bis ')} Boden, hier ist es ${({T:'trocken',F:'frisch',N:'feucht',W:'nass (Sumpf/Wasser)'})[k.boden]}`);
 (k.has||[]).forEach(f=>{if(!has(p,f)){why.push(NOT[f]);if(!SURE.includes(f))soft++}});
 if(k.any&&!k.any.some(f=>has(p,f)))why.push(`ist weder ${k.any.map(f=>FL[f]).join(' noch ')}`);
 (k.not||[]).forEach(f=>{if(has(p,f))why.push(f==='d'?'hat Dornen oder Stacheln, das ist hier gefährlich':f==='x'?'ist ein invasiver Neophyt 🚫':f==='g'?'ist stark giftig ⚠️':f==='q'?'ist giftig ⚠️':`ist ${FL[f]}`)});
 if(k.grp&&!k.grp.some(g=>p.gr.includes(g))){soft++;why.push(`gehört eher zu «${p.gr.map(grpName).join('», «')}» als zu «${k.grp.map(grpName).join('» oder «')}»`)}
 if(k.bl&&!k.bl.some(m=>p.bl.has(m)))why.push(`blüht ${blText(p)}`);
 return{ok:!why.length,half:why.length>0&&why.length===soft&&soft<=1,soft,why}}
const fits=k=>P.filter(p=>check(p,k).ok);
function plus(p,k){const t=[];if(k.licht)t.push(`verträgt ${LICHT[k.licht]}`);(k.has||[]).forEach(f=>t.push(FL[f]));if(k.bl)t.push(`blüht ${blText(p)}`);if(k.typ&&!k.licht&&!t.length)t.push(TYP[p.typ]);return t.slice(0,3).join(', ')}

/* ---------- Zustand ---------- */
let ME=null, RUN=null, STATS=null;
function loadStats(){const pr=LA.getProgress(SLUG);STATS=Object.assign({runs:0,best:0,types:{},weak:{},unknown:[],log:[]},pr&&pr.data||{})}
function logUnknown(t,q){STATS.unknown=[{t,q,at:Date.now()}].concat(STATS.unknown||[]).slice(0,40)}
function logAns(q,a,v,pts,max){STATS.log=[{q,a,v,pts,max,at:Date.now()}].concat(STATS.log||[]).slice(0,40)}
function weak(p){if(!p)return;STATS.weak[p.bot]=(STATS.weak[p.bot]||0)+1}
function typeStat(t,pts,max){const s=STATS.types[t]||[0,0];s[0]+=pts;s[1]+=max;STATS.types[t]=s}

/* ---------- Aufgaben-Generatoren ---------- */
const TYPES={
 fall:{name:'Praxisfall',icon:'🏡',make(){const f=pick(FAELLE),q=pick(f.fragen.filter(x=>!x.umkehr||Math.random()<.5));return{t:'fall',f,q,max:q.n*2}}},
 wahl:{name:'Auswählen',icon:'🃏',make(){for(let i=0;i<30;i++){const f=pick(FAELLE),q=pick(f.fragen);const ok=fits(q.k);if(ok.length<3)continue;
   const yes=sample(ok,2+rnd(2));const no=sample(P.filter(p=>{const c=check(p,q.k);return!c.ok&&!c.soft&&c.why.length<=2}),8-yes.length);return{t:'wahl',f,q,opts:shuffle(yes.concat(no)),max:8}}}},
 falsch:{name:'Fehler im Plan',icon:'🔍',make(){for(let i=0;i<30;i++){const f=pick(FAELLE),q=pick(f.fragen.filter(x=>!x.umkehr));const ok=fits(q.k);if(ok.length<3)continue;
   const bad=pick(P.filter(p=>{const c=check(p,q.k);return!c.ok&&c.why.length===1&&!c.soft}));if(!bad)continue;return{t:'falsch',f,q,opts:shuffle(sample(ok,3).concat([bad])),bad,max:2}}}},
 name:{name:'Namen',icon:'🔤',make(){const p=pick(P),dir=Math.random()<.6?'bot':'de';return{t:'name',p,dir,max:2}}},
 gruppe:{name:'Verwendungsgruppe',icon:'🗂️',make(){const p=pick(P.filter(x=>x.gr.length));const right=p.gr[0];const wrong=sample([...Array(17).keys()].map(i=>i+1).filter(g=>!p.gr.includes(g)),3);return{t:'gruppe',p,opts:shuffle([right].concat(wrong)),max:1}}},
 steckbrief:{name:'Steckbrief-Rätsel',icon:'🕵️',make(){const p=pick(P.filter(x=>x.fl.replace(/[hqc]/g,'').length>=2&&x.bls));const fl=sample([...p.fl].filter(f=>'iegbdnxswrvfk'.includes(f)),2);
   const k={typ:[p.typ],has:fl,licht:p.licht[0]};if(Math.random()<.6)k.bl=[...p.bl].slice(0,2);return{t:'steckbrief',p,k,max:2}}},
 eigenschaft:{name:'Stimmt das?',icon:'✅',make(){const p=pick(P);const st=[['i','ist immergrün'],['e','ist einheimisch'],['g','ist stark giftig'],['d','hat Dornen oder Stacheln'],['b','ist eine gute Bienenweide'],['x','ist ein invasiver Neophyt'],['v','ist ein Vogelnährgehölz'],['h','ist schnittverträglich (Hecke)']]
   .map(([f,t])=>({t,ok:has(p,f),f})).filter(x=>x.ok||SURE.includes(x.f));st.push({t:'verträgt Schatten',ok:p.licht.includes('X')},{t:'wächst in der Sonne',ok:p.licht.includes('S')},{t:`ist ${/^[AEIOU]/.test(TYP[p.typ])?'eine':'ein'} ${TYP[p.typ]}`,ok:true},{t:'blüht im Frühling (Februar bis Mai)',ok:[2,3,4,5].some(m=>p.bl.has(m))});
   const tr=st.filter(s=>s.ok),fa=st.filter(s=>!s.ok);const ch=shuffle(sample(tr,Math.min(tr.length,2+rnd(2))).concat(sample(fa,5-Math.min(tr.length,2+rnd(2)))).slice(0,5));return{t:'eigenschaft',p,st:shuffle(ch),max:ch.length}}},
 blitz:{name:'Blitzrunde',icon:'⚡',make(){for(let i=0;i<30;i++){const f=pick(FAELLE),q=pick(f.fragen.filter(x=>!x.umkehr));if(fits(q.k).length>=5)return{t:'blitz',f,q,max:6,sec:60}}}}
};
const MODES={
 mix:{name:'Gemischtes Training',icon:'🎯',txt:'10 Aufgaben, alle Fragetypen',plan:()=>shuffle(['fall','fall','fall','wahl','falsch','name','name','gruppe','steckbrief','eigenschaft']).concat(['blitz'])},
 faelle:{name:'Praxisfälle',icon:'🏡',txt:'6 Kundenfälle mit freier Eingabe',plan:()=>['fall','fall','fall','fall','fall','fall']},
 namen:{name:'Namen-Sprint',icon:'🔤',txt:'10 Namen botanisch ↔ deutsch',plan:()=>Array(10).fill('name')},
 detektiv:{name:'Detektiv',icon:'🕵️',txt:'Steckbriefe, Fehler im Plan, Stimmt das?',plan:()=>shuffle(['steckbrief','steckbrief','falsch','falsch','eigenschaft','eigenschaft','wahl','gruppe'])}
};

/* ---------- Oberfläche ---------- */
function shell(inner){APP.innerHTML=`<div class="hero"><a href="../">← Alle Apps</a><div class="who" id="who"></div><h1>🧑‍🌾 Pflanzen-Coach</h1><p>Training für die Prüfung Pflanzenverwendung L35 · botanisch und deutsch</p></div><div class="wrap">${inner}</div>`;LA.who($('#who'))}
function home(){const pct=STATS.best||0;
 shell(`${ME.role==='teacher'?`<div class="card info"><b>👩‍🏫 Lehrperson:</b> <a href="lehrer.html">Zur Übersicht der Klasse</a></div>`:''}
 <div class="card coachbox"><div class="ava">🧑‍🌾</div><div><b>Hoi ${esc(ME.name)}!</b> Ich stelle dir Fragen wie an der Prüfung. Gib Pflanzen <b>botanisch und deutsch</b> ein, z. B. <i>«Carpinus betulus, Hainbuche»</i>. Ich prüfe Name, Standort und Eigenschaften und sage dir, warum etwas passt oder nicht.</div></div>
 <div class="card"><div class="row2"><div><small>Bestes Training</small><div class="bigp">${pct} %</div></div><div><small>Trainings</small><div class="bigp">${STATS.runs||0}</div></div><div><small>Serie</small><div class="bigp">🔥 ${STATS.streak||0}</div></div></div></div>
 <div class="modes">${Object.entries(MODES).map(([k,m])=>`<button class="mode" data-m="${k}"><span class="ic">${m.icon}</span><b>${m.name}</b><small>${m.txt}</small></button>`).join('')}</div>
 ${Object.keys(STATS.weak||{}).length?`<div class="card"><b>🧠 Deine Knacknüsse</b><p class="small">Diese Pflanzen hast du falsch eingesetzt oder falsch geschrieben. Lerne sie extra:</p><div class="chips">${Object.entries(STATS.weak).sort((a,b)=>b[1]-a[1]).slice(0,12).map(([b,n])=>{const p=P.find(x=>x.bot===b);return`<span class="chip2">${esc(p?lab(p):b)} · ${n}×</span>`}).join('')}</div></div>`:''}
 <div class="card"><b>📚 So bekommst du die Punkte</b><ul class="small"><li>Botanischer Name richtig: Gattung und Art (z. B. <i>Taxus baccata</i>)</li><li>Deutscher Name richtig</li><li>Die Pflanze passt zum Standort und zum Wunsch der Kundschaft</li></ul></div>`);
 APP.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>start(b.dataset.m))}
function start(mode){const plan=MODES[mode].plan();RUN={mode,tasks:plan.map(t=>TYPES[t].make()).filter(Boolean),i:0,pts:0,max:0,res:[]};next()}
function head(){const T=RUN.tasks[RUN.i],ty=TYPES[T.t];return`<div class="prog"><span>${ty.icon} ${ty.name}</span><span>Aufgabe ${RUN.i+1} von ${RUN.tasks.length}</span></div><div class="bar"><i style="width:${Math.round(RUN.i/RUN.tasks.length*100)}%"></i></div>`}
function caseBox(f){return`<div class="case"><div class="ci">${f.icon}</div><div><b>${esc(f.titel)}</b><div>${esc(f.text)}</div></div></div>`}
function next(){if(RUN.i>=RUN.tasks.length)return finish();const T=RUN.tasks[RUN.i];R[T.t](T)}
function done(T,pts,html){pts=Math.round(pts*4)/4;RUN.pts+=pts;RUN.max+=T.max;typeStat(T.t,pts,T.max);RUN.res.push({t:T.t,pts,max:T.max});
 const good=pts>=T.max*.75,mid=pts>=T.max*.4;
 $('#fb').innerHTML=`<div class="coach ${good?'good':mid?'mid':'bad'}"><div class="ava">🧑‍🌾</div><div class="said"><div class="pts">${good?'Stark!':mid?'Teilweise richtig.':'Das üben wir noch.'} <b>${pts} / ${T.max} Punkte</b></div>${html}</div></div><button class="btn" id="nx">${RUN.i+1<RUN.tasks.length?'Weiter ➜':'Auswertung ➜'}</button>`;
 $('#fb').scrollIntoView({behavior:'smooth',block:'start'});$('#nx').onclick=()=>{RUN.i++;next()}}
async function finish(){const pct=RUN.max?Math.round(RUN.pts/RUN.max*100):0;
 STATS.runs=(STATS.runs||0)+1;STATS.streak=pct>=60?(STATS.streak||0)+1:0;STATS.last=pct;STATS.best=Math.max(STATS.best||0,pct);
 await LA.saveProgress(SLUG,Object.assign({},STATS,{pct,finished:true,stage:1}));
 shell(`<div class="card res"><div style="font-size:3rem">${pct>=80?'🏆':pct>=60?'🌻':pct>=40?'🌱':'🪴'}</div><div class="big">${pct} %</div><p><b>${RUN.pts} von ${RUN.max} Punkten</b></p>
 <p>${pct>=80?'Prüfungsreif! Halte das Niveau mit einem kurzen Training pro Tag.':pct>=60?'Gut unterwegs. Schau dir die Knacknüsse nochmals an.':'Bleib dran: 15 Minuten pro Tag und die Namen laut sagen.'}</p>
 <table class="t">${Object.entries(TYPES).map(([k,t])=>{const r=RUN.res.filter(x=>x.t===k);if(!r.length)return'';const a=r.reduce((s,x)=>s+x.pts,0),b=r.reduce((s,x)=>s+x.max,0);return`<tr><td>${t.icon} ${t.name}</td><td style="text-align:right"><b>${a} / ${b}</b></td></tr>`}).join('')}</table>
 <button class="btn" id="again">🔁 Nochmals</button><button class="btn sec" id="home">🏠 Übersicht</button></div>`);
 $('#again').onclick=()=>start(RUN.mode);$('#home').onclick=home}
const nameField=(k,ph)=>`<div class="pf"><b>${k}</b><input class="fld" data-k="${k}" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="${ph||'botanisch und deutsch'}"></div>`;

/* Einzelne Pflanze beurteilen (Name + Eignung) */
function judge(txt,k,umkehr,qtext,seen){
 txt=txt.trim();if(!txt)return{pts:0,html:`<li class="no">– leer</li>`};
 const r=recognize(txt);
 if(!r){logUnknown(txt,qtext);return{pts:0,html:`<li class="no">🤔 <b>«${esc(txt)}»</b> kenne ich nicht. Prüfe die Schreibweise oder nimm eine andere Pflanze. <span class="small">(Ich melde es der Lehrperson.)</span></li>`}}
 if(r.genusOnly){const ok=r.cands.filter(p=>check(p,k).ok);return{pts:ok.length===r.cands.length?.75:0,html:`<li class="mid">🟡 <b>«${esc(txt)}»</b>: Gattung <i>${esc(r.genus)}</i> erkannt, aber welche Art? ${r.cands.slice(0,4).map(p=>`<i>${esc(p.bot)}</i> (${esc(p.de)})`).join(', ')} … Nenne Gattung <b>und</b> Art.</li>`}}
 const p=r.p;if(seen.has(p.id))return{pts:0,html:`<li class="no">🔁 <b>${esc(lab(p))}</b> hast du schon genannt.</li>`};seen.add(p.id);
 let pts=0;const notes=[];
 if(r.bot===2){pts+=r.typo?.25:.5;if(r.typo)notes.push(`Schreibweise: richtig ist <i>${esc(p.bot)}</i>`)}else if(r.bot===1){pts+=.25;notes.push(`botanisch nur die Gattung, richtig: <i>${esc(p.bot)}</i>`)}else notes.push(`botanischer Name fehlt: <i>${esc(p.bot)}</i>`);
 if(r.de){pts+=.5;if(r.deTypo)notes.push(`deutsch genauer: ${esc(p.de)}`)}else notes.push(`deutscher Name fehlt: ${esc(p.de)}`);
 const c=check(p,k);let fit=c.ok?1:c.half?.5:0;
 let line;
 if(umkehr){line=c.ok?`✅ <b>${esc(lab(p))}</b>: richtig, ${esc((k.has||k.any||[]).filter(f=>has(p,f)).map(f=>FL[f]).join(' und '))}.`:`❌ <b>${esc(lab(p))}</b>: ${esc(c.why.join('; '))}.`}
 else line=c.ok?`✅ <b>${esc(lab(p))}</b> passt: ${esc(plus(p,k))}.`:c.half?`🟡 <b>${esc(lab(p))}</b> geht knapp: ${esc(c.why.join('; '))}.`:`❌ <b>${esc(lab(p))}</b> passt nicht: ${esc(c.why.join('; '))}.`;
 if(!c.ok||r.typo||!r.de||r.bot<2)weak(p);
 pts+=fit;return{pts,html:`<li class="${c.ok?'ok':c.half?'mid':'no'}">${line}${notes.length?`<div class="small">✍️ ${notes.join(' · ')}</div>`:''}</li>`,fit}}
function ideas(k,exclude,n=4){return sample(fits(k).filter(p=>!exclude.has(p.id)),n).map(p=>`<i>${esc(p.bot)}</i> (${esc(p.de)})`).join(' · ')}

const R={
 fall(T){shell(`<div class="card">${head()}${caseBox(T.f)}<p class="q">${esc(T.q.q)}${T.q.umkehr?' <span class="tag">Achtung, umgekehrt!</span>':''}</p>
  ${Array.from({length:T.q.n},(_,i)=>nameField(i+1)).join('')}<div id="m"></div><button class="btn" id="ok">🧑‍🌾 Prüfen lassen</button><div id="fb"></div></div>`);
  focusFirst();$('#ok').onclick=()=>{const v=[...APP.querySelectorAll('[data-k]')].map(x=>x.value);if(!v.some(s=>s.trim())){$('#m').innerHTML='<div class="msg err">Gib mindestens eine Pflanze ein.</div>';return}
   lock();const seen=new Set();let pts=0,li='';v.forEach(s=>{const j=judge(s,T.q.k,T.q.umkehr,T.f.titel+': '+T.q.q,seen);pts+=j.pts;li+=j.html});
   logAns(T.f.titel+': '+T.q.q,v.filter(Boolean).join(' / '),'',pts,T.max);
   done(T,pts,`<ul class="jl">${li}</ul><div class="small">💡 Weitere gute Möglichkeiten: ${ideas(T.q.k,seen)}</div>`)}},
 blitz(T){let left=T.sec;shell(`<div class="card">${head()}${caseBox(T.f)}<p class="q">${esc(T.q.q.replace(/^\d+ /,''))}: Nenne in ${T.sec} Sekunden so viele passende Pflanzen wie möglich (max. 6 zählen).</p>
  <div class="blitz"><div class="clock" id="cl">${left}</div></div><div class="pf"><b>+</b><input class="fld" id="bi" placeholder="Pflanze eingeben und Enter" autocomplete="off" spellcheck="false"></div><ul class="jl" id="bl"></ul><div id="fb"></div></div>`);
  const seen=new Set();let pts=0,n=0,list=[];const bi=$('#bi');bi.focus();
  const add=()=>{const s=bi.value.trim();if(!s)return;bi.value='';list.push(s);const j=judge(s,T.q.k,false,'Blitz: '+T.q.q,seen);$('#bl').insertAdjacentHTML('afterbegin',j.html);if(j.fit===1&&n<6){n++;pts+=1}};
  bi.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();add()}};
  const h=setInterval(()=>{left--;$('#cl').textContent=left;if(left<=10)$('#cl').classList.add('low');if(left<=0){clearInterval(h);add();bi.disabled=true;logAns('Blitz: '+T.f.titel,list.join(' / '),'',n,T.max);done(T,n,`<p>Du hast <b>${n}</b> passende Pflanzen gefunden.</p><div class="small">💡 Auch möglich: ${ideas(T.q.k,seen,6)}</div>`)}},1000)},
 wahl(T){const sel=new Set();shell(`<div class="card">${head()}${caseBox(T.f)}<p class="q">${esc(T.q.q.replace(/^\d+ /,''))}: Tippe <b>alle</b> Pflanzen an, die passen.</p>
  <div class="cards">${T.opts.map(p=>`<button class="pc" data-i="${p.id}"><b>${esc(p.bot)}</b><span>${esc(p.de)}</span></button>`).join('')}</div><button class="btn" id="ok">🧑‍🌾 Prüfen lassen</button><div id="fb"></div></div>`);
  APP.querySelectorAll('.pc').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;sel.has(i)?sel.delete(i):sel.add(i);b.classList.toggle('sel')});
  $('#ok').onclick=()=>{lock();let pts=0,li='';T.opts.forEach(p=>{const c=check(p,T.q.k),s=sel.has(p.id),right=c.ok===s;if(right)pts++;else weak(p);
    const b=APP.querySelector(`.pc[data-i="${p.id}"]`);b.classList.add(right?'ok':'no');
    li+=`<li class="${right?'ok':'no'}">${c.ok?'✅':'❌'} <b>${esc(lab(p))}</b>: ${c.ok?esc('passt, '+plus(p,T.q.k)):esc(c.why.join('; '))}${right?'':' <b>(falsch eingeschätzt)</b>'}</li>`});
   done(T,pts,`<ul class="jl">${li}</ul>`)}},
 falsch(T){shell(`<div class="card">${head()}${caseBox(T.f)}<p class="q">Ein Kollege plant «${esc(T.q.q.replace(/^\d+ /,''))}» mit diesen vier Pflanzen. <b>Eine passt nicht.</b> Welche?</p>
  ${T.opts.map(p=>`<button class="opt" data-i="${p.id}"><span class="k">?</span>${esc(lab(p))}</button>`).join('')}<div id="fb"></div></div>`);
  APP.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{lock();const p=P[+b.dataset.i],ok=p.id===T.bad.id;b.classList.add(ok?'ok':'no');APP.querySelector(`.opt[data-i="${T.bad.id}"]`).classList.add('ok');if(!ok)weak(T.bad);
   done(T,ok?2:0,`<p>${ok?'Richtig erkannt!':'Leider nicht.'} <b>${esc(lab(T.bad))}</b> ${esc(check(T.bad,T.q.k).why.join('; '))}.</p>${ok?'':`<p class="small">${esc(lab(p))} passt: ${esc(plus(p,T.q.k))}.</p>`}`)})},
 name(T){const p=T.p,askBot=T.dir==='bot';shell(`<div class="card">${head()}<p class="q">${askBot?`Wie heisst <b>${esc(p.de)}</b> botanisch?`:`Wie heisst <b><i>${esc(p.bot)}</i></b> auf Deutsch?`}</p>
  <div class="hint">${esc(TYP[p.typ])} · ${[...p.licht].map(l=>LICHT[l]).join('/')}${p.gr.length?' · '+esc(grpName(p.gr[0])):''}</div>${nameField(1,askBot?'Gattung Art':'deutscher Name')}<button class="btn" id="ok">🧑‍🌾 Prüfen lassen</button><div id="fb"></div></div>`);
  focusFirst();$('#ok').onclick=()=>{const v=$('[data-k]').value;if(!v.trim())return;lock();const r=recognize(v);let pts=0,msg;
   if(r&&!r.genusOnly&&r.p.id===p.id&&(askBot?r.bot:r.de)){if(askBot){pts=r.bot===2?(r.typo?1.5:2):1;msg=r.bot===2?(r.typo?`Fast! Achte auf die Schreibweise: <b><i>${esc(p.bot)}</i></b>.`:`Genau: <b><i>${esc(p.bot)}</i></b>.`):`Gattung stimmt, die Art fehlt: <b><i>${esc(p.bot)}</i></b>.`}else{pts=r.deTypo?1.5:2;msg=`Genau: <b>${esc(p.de)}</b>${p.des.length>1?` (auch: ${esc(p.des.slice(1).join(', '))})`:''}.`}}
   else if(r&&r.genusOnly&&askBot&&r.genus===p.bot.split(' ')[0]){pts=1;msg=`Gattung stimmt, die Art fehlt: <b><i>${esc(p.bot)}</i></b>.`}
   else{msg=`Richtig ist <b>${askBot?'<i>'+esc(p.bot)+'</i>':esc(p.de)}</b>.${r&&!r.genusOnly?` Du hast ${esc(lab(r.p))} genannt.`:''}`;if(!r)logUnknown(v,'Name: '+p.de)}
   if(pts<2)weak(p);logAns('Name: '+(askBot?p.de:p.bot),v,'',pts,2);done(T,pts,`<p>${msg}</p><p class="small">🧠 Eselsbrücke: ${esc(memo(p))}</p>`)}},
 gruppe(T){const p=T.p;shell(`<div class="card">${head()}<p class="q">In welche Verwendungsgruppe gehört <b><i>${esc(p.bot)}</i> (${esc(p.de)})</b> am ehesten?</p>
  ${T.opts.map(g=>`<button class="opt" data-g="${g}"><span class="k">${g}</span>${esc(grpName(g))}</button>`).join('')}<div id="fb"></div></div>`);
  APP.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{lock();const g=+b.dataset.g,ok=p.gr.includes(g);b.classList.add(ok?'ok':'no');APP.querySelectorAll('.opt').forEach(x=>{if(p.gr.includes(+x.dataset.g))x.classList.add('ok')});if(!ok)weak(p);
   done(T,ok?1:0,`<p><b>${esc(lab(p))}</b> gehört zu: ${p.gr.map(g=>'«'+esc(grpName(g))+'»').join(', ')}. Es ist ${/^[AEIOU]/.test(TYP[p.typ])?'eine':'ein'} ${esc(TYP[p.typ])}${p.fl?', '+esc([...p.fl].filter(f=>'iegxbsvd'.includes(f)).map(f=>FL[f]).join(', ')):''}.</p>`)})},
 steckbrief(T){const k=T.k,c=[`🌱 ${TYP[k.typ[0]]}`,`☀️ wächst in ${LICHT[k.licht]}`].concat(k.has.map(f=>'✔️ '+FL[f]));if(k.bl)c.push(`🌸 blüht im ${k.bl.map(m=>MON[m]).join(' oder ')}`);
  shell(`<div class="card">${head()}<p class="q">Wer bin ich? Nenne eine Pflanze, die zu <b>allen</b> Hinweisen passt.</p><ul class="clues">${c.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${nameField(1)}<button class="btn" id="ok">🧑‍🌾 Prüfen lassen</button><div id="fb"></div></div>`);
  focusFirst();$('#ok').onclick=()=>{const v=$('[data-k]').value;if(!v.trim())return;lock();const r=recognize(v);let pts=0,msg;
   if(!r){logUnknown(v,'Steckbrief');msg=`«${esc(v)}» kenne ich nicht. Gedacht war <b>${esc(lab(T.p))}</b>.`}
   else if(r.genusOnly){msg=`Nenne Gattung und Art. Gedacht war <b>${esc(lab(T.p))}</b>.`}
   else{const ch=check(r.p,k);if(ch.ok){pts=r.p.id===T.p.id?2:2;msg=r.p.id===T.p.id?`Genau, <b>${esc(lab(T.p))}</b>!`:`Auch richtig! <b>${esc(lab(r.p))}</b> passt zu allen Hinweisen. Gedacht war <b>${esc(lab(T.p))}</b>.`;if(r.bot<2||!r.de)pts-=.5}
    else{msg=`<b>${esc(lab(r.p))}</b> passt nicht: ${esc(ch.why.join('; '))}. Gedacht war <b>${esc(lab(T.p))}</b>.`;weak(T.p)}}
   logAns('Steckbrief: '+T.p.de,v,'',pts,2);done(T,pts,`<p>${msg}</p>`)}},
 eigenschaft(T){const p=T.p;shell(`<div class="card">${head()}<p class="q">Was stimmt für <b><i>${esc(p.bot)}</i> (${esc(p.de)})</b>? Tippe alle richtigen Aussagen an.</p>
  ${T.st.map((s,i)=>`<button class="opt chk" data-i="${i}"><span class="k">☐</span>${esc(s.t)}</button>`).join('')}<button class="btn" id="ok">🧑‍🌾 Prüfen lassen</button><div id="fb"></div></div>`);
  const sel=new Set();APP.querySelectorAll('.chk').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;sel.has(i)?sel.delete(i):sel.add(i);b.classList.toggle('sel');b.querySelector('.k').textContent=sel.has(i)?'☑':'☐'});
  $('#ok').onclick=()=>{lock();let pts=0;T.st.forEach((s,i)=>{const r=sel.has(i)===s.ok;if(r)pts++;APP.querySelector(`.chk[data-i="${i}"]`).classList.add(s.ok?'ok':'no')});if(pts<T.max)weak(p);
   done(T,pts,`<p>Grün = stimmt, rot = stimmt nicht. Steckbrief: <b>${esc(lab(p))}</b> ist ${/^[AEIOU]/.test(TYP[p.typ])?'eine':'ein'} ${esc(TYP[p.typ])}, ${[...p.licht].map(l=>LICHT[l]).join('/')}, Boden ${[...p.boden].map(b=>BODEN[b]).join(' bis ')}${p.fl?', '+esc([...p.fl].map(f=>FL[f]).join(', ')):''}. Blüte: ${esc(blText(p))}.</p>`)}}
};
function memo(p){const g=p.bot.split(' ');const sp=g[1]||'';const M={vulgaris:'vulgaris = gewöhnlich',sylvatica:'sylvatica = aus dem Wald',sylvestris:'sylvestris = wild, aus dem Wald',officinalis:'officinalis = Heil-/Gewürzpflanze',sempervirens:'sempervirens = immergrün',nivalis:'nivalis = im Schnee',palustris:'palustris = Sumpf',pratensis:'pratensis = Wiese',alba:'alba = weiss',niger:'niger = schwarz',nigra:'nigra = schwarz',rubrum:'rubrum = rot',ruber:'ruber = rot',sanguinea:'sanguinea = blutrot',sanguineum:'sanguineum = blutrot',purpurea:'purpurea = purpur',repens:'repens = kriechend',campestre:'campestre = vom Feld',montana:'montana = aus den Bergen',canina:'canina = Hund',spinosa:'spinosa = dornig',aquifolium:'aquifolium = spitzes Blatt',baccata:'baccata = mit Beeren',betulus:'betulus = birkenähnlich',cordata:'cordata = herzförmig',tectorum:'tectorum = auf Dächern',acre:'acre = scharf',minor:'minor = klein',macrophylla:'macrophylla = grosse Blätter',helix:'helix = gewunden',orientalis:'orientalis = aus dem Osten',japonica:'japonica = aus Japan',persica:'persica = aus Persien',sinensis:'sinensis = aus China',glauca:'glauca = blaugrün',millefolium:'millefolium = tausend Blätter',majalis:'majalis = blüht im Mai',vernus:'vernus = Frühling',vernum:'vernum = Frühling',hyemalis:'hyemalis = Winter'};
 return M[sp]||`Sag den Namen dreimal laut: «${p.bot}» = ${p.de}.`}
function lock(){APP.querySelectorAll('#ok,[data-k],.opt,.pc').forEach(x=>{x.disabled=true});const o=$('#ok');if(o)o.style.display='none'}
function focusFirst(){const f=$('[data-k]');if(f)setTimeout(()=>f.focus(),50);APP.querySelectorAll('[data-k]').forEach((x,i,a)=>x.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();if(a[i+1])a[i+1].focus();else $('#ok').click()}})}

window.COACH={P,FAELLE,recognize,check,fits,TYPES};
if(!window.COACH_TEST)LA.requireLogin().then(u=>{ME=u;loadStats();home()});
})();
