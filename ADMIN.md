# Verwaltung

1. `.env.example` als `.env.local` kopieren.
2. Projekt-URL und öffentlichen **anon**-Key aus Supabase eintragen.
   Niemals `service_role`-Keys, Secret-Keys oder Danas Passwort hinterlegen.
   Vite-Variablen werden im Browser-Bundle öffentlich sichtbar; der anon-Key ist dafür vorgesehen.
3. Entwicklungsserver neu starten. Für Vercel beide Variablen in der gewünschten
   Umgebung hinterlegen und neu bauen/deployen.
4. `/admin` öffnen und mit dem bereits angelegten Supabase-Benutzer anmelden.

Die Session wird durch Supabase gespeichert und aktualisiert. Beim Laden wird
zunächst ausschließlich ein Ladehinweis angezeigt. Abmelden beendet die Session.
`/admin` wird statisch erzeugt, bleibt aber `noindex` und fehlt in der Sitemap.
Es gibt keine öffentliche Registrierung. Fotofunktionen siehe unten.

Der Frontend-Schutz steuert die Anzeige. Künftige Datenzugriffe müssen weiterhin
von Supabase Policies abgesichert sein. Aktuell kann jeder gültige Benutzer dieses
Supabase-Projekts die leere Verwaltung sehen; es wird keine zusätzliche Admin-Rolle
angenommen. Öffentliche Registrierung im Supabase-Projekt deaktivieren, wenn nur
manuell angelegte Benutzer Zugriff erhalten sollen.

Manuell mit konfiguriertem Projekt prüfen: falsche Zugangsdaten, Login, Refresh,
Logout, erneuter direkter Aufruf von `/admin`, abgelaufene Session und Netzwerkausfall.

## Fotos und Videos verwalten

`/admin` bietet nach dem Login Kategorieauswahl, Datei-Upload mit Vorschau
(JPG/PNG/WebP und MP4 bis 50 MB), eine Medienliste und Löschen mit Bestätigung.
Dateien werden ausschließlich unter `gallery/portfolio/<kategorie>/` gespeichert.
Die öffentliche Galerie lädt diese Medien direkt aus Storage. Bestehende Fotos
außerhalb dieses Verzeichnisses bleiben unberührt. MP4-Videos erscheinen mit Wiedergabesteuerung in der vergrößerten Galerieansicht. Sie sind standardmäßig stumm und werden beim Schließen der Ansicht entfernt, damit die Wiedergabe endet.

Die öffentliche SELECT-Policy wurde im bestehenden Supabase-Projekt eingerichtet.
Für eine neue Umgebung liegt dieselbe Policy in `supabase/gallery-public-read.sql`. Das erlaubt ausschließlich
Lesen im veröffentlichten Portfolio-Verzeichnis. Die bereits vorhandenen Policies
für angemeldete Benutzer bleiben für Upload und Löschen zuständig.
Ohne SELECT-Policy kann Supabase für Besucher eine leere Liste statt eines Fehlers liefern.

Die `.env.local` muss im Projektroot neben `package.json` liegen, nicht in `src`.
Nach Änderung den Vite-Server neu starten. Echte Schlüssel niemals committen.

Prüfung: anmelden, ein eigenes Testfoto hochladen, Kategorie in `/gallery`
in einem ausgeloggten Browser prüfen, Admin aktualisieren, Löschdialog abbrechen,
dann Testfoto bestätigen und löschen. Anschließend abmelden.
Automatisierte lokale Storage-Tests: `node tests/gallery-storage.test.mjs`.
