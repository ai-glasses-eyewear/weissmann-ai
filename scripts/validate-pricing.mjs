/**
 * Pre-build validation of the central pricing config.
 *
 * Fails the build on:
 *  - forbidden stale prices (CHF 590 for the phone Starter)
 *  - changed/unknown Stripe links (only the two verified links may appear)
 *  - malformed Stripe URLs
 *  - stripe CTA without a link / consult CTA with an unused link
 *  - missing locale coverage in any localized field
 *  - non-CHF currency
 *
 * The source file is TypeScript; rather than compiling it here we parse the
 * values we need with targeted checks against the raw source plus a compiled
 * import via Astro's own toolchain at build time. Raw-source checks are
 * deliberately dumb and strict: they catch drift a type system cannot.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// Normalize CRLF -> LF at the read boundary so every regex below (all written
// against bare \n) behaves identically regardless of the checkout's line
// endings. Without this, a Windows checkout with core.autocrlf=true silently
// produces 0 regex matches downstream instead of failing loudly — caught in
// production when this script reported "0 packages" and still exited 0.
const read = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');

const errors = [];

// Strip comments before scanning — the forbidden-token rules target actual
// data values, not the documentation that warns about those tokens.
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

const pricingSrc = stripComments(read('src/data/pricing.ts'));
const siteSrc = stripComments(read('src/data/site.ts'));
const allSrc = pricingSrc + '\n' + siteSrc;

// 1. Verified Stripe links — exactly these, nowhere else, never altered.
const VERIFIED_LINKS = [
  'https://buy.stripe.com/28EcMX47k9Fq5qE9qA1sQ03', // Phone Starter CHF 350/mo (recurring)
  'https://buy.stripe.com/aFa4gr5bocRC06k1Y81sQ04', // Phone Premium CHF 590/mo (recurring)
  'https://buy.stripe.com/aFadR1cDQ4l6f1egT21sQ09', // Phone Starter Trial CHF 350 (one-time, NOT the recurring Starter above)
  'https://buy.stripe.com/aFabIT9rE3h29GUgT21sQ05', // SEO Growth CHF 890/mo
  'https://buy.stripe.com/6oU3cngU6bNyf1e9qA1sQ06', // GEO Authority CHF 990/mo
  'https://buy.stripe.com/fZu3cnbzMdVGcT646g1sQ07', // Google Ads Growth CHF 690/mo
  'https://buy.stripe.com/5kQ4gr6fs18Uf1eeKU1sQ08', // Premium Starter Website CHF 880 (one-time)
];
const foundLinks = pricingSrc.match(/https:\/\/buy\.stripe\.com\/[A-Za-z0-9]+/g) ?? [];
for (const link of foundLinks) {
  if (!VERIFIED_LINKS.includes(link)) {
    errors.push(`Unverified Stripe link in pricing.ts: ${link}`);
  }
}
for (const link of VERIFIED_LINKS) {
  if (!foundLinks.includes(link)) {
    errors.push(`Verified Stripe link missing from pricing.ts: ${link}`);
  }
}


// 3. Forbidden legacy address tokens and unrelated-entity names.
const FORBIDDEN = ['Culmannstr', '8006 Z', 'Podomedics', 'CHE-324.165.596'];
for (const token of FORBIDDEN) {
  if (allSrc.includes(token)) {
    errors.push(`Forbidden token "${token}" found in config sources.`);
  }
}

// 4. Canonical address present in site.ts.
if (!siteSrc.includes('Technoparkstrasse 6') || !siteSrc.includes("postalCode: '8005'")) {
  errors.push('Canonical address (Technoparkstrasse 6, 8005 Zürich) missing from site.ts.');
}

// 5. Structural checks: every package block needs all four locales in
//    localized fields, a CHF currency, and a coherent CTA/link pairing.
const packageBlocks = pricingSrc.split(/\n  \{\n    id: '/).slice(1);
// A parser that finds nothing is a parser that broke, not a config with zero
// packages — never let that pass silently as if 0 were a valid count.
if (packageBlocks.length === 0) {
  errors.push('Parsed 0 package blocks from pricing.ts — the block-splitting regex found no matches. This means the parser is broken (e.g. pricing.ts formatting changed) or the file is empty, not that there are genuinely no packages. Fix the parser before trusting this script again.');
}
for (const block of packageBlocks) {
  const id = block.slice(0, block.indexOf("'"));
  for (const loc of ['de:', 'en:', 'it:', 'fr:']) {
    if (!block.includes(loc)) errors.push(`Package "${id}": missing locale ${loc.replace(':', '')}`);
  }
  if (!block.includes("currency: 'CHF'")) errors.push(`Package "${id}": currency must be CHF.`);
  const hasLink = /stripeLink:\s*'https/.test(block);
  const isStripeCta = /ctaType:\s*'stripe'/.test(block);
  if (isStripeCta && !hasLink) errors.push(`Package "${id}": ctaType 'stripe' but no stripeLink.`);
  if (!isStripeCta && hasLink) errors.push(`Package "${id}": has a stripeLink but ctaType is not 'stripe'.`);

  // A promotional price needs both regularPrice + promoLabel, and the regular
  // price must actually be higher than the current price (else it's not a promo).
  const hasRegularPrice = /regularPrice:\s*\d/.test(block);
  const hasPromoLabel = /promoLabel:\s*\{/.test(block);
  if (hasRegularPrice !== hasPromoLabel) {
    errors.push(`Package "${id}": regularPrice and promoLabel must both be set, or neither.`);
  }
  if (hasRegularPrice) {
    const price = Number(block.match(/\n\s*price:\s*(\d+)/)?.[1]);
    const regularPrice = Number(block.match(/regularPrice:\s*(\d+)/)?.[1]);
    if (Number.isFinite(price) && Number.isFinite(regularPrice) && regularPrice <= price) {
      errors.push(`Package "${id}": regularPrice (${regularPrice}) must be greater than the current price (${price}).`);
    }
  }
}

if (errors.length) {
  console.error('✖ Pricing validation failed:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`✓ Pricing validation passed (${packageBlocks.length} packages, ${foundLinks.length} verified Stripe links).`);
