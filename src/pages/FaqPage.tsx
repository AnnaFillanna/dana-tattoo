import styles from './FaqPage.module.scss';

const questions = [
  {
    title: 'Wie wird der Preis eines Tattoos berechnet?',
    paragraphs: [
      'Der Preis hängt vor allem von Größe, Komplexität und Körperstelle ab. Bei gleicher Größe kann der Arbeitsaufwand sehr unterschiedlich sein – zum Beispiel bei einem einfachen Motiv im Vergleich zu einem detaillierten Design mit vielen kleinen Elementen.',
      'Auch Stil, Anzahl der Details, Farbe und Arbeitszeit werden bei der Preisberechnung berücksichtigt.',
      'Jedes Tattoo ist individuell, daher wird der endgültige Preis nach einer Beratung festgelegt.',
      'Um einen ungefähren Preis zu erfahren, schick uns gerne ein Bild oder Foto des gewünschten Motivs, beschreibe deine Idee und nenne die ungefähre Größe und Körperstelle. Anhand dieser Informationen können wir dir eine erste Preiseinschätzung geben.',
    ],
  },
  {
    title: 'Tattoo-Nachbesserung',
    paragraphs: [
      'Manchmal kann sich nach der Heilung ein Teil des Pigments aus der Haut lösen. Das Ergebnis wird durch individuelle Hautbeschaffenheit, die Körperstelle, die Pflege und den Heilungsprozess beeinflusst.',
      'An bestimmten Stellen hält die Farbe schlechter, sodass eine Nachbesserung fast immer notwendig ist: Handflächen, Finger, Hände, Füße sowie andere Bereiche, die ständiger Reibung und Belastung ausgesetzt sind.',
      'Nach etwa 2–3 Wochen kann man in der Regel beurteilen, ob eine Nachbesserung notwendig ist. Diese sollte frühestens 4 Wochen nach dem ersten Termin durchgeführt werden, damit sich die Haut ausreichend erholen kann.',
      'Nachbesserungen, die 2 Monate oder später nach dem ersten Termin erfolgen, gelten bereits als Tattoo-Refresh und werden nach einer anderen Preisliste berechnet.',
    ],
  },
  {
    title: 'Körperstellen, die ich für Tattoos nicht empfehle',
    paragraphs: [
      'Ich empfehle keine Tattoos an den Fingern, Handflächen, Händen und Füßen. An diesen Stellen ist die Haut ständig Reibung und Belastung ausgesetzt, wodurch das Pigment schlechter halten, schneller verblassen oder herausfallen kann.',
      'Solche Tattoos benötigen häufig regelmäßige Nachbesserungen. Wenn versucht wird, das Pigment durch tieferes Einbringen besser zu halten, erhöht sich das Risiko, dass die Linien verlaufen (Blowout).',
      'Daher empfehle ich, die Vor- und Nachteile dieser Körperstellen vorab gut abzuwägen. Für meine Arbeit empfehle ich diese Stellen nicht.',
    ],
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
        {questions.map(({ title, paragraphs }) => (
          <details className={styles.item} key={title}>
            <summary><h2>{title}</h2><span className={styles.toggle} aria-hidden="true" /></summary>
            <div className={styles.answer}>{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </details>
        ))}
      </div>
    </div>
  </main>
);
