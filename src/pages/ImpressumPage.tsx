import { LegalText } from '../components/LegalText';
import styles from './ImpressumPage.module.scss';
export function ImpressumPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Impressum</h1>

        <LegalText title="Impressum" url="https://itrk.legal/1DgZ.0.1cCu-de-iframe.html" />
      </div>
    </main>
  );
}
