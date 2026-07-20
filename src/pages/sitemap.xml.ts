/**
 * XML sitemap for all indexable pages across the four locales, with
 * xhtml:link hreflang alternates. Noindex pages (danke, legal drafts, 404)
 * are deliberately excluded.
 */
import type { APIRoute } from 'astro';
import { SITE, LOCALES, localePrefix } from '../data/site';

const INDEXABLE_PATHS = [
  '/',
  '/ki-telefonassistent/',
  '/leistungen/ai-websites/',
  '/preise/',
  '/ueber-uns/',
  '/kontakt/',
];

export const GET: APIRoute = () => {
  const urls = INDEXABLE_PATHS.flatMap((path) =>
    LOCALES.map((locale) => {
      const loc = `${SITE.domain}${localePrefix(locale)}${path}`;
      const alternates = LOCALES.map(
        (l) =>
          `    <xhtml:link rel="alternate" hreflang="${l === 'de' ? 'de-CH' : l}" href="${SITE.domain}${localePrefix(l)}${path}"/>`
      ).join('\n');
      const xdefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE.domain}${path}"/>`;
      return `  <url>\n    <loc>${loc}</loc>\n${alternates}\n${xdefault}\n  </url>`;
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
