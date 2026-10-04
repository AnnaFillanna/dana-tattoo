import realismus from "../../assets/images/home-realismus.jpg";
import fineLine from "../../assets/images/home-fineLine.jpg";
import grafik from "../../assets/images/home-grafik.jpg";
import coverUp from "../../assets/images/home-coverUp.jpg";
import color from "../../assets/images/home-color.jpg";
import styles from "./Styles.module.scss";

const tattooStyles = [
  { title: "Realismus", image: realismus, className: "realismus" },
  { title: "Fine Line", image: fineLine, className: "fineLine" },
  { title: "Cover-up", image: coverUp, className: "coverUp" },
  { title: "Grafik", image: grafik, className: "blackGrey" },
  { title: "Color Tattoo", image: color, className: "color" },
];

export const Styles = () => {
  return (
    <section id="styles" className={styles.styles}>
      <div className={styles.heading}>
        <h2>Styles & Leistungen</h2>
      </div>

      <div className={styles.grid}>
        {tattooStyles.map((item) => (
          <a
            href="/gallery"
            key={item.title}
            className={`${styles.card} ${styles[item.className]}`}
          >
            <div className={styles.imagePlaceholder}><img src={item.image} alt={`${item.title} – Tattoo-Arbeit von Dana`} loading="lazy" /></div>

            <div className={styles.label}>
              <span>{item.title}</span>
            </div>
          </a>
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
