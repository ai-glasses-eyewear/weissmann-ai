/**
 * Weissmann AI — AI Academy registry (the topical-authority knowledge hub).
 *
 * Nine content clusters (docs/knowledge-hub/); each cluster is a pillar page at
 * /ki-academy/{cluster}/ with spoke articles at /ki-academy/{cluster}/{spoke}/.
 * Cluster identity/routing lives here; article long-form copy is authored as
 * JSON data files in ./academy-content/*.json (matching AcademyArticle) and
 * loaded via import.meta.glob, so the Academy scales as data.
 *
 * `status: 'live'` gates a cluster (it needs a published pillar article).
 */
import type { LocaleMap, LocalePaths } from './routes';
import { underPillar, underPillarNested } from './routes';
import type { RichSection } from './service-content';

export interface AcademyCluster {
  id: string;
  order: number;
  status: 'live' | 'draft';
  slug: LocaleMap;
  name: LocaleMap;
  tagline: LocaleMap;
}

export interface AcademyArticle {
  id: string;
  /** Owning cluster id. */
  cluster: string;
  type: 'pillar' | 'spoke';
  /** Leaf slug (spokes). Pillars render at the cluster path and may omit it. */
  slug: LocaleMap;
  title: LocaleMap;
  metaDescription: LocaleMap;
  kicker: LocaleMap;
  h1: LocaleMap;
  answerFirst: LocaleMap;
  sections: RichSection[];
  faq: Array<{ q: LocaleMap; a: LocaleMap }>;
  /** Entities to reinforce for semantic SEO + GEO citeability. */
  keyEntities?: string[];
  /** Related service ids (commercial cross-links). */
  relatedServices?: string[];
  /** Related glossary term ids. */
  relatedGlossary?: string[];
}

export const CLUSTERS: AcademyCluster[] = [
  {
    id: 'foundations', order: 1, status: 'live',
    slug: { de: 'grundlagen', en: 'foundations', it: 'fondamenti', fr: 'fondamentaux' },
    name: { de: 'KI-Grundlagen', en: 'AI Foundations', it: 'Fondamenti di AI', fr: 'Fondamentaux de l’IA' },
    tagline: { de: 'Was KI ist, wie sie funktioniert und wie man sie versteht.', en: 'What AI is, how it works and how to understand it.', it: 'Cos’è l’AI, come funziona e come capirla.', fr: 'Ce qu’est l’IA, comment elle fonctionne et comment la comprendre.' },
  },
  {
    id: 'business-smes', order: 2, status: 'live',
    slug: { de: 'ki-fuer-unternehmen', en: 'ai-for-business', it: 'ai-per-le-imprese', fr: 'ia-pour-entreprises' },
    name: { de: 'KI für Unternehmen & KMU', en: 'AI for Business & SMEs', it: 'AI per aziende e PMI', fr: 'IA pour entreprises et PME' },
    tagline: { de: 'Praktische KI-Anwendung, Implementierung und ROI für Schweizer KMU.', en: 'Practical AI adoption, implementation and ROI for Swiss SMEs.', it: 'Adozione pratica dell’AI, implementazione e ROI per le PMI svizzere.', fr: 'Adoption pratique de l’IA, mise en œuvre et ROI pour les PME suisses.' },
  },
  {
    id: 'agents-automation-voice', order: 3, status: 'live',
    slug: { de: 'agenten-automatisierung', en: 'agents-automation', it: 'agenti-automazione', fr: 'agents-automatisation' },
    name: { de: 'KI-Agenten, Automatisierung & Voice', en: 'AI Agents, Automation & Voice', it: 'Agenti AI, automazione e voce', fr: 'Agents IA, automatisation et voix' },
    tagline: { de: 'Agenten, Automatisierung, Voice AI, Telefonassistenten und Chatbots erklärt.', en: 'Agents, automation, voice AI, phone assistants and chatbots explained.', it: 'Agenti, automazione, voice AI, assistenti telefonici e chatbot spiegati.', fr: 'Agents, automatisation, IA vocale, assistants téléphoniques et chatbots expliqués.' },
  },
  {
    id: 'models-vendors', order: 4, status: 'live',
    slug: { de: 'modelle-anbieter', en: 'models-vendors', it: 'modelli-fornitori', fr: 'modeles-fournisseurs' },
    name: { de: 'KI-Modelle & Anbieter', en: 'AI Models & Vendors', it: 'Modelli e fornitori AI', fr: 'Modèles et fournisseurs IA' },
    tagline: { de: 'ChatGPT, Claude, Gemini, Copilot & Co. – Vergleiche und Auswahl.', en: 'ChatGPT, Claude, Gemini, Copilot & co. – comparisons and how to choose.', it: 'ChatGPT, Claude, Gemini, Copilot & co. – confronti e come scegliere.', fr: 'ChatGPT, Claude, Gemini, Copilot & co. – comparaisons et choix.' },
  },
  {
    id: 'local-opensource', order: 5, status: 'live',
    slug: { de: 'lokale-open-source-ki', en: 'local-open-source', it: 'ai-locale-open-source', fr: 'ia-locale-open-source' },
    name: { de: 'Lokale & Open-Source-KI', en: 'Local & Open-Source AI', it: 'AI locale e open source', fr: 'IA locale et open source' },
    tagline: { de: 'Modelle selbst hosten, Datensouveränität und Open Source.', en: 'Self-hosting models, data sovereignty and open source.', it: 'Ospitare i modelli in proprio, sovranità dei dati e open source.', fr: 'Héberger ses modèles, souveraineté des données et open source.' },
  },
  {
    id: 'trust-security-privacy-regulation', order: 6, status: 'live',
    slug: { de: 'sicherheit-datenschutz-regulierung', en: 'security-privacy-regulation', it: 'sicurezza-privacy-normative', fr: 'securite-confidentialite-reglementation' },
    name: { de: 'Sicherheit, Datenschutz & Regulierung', en: 'AI Security, Privacy & Regulation', it: 'Sicurezza, privacy e normative AI', fr: 'Sécurité, confidentialité et réglementation' },
    tagline: { de: 'KI-Sicherheit, Datenschutz, revDSG, EU AI Act und KI in der Schweiz.', en: 'AI security, privacy, revDSG, the EU AI Act and AI in Switzerland.', it: 'Sicurezza AI, privacy, nLPD, EU AI Act e AI in Svizzera.', fr: 'Sécurité de l’IA, confidentialité, nLPD, EU AI Act et l’IA en Suisse.' },
  },
  {
    id: 'marketing-seo-geo', order: 7, status: 'live',
    slug: { de: 'marketing-seo-geo', en: 'marketing-seo-geo', it: 'marketing-seo-geo', fr: 'marketing-seo-geo' },
    name: { de: 'KI-Marketing, SEO & GEO', en: 'AI Marketing, SEO & GEO', it: 'AI marketing, SEO e GEO', fr: 'Marketing IA, SEO et GEO' },
    tagline: { de: 'Sichtbar werden in Google und in KI-Antwortmaschinen.', en: 'Getting found in Google and in AI answer engines.', it: 'Farsi trovare su Google e nei motori di risposta AI.', fr: 'Se faire trouver sur Google et dans les moteurs de réponse IA.' },
  },
  // Note: an Academy "AI by Industry" cluster is intentionally NOT built — the
  // 16 dedicated commercial Industry pages (/branchen/) already serve per-sector
  // AI content; a parallel informational cluster would duplicate them and risk
  // keyword cannibalization. Sector depth lives under the Industries pillar.
  {
    id: 'functions', order: 8, status: 'live',
    slug: { de: 'ki-nach-funktion', en: 'ai-by-function', it: 'ai-per-funzione', fr: 'ia-par-fonction' },
    name: { de: 'KI nach Funktion', en: 'AI by Function', it: 'AI per funzione', fr: 'IA par fonction' },
    tagline: { de: 'KI in Vertrieb, Support, HR, Finanzen und mehr.', en: 'AI in sales, support, HR, finance and more.', it: 'AI in vendite, supporto, HR, finanza e altro.', fr: 'L’IA dans les ventes, le support, les RH, la finance et plus.' },
  },
];

// Articles authored as JSON data files (one per article).
const generated = import.meta.glob<{ default: AcademyArticle }>('./academy-content/*.json', { eager: true });
export const ARTICLES: AcademyArticle[] = Object.values(generated)
  .map((m) => m.default)
  .filter((a): a is AcademyArticle => !!a && !!a.id);

export function getCluster(id: string): AcademyCluster | undefined {
  return CLUSTERS.find((c) => c.id === id);
}
export function clusterPaths(c: AcademyCluster): LocalePaths {
  return underPillar('academy', c.slug);
}
export function articlesByCluster(clusterId: string): AcademyArticle[] {
  return ARTICLES.filter((a) => a.cluster === clusterId);
}
export function pillarOf(clusterId: string): AcademyArticle | undefined {
  return ARTICLES.find((a) => a.cluster === clusterId && a.type === 'pillar');
}
export function spokesOf(clusterId: string): AcademyArticle[] {
  return ARTICLES.filter((a) => a.cluster === clusterId && a.type === 'spoke');
}
export function articlePaths(a: AcademyArticle): LocalePaths {
  const c = getCluster(a.cluster)!;
  return a.type === 'pillar' ? clusterPaths(c) : underPillarNested('academy', c.slug, a.slug);
}

/** Clusters that have a published pillar article. */
export function liveClusters(): AcademyCluster[] {
  return CLUSTERS.filter((c) => c.status === 'live' && pillarOf(c.id)).sort((a, b) => a.order - b.order);
}
export const orderedClusters = (): AcademyCluster[] => [...CLUSTERS].sort((a, b) => a.order - b.order);
