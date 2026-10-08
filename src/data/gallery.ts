export const galleryCategories = [
  { id: 'all', label: 'Alle' },
  { id: 'realismus', label: 'Realismus' },
  { id: 'fine-line', label: 'Mini-Tattoo / Fine Line' },
  { id: 'grafik', label: 'Grafik' },
  { id: 'cover-up', label: 'Cover-up' },
  { id: 'piercing', label: 'Piercing' },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]['id'];
export type GalleryImage = {
  id: string;
  src: string;
  kind?: 'image' | 'video';
  alt: string;
  category: Exclude<GalleryCategory, 'all'>;
};

// Add imported images here when the portfolio photographs are ready.
// Each image needs a unique id, src, descriptive German alt text and category.
export const galleryImages: GalleryImage[] = [];
