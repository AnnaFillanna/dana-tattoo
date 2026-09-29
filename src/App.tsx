import { PiercingPage } from './pages/PiercingPage';
import { useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ImpressumPage } from './pages/ImpressumPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { Hero } from './sections/Hero/Hero';
import { Styles } from './sections/Styles/Styles';
import { About } from './sections/About/About';
import { AboutPage } from './pages/AboutPage';
import { StylesPage } from './pages/StylesPage';
import { GalleryPage } from './pages/GalleryPage';
import { PricesPage } from './pages/PricesPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PageLayout } from './pages/PageLayout';

const pages = {
  '/piercing': { title: 'Piercing', Component: PiercingPage },
  '/impressum': { title: 'Impressum', Component: ImpressumPage },
  '/datenschutz': { title: 'Datenschutz', Component: PrivacyPage },
  '/about': { title: 'Über mich', Component: AboutPage },
  '/styles': { title: 'Styles', Component: StylesPage },
  '/gallery': { title: 'Gallery', Component: GalleryPage },
  '/prices': { title: 'Preise', Component: PricesPage },
  '/faq': { title: 'FAQ', Component: FaqPage },
  '/contact': { title: 'Kontakt', Component: ContactPage },
};

function App() {
  // Обычные ссылки открывают каждый адрес отдельно; Vite возвращает index.html.
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const page = Object.hasOwn(pages, path) ? pages[path as keyof typeof pages] : undefined;
  const title = path === '/' ? 'Dana Tattoo Studio | Andernach'
    : `${page?.title ?? 'Seite nicht gefunden'} | Dana Tattoo Studio`;

  useEffect(() => { document.title = title; }, [title]);

  return (
    <>
      <Header />
      {path === '/' ? (
        <main><Hero /><Styles /><About /></main>
      ) : page ? (
        <page.Component />
      ) : (
        <PageLayout title="Seite nicht gefunden">
          <p>Diese Seite gibt es nicht. Bitte wähle eine Seite aus dem Menü.</p>
        </PageLayout>
      )}
      <Footer />
    </>
  );
}

export default App;
