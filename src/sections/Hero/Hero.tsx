import { GoogleReviewBadge } from '../../components/GoogleReviewBadge/GoogleReviewBadge';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.scss';
import heroVideo from '../../assets/video/hero.mp4';

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPlayback = () => {
      if (preference.matches) videoRef.current?.pause();
      else void videoRef.current?.play().catch(() => {});
    };
    syncPlayback();
    preference.addEventListener('change', syncPlayback);
    return () => preference.removeEventListener('change', syncPlayback);
  }, []);

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <video
        ref={videoRef}
        className={styles.background}
        muted loop playsInline preload="metadata" aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.reviewBadge}><GoogleReviewBadge /></div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Dana Tattoo Studio</p>
        <h1 id="hero-title" className={styles.heroTitle}>
          Kunst auf<br /><span className={styles.heroAccent}>deiner</span> Haut.
        </h1>
        <div className={styles.divider} aria-hidden="true"><span>✦</span></div>
        <p className={styles.description}>
          Individuelle Tattoos mit Bedeutung,<br />Präzision und Leidenschaft.
        </p>
        <div className={styles.actions}>
          <a className={styles.button} href="/kontakt">
            Jetzt Termin buchen
          </a>
        </div>
      </div>

      <button
        className={styles.videoControl}
        type="button"
        aria-label={playing ? 'Hintergrundvideo pausieren' : 'Hintergrundvideo abspielen'}
        onClick={() => {
          if (playing) videoRef.current?.pause();
          else void videoRef.current?.play().catch(() => {});
        }}
      >
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span>
        {playing ? 'Pause' : 'Play'}
      </button>
    </section>
  );
};
