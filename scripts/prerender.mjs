import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render, pages, siteUrl, metadata } from '../dist-ssr/entry-server.js';
const template = await readFile('dist/index.html', 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
for (const path of [...Object.keys(pages), '/404']) {
  const data = metadata(path);
  const head = `<title>${escape(data.title)}</title>` +
    data.tags.map(([attribute, key, value]) => `<meta data-seo ${attribute}="${key}" content="${escape(value)}" />`).join('') +
    (data.canonical ? `<link data-seo rel="canonical" href="${data.canonical}" />` : '') +
    (data.schema ? `<script data-seo type="application/ld+json">${JSON.stringify(data.schema).replaceAll('<', '\\u003c')}</script>` : '');
  const html = template.replace(/<title>.*?<\/title>/s, head).replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`);
  const file = path === '/' ? 'dist/index.html' : `dist${path}.html`;
  await writeFile(file, html);
}
await mkdir('dist', { recursive: true });
await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  Object.entries(pages).filter(([, page]) => page.index).map(([path]) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n') + '\n</urlset>\n');
console.log(`Prerendered ${Object.keys(pages).length} pages and a 404 page; generated sitemap.`);
