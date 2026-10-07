import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ configFile: false, server: { middlewareMode: true }, appType: 'custom' });
try {
  const { listGalleryPhotos, uploadGalleryPhoto, deleteGalleryPhoto, validatePhoto, MAX_PHOTO_SIZE } = await server.ssrLoadModule('/src/lib/galleryStorage.ts');
  assert.equal(validatePhoto({ type: 'image/jpeg', size: MAX_PHOTO_SIZE }), null);
  assert.match(validatePhoto({ type: 'image/jpeg', size: MAX_PHOTO_SIZE + 1 }), /50 MB/);
  assert.match(validatePhoto({ type: 'image/svg+xml', size: 100 }), /JPG/);
  assert.match(validatePhoto({ type: 'image/png', size: 0 }), /leer/);
  let uploaded;
  const calls = [];
  const client = { storage: { from(bucket) {
    assert.equal(bucket, 'gallery');
    return {
      async list(folder, options) {
        calls.push([folder, options.offset]);
        return { data: folder.endsWith('/grafik') ? options.offset === 0
          ? Array.from({ length: 100 }, (_, i) => ({ id: String(i), name: `${i}.jpg` }))
          : [{ id: 'last', name: 'last.webp' }, { id: null, name: 'folder' }, { id: 'video', name: 'clip.mp4' }] : [], error: null };
      },
      getPublicUrl(path) { return { data: { publicUrl: `https://example.test/${path}` } }; },
      async upload(path, file, options) { uploaded = { path, file, options }; return { error: null }; },
      async remove(paths) { return { data: paths.map(name => ({ name })), error: null }; },
    };
  } } };
  const photos = await listGalleryPhotos(client);
  assert.equal(photos.length, 101);
  assert(photos.every(photo => photo.category === 'grafik'));
  assert(calls.some(([folder, offset]) => folder === 'portfolio/grafik' && offset === 100));
  const file = { type: 'image/png', size: 100 };
  await uploadGalleryPhoto(client, file, 'grafik');
  assert.match(uploaded.path, /^portfolio\/grafik\/\d+-[\w-]+\.png$/);
  assert.equal(uploaded.options.upsert, false);
  await assert.rejects(uploadGalleryPhoto(client, { type: 'video/mp4', size: 100 }, 'grafik'));
  await deleteGalleryPhoto(client, photos[0]);
  await assert.rejects(deleteGalleryPhoto(client, { id: 'unrelated/file.jpg' }));
  const denied = { storage: { from() { return { remove: async () => ({ data: [], error: null }), list: async () => ({ data: null, error: new Error('denied') }) }; } } };
  await assert.rejects(deleteGalleryPhoto(denied, photos[0]));
  await assert.rejects(listGalleryPhotos(denied));
  console.log('Gallery storage tests passed: file validation, pagination, categories, safe upload paths, deletion and policy errors.');
} finally { await server.close(); }
