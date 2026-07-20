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

export function organization(locale: Locale) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.domain,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.countryCode,
    },
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
