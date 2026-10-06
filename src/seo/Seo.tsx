import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metadata } from './metadata';

// Keep the prerendered head in sync when React Router navigates without a reload.
export function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const data = metadata(pathname);
    document.title = data.title;
    document.head.querySelectorAll('[data-seo]').forEach(node => node.remove());
    for (const [attribute, key, value] of data.tags) {
      const tag = document.createElement('meta');
      tag.setAttribute(attribute, key);
      tag.content = value;
      tag.dataset.seo = '';
      document.head.append(tag);
    }
    if (data.canonical) {
      const tag = document.createElement('link');
      tag.rel = 'canonical';
      tag.href = data.canonical;
      tag.dataset.seo = '';
      document.head.append(tag);
    }
    if (data.schema) {
      const tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.textContent = JSON.stringify(data.schema);
      tag.dataset.seo = '';
      document.head.append(tag);
    }
  }, [pathname]);
  return null;
}
