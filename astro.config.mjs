import { defineConfig } from 'astro/config';

// Weissmann AI — static-first, four locales, German default at the root.
// URL model: extensionless, trailing slash (…/slug/), matching the redirect
// and hreflang architecture. Netlify serves each page from <slug>/index.html.
export default defineConfig({
  site: 'https://weissmann.ai',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en', 'it', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
