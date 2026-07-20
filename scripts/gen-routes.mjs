/**
 * One-off generator for the thin locale route files. Each route file only
 * imports its page component with the right locale — all content lives in
 * src/components/pages/.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'pages');

const PAGES = [
  { file: 'index.astro', component: 'HomePage' },
  { file: 'ki-telefonassistent/index.astro', component: 'PhoneAgentPage' },
  { file: 'leistungen/ai-websites/index.astro', component: 'WebsitesPage' },
  { file: 'preise/index.astro', component: 'PricingPage' },
  { file: 'ueber-uns/index.astro', component: 'AboutPage' },
  { file: 'kontakt/index.astro', component: 'ContactPage' },
  { file: 'danke/index.astro', component: 'DankePage' },
  { file: 'impressum/index.astro', component: 'LegalPage', props: `kind="impressum"` },
  { file: 'datenschutz/index.astro', component: 'LegalPage', props: `kind="datenschutz"` },
  { file: 'agb/index.astro', component: 'LegalPage', props: `kind="agb"` },
];
const LOCALES = ['de', 'en', 'it', 'fr'];

for (const locale of LOCALES) {
  for (const page of PAGES) {
    const rel = locale === 'de' ? page.file : `${locale}/${page.file}`;
    const target = join(root, rel);
    const depth = rel.split('/').length; // segments incl. filename
    const up = '../'.repeat(depth);
    const props = page.props ? ` ${page.props}` : '';
    const content = `---
import ${page.component} from '${up}components/pages/${page.component}.astro';
---

<${page.component} locale="${locale}"${props} />
`;
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content, 'utf8');
    console.log('wrote', rel);
  }
}
console.log('done');
