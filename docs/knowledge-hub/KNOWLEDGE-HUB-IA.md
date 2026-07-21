> **Note:** This hub-scoped IA is SUBORDINATE to the canonical whole-site information architecture in `../architecture/SITE-INFORMATION-ARCHITECTURE.md`. Where they differ, the site IA wins. This document details the internal structure of the AI Academy subtree only.

# Weissmann AI Academy — Knowledge-Hub Information Architecture

**Status:** Implementation-ready. Extends and stays subordinate to `docs/architecture/SITE-INFORMATION-ARCHITECTURE.md` (the canonical site-wide IA). Where that document already fixed a decision (Academy nests under `/ressourcen/`; full per-language slug localization; central registries drive everything), this document adopts it verbatim and specifies the Academy interior in depth.
**Stack contract:** Astro 5 static · Netlify · `trailingSlash: 'always'` · `build.format: 'directory'` · i18n `defaultLocale: 'de'`, `prefixDefaultLocale: false`, locales `['de','en','it','fr']` · DE at root, `/en/ /it/ /fr/` prefixed · `de` emits `hreflang="de-CH"`, `x-default` → German root · slugs are umlaut-free ASCII (`kuenstliche-intelligenz`, not `künstliche-…`), matching the existing `ueber-uns` / `llms.txt` transliteration convention.
**Forbidden on every page:** "Podomedics", "Culmannstrasse 39 / 8006 Zürich", "eyewear", any invented price/stat/testimonial/case-study number.

---

## 1. Two load-bearing principles (everything else follows)

**P1 — Topic is the silo; format is a template.** A page has two orthogonal attributes: its **topic** (which of the 9 clusters it deepens) and its **format** (pillar, concept-explainer, tutorial, how-to guide, comparison, glossary term, case study…). Only **topic** is expressed in the URL path (the machine-readable parent→child signal the whole project bets on). **Format is a template + a schema type + a tag — never a URL segment.** This is what stops a format×topic path explosion (9 clusters × 8 formats = 72 phantom index pages) and keeps topical authority concentrated per cluster. Consequence: **there is no `/tutorials/` or `/guides/` URL silo.** A tutorial such as *"KI für Anfänger"* lives at its topic address inside the Foundations cluster and merely renders the Tutorial template (`HowTo` schema). Tutorials/Guides get **filter views** (noindex, §11), never canonical homes.

**P2 — Cross-cutting reference libraries are the exception, and they own their items canonically.** Four formats are *consumed as standalone reference destinations*, aggregate across **all** clusters, and refresh on their own cadence: **Glossary, Comparisons, Tools Directory, Case Studies** (plus the transactional **Prompts** library and first-party **Calculators/Templates**). These get their own top-level namespace under `/ressourcen/` and are the **single canonical home** for their item type. A comparison like *ChatGPT vs Claude vs Gemini* lives in the Comparisons library, **not** duplicated inside three topic clusters — the clusters link to it. This is the same "single canonical + synonym-301" rule the site-wide matrix uses, applied to formats.

Together: **one head keyword → exactly one URL, tagged by intent** (informational Academy vs commercial Service). This is the cannibalization firewall, enforced in the registry at content-brief time.

---

## 2. Depth model & the `/ressourcen/` mount

```
/                                                     L0  Home
└─ /ressourcen/                                        L1  Resources hub (informational authority engine)
   ├─ /ressourcen/ki-academy/                          L2  Academy HUB-INDEX (directory of 9 clusters)
   │  └─ /ressourcen/ki-academy/{cluster}/             L3  CLUSTER PILLAR (= cluster index, one per cluster ×9)
   │     └─ /ressourcen/ki-academy/{cluster}/{spoke}/  L4  SPOKE (concept / tutorial / guide / learning-path)
   ├─ /ressourcen/ki-glossar/                          L2  Glossary index (A–Z)
   │  └─ /ressourcen/ki-glossar/{term}/                L3  DefinedTerm page
   ├─ /ressourcen/vergleiche/                          L2  Comparisons index
   │  └─ /ressourcen/vergleiche/{a-vs-b}/              L3  Comparison page
   ├─ /ressourcen/fallstudien/                         L2  Case Studies index
   │  └─ /ressourcen/fallstudien/{slug}/               L3  Case study (real-only / NEEDS VERIFICATION)
   ├─ /ressourcen/ki-tools/                            L2  Tools Directory index
   │  └─ /ressourcen/ki-tools/{category}/              L3  Tool-category page  (optional /{tool}/ leaf)
   ├─ /ressourcen/ki-prompts/                          L2  Prompts library index
   │  └─ /ressourcen/ki-prompts/{category}/            L3  Prompt-pack page
   ├─ /ressourcen/rechner/                             L2  Calculators index  (+ /{slug}/)
   └─ /ressourcen/vorlagen/                            L2  Templates index    (+ /{slug}/)
```

**Max canonical depth is L4** (spoke). EN worst case: `/en/resources/ai-academy/artificial-intelligence/how-machine-learning-works/` — five path segments. This is deliberate: the project's stated GEO thesis is that URL hierarchy is the primary parent→child signal for retrieval engines, so the extra depth *buys* breadcrumb derivation and entity binding. Spokes never nest deeper than one level below their pillar; sub-topics that would create an L5 are instead separate spokes or in-page H2 sections, never new path levels.

**The pillar is the cluster index.** There is no separate "cluster landing" page distinct from the pillar — the pillar page at the cluster root *is* the cluster's answer-first hub and spoke directory (§9). This collapses two page types into one URL and avoids a thin duplicate index.

---

## 3. Localized path-segment registry (the single source of truth)

Every segment below is a key in `src/data/slugs.ts`. Humans edit data; URLs, hreflang, breadcrumbs, sitemaps and `llms.txt` regenerate. All slugs ASCII, lowercase, hyphenated, no trailing punctuation.

### 3.1 Container segments (page-type namespaces)

| Page-type namespace | DE (root) | EN (`/en/`) | IT (`/it/`) | FR (`/fr/`) |
|---|---|---|---|---|
| Resources hub | `ressourcen` | `resources` | `risorse` | `ressources` |
| **Academy hub** | `ki-academy` | `ai-academy` | `ai-academy` | `academie-ia` |
| Glossary | `ki-glossar` | `ai-glossary` | `glossario-ai` | `glossaire-ia` |
| Comparisons | `vergleiche` | `comparisons` | `confronti` | `comparatifs` |
| Case Studies | `fallstudien` | `case-studies` | `casi-studio` | `etudes-de-cas` |
| Tools Directory | `ki-tools` | `ai-tools` | `strumenti-ai` | `outils-ia` |
| Prompts Library | `ki-prompts` | `ai-prompts` | `prompt-ai` | `prompts-ia` |
| Calculators | `rechner` | `calculators` | `calcolatori` | `calculateurs` |
| Templates | `vorlagen` | `templates` | `modelli` | `modeles` |
| Insights (news) | `insights` | `insights` | `insights` | `insights` |
| Pagination token | `seite` | `page` | `pagina` | `page` |

**Why these choices (justification requested):**
- **`ki-academy` / `ai-academy` / `academie-ia`** — matches `nav.learn` labels already in `ui.ts` ("AI Wissen / Learn AI / Impara l'AI / Comprendre l'IA") and the canonical doc. IT keeps `ai-academy` because "AI/Academy" are the live loanwords in Italian tech usage and carry the search volume; FR fully localizes (`academie-ia`) because French SEO/GEO and Swiss-Romand usage reward native form (`IA` is the dominant token, not `AI`).
- **`ki-glossar` / `glossario-ai`** — glossary is the highest-leverage GEO asset (each term = a citeable atomic answer); the native word plus the `ki`/`ai` qualifier maximizes the exact-match definitional query.
- **`vergleiche` / `comparatifs`** — comparisons are "the format LLMs quote most"; the native plural is the head term buyers type.
- **`ki-tools` / `outils-ia`** — reuses the existing `nav.tools` label; the directory is a living, refreshed first-party dataset (citation bait), so a clean stable namespace matters.
- **Localized `page`/`seite`/`pagina`** keeps paginated URLs in-language (§10).

DE deliberately keeps the `ki-` prefix (German), EN/IT keep `ai-`, FR uses `-ia` suffix — the standard the site-wide doc set for service slugs, applied identically here so the whole site reads as one coherent entity graph across four languages.

### 3.2 Cluster segments (the 9 topic pillars)

The cluster slug **is** the pillar URL, so it carries the pillar's head keyword. `→ Service` maps the cluster's commercial bridge (§8).

| # | Cluster (topic) | Pillar head kw | DE | EN | IT | FR | → Service bridge |
|---|---|---|---|---|---|---|---|
| 1 | AI Foundations, Concepts & Learning | *was ist künstliche intelligenz* | `kuenstliche-intelligenz` | `artificial-intelligence` | `intelligenza-artificiale` | `intelligence-artificielle` | AI Consulting / all |
| 2 | AI for Business & SMEs (KMU) | *KI für KMU* | `ki-fuer-kmu` | `ai-for-smes` | `ai-per-pmi` | `ia-pour-pme` | AI Consulting |
| 3 | AI Agents, Automation, Voice & Chatbots | *KI-Automatisierung* | `ki-automatisierung` | `ai-automation` | `automazione-ai` | `automatisation-ia` | Phone Assistant / Agents / Automation |
| 4 | AI Models & Vendors | *KI-Modelle Vergleich* | `ki-modelle` | `ai-models` | `modelli-ai` | `modeles-ia` | AI Consulting |
| 5 | Local AI, Open Source & Sovereignty | *local AI* | `lokale-ki` | `local-ai` | `ai-locale` | `ia-locale` | AI Integrations / Consulting |
| 6 | AI Trust: Security, Privacy & Regulation | *AI compliance Switzerland* | `ki-compliance` | `ai-compliance` | `conformita-ai` | `conformite-ia` | AI Consulting |
| 7 | AI Marketing, SEO & GEO | *AI marketing* | `ki-marketing` | `ai-marketing` | `ai-marketing` | `ia-marketing` | SEO Growth / GEO Authority / Google Ads |
| 8 | AI by Industry (Swiss Sector Playbooks) | *AI by industry* | `ki-branchen` | `ai-by-industry` | `ai-per-settore` | `ia-par-secteur` | ↔ commercial `/branchen/` hub |
| 9 | AI by Business Function | *AI by business function* | `ki-nach-funktion` | `ai-by-function` | `ai-per-funzione` | `ia-par-fonction` | Phone Assistant / Automation |

**Cluster 8 disambiguation (mandatory):** the Academy's `ki-branchen` cluster is **informational sector playbooks**; the site's commercial **`/branchen/` industries hub** (different silo, `Service` intent) is separate. They cross-link reciprocally ("Learn the sector playbook ↔ See the service for your sector") and never share a URL or head keyword — the Academy cluster owns *"KI im Gesundheitswesen Schweiz"* (informational), the commercial industry page owns *"KI-Telefonassistent Arztpraxis Anbieter"* (transactional).

---

## 4. Concrete URL pattern table — all page types × 4 languages

Representative canonical URLs (all `trailingSlash: always`). Spoke rows show the brief's flat slug re-homed into the nested model.

| Page type | DE (root) | EN | IT | FR |
|---|---|---|---|---|
| **Academy hub** | `/ressourcen/ki-academy/` | `/en/resources/ai-academy/` | `/it/risorse/ai-academy/` | `/fr/ressources/academie-ia/` |
| **Cluster pillar** (C1) | `/ressourcen/ki-academy/kuenstliche-intelligenz/` | `/en/resources/ai-academy/artificial-intelligence/` | `/it/risorse/ai-academy/intelligenza-artificiale/` | `/fr/ressources/academie-ia/intelligence-artificielle/` |
| **Spoke** — ML explainer (C1) | `…/kuenstliche-intelligenz/maschinelles-lernen/` | `…/artificial-intelligence/how-machine-learning-works/` | `…/intelligenza-artificiale/come-funziona-machine-learning/` | `…/intelligence-artificielle/comment-fonctionne-machine-learning/` |
| **Spoke** — LLM explainer (C1) | `…/kuenstliche-intelligenz/wie-llms-funktionieren/` | `…/artificial-intelligence/how-large-language-models-work/` | `…/intelligenza-artificiale/come-funzionano-llm/` | `…/intelligence-artificielle/comment-fonctionnent-llm/` |
| **Spoke — Tutorial fmt** (C1) | `…/kuenstliche-intelligenz/ki-fuer-anfaenger/` | `…/artificial-intelligence/ai-for-beginners/` | `…/intelligenza-artificiale/ai-per-principianti/` | `…/intelligence-artificielle/ia-pour-debutants/` |
| **Spoke — Guide fmt** (C2) | `/ressourcen/ki-academy/ki-fuer-kmu/ki-im-unternehmen-einfuehren/` | `/en/resources/ai-academy/ai-for-smes/how-to-implement-ai-in-your-sme/` | `/it/risorse/ai-academy/ai-per-pmi/come-implementare-ai-pmi/` | `/fr/ressources/academie-ia/ia-pour-pme/comment-implementer-ia-pme/` |
| **Glossary term** | `/ressourcen/ki-glossar/rag/` | `/en/resources/ai-glossary/rag/` | `/it/risorse/glossario-ai/rag/` | `/fr/ressources/glossaire-ia/rag/` |
| **Comparison** (brand) | `/ressourcen/vergleiche/chatgpt-vs-claude-vs-gemini/` | `/en/resources/comparisons/chatgpt-vs-claude-vs-gemini/` | `/it/risorse/confronti/chatgpt-vs-claude-vs-gemini/` | `/fr/ressources/comparatifs/chatgpt-vs-claude-vs-gemini/` |
| **Comparison** (concept) | `/ressourcen/vergleiche/geo-vs-seo-vs-aeo/` | `/en/resources/comparisons/geo-vs-seo-vs-aeo/` | `/it/risorse/confronti/geo-vs-seo-vs-aeo/` | `/fr/ressources/comparatifs/geo-vs-seo-vs-aeo/` |
| **Tools directory** (index) | `/ressourcen/ki-tools/` | `/en/resources/ai-tools/` | `/it/risorse/strumenti-ai/` | `/fr/ressources/outils-ia/` |
| **Tools category** | `/ressourcen/ki-tools/text-schreiben/` | `/en/resources/ai-tools/writing/` | `/it/risorse/strumenti-ai/scrittura/` | `/fr/ressources/outils-ia/redaction/` |
| **Prompts pack** | `/ressourcen/ki-prompts/marketing/` | `/en/resources/ai-prompts/marketing/` | `/it/risorse/prompt-ai/marketing/` | `/fr/ressources/prompts-ia/marketing/` |
| **Case study** | `/ressourcen/fallstudien/{slug}/` | `/en/resources/case-studies/{slug}/` | `/it/risorse/casi-studio/{slug}/` | `/fr/ressources/etudes-de-cas/{slug}/` |
| **Calculator** | `/ressourcen/rechner/ki-roi-kmu/` | `/en/resources/calculators/ai-roi-smes/` | `/it/risorse/calcolatori/roi-ai-pmi/` | `/fr/ressources/calculateurs/roi-ia-pme/` |
| **Paginated list** (page 2) | `/ressourcen/vergleiche/seite/2/` | `/en/resources/comparisons/page/2/` | `/it/risorse/confronti/pagina/2/` | `/fr/ressources/comparatifs/page/2/` |

**Comparison slug rule:** brand/acronym comparison slugs (`chatgpt-vs-claude-vs-gemini`, `openai-vs-anthropic`, `geo-vs-seo-vs-aeo`) are **identical across all four locales** — the entities are proper nouns and holding the slug stable strengthens cross-lingual entity resolution for retrieval engines; only the container segment (`vergleiche`/`comparisons`/…) localizes. **Glossary term slugs localize** where the term has a real native form (`neuronales-netz` vs `neural-network`) but stay identical for universal acronyms (`rag`, `llm`, `geo`).

**Where each brief "spoke" actually lands (reconciliation):**
- Concept explainers, tutorials, learning-paths, sector playbooks, function guides → **cluster spokes** (nested, L4).
- `ki glossar` → **Glossary library** (not a Foundations spoke URL).
- `beste ki tools` / `best-ai-tools-for-smes` → **Tools Directory** (`ki-tools`), cross-linked from Foundations + KMU clusters; one canonical URL.
- `chatgpt vs claude vs gemini`, `claude vs chatgpt vs gemini`, `openai vs anthropic`, `ai-agents-vs-automation`, `chatbot-vs-voicebot-vs-ivr`, `geo-vs-seo-vs-aeo`, `local-ai-vs-cloud-ai`, `open-weights-vs-open-source`, `ai-model-pricing-comparison` → **Comparisons library**.
- `chatgpt prompts` (150+ library) → **Prompts library** (transactional). `prompt engineering` (skill theory) stays a **Foundations spoke** — the two are split by intent exactly as the brief demands (learn-to-fish vs here-are-the-fish).
- `ai roi ... calculator`, `missed-call ROI` → **Calculators**. `ai readiness scorecard`, `AUP template`, compliance checklists → **Templates**.
- Real client stories → **Case Studies** (real-only gate).

---

## 5. hreflang mapping strategy

**Keying:** hreflang is generated from a **stable `translationKey`**, never from the slug (slugs differ per language, so slug-matching would break). Every Academy content item carries `translationKey` (e.g. `academy.c1.how-ml-works`); the registry resolves it to one localized path per locale.

```ts
// derived from slugs.ts + the content registry — never hand-written
function hreflangCluster(entry) {
  return LOCALES.map(l => ({
    hreflang: l === 'de' ? 'de-CH' : l,           // matches Layout.astro + sitemap.xml.ts
    href: SITE.domain + localePrefix(l) + entry.pathByLocale[l],  // trailing slash
  }));
}
// + <link rel="alternate" hreflang="x-default" href={deRootPath}>  (German = x-default)
```

**Rules:**
1. **Reciprocal & complete** — each of the four locale pages links to all four + `x-default`→DE, using the exact same generator as the existing `Layout.astro` (lines 54–57) and `sitemap.xml.ts` (which already emit `de-CH` + `x-default`). Academy pages pass `path` = the **DE-canonical logical path**; `Layout` maps it per locale via the registry. This requires upgrading `Layout`'s current assumption (same `path` across locales) to a **per-locale path lookup** — the one code change the Academy forces, because segments now differ by language.
2. **Four-language-sync invariant (build-time gate):** a spoke/pillar/term **cannot ship** unless all four `pathByLocale` entries exist in the registry. This structurally enforces the [four-language-sync policy] and prevents partial hreflang clusters. Missing a language fails CI, not production.
3. **No self-referential drift:** the self `<link rel=canonical>` equals the page's own localized URL; the alternate for its own locale points to itself.
4. **Library items** (glossary/comparison/case study) hreflang exactly like spokes — same `translationKey` mechanism.

---

## 6. Breadcrumb structure

Breadcrumbs are **derived from the registry path** (URL-aligned), rendered visibly **and** as `BreadcrumbList` JSON-LD on every non-hub Academy page, reusing the existing `breadcrumbs()` builder in `src/data/schema.ts` (localized names via `ui.ts` + registry labels).

| Page type | Breadcrumb trail (DE example) |
|---|---|
| Academy hub | Startseite › Ressourcen › KI-Academy |
| Cluster pillar | Startseite › Ressourcen › KI-Academy › Künstliche Intelligenz |
| Spoke | Startseite › Ressourcen › KI-Academy › Künstliche Intelligenz › Maschinelles Lernen erklärt |
| Glossary term | Startseite › Ressourcen › KI-Glossar › RAG |
| Comparison | Startseite › Ressourcen › Vergleiche › ChatGPT vs Claude vs Gemini |
| Case study | Startseite › Ressourcen › Fallstudien › {Title} |
| Tools category | Startseite › Ressourcen › KI-Tools › Text & Schreiben |

- **Crumb labels ≠ slugs** — labels are human, localized display names from the registry (`title` field), so `maschinelles-lernen` shows as "Maschinelles Lernen erklärt". `home` label comes from `t(locale,'breadcrumb.home')`.
- **Library items skip the cluster crumb** (they belong to no single cluster) — their trail is Hub › Library › Item. Their *topical* cluster relationship is expressed via the "Part of the {cluster} cluster" contextual link + `about`/`isPartOf` schema, not the breadcrumb.
- The **last crumb is not a link** (current page); `position` is 1-indexed per the existing builder.

```json
{ "@type":"BreadcrumbList","itemListElement":[
  {"@type":"ListItem","position":1,"name":"Startseite","item":"https://weissmann.ai/"},
  {"@type":"ListItem","position":2,"name":"Ressourcen","item":"https://weissmann.ai/ressourcen/"},
  {"@type":"ListItem","position":3,"name":"KI-Academy","item":"https://weissmann.ai/ressourcen/ki-academy/"},
  {"@type":"ListItem","position":4,"name":"Künstliche Intelligenz","item":"https://weissmann.ai/ressourcen/ki-academy/kuenstliche-intelligenz/"},
  {"@type":"ListItem","position":5,"name":"Maschinelles Lernen erklärt","item":"https://weissmann.ai/ressourcen/ki-academy/kuenstliche-intelligenz/maschinelles-lernen/"}
]}
```

---

## 7. Taxonomy: clusters + entity/tag facets, and how they map to navigation

The Academy is classified on **two independent axes**. Only Axis A shapes URLs.

### Axis A — Cluster (topic silo). Mandatory, exactly one per page.
Drives URL, breadcrumb, the cluster pillar it links up to, and its slot in the Academy sub-nav. The 9 clusters of §3.2. A page with genuine multi-cluster relevance (e.g. *RAG*) picks **one primary cluster** (its canonical home) and expresses the others as Axis-B tags — mirroring the site-wide "single canonical" rule.

### Axis B — Facet tags (metadata, not URLs). Many per page.
Stored in the content registry; power the "Related" module, internal-link graph, `llms.txt` grouping, and optional noindex filter views (§11). **Tag pages are not indexable by default** (thin-content and cannibalization risk). Facet vocabularies:

| Facet | Example values | Purpose |
|---|---|---|
| `format` | `pillar`, `concept-explainer`, `tutorial`, `guide`, `learning-path`, `comparison`, `glossary-term`, `case-study`, `directory`, `calculator`, `template` | selects template + schema type; drives filter views |
| `intent` | `informational`, `commercial-investigation`, `transactional` | cannibalization firewall; keeps head kw off service pages |
| `entity` | `OpenAI`, `Anthropic`, `Google DeepMind`, `EU AI Act`, `revDSG/nFADP`, `ISO/IEC 42001`, `NIST AI RMF`, `Apertus`, `Transformer`, `RAG` | entity density for retrieval binding; auto-links to glossary + `sameAs` |
| `glossaryTerms` | slugs into `/ki-glossar/` | auto-injects definition links; feeds the glossary backbone |
| `relatedService` | `phone-assistant`, `seo`, `geo`, … | builds the commercial bridge CTA (§8) |
| `relatedIndustry` | `healthcare`, `restaurants`, … | links to commercial `/branchen/` |
| `audience` | `beginner`, `practitioner`, `decision-maker` | powers learning-path ordering + filter views |
| `lastVerified` | ISO date | GEO freshness stamp; surfaced visibly + as `dateModified` |
| `author` | `giovanna-carpi`, `nicola-moessner` | E-E-A-T `Person` schema |

### Mapping to navigation
- **Global mega-menu → "Ressourcen"** (existing `nav.learn`/`nav.tools`/`nav.cases` labels), grouped **Learn / Tools / Proof** exactly as the site-wide doc specifies:
  - *Learn:* Academy (with the 9 clusters as a sub-column), Glossary, Comparisons.
  - *Tools:* Tools Directory, Prompts, Calculators, Templates.
  - *Proof:* Case Studies, Insights.
- **Academy hub-index** is the second-level directory: the 9 cluster pillars as cards (Axis A), each showing its spoke count + newest spoke.
- **Cluster pillar** is the third-level nav: lists its spokes (curated order = the learning path when `format:learning-path` exists), plus the cluster's glossary terms and the commercial-bridge CTA.
- **In-page "Related" module** (registry-generated, Axis-B driven) is the lateral nav that keeps every page ≥2 inbound links (orphan prevention).
- **Curated footer** carries top clusters + Glossary + one flagship comparison as a permanent safety net.

The mega-menu is **fixed-size** (9 clusters + "Alle Ressourcen ansehen" links) regardless of total page count — the scalability guarantee.

---

## 8. Page-type inventory: purpose · template · schema

| Page type | Format tag | Purpose | Canonical URL namespace | Template blocks (top→bottom) | Schema stack |
|---|---|---|---|---|---|
| **Academy hub-index** | `hub` | Route to 9 clusters; establish the Academy as an entity | `/…/ki-academy/` | TL;DR "what is the Academy"; 9 cluster cards; featured/newest; glossary teaser; author/E-E-A-T; search | `CollectionPage` + `ItemList`(clusters) + `BreadcrumbList` + `EducationalOrganization`(optional) |
| **Cluster pillar** | `pillar` | Own the head informational query; index the cluster; answer-first authority | `/…/ki-academy/{cluster}/` | **Kurzantwort/TL;DR box** (40–60 w); H2s = real questions each opening with a standalone answer; spoke directory (learning-path order); in-cluster glossary terms; **commercial bridge CTA**; author + `lastVerified` | `Article`/`TechArticle` + `FAQPage` + `ItemList`(spokes) + `BreadcrumbList` + `Person`(author) |
| **Spoke — concept explainer** | `concept-explainer` | Mechanism/definition depth for one concept | `/…/{cluster}/{spoke}/` | TL;DR; atomic H2 sections (entity named, no pronouns); diagram; glossary inline; "next in path"; bridge CTA | `Article`/`TechArticle` + `FAQPage` + `BreadcrumbList` + `Person` |
| **Spoke — tutorial** | `tutorial` | First-session, do-it-now walkthrough | `/…/{cluster}/{spoke}/` | TL;DR; numbered steps w/ screenshots; prerequisites; pitfalls; "what next" | **`HowTo`** + `Article` + `FAQPage` + `BreadcrumbList` |
| **Spoke — guide** | `guide` | Multi-stage practitioner playbook | `/…/{cluster}/{spoke}/` | TL;DR; phased steps (map to Weissmann AI Method); checklist; template link | `HowTo` + `Article` + `FAQPage` + `BreadcrumbList` |
| **Spoke — learning-path** | `learning-path` | Ordered curriculum linking every spoke | `/…/{cluster}/{spoke}/` | TL;DR; staged reading order; per-stage outcomes; links to spokes | `Article` + `ItemList`(ordered) + `Course`(optional) + `BreadcrumbList` |
| **Glossary term** | `glossary-term` | Atomic citeable definition (top GEO asset) | `/…/ki-glossar/{term}/` | 1–2-sentence answer-first definition; "in one sentence"; longer explanation; related terms; source citation | **`DefinedTerm`** (in `DefinedTermSet`) + `BreadcrumbList` + optional `QAPage` |
| **Glossary index** | `hub` | A–Z term set + backbone | `/…/ki-glossar/` | intro; A–Z jump nav; grouped term list; per-cluster filter | `DefinedTermSet` + `CollectionPage` + `BreadcrumbList` |
| **Comparison** | `comparison` | "X vs Y" verdict-by-use-case | `/…/vergleiche/{a-vs-b}/` | **Answer-first "winner" box**; criteria table; verdict-by-use-case; per-option deep-dives; FAQ; freshness stamp | `Article` + `FAQPage` + `BreadcrumbList` (+ `SoftwareApplication` per option where a product) |
| **Case study** | `case-study` | Bottom-funnel proof (real-only) | `/…/fallstudien/{slug}/` | context; challenge; approach (Weissmann Method); **verified** metrics or `NEEDS VERIFICATION`; quote (permissioned) | `Article` + `BreadcrumbList` (+ `Review`/`ClaimReview` only if verifiable) |
| **Tools directory (index + category)** | `directory` | Curated first-party tool dataset (citation bait) | `/…/ki-tools/{category}/` | intro; category filter; tool cards (name, use, Swiss-residency flag); refresh date | `ItemList` + `CollectionPage` + `Dataset` + `BreadcrumbList` |
| **Prompts pack** | `template` | Ready-to-use prompts by use case (transactional) | `/…/ki-prompts/{category}/` | intro; copy-to-clipboard prompt cards; downloadable pack; CTA | `ItemList` + `CreativeWork` + `BreadcrumbList` |
| **Calculator** | `calculator` | Interactive first-party tool (lead-gen) | `/…/rechner/{slug}/` | answer-first "what this computes"; interactive widget; methodology; CTA | `WebApplication`/`SoftwareApplication` + `FAQPage` + `BreadcrumbList` |
| **Template** | `template` | Downloadable framework/checklist | `/…/vorlagen/{slug}/` | intro; preview; download; how-to-use | `CreativeWork` + `BreadcrumbList` |

All pages self-canonical, carry the localized `hreflang` cluster, a visible **"Zuletzt aktualisiert / Last verified"** date, and named-author `Person` schema (Giovanna Carpi / Nicola Mössner) tied to the existing `Organization` `@id` in `schema.ts`. All schema objects render inside the existing single `@graph` mechanism in `Layout.astro`.

---

## 9. Hub-index and cluster-index (pillar) page design

**Academy hub-index (`/ressourcen/ki-academy/`)**
- **Answer-first hero:** 40–60-word definition of the Academy as an entity ("The Weissmann AI Academy is a four-language, Swiss-focused reference on practical AI…"), so retrieval engines can lift and attribute it.
- **9 cluster cards** (registry-generated `ItemList`): title, one-line scope, spoke count, newest-spoke link, cluster icon.
- **Featured / freshest strips:** most-updated spokes (freshness is a selection signal), one flagship comparison, one glossary teaser (A–Z entry point).
- **E-E-A-T band:** authors, "how we verify", last-updated cadence.
- **Machine surfaces:** listed as a canonical reference in `llms.txt`; `CollectionPage`+`ItemList` schema; internal search box (`WebSite`+`SearchAction` at site level already present).
- **No pagination** (fixed 9 clusters).

**Cluster pillar / cluster-index (`/ressourcen/ki-academy/{cluster}/`)** — one page does double duty:
- **`Kurzantwort` / TL;DR box** up top: the standalone 40–60-word answer to the head query (*"Was ist künstliche Intelligenz?"*), the chunk an assistant quotes.
- **Question-shaped H2s**, each opening with its own liftable answer, then depth — the pillar summarizes the cluster and links **down** to every spoke.
- **Spoke directory** rendered in **learning-path order** when a `learning-path` spoke defines it, else by audience tier (beginner→practitioner→decision-maker).
- **In-cluster glossary terms** block (links into `/ki-glossar/`) — the internal-linking backbone.
- **Commercial bridge:** one clearly-separated "Ready to implement? → {mapped service}" CTA (§8 mapping), never in the informational core.
- **Cross-cluster rail:** links to sibling clusters and the cross-cutting libraries this cluster feeds (e.g. Foundations → Comparisons, Glossary, Tools).
- **Schema:** `Article`/`TechArticle` + `FAQPage` + `ItemList`(spokes) + `Person` + `BreadcrumbList`.
- **No pagination** (a cluster has ~10–13 spokes; all listed on one pillar).

---

## 10. Pagination & scaling per surface

The Academy topic silos are **finite and shallow** by design → no pagination. Only the cross-cutting libraries grow unboundedly, and each uses the cheapest device that avoids deep numeric pagination:

| Surface | Growth | Strategy |
|---|---|---|
| Cluster pillar (spoke list) | ~10–13 | **None** — single page lists all spokes. |
| **Glossary** (100+ terms) | high | **A–Z index + per-letter anchors + per-cluster filter**, all on one indexable index; each term is its own page. **No numeric pagination** — a full scannable A–Z is better for GEO (whole set citeable) and users. |
| **Comparisons** | medium | **Category facets** (models / concepts / tools) as the primary browse; numeric pagination only as fallback with localized token (`…/vergleiche/seite/2/`), each paginated page **self-canonical**, all items also reachable from the hub (no orphan). |
| **Tools directory** | high, frequent refresh | **Category pages** (`/ki-tools/{category}/`) are the unit; the index is a category grid, not a paginated firehose. `Dataset` schema + visible refresh date. |
| **Case Studies** | low | Single index until >~20; then industry/service facets. |
| **Insights** (news) | chronological, high | The **only** surface using true numeric pagination (`…/insights/page/2/`), self-canonical per page, newest-first; `Article` + `dateModified`. |

**Rules for any paginated set:** self-referential canonical on each page (never canonical-to-page-1 — that de-indexes deep items); `rel=next/prev` omitted (Google ignores it) but a "view-all"/facet path always exists so every item stays ≤2 clicks and ≥2 inbound links; page-2+ may carry `noindex` only if items are fully reachable via facets. Astro implements this with `paginate()` in `getStaticPaths`, base path pulled from the localized `page`/`seite`/`pagina` token.

---

## 11. Filter / tag views (tutorials, guides, downloads, by-audience)

Because format is a template not a URL (P1), users still deserve browsable "all tutorials" / "all guides" / "all downloads" landings. These render as **filter views** (mirroring the site-wide "Downloads is a filter view" decision):
- Path e.g. `/ressourcen/ki-academy/tutorials/` (localized token), rendered from the `format` facet.
- **`noindex, follow`** — they aggregate canonical pages that live elsewhere; indexing them would create thin duplicate indexes and cannibalize the clusters.
- Excluded from the sitemap; still crawlable/followable so link equity flows; useful for humans and internal linking, invisible as ranking targets.

---

## 12. Relationship to Service and Industry pages

**Intent-separated, reciprocally linked, one-keyword-one-URL — never cross-canonicalized.** The Academy owns informational intent; Services/Industries own commercial intent; both rank because the queries differ.

| Academy surface | Owns (informational kw) | Bridges to (commercial) | Link direction |
|---|---|---|---|
| C3 pillar *KI-Automatisierung* | "was ist KI-Automatisierung", "KI-Agenten erklärt" | `/leistungen/ki-telefonassistent/`, `/leistungen/ki-agenten/`, `/leistungen/ki-automatisierung/` | pillar → "Ready to implement?" CTA; service → "Learn the fundamentals" back-link |
| C7 pillar *AI Marketing / GEO* | "generative engine optimization", "AI SEO" | `/leistungen/generative-engine-optimization/`, `/leistungen/seo/`, `/leistungen/google-ads/` | reciprocal |
| C2 pillar *AI for SMEs* | "KI für KMU", "KI Anwendungsbeispiele KMU" | `/leistungen/ki-beratung/` | reciprocal |
| C8 cluster *AI by Industry* (informational playbooks) | "KI im Gesundheitswesen Schweiz" | commercial `/branchen/{industry}/` hub + matrix pages | reciprocal, explicit disambiguation block |
| Glossary term (e.g. *RAG*) | the definition | the operationalizing service | term → "See it in action → {service}" |

- The **registry keyword map** guarantees no head keyword is assigned to both an Academy and a service page; conflicts fail the content-brief gate.
- Cross-links use exact-match/descriptive anchors so Google/LLMs read an explicit informational↔commercial topical relationship — the Academy's authority **compounds onto** the money pages instead of splitting rankings.
- Prices in any Academy page (cost/ROI spokes, calculators) come **only** from `pricing.ts`; uncertain figures render as labelled examples or `NEEDS VERIFICATION`. No `Offer` schema on Academy pages (informational, not transactional).

---

## 13. Sitemap segmentation

The current single `src/pages/sitemap.xml.ts` will not scale to hundreds of URLs × 4 locales. Replace with a **sitemap index + segment endpoints**, each generated from the same registries (so it never drifts) and each emitting the localized `hreflang` cluster + `x-default` + `lastmod` per URL (extending the existing `xhtml:link` pattern already in the file).

```
/sitemap.xml                      → <sitemapindex> pointing to the segments below
/sitemap-core.xml                 → home, resources hub, academy hub, library indexes
/sitemap-academy.xml              → all cluster pillars + spokes (×4 locales)
/sitemap-glossary.xml             → all DefinedTerm pages
/sitemap-comparisons.xml          → all comparison pages
/sitemap-case-studies.xml         → all case studies
/sitemap-tools.xml                → tools directory + categories (Dataset)
/sitemap-insights.xml             → news (chronological)
/sitemap-services.xml             → (owned by site-wide IA)
/sitemap-industries.xml           → (owned by site-wide IA)
```

- **Excluded:** filter views (§11), `noindex` pages (thank-you, legal drafts), paginated pages beyond page 1 where facets cover them.
- **`lastmod`** = the content item's `lastVerified` — reinforces the freshness selection signal for AI crawlers.
- Keep each segment well under the 50k-URL / 50 MB ceiling (never a real risk here, but the index makes future growth free).
- `robots.txt` already `Allow`s GPTBot/ClaudeBot/PerplexityBot/Google-Extended and points to `/sitemap.xml`; add `OAI-SearchBot` and (optionally) `Google-Extended` confirmation, and list the Academy hub + Glossary + pillar URLs as canonical references in `/llms.txt` and a new `/llms-full.txt`.

---

## 14. Astro 5 implementation (routing, collections, registries)

**Content Layer (Astro 5) collections** enforce the four-language-sync + uniqueness invariants at build time — the modern replacement for hand-wired pages:

```
src/content/
  academy/        # one .mdx per {locale × spoke}, front-matter: translationKey, cluster,
                  # format, intent, entities[], glossaryTerms[], relatedService,
                  # relatedIndustry, audience, author, lastVerified, locale
  glossary/       # one .mdx per {locale × term}: translationKey, term, cluster, sources[]
  comparisons/    # translationKey, options[], verdictByUseCase[]
  case-studies/   # translationKey, verified:boolean (gate), metrics[]
src/data/
  slugs.ts        # §3 segment + cluster registry, keyed for all 4 locales
  academy.ts      # cluster → pillar meta, spoke order, service bridge
  keyword-map.ts  # head-kw → single URL + intent (cannibalization firewall)
```

- **Zod `schema` on each collection** makes a missing locale, a missing `lastVerified`, an unverified case study, or a keyword collision a **build failure** — the CI governance gate.
- **Dynamic routes** (localized segments ⇒ catch-alls per locale, DE at root):

```
src/pages/ressourcen/ki-academy/[...slug].astro        // DE
src/pages/en/resources/ai-academy/[...slug].astro      // EN
src/pages/it/risorse/ai-academy/[...slug].astro        // IT
src/pages/fr/ressources/academie-ia/[...slug].astro    // FR
// + parallel quartets for ki-glossar / vergleiche / fallstudien / ki-tools / …
```

Each route's `getStaticPaths()` reads the collection, filters to its locale, and builds `slug` from `slugs.ts`; the page passes the **DE-canonical logical path** + `pathByLocale` map to `Layout.astro`, which emits canonical + the full localized hreflang cluster. `getStaticEntryBySlug` resolves the registry entry for template + schema selection. `trailingSlash: 'always'` and `format: 'directory'` are already set, so every page ships as `…/slug/index.html` on Netlify.
- **Reuse existing builders** unchanged: `breadcrumbs()`, `faqPage()`, `webPage()`, `organization()`, `webSite()` in `schema.ts`; `t()` + `UI` in `ui.ts` (add `nav`/breadcrumb labels for the new segments); `localeUrl()`/`localePrefix()` in `site.ts`.
- **One required `Layout` upgrade:** accept a `pathByLocale` prop (or resolve it from the registry) so hreflang alternates use per-locale slugs instead of assuming an identical `path` across locales (lines 54–57). This is the single structural change the localized Academy forces.
- **OneDrive caveat:** confirm the repo is moved out of OneDrive before generating hundreds of collection files (prior corruption incident); respect the Netlify 24 h JS-cache window when verifying deploys.

---

## 15. Governance gate & open decisions

**CI must fail the build on:** any indexable Academy page with <2 inbound internal links (orphan); any incomplete hreflang/`pathByLocale` cluster (four-language-sync); any head keyword mapped to >1 URL (`keyword-map.ts`); any case study with `verified:false` reaching an indexable path; any broken internal link; any missing `lastVerified`/author.

**Decisions to confirm with the owner (Academy-specific, on top of the site-wide list):**
1. Cluster slugs in §3.2 — especially DE `kuenstliche-intelligenz` as pillar-1 URL (vs `ki-grundlagen`), and IT keeping `ai-academy`/`ai-marketing` loanwords vs full localization.
2. Spoke nesting to L4 (`/{cluster}/{spoke}/`) vs a flatter `/ki-academy/{spoke}/` — recommend nested (§2 rationale); confirm the depth is acceptable.
3. Comparison slugs identical across locales for brand/acronym pages (recommended) vs fully localized.
4. Which of the 9 clusters launch first (four-language-sync per cluster) — recommend C1 Foundations + Glossary backbone first (they're the internal-linking spine every other cluster links into), then C3 Agents/Automation and C7 Marketing/GEO (closest to revenue).
5. Prompts library as its own namespace (`ki-prompts`) vs folded into Templates — recommend standalone (transactional intent, distinct refresh cadence).
6. Author attribution split (which clusters bylined Giovanna vs Nicola) for `Person`/E-E-A-T schema.
7. Real case studies / verified metrics per cluster — none may be invented; unconfirmed → `NEEDS VERIFICATION`.

---

**Key file references (existing, to extend — all absolute):**
`C:\Users\giova\OneDrive\Desktop\weissmann-ai\astro.config.mjs` · `src\data\site.ts` · `src\data\schema.ts` · `src\i18n\ui.ts` · `src\layouts\Layout.astro` (needs `pathByLocale`) · `src\pages\sitemap.xml.ts` (replace with index+segments) · `src\components\Header.astro` (mega-menu) · `public\robots.txt` / `public\llms.txt` (add Academy references). Aligns with `docs\architecture\SITE-INFORMATION-ARCHITECTURE.md`.
