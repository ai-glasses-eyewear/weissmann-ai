/**
 * Weissmann AI — Industries registry (sector landing pages).
 *
 * Each industry is a demand-side hub that frames the sector's challenges + AI
 * opportunities and routes to the relevant services and service×industry pages
 * (docs/architecture/MASTER-PAGE-MAP.md §4). Industry pages are informational-
 * commercial landing pages; any case study or result shown on them must be REAL
 * (rendered as NEEDS VERIFICATION until confirmed) — never invented.
 *
 * `status: 'live'` gates publication, like services.
 */
import type { LocaleMap, LocalePaths } from './routes';
import { underPillar } from './routes';

export interface IndustryDef {
  id: string;
  order: number;
  status: 'live' | 'draft';
  slug: LocaleMap;
  name: LocaleMap;
  /** One-line framing for hub cards. */
  tagline: LocaleMap;
  /** Service ids most relevant to this sector (drives cross-links + the matrix). */
  relatedServices: string[];
}

export const INDUSTRIES: IndustryDef[] = [
  {
    id: 'healthcare', order: 1, status: 'live',
    slug: { de: 'gesundheitswesen', en: 'healthcare', it: 'sanita', fr: 'sante' },
    name: { de: 'Gesundheitswesen', en: 'Healthcare', it: 'Sanità', fr: 'Santé' },
    tagline: {
      de: 'KI für Praxen und Gesundheitsdienstleister — mehr erreichbare Zeit, weniger administrative Last.',
      en: 'AI for practices and healthcare providers — more reachable hours, less administrative load.',
      it: 'AI per studi e operatori sanitari — più ore raggiungibili, meno carico amministrativo.',
      fr: 'L’IA pour les cabinets et prestataires de santé — plus d’heures joignables, moins de charge administrative.',
    },
    relatedServices: ['phone-assistant', 'websites', 'automation'],
  },
  {
    id: 'dental', order: 2, status: 'live',
    slug: { de: 'zahnarztpraxen', en: 'dental-practices', it: 'studi-dentistici', fr: 'cabinets-dentaires' },
    name: { de: 'Zahnarztpraxen', en: 'Dental Practices', it: 'Studi dentistici', fr: 'Cabinets dentaires' },
    tagline: {
      de: 'Kein verpasster Anruf mehr: KI-Terminvergabe und Rückrufe für die Zahnarztpraxis.',
      en: 'No more missed calls: AI appointment booking and callbacks for the dental practice.',
      it: 'Mai più chiamate perse: prenotazione appuntamenti e richiami AI per lo studio dentistico.',
      fr: 'Fini les appels manqués : prise de rendez-vous et rappels IA pour le cabinet dentaire.',
    },
    relatedServices: ['phone-assistant', 'websites'],
  },
  {
    id: 'medical-clinics', order: 3, status: 'live',
    slug: { de: 'kliniken', en: 'medical-clinics', it: 'cliniche', fr: 'cliniques' },
    name: { de: 'Kliniken', en: 'Medical Clinics', it: 'Cliniche', fr: 'Cliniques' },
    tagline: {
      de: 'Anrufannahme, Triage-Weiterleitung und Terminkoordination für Kliniken — mit klaren Sicherheitsregeln.',
      en: 'Call handling, triage routing and appointment coordination for clinics — with clear safety rules.',
      it: 'Gestione chiamate, instradamento triage e coordinamento appuntamenti per cliniche — con regole di sicurezza chiare.',
      fr: 'Gestion des appels, routage de triage et coordination des rendez-vous pour cliniques — avec des règles de sécurité claires.',
    },
    relatedServices: ['phone-assistant', 'automation', 'integrations'],
  },
  {
    id: 'restaurants', order: 4, status: 'live',
    slug: { de: 'gastronomie', en: 'restaurants', it: 'ristoranti', fr: 'restaurants' },
    name: { de: 'Gastronomie', en: 'Restaurants', it: 'Ristoranti', fr: 'Restaurants' },
    tagline: {
      de: 'Reservierungen annehmen, während das Team am Gast ist — KI-Telefonassistent für die Gastronomie.',
      en: 'Take reservations while the team serves guests — an AI phone assistant for restaurants.',
      it: 'Accettare prenotazioni mentre il team serve gli ospiti — assistente telefonico AI per la ristorazione.',
      fr: 'Prendre les réservations pendant que l’équipe sert — un assistant téléphonique IA pour la restauration.',
    },
    relatedServices: ['phone-assistant', 'websites'],
  },
  {
    id: 'hotels', order: 5, status: 'live',
    slug: { de: 'hotellerie', en: 'hotels', it: 'hotel', fr: 'hotellerie' },
    name: { de: 'Hotellerie', en: 'Hotels', it: 'Hotel', fr: 'Hôtellerie' },
    tagline: {
      de: 'Mehrsprachige Anrufannahme und Buchungsanfragen rund um die Uhr für Hotels.',
      en: 'Multilingual call handling and booking enquiries around the clock for hotels.',
      it: 'Gestione chiamate multilingue e richieste di prenotazione 24 ore su 24 per hotel.',
      fr: 'Gestion d’appels multilingue et demandes de réservation 24h/24 pour les hôtels.',
    },
    relatedServices: ['phone-assistant', 'websites'],
  },
  {
    id: 'retail', order: 6, status: 'live',
    slug: { de: 'einzelhandel', en: 'retail', it: 'commercio-al-dettaglio', fr: 'commerce-de-detail' },
    name: { de: 'Einzelhandel', en: 'Retail', it: 'Commercio al dettaglio', fr: 'Commerce de détail' },
    tagline: {
      de: 'Sichtbarkeit, Anfragen und Automatisierung für den stationären und Online-Handel.',
      en: 'Visibility, enquiries and automation for physical and online retail.',
      it: 'Visibilità, richieste e automazione per il commercio fisico e online.',
      fr: 'Visibilité, demandes et automatisation pour le commerce physique et en ligne.',
    },
    relatedServices: ['websites', 'seo', 'google-ads'],
  },
  {
    id: 'real-estate', order: 7, status: 'live',
    slug: { de: 'immobilien', en: 'real-estate', it: 'immobiliare', fr: 'immobilier' },
    name: { de: 'Immobilien', en: 'Real Estate', it: 'Immobiliare', fr: 'Immobilier' },
    tagline: {
      de: 'Jede Interessentenanfrage sofort beantworten — KI für Makler und Verwaltungen.',
      en: 'Answer every prospect enquiry instantly — AI for agents and property managers.',
      it: 'Rispondere subito a ogni richiesta — AI per agenti e amministrazioni immobiliari.',
      fr: 'Répondre instantanément à chaque demande — l’IA pour les agents et gérances.',
    },
    relatedServices: ['phone-assistant', 'websites', 'google-ads'],
  },
  {
    id: 'insurance', order: 8, status: 'live',
    slug: { de: 'versicherungen', en: 'insurance', it: 'assicurazioni', fr: 'assurances' },
    name: { de: 'Versicherungen', en: 'Insurance', it: 'Assicurazioni', fr: 'Assurances' },
    tagline: {
      de: 'Anfragen qualifizieren und Prozesse automatisieren — mit Schweizer Datenschutz im Blick.',
      en: 'Qualify enquiries and automate processes — with Swiss data protection in mind.',
      it: 'Qualificare le richieste e automatizzare i processi — con la protezione dati svizzera in mente.',
      fr: 'Qualifier les demandes et automatiser les processus — avec la protection des données suisse à l’esprit.',
    },
    relatedServices: ['automation', 'agents', 'consulting'],
  },
  {
    id: 'professional-services', order: 9, status: 'live',
    slug: { de: 'dienstleister', en: 'professional-services', it: 'servizi-professionali', fr: 'services-professionnels' },
    name: { de: 'Dienstleister', en: 'Professional Services', it: 'Servizi professionali', fr: 'Services professionnels' },
    tagline: {
      de: 'Kanzleien, Treuhänder und Berater: Erreichbarkeit, Sichtbarkeit und Automatisierung mit KI.',
      en: 'Law, accounting and consulting firms: reachability, visibility and automation with AI.',
      it: 'Studi legali, fiduciari e consulenti: reperibilità, visibilità e automazione con l’AI.',
      fr: 'Cabinets juridiques, fiduciaires et conseils : joignabilité, visibilité et automatisation avec l’IA.',
    },
    relatedServices: ['phone-assistant', 'seo', 'automation', 'consulting'],
  },
  {
    id: 'beauty', order: 10, status: 'live',
    slug: { de: 'beauty-wellness', en: 'beauty-wellness', it: 'bellezza-benessere', fr: 'beaute-bien-etre' },
    name: { de: 'Beauty & Wellness', en: 'Beauty & Wellness', it: 'Bellezza & Benessere', fr: 'Beauté & Bien-être' },
    tagline: {
      de: 'Termine buchen und Anrufe beantworten, während Sie am Kunden sind — für Salons und Studios.',
      en: 'Book appointments and answer calls while you serve clients — for salons and studios.',
      it: 'Prenotare appuntamenti e rispondere alle chiamate mentre servite i clienti — per saloni e studi.',
      fr: 'Prendre des rendez-vous et répondre aux appels pendant que vous servez vos clients — pour salons et studios.',
    },
    relatedServices: ['phone-assistant', 'websites'],
  },
  {
    id: 'finance', order: 11, status: 'live',
    slug: { de: 'finanzwesen', en: 'finance', it: 'finanza', fr: 'finance' },
    name: { de: 'Finanzwesen', en: 'Finance', it: 'Finanza', fr: 'Finance' },
    tagline: {
      de: 'Automatisierung, Agenten und Integrationen für Finanzdienstleister — compliance-bewusst.',
      en: 'Automation, agents and integrations for financial services — compliance-aware.',
      it: 'Automazione, agenti e integrazioni per i servizi finanziari — attenti alla compliance.',
      fr: 'Automatisation, agents et intégrations pour les services financiers — soucieux de la conformité.',
    },
    relatedServices: ['automation', 'agents', 'integrations', 'consulting'],
  },
  {
    id: 'construction', order: 12, status: 'live',
    slug: { de: 'baugewerbe', en: 'construction', it: 'edilizia', fr: 'construction' },
    name: { de: 'Baugewerbe', en: 'Construction', it: 'Edilizia', fr: 'Construction' },
    tagline: {
      de: 'Anfragen aufnehmen und Angebote koordinieren, auch wenn das Team auf der Baustelle ist.',
      en: 'Capture enquiries and coordinate quotes, even when the team is on site.',
      it: 'Raccogliere richieste e coordinare i preventivi, anche quando il team è in cantiere.',
      fr: 'Capter les demandes et coordonner les devis, même quand l’équipe est sur le chantier.',
    },
    relatedServices: ['phone-assistant', 'websites', 'automation'],
  },
  {
    id: 'manufacturing', order: 13, status: 'live',
    slug: { de: 'produktion', en: 'manufacturing', it: 'produzione', fr: 'industrie' },
    name: { de: 'Produktion', en: 'Manufacturing', it: 'Produzione', fr: 'Industrie' },
    tagline: {
      de: 'Prozesse automatisieren und Systeme verbinden — KI für Schweizer Industrie und Fertigung.',
      en: 'Automate processes and connect systems — AI for Swiss industry and manufacturing.',
      it: 'Automatizzare i processi e collegare i sistemi — AI per l’industria e la produzione svizzera.',
      fr: 'Automatiser les processus et connecter les systèmes — l’IA pour l’industrie suisse.',
    },
    relatedServices: ['automation', 'integrations', 'consulting'],
  },
  {
    id: 'logistics', order: 14, status: 'live',
    slug: { de: 'logistik', en: 'logistics', it: 'logistica', fr: 'logistique' },
    name: { de: 'Logistik', en: 'Logistics', it: 'Logistica', fr: 'Logistique' },
    tagline: {
      de: 'Auftragsannahme, Statusanfragen und Datenflüsse automatisieren — KI für Logistik und Transport.',
      en: 'Automate order intake, status enquiries and data flows — AI for logistics and transport.',
      it: 'Automatizzare la presa in carico degli ordini, le richieste di stato e i flussi di dati — AI per la logistica.',
      fr: 'Automatiser la prise de commandes, les demandes de statut et les flux de données — l’IA pour la logistique.',
    },
    relatedServices: ['automation', 'integrations', 'phone-assistant'],
  },
  {
    id: 'education', order: 15, status: 'live',
    slug: { de: 'bildung', en: 'education', it: 'istruzione', fr: 'education' },
    name: { de: 'Bildung', en: 'Education', it: 'Istruzione', fr: 'Éducation' },
    tagline: {
      de: 'Anfragen beantworten, Anmeldungen koordinieren und Inhalte sichtbar machen — KI für Bildungsanbieter.',
      en: 'Answer enquiries, coordinate enrolments and make content visible — AI for education providers.',
      it: 'Rispondere alle richieste, coordinare le iscrizioni e rendere visibili i contenuti — AI per la formazione.',
      fr: 'Répondre aux demandes, coordonner les inscriptions et rendre le contenu visible — l’IA pour la formation.',
    },
    relatedServices: ['phone-assistant', 'websites', 'seo'],
  },
  {
    id: 'e-commerce', order: 16, status: 'live',
    slug: { de: 'e-commerce', en: 'e-commerce', it: 'e-commerce', fr: 'e-commerce' },
    name: { de: 'E-Commerce', en: 'E-Commerce', it: 'E-Commerce', fr: 'E-Commerce' },
    tagline: {
      de: 'Sichtbarkeit, Support und Automatisierung für Online-Shops — von SEO/GEO bis KI-Kundenservice.',
      en: 'Visibility, support and automation for online shops — from SEO/GEO to AI customer service.',
      it: 'Visibilità, supporto e automazione per gli shop online — dalla SEO/GEO al servizio clienti AI.',
      fr: 'Visibilité, support et automatisation pour les boutiques en ligne — du SEO/GEO au service client IA.',
    },
    relatedServices: ['seo', 'geo', 'google-ads', 'automation'],
  },
];

/** Localized paths for an industry, under the Industries pillar. */
export function industryPaths(i: IndustryDef): LocalePaths {
  return underPillar('industries', i.slug);
}

export function getIndustry(id: string): IndustryDef | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}

export const liveIndustries = (): IndustryDef[] => INDUSTRIES.filter((i) => i.status === 'live').sort((a, b) => a.order - b.order);
export const orderedIndustries = (): IndustryDef[] => [...INDUSTRIES].sort((a, b) => a.order - b.order);
