/**
 * Weissmann AI — content for checklist-type Resources (readiness, compliance,
 * GEO audit …). Rendered by ChecklistResourcePage. Authored as JSON data files
 * in ./resource-content/*.json (matching ChecklistContent).
 *
 * Guardrails: checklists give practical guidance, not legal advice or invented
 * facts; compliance checklists point to the real law (revDSG, EU AI Act) and
 * recommend professional review where appropriate.
 */
import type { Locale } from './site';
import type { LocaleMap } from './routes';

export interface ChecklistContent {
  id: string;
  title: LocaleMap;
  metaDescription: LocaleMap;
  kicker: LocaleMap;
  h1: LocaleMap;
  intro: LocaleMap;
  sections: Array<{ heading: LocaleMap; items: LocaleMap[] }>;
  faq?: Array<{ q: LocaleMap; a: LocaleMap }>;
}

export const CHECKLIST_CONTENT: Record<string, ChecklistContent> = {};
const generated = import.meta.glob<{ default: ChecklistContent }>('./resource-content/*.json', { eager: true });
for (const mod of Object.values(generated)) {
  const c = mod.default;
  if (c && c.id) CHECKLIST_CONTENT[c.id] = c;
}

export function getChecklistContent(id: string): ChecklistContent | undefined {
  return CHECKLIST_CONTENT[id];
}
export function countItems(c: ChecklistContent): number {
  return c.sections.reduce((n, s) => n + s.items.length, 0);
}
export type { Locale };
