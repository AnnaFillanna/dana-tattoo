import styles from './FaqPage.module.scss';

const questions = [
  {
    title: 'Wie wird der Preis eines Tattoos berechnet?',
    labels: ['Was den Preis bestimmt', 'Stil & Aufwand', 'Dein persönlicher Preis', 'Für eine erste Einschätzung'],
    paragraphs: [
      'Der Preis hängt vor allem von Größe, Komplexität und Körperstelle ab. Bei gleicher Größe kann der Arbeitsaufwand sehr unterschiedlich sein – zum Beispiel bei einem einfachen Motiv im Vergleich zu einem detaillierten Design mit vielen kleinen Elementen.',
      'Auch Stil, Anzahl der Details, Farbe und Arbeitszeit werden bei der Preisberechnung berücksichtigt.',
      'Jedes Tattoo ist individuell, daher wird der endgültige Preis nach einer Beratung festgelegt.',
      'Um einen ungefähren Preis zu erfahren, schick uns gerne ein Bild oder Foto des gewünschten Motivs, beschreibe deine Idee und nenne die ungefähre Größe und Körperstelle. Anhand dieser Informationen können wir dir eine erste Preiseinschätzung geben.',
    ],
  },
  {
    title: 'Tattoo-Nachbesserung',
    labels: ['Warum nachbessern?', 'Besonders beanspruchte Stellen', 'Der richtige Zeitpunkt', 'Ab zwei Monaten'],
    paragraphs: [
      'Manchmal kann sich nach der Heilung ein Teil des Pigments aus der Haut lösen. Das Ergebnis wird durch individuelle Hautbeschaffenheit, die Körperstelle, die Pflege und den Heilungsprozess beeinflusst.',
      'An bestimmten Stellen hält die Farbe schlechter, sodass eine Nachbesserung fast immer notwendig ist: Handflächen, Finger, Hände, Füße sowie andere Bereiche, die ständiger Reibung und Belastung ausgesetzt sind.',
      'Nach etwa 2–3 Wochen kann man in der Regel beurteilen, ob eine Nachbesserung notwendig ist. Diese sollte frühestens 4 Wochen nach dem ersten Termin durchgeführt werden, damit sich die Haut ausreichend erholen kann.',
      'Nachbesserungen, die 2 Monate oder später nach dem ersten Termin erfolgen, gelten bereits als Tattoo-Refresh und werden nach einer anderen Preisliste berechnet.',
    ],
  },
  {
    title: '🖤 Pflege eines Tattoos mit Heilfolie',
    labels: [],
    paragraphs: [],
    content: <>
      <section className={styles.answerSection}>
        <h3>Wenn die Folie hält</h3>
        <p><strong>Tag 1–3:</strong></p>
        <ul className={styles.careList}>
          <li>Die Folie nicht entfernen oder abziehen.</li>
          <li>Duschen ist möglich, aber das Tattoo nicht einweichen oder lange mit heißem Wasser behandeln.</li>
          <li>Etwas Flüssigkeit/Farbe unter der Folie ist normal.</li>
        </ul>
        <p><strong>Am 3.–4. Tag:</strong></p>
        <ul className={styles.careList}>
          <li>Die Folie entfernen.</li>
          <li>Hände waschen → Folie vorsichtig abziehen → Tattoo mit einer milden, parfümfreien Seife waschen → vorsichtig mit einem sauberen Papiertuch trocken tupfen → eine dünne Schicht Wund- bzw. Heilsalbe auftragen.</li>
        </ul>
      </section>
      <section className={styles.answerSection}>
        <h3>Wenn sich die Folie vor Ablauf von 3 Tagen ablöst</h3>
        <ol className={styles.careList}>
          <li>Die Folie vollständig entfernen.</li>
          <li>Hände waschen und das Tattoo mit einer milden Seife reinigen.</li>
          <li>Vorsichtig mit einem sauberen Papiertuch trocknen.</li>
          <li>Eine dünne Schicht Heilsalbe auftragen.</li>
          <li>Mit einer sauberen Einweg-Unterlage oder einer sterilen, nicht haftenden Wundauflage abdecken.</li>
        </ol>
      </section>
      <section className={styles.answerSection}>
        <h3>Die Abdeckung alle 3–4 Stunden wechseln</h3>
        <p>Abnehmen → Tattoo waschen → trocknen → Salbe auftragen → neu abdecken.</p>
        <p>Das noch 1–2 Tage machen. Danach zur normalen Pflege übergehen: Das Tattoo bei Bedarf reinigen und für weitere 7–10 Tage etwa alle 3–4 Stunden eine dünne Schicht Creme auftragen, bis die Haut vollständig aufgehört hat, sich zu schälen.</p>
      </section>
      <section className={styles.answerSection}>
        <h3>Bis zur vollständigen Heilung</h3>
        <p>Nicht an der sich schälenden Haut oder an Krusten ziehen, nicht kratzen, das Tattoo nicht einweichen und bis zur vollständigen Heilung kein Schwimmbad oder keine Sauna besuchen.</p>
      </section>
    </>,
  },
];

export const FaqPage = () => (
  <main className={styles.page}>
    <div className={styles.container}>
      <header className={styles.heading}>
        <p>Gut zu wissen</p>
        <h1>Häufig gestellte Fragen</h1>
        <div className={styles.ornament} aria-hidden="true"><span>✧</span></div>
      </header>
      <div className={styles.questions}>
        {questions.map(({ title, paragraphs, labels, content }) => (
          <details className={styles.item} key={title}>
            <summary><h2>{title}</h2><span className={styles.toggle} aria-hidden="true" /></summary>
            <div className={styles.answer}>{content ?? paragraphs.map((paragraph, index) => {
              const sentenceEnd = paragraph.indexOf('. ') + 1;
              return <section className={styles.answerSection} key={labels[index]}>
                <h3>{labels[index]}</h3>
                <p>{sentenceEnd > 0 ? <><strong>{paragraph.slice(0, sentenceEnd)}</strong>{' '}{paragraph.slice(sentenceEnd).trim()}</> : paragraph}</p>
              </section>;
            })}</div>
          </details>
        ))}
      </div>
    </div>
  </main>
);
