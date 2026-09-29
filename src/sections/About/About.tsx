import styles from './About.module.scss';

// Когда будет готов портрет, передайте его URL через portraitSrc.
type AboutProps = { portraitSrc?: string };

export const About = ({ portraitSrc }: AboutProps) => (
  <section id="about" className={styles.about} aria-labelledby="about-heading">
    <div className={styles.layout}>
      <figure className={styles.portrait}>
        <div className={styles.portraitWindow}>
          
        {portraitSrc ? (
          <img src={portraitSrc} alt="Dana, Tätowiererin im Dana Tattoo Studio" loading="lazy" />
        ) : (
          <div className={styles.placeholder} role="img" aria-label="Platzhalter für ein Porträt von Dana">
            <span className={styles.photoLabel}>Porträt folgt</span>
          </div>
        )}
        </div>
        <figcaption><span>Dana</span><span>Tattoo Artist</span></figcaption>
      </figure>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Die Person hinter der Kunst</p>
        <h2 id="about-heading">Die Künstlerin<br />hinter <em>deinem</em><br />Tattoo.</h2>
        <div className={styles.divider} aria-hidden="true" />
        {/* Черновик: согласовать с Даной перед публикацией. */}
        <p className={styles.intro}>Deine Idee. Deine Geschichte.<br />Ein Tattoo, das zu dir gehört.</p>
        <p className={styles.description}>
          Ich bin Dana. Gemeinsam mit dir möchte ich aus einer ersten Idee
          ein persönliches Motiv entwickeln — mit einem offenen Ohr für
          deine Wünsche und Liebe zum Detail.
        </p>
        <a className={styles.link} href="/about">Mehr über mich</a>
      </div>
    </div>
  </section>
);
