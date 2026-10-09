import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.scss";
import { Cookie } from "lucide-react";

export type CookieChoice = "accepted" | "rejected";

const STORAGE_KEY = "dana-cookie-consent";

export function CookieConsent() {
  const [showSettings, setShowSettings] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [mapsEnabled, setMapsEnabled] = useState(false);

  useEffect(() => {
    let active = true;
    // Read browser storage after hydration; it is unavailable during prerendering.
    void Promise.resolve().then(() => {
      if (!active) return;
      let saved: string | null = null;
      try { saved = window.localStorage.getItem(STORAGE_KEY); } catch { /* Storage can be blocked. */ }
      setMapsEnabled(saved === "accepted");
      setIsBannerOpen(saved !== "accepted" && saved !== "rejected");
    });
    return () => { active = false; };
  }, []);

  function saveChoice(value: CookieChoice) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch { /* Still close when storage is unavailable. */ }
    setMapsEnabled(value === "accepted");
    setShowSettings(false);
    setIsBannerOpen(false);

    window.dispatchEvent(new Event("cookie-consent-change"));
  }

  if (!isBannerOpen) {
    return (
      <button
        type="button"
        className={styles.cookieIcon}
        onClick={() => {
          setIsBannerOpen(true);
          setShowSettings(false);
        }}
        aria-label="Cookie-Einstellungen öffnen"
        title="Cookie-Einstellungen"
      >
        <Cookie size={25} strokeWidth={1.5} color="#c9aa72" />
      </button>
    );
  }

  return (
    <div className={styles.overlay}>
      <section
        className={`${styles.banner} ${
          showSettings ? styles.bannerExpanded : ""
        }`}
        role="dialog"
        aria-label="Cookie-Einstellungen"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => {
            setIsBannerOpen(false);
            setShowSettings(false);
          }}
          aria-label="Cookie-Banner schließen"
        >
          ×
        </button>
        <h2>Deine Privatsphäre ist uns wichtig</h2>

        <p>
          Wir verwenden notwendige Technologien für den Betrieb unserer Website.
          Mit deiner Einwilligung können wir außerdem externe Inhalte wie Google
          Maps anzeigen.
        </p>

        <p>Du kannst deine Entscheidung jederzeit ändern.</p>

        <div className={styles.buttons}>
          <button type="button" onClick={() => saveChoice("accepted")}>
            Alle akzeptieren
          </button>

          <button type="button" onClick={() => saveChoice("rejected")}>
            Alle ablehnen
          </button>

          <button type="button" onClick={() => setShowSettings(!showSettings)}>
            Einstellungen
          </button>
        </div>

        {showSettings && (
          <div className={styles.settings}>
            <h3>Cookie-Einstellungen</h3>

            <div className={styles.settingRow}>
              <div>
                <strong>Notwendige Technologien</strong>
                <p>Für den Betrieb der Website erforderlich.</p>
              </div>

              <input
                type="checkbox"
                checked
                disabled
                aria-label="Notwendige Technologien"
              />
            </div>

            <div className={styles.settingRow}>
              <div>
                <strong>Google Maps</strong>
                <p>
                  Ermöglicht die Anzeige der interaktiven Karte. Dabei können
                  Daten an Google übertragen werden.
                </p>
              </div>

              <input
                type="checkbox"
                checked={mapsEnabled}
                onChange={(event) => setMapsEnabled(event.target.checked)}
                aria-label="Google Maps erlauben"
              />
            </div>

            <button
              type="button"
              className={styles.saveButton}
              onClick={() => saveChoice(mapsEnabled ? "accepted" : "rejected")}
            >
              Auswahl speichern
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
