/* Suchbild «Chaos im Werkhof» – wird in der App und für die Druckversion (Escape-Rätsel 3, Dossier) verwendet.
   Fehler: 1 Kabel, 2 Öllache, 3 Rechen, 4 Motorsäge, 5 Benzinkanister, 6 Heckenschere, 7 Feuerlöscher, 8 Akku  → Summe 36
   In Ordnung: 9 Lochwand, 10 Erste Hilfe, 11 Wartungsplan, 12 Ölbindemittel, 13 Desinfektion, 14 Schaufel */
(function(){
const SPOTS=[
 {n:1,err:true, t:"Verlängerungskabel quer über den Gehweg",e:"Stolperfalle! Kabel entlang der Wand führen oder mit Kabelbrücke sichern und nach Gebrauch aufrollen.",c:[[330,330,34],[395,385,34],[470,440,30]]},
 {n:2,err:true, t:"Öllache unter dem Rasenmäher",e:"Rutschgefahr und Umweltschaden. Ölbindemittel streuen, aufnehmen, als Sonderabfall entsorgen und das Leck suchen.",c:[[135,400,62]]},
 {n:3,err:true, t:"Rechen liegt mit den Zinken nach oben",e:"Wer darauf tritt, verletzt sich (Zinken oder Stiel schnellt hoch). Rechen aufhängen oder mit den Zinken nach unten hinlegen.",c:[[560,465,40],[630,458,38]]},
 {n:4,err:true, t:"Motorsäge ohne Kettenschutz",e:"Schnittgefahr. Nach dem Gebrauch: reinigen, Kette prüfen und den Kettenschutz immer aufsetzen.",c:[[600,198,55]]},
 {n:5,err:true, t:"Offener Benzinkanister",e:"Benzindämpfe sind giftig und explosiv. Kanister sofort schliessen und im Treibstofflager aufbewahren.",c:[[722,398,48]]},
 {n:6,err:true, t:"Verschmutzte Heckenschere aufgehängt",e:"Pflanzensaft und Harz verkleben die Messer, sie rosten, und Krankheiten werden übertragen. Zuerst reinigen, Harz lösen, ölen und den Messerschutz aufsetzen.",c:[[300,128,48]]},
 {n:7,err:true, t:"Feuerlöscher ist zugestellt",e:"Im Notfall zählt jede Sekunde. Feuerlöscher und Fluchtwege immer frei halten.",c:[[465,232,46]]},
 {n:8,err:true, t:"Akku lädt auf Karton neben Holzspänen",e:"Brandgefahr! Akkus auf nicht brennbarer Unterlage laden, nicht unbeaufsichtigt und weg von brennbarem Material.",c:[[495,350,44]]},
 {n:9,err:false,t:"Lochwand mit Umrissen",e:"Super: Jedes Werkzeug hat seinen Platz. Man sieht sofort, wenn etwas fehlt."},
 {n:10,err:false,t:"Erste-Hilfe-Kasten",e:"In Ordnung: gut sichtbar und erreichbar."},
 {n:11,err:false,t:"Wartungsplan an der Wand",e:"In Ordnung: Alle sehen, welches Gerät wann gewartet werden muss."},
 {n:12,err:false,t:"Ölbindemittel bereit",e:"In Ordnung: Damit kann man ausgelaufenes Öl sofort aufnehmen."},
 {n:13,err:false,t:"Desinfektionsmittel für Schnittwerkzeuge",e:"In Ordnung: Damit desinfiziert man Scheren und Sägen, z. B. bei Feuerbrand."},
 {n:14,err:false,t:"Schaufel sauber aufgehängt",e:"In Ordnung: sauber, aufgehängt, niemand stolpert darüber."}
];
const OKC={9:[[115,125,62]],10:[[750,75,30]],11:[[390,105,42]],12:[[750,258,32]],13:[[750,165,30]],14:[[232,110,30]]};
SPOTS.forEach(s=>{if(!s.c)s.c=OKC[s.n]});
const LAB={1:[300,320],2:[215,375],3:[668,438],4:[668,180],5:[770,370],6:[338,70],7:[505,195],8:[540,322],9:[30,45],10:[712,45],11:[440,58],12:[712,232],13:[712,140],14:[258,52]};

function svg(o){o=o||{};
 const em=(x,y,s,c)=>`<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle" dominant-baseline="central">${c}</text>`;
 let g=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" style="display:block;font-family:system-ui,'Segoe UI',sans-serif">
 <rect width="800" height="300" fill="#ece6d6"/><rect y="300" width="800" height="200" fill="#bdb8ae"/>
 <rect y="296" width="800" height="8" fill="#9c968a"/>
 <rect x="262" y="304" width="150" height="196" fill="#c9c4ba"/>
 <line x1="262" y1="304" x2="262" y2="500" stroke="#f2c200" stroke-width="5" stroke-dasharray="14 10"/>
 <line x1="412" y1="304" x2="412" y2="500" stroke="#f2c200" stroke-width="5" stroke-dasharray="14 10"/>
 <text x="337" y="492" font-size="13" text-anchor="middle" fill="#6b665c" font-weight="700">GEHWEG</text>
 <!-- 9 Lochwand -->
 <rect x="30" y="45" width="170" height="160" rx="6" fill="#c8a36a" stroke="#9b7b47" stroke-width="3"/>
 ${Array.from({length:7},(_,i)=>Array.from({length:6},(_,j)=>`<circle cx="${45+i*24}" cy="${60+j*25}" r="2.2" fill="#8d6c3a"/>`).join('')).join('')}
 <rect x="48" y="80" width="40" height="44" rx="6" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/><rect x="66" y="86" width="5" height="34" fill="#8a5a2b"/><rect x="56" y="84" width="26" height="10" rx="2" fill="#555"/>
 <rect x="96" y="80" width="40" height="44" rx="6" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/><rect x="111" y="84" width="10" height="16" rx="3" fill="#d32f2f"/><rect x="114" y="100" width="4" height="22" fill="#888"/>
 <rect x="144" y="80" width="40" height="44" rx="6" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/><rect x="161" y="92" width="6" height="30" fill="#888"/><circle cx="164" cy="90" r="8" fill="none" stroke="#888" stroke-width="5"/>
 <rect x="60" y="140" width="110" height="50" rx="6" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/><path d="M75 165 L150 158 L150 172 Z" fill="#9aa4ab" stroke="#5f6a72"/><rect x="140" y="160" width="26" height="10" rx="4" fill="#2f7a4a"/><path d="M75 165 L150 172" stroke="#5f6a72" stroke-width="2"/>
 <!-- 14 Schaufel -->
 <line x1="232" y1="40" x2="232" y2="130" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/>
 <path d="M216 128 h32 v28 q-16 22 -32 0z" fill="#8e9aa3" stroke="#5f6a72" stroke-width="2"/>
 <circle cx="232" cy="38" r="4" fill="#555"/>
 <!-- 6 Heckenschere, verschmutzt -->
 <circle cx="300" cy="42" r="4" fill="#555"/><line x1="300" y1="42" x2="300" y2="62" stroke="#555" stroke-width="2"/>
 <rect x="284" y="60" width="32" height="46" rx="8" fill="#f28c1b" stroke="#a85a0a" stroke-width="2"/>
 <rect x="294" y="104" width="12" height="96" fill="#9aa4ab" stroke="#5f6a72" stroke-width="2"/>
 ${[[290,120],[310,135],[292,152],[311,168],[296,185],[305,112]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="8" ry="5" fill="#4f8a2b"/>`).join('')}
 <!-- 11 Wartungsplan -->
 <rect x="350" y="55" width="82" height="102" fill="#fff" stroke="#888" stroke-width="2"/>
 <text x="391" y="72" font-size="11" text-anchor="middle" font-weight="700" fill="#2f7a4a">Wartungsplan</text>
 ${[0,1,2,3,4].map(i=>`<line x1="358" y1="${86+i*14}" x2="424" y2="${86+i*14}" stroke="#bbb" stroke-width="2"/><path d="M359 ${80+i*14} l3 3 l5 -6" fill="none" stroke="#2f7a4a" stroke-width="1.8"/>`).join('')}
 <!-- 7 Feuerlöscher zugestellt -->
 <rect x="452" y="170" width="26" height="62" rx="9" fill="#d32f2f" stroke="#8e1b1b" stroke-width="2"/>
 <rect x="458" y="160" width="14" height="12" fill="#333"/><text x="465" y="205" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">F</text>
 <rect x="425" y="236" width="40" height="34" fill="#c49a5c" stroke="#8a6a37" stroke-width="2"/>
 <rect x="462" y="226" width="42" height="44" fill="#d1a866" stroke="#8a6a37" stroke-width="2"/>
 <rect x="440" y="206" width="44" height="32" fill="#c49a5c" stroke="#8a6a37" stroke-width="2"/>
 <rect x="420" y="270" width="92" height="12" fill="#a77d43"/><rect x="420" y="286" width="92" height="10" fill="#a77d43"/>
 <!-- Werkbank + 4 Motorsäge -->
 <rect x="530" y="222" width="170" height="14" fill="#8a5a2b"/><rect x="540" y="236" width="10" height="64" fill="#6e4520"/><rect x="680" y="236" width="10" height="64" fill="#6e4520"/>
 <rect x="545" y="182" width="56" height="40" rx="8" fill="#f28c1b" stroke="#a85a0a" stroke-width="2"/>
 <rect x="555" y="174" width="30" height="10" rx="4" fill="#333"/>
 <rect x="598" y="192" width="78" height="18" rx="9" fill="#8e9aa3" stroke="#5f6a72" stroke-width="2"/>
 <rect x="596" y="189" width="83" height="24" rx="12" fill="none" stroke="#333" stroke-width="3" stroke-dasharray="3 3"/>
 <!-- Regal: 10, 13, 12 -->
 <rect x="708" y="30" width="86" height="270" fill="none" stroke="#7d7d7d" stroke-width="5"/>
 ${[110,195,280].map(y=>`<rect x="708" y="${y}" width="86" height="6" fill="#7d7d7d"/>`).join('')}
 <rect x="730" y="58" width="42" height="34" rx="4" fill="#fff" stroke="#2e7d32" stroke-width="2"/><rect x="747" y="64" width="8" height="22" fill="#2e7d32"/><rect x="740" y="71" width="22" height="8" fill="#2e7d32"/>
 <rect x="740" y="140" width="20" height="54" rx="5" fill="#4fa3d1" stroke="#2b6a9a" stroke-width="2"/><rect x="744" y="132" width="12" height="10" fill="#333"/>
 <text x="750" y="172" font-size="8" text-anchor="middle" fill="#fff" font-weight="700">DES</text>
 <path d="M728 280 l6 -40 h32 l6 40z" fill="#e8d9a8" stroke="#a89558" stroke-width="2"/><text x="750" y="265" font-size="7" text-anchor="middle" fill="#6b5a22" font-weight="700">ÖL-BIND</text>
 <!-- Steckdose + 1 Kabel -->
 <rect x="292" y="268" width="18" height="18" rx="3" fill="#fff" stroke="#888"/><circle cx="298" cy="277" r="1.6" fill="#555"/><circle cx="304" cy="277" r="1.6" fill="#555"/>
 <path d="M301 286 C 300 330, 360 330, 390 380 S 440 440, 500 445" fill="none" stroke="#e46d00" stroke-width="5"/>
 <rect x="498" y="438" width="16" height="14" rx="3" fill="#333"/>
 <!-- 2 Rasenmäher + Öllache -->
 <ellipse cx="140" cy="440" rx="72" ry="16" fill="#2b2b2b" opacity=".8"/>
 <path d="M70 380 h130 v36 h-130z" fill="#3e8e41" stroke="#25602a" stroke-width="2"/>
 <rect x="110" y="362" width="44" height="20" rx="6" fill="#555"/>
 <line x1="200" y1="382" x2="250" y2="320" stroke="#333" stroke-width="5"/><line x1="240" y1="316" x2="262" y2="330" stroke="#333" stroke-width="6"/>
 <circle cx="85" cy="420" r="13" fill="#222"/><circle cx="185" cy="420" r="13" fill="#222"/>
 <!-- 8 Akku auf Karton + Späne -->
 <rect x="460" y="352" width="70" height="34" fill="#c49a5c" stroke="#8a6a37" stroke-width="2"/>
 <rect x="472" y="332" width="40" height="22" rx="4" fill="#333"/><rect x="478" y="338" width="20" height="8" fill="#7cd36b"/>
 <path d="M512 343 C 535 340, 545 320, 548 300" fill="none" stroke="#333" stroke-width="2"/>
 <path d="M520 386 q22 -26 50 0z" fill="#e3c98f"/>${[[530,380],[545,374],[556,381]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2" fill="#b8955a"/>`).join('')}
 <!-- 3 Rechen, Zinken oben -->
 <line x1="440" y1="474" x2="612" y2="474" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/>
 <rect x="608" y="468" width="58" height="8" fill="#6c757d"/>
 ${Array.from({length:8},(_,i)=>`<line x1="${611+i*7.5}" y1="468" x2="${611+i*7.5}" y2="446" stroke="#6c757d" stroke-width="3"/>`).join('')}
 <!-- 5 Benzinkanister offen -->
 <path d="M690 365 h52 l8 10 v58 h-60z" fill="#d32f2f" stroke="#8e1b1b" stroke-width="2"/>
 <rect x="738" y="356" width="12" height="12" fill="#222"/>
 <ellipse cx="772" cy="438" rx="9" ry="5" fill="#222"/>
 <path d="M742 350 q-6 -10 2 -18 M752 348 q-6 -10 2 -18" fill="none" stroke="#999" stroke-width="2"/>
 <text x="716" y="408" font-size="10" fill="#fff" text-anchor="middle" font-weight="700">BENZIN</text>`;
 if(o.numbers){SPOTS.forEach(s=>{const [x,y]=LAB[s.n];g+=`<circle cx="${x}" cy="${y}" r="12" fill="#ffe14d" stroke="#333" stroke-width="1.5"/><text x="${x}" y="${y+4.5}" font-size="13" font-weight="700" text-anchor="middle" fill="#222">${s.n}</text>`})}
 g+=`<g id="marks"></g></svg>`;return g}

function hit(x,y){let best=null,bd=1e9;SPOTS.forEach(s=>s.c.forEach(([cx,cy,r])=>{const d=Math.hypot(x-cx,y-cy);if(d<=r&&d<bd){bd=d;best=s}}));return best}
window.SUCHBILD={SPOTS,svg,hit};
})();
