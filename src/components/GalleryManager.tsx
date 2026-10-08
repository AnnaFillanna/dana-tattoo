import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { galleryCategories, type GalleryImage } from '../data/gallery';
import { deleteGalleryPhoto, listGalleryPhotos, uploadGalleryPhoto, validatePhoto } from '../lib/galleryStorage';
import styles from './GalleryManager.module.scss';

export function GalleryManager({ client }: { client: SupabaseClient }) {
  const [photos, setPhotos] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<GalleryImage['category']>('realismus');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [pendingDelete, setPendingDelete] = useState<GalleryImage | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    void listGalleryPhotos(client).then(data => { if (active) setPhotos(data); })
      .catch(() => { if (active) setError('Fotos konnten nicht geladen werden. Bitte prüfe Verbindung und Storage-Zugriffsrechte.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [client]);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const refresh = async () => {
    setLoading(true);
    try { setPhotos(await listGalleryPhotos(client)); }
    catch { setError('Die Liste konnte nicht aktualisiert werden. Bitte erneut laden.'); }
    finally { setLoading(false); }
  };
  const upload = async (event: FormEvent) => {
    event.preventDefault();
    if (!file || busy) return;
    setBusy(true); setError(''); setMessage('');
    try {
      await uploadGalleryPhoto(client, file, category);
      setMessage('Datei hochgeladen. Sie ist jetzt in der Galerie veröffentlicht.');
      setFile(null); setPreview('');
      if (input.current) input.current.value = '';
      await refresh();
    } catch { setError('Upload fehlgeschlagen. Bitte prüfe deine Verbindung, Anmeldung und die Storage-Zugriffsrechte.'); }
    finally { setBusy(false); }
  };
  const remove = async () => {
    if (!pendingDelete || busy) return;
    setBusy(true); setError(''); setMessage('');
    try {
      await deleteGalleryPhoto(client, pendingDelete);
      setPhotos(items => items.filter(item => item.id !== pendingDelete.id));
      setPendingDelete(null); setMessage('Datei gelöscht.');
    } catch { setError('Löschen fehlgeschlagen. Bitte prüfe deine Verbindung und Zugriffsrechte.'); }
    finally { setBusy(false); }
  };

  return <section className={styles.manager} aria-labelledby="photos-heading">
    <h2 id="photos-heading">Fotos und Videos verwalten</h2>
    <p>Wähle eine Kategorie und ein Foto oder Video. Mit „Hochladen“ veröffentlichst du es direkt in der Galerie.</p>
    <form onSubmit={event => void upload(event)}>
      <label htmlFor="photo-category">Kategorie</label>
      <select id="photo-category" value={category} disabled={busy} onChange={event => setCategory(event.target.value as GalleryImage['category'])}>
        {galleryCategories.filter(item => item.id !== 'all').map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
      <label htmlFor="photo-file">Foto oder Video auswählen</label>
      <input ref={input} id="photo-file" type="file" accept="image/jpeg,image/png,image/webp,video/mp4" required disabled={busy} onChange={event => {
        const next = event.target.files?.[0] ?? null;
        setMessage(''); setFile(null); setPreview('');
        const validation = next ? validatePhoto(next) : null;
        setError(validation ?? '');
        if (next && !validation) { setFile(next); setPreview(URL.createObjectURL(next)); }
      }} />
      <p>JPG, PNG, WebP oder MP4 · maximal 50 MB pro Datei.</p>
      {preview && (file?.type === 'video/mp4' ? <video className={styles.preview} src={preview} controls muted playsInline preload="metadata" aria-label="Videovorschau" /> : <img className={styles.preview} src={preview} alt="Vorschau des ausgewählten Fotos" />)}
      <button type="submit" disabled={!file || busy}>{busy ? 'Bitte warten …' : 'Hochladen'}</button>
    </form>
    {error && <p role="alert">{error}</p>}
    <p role="status">{message}</p>
    <div className={styles.toolbar}><h2>Deine Fotos und Videos</h2><button type="button" disabled={busy || loading} onClick={() => { setError(''); void refresh(); }}>Liste aktualisieren</button></div>
    {loading ? <p role="status">Dateien werden geladen …</p> : !photos.length && <p>Noch keine Dateien hochgeladen.</p>}
    <div className={styles.grid}>{photos.map(photo => <article key={photo.id}>
      {photo.kind === 'video' ? <video src={photo.src} controls muted playsInline preload="metadata" aria-label={photo.alt} /> : <img src={photo.src} alt={photo.alt} loading="lazy" />}
      <p>{galleryCategories.find(item => item.id === photo.category)?.label}</p>
      {pendingDelete?.id === photo.id ? <div><p>Diese Datei endgültig aus der Galerie löschen?</p><button type="button" disabled={busy} onClick={() => void remove()}>Ja, löschen</button> <button type="button" disabled={busy} onClick={() => setPendingDelete(null)}>Abbrechen</button></div>
        : <button type="button" disabled={busy} onClick={() => setPendingDelete(photo)}>Löschen</button>}
    </article>)}</div>
    <a href="/gallery" target="_blank" rel="noopener noreferrer">Galerie ansehen</a>
  </section>;
}
