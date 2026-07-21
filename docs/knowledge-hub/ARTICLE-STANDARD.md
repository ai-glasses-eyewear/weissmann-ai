# Weissmann AI Academy — Article Quality Standard

**The rubric, editorial rules, and reusable templates that make every Academy page one of the strongest, most-cited AI resources in Europe.**

Owner: Giovanna Carpi (Editor-in-Chief) · Version: 1.0 · Status: canonical · Applies to: every page under the Academy (`/artificial-intelligence-explained/`, `/ai-for-smes-switzerland/`, `/ai-automation-agents-conversational-ai/`, and all spokes, glossary, comparison, tutorial, tool and case-study pages) in **all four languages (DE root, `/en/`, `/it/`, `/fr/`)**.

> **Kurzantwort / TL;DR.** No Academy page ships until it scores **≥ 90/100 on the Publish-Gate** *and* passes every **Hard Gate** (zero tolerance). Every page is engineered answer-first, entity-dense, primary-source-cited, schema-marked, bylined by a real named author, and published in all four languages together. Prices, statistics, case studies, integrations and legal facts come **only** from central config or a cited verified source — anything else is marked `NEEDS VERIFICATION` and never asserted. This document is the single source of editorial truth; the code config (`pricing.ts`, `site.ts`) is the single source of factual truth.

---

## 0. How to use this document

1. **Before writing** — open the cluster map, confirm the page's `intent`, `commercial`, `demand`, `diff`, and its distinctness clause (why it does not cannibalise a sibling). Pick the matching **Section Skeleton** (§4).
2. **While writing** — follow the editorial rules (§2–§3), sourcing rules (§5), and the language/tone matrix (§6). Fill the **Spoke Template** (§11) or the relevant skeleton.
3. **Before publishing** — self-score against the **Publish-Gate** (§1). Run the **Hard Gates**. Attach the completed scorecard to the PR. Reviewer signs off. Only then does the DE+EN+IT+FR set deploy together.

**Golden principle:** *Write the paragraph an AI assistant will quote and a Swiss decision-maker will trust — nothing generic, nothing filler, nothing unverifiable.*

---

## 1. The Publish-Gate (scored checklist)

A page **cannot publish** unless it (a) passes **all Hard Gates** and (b) scores **≥ 90 / 100**. Score is recorded in the PR. The reviewer re-scores independently; if the two scores differ by > 10 points, a third read is required.

### 1a. Hard Gates (binary — any single failure blocks publish, regardless of score)

| # | Hard Gate | Fail condition |
|---|-----------|----------------|
| H1 | **No invented facts** | Any price, statistic, testimonial, customer, case-study result, integration, certification, or legal claim that is not from central config or an inline-cited verified source. |
| H2 | **Forbidden content** | Any mention of Podomedics, "Culmannstrasse 39 / 8006 Zurich", eyewear, Even Realities, or any legacy ai-eyewear entity. |
| H3 | **Four-language parity** | The page does not exist and pass gate in DE **and** EN **and** IT **and** FR, with correct self-referential `hreflang` + canonical. |
| H4 | **Answer-first opener** | Page lacks a 40–60 word self-contained TL;DR/Kurzantwort answer box before any build-up. |
| H5 | **Named human author + review** | No real bylined author (Giovanna Carpi or Nicola Moessner) with Person schema, or no recorded reviewer + `dateModified`. |
| H6 | **Valid schema** | JSON-LD absent or fails Google Rich Results / Schema.org validation for the page type. |
| H7 | **Prices from config** | Any price hardcoded in prose instead of pulled from `pricing.ts`; or an uncertain figure asserted rather than labelled. |
| H8 | **Primary-source integrity** | A statistic or legal/regulatory claim presented without an inline, dated, linkable source. |
| H9 | **Not-legal-advice / not-financial-advice guard** | Compliance or ROI page missing the required disclaimer where legal/financial facts appear. |

### 1b. Scored rubric (100 points)

| Dimension | Pts | What "full marks" means |
|---|---|---|
| **1. Answer-first & extractability** | 15 | Page opens with a 40–60w Kurzantwort box; **every** H2 opens with a self-contained 2–4 sentence direct answer; entity named explicitly (never "it"/"this"); sections make sense lifted out of context. |
| **2. Depth & originality (never generic)** | 15 | Contains ≥ 1 first-party asset or genuinely non-obvious insight (framework, table, decision tree, worked example) that does **not** exist on a top competing page. Reads like the practitioner who built the systems wrote it. |
| **3. Entity density & disambiguation** | 10 | Canonical entities named in full (OpenAI, Anthropic, Google DeepMind, ETH Zürich, EPFL, CSCS, EDÖB/FDPIC, EU AI Office, revDSG/nFADP, EU AI Act = Reg. (EU) 2024/1689, ISO/IEC 42001, NIST AI RMF, OWASP, Apertus, Innosuisse). No pronoun-only references to key concepts. |
| **4. Sourcing & fact density** | 10 | A citeable, dated fact roughly every 150–200 words; every stat attributed to a named linkable primary source; volatile facts stamped "as of <month year>". |
| **5. Swiss/DACH specificity** | 10 | Concrete Swiss lens: CHF, revDSG/nFADP vs GDPR distinction, Swiss data residency, .ch competitive reality, canton/federal detail — content a US-centric page could not produce. |
| **6. Structure & skeleton compliance** | 8 | Uses the correct page-type skeleton (§4); question-shaped H2/H3s mirroring real DE/EN/IT/FR queries; scannable. |
| **7. Schema & structured data** | 7 | Correct JSON-LD set for the page type (§9), including author Person, Organization, and page-type-specific (FAQPage/HowTo/DefinedTerm/etc.); validates. |
| **8. Internal linking** | 7 | Links up to pillar, down/side to ≥ 3 relevant spokes, into glossary terms, and to **exactly the mapped service** (no over-linking to services from low-commercial pages). Correct link intent per cluster map. |
| **9. Commercial alignment & CTA** | 6 | CTA matches the page's `commercial` level and mapped service; informational core stays neutral/non-promotional (AIs avoid citing marketing copy); CTA visually separated. |
| **10. Media, tables & readability** | 6 | ≥ 1 original diagram/table where the skeleton calls for it; alt text; correct reading level per language (§6); passes accessibility basics. |
| **11. Freshness & maintainability** | 6 | Visible "Zuletzt aktualisiert / Last updated" + "Last reviewed"; volatile claims isolated so they can be updated without rewriting; review cadence tag set (§10). |

**Scoring bands:** 90–100 publish · 80–89 revise & re-score · < 80 structural rework. **A page that is merely "correct and complete" scores ~75 — competent is not the bar; being the citeable best is.**

---

## 2. Editorial rules (non-negotiable house style)

1. **Answer-first everywhere.** The page and each H2 lead with the answer, then the reasoning. LLMs retrieve paragraphs, not pages. Never bury the definition under a narrative intro.
2. **Atomic sections.** Write each H2/H3 so a retriever can lift it standalone. Name the entity in the first sentence of the section ("A KI-Telefonassistent is…", not "It is…").
3. **Question-shaped headings.** H2/H3s phrased as the real query ("Was kostet ein KI-Telefonassistent?", "Is self-hosted AI revDSG-compliant?"), mirrored 1:1 in FAQ schema.
4. **Show the work, don't pad.** Every paragraph must add a fact, a distinction, a step, or a decision rule. Delete anything that merely restates the heading or the previous sentence. No throat-clearing intros ("In today's fast-paced world…").
5. **Concrete over abstract.** Prefer a worked Swiss example, a real workflow, a number-with-source over adjectives. "Reduces missed calls" → *how*, *for which business type*, *measured how*.
6. **Neutral core, separated CTA.** The informational body reads like a reference, not a brochure. Commercial intent lives in a clearly delimited CTA block and in the mapped internal link — never woven into definitions.
7. **Honesty about contested points** (e.g. "Google states `llms.txt` is not required") builds trust and earns citations. Never overstate.
8. **One canonical entity vocabulary across all 4 languages.** "Weissmann AI", "The Weissmann AI Method", founder names, "GEO", product names are written identically in DE/EN/IT/FR so cross-lingual citations resolve to one entity graph.
9. **No cannibalisation.** Before publishing, confirm the page respects its distinctness clause from the cluster map. If two pages could answer the same query, add a disambiguation line and adjust internal links.
10. **Every claim survives the "would an AI cite this?" test.** If a sentence isn't quotable, verifiable, and self-contained, rewrite it.

---

## 3. The "NEVER invent" enforcement

This is the trust moat. It is enforced by Hard Gates H1, H7, H8 and by review.

| Category | Allowed source | If not available |
|---|---|---|
| **Prices, tiers, packages** | `pricing.ts` central config **only**, rendered via component/import — never typed into prose. | Teach the *cost structure* / *pricing model*; label any illustrative figure "example / illustrative". |
| **Statistics & market figures** | Named, linkable primary source with date (NIST, ISO, OECD, Stanford HAI, arXiv, EY, Deloitte CH, Digitalswitzerland, AXA, kmu.admin.ch, Gartner, McKinsey, MIT). | Express as a **labelled tier** (very-high/high/medium/low/niche) with reasoning, explicitly "estimate". |
| **Search / demand volumes** | — (never a hard number). | Informed tier only, explicitly labelled an estimate — never a measured figure. |
| **Case studies, customers, testimonials, results** | Real, client-permissioned, written consent on file; every metric verified and attributed. | Ship the *framework* ("what a Weissmann case study measures") + permissioned anonymised outcomes only. No fabricated customers/numbers ever. |
| **Integrations, certifications** | Verified, currently-true, linkable. | Omit or mark `NEEDS VERIFICATION`; do not assert. |
| **Legal / regulatory facts** | Primary source inline (Fedlex, EUR-Lex, EDÖB/FDPIC, EU AI Office, ISO, NIST, OWASP) with "Legal status as of <date>". | Mark `NEEDS VERIFICATION`; never present as legal advice. |

**The `NEEDS VERIFICATION` protocol:** flag inline in draft as `⚠️ NEEDS VERIFICATION: <claim> — <what must be checked>`. A page may not publish with an unresolved flag in body copy; either verify-and-cite, downgrade to a labelled estimate/tier, or cut it.

---

## 4. Required section skeletons per page type

Each page type has a **required skeleton**. Sections marked **(R)** are mandatory; **(C)** conditional where relevant. Every skeleton begins with the Kurzantwort box and ends with author box + last-updated stamp.

### 4.1 Pillar page (e.g. `/artificial-intelligence-explained/`, `/ai-for-smes-switzerland/`)
1. **(R) Kurzantwort / TL;DR box** — 40–60w definitional answer to the head query.
2. **(R) Key takeaways** — 3–5 standalone, quotable claims.
3. **(R) Full definition / "Was ist …"** — answer-first H2.
4. **(R) The map of the topic** — how the sub-topics fit; **links to every spoke** (this is the cluster's hub).
5. **(C) Types / taxonomy / how it works** — high-level, deferring detail to spokes.
6. **(R) Swiss/DACH perspective** — revDSG/CHF/data-sovereignty framing.
7. **(C) Business relevance & use cases** — bridge to services.
8. **(R) Common mistakes / misconceptions.**
9. **(R) FAQ** (6–10 Q, FAQPage schema).
10. **(R) "Start here" learning/reading path** — ordered spoke links.
11. **(R) Author + reviewer box, sources, last-updated.**

### 4.2 Spoke — concept/explainer (e.g. `/how-machine-learning-works/`, `/how-large-language-models-work/`)
1. (R) Kurzantwort box · 2. (R) Key takeaways · 3. (R) Core definition (answer-first) · 4. (R) How it works (mechanism, with an original diagram) · 5. (C) Types/variants · 6. (R) Concrete example (worked, Swiss-relevant where possible) · 7. (C) Advantages / disadvantages or strengths/limits · 8. (R) Common mistakes/misconceptions · 9. (C) Business relevance + Swiss lens · 10. (R) FAQ · 11. (R) Related terms (glossary links) + next-read links · 12. (R) Author/reviewer/sources/last-updated.

### 4.3 Spoke — business/how-to (e.g. `/how-to-implement-ai-in-your-sme/`, `/ai-workflows-and-agents/`)
1. (R) Kurzantwort · 2. (R) Key takeaways · 3. (R) When/why (problem framing) · 4. (R) **Step-by-step implementation** (numbered, HowTo schema; map to the Weissmann AI Method phases — Discover, Analyse, Design, Build, Deploy, Measure, Optimize) · 5. (R) Real use-case example(s) by department/industry · 6. (C) Pricing/cost considerations (structure only, config for figures) · 7. (C) Security & compliance implications (revDSG/EU AI Act) · 8. (R) Common mistakes · 9. (R) Swiss-business perspective · 10. (C) Downloadable resource (checklist/template/calculator) · 11. (R) FAQ · 12. (R) CTA to mapped service · 13. (R) Author/reviewer/sources/last-updated.

### 4.4 Glossary term (`/ai-glossary/#<term>` entries)
Each term is an **atomic, independently citeable QAPage/DefinedTerm block**:
1. **(R) Term (canonical, both languages)** as heading anchor.
2. **(R) One-sentence definition** in the form "X is …" (≤ 40 words, self-contained, entity-named).
3. **(R) 2–4 sentence expansion** — key distinction, why it matters.
4. **(C) Swiss/regulatory note** where relevant (e.g. term appears in EU AI Act Art. X).
5. **(R) "Related terms"** cross-links + **"Learn more"** link to the explainer spoke.
6. **(R) DefinedTerm** (in a DefinedTermSet) + QAPage pattern; stable anchor URL that other clusters link into.

### 4.5 Comparison page (e.g. `/chatgpt-vs-claude-vs-gemini/`, `/geo-vs-seo-vs-aeo/`)
1. **(R) Kurzantwort + "Winner box"** — answer-first verdict *by use case*.
2. (R) Key takeaways · 3. (R) **Criteria table** (rows = criteria, columns = options; the format AIs lift verbatim) · 4. (R) Per-option deep dive (strengths/limits, neutral) · 5. (R) **Verdict-by-use-case** list ("Best for marketing → …; best for long-context → …") · 6. (C) Pricing/tier comparison (link to official pricing, don't hardcode; "as of <date>") · 7. (R) Swiss/data-sovereignty angle · 8. (R) Common mistakes in choosing · 9. (R) FAQ · 10. (R) CTA (advisory) · 11. (R) Author/sources/last-updated. *This page defines the reusable comparison template other comparisons inherit.*

### 4.6 Tutorial / how-to (learning format, e.g. `/how-to-use-ai-for-beginners/`)
1. (R) Kurzantwort ("By the end you will have …") · 2. (R) Prerequisites / what you need · 3. (R) **Numbered steps** (HowTo schema, each step with a concrete action + expected result; screenshot/diagram where useful) · 4. (C) Worked example end-to-end · 5. (R) Common mistakes / troubleshooting · 6. (C) Swiss/privacy note (what not to paste into public tools) · 7. (R) Next steps / learning path link · 8. (R) FAQ · 9. (R) Author/sources/last-updated.

### 4.7 Tool page / directory (e.g. `/best-ai-tools/`, `/best-ai-tools-for-smes/`)
1. (R) Kurzantwort + selection methodology (how we chose; neutral, not affiliate spam) · 2. (R) **Category-based directory table** (tool, category, best-for, Swiss data-residency note, price tier "as of <date>") exposed as a first-party **Dataset** (schema) · 3. (R) Per-category short reviews · 4. (R) **Swiss data-sovereignty lens** column/section · 5. (C) Selection criteria / how to choose · 6. (R) High refresh cadence stamp + "last verified" · 7. (R) FAQ · 8. (R) Internal links to comparison + concept spokes · 9. (R) Author/sources/last-updated. **No price hardcoded outside config/labelled-as-of; no fabricated rankings.**

### 4.8 Case study (e.g. `/ai-case-studies-swiss-smes/`)
**Gated**: publishes as real study only with written client permission and verified metrics. Otherwise ships as framework.
- **Framework mode (default until real studies exist):** (R) "What a Weissmann case study measures" · problem → approach (Weissmann AI Method) → measurement method → *permissioned anonymised outcomes only*. No customer names, no fabricated numbers.
- **Real mode (permission on file):** (R) Client (with consent) · challenge · solution · **verified, attributed metrics** · quote (permissioned) · Swiss context · CTA. Every number sourced to the engagement and verifiable.

---

## 5. Sourcing & citation rules

1. **Primary sources only for facts.** Cite the origin (NIST, ISO, OECD, Stanford HAI, arXiv, Fedlex, EUR-Lex, EDÖB/FDPIC, EU AI Office, OWASP, kmu.admin.ch, Innosuisse), not a blog that cites them.
2. **Inline + dated.** Every statistic/regulatory claim carries an inline link and a date ("per NIST AI RMF, 2024"; "AXA: 22%→34%, 2024→2025"). Volatile facts get "as of <month year>".
3. **One citation ≈ every 150–200 words** in fact-bearing sections.
4. **Attribution to named humans.** Author byline (Giovanna Carpi / Nicola Moessner) with Person schema; expert reviewer named for compliance/technical pages.
5. **Copyright discipline.** No lengthy quoting of sources; paraphrase and cite. At most one short attributed quote where it strengthens GEO citeability; never reproduce third-party copy wholesale.
6. **Contested facts flagged as contested**, with the competing positions and sources.
7. **Sources block** at page foot: numbered, linked, dated list; mirrors inline citations.

---

## 6. Tone & reading level per language

**Full parity, not translation.** Each language is **transcreated** for its market by a native-level writer; the same facts, structure, schema, entities and internal-link graph, but idiomatic phrasing and locally-natural query framing. Never machine-translate and ship.

| Language | Role | Register | Reading level | Notes |
|---|---|---|---|---|
| **DE (root)** | Default, strongest, DACH-primary | Professional, precise, "Sie"-form; sober Swiss business German (avoid Germany-only idioms; Swiss spelling: "ss" not "ß") | ~ B2 / general business reader | Lead market. Swiss terms: revDSG/nFADP, EDÖB, CHF, KMU. |
| **EN** | International + expat/enterprise | Clear, professional, plain English; UK/EU spelling | Grade 9–11 (Flesch ~50–60) | Global citeability; keep Swiss framing explicit ("in Switzerland", "for Swiss SMEs"). |
| **IT** | Ticino / Italian-Swiss | Professional, "Lei"-form | Comparable to DE | Swiss-Italian terminology, CHF, nLPD. |
| **FR** | Romandie | Professional, "vous"-form | Comparable to DE | Swiss-French usage, LPD/nLPD, CHF. |

**Cross-language rules:** identical entity names (Weissmann AI, The Weissmann AI Method, GEO, product names) in all four; H2 questions phrased as *that language's* real search queries (not a literal translation of the DE question); every language links to its own language-correct siblings via `hreflang`.

---

## 7. Media, diagram & table guidance

1. **Original over stock.** Prefer purpose-built diagrams (mechanism flows, decision trees, Method-phase maps) over decorative imagery. No stock "robot" clichés.
2. **Tables for contrast.** Any comparison, taxonomy, criteria set, or "agents vs automation vs RPA" content is a table — AIs and AI Overviews lift tabular contrastive facts preferentially.
3. **Decision trees / numbered steps** for how-to and build-vs-buy content.
4. **Accessibility:** descriptive `alt` text (also a GEO/entity signal), sufficient contrast (light-first Concept B, ink-blue `#1f2a44` accent, Instrument Sans), semantic HTML headings in order.
5. **Performance:** optimised/responsive images, lazy-load, no layout shift — technical eligibility is a ranking + citation prerequisite on the Astro/Netlify static stack.
6. **Text is authoritative:** never place a citeable fact *only* inside an image; it must exist as extractable text too.
7. **Diagram source files** kept in-repo so all four language variants localise labels.

---

## 8. Internal-link requirements per article

Every Academy page must link:
- **Up** to its **cluster pillar** (once, contextually).
- **Sideways/down** to **≥ 3 relevant sibling spokes**, respecting the cluster map's distinctness/routing notes (e.g. voice-leaning readers → phone-assistant spokes; chat-leaning → RAG-chatbot spoke).
- **Into the glossary** for every canonical term on first use (deep-link to the term anchor).
- **To exactly the mapped service** — and only where `commercial` justifies it. Low-commercial informational pages route softly (one contextual link); high-commercial pages carry a clear separated CTA. Map to *one* primary service to avoid dilution (e.g. GEO spokes → GEO Authority; SEO spokes → SEO Growth; phone-assistant spokes → KI-Telefonassistent).
- **Language-consistent:** internal links point to same-language targets; `hreflang` handles cross-language.

Link text is descriptive and entity-named (not "click here"). No orphan pages: each new page is linked from its pillar in the same PR.

---

## 9. Schema / structured-data requirements per article

All pages carry, at minimum: **`Organization`** (Weissmann AI, Zurich, Technoparkstrasse 6, 8005 Zurich), **`Person`** (author — Giovanna Carpi and/or Nicola Moessner, as entities with role/credentials), **`BreadcrumbList`**, and self-referential **`hreflang`** + canonical. Driven from central config (`site.ts`) so all four languages and schema stay in sync.

| Page type | Required JSON-LD (in addition to the base set) |
|---|---|
| Pillar | `Article`/`TechArticle`, `FAQPage` |
| Concept spoke | `Article`/`TechArticle`, `FAQPage`, `DefinedTerm` links |
| Business/how-to spoke | `Article`, `HowTo`, `FAQPage`, `Service` (mapped service) |
| Glossary | `DefinedTermSet` + `DefinedTerm` per entry, **`QAPage`** pattern for citeability |
| Comparison | `Article`, `FAQPage`, criteria `Table`; `SoftwareApplication`/`Organization` per compared vendor |
| Tutorial/how-to | `HowTo`, `FAQPage`, `Article` |
| Tool page/directory | `Article`, **`Dataset`** (the directory as machine-readable first-party data), `FAQPage` |
| Case study | `Article`; `Review`/`Organization` only with permission + verified data |
| Service-adjacent | `Service` + `Offer` (price from `pricing.ts` only) |

`datePublished` + `dateModified` on every page. FAQ schema questions must **mirror the visible H2/FAQ text verbatim**. Validate against Google Rich Results + Schema.org before publish (Hard Gate H6). Keep `llms.txt` and `robots.txt` AI-crawler-friendly (allow GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended) and list the pillar + glossary as canonical references.

---

## 10. Update & review cadence

| Content type | Review cadence | Trigger updates |
|---|---|---|
| Volatile (prices, model tables, benchmark scores, tool directory, AI Act timeline) | **Quarterly** or on change | Any config/pricing change; new model/version; regulatory movement (e.g. EU AI Act Art. 6/50 deadlines, Digital Omnibus deferrals). |
| Regulatory/compliance pages | **Quarterly**, "Legal status as of <date>" refreshed each pass | New EDÖB/FDPIC guidance, EU AI Act phase, FADP ruling. |
| Evergreen concept/glossary | **Semi-annually** | Terminology drift; new canonical entity. |
| Comparison/tool | **Quarterly** (high-refresh) | New entrant, price/tier change, benchmark update. |

Every page shows a visible **"Zuletzt aktualisiert / Last updated"** and **"Last reviewed"** date. Freshness is a RAG/AI-selection signal — stale-looking volatile pages lose citations. Updates ship in all four languages together (four-language sync policy). Volatile facts are isolated in components/blocks so they can be refreshed without rewriting the article.

---

## 11. Fill-in article TEMPLATE — Spoke (business/how-to)

Copy this for a new business/how-to spoke. Replace every `<…>`; resolve every `⚠️ NEEDS VERIFICATION` before publish. (Concept, comparison, tutorial, tool and glossary variants follow the matching skeleton in §4.)

```markdown
---
title: "<H1 — question or benefit-led, e.g. 'How to Implement AI in Your SME: A Step-by-Step Playbook'>"
slug: "/<cluster-slug>/"           # from cluster map
lang: "<de|en|it|fr>"
cluster: "<cluster name>"
pillar: "/<pillar-slug>/"
service: "<mapped service, e.g. KI-Telefonassistent | SEO Growth | GEO Authority | none>"
intent: "<from cluster map>"
commercial: "<low|medium|high>"
author: "Giovanna Carpi"           # or "Nicola Moessner"
reviewer: "<name + role>"
datePublished: "<YYYY-MM-DD>"
dateModified: "<YYYY-MM-DD>"
schema: [Article, HowTo, FAQPage, Service]
hreflang: [de, en, it, fr]
---

<!-- KURZANTWORT / TL;DR box (H4 Hard Gate) -->
> **Kurzantwort.** <40–60 words: self-contained, entity-named direct answer to the head query.
> States the outcome, the "how" in one line, and the Swiss angle.>

**Key takeaways**
- <Standalone quotable claim 1 — a fact or rule, entity-named.>
- <Claim 2 — includes a cited stat "as of <date>" or a labelled tier estimate.>
- <Claim 3 — the Swiss-specific distinction (revDSG/CHF/data residency).>
- <Claim 4 — the decision rule / when this applies.>

## <Question H2 #1 — "Why/what problem does this solve?">
<Answer-first 2–4 sentences. Name <entity> explicitly. Then expand with a concrete
Swiss business example. Cite <source, date> for any figure or mark a labelled tier.>

## <Question H2 #2 — "How do you do it? Step by step"> (HowTo schema)
Mapped to the Weissmann AI Method:
1. **Discover** — <concrete action> → <expected result>.
2. **Analyse** — <…>.
3. **Design** — <…>.
4. **Build** — <…>.
5. **Deploy** — <…>.
6. **Measure** — <…>.
7. **Optimize** — <…>.

## <Question H2 #3 — "What does it cost?"> (only if relevant)
<Explain the COST STRUCTURE / model. Pull any figure from pricing.ts via component —
never type a price. Illustrative numbers labelled "example". ⚠️ NEEDS VERIFICATION on
anything ungrounded.>

## <Question H2 #4 — "Is it compliant / secure?"> (if relevant)
<revDSG/nFADP + EU AI Act framing. Inline-cite Fedlex/EUR-Lex/EDÖB with "Legal status
as of <date>". Include the not-legal-advice line. Name entities in full.>

## Real use cases by department/industry
| Department / industry | Use case | Outcome measured as | Swiss note |
|---|---|---|---|
| <…> | <…> | <metric, not a fabricated result> | <…> |

## Advantages & limitations
**Advantages:** <…>  **Limitations / when NOT to use:** <…>

## Common mistakes
- <Real, specific mistake + the fix.>

## <Downloadable resource> (if applicable)
<Checklist / template / calculator — first-party, citeable, Dataset/HowTo schema.>

## FAQ  (FAQPage schema — questions mirror these headings verbatim)
**<Q1 real query?>** <40–60w answer.>
**<Q2?>** <…>  **<Q3?>** <…>

## Related & next reads
- Pillar: [<pillar title>](/<pillar-slug>/)
- Spokes: [<sibling 1>](…) · [<sibling 2>](…) · [<sibling 3>](…)
- Glossary: [<term 1>](/ai-glossary/#<term>) · [<term 2>](…)

<!-- CTA block — visually separated, matches commercial level, one mapped service -->
> **<CTA headline>** — <one line>. [<Service CTA>](/<service>/)

---
**Author:** <Giovanna Carpi — CEO, Weissmann AI> · **Reviewed by:** <name, role>
**Published:** <date> · **Last updated:** <date> · **Last reviewed:** <date>
**Sources:** 1. <primary source, dated, linked> · 2. <…>
_This article is informational and not legal or financial advice._
```

---

## 12. Pre-publish checklist (paste into every PR)

```
HARD GATES (all must be YES)
[ ] H1 No invented facts (prices/stats/case studies/integrations/certs)
[ ] H2 No forbidden content (Podomedics / old address / eyewear / Even Realities)
[ ] H3 DE + EN + IT + FR all present, gated, hreflang+canonical correct
[ ] H4 40–60w Kurzantwort/TL;DR box present, answer-first
[ ] H5 Named author (Person schema) + recorded reviewer + dateModified
[ ] H6 JSON-LD present & validates for this page type
[ ] H7 All prices from pricing.ts (none hardcoded in prose)
[ ] H8 Every stat/legal claim inline-cited + dated
[ ] H9 Not-legal/financial-advice disclaimer where required

SCORE (need ≥ 90/100) ......... ___/100
  Answer-first/extractability __/15  Depth/originality __/15
  Entity density __/10  Sourcing __/10  Swiss specificity __/10
  Skeleton __/8  Schema __/7  Internal links __/7
  Commercial/CTA __/6  Media/tables __/6  Freshness __/6

[ ] Correct skeleton for page type (§4)
[ ] Every H2 opens answer-first, entity-named
[ ] ≥ 3 spoke links + pillar + glossary + one mapped service
[ ] Distinctness clause respected (no cannibalisation)
[ ] Last-updated + last-reviewed stamped; review cadence tagged
[ ] All ⚠️ NEEDS VERIFICATION flags resolved
Author self-score: ___  Reviewer score: ___  (Δ ≤ 10)
```

---

*This standard is itself a living document (owner: Editor-in-Chief). It is reviewed quarterly and versioned. The code config (`pricing.ts`, `site.ts`) governs facts; this document governs craft. When they conflict on a number, config wins and the prose is corrected.*
