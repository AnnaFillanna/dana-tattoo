import { useEffect, useRef, useState } from "react";
import realismus from "../../assets/images/home-realismus.jpg";
import fineLine from "../../assets/images/home-fineLine.jpg";
import grafik from "../../assets/images/home-grafik.mp4";
import coverUp from "../../assets/images/home-coverUp.mp4";
import color from "../../assets/images/home-color.jpg";
import fineLineMobile from "../../assets/images/home-fine-line-mobile.mp4";
import piercingMobile from "../../assets/images/home-piercing-mobile.mp4";
import styles from "./Styles.module.scss";

const tattooStyles = [
  { title: "Realismus", image: realismus, className: "realismus" },
  { title: "Fine Line", image: fineLine, className: "fineLine" },
  { title: "Cover-up", image: coverUp, className: "coverUp" },
  { title: "Grafik", image: grafik, className: "blackGrey" },
  { title: "Color Tattoo", image: color, className: "color" },
];

const VideoCard = ({ src, title, href = "/gallery" }: { src: string; title: string; href?: string }) => {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const togglePlayback = () => {
    const player = video.current;
    if (!player) return;
    if (player.paused) void player.play().catch(() => setPaused(true));
    else player.pause();
  };
  const label = `${title}: Video ${paused ? 'abspielen' : 'pausieren'}`;
  return <>
    <a href={href} className={styles.mediaLink} aria-label={`${title} – Galerie ansehen`}>
      <video ref={video} src={src} autoPlay muted loop playsInline preload="metadata"
        onPlay={() => setPaused(false)} onPause={() => setPaused(true)}
        aria-label={`${title} – Tattoo-Arbeit von Dana als Video`} />
    </a>
    <button type="button" className={styles.videoToggle} onClick={togglePlayback} aria-label={label} title={label}>
      <span aria-hidden="true">{paused ? 'Weiter' : 'Ⅱ'}</span>
    </button>
  </>;
};

export const Styles = () => {
  const carousel = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 650px)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const track = carousel.current;
    if (!track) return;
    const mobile = window.matchMedia('(max-width: 650px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let touchedUntil = 0;
    const pause = () => { touchedUntil = Date.now() + 8000; };
    track.addEventListener('pointerdown', pause);
    track.addEventListener('wheel', pause, { passive: true });
    const timer = window.setInterval(() => {
      if (!mobile.matches || reducedMotion.matches || document.hidden || Date.now() < touchedUntil || track.contains(document.activeElement)) return;
      const bounds = track.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
      const cards = Array.from(track.children) as HTMLElement[];
      const positions = cards.map(card => card.getBoundingClientRect().left - bounds.left + track.scrollLeft);
      const next = positions.find(position => position > track.scrollLeft + 10) ?? 0;
      track.scrollTo({ left: next, behavior: 'smooth' });
    }, 4500);
    return () => { window.clearInterval(timer); track.removeEventListener('pointerdown', pause); track.removeEventListener('wheel', pause); };
  }, []);
  return (
    <section id="styles" className={styles.styles}>
      <div className={styles.heading}>
        <h2>Styles & Leistungen</h2>
      </div>

      <div ref={carousel} className={styles.grid} aria-label="Tattoo-Stile" tabIndex={0}>
        {tattooStyles.map((item) => (
          <div
            key={item.title}
            className={`${styles.card} ${styles[item.className]}`}
          >
            <div className={styles.imagePlaceholder}>{(item.className === "blackGrey" || item.className === "coverUp" || (isMobile && item.className === "fineLine")) ? <VideoCard src={isMobile && item.className === "fineLine" ? fineLineMobile : item.image} title={item.title} /> : <a href="/gallery" className={styles.mediaLink}><img src={item.image} alt={`${item.title} – Tattoo-Arbeit von Dana`} loading="lazy" /></a>}</div>

            <div className={styles.label}>
              <a href="/gallery">{item.title}</a>
            </div>
          </div>
        ))}
        {isMobile && <div className={styles.card}>
          <div className={styles.imagePlaceholder}><VideoCard src={piercingMobile} title="Piercing" href="/piercing" /></div>
          <div className={styles.label}><a href="/piercing">PIERCING</a></div>
        </div>}
      </div>

    </section>
  );
};
