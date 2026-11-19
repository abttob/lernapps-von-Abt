/* Hilfen für die Lernapps: gestufte Tipps auf Abruf und Hintergrund-Fenster.
   bg = {t:'kurzer Text (HTML)', lm:'S. 150', d:'S. 10', x:'weitere Quelle'}  lm = Lehrmittel J5, d = Dossier Platz- und Wegebau */
(function(){
const css=`.hbar{display:flex;gap:.5rem;flex-wrap:wrap;margin:.2rem 0 .4rem}
.hbtn{width:auto;flex:0 0 auto;margin:0;box-shadow:none;font:inherit;font-weight:800;font-size:.86rem;border:2px solid var(--line,#cfe3c6);background:#fff;color:var(--green-d,#2e7d32);border-radius:999px;padding:.4rem .7rem;min-height:44px;cursor:pointer;display:inline-flex;align-items:center;gap:.35rem}
.hbtn:hover:not(:disabled){border-color:var(--green,#3f9d4a);background:#f3fbf0}
.hbtn:disabled{opacity:.45;cursor:default}
.hbtn.tip{border-color:#f2c94c;color:#7a5a00;background:#fffbea}
.tips{margin:.2rem 0}
.tipbox{margin:.45rem 0;padding:.7rem .9rem;background:#fffbea;border:2px dashed #f2c94c;border-radius:14px;font-weight:600;line-height:1.4;animation:tipin .25s ease}
.tipbox b.n{display:inline-block;background:#f2c94c;color:#5a4300;border-radius:999px;padding:0 .5rem;margin-right:.4rem;font-size:.82rem}
@keyframes tipin{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.opt.gone{opacity:.28;text-decoration:line-through}
.m.hint{outline:4px solid #f2c94c;outline-offset:2px;animation:hpulse 1s ease 2}
@keyframes hpulse{50%{outline-color:#ffe58a}}
.hov{position:fixed;inset:0;background:rgba(20,40,20,.45);z-index:50;display:flex;align-items:flex-end;justify-content:center;padding:1rem;animation:tipin .2s ease}
@media(min-width:640px){.hov{align-items:center}}
.hdlg{background:#fff;border-radius:22px;max-width:560px;width:100%;max-height:85vh;overflow:auto;padding:1.1rem 1.2rem 1rem;box-shadow:0 10px 40px rgba(0,0,0,.25);border:3px solid var(--line,#cfe3c6)}
.hdlg h3{margin:0 0 .5rem;font-size:1.2rem}
.hdlg .ht{font-weight:600;line-height:1.5}
.hdlg .ht ul{margin:.3rem 0;padding-left:1.2rem}.hdlg .ht li{margin:.2rem 0}
.hdlg .src{margin-top:.8rem;padding:.65rem .8rem;background:#eef6ea;border-radius:12px;font-weight:700;font-size:.92rem}
.hdlg .src div{margin:.15rem 0}
.hdlg .btn{margin:.8rem 0 0}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

function src(bg){const a=[];
 if(bg.lm)a.push(`📗 Lehrmittel J5 «Garten- und Landschaftsarbeiten ausführen», ${bg.lm}`);
 if(bg.d)a.push(`📘 Dossier Platz- und Wegebau, ${bg.d}`);
 if(bg.x)a.push(`🔗 ${bg.x}`);
 return a.length?`<div class="src">Nachlesen:${a.map(x=>`<div>${x}</div>`).join('')}</div>`:''}
function info(bg,title){if(!bg)return;
 const o=document.createElement('div');o.className='hov';
 o.innerHTML=`<div class="hdlg" role="dialog" aria-modal="true"><h3>ℹ️ ${title||'Hintergrund zur Aufgabe'}</h3><div class="ht">${bg.t||''}</div>${src(bg)}<button class="btn" data-x>Verstanden</button></div>`;
 const close=()=>{o.remove();document.removeEventListener('keydown',k)};const k=e=>{if(e.key==='Escape')close()};
 o.onclick=e=>{if(e.target===o||e.target.hasAttribute('data-x'))close()};document.addEventListener('keydown',k);
 document.body.appendChild(o);o.querySelector('[data-x]').focus()}

/* bar(): HTML für die Knopfleiste. wire(host,{tips,bg}) macht sie aktiv.
   tips: Array aus Strings oder Funktionen (Funktion führt eine Hilfe aus und gibt den Text zurück). */
function bar(o){o=o||{};return `<div class="hbar">${o.tips===false?'':`<button type="button" class="hbtn tip" data-tip>💡 Tipp</button>`}${o.info===false?'':`<button type="button" class="hbtn" data-info>ℹ️ Hintergrund</button>`}</div><div class="tips"></div>`}
function wire(host,o){const tb=host.querySelector('[data-tip]'),ib=host.querySelector('[data-info]'),box=host.querySelector('.tips');
 const tips=(o.tips||[]).filter(Boolean);let n=0;const ctl={used:0,lock(){if(tb)tb.disabled=true},reset(t){tips.length=0;(t||[]).filter(Boolean).forEach(x=>tips.push(x));n=0;box.innerHTML='';lab()}};
 function lab(){if(!tb)return;if(!tips.length){tb.style.display='none';return}tb.style.display='';tb.disabled=n>=tips.length;tb.innerHTML=n>=tips.length?'💡 Keine mehr':`💡 Tipp ${n+1}/${tips.length}`}
 if(tb)tb.onclick=()=>{if(n>=tips.length)return;let t=tips[n];if(typeof t==='function')t=t();n++;ctl.used=n;
  if(t)box.insertAdjacentHTML('beforeend',`<div class="tipbox"><b class="n">Tipp ${n}</b>${t}</div>`);lab();if(o.onTip)o.onTip(n)};
 if(ib){if(!o.bg)ib.style.display='none';else ib.onclick=()=>info(o.bg,o.title)}
 lab();return ctl}
window.HILFE={bar,wire,info};
})();
