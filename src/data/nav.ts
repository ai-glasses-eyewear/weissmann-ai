/**
 * Weissmann AI — primary navigation config (six-pillar IA).
 *
 * Pillars appear in the nav only when their hub is published (PILLAR_LIVE),
 * so navigation never links to an unbuilt section. Flip a flag to true when a
 * pillar's hub + content go live. Company/utility links use their localized
 * paths (legacy same-slug pages for now).
 */
import { localePrefix, type Locale } from './site';
import { pillarHome, relFor, type Pillar } from './routes';
import { t } from '../i18n/ui';

export interface NavItem {
  label: string;
  href: string;
}

/** Which pillar hubs are published. Flip to true as each section goes live. */
export const PILLAR_LIVE: Record<Pillar, boolean> = {
  services: true,
  industries: true,
  academy: true,
  resources: false,
};

const PILLAR_KEY: Record<Pillar, string> = {
  services: 'nav.services',
  industries: 'nav.industries',
  academy: 'nav.academy',
  resources: 'nav.resources',
};

const PILLAR_ORDER: Pillar[] = ['services', 'industries', 'academy', 'resources'];

/** The live top-level pillar links for the current locale. */
export function pillarNav(locale: Locale): NavItem[] {
  return PILLAR_ORDER.filter((p) => PILLAR_LIVE[p]).map((p) => ({
    label: t(locale, PILLAR_KEY[p]),
    href: relFor(locale, pillarHome(p)),
  }));
}

/** Company / trust links (legacy localized paths for now). */
export function companyNav(locale: Locale): NavItem[] {
  const pre = localePrefix(locale);
  return [
    { label: t(locale, 'nav.about'), href: `${pre}/ueber-uns/` },
    { label: t(locale, 'nav.contact'), href: `${pre}/kontakt/` },
  ];
}

export function pricingHref(locale: Locale): string {
  return `${localePrefix(locale)}/preise/`;
}

export function contactHref(locale: Locale): string {
  return `${localePrefix(locale)}/kontakt/`;
}
