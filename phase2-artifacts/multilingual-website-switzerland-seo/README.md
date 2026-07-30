# Pilot 49 — Multilingual URL & hreflang Planner (EN)

Production-ready source for Phase-2 Artifact #49. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `multilingual-website-switzerland-seo` (en) |
| Language | English (en) |
| Article URL | https://weissmann.ai/en/ai-academy/marketing-seo-geo/multilingual-website-switzerland-seo/ |
| Artifact title | Multilingual URL & hreflang Planner · Weissmann |
| Interaction type | **Multilingual URL & hreflang structure planner/configurator: reader picks languages + a default locale, a URL pattern (subfolder / subdomain / separate domain / query param), and a localized slug per language, then gets recommended per-locale URLs, a live reciprocal hreflang + self-canonical <head> preview (copyable), and a context-driven watch-outs list.** |
| Private Claude URL | https://claude.ai/code/artifact/8261b2f4-bd64-4730-9634-ab10fb2017a1 |
| **Public URL** | **NOT YET PUBLIC** — manual owner Share required |
| Publication status | **PRIVATE** ("Share, private") |
| Service CTA | https://weissmann.ai/en/services/ai-web-development/ |

All mechanics and copy come from the article JSON: the four URL patterns and their verdicts (separate country domains, subdomains, locale-prefixed subfolders as the recommended default, query parameters as the one to avoid); reciprocal hreflang ('ignored if two pages don't both point to each other'), self-referencing canonicals never pointing back to the default, and x-default as a fallback not a ranking signal; de-CH under BCP 47 for Swiss High German (ss not ß) while en/it/fr use plain codes with the optional Swiss-variant caveat; the 'aus einer Hand' -> 'one team handles the whole project' localization example; the What-Can-Go-Wrong pitfalls (non-reciprocal hreflang, canonicalizing to default, thin machine translation, abandoned/outdated translation, slug drift); the maintenance test ('which can I keep current for as long as the page stays live'); and the real live example of this site's own slugs (leistungen/ki-webentwicklung, /en/services/ai-web-development/, /it/servizi/sviluppo-siti-web-ai/, /fr/services/developpement-web-ia/), English-only article with one self-alternate + x-default. Pricing facts are from pricing.ts, using only the websites service figures: Starter Website CHF 880 promo (regular CHF 2'490, one language, technical SEO/GEO foundation, extra languages not included), Business Website CHF 4'990 (multilingual-ready), Complex from CHF 9'900 (large multilingual architectures). No statistics, timelines, tool names, or legal claims were invented; user domain/slugs are transient inputs.

**Honesty caveats preserved:** Preserved the article's own caveats: no honest single timeline or price for adding a language without knowing page count and architecture; region tags (en-CH/it-CH/fr-CH) only matter if you specifically distinguish Swiss variants from France's/Italy's; publishing fewer well-maintained languages beats four with one abandoned; four national languages is not itself a reason to publish all four. Attributions kept to Google Search Central (localized versions, canonicalization) and IETF BCP 47. The .disc states it is orientation, not advice or a quote, cites those sources, and confirms the planner runs entirely in-browser with nothing saved, sent or stored; [your domain] is only a placeholder. Pricing framed as 'where a build fits', not a quote.

No invented claims, statistics or results; no personal-data collection; nothing stored (in-memory only); no external calls. Theme-aware, responsive, accessible.
