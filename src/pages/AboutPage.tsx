import styles from './AboutPage.module.scss';
import portrait from '../assets/images/dana-portrait.jpg';

import realism from '../assets/images/style-realism.jpg';
import fineLine from '../assets/images/style-fine-line.jpg';
import graphic from '../assets/images/style-graphic.jpg';
import coverUp from '../assets/images/style-cover-up.jpg';
import piercing from '../assets/images/style-piercing.jpg';

const specialties = [
  { label: 'Realismus', image: realism, alt: 'Realistisches Porträt-Tattoo auf einem Unterarm', detail: 'Tiefe & Ausdruck' },
  { label: 'Mini-Tattoo/Fine Line', image: fineLine, alt: 'Filigranes Blumen-Tattoo in einer Briefmarkenform', detail: 'Fein & Filigran' },
  { label: 'Grafik', image: graphic, alt: 'Grafisches Tattoo mit Planeten und feinen Linien', detail: 'Form & Kontrast' },
  { label: 'Cover-up', image: coverUp, alt: 'Cover-up: Schriftzug vorher und Samurai-Tattoo nachher', detail: 'Raum für Neues' },
  { label: 'Piercing', image: piercing, alt: 'Septum-Piercing – Nahaufnahme des Gesichts', detail: 'Dein Akzent' },
];

const values = [
  { label: 'Hygiene', detail: 'Sterile Arbeitsweise', icon: 'shield' },
  { label: 'Sicherheit', detail: 'Deine Gesundheit im Fokus', icon: 'cross' },
  { label: 'Verantwortung', detail: 'Individuell und mit Respekt', icon: 'heart' },
  { label: 'Fortbildungen', detail: 'Austausch & Conventions', icon: 'book' },
  { label: 'Weiterentwicklung', detail: 'Techniken & Fähigkeiten', icon: 'spark' },
];

function ValueIcon({ name }: { name: string }) {
  return <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'shield' && <><path d="M20 4 33 9v11c0 8-13 16-13 16S7 28 7 20V9Z" /><path d="m14 20 4 4 8-9" /></>}
    {name === 'cross' && <><circle cx="20" cy="20" r="16" /><path d="M17 11h6v6h6v6h-6v6h-6v-6h-6v-6h6Z" /></>}
    {name === 'heart' && <path d="M20 33 7 20C-2 10 12 1 20 12 28 1 42 10 33 20Z" />}
    {name === 'book' && <><path d="M20 10C15 6 9 6 4 7v25c6-2 11-1 16 3 5-4 10-5 16-3V7c-5-1-11-1-16 3v25" /><path d="M9 13c3 0 5 1 7 2m8 0c2-1 4-2 7-2M9 20c3 0 5 1 7 2m8 0c2-1 4-2 7-2" /></>}
    {name === 'spark' && <><circle cx="20" cy="20" r="7" /><path d="M20 3v5m0 24v5M3 20h5m24 0h5M8 8l4 4m16 16 4 4M8 32l4-4M28 12l4-4" /></>}
  </svg>;
}

export const AboutPage = () => (
  <main className={styles.page}>
    <div className={styles.container}>
      <header className={styles.hero}>
        <figure className={styles.portrait}>
          <img src={portrait} alt="Dana, Tätowiererin und Piercerin, beim Anziehen ihrer Arbeitshandschuhe" width="1200" height="1200" fetchPriority="high" />
          <figcaption>Dana · Tattoo Artist & Piercerin</figcaption>
        </figure>
        <div className={styles.introduction}>
          <p className={styles.eyebrow}>Über mich</p>
          <h1>Die Künstlerin<br />hinter deinem<br /><em>Tattoo</em></h1>
          <p className={styles.copy}>Ich bin Tätowiererin und Piercerin. Seit über 10 Jahren bin ich in diesem Beruf tätig und habe in dieser Zeit mit verschiedensten Stilen und individuellen Kundenwünschen gearbeitet.</p>
        </div>
      </header>

      <div className={styles.pair}>
        <section aria-labelledby="specialty-title">
          <p className={styles.eyebrow}>Meine Spezialisierung</p>
          <h2 id="specialty-title">Cover-ups & Narben</h2>
          <p className={styles.copy}>Ich bin spezialisiert auf Cover-ups alter und misslungener Tattoos sowie auf das Tätowieren von Narben. Dabei wähle ich das Design passend zu den individuellen Eigenschaften der Haut, um alte Tattoos oder Narben möglichst ästhetisch zu kaschieren.</p>
        </section>
        <section aria-labelledby="styles-title">
          <p className={styles.eyebrow}>Meine Stilrichtungen</p>
          <h2 id="styles-title">Vielseitig. Individuell.</h2>
          <p className={styles.copy}>Meine Schwerpunkte sind Realismus, Mini-Tattoo/Fine Line, Grafik, Cover-up und Piercing. Dabei stimme ich die Gestaltung individuell auf deine Wünsche ab.</p>
        </section>
      </div>
      <ul className={styles.specialties} aria-label="Stilrichtungen und Leistungen">
        {specialties.map(item => <li key={item.label}><div className={item.label === 'Piercing' ? styles.piercingFrame : item.label === 'Cover-up' ? styles.coverFrame : undefined}><img className={styles.stylePhoto} src={item.image} alt={item.alt} loading="lazy" /></div><div className={styles.styleCaption}><span className={styles.styleName}>{item.label}</span><span className={styles.styleDetail}>{item.detail}</span></div></li>)}
      </ul>

      <div className={styles.pair}>
        <section aria-labelledby="care-title">
          <p className={styles.eyebrow}>Vertrauen & Sorgfalt</p>
          <h2 id="care-title">In guten Händen.</h2>
          <p className={styles.copy}>Ich habe eine medizinische Ausbildung und lege deshalb besonderen Wert auf Hygiene, Sterilität, Sicherheit und einen verantwortungsvollen Umgang mit jeder Behandlung.</p>
        </section>
        <section aria-labelledby="learning-title">
          <p className={styles.eyebrow}>Neugier & Entwicklung</p>
          <h2 id="learning-title">Immer weiter <em>wachsen.</em></h2>
          <p className={styles.copy}>Ich entwickle mich ständig weiter, besuche Tattoo-Conventions und bilde mich regelmäßig weiter, um meine Techniken und Fähigkeiten stetig zu verbessern.</p>
        </section>
      </div>
      <ul className={styles.values} aria-label="Meine Arbeitsweise">
        {values.map(value => <li key={value.label}><ValueIcon name={value.icon} /><span>{value.label}</span><p>{value.detail}</p></li>)}
      </ul>
    </div>
  </main>
);
