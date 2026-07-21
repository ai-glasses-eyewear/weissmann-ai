# Weissmann AI Academy — Prioritization, Phased Build Roadmap & Measurement Framework

**Author of record:** Giovanna Carpi (CEO), with Nicola Moessner (Strategy/PR)
**Scope:** 9 topic clusters · ~105 concept pages · 4 languages (DE default, EN, IT, FR) · ~420 URLs at full build
**Stack:** Astro 5 static → Netlify · i18n (`de` at root, `/en/`, `/fr/`, `/it/`) · `trailingSlash: always` · central config (`pricing.ts`, `site.ts`) is the single source of truth for prices, entities, and schema
**Status of this document:** Living plan. Last updated 2026-07-21. Re-review each phase gate.

---

## 1. Executive summary

The Academy is not a blog — it is a **citation asset** engineered so that AI assistants (ChatGPT, Claude, Gemini, Perplexity, Google AI Overviews) quote Weissmann as the canonical Swiss/DACH answer, while the same pages route buyers into four services (KI-Telefonassistent, AI Websites, SEO Growth, GEO Authority).

Three principles drive every sequencing decision below:

1. **Commercial gravity first.** Build the clusters that sit closest to a paid Weissmann engagement before the purely educational ones. The flagship product is the **KI-Telefonassistent**, so the Agents/Voice cluster is the pilot.
2. **The glossary is infrastructure, not content.** Every cluster internally links into `/ai-glossary/`. It must exist (as a seeded shell) in Phase 0, or every subsequent page ships with dead internal links and no `DefinedTerm` targets.
3. **Never ship 4 languages late.** Per the four-language sync policy, a page does not count as "done" until DE+EN+IT+FR are live with correct self-referential `hreflang`. Half-translated clusters fracture the entity graph and lose cross-lingual citations.

**The recommendation in one line:** Ship a Phase-0 spine (glossary shell + GEO/schema component library + 2 flagship pillars) then run **Cluster 3 (AI Agents, Voice & Chatbots)** as the first full pilot — the 10 pages in §9 — as the proof-of-standard before scaling.

---

## 2. Prioritization framework

### 2.1 Scoring model

Each cluster is scored 1–5 on five weighted factors. This is deliberately biased toward Weissmann's revenue and toward what is *winnable*, not toward raw search demand.

| Factor | Weight | What a 5 looks like |
|---|---|---|
| **Commercial pull** (maps to a Weissmann service + conversion path) | 30% | Direct on-ramp to KI-Telefonassistent / AI Websites / SEO / GEO with a Stripe/consult CTA |
| **Ranking + citation feasibility** (can we realistically win in 2026?) | 25% | Low/medium difficulty, Swiss-angle moat competitors lack |
| **Foundational leverage** (other clusters depend on it) | 20% | Glossary, GEO methodology, compliance facts everything links to |
| **GEO citeability** (unique, structured, quotable, Swiss) | 15% | First-party dataset, revDSG/EU-AI-Act facts, comparison tables |
| **Production readiness** (no blocking inputs — see §6) | 10% | No dependency on unpublished case studies, unconfirmed prices, or legal entity gaps |

### 2.2 Cluster scores

| # | Cluster | Prio (brief) | Comm. 30% | Feas. 25% | Found. 20% | GEO 15% | Ready 10% | **Weighted** |
|---|---|---|---|---|---|---|---|---|
| 3 | AI Agents, Voice & Chatbots | 9 | 5 | 4 | 3 | 4 | 4 | **4.15** |
| 2 | AI for Business & SMEs (KMU) | 9 | 4 | 4 | 4 | 5 | 3 | **4.10** |
| 8 | AI by Industry (Swiss playbooks) | 9 | 5 | 4 | 2 | 4 | 3 | **3.90** |
| 7 | AI Marketing, SEO & GEO | 9 | 5 | 3 | 4 | 4 | 4 | **4.05** |
| 1 | AI Foundations & Learning | 8 | 2 | 3 | 5 | 5 | 5 | **3.65** |
| 6 | AI Trust: Security/Privacy/Reg. | 9 | 3 | 4 | 4 | 5 | 3 | **3.80** |
| 9 | AI by Business Function | 8 | 4 | 3 | 3 | 4 | 3 | **3.45** |
| 4 | AI Models & Vendors | 8 | 4 | 2 | 3 | 4 | 4 | **3.30** |
| 5 | Local AI & Sovereignty | 8 | 3 | 3 | 3 | 5 | 4 | **3.45** |

> Note the split between the *content* leverage of Cluster 1 (Foundations owns the glossary — the single highest foundational score) and its *commercial* weakness. This is why Foundations is **not** built as a full cluster first, but its glossary + 2 pillars are pulled forward into Phase 0 as shared infrastructure. Build the backbone, defer the body.

---

## 3. Phased build roadmap

Six phases. Each phase is a coherent, shippable authority unit (never a half-cluster). Phase gates are hard: do not open the next phase until the current one is 4-language-complete and its KPI baseline is captured.

### Phase 0 — Foundation spine (the enabling layer)
**Goal:** Nothing ranks yet; everything that follows becomes cheaper and higher-quality.
- `/ai-glossary/` shell + **first ~40 terms** (the union of the Agents, SME, and Trust glossaries — the terms Phase 1–2 will link to). QAPage/`DefinedTerm` pattern, stable anchor URLs (`/ai-glossary/#rag`).
- Pillar `/artificial-intelligence-explained/` (Foundations) and pillar `/ai-marketing-seo-geo/` (the GEO methodology page that *justifies the whole Academy's format* — build the method before applying it at scale).
- **Shared Astro component library** (see §5.3): `<AnswerBox>` (TL;DR/Kurzantwort), `<KeyTakeaways>`, `<ComparisonTable>`, `<FaqSchema>`, `<HowToSchema>`, `<DefinedTermLink>`, `<LastUpdated>`, `<AuthorByline>` (Giovanna Carpi Person schema), `<ServiceCta>` (reads `pricing.ts`).
- Infra: confirm `llms.txt` lists glossary + pillars as canonical; `robots.txt` allows GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended; Person/Organization entity graph already live (commit `1558915`) extended with author schema.

### Phase 1 — PILOT: Cluster 3 (AI Agents, Voice & Chatbots)
The flagship commercial cluster and proof-of-standard. Full detail in §9.

### Phase 2 — Cluster 2 (SMEs/KMU) + Cluster 8 (Industry)
Built together because they interlock: the SME pillar is the horizontal "getting started/cost/ROI/compliance" hub; the Industry pages are the vertical landing pages (healthcare, restaurants, hotels, real estate, retail, insurance, law) that each link *up* to the SME pillar and *across* to the relevant Cluster-3 voice spoke. This is where the ROI calculator + readiness scorecard first-party assets ship.

### Phase 3 — Cluster 7 (Marketing/SEO/GEO)
Directly sells SEO Growth + GEO Authority. Depends on the GEO pillar seeded in Phase 0. High self-referential value: the Academy is itself the proof that Weissmann's GEO method works — publish the AI-Visibility Audit asset here.

### Phase 4 — Cluster 6 (Trust/Regulation) + Cluster 1 remainder (Foundations)
Trust is the citeability moat (revDSG/nFADP, EU AI Act, ISO 42001) that *de-risks every commercial page already shipped* — its facts get linked back into Phases 1–3. Foundations' remaining explainer spokes fill the glossary's narrative demand and complete the "start here" learning path.

### Phase 5 — Clusters 4, 5, 9 (Models/Vendors, Local AI, Business Function)
Lower commercial-per-page and (Models) higher volatility/difficulty. Built last, but Local AI + the Swiss-sovereignty angle (Apertus, ETH/EPFL/CSCS) is disproportionately citeable and reinforces the Trust cluster, so it is not "low value" — just later.

### Roadmap-at-a-glance

| Phase | Clusters | New concept pages | URLs (×4) | Gate to advance |
|---|---|---|---|---|
| 0 | Glossary + 2 pillars + components | 2 pillars + glossary | ~12 + glossary | Component lib signed off; glossary 40 terms live in 4 langs; schema validates |
| 1 | Cluster 3 (pilot) | 13 | ~52 | 10-page pilot §9 live in 4 langs; KPI baseline captured; standard ratified |
| 2 | Clusters 2 + 8 | 22 | ~88 | ROI calc + scorecard live; cannibalization audit clean |
| 3 | Cluster 7 | 13 | ~52 | AI-Visibility Audit asset live; internal-link map re-run |
| 4 | Clusters 6 + 1 (rest) | ~22 | ~88 | Legal facts "last verified" stamped; glossary ≥100 terms |
| 5 | Clusters 4 + 5 + 9 | ~33 | ~132 | Full 9-cluster interlink complete; refresh cadence in place |
| — | **Total** | **~105** | **~420** | |

---

## 4. Per-phase page counts & the 4-language production model

### 4.1 The unit of work is one *concept*, not one *page*

Because the four-language sync policy forbids shipping DE-only, the atomic deliverable is a **concept quad**: DE + EN + IT + FR of the same URL slug pattern, all with correct `hreflang` cross-refs, all reading the same `pricing.ts`/`site.ts` values. A concept is `WIP` until all four are live.

### 4.2 Production pipeline (per concept quad)

| Stage | Owner | Output | Tooling note |
|---|---|---|---|
| 1. Brief | Strategy (Nicola) | Answer-first outline, target keyword, entity list, glossary links, schema type, service CTA | Uses cluster map + intent line verbatim |
| 2. DE master draft | Giovanna / SME author | Full DE page, answer-first, cited sources, "NEEDS VERIFICATION" flags | DE is authored, never translated — it is the strongest language and the semantic master |
| 3. Fact/compliance pass | Giovanna | Every stat dated + attributed; legal facts checked to primary source (Fedlex/EUR-Lex/EDÖB) | No unsourced numbers survive this gate |
| 4. EN/IT/FR localization | Translator + reviewer | Not literal translation — *localized* (CHF stays, Swiss framing kept, KWs mapped to the target-language query) | Keep entity names identical across langs so citations resolve to one graph |
| 5. Build | Engineer | Astro pages using shared components; `hreflang` auto-generated; JSON-LD from central config | 1 Astro content collection entry per language |
| 6. QA | Engineer | Schema validates (Rich Results + schema.org), no orphan internal links, Lighthouse pass, `trailingSlash` correct | Automated in CI where possible |
| 7. Deploy | Engineer | Netlify deploy (`.git`/`.claude`/`.netlify` excluded); mind the **24h JS-cache caveat** when shipping interactive assets (calculator/glossary filter) | Bump asset hash / cache-bust for JS-bearing pages |

### 4.3 Realistic throughput

A mature pipeline sustains **~2 concept quads/week** (= 8 URLs/week) at the required quality. That implies:

| Phase | Concepts | Weeks @ 2/wk | Notes |
|---|---|---|---|
| 0 | ~3 + glossary | 3–4 | Front-loaded component build slows this; one-time cost |
| 1 (pilot) | 13 | 6–7 | Slower — the pilot *sets* the standard, expect rework |
| 2 | 22 | 11 | Two authors can parallelize verticals |
| 3 | 13 | 6–7 | |
| 4 | 22 | 11 | Legal review adds latency |
| 5 | 33 | 16 | |
| — | ~105 | ~12 months | Steady-state; compresses if a second author/translator is added |

Do **not** accelerate by shipping DE-first and back-filling languages — that violates policy and, more importantly, scatters the cross-lingual entity graph that is the whole GEO thesis.

---

## 5. Effort / impact matrix

### 5.1 Cluster-level

Impact = commercial + citation value. Effort = writing difficulty × blocking-input risk × languages.

```
IMPACT
  high │  Cluster 8 (Industry)      │  Cluster 3 (Voice) ★PILOT
       │  Cluster 2 (SMEs)          │  Cluster 7 (SEO/GEO)
       │                            │
       ├────────────────────────────┼────────────────────────────
       │  Cluster 6 (Trust)         │  Cluster 4 (Models/Vendors)
   low │  Cluster 1 (Foundations)*  │  Cluster 5 (Local AI)
       │  Cluster 9 (Bus. Function) │
       └────────────────────────────┴────────────────────────────
          low  ←──────────  EFFORT  ──────────→  high
```
\* Foundations plots "low impact / low effort" as a *full cluster*, but its glossary is a high-impact / low-effort carve-out pulled into Phase 0.
★ Cluster 3 is high-impact / high-effort — justified because it is the money cluster; we absorb the effort where it pays back directly.

### 5.2 Quick-win pages to prioritize *within* any phase

Low-difficulty, high-commercial pages that bank early wins and fund the harder pillars:
- `/ki-telefonassistent-restaurant/` (diff: low, comm: high) — pilot quick win
- `/ai-implementation-cost-switzerland/` (diff: low, comm: high)
- `/ai-readiness-assessment-smes/` (diff: low — ships the scorecard asset)
- `/ai-funding-subsidies-switzerland/` (diff: low, unique Swiss data)
- `/best-ai-model-swiss-business/` (diff: low, commercial linchpin)
- `/apertus-swiss-sovereign-ai/` (diff: low, GEO flagship)

### 5.3 Reusable-asset leverage (build once, amortize across ~420 pages)

The single highest-ROI engineering investment is the shared component/schema library in Phase 0. One correct `<FaqSchema>` component multiplied across ~105 concepts × 4 languages is the difference between a citeable corpus and 420 hand-rolled inconsistencies. Treat components — and the comparison-page template, the calculator, the glossary filter — as **products with owners**, not one-off page code.

---

## 6. Dependencies & blocking inputs (the honesty gates)

These gate *honest* publishing. A page that trips one of these ships in its **safe variant** (framework/method only, no fabricated specifics) or does not ship. This protects the citeability moat — a single fabricated stat that an assistant surfaces and a reader debunks poisons trust across the corpus.

| Blocking input | Blocks | Rule until resolved |
|---|---|---|
| **Real, permissioned case studies** | `/ai-case-studies-swiss-smes/`, proof sections on every commercial spoke | Ship as "what a Weissmann case study measures" framework + only anonymized, written-permission outcomes. **No invented customers, metrics, or logos.** (HARD RULE) |
| **Confirmed Stripe links & prices for new packages** | Any page quoting a price or with a checkout CTA (`ki-telefonassistent-kosten`, cost/ROI pages) | Prices come **only** from `pricing.ts`. Teach cost *structure* + ROI *method*; label any illustrative figure "example/estimate". Wire CTA to existing confirmed Stripe links (GA4 `begin_checkout` already tracked, commit `fd58a93`); do not invent a link. |
| **Verifiable integrations** (calendar/PMS/telephony/SIP) | `/ki-terminbuchung-no-show/`, industry spokes, "how it works" claims | Only name integrations that are actually delivered. Unconfirmed = "on request / NEEDS VERIFICATION", never asserted. |
| **Confirmed legal entity + UID** | `impressum`, Organization schema, author E-E-A-T, any "regulated" claim | Use the confirmed Zurich address (Technoparkstrasse 6, 8005 Zürich) and real UID in `site.ts`. Never carry over forbidden legacy identity. |
| **Legal facts** (revDSG/nFADP dates, EU AI Act articles/deadlines, Innosuisse/cantonal figures) | Cluster 6, all compliance sections, funding page | Cite primary source (Fedlex, EUR-Lex, EDÖB, kmu.admin.ch) inline + "Legal status as of \<date\>". Flag provisional items (e.g. Digital Omnibus deferral) as pending. Not legal advice. |
| **Demand/volume numbers** | Every page | Express as labelled tiers (very-high…niche), never fabricated monthly volumes. (HARD RULE) |
| **Glossary shell live** | Every concept in every cluster (internal links + `DefinedTerm` targets) | This is why the glossary is Phase 0 — it is a dependency of all 105 pages. |
| **GEO methodology pillar live** | The *format* of every page | The `/ai-marketing-seo-geo/` pillar defines answer-first/schema standards the corpus must follow — seed in Phase 0. |

**Absolute prohibitions carried into every gate:** never mention Podomedics, the old Culmannstrasse 39 / 8006 address, or anything about eyewear / Even Realities. Never invent prices, testimonials, customers, results, integrations, certifications, or statistics.

---

## 7. KPI framework

Measured at three altitudes. Baseline each metric at the phase gate *before* the phase publishes, so lift is attributable.

### 7.1 North-star + tier structure

**North star:** *Qualified service consultations + Stripe checkouts attributable to Academy pages* (business outcome), underpinned by *Share of Model* (are we the answer AI assistants give?).

| Tier | KPI | Definition | How to measure on the Astro/Netlify stack | Cadence |
|---|---|---|---|---|
| **A. Business outcome** | Qualified leads | Consult form + phone-assistant demo requests tagged with source Academy URL | GA4 event `generate_lead` w/ `page_cluster` param; UTM on internal CTAs | Weekly |
| | Assisted conversions | Academy page in the path before a Stripe checkout | GA4 `begin_checkout`/`purchase` (already tracked) + GA4 path/attribution report, `page_cluster` dimension | Monthly |
| | Service-page handoff rate | % of Academy sessions that reach a service page (`/ki-telefonassistent/` etc.) | GA4 funnel: cluster → `<ServiceCta>` click → service page | Monthly |
| **B. GEO / AI citation** | **Share of Model** | % of a defined prompt set where an assistant cites/names Weissmann | Prompt panel (see 7.2) run across ChatGPT/Claude/Gemini/Perplexity/AI Overviews | Bi-weekly |
| | Citation rate | # assistant answers linking weissmann.ai / naming the Method | Same panel + manual/API log; track by cluster + language | Bi-weekly |
| | AI-crawler hits | GPTBot/OAI-SearchBot/PerplexityBot/ClaudeBot/Google-Extended fetch volume | Netlify access logs / server-log parse, filter by UA + path | Monthly |
| | AI-referral sessions | Sessions from chatgpt.com, perplexity.ai, gemini, copilot referrers | GA4 referral + regex channel group "AI Assistants" | Weekly |
| **C. Classic SEO** | Keyword rankings | Position for each cluster's target KWs, per language | Search Console + rank tracker segmented DE/EN/IT/FR | Weekly |
| | Organic sessions | Non-AI organic, by cluster + language | GA4 + Search Console | Weekly |
| | AI Overview presence | Queries where our page appears inside Google AI Overviews | Search Console appearance filter + spot checks | Monthly |
| **D. Engagement / asset** | Glossary engagement | Term views, filter use, `DefinedTerm` anchor entries | GA4 events on `/ai-glossary/` (mind 24h JS-cache when shipping the filter) | Monthly |
| | Tool engagement | ROI calculator completions, readiness scorecard submissions, prompt-copy clicks, downloadable-pack grabs | GA4 custom events per asset | Monthly |
| | Content health | Orphan pages, thin pages, missing `hreflang`, stale "last updated" | Build-time report + monthly crawl | Monthly |

### 7.2 How to measure GEO citation concretely (the part everyone hand-waves)

1. **Define a prompt panel per cluster** — e.g. for Cluster 3: *"Was ist ein KI-Telefonassistent?"*, *"beste KI-Telefonassistent Anbieter Schweiz"*, *"AI phone assistant GDPR Switzerland"*, plus IT/FR equivalents. ~15 prompts × 4 languages × cluster.
2. **Run the panel bi-weekly** across the 5 target engines (API where available, logged manual runs otherwise).
3. **Score each answer:** cited (linked) / named (mentioned unlinked) / absent; and sentiment. Track **Share of Model = (cited+named) / total prompts**.
4. **Attribute to a page** so a low SoM tells you *which* page to strengthen (add stat, add citation, tighten answer-box — the proven GEO levers).
5. **Watch the 11%-overlap reality:** ChatGPT and Perplexity cite largely different sources, so track each engine separately and chase breadth of quality coverage, not one engine.

### 7.3 Per-phase success thresholds (illustrative targets, tune after Phase-1 baseline)

| Horizon | Signal we expect first |
|---|---|
| 0–8 weeks post-publish | AI-crawler hits rise; low-diff pages enter top-20; glossary anchors indexed |
| 2–4 months | First AI citations on low-diff/unique pages (Apertus, funding, revDSG); qualified leads from voice cluster |
| 4–8 months | Head-term rankings climb; Share of Model measurable on flagship prompts; assisted conversions attributable |
| 8–12 months | Compounding cross-lingual citations; the glossary becomes the most-linked internal + external target |

---

## 8. Governance model (scaling to hundreds of pages without decay)

The failure mode of a 420-URL corpus is entropy: cannibalization, contradictory facts, dead internal links, stale legal claims, drifting entity names. Govern with rules an engineer/writer can execute, not vibes.

### 8.1 Single-source-of-truth discipline
- **Prices, service names, Stripe links, address, UID, founder names** live *only* in `pricing.ts` / `site.ts` and flow into pages + JSON-LD + all 4 languages. A price is never typed into prose. This is already the pattern (schema commits `1558915`, `e4be5e1`) — extend, never bypass it.
- **Entity names identical across languages** ("Weissmann AI", "The Weissmann AI Method", "GEO", founder names) so cross-lingual citations resolve to one entity graph.

### 8.2 Cannibalization control
- **One primary keyword → one canonical page.** The cluster map already encodes the firewalls (prompt-engineering *theory* vs `ai-prompts` *library*; GEO-vs-SEO-vs-AEO boundary; cost vs ROI). Enforce them.
- **Cannibalization audit at every phase gate:** Search Console query→page report; if two pages rank for the same query, merge or re-focus and 301 (respect `trailingSlash`).
- **New-page checklist requires** naming the one keyword it owns and the sibling pages it must *not* overlap, with the disambiguation sentence written up front.

### 8.3 Internal-link maintenance
- Every concept links **up** to its pillar, **across** to ≥2 sibling spokes, **down/out** to ≥3 glossary terms, and to exactly one **service** page.
- **Build-time orphan/broken-link report** fails CI if a page has no inbound pillar link or points to a missing `DefinedTerm` anchor.
- Glossary is the hub: each term links to the spoke(s) that explain it; each spoke links back to its terms.

### 8.4 Freshness & refresh cadence
- Every page renders `<LastUpdated>` and, for legal/volatile pages, "Legal status as of \<date\>" + "Last verified".
- **Refresh tiers:**
  - *Volatile* (tool directories, model/price comparisons, AI Act timeline): review **quarterly**.
  - *Semi-stable* (compliance explainers, cost structure): review **half-yearly**.
  - *Evergreen* (concept explainers, glossary): review **yearly** or on trigger.
- A stale "last verified" older than its tier auto-flags in the content-health report. Freshness is a RAG selection signal — treat an expired stamp as a bug.

### 8.5 Quality gate (definition of done, per concept quad)
A concept is done only when **all** are true:
1. Answer-first `<AnswerBox>` (40–60 words, self-contained, entity named) opens the page and each H2.
2. `<KeyTakeaways>` present with 3–5 standalone quotable claims.
3. Correct schema (Article/TechArticle + FAQPage + HowTo/DefinedTerm as applicable) validates.
4. Every stat dated + attributed to a linkable primary source; zero "NEEDS VERIFICATION" left unresolved or unlabelled.
5. Author byline (Giovanna Carpi) + Person/Organization schema.
6. Internal links (up/across/down/service) satisfied; no orphans.
7. **All 4 languages live** with self-referential `hreflang` + canonical.
8. Swiss lens present (CHF, revDSG/nFADP, EU AI Act, .ch reality) where relevant.
9. `llms.txt` updated if the page is a canonical reference.

### 8.6 Ownership
- **Giovanna** — named author, fact/compliance final gate, DE master voice.
- **Nicola** — briefs, strategy, PR/entity seeding (Wikidata/Crunchbase/LinkedIn/local directories so citations resolve to a verified org).
- **Engineer** — component library, schema, CI health reports, Netlify deploys (excluding `.git`/`.claude`/`.netlify`; cache-bust JS assets).
- **Translator+reviewer** — localization parity, not literal translation.

---

## 9. Recommendation: first pilot cluster + first ~10 pages

### 9.1 Pilot cluster: **Cluster 3 — AI Agents, Automation, Voice & Chatbots**

**Why this cluster, not another:**
- **Highest weighted score (4.15)** and it is Weissmann's **flagship product** — the KI-Telefonassistent. Every page has a direct, honest path to revenue via existing, confirmed Stripe links (GA4 `begin_checkout` already instrumented).
- **Full buyer journey exists inside one cluster:** definition → cost → verticals → outcome → trust → comparison. That lets the pilot prove the *entire* commercial funnel, not just an educational format.
- **Contains genuine quick wins** (`/ki-telefonassistent-restaurant/`, diff low) to bank early ranking + lead signals while the hard pillar matures.
- **The Swiss moat is strongest here:** revDSG + EDÖB + EU AI Act Art. 50 disclosure + Swiss hosting + Schweizerdeutsch + 4 languages is exactly what global voice-AI vendors lack — the most citeable DACH answer.
- Foundations' glossary and the GEO pillar are pulled into **Phase 0** to remove Cluster 3's only real dependency, so the pilot is unblocked.

### 9.2 The first ~10 pages (each = one concept quad, DE+EN+IT+FR)

Sequenced to prove the standard *and* stand up the whole funnel:

| # | Page (slug) | Role in pilot | Intent / demand | Diff | Blocking input to clear first |
|---|---|---|---|---|---|
| 1 | `/ai-automation-agents-conversational-ai/` (pillar) | Cluster hub; answer-first + schema template all spokes inherit | Info, very-high | high | — |
| 2 | `/was-ist-ki-telefonassistent/` | Definitional money-adjacent entry; hands off to service page | Info→comm, very-high | high | — |
| 3 | `/ki-telefonassistent-kosten/` | Transactional; teaches cost *structure*+ROI, wires confirmed Stripe CTA | Transactional, high | med | **Prices from `pricing.ts` + confirmed Stripe link only** |
| 4 | `/ki-telefonassistent-restaurant/` | Quick win (low diff), direct service fit; links restaurants industry page | Comm, med | **low** | Only name delivered integrations |
| 5 | `/ki-telefonassistent-arztpraxis/` | Core Swiss vertical (healthcare); Swiss health-data sensitivity | Comm, high | med | Health-data claims cited, not asserted |
| 6 | `/ki-terminbuchung-no-show/` | Horizontal outcome page (calendar sync, reminders); complements verticals | Comm, high | med | **Verifiable calendar/PMS integrations** |
| 7 | `/how-voice-ai-works/` | Authority/GEO explainer (STT→LLM→TTS); internal-link hub, low commercial | Info, high | med | — |
| 8 | `/ki-telefonassistent-anbieter-vergleich/` | Neutral criteria-led buyer's guide; establishes comparison-table template | Comm compare, high | high | Neutral framing; no self-serving ranking |
| 9 | `/ki-telefonassistent-datenschutz-revdsg/` | Swiss/EU trust moat (revDSG, DSGVO, EU AI Act Art. 50) | Info-comm, med | med | **Legal facts cited to primary source + dated**; not legal advice |
| 10 | `/ai-glossary/` (shell, ~25 Cluster-3 terms) | Internal-link backbone + highest-leverage GEO asset; QAPage/`DefinedTerm` | Info reference, high | med | Glossary shell from Phase 0 |

*(Page 10 is the glossary seeded with this cluster's terms — KI-Telefonassistent, Voice AI, Conversational AI, STT/TTS, Barge-in, Endpointing, RAG, Guardrails, Human Handoff, Call Deflection, No-Show, SIP, EU AI Act Art. 50, etc. — so pages 1–9 have live `DefinedTerm` targets rather than dead links.)*

### 9.3 Why these 10 are the right proof-of-standard
They exercise **every component and every governance rule at once**: pillar template, answer-first boxes, FAQ + HowTo + DefinedTerm + Service schema, comparison-table template, the price/Stripe central-config path, the legal-citation gate, the glossary backbone, a low-diff quick win, and the 4-language pipeline. If this set ships clean — validates, ranks, earns first citations, and produces an attributable lead — the standard is ratified and Phases 2–5 scale it with confidence. If it does not, the failure is contained to one cluster before 400+ URLs inherit the mistake.

### 9.4 Immediate next actions
1. Build the Phase-0 component library + glossary shell (blocks everything).
2. Confirm the exact KI-Telefonassistent packages, prices, and Stripe links in `pricing.ts` before page 3 drafts.
3. Capture the KPI baseline (rankings, Share-of-Model prompt panel, crawler-log parse) **before** page 1 publishes.
4. Author DE masters for pages 1, 2, 4 first (pillar + definition + quick win) to validate the format, then localize to EN/IT/FR and gate-check before proceeding.

---

*Guardrails reaffirmed: prices only from central config; demand only as tiers; legal facts only from cited primary sources with dates; case studies only when real and permissioned; four languages always shipped together; never reference the forbidden legacy identity. Authority compounds only if every page stays trustworthy enough to be re-cited.*
