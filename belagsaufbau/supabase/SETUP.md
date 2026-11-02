# Einrichtung Supabase (einmalig, ca. 10 Minuten)

1. Auf https://supabase.com ein kostenloses Konto anlegen, **New project**. Region: **Europe (Zürich oder Frankfurt)**. Datenbank-Passwort notieren.
2. **Authentication → Providers → Email**: «Confirm email» **ausschalten** (die Lernenden haben keine echten E-Mail-Adressen). Mindestlänge Passwort 6.
3. **SQL Editor → New query**: Inhalt von `schema.sql` einfügen. **Vorher** die beiden Codes ändern (`KLASSENCODE-AENDERN`, `LEHRERCODE-AENDERN`), dann **Run**.
4. **Project Settings → API**: die zwei Werte **Project URL** und **anon public key** kopieren und mir senden (der anon-Key ist öffentlich gedacht, die Daten schützt die Datenbank-Sicherheit aus Schritt 3).
5. Ich trage die Werte in `assets/config.js` ein und schalte frei. Du registrierst dich mit dem Lehrercode als Lehrperson, die Klasse mit dem Klassencode.

**Datenschutz:** Es werden nur Vornamen (selbst gewählt), Lernfortschritt und die freiwillig hochgeladenen Fotos gespeichert. Auf den Fotos sollen keine Gesichter, Namen oder Kennzeichen zu sehen sein. Die Lernenden sollen nur den Vornamen verwenden und ein Passwort wählen, das sie sonst nirgends nutzen.
