import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.scss';
import danaPortrait from '../../assets/images/dana-seated.jpg';

type AboutProps = { portraitSrc?: string };

export const About = ({ portraitSrc = danaPortrait }: AboutProps) => {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = section.current;
    const motion = window.matchMedia(
      '(min-width: 1001px) and (prefers-reduced-motion: no-preference)',
    );
    if (!element || !motion.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.entered = 'true';
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={section} id="about" className={styles.about} aria-labelledby="about-heading">
      <div className={styles.layout}>
        <figure className={styles.portrait}>
          <div className={styles.portraitWindow}>
            {portraitSrc ? (
              <img
                src={portraitSrc}
                alt="Dana, Tätowiererin im Dana Tattoo Studio"
                loading="lazy"
              />
            ) : (
              <div
                className={styles.placeholder}
                role="img"
                aria-label="Platzhalter für ein Porträt von Dana"
              >
                <span className={styles.photoLabel}>Porträt folgt</span>
              </div>
            )}
          </div>
          <figcaption>Tattoo Artist</figcaption>
        </figure>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Die Person hinter der Kunst</p>
          <h2 id="about-heading">
            Die Künstlerin <br />
            hinter <em>deinem</em> <br />
            Tattoo
          </h2>
          <div className={styles.divider} aria-hidden="true" />
          {/* Entwurf: vor der Veröffentlichung mit Dana abstimmen. */}
          <p className={styles.intro}>
            Deine Idee. Deine Geschichte. <br />
            Ein Tattoo, das zu dir gehört.
          </p>
          <p className={styles.description}>
            Ich bin Dana. Gemeinsam mit dir möchte ich aus einer ersten Idee ein persönliches Motiv
            entwickeln — mit einem offenen Ohr für deine Wünsche und Liebe zum Detail.
          </p>
          <Link className={styles.link} to="/ueber-mich" reloadDocument>
            Mehr über mich
          </Link>
        </div>
      </div>
    </section>
  );
};
