import { pages, notFound, normalizePath, siteUrl } from './pages';
import studioPhoto from '../assets/images/dana-studio-contact.jpg';
import logo from '../assets/images/logo.png';

export function metadata(pathname: string) {
  const path = normalizePath(pathname);
  const page = pages[path] ?? notFound;
  const url = siteUrl + path;
  const image = new URL(studioPhoto, siteUrl).href;
  return {
    title: page.title,
    canonical: pages[path] ? url : null,
    tags: [
      ['name', 'description', page.description],
      ['name', 'robots', page.index ? 'index, follow, max-image-preview:large' : 'noindex, follow'],
      ['property', 'og:type', 'website'],
      ['property', 'og:site_name', 'Dana Tattoo Studio'],
      ['property', 'og:locale', 'de_DE'],
      ['property', 'og:title', page.title],
      ['property', 'og:description', page.description],
      ['property', 'og:url', url],
      ['property', 'og:image', image],
      ['property', 'og:image:alt', 'Dana vor ihrem Tattoo-Studio in Andernach'],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', page.title],
      ['name', 'twitter:description', page.description],
      ['name', 'twitter:image', image],
    ],
    schema: pages[path]?.index ? {
      '@context': 'https://schema.org',
      '@type': 'TattooParlor',
      '@id': siteUrl + '/#studio',
      name: 'Dana Tattoo Studio',
      alternateName: 'Tattoo by Dana',
      url: siteUrl + '/',
      image,
      logo: new URL(logo, siteUrl).href,
      telephone: '+49 1573 1414097',
      address: { '@type': 'PostalAddress', streetAddress: 'Rheinstraße 4', postalCode: '56626', addressLocality: 'Andernach', addressCountry: 'DE' },
      sameAs: ['https://www.instagram.com/tat_dana/'],
      description: 'Individuelle Tattoos und Piercings in Andernach. Termine nach Vereinbarung.',
    } : null,
  };
}
