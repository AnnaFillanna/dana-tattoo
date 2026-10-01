import { Link } from 'react-router-dom';
import styles from './PiercingPage.module.scss';
import septumOne from '../assets/images/piercing-septum-1.jpg';
import septumTwo from '../assets/images/piercing-septum-2.jpg';
import septumThree from '../assets/images/piercing-septum-3.jpg';

import work1 from '../assets/images/piercing-gallery-1.jpg';
import work2 from '../assets/images/piercing-gallery-2.jpg';
import work3 from '../assets/images/piercing-gallery-3.jpg';
import work4 from '../assets/images/piercing-gallery-4.jpg';
import work5 from '../assets/images/piercing-gallery-5.jpg';
import work6 from '../assets/images/piercing-gallery-6.jpg';
import work7 from '../assets/images/piercing-gallery-7.jpg';
import work8 from '../assets/images/piercing-gallery-8.jpg';
import work9 from '../assets/images/piercing-gallery-9.jpg';
import work10 from '../assets/images/piercing-gallery-10.jpg';

const works = [
  { image: septumOne, alt: 'Septum-Piercing mit Kugelverschluss – Porträt und Detailaufnahme' },
  { image: septumTwo, alt: 'Septum-Piercing mit spitzen Enden – Porträt und Detailaufnahme' },
  { image: septumThree, alt: 'Septum-Piercing – Frontalansicht und Nahaufnahme des Schmucks' },
  { image: work1, alt: 'Septum-Piercing – Porträt und Detailaufnahme' },
  { image: work2, alt: 'Conch-Piercing – Porträt und Detailaufnahme' },
  { image: work3, alt: 'Smile-Piercing – Porträt und Detailaufnahme' },
  { image: work4, alt: 'Nostril-Piercing – Porträt und Detailaufnahme' },
  { image: work5, alt: 'Helix-Piercing – Porträt und Detailaufnahme' },
  { image: work6, alt: 'Helix-Piercing – Porträt und Detailaufnahme' },
  { image: work7, alt: 'Septum-Piercing – Porträt und Detailaufnahme' },
  { image: work8, alt: 'Monroe-Piercing – Porträt und Detailaufnahme' },
  { image: work9, alt: 'Septum-Piercing – Porträt und Detailaufnahme' },
  { image: work10, alt: 'Smile-Piercing – Porträt und Detailaufnahme' },
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
