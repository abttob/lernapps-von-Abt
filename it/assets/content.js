/* Inhalte: Onboarding-Schritte und Hilfe-Themen. Texte hier anpassen. */
(function(){
  const C = ITO.CFG;
  const V = {
    pwHandy:  "https://www.nanoo.tv/link/v/zTkFZKVP",
    pwLaptop: "https://www.nanoo.tv/link/v/VdxjjWDG",
    wlanLaptop: "https://www.nanoo.tv/link/v/BosAYqVz",
    office:   "https://www.nanoo.tv/link/v/aVhRjHPh",
    drucker:  "https://www.nanoo.tv/link/v/viZuxZdq",
    salHandy: "https://www.nanoo.tv/link/v/yRWAEufj"
  };
  const W = () => ITO.wlanName();

  /* ---------- ONBOARDING ---------- */
  const PARTS = [
    { id:"A", title:"Teil A · Handy", dev:"📱", hint:"Diese Schritte machst du mit dem Handy." },
    { id:"B", title:"Teil B · Laptop", dev:"💻", hint:"Diese Schritte machst du am Laptop." },
    { id:"C", title:"Teil C · Sobald du deinen Lernendenausweis hast", dev:"🪪", hint:"Diesen Schritt machst du später." },
    { id:"X", title:"Bonus · freiwillig", dev:"⭐", hint:"Nicht Pflicht, aber praktisch." }
  ];

  const STEPS = [
    { id:"h_wlan", part:"A", dev:"📱", title:"Handy mit dem Schul-WLAN verbinden", short:"WLAN Handy", check:"ip", help:"wlan",
      intro:"Damit alles schnell läuft, verbindest du zuerst dein Handy mit dem Schul-WLAN.",
      steps:() => [
        "Öffne auf dem Handy <b>Einstellungen → WLAN</b>.",
        "Wähle " + W() + ".",
        "Wenn eine Anmeldung erscheint: mit deinem <b>SBL-Benutzernamen</b> und dem <b>Passwort von deinem Zugangsblatt</b> anmelden.",
        "Schalte die <b>mobilen Daten aus</b>, damit das Handy wirklich das WLAN benutzt.",
        "Tippe unten auf <b>«WLAN prüfen»</b>."
      ],
      tip:"Kein Login-Fenster? Öffne den Browser und lade eine beliebige Seite neu. Dann erscheint die Anmeldung meistens." },

    { id:"h_pw", part:"A", dev:"📱", title:"Startpasswort ändern", short:"Passwort", check:"next", help:"passwort",
      videos:[["Video: Passwort ändern auf dem Handy", V.pwHandy]],
      intro:"Bei der ersten Anmeldung musst du dein Startpasswort durch ein eigenes ersetzen. Es gilt danach für <b>alle</b> SBL-Dienste: Teams, Office, SAL und E-Mail.",
      steps:() => [
        "Schau dir das Video an und folge den Schritten.",
        "Melde dich mit deinem SBL-Benutzernamen und dem <b>Startpasswort</b> an.",
        "Du wirst aufgefordert, ein <b>neues Passwort</b> zu wählen. Tipp: ein Satz, den nur du kennst, z.B. <i>MeinVeloIstRot!2027</i>.",
        "<b>Merke dir das neue Passwort gut.</b> Schreibe es nicht aufs Handy-Display oder an den Laptop."
      ],
      tip:"Den Nachweis musst du hier nicht erbringen: Wenn du dich im nächsten Schritt in Teams anmelden kannst, ist klar, dass dein neues Passwort funktioniert." },

    { id:"h_teams", part:"A", dev:"📱", title:"Teams auf dem Handy", short:"Teams Handy", check:"code", help:"teams",
      intro:"In Teams findest du deine Klasse, Unterlagen und Mitteilungen der Lehrpersonen.",
      steps:() => [
        "Installiere die App <b>Microsoft Teams</b> aus dem App Store (iPhone) oder Google Play (Android).",
        "Melde dich mit deiner <b>SBL-E-Mail-Adresse</b> und deinem <b>neuen Passwort</b> an.",
        "Erlaube <b>Mitteilungen</b> (Benachrichtigungen), wenn das Handy fragt. So verpasst du keine Infos.",
        "Öffne unter <b>Teams</b> dein <b>Klassenteam</b>.",
        "Im Kanal <b>Allgemein</b> ist ein Beitrag mit einem <b>Codewort</b> angeheftet. Gib es unten ein."
      ],
      tip:"Du siehst dein Klassenteam nicht? Melde dich mit «Ich brauche Hilfe». Deine Lehrperson fügt dich hinzu." },

    { id:"h_sal", part:"A", dev:"📱", title:"SAL: Foto, Daten und schulNetz.mobile", short:"SAL", check:"date", help:"sal",
      videos:[["Video: SAL einrichten mit dem Handy", V.salHandy]],
      intro:"SAL (schulNetz) ist die Plattform für Absenzen, Noten und Termine. Hier lädst du auch das Foto für deinen <b>Lernendenausweis</b> hoch.",
      steps:() => [
        "Öffne <a href=\"" + C.SAL + "\" target=\"_blank\" rel=\"noopener\">SAL (portal.sbl.ch/bbzbl)</a> und melde dich mit deinem SBL-Konto an.",
        "Tippe oben rechts auf <b>⋮ → mein schulNetz → Einstellungen</b>.",
        "<b>Prüfe deine Angaben</b> (Name, Adresse, Geburtsdatum). Die Felder kannst du nicht selbst ändern. Ist etwas falsch, sag es deiner Lehrperson oder dem Sekretariat.",
        "Unter <b>Fotoupload</b>: Tippe auf <b>«Neues Foto hochladen»</b> und mach ein <b>Selfie</b>. Dieses Foto kommt auf deinen Lernendenausweis.",
        "Unter <b>Sicherheitseinstellungen</b>: Setze einen eigenen <b>4-stelligen PIN für schulNetz.mobile</b>.",
        "Ganz unten auf <b>Speichern</b> tippen. Ohne Speichern geht alles verloren!",
        "Installiere die App <b>schulNetz.mobile</b> und melde dich mit deinem PIN an (siehe Video)."
      ],
      extra:"<div class=\"note note-blue\"><b>📸 So wird dein Ausweisfoto gut</b>Heller, ruhiger Hintergrund · Gesicht gerade in die Kamera · keine Mütze, keine Sonnenbrille · gutes Licht von vorne.</div><div class=\"note note-yellow\"><b>🔒 Dein PIN bleibt geheim</b>Diese Seite fragt nie nach deinem PIN oder Passwort.</div>",
      tip:"" },

    { id:"l_wlan", part:"B", dev:"💻", title:"Laptop mit dem Schul-WLAN verbinden", short:"WLAN Laptop", check:"ip", desktop:true, help:"wlan",
      videos:[["Video: WLAN auf dem Laptop einrichten", V.wlanLaptop]],
      intro:"Jetzt kommt der Laptop dran. Öffne diese Seite am Laptop und melde dich wieder mit Klassencode und Namen an.",
      steps:() => [
        "Schau dir das Video an.",
        "Klicke unten rechts (Windows) bzw. oben rechts (Mac) auf das <b>WLAN-Symbol</b>.",
        "Wähle " + W() + ". Wenn eine Anmeldung erscheint: mit deinem <b>SBL-Benutzernamen</b> und deinem <b>neuen Passwort</b> anmelden.",
        "Klicke unten auf <b>«WLAN prüfen»</b>."
      ],
      tip:"" },

    { id:"l_office", part:"B", dev:"💻", title:"Office installieren und testen", short:"Office", check:"pdf", desktop:true, help:"office",
      videos:[["Video: Office-Paket einrichten", V.office]],
      intro:"Du bekommst Microsoft Office (Word, Excel, PowerPoint, OneNote, Teams) gratis über die Schule.",
      steps:() => [
        "Öffne <a href=\"" + C.OFFICE + "\" target=\"_blank\" rel=\"noopener\">office.com</a> und melde dich mit deiner SBL-E-Mail-Adresse an.",
        "Klicke auf <b>«Apps installieren» → «Microsoft 365-Apps»</b> und führe die heruntergeladene Datei aus. Das dauert ein paar Minuten. In der Zwischenzeit kannst du weiterlesen.",
        "Öffne <b>Word</b> und melde dich an, falls Word fragt.",
        "Erstelle ein neues Dokument und schreibe deinen <b>Vornamen</b> und deinen <b>persönlichen Code</b> hinein (siehe blaues Feld unten).",
        "Speichere es als <b>PDF</b>: <i>Windows:</i> Datei → Speichern unter → Dateityp «PDF». <i>Mac:</i> Datei → Speichern unter → Dateiformat «PDF».",
        "Lade das PDF unten hoch. Die Seite prüft es automatisch."
      ],
      tip:"Hast du Office schon auf dem Laptop? Dann melde dich in Word einfach mit dem SBL-Konto an (oben rechts beim Namen)." },

    { id:"l_teams", part:"B", dev:"💻", title:"Sich in Teams zurechtfinden", short:"Teams Laptop", check:"quiz", desktop:true, help:"teams",
      intro:"Teams ist mit Office auf deinem Laptop installiert. Jetzt lernst du, wo du was findest.",
      steps:() => [
        "Öffne <b>Teams</b> am Laptop und melde dich an.",
        "Klicke links auf <b>Teams</b> und öffne dein <b>Klassenteam</b>.",
        "Schau dir an: <b>Beiträge</b> (Mitteilungen an alle), <b>Dateien</b> (Unterlagen), die <b>Kanäle</b> und den <b>Chat</b> links (Nachrichten an einzelne Personen).",
        "Beantworte unten die Fragen. Die Antworten findest du alle in deinem Klassenteam."
      ],
      tip:"" },

    { id:"l_print", part:"B", dev:"💻", title:"Drucker einrichten", short:"Drucker", check:"printer", desktop:true, help:"drucker",
      videos:[["Video: IPP-Drucker einrichten", V.drucker]],
      intro:"Du richtest heute den Drucker ein. Drucken kannst du erst, wenn du deinen <b>Lernendenausweis</b> hast, denn damit gibst du den Auftrag am Drucker frei.",
      steps:() => [
        "Schau dir das Video an und folge genau den Schritten.",
        "Danach gibt es auf deinem Laptop die Drucker <b>«SBL-Black»</b> (schwarz-weiss) und <b>«SBL-Color»</b> (farbig).",
        "<i>Windows:</i> Starttaste drücken und «SBL» eintippen. Dann siehst du die Drucker-Verbindungen. <i>Mac:</i> Systemeinstellungen → Drucker & Scanner.",
        "Schreibe unten den genauen Namen eines der beiden Drucker hin."
      ],
      tip:"Noch nichts drucken! Der Druck-Test kommt in Teil C, sobald du deinen Ausweis hast." },

    { id:"scan", part:"C", dev:"🪪", title:"Drucken und mit dem Handy scannen", short:"Druck & Scan", check:"photo", help:"scannen", later:true,
      intro:"Sobald du deinen Lernendenausweis hast, testest du Drucker und Scan in einem Schritt.",
      steps:() => [
        "Öffne am <b>Laptop</b> dein persönliches <b>Druckblatt</b> (Knopf unten) und drucke es auf <b>SBL-Black</b>.",
        "Gib den Auftrag am Drucker mit deinem <b>Lernendenausweis</b> frei.",
        "Öffne diese Seite auf dem <b>Handy</b> und fotografiere das gedruckte Blatt. Der QR-Code muss gut sichtbar sein.",
        "Lade das Foto hoch. Die Seite erkennt dein Blatt automatisch."
      ],
      tip:"So scannst du später auch Arbeitsblätter: Foto machen, als PDF speichern, abgeben. Mehr dazu unter Hilfe › Scannen." },

    { id:"b_home", part:"X", dev:"⭐", title:"Diese Seite auf den Startbildschirm legen", short:"App-Symbol", check:"self", help:null, bonus:true,
      intro:"Damit du die Hilfe später immer schnell findest.",
      steps:() => [
        "<i>iPhone (Safari):</i> Teilen-Symbol □↑ → <b>«Zum Home-Bildschirm»</b>.",
        "<i>Android (Chrome):</i> Menü ⋮ → <b>«Zum Startbildschirm hinzufügen»</b> bzw. «App installieren».",
        "<i>Laptop:</i> Lesezeichen setzen (Ctrl+D bzw. ⌘+D)."
      ] },

    { id:"b_onedrive", part:"X", dev:"⭐", title:"OneDrive kennenlernen", short:"OneDrive", check:"self", help:"onedrive", bonus:true,
      intro:"Mit OneDrive sind deine Dateien automatisch gesichert und auf Laptop und Handy verfügbar.",
      steps:() => [
        "Öffne am Laptop den <b>Explorer</b> (Windows) bzw. den <b>Finder</b> (Mac). Links siehst du <b>«OneDrive – SBL»</b>. Falls nicht: OneDrive starten und mit dem SBL-Konto anmelden.",
        "Erstelle dort einen Ordner <b>«Schule»</b> mit Unterordnern pro Fach.",
        "Installiere die App <b>OneDrive</b> auf dem Handy und melde dich an. Jetzt siehst du den Ordner auch dort."
      ] }
  ];

  const DAY1 = ["h_wlan","h_pw","h_teams","h_sal","l_wlan","l_office","l_teams","l_print"];

  /* ---------- HILFE ---------- */
  const HELP = [
    { id:"wlan", ico:"📶", title:"WLAN", keys:"internet netz verbindung wifi wlan",
      videos:[["WLAN auf dem Laptop einrichten", V.wlanLaptop]],
      body:() => "<p>Verbinde dich mit " + W() + " und melde dich mit deinem SBL-Benutzernamen und deinem Passwort an.</p>",
      faq:[
        ["Ich bin verbunden, aber nichts lädt.", "WLAN aus- und wieder einschalten. Hilft das nicht: Das WLAN «vergessen» bzw. «Netzwerk entfernen» und neu verbinden. Beim Handy die mobilen Daten kurz ausschalten."],
        ["Das WLAN fragt nicht mehr nach dem Passwort, seit ich es geändert habe.", "Das alte Passwort ist noch gespeichert. Netzwerk entfernen bzw. «Dieses Netzwerk ignorieren» und neu verbinden, dann mit dem neuen Passwort anmelden."],
        ["Mein Laptop findet das WLAN gar nicht.", "Prüfe, ob der Flugmodus aus ist und WLAN eingeschaltet ist. Laptop neu starten."]
      ] },
    { id:"passwort", ico:"🔑", title:"Passwort", keys:"passwort vergessen ändern login anmelden konto",
      videos:[["Passwort ändern auf dem Handy", V.pwHandy],["Passwort ändern auf dem Laptop", V.pwLaptop]],
      body:() => "<p>Dein SBL-Passwort gilt für <b>alle</b> Dienste: WLAN, Teams, Office, SAL und E-Mail. Wenn du es änderst, musst du dich überall neu anmelden.</p>",
      faq:[
        ["Ich habe mein Passwort vergessen.", "Die IT der Schulen Baselland (IT.SBL) beschreibt, wie du es zurücksetzen kannst: <a href=\"" + C.PW_RESET + "\" target=\"_blank\" rel=\"noopener\">IT.SBL – Technischer Support</a>. Klappt es nicht, wende dich an deine Lehrperson oder an <a href=\"mailto:" + C.SUPPORT_MAIL + "\">" + C.SUPPORT_MAIL + "</a>."],
        ["Nach der Passwort-Änderung geht Teams, Mail oder WLAN nicht mehr.", "Dort ist noch das alte Passwort gespeichert. Abmelden und mit dem neuen Passwort wieder anmelden."],
        ["Wie sieht ein gutes Passwort aus?", "Lang statt kompliziert: ein Satz mit Zahl und Zeichen, z.B. <i>MeinVeloIstRot!2027</i>. Gib es nie weiter, auch nicht an Kolleginnen und Kollegen."]
      ] },
    { id:"office", ico:"📄", title:"Office (Word, Excel, PowerPoint, OneNote)", keys:"office word excel powerpoint onenote installieren lizenz microsoft 365",
      videos:[["Office-Paket einrichten", V.office]],
      body:() => "<p>Als Lernende/r bekommst du Microsoft 365 gratis. Installieren über <a href=\"" + C.OFFICE + "\" target=\"_blank\" rel=\"noopener\">office.com</a> → Anmelden → «Apps installieren».</p>",
      faq:[
        ["Word sagt «Nicht lizenziertes Produkt» oder «Produktaktivierung».", "Oben rechts in Word auf deinen Namen klicken → abmelden. Dann mit der SBL-E-Mail-Adresse wieder anmelden."],
        ["Ich habe einen Mac.", "Die Installation über office.com funktioniert genauso. Du lädst eine .pkg-Datei herunter und installierst sie."],
        ["Kann ich Office auch auf dem Handy nutzen?", "Ja: App «Microsoft 365 (Office)», mit dem SBL-Konto anmelden."]
      ] },
    { id:"teams", ico:"💬", title:"Teams", keys:"teams chat klasse klassenteam benachrichtigung mitteilung besprechung",
      body:() => "<p>Teams ist eure wichtigste Plattform im Unterricht: Klassenteam, Unterlagen, Aufträge und Mitteilungen.</p>",
      faq:[
        ["Ich sehe mein Klassenteam nicht.", "Deine Lehrperson muss dich hinzufügen. Melde dich bei ihr. Manchmal hilft es auch, Teams ganz zu schliessen und neu zu öffnen."],
        ["Ich bekomme keine Benachrichtigungen.", "Handy: Einstellungen → Mitteilungen → Teams → erlauben. In Teams: Profilbild → Benachrichtigungen."],
        ["Wo finde ich die Unterlagen?", "Im Klassenteam oben auf «Dateien» klicken, oder im jeweiligen Kanal unter «Dateien»."]
      ] },
    { id:"onedrive", ico:"☁️", title:"OneDrive und Dateien speichern", keys:"onedrive speichern dateien cloud festplatte backup synchronisieren",
      body:() => "<p>Speichere Schularbeiten im Ordner <b>«OneDrive – SBL»</b>. So sind sie gesichert und auf allen Geräten verfügbar, auch wenn der Laptop kaputtgeht.</p>",
      faq:[
        ["Wo ist mein OneDrive?", "Windows: Explorer → links «OneDrive – SBL». Mac: Finder → links unter «Speicherorte». Am Handy: App «OneDrive»."],
        ["Was ist der Unterschied zur Festplatte?", "Dateien auf der Festplatte (z.B. «Downloads», «Desktop») sind nur auf diesem Laptop. Geht er kaputt, sind sie weg. Dateien in OneDrive sind zusätzlich online gesichert."]
      ] },
    { id:"sal", ico:"🏫", title:"SAL und schulNetz.mobile", keys:"sal schulnetz noten absenzen foto pin ausweis termine ferien",
      videos:[["SAL einrichten mit dem Handy", V.salHandy]],
      body:() => "<p>In <a href=\"" + C.SAL + "\" target=\"_blank\" rel=\"noopener\">SAL (portal.sbl.ch/bbzbl)</a> siehst du deine Absenzen, Noten, Termine und Ferien. Anmelden mit deinem SBL-Konto.</p>",
      faq:[
        ["Wo lade ich mein Foto hoch oder ändere den PIN?", "⋮ (oben rechts) → mein schulNetz → Einstellungen → «Fotoupload» bzw. «Sicherheitseinstellungen». Danach unten speichern!"],
        ["Ich habe den PIN für schulNetz.mobile vergessen.", "In SAL am Browser unter Einstellungen → Sicherheitseinstellungen einfach einen neuen PIN setzen und speichern."],
        ["Meine Adresse oder mein Name ist falsch.", "Diese Felder werden zentral geführt. Melde es dem Sekretariat oder deiner Lehrperson."]
      ] },
    { id:"drucker", ico:"🖨️", title:"Drucker", keys:"drucker drucken ipp sbl-black sbl-color ausweis freigeben druckauftrag",
      videos:[["IPP-Drucker einrichten", V.drucker]],
      body:() => "<p>Es gibt zwei Drucker: <b>SBL-Black</b> (schwarz-weiss) und <b>SBL-Color</b> (farbig). Du gibst deinen Auftrag am Drucker mit dem <b>Lernendenausweis</b> frei.</p>",
      faq:[
        ["Der Drucker ist verschwunden oder funktioniert nicht mehr.", "Richte ihn neu ein: Video oben anschauen und Schritt für Schritt folgen."],
        ["Mein Auftrag kommt nicht raus.", "Hast du ihn am Drucker mit dem Ausweis freigegeben? Hast du den richtigen Drucker gewählt (SBL-Black/SBL-Color)?"],
        ["Seit der Passwort-Änderung geht Drucken nicht mehr.", "Drucker entfernen und neu einrichten. Dabei wird das neue Passwort gespeichert."]
      ] },
    { id:"scannen", ico:"📷", title:"Scannen mit dem Handy", keys:"scannen scan foto pdf handy arbeitsblatt abgeben",
      body:() => "<p>Für Abgaben brauchst du keinen Scanner, dein Handy genügt.</p>",
      faq:[
        ["iPhone", "App <b>Dateien</b> oder <b>Notizen</b> → «Dokumente scannen». Das Handy schneidet das Blatt automatisch zu und speichert es als PDF."],
        ["Android", "App <b>Google Drive</b> → ＋ → «Scannen». Wird als PDF gespeichert."],
        ["Direkt in OneDrive", "App <b>OneDrive</b> → ＋ bzw. Kamera-Symbol → «Scannen». Das Dokument landet direkt in deinem Schul-OneDrive."],
        ["Tipps für gute Scans", "Blatt auf dunklen Untergrund legen, gutes Licht, Handy parallel zum Blatt halten, kein Schatten."]
      ] },
    { id:"kontakt", ico:"🆘", title:"Es geht trotzdem nicht? Kontakt", keys:"kontakt support hilfe it picts mail problem",
      body:() => "<p>1. Frag zuerst deine <b>Lehrperson</b>.<br>2. IT-Support BBZ BL (PICTS): <a href=\"mailto:" + C.SUPPORT_MAIL + "\">" + C.SUPPORT_MAIL + "</a>.<br>Schreibe dazu: deinen Namen, deine Klasse, welches Gerät (Windows/Mac/iPhone/Android), was du gemacht hast und was genau passiert. Ein Screenshot der Fehlermeldung hilft sehr.</p>",
      faq:[] }
  ];

  window.ITO_CONTENT = { PARTS, STEPS, DAY1, HELP, V };
})();
