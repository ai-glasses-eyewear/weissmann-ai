/**
 * Weissmann AI — Comparison pages (decision-stage "vs. the alternatives"
 * content). A comparison is a flat, top-level localized page (like the Company
 * pages) that pits a Weissmann service against its honest alternatives across a
 * real comparison table, narrative sections and an FAQ — the conversion +
 * SEO + AI-search surface for buyers who already know the category and are
 * choosing an option.
 *
 * Content is authored as JSON data files in ./comparison-content/*.json
 * (matching ComparisonContent) and auto-globbed, so a new comparison drops in
 * as data + one registry entry — no template change. Rendered by
 * ComparisonPage.astro through the registry-driven catch-all route, so
 * canonical, hreflang, sitemap and schema all derive from the same source.
 *
 * Guardrails: truthful only. Never name or disparage specific competitor
 * companies (compare CATEGORIES); never invent prices, customers, reviews or
 * metrics; use a neutral phrase ("varies") where a value is genuinely uncertain
 * for a generic alternative rather than inventing a number.
 */
import { paths, type LocaleMap, type LocalePaths } from './routes';
import type { RichSection } from './service-content';

export interface ComparisonPageDef {
  id: string;
  order: number;
  status: 'live' | 'draft';
  /** Single localized URL segment (flat, no pillar). */
  slug: LocaleMap;
  name: LocaleMap;
}

/** One row of the comparison table: a dimension label + one cell per column. */
export interface ComparisonRow {
  label: LocaleMap;
  /** Cell values, one per `columns` entry, in order. */
  cells: LocaleMap[];
}

/** The comparison matrix. `columns` are the option headers; the first
 *  (dimension) header is a fixed localized label supplied by the template. */
export interface ComparisonTable {
  heading: LocaleMap;
  caption?: LocaleMap;
  columns: LocaleMap[];
  rows: ComparisonRow[];
}

export interface ComparisonContent {
  id: string;
  title: LocaleMap;
  metaDescription: LocaleMap;
  kicker: LocaleMap;
  h1: LocaleMap;
  /** Answer-first 40–60 word summary (the passage AI engines lift + cite). */
  answerFirst: LocaleMap;
  intro: LocaleMap;
  table: ComparisonTable;
  /** Narrative sections (problem / trade-offs / honest verdict). */
  sections: RichSection[];
  faq: Array<{ q: LocaleMap; a: LocaleMap }>;
  /** Related service ids (commercial cross-links). */
  relatedServices?: string[];
}

export const COMPARISON_PAGES: ComparisonPageDef[] = [
  {
    id: 'phone-assistant-vs-alternatives',
    order: 1,
    status: 'live',
    slug: {
      de: 'ki-telefonassistent-vergleich',
      en: 'ai-phone-assistant-comparison',
      it: 'assistente-telefonico-ai-confronto',
      fr: 'assistant-telephonique-ia-comparatif',
    },
    name: {
      de: 'KI-Telefonassistent im Vergleich',
      en: 'AI phone assistant compared',
      it: 'Assistente telefonico AI a confronto',
      fr: 'Assistant téléphonique IA comparé',
    },
  },
];

const generated = import.meta.glob<{ default: ComparisonContent }>('./comparison-content/*.json', { eager: true });
export const COMPARISON_CONTENT: Record<string, ComparisonContent> = {};
for (const mod of Object.values(generated)) {
  const c = mod.default;
  if (c && c.id) COMPARISON_CONTENT[c.id] = c;
}

export function comparisonPaths(c: ComparisonPageDef): LocalePaths {
  return paths(c.slug);
}
export function getComparisonContent(id: string): ComparisonContent | undefined {
  return COMPARISON_CONTENT[id];
}
export const liveComparisons = (): ComparisonPageDef[] =>
  COMPARISON_PAGES.filter((c) => c.status === 'live' && COMPARISON_CONTENT[c.id]).sort((a, b) => a.order - b.order);
