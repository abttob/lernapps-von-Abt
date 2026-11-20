/* IT-Training: Inhalte der Module. Texte hier anpassen. */
(function(){
  const K = (win, mac) => '<kbd>' + win + '</kbd> <span class="muted small">(Mac: <kbd>' + mac + '</kbd>)</span>';

  const MODULES = [
  /* ---------------- TEAMS ---------------- */
  { id:"teams", ico:"💬", title:"Teams", sub:"Kanäle, Chat, Dateien, Aufgaben abgeben", min:15,
    lessons:[
      { t:"So ist Teams aufgebaut", h:`
        <p>Teams hat zwei Bereiche, die man oft verwechselt:</p>
        <div class="two"><div class="mini"><b>👥 Teams &amp; Kanäle</b><p>Dein <b>Klassenteam</b> ist wie ein Schulzimmer. Darin gibt es <b>Kanäle</b> (z.B. «Allgemein», «Fachrechnen»). Ein <b>Beitrag</b> im Kanal sehen <b>alle</b> im Team.</p></div>
        <div class="mini"><b>💬 Chat</b><p>Im <b>Chat</b> schreibst du einzelnen Personen oder kleinen Gruppen. Das sehen <b>nur</b> die Personen im Chat.</p></div></div>
        <div class="note note-blue"><b>Faustregel</b>Frage, die alle betrifft (z.B. «Bis wann ist der Auftrag?») → Beitrag im Kanal. Persönliches (z.B. Krankmeldung) → Chat an die Lehrperson.</div>` },
      { t:"Dateien und Unterlagen finden", h:`
        <ol class="instr"><li>Öffne dein Klassenteam und wähle einen Kanal.</li><li>Klicke oben auf <b>Dateien</b>. Hier liegen die Unterlagen dieses Kanals.</li><li>Eine Datei öffnest du mit Klick. Mit <b>…</b> → <b>Herunterladen</b> speicherst du sie auf deinem Gerät.</li></ol>
        <div class="note note-yellow"><b>Achtung</b>Bearbeite keine Vorlagen direkt im Kanal, sonst änderst du sie für alle. Lade sie zuerst herunter oder speichere eine Kopie in dein OneDrive.</div>` },
      { t:"Aufgaben abgeben", h:`
        <ol class="instr"><li>Öffne im Klassenteam den Bereich <b>Aufgaben</b> (oder links die App «Aufgaben»).</li><li>Wähle die Aufgabe aus. Lies die Anweisungen und das Abgabedatum.</li><li>Klicke auf <b>＋ Arbeit hinzufügen</b> und wähle deine Datei (am besten aus OneDrive).</li><li>Klicke auf <b>Abgeben</b>. Erst dann ist die Aufgabe wirklich abgegeben!</li></ol>
        <p>Brauchst du eine Änderung? Mit <b>Abgabe rückgängig machen</b> kannst du sie vor dem Termin nochmals bearbeiten.</p>` },
      { t:"Benachrichtigungen und gute Umgangsformen", h:`
        <ul><li>Erwähne Personen mit <b>@Name</b>, dann bekommen sie eine Mitteilung.</li><li>Antworte bei Beiträgen mit <b>Antworten</b> und nicht mit einem neuen Beitrag. So bleibt das Gespräch zusammen.</li><li>Schreibe kurz, freundlich und mit Begrüssung. Teams ist ein Schul- und Arbeitswerkzeug, kein Privat-Chat.</li><li>Benachrichtigungen einstellen: Profilbild → <b>Einstellungen → Benachrichtigungen</b>.</li></ul>` }
    ],
    quiz:[
      { q:"Du willst wissen, bis wann der Auftrag fertig sein muss. Die Frage betrifft alle. Wo schreibst du?", o:["Im Chat an die Lehrperson","Als Antwort auf den Beitrag im Klassenkanal","Per SMS an eine Kollegin"], a:1, e:"Fragen, die alle betreffen, gehören in den Kanal. Dann sehen alle die Antwort." },
      { q:"Wer sieht eine Nachricht, die du im Chat an deine Lehrperson schreibst?", o:["Die ganze Klasse","Nur du und die Lehrperson","Alle Lehrpersonen der Schule"], a:1, e:"Ein Chat ist privat zwischen den Personen im Chat." },
      { q:"Du hast deine Datei bei einer Aufgabe hinzugefügt. Ist sie damit abgegeben?", o:["Ja, automatisch","Nein, ich muss noch auf «Abgeben» klicken","Nur wenn die Datei ein PDF ist"], a:1, e:"Erst mit «Abgeben» ist die Arbeit eingereicht." },
      { q:"Wo findest du die Unterlagen eines Kanals?", o:["Im Kanal oben unter «Dateien»","Im Chat","In den Einstellungen"], a:0, e:"Jeder Kanal hat oben den Bereich «Dateien»." },
      { q:"Wie stellst du sicher, dass eine bestimmte Person deinen Beitrag sieht?", o:["Ich schreibe in Grossbuchstaben","Ich erwähne sie mit @Name","Ich schreibe den Beitrag zweimal"], a:1, e:"Mit @Name bekommt die Person eine Benachrichtigung." }
    ] },

  /* ---------------- WORD ---------------- */
  { id:"word", ico:"📝", title:"Word", sub:"Formatvorlagen, Listen, Tabellen, Inhaltsverzeichnis", min:30,
    lessons:[
      { t:"Formatvorlagen statt «von Hand» formatieren", h:`
        <p>Der wichtigste Word-Trick: Titel formatierst du <b>nicht</b> von Hand (grösser, fett …), sondern mit <b>Formatvorlagen</b>.</p>
        <ol class="instr"><li>Setze den Cursor in den Titel.</li><li>Wähle oben unter <b>Start → Formatvorlagen</b> «<b>Überschrift 1</b>» (Haupttitel) oder «<b>Überschrift 2</b>» (Untertitel).</li><li>Normaler Text bleibt «<b>Standard</b>».</li></ol>
        <div class="note note-green"><b>Warum?</b>Word erkennt so die Struktur deines Dokuments. Damit funktionieren das automatische Inhaltsverzeichnis und der Navigationsbereich (${K('Ctrl+F','⌘+F')}), und alle Titel sehen einheitlich aus.</div>` },
      { t:"Aufzählungen und Nummerierungen", h:`
        <p>Unter <b>Start → Absatz</b> findest du die Knöpfe für • Aufzählung und 1. Nummerierung.</p>
        <ul><li><b>Enter</b> → neuer Punkt</li><li><b>Tab</b> → Unterpunkt (eine Stufe tiefer)</li><li><b>Shift+Tab</b> → wieder eine Stufe höher</li><li>Zweimal <b>Enter</b> → Liste beenden</li></ul>` },
      { t:"Tabellen", h:`
        <ol class="instr"><li><b>Einfügen → Tabelle</b> und mit der Maus die Anzahl Spalten und Zeilen wählen.</li><li>Mit <b>Tab</b> springst du in die nächste Zelle. In der letzten Zelle erzeugt <b>Tab</b> eine neue Zeile.</li><li>Unter <b>Tabellenentwurf</b> wählst du ein Aussehen.</li></ol>` },
      { t:"Seitenlayout, Seitenzahlen, Inhaltsverzeichnis", h:`
        <ul><li><b>Layout → Seitenränder</b>: Ränder einstellen.</li><li><b>Einfügen → Seitenzahl</b>: Seitenzahlen in die Fusszeile.</li><li><b>Referenzen → Inhaltsverzeichnis</b> → «Automatische Tabelle». Das funktioniert nur mit Formatvorlagen!</li><li>Titel geändert? Ins Inhaltsverzeichnis klicken → <b>Tabelle aktualisieren</b>.</li><li>Neue Seite erzwingen: <b>Einfügen → Seitenumbruch</b> bzw. ${K('Ctrl+Enter','⌘+Enter')}. Nicht viele Male Enter drücken!</li></ul>` },
      { t:"Die wichtigsten Tastenkürzel", h:`
        <table class="kt"><tr><td>Speichern</td><td>${K('Ctrl+S','⌘+S')}</td></tr><tr><td>Rückgängig</td><td>${K('Ctrl+Z','⌘+Z')}</td></tr><tr><td>Kopieren / Einfügen</td><td>${K('Ctrl+C / Ctrl+V','⌘+C / ⌘+V')}</td></tr><tr><td>Fett / Kursiv / Unterstrichen</td><td>${K('Ctrl+B / I / U','⌘+B / I / U')}</td></tr><tr><td>Alles markieren</td><td>${K('Ctrl+A','⌘+A')}</td></tr><tr><td>Suchen</td><td>${K('Ctrl+F','⌘+F')}</td></tr></table>` }
    ],
    quiz:[
      { q:"Wie formatierst du einen Kapiteltitel richtig?", o:["Schrift grösser und fett machen","Formatvorlage «Überschrift 1» wählen","In Grossbuchstaben schreiben"], a:1, e:"Mit Formatvorlagen erkennt Word die Struktur, z.B. für das Inhaltsverzeichnis." },
      { q:"Was brauchst du, damit ein automatisches Inhaltsverzeichnis funktioniert?", o:["Seitenzahlen","Überschriften als Formatvorlage","Eine Tabelle"], a:1, e:"Das Inhaltsverzeichnis sammelt alle Texte mit den Formatvorlagen «Überschrift 1, 2, …»." },
      { q:"Du willst in einer Aufzählung einen Unterpunkt machen. Welche Taste?", o:["Tab","Enter","Leertaste"], a:0, e:"Tab rückt eine Stufe ein, Shift+Tab wieder aus." },
      { q:"Wie beginnst du richtig eine neue Seite?", o:["So lange Enter drücken, bis eine neue Seite kommt","Seitenumbruch einfügen","Ein neues Dokument öffnen"], a:1, e:"Ein Seitenumbruch bleibt richtig, auch wenn du oben Text einfügst." },
      { q:"Du hast einen Titel geändert. Das Inhaltsverzeichnis zeigt noch den alten. Was tun?", o:["Inhaltsverzeichnis löschen und von Hand schreiben","Ins Inhaltsverzeichnis klicken → «Tabelle aktualisieren»","Nichts, das geht nicht"], a:1, e:"Das Verzeichnis aktualisiert sich auf Knopfdruck." }
    ],
    ex:{ type:"docx", title:"Praxis-Auftrag: Mein Steckbrief", h:`
      <p>Erstelle in Word ein Dokument «Steckbrief» über dich oder deinen Lehrbetrieb mit:</p>
      <ul><li>einem Haupttitel mit <b>Überschrift 1</b></li><li>mindestens <b>zwei Untertiteln</b> mit <b>Überschrift 2</b></li><li>einer <b>Aufzählung</b> oder Nummerierung</li><li>einer <b>Tabelle</b></li><li>einem automatischen <b>Inhaltsverzeichnis</b></li></ul>
      <p>Speichere als <b>.docx</b> und lade die Datei hier hoch. Sie wird nur auf deinem Gerät geprüft.</p>` } },

  /* ---------------- EXCEL ---------------- */
  { id:"excel", ico:"📊", title:"Excel", sub:"Zellen, Formeln, SUMME, Diagramm", min:30,
    lessons:[
      { t:"Zellen, Spalten, Zeilen", h:`
        <p>Eine Excel-Tabelle besteht aus <b>Spalten</b> (A, B, C …) und <b>Zeilen</b> (1, 2, 3 …). Wo sie sich kreuzen, ist eine <b>Zelle</b>, z.B. <b>B3</b> (Spalte B, Zeile 3).</p>
        <div class="xl"><table><tr><th></th><th>A</th><th>B</th><th>C</th></tr><tr><th>1</th><td>Artikel</td><td>Menge</td><td>Preis</td></tr><tr><th>2</th><td>Handschuhe</td><td>2</td><td>12.50</td></tr><tr><th>3</th><td>Schere</td><td class="hl">1</td><td>39.00</td></tr></table><p class="small muted">Markiert: Zelle B3</p></div>
        <p>Zahlen formatieren: Zelle markieren → <b>Start → Zahl</b> → z.B. «Währung» oder «Prozent».</p>` },
      { t:"Formeln: rechnen lassen", h:`
        <p>Jede Formel beginnt mit <b>=</b>. Statt Zahlen verwendest du <b>Zellbezüge</b>. Dann rechnet Excel automatisch neu, wenn sich eine Zahl ändert.</p>
        <table class="kt"><tr><td><code>=B2*C2</code></td><td>Menge mal Preis</td></tr><tr><td><code>=SUMME(D2:D10)</code></td><td>Summe von D2 bis D10</td></tr><tr><td><code>=MITTELWERT(B2:B10)</code></td><td>Durchschnitt</td></tr><tr><td><code>=MIN(…)</code> / <code>=MAX(…)</code></td><td>kleinster / grösster Wert</td></tr></table>
        <div class="note note-blue"><b>Tipp</b>Schnell summieren: unter die Zahlen klicken → <b>Start → AutoSumme Σ</b> → Enter.</div>` },
      { t:"Formeln kopieren und $-Zeichen", h:`
        <p>Ziehe am kleinen Quadrat unten rechts an der Zelle (<b>Ausfüllkästchen</b>) nach unten. Excel passt die Bezüge automatisch an: aus <code>=B2*C2</code> wird <code>=B3*C3</code>.</p>
        <p>Soll ein Bezug <b>fest</b> bleiben (z.B. ein MWST-Satz in Zelle F1), setze <b>$</b>: <code>=D2*$F$1</code>. Schnell geht das mit ${K('F4','⌘+T')}.</p>` },
      { t:"Tabellen sortieren, filtern, Diagramme", h:`
        <ul><li><b>Start → Als Tabelle formatieren</b>: Die Liste bekommt Farben und Filterknöpfe.</li><li><b>Daten → Sortieren</b> bzw. <b>Filtern</b>: Daten ordnen oder nur bestimmte Zeilen anzeigen.</li><li><b>Diagramm</b>: Daten markieren → <b>Einfügen → Empfohlene Diagramme</b>.</li></ul>
        <div class="note note-green"><b>Welches Diagramm?</b>Säulen = Werte vergleichen · Linie = Entwicklung über Zeit · Kreis = Anteile eines Ganzen (nur wenige Teile).</div>` }
    ],
    quiz:[
      { q:"Womit beginnt jede Formel in Excel?", o:["Mit =","Mit #","Mit SUMME"], a:0, e:"Ohne = hält Excel deine Eingabe für Text." },
      { q:"Was berechnet =SUMME(B2:B6)?", o:["B2 plus B6","Alle Zellen von B2 bis B6 zusammengezählt","Den Durchschnitt von B2 bis B6"], a:1, e:"Der Doppelpunkt bedeutet «von … bis»." },
      { q:"Warum schreibst du =B2*C2 statt =2*12.50?", o:["Weil es kürzer ist","Damit Excel neu rechnet, wenn sich eine Zahl ändert","Das ist egal"], a:1, e:"Mit Zellbezügen bleibt deine Tabelle immer aktuell." },
      { q:"Wozu dient das $ in =D2*$F$1?", o:["Es zeigt Franken an","Der Bezug F1 bleibt beim Kopieren fest","Es rundet auf"], a:1, e:"$ macht einen Bezug absolut." },
      { q:"Du willst zeigen, wie sich die Temperatur über einen Monat verändert. Welches Diagramm?", o:["Kreisdiagramm","Liniendiagramm","Gar keines"], a:1, e:"Entwicklungen über Zeit zeigt man mit einer Linie." }
    ],
    ex:{ type:"xlsx", title:"Praxis-Auftrag: Material-Budget", h:`
      <p>Erstelle in Excel eine Einkaufsliste mit den Spalten <b>Artikel, Menge, Preis, Total</b> (mindestens 5 Artikel):</p>
      <ul><li>«Total» mit einer <b>Formel</b> (Menge × Preis)</li><li>unten die Gesamtsumme mit <b>SUMME</b></li><li>den durchschnittlichen Preis mit <b>MITTELWERT</b></li><li>ein <b>Diagramm</b> zu den Totalen</li></ul>
      <p>Speichere als <b>.xlsx</b> und lade die Datei hoch.</p>` } },

  /* ---------------- ONENOTE ---------------- */
  { id:"onenote", ico:"📓", title:"OneNote", sub:"Klassennotizbuch und Lernjournal", min:15,
    lessons:[
      { t:"Notizbuch, Abschnitt, Seite", h:`
        <p>OneNote ist wie ein Ordner mit Registern:</p>
        <div class="two"><div class="mini"><b>📒 Notizbuch</b><p>= der ganze Ordner (z.B. «Klassennotizbuch GLA27A»)</p></div><div class="mini"><b>🗂️ Abschnitt</b><p>= Register (z.B. «Lernjournal», «Fachrechnen»)</p></div><div class="mini"><b>📄 Seite</b><p>= ein einzelnes Blatt mit Notizen</p></div></div>
        <p>OneNote <b>speichert automatisch</b>. Es gibt keinen Speichern-Knopf.</p>` },
      { t:"Das Klassennotizbuch", h:`
        <p>Dein Klassennotizbuch erreichst du im Klassenteam über den Reiter <b>Klassennotizbuch</b> oder in der OneNote-App (angemeldet mit dem SBL-Konto). Es hat drei Bereiche:</p>
        <ul><li><b>Inhaltsbibliothek</b>: Unterlagen der Lehrperson. Du kannst sie nur lesen.</li><li><b>Bereich für Zusammenarbeit</b>: Hier arbeiten alle gemeinsam.</li><li><b>Dein eigener Bereich</b> (mit deinem Namen): Nur du und die Lehrpersonen sehen ihn. Hier liegt z.B. dein <b>Lernjournal</b>.</li></ul>` },
      { t:"Praktische Werkzeuge", h:`
        <ul><li><b>Kategorien/Tags</b> (Start → Kategorien): z.B. ☑ Aufgabe, ⭐ Wichtig, ❓ Frage.</li><li><b>Einfügen → Bild / Datei</b>: Fotos von der Wandtafel oder Arbeitsblätter einfügen.</li><li><b>Zeichnen</b>: mit Stift oder Finger skizzieren.</li><li>Suchen über alle Notizen: ${K('Ctrl+F','⌘+F')}</li></ul>` }
    ],
    quiz:[
      { q:"Wo musst du in OneNote speichern?", o:["Datei → Speichern","Nirgends, OneNote speichert automatisch","Mit Ctrl+S nach jeder Änderung"], a:1, e:"OneNote speichert und synchronisiert automatisch." },
      { q:"Wer sieht deinen eigenen Bereich im Klassennotizbuch?", o:["Die ganze Klasse","Nur du und die Lehrpersonen","Niemand, auch die Lehrperson nicht"], a:1, e:"Der eigene Bereich ist für dich und die Lehrpersonen." },
      { q:"Kannst du die Unterlagen in der Inhaltsbibliothek verändern?", o:["Ja","Nein, die kann man nur lesen","Nur am Handy"], a:1, e:"Die Inhaltsbibliothek ist schreibgeschützt. Kopiere Seiten in deinen Bereich, wenn du darin arbeiten willst." },
      { q:"Was entspricht in OneNote einem Register im Ordner?", o:["Die Seite","Der Abschnitt","Das Notizbuch"], a:1, e:"Notizbuch = Ordner, Abschnitt = Register, Seite = Blatt." }
    ] },

  /* ---------------- POWERPOINT ---------------- */
  { id:"powerpoint", ico:"📽️", title:"PowerPoint", sub:"Gute Folien gestalten und präsentieren", min:30,
    lessons:[
      { t:"Design und Folienlayouts", h:`
        <ol class="instr"><li><b>Entwurf → Designs</b>: Wähle ein Design für die ganze Präsentation.</li><li><b>Start → Neue Folie</b> (Pfeil darunter): Wähle ein passendes <b>Layout</b>, z.B. «Titel und Inhalt» oder «Zwei Inhalte».</li><li>Schreibe in die Platzhalter, statt eigene Textfelder zu zeichnen. So bleibt alles einheitlich.</li></ol>` },
      { t:"Weniger ist mehr", h:`
        <div class="two"><div class="mini bad"><b>✗ So nicht</b><p>Ganze Sätze, kleine Schrift, viele Farben, die Folie wird vorgelesen.</p></div><div class="mini good"><b>✓ So schon</b><p>Wenige Stichworte, grosse Schrift, ein starkes Bild, du erzählst frei dazu.</p></div></div>
        <ul><li>Eine Aussage pro Folie</li><li>Stichworte statt Sätze, als Faustregel höchstens etwa 6 Zeilen</li><li>Gut lesbare Schriftgrösse und starker Kontrast (dunkel auf hell oder umgekehrt)</li><li>Bilder: <b>Einfügen → Bilder</b>. Achte auf das Urheberrecht und gib die Quelle an.</li></ul>` },
      { t:"Präsentieren", h:`
        <ul><li>Starten: <b>Bildschirmpräsentation → Von Beginn an</b> oder <kbd>F5</kbd></li><li>Nächste Folie: <kbd>→</kbd>, Leertaste oder Klick. Beenden: <kbd>Esc</kbd></li><li>Unter jeder Folie gibt es <b>Notizen</b>. In der <b>Referentenansicht</b> siehst nur du sie, das Publikum nicht.</li><li><kbd>B</kbd> macht den Bildschirm schwarz, wenn alle zu dir schauen sollen.</li></ul>` }
    ],
    quiz:[
      { q:"Was gehört auf eine gute Folie?", o:["Der ganze Vortrag als Text","Wenige Stichworte und ein passendes Bild","Möglichst viele Animationen"], a:1, e:"Die Folie unterstützt, du erzählst." },
      { q:"Wie startest du die Präsentation von der ersten Folie?", o:["F5","Ctrl+S","Esc"], a:0, e:"F5 bzw. Bildschirmpräsentation → Von Beginn an." },
      { q:"Wo schreibst du Notizen, die nur du beim Präsentieren siehst?", o:["Auf die Folie in kleiner Schrift","Ins Notizfeld unter der Folie","Auf einen Zettel am Bildschirm"], a:1, e:"Notizen erscheinen in der Referentenansicht nur auf deinem Bildschirm." },
      { q:"Warum solltest du Layouts mit Platzhaltern verwenden?", o:["Damit alle Folien einheitlich aussehen","Weil es sonst nicht speichert","Das ist egal"], a:0, e:"Platzhalter sorgen für gleiche Positionen und Schriften." }
    ],
    ex:{ type:"pptx", title:"Praxis-Auftrag: Mein Lehrbetrieb in 5 Folien", h:`
      <p>Erstelle eine kurze Präsentation über deinen Lehrbetrieb oder deinen Beruf:</p>
      <ul><li>mindestens <b>5 Folien</b>, die erste ist eine Titelfolie</li><li>mindestens <b>ein Bild</b></li><li><b>wenig Text</b>: höchstens 40 Wörter pro Folie</li><li>auf mindestens einer Folie <b>Notizen</b> für dich</li></ul>
      <p>Speichere als <b>.pptx</b> und lade die Datei hoch.</p>` } },

  /* ---------------- DATEN SPEICHERN ---------------- */
  { id:"speichern", ico:"☁️", title:"Daten speichern", sub:"OneDrive oder Festplatte, Ordner, Dateinamen", min:15,
    lessons:[
      { t:"Wo speichere ich was?", h:`
        <div class="two"><div class="mini"><b>💻 Festplatte</b><p>(z.B. Desktop, Downloads) Nur auf diesem Laptop. Geht er kaputt oder verloren, sind die Dateien weg.</p></div><div class="mini good"><b>☁️ OneDrive – SBL</b><p>Auf dem Laptop <b>und</b> online gesichert. Auf allen Geräten verfügbar und einfach zu teilen.</p></div></div>
        <div class="note note-green"><b>Empfehlung</b>Alle Schularbeiten in <b>OneDrive – SBL</b> speichern. USB-Sticks gehen gerne verloren.</div>` },
      { t:"Ordnung mit Ordnern", h:`
        <p>Lege eine klare Ordnerstruktur an, z.B.:</p>
        <pre class="tree">OneDrive – SBL
└─ Schule
   ├─ 1_Lehrjahr
   │  ├─ ABU
   │  ├─ Berufskunde
   │  └─ Fachrechnen
   └─ Admin (Zeugnisse, Bestätigungen)</pre>` },
      { t:"Gute Dateinamen", h:`
        <p>Ein guter Dateiname sagt sofort, was drin ist, und sortiert sich richtig:</p>
        <table class="kt"><tr><td>✓</td><td><code>2027-09-14_Berufskunde_Bodenarten.docx</code></td></tr><tr><td>✓</td><td><code>Lernjournal_KW38_Lara.docx</code></td></tr><tr><td>✗</td><td><code>Dokument1 (3) final NEU.docx</code></td></tr><tr><td>✗</td><td><code>asdf.docx</code></td></tr></table>
        <ul><li>Datum als <b>JJJJ-MM-TT</b>, dann sortiert es sich richtig</li><li>keine Sonderzeichen wie / \\ : * ? " &lt; &gt; |</li><li>die Endung (.docx, .pdf, .xlsx) zeigt den Dateityp</li></ul>` },
      { t:"Speichern oder Speichern unter?", h:`
        <ul><li><b>Speichern</b> ${K('Ctrl+S','⌘+S')}: überschreibt die bestehende Datei.</li><li><b>Speichern unter</b>: neue Kopie mit anderem Namen, Ort oder Format (z.B. PDF).</li><li>In OneDrive gibt es den <b>Versionsverlauf</b>: Rechtsklick auf die Datei → Versionsverlauf. So holst du eine ältere Fassung zurück.</li></ul>` }
    ],
    quiz:[
      { q:"Dein Laptop wird gestohlen. Welche Dateien hast du noch?", o:["Die auf dem Desktop","Die in OneDrive – SBL","Die im Download-Ordner"], a:1, e:"OneDrive ist online gesichert." },
      { q:"Welcher Dateiname ist am besten?", o:["Dokument1 final.docx","2027-09-14_Berufskunde_Bodenarten.docx","bodenarten!!!.docx"], a:1, e:"Datum (JJJJ-MM-TT), Fach und Thema, ohne Sonderzeichen." },
      { q:"Du willst eine Kopie deiner Datei als PDF. Was wählst du?", o:["Speichern","Speichern unter","Schliessen"], a:1, e:"Mit «Speichern unter» wählst du ein neues Format." },
      { q:"Warum das Datum als 2027-09-14 und nicht 14.9.27?", o:["Es sieht moderner aus","Die Dateien sortieren sich dann richtig nach Datum","Das ist Vorschrift"], a:1, e:"Jahr-Monat-Tag sortiert sich alphabetisch korrekt." }
    ] },

  /* ---------------- PDF ---------------- */
  { id:"pdf", ico:"📄", title:"PDF erstellen", sub:"Aus Word, PowerPoint und mit dem Handy", min:15,
    lessons:[
      { t:"Warum PDF?", h:`<p>Ein PDF sieht auf jedem Gerät <b>genau gleich</b> aus und lässt sich nicht so leicht verändern. Darum gibst du Arbeiten meist als PDF ab.</p>` },
      { t:"Aus Word oder PowerPoint", h:`
        <p><b>Windows:</b> Datei → <b>Speichern unter</b> → Dateityp «<b>PDF</b>» oder Datei → <b>Exportieren</b> → PDF/XPS-Dokument erstellen.</p>
        <p><b>Mac:</b> Datei → <b>Speichern unter</b> → Dateiformat «<b>PDF</b>».</p>
        <p>Die Originaldatei (.docx/.pptx) behältst du, damit du sie später noch ändern kannst.</p>` },
      { t:"Aus jedem Programm: Drucken als PDF", h:`
        <p>Fast jedes Programm kann über den Druckdialog ein PDF erzeugen:</p>
        <ul><li><b>Windows:</b> Drucken → Drucker «<b>Microsoft Print to PDF</b>»</li><li><b>Mac:</b> Drucken → unten links «<b>PDF</b>» → «<b>Als PDF sichern</b>»</li></ul>` },
      { t:"Mit dem Handy: Blatt scannen", h:`
        <ul><li><b>iPhone:</b> App Dateien oder Notizen → «Dokumente scannen»</li><li><b>Android:</b> App Google Drive → ＋ → «Scannen»</li><li><b>OneDrive-App:</b> Kamera-Symbol → Scannen. Mehrere Seiten werden zu einem PDF.</li></ul>` }
    ],
    quiz:[
      { q:"Warum gibst du Arbeiten als PDF ab?", o:["Es sieht überall gleich aus","Es ist immer kleiner","Es ist farbiger"], a:0, e:"Das Layout bleibt auf jedem Gerät gleich." },
      { q:"Welchen «Drucker» wählst du unter Windows, um ein PDF zu erstellen?", o:["SBL-Black","Microsoft Print to PDF","Fax"], a:1, e:"Microsoft Print to PDF speichert statt zu drucken." },
      { q:"Du hast ein PDF aus Word erstellt. Musst du die .docx-Datei noch behalten?", o:["Nein, die braucht es nicht mehr","Ja, damit du später noch etwas ändern kannst"], a:1, e:"Ändern geht nur in der Originaldatei." }
    ],
    ex:{ type:"pdf", title:"Praxis-Auftrag: PDF aus PowerPoint", h:`
      <p>Speichere eine PowerPoint-Präsentation mit <b>mindestens 2 Folien</b> als <b>PDF</b> (z.B. die aus dem PowerPoint-Modul) und lade das PDF hier hoch.</p>` } }
  ];

  window.ITO_TRAINING = { MODULES };
})();
