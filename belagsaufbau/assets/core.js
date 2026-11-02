/* Gemeinsame Basis: Login, Fortschritt, gemeinsame Einträge, Fotos. */
(function(){
const C=window.LA_CONFIG||{};
const DEMO=!C.url||!C.key||/[?&]demo=1/.test(location.search);
const $=(s,r)=> (r||document).querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=n=>String(n).trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ß/g,'ss').replace(/[^a-z0-9]/g,'');
const emailOf=n=>'lernapp-bbzbl-'+norm(n)+'@gmail.com';
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}};
const uuid=()=>'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0;return(c=='x'?r:(r&3|8)).toString(16)});

function resizeImage(file,max=1280,q=.8){return new Promise((res,rej)=>{
 const img=new Image(),u=URL.createObjectURL(file);
 img.onload=()=>{let w=img.width,h=img.height;const s=Math.min(1,max/Math.max(w,h));w=Math.round(w*s);h=Math.round(h*s);
  const cv=document.createElement('canvas');cv.width=w;cv.height=h;cv.getContext('2d').drawImage(img,0,0,w,h);URL.revokeObjectURL(u);
  cv.toBlob(b=>b?res(b):rej(new Error('Bild nicht lesbar')),'image/jpeg',q)};
 img.onerror=()=>rej(new Error('Bild nicht lesbar'));img.src=u})}
const blobToDataURL=b=>new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result);f.readAsDataURL(b)});

/* ---------------- Demo-Backend (nur dieses Gerät) ---------------- */
const Local={
 demo:true,
 async init(){},
 async signUp(name,pw,code){
  const U=store.get('la:users',{});const k=norm(name);
  if(!k)throw new Error('Bitte einen Vornamen eingeben.');
  if(U[k])throw new Error('Dieser Name ist schon vergeben. Nimm z. B. einen Buchstaben dazu (Anna B).');
  let role;if(code==='lehrer')role='teacher';else if(code==='klasse')role='student';else throw new Error('Klassencode falsch. (Demo-Modus: «klasse»)');
  U[k]={id:'u_'+k,name:name.trim(),pw:btoa(unescape(encodeURIComponent(pw))),role};store.set('la:users',U);store.set('la:session',U[k].id);return Local.session()},
 async signIn(name,pw){const U=store.get('la:users',{});const u=U[norm(name)];
  if(!u||u.pw!==btoa(unescape(encodeURIComponent(pw))))throw new Error('Name oder Passwort stimmt nicht.');store.set('la:session',u.id);return Local.session()},
 async signOut(){try{localStorage.removeItem('la:session')}catch(e){}},
 async session(){const id=store.get('la:session',null);if(!id)return null;const U=store.get('la:users',{});const u=Object.values(U).find(x=>x.id===id);return u?{id:u.id,name:u.name,role:u.role}:null},
 async progressMine(uid){return store.get('la:prog:'+uid,{})},
 async progressSave(uid,slug,pct,data){const P=store.get('la:prog:'+uid,{});P[slug]={pct,data,updated_at:new Date().toISOString()};store.set('la:prog:'+uid,P)},
 async progressAll(){const U=store.get('la:users',{});const out=[];Object.values(U).forEach(u=>{const P=store.get('la:prog:'+u.id,{});Object.entries(P).forEach(([slug,v])=>out.push({user_id:u.id,slug,pct:v.pct,data:v.data,updated_at:v.updated_at}))});return out},
 async profiles(){return Object.values(store.get('la:users',{})).map(u=>({id:u.id,name:u.name,role:u.role}))},
 async recAdd(me,kind,grp,data){const R=store.get('la:rec',[]);const r={id:uuid(),kind,grp:grp||null,owner:me.id,owner_name:me.name,data,created_at:new Date().toISOString()};R.push(r);if(!store.set('la:rec',R)){R.pop();throw new Error('Speicher voll. Im Demo-Modus passen nur wenige Fotos.')}return r},
 async recList(kind,f){let R=store.get('la:rec',[]).filter(r=>r.kind===kind);if(f&&f.grp)R=R.filter(r=>r.grp===f.grp);if(f&&f.owner)R=R.filter(r=>r.owner===f.owner);return R.sort((a,b)=>b.created_at.localeCompare(a.created_at))},
 async recUpdate(id,data){const R=store.get('la:rec',[]);const r=R.find(x=>x.id===id);if(r){r.data=data;store.set('la:rec',R)}},
 async recDelete(id){store.set('la:rec',store.get('la:rec',[]).filter(r=>r.id!==id))},
 async photoAdd(me,blob,ctx,grp,caption){const url=await blobToDataURL(await resizeImage(blob,560,.7));return Local.recAdd(me,'photo',grp,{url,ctx,caption})}
};

/* ---------------- Supabase-Backend ---------------- */
const Sup={
 demo:false,sb:null,
 async init(){
  if(!window.supabase){await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';s.onload=ok;s.onerror=()=>no(new Error('Supabase konnte nicht geladen werden.'));document.head.appendChild(s)})}
  Sup.sb=window.supabase.createClient(C.url,C.key,{auth:{persistSession:true,autoRefreshToken:true}});
 },
 err(e){const m=(e&&e.message)||String(e);
  if(/Klassencode/i.test(m))return new Error('Klassencode falsch.');
  if(/already registered|already been registered|duplicate/i.test(m))return new Error('Dieser Name ist schon vergeben. Nimm z. B. einen Buchstaben dazu (Anna B).');
  if(/Invalid login/i.test(m))return new Error('Name oder Passwort stimmt nicht.');
  if(/at least|weak|short/i.test(m))return new Error('Das Passwort ist zu kurz (mindestens 6 Zeichen).');
  if(/Failed to fetch|NetworkError/i.test(m))return new Error('Keine Verbindung zum Server.');
  return new Error(m)},
 async signUp(name,pw,code){
  const k=norm(name);if(!k)throw new Error('Bitte einen Vornamen eingeben.');
  const {data,error}=await Sup.sb.auth.signUp({email:emailOf(name),password:pw,options:{data:{name:name.trim(),code:code}}});
  if(error)throw Sup.err(error);
  if(!data.session)return Sup.signIn(name,pw);
  return Sup.session()},
 async signIn(name,pw){const {error}=await Sup.sb.auth.signInWithPassword({email:emailOf(name),password:pw});if(error)throw Sup.err(error);return Sup.session()},
 async signOut(){await Sup.sb.auth.signOut()},
 async session(){const {data}=await Sup.sb.auth.getSession();const s=data&&data.session;if(!s)return null;
  const {data:p}=await Sup.sb.from('profiles').select('id,name,role').eq('id',s.user.id).maybeSingle();
  return p?{id:p.id,name:p.name,role:p.role}:{id:s.user.id,name:(s.user.user_metadata||{}).name||'?',role:'student'}},
 async progressMine(uid){const {data,error}=await Sup.sb.from('progress').select('slug,pct,data,updated_at').eq('user_id',uid);if(error)throw Sup.err(error);const o={};(data||[]).forEach(r=>o[r.slug]=r);return o},
 async progressSave(uid,slug,pct,d){const {error}=await Sup.sb.from('progress').upsert({user_id:uid,slug,pct,data:d,updated_at:new Date().toISOString()},{onConflict:'user_id,slug'});if(error)throw Sup.err(error)},
 async progressAll(){const {data,error}=await Sup.sb.from('progress').select('user_id,slug,pct,data,updated_at').limit(10000);if(error)throw Sup.err(error);return data||[]},
 async profiles(){const {data,error}=await Sup.sb.from('profiles').select('id,name,role').order('name');if(error)throw Sup.err(error);return data||[]},
 async recAdd(me,kind,grp,data){const {data:r,error}=await Sup.sb.from('records').insert({kind,grp:grp||null,owner:me.id,owner_name:me.name,data}).select().single();if(error)throw Sup.err(error);return r},
 async recList(kind,f){let q=Sup.sb.from('records').select('*').eq('kind',kind).order('created_at',{ascending:false}).limit(500);if(f&&f.grp)q=q.eq('grp',f.grp);if(f&&f.owner)q=q.eq('owner',f.owner);const {data,error}=await q;if(error)throw Sup.err(error);return data||[]},
 async recUpdate(id,data){const {error}=await Sup.sb.from('records').update({data}).eq('id',id);if(error)throw Sup.err(error)},
 async recDelete(id){const {data}=await Sup.sb.from('records').select('data').eq('id',id).maybeSingle();
  if(data&&data.data&&data.data.path)await Sup.sb.storage.from('photos').remove([data.data.path]);
  const {error}=await Sup.sb.from('records').delete().eq('id',id);if(error)throw Sup.err(error)},
 async photoAdd(me,blob,ctx,grp,caption){const b=await resizeImage(blob,1280,.8);const path=me.id+'/'+Date.now()+'_'+Math.random().toString(36).slice(2,8)+'.jpg';
  const {error}=await Sup.sb.storage.from('photos').upload(path,b,{contentType:'image/jpeg'});if(error)throw Sup.err(error);
  const url=Sup.sb.storage.from('photos').getPublicUrl(path).data.publicUrl;return Sup.recAdd(me,'photo',grp,{url,path,ctx,caption})}
};

/* ---------------- Öffentliche API ---------------- */
const B=DEMO?Local:Sup;
const LA={demo:DEMO,esc,norm,$,store,resizeImage,uuid,user:null,prog:{},
 async init(){try{await B.init()}catch(e){LA.fatal=e;return null}try{LA.user=await B.session()}catch(e){LA.user=null}
  if(LA.user){try{LA.prog=await B.progressMine(LA.user.id)}catch(e){LA.prog={}}}return LA.user},
 /* Anmeldung erzwingen (Overlay) */
 requireLogin(){return new Promise(async res=>{
  await LA.init();if(LA.user)return res(LA.user);
  const box=document.createElement('div');box.className='auth';
  box.innerHTML=`<div class="card"><h2 style="margin:.1rem 0 .4rem">🌱 Willkommen!</h2>
   ${LA.demo?'<div class="banner">Demo-Modus: Die Daten bleiben nur auf diesem Gerät. (Klassencode: <b>klasse</b>, Lehrer: <b>lehrer</b>)</div>':''}
   ${LA.fatal?'<div class="msg err">'+esc(LA.fatal.message)+'</div>':''}
   <div class="tabs"><button data-t="in" class="on">Anmelden</button><button data-t="up">Neu registrieren</button></div>
   <label>Vorname</label><input class="fld" id="la_n" autocomplete="username" placeholder="nur dein Vorname" style="font-size:1.1rem">
   <label>Passwort</label><input class="fld" id="la_p" type="password" autocomplete="current-password" placeholder="mindestens 6 Zeichen" style="font-size:1.1rem">
   <div id="la_up" style="display:none"><label>Klassencode</label><input class="fld" id="la_c" placeholder="vom Lehrer" style="font-size:1.1rem">
    <p class="small" style="margin:0 0 .6rem">Verwende nur deinen <b>Vornamen</b> (keinen Nachnamen). Das Passwort wählst du selbst und gibst es niemandem weiter.</p></div>
   <div id="la_m"></div><button class="btn" id="la_go">Anmelden</button></div>`;
  document.body.appendChild(box);let mode='in';
  box.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{mode=b.dataset.t;box.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x===b));$('#la_up',box).style.display=mode==='up'?'block':'none';$('#la_go',box).textContent=mode==='up'?'Registrieren':'Anmelden';$('#la_p',box).autocomplete=mode==='up'?'new-password':'current-password';$('#la_m',box).innerHTML=''});
  const go=async()=>{const n=$('#la_n',box).value,p=$('#la_p',box).value,c=$('#la_c',box).value;const m=$('#la_m',box);m.innerHTML='';
   if(!n.trim()||!p){m.innerHTML='<div class="msg err">Bitte Name und Passwort eingeben.</div>';return}
   if(mode==='up'&&p.length<6){m.innerHTML='<div class="msg err">Das Passwort braucht mindestens 6 Zeichen.</div>';return}
   $('#la_go',box).disabled=true;
   try{LA.user=mode==='up'?await B.signUp(n,p,c.trim()):await B.signIn(n,p);try{LA.prog=await B.progressMine(LA.user.id)}catch(e){LA.prog={}}box.remove();res(LA.user)}
   catch(e){m.innerHTML='<div class="msg err">'+esc(e.message)+'</div>';$('#la_go',box).disabled=false}};
  $('#la_go',box).onclick=go;box.addEventListener('keydown',e=>{if(e.key==='Enter')go()})})},
 async logout(){await B.signOut();LA.user=null;location.reload()},
 who(el){if(!el||!LA.user)return;el.innerHTML=`<span>${LA.user.role==='teacher'?'👩‍🏫':'🙂'} ${esc(LA.user.name)}${LA.demo?' · Demo':''}</span><a href="#" id="la_out">Abmelden</a>`;$('#la_out',el).onclick=e=>{e.preventDefault();LA.logout()}},
 /* Fortschritt */
 async saveProgress(slug,o){if(!LA.user)return;const old=(LA.prog[slug]&&LA.prog[slug].data)||{};
  const best=Math.max(old.best||0,o.pct||0),stage=Math.max(old.stage||0,o.stage||0);
  const d=Object.assign({},old,o,{best,stage,runs:(old.runs||0)+(o.finished?1:0),last:o.pct});
  const pct=o.progressPct!=null?Math.max(old.pct||0,o.progressPct):best;d.pct=pct;
  LA.prog[slug]={slug,pct,data:d,updated_at:new Date().toISOString()};
  try{await B.progressSave(LA.user.id,slug,pct,d)}catch(e){console.warn(e)}},
 getProgress(slug){return LA.prog[slug]||null},
 allProgress:()=>B.progressAll(),profiles:()=>B.profiles(),
 /* gemeinsame Einträge */
 add:(kind,grp,data)=>B.recAdd(LA.user,kind,grp,data),list:(kind,f)=>B.recList(kind,f),update:(id,d)=>B.recUpdate(id,d),remove:id=>B.recDelete(id),
 photo:(blob,ctx,grp,caption)=>B.photoAdd(LA.user,blob,ctx,grp,caption)
};
window.LA=LA;
})();
