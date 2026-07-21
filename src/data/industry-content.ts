/**
 * Weissmann AI — long-form content for the industry (sector) landing pages.
 *
 * The IndustryPage template renders from this model + industries.ts (identity +
 * related services). Each page explains the sector's challenges, AI
 * opportunities, relevant services, illustrative implementation examples and
 * FAQs (docs/architecture/MASTER-PAGE-MAP.md §4/§5).
 *
 * Guardrails: never invent customers, results, statistics or integrations.
 * Implementation examples are illustrative and must read as such — not as
 * unverified case studies. Real case studies live in Resources when confirmed.
 */
import type { Locale } from './site';
import type { LocaleMap } from './routes';
import type { RichSection } from './service-content';

export interface IndustryContent {
  id: string;
  title: LocaleMap;
  metaDescription: LocaleMap;
  kicker: LocaleMap;
  h1: LocaleMap;
  /** Answer-first 40–60 word summary of how AI helps this sector. */
  answerFirst: LocaleMap;
  /** Sector challenges (bullets). */
  challenges: LocaleMap[];
  /** AI opportunities as {title,text} cards. */
  opportunities: Array<{ title: LocaleMap; text: LocaleMap }>;
  /** Illustrative implementation examples / how it works (no invented results). */
  sections: RichSection[];
  faq: Array<{ q: LocaleMap; a: LocaleMap }>;
}

export const INDUSTRY_CONTENT: Record<string, IndustryContent> = {};

// Industry content authored as JSON data files (one per industry); the JSON
// shape matches IndustryContent exactly, so sectors drop in as data.
const generated = import.meta.glob<{ default: IndustryContent }>('./industry-content/*.json', { eager: true });
for (const mod of Object.values(generated)) {
  const c = mod.default;
  if (c && c.id) INDUSTRY_CONTENT[c.id] = c;
}

export function getIndustryContent(id: string): IndustryContent | undefined {
  return INDUSTRY_CONTENT[id];
}
