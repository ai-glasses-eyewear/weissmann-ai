/**
 * JSON-LD builders. Every schema block on the site is produced here so entity
 * data stays consistent (one Organization @id, one address, one phone).
 *
 * LocalBusiness markup is intentionally NOT used until the business confirms
 * the Technoparkstrasse location is a client-visitable premises.
 */
import { SITE, localeUrl, HTML_LANG, type Locale } from './site';
import { PACKAGES, type PricingPackage } from './pricing';

const ORG_ID = `${SITE.domain}/#organization`;

/**
 * Content release/review date — a truthful freshness floor used for Article
 * dates and sitemap <lastmod>. Update when content is substantively reviewed.
 */
export const CONTENT_DATE = '2026-07-21';

const ORG_DESCRIPTION: Record<Locale, string> = {
  de: 'Weissmann AI ist eine Agentur für praktische Künstliche Intelligenz und digitales Wachstum in Zürich. Wir bauen KI-Telefonassistenten, Websites, Sichtbarkeit (SEO/GEO) und Automatisierung für Schweizer Unternehmen.',
  en: 'Weissmann AI is a practical-AI implementation and digital-growth agency in Zurich, Switzerland, building AI phone assistants, websites, visibility (SEO/GEO) and automation for businesses.',
  it: 'Weissmann AI è un’agenzia di intelligenza artificiale pratica e crescita digitale a Zurigo. Realizziamo assistenti telefonici AI, siti web, visibilità (SEO/GEO) e automazione per le aziende svizzere.',
  fr: 'Weissmann AI est une agence d’intelligence artificielle pratique et de croissance digitale à Zurich. Nous construisons des assistants téléphoniques IA, des sites web, de la visibilité (SEO/GEO) et de l’automatisation.',
};

export function organization(locale: Locale) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.domain,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.domain}/logo-weissmann.png`,
      width: 370,
      height: 160,
    },
    image: `${SITE.domain}/og-default.png`,
    description: ORG_DESCRIPTION[locale],
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.countryCode,
    },
    areaServed: { '@type': 'Country', name: 'Switzerland' },
    knowsAbout: [
      'Artificial intelligence',
      'AI phone assistants',
      'Conversational AI',
      'AI automation',
      'AI agents',
      'Search engine optimization',
      'Generative engine optimization',
      'AI for small and medium businesses',
      'AI implementation',
    ],
    sameAs: Object.values(SITE.social),
    founder: SITE.founders.map((f) => ({
      '@type': 'Person',
      name: f.name,
      jobTitle: f.role[locale],
      ...('linkedin' in f && f.linkedin ? { sameAs: [f.linkedin] } : {}),
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: SITE.phone,
      email: SITE.email,
      availableLanguage: ['de', 'en', 'fr', 'it'],
    },
  };
}

export function webSite(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.domain}/#website`,
    url: SITE.domain,
    name: SITE.name,
    publisher: { '@id': ORG_ID },
    inLanguage: HTML_LANG[locale],
  };
}

export function webPage(locale: Locale, path: string, name: string, description: string) {
  return {
    '@type': 'WebPage',
    '@id': `${localeUrl(locale, path)}#webpage`,
    url: localeUrl(locale, path),
    name,
    description,
    inLanguage: HTML_LANG[locale],
    isPartOf: { '@id': `${SITE.domain}/#website` },
    about: { '@id': ORG_ID },
  };
}

export function breadcrumbs(locale: Locale, items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: localeUrl(locale, item.path),
    })),
  };
}

export function faqPage(questions: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

/**
 * Service + Offer markup for a pricing package.
 * Offer is only emitted for real purchasable packages (schemaOffer flag),
 * with a numeric price — never "CHF x" strings, never invented prices.
 */
export function serviceWithOffer(locale: Locale, pkg: PricingPackage, path: string) {
  const service: Record<string, unknown> = {
    '@type': 'Service',
    name: pkg.name[locale],
    description: pkg.description[locale],
    provider: { '@id': ORG_ID },
    areaServed: 'CH',
    url: localeUrl(locale, path),
  };
  if (pkg.schemaOffer && pkg.price !== null) {
    service.offers = {
      '@type': 'Offer',
      price: pkg.price,
      priceCurrency: pkg.currency,
      url: pkg.stripeLink ?? localeUrl(locale, path),
      availability: 'https://schema.org/InStock',
      ...(pkg.interval === 'month'
        ? {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: pkg.price,
              priceCurrency: pkg.currency,
              billingIncrement: 1,
              unitCode: 'MON',
            },
          }
        : {}),
    };
  }
  return service;
}

export function allPackageServices(locale: Locale, path: string) {
  return {
    '@type': 'ItemList',
    name: 'Weissmann AI Services',
    itemListElement: PACKAGES.filter((p) => p.schemaOffer).map((pkg, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: serviceWithOffer(locale, pkg, path),
    })),
  };
}
