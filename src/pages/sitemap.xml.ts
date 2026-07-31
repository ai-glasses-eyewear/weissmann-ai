/**
 * XML sitemap — registry-driven. Enumerates every indexable page (home, the
 * Services + Industries hubs, all live service + industry pages, and the core
 * company/pricing pages) across the four locales with localized URLs and
 * xhtml:link hreflang alternates (x-default → English). Noindex pages (danke,
 * legal drafts, 404) and legacy duplicate URLs are deliberately excluded.
 */
import type { APIRoute } from 'astro';
import { LOCALES, type Locale } from '../data/site';
import { HOME_PATHS, pillarHome, urlFor, type LocalePaths } from '../data/routes';
import { CONTENT_DATE } from '../data/schema';
import { liveServices, servicePaths } from '../data/services';
import { liveIndustries, industryPaths } from '../data/industries';
import { liveClusters, clusterPaths, pillarOf, spokesOf, articlePaths, articleLanguages } from '../data/academy';
import { hasGlossary, glossaryHubPaths, termPaths, GLOSSARY } from '../data/glossary';
import { liveResources, resourcePaths } from '../data/resources';
import { liveTools, toolPaths, toolsHubPaths, toolLocales } from '../data/tools';
import { liveCompanyPages, companyPagePaths } from '../data/company';
import { liveComparisons, comparisonPaths } from '../data/comparisons';
import { liveCaseStudies, caseStudyPaths, caseStudiesHubPaths } from '../data/case-studies';

/** Legacy same-slug page (identical path in every locale) as LocalePaths. */
const sameSlug = (path: string): LocalePaths => ({ de: path, en: path, it: path, fr: path });

/** A sitemap entry + the locales it's actually indexable in. Almost every
 *  entry is all four; academy articles may be narrower (see academy.ts) —
 *  carrying `languages` per-entry means a future DE/EN/IT-only article never
 *  gets a sitemap URL or hreflang alternate for a locale it doesn't have. */
interface Entry { lp: LocalePaths; languages: Locale[] }
const full = (lp: LocalePaths): Entry => ({ lp, languages: LOCALES });

function academyPages(): Entry[] {
  const pages: Entry[] = [full(pillarHome('academy'))];
  for (const cl of liveClusters()) {
    const pillar = pillarOf(cl.id);
    if (pillar) pages.push({ lp: clusterPaths(cl), languages: articleLanguages(pillar) });
    for (const sp of spokesOf(cl.id)) pages.push({ lp: articlePaths(sp), languages: articleLanguages(sp) });
  }
  if (hasGlossary()) {
    pages.push(full(glossaryHubPaths()));
    for (const term of GLOSSARY) pages.push(full(termPaths(term)));
  }
  return pages;
}

function indexablePages(): Entry[] {
  return [
    full(HOME_PATHS),
    full(pillarHome('services')),
    ...liveServices().map(servicePaths).map(full),
    full(pillarHome('industries')),
    ...liveIndustries().map(industryPaths).map(full),
    ...academyPages(),
    full(pillarHome('resources')),
    ...liveResources().map(resourcePaths).map(full),
    { lp: toolsHubPaths(), languages: toolLocales() },
    ...liveTools().map((t) => ({ lp: toolPaths(t), languages: [t.lang] as Locale[] })),
    ...liveCompanyPages().map(companyPagePaths).map(full),
    ...liveComparisons().map(comparisonPaths).map(full),
    // Case studies: emits nothing until the first verified case is live.
    ...(liveCaseStudies().length > 0 ? [full(caseStudiesHubPaths()), ...liveCaseStudies().map(caseStudyPaths).map(full)] : []),
    full(sameSlug('/preise/')),
    full(sameSlug('/ueber-uns/')),
    full(sameSlug('/kontakt/')),
  ];
}

export const GET: APIRoute = () => {
  const urls = indexablePages().flatMap(({ lp, languages }) =>
    languages.map((locale) => {
      const loc = urlFor(locale, lp);
      const alternates = languages.map(
        (l) => `    <xhtml:link rel="alternate" hreflang="${l === 'de' ? 'de-CH' : l}" href="${urlFor(l, lp)}"/>`,
      ).join('\n');
      const xdefaultLocale = languages.includes('en') ? 'en' : languages[0];
      const xdefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(xdefaultLocale, lp)}"/>`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${CONTENT_DATE}</lastmod>\n${alternates}\n${xdefault}\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
