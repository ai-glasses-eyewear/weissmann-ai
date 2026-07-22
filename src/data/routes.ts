/**
 * Weissmann AI — localized route registry (single source of truth for URLs).
 *
 * The site uses siloed, FULLY LOCALIZED slugs per language (the long-term
 * architecture from docs/architecture/MASTER-PAGE-MAP.md §3). German is the
 * default locale at the root; en/it/fr carry a locale prefix.
 *
 * A page's identity is a `LocalePaths` object: the path (leading + trailing
 * slash, WITHOUT the locale prefix) for each of the four locales. `localeUrl`
 * / `localePrefix` (from site.ts) add the prefix to form the final URL.
 *
 *   underPillar('services', { de:'ki-telefonassistent', en:'ai-phone-assistant', … })
 *     → { de:'/leistungen/ki-telefonassistent/', en:'/services/ai-phone-assistant/', … }
 *     → DE url  https://weissmann.ai/leistungen/ki-telefonassistent/
 *     → EN url  https://weissmann.ai/en/services/ai-phone-assistant/
 *
 * Everything downstream — hreflang alternates, the language switcher, the
 * static-path generation for the catch-all route, breadcrumbs and sitemaps —
 * derives from this module, so nothing drifts.
 */
import { LOCALES, localePrefix, SITE, type Locale } from './site';

/** A value provided in all four languages. */
export type LocaleMap = Record<Locale, string>;

/** A page's path per locale (leading + trailing slash, no locale prefix). */
export type LocalePaths = Record<Locale, string>;

/** Top-level pillars that own a URL silo. */
export type Pillar = 'services' | 'industries' | 'academy' | 'resources';

/** Localized URL segment for each pillar (docs/architecture/MASTER-PAGE-MAP.md §3.1). */
export const SEGMENTS: Record<Pillar, LocaleMap> = {
  services: { de: 'leistungen', en: 'services', it: 'servizi', fr: 'services' },
  industries: { de: 'branchen', en: 'industries', it: 'settori', fr: 'secteurs' },
  academy: { de: 'ki-academy', en: 'ai-academy', it: 'ai-academy', fr: 'academie-ia' },
  resources: { de: 'ressourcen', en: 'resources', it: 'risorse', fr: 'ressources' },
};

/** Localized segment for the glossary, which lives under the Academy pillar. */
export const GLOSSARY_SEGMENT: LocaleMap = {
  de: 'glossar',
  en: 'glossary',
  it: 'glossario',
  fr: 'glossaire',
};

function joinSegments(segments: string[]): string {
  const parts = segments.filter((s) => s && s.length > 0);
  return parts.length ? `/${parts.join('/')}/` : '/';
}

/** Compose a LocalePaths from ordered localized segments (each a LocaleMap). */
export function paths(...segments: LocaleMap[]): LocalePaths {
  const out = {} as LocalePaths;
  for (const l of LOCALES) out[l] = joinSegments(segments.map((s) => s[l]));
  return out;
}

/** Path for a page directly under a pillar, from a per-locale leaf slug. */
export function underPillar(pillar: Pillar, leaf: LocaleMap): LocalePaths {
  return paths(SEGMENTS[pillar], leaf);
}

/** Path for a page two levels under a pillar (e.g. service × industry). */
export function underPillarNested(pillar: Pillar, first: LocaleMap, second: LocaleMap): LocalePaths {
  return paths(SEGMENTS[pillar], first, second);
}

/** The pillar hub page itself (e.g. /leistungen/, /en/services/). */
export function pillarHome(pillar: Pillar): LocalePaths {
  return paths(SEGMENTS[pillar]);
}

/** The site root, identical across locales (the locale prefix differentiates). */
export const HOME_PATHS: LocalePaths = { de: '/', en: '/', it: '/', fr: '/' };

/** Site-absolute URL for one locale of a page. */
export function urlFor(locale: Locale, lp: LocalePaths): string {
  return `${SITE.domain}${localePrefix(locale)}${lp[locale]}`;
}

/** Root-relative URL for one locale of a page (for in-page href attributes). */
export function relFor(locale: Locale, lp: LocalePaths): string {
  return `${localePrefix(locale)}${lp[locale]}`;
}

/**
 * The Astro getStaticPaths `path` param for one locale of a page: the full
 * path INCLUDING the locale prefix, with no leading/trailing slash.
 *   de '/leistungen/ki-telefonassistent/' → 'leistungen/ki-telefonassistent'
 *   en '/services/ai-phone-assistant/'    → 'en/services/ai-phone-assistant'
 *   de '/'                                → ''  (home)
 */
export function routeParam(locale: Locale, lp: LocalePaths): string {
  return `${localePrefix(locale)}${lp[locale]}`.replace(/^\/+/, '').replace(/\/+$/, '');
}
