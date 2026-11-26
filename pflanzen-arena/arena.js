/* Pflanzen-Arena: Live-Gruppenwettkampf. Lehrperson am Beamer (?host), Teams am Handy.
   Daten über die gemeinsame Tabelle «records»: arena_game (Lehrperson), arena_team, arena_round, arena_ans. */
(function(){
const $=s=>document.querySelector(s), esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const APP=$('#app'), Q=new URLSearchParams(location.search), HOST=Q.has('host');
const SETKEY=Q.get('set')||'l35', SET=window.ARENA_SETS[SETKEY]||window.ARENA_SETS.l35, R=SET.runden, EV=window.ARENA_EVENTS;
const EMOS=['🌻','🌷','🌵','🍄','🌲','🌹','🪻','🍀','🌴','🌼','🫑','🐝'];
const POLL=1500, TEMPO=[3,2,1];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const keyOf=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\(.*?\)/g,' ').replace(/['"‘’«»].*?['"‘’«»]/g,' ').replace(/[^a-z\s]/g,' ').trim().split(/\s+/).filter(w=>w.length>1&&!['x','var','subsp','ssp','und','der','die','das'].includes(w)).slice(0,2).join(' ');
const ts=r=>new Date(r.created_at).getTime();
/* ---------- Ton ---------- */
let AC=null,muted=false;
function tone(f,d=.15,t='sine',v=.15,delay=0){if(muted)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type=t;o.frequency.value=f;g.gain.value=v;o.connect(g);g.connect(AC.destination);const s=AC.currentTime+delay;g.gain.setValueAtTime(v,s);g.gain.exponentialRampToValueAtTime(.0001,s+d);o.start(s);o.stop(s+d+.02)}catch(e){}}
const SND={tick:()=>tone(880,.08,'square',.06),join:()=>{tone(660,.1);tone(990,.15,'sine',.15,.1)},end:()=>[523,392,330,262].forEach((f,i)=>tone(f,.25,'triangle',.18,i*.15)),
 fan:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.3,'triangle',.18,i*.13)),drum:()=>{for(let i=0;i<10;i++)tone(120+i*8,.07,'square',.05,i*.07)},grow:()=>[392,523,659].forEach((f,i)=>tone(f,.2,'sine',.12,i*.12))};
function confetti(n=60){for(let i=0;i<n;i++){const s=document.createElement('div');s.className='confetti';s.textContent=['🌸','🌼','🍃','🌷','✨','🌻'][i%6];s.style.left=Math.random()*100+'vw';s.style.animationDuration=(2.5+Math.random()*2.5)+'s';s.style.animationDelay=Math.random()*1.2+'s';document.body.appendChild(s);setTimeout(()=>s.remove(),6000)}}
function qr(el,text){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';
 const fb=()=>{el.innerHTML='<img src="qr.png" width="260" alt="QR-Code"><div style="color:#243238;font-weight:800;font-size:.9rem">dann Code eingeben</div>'};s.onload=()=>{try{const q=qrcode(0,'M');q.addData(text);q.make();el.innerHTML=q.createImgTag(7,0)}catch(e){fb()}};s.onerror=fb;document.head.appendChild(s)}

/* ================= LEHRPERSON (Beamer) ================= */
let G=null, GREC=null, TEAMS=[], ANS=[], ROUNDREC=null, timerH=null, pollH=null;
async function saveG(){GREC.data=G;await LA.update(GREC.id,G)}
function teamName(id){const t=TEAMS.find(x=>x.id===id);return t?t.data.name:'?'}
function teamEmo(id){const t=TEAMS.find(x=>x.id===id);return t?t.data.emo:'🌱'}
async function loadTeams(){const L=await LA.list('arena_team',{grp:G.code});const seen={},out=[];L.slice().reverse().forEach(r=>{seen[r.owner]=r});Object.values(seen).forEach(r=>out.push(r));out.sort((a,b)=>ts(a)-ts(b));TEAMS=out}
function newCode(){return String(1000+Math.floor(Math.random()*9000))}
function shell(inner,right=''){return `<div class="wrap"><div class="bar0"><div class="logo">🌿 Pflanzen-Arena<small>${esc(SET.titel)} · Code ${esc(G?G.code:'')}</small></div><div class="row">${right}</div></div>${inner}</div><button class="mute" id="mute" title="Ton">${muted?'🔇':'🔊'}</button>`}
function wireMute(){const m=$('#mute');if(m)m.onclick=()=>{muted=!muted;m.textContent=muted?'🔇':'🔊'}}
function stopAll(){clearInterval(timerH);clearInterval(pollH);timerH=pollH=null}

async function hostStart(){
 document.body.classList.add('host');
 const u=await LA.requireLogin();
 if(u.role!=='teacher'){APP.innerHTML=`<div class="wrap"><div class="card"><b>Nur für die Lehrperson.</b><br>Melde dich mit dem Lehrerkonto an. Lernende öffnen die Seite ohne «?host».</div></div>`;return}
 const mine=(await LA.list('arena_game',{owner:u.id})).filter(r=>r.data&&r.data.phase!=='end'&&Date.now()-ts(r)<12*3600e3);
 APP.innerHTML=`<div class="wrap"><div class="bar0"><div class="logo">🌿 Pflanzen-Arena<small>${esc(SET.titel)}</small></div></div>
 <div class="card" style="max-width:720px;margin:2rem auto;text-align:center"><h2 style="margin-top:0">Gruppenwettkampf Pflanzenverwendung</h2>
 <p>Teams zu zweit, ein Handy pro Team. Pro Runde ein Fall, bis 4 Pflanzen. Du bewertest die Korrektheit, die App vergibt Tempo, Unikat- und Joker-Punkte.</p>
 <button class="hbtn2" id="new">▶ Neues Spiel eröffnen</button>
 ${mine.length?`<p style="margin-top:1.2rem">oder weiterspielen:</p>${mine.map(r=>`<button class="hbtn2 sec" data-g="${r.id}" style="margin:.3rem">Spiel ${esc(r.data.code)} · Runde ${(r.data.done||[]).length}</button>`).join('')}`:''}</div></div>`;
 $('#new').onclick=async()=>{G={code:newCode(),set:SETKEY,phase:'lobby',r:-1,order:R.map((_,i)=>i),done:[],marks:{},snap:{},pts:{},last:{},jokers:{},adj:{},hist:{}};GREC=await LA.add('arena_game',G.code,G);G=GREC.data;lobby()};
 APP.querySelectorAll('[data-g]').forEach(b=>b.onclick=async()=>{GREC=mine.find(r=>r.id===b.dataset.g);G=GREC.data;await loadTeams();resume()});
}
function resume(){({lobby,event:nextRound,question:hostQuestion,mark:hostMark,scores:hostScores,end:hostEnd})[G.phase]()}
/* --- Lobby --- */
function lobby(){
 stopAll();G.phase='lobby';const url=location.origin+location.pathname+'?code='+G.code+(SETKEY!=='l35'?'&set='+SETKEY:'');
 APP.innerHTML=shell(`<div class="lobby"><div><p style="font-size:1.4rem;font-weight:800;margin:0">1. Handy: QR-Code scannen oder<br><span style="color:var(--sun)">${esc(url.replace(/^https?:\/\//,''))}</span></p>
  <p style="font-size:1.4rem;font-weight:800;margin:1rem 0 .3rem">2. Anmelden wie bei den Lernapps, Code eingeben:</p><div class="big-code">${G.code}</div>
  <div class="card" style="margin-top:1.2rem"><b>So gibt es Punkte</b><ul style="margin:.4rem 0 0;padding-left:1.2rem;font-weight:700">
  <li>✅ richtige Pflanze, botanisch und deutsch: <b>2</b> (nur ein Teil richtig: 1)</li><li>⚡ Tempo: die schnellsten 3 Teams <b>+3 / +2 / +1</b> (nur mit mind. 1 richtigen Pflanze)</li>
  <li>🦄 Unikat: richtige Pflanze, die sonst kein Team nennt: <b>+1</b></li><li>🃏 Joker: einmal pro Spiel, verdoppelt eure Runde</li><li>🎴 Vor jeder Runde wird eine Ereigniskarte aufgedeckt …</li></ul></div></div>
  <div style="text-align:center"><div class="qr" id="qr"></div><h3 style="margin:1rem 0 .5rem">Teams: <span id="tc">0</span></h3><div class="seeds" id="seeds" style="justify-content:center"></div>
  <div style="margin-top:1.4rem"><button class="hbtn2" id="go" disabled>🎴 Erste Runde starten</button></div></div></div>`,`<span class="pill">👩‍🏫 ${esc(LA.user.name)}</span>`);
 wireMute();qr($('#qr'),url);let known=0;
 const draw=()=>{$('#tc').textContent=TEAMS.length;$('#seeds').innerHTML=TEAMS.map(t=>`<div class="seed">${esc(t.data.emo)} ${esc(t.data.name)}</div>`).join('')||'<i style="opacity:.7">Noch kein Team. Scannt den Code!</i>';$('#go').disabled=!TEAMS.length;if(TEAMS.length>known)SND.join();known=TEAMS.length};
 const tick=async()=>{try{await loadTeams();draw()}catch(e){}};tick();pollH=setInterval(tick,POLL);
 $('#go').onclick=()=>nextRound();
 saveG().catch(()=>{});
}
/* --- Ereigniskarte und Frage --- */
function nextIdx(){return G.order.find(i=>!G.done.includes(i))}
async function nextRound(){
 stopAll();const i=nextIdx();if(i==null)return hostEnd();
 const r=R[i],ev=EV[r.ereignis]||EV.normal;G.r=i;G.phase='event';await saveG();
 APP.innerHTML=shell(`<h2 style="text-align:center;font-size:2rem;margin:.5rem 0">Runde ${G.done.length+1}: Die Ereigniskarte</h2>
  <div class="evcard" id="ev"><div class="evinner"><div class="evface evback">🎴</div><div class="evface evfront"><div><div class="i">${ev.icon}</div><h2>${esc(ev.name)}</h2><p>${esc(ev.text)}</p></div></div></div></div>
  <div style="text-align:center"><button class="hbtn2" id="q" style="visibility:hidden">▶ Fall zeigen und Zeit starten</button></div>`);
 wireMute();SND.drum();setTimeout(()=>{$('#ev').classList.add('flip');setTimeout(()=>{SND.fan();$('#q').style.visibility='visible'},900)},900);
 $('#q').onclick=startQuestion;
}
async function startQuestion(){
 const i=G.r,r=R[i];ROUNDREC=await LA.add('arena_round',G.code,{r:i,zeit:r.zeit,n:r.n});
 G.phase='question';G.roundId=ROUNDREC.id;G.roundStart=ROUNDREC.created_at;G.zeit=r.zeit;G.n=r.n;await saveG();hostQuestion();
}
async function hostQuestion(){
 stopAll();const i=G.r,r=R[i],ev=EV[r.ereignis]||EV.normal;
 if(!ROUNDREC){const L=await LA.list('arena_round',{grp:G.code});ROUNDREC=L.find(x=>x.id===G.roundId)||{created_at:G.roundStart}}
 const start=ts(ROUNDREC);
 const t0=Date.now()-Math.max(0,Math.min(r.zeit*1000,Date.now()-start));
 APP.innerHTML=shell(`<div class="qgrid"><div class="case"><span class="evtag">${ev.icon} ${esc(ev.name)}</span><h2>${esc(r.titel)}</h2><div class="chips2">${r.chips.map(c=>`<span>${esc(c)}</span>`).join('')}</div>
  <p class="fall">${esc(r.fall)}</p><p class="frage">❓ ${esc(r.frage)}</p></div>
  <div><div class="clock" id="clk"><svg width="250" height="250"><circle cx="125" cy="125" r="110" stroke="rgba(255,255,255,.15)" stroke-width="18" fill="none"/><circle id="arc" cx="125" cy="125" r="110" stroke="#ffc933" stroke-width="18" fill="none" stroke-linecap="round" stroke-dasharray="691" stroke-dashoffset="0"/></svg><div class="t" id="sec">${r.zeit}</div></div>
  <h3 style="text-align:center;margin:.6rem 0">Eingegangen: <span id="cnt">0</span> / ${TEAMS.length}</h3><div class="inbox" id="inbox"></div>
  <div style="text-align:center;margin-top:1rem"><button class="hbtn2 red" id="stop">⏹ Zeit stoppen und auflösen</button></div></div></div>`,`<span class="pill">Runde ${G.done.length+1}</span>`);
 wireMute();let last=-1,known=0;
 const end=async()=>{if(G.phase!=='question')return;stopAll();SND.end();await snapshot();hostMark()};
 timerH=setInterval(()=>{const left=Math.max(0,Math.ceil(r.zeit-(Date.now()-t0)/1000));if(left!==last){last=left;$('#sec').textContent=left;$('#arc').setAttribute('stroke-dashoffset',691*(1-left/r.zeit));$('#clk').classList.toggle('low',left<=10);if(left<=5&&left>0)SND.tick()}if(left<=0)end()},200);
 const poll=async()=>{try{await loadTeams();ANS=await LA.list('arena_ans',{grp:G.code+':'+i});const by=firstPerTeam(ANS);$('#cnt').textContent=by.length;
  $('#inbox').innerHTML=by.map((a,k)=>`<div><span>${k<3?['🥇','🥈','🥉'][k]:'✔️'} ${esc(teamEmo(a.data.team))} ${esc(teamName(a.data.team))}</span><span>${((ts(a)-ts(ROUNDREC))/1000).toFixed(1)} s</span></div>`).join('');
  if(by.length>known){SND.join();known=by.length}
  if(TEAMS.length&&by.length>=TEAMS.length)end()}catch(e){}};
 poll();pollH=setInterval(poll,POLL);$('#stop').onclick=end;
}
function firstPerTeam(L){const m={};L.slice().sort((a,b)=>ts(a)-ts(b)).forEach(a=>{const t=a.data&&a.data.team;if(t&&!m[t])m[t]=a});return Object.values(m).sort((a,b)=>ts(a)-ts(b))}
async function snapshot(){
 const i=G.r;ANS=await LA.list('arena_ans',{grp:G.code+':'+i});const by=firstPerTeam(ANS);const st=ts(ROUNDREC||{created_at:G.roundStart});
 G.snap[i]=by.map((a,k)=>({team:a.data.team,plants:(a.data.plants||[]).slice(0,R[i].n),joker:!!a.data.joker&&G.jokers[a.data.team]==null,rank:k,t:Math.max(0,(ts(a)-st)/1000)}));
 G.marks[i]=G.marks[i]||{};G.snap[i].forEach(s=>{if(!G.marks[i][s.team])G.marks[i][s.team]=s.plants.map(()=>null)});
 G.phase='mark';await saveG();
}
/* --- Bewerten --- */
function uniques(i){const S=G.snap[i]||[],cnt={};S.forEach(s=>{const keys=new Set(s.plants.map(keyOf).filter(Boolean));keys.forEach(k=>cnt[k]=(cnt[k]||0)+1)});
 const U={};S.forEach(s=>{U[s.team]=s.plants.map(p=>{const k=keyOf(p);return !!k&&cnt[k]===1})});return U}
function hostMark(){
 stopAll();const i=G.r,r=R[i],S=G.snap[i]||[],U=uniques(i);
 const rows=S.map(s=>{const m=G.marks[i][s.team]||[];return `<tr><td>${s.rank<3?`<span class="medal">${['🥇','🥈','🥉'][s.rank]}</span>`:''} ${esc(teamEmo(s.team))} ${esc(teamName(s.team))}<div class="tsec">${s.t.toFixed(1)} s${s.joker?' · 🃏 Joker':''}</div></td>
  ${Array.from({length:r.n},(_,k)=>{const p=s.plants[k];return `<td>${p&&p.trim()?`<button class="pl" data-t="${s.team}" data-k="${k}" data-m="${m[k]==null?'':m[k]}">${esc(p)}${U[s.team]&&U[s.team][k]?'<span class="uni" title="Unikat">🦄</span>':''}</button>`:'<span class="pl empty">–</span>'}</td>`}).join('')}
  <td><button class="hbtn2 sec" style="padding:.4rem .7rem;font-size:.95rem" data-all="${s.team}">alle ✓</button></td></tr>`}).join('');
 APP.innerHTML=shell(`<div class="case" style="padding:.9rem 1.2rem;margin-bottom:.6rem"><b style="font-size:1.3rem">${esc(r.titel)}:</b> <span style="font-size:1.2rem;font-weight:700">${esc(r.frage)}</span></div>
  <div class="legend"><span>Klick auf eine Pflanze: ✅ 2 Pkt → 🟡 1 Pkt (nur teilweise richtig) → ❌ 0</span><span>🦄 nennt sonst niemand</span><span>🥇🥈🥉 Tempo</span></div>
  ${S.length?`<table class="mark">${rows}</table>`:'<div class="card">Kein Team hat abgegeben.</div>'}
  <div class="row" style="margin-top:.8rem"><button class="hbtn2 sec" id="sol">💡 Lösungsvorschläge</button><button class="hbtn2" id="pts">🌱 Punkte vergeben</button></div><div id="solbox"></div>`,`<span class="pill">Runde ${G.done.length+1} · Bewertung</span>`);
 wireMute();
 APP.querySelectorAll('.pl[data-t]').forEach(b=>b.onclick=()=>{const t=b.dataset.t,k=+b.dataset.k,cur=G.marks[i][t][k];const nx=cur==null?2:cur===2?1:cur===1?0:2;G.marks[i][t][k]=nx;b.dataset.m=nx;tone(nx?700:250,.08);saveG().catch(()=>{})});
 APP.querySelectorAll('[data-all]').forEach(b=>b.onclick=()=>{const t=b.dataset.all;const s=S.find(x=>x.team===t);G.marks[i][t]=s.plants.map(p=>p&&p.trim()?2:0);hostMark();saveG().catch(()=>{})});
 $('#sol').onclick=()=>{$('#solbox').innerHTML=$('#solbox').innerHTML?'':`<div class="sol"><b>Lösungsvorschläge</b> · ${esc(r.tipp||'')}<ul>${r.loesung.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`};
 $('#pts').onclick=()=>{const open=S.some(s=>(G.marks[i][s.team]||[]).some((m,k)=>m==null&&s.plants[k]&&s.plants[k].trim()));if(open&&!confirm('Noch nicht alle Pflanzen bewertet. Unbewertete zählen 0. Trotzdem vergeben?'))return;score()};
}
async function score(){
 const i=G.r,r=R[i],S=G.snap[i]||[],U=uniques(i),ev=r.ereignis;G.last={};
 let speedRank=0;
 S.forEach(s=>{const m=(G.marks[i][s.team]||[]).map(x=>x||0);const k=m.reduce((a,b)=>a+b,0);
  let t=0;if(k>0&&speedRank<3){t=TEMPO[speedRank];}if(k>0)speedRank++;
  const u=m.filter((x,j)=>x>0&&U[s.team]&&U[s.team][j]).length*(ev==='klee'?2:1);
  let mult=1;if(ev==='gold')mult*=2;if(s.joker){mult*=2;G.jokers[s.team]=i}
  const tot=(k+t+u)*mult;G.pts[s.team]=(G.pts[s.team]||0)+tot;G.last[s.team]={k,t,u,mult,tot,r:i};
  G.hist[s.team]=G.hist[s.team]||{};G.hist[s.team][i]=tot});
 G.done.push(i);G.phase='scores';await saveG();hostScores();
}
function total(id){return (G.pts[id]||0)+(G.adj[id]||0)}
function hostScores(){
 stopAll();const ids=TEAMS.map(t=>t.id);const max=Math.max(10,...ids.map(total));const lead=Math.max(...ids.map(total));
 const garden=ids.map(id=>{const h=Math.round(20+230*total(id)/max),L=G.last[id];return `<div class="plant ${total(id)===lead&&lead>0?'lead':''}"><div class="plus">${L&&L.tot?'+'+L.tot:''}</div><div class="fl">${esc(teamEmo(id))}</div><div class="stem" style="height:8px" data-h="${h}">${Array.from({length:Math.floor(h/34)},(_,k)=>`<i style="top:${12+k*34}px"></i>`).join('')}</div><div class="sc">${total(id)}</div><div class="nm">${esc(teamName(id))}</div></div>`}).join('');
 const rest=R.length-G.done.length;
 APP.innerHTML=shell(`<h2 style="text-align:center;margin:.2rem 0 0;font-size:2rem">🌳 Der Garten wächst</h2><div class="garden">${garden}</div>
  <table class="detail"><tr><th>Team</th><th>✅ Korrekt</th><th>⚡ Tempo</th><th>🦄 Unikat</th><th>× Bonus</th><th>Runde</th><th>Total</th><th>±</th></tr>
  ${ids.slice().sort((a,b)=>total(b)-total(a)).map(id=>{const L=G.last[id]||{};return `<tr><td>${esc(teamEmo(id))} ${esc(teamName(id))}</td><td>${L.k??'–'}</td><td>${L.t?'+'+L.t:'–'}</td><td>${L.u?'+'+L.u:'–'}</td><td>${L.mult>1?'×'+L.mult+(G.jokers[id]===L.r?' 🃏':''):'–'}</td><td>${L.tot??0}</td><td style="color:var(--sun)">${total(id)}</td><td><button class="adj" data-a="${id}" data-d="-1">−</button> <button class="adj" data-a="${id}" data-d="1">+</button></td></tr>`}).join('')}</table>
  <div class="row" style="justify-content:center;margin-top:1.2rem">${rest?`<button class="hbtn2" id="nx">🎴 Nächste Runde (${rest} übrig)</button>`:''}<button class="hbtn2 ${rest?'sec':''}" id="fin">🏆 Siegerehrung</button></div>`,`<span class="pill">Nach Runde ${G.done.length}</span>`);
 wireMute();SND.grow();requestAnimationFrame(()=>setTimeout(()=>APP.querySelectorAll('.stem').forEach(s=>s.style.height=s.dataset.h+'px'),60));
 APP.querySelectorAll('.adj').forEach(b=>b.onclick=async()=>{G.adj[b.dataset.a]=(G.adj[b.dataset.a]||0)+(+b.dataset.d);await saveG();hostScores()});
 if($('#nx'))$('#nx').onclick=nextRound;$('#fin').onclick=()=>{if(!rest||confirm('Spiel jetzt beenden und Siegerehrung zeigen?'))hostEnd()};
}
async function hostEnd(){
 stopAll();G.phase='end';await saveG();const ids=TEAMS.map(t=>t.id).sort((a,b)=>total(b)-total(a));
 const pod=[ids[1],ids[0],ids[2]].map((id,k)=>id?`<div style="min-height:${[190,250,160][k]}px"><span class="e">${esc(teamEmo(id))}</span>${['🥈','🥇','🥉'][k]} ${esc(teamName(id))}<br>${total(id)} Pkte</div>`:'<div style="visibility:hidden"></div>').join('');
 APP.innerHTML=shell(`<h1 style="text-align:center;font-size:3rem;margin:.5rem 0">🏆 Siegerehrung</h1><div class="podium">${pod}</div>
  <div class="card" style="max-width:700px;margin:0 auto"><b>Rangliste</b><ol style="font-weight:800;font-size:1.1rem">${ids.map(id=>`<li>${esc(teamEmo(id))} ${esc(teamName(id))}: ${total(id)} Punkte</li>`).join('')}</ol>
  <p class="small">Prüfung Pflanzenverwendung L35: Mittwoch, 09.12.2026. Viel Erfolg beim Lernen! 🌱</p></div>`);
 wireMute();SND.fan();confetti(90);
}

/* ================= TEAMS (Handy) ================= */
let ME=null, TEAM=null, GAME=null, myAns={};
function card(h){APP.innerHTML=`<div class="hero" style="min-height:150px;padding-bottom:2.4rem"><a href="../belagsaufbau/">← Lernapps</a><div class="who" id="who"></div><h1>🌿 Pflanzen-Arena</h1><p>Gruppenwettkampf Pflanzenverwendung</p></div><div class="wrap">${h}</div>`;LA.who($('#who'))}
async function playerStart(){
 ME=await LA.requireLogin();
 let code=(Q.get('code')||'').replace(/\D/g,'');
 if(!code){card(`<div class="card"><label><b>Spiel-Code vom Beamer</b></label><input class="fld pin" id="c" inputmode="numeric" maxlength="4" placeholder="0000"><button class="btn" id="ok">Weiter</button><div id="m"></div></div>`);
  $('#ok').onclick=()=>{const c=$('#c').value.replace(/\D/g,'');if(c.length!==4){$('#m').innerHTML='<div class="msg err">Der Code hat 4 Ziffern.</div>';return}location.search='?code='+c};return}
 const g=await findGame(code);if(!g){card(`<div class="card"><div class="msg err">Kein laufendes Spiel mit Code ${esc(code)}.</div><button class="btn" onclick="location.search=''">Anderen Code eingeben</button></div>`);return}
 GAME=g;const mine=(await LA.list('arena_team',{grp:code,owner:ME.id}))[0];
 if(mine){TEAM=mine;return playLoop()}
 let emo=EMOS[Math.floor(Math.random()*EMOS.length)];
 card(`<div class="card"><h2 style="margin-top:0">Euer Team</h2><label>Teamname</label><input class="fld" id="tn" maxlength="22" placeholder="z. B. Die Wurzelzwerge">
  <label>Wer ist im Team?</label><input class="fld" id="tm" maxlength="40" placeholder="Vornamen, z. B. Lea und Nico">
  <label>Euer Glückssymbol</label><div class="emos">${EMOS.map(e=>`<button data-e="${e}" class="${e===emo?'on':''}">${e}</button>`).join('')}</div>
  <div id="m"></div><button class="btn" id="go">🌱 Mitspielen</button></div>`);
 APP.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{emo=b.dataset.e;APP.querySelectorAll('[data-e]').forEach(x=>x.classList.toggle('on',x===b))});
 $('#go').onclick=async()=>{const n=$('#tn').value.trim(),m=$('#tm').value.trim();if(!n){$('#m').innerHTML='<div class="msg err">Bitte einen Teamnamen eingeben.</div>';return}
  $('#go').disabled=true;try{TEAM=await LA.add('arena_team',code,{name:n,members:m,emo});playLoop()}catch(e){$('#m').innerHTML='<div class="msg err">'+esc(e.message)+'</div>';$('#go').disabled=false}};
}
async function findGame(code){const L=await LA.list('arena_game',{grp:code});return L.find(r=>Date.now()-ts(r)<12*3600e3)||null}
let view='',pH=null,drafts={};
async function playLoop(){
 const tick=async()=>{try{const L=await LA.list('arena_game',{grp:TEAM.grp});const g=L.find(r=>r.id===GAME.id)||L[0];if(g)GAME=g;renderPlayer()}catch(e){}};
 await tick();clearInterval(pH);pH=setInterval(tick,POLL);
}
function head(){const d=TEAM.data,G2=GAME.data;const sc=(G2.pts&&G2.pts[TEAM.id]||0)+(G2.adj&&G2.adj[TEAM.id]||0);
 return `<div class="team-head"><span class="e">${esc(d.emo)}</span><div><b style="font-size:1.2rem">${esc(d.name)}</b><div class="small">${esc(d.members||'')}</div></div><div style="margin-left:auto;text-align:right"><div class="small">Punkte</div><b style="font-size:1.5rem;color:var(--green-d)">${sc}</b></div></div>`}
function rankOf(){const G2=GAME.data,ids=Object.keys(Object.assign({},G2.pts||{},G2.adj||{}));const tot=id=>(G2.pts[id]||0)+((G2.adj||{})[id]||0);const me=tot(TEAM.id);return 1+ids.filter(id=>tot(id)>me).length}
async function renderPlayer(){
 const g=GAME.data,ph=g.phase,i=g.r,key=ph+':'+i+':'+(ph==='scores'?(g.done||[]).length:'');
 if(ph==='question'){if(myAns[i]===undefined){const L=await LA.list('arena_ans',{grp:g.code+':'+i,owner:ME.id});myAns[i]=L.length?L[0]:null}}
 if(key===view&&!(ph==='question'&&!myAns[i]))return;
 if(ph==='question'&&!myAns[i]&&view===key)return;view=key;
 const r=R[i],ev=r?(EV[r.ereignis]||EV.normal):null;
 if(ph==='lobby')return card(`<div class="card">${head()}<div class="wait"><span class="e">🌱</span><h2>Ihr seid dabei!</h2><p>Schaut auf den Beamer. Das Spiel startet gleich.</p></div></div>`);
 if(ph==='event')return card(`<div class="card">${head()}<div class="wait"><span class="e">🎴</span><h2>Ereigniskarte …</h2><p>Gleich geht es los. Augen auf den Beamer!</p></div></div>`);
 if(ph==='question'){
  if(myAns[i])return card(`<div class="card">${head()}<div class="wait"><span class="e">📨</span><h2>Abgegeben!</h2><p>Wartet auf die Auflösung am Beamer.</p></div></div>`);
  const jUsed=g.jokers&&g.jokers[TEAM.id]!=null;const d=drafts[i]||[];
  card(`<div class="card">${head()}<span class="evtag">${ev.icon} ${esc(ev.name)}</span><h2 style="margin:.3rem 0">${esc(r.titel)}</h2><p style="font-weight:700;margin:.2rem 0">${esc(r.fall)}</p>
   <p style="font-weight:900;color:var(--green-d)">${esc(r.frage)} <span class="mini-clock" id="mc"></span></p><div class="small">Botanisch und deutsch, z. B. «Carpinus betulus, Hainbuche»</div>
   ${Array.from({length:r.n},(_,k)=>`<div class="pf"><b>${k+1}</b><input class="fld" data-k="${k}" value="${esc(d[k]||'')}" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Pflanze ${k+1}"></div>`).join('')}
   <label class="joker ${jUsed?'used':''}"><input type="checkbox" id="jk" ${jUsed?'disabled':''}><span>🃏 Joker einsetzen: Diese Runde zählt doppelt${jUsed?' (schon gebraucht)':' (nur einmal pro Spiel)'}</span></label>
   <div id="m"></div><button class="btn" id="send">📨 Abgeben</button><div class="small" style="text-align:center">Je schneller, desto mehr Tempo-Punkte. Nach dem Abgeben könnt ihr nichts mehr ändern.</div></div>`);
  clearInterval(window._mc);const st=new Date(g.roundStart).getTime(),zz=g.zeit||r.zeit;window._mc=setInterval(()=>{const e=$('#mc');if(!e){clearInterval(window._mc);return}const left=Math.max(0,Math.ceil(zz-(Date.now()-st)/1000));e.textContent='⏱ '+Math.min(zz,left)+' s'},500);
  APP.querySelectorAll('[data-k]').forEach(inp=>inp.oninput=()=>{drafts[i]=drafts[i]||[];drafts[i][+inp.dataset.k]=inp.value});
  $('#send').onclick=async()=>{const pl=[...APP.querySelectorAll('[data-k]')].map(x=>x.value.trim());if(!pl.some(Boolean)){$('#m').innerHTML='<div class="msg err">Mindestens eine Pflanze eingeben.</div>';return}
   if(GAME.data.phase!=='question'){$('#m').innerHTML='<div class="msg err">Die Zeit ist leider abgelaufen.</div>';return}
   $('#send').disabled=true;try{myAns[i]=await LA.add('arena_ans',g.code+':'+i,{team:TEAM.id,plants:pl,joker:$('#jk').checked&&!jUsed});view='';renderPlayer()}catch(e){$('#m').innerHTML='<div class="msg err">'+esc(e.message)+'</div>';$('#send').disabled=false}};
  return}
 if(ph==='mark')return card(`<div class="card">${head()}<div class="wait"><span class="e">🧐</span><h2>Zeit um!</h2><p>Die Lehrperson bewertet jetzt eure Pflanzen am Beamer. Diskutiert mit: Was passt, was nicht?</p></div></div>`);
 if(ph==='scores'){const L=(g.last||{})[TEAM.id];
  return card(`<div class="card">${head()}${L?`<div class="res-big">+${L.tot}</div><ul style="font-weight:800"><li>✅ Korrekt: ${L.k}</li><li>⚡ Tempo: ${L.t?'+'+L.t:'0'}</li><li>🦄 Unikat: ${L.u?'+'+L.u:'0'}</li>${L.mult>1?`<li>✖️ Bonus: ×${L.mult}</li>`:''}</ul>`:'<p>Diese Runde habt ihr nichts abgegeben.</p>'}<p style="text-align:center;font-weight:900;font-size:1.2rem">Rang ${rankOf()}</p><div class="small" style="text-align:center">Gleich kommt die nächste Ereigniskarte …</div></div>`)}
 if(ph==='end'){clearInterval(pH);return card(`<div class="card">${head()}<div class="wait"><span class="e">🏆</span><h2>Spiel fertig: Rang ${rankOf()}</h2><p>Danke fürs Mitspielen! Lernt bis zum 09.12. weiter: botanisch und deutsch. 🌱</p></div></div>`)}
}

(HOST?hostStart:playerStart)().catch(e=>{APP.innerHTML=`<div class="wrap"><div class="card"><div class="msg err">${esc(e.message||e)}</div></div></div>`});
})();
