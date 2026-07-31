/**
 * IndexNow submitter — asks IndexNow-participating engines (Bing, Yandex, and
 * downstream ChatGPT/Copilot search) to re-crawl weissmann.ai's pages within
 * minutes. Google does NOT use IndexNow — use Google Search Console for Google.
 *
 * Run POST-DEPLOY (the key file must already be live), e.g.:
 *   node scripts/indexnow.mjs
 * The public key file (public/<KEY>.txt) proves ownership; keys are meant to be
 * public, so committing it is expected. To rotate: change KEY here + the file.
 */
const KEY = '5f3a9c2e8b7d41a6c0e94f1b6d827a35';
const HOST = 'weissmann.ai';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;

const res = await fetch(SITEMAP);
if (!res.ok) { console.error(`Could not fetch sitemap (HTTP ${res.status}).`); process.exit(1); }
const xml = await res.text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) { console.error('No <loc> URLs found in sitemap.'); process.exit(1); }

// IndexNow accepts up to 10,000 URLs per request.
const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urlList.slice(0, 10000) };
const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
console.log(`IndexNow: submitted ${body.urlList.length} URLs → HTTP ${r.status} ${r.statusText}`);
if (r.status >= 400) process.exit(1);
