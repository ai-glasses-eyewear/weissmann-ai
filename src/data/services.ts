/**
 * Weissmann AI — Services registry (the 9 commercial service pages).
 *
 * Each service is a fully-separated, authoritative landing page with its own
 * URL, keyword and intent (docs/architecture/MASTER-PAGE-MAP.md §4). Prices are
 * NEVER stated here — they come from pricing.ts. Long-form page copy lives in
 * the page/template; this registry is the identity + routing + relationship
 * source of truth that drives URLs, hreflang, nav, the services hub, schema
 * and internal linking.
 *
 * `status: 'live'` gates publication: only live services generate a page and
 * appear as links, so the site never ships thin or broken service pages while
 * they are built section by section.
 */
import type { LocaleMap, LocalePaths } from './routes';
import { underPillar } from './routes';

export type ServiceGroup = 'build' | 'grow' | 'advise';

export interface ServiceDef {
  id: string;
  /** Menu grouping that communicates non-overlap (Build / Grow / Advise). */
  group: ServiceGroup;
  order: number;
  status: 'live' | 'draft';
  /** Leaf slug per locale (composed under the Services pillar segment). */
  slug: LocaleMap;
  /** Short label for nav + cards. */
  name: LocaleMap;
  /** One-line value proposition for hub cards + menu. */
  tagline: LocaleMap;
  /** Schema.org Service serviceType (English canonical). */
  serviceType: string;
  /** Primary commercial keyword per locale (for the keyword-ownership registry). */
  primaryKeyword: LocaleMap;
  /** True only when a real, config-backed price exists (else "auf Anfrage", no Offer schema). */
  hasOffer: boolean;
  /** Related industry ids (industries.ts) surfaced on the page + matrix. */
  relatedIndustries: string[];
  /** Related Academy cluster ids (informational counterpart, cross-linked, never cannibalized). */
  relatedAcademy: string[];
}

export const SERVICES: ServiceDef[] = [
  {
    id: 'phone-assistant',
    group: 'build',
    order: 1,
    status: 'live',
    slug: { de: 'ki-telefonassistent', en: 'ai-phone-assistant', it: 'assistente-telefonico-ai', fr: 'assistant-telephonique-ia' },
    name: { de: 'KI-Telefonassistent', en: 'AI Phone Assistant', it: 'Assistente telefonico AI', fr: 'Assistant téléphonique IA' },
    tagline: {
      de: 'Ein KI-Telefonassistent, der jeden Anruf annimmt, Termine bucht und Fragen beantwortet — rund um die Uhr.',
      en: 'An AI phone assistant that answers every call, books appointments and handles questions — around the clock.',
      it: 'Un assistente telefonico AI che risponde a ogni chiamata, prenota appuntamenti e gestisce le domande — 24 ore su 24.',
      fr: 'Un assistant téléphonique IA qui répond à chaque appel, prend les rendez-vous et gère les questions — 24h/24.',
    },
    serviceType: 'AI Phone Assistant',
    primaryKeyword: { de: 'KI-Telefonassistent', en: 'AI phone assistant', it: 'assistente telefonico AI', fr: 'assistant téléphonique IA' },
    hasOffer: true,
    relatedIndustries: ['healthcare', 'dental', 'medical-clinics', 'restaurants', 'hotels', 'real-estate'],
    relatedAcademy: ['agents-automation-voice'],
  },
  {
    id: 'websites',
    group: 'build',
    order: 2,
    status: 'draft',
    slug: { de: 'ki-webentwicklung', en: 'ai-web-development', it: 'sviluppo-siti-web-ai', fr: 'developpement-web-ia' },
    name: { de: 'KI-Webentwicklung', en: 'AI Web Development', it: 'Sviluppo siti web AI', fr: 'Développement web IA' },
    tagline: {
      de: 'Schnelle, suchmaschinen- und KI-optimierte Websites, die aus Besuchern Anfragen machen.',
      en: 'Fast, search- and AI-optimized websites that turn visitors into enquiries.',
      it: 'Siti web veloci, ottimizzati per i motori di ricerca e l’AI, che trasformano i visitatori in richieste.',
      fr: 'Des sites web rapides, optimisés pour la recherche et l’IA, qui transforment les visiteurs en demandes.',
    },
    serviceType: 'Web Development',
    primaryKeyword: { de: 'KI Webentwicklung', en: 'AI web development', it: 'sviluppo siti web AI', fr: 'développement web IA' },
    hasOffer: true,
    relatedIndustries: ['restaurants', 'hotels', 'real-estate', 'professional-services', 'retail'],
    relatedAcademy: ['marketing-seo-geo'],
  },
  {
    id: 'seo',
    group: 'grow',
    order: 3,
    status: 'draft',
    slug: { de: 'seo', en: 'seo', it: 'seo', fr: 'seo' },
    name: { de: 'SEO', en: 'SEO', it: 'SEO', fr: 'SEO' },
    tagline: {
      de: 'Nachhaltige Sichtbarkeit bei Google — technisches SEO, Inhalte und lokale Rankings für die Schweiz.',
      en: 'Sustainable visibility on Google — technical SEO, content and local rankings for Switzerland.',
      it: 'Visibilità duratura su Google — SEO tecnica, contenuti e ranking locali per la Svizzera.',
      fr: 'Une visibilité durable sur Google — SEO technique, contenu et référencement local pour la Suisse.',
    },
    serviceType: 'Search Engine Optimization',
    primaryKeyword: { de: 'SEO Agentur Zürich', en: 'SEO agency Switzerland', it: 'agenzia SEO Svizzera', fr: 'agence SEO Suisse' },
    hasOffer: false,
    relatedIndustries: ['professional-services', 'real-estate', 'retail', 'e-commerce'],
    relatedAcademy: ['marketing-seo-geo'],
  },
  {
    id: 'geo',
    group: 'grow',
    order: 4,
    status: 'draft',
    slug: { de: 'generative-engine-optimization', en: 'generative-engine-optimization', it: 'generative-engine-optimization', fr: 'generative-engine-optimization' },
    name: { de: 'GEO', en: 'GEO', it: 'GEO', fr: 'GEO' },
    tagline: {
      de: 'Generative Engine Optimization: sichtbar und zitiert werden in ChatGPT, Claude, Gemini und Google AI Overviews.',
      en: 'Generative Engine Optimization: get seen and cited in ChatGPT, Claude, Gemini and Google AI Overviews.',
      it: 'Generative Engine Optimization: essere visibili e citati in ChatGPT, Claude, Gemini e Google AI Overviews.',
      fr: 'Generative Engine Optimization : être visible et cité dans ChatGPT, Claude, Gemini et Google AI Overviews.',
    },
    serviceType: 'Generative Engine Optimization',
    primaryKeyword: { de: 'Generative Engine Optimization', en: 'Generative Engine Optimization', it: 'Generative Engine Optimization', fr: 'Generative Engine Optimization' },
    hasOffer: false,
    relatedIndustries: ['professional-services', 'finance', 'insurance'],
    relatedAcademy: ['marketing-seo-geo'],
  },
  {
    id: 'google-ads',
    group: 'grow',
    order: 5,
    status: 'draft',
    slug: { de: 'google-ads', en: 'google-ads', it: 'google-ads', fr: 'google-ads' },
    name: { de: 'Google Ads', en: 'Google Ads', it: 'Google Ads', fr: 'Google Ads' },
    tagline: {
      de: 'Planbare Anfragen über Google Ads — sauber aufgesetzt, ehrlich gemessen, laufend optimiert.',
      en: 'Predictable enquiries through Google Ads — cleanly set up, honestly measured, continuously optimized.',
      it: 'Richieste prevedibili con Google Ads — impostazione pulita, misurazione onesta, ottimizzazione continua.',
      fr: 'Des demandes prévisibles via Google Ads — configuration propre, mesure honnête, optimisation continue.',
    },
    serviceType: 'Google Ads Management',
    primaryKeyword: { de: 'Google Ads Agentur', en: 'Google Ads agency', it: 'agenzia Google Ads', fr: 'agence Google Ads' },
    hasOffer: false,
    relatedIndustries: ['e-commerce', 'retail', 'real-estate', 'professional-services'],
    relatedAcademy: ['marketing-seo-geo'],
  },
  {
    id: 'automation',
    group: 'build',
    order: 6,
    status: 'draft',
    slug: { de: 'ki-automatisierung', en: 'ai-automation', it: 'automazione-ai', fr: 'automatisation-ia' },
    name: { de: 'KI-Automatisierung', en: 'AI Automation', it: 'Automazione AI', fr: 'Automatisation IA' },
    tagline: {
      de: 'Wiederkehrende Abläufe automatisieren — regelbasierte Workflows, die Zeit sparen und Fehler vermeiden.',
      en: 'Automate repetitive work — rule-based workflows that save time and prevent errors.',
      it: 'Automatizzare i processi ripetitivi — workflow basati su regole che fanno risparmiare tempo ed evitano errori.',
      fr: 'Automatiser les tâches répétitives — des workflows basés sur des règles qui font gagner du temps et évitent les erreurs.',
    },
    serviceType: 'AI Automation',
    primaryKeyword: { de: 'KI-Automatisierung', en: 'AI automation', it: 'automazione AI', fr: 'automatisation IA' },
    hasOffer: false,
    relatedIndustries: ['professional-services', 'finance', 'logistics', 'manufacturing'],
    relatedAcademy: ['agents-automation-voice', 'functions'],
  },
  {
    id: 'agents',
    group: 'build',
    order: 7,
    status: 'draft',
    slug: { de: 'ki-agenten', en: 'ai-agents', it: 'agenti-ai', fr: 'agents-ia' },
    name: { de: 'KI-Agenten', en: 'AI Agents', it: 'Agenti AI', fr: 'Agents IA' },
    tagline: {
      de: 'Autonome KI-Agenten, die eigenständig recherchieren, entscheiden und handeln — sicher eingebettet in Ihre Prozesse.',
      en: 'Autonomous AI agents that research, decide and act on their own — safely embedded in your processes.',
      it: 'Agenti AI autonomi che cercano, decidono e agiscono in autonomia — integrati in sicurezza nei vostri processi.',
      fr: 'Des agents IA autonomes qui recherchent, décident et agissent seuls — intégrés en toute sécurité à vos processus.',
    },
    serviceType: 'AI Agent Development',
    primaryKeyword: { de: 'KI-Agenten entwickeln', en: 'AI agents', it: 'agenti AI', fr: 'agents IA' },
    hasOffer: false,
    relatedIndustries: ['professional-services', 'finance', 'insurance'],
    relatedAcademy: ['agents-automation-voice'],
  },
  {
    id: 'consulting',
    group: 'advise',
    order: 8,
    status: 'draft',
    slug: { de: 'ki-beratung', en: 'ai-consulting', it: 'consulenza-ai', fr: 'conseil-ia' },
    name: { de: 'KI-Beratung', en: 'AI Consulting', it: 'Consulenza AI', fr: 'Conseil IA' },
    tagline: {
      de: 'Strategie und Roadmap: Wo KI in Ihrem Unternehmen wirklich Wert schafft — und wo nicht.',
      en: 'Strategy and roadmap: where AI genuinely creates value in your business — and where it does not.',
      it: 'Strategia e roadmap: dove l’AI crea davvero valore nella vostra azienda — e dove no.',
      fr: 'Stratégie et feuille de route : où l’IA crée réellement de la valeur dans votre entreprise — et où non.',
    },
    serviceType: 'AI Consulting',
    primaryKeyword: { de: 'KI-Beratung Zürich', en: 'AI consulting Switzerland', it: 'consulenza AI Svizzera', fr: 'conseil IA Suisse' },
    hasOffer: false,
    relatedIndustries: ['professional-services', 'finance', 'manufacturing', 'insurance'],
    relatedAcademy: ['business-smes', 'trust-security-privacy-regulation'],
  },
  {
    id: 'integrations',
    group: 'build',
    order: 9,
    status: 'draft',
    slug: { de: 'ki-integrationen', en: 'ai-integrations', it: 'integrazioni-ai', fr: 'integrations-ia' },
    name: { de: 'KI-Integrationen', en: 'AI Integrations', it: 'Integrazioni AI', fr: 'Intégrations IA' },
    tagline: {
      de: 'KI in Ihre bestehenden Systeme integrieren — CRM, ERP, Website und Datenquellen sauber verbunden.',
      en: 'Integrate AI into your existing systems — CRM, ERP, website and data sources cleanly connected.',
      it: 'Integrare l’AI nei vostri sistemi esistenti — CRM, ERP, sito web e fonti dati collegati in modo pulito.',
      fr: 'Intégrer l’IA à vos systèmes existants — CRM, ERP, site web et sources de données proprement connectés.',
    },
    serviceType: 'AI Integration',
    primaryKeyword: { de: 'KI-Integration', en: 'AI integration', it: 'integrazione AI', fr: 'intégration IA' },
    hasOffer: false,
    relatedIndustries: ['professional-services', 'finance', 'logistics', 'e-commerce'],
    relatedAcademy: ['agents-automation-voice', 'local-opensource'],
  },
];

/** Localized paths for a service, under the Services pillar. */
export function servicePaths(s: ServiceDef): LocalePaths {
  return underPillar('services', s.slug);
}

export function getService(id: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.id === id);
}

/** Services that are published (generate a page and appear as links). */
export const liveServices = (): ServiceDef[] => SERVICES.filter((s) => s.status === 'live').sort((a, b) => a.order - b.order);

/** All services, ordered (for the hub, which can show upcoming ones as non-links). */
export const orderedServices = (): ServiceDef[] => [...SERVICES].sort((a, b) => a.order - b.order);
