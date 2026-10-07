import { useRef, useState } from 'react';
import { galleryCategories, galleryImages, type GalleryCategory, type GalleryImage } from '../data/gallery';
import { PageLayout } from './PageLayout';
import styles from './GalleryPage.module.scss';

const PAGE_SIZE = 12;

export const GalleryPage = () => {
  const [category, setCategory] = useState<GalleryCategory>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = galleryImages.filter(image => category === 'all' || image.category === category);

  const openImage = (image: GalleryImage) => {
    setSelected(image);
    dialog.current?.showModal();
  };

  return (
    <PageLayout title="Gallery">
      <div className={styles.filters} role="group" aria-label="Galerie nach Stil filtern">
        {galleryCategories.map(item => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category === item.id}
            aria-controls="gallery-results"
            onClick={() => { setCategory(item.id); setVisibleCount(PAGE_SIZE); }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <section id="gallery-results" aria-label="Arbeiten">
        <p className={styles.srOnly} role="status">
          {filtered.length ? `${filtered.length} Arbeiten in dieser Kategorie` : 'Neue Einblicke folgen in Kürze.'}
        </p>
        {filtered.length ? (
          <>
            <div className={styles.grid}>
              {filtered.slice(0, visibleCount).map(image => (
                <button className={styles.card} key={image.id} type="button" onClick={() => openImage(image)} aria-label={`${image.alt} – vergrößern`}>
                  <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                  <span className={styles.zoom} aria-hidden="true">+</span>
                </button>
              ))}
            </div>
            {visibleCount < filtered.length && (
              <button className={styles.more} type="button" onClick={() => setVisibleCount(count => count + PAGE_SIZE)}>Mehr laden</button>
            )}
          </>
        ) : (
          <div className={styles.empty}>
            <span className={styles.ornament} aria-hidden="true" />
            <h2>Neue Einblicke folgen in Kürze.</h2>
            <p>Hier findest du bald ausgewählte Arbeiten{category === 'all' ? '.' : ` im Bereich ${galleryCategories.find(item => item.id === category)?.label}.`}</p>
          </div>
        )}
      </section>
      <dialog ref={dialog} className={styles.lightbox} aria-label="Vergrößerte Ansicht" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <button className={styles.close} type="button" autoFocus aria-label="Ansicht schließen" onClick={() => dialog.current?.close()}>×</button>
        {selected && <img src={selected.src} alt={selected.alt} />}
      </dialog>
    </PageLayout>
  );
};
