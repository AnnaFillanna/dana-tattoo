import photo from '../assets/images/dana-studio-contact.jpg';
import styles from './ContactPage.module.scss';

const address = 'Rheinstraße 4, 56626 Andernach';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const whatsappUrl = `https://wa.me/4915731414097?text=${encodeURIComponent('Hallo Dana! Ich möchte einen Beratungstermin vereinbaren.')}`;

export const ContactPage = () => {
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
            <a className={styles.button} href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp Beratung</a>
          </div>
        </section>
        <section className={styles.location} aria-labelledby="location-title">
          <div className={styles.locationHeading}><h2 id="location-title">So findest du mich</h2></div>
          <div className={styles.map}>
            <iframe title="Standort Dana Tattoo Studio in Andernach" src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`} referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
          <a className={styles.route} href={mapsUrl} target="_blank" rel="noreferrer">Route planen</a>
        </section>
      </div>
    </main>
  );
};
