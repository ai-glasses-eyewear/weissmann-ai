/**
 * Weissmann AI — single source of truth for entity, contact and tracking data.
 *
 * Every page, schema block, OG tag and language version renders from this
 * object. Do not hardcode NAP, prices or tracking IDs anywhere else.
 *
 * CONFIRMED FACTS (2026-07-20):
 * - Address: Technoparkstrasse 6, 8005 Zürich (old Culmannstrasse 39 / 8006
 *   is obsolete and must never appear).
 * - Podomedics is a separate, unrelated company and must never appear.
 * - Legal form / UID of Weissmann AI are NOT yet confirmed — LEGAL_ENTITY
 *   fields stay null until the business provides them; templates render a
 *   clearly marked placeholder instead of inventing data.
 */

export const SITE = {
  name: 'Weissmann AI',
  domain: 'https://weissmann.ai',

  address: {
    street: 'Technoparkstrasse 6',
    postalCode: '8005',
    city: 'Zürich',
    countryCode: 'CH',
    // Localized country label
    country: { de: 'Schweiz', en: 'Switzerland', it: 'Svizzera', fr: 'Suisse' },
  },

  phone: '+41783459788',
  phoneDisplay: '+41 78 345 97 88',
  email: 'info@weissmann.ai',
  whatsapp:
    'https://wa.me/41783459788?text=Hello%20I%20am%20interested%20in%20learning%20more%20about%20your%20service',

  social: {
    x: 'https://x.com/WeissmannAi',
    instagram: 'https://www.instagram.com/weissmann_ai/',
    facebook: 'https://www.facebook.com/profile.php?id=61574010912237',
    linkedin: 'https://www.linkedin.com/company/weissmannai/',
  },

  founders: [
    {
      name: 'Giovanna Carpi',
      role: { de: 'Gründerin & CEO', en: 'Founder & CEO', it: 'Fondatrice e CEO', fr: 'Fondatrice et CEO' },
      linkedin: 'https://www.linkedin.com/in/giovanna-carpi-85a520155/',
    },
    {
      name: 'Nicola Mössner',
      role: {
        de: 'Mitgründer, Strategie & Öffentlichkeitsarbeit',
        en: 'Co-founder, Strategy & Public Relations',
        it: 'Co-fondatore, strategia e relazioni pubbliche',
        fr: 'Co-fondateur, stratégie et relations publiques',
      },
    },
  ],

  tracking: {
    ga4: 'G-3L30SCGWGT', // preserved existing property — load exactly once
    googleSiteVerification: 'gd7yw_BZCvML8jC9XJOazMBCdwkPAhnc1fsHMXP9ykw',
    bingVerification: '3B6D0C593961EBE3B9126E0B460A12C7',
    indexNowKey: 'x8jL0gGbhLu81B0L7pPg7afOBQ0CijOk',
  },

  /**
   * Legal entity data — NOT CONFIRMED. Rendered as visible "pending legal
   * confirmation" placeholders on legal pages; never invented.
   */
  legalEntity: {
    registeredName: null as string | null,
    legalForm: null as string | null,
    uid: null as string | null,
  },
} as const;

export type Locale = 'de' | 'en' | 'it' | 'fr';
export const LOCALES: Locale[] = ['de', 'en', 'it', 'fr'];
export const DEFAULT_LOCALE: Locale = 'de';

/** Root path prefix per locale ('' for German default). */
export function localePrefix(locale: Locale): string {
  return locale === 'de' ? '' : `/${locale}`;
}

/** Absolute URL for a path in a given locale. path must start with '/'. */
export function localeUrl(locale: Locale, path: string): string {
  return `${SITE.domain}${localePrefix(locale)}${path}`;
}

/** html lang attribute per locale (Swiss German variant for DE). */
export const HTML_LANG: Record<Locale, string> = {
  de: 'de-CH',
  en: 'en',
  it: 'it',
  fr: 'fr',
};
