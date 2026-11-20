/* IT-Onboarding BBZ BL – gemeinsame Funktionen und Einstellungen */
window.ITO = (function(){
  const CFG = {
    API: "https://bbgqfuyezgxdcjcncrel.supabase.co/rest/v1/rpc/",
    KEY: "sb_publishable_z0hjQLCnjFoV00YvPUK9lw_JH6iskSy",
    LOGO: "https://www.bbzbl.ch/wp-content/uploads/2025/08/bl_logo_bksd_bbzbl_a_r_rgb.svg",
    BASE: "https://lernappsabt.vercel.app/it/",
    SHORT: "lernappsabt.vercel.app/it",
    // Name des Schul-WLANs: hier eintragen, dann erscheint er in allen Anleitungen.
    WLAN: "",
    SAL: "https://portal.sbl.ch/bbzbl/",
    OFFICE: "https://www.office.com",
    SUPPORT_MAIL: "Picts.bbzbl@sbl.ch",
    PW_RESET: "https://www.baselland.ch/politik-und-behorden/direktionen/bildungs-kultur-und-sportdirektion/it-sbl/technischer-support-1"
  };

  const ERR = {
    CLASS_NOT_FOUND: "Diesen Klassencode gibt es nicht. Frag deine Lehrperson.",
    STUDENT_NOT_FOUND: "Dein Name wurde nicht gefunden.",
    TOKEN_INVALID: "Deine Anmeldung ist abgelaufen. Bitte melde dich neu an.",
    WRONG_PASSWORD: "Das Passwort stimmt nicht.",
    SETUP_NEEDED: "Es ist noch kein Passwort gesetzt.",
    PASSWORD_TOO_SHORT: "Das Passwort braucht mindestens 8 Zeichen.",
    ALREADY_SET: "Das Passwort wurde schon gesetzt."
  };

  async function rpc(fn, args){
    let r;
    try{
      r = await fetch(CFG.API + fn, { method:"POST", headers:{ "apikey":CFG.KEY, "Authorization":"Bearer " + CFG.KEY, "Content-Type":"application/json" }, body:JSON.stringify(args || {}) });
    }catch(e){ throw new Error("Keine Verbindung zum Internet. Prüfe dein WLAN oder deine mobilen Daten."); }
    const txt = await r.text();
    let data = null; try{ data = txt ? JSON.parse(txt) : null; }catch(e){}
    if(!r.ok){
      const m = (data && (data.message || data.hint)) || txt || ("Fehler " + r.status);
      const key = Object.keys(ERR).find(k => String(m).includes(k));
      const err = new Error(key ? ERR[key] : "Es ist ein Fehler aufgetreten. Versuche es nochmals.");
      err.code = key || "ERR"; err.raw = m; throw err;
    }
    return data;
  }

  const store = {
    get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
    set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} },
    del(k){ try{ localStorage.removeItem(k); }catch(e){} }
  };
  const ss = {
    get(k){ try{ return sessionStorage.getItem(k); }catch(e){ return null; } },
    set(k,v){ try{ sessionStorage.setItem(k,v); }catch(e){} },
    del(k){ try{ sessionStorage.removeItem(k); }catch(e){} }
  };

  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function $(sel, root){ return (root || document).querySelector(sel); }
  function $$(sel, root){ return Array.from((root || document).querySelectorAll(sel)); }

  let toastT;
  function toast(msg, ms){
    let t = $(".toast"); if(!t){ t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.remove("hide"); clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.add("hide"), ms || 2600);
  }

  function header(active){
    const nav = [
      ["index.html","Übersicht","home"],
      ["start.html","Onboarding","start"],
      ["hilfe.html","Hilfe","hilfe"],
      ["training.html","IT-Training","training"]
    ];
    const h = document.createElement("header");
    h.className = "top";
    h.innerHTML = '<div class="top-in"><a href="index.html" aria-label="Zur Übersicht"><img class="logo" src="' + CFG.LOGO + '" alt="BBZ BL – Berufsbildungszentrum Baselland" onerror="this.replaceWith(Object.assign(document.createElement(\'b\'),{textContent:\'BBZ BL\',style:\'color:#205C90;font-size:1.3rem\'}))"></a>' +
      '<span class="apptitle">IT-Start</span><nav>' +
      nav.map(n => '<a href="' + n[0] + '"' + (n[2] === active ? ' class="on"' : "") + ">" + n[1] + "</a>").join("") + "</nav></div>";
    document.body.prepend(h);
  }

  function isMobile(){ return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent)); }
  function os(){
    const u = navigator.userAgent;
    if(/iPhone|iPad|iPod/.test(u) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(u))) return "ios";
    if(/Android/.test(u)) return "android";
    if(/Macintosh|Mac OS X/.test(u)) return "mac";
    if(/Windows/.test(u)) return "win";
    return "other";
  }
  function wlanName(){ return CFG.WLAN ? "«" + CFG.WLAN + "»" : "das Schul-WLAN (Name: siehe Plakat oder Wandtafel)"; }

  return { CFG, rpc, store, ss, esc, $, $$, toast, header, isMobile, os, wlanName };
})();
