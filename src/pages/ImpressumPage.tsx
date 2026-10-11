import { useEffect } from "react";
import styles from "./ImpressumPage.module.scss";
export function ImpressumPage() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://www.it-recht-kanzlei.de/js/itrk-legaltext.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Impressum</h1>

        <div
          className="itrk-legaltext"
          data-itrk-legaltext-url="https://itrk.legal/1DgZ.0.1cCu-de-iframe.html"
        />
      </div>
    </main>
  );
}
