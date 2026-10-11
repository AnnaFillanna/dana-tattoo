import { LegalText } from '../components/LegalText';
import styles from './PrivacyPage.module.scss';
export function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <LegalText
          title="Datenschutzerklärung"
          url="https://itrk.legal/1DgZ.8V.1cCu.html?impressum-datenschutz"
        />
      </div>
    </main>
  );
}
