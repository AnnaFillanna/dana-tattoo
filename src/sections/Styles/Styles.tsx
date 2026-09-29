import styles from "./Styles.module.scss";

const tattooStyles = [
  { title: "Realismus", className: "realismus" },
  { title: "Fine Line", className: "fineLine" },
  { title: "Cover-up", className: "coverUp" },
  { title: "Black & Grey", className: "blackGrey" },
  { title: "Color Tattoo", className: "color" },
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
            <div className={styles.imagePlaceholder} />

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
