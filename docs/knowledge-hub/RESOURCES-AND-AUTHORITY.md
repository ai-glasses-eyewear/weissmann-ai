# Weissmann AI Academy — First-Party Resources & External Authority Plan

**Deliverable owner:** Content + Engineering | **Author of record (E-E-A-T byline):** Giovanna Carpi, with Nicola Moessner (compliance/PR) | **Stack:** Astro 5 static + Netlify, i18n (de root, `/en/ /it/ /fr/`), `trailingSlash: 'always'`, central config (`pricing.ts`, `site.ts`) | **Last reviewed:** 2026-07-20

This plan defines (A) the publishable first-party assets Weissmann builds, hosts and maintains, and (B) the external-authority whitelist and legitimate digital-PR program that earns citations. Every recommendation is engineered for two audiences at once: the human buyer and the AI assistant that quotes us. The moat throughout is the same one the cluster map identifies — a **Swiss/DACH data layer (CHF, revDSG/nFADP, EDÖB/FDPIC, EU AI Act, Apertus, .ch reality) in four synchronized languages** that global sources structurally lack.

---

## 0. Governing principles (apply to every asset in this document)

| # | Rule | Why it matters here |
|---|------|---------------------|
| P1 | **No fabricated data — ever.** No invented prices, search volumes, testimonials, customers, case-study metrics, benchmark scores, or legal figures. Anything ungrounded ships labelled `NEEDS VERIFICATION` or not at all. | Fabricated specifics are the fastest way to lose AI-citation trust and violate the Weissmann HARD RULES. Factual restraint *is* the moat. |
| P2 | **Prices come only from central config** (`pricing.ts`). Calculators teach cost *structure* and ROI *method*; they read live config values, never hardcode. Illustrative numbers are labelled "example". | Prices are volatile; a page that restates a stale price becomes unciteable and wrong. |
| P3 | **Four-language parity is a ship gate.** No asset (calculator, dataset, checklist, PDF) goes live until DE + EN + FR + FR + IT all exist, with self-referential hreflang + canonical. | Per the four-language-sync policy and the GEO requirement that each engine cite the language-correct page. |
| P4 | **Everything is answer-first and schema-marked.** Each asset page opens with a 40–60 word TL;DR/Kurzantwort and carries the correct JSON-LD (`Dataset`, `HowTo`, `FAQPage`, `SoftwareApplication`, `Article` + `Person`/`Organization`). | Assets are citation bait only if they are structurally extractable and entity-resolved. |
| P5 | **Date + "last verified" stamp on every volatile fact and every asset.** Visible `datePublished`/`dateModified`; a `data-last-verified` on calculator constants. | Freshness is a RAG selection signal; only ~11% of domains are cited by both ChatGPT and Perplexity — earn platform-agnostic trust through provenance. |
| P6 | **Gating is light and honest.** The *useful thing works without a form*; email is requested only for the downloadable/portable version (PDF pack, dataset file, saved report). Never dark-pattern. | Preserves citeability (assistants won't quote a gated wall) while still capturing leads. |
| P7 | **No artificial authority.** We never buy links, run PBNs, spin content, or trade backlinks. Authority is earned only through accuracy + usefulness + genuinely unique first-party assets. | Explicit mandate; also the only durable strategy under AI-answer ranking. |

---

# PART A — Weissmann First-Party Publishable Assets

## A.1 Priority matrix (build order)

Priority = (lead-gen strength × cluster leverage × citation/GEO value) ÷ build effort. Tier 1 ships first.

| Rank | Asset | Type | Primary cluster(s) | Service on-ramp | Lead-gen | Effort | Tier |
|------|-------|------|--------------------|-----------------|----------|--------|------|
| 1 | **4-Language AI Glossary (versioned dataset + pages)** | Dataset + reference | Foundations; backbone for ALL | All | Medium (assist) | M | **1** |
| 2 | **Missed-Call Cost + AI Phone-Assistant ROI Calculator** | Calculator | Agents/Voice; Business-Function | KI-Telefonassistent | Very high | M | **1** |
| 3 | **AI Readiness Assessment & Scorecard** | Interactive checklist → report | Business/KMU | Discover workshop | High | M | **1** |
| 4 | **revDSG + EU AI Act Compliance Checklist** | Checklist/PDF | AI Trust; Agents; Industry | Advisory/audit | High | S | **1** |
| 5 | **AI Tools Directory (versioned dataset)** | Dataset + directory | Foundations; KMU; Models | SEO/GEO + advisory | High | L | **2** |
| 6 | **AI ROI-by-Function Prioritization Calculator** | Calculator | Business-Function; KMU | Discover workshop | High | M | **2** |
| 7 | **Chatbot/Model Comparison Tables (versioned dataset)** | Dataset + tables | Models; Foundations | GEO Authority | Medium | M | **2** |
| 8 | **AI Acceptable-Use Policy Template (Swiss)** | Template | AI Trust; KMU | Advisory | Medium | S | **2** |
| 9 | **Prompt Library (150+, filterable, copy-to-clipboard)** | Template/resource | Foundations | Newsletter/lead | High | M | **2** |
| 10 | **AI Implementation Cost Estimator (Switzerland)** | Calculator | KMU; Agents | All services | High | M | **2** |
| 11 | **Swiss AI Funding & Subsidies Directory (dataset)** | Dataset | KMU; Local-AI | Advisory | Medium | M | **3** |
| 12 | **DPIA/DSFA Template + guided builder** | Template/HowTo | AI Trust; Industry | Advisory | Medium | M | **3** |
| 13 | **AI Vendor / DPA due-diligence checklist + RFP template** | Template/checklist | AI Trust; Agents | Advisory | Medium | S | **3** |
| 14 | **GEO / AI-Visibility Audit Checklist + self-audit tool** | Checklist/tool | Marketing/GEO | GEO Authority | High | M | **3** |
| 15 | **Use-Case Dataset (50+ SME automations by dept)** | Dataset | KMU; Business-Function | Advisory | Medium | M | **3** |
| 16 | **GitHub org: datasets + llms.txt + schema snippets + local-AI configs** | Repos | Local-AI; GEO; all | Developer trust | Medium | M | **3** |

---

## A.2 The assets in detail

For each: **what it is · cluster/service · lead-gen tie · Astro/Netlify build · no-fabrication caveat.**

### A.2.1 Calculators

Calculators are the highest-converting first-party format and the best-defended against fabrication, because they compute *from the user's own inputs* plus **config-sourced or clearly-labelled-example** constants.

---

**① Missed-Call Cost + AI Phone-Assistant ROI Calculator** *(Tier 1, flagship)*

- **What:** User enters calls/day, % missed (or "don't know" → a labelled estimate slider), average customer value, and industry. Output: estimated monthly revenue lost to missed calls, calls an assistant could capture, and a payback view against the Weissmann phone-assistant plans. Includes a "how we calculate this" expandable and a printable one-page result.
- **Clusters/service:** Agents/Voice (`/ki-telefonassistent-kosten/`, `/ki-terminbuchung-no-show/`, `/was-ist-ki-telefonassistent/`), Business-Function (`/ai-voice-agent-customer-service/`), Industry (arztpraxis, restaurant, hotel). **On-ramp:** KI-Telefonassistent Starter/Premium.
- **Lead-gen tie:** Result screen offers "Email me this ROI breakdown as PDF + a free 15-min missed-call audit." Netlify Form captures email; PDF generated client-side.
- **Astro/Netlify build:** Interactive island (`client:visible`) — Preact/vanilla TS component. **Plan prices read from `pricing.ts` at build time**, injected as props; the ROI method (structure) is static, the numbers come from config. Email capture via **Netlify Forms** (no backend) or a Netlify Function if we want to send the PDF by email. State is client-side; nothing personal in the URL (P-Privacy). One component, four locale wrappers pulling translated strings from the i18n dictionary.
- **No-fabrication caveat:** The tool computes from *user inputs* and *config prices only*. Any default it pre-fills (e.g. "average % of calls missed by SMEs") is shown as a **labelled, user-editable estimate with a cited tier**, never asserted as measured Weissmann data. If we cannot ground a benchmark default, the field starts blank and requires user input.

---

**② AI ROI-by-Function Prioritization Calculator** *(Tier 2)*

- **What:** Leader rates each business function (Support, Sales, HR, Finance, Ops) on volume, effort, and readiness; the tool returns a value-vs-feasibility matrix and a recommended "start here" ranking, branded as an application of **the value-vs-feasibility prioritization matrix** within the Weissmann AI Method.
- **Clusters/service:** Business-Function (`/ai-roi-by-business-function/`), KMU (`/ai-roi-business-case-smes/`). **On-ramp:** Discover workshop.
- **Lead-gen tie:** "Book a Discover workshop to pressure-test your top 3." PDF of the matrix on email capture.
- **Build:** Pure client island; no external constants → zero fabrication risk. The output is the user's own prioritization, so it is inherently honest.
- **Caveat:** Presented as a *decision aid*, not a benchmark. No claimed ROI percentages appear unless attributed to a named external source (Gartner/McKinsey/Deloitte) and dated.

---

**③ AI Implementation Cost Estimator (Switzerland)** *(Tier 2)*

- **What:** Builds a TCO view (one-off + recurring) for an AI project from scope inputs, distinguishing what Weissmann charges (config) from generic cost drivers (compute, integration, change management) shown as **structure, not asserted francs**.
- **Clusters/service:** KMU (`/ai-implementation-cost-switzerland/`), Agents (`/ki-telefonassistent-kosten/`). **On-ramp:** all services.
- **Lead-gen:** "Get a fixed-scope quote." Email → contact.
- **Build:** Island; Weissmann line-items from `pricing.ts`; third-party cost ranges either sourced+dated or shown as `NEEDS VERIFICATION` placeholders the user fills.
- **Caveat (critical):** This is the highest fabrication-risk calculator. **Only central-config prices are stated as Weissmann prices.** Every non-Weissmann figure is a labelled range with a source or an editable estimate. No "typical Swiss SME spends CHF X" claim unless cited to kmu.admin.ch/Deloitte-CH/AXA with a date.

*(Automation-savings and cost-per-department calculators can be spun from the same engine once ①–③ are validated.)*

**Shared calculator engineering standard**
- One reusable calc primitive (`<CalculatorShell>`) handling: locale strings, config-price injection, result card, PDF export (client-side, e.g. print-CSS or a lightweight lib bundled locally — **no external CDN**, CSP-safe), and Netlify-Form email capture.
- `SoftwareApplication` + `FAQPage` JSON-LD on each calculator page; the surrounding article carries the answer-first TL;DR so the *page* is citeable even though the *tool* is interactive.
- GA4 event on calculate + on email submit (consistent with existing `begin_checkout` tracking discipline).

### A.2.2 Checklists & scorecards

---

**④ AI Readiness Assessment & Scorecard** *(Tier 1)* — data, people, process, tech, governance dimensions → score + tailored next steps. Cluster: KMU (`/ai-readiness-assessment-smes/`). On-ramp: Discover. Build: client island, no external data → no fabrication exposure; result honestly reflects user answers. Lead-gen: emailed scorecard PDF + benchmark-against-peers *only if* we have a real, disclosed sample (until then, no peer benchmark — labelled "peer comparison coming once we have a permissioned sample").

**⑤ revDSG + EU AI Act Compliance Checklist** *(Tier 1)* — the definitive Swiss AI-compliance checklist, item-by-item with primary-source links (Fedlex, EUR-Lex, EDÖB). Clusters: AI Trust (`/ai-compliance-switzerland/`, `/eu-ai-act-switzerland/`), Agents (`/ki-telefonassistent-datenschutz-revdsg/`), Industry. On-ramp: advisory/audit. Build: static content + interactive check-off island; downloadable PDF on email. **Caveat:** "Orientation, not legal advice"; every legal item cites the article/instrument (e.g. "EU AI Act = Regulation (EU) 2024/1689, Art. 50"; "FADP in force since 1 Sep 2023") with a "legal status as of" date and a "provisional/pending" flag on moving parts (e.g. Digital Omnibus deferrals). Reviewed by Nicola Moessner.

**⑭ GEO / AI-Visibility Audit Checklist + self-audit tool** *(Tier 3)* — the operational checklist behind our own GEO service (answer-first structure, schema, entity density, llms.txt, crawler access). Cluster: Marketing/GEO (`/get-cited-by-ai-chatbots/`, `/ai-visibility-tracking/`, `/structured-data-for-ai-search/`). On-ramp: GEO Authority. Doubles as **proof-of-competence**: the Academy visibly practices what it sells. Lead-gen: "Run a full AI-Visibility Audit with us."

### A.2.3 Templates

**⑧ AI Acceptable-Use Policy Template (Swiss)** — editable policy governing ChatGPT/Shadow AI at work, revDSG-aware. Cluster: AI Trust (`/ai-acceptable-use-policy/`), KMU. Delivered as fill-in-the-blanks (web + downloadable .docx/.md). **Caveat:** template, not legal advice; placeholders for company-specific facts; no invented legal obligations.

**⑨ Prompt Library — 150+ prompts, filterable by role/industry, copy-to-clipboard + downloadable pack** — the *transactional* companion to the prompt-engineering *theory* spoke (deliberate anti-cannibalization). Cluster: Foundations (`/ai-prompts/`). Build: prompts stored as structured JSON (versioned, see datasets), rendered into a filterable island; copy-to-clipboard needs no backend; downloadable pack gated by email. Highest lead-gen of the Foundations cluster.

**⑫ DPIA/DSFA template + guided builder** and **⑬ Vendor/DPA due-diligence checklist + RFP template** — procedural assets carrying `HowTo` schema. Clusters: AI Trust (`/ai-data-protection-impact-assessment/`, `/ai-vendor-risk-dpa/`), Agents (RFP for a phone assistant). On-ramp: advisory. Caveat: procedural scaffolding, cites revFADP/GDPR duties by article, not legal advice.

### A.2.4 Datasets (the highest-leverage GEO citation bait)

Datasets are unique, structured, quotable, refreshable, and DOI-able — exactly what AI engines prefer to cite and what competitors don't have. All are **versioned**, carry **`Dataset` JSON-LD**, are published as machine-readable JSON *and* human tables, mirrored to **GitHub**, and given a **Zenodo DOI** on each release (reusing the workflow already established for the eyewear dataset v1.1.0).

**① 4-Language AI Glossary** *(Tier 1 — the single most important asset)*
- 100+ terms from all cluster glossaries, each: term (DE/EN/IT/FR), 40–60 word standalone definition, canonical-entity links, Swiss lens where relevant, source citations, stable anchor URL.
- **The internal-linking + citation backbone**: every spoke in every cluster links its defined terms here; each entry is an atomic, citeable answer.
- Schema: `DefinedTermSet` + per-term `DefinedTerm`, plus a `QAPage`/`FAQPage` pattern so each term is independently citeable.
- Build: one canonical JSON (`glossary.json`) drives all four language pages + schema (single source of truth, exactly like `pricing.ts`/`site.ts`). New terms ship in all four languages together (P3).
- Caveat: definitions cite primary sources (ISO/IEC 22989, NIST AI RMF, EU AI Act, OECD) inline; no invented etymology or stats.

**⑤ AI Tools Directory (versioned)** — curated tools by category with a **Swiss data-residency lens** (residency, price tier, SME-fit). Clusters: Foundations (`/best-ai-tools/`), KMU (`/best-ai-tools-for-smes/`), Models. High refresh cadence; feeds the comparison spokes. Caveat: tool facts (residency, pricing) are dated + linked to the vendor's own page, marked `NEEDS VERIFICATION` when unconfirmed; **not** affiliate spam.

**⑦ Model/Chatbot Comparison Tables (versioned)** — the reusable comparison template (criteria table + verdict-by-use-case) behind `/chatgpt-vs-claude-vs-gemini/`, `/claude-vs-chatgpt-vs-gemini/`, `/ai-model-pricing-comparison/`. Caveat: **never hardcode prices or benchmark scores** — every volatile cell states "as of <month/year>, per <official source>" and links out.

**⑪ Swiss AI Funding & Subsidies Directory** — federal + cantonal support map (Innosuisse, cantonal programs). Cluster: KMU (`/ai-funding-subsidies-switzerland/`), Local-AI. Low competition, high citeability. Caveat: every figure verified against the official page and dated; uncertain items `NEEDS VERIFICATION`.

**⑮ SME Use-Case Dataset (50+ automations by department/industry)** — structured, browsable, powering `/ai-use-cases-automation-examples-smes/`. Caveat: examples are illustrative *categories* of automation, not claimed Weissmann client results (those are gated — see below).

**Dataset engineering standard:** JSON in-repo → build-time render to pages + `Dataset` schema → GitHub release → Zenodo DOI → optional Hugging Face mirror. Each carries `version`, `dateModified`, `license` (CC BY 4.0 so citation is frictionless and attribution flows back to weissmann.ai), and a changelog. This is the "living page" pattern assistants prefer.

### A.2.5 GitHub organization (developer trust + citeable, forkable assets)

Repos under a `weissmann-ai` org, each MIT/CC-BY, README in EN (DE summary), linking back to the canonical page:

| Repo | Contents | Strengthens |
|------|----------|-------------|
| `ai-glossary` | The 4-language glossary JSON + schema | Foundations + all clusters |
| `ai-tools-directory` | Versioned tools dataset | Foundations, KMU, Models |
| `ai-comparison-data` | Model/pricing comparison tables (dated) | Models, Foundations |
| `swiss-ai-funding` | Funding directory dataset | KMU |
| `llms-txt-examples` | Reference `llms.txt` + robots.txt for AI crawlers | Marketing/GEO |
| `schema-snippets` | Copy-paste JSON-LD (`DefinedTerm`, `FAQPage`, `HowTo`, `SoftwareApplication`) | GEO, all |
| `local-ai-recipes` | Reproducible Ollama/vLLM/Apertus configs, Swiss-residency notes | Local-AI, Models |

Caveat: code/configs are tested and dated; no fabricated benchmark numbers in READMEs — any performance figure is reproduced from a cited source or the repo's own reproducible run.

### A.2.6 The case-study constraint (applies across A)

Real AI case studies (`/ai-case-studies-swiss-smes/`) are **the one asset we cannot fabricate**. Until written client permission exists, the page ships as a **framework** ("what a Weissmann case study measures") plus **permissioned, anonymized outcomes only**. No calculator, dataset, or scorecard may display a client metric, logo, or result without documented permission. This is a hard gate.

---

# PART B — External Authority & Digital PR

Authority is earned, never manufactured. We cite better than anyone (accuracy + primary sources + Swiss specificity), and we publish assets so unique that others cite *us*. No paid links, no PBNs, no link exchanges, no spun content, no directory spam.

## B.1 The source whitelist (what we cite, and how)

Only these source **types** may be cited as authority. Prefer the highest tier available for any given claim.

| Tier | Source type | Concrete examples | Use for |
|------|-------------|-------------------|---------|
| **1 — Primary law/standards** | Regulators, official legal texts, standards bodies | **Swiss:** Fedlex (revFADP/nDSG text), EDÖB/FDPIC guidance, Innosuisse, SECO/kmu.admin.ch, Swissmedic, FINMA. **EU:** EUR-Lex (Regulation (EU) 2024/1689), EU AI Office. **Standards:** NIST AI RMF, ISO/IEC 42001, ISO/IEC 22989, OECD AI, Council of Europe AI Convention/Convention 108+, IEEE, OWASP (Top 10 for LLMs), OSI (OSAID). | Every legal, compliance, governance, and definitional claim. Cite the exact article/clause + "as of" date. |
| **2 — Official vendor/model docs** | First-party product/model/pricing/safety pages | OpenAI, Anthropic, Google DeepMind/Gemini, Microsoft Copilot, Mistral, Meta (Llama license), **Apertus (ETH Zurich, EPFL, CSCS)**, Swisscom, Ollama/vLLM/llama.cpp/LM Studio docs. | Model capabilities, tiers, data-handling, pricing (linked, never restated as fact), licensing. Always link to the vendor's own page + date. |
| **3 — Peer-reviewed / research institutions** | Academic + reputable labs | arXiv (with venue where available), Stanford HAI, MIT, the Princeton/Georgia Tech/IIT-Delhi GEO study, ETH/EPFL publications. | Mechanism explainers, GEO tactics, ML/LLM concepts. Attribute to authors + year. |
| **4 — Reputable industry/market sources** | Named analysts + Swiss-relevant surveys | Gartner, McKinsey, Deloitte (incl. Deloitte CH, CFO Signals), EY, AXA Switzerland, Digitalswitzerland, MIT NANDA. | Adoption/market *context only*, always attributed + dated (e.g. "AXA 22%→34%, 2024→2025"), never presented as Weissmann-measured. |
| **5 — Reputable open-source projects/GitHub** | Maintained OSS with real communities | Ollama, vLLM, llama.cpp, Hugging Face, Mistral/Meta repos, OWASP repos. | Local-AI/self-hosting how-tos, licensing. Cite repo + release + date. |

**Citation rules (enforced in review):**
1. **Every statistic, legal fact, price, and benchmark is inline-attributed to a Tier-1/2/3/4 source with a link and a date.** No source, no claim — the claim is cut or marked `NEEDS VERIFICATION`.
2. **Prefer primary over secondary.** Cite the law/standard/vendor page itself, not a blog summarizing it.
3. **Prices/benchmarks are never restated as fact** — "as of <month/year>, per <official source>" + link.
4. **One citation per ~150–200 words** in factual sections, but honesty over density: fewer, correct, dated citations beat many vague ones.
5. **No copyrighted-text reproduction** — paraphrase + cite; short attributed quotes only where the GEO playbook calls for a quotation lever.
6. **Contested points are stated honestly** (e.g. "Google states llms.txt is not required") — transparent nuance earns trust and citations.
7. **Demand/volume is always a labelled tier/estimate**, never a fabricated search number.

## B.2 Earning authority — legitimate digital-PR / linkable-asset angles

The strategy is **linkable-asset PR**: publish things worth citing, then make them discoverable. Each angle maps to the clusters it strengthens.

| Angle (legitimate) | What we do | Clusters strengthened |
|--------------------|------------|-----------------------|
| **The 4-language glossary as the canonical DACH reference** | Publish, DOI it, keep it fresh; let other sites and assistants link the atomic term URLs. | ALL (backbone) |
| **Versioned first-party datasets (tools, comparisons, funding, use-cases)** with DOI + CC-BY | Unique, quotable, attributable data that researchers, journalists and assistants cite back to weissmann.ai. | Foundations, KMU, Models, Local-AI |
| **Apertus / Swiss sovereign-AI coverage** | Be the clearest, most-current multilingual explainer of the ETH/EPFL/CSCS model — a low-competition, high-authority topic. | Local-AI, Models |
| **Swiss AI funding directory** | The Swiss-specific funding map others don't maintain — natural inbound links from SME/startup resources. | KMU |
| **Original, honest first-party research** (e.g. a repeatable voice-AI latency benchmark, a "Swiss data-residency of top AI tools" audit) | Publish method + reproducible data; *only* real, reproducible numbers — no invented figures. | Agents, Local-AI, Trust |
| **Expert commentary / journalist sourcing** (HARO-style, Swiss tech press, digitalswitzerland network) | Giovanna Carpi / Nicola Moessner offer accurate, quotable expert input on Swiss AI compliance & practical AI. Real expertise, no pay-for-mention. | Trust, KMU, Industry |
| **Entity seeding across authoritative graphs** | Consistent, truthful Weissmann AI entity on **Wikidata, Crunchbase, LinkedIn, Google Business Profile, local .ch directories** — same name, founders, Zurich address (Technoparkstrasse 6), the Weissmann AI Method. | ALL (entity resolution) |
| **Standards-aligned checklists (revDSG/EU-AI-Act, GEO audit, AUP)** as free tools | Compliance/education pages that HR, legal and SME sites reference. | Trust, KMU |
| **Conference talks / guest articles on reputable venues** | Genuine thought-leadership contributions (no doorway guest-posting), each linking naturally to a canonical asset. | Varies by topic |

**Explicitly prohibited (never do):** buying/exchanging links, PBNs, comment/forum link spam, low-quality directory submissions, article spinning, fake reviews, paid "mentions" presented as editorial, or any scheme that manufactures signals rather than reflecting real usefulness. Authority comes only from accuracy + usefulness.

## B.3 Technical authority hygiene (Astro/Netlify)

- **`llms.txt` + `robots.txt`**: keep AI crawlers explicitly welcome (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended); list the glossary + each pillar + the datasets as canonical references. Publish per-language where relevant.
- **hreflang + canonical**: self-referential, four-language, on every asset page — so each engine cites the language-correct page.
- **Clean, fast, snippet-eligible static HTML** (Astro's strength); interactive islands hydrate only where needed (`client:visible`) so the citeable text renders server-side.
- **JSON-LD discipline** already in the codebase (Organization, Person for founders, Service, Offer) extends to `Dataset`, `DefinedTermSet`, `HowTo`, `SoftwareApplication`, `FAQPage`.
- **Netlify note:** account for the ~24h JS-cache caveat when shipping calculator logic changes; version calculator bundles so a corrected constant propagates predictably.
- **Central config as single source of truth**: glossary, tools directory, pricing, and site entities all flow from versioned config/JSON into pages + schema + all four languages — the same architecture that makes the site trustworthy makes it maintainable.

---

## C. Sequenced rollout (fits the four-language sync policy)

| Sprint | Ship (all 4 languages together) | Rationale |
|--------|-------------------------------|-----------|
| **1** | Glossary v1 (dataset + pages + schema); Missed-Call ROI calculator; Readiness scorecard | Backbone + highest-converting lead asset + easiest diagnostic |
| **2** | revDSG/EU-AI-Act checklist; AUP template; Prompt library | Trust + Foundations lead-gen; low effort, high citeability |
| **3** | Tools directory v1 (dataset + GitHub + DOI); Comparison tables; ROI-by-function calculator | Citation-bait datasets + Business-Function anchor |
| **4** | Funding directory; Implementation-cost estimator; DPIA/vendor templates | KMU commercial layer + procedural HowTo assets |
| **5** | Use-case dataset; GEO/AI-visibility self-audit; GitHub `local-ai-recipes`, `schema-snippets`, `llms-txt-examples` | Rounds out clusters + developer trust; entity-seeding runs in parallel throughout |

**Definition of done for every asset:** DE+EN+FR+IT parity · answer-first TL;DR · correct JSON-LD · dated + "last verified" · prices from config only · every external fact cited to a whitelist source · reviewed against the no-fabrication rule (P1) · Giovanna Carpi byline with Person/Organization schema.
