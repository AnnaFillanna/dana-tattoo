import { useState } from 'react';
import photo from '../assets/images/dana-studio-contact.jpg';
import styles from './ContactPage.module.scss';

const address = 'Rheinstraße 4, 56626 Andernach';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const whatsappUrl = `https://wa.me/4915731414097?text=${encodeURIComponent('Hallo Dana! Ich möchte einen Beratungstermin vereinbaren.')}`;

export const ContactPage = () => {
  const [showMap, setShowMap] = useState(false);
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.heading}>
          <p>Dein Weg zu Dana</p>
          <h1>Kontakt</h1>
          <div className={styles.ornament} aria-hidden="true"><span>✧</span></div>
        </header>
        <section className={styles.contact} aria-labelledby="studio-title">
          <div className={styles.photo}><img src={photo} alt="Dana vor dem Tattoo-Studio neben dem Studioschild" /></div>
          <div className={styles.details}>
            <p className={styles.eyebrow}>Persönlich. Individuell. Für dich.</p>
            <h2 id="studio-title">Dana Tattoo Studio</h2>
            <dl>
              <div><dt>Adresse</dt><dd><a href={mapsUrl} target="_blank" rel="noreferrer">Rheinstraße 4<br />56626 Andernach</a></dd></div>
              <div><dt>Telefon / WhatsApp</dt><dd><a href="tel:+4915731414097">+49 1573 1414097</a></dd></div>
              <div><dt>Instagram</dt><dd><a href="https://www.instagram.com/tat_dana/" target="_blank" rel="noreferrer">@tat_dana</a></dd></div>
              <div><dt>Termine</dt><dd>Termine nach Vereinbarung</dd></div>
            </dl>
            <a className={styles.button} href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp Beratung <span aria-hidden="true">↗</span></a>
          </div>
        </section>
        <section className={styles.location} aria-labelledby="location-title">
          <div className={styles.locationHeading}><h2 id="location-title">So findest du mich</h2><a href={mapsUrl} target="_blank" rel="noreferrer">Route planen ↗</a></div>
          <div className={styles.map}>
            {showMap ? <iframe title="Standort Dana Tattoo Studio in Andernach" src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /> : <div className={styles.mapIntro}><span className={styles.pin} aria-hidden="true">◇</span><h3>Mitten in Andernach</h3><p>{address}</p><button className={styles.button} onClick={() => setShowMap(true)}>Google Maps laden</button><small>Beim Laden wird eine Verbindung zu Google hergestellt.</small></div>}
          </div>
        </section>
      </div>
    </main>
  );
};
