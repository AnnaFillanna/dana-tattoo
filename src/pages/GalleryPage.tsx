import { getSupabase } from '../lib/supabase';
import { listGalleryPhotos } from '../lib/galleryStorage';
import { useEffect, useRef, useState } from 'react';
import { galleryCategories, galleryImages, type GalleryCategory, type GalleryImage } from '../data/gallery';
import { PageLayout } from './PageLayout';
import styles from './GalleryPage.module.scss';

const PAGE_SIZE = 12;

export const GalleryPage = () => {
  const [remotePhotos, setRemotePhotos] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const client = await getSupabase();
        const photos = client ? await listGalleryPhotos(client) : [];
        if (active) setRemotePhotos(photos);
      } catch { if (active) setLoadError(true); }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, []);
  const [category, setCategory] = useState<GalleryCategory>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = [...remotePhotos, ...galleryImages].filter(image => category === 'all' || image.category === category);

  const openImage = (image: GalleryImage) => {
    setSelected(image);
    dialog.current?.showModal();
  };

  return (
    <PageLayout title="Gallery" eyebrowClassName={styles.eyebrow}>
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
        {loading ? <p role="status">Galerie wird geladen …</p> : loadError ? <p role="alert">Die Fotos konnten nicht geladen werden. Bitte lade die Seite erneut.</p> : filtered.length ? (
          <>
            <div className={styles.grid}>
              {filtered.slice(0, visibleCount).map(image => (
                <button className={styles.card} key={image.id} type="button" onClick={() => openImage(image)} aria-label={`${image.alt} – vergrößern`}>
                  {image.kind === 'video' ? <video src={`${image.src}#t=0.1`} muted playsInline preload="metadata" aria-hidden="true" /> : <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />}
                  <span className={styles.zoom} aria-hidden="true">{image.kind === 'video' ? '▷' : '+'}</span>
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
      <dialog ref={dialog} className={styles.lightbox} aria-label="Vergrößerte Ansicht" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <button className={styles.close} type="button" autoFocus aria-label="Ansicht schließen" onClick={() => dialog.current?.close()}>×</button>
        {selected && (selected.kind === 'video' ? <video key={selected.src} src={selected.src} controls muted playsInline preload="metadata" aria-label={selected.alt} /> : <img src={selected.src} alt={selected.alt} />)}
      </dialog>
    </PageLayout>
  );
};
