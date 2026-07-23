/**
 * llms.txt — a concise, always-current map of the site for AI answer engines
 * (GEO / AI discoverability: ChatGPT, Perplexity, Gemini, Google AI Overviews,
 * Claude). Registry-driven: services, industries, resources and the AI Academy
 * are listed from the same source of truth as the pages, and every price and
 * contract term comes from pricing.ts, so this file can never drift from the
 * live site. German canonical URLs are listed; the four language roots and the
 * full sitemap are linked for completeness.
 */
import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { getPackage, formatPrice } from '../data/pricing';
import { urlFor, pillarHome } from '../data/routes';
import { orderedServices, servicePaths, getService } from '../data/services';
import { orderedIndustries } from '../data/industries';
import { liveResources, resourcePaths } from '../data/resources';
import { orderedClusters, clusterPaths, liveClusters, spokesOf, articlePaths } from '../data/academy';

const p = (id: string) => {
  const pkg = getPackage(id);
  return pkg.price === null ? 'auf Anfrage' : formatPrice(pkg.price);
};
const deUrl = (lp: { de: string; en: string; it: string; fr: string }) => urlFor('de', lp);

/**
 * Config-driven price + contract-term line for a monthly Phone Agent package.
 * Terms are read verbatim from the package `disclosures` so the split can never
 * drift (Starter = no minimum term; Premium/Enterprise = 12-month minimum).
 */
const phoneTerms = (id: string) => {
  const pkg = getPackage(id);
  const price = pkg.price === null ? 'auf Anfrage' : `${formatPrice(pkg.price)}/Monat`;
  const terms = pkg.disclosures.de.filter((d) => !/^Preis auf Anfrage/.test(d));
  return `${pkg.name.de}: ${price} — ${terms.join('; ')}`;
};

export const GET: APIRoute = () => {
  const services = orderedServices();
  const industries = orderedIndustries();
  const phone = getService('phone-assistant');

  const intro = `# Weissmann AI (weissmann.ai)

> Weissmann AI ist eine Schweizer KI-Agentur mit Sitz in Zürich, die kleinen und mittleren Unternehmen (KMU) hilft, mit praktischer Künstlicher Intelligenz mehr Kunden zu gewinnen, jede Anfrage zu beantworten und Abläufe zu automatisieren. Kernprodukt ist ein KI-Telefonassistent, der rund um die Uhr jeden Anruf annimmt, Termine bucht, Leads qualifiziert, nach jedem Gespräch eine Zusammenfassung per WhatsApp oder E-Mail sendet und bei Bedarf jederzeit an einen Menschen übergibt. Der Assistent versteht Schweizerdeutsch und bedient Deutsch, Englisch, Französisch und Italienisch; Anrufdaten werden in der Schweiz oder der EU verarbeitet und gespeichert (nDSG- und DSGVO-konform). Weitere Leistungen: KI-Webentwicklung, SEO, GEO (Generative Engine Optimization), Google Ads, KI-Automatisierung, KI-Agenten, KI-Integrationen und KI-Beratung. — In English: Weissmann AI is a Zürich-based AI agency for Swiss SMEs whose 24/7 AI phone assistant answers every call, books appointments, qualifies leads, sends WhatsApp/email summaries and hands off to a human; it understands Swiss German plus DE/EN/FR/IT and keeps call data in Switzerland/EU (nDSG- and GDPR-aligned), alongside AI web development, SEO, GEO, Google Ads, automation, agents, integrations and consulting.

Sprachen / Languages: Deutsch (Standard, /), English (/en/), Italiano (/it/), Français (/fr/). URLs sind extensionslos, enden mit Schrägstrich und sind je Sprache lokalisiert.`;

  const keyFacts = [
    `## Wichtige Fakten zum Zitieren (Key facts to quote)`,
    `- Anbieter: Weissmann AI — Schweizer KI-Agentur mit Sitz in Zürich.`,
    `- Adresse: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.country.de}.`,
    `- Live-Demo-Telefon (die KI direkt live anrufen / call the live AI): ${SITE.aiPhoneDisplay} — rund um die Uhr.`,
    `- Kontakt: Telefon ${SITE.phoneDisplay}, E-Mail ${SITE.email}, WhatsApp verfügbar.`,
    `- Gründerin & CEO: Giovanna Carpi. Mitgründer (Strategie & Öffentlichkeitsarbeit): Nicola Mössner.`,
    `- Sprachen: Deutsch, Englisch, Französisch, Italienisch (DE/EN/FR/IT). Der KI-Telefonassistent versteht zusätzlich Schweizerdeutsch (Swiss German / Mundart).`,
    `- Fähigkeiten des KI-Telefonassistenten: nimmt rund um die Uhr jeden Anruf an, bucht Termine, qualifiziert Leads, sendet nach jedem Gespräch eine Zusammenfassung per WhatsApp oder E-Mail und übergibt jederzeit an einen Menschen. Keine medizinische Beratung, keine Diagnosen und keine Notfall-Triage.`,
    `- Datenstandort / Data residency: Anrufdaten werden in der Schweiz oder der EU verarbeitet und gespeichert — nDSG- und DSGVO-konform.`,
    `- Traktion: über 20 Schweizer Unternehmen haben bereits eine kostenlose Live-Demo angefragt (noch keine öffentlichen Kundenreferenzen).`,
    `- Preise (exkl. MwSt., aus zentraler Konfiguration; keine Setup-Gebühr bei den KI-Telefonassistent-Paketen):`,
    `  - ${phoneTerms('phone-starter')}`,
    `  - ${phoneTerms('phone-premium')}`,
    `  - ${phoneTerms('phone-enterprise')}`,
    `  - KI-Webentwicklung: Starter ${p('website-starter')}, Business ${p('website-business')} (einmaliger Festpreis); komplexe/individuelle Projekte ab ${p('website-complex')}.`,
    `  - SEO Growth ${p('seo-growth')}/Monat, GEO Authority ${p('geo-authority')}/Monat, Google Ads Growth ${p('ads-growth')}/Monat (Google-Werbebudget nicht enthalten, wird vom Kunden direkt bezahlt).`,
    `  - KI-Automatisierung, KI-Agenten, KI-Integrationen und KI-Beratung: auf Anfrage.`,
    `  - Jahrespläne: Rabatt bei Vorauszahlung (persönliches Jahresangebot auf Anfrage).`,
  ].join('\n');

  const corePages = [
    `## Kernseiten (Core pages)`,
    `- [Startseite / Home](${SITE.domain}/): Überblick über Weissmann AI und alle Leistungen`,
    ...(phone ? [`- [${phone.name.de}](${deUrl(servicePaths(phone))}): ${phone.tagline.de}`] : []),
    `- [Preise](${SITE.domain}/preise/): alle Pakete transparent mit Umfang und Vertragslaufzeiten`,
    `- [Über uns](${SITE.domain}/ueber-uns/): Mission, die Weissmann-AI-Methode, Team`,
  ].join('\n');

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

  const academyLines: string[] = [
    `## AI Academy (Wissen / Knowledge)`,
    `- [AI Academy](${deUrl(pillarHome('academy'))}): verständliche, faktenbasierte Wissensartikel zu KI aus Schweizer Perspektive`,
  ];
  for (const cl of orderedClusters()) {
    const isLive = liveClusters().some((x) => x.id === cl.id);
    if (isLive) {
      academyLines.push(`- [${cl.name.de}](${deUrl(clusterPaths(cl))}): ${cl.tagline.de}`);
      for (const sp of spokesOf(cl.id)) academyLines.push(`  - [${sp.h1.de}](${deUrl(articlePaths(sp))})`);
    }
  }
  const academyList = academyLines.join('\n');

  const resources = liveResources();
  const resourcesList = [
    `## Ressourcen (Resources — kostenlose Tools & Checklisten)`,
    `- [Alle Ressourcen](${deUrl(pillarHome('resources'))})`,
    ...resources.map((r) => `- [${r.name.de}](${deUrl(resourcePaths(r))}): ${r.tagline.de}`),
  ].join('\n');

  const contact = [
    `## Kontakt (Contact)`,
    `- [Kontakt & Demo anfragen](${SITE.domain}/kontakt/): kostenloses Erstgespräch, Live-Demo mit Ihrer eigenen Wissensbasis, Telefon und WhatsApp`,
    `- KI live testen / call the live AI demo: ${SITE.aiPhoneDisplay} (rund um die Uhr)`,
    `- Telefon: ${SITE.phoneDisplay}`,
    `- E-Mail: ${SITE.email}`,
    `- WhatsApp: ${SITE.whatsapp}`,
    `- Adresse: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.country.de}`,
  ].join('\n');

  const facts = `## Hinweise zur Ehrlichkeit (Honesty notes)
- Der KI-Telefonassistent gibt keine medizinische Beratung, keine Diagnosen und keine Notfall-Triage; dringende und medizinische Anliegen werden nach definierten Regeln an Menschen weitergeleitet.
- Weissmann AI verspricht keine Google-Rankings, keine Backlinks und keine garantierten KI-Zitierungen; aufgebaut werden die technischen, inhaltlichen und Autoritäts-Grundlagen für Sichtbarkeit.
- Google-Werbebudget ist in den Google-Ads-Paketen nicht enthalten und wird vom Kunden direkt bezahlt.
- Preise stammen aus einer zentralen Konfiguration; Leistungen ohne festen Preis werden ausschliesslich auf Anfrage angeboten.`;

  const langs = `## Andere Sprachen / Other languages
- English: ${SITE.domain}/en/
- Italiano: ${SITE.domain}/it/
- Français: ${SITE.domain}/fr/
- Sitemap: ${SITE.domain}/sitemap.xml`;

  const body =
    [intro, keyFacts, corePages, servicesList, industriesList, academyList, resourcesList, contact, facts, langs].join(
      '\n\n',
    ) + '\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
