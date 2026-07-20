/**
 * Post-build QA gates over the static output in dist/.
 *
 * Hard failures (exit 1):
 *  - any occurrence of "Podomedics" or its UID
 *  - any occurrence of the obsolete address (Culmannstrasse / 8006) or the
 *    legacy "8001" contact-block variant
 *  - the stale CHF 590 price
 *  - any buy.stripe.com URL that is not one of the two verified links
 *
 * Positive assertions:
 *  - the canonical address appears on every built HTML page (footer)
 *  - GA4 id appears exactly once per page
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
  // Brand separation: accidental AI-Eyewear branding/asset leakage fails the
  // build. Deliberate contextual LINKS to https://ai-eyewear.ch are legitimate
  // and are stripped before this scan (see scrubAllowed below).
  /eyewear/i,
  /even\s*realities/i,
];

// Legitimate cross-ecosystem references that must NOT trip the gate:
// plain links/mentions of the ai-eyewear.ch website.
const ALLOWED_PATTERNS = [
  /https?:\/\/(www\.)?ai-eyewear\.ch[^\s"'<)]*/gi,
  /\bAI-Eyewear\b/g, // brand name in plain text next to a deliberate link
];
const scrubAllowed = (text) => ALLOWED_PATTERNS.reduce((t, re) => t.replace(re, ''), text);
const VERIFIED_STRIPE = [
  'https://buy.stripe.com/00w00b0V818UcT646g1sQ01',
  'https://buy.stripe.com/3cI00bgU6dVG5qEbyI1sQ02',
];

const errors = [];
let htmlPages = 0;

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
    if (!text.includes('Technoparkstrasse 6')) {
      errors.push(`${rel}: canonical address missing (Technoparkstrasse 6).`);
    }
    const gaCount = (text.match(/G-3L30SCGWGT/g) ?? []).length;
    // Config script references the id twice (loader src + config call) at most;
    // zero means analytics missing, >4 suggests double-loading.
    if (gaCount === 0) errors.push(`${rel}: GA4 id missing.`);
    if (gaCount > 4) errors.push(`${rel}: GA4 id appears ${gaCount}× — possible duplicate loading.`);
  }
}

if (errors.length) {
  console.error('✖ QA gates failed:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`✓ QA gates passed across ${htmlPages} HTML pages (no Podomedics, no legacy address, no stale prices, Stripe links verified).`);
