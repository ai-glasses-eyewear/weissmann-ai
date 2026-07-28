/**
 * Weissmann AI — Case Studies registry (future-ready infrastructure only).
 *
 * NO case studies are published yet. This file defines the data model, the
 * category taxonomy and the loader so a verified example can be dropped in
 * later as a single JSON file — no template or routing change needed, exactly
 * like comparisons.ts and resource-content.ts.
 *
 * Guardrails (do not violate when authoring future content):
 *  - every field must be a real, verifiable fact about a real client engagement
 *  - never invent client names, logos, quotes, before/after numbers or results
 *  - a case study may only be added once the business has explicit permission
 *    from the client to publish their story
 *  - until then this registry stays empty on purpose, so liveCaseStudies()
 *    returns [] and the catch-all route emits zero pages — nothing is shown.
 */
import { paths, type LocaleMap, type LocalePaths } from './routes';
import type { RichSection } from './service-content';

/** Category taxonomy for future case studies (used for filtering/related-content). */
export type CaseStudyCategory =
  | 'phone-assistant' | 'restaurant' | 'hotel' | 'clinic' | 'website-redesign'
  | 'seo-growth' | 'geo-visibility' | 'automation';

export interface CaseStudyDef {
  id: string;
  order: number;
  status: 'live' | 'draft';
  category: CaseStudyCategory;
  /** Single localized URL segment (flat, no pillar — matches comparisons.ts). */
  slug: LocaleMap;
  name: LocaleMap;
  /** Related service id (services.ts) for cross-linking + breadcrumbs. */
  relatedService: string;
}

export interface CaseStudyContent {
  id: string;
  title: LocaleMap;
  metaDescription: LocaleMap;
  kicker: LocaleMap;
  h1: LocaleMap;
  /** Named, permission-cleared client — or an anonymized descriptor if the
   *  client preferred not to be named (e.g. "a family-run hotel in Ticino"). */
  clientLabel: LocaleMap;
  clientProblem: LocaleMap;
  startingSituation: LocaleMap;
  workCompleted: RichSection[];
  process: LocaleMap;
  /** Only metrics the client has explicitly verified/approved for publication. */
  verifiedResult: LocaleMap;
  quote?: { text: LocaleMap; attribution: LocaleMap };
  /** Links to supporting evidence (a live page, a public review, etc.) — never fabricated. */
  evidence?: { label: LocaleMap; href: string }[];
  faq: Array<{ q: LocaleMap; a: LocaleMap }>;
}

export const CASE_STUDIES: CaseStudyDef[] = [
  // Intentionally empty — see file header. Add a real, permission-cleared
  // case study here (status: 'live') only once its matching JSON content
  // file exists in ./case-study-content/.
];

const generated = import.meta.glob<{ default: CaseStudyContent }>('./case-study-content/*.json', { eager: true });
export const CASE_STUDY_CONTENT: Record<string, CaseStudyContent> = {};
for (const mod of Object.values(generated)) {
  const c = mod.default;
  if (c && c.id) CASE_STUDY_CONTENT[c.id] = c;
}

export function caseStudyPaths(c: CaseStudyDef): LocalePaths {
  return paths(c.slug);
}

/** The case-studies hub itself is a flat localized page (no pillar segment),
 *  only ever routed once liveCaseStudies().length > 0 — see [...path].astro. */
export const CASE_STUDIES_HUB_SLUG: LocaleMap = { de: 'referenzen', en: 'case-studies', it: 'referenze', fr: 'references' };
export function caseStudiesHubPaths(): LocalePaths {
  return paths(CASE_STUDIES_HUB_SLUG);
}
export function getCaseStudyContent(id: string): CaseStudyContent | undefined {
  return CASE_STUDY_CONTENT[id];
}
/** Live only when BOTH the registry entry and its content file exist. */
export const liveCaseStudies = (): CaseStudyDef[] =>
  CASE_STUDIES.filter((c) => c.status === 'live' && CASE_STUDY_CONTENT[c.id]).sort((a, b) => a.order - b.order);

export const CASE_STUDY_CATEGORIES: CaseStudyCategory[] = [
  'phone-assistant', 'restaurant', 'hotel', 'clinic', 'website-redesign', 'seo-growth', 'geo-visibility', 'automation',
];
