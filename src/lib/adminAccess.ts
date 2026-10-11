// Public user ID, not a credential. Keep in sync with the Storage RLS policy.
// This UI check never replaces the server-side policy.
const galleryAdminId = 'fd75a2b5-10a6-4881-97f9-59c7e87f3b6c';

export function isGalleryAdmin(userId: string): boolean {
  return userId === galleryAdminId;
}
