import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'vite';

const server = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
});
try {
  const { isGalleryAdmin } = await server.ssrLoadModule('/src/lib/adminAccess.ts');
  const admin = 'fd75a2b5-10a6-4881-97f9-59c7e87f3b6c';
  assert.equal(isGalleryAdmin(admin), true);
  assert.equal(isGalleryAdmin(''), false);
  assert.equal(isGalleryAdmin('another-authenticated-user'), false);
  const policy = await readFile('supabase/gallery-admin-access.sql', 'utf8');
  assert(policy.includes(admin), 'Frontend administrator must match the RLS migration');
  console.log('Admin access checks passed. Live RLS must also be applied.');
} finally {
  await server.close();
}
