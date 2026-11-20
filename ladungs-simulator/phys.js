/* Ladungs-Simulator – vereinfachtes Modell (Ordner E3 S. 352–355)
   Einheiten: m, s, kg, N. Ausgabe von Kräften in «kg» (= N / 9.81), damit es für Lernende anschaulich ist. */
(function (root) {
  const G = 9.81;
  const C = {
    muDry: 0.3,        // Holz/Metall auf Ladebrücke, trocken
    muMat: 0.6,        // mit Antirutschmatte (Gummi)
    wetFactor: 0.6,    // nass/schmutzig: Reibung sinkt
    brakeA: 8.0,       // Vollbremsung ≈ 0.8 g
    curveR: 40,        // scharfe Kurve, Radius 40 m
    curveMax: 7.8,     // mehr Querbeschleunigung schafft das Fahrzeug nicht (schleudert)
    curveTime: 2.2,    // Dauer der Kurvenfahrt (s)
    crashS: 2.5,       // Auffahrunfall auf ein Auto vor dir: Knautschzonen + Wegschieben (m)
    stf: 3000,         // Vorspannkraft Spanngurt 300 daN (Niederzurren)
    direct: 13700,     // Direktzurren: 1 Gurt hält ca. 1400 kg in Fahrtrichtung
    wallFront: 1500 * G, // Stirnwand hält ca. 1500 kg
    wallSide: 800 * G,   // Bordwand hält ca. 800 kg
    impactD: 0.05,     // Verformungsweg beim Aufprall (m)
    sinSteep: Math.sin(80 * Math.PI / 180),
    sinFlat: Math.sin(30 * Math.PI / 180)
  };
  // Ladegut: m, Länge (in Fahrtrichtung), Breite, Höhe, Schwerpunkthöhe
  const LOADS = {
    palette: { name: "Palette Steinplatten", icon: "🧱", m: 600, L: 1.2, W: 0.8, H: 0.6, cg: 0.3 },
    topf: { name: "Strauch im Topf", icon: "🪴", m: 15, L: 0.4, W: 0.4, H: 0.9, cg: 0.35 },
    ruettel: { name: "Rüttelplatte", icon: "🔧", m: 90, L: 0.6, W: 0.45, H: 0.9, cg: 0.25 },
    kanister: { name: "Benzinkanister", icon: "⛽", m: 18, L: 0.35, W: 0.17, H: 0.45, cg: 0.2 }
  };
  const BED = { L: 3.0, W: 2.0, wallH: 0.4 };
  const kmh = v => v / 3.6;

  function setup(cfg) {
    const ld = LOADS[cfg.load];
    const lateral = cfg.event === "kurve";
    const v = kmh(cfg.speed);
    let A, T;
    if (cfg.event === "bremsen") { A = C.brakeA; T = v / A; }
    else if (cfg.event === "kurve") { A = Math.min(v * v / C.curveR, C.curveMax); T = C.curveTime; }
    else { A = v * v / (2 * C.crashS); T = 2 * C.crashS / v; }
    let mu = cfg.mat ? C.muMat : C.muDry;
    if (cfg.wet) mu *= C.wetFactor;
    const n = cfg.straps | 0;
    const down = cfg.strapType === "nieder" ? n * 2 * C.stf * (cfg.angle === "flach" ? C.sinFlat : C.sinSteep) : 0;
    const direct = cfg.strapType === "direkt" ? n * C.direct : 0;
    const N = ld.m * G + down;
    const fric = mu * N;
    const half = (lateral ? ld.W : ld.L) / 2;
    const aTip = G * half / ld.cg;           // ab dieser Beschleunigung kippt es (wenn es nicht rutscht)
    const room = lateral ? (BED.W - ld.W) : (BED.L - ld.L);
    const gap = Math.max(0, Math.min(cfg.gap, room));
    const wallCap = lateral ? C.wallSide : C.wallFront;
    const tall = ld.H > 2 * half * 1.2;      // hoch und schmal
    return { ld, lateral, v, A, T, mu, n, down, direct, N, fric, aTip, gap, wallCap, tall, room };
  }

  // Zeitschritt-Simulation; liefert Verlauf (für die Animation) und Ergebnis
  function simulate(cfg) {
    const s = setup(cfg);
    const { ld, A, T } = s;
    const m = ld.m;
    const dt = Math.min(T / 400, 0.004);
    const drive = m * A;                     // Trägheitskraft während des Ereignisses
    const res = {
      cfg, s, drive, fricHold: s.fric, strapHold: s.direct + (s.mu * s.down),
      outcome: "haelt", slid: 0, vImp: 0, fImp: 0, hFall: 0, wallBroken: false, tipped: false, strapBroke: false, falls: false,
      brakeDist: cfg.event === "bremsen" ? s.v * s.v / (2 * C.brakeA) : null, frames: []
    };
    let x = 0, u = 0, t = 0, sliding = false, directLeft = s.direct, atWall = s.gap <= 0.0005;
    const tEnd = T * 1.0 + 1.5;
    // Kippen ohne Rutschen: Gurte verhindern Kippen; an der Wand stützt die Wand (ausser niedriger Bordwand bei hohen Teilen)
    const wallSupports = !s.lateral || ld.H <= BED.wallH * 1.6;
    while (t < tEnd) {
      const a = t < T ? A : 0;
      const F = m * a;
      if (!sliding && !atWall) {
        // Haftet die Ladung?
        if (s.n === 0 && a > s.aTip && s.fric >= m * s.aTip) { res.tipped = true; res.outcome = "kippt"; res.frames.push([t, x, 1]); break; }
        if (F > s.fric + directLeft) {
          if (directLeft > 0) { res.strapBroke = true; directLeft = 0; }
          sliding = true;
        }
      }
      if (atWall) {
        // liegt an der Wand: Wand nimmt den Rest auf
        const rest = F - s.fric - directLeft;
        if (s.n === 0 && a > s.aTip && !wallSupports) { res.tipped = true; res.falls = true; res.outcome = "faellt"; res.frames.push([t, x, 1]); break; }
        if (rest > s.wallCap) { res.wallBroken = true; res.outcome = "durch"; res.fImp = Math.max(res.fImp, rest); res.frames.push([t, x, 2]); break; }
        if (rest > 0) res.fImp = Math.max(res.fImp, rest);
      }
      if (sliding) {
        let acc = (F - s.fric) / m;
        if (u <= 0 && acc <= 0) { sliding = false; u = 0; }
        else {
          u += acc * dt; if (u < 0) u = 0;
          x += u * dt;
          if (x >= s.gap) {
            x = s.gap; res.vImp = u; atWall = true; sliding = false;
            const fI = m * u * u / (2 * C.impactD);
            res.fImp = Math.max(res.fImp, fI);
            res.hFall = u * u / (2 * G);
            if (fI > s.wallCap) { res.wallBroken = true; res.outcome = "durch"; res.frames.push([t, x, 2]); break; }
            if (s.tall && u > 1.0 && s.n === 0) { res.tipped = true; res.outcome = s.lateral && ld.H > BED.wallH * 1.6 ? "faellt" : "kippt"; res.falls = res.outcome === "faellt"; res.frames.push([t, x, 1]); break; }
            u = 0;
          }
        }
      }
      res.frames.push([t, x, 0]);
      if (!sliding && t > T + 0.05) break;   // Ereignis vorbei, nichts bewegt sich mehr
      t += dt;
    }
    res.slid = x;
    if (res.outcome === "haelt" && res.slid > 0.01) res.outcome = res.vImp > 0 ? "knallt" : "rutscht";
    res.ok = res.outcome === "haelt";
    res.T = T;
    return res;
  }

  root.LSIM = { G, C, LOADS, BED, simulate, setup, kmh };
  if (typeof module !== "undefined") module.exports = root.LSIM;
})(typeof window !== "undefined" ? window : globalThis);
