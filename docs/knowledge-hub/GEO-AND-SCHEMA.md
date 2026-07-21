# Weissmann AI Academy — GEO, Structured Data & AI-Discoverability Layer

**Deliverable:** The Generative-Engine-Optimization + schema.org + AI-crawler layer that makes every Academy page the passage ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews lift and cite back to weissmann.ai.
**Stack:** Astro 5 static build on Netlify · i18n (DE at root, `/en/` `/fr/` `/it/`) · `trailingSlash: 'always'` · central config (`site.ts`, `pricing.ts`, plus new `entities.ts`, `authors.ts`, `glossary.ts`) as single source of truth.
**Scope note:** the eyewear site in this repo is referenced only as the *proven pattern* (knowledge hub + JSON-LD + llms.txt + crawler allowlist). Nothing from it is reused as content.

---

## 0. Design principles (the non-negotiables)

1. **Config-derived, never hand-written.** Every JSON-LD block is emitted by a shared Astro component from typed config. A writer never pastes a `<script type="application/ld+json">`. This guarantees 4-language parity and eliminates the drift that makes schema untrustworthy to crawlers.
2. **One entity, four languages.** DE/EN/FR/IT versions of a page share the *same* `@id`, `sameAs`, author `@id`, and Organization `@id`. Only human-readable strings and `inLanguage` change. Cross-lingual citations must resolve to one Weissmann knowledge graph.
3. **Answer-first or it does not ship.** No page passes review without a lead answer paragraph (40–60 words) and a TL;DR box. LLMs retrieve paragraphs, not pages.
4. **Grounded or labelled.** Every stat carries an inline source + date, or it is written as a labelled tier/estimate, or it is marked `NEEDS VERIFICATION` and not rendered as fact. Fabrication is the one thing that permanently loses citeability.
5. **Freshness is a ranking signal.** `dateModified` and a visible "Zuletzt aktualisiert / Last verified" stamp are mandatory and must be truthful (driven by git/frontmatter, not `Date.now()`).

---

## 1. Central-config → schema derivation

The schema layer reads from typed config so the same facts drive pages, hreflang, sitemap and JSON-LD in all four languages.

| Config file | Feeds | Schema consumers |
|---|---|---|
| `site.ts` | domain, org legal name, address (Technoparkstrasse 6, 8005 Zürich), logo, social profiles, default language map | `Organization`, `WebSite`, `sameAs`, `publisher` on every Article |
| `pricing.ts` | service tiers + prices (Phone Assistant Starter/Premium, Websites, SEO/GEO/Ads) | `Service`/`Offer` price fields — **only** place a price may appear; pages that can't ground a figure render "auf Anfrage", never a number |
| `authors.ts` (new) | Giovanna Carpi, Nicola Moessner — role, `sameAs` (LinkedIn, Wikidata if/when created), `knowsAbout`, `@id` | `Person` author graph, E-E-A-T byline |
| `entities.ts` (new) | canonical entity registry: name + `sameAs` per concept (OpenAI, Anthropic, EU AI Act, revDSG, Apertus, ISO/IEC 42001…) | `about`/`mentions`, `DefinedTerm` `sameAs`, disambiguation |
| `glossary.ts` (new) | 4-language term set, one record per term with `@id`, definition, source | `DefinedTermSet` + `DefinedTerm` + `QAPage` |
| `clusters.ts` (new) | pillar↔spoke map, slugs per language, `about` entity, primary service link | `BreadcrumbList`, `ItemList`, internal-link backbone, llms.txt generation |

**Rule:** a fact lives in exactly one config file. If a price, address, author or entity URL changes, it changes once and re-propagates to all pages, all languages, all JSON-LD.

---

## 2. Schema.org type matrix (per page type)

Every page gets a **`@graph`** array with a stable `@id` per node, cross-linked by `@id` reference (not duplication). Baseline nodes on *every* page: `Organization` (ref by `@id`), `WebSite`, `BreadcrumbList`, `WebPage`.

| Academy page type | Example URL | Primary type(s) | Required / high-value properties | Derived from |
|---|---|---|---|---|
| **Pillar** (concept hub) | `/artificial-intelligence-explained/` | `Article` + `WebPage` | `headline`, `description`, `author`(@id), `publisher`(@id), `datePublished`, `dateModified`, `inLanguage`, `about`(entity), `mentions[]`, `isPartOf`(WebSite), `mainEntityOfPage`, `image` | clusters.ts, authors.ts, entities.ts |
| **Concept/mechanism explainer** | `/how-large-language-models-work/` | `TechArticle` + `FAQPage` | as Article + `dependencies`/`proficiencyLevel` optional; FAQPage `mainEntity[]` mirroring H2 questions | frontmatter FAQ block |
| **Taxonomy / comparison-table page** | `/types-of-artificial-intelligence/`, `/chatgpt-vs-claude-vs-gemini/` | `Article` + `ItemList` (+ `FAQPage`) | ItemList `itemListElement[]` with `ListItem.position`+`item`; each compared entity as `Thing`/`SoftwareApplication` with `sameAs`; explicit verdict node | comparison dataset in frontmatter |
| **Glossary hub** | `/ai-glossary/` | `DefinedTermSet` + `CollectionPage` | `hasDefinedTerm[]` (or `hasPart`), `name`, `inLanguage`, stable `@id` | glossary.ts |
| **Single glossary term** (anchor) | `/ai-glossary/#rag` | `DefinedTerm` in `QAPage` | `DefinedTerm`: `name`, `description`, `inDefinedTermSet`(@id), `sameAs`(Wikidata/official), `termCode`; `QAPage.mainEntity` = `Question`+`acceptedAnswer` | glossary.ts |
| **How-to / tutorial / procedure** | `/how-to-use-ai-for-beginners/`, `/ai-data-protection-impact-assessment/` | `HowTo` + `Article` | `HowTo`: `step[]` (`HowToStep` name+text+url anchor), `totalTime`, `tool`/`supply` where real; FAQPage optional | numbered-steps frontmatter |
| **Learning path / roadmap** | `/how-to-learn-ai/` | `Course` + `LearningResource` | `Course`: `hasCourseInstance` optional, `teaches`, `educationalLevel`, `provider`(Organization @id); `LearningResource.learningResourceType:"reading path"` | clusters.ts reading order |
| **Prompt / template library** | `/ai-prompts/` | `Article` + `ItemList` (+ `Dataset`) | ItemList of prompts (`CreativeWork`/`Text`); `Dataset` if downloadable pack (name, description, license, `distribution`) | prompts dataset |
| **Tools directory** | `/best-ai-tools/`, `/best-ai-tools-for-smes/` | `Article` + `ItemList` of `SoftwareApplication` | each: `name`, `applicationCategory`, `operatingSystem`, `sameAs`(official), Swiss-residency note as `additionalProperty` | tools dataset (versioned) |
| **Service-adjacent commercial** | `/was-ist-ki-telefonassistent/` | `TechArticle` + `FAQPage` + `Service`(ref) | Article links `about`→`Service`@id defined once in site config; price via pricing.ts only | pricing.ts, clusters.ts |
| **Industry / function pillar** | `/ai-by-industry/`, `/ai-for-customer-support/` | `Article` + `FAQPage` (+ `ItemList` of use cases) | `about`(industry entity), `audience`(`BusinessAudience`), mentions of Swiss regulators | entities.ts |
| **Calculator / first-party asset** | ROI calculator, readiness scorecard | `WebApplication` + `Dataset` | `WebApplication.applicationCategory:"BusinessApplication"`; `Dataset` for the underlying model with `license`, `creator`(@id), `dateModified` | asset config |
| **Case-study framework** | `/ai-case-studies-swiss-smes/` | `Article` only (no `Review`/`AggregateRating` until real, permissioned) | never emit rating/testimonial schema without written permission + verified metric | — |

**First-party citation-bait assets get `Dataset` schema** (tools directory, comparison tables, funding directory, ROI model, latency benchmark). Dataset is the highest-leverage type here: unique + structured + attributable + refreshable = exactly what an assistant prefers to quote.

---

## 3. Answer-first formatting patterns (mandatory page skeleton)

Every Academy page, all four languages, follows this order:

```
H1  (the entity/question, matches primary kw)
─ Kurzantwort / TL;DR box  ← 40–60 words, self-contained, entity named in full, no "it"/"this"
─ Key facts / Kernaussagen  ← 3–5 standalone bullets, each independently quotable, each grounded
─ Definition-first paragraph  ← "X ist … / X is …" (feeds entity resolution + DefinedTerm)
H2 = real question  → opens with 2–3 sentence direct answer, THEN expands
H2 = real question  → same
… comparison table / decision box where applicable …
─ Quellen / Sources  (inline links, dated)
─ Autor + "Zuletzt aktualisiert / Last verified: <date>"
```

**Concrete rules for writers:**
- **H2/H3 are questions**, phrased as the DE/EN/FR/IT query is actually typed ("Wie funktionieren Large Language Models?" / "How do large language models work?"). These strings must equal the `Question.name` in FAQPage schema.
- **Atomic sections:** each H2 block must read correctly if lifted out with zero surrounding context. Name the entity every time ("Ein KI-Telefonassistent …", not "Dieser …").
- **TL;DR box** is a real DOM element (`<aside class="tldr">`), not a schema-only field, so it survives extraction and is visible to users.
- **One definitional sentence per concept**, formatted `Entity ist/is …` so knowledge-graph extraction is trivial.

---

## 4. Key-facts & stat blocks (grounded only)

The "Key facts" block is the single highest-value extraction target. Governance:

| Situation | How it renders |
|---|---|
| Fact from a named primary source | Inline: claim + linked source + date, e.g. "revDSG in Kraft seit 1. September 2023 (Fedlex)." |
| Regulatory instrument | Name it precisely: "EU AI Act = Verordnung (EU) 2024/1689", "OWASP LLM01 = Prompt Injection", "EU AI Act Art. 50 (Offenlegungspflicht)". |
| Market/adoption figure | Only if attributable + dated (e.g. "AXA 22 %→34 %, 2024→2025"); else express as **tier** (very-high/high/medium/low/niche) explicitly labelled as an estimate. |
| Search demand | **Never** a monthly volume number. Always a labelled tier. |
| Price | **Only** from `pricing.ts`. Article teaches cost *structure*; illustrative numbers labelled "Beispiel". |
| Cannot ground | `NEEDS VERIFICATION` in source; not rendered as a fact. |

Rule of thumb from the cluster briefs: a citeable, dated fact roughly every 150–200 words — but honesty over density. A page that fabricates one number loses trust for all its numbers.

---

## 5. Entity strategy & the Weissmann knowledge graph

**Two jobs:** (a) bind each page to canonical world entities so retrievers resolve the topic; (b) build a persistent Weissmann entity graph so citations attribute to the org.

**(a) External entity binding — `entities.ts`.** Central registry; every concept has a canonical name + `sameAs`. Used in `about`/`mentions` and in `DefinedTerm.sameAs`.

| Entity | `sameAs` target |
|---|---|
| Anthropic / Claude, OpenAI / ChatGPT, Google DeepMind / Gemini, Microsoft Copilot | Wikidata + official site |
| EU AI Act | EUR-Lex (Reg. (EU) 2024/1689) |
| revDSG / nFADP, EDÖB/FDPIC | Fedlex, edoeb.admin.ch |
| ISO/IEC 42001, NIST AI RMF, OWASP Top 10 for LLM | ISO, NIST, OWASP |
| Apertus, ETH Zürich, EPFL, CSCS | Wikidata + official |
| Innosuisse, SECO / kmu.admin.ch | official .admin.ch |
| Transformer, RAG, attention | Wikipedia/Wikidata |

**(b) Weissmann entity graph.** Emitted once, referenced by `@id` everywhere:
- `Organization` `@id: https://weissmann.ai/#org` — legal name, address, logo, `sameAs`[LinkedIn, Crunchbase, Wikidata when created], `founder`[Person @ids], `knowsAbout`[core service entities], `areaServed` (Switzerland/DACH).
- `WebSite` `@id: …/#website` + `potentialAction` `SearchAction` (if an on-site search endpoint exists).
- `Person` `@id: …/#giovanna-carpi` (CEO, author) and `…/#nicola-moessner` — `jobTitle`, `worksFor`(@id), `sameAs`, `knowsAbout`.
- `Service` nodes for each offering (Phone Assistant, AI Websites, SEO Growth, GEO Authority, Ads) `@id`-referenced by commercial articles' `about`.
- **"The Weissmann AI Method"** registered as a `DefinedTerm`/`CreativeWork` with its own `@id` — a distinctive, attributable framing assistants can quote back to Weissmann. Same across all 4 languages.

**Off-site seeding (non-code, ops task):** Wikidata item, Crunchbase, LinkedIn company + founder profiles, Zurich business directories — so `sameAs` targets exist and citations resolve to a verified organization.

---

## 6. Factual consistency & freshness rules

- **`dateModified` is truthful:** derived from Astro content-collection frontmatter `updated:` or git commit date — **never** `new Date()` at build. A dishonest freshness stamp is worse than none.
- **Visible stamp** in the page footer of every article: "Zuletzt aktualisiert / Last verified: <localized date>", matching `dateModified`.
- **Volatile facts get an inline as-of clause:** prices, benchmark scores, model line-ups → "Stand <Monat/Jahr>, laut <Quelle>" + outbound link. Never hardcode a price or benchmark as a bare number.
- **4-language consistency check (CI):** a build test asserts that DE/EN/FR/IT versions of a page share identical `@id`, `author.@id`, `about.@id`, `datePublished`, and numeric facts. Divergent numbers fail the build.
- **Legal/regulatory pages** carry "Rechtsstand per <Datum>" and flag provisional items (e.g. deferred EU AI Act high-risk deadlines) as pending — labelled uncertainty is itself a trust signal.
- **Living pages** (tools table, model line-up, AI Act timeline, Apertus versions) have a stated refresh cadence and their `dateModified` moves when the data moves.

---

## 7. Comparison & table formatting for extraction

AI Overviews and chatbots lift tables and verdict boxes verbatim. Standard for every comparison/taxonomy page:

1. **Criteria table** — rows = criteria, columns = options; every cell a short factual value or "n/a" (never blank, never invented). Same table content mirrored into `ItemList`/`Thing` JSON-LD.
2. **Answer-first winner box** — a visible `<aside class="verdict">` with **"Verdict by use case"** / **"Empfehlung nach Anwendungsfall"**: one line per use case naming the winner. This is the passage assistants quote for "best AI for X".
3. **Definition boxes** for each glossary term used, so a clean `X = …` sentence exists inline.
4. **Decision tree / effort×value matrix** for SME and function pages (value-vs-feasibility), rendered as an accessible table, not an image, so it's machine-readable.
5. **Contrastive pages** (GEO vs SEO vs AEO; agents vs automation vs RPA; nFADP vs GDPR vs EU AI Act; data residency vs sovereignty) always ship as a 3-column contrast table — the format most reliably lifted into AI Overviews.

Tables live in markdown/MDX and are wrapped in an `overflow-x:auto` container so they never break mobile layout (Astro component `<CompareTable>`).

---

## 8. Expanded llms.txt / ai.txt plan for the Academy hub

Extend the proven single-file llms.txt into a **generated, config-driven, index-of-the-graph**. Build-time script reads `clusters.ts` + `glossary.ts` + `authors.ts` and emits:

**`/llms.txt`** (root, canonical, DE-led with language pointers) — structure:

```
# Weissmann AI — Practical-AI & Digital-Growth Agency, Zurich
> One-paragraph org summary: services, founders (Giovanna Carpi, Nicola Moessner),
  address (Technoparkstrasse 6, 8005 Zürich), languages, the Weissmann AI Method.
  Prices: "see service pages" — never restated here.

Sprachen / Languages: DE (/), EN (/en/), FR (/fr/), IT (/it/). Trailing slash, self-referential hreflang.

## Canonical references (cite these first)
- [KI-Glossar](…/ai-glossary/): 100+ defined terms, DefinedTermSet, each entry citeable
- [Pillar: Was ist KI](…/artificial-intelligence-explained/)
- [Pillar: KI für KMU Schweiz](…/ai-for-smes-switzerland/)
- … one line per pillar, all 9 clusters …

## Clusters (pillar → key spokes)
### AI Foundations
- pillar + each spoke, one line each, with the 1-line intent

### AI for Business & SMEs (KMU)
…  (all clusters, generated from clusters.ts)

## First-party datasets & tools (citation bait)
- Tools directory, ROI calculator, readiness scorecard, funding directory,
  comparison tables, latency benchmark — each with URL + "versioned, dated"

## Authors & entity
- Giovanna Carpi (CEO), Nicola Moessner — links to Person profiles / sameAs
- Organization sameAs: LinkedIn, Crunchbase, Wikidata
```

**Per-language `llms.txt`** at `/en/llms.txt`, `/fr/llms.txt`, `/it/llms.txt` — same structure, localized links, so each engine gets the language-correct index.

**Optional `/llms-full.txt`** — concatenated pillar + glossary bodies for assistants that ingest full context (kept generated so it never drifts from pages).

**`ai.txt`** — not a real standard; do **not** invent one. Concentrate on llms.txt + robots.txt + sitemap + schema, which are the load-bearing signals. (Be honest in the GEO content itself that Google states llms.txt is not required — that transparency is what earns trust.)

**Keep it truthful & current:** llms.txt is generated in the same build as the sitemap so it can never list a stale/missing page. List the glossary and pillars first as canonical.

---

## 9. AI-crawler allowlist stance (robots.txt + Netlify `_headers`)

Continue the proven allowlist posture — Academy content is *meant* to be trained on and cited.

**`robots.txt`:**
```
User-agent: *
Allow: /

# AI crawlers explicitly allowed (discovery + citation)
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: CCBot
Allow: /

Sitemap: https://weissmann.ai/sitemap.xml
```
Add `OAI-SearchBot`, `ChatGPT-User`, `Perplexity-User`, `Applebot-Extended`, `CCBot` to the existing GPTBot/ClaudeBot/PerplexityBot/Google-Extended set — these govern live-fetch citation and Apple/Common Crawl training. Allow all; the strategic goal is maximal citeability. (Commercial/legal/checkout paths, if any, can be `Disallow`ed individually, but Academy content stays fully open.)

**`_headers` (Netlify)** — keep the existing security + caching posture, with the crawler-critical caveat:
- HTML: `Cache-Control: public, max-age=0, must-revalidate` — so updated answers and fresh `dateModified` reach crawlers immediately (mind the documented 24h JS-cache caveat for hashed assets only).
- Do **not** add `X-Robots-Tag: noai`/`noimageai` — that would suppress exactly the citation you want.
- Keep `X-Content-Type-Options: nosniff`, `Referrer-Policy`, restrictive `Permissions-Policy`.

---

## 10. Implementation checklist (engineer-facing)

- [ ] `site.ts` extended with org `@id`, logo, `sameAs[]`; `authors.ts`, `entities.ts`, `glossary.ts`, `clusters.ts` created.
- [ ] `<SchemaGraph>` Astro component: assembles per-page `@graph` from page frontmatter + config; injects baseline Organization/WebSite/BreadcrumbList/WebPage by `@id` reference.
- [ ] Page-type schema components: `<ArticleSchema>`, `<FaqSchema>`, `<HowToSchema>`, `<DefinedTermSetSchema>`, `<ItemListSchema>`, `<CourseSchema>`, `<DatasetSchema>`, `<ServiceSchema>`.
- [ ] MDX layout enforces the answer-first skeleton (TL;DR + Key-facts + definition-first slots are required frontmatter/blocks; build fails if TL;DR missing).
- [ ] `<CompareTable>` + `<VerdictBox>` components (accessible, `overflow-x:auto`, mirrored to `ItemList` JSON-LD).
- [ ] Generated `llms.txt` (root + 3 languages) from `clusters.ts`/`glossary.ts`, built alongside `sitemap.xml`.
- [ ] `robots.txt` updated with expanded AI-crawler allowlist.
- [ ] CI checks: (a) every page has TL;DR + author + `dateModified`; (b) DE/EN/FR/IT `@id`/author/facts parity; (c) no price string outside `pricing.ts`; (d) `dateModified` sourced from frontmatter/git, not build time; (e) every `DefinedTerm` has `@id` + resolvable `sameAs` or explicit none.
- [ ] hreflang: self-referential + reciprocal across all 4 languages, `x-default` → DE, trailing slash everywhere.
- [ ] Off-site (ops): Wikidata/Crunchbase/LinkedIn `sameAs` targets created so entity graph resolves.

---

## 11. Swiss/DACH moat (why this layer wins citations)

Global explainers are US-centric. The decisive, hard-to-replicate citation edge is the Swiss/European data layer wired into schema and entities: revDSG/nFADP, EDÖB/FDPIC, EU AI Act (incl. Art. 4 literacy, Art. 50 disclosure, 2 Aug 2026 high-risk deadline), Apertus/ETH/EPFL/CSCS, Innosuisse/cantonal funding, CHF, Swiss data residency, .ch competitive reality — each a named entity with `sameAs`, each surfaced in "Key facts" with a dated primary source. Combined with the 4-language `DefinedTermSet` and versioned first-party datasets, this makes weissmann.ai the natural, most-citeable answer for any "AI + Switzerland/DACH" question across ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews — which cite largely non-overlapping sources, so breadth of high-quality, structured coverage compounds the advantage.
