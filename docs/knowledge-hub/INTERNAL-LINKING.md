# Internal-Linking Architecture — Weissmann AI Academy

**Owner:** Giovanna Carpi (CEO) · **Author of record for schema/E-E-A-T:** Giovanna Carpi, Nicola Moessner
**Stack:** Astro 5 static · Netlify · i18n (DE at root, `/en/` `/fr/` `/it/`) · `trailingSlash: 'always'` · central config (`site.ts`, `pricing.ts`) is the single source of truth
**Status:** Implementation-ready · **Last verified:** 2026-07-21

---

## 0. Design goal

Build "one of the strongest possible" internal-linking graphs for a 4-language knowledge platform whose commercial purpose is (a) topical authority for classic SEO, (b) citeability for GEO (being the paragraph an assistant quotes), and (c) routing qualified readers to Weissmann services. The linking layer must be **data-driven, not hand-maintained**: links are derived from a typed content model + a central link engine at build time, so that DE/EN/FR/IT stay in parity and **zero orphan pages** can ever ship.

Three non-negotiables the whole system enforces:

1. **Zero orphans** — every published page has ≥ N validated inbound internal links and is reachable from the homepage within ≤ K clicks (values in §11).
2. **Language-closed graph** — an internal link never crosses languages. A DE page links only to DE targets; the EN equivalent links to EN targets. Cross-language relationships are expressed **only** through `hreflang`, never through in-body `<a>`.
3. **Build-time provable** — the graph is validated by CI QA-gates that fail the Netlify build, not by human review.

---

## 1. Page-type taxonomy (the linking vocabulary)

Every page carries a `pageType` in frontmatter. All linking rules key off this. This is the finite set for the Academy + the surrounding commercial site.

| # | `pageType` | Example URL (DE) | Role in graph |
|---|-----------|------------------|---------------|
| 1 | `cluster-pillar` | `/artificial-intelligence-explained/` | Cluster hub. Links down to all its spokes, sideways to sibling pillars, up to nothing (it is a top node). |
| 2 | `cluster-spoke` | `/how-large-language-models-work/` | Leaf article. Links up to its pillar, sideways to 2–4 sibling spokes, out to glossary + services. |
| 3 | `comparison` | `/chatgpt-vs-claude-vs-gemini/` | Special spoke: criteria table + verdict box. Extra links to each compared entity's brand page. |
| 4 | `glossary-index` | `/ai-glossary/` | Definition hub + internal-linking backbone. |
| 5 | `glossary-term` | `/ai-glossary/#rag` (or dedicated term pages) | Atomic citeable definition; the auto-link target set. |
| 6 | `tool-directory` | `/best-ai-tools/` | First-party dataset; feeds comparisons. |
| 7 | `service` | `/leistungen/ki-telefonassistent/` | Commercial money page. Receives links; sends few. |
| 8 | `industry` | `/ai-fuer-arztpraxen/` | Vertical bridge between Academy and services. |
| 9 | `learning-path` | `/how-to-learn-ai/` | Ordered reading map; links to many spokes in sequence. |
| 10 | `home` / `academy-index` | `/`, `/academy/` | Top of the graph; seeds PageRank. |
| 11 | `utility` | `/kontakt/`, `/impressum/` | Contact/legal; link target only. |

`clusterId` (e.g. `foundations`, `smb`, `agents-voice`, `models-vendors`, `local-sovereign`, `trust-security`, `marketing-geo`, `industry`, `business-function`) is a second required frontmatter field that scopes hub-and-spoke and sibling logic.

---

## 2. Content model — the data that drives every link

Links are **generated**, so the model must carry enough typed metadata. Astro content collections (`src/content/`) with a Zod schema:

```ts
// src/content/config.ts (shape, illustrative)
const academyDoc = z.object({
  slug: z.string(),                 // language-neutral key, identical across DE/EN/FR/IT
  lang: z.enum(['de','en','fr','it']),
  pageType: z.enum([...]),          // §1
  clusterId: z.string(),            // §1
  isPillar: z.boolean().default(false),
  pillarSlug: z.string().optional(),// spoke -> its pillar (slug, not URL)
  siblingSlugs: z.array(z.string()).default([]),   // curated, optional; else auto (§7)
  serviceTargets: z.array(z.enum(['phone-assistant','ai-websites','seo-growth','geo-authority','google-ads'])).default([]),
  industryTargets: z.array(z.string()).default([]),
  glossaryTerms: z.array(z.string()).default([]),  // terms this page *defines*/owns (dedupe target)
  entities: z.array(z.string()).default([]),        // named entities for GEO (OpenAI, EU AI Act…)
  updated: z.date(),
  author: z.enum(['giovanna-carpi','nicola-moessner']),
});
```

Key rule: **`slug` is language-neutral**. The URL for any (`slug`, `lang`) pair is resolved by one central helper `url(slug, lang)` reading `site.ts`. This is what guarantees a DE→DE / EN→EN closed graph and lets `hreflang` be generated mechanically. No writer ever types a raw internal `href`.

Writers reference targets by `slug`; a Markdown/MDX shortcode `<Link to="how-large-language-models-work">…</Link>` resolves to the correct-language, trailing-slashed URL at build. A raw `<a href>` to an internal path is a **lint error** (see §12).

---

## 3. Hub-and-spoke rules (pillar ↔ spoke, bidirectional)

The spine of the graph. Enforced automatically from `pillarSlug` / `isPillar`.

**Pillar → spokes (downlinks):**
- A pillar MUST link to **every** spoke in its cluster. Rendered as a structured "In diesem Guide / In this guide" cluster-navigation block (a `<nav aria-label>` list), generated from all docs where `pillarSlug === thisPillar.slug` and `lang === thisPillar.lang`.
- This block is the single strongest orphan-prevention mechanism: adding a spoke to a cluster auto-adds its inbound link from the pillar. No spoke can exist in a cluster without appearing here.
- Order = `learning-path` order if one exists for the cluster, else demand tier (very-high → niche), so PageRank flows to the highest-value spokes first.

**Spoke → pillar (uplink):**
- Every spoke MUST link back to its pillar at least once, in two places: (1) the breadcrumb (§9), (2) one contextual in-body link in the opening/TL;DR or the closing "Nächster Schritt" line, using varied anchor text (§8).
- The uplink is auto-inserted as a fallback closing block if the writer did not place a contextual one, so it can never be missing.

**Spoke ↔ spoke (sibling links):**
- Each spoke links to **2–4 sibling spokes in the same cluster**, chosen by the Related-articles logic (§10). These are contextual where possible, plus a "Verwandte Artikel" block as the guaranteed floor.
- Siblings are always same-cluster, same-language.

**Pillar ↔ pillar (cross-cluster):**
- Each pillar links to **2–3 adjacent pillars** to build a connected top layer (prevents 9 disconnected islands). Adjacency is declared once in `site.ts` as a small graph, e.g.:
  - `foundations ↔ models-vendors ↔ local-sovereign`
  - `agents-voice ↔ business-function ↔ industry`
  - `trust-security ↔ smb ↔ marketing-geo`
  - plus `foundations` links to `smb` (the "what is AI" → "AI for my business" jump) and `marketing-geo` links to `foundations` (GEO defined in the glossary).
- These cross-pillar links live in a "Weiterführende Themen" strip on each pillar. This guarantees the whole pillar layer is a single connected component reachable in ≤ 2 hops.

---

## 4. Contextual in-body linking rules

Contextual links (inside prose) carry the most SEO/GEO weight and must feel editorial, not mechanical.

- **Density:** aim for **1 contextual internal link per ~120–180 words**, but never force. A 1,800-word spoke → ~10–15 contextual internal links is healthy; > 25 gets flagged as over-linking.
- **First mention wins:** link a target the **first** time it is meaningfully mentioned in body copy; do not re-link the same target repeatedly (max 1 contextual link to a given target per page; the nav/related blocks are exempt from this count).
- **Answer-first zone is link-light:** the top TL;DR / Kurzantwort box may contain **at most 1** internal link (usually the uplink to the pillar or a single defining glossary term). Rationale: this is the block assistants lift verbatim — it must read as a clean standalone answer, not a link farm.
- **Descending relevance:** link to the most topically-specific target available. From an LLM spoke, "next-token prediction" links to the glossary term, not to the pillar. Reserve the pillar uplink for the intro/outro.
- **No links inside H1–H4.** Headings stay clean for extraction and schema.
- **Directionality bias:** commercial pages (service/industry) receive far more contextual links than they emit — they are PageRank sinks by design. An Academy spoke should send ≤ 2 commercial links; a service page sends ≤ 1 back to the Academy (usually its concept spoke) to avoid leaking equity out of the money page.

---

## 5. Automatic glossary term-linking (the backbone)

The glossary is both the highest-value GEO asset and the internal-linking backbone. Term-linking is **automated at build time** with strict guardrails so it never becomes spam.

**Term registry:** a single `glossary.ts` (or the glossary content collection) exports, per language, the canonical term set with `{ term, aliases[], anchor, slug }`. Example DE entry: `{ term: 'Retrieval-Augmented Generation', aliases: ['RAG'], anchor: '#rag', slug: 'ai-glossary' }`.

**Auto-linker rules (a rehype/remark plugin in the Astro pipeline):**
1. Scans body prose (never headings, code, blockquotes, the TL;DR box, or existing `<a>`).
2. Links **only the first occurrence** of each term (or its longest-matching alias) per page.
3. **Cap: max 6 auto-glossary links per page.** Beyond the cap, remaining terms are left as plain text. Prevents the "every third word is blue" failure.
4. **Self-exclusion:** a `glossary-term` page never auto-links its own term; a spoke that *owns* a term (declares it in `glossaryTerms`) does not auto-link that term to the glossary — the reader is already on the authority page for it.
5. Longest-match-first (so "Large Language Model" wins over "Model").
6. Anchor text = the exact surface form as written by the author (preserves natural anchor variety — §8), pointing to `ai-glossary#<anchor>`.
7. Auto-links resolve through `url('ai-glossary', lang)` so DE prose links to the DE glossary anchor, EN to EN, etc.

**Reverse link:** each glossary entry links back out to its "canonical explainer" spoke (`Mehr dazu: <spoke>`), turning the glossary into a two-way hub. This gives every spoke a guaranteed inbound link from the glossary — a second orphan-prevention layer independent of the pillar.

---

## 6. Cross-links to services, industries, comparisons, tools, guides, contact

Commercial routing rules, keyed off frontmatter targets so they stay honest (a page only links to a service it genuinely maps to — no blanket footers of every service).

| From | To | Rule |
|------|----|------|
| `cluster-spoke` (commercial ≥ medium) | `service` | 1 contextual link + 1 CTA card to the mapped service in `serviceTargets`. E.g. `/was-ist-ki-telefonassistent/` → KI-Telefonassistent service. Prices never inline — CTA pulls the current price/tier from `pricing.ts`. |
| `cluster-spoke` (commercial low) | `service` | No hard CTA; at most a single soft "Weissmann hilft bei der Umsetzung" link. Keeps informational/GEO pages non-promotional (assistants avoid citing marketing copy). |
| `industry` | `service` + relevant `cluster-spoke` | Industry pages are the main bridge: link down to the concrete service and up to 2–3 supporting Academy explainers. |
| `cluster-spoke` | `industry` | When a use case is vertical-specific (e.g. no-show reduction → clinics/restaurants), link to the matching industry page. |
| `comparison` | brand/vendor pages + `tool-directory` | Each compared entity links to its deep-dive (`/claude-for-business/` etc.); the directory links up as the data source. |
| `tool-directory` | `comparison` + `service` | Directory feeds each relevant comparison and, per category, the mapped Weissmann service. |
| every Academy page | `contact` | Exactly **one** contact link, via the standard end-of-article author/CTA block — not a raw in-body link (keeps the contact link uniform and countable). |

**Service→Academy discipline:** service pages link back to at most 1–2 Academy concept pages ("So funktioniert es" → the explainer) and never to competitors' comparison pages. This preserves the money page as a near-sink.

---

## 7. Sibling / cross-cluster relationship resolution

When `siblingSlugs` is not hand-curated, the build derives siblings deterministically so no page is left without candidates:

**Sibling score(a, b)** = 
`+3` same `clusterId` · `+2` shared `glossaryTerms`/`entities` (Jaccard-weighted) · `+1` declared pillar adjacency (§3) · `+1` shared `serviceTargets` or `industryTargets` · `−4` different language (hard exclude, score → −∞).

Top-scoring same-language candidates become the sibling set. Curated `siblingSlugs` always override/augment the auto set. This is also the candidate pool for the Related-articles block (§10).

---

## 8. "Related articles" selection logic

Every article ends with a **"Verwandte Artikel"** block — the guaranteed inbound-link floor for siblings and the safety net against orphans.

Selection (deterministic, build-time, per language):
1. **Slots:** 3–6 (pillar 6, spoke 4, comparison 4).
2. **Composition rule (mandatory mix):** at least 1 same-cluster spoke, at least 1 the cluster **pillar** (if the current page isn't the pillar), at least 1 cross-cluster or glossary/tool link. This forces both depth (down the cluster) and breadth (across the graph).
3. **Ranking:** sibling score (§7), tie-broken by (a) demand tier, (b) `updated` freshness.
4. **Reciprocity injection:** if page A lists B as related but B does not list A, the build adds A to B's candidate pool on the next build pass — pushing the graph toward bidirectionality and lifting under-linked pages.
5. **Fairness / de-orphaning boost:** any page currently below its inbound-link floor (§11) gets a **+scoring boost** so the Related engine actively pulls thin pages up to threshold. This is the automated orphan cure, not just detection.
6. No language crossing; no duplicates of links already in the pillar-nav or contextual body.

---

## 9. Breadcrumbs & navigation contribution to internal PageRank

**Breadcrumbs** (every Academy page, with `BreadcrumbList` JSON-LD):

`Home › Academy › <Cluster Pillar> › <Current page>`

- Spokes → 4 levels; pillars → 3 (`Home › Academy › <Pillar>`).
- The breadcrumb's pillar segment is a real link — this is the **structural, template-guaranteed uplink** that exists even if body copy is thin. Combined with the pillar-nav downlink, pillar↔spoke bidirectionality is unbreakable.
- Breadcrumbs are language-local (`/en/academy/...` breadcrumbs point only to EN nodes).

**Global navigation & footer:**
- Header links to the 9 pillars via an "Academy" mega-menu → every pillar is ≤ 1 click from every page (pillars can never be orphaned; guarantees K-click reachability of the top layer).
- Footer links to: Academy index, glossary, tool directory, the 5 services, contact. These are **site-wide sitewide sinks** — deliberately kept to a tight, curated set so their concentrated inbound count doesn't dilute PageRank across hundreds of low-value footer links.
- **PageRank shaping intent:** homepage → pillars (nav) → spokes (pillar-nav) → glossary/services (contextual). The glossary and each service accumulate the most inbound links by design, making them the strongest-ranking, most-citeable nodes — which is exactly the commercial + GEO goal.

---

## 10. Per-page-type LINK BUDGET

Budgets are enforced ranges (min…max) of **internal** links, counted by class. "Contextual" = in prose; block links (nav, related, breadcrumb, CTA) counted separately.

| pageType | Contextual (body) | Glossary (auto, ≤cap) | Sibling/related (block) | Uplink to pillar | Downlinks | Service/CTA | Cross-pillar | Total internal (guide) |
|----------|------|------|------|------|------|------|------|------|
| `cluster-pillar` | 12–25 | ≤6 | 6 (related) | — | **all** spokes (nav) | ≤2 | 2–3 | 25–60 |
| `cluster-spoke` | 8–18 | ≤6 | 2–4 | 1 (breadcrumb) +1 (body) | — | 0–2 | 0–1 | 12–30 |
| `comparison` | 8–16 | ≤6 | 3–4 | 1 | — | 1–2 | link each compared entity | 14–28 |
| `glossary-index` | low | — | — | — | links to all owning spokes | ≤1 | — | high (term list) |
| `glossary-term` | 1–3 | self-excluded | 2–3 related terms | 1 (to owning spoke) | — | 0 | — | 4–8 |
| `tool-directory` | 6–14 | ≤4 | 3 | — | comparisons + categories | per-category service | — | 15–30 |
| `service` | 1–2 (to Academy) | 0 | 0–2 | — | — | — (self) | — | ≤ 6 (near-sink) |
| `industry` | 6–12 | ≤4 | 3 | — | service + supporting spokes | 1–2 | — | 12–24 |
| `learning-path` | many (ordered) | ≤6 | — | 1 | links to every stage spoke | 1 | — | 15–40 |

**Minimum inbound links (orphan floor), per type — validated in CI:**

| pageType | Min inbound internal links (same language) |
|----------|------|
| `cluster-spoke` | **≥ 3** (pillar-nav + glossary reverse + ≥1 sibling/related) |
| `cluster-pillar` | **≥ 4** (header nav + footer/academy-index + ≥2 sibling pillars + spokes' uplinks) |
| `comparison` | ≥ 3 |
| `glossary-term` | ≥ 2 (index + ≥1 auto-link from a spoke) |
| `service` | ≥ 5 (industries + spokes + footer) |
| `industry` | ≥ 3 |
| `learning-path` | ≥ 2 |
| any page | **absolute floor ≥ 2** and reachable ≤ 3 clicks from home |

---

## 11. LINK-RULE MATRIX (from page-type → required outbound classes + min inbound)

Machine-readable intent; drives both generation and the CI gate. `R` = required, `O` = optional/conditional, `—` = forbidden/none.

| From ↓ / Class → | Uplink→Pillar | Downlink→Spokes | Sibling/Related | Glossary(auto) | Service(CTA) | Industry | Cross-Pillar | Breadcrumb | Contact | Min inbound |
|---|---|---|---|---|---|---|---|---|---|---|
| `cluster-pillar` | — | **R (all)** | R (6) | R (≤6) | O (≤2) | O | **R (2–3)** | R (3-lvl) | R | 4 |
| `cluster-spoke` | **R (×2)** | — | **R (2–4)** | R (≤6) | O (by commercial tier) | O (if vertical) | O (0–1) | **R (4-lvl)** | R | 3 |
| `comparison` | **R** | — | R (3–4) | R | O–R (1–2) | O | O | R | R | 3 |
| `glossary-index` | — | **R (all owners)** | — | — | O (≤1) | — | — | R | R | — |
| `glossary-term` | **R (owning spoke)** | — | R (2–3 terms) | — | — | — | — | R | O | 2 |
| `tool-directory` | O (foundations pillar) | **R (comparisons)** | R (3) | R (≤4) | **R (per category)** | O | — | R | R | 3 |
| `service` | O (1 concept spoke) | — | — | — | — (self) | O (back to industries) | — | R | R | 5 |
| `industry` | O (relevant pillar) | **R (2–3 spokes)** | R (3) | R (≤4) | **R (1–2)** | O (sibling industries) | — | R | R | 3 |
| `learning-path` | **R** | **R (every stage)** | O | R | O | — | O | R | R | 2 |
| `home`/`academy-index` | — | **R (9 pillars)** | — | O | R (5 services) | R | — | — | R | n/a (root) |

Reading example: a `cluster-spoke` **must** emit an uplink to its pillar (twice: breadcrumb + body), 2–4 related links, auto-glossary links, a 4-level breadcrumb, and a contact link; it **may** emit service/industry/cross-pillar links depending on commercial tier and vertical fit; and it must itself receive **≥ 3** inbound links or the build fails.

---

## 12. Anchor-text strategy (natural, no keyword stuffing)

Anchors are a ranking and a citeability signal; robotic exact-match anchors hurt both. Rules the linter enforces:

1. **Exact-match cap:** for any single target, **≤ 20%** of its inbound internal anchors may be the exact target keyword. The linter aggregates anchors per target across the whole language corpus and flags over-optimization.
2. **Anchor variety ladder** — writers/auto-linker draw from a mix:
   - *Exact*: "was ist generative KI" (sparingly)
   - *Partial/semantic*: "generative KI im Überblick", "wie generative KI Inhalte erzeugt"
   - *Branded/entity*: "Claude von Anthropic", "das EU AI Act"
   - *Descriptive/natural-language sentence*: "warum Sprachmodelle halluzinieren", "unser Leitfaden dazu"
   - *Contextual verb phrase*: "erklären wir Schritt für Schritt"
3. **No naked URLs, no "hier klicken"/"click here"** as the sole anchor (accessibility + zero semantic value) — lint error.
4. **Auto-glossary anchors inherit the author's surface form** (§5) → natural variety by construction; the plugin never rewrites prose to an exact term.
5. **Per-language authenticity:** anchors must read natively — the FR/IT/DE/EN versions are written, not machine-translated anchor strings. Anchor text lives with the translated content, not in a shared table.
6. **Descriptive over-keyword for GEO:** since assistants read the surrounding sentence, prefer anchors embedded in a complete, quotable clause over bare keyword tokens.

---

## 13. Orphan prevention & reachability — enforcement in the build

Everything above is designed so orphans are structurally hard to create; this section makes it **provable** and wires it into the existing QA-gates concept (the same gate pattern already used for schema/pricing/language-parity).

**Build-time graph validator** (`scripts/qa/link-graph.mjs`, runs in `astro build` / Netlify CI, non-zero exit fails deploy):

1. **Parse the rendered graph.** After content collections resolve, build an adjacency list per language from: pillar-nav, breadcrumbs, related blocks, glossary reverse-links, and body links (parsed from generated HTML in `dist/<lang>/`). Nodes = pages; edges = same-language internal links.
2. **Orphan gate:** every node's inbound count ≥ its type floor (§10/§11). Any node below floor → **FAIL**, with the page listed and the Related-engine boost (§10.5) noted as the fix. Enforced independently for DE, EN, FR, IT.
3. **Reachability (K-click) gate:** BFS from each language home. Every node must be reachable in **≤ 3 clicks** (pillars ≤ 1 via nav, spokes ≤ 2 via pillar-nav, glossary terms ≤ 3). Any node with distance > 3 or ∞ → **FAIL**.
4. **Connected-component gate:** the pillar layer must form a **single** connected component (via §3 cross-pillar adjacency). More than one component → FAIL (catches "island cluster").
5. **Reciprocity report (warn):** list one-directional pillar↔spoke or heavy sibling asymmetries; auto-healed next build via §8.4/§10.5, warns only.
6. **Language-parity gate (FAIL):** a `slug` present in DE must exist in EN/FR/IT with the **same pageType, clusterId, pillarSlug**, and a comparable inbound count (± tolerance). Enforces the four-language sync policy at the link level so one language can't silently become sparser.
7. **Language-leak gate (FAIL):** any internal `<a>` whose target language ≠ page language → FAIL (only `hreflang`/language-switcher may cross languages).
8. **Budget gate (warn→fail):** contextual link count outside the §10 range, or auto-glossary > cap, or > 25 total contextual links (over-linking) → warn; hard cap breaches fail.
9. **Anchor gate (warn):** exact-match ratio per target > 20%, or banned anchors ("hier klicken"), or naked URLs → warn with report; banned anchors fail.
10. **Raw-href lint (FAIL):** any hand-written internal `<a href="/...">` in MDX (bypassing `<Link to>`/`url()`) fails — forces all internal links through the resolver that guarantees trailing slash + correct language.

**Pre-publish "new page" checklist automated in CI:** when a new `slug` is added, gate 2 immediately catches it as an orphan unless it was added to (a) its pillar's spoke set (`pillarSlug`) — which auto-creates the pillar-nav inbound link — and (b) at least one glossary/related surface. Practically: **you cannot merge a spoke without wiring its pillar**, which is the whole point.

---

## 14. Sitemap & hub-index role

- **`sitemap.xml`** is generated from the content collections (Astro sitemap integration), one URL per (slug, lang), all with trailing slash, all with `xhtml:link` `hreflang` alternates for the 4 languages + `x-default` = DE. `lastmod` = `updated` frontmatter. The validator cross-checks: every sitemap URL must be a reachable node in the link graph (sitemap is a discovery aid, **not** a substitute for internal links — a URL in the sitemap but orphaned in the graph still FAILS gate 2).
- **`/academy/` hub-index** is a real HTML page listing all 9 pillars with their spoke sub-lists — a human-and-crawler "table of contents" that reinforces reachability and gives PageRank a clean second path to every pillar (belt-and-suspenders with the mega-menu).
- **Glossary index** doubles as a secondary hub: linking out to every owning spoke means the glossary alone would keep most spokes non-orphaned even if a pillar-nav failed.
- **`llms.txt`** lists the pillars + glossary + tool directory as canonical references (GEO), mirroring the internal hub structure so assistants and crawlers see the same authority topology.

---

## 15. Implementation sequence (concrete)

1. Add the frontmatter schema (§2) to `src/content/config.ts`; backfill `pageType`, `clusterId`, `pillarSlug` on all existing docs.
2. Build the `url(slug, lang)` resolver + `<Link to>` MDX component; ban raw internal `<a>` via the gate-10 linter.
3. Ship the reusable link blocks as Astro components: `<Breadcrumb>`, `<ClusterNav>` (pillar downlinks), `<PillarUplink>` (fallback), `<RelatedArticles>` (engine §8/§10), `<GlossaryTooltipLink>`, `<ServiceCTA>` (pulls `pricing.ts`).
4. Add the rehype auto-glossary plugin (§5) with cap + self-exclusion.
5. Declare the cross-pillar adjacency graph + service/industry maps in `site.ts`.
6. Write `scripts/qa/link-graph.mjs` (§13) and add it to the CI/Netlify build alongside existing QA-gates; make gates 2, 3, 4, 6, 7, 10 blocking.
7. Run once, let gates 2 + 5 + the Related-engine boost pull the initial corpus to threshold; iterate until DE/EN/FR/IT all pass with zero orphans and ≤ 3-click reachability.

The result is a graph that is **generated, parity-locked across four languages, provably orphan-free, PageRank-shaped toward the glossary and the five services, and citeable** — with every rule expressed as data an engineer can automate and a CI gate can enforce.
