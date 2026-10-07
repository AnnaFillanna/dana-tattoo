import styles from './Footer.module.scss';
import logo from '../../assets/images/logo.png';

const links = [
  { label: 'Über mich', href: '/ueber-mich' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Preise', href: '/preise' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Kontakt', href: '/kontakt' },
];

const whatsappUrl = `https://wa.me/4915731414097?text=${encodeURIComponent('Hallo Dana! Ich möchte meine Tattoo-Idee mit dir besprechen.')}`;

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.invitation}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Dein Tattoo beginnt mit einer Idee</p>
        <h2>Deine Idee.<br />Unsere Kunst.<br /><span>Für immer.</span></h2>
        <p className={styles.description}>
          Du hast schon ein Motiv im Kopf oder suchst noch Inspiration?
          Lass uns gemeinsam herausfinden, was zu dir passt.
        </p>
      </div>

      <section className={styles.contactPanel} aria-labelledby="footer-contact-title">
        <div className={styles.panelHeading}>
          <span className={styles.eyebrow}>Kontakt & Beratung</span>
          <h3 id="footer-contact-title">Erzähl uns<br />von deiner Idee.</h3>
          <p>Schreib Dana direkt per WhatsApp für eine persönliche Beratung zu deinem Tattoo.</p>
        </div>

        <a className={styles.whatsappButton} href={whatsappUrl} target="_blank" rel="noopener noreferrer">Anfrage per WhatsApp</a>
        <p className={styles.hint}>Deine Idee, die Körperstelle und die ungefähre Größe helfen uns bei der Beratung.</p>
      </section>
    </div>

    <div className={styles.details}>
      <a className={styles.brand} href="/" aria-label="Dana Tattoo Studio — Startseite">
        <img src={logo} alt="Dana Tattoo Studio" width="110" />
      </a>
      <nav className={styles.navigation} aria-label="Navigation im Footer">
        <p className={styles.eyebrow}>Das Studio</p>
        <div className={styles.links}>
          {links.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
        </div>
      </nav>
      <div className={styles.signature}>
        <p>Tattoo Studio<br /><span>Andernach</span></p>
        <span className={styles.motto}>Individuell. Persönlich. Zeitlos.</span>
      </div>
    </div>

    <div className={styles.bottom}>
      <small>© {new Date().getFullYear()} Dana Tattoo Studio</small>
      <nav className={styles.legal} aria-label="Rechtliche Informationen">
        <a href="/impressum">Impressum</a>
        <a href="/datenschutz">Datenschutz</a>
      </nav>
      <a className={styles.toTop} href="#root">Nach oben</a>
    </div>
  </footer>
);
