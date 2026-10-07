import { PageLayout } from './PageLayout';
import styles from './PricesPage.module.scss';

const categories = [
  { name: 'Ohren', items: [['Ohrläppchen (1×)', 30], ['Ohrläppchen (2×)', 50], ['Helix', 50], ['Forward Helix', 50], ['Tragus', 50], ['Conch', 50], ['Daith', 50], ['Rook', 50], ['Industrial', 100]] },
  { name: 'Nase', items: [['Nostril', 50], ['Septum', 50]] },
  { name: 'Lippen', items: [['Labret', 50]] },
  { name: 'Zunge', items: [['Zungenpiercing', 50]] },
  { name: 'Smiley', items: [['Smiley', 50]] },
  { name: 'Bauch', items: [['Bauchnabel', 50]] },
] satisfies { name: string; items: [string, number][] }[];

const whatsappUrl = `https://wa.me/4915731414097?text=${encodeURIComponent('Hallo Dana! Ich möchte meine Tattoo-Idee mit dir besprechen.')}`;

function PriceCategory({ name, items }: (typeof categories)[number]) {
  return <section className={styles.category} aria-label={name}>
    <h3>{name}</h3>
    <dl>{items.map(([label, price]) => <div className={styles.row} key={label}>
      <dt>{label}</dt>
      <span className={styles.line} aria-hidden="true" />
      <dd>{price} €</dd>
    </div>)}</dl>
  </section>;
}

export const PricesPage = () => (
  <PageLayout title="Preise">
    <section className={styles.pricing} aria-labelledby="piercing-prices">
      <h2 id="piercing-prices">Piercing Preise</h2>
      <div className={styles.columns}>
        <div><PriceCategory {...categories[0]} /></div>
        <div className={styles.groups}>{categories.slice(1).map(category => <PriceCategory key={category.name} {...category} />)}</div>
      </div>
      <div className={styles.included}>
        <p>Alle Piercingpreise inkl. Schmuck</p>
        <p>Hochwertiger Titan-Schmuck ist im Preis enthalten.</p>
      </div>
    </section>
    <section className={`${styles.pricing} ${styles.tattoo}`} aria-labelledby="tattoo-prices">
      <h2 id="tattoo-prices">Tattoo Preise</h2>
      <p>Der Preis richtet sich nach Motiv, Größe, Körperstelle und Aufwand. Schreib mir einfach über WhatsApp – nach einer kurzen Beratung kann ich dir den Preis genauer nennen.</p>
      <a className={styles.button} href={whatsappUrl} target="_blank" rel="noopener noreferrer">Preis über WhatsApp anfragen</a>
    </section>
  </PageLayout>
);
