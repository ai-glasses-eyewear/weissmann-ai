/**
 * Weissmann AI — Company pillar pages (trust / E-E-A-T layer).
 *
 * Company is a navigation cluster, not a URL silo: its pages live flat at the
 * localized root (/methodik/, /technologie/, /datensicherheit/ …). Content is
 * authored as JSON data files in ./company-content/*.json (matching
 * CompanyContent). The "Privacy & Security" trust page (/datensicherheit/) is
 * distinct from the legal privacy policy (/datenschutz/).
 */
import { paths, type LocaleMap, type LocalePaths } from './routes';
import type { RichSection } from './service-content';

export interface CompanyPageDef {
  id: string;
  order: number;
  status: 'live' | 'draft';
  /** Single localized URL segment (flat, no pillar). */
  slug: LocaleMap;
  name: LocaleMap;
}

export interface CompanyContent {
  id: string;
  title: LocaleMap;
  metaDescription: LocaleMap;
  kicker: LocaleMap;
  h1: LocaleMap;
  intro: LocaleMap;
  /** Optional ordered process steps (renders a HowTo). */
  howToSteps?: Array<{ name: LocaleMap; text: LocaleMap }>;
  sections: RichSection[];
  faq?: Array<{ q: LocaleMap; a: LocaleMap }>;
}

export const COMPANY_PAGES: CompanyPageDef[] = [
  {
    id: 'methodology', order: 1, status: 'live',
    slug: { de: 'methodik', en: 'methodology', it: 'metodologia', fr: 'methodologie' },
    name: { de: 'Methodik', en: 'Methodology', it: 'Metodologia', fr: 'Méthodologie' },
  },
  {
    id: 'technology', order: 2, status: 'live',
    slug: { de: 'technologie', en: 'technology', it: 'tecnologia', fr: 'technologie' },
    name: { de: 'Technologie', en: 'Technology', it: 'Tecnologia', fr: 'Technologie' },
  },
  {
    id: 'data-security', order: 3, status: 'live',
    slug: { de: 'datensicherheit', en: 'data-security', it: 'sicurezza-dei-dati', fr: 'securite-des-donnees' },
    name: { de: 'Datensicherheit', en: 'Data Security', it: 'Sicurezza dei dati', fr: 'Sécurité des données' },
  },
];

const generated = import.meta.glob<{ default: CompanyContent }>('./company-content/*.json', { eager: true });
export const COMPANY_CONTENT: Record<string, CompanyContent> = {};
for (const mod of Object.values(generated)) {
  const c = mod.default;
  if (c && c.id) COMPANY_CONTENT[c.id] = c;
}

export function companyPagePaths(c: CompanyPageDef): LocalePaths {
  return paths(c.slug);
}
export function getCompanyContent(id: string): CompanyContent | undefined {
  return COMPANY_CONTENT[id];
}
export const liveCompanyPages = (): CompanyPageDef[] =>
  COMPANY_PAGES.filter((c) => c.status === 'live' && COMPANY_CONTENT[c.id]).sort((a, b) => a.order - b.order);
export const orderedCompanyPages = (): CompanyPageDef[] => [...COMPANY_PAGES].sort((a, b) => a.order - b.order);
