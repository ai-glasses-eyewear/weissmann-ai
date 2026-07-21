/**
 * Broken-internal-link + image-dimension (CLS) check over dist/ (dev tool).
 * Ensures every root-relative internal href resolves to a built page or asset.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
function* walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}
const toUrl = (f) => '/' + relative(dist, f).split(sep).join('/');

const pages = new Set();
const files = new Set();
for (const f of walk(dist)) {
  const rel = toUrl(f);
  if (f.endsWith('index.html')) {
    let u = rel.replace(/index\.html$/, '');
    if (!u.endsWith('/')) u += '/';
    pages.add(u);
  } else files.add(rel);
}

const broken = new Map();
let imgs = 0;
let imgNoDim = 0;
for (const f of walk(dist)) {
  if (!f.endsWith('.html')) continue;
  const t = readFileSync(f, 'utf8');
  const src = toUrl(f);
  for (const m of t.matchAll(/href="(\/[^"#?]*)"/g)) {
    const h = m[1];
    if (h.startsWith('//')) continue;
    let norm = h;
    if (!/\.[a-z0-9]+$/i.test(norm) && !norm.endsWith('/')) norm += '/';
    if (pages.has(norm) || files.has(h) || files.has(norm)) continue;
    broken.set(h, (broken.get(h) || new Set()).add(src));
  }
  for (const im of t.match(/<img\b[^>]*>/g) || []) {
    imgs++;
    if (!/\bwidth=/.test(im) || !/\bheight=/.test(im)) imgNoDim++;
  }
}

console.log('Valid page URLs:', pages.size, '| static files:', files.size);
console.log('Images:', imgs, '| without width+height (CLS risk):', imgNoDim);
const b = [...broken.entries()].sort((a, c) => c[1].size - a[1].size);
console.log('BROKEN internal link targets:', b.length);
for (const [h, srcs] of b.slice(0, 30)) console.log(`  ${srcs.size}x  ${h}`);
