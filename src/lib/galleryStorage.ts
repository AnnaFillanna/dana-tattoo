import type { SupabaseClient } from '@supabase/supabase-js';
import { galleryCategories, type GalleryImage } from '../data/gallery';

export const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_PHOTO_SIZE = 50 * 1024 * 1024;
const bucket = 'gallery';
const categories = galleryCategories.filter(category => category.id !== 'all');

export function validatePhoto(file: Pick<File, 'type' | 'size'>): string | null {
  if (!PHOTO_TYPES.includes(file.type)) return 'Bitte wähle ein JPG-, PNG- oder WebP-Foto.';
  if (!file.size) return 'Die Datei ist leer.';
  if (file.size > MAX_PHOTO_SIZE) return 'Das Foto darf höchstens 50 MB groß sein.';
  return null;
}

export async function listGalleryPhotos(client: SupabaseClient): Promise<GalleryImage[]> {
  const groups = await Promise.all(categories.map(async category => {
    const photos: GalleryImage[] = [];
    const folder = `portfolio/${category.id}`;
    for (let offset = 0; ; offset += 100) {
      const { data, error } = await client.storage.from(bucket).list(folder, {
        limit: 100, offset, sortBy: { column: 'name', order: 'desc' },
      });
      if (error) throw error;
      for (const file of data) {
        if (!file.id || !/\.(jpg|jpeg|png|webp)$/i.test(file.name)) continue;
        const path = `${folder}/${file.name}`;
        photos.push({ id: path, src: client.storage.from(bucket).getPublicUrl(path).data.publicUrl,
          alt: `${category.label} – Arbeit von Dana Tattoo Studio`, category: category.id });
      }
      if (data.length < 100) break;
    }
    return photos;
  }));
  return groups.flat().sort((a, b) => b.id.split('/').pop()!.localeCompare(a.id.split('/').pop()!));
}

export async function uploadGalleryPhoto(client: SupabaseClient, file: File, category: GalleryImage['category']) {
  const validation = validatePhoto(file);
  if (validation) throw new Error(validation);
  if (!categories.some(item => item.id === category)) throw new Error('Bitte wähle eine Kategorie.');
  const extension = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[file.type];
  const path = `portfolio/${category}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const { error } = await client.storage.from(bucket).upload(path, file, {
    contentType: file.type, cacheControl: '3600', upsert: false,
  });
  if (error) throw error;
}

export async function deleteGalleryPhoto(client: SupabaseClient, photo: GalleryImage) {
  if (!categories.some(category => photo.id.startsWith(`portfolio/${category.id}/`))) throw new Error('Ungültiger Bildpfad.');
  const { data, error } = await client.storage.from(bucket).remove([photo.id]);
  if (error) throw error;
  if (!data?.length) throw new Error('Das Foto konnte nicht gelöscht werden. Bitte prüfe die Zugriffsrechte.');
}
