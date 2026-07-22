/**
 * Weissmann AI — central pricing configuration.
 *
 * THE single source for every price shown anywhere: page copy, JSON-LD
 * Offer blocks, Open Graph data and all four languages render from these
 * records. scripts/validate-pricing.mjs enforces consistency at build time.
 *
 * Rules (approved 2026-07-20):
 * - Phone Agent Starter keeps its verified Stripe link. Medium (formerly
 *   Premium) was repriced to CHF 499 on 2026-07-22; its old CHF 990 Stripe
 *   link was removed, so Medium is consult-only until the business supplies a
 *   new CHF 499 Payment Link.
 * - Starter price is CHF 350 (the stale CHF 590 must never reappear).
 * - New packages (websites, SEO, GEO, Ads) have approved prices but NO
 *   Stripe links yet — links are created only via authenticated Stripe
 *   access or by the business; never invented. Until then ctaType stays
 *   'consult' and the UI shows a consultation CTA instead of checkout.
 * - Complex Website and Phone Agent Enterprise are consultation-only.
 */

import type { Locale } from './site';

export type Interval = 'once' | 'month';
export type CtaType = 'stripe' | 'consult';

export interface Localized {
  de: string;
  en: string;
  it: string;
  fr: string;
}

export interface PricingPackage {
  id: string;
  category: 'phone-agent' | 'website' | 'seo' | 'geo' | 'ads';
  name: Localized;
  /** Numeric price in CHF; null = custom / on request. */
  price: number | null;
  currency: 'CHF';
  interval: Interval;
  /** true → display as "ab CHF …" / "from CHF …" (price is a starting price). */
  isFrom: boolean;
  description: Localized;
  features: Record<Locale, string[]>;
  /** Notes shown near the price (contract term, exclusions). */
  disclosures: Record<Locale, string[]>;
  /** Verified Stripe Payment Link, or null if none exists yet. */
  stripeLink: string | null;
  ctaType: CtaType;
  /** Schema.org Offer eligibility: only real purchasable packages get Offer markup. */
  schemaOffer: boolean;
}

export const PACKAGES: PricingPackage[] = [
  // ───────────────────────── AI Phone Agent (preserved) ─────────────────────
  {
    id: 'phone-starter',
    category: 'phone-agent',
    name: {
      de: 'KI-Telefonassistent Starter',
      en: 'AI Phone Agent Starter',
      it: 'Assistente telefonico AI Starter',
      fr: 'Agent téléphonique IA Starter',
    },
    price: 350,
    currency: 'CHF',
    interval: 'month',
    isFrom: false,
    description: {
      de: 'Ideal für kleine und mittlere Unternehmen. Keine Setup-Gebühr, 12-Monatsvertrag.',
      en: 'Ideal for small and medium-sized businesses. No setup fee, 12-month contract.',
      it: 'Ideale per piccole e medie imprese. Nessun costo di attivazione, contratto di 12 mesi.',
      fr: 'Idéal pour les petites et moyennes entreprises. Sans frais d’installation, contrat de 12 mois.',
    },
    features: {
      de: [
        'Individuelle Einrichtung direkt bei Ihnen vor Ort – optimiert für Schweizer Unternehmen',
        '1 Sprache inklusive (DE/EN/FR/IT wählbar)',
        'Individuelle Vollkonfiguration Ihres KI-Telefonassistenten für Ihre Branche',
        '1500 Minuten pro Monat, danach CHF 0.30 pro Minute',
        'Dedizierte Telefonleitung inklusive Hosting Ihres Sprachassistenten',
      ],
      en: [
        'Customized setup directly at your business – optimized for Swiss companies',
        '1 language included (choose DE/EN/FR/IT)',
        'Full custom configuration of your AI phone agent for your industry',
        '1,500 minutes per month, then CHF 0.30 per minute',
        'Dedicated phone line including hosting of your voice agent',
      ],
      it: [
        'Configurazione personalizzata direttamente presso la vostra azienda – ottimizzata per le imprese svizzere',
        '1 lingua inclusa (a scelta tra DE/EN/FR/IT)',
        'Configurazione completa e personalizzata del vostro assistente telefonico AI',
        '1500 minuti al mese, poi CHF 0.30 al minuto',
        'Linea telefonica dedicata incluso l’hosting del vostro assistente vocale',
      ],
      fr: [
        'Mise en place personnalisée directement dans votre entreprise – optimisée pour les entreprises suisses',
        '1 langue incluse (au choix : DE/EN/FR/IT)',
        'Configuration complète et personnalisée de votre agent téléphonique IA',
        '1500 minutes par mois, puis CHF 0.30 par minute',
        'Ligne téléphonique dédiée, hébergement de votre assistant vocal inclus',
      ],
    },
    disclosures: {
      de: ['Keine Setup-Gebühr', '12-Monatsvertrag'],
      en: ['No setup fee', '12-month contract'],
      it: ['Nessun costo di attivazione', 'Contratto di 12 mesi'],
      fr: ['Sans frais d’installation', 'Contrat de 12 mois'],
    },
    stripeLink: 'https://buy.stripe.com/00w00b0V818UcT646g1sQ01',
    ctaType: 'stripe',
    schemaOffer: true,
  },
  {
    id: 'phone-premium',
    category: 'phone-agent',
    name: {
      de: 'KI-Telefonassistent Medium',
      en: 'AI Phone Agent Medium',
      it: 'Assistente telefonico AI Medium',
      fr: 'Agent téléphonique IA Medium',
    },
    price: 499,
    currency: 'CHF',
    interval: 'month',
    isFrom: false,
    description: {
      de: 'Ideal für wachsende Unternehmen. Systemintegration und tägliches Reporting. Keine Setup-Gebühr, 12-Monatsvertrag.',
      en: 'Ideal for growing businesses. System integration and daily reporting. No setup fee, 12-month contract.',
      it: 'Ideale per aziende in crescita. Integrazione di sistema e reportistica giornaliera. Nessun costo di attivazione, contratto di 12 mesi.',
      fr: 'Idéal pour les entreprises en croissance. Intégration système et reporting quotidien. Sans frais d’installation, contrat de 12 mois.',
    },
    features: {
      de: [
        'Individuelle Einrichtung direkt bei Ihnen vor Ort – optimiert für Schweizer Unternehmen',
        '2 Sprachen inklusive (DE/EN/FR/IT wählbar)',
        'Verwaltung von Terminen und Kundenanfragen sowie automatische Auskunft zu Angeboten und Services',
        '3500 Minuten pro Monat, danach CHF 0.25 pro Minute',
        'Schnelles Setup inklusive dedizierter Telefonleitung und Hosting',
      ],
      en: [
        'Customized setup directly at your business – optimized for Swiss companies',
        '2 languages included (choose DE/EN/FR/IT)',
        'Management of appointments and customer inquiries plus automatic information about offers and services',
        '3,500 minutes per month, then CHF 0.25 per minute',
        'Fast setup including dedicated phone line and hosting',
      ],
      it: [
        'Configurazione personalizzata direttamente presso la vostra azienda',
        '2 lingue incluse (a scelta tra DE/EN/FR/IT)',
        'Gestione di appuntamenti e richieste dei clienti, con informazioni automatiche su offerte e servizi',
        '3500 minuti al mese, poi CHF 0.25 al minuto',
        'Attivazione rapida con linea telefonica dedicata e hosting inclusi',
      ],
      fr: [
        'Mise en place personnalisée directement dans votre entreprise',
        '2 langues incluses (au choix : DE/EN/FR/IT)',
        'Gestion des rendez-vous et des demandes clients, avec informations automatiques sur vos offres et services',
        '3500 minutes par mois, puis CHF 0.25 par minute',
        'Mise en service rapide avec ligne téléphonique dédiée et hébergement inclus',
      ],
    },
    disclosures: {
      de: ['Keine Setup-Gebühr', '12-Monatsvertrag'],
      en: ['No setup fee', '12-month contract'],
      it: ['Nessun costo di attivazione', 'Contratto di 12 mesi'],
      fr: ['Sans frais d’installation', 'Contrat de 12 mois'],
    },
    // Repriced to CHF 499 (2026-07-22): the old CHF 990 Stripe link was removed
    // so no one is charged 990 under a 499 label. Consult CTA until a new
    // CHF 499 Payment Link is supplied by the business.
    stripeLink: null,
    ctaType: 'consult',
    schemaOffer: true,
  },
  {
    id: 'phone-enterprise',
    category: 'phone-agent',
    name: {
      de: 'KI-Telefonassistent Enterprise',
      en: 'AI Phone Agent Enterprise',
      it: 'Assistente telefonico AI Enterprise',
      fr: 'Agent téléphonique IA Enterprise',
    },
    price: null,
    currency: 'CHF',
    interval: 'month',
    isFrom: false,
    description: {
      de: 'Maximale Leistung für anspruchsvolle Unternehmen: Mehrsprachigkeit, Voice-Cloning, intelligentes Routing und Prioritätssupport.',
      en: 'Maximum power for demanding businesses: multilingual support, voice cloning, smart routing and priority support.',
      it: 'Massime prestazioni per aziende esigenti: multilingue, voice cloning, routing intelligente e supporto prioritario.',
      fr: 'Performance maximale pour les entreprises exigeantes : multilingue, clonage vocal, routage intelligent et support prioritaire.',
    },
    features: {
      de: [
        '4 Sprachen inklusive (DE/EN/FR/IT)',
        'Stimmerkennung und Smart-Routing',
        'Call-Recording-Dashboard und Prioritätssupport',
        'WhatsApp- und SMS-Bestätigungen',
        'Automatisierung von Tagesgeschäft und Sonderereignissen',
      ],
      en: [
        '4 languages included (DE/EN/FR/IT)',
        'Voice recognition and smart routing',
        'Call recording dashboard and priority support',
        'WhatsApp and SMS confirmations',
        'Automation of daily operations and special events',
      ],
      it: [
        '4 lingue incluse (DE/EN/FR/IT)',
        'Riconoscimento vocale e routing intelligente',
        'Dashboard di registrazione chiamate e supporto prioritario',
        'Conferme via WhatsApp e SMS',
        'Automazione delle attività quotidiane e degli eventi speciali',
      ],
      fr: [
        '4 langues incluses (DE/EN/FR/IT)',
        'Reconnaissance vocale et routage intelligent',
        'Tableau de bord d’enregistrement des appels et support prioritaire',
        'Confirmations par WhatsApp et SMS',
        'Automatisation des opérations quotidiennes et des événements spéciaux',
      ],
    },
    disclosures: {
      de: ['Preis auf Anfrage – individuelles Angebot'],
      en: ['Price on request – custom proposal'],
      it: ['Prezzo su richiesta – offerta personalizzata'],
      fr: ['Prix sur demande – offre personnalisée'],
    },
    stripeLink: null,
    ctaType: 'consult',
    schemaOffer: false,
  },

  // ───────────────────────────── Websites ──────────────────────────────────
  {
    id: 'website-starter',
    category: 'website',
    name: {
      de: 'Starter Website',
      en: 'Starter Website',
      it: 'Sito web Starter',
      fr: 'Site web Starter',
    },
    price: 2490,
    currency: 'CHF',
    interval: 'once',
    isFrom: false,
    description: {
      de: 'Das professionelle Fundament für kleine Unternehmen: eine moderne, glaubwürdige und konversionsstarke Website.',
      en: 'A professional foundation for small businesses that need a modern, credible and conversion-focused website.',
      it: 'La base professionale per piccole imprese: un sito web moderno, credibile e orientato alla conversione.',
      fr: 'La base professionnelle pour petites entreprises : un site web moderne, crédible et axé sur la conversion.',
    },
    features: {
      de: [
        'Bis zu 5 Kernseiten, responsives Design, mobiloptimiert',
        'Kontakt- oder Lead-Formular',
        'Technisches SEO- und GEO-Fundament',
        'Google Analytics 4 und Search Console eingerichtet',
        'Strukturierte Daten (Basis), Performance-Optimierung, Security-Header',
        'Netlify-Deployment, 1 Sprache, 2 definierte Korrekturrunden',
      ],
      en: [
        'Up to 5 core pages, responsive design, mobile-optimized',
        'Contact or lead form',
        'Technical SEO and GEO foundation',
        'Google Analytics 4 and Search Console set up',
        'Basic structured data, performance optimization, security headers',
        'Netlify deployment, 1 language, 2 defined revision rounds',
      ],
      it: [
        'Fino a 5 pagine principali, design responsive, ottimizzato per mobile',
        'Modulo di contatto o lead',
        'Fondamenta tecniche SEO e GEO',
        'Google Analytics 4 e Search Console configurati',
        'Dati strutturati di base, ottimizzazione delle prestazioni, header di sicurezza',
        'Deployment su Netlify, 1 lingua, 2 cicli di revisione definiti',
      ],
      fr: [
        'Jusqu’à 5 pages principales, design responsive, optimisé mobile',
        'Formulaire de contact ou de génération de leads',
        'Fondations SEO techniques et GEO',
        'Google Analytics 4 et Search Console configurés',
        'Données structurées de base, optimisation des performances, en-têtes de sécurité',
        'Déploiement Netlify, 1 langue, 2 cycles de révision définis',
      ],
    },
    disclosures: {
      de: ['Einmaliger Festpreis', 'Texterstellung, weitere Sprachen und kostenpflichtige Drittanbieter-Tools sind nicht enthalten'],
      en: ['One-time fixed price', 'Copywriting, additional languages and paid third-party tools are not included'],
      it: ['Prezzo fisso una tantum', 'Copywriting, lingue aggiuntive e strumenti di terzi a pagamento non inclusi'],
      fr: ['Prix fixe unique', 'Rédaction, langues supplémentaires et outils tiers payants non inclus'],
    },
    stripeLink: null, // pending: Stripe link to be created by the business (never invented)
    ctaType: 'consult',
    schemaOffer: true,
  },
  {
    id: 'website-business',
    category: 'website',
    name: {
      de: 'Business Website',
      en: 'Business Website',
      it: 'Sito web Business',
      fr: 'Site web Business',
    },
    price: 4990,
    currency: 'CHF',
    interval: 'once',
    isFrom: false,
    description: {
      de: 'Für wachsende Unternehmen, die ein komplettes digitales Akquise- und Konversionssystem brauchen.',
      en: 'For growing businesses that need a complete digital acquisition and conversion system.',
      it: 'Per aziende in crescita che necessitano di un sistema digitale completo di acquisizione e conversione.',
      fr: 'Pour les entreprises en croissance qui ont besoin d’un système digital complet d’acquisition et de conversion.',
    },
    features: {
      de: [
        'Ca. 10–20 Seiten gemäss freigegebenem Umfang, Premium-Design',
        'Konversionsorientierte Architektur und Lead-Generierungssystem',
        'Fortgeschrittenes technisches SEO und GEO-Optimierung',
        'Mehrsprachigkeitsfähig, Blog- oder Wissensbereich',
        'Erweiterte Formulare, Buchungs-/CRM-Anbindung wo sinnvoll',
        'GA4 mit Conversion-Tracking, erweiterte strukturierte Daten',
        'Netlify-Deployment, 3 definierte Korrekturrunden',
      ],
      en: [
        'Approx. 10–20 pages per approved scope, premium custom design',
        'Conversion-focused architecture and lead-generation system',
        'Advanced technical SEO and GEO optimization',
        'Multilingual-ready, blog or knowledge section',
        'Advanced forms, booking/CRM connection where applicable',
        'GA4 with conversion tracking, advanced structured data',
        'Netlify deployment, 3 defined revision rounds',
      ],
      it: [
        'Circa 10–20 pagine secondo il perimetro approvato, design premium',
        'Architettura orientata alla conversione e sistema di lead generation',
        'SEO tecnico avanzato e ottimizzazione GEO',
        'Predisposto per il multilingue, sezione blog o knowledge',
        'Moduli avanzati, integrazione prenotazioni/CRM dove opportuno',
        'GA4 con tracciamento delle conversioni, dati strutturati avanzati',
        'Deployment su Netlify, 3 cicli di revisione definiti',
      ],
      fr: [
        'Environ 10–20 pages selon le périmètre approuvé, design premium',
        'Architecture axée conversion et système de génération de leads',
        'SEO technique avancé et optimisation GEO',
        'Prêt pour le multilingue, section blog ou base de connaissances',
        'Formulaires avancés, intégration réservation/CRM le cas échéant',
        'GA4 avec suivi des conversions, données structurées avancées',
        'Déploiement Netlify, 3 cycles de révision définis',
      ],
    },
    disclosures: {
      de: ['Einmaliger Festpreis', 'Kostenpflichtige Drittanbieter-Abos sind nicht enthalten, sofern nicht ausdrücklich genannt'],
      en: ['One-time fixed price', 'Paid third-party subscriptions are excluded unless explicitly included'],
      it: ['Prezzo fisso una tantum', 'Abbonamenti di terzi a pagamento esclusi se non esplicitamente inclusi'],
      fr: ['Prix fixe unique', 'Abonnements tiers payants exclus sauf mention explicite'],
    },
    stripeLink: null, // pending: Stripe link to be created by the business (never invented)
    ctaType: 'consult',
    schemaOffer: true,
  },
  {
    id: 'website-complex',
    category: 'website',
    name: {
      de: 'Individuelle Website / Web-Plattform',
      en: 'Complex / Custom Website',
      it: 'Sito web complesso / su misura',
      fr: 'Site web complexe / sur mesure',
    },
    price: 9900,
    currency: 'CHF',
    interval: 'once',
    isFrom: true,
    description: {
      de: 'Grosse mehrsprachige Architekturen, individuelle Anwendungen, E-Commerce, Integrationen und KI-Workflows.',
      en: 'Large multilingual architectures, custom applications, e-commerce, integrations and AI workflows.',
      it: 'Grandi architetture multilingue, applicazioni su misura, e-commerce, integrazioni e workflow AI.',
      fr: 'Grandes architectures multilingues, applications sur mesure, e-commerce, intégrations et workflows IA.',
    },
    features: {
      de: [
        'Grosse mehrsprachige Informationsarchitektur',
        'Individuelle Anwendungen, API- und CRM-Integrationen',
        'E-Commerce, Mitgliederbereiche, Dashboards',
        'Interaktive Tools und KI-Workflows',
        'Erweiterte Analytics und individuelle Lead-Funnels',
        'Laufende Beratung möglich',
      ],
      en: [
        'Large multilingual information architecture',
        'Custom applications, API and CRM integrations',
        'E-commerce, member areas, dashboards',
        'Interactive tools and AI workflows',
        'Advanced analytics and custom lead funnels',
        'Ongoing consulting available',
      ],
      it: [
        'Grande architettura informativa multilingue',
        'Applicazioni su misura, integrazioni API e CRM',
        'E-commerce, aree riservate, dashboard',
        'Strumenti interattivi e workflow AI',
        'Analytics avanzate e funnel di lead personalizzati',
        'Consulenza continuativa disponibile',
      ],
      fr: [
        'Grande architecture d’information multilingue',
        'Applications sur mesure, intégrations API et CRM',
        'E-commerce, espaces membres, tableaux de bord',
        'Outils interactifs et workflows IA',
        'Analytics avancées et funnels de leads personnalisés',
        'Conseil continu possible',
      ],
    },
    disclosures: {
      de: ['Ab CHF 9’900 – Endpreis nach Umfang', 'Beratung und Offerte statt Direktkauf'],
      en: ['From CHF 9,900 – final price based on scope', 'Consultation and proposal instead of direct checkout'],
      it: ['Da CHF 9’900 – prezzo finale in base al perimetro', 'Consulenza e offerta invece dell’acquisto diretto'],
      fr: ['À partir de CHF 9’900 – prix final selon le périmètre', 'Consultation et offre au lieu d’un achat direct'],
    },
    stripeLink: null,
    ctaType: 'consult',
    schemaOffer: false,
  },

  // ─────────────────────────── Search & Growth ─────────────────────────────
  {
    id: 'seo-growth',
    category: 'seo',
    name: { de: 'SEO Growth', en: 'SEO Growth', it: 'SEO Growth', fr: 'SEO Growth' },
    price: 890,
    currency: 'CHF',
    interval: 'month',
    isFrom: false,
    description: {
      de: 'Monatliches SEO-Programm: technisches Fundament, On-Page-Optimierung und priorisierter Umsetzungsplan.',
      en: 'Monthly SEO program: technical foundation, on-page optimization and a prioritized implementation plan.',
      it: 'Programma SEO mensile: fondamenta tecniche, ottimizzazione on-page e piano di implementazione prioritizzato.',
      fr: 'Programme SEO mensuel : fondations techniques, optimisation on-page et plan de mise en œuvre priorisé.',
    },
    features: {
      de: [
        'Initiales technisches Audit und Keyword-Recherche mit Suchintentions-Mapping',
        'On-Page- und Metadaten-Optimierung, interne Verlinkung',
        'Search-Console-Monitoring und Indexierungsanalyse',
        'Technische SEO-Wartung und strukturierte Daten (Basis)',
        'Content- und Local-SEO-Empfehlungen',
        'Monatliches Reporting mit priorisiertem Massnahmenplan',
      ],
      en: [
        'Initial technical audit and keyword research with search-intent mapping',
        'On-page and metadata optimization, internal linking improvements',
        'Search Console monitoring and indexing analysis',
        'Technical SEO maintenance and basic structured-data improvements',
        'Content and local SEO recommendations',
        'Monthly reporting with a prioritized action plan',
      ],
      it: [
        'Audit tecnico iniziale e ricerca keyword con mappatura dell’intento di ricerca',
        'Ottimizzazione on-page e dei metadati, miglioramento dei link interni',
        'Monitoraggio Search Console e analisi dell’indicizzazione',
        'Manutenzione SEO tecnica e dati strutturati di base',
        'Raccomandazioni per contenuti e SEO locale',
        'Report mensile con piano d’azione prioritizzato',
      ],
      fr: [
        'Audit technique initial et recherche de mots-clés avec cartographie des intentions',
        'Optimisation on-page et des métadonnées, maillage interne',
        'Suivi Search Console et analyse de l’indexation',
        'Maintenance SEO technique et données structurées de base',
        'Recommandations de contenu et SEO local',
        'Reporting mensuel avec plan d’action priorisé',
      ],
    },
    disclosures: {
      de: [
        'Texterstellung und Entwicklungsarbeiten sind nicht enthalten (Empfehlungen inklusive)',
        'Backlink-Outreach ist nicht enthalten',
        'Keine Ranking-Garantien – wir bauen die Grundlagen für starke Sichtbarkeit',
      ],
      en: [
        'Content writing and development work are not included (recommendations are)',
        'Backlink outreach is not included',
        'No ranking guarantees – we build the foundations required to compete for strong visibility',
      ],
      it: [
        'Redazione di contenuti e sviluppo non inclusi (raccomandazioni incluse)',
        'Outreach per backlink non incluso',
        'Nessuna garanzia di posizionamento – costruiamo le basi per una forte visibilità',
      ],
      fr: [
        'Rédaction de contenu et développement non inclus (recommandations incluses)',
        'Outreach de backlinks non inclus',
        'Aucune garantie de classement – nous construisons les fondations d’une forte visibilité',
      ],
    },
    stripeLink: null, // pending: Stripe link to be created by the business (never invented)
    ctaType: 'consult',
    schemaOffer: true,
  },
  {
    id: 'geo-authority',
    category: 'geo',
    name: { de: 'GEO Authority', en: 'GEO Authority', it: 'GEO Authority', fr: 'GEO Authority' },
    price: 990,
    currency: 'CHF',
    interval: 'month',
    isFrom: false,
    description: {
      de: 'Monatliches GEO-Programm für Sichtbarkeitspotenzial in KI-Antwortmaschinen wie ChatGPT, Gemini und Perplexity.',
      en: 'Monthly GEO program for visibility potential in AI answer engines such as ChatGPT, Gemini and Perplexity.',
      it: 'Programma GEO mensile per il potenziale di visibilità nei motori di risposta AI come ChatGPT, Gemini e Perplexity.',
      fr: 'Programme GEO mensuel pour le potentiel de visibilité dans les moteurs de réponse IA comme ChatGPT, Gemini et Perplexity.',
    },
    features: {
      de: [
        'GEO- und KI-Suche-Readiness-Audit',
        'Entitäten-Konsistenzanalyse, Organisations- und Personen-Schema-Review',
        'Zitierfreundliche Content-Optimierung, Definitions- und FAQ-Optimierung',
        'KI-Crawler-Zugänglichkeit und llms.txt-Erstellung/-Pflege',
        'Wissenshub-, Autoren- und Quellentransparenz-Empfehlungen',
        'Monatliches Reporting, koordiniert mit SEO',
      ],
      en: [
        'GEO and AI-search readiness audit',
        'Entity consistency analysis, Organization and Person schema review',
        'Citation-friendly content optimization, definition and FAQ optimization',
        'AI crawler accessibility and llms.txt creation/maintenance',
        'Knowledge-hub, author and source-transparency recommendations',
        'Monthly reporting, coordinated with SEO',
      ],
      it: [
        'Audit di preparazione GEO e per la ricerca AI',
        'Analisi di coerenza delle entità, revisione degli schemi Organization e Person',
        'Ottimizzazione dei contenuti citabili, delle definizioni e delle FAQ',
        'Accessibilità per i crawler AI e creazione/manutenzione di llms.txt',
        'Raccomandazioni su knowledge hub, autori e trasparenza delle fonti',
        'Report mensile, coordinato con la SEO',
      ],
      fr: [
        'Audit de préparation GEO et recherche IA',
        'Analyse de cohérence des entités, revue des schémas Organization et Person',
        'Optimisation de contenus citables, des définitions et des FAQ',
        'Accessibilité aux crawlers IA et création/maintenance de llms.txt',
        'Recommandations knowledge hub, auteurs et transparence des sources',
        'Reporting mensuel, coordonné avec le SEO',
      ],
    },
    disclosures: {
      de: ['GEO unterstützt Sichtbarkeitspotenzial in KI-Antwortmaschinen, kann aber Zitierungen oder Aufnahme nicht garantieren'],
      en: ['GEO supports visibility potential in AI answer engines but cannot guarantee citations or inclusion'],
      it: ['La GEO supporta il potenziale di visibilità nei motori di risposta AI, ma non può garantire citazioni o inclusione'],
      fr: ['Le GEO soutient le potentiel de visibilité dans les moteurs de réponse IA mais ne peut garantir ni citation ni inclusion'],
    },
    stripeLink: null, // pending: Stripe link to be created by the business (never invented)
    ctaType: 'consult',
    schemaOffer: true,
  },
  {
    id: 'ads-growth',
    category: 'ads',
    name: {
      de: 'Google Ads Growth',
      en: 'Google Ads Growth',
      it: 'Google Ads Growth',
      fr: 'Google Ads Growth',
    },
    price: 690,
    currency: 'CHF',
    interval: 'month',
    isFrom: false,
    description: {
      de: 'Monatliches Google-Ads-Management: Kampagnenstruktur, Conversion-Tracking und laufende Optimierung.',
      en: 'Monthly Google Ads management: campaign structure, conversion tracking and ongoing optimization.',
      it: 'Gestione mensile di Google Ads: struttura delle campagne, tracciamento delle conversioni e ottimizzazione continua.',
      fr: 'Gestion mensuelle de Google Ads : structure des campagnes, suivi des conversions et optimisation continue.',
    },
    features: {
      de: [
        'Initiale Kampagnenstruktur und Keyword-Recherche',
        'Negative-Keyword-Strategie und Anzeigentexte',
        'Conversion-Tracking-Review und Landingpage-Empfehlungen',
        'Kampagnen-Monitoring, Gebots- und Budget-Empfehlungen',
        'Suchbegriffs-Analyse und laufende Optimierung',
        'Monatliches Reporting',
      ],
      en: [
        'Initial campaign structure and keyword research',
        'Negative-keyword strategy and ad copy development',
        'Conversion-tracking review and landing-page recommendations',
        'Campaign monitoring, bid and budget recommendations',
        'Search-term analysis and ongoing optimization',
        'Monthly reporting',
      ],
      it: [
        'Struttura iniziale delle campagne e ricerca keyword',
        'Strategia di keyword negative e sviluppo degli annunci',
        'Revisione del tracciamento delle conversioni e raccomandazioni per le landing page',
        'Monitoraggio delle campagne, raccomandazioni su offerte e budget',
        'Analisi dei termini di ricerca e ottimizzazione continua',
        'Report mensile',
      ],
      fr: [
        'Structure initiale des campagnes et recherche de mots-clés',
        'Stratégie de mots-clés négatifs et rédaction des annonces',
        'Revue du suivi des conversions et recommandations landing pages',
        'Suivi des campagnes, recommandations d’enchères et de budget',
        'Analyse des termes de recherche et optimisation continue',
        'Reporting mensuel',
      ],
    },
    disclosures: {
      de: ['Das Google-Werbebudget ist nicht enthalten und wird vom Kunden separat und direkt bezahlt'],
      en: ['Google advertising spend is paid separately and directly by the customer'],
      it: ['Il budget pubblicitario Google non è incluso e viene pagato separatamente e direttamente dal cliente'],
      fr: ['Le budget publicitaire Google n’est pas inclus et est payé séparément et directement par le client'],
    },
    stripeLink: null, // pending: Stripe link to be created by the business (never invented)
    ctaType: 'consult',
    schemaOffer: true,
  },
];

export function getPackage(id: string): PricingPackage {
  const pkg = PACKAGES.find((p) => p.id === id);
  if (!pkg) throw new Error(`Unknown pricing package: ${id}`);
  return pkg;
}

/** Format a price for display, e.g. "CHF 2’490" (Swiss apostrophe grouping). */
export function formatPrice(price: number): string {
  return `CHF ${price.toLocaleString('de-CH').replace(/,/g, '’')}`;
}
