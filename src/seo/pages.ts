export const siteUrl = 'https://tattoodana.de';
export type PageSeo = { title: string; description: string; index: boolean };
export const pages: Record<string, PageSeo> = {
  '/admin': { title: 'Verwaltung | Dana Tattoo Studio', description: 'Geschützter Verwaltungsbereich.', index: false },
  '/': { title: 'Tattoo & Piercing in Andernach | Dana Tattoo Studio', description: 'Individuelle Tattoos und Piercings bei Dana in Andernach. Realismus, Fine Line, Cover-ups und Narben-Cover. Persönliche Beratung und Termine nach Vereinbarung.', index: true },
  '/ueber-mich': { title: 'Dana – Tätowiererin in Andernach | Cover-ups & Fine Line', description: 'Lerne Dana kennen: Tätowiererin und Piercerin mit über 10 Jahren Erfahrung. Individuelle Tattoos, Cover-ups und Narben-Cover in Andernach.', index: true },
  '/piercing': { title: 'Piercing in Andernach | Arbeiten von Dana Tattoo Studio', description: 'Entdecke Danas Piercing-Arbeiten: Septum, Nostril, Helix und mehr. Persönliche Beratung im Dana Tattoo Studio in Andernach. Termine nach Vereinbarung.', index: true },
  '/faq': { title: 'Tattoo-Fragen: Preise & Nachbesserung | Dana Andernach', description: 'Wie entsteht der Tattoo-Preis? Wann ist eine Nachbesserung nötig? Dana beantwortet häufige Fragen zu Tattoos, Körperstellen und der persönlichen Beratung.', index: true },
  '/kontakt': { title: 'Kontakt & Anfahrt | Dana Tattoo Studio in Andernach', description: 'Dana Tattoo Studio, Rheinstraße 4, 56626 Andernach. Vereinbare deine Tattoo- oder Piercing-Beratung per WhatsApp. Termine nach Vereinbarung.', index: true },
  // Publish these in search only after their placeholder content has been completed.
  '/styles': { title: 'Tattoo-Stile | Dana Tattoo Studio Andernach', description: 'Tattoo-Stile und Leistungen im Dana Tattoo Studio in Andernach.', index: false },
  '/gallery': { title: 'Tattoo-Galerie | Dana Tattoo Studio Andernach', description: 'Tattoo-Arbeiten von Dana in Andernach.', index: false },
  '/preise': { title: 'Tattoo-Preise | Dana Tattoo Studio Andernach', description: 'Persönliche Beratung zur Preisgestaltung deines Tattoos bei Dana in Andernach.', index: false },
  '/impressum': { title: 'Impressum | Dana Tattoo Studio', description: 'Impressum des Dana Tattoo Studios in Andernach.', index: false },
  '/datenschutz': { title: 'Datenschutz | Dana Tattoo Studio', description: 'Datenschutzhinweise des Dana Tattoo Studios in Andernach.', index: false },
};
export const notFound: PageSeo = { title: 'Seite nicht gefunden | Dana Tattoo Studio', description: 'Diese Seite ist nicht verfügbar.', index: false };
export const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';
