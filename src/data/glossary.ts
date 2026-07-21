/**
 * Weissmann AI — AI Glossary registry (the entity backbone of the Academy).
 *
 * Lives under the Academy pillar at /ki-academy/glossar/{term}/. Each term is
 * an atomic, answer-first, schema-marked (DefinedTerm) definition — the prime
 * surface for AI citation and the internal-linking spine every article deep-
 * links into. Terms are authored as JSON data files in ./glossary-content/*.json
 * and loaded via import.meta.glob, so the glossary scales as data.
 */
import { GLOSSARY_SEGMENT, SEGMENTS, paths, type LocaleMap, type LocalePaths } from './routes';
import type { Locale } from './site';

export interface GlossaryTerm {
  id: string;
  /** URL slug per locale (usually the same for international technical terms). */
  slug: LocaleMap;
  /** Display term per locale. */
  term: LocaleMap;
  /** Answer-first 1–2 sentence definition (the citeable core). */
  definition: LocaleMap;
  /** Optional 2–3 sentence "in practice / why it matters". */
  extended?: LocaleMap;
  /** Related glossary term ids. */
  relatedTerms?: string[];
  /** Related service ids (commercial cross-link). */
  relatedServices?: string[];
  /** Related Academy article ids. */
  relatedArticles?: string[];
}

const generated = import.meta.glob<{ default: GlossaryTerm }>('./glossary-content/*.json', { eager: true });
export const GLOSSARY: GlossaryTerm[] = Object.values(generated)
  .map((m) => m.default)
  .filter((t): t is GlossaryTerm => !!t && !!t.id);

export const hasGlossary = (): boolean => GLOSSARY.length > 0;

/** /ki-academy/glossar/ (localized). */
export function glossaryHubPaths(): LocalePaths {
  return paths(SEGMENTS.academy, GLOSSARY_SEGMENT);
}
/** /ki-academy/glossar/{term}/ (localized). */
export function termPaths(t: GlossaryTerm): LocalePaths {
  return paths(SEGMENTS.academy, GLOSSARY_SEGMENT, t.slug);
}
export function getTerm(id: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.id === id);
}
/** Terms sorted alphabetically by their localized display name. */
export function orderedTerms(locale: Locale): GlossaryTerm[] {
  return [...GLOSSARY].sort((a, b) => a.term[locale].localeCompare(b.term[locale], locale));
}
