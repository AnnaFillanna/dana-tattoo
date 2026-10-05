import { useRef, useState } from "react";
import realismus from "../../assets/images/home-realismus.jpg";
import fineLine from "../../assets/images/home-fineLine.jpg";
import grafik from "../../assets/images/home-grafik.mp4";
import coverUp from "../../assets/images/home-coverUp.mp4";
import color from "../../assets/images/home-color.jpg";
import styles from "./Styles.module.scss";

const tattooStyles = [
  { title: "Realismus", image: realismus, className: "realismus" },
  { title: "Fine Line", image: fineLine, className: "fineLine" },
  { title: "Cover-up", image: coverUp, className: "coverUp" },
  { title: "Grafik", image: grafik, className: "blackGrey" },
  { title: "Color Tattoo", image: color, className: "color" },
];

const VideoCard = ({ src, title }: { src: string; title: string }) => {
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
    <a href="/gallery" className={styles.mediaLink} aria-label={`${title} – Galerie ansehen`}>
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
  return (
    <section id="styles" className={styles.styles}>
      <div className={styles.heading}>
        <h2>Styles & Leistungen</h2>
      </div>

      <div className={styles.grid}>
        {tattooStyles.map((item) => (
          <div
            key={item.title}
            className={`${styles.card} ${styles[item.className]}`}
          >
            <div className={styles.imagePlaceholder}>{(item.className === "blackGrey" || item.className === "coverUp") ? <VideoCard src={item.image} title={item.title} /> : <a href="/gallery" className={styles.mediaLink}><img src={item.image} alt={`${item.title} – Tattoo-Arbeit von Dana`} loading="lazy" /></a>}</div>

            <div className={styles.label}>
              <a href="/gallery">{item.title}</a>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.piercingRow}>
        <span className={styles.piercingText}>Auch bei uns</span>

        <a href="/piercing" className={styles.piercingButton}>
          Piercing
        </a>
      </div>
    </section>
  );
};
