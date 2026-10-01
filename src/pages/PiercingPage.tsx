import { Link } from 'react-router-dom';
import styles from './PiercingPage.module.scss';
import septumOne from '../assets/images/piercing-septum-1.jpg';
import septumTwo from '../assets/images/piercing-septum-2.jpg';
import septumThree from '../assets/images/piercing-septum-3.jpg';
import tongue from '../assets/images/piercing-tongue.jpg';

const works = [
  { image: septumOne, title: 'Septum', alt: 'Septum-Piercing mit Kugelverschluss – Porträt und Detailaufnahme' },
  { image: septumTwo, title: 'Septum', alt: 'Septum-Piercing mit spitzen Enden – Porträt und Detailaufnahme' },
  { image: septumThree, title: 'Septum', alt: 'Septum-Piercing – Frontalansicht und Nahaufnahme des Schmucks' },
  { image: tongue, title: 'Zungenpiercing', alt: 'Zungenpiercing – Porträt und Detailaufnahme' },
];

export const PiercingPage = () => (
  <main className={styles.page}>
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Dana · Piercing</p>
        <h1>Ein kleiner Akzent.<br /><em>Ganz du.</em></h1>
        <p>Entdecke eine Auswahl meiner Piercing-Arbeiten. Du hast einen Wunsch oder eine Frage? Gemeinsam besprechen wir, was zu dir passt.</p>
      </header>
      <section className={styles.gallery} aria-label="Piercing-Arbeiten von Dana">
        {works.map((work, index) => (
          <figure className={styles.work} key={work.image}>
            <img src={work.image} alt={work.alt} width="853" height="1280" loading={index === 0 ? 'eager' : 'lazy'} />
            <figcaption>{work.title}<span>0{index + 1}</span></figcaption>
          </figure>
        ))}
      </section>
      <div className={styles.contact}>
        <p>Dein Piercing beginnt mit einem Gespräch.</p>
        <Link to="/kontakt">Persönliche Beratung anfragen ↗</Link>
      </div>
    </div>
  </main>
);
