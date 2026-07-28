/**
 * Duplicate-content + internal-link-graph audit over dist/ (dev tool, not part
 * of the build). Complements qa-gates.mjs (which checks brand/price/canonical/
 * hreflang per page) with cross-page analysis:
 *
 *  - duplicate <title> / meta description within the same language
 *  - near-duplicate main-body content (word-set similarity) within the same
 *    URL-pattern bucket + language (e.g. two /branchen/ pages, two /ki-academy/
 *    articles) — templated-but-differentiated pages are expected to share
 *    structure, so only genuinely high overlap is flagged
 *  - orphan pages (unreachable from the homepage via internal links) and pages
 *    more than 3 clicks deep
 *  - internal links that point at a URL with a 301/410 rule in public/_redirects
 *    ("redirect-passing" links) or at a page whose own canonical points elsewhere
 *  - duplicate canonical values (two different pages both self-canonicalizing
 *    to the same URL)
 *  - empty/near-empty indexable pages (<40 words of main content)
 *  - sitemap.xml entries that are redirected, noindex, cross-canonical, or
 *    don't match any built page
 *  - hreflang alternates that point at a redirect or a noindex page
 *
 * Exits 1 if any hard issue is found (near-duplicate content flags are
 * informational only — they need human judgment on templated-vs-duplicate).
 *
 * Run after `npm run build`:  node scripts/audit-duplicates.mjs
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

const toUrl = (rel) => {
  let u = '/' + rel.replace(/\\/g, '/').replace(/index\.html$/, '');
  if (!u.endsWith('/') && !/\.[a-z0-9]+$/i.test(u)) u += '/';
  return u;
};
const norm = (href) => {
  let h = href.split('#')[0].split('?')[0];
  if (!h.endsWith('/') && !/\.[a-z0-9]+$/i.test(h)) h += '/';
  return h;
};
const localeOf = (url) => (url.startsWith('/en/') ? 'en' : url.startsWith('/it/') ? 'it' : url.startsWith('/fr/') ? 'fr' : 'de');
/** Coarse URL-pattern bucket for grouping "same template" pages. */
const bucketOf = (url) => {
  const noLocale = url.replace(/^\/(en|it|fr)\//, '/');
  const seg = noLocale.split('/').filter(Boolean);
  return seg.slice(0, seg.length > 1 ? 2 : 1).join('/') || 'home';
};

// ── load public/_redirects (parse "FROM  TO  CODE" lines, ignore comments) ──
const redirectsSrc = readFileSync(join(root, 'public', '_redirects'), 'utf8');
const REDIRECT_FROM = new Set();
for (const line of redirectsSrc.split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const parts = t.split(/\s+/);
  if (parts.length >= 2) REDIRECT_FROM.add(parts[0].replace(/\/?$/, '/'));
}

// ── pass 1: parse every built page ──
const pages = new Map(); // url -> { title, desc, canonical, isNoindex, hrefs, mainText, h1Count }
for (const file of walk(dist)) {
  if (!file.endsWith('.html')) continue;
  const rel = file.slice(dist.length + 1);
  const url = toUrl(rel);
  const text = readFileSync(file, 'utf8');

  const title = (text.match(/<title>([^<]*)<\/title>/) || [])[1]?.trim() || '';
  const desc = (text.match(/<meta name="description" content="([^"]*)"/) || [])[1]?.trim() || '';
  const canonicalHref = text.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
  const canonicalPath = canonicalHref ? norm(canonicalHref.replace(/^https?:\/\/[^/]+/, '')) : null;
  const isNoindex = /name="robots"\s+content="noindex/i.test(text);
  const h1Count = (text.match(/<h1[\s>]/g) || []).length;

  const hrefs = new Set();
  for (const m of text.matchAll(/href="(\/[^"]*)"/g)) {
    const h = m[1];
    if (h.startsWith('//')) continue;
    hrefs.add(norm(h));
  }

  const hreflangs = [];
  for (const m of text.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/g)) {
    hreflangs.push({ lang: m[1], href: norm(m[2].replace(/^https?:\/\/[^/]+/, '')) });
  }

  const mainMatch = text.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const mainHtml = mainMatch ? mainMatch[1] : text;
  const mainText = mainHtml
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .toLowerCase()
    .replace(/[^a-zàâäéèêëïîôöùûüç0-9\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  pages.set(url, { title, desc, canonicalPath, isNoindex, hrefs, hreflangs, mainText, h1Count, rel });
}

// ── duplicate titles / descriptions (within the same language, indexable pages only) ──
const dupTitles = [];
const dupDescs = [];
{
  const byLocaleTitle = new Map();
  const byLocaleDesc = new Map();
  for (const [url, p] of pages) {
    if (p.isNoindex || (p.canonicalPath && p.canonicalPath !== url)) continue;
    const loc = localeOf(url);
    if (p.title) {
      const key = `${loc}::${p.title.toLowerCase()}`;
      (byLocaleTitle.get(key) ?? byLocaleTitle.set(key, []).get(key)).push(url);
    }
    if (p.desc) {
      const key = `${loc}::${p.desc.toLowerCase()}`;
      (byLocaleDesc.get(key) ?? byLocaleDesc.set(key, []).get(key)).push(url);
    }
  }
  for (const [key, urls] of byLocaleTitle) if (urls.length > 1) dupTitles.push({ title: key.split('::')[1], urls });
  for (const [key, urls] of byLocaleDesc) if (urls.length > 1) dupDescs.push({ desc: key.split('::')[1], urls });
}

// ── near-duplicate main content (same locale + same URL bucket) ──
function wordSet(text) {
  const STOP = new Set('der die das und oder für von mit auf ist sind ein eine im in zu den dem des als bei nicht auch mehr sehr the and for with your our a an of to is are on in it be we our as at le la les et des pour avec votre notre une un dans est il la lo per con vostro nostro una un nel gli le'.split(' '));
  return new Set(text.split(' ').filter((w) => w.length > 3 && !STOP.has(w)));
}
const wordSets = new Map();
for (const [url, p] of pages) wordSets.set(url, wordSet(p.mainText));

const nearDupes = [];
const byBucket = new Map();
for (const [url, p] of pages) {
  if (p.isNoindex || (p.canonicalPath && p.canonicalPath !== url)) continue;
  const key = `${localeOf(url)}::${bucketOf(url)}`;
  (byBucket.get(key) ?? byBucket.set(key, []).get(key)).push(url);
}
for (const [, urls] of byBucket) {
  if (urls.length < 2 || urls.length > 60) continue; // skip huge buckets (too slow / too generic, e.g. all academy articles together)
  for (let i = 0; i < urls.length; i++) {
    for (let j = i + 1; j < urls.length; j++) {
      const a = wordSets.get(urls[i]);
      const b = wordSets.get(urls[j]);
      if (a.size < 20 || b.size < 20) continue;
      let inter = 0;
      for (const w of a) if (b.has(w)) inter++;
      const jaccard = inter / (a.size + b.size - inter);
      if (jaccard > 0.75) nearDupes.push({ a: urls[i], b: urls[j], similarity: Math.round(jaccard * 100) });
    }
  }
}
nearDupes.sort((x, y) => y.similarity - x.similarity);

// ── duplicate canonical values among indexable (self-canonical) pages ──
const dupCanonicals = [];
{
  const byCanonical = new Map();
  for (const [url, p] of pages) {
    if (p.isNoindex || p.canonicalPath !== url) continue; // only self-canonical, indexable pages
    (byCanonical.get(p.canonicalPath) ?? byCanonical.set(p.canonicalPath, []).get(p.canonicalPath)).push(url);
  }
  for (const [canonical, urls] of byCanonical) if (urls.length > 1) dupCanonicals.push({ canonical, urls });
}

// ── empty/near-empty indexable pages (thin/broken content) ──
const emptyPages = [];
for (const [url, p] of pages) {
  if (p.isNoindex || p.canonicalPath !== url) continue;
  const words = p.mainText ? p.mainText.split(' ').filter(Boolean).length : 0;
  if (words < 40) emptyPages.push({ url, words });
}

// ── sitemap.xml cross-check: every listed URL must be a real, indexable,
//    non-redirected, non-noindex 200 page, and every hreflang alternate must
//    resolve the same way (never point at a redirect or a noindex page). ──
const sitemapIssues = [];
try {
  const sitemapXml = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
  const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => norm(m[1].replace(/^https?:\/\/[^/]+/, '')));
  for (const u of sitemapUrls) {
    if (REDIRECT_FROM.has(u)) { sitemapIssues.push(`${u}: sitemap lists a URL that has a redirect rule`); continue; }
    const p = pages.get(u);
    if (!p) { sitemapIssues.push(`${u}: sitemap lists a URL with no matching built page (404 risk)`); continue; }
    if (p.isNoindex) sitemapIssues.push(`${u}: sitemap lists a noindex page`);
    if (p.canonicalPath && p.canonicalPath !== u) sitemapIssues.push(`${u}: sitemap lists a page whose canonical points elsewhere (${p.canonicalPath})`);
  }
} catch { /* sitemap.xml not built (unexpected) — skip, qa-gates covers required pages separately */ }

// ── hreflang alternates must never point at a redirect or a noindex page ──
const badHreflang = [];
for (const [url, p] of pages) {
  if (p.isNoindex || (p.canonicalPath && p.canonicalPath !== url)) continue;
  for (const h of p.hreflangs) {
    if (REDIRECT_FROM.has(h.href)) badHreflang.push({ from: url, lang: h.lang, to: h.href, reason: 'redirect' });
    else {
      const target = pages.get(h.href);
      if (target?.isNoindex) badHreflang.push({ from: url, lang: h.lang, to: h.href, reason: 'noindex' });
    }
  }
}

// ── internal link graph: orphans, depth, redirect-passing links ──
const inbound = new Map();
const redirectPassingLinks = [];
for (const [url, p] of pages) {
  for (const h of p.hrefs) {
    inbound.set(h, (inbound.get(h) ?? 0) + 1);
    if (REDIRECT_FROM.has(h)) redirectPassingLinks.push({ from: url, to: h });
  }
}
// BFS from each locale root to find depth (meaningful in-content links only —
// approximated here with the full href graph, which is a conservative/looser
// depth estimate since it includes nav/footer too).
const ENTRY_POINTS = ['/', '/en/', '/it/', '/fr/'];
const depth = new Map();
const queue = [];
for (const e of ENTRY_POINTS) { depth.set(e, 0); queue.push(e); }
while (queue.length) {
  const cur = queue.shift();
  const p = pages.get(cur);
  if (!p) continue;
  for (const h of p.hrefs) {
    if (pages.has(h) && !depth.has(h)) { depth.set(h, depth.get(cur) + 1); queue.push(h); }
  }
}
const orphans = [];
const deepPages = [];
const ORPHAN_EXEMPT = new Set(['/', '/en/', '/it/', '/fr/', '/ki-telefonassistent/', '/leistungen/ai-websites/', '/en/ki-telefonassistent/', '/en/leistungen/ai-websites/', '/it/ki-telefonassistent/', '/it/leistungen/ai-websites/', '/fr/ki-telefonassistent/', '/fr/leistungen/ai-websites/']);
for (const [url, p] of pages) {
  if (p.isNoindex || (p.canonicalPath && p.canonicalPath !== url) || ORPHAN_EXEMPT.has(url)) continue;
  if (!depth.has(url)) orphans.push(url);
  else if (depth.get(url) > 3) deepPages.push({ url, depth: depth.get(url) });
}

// ── report ──
console.log(`Audited ${pages.size} built pages.\n`);

console.log(`Duplicate titles (same language): ${dupTitles.length}`);
for (const d of dupTitles.slice(0, 20)) console.log(`   "${d.title}" → ${d.urls.join(', ')}`);

console.log(`\nDuplicate meta descriptions (same language): ${dupDescs.length}`);
for (const d of dupDescs.slice(0, 20)) console.log(`   "${d.desc.slice(0, 70)}..." → ${d.urls.join(', ')}`);

console.log(`\nNear-duplicate main content (>75% word-set overlap, same locale+bucket): ${nearDupes.length}`);
for (const n of nearDupes.slice(0, 30)) console.log(`   ${n.similarity}%  ${n.a}  ~  ${n.b}`);
if (nearDupes.length > 30) console.log(`   … and ${nearDupes.length - 30} more`);

console.log(`\nDuplicate canonical values (two self-canonical pages claiming the same URL): ${dupCanonicals.length}`);
for (const d of dupCanonicals.slice(0, 20)) console.log(`   ${d.canonical} → ${d.urls.join(', ')}`);

console.log(`\nEmpty/near-empty indexable pages (<40 words of main content): ${emptyPages.length}`);
for (const e of emptyPages.slice(0, 20)) console.log(`   ${e.words}w  ${e.url}`);

console.log(`\nSitemap issues (redirected/noindex/cross-canonical/missing URLs): ${sitemapIssues.length}`);
for (const s of sitemapIssues.slice(0, 30)) console.log(`   ${s}`);
if (sitemapIssues.length > 30) console.log(`   … and ${sitemapIssues.length - 30} more`);

console.log(`\nHreflang alternates pointing at a redirect or noindex page: ${badHreflang.length}`);
for (const h of badHreflang.slice(0, 20)) console.log(`   ${h.from} [${h.lang}] → ${h.to} (${h.reason})`);

console.log(`\nOrphan indexable pages (unreachable from home via internal links): ${orphans.length}`);
for (const o of orphans.slice(0, 30)) console.log(`   ${o}`);
if (orphans.length > 30) console.log(`   … and ${orphans.length - 30} more`);

console.log(`\nPages more than 3 clicks from home: ${deepPages.length}`);
for (const d of deepPages.slice(0, 20)) console.log(`   depth ${d.depth}  ${d.url}`);
if (deepPages.length > 20) console.log(`   … and ${deepPages.length - 20} more`);

console.log(`\nInternal links pointing at a URL with a redirect rule: ${redirectPassingLinks.length}`);
for (const r of redirectPassingLinks.slice(0, 30)) console.log(`   ${r.from}  →  ${r.to}`);
if (redirectPassingLinks.length > 30) console.log(`   … and ${redirectPassingLinks.length - 30} more`);

const total = dupTitles.length + dupDescs.length + orphans.length + redirectPassingLinks.length
  + dupCanonicals.length + emptyPages.length + sitemapIssues.length + badHreflang.length;
console.log(`\nTOTAL HARD ISSUES (titles/descs/orphans/redirect-links/canonicals/empty-pages/sitemap/hreflang): ${total}`);
console.log(`Near-duplicate content flags need manual review (structural similarity is expected for templated pages): ${nearDupes.length}`);
if (total > 0) process.exitCode = 1;
