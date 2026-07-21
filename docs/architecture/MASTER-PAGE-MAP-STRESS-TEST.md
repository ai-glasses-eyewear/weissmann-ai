# Master Page Map — Adversarial Stress-Test

**Meets all owner requirements:** NO — see below

**URL architecture verdict:** Siloed + fully-localized paths generated from a slug registry is genuinely the strongest 5-10-year choice and I endorse it — it is the mainstream best practice and wins on SEO (path hierarchy + keyword-in-URL-per-language + URL-derived breadcrumbs), GEO (URL/Schema/llms.txt redundancy), EEAT, multilingual CTR and registry-driven scalability simultaneously. The only credible alternative — a single canonical (English) slug set reused across locale subpaths — reduces hreflang/301 complexity but forfeits in-market keyword relevance and native-trust signals, so localized correctly wins. Three refinements, none fatal: (1) the model is internally inconsistent — Company is deliberately kept 'flat' while every other pillar is a real silo; either silo Company too or state the exception as intentional, because a flat cluster still needs the same breadcrumb/hreflang discipline. (2) x-default -> English is defensible for global AI-citation reach but is in tension with DE-at-root/prefixDefaultLocale:false and a Switzerland-first (German-majority DACH) market; generic untargeted DACH queries may be misrouted to EN — flag for owner sign-off (already open decision #2). (3) The registry must actually reconcile §4.0's keyword-map to the real §4.4 inventory or the 'cannibalization structurally impossible in CI' claim is false. Net: keep the architecture; fix the keyword-map and Company consistency.

## Unmet or weak requirements

- Structurally the map honors all six owner requirements (Academy as its own pillar, 9 separated services, verb-test Academy/Resources split, siloed+localized URLs, informational->commercial link flow, zero-orphan CI, authority assets, GEO/EEAT/CWV, never-invent guardrails), but 'one canonical owner per topic' is NOT actually achieved because the §4.0 keyword-map is internally inconsistent with the §4.4 inventory (see residualCannibalization) and would fail its own CI gate.
- 'Clean split with NO overlap' between Academy and Resources is weak for interactive tools/calculators: calculators appear as Academy 'tool' pages (C2 ai-roi, ai-readiness, C3 ki-telefonassistent-kosten) AND under the Resources Calculators hub. The 'canonical Academy page <-> Resources download that links-not-duplicates' rule is a mitigation, not a clean separation, and creates duplicate-intent canonical ambiguity.
- EEAT requirement is under-served: every Academy page is bylined to a single author (Giovanna Carpi) with Nicola Moessner (Strategy/PR, not a credentialed lawyer/DPO) reviewing YMYL legal/health/finance content. The source CRITIQUE explicitly flags this authorship strain as a down-ranking risk; the master map does not add credentialed authors or a named legal reviewer.
- The 'never invent' guardrail is honored, but the source CRITIQUE's required 'central claims register' (one dated primary source per stat, referenced identically across all 4 languages to prevent inconsistent restatement) is not instantiated as a concrete mechanism/registry in §6 or §7 — only per-page citation discipline is described.
- Industries pillar (14 hubs) is defined by 'sector framing + featured services' but is assigned NO primary keyword ownership in §4.2, leaving its head-term relationship to the Academy C8 sector playbooks undefined (see residualCannibalization).

## Residual cannibalization

- The §4.0 keyword-map names Academy pillars 'seo' and 'geo' that do not exist as pillars — C7 (ai-marketing-seo-geo) is the pillar and generative-engine-optimization / ai-seo are its spokes. The map also assigns the head query 'Was ist SEO / SEO erklaert' to a page that is absent from the C7 inventory (there is no 'what is SEO' explainer). The keyword-map cannot be CI-enforced as written.
- Bare head 'KI-Telefonassistent' is claimed twice: §4.1 lists it as the AI Phone Assistant service page's primary commercial keyword, while C3 spoke 'was-ist-ki-telefonassistent' also lists primary keyword 'KI-Telefonassistent'. §4.0 tries to split them (service='...Zuerich', pillar='Was ist ein KI-Telefonassistent') but the underlying page records collide — the duplicate-head CI gate would fail.
- Bare head 'generative engine optimization' is owned by both the GEO service page (primary kw 'Generative Engine Optimization / GEO Agentur') and the C7 spoke slug generative-engine-optimization (primary kw 'generative engine optimization'). Commercial-vs-informational intent is asserted but the exact-match head term is shared.
- Industries hubs (/branchen/gesundheitswesen/ etc.) vs Academy C8 sector playbooks (ai-fuer-gesundheitswesen etc.) both plausibly target 'KI im/fuer [Sektor] Schweiz'. With no keyword assigned to the Industries hubs, the informational-vs-demand-hub split is undefended and these two layers can compete for the same sector head terms.
- Tools-page proliferation: best-ai-tools (C1, 'beste ki tools') vs best-ai-tools-for-smes (C2, 'KI Tools fuer KMU') vs ai-tools-directory (dataset, 'KI Tools Verzeichnis') vs Resources tools directory vs free-ai-tools — four to five pages crowding 'beste/KI Tools' intent. Overlap #10's audience split (general vs KMU) is thin and leaves residual competition for the bare 'KI Tools' head.

## Orphan risks

- The 'Comparisons library' index at /ki-academy/comparisons/ is referenced in §4.4 but is absent from the §3.4 canonical URL scheme — an undefined/potentially orphaned page.
- The Tools sub-cluster (best-ai-image-generators, best-ai-video-generators, etc.), the high-demand evergreen explainers (will-ai-take-my-job, free-ai-tools, why-ai-hallucinates, is-chatgpt-safe), and the ai-statistics-2026 dataset are all placed 'under C1' but no concrete cluster path is given; their URL form (/ki-academy/{cluster}/{article}/ with which cluster?) is unspecified, risking orphan/path-collision.
- Glossary scales to ~160 terms x 4 languages (~640 pages), each needing >=2 inbound links; low-frequency terms could fall below the inbound floor. The auto-glossary rehype linker (first-occurrence, cap 6) plus the de-orphaning boost mitigate this, but rarely-mentioned terms remain the most fragile nodes.
- Industries hubs risk being low-value bridge pages (reachable but thin) if they only 'frame and route' without owned content/keywords — technically not orphans but weak authority nodes.

## Thin-page / scale risks

- ~350-400 Academy URLs (9 clusters x ~11 pages x 4 languages) plus services, industries, matrix, glossary and resources push the site toward 600-800+ pages, all promising answer-first quality, dated sourcing and living 'last-verified' stamps — a heavy load for a two-founder team. The source CRITIQUE flags exactly this scope-realism risk; the phased rollout mitigates but the freshness commitment across all languages is under-staffed.
- The Phase-1 pilot's commercial payoff depends on Wave-1 matrix cells (Phone Assistant x Healthcare/Restaurants/Hotels) whose proof is all flagged NEEDS VERIFICATION. Per the guardrails those cells must ship noindex until verified proof exists, so the 'highest-commercial-intent pilot' may launch thin or non-indexable — a tension between the pilot choice and the proof gate.
- Volatile comparison/pricing pages (claude-vs-chatgpt-vs-gemini, ai-model-pricing-comparison, best-ai-* directories) x4 languages churn monthly; stale dates become anti-citation signals. Freshness tooling must exist before these ship at 4x volume.
- Matrix uniqueness gate (~800-1000 words + >=1 real proof) is sound, but with most cells gated on unverified proof, the practical launchable matrix is very small, so 'Industries we serve' section-only blocks carry most of the load initially.

## EEAT risks

- Single-author bylining: attributing 350-400 deep technical/legal/medical/financial Academy pages to one CEO (Giovanna Carpi) is implausible topical authorship and is precisely the strain the source CRITIQUE warns AI engines down-rank.
- YMYL/legal exposure: revDSG/nFADP, EU AI Act, DPIA, healthcare and finance compliance pages reviewed only by a Strategy/PR founder (Nicola Moessner) with no named lawyer/DPO/medical credential — insufficient demonstrable expertise and real liability risk on legal-advice-adjacent content.
- Launch-time trust thinness: a brand-new entity claiming to be 'the most authoritative AI platform in Switzerland' ships with zero case studies, testimonials or reviews (correctly gated to avoid fabrication) and 'pending legal confirmation' Organization legal fields — the Experience/authority signal is aspirational, not yet demonstrated.
- WebSite SearchAction (potentialAction) is declared in schema but no functioning on-site search endpoint/page is anywhere in the inventory — declaring SearchAction without a real search target is invalid/misleading structured data.
- Self-serving comparison pages: the KI-Telefonassistent 'Anbieter-Vergleich' and best-ai-tools rankings must stay genuinely neutral; any Weissmann-favouring tilt forfeits the citeability the entire GEO strategy depends on. The map notes 'neutral' but provides no enforcement mechanism.

## Missing from inventory

- The source CRITIQUE explicitly asked for 5-6 high-demand TWO-WAY comparisons (Copilot vs ChatGPT, Gemini vs ChatGPT, Perplexity vs ChatGPT, Claude vs ChatGPT). The map ships only the 3-way flagship + openai-vs-anthropic; the individual high-volume two-way head-to-heads are absent — a major missed-demand and citation-magnet gap.
- A 'What is SEO' informational explainer — referenced as a head-query owner in §4.0 but not present anywhere in the C7 inventory.
- A central 'claims register' artifact (dated primary source per statistic, single value reused identically across 4 languages) — recommended by the CRITIQUE, not instantiated.
- On-site search page/endpoint to back the declared WebSite SearchAction.
- A newsletter / lead-capture landing page — referenced as a conversion on-ramp ('Prompt Library -> Newsletter/lead') but not in the inventory; likewise no explicit thank-you/confirmation or 404 page.
- A dedicated 'supported integrations / tech-stack' proof page for the AI Integrations service (currently only flagged NEEDS VERIFICATION) — buyers of AI Integrations expect a concrete connector list.

## Top fixes

- Reconcile the §4.0 keyword-map to the actual §4.4 inventory BEFORE claiming CI-enforced canonical ownership: it names non-existent pillars (seo/geo are C7 spokes), assigns 'Was ist SEO' to a missing page, and lets the bare heads 'KI-Telefonassistent' and 'generative engine optimization' resolve to two URLs each. As written, the build-failing keyword gate cannot pass.
- Assign each of the 14 Industries hubs an explicit, distinct commercial/demand head keyword and codify its disambiguation from the Academy C8 sector playbook (commercial sector-demand vs informational 'KI in [Sektor] Schweiz'), or the two layers will cannibalize each other.
- Add real author diversity and a NAMED credentialed reviewer (lawyer/DPO for revDSG/EU AI Act/DPIA; clinician for healthcare; finance specialist) for YMYL content; stop bylining 350-400 pages to a single CEO.
- Place the Tools sub-cluster, evergreen explainers, ai-statistics-2026 dataset, comparisons index and glossary index explicitly in the §3.4 URL scheme with a defined cluster path each, so none is undefined/orphaned.
- Consolidate or sharply differentiate the 4-5 overlapping 'best AI tools' pages (best-ai-tools / best-ai-tools-for-smes / ai-tools-directory / free-ai-tools / Resources tools); the audience split is too thin to prevent 'KI Tools' cannibalization.
- Pick ONE canonical location per interactive calculator/tool (Academy learning page vs Resources download) and mark the other as a non-indexed embed with rel=canonical, to make the Academy/Resources split truly clean.
- Add the missing two-way vendor comparisons (Copilot/Gemini/Perplexity/Claude vs ChatGPT) and a 'What is SEO' explainer; stand up the central claims register; and drop the WebSite SearchAction unless a real search feature ships.
