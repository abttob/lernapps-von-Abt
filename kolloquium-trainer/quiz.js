/* Themen: K = L53–56 Kompost & Mulch · M = L57/59 Maschinen & Lagern · W = L58/60–62 Wartung, Ordnung, Zwischenlagern · T = L63–65 Transport · A = L66–68 Abfall */
const TH={K:"🌱 Kompost & Mulch (L53–56)",M:"🔧 Maschinen & Lagern (L57/59)",W:"🧽 Wartung, Ordnung, Zwischenlagern (L58/60–62)",T:"🚚 Transport (L63–65)",A:"♻️ Abfall & Entsorgung (L66–68)"};
const LZG={L53:"K",L54:"K",L55:"K",L56:"K",L57:"M",L59:"M",L58:"W",L60:"W",L61:"W",L62:"W",L63:"T",L64:"T",L65:"T",L66:"A",L67:"A",L68:"A"};
const Q=[
/* ---- Multiple Choice mit Bild ---- */
{k:"mc",th:"K",a:"thermo",q:"Wie heisst die heisse Phase am Anfang der Kompostierung?",o:["Heissrotte","Aufbauphase","Kressetest","Mulchphase"],e:"In der Heissrotte (50–70 °C) sterben Unkrautsamen und Krankheitskeime ab."},
{k:"mc",th:"K",a:"kresse",q:"Die Kresse keimt kaum und hat gelbe Blätter. Was sagt das über den Kompost?",o:["Er ist noch nicht reif","Er ist perfekt","Er ist zu trocken für Kresse, sonst gut","Er hat zu viel Humus"],e:"Unreifer Kompost (Frischkompost) schädigt junge Wurzeln."},
{k:"mc",th:"K",a:"kompost",q:"Der Kompost riecht nach faulen Eiern. Was fehlt?",o:["Sauerstoff","Wasser","Sonne","Stickstoff"],e:"Zu nass, zu dicht ➜ umsetzen und grobes Strukturmaterial untermischen."},
{k:"mc",th:"K",a:"mulch",q:"Was bewirkt eine Mulchschicht im Sommer?",o:["Der Boden bleibt feuchter und kühler","Der Boden trocknet schneller","Mehr Unkraut","Weniger Bodenleben"],e:"Mulch reduziert die Verdunstung und fördert das Bodenleben."},
{k:"mc",th:"K",a:"kreislauf",q:"Wer baut abgestorbene Pflanzenteile zu Humus ab?",o:["Reduzenten (Bodenlebewesen)","Produzenten (Pflanzen)","Konsumenten (Tiere, Menschen)","Die Sonne"],e:"Pilze, Bakterien, Regenwürmer, Asseln."},
{k:"mc",th:"M",a:"kanister",q:"Wo lagerst du Benzin?",o:["Im zugelassenen, beschrifteten Kanister, kühl und belüftet","In einer PET-Flasche im Pausenraum","An der Sonne vor dem Werkhof","Offen neben der Werkbank"],e:"Brandgefahr und Verwechslungsgefahr."},
{k:"mc",th:"M",a:"akku",q:"Wie lädst du Akkus richtig?",o:["Mit dem passenden Ladegerät, nicht auf Hitzequellen, beaufsichtigt","Auf dem Heizkörper, dann geht es schneller","Im Auto in der Sonne","Mit irgendeinem Ladegerät"],e:"Hitze und falsche Ladegeräte können einen Brand auslösen."},
{k:"mc",th:"M",a:"psm",q:"Pflanzenschutzmittel lagerst du …",o:["… abgeschlossen, im Originalgebinde, getrennt von Lebensmitteln","… im Kühlschrank beim Znüni","… umgefüllt in Flaschen","… offen im Fahrzeug"],e:"So kann niemand sie verwechseln oder unbefugt nehmen."},
{k:"mc",th:"M",a:"bagger",q:"Warum gibt man beim Minibagger die Tonnen an (z. B. 1.5 t)?",o:["Damit klar ist, wie gross und schwer er ist (Transport, Einsatz)","Weil es schöner tönt","Wegen der Farbe","Das ist nicht wichtig"],e:"Zusatzangaben machen die Fachbezeichnung präzise."},
{k:"mc",th:"W",a:"maeher",q:"Was machst du VOR jeder Arbeit am Mähmesser?",o:["Motor abstellen und Zündkerzenstecker abziehen","Tank füllen","Motor laufen lassen","Grasfangkorb montieren"],e:"So kann der Motor nicht anspringen."},
{k:"mc",th:"W",a:"motorsaege",q:"Die Motorsäge macht feines Sägemehl statt Späne. Ursache?",o:["Die Kette ist stumpf","Zu viel Kettenöl","Der Tank ist voll","Das Holz ist zu trocken"],e:"Kette schärfen oder ersetzen."},
{k:"mc",th:"W",a:"einschlag",q:"Was ist ein Pflanzeneinschlag?",o:["Pflanzen vorübergehend schräg in Erde eingraben, damit die Wurzeln feucht bleiben","Pflanzen stark zurückschneiden","Pflanzen entsorgen","Pflanzen düngen"],e:"Ordner E S. 344: schattig, windgeschützt, Wurzeln feucht."},
{k:"mc",th:"W",a:"werkhof",q:"Warum ist Ordnung im Werkhof wichtig?",o:["Weniger Unfälle, weniger Suchzeit, Material hält länger","Damit es schön aussieht","Weil der Chef es will","Das ist nicht wichtig"],e:"Ordnung spart Zeit, Geld und Unfälle."},
{k:"mc",th:"T",a:"hubwagen",q:"Wer darf einen Palettenhubwagen bedienen?",o:["Wer instruiert wurde (Nachweis), ab 15 Jahren","Alle","Nur wer Autofahren kann","Nur der Chef"],e:"Dokumentierte Instruktion durch eine Fachperson."},
{k:"mc",th:"T",a:"hochstamm",q:"Was legst du zwischen Spannset und Stamm?",o:["Einen Stammschutz (Ballentuch, Kunststoffauflage)","Nichts","Ein Stück Draht","Plastikfolie direkt auf die Wunde"],e:"Sonst entstehen Druckstellen an der Rinde."},
{k:"mc",th:"T",a:"lieferwagen",q:"Gesamtgewicht 3500 kg, Leergewicht 2300 kg. Wie viel darfst du laden?",o:["1200 kg (inkl. Mitfahrer, Werkzeug, Kanister)","3500 kg","2300 kg","So viel, wie Platz hat"],e:"Nutzlast = Gesamtgewicht – Leergewicht."},
{k:"mc",th:"A",a:"pyramide",q:"Was ist die beste Stufe der Abfallpyramide?",o:["Vermeiden","Recyceln","Verbrennen","Deponieren"],e:"Abfall, der nicht entsteht, kostet nichts."},
{k:"mc",th:"A",a:"schwelle",q:"Alte Bahnschwellen mit Teeröl sind …",o:["… Sonderabfall","… gutes Brennholz","… ideal für Hochbeete","… Grüngut"],e:"Teeröl ist giftig."},
{k:"mc",th:"A",a:"eternit",q:"Warum darf man alte Eternitplatten nicht zerbrechen?",o:["Sie können Asbest enthalten (Fasern sind gefährlich)","Sie sind zu schwer","Sie sind wertvoll","Sie stinken"],e:"Sonderabfall, Fachfirma, Schutzausrüstung."},
{k:"mc",th:"A",a:"mulde",q:"Warum trennt man Abfälle in verschiedene Mulden?",o:["Recycling wird möglich, Entsorgung ist günstiger","Damit mehr Mulden gebraucht werden","Wegen der Farbe","Gibt keinen Grund"],e:"Gemischte Abfälle sind teuer."},
/* ---- Stimmt's? ---- */
{k:"tf",th:"K",q:"Rasenschnitt gibt man in dicken Schichten auf den Kompost.",r:false,e:"Nur dünn und gemischt, sonst fault er."},
{k:"tf",th:"K",q:"Reifekompost riecht nach Waldboden.",r:true,e:"Fauliger Geruch = Problem."},
{k:"tf",th:"K",q:"Frischkompost arbeitet man in das Saatbeet ein.",r:false,e:"Nur als dünner Mulch an der Oberfläche."},
{k:"tf",th:"K",q:"Unter Mulch fühlen sich Schnecken wohl.",r:true,e:"Das ist ein Nachteil des Mulchens."},
{k:"tf",th:"M",q:"Die «Flex» heisst richtig Winkelschleifer.",r:true,e:"Fachbegriffe statt Umgangssprache!"},
{k:"tf",th:"M",q:"Samen und Dünger lagert man feucht, damit sie frisch bleiben.",r:false,e:"Trocken und kühl lagern."},
{k:"tf",th:"W",q:"Den Sicherheitsbügel darf man festbinden, wenn es pressiert.",r:false,e:"Nie! Das Messer stoppt sonst nicht mehr."},
{k:"tf",th:"W",q:"Den Rasenmäher kippt man mit Luftfilter und Vergaser nach oben.",r:true,e:"Sonst läuft Öl oder Benzin in den Luftfilter."},
{k:"tf",th:"W",q:"Nach einem Schnitt bei Feuerbrand desinfiziert man die Schere.",r:true,e:"Z. B. mit Alkohol 70 %."},
{k:"tf",th:"T",q:"Wer geladen hat, wird bei einer Kontrolle gebüsst – nicht der Fahrer.",r:false,e:"Verantwortlich ist immer die Person am Steuer."},
{k:"tf",th:"T",q:"Ein steiler Zurrgurt drückt stärker auf die Ladung als ein flacher.",r:true,e:"Flacher Gurt = weniger Anpressdruck."},
{k:"tf",th:"T",q:"Nasser Kies darf bei Frost tropfen.",r:false,e:"Das Wasser gefriert auf der Strasse."},
{k:"tf",th:"A",q:"Wiederverwenden ist besser als Recyceln.",r:true,e:"Wiederverwenden steht in der Pyramide höher."},
{k:"tf",th:"A",q:"Altöl darf in den Schacht, wenn es nur wenig ist.",r:false,e:"Altöl ist Sonderabfall."},
/* ---- Fachbegriff statt Umgangssprache ---- */
{k:"fach",th:"M",q:"«Die Flex»",o:["Winkelschleifer","Trennsäge","Schleifmaschine","Fräse"]},
{k:"fach",th:"M",q:"«Der kleine Bagger mit 1.5 Tonnen»",o:["Minibagger 1.5 t","Baggerli","Kleinbagger ohne Angabe","Schaufelauto"]},
{k:"fach",th:"M",q:"«Das Ding zum Erde-Fahren mit Motor»",o:["Raddumper","Karrette","Rollwagen","Kipper-Velo"]},
{k:"fach",th:"W",q:"«Der Hebel, den man beim Mähen drücken muss»",o:["Sicherheitsbügel","Gashebel","Stopphebel","Griff"]},
{k:"fach",th:"W",q:"«Nach dem Arbeiten kurz putzen und schauen»",o:["Tagesparkdienst","Service","Reparatur","Pflege"]},
{k:"fach",th:"K",q:"«Der Kompost wird ganz heiss»",o:["Heissrotte","Gärung","Verbrennung","Hitzephase"]},
{k:"fach",th:"K",q:"«Die Würmer und Pilze, die alles kaputt machen»",o:["Reduzenten / Bodenlebewesen","Schädlinge","Ungeziefer","Kompostviecher"]},
{k:"fach",th:"T",q:"«Die Gurte, mit denen man die Ladung festmacht»",o:["Zurrgurte / Spannsets","Bändel","Seile","Riemen"]},
{k:"fach",th:"T",q:"«Das Teil vorne an der Brücke, wo die Ladung anliegt»",o:["Stirnwand","Vorderteil","Kabinenwand","Bordwand hinten"]},
{k:"fach",th:"A",q:"«Gefährlicher Abfall, der nicht in den Kehricht darf»",o:["Sonderabfall","Giftmüll","Spezialmüll","Restmüll"]},
/* ---- Reihenfolge ---- */
{k:"order",th:"A",q:"Abfallpyramide: von der besten zur schlechtesten Stufe",o:["Vermeiden","Vermindern","Wiederverwenden","Recyceln","Energetisch nutzen","Deponieren"]},
{k:"order",th:"K",q:"Kompostierung: in welcher Reihenfolge?",o:["Material mischen und aufsetzen","Heissrotte (50–70 °C)","Umsetzen","Umbau- und Aufbauphase","Reifekompost sieben"]},
{k:"order",th:"W",q:"Tagesparkdienst am Rasenmäher",o:["Motor abstellen, Zündkerzenstecker ab","Richtig kippen (Luftfilter oben)","Grasreste entfernen","Sichtkontrolle Messer und Gehäuse","Auftanken (kalter Motor)","Versorgen am festen Platz"]},
{k:"order",th:"M",q:"Bagger auf der Baustelle tanken",o:["Motor abstellen und abkühlen lassen","Ölbindemittel bereitstellen","Mit Trichter tanken, nicht rauchen","Kanister verschliessen und sichern"]},
{k:"order",th:"W",q:"Wurzelnackte Pflanzen kommen zu früh",o:["Sofort auspacken","Wurzeln in Wasser legen","Schattig einschlagen","Wurzeln feucht halten bis zur Pflanzung"]},
/* ---- Sortieren (2 Kisten) ---- */
{k:"sort",th:"K",q:"Darf das auf den Gartenkompost?",b:["✅ Kompost","❌ Nicht"],o:[["Rüstabfälle",0],["Laub",0],["Kaffeesatz",0],["Gehäckselter Gehölzschnitt",0],["Gekochte Essensreste",1],["Plastik",1],["Riesen-Bärenklau",1],["Katzenstreu",1]]},
{k:"sort",th:"K",q:"Organischer oder mineralischer Mulch?",b:["🌳 organisch","🪨 mineralisch"],o:[["Rindenmulch",0],["Holzschnitzel",0],["Rasenschnitt",0],["Kompost",0],["Kies",1],["Splitt",1],["Lava",1],["Blähton",1]]},
{k:"sort",th:"K",q:"Kohlenstoffreich (braun) oder stickstoffreich (grün)?",b:["🟤 C-reich","🟢 N-reich"],o:[["Stroh",0],["Holzhäcksel",0],["Herbstlaub",0],["Sägespäne",0],["Rasenschnitt",1],["Rüstabfälle",1],["Mist",1]]},
{k:"sort",th:"W",q:"Tagesparkdienst oder Service?",b:["🧽 Tagesparkdienst","🛠️ Service"],o:[["Grasreste entfernen",0],["Sichtkontrolle",0],["Treibstoff nachfüllen",0],["Heckenschere reinigen und ölen",0],["Ölwechsel",1],["Zündkerze ersetzen",1],["Luftfilter ersetzen",1],["Messer schleifen und auswuchten",1]]},
{k:"sort",th:"A",q:"Sonderabfall oder normal entsorgen?",b:["⚠️ Sonderabfall","♻️ Mulde / Recycling"],o:[["Altöl",0],["Teeröl-Bahnschwellen",0],["Alte Pflanzenschutzmittel",0],["Kaputte Akkus",0],["Farbreste",0],["Karton",1],["Betonbruch",1],["Grüngut",1],["Altholz unbehandelt",1]]},
{k:"sort",th:"M",q:"Wie lagern?",b:["🔒 abgeschlossen","💨 trocken und kühl"],o:[["Pflanzenschutzmittel",0],["Giftige Stoffe",0],["Saatgut",1],["Dünger",1],["Rasensamen",1]]},
/* ---- Paare ---- */
{k:"match",th:"K",q:"Verbinde Begriff und Erklärung",p:[["Humus","Dunkle, fruchtbare Substanz aus zersetztem Material"],["Heissrotte","Heisse Phase, tötet Unkrautsamen ab"],["Kressetest","Zeigt, ob Kompost reif ist"],["Mulch","Schicht, die den Boden bedeckt"]]},
{k:"match",th:"T",q:"Verbinde die Sicherungsart",p:[["Formschlüssig","Ohne Lücken an die Stirnwand"],["Niederzurren","Gurt drückt die Ladung auf die Fläche"],["Direktzurren","Gurt hält die Kräfte direkt"],["Antirutschmatte","Erhöht die Reibung"]]},
{k:"match",th:"W",q:"Verbinde Problem und Ursache",p:[["Schwarzer Rauch","Luftfilter verschmutzt"],["Sägemehl statt Späne","Kette stumpf"],["Halmspitzen ausgefranst","Mähmesser stumpf"],["Messer klebrig","Harz und Pflanzensaft"]]},
{k:"match",th:"A",q:"Wohin damit?",p:[["Grünschnitt","Grünabfuhr / Kompostieranlage"],["Betonbruch","Bauschuttmulde"],["Altöl","Sonderabfall-Sammelstelle"],["Intakte Platten","Wiederverwenden"]]},
/* ---- Lückentext ---- */
{k:"cloze",th:"K",q:"Frischkompost darf nur als dünner ___ auf die Bodenoberfläche.",o:["Mulch","Dünger","Rasen","Sand"]},
{k:"cloze",th:"M",q:"Unbeschriftete Kanister ___ man nicht und informiert die Vorgesetzten.",o:["benutzt","kauft","füllt","beschriftet"]},
{k:"cloze",th:"W",q:"Schutzeinrichtungen wie den Sicherheitsbügel darf man nie ___.",o:["überbrücken","reinigen","kontrollieren","ölen"]},
{k:"cloze",th:"T",q:"Für die Ladung ist immer die Person am ___ verantwortlich.",o:["Steuer","Lager","Telefon","Ziel"]},
{k:"cloze",th:"T",q:"Ab 1 m Überhang hinten braucht es einen ___.",o:["Signalkörper","Anhänger","Sicherheitsbügel","Zurrgurt"]},
{k:"cloze",th:"A",q:"Abfall, der gar nicht entsteht, nennt man ___.",o:["vermeiden","recyceln","deponieren","verbrennen"]}
];
const GLOSS=[
["K","Humus","Dunkle, fruchtbare Bodensubstanz aus zersetztem organischem Material."],["K","Reduzenten","Bodenlebewesen (Pilze, Bakterien, Würmer), die tote Biomasse abbauen."],["K","Heissrotte","Erste Phase im Kompost mit 50–70 °C: tötet Keime und Unkrautsamen."],["K","C/N-Verhältnis","Verhältnis Kohlenstoff zu Stickstoff. Gut gemischt: ca. 25–30 : 1."],["K","Strukturmaterial","Grobes, holziges Material: bringt Luft in den Kompost."],["K","Frischkompost","Noch nicht fertig zersetzt. Nur als Mulch an der Oberfläche."],["K","Reifekompost","Dunkel, krümelig, riecht nach Waldboden. Ideal zum Einarbeiten."],["K","Kressetest","Kresse auf Kompost säen: keimt sie gut und grün, ist er reif."],["K","Mulch","Abdeckung des Bodens: organisch, mineralisch oder synthetisch."],
["M","Winkelschleifer","Fachbegriff für die «Flex»."],["M","Raddumper","Kleines Transportfahrzeug für Erde und Material auf der Baustelle."],["M","Originalgebinde","Die Originalverpackung mit Etikett und Gefahrenhinweisen."],["M","Zugelassener Kanister","Geprüfter, beschrifteter Behälter für Treibstoff."],["M","Ölbindemittel","Granulat, das ausgelaufenes Öl oder Benzin aufsaugt."],
["W","Tagesparkdienst","Nach jedem Einsatz: reinigen, kontrollieren, auftanken."],["W","Service","Wartung nach Intervall: Öl, Luftfilter, Zündkerze, Messer."],["W","Sicherheitsbügel","Stoppt den Motor/das Messer beim Loslassen."],["W","Wartungsprotokoll","Liste: Gerät, Datum, Arbeiten, Betriebsstunden, Name."],["W","Pflanzeneinschlag","Pflanzen vorübergehend in lockere Erde eingraben, Wurzeln feucht halten."],["W","Feuerbrand","Gefährliche Bakterienkrankheit bei Kernobst und Cotoneaster: Werkzeuge desinfizieren."],
["T","Instruktionsnachweis","Bestätigung, dass man in das Gerät (z. B. Hubwagen) eingeführt wurde."],["T","Nutzlast","Gesamtgewicht minus Leergewicht: so viel darf man laden."],["T","Formschlüssig","Ladung ohne Lücken an der Stirnwand und aneinander."],["T","Niederzurren","Gurte drücken die Ladung auf die Fläche (mehr Reibung)."],["T","Direktzurren","Gurte nehmen die Kräfte direkt auf."],["T","Signalkörper","Markierung bei mehr als 1 m Überhang hinten."],["T","Stammschutz","Polster (Ballentuch, Kunststoff) zwischen Gurt und Rinde."],
["A","Abfallpyramide","Vermeiden – vermindern – wiederverwenden – recyceln – energetisch nutzen – deponieren."],["A","Sonderabfall","Gefährlicher Abfall: Altöl, Teeröl, Akkus, Pflanzenschutzmittel, Farben."],["A","Muldentrennsystem","Abfälle nach Art in verschiedene Mulden trennen."],["A","KVA","Kehrichtverbrennungsanlage: energetische Nutzung."]
];
