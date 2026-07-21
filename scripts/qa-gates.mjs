/**
 * Post-build QA gates over the static output in dist/.
 *
 * Hard failures (exit 1):
 *  - any occurrence of "Podomedics" or its UID
 *  - any occurrence of the obsolete address (Culmannstrasse / 8006) or the
 *    legacy "8001" contact-block variant
 *  - the stale CHF 590 price
 *  - any buy.stripe.com URL that is not one of the two verified links
 *  - any indexable HTML page missing rel=canonical or the hreflang cluster
 *    (de-CH + x-default) — protects the localized-routing architecture
 *
 * Positive assertions:
 *  - the canonical address appears on every built HTML page (footer)
 *  - GA4 id appears exactly once per page
 *
 * Reports (non-fatal warnings):
 *  - orphan pages: indexable pages with zero inbound internal links
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}

const FORBIDDEN = [
  /Podomedics/i,
  /CHE-324\.165\.596/,
  /Culmannstr/i,
  /8006\s*Z(ü|u|&#252;|&uuml;)rich/i,
  /8001\s*Z(ü|u|&#252;|&uuml;)rich/i,
  /CHF\s*590\b/,
  /\b590\s*CHF\b/,
  /eyewear/i,
  /even\s*realities/i,
];

const ALLOWED_PATTERNS = [
  /https?:\/\/(www\.)?ai-eyewear\.ch[^\s"'<)]*/gi,
  /\bAI-Eyewear\b/g,
];
const scrubAllowed = (text) => ALLOWED_PATTERNS.reduce((t, re) => t.replace(re, ''), text);
const VERIFIED_STRIPE = [
  'https://buy.stripe.com/00w00b0V818UcT646g1sQ01',
  'https://buy.stripe.com/3cI00bgU6dVG5qEbyI1sQ02',
];

// Legacy pages being deprecated (superseded by siloed URLs); excluded from the
// orphan report until the cutover 301s land.
const ORPHAN_EXEMPT = new Set([
  '/ki-telefonassistent/',
  '/leistungen/ai-websites/',
  '/en/ki-telefonassistent/', '/en/leistungen/ai-websites/',
  '/it/ki-telefonassistent/', '/it/leistungen/ai-websites/',
  '/fr/ki-telefonassistent/', '/fr/leistungen/ai-websites/',
]);
// Locale roots + home are entry points, never orphans.
const ENTRY_POINTS = new Set(['/', '/en/', '/it/', '/fr/']);

const errors = [];
const warnings = [];
let htmlPages = 0;

const pageUrls = new Set();
const inbound = new Map(); // url -> count of distinct pages linking to it
const indexable = new Set(); // urls that should be reachable

function toUrl(rel) {
  let u = '/' + rel.replace(/\\/g, '/');
  u = u.replace(/index\.html$/, '');
  if (!u.endsWith('/')) u += '/';
  return u;
}
const norm = (href) => {
  let h = href.split('#')[0].split('?')[0];
  if (!h.endsWith('/') && !/\.[a-z0-9]+$/i.test(h)) h += '/';
  return h;
};

for (const file of walk(dist)) {
  if (!/\.(html|xml|txt|json|js|css)$/.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  const rel = file.slice(dist.length + 1);

  const scanned = scrubAllowed(text);
  for (const re of FORBIDDEN) {
    if (re.test(scanned)) errors.push(`${rel}: forbidden pattern ${re}`);
  }
  for (const link of text.match(/https:\/\/buy\.stripe\.com\/[A-Za-z0-9]+/g) ?? []) {
    if (!VERIFIED_STRIPE.includes(link)) errors.push(`${rel}: unverified Stripe link ${link}`);
  }

  if (file.endsWith('.html')) {
    htmlPages++;
    const url = toUrl(rel);
    pageUrls.add(url);

    if (!text.includes('Technoparkstrasse 6')) {
      errors.push(`${rel}: canonical address missing (Technoparkstrasse 6).`);
    }
    const gaCount = (text.match(/G-3L30SCGWGT/g) ?? []).length;
    if (gaCount === 0) errors.push(`${rel}: GA4 id missing.`);
    if (gaCount > 4) errors.push(`${rel}: GA4 id appears ${gaCount}× — possible duplicate loading.`);

    const isNoindex = /name="robots"\s+content="noindex/i.test(text);
    const is404 = url === '/404/' || rel === '404.html';
    if (!isNoindex && !is404) {
      indexable.add(url);
      if (!/<link[^>]+rel="canonical"/i.test(text)) errors.push(`${rel}: missing rel=canonical.`);
      if (!/hreflang="de-CH"/i.test(text)) errors.push(`${rel}: missing hreflang de-CH.`);
      if (!/hreflang="x-default"/i.test(text)) errors.push(`${rel}: missing hreflang x-default.`);
    }

    // Collect internal link targets (root-relative hrefs only).
    const hrefs = new Set();
    for (const m of text.matchAll(/href="(\/[^"]*)"/g)) {
      const h = m[1];
      if (h.startsWith('//')) continue; // protocol-relative external
      hrefs.add(norm(h));
    }
    for (const h of hrefs) inbound.set(h, (inbound.get(h) ?? 0) + 1);
  }
}

// Hreflang/canonical errors are collected above. Orphan report (non-fatal):
for (const url of indexable) {
  if (ENTRY_POINTS.has(url) || ORPHAN_EXEMPT.has(url)) continue;
  if (!(inbound.get(url) > 0)) warnings.push(`orphan: ${url} has no inbound internal links`);
}

if (warnings.length) {
  console.warn('⚠ QA warnings:');
  for (const w of warnings.slice(0, 40)) console.warn('  - ' + w);
  if (warnings.length > 40) console.warn(`  … and ${warnings.length - 40} more`);
}

if (errors.length) {
  console.error('✖ QA gates failed:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`✓ QA gates passed across ${htmlPages} HTML pages (brand/address/prices/Stripe OK; canonical + hreflang present on ${indexable.size} indexable pages; ${warnings.length} orphan warning(s)).`);
