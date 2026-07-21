/**
 * llms.txt — a concise, always-current map of the site for AI assistants
 * (GEO / AI discoverability). Registry-driven: services, industries and the
 * AI Academy are listed from the same source of truth as the pages, and prices
 * come from pricing.ts, so it never drifts. German canonical URLs are listed;
 * the four language roots and the full sitemap are linked for completeness.
 */
import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { getPackage, formatPrice } from '../data/pricing';
import { urlFor, pillarHome } from '../data/routes';
import { orderedServices, servicePaths } from '../data/services';
import { orderedIndustries } from '../data/industries';
import { orderedClusters, clusterPaths, liveClusters, pillarOf, spokesOf, articlePaths } from '../data/academy';

const p = (id: string) => {
  const pkg = getPackage(id);
  return pkg.price === null ? 'auf Anfrage' : formatPrice(pkg.price);
};
const deUrl = (lp: { de: string; en: string; it: string; fr: string }) => urlFor('de', lp);

export const GET: APIRoute = () => {
  const services = orderedServices();
  const industries = orderedIndustries();

  const intro = `# Weissmann AI (weissmann.ai)

> Weissmann AI hilft Unternehmen in der Schweiz, mit praktischer Kuenstlicher Intelligenz mehr Kunden zu gewinnen, jede Anfrage zu beantworten und Ablaeufe zu automatisieren. Kernleistungen: KI-Telefonassistent (Starter ${p('phone-starter')}/Monat, Premium ${p('phone-premium')}/Monat), KI-Webentwicklung (${p('website-starter')} bis ab ${p('website-complex')}), SEO Growth (${p('seo-growth')}/Monat), GEO Authority (${p('geo-authority')}/Monat), Google Ads Growth (${p('ads-growth')}/Monat, Werbebudget separat), KI-Automatisierung, KI-Agenten, KI-Integrationen und KI-Beratung (auf Anfrage). Alle Preise exkl. MwSt. Kontakt: ${SITE.email}, ${SITE.phoneDisplay}. Adresse: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, Schweiz. Gruenderin und CEO: Giovanna Carpi; Mitgruender: Nicola Moessner.

Sprachen / Languages: Deutsch (Standard, /), English (/en/), Italiano (/it/), Francais (/fr/). URLs sind extensionslos mit Schraegstrich am Ende und je Sprache lokalisiert.`;

  const servicesList = [
    `## Leistungen (Services)`,
    `- [Alle Leistungen](${deUrl(pillarHome('services'))})`,
    ...services.map((s) => `- [${s.name.de}](${deUrl(servicePaths(s))}): ${s.tagline.de}`),
  ].join('\n');

  const industriesList = [
    `## Branchen (Industries)`,
    `- [Alle Branchen](${deUrl(pillarHome('industries'))})`,
    ...industries.map((i) => `- ${i.name.de}`),
  ].join('\n');

  const academyLines: string[] = [`## AI Academy (Wissen)`, `- [AI Academy](${deUrl(pillarHome('academy'))}): verstaendliche, faktenbasierte Wissensartikel zu KI aus Schweizer Perspektive`];
  for (const cl of orderedClusters()) {
    const isLive = liveClusters().some((x) => x.id === cl.id);
    if (isLive) {
      academyLines.push(`- [${cl.name.de}](${deUrl(clusterPaths(cl))}): ${cl.tagline.de}`);
      for (const sp of spokesOf(cl.id)) academyLines.push(`  - [${sp.h1.de}](${deUrl(articlePaths(sp))})`);
    }
  }
  const academyList = academyLines.join('\n');

  const company = [
    `## Unternehmen & Kontakt`,
    `- [Preise](${SITE.domain}/preise/): alle Pakete transparent mit Umfang und Vertragslaufzeiten`,
    `- [Ueber uns](${SITE.domain}/ueber-uns/): Mission, die Weissmann AI Methode, Team`,
    `- [Kontakt](${SITE.domain}/kontakt/): Beratung, Demo, Telefon, WhatsApp`,
  ].join('\n');

  const facts = `## Wichtige Fakten (Ehrlichkeit)
- Der KI-Telefonassistent gibt keine medizinische Beratung, keine Diagnosen und keine Notfall-Triage; dringende und medizinische Anliegen werden nach definierten Regeln an Menschen weitergeleitet.
- Weissmann AI verspricht keine Google-Rankings, keine Backlinks und keine garantierten KI-Zitierungen; aufgebaut werden die technischen, inhaltlichen und Autoritaets-Grundlagen fuer Sichtbarkeit.
- Google-Werbebudget ist in den Google-Ads-Paketen nicht enthalten und wird vom Kunden direkt bezahlt.
- Preise stammen aus einer zentralen Konfiguration; Leistungen ohne festen Preis werden ausschliesslich auf Anfrage angeboten.`;

  const langs = `## Andere Sprachen / Other languages
- English: ${SITE.domain}/en/
- Italiano: ${SITE.domain}/it/
- Francais: ${SITE.domain}/fr/
- Sitemap: ${SITE.domain}/sitemap.xml`;

  const body = [intro, servicesList, industriesList, academyList, company, facts, langs].join('\n\n') + '\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
