/**
 * Lightweight CI guardrail scans — things too specific/cheap to warrant their
 * own audit script, run against source (src/, public/) and the built dist/.
 * Exits 1 on any hit. No secrets required; scans for the PRESENCE of secret
 * patterns, never reads or needs a real key.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
let failed = false;
function fail(msg) { console.error('✖ ' + msg); failed = true; }
function ok(msg) { console.log('✓ ' + msg); }

function* walk(dir, opts = {}) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const name of entries) {
    if (name === 'node_modules' || name === '.git' || name === '.astro' || name === '.netlify') continue;
    const p = join(dir, name);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) yield* walk(p, opts);
    else if (!opts.ext || opts.ext.some((e) => p.endsWith(e))) yield p;
  }
}

// ── 1. Stripe secret keys (never allowed in the repo — only public payment-link URLs / pk_ are fine) ──
{
  const hits = [];
  for (const f of walk(join(ROOT, 'src'))) {
    if (!/\.(ts|astro|mjs|js|json)$/.test(f)) continue;
    const text = readFileSync(f, 'utf8');
    if (/\bsk_(live|test)_[A-Za-z0-9]{10,}/.test(text) || /\brk_(live|test)_[A-Za-z0-9]{10,}/.test(text)) hits.push(f);
  }
  if (hits.length) fail(`Stripe secret key pattern found in: ${hits.join(', ')}`);
  else ok('No Stripe secret keys in source');
}

// ── 2. Old GA4 ID must not appear anywhere ──
{
  const OLD_GA4 = 'G-3L30SCGWGT';
  const hits = [];
  for (const f of walk(join(ROOT, 'src'))) {
    if (!/\.(ts|astro|mjs|js|json)$/.test(f)) continue;
    if (readFileSync(f, 'utf8').includes(OLD_GA4)) hits.push(f);
  }
  if (hits.length) fail(`Retired GA4 ID ${OLD_GA4} still referenced in: ${hits.join(', ')}`);
  else ok(`Retired GA4 ID ${OLD_GA4} absent from source`);
}

// ── 3. Old campaign-video filenames must be gone ──
// (matches the .mp4 filename itself, not just the substring, so this script's
// own reference to the pattern-string below doesn't trip its own check)
{
  const OLD_VIDEO = 'public_video_weissmann_campaing';
  const hits = [];
  const self = join(ROOT, 'scripts', 'ci-guardrails.mjs');
  for (const f of walk(ROOT)) {
    if (f.includes(join(ROOT, 'dist')) || f === self) continue;
    if (/\.(ts|astro|mjs|js|json|md)$/.test(f) && readFileSync(f, 'utf8').includes(OLD_VIDEO + '_')) hits.push(f);
  }
  if (hits.length) fail(`Old misspelled campaign-video filename still referenced in: ${hits.join(', ')}`);
  else ok('Old campaign-video filenames absent');
}

// ── 4. Nicola Mössner/Moessner must not appear in source or built output ──
{
  const pattern = /nicola\s+m(ö|oe|o)ssner/i;
  const hits = [];
  for (const f of walk(join(ROOT, 'src'))) {
    if (!/\.(ts|astro|mjs|js|json)$/.test(f)) continue;
    if (pattern.test(readFileSync(f, 'utf8'))) hits.push(f);
  }
  const distDir = join(ROOT, 'dist');
  if (existsSync(distDir)) {
    for (const f of walk(distDir, { ext: ['.html'] })) {
      if (pattern.test(readFileSync(f, 'utf8'))) hits.push(f);
    }
  }
  if (hits.length) fail(`"Nicola Mössner/Moessner" found in: ${hits.slice(0, 10).join(', ')}${hits.length > 10 ? ` … +${hits.length - 10} more` : ''}`);
  else ok('No "Nicola Mössner/Moessner" reference in source or built output');
}

// ── 5. Exactly one GA4 loader/config call per built page ──
{
  const distDir = join(ROOT, 'dist');
  if (!existsSync(distDir)) {
    console.log('… (skipping GA4-loader-count check — dist/ not built yet)');
  } else {
    const bad = [];
    for (const f of walk(distDir, { ext: ['.html'] })) {
      const text = readFileSync(f, 'utf8');
      const loaderCount = (text.match(/googletagmanager\.com\/gtag\/js/g) || []).length;
      const configCount = (text.match(/gtag\(\s*'config'/g) || []).length;
      if (loaderCount > 1 || configCount > 1) bad.push(`${f.slice(distDir.length + 1)} (loader=${loaderCount}, config=${configCount})`);
    }
    if (bad.length) fail(`More than one GA4 loader/config call on: ${bad.slice(0, 10).join(', ')}`);
    else ok('Exactly one GA4 loader + config call per built page');
  }
}

// ── 6. No redirect chains in public/_redirects (a FROM that is itself a TO) ──
{
  const redirectsPath = join(ROOT, 'public', '_redirects');
  const text = readFileSync(redirectsPath, 'utf8');
  const froms = new Set(); const tos = new Set(); const rules = [];
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const parts = t.split(/\s+/);
    if (parts.length < 3) continue;
    rules.push({ from: parts[0], to: parts[1] });
    froms.add(parts[0]);
    tos.add(parts[1]);
  }
  const chained = rules.filter((r) => froms.has(r.to));
  if (chained.length) fail(`Redirect chain(s) found: ${chained.map((r) => `${r.from} -> ${r.to} -> ...`).join(', ')}`);
  else ok(`No redirect chains across ${rules.length} rules in public/_redirects`);
}

if (failed) { console.error('\nCI guardrail scan FAILED.'); process.exit(1); }
console.log('\nAll CI guardrail scans passed.');
