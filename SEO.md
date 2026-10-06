# SEO and indexing

Production origin: https://tattoodana.de

`npm run build` builds the client, renders each route to HTML using React's server renderer, and generates `dist/sitemap.xml`. Vercel serves these files with clean URLs; unknown paths use `404.html` with HTTP 404. No application server is needed.

Page titles, German descriptions and indexability are maintained in `src/seo/pages.ts`. `src/seo/metadata.ts` supplies canonical URLs, social sharing metadata and factual TattooParlor structured data. Client-side navigation updates the same metadata.

Indexable pages: `/`, `/ueber-mich`, `/piercing`, `/faq`, `/kontakt`.
The unfinished Styles, Gallery and Preise pages are `noindex, follow` and omitted from the sitemap. Set `index: true` only after adding useful page content. Legal pages remain accessible but are not targeted for search.

Search Console: verify ownership of the `https://tattoodana.de/` URL-prefix property with the studio owner's approved Google account, submit `https://tattoodana.de/sitemap.xml`, then inspect the home URL and request indexing. Verification requires explicit approval of the account gaining ownership. Publishing SEO files does not itself confirm Google indexing.

Validation: inspect generated HTML before JavaScript runs; check unique title/description/canonical, one H1, German language, image URLs, JSON-LD and sitemap. Test navigation and browser console for hydration errors. On production check a real page returns 200, sitemap returns XML, robots.txt returns text and a nonexistent URL returns 404.
