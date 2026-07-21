/**
 * Accessibility + metadata audit over dist/ (dev tool, not part of the build).
 * Reports pages with structural/SEO/a11y issues so they can be fixed. Run with:
 *   node scripts/audit.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (p.endsWith('.html')) yield p;
  }
}

const issues = { noTitle: [], noDesc: [], h1Count: [], imgNoAlt: [], noLang: [], emptyLink: [], titleLen: [], descLen: [] };
let n = 0;

for (const file of walk(dist)) {
  n++;
  const t = readFileSync(file, 'utf8');
  const rel = file.slice(dist.length + 1);

  const title = (t.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (!title.trim()) issues.noTitle.push(rel);
  else if (title.length > 65) issues.titleLen.push(`${rel} (${title.length})`);

  const desc = (t.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (!desc.trim()) issues.noDesc.push(rel);
  else if (desc.length > 165) issues.descLen.push(`${rel} (${desc.length})`);

  const h1s = (t.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) issues.h1Count.push(`${rel} (${h1s})`);

  if (!/<html[^>]+lang="/i.test(t)) issues.noLang.push(rel);

  // images without a non-empty alt (alt="" is allowed only for decorative;
  // flag missing alt attribute entirely)
  for (const img of t.match(/<img\b[^>]*>/g) || []) {
    if (!/\balt=/.test(img)) issues.imgNoAlt.push(`${rel}: ${img.slice(0, 80)}`);
  }

  // anchors with no text and no aria-label (skip those wrapping <img>/<svg>)
  for (const a of t.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) || []) {
    const inner = a.replace(/<a\b[^>]*>/, '').replace(/<\/a>/, '');
    const hasText = inner.replace(/<[^>]+>/g, '').trim().length > 0;
    const hasMedia = /<(img|svg)\b/.test(inner);
    const hasAria = /aria-label=/.test(a.match(/<a\b[^>]*>/)[0]);
    if (!hasText && !hasMedia && !hasAria) issues.emptyLink.push(`${rel}: ${a.slice(0, 80)}`);
  }
}

console.log(`Audited ${n} HTML pages.\n`);
for (const [k, arr] of Object.entries(issues)) {
  console.log(`${k}: ${arr.length}`);
  for (const ex of arr.slice(0, 6)) console.log('   - ' + ex);
}
const total = Object.values(issues).reduce((s, a) => s + a.length, 0);
console.log(`\nTOTAL ISSUES: ${total}`);
