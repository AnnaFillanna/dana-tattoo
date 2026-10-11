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

Der Frontend-Schutz erlaubt ausschließlich Danas bestehende Benutzer-ID aus
`src/lib/adminAccess.ts`. Die tatsächliche Berechtigung erzwingt die restrictive
Storage-Policy in `supabase/gallery-admin-access.sql`. Diese Migration zusätzlich
zu den vorhandenen permissive Policies anwenden. Sie schränkt alle angemeldeten
Benutzer auf Dana und `gallery/portfolio/` ein; Besucher dürfen die veröffentlichte
Galerie weiterhin lesen. Die SQL-Datei wurde am 11.10.2026 im bestehenden Projekt
angewendet. Bei einer neuen Umgebung die Benutzer-ID in Code und SQL gemeinsam
anpassen. Die ID ist öffentlich und kein Zugangsschlüssel.

Öffentliche Registrierung wurde am 11.10.2026 in Supabase deaktiviert:
Authentication → Sign In / Providers → Allow new users to sign up.
Bestehende Benutzer können sich weiterhin anmelden. Passwort und Secret-Keys niemals in Vite
hinterlegen. Ein Git-Push wendet SQL-Migrationen nicht automatisch an.

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
Lesen im veröffentlichten Portfolio-Verzeichnis. Die vorhandenen permissive Policies werden durch die restrictive Dana-Policy
zusätzlich auf den berechtigten Benutzer begrenzt.
Ohne SELECT-Policy kann Supabase für Besucher eine leere Liste statt eines Fehlers liefern.

Die `.env.local` muss im Projektroot neben `package.json` liegen, nicht in `src`.
Nach Änderung den Vite-Server neu starten. Echte Schlüssel niemals committen.

Prüfung: anmelden, ein eigenes Testfoto hochladen, Kategorie in `/gallery`
in einem ausgeloggten Browser prüfen, Admin aktualisieren, Löschdialog abbrechen,
dann Testfoto bestätigen und löschen. Anschließend abmelden.
Automatisierte lokale Storage-Tests: `node tests/gallery-storage.test.mjs`.
