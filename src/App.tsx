import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import { Hero } from './sections/Hero/Hero';
import { Styles } from './sections/Styles/Styles';
import { About } from './sections/About/About';

import { AboutPage } from './pages/AboutPage';
import { StylesPage } from './pages/StylesPage';
import { GalleryPage } from './pages/GalleryPage';
import { PricesPage } from './pages/PricesPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PiercingPage } from './pages/PiercingPage';
import { ImpressumPage } from './pages/ImpressumPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { PageLayout } from './pages/PageLayout';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <Styles />
              <About />
            </main>
          }
        />

        <Route path="/ueber-mich" element={<AboutPage />} />
        <Route path="/styles" element={<StylesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/preise" element={<PricesPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/piercing" element={<PiercingPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/datenschutz" element={<PrivacyPage />} />

        <Route
          path="*"
          element={
            <PageLayout title="Seite nicht gefunden">
              <p>Diese Seite gibt es nicht. Bitte wähle eine Seite aus dem Menü.</p>
            </PageLayout>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;