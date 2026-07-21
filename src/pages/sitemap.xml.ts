/**
 * XML sitemap — registry-driven. Enumerates every indexable page (home, the
 * Services + Industries hubs, all live service + industry pages, and the core
 * company/pricing pages) across the four locales with localized URLs and
 * xhtml:link hreflang alternates (x-default → English). Noindex pages (danke,
 * legal drafts, 404) and legacy duplicate URLs are deliberately excluded.
 */
import type { APIRoute } from 'astro';
import { SITE, LOCALES } from '../data/site';
import { HOME_PATHS, pillarHome, urlFor, type LocalePaths } from '../data/routes';
import { liveServices, servicePaths } from '../data/services';
import { liveIndustries, industryPaths } from '../data/industries';
import { liveClusters, clusterPaths, pillarOf, spokesOf, articlePaths } from '../data/academy';
import { hasGlossary, glossaryHubPaths, termPaths, GLOSSARY } from '../data/glossary';
import { liveResources, resourcePaths } from '../data/resources';
import { liveCompanyPages, companyPagePaths } from '../data/company';

/** Legacy same-slug page (identical path in every locale) as LocalePaths. */
const sameSlug = (path: string): LocalePaths => ({ de: path, en: path, it: path, fr: path });

function academyPages(): LocalePaths[] {
  const pages: LocalePaths[] = [pillarHome('academy')];
  for (const cl of liveClusters()) {
    pages.push(clusterPaths(cl)); // cluster pillar page
    for (const sp of spokesOf(cl.id)) pages.push(articlePaths(sp));
  }
  if (hasGlossary()) {
    pages.push(glossaryHubPaths());
    for (const term of GLOSSARY) pages.push(termPaths(term));
  }
  return pages;
}

function indexablePages(): LocalePaths[] {
  return [
    HOME_PATHS,
    pillarHome('services'),
    ...liveServices().map(servicePaths),
    pillarHome('industries'),
    ...liveIndustries().map(industryPaths),
    ...academyPages(),
    pillarHome('resources'),
    ...liveResources().map(resourcePaths),
    ...liveCompanyPages().map(companyPagePaths),
    sameSlug('/preise/'),
    sameSlug('/ueber-uns/'),
    sameSlug('/kontakt/'),
  ];
}
// pillarOf is imported for parity with academy article listing; referenced to keep the import used.
void pillarOf;

export const GET: APIRoute = () => {
  const urls = indexablePages().flatMap((lp) =>
    LOCALES.map((locale) => {
      const loc = urlFor(locale, lp);
      const alternates = LOCALES.map(
        (l) => `    <xhtml:link rel="alternate" hreflang="${l === 'de' ? 'de-CH' : l}" href="${urlFor(l, lp)}"/>`,
      ).join('\n');
      const xdefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor('en', lp)}"/>`;
      return `  <url>\n    <loc>${loc}</loc>\n${alternates}\n${xdefault}\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

// Keep a reference to SITE so the domain stays the single source of truth.
void SITE;
