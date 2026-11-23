/* Erklärungen mit Bildern (einfach, EBA-Niveau) */
(function () {
  const INK = "#1f2a22", GREEN = "#7eb32a", STEEL = "#9aa1a8", WALL = "#4a5058", RED = "#d32f2f", ORA = "#f28c00", OK = "#2e9d4a", BOX = "#c99a5b";
  const svg = (body, vb = "0 0 300 170") => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img">
    <defs>
      <marker id="aR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${RED}"/></marker>
      <marker id="aG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${OK}"/></marker>
      <marker id="aO" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${ORA}"/></marker>
    </defs>${body}</svg>`;
  const arrow = (x1, y1, x2, y2, c = "R", w = 5) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c === "R" ? RED : c === "G" ? OK : ORA}" stroke-width="${w}" stroke-linecap="round" marker-end="url(#a${c})"/>`;
  const txt = (x, y, t, s = 12, c = INK, a = "middle", w = 700) => `<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="${a}" font-family="system-ui,Arial">${t}</text>`;
  const road = `<rect x="0" y="152" width="300" height="18" fill="#555b60"/><line x1="0" y1="161" x2="300" y2="161" stroke="#fff" stroke-width="2" stroke-dasharray="14 10"/>`;
  // Lieferwagen von der Seite, Kabine rechts (fährt nach rechts)
  function truck(o = {}) {
    const wallC = o.hiWall ? ORA : WALL;
    let s = road;
    s += `<rect x="28" y="118" width="244" height="9" fill="#3a3f44"/>`;
    s += `<circle cx="70" cy="139" r="14" fill="#222"/><circle cx="70" cy="139" r="5" fill="#999"/><circle cx="236" cy="139" r="14" fill="#222"/><circle cx="236" cy="139" r="5" fill="#999"/>`;
    s += `<rect x="206" y="56" width="64" height="64" rx="10" fill="${GREEN}"/><rect x="240" y="64" width="24" height="22" rx="4" fill="#bfe0f5"/>`;
    s += `<rect x="28" y="110" width="172" height="8" fill="${STEEL}"/>`;
    s += `<rect x="198" y="${o.hiWall ? 52 : 58}" width="${o.hiWall ? 9 : 6}" height="${o.hiWall ? 60 : 54}" fill="${wallC}"/>`;
    if (o.mat) s += `<rect x="${o.mat[0]}" y="106" width="${o.mat[1]}" height="4" fill="#111"/>`;
    if (o.wet) for (let i = 0; i < 9; i++) s += `<ellipse cx="${40 + i * 17}" cy="109" rx="5" ry="2" fill="#5aa9e6"/>`;
    if (o.load) s += o.load;
    if (!o.noBord) s += `<rect x="28" y="${110 - 24}" width="170" height="24" fill="rgba(150,160,170,.25)" stroke="rgba(90,100,110,.6)"/>`;
    return s;
  }
  const box = (x, y, w, h, c = BOX) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c}" stroke="#7a5a2e" stroke-width="2"/>`;
  const ring = (x, y) => `<circle cx="${x}" cy="${y}" r="4.5" fill="#fff" stroke="#333" stroke-width="2.5"/>`;

  const CARDS = [
    { id: "vollbremsung", t: "🛑 Vollbremsung", img: svg(truck({ load: box(110, 78, 60, 32) + arrow(150, 70, 196, 70) + txt(150, 60, "will weiter!", 13, RED) }) + `<rect x="276" y="20" width="18" height="18" rx="4" fill="${RED}"/>` + txt(285, 33, "!", 13, "#fff") + txt(70, 34, "STOPP! Auto bremst", 14, INK, "middle")),
      d: "Das Auto bremst ganz stark. Die Ladung will aber weiterfahren. Darum rutscht sie <b>nach vorne</b>, Richtung Stirnwand.",
      m: "Kraft nach vorne. Die Ladung muss an der Stirnwand stehen oder gesichert sein." },
    { id: "kurve", t: "↪️ Scharfe Kurve", img: svg(`<path d="M20 160 Q 40 40 200 30 L 300 30" fill="none" stroke="#555b60" stroke-width="44"/><path d="M20 160 Q 40 40 200 30 L 300 30" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="12 10"/>
      <g transform="translate(92 64) rotate(-38)"><rect x="-38" y="-16" width="62" height="32" rx="3" fill="${STEEL}" stroke="#555"/><rect x="24" y="-14" width="22" height="28" rx="5" fill="${GREEN}"/>${box(-26, -10, 22, 20)}</g>
      ${arrow(78, 76, 128, 126)}${txt(232, 128, "nach aussen!", 15, RED)}${txt(250, 70, "Kurve", 14)}`),
      d: "In der Kurve fährt das Auto im Bogen. Die Ladung will <b>geradeaus</b> weiter. Darum wird sie <b>nach aussen</b> gedrückt, gegen die Bordwand.",
      m: "Langsam in die Kurve! Doppelt so schnell = 4-mal so viel Kraft." },
    { id: "crash", t: "💥 Auffahrunfall", img: svg(truck({ load: box(120, 78, 60, 32) + arrow(150, 66, 196, 66, "R", 9) }) + `<rect x="272" y="80" width="28" height="60" rx="6" fill="#2b4c7e"/>` +
      `<polygon points="268,40 276,58 294,52 282,66 296,78 276,76 272,94 264,78 248,84 258,68 246,56 262,58" fill="#ffd400" stroke="${RED}" stroke-width="2"/>` + txt(60, 34, "KRACH!", 18, RED)),
      d: "Du fährst auf ein Auto auf. Dein Lieferwagen stoppt in einem Augenblick. Die Kraft auf die Ladung ist viel grösser als beim Bremsen: bei 50 km/h rund <b>5-mal so gross</b>.",
      m: "Nur sehr gut gesicherte Ladung hält. Und: genug Abstand halten!" },
    { id: "tempo", t: "🚀 Tempo", img: svg(`${txt(40, 155, "30 km/h", 12)}${txt(150, 155, "50 km/h", 12)}${txt(260, 155, "80 km/h", 12)}
      <rect x="22" y="126" width="36" height="16" fill="${ORA}"/><rect x="132" y="97" width="36" height="45" fill="${ORA}"/><rect x="242" y="28" width="36" height="114" fill="${RED}"/>
      ${txt(40, 120, "1×", 13)}${txt(150, 91, "3×", 13)}${txt(260, 22, "7×", 13)}${txt(150, 22, "Kraft in der Kurve", 13, INK)}`),
      d: "Je schneller du fährst, desto grösser die Kraft. Und zwar viel grösser: <b>Doppelt so schnell = 4-mal so viel Kraft.</b> Von 30 auf 80 km/h ist es etwa 7-mal so viel.",
      m: "Mit Ladung langsamer und vorsichtig fahren." },
    { id: "stirnwand", t: "🧱 Stirnwand", img: svg(truck({ hiWall: true, load: box(138, 78, 58, 32) }) + arrow(150, 36, 196, 56, "O", 4) + txt(110, 34, "Stirnwand", 15, ORA)),
      d: "Die Stirnwand ist die Wand <b>vorne</b> auf der Ladefläche, direkt hinter der Kabine. Sie schützt dich, wenn die Ladung nach vorne rutscht. Sie hält aber nicht alles aus.",
      m: "Schweres direkt an die Stirnwand stellen." },
    { id: "luecke", t: "🧩 Keine Lücke (formschlüssig)", img: svg(`<g transform="scale(.5) translate(0 40)">${truck({ load: box(90, 78, 56, 32) })}${arrow(150, 70, 192, 70, "R", 7)}</g>${txt(75, 40, "Lücke ✗", 14, RED)}
      <g transform="translate(150 0) scale(.5) translate(0 40)">${truck({ load: box(140, 78, 56, 32) })}</g>${txt(225, 40, "ohne Lücke ✓", 14, OK)}${txt(150, 150, "Mit Lücke nimmt die Ladung Schwung!", 12, INK, "middle", 600)}`),
      d: "<b>Formschlüssig</b> heisst: Die Ladung steht <b>ohne Lücke</b> an der Wand oder an anderer Ladung. Hat es eine Lücke, nimmt die Ladung beim Bremsen Schwung und knallt gegen die Wand.",
      m: "Keine Lücken! Lücken mit Paletten oder Kisten füllen." },
    { id: "bordwand", t: "🚧 Bordwand", img: svg(road + `<rect x="80" y="40" width="140" height="46" rx="8" fill="${GREEN}" opacity=".5"/><rect x="66" y="110" width="168" height="8" fill="${STEEL}"/><rect x="58" y="82" width="9" height="36" fill="${ORA}"/><rect x="233" y="82" width="9" height="36" fill="${ORA}"/>
      <rect x="80" y="118" width="22" height="34" rx="4" fill="#222"/><rect x="198" y="118" width="22" height="34" rx="4" fill="#222"/>${box(120, 80, 50, 30)}${txt(150, 30, "Ansicht von hinten", 12, INK, "middle", 600)}${txt(36, 78, "Bordwand", 12, ORA)}${txt(266, 78, "Bordwand", 12, ORA)}`),
      d: "Bordwände sind die Wände <b>links, rechts und hinten</b> an der Ladefläche. Sie sind niedrig (ca. 40 cm) und halten nicht viel aus.",
      m: "Bordwände sind kein Ersatz für Gurte. Hohe Teile kippen darüber." },
    { id: "matte", t: "▒ Antirutschmatte", img: svg(truck({ mat: [100, 76], load: box(108, 76, 60, 30) }) + arrow(196, 92, 172, 92, "G", 4) + arrow(80, 92, 104, 92, "G", 4) + txt(70, 62, "schwarz = Gummimatte", 11, INK) + txt(140, 50, "Reibung × 2", 15, OK)),
      d: "Die Antirutschmatte ist eine <b>Gummimatte</b> unter der Ladung. Sie bremst das Rutschen. Mit Matte hält die Ladung etwa <b>doppelt so gut</b> wie ohne.",
      m: "Unter schwere Ladung immer eine Antirutschmatte legen." },
    { id: "nass", t: "💧 Nasse Ladefläche", img: svg(truck({ wet: true, load: box(100, 78, 60, 32) + arrow(166, 92, 194, 92) }) + txt(140, 50, "rutschig wie Eis!", 15, "#2b6a9a")),
      d: "Ist die Ladefläche <b>nass oder schmutzig</b>, rutscht die Ladung viel leichter. Die Reibung wird kleiner.",
      m: "Ladefläche sauber halten und eine Antirutschmatte verwenden." },
    { id: "zurrpunkt", t: "⭕ Zurrpunkt", img: svg(`<rect x="20" y="110" width="260" height="14" fill="${STEEL}"/><rect x="20" y="124" width="260" height="8" fill="#3a3f44"/>
      <circle cx="150" cy="104" r="16" fill="none" stroke="#333" stroke-width="6"/><rect x="142" y="104" width="16" height="10" fill="#555"/>
      <path d="M150 88 L 110 30" stroke="${RED}" stroke-width="8" stroke-linecap="round"/><path d="M140 92 q10 -14 20 0" fill="none" stroke="#777" stroke-width="5"/>${txt(220, 60, "Zurrpunkt", 16, INK)}${arrow(212, 66, 172, 96, "O", 4)}`),
      d: "Zurrpunkte sind <b>Ringe oder Ösen</b> am Rand der Ladefläche. Dort hängst du die Gurte ein.",
      m: "Gurte nur an Zurrpunkten einhängen, nicht an der Bordwand." },
    { id: "nieder", t: "🪢 Niederzurren", img: svg(truck({ mat: [104, 66], load: box(110, 70, 54, 40) + `<path d="M84 110 L110 70 L164 70 L190 110" fill="none" stroke="${RED}" stroke-width="5"/>` + ring(84, 110) + ring(190, 110) + arrow(124, 40, 124, 64, "G", 5) + arrow(150, 40, 150, 64, "G", 5) }) + txt(137, 30, "drückt nach unten", 13, OK)),
      d: "Beim <b>Niederzurren</b> geht der Gurt <b>über</b> die Ladung. Er drückt sie fest auf die Ladefläche. So rutscht sie weniger.",
      m: "Immer 2 Gurte. Gurt steil spannen. Antirutschmatte drunter." },
    { id: "direkt", t: "⛓️ Direktzurren", img: svg(truck({ load: box(112, 74, 54, 36) + `<line x1="166" y1="86" x2="192" y2="110" stroke="${RED}" stroke-width="5"/><line x1="112" y1="86" x2="86" y2="110" stroke="${RED}" stroke-width="5"/>` + ring(192, 110) + ring(86, 110) + arrow(178, 74, 194, 60, "G", 4) + arrow(100, 74, 84, 60, "G", 4) }) + txt(139, 40, "hält wie an der Leine", 13, OK)),
      d: "Beim <b>Direktzurren</b> ist der Gurt <b>direkt an der Ladung</b> befestigt und am Zurrpunkt eingehängt. Er hält die Ladung fest wie an einer Leine. Das ist die <b>beste Methode</b> (Ordner E3), braucht aber mehr Gurte.",
      m: "Gut für Maschinen: Rüttelplatte, Rasenmäher, Minibagger." },
    { id: "winkel", t: "📐 Gurt steil oder flach", img: svg(`<rect x="10" y="120" width="130" height="8" fill="${STEEL}"/>${box(48, 66, 54, 54)}<path d="M38 120 L48 66 L102 66 L112 120" fill="none" stroke="${RED}" stroke-width="5"/>${arrow(75, 26, 75, 60, "G", 9)}${txt(75, 150, "steil ✓ drückt stark", 12, OK)}
      <rect x="160" y="120" width="130" height="8" fill="${STEEL}"/>${box(190, 100, 70, 20)}<path d="M164 120 L190 100 L260 100 L286 120" fill="none" stroke="${RED}" stroke-width="5"/>${arrow(225, 74, 225, 96, "G", 3)}${txt(225, 150, "flach ✗ nur halb so stark", 12, RED)}`),
      d: "Ein <b>steiler</b> Gurt drückt die Ladung stark nach unten. Ein <b>flacher</b> Gurt drückt nur etwa halb so stark.",
      m: "Zurrpunkte nahe an der Ladung wählen, dann wird der Gurt steil." },
    { id: "kippen", t: "🔄 Kippen", img: svg(truck({ load: `<g transform="rotate(28 150 110)"><path d="M136 110 L164 110 L168 92 L132 92 Z" fill="#7a4a2a"/><ellipse cx="150" cy="74" rx="22" ry="20" fill="#3f8f2f"/></g>` + `<path d="M120 50 A 40 40 0 0 1 176 52" fill="none" stroke="${RED}" stroke-width="4" marker-end="url(#aR)"/>` }) + txt(70, 40, "hoch + schmal", 14, RED)),
      d: "<b>Hohe, schmale</b> Dinge (Topf, Kanister) rutschen nicht nur, sie <b>kippen um</b>. Eine Matte allein hilft dann nicht.",
      m: "Hohe Teile mit einem Gurt sichern oder direkt an die Wand stellen." },
    { id: "balken", t: "📊 Die Balken im Ergebnis", img: svg(`<rect x="20" y="40" width="220" height="30" rx="6" fill="#e05252"/>${txt(30, 60, "➜ Schiebt: 489 kg", 14, "#fff", "start")}
      <rect x="20" y="86" width="140" height="30" rx="6" fill="#4f9a2c"/>${txt(30, 106, "✋ Hält: 180 kg", 14, "#fff", "start")}${txt(150, 148, "Rot länger als Grün ➜ die Ladung rutscht!", 13, INK)}`),
      d: "<b>Rot</b> zeigt, wie stark die Ladung geschoben wird. <b>Grün</b> zeigt, was sie festhält (Reibung, Gurte). Die Kraft steht in «kg», damit man es sich vorstellen kann.",
      m: "Grün muss länger sein als Rot, sonst rutscht es." }
  ];
  window.LEX = CARDS;
  const cardHTML = c => `<article class="lexcard"><h3>${c.t}</h3><div class="lexpic">${c.img}</div><p>${c.d}</p><div class="merke">💡 <b>Merke:</b> ${c.m}</div></article>`;
  window.lexCard = id => cardHTML(CARDS.find(c => c.id === id) || CARDS[0]);
  let cur = 0;
  window.renderLex = function (el, id) {
    if (id) cur = Math.max(0, CARDS.findIndex(c => c.id === id));
    const c = CARDS[cur];
    el.innerHTML = `<div class="lexnav">${CARDS.map((x, i) => `<button class="lexchip${i === cur ? " on" : ""}" data-i="${i}">${x.t}</button>`).join("")}</div>
      <div class="lexone">
        <button class="lexarrow" id="lexPrev" ${cur === 0 ? "disabled" : ""} aria-label="vorherige">◀</button>
        ${cardHTML(c)}
        <button class="lexarrow" id="lexNext" ${cur === CARDS.length - 1 ? "disabled" : ""} aria-label="nächste">▶</button>
      </div>
      <div class="lexfoot"><span>${cur + 1} / ${CARDS.length} · Pfeiltasten ◀ ▶ zum Blättern</span><button class="backbtn" onclick="showTab('free')">← zurück zum Experiment <kbd>Esc</kbd></button></div>`;
    el.querySelectorAll(".lexchip").forEach(b => b.onclick = () => { cur = +b.dataset.i; window.renderLex(el); });
    const p = el.querySelector("#lexPrev"), n = el.querySelector("#lexNext");
    p.onclick = () => window.lexStep(el, -1); n.onclick = () => window.lexStep(el, 1);
  };
  window.lexStep = function (el, d) { cur = Math.min(CARDS.length - 1, Math.max(0, cur + d)); window.renderLex(el); };
})();
