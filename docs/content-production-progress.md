# Weissmann.ai — 60-Article Content Production: Progress Log

**Master prompt used:** [`docs/CLAUDE_WEISSMANN_60_ARTICLES_FINAL_MASTER_PROMPT.txt`](CLAUDE_WEISSMANN_60_ARTICLES_FINAL_MASTER_PROMPT.txt) (found untracked in the repo root `docs/`, confirmed as the sole file matching master-prompt search terms — no competing/duplicate master prompt exists).

**Branch:** `content/weissmann-60-articles` (created from `master` @ `c3edde181af49221ee051d4d911c27659e9f5e48`, 2026-07-29).

**Explicitly out of scope:** `docs/knowledge-hub/` — a separate, unrelated 105-page × 4-language general AI-education Academy strategy ("planning artifacts, nothing here is published or built" per its own README). Not combined with this 60-article commercial commission per the master prompt's "do not combine unrelated plans" rule. Referenced only for the reusable technical mechanism it prompted (see Architecture Decision below).

## Architecture decision (master prompt §2)

**Decision: Approach A — extend the existing `AcademyArticle` model.**

This was already implemented in [`src/data/academy.ts`](../src/data/academy.ts) prior to this session (code comment: "Prepared 2026-07-29 for the future 60-article strategy"), evidently by an earlier `Phase 17: Architecture prep` pass. Verified functional, not just present:

- `AcademyArticle.languages?: Locale[]` — locales the article genuinely exists in (all 60 new articles set exactly one: `['de']`, `['en']`, or `['it']`).
- `articleLanguages()` helper defaults to all 4 locales when unset (existing articles unaffected).
- `src/pages/[...path].astro` `getStaticPaths()` (lines 96–122) calls `articleLanguages()` per article and only emits routes for those locales — confirmed no French route/page will be generated for these DE/EN/IT-only articles.
- `src/pages/sitemap.xml.ts` (lines 35–36) does the same — sitemap will only list real pages.
- `Layout.astro` (lines 48, 64, 90–94) builds hreflang only from the `availableLocales` prop passed down from `getStaticPaths`, with `x-default` falling back to the first available locale when English isn't in the set. Canonical is always self-referencing (`localeUrl(locale, lp[locale])`).
- Header's language switcher (`availableLocales` prop, `switchTarget()`) falls back to the target locale's site root when no translated version exists — it does not fabricate a translated link.

No further architecture work needed. New articles are plain `academy-content/*.json` files with `languages` set to one locale; the routing/hreflang/sitemap/switcher machinery already handles the rest correctly.

**Locale-map convention for excluded locales:** per the master-prompt's own instruction ("do not pad excluded locales with placeholder or duplicated text"), the 3 unused `LocaleMap` slots (e.g. `en`/`it`/`fr` on a German-only article) are set to empty strings. These are never rendered (routes only generate for included locales) and are validated as build-safe in Batch 1.

## Supporting files read in full

- `docs/CLAUDE_WEISSMANN_60_ARTICLES_FINAL_MASTER_PROMPT.txt` (1785 lines) — the authoritative spec.
- `src/data/academy.ts`, `src/pages/[...path].astro` (routing/getStaticPaths), `src/pages/sitemap.xml.ts`, `src/layouts/Layout.astro` — architecture verification.
- `src/data/service-content.ts` (RichSection type, phone-assistant service content confirmed live at `/leistungen/ki-telefonassistent/`, 200 OK).
- `src/data/academy-content/chatbot-vs-voicebot-vs-ivr.json` — reference example for JSON structure/conventions.
- `docs/knowledge-hub/README.md` — confirmed as the unrelated, out-of-scope Academy strategy.

## Existing-content overlap audit (master prompt §3)

Full audit performed via repository survey of `academy-content/` (76 files), `service-content/` (9 services), `comparison-content/` (1 file), `industry-content/` (16 files, all live), `glossary-content/` (36 terms), `resource-content/` (4 files). See per-article "Closest existing page" + differentiation notes in the manifest below. Headline findings:

- **Saturated zones requiring careful narrowing:** GEO/AI-citation visibility (5 existing academy articles + geo service + geo-audit-checklist already cover definitions, GEO-vs-SEO, citation mechanics, schema — EN-WEB-10 and IT-WEB-09 must stay strictly commercial-investigation/vendor-evaluation framed, not re-explain GEO mechanics); AI phone assistant definitions, IVR/voicebot/chatbot distinctions, voice-AI technical pipeline, and call-recording/transparency legal duties are already owned by dedicated academy articles (DE/EN/IT-PHONE-02/03/04/06 must assume the definitions and go straight to their stated practical tool, not re-derive them); local SEO Switzerland is already covered generically (EN-WEB-09/IT-WEB-08 must stay in their stated narrow lane — doorway-page avoidance / Ticino-only — not repeat the GBP/NAP setup checklist).
- **`comparison-content/phone-assistant-vs-alternatives.json`** already owns the *category* comparison (AI phone assistant vs voicemail vs answering service vs receptionist). The master prompt's DE/EN/IT-PHONE-01 are *vendor-vs-vendor* comparisons (Weissmann vs named competing Swiss providers) — a genuinely different intent, but requires real, current, sourced competitor research (not fabricated), so these three articles are scheduled with explicit research passes (see manifest).
- **Wide open, no existing content at all:** website cost in Switzerland, cheap/affordable website Switzerland, web-agency comparison, platform choice (Wix/WordPress/Webflow/custom), e-commerce cost, quote-decoding, redesign-vs-repair — all 10 DE-WEB, most EN-WEB, most IT-WEB topics have zero overlap risk.
- No article in this plan will be deleted or replace existing content; every overlapping case is resolved by narrowing the new article's angle and cross-linking to the existing page instead of restating it.

## Counts

- **60 approved article topics** found in the master prompt (30 AI phone assistant: 10 DE + 10 EN + 10 IT; 30 website/SEO/GEO: 10 DE + 10 EN + 10 IT). All 60 titles, primary intents, unique angles and artifact concepts are explicitly given in the master prompt — used as-is, not substituted.
- **60 Claude Artifacts required** — exactly one per article (master prompt §8, §0.6).
- **No genuine conflicts** between the master prompt and any other file found in the repository. The only adjacent document (`docs/knowledge-hub/`) is an unrelated, separate strategy and was not used as a source of topics, titles or requirements for this task.

## Batch status

| Batch | IDs | Status |
|---|---|---|
| 1 | DE-PHONE-01 – 05 | done |
| 2 | DE-PHONE-06 – 10 | done |
| 3 | EN-PHONE-01 – 05 | done |
| 4 | EN-PHONE-06 – 10 | done |
| 5 | IT-PHONE-01 – 05 | done |
| 6 | IT-PHONE-06 – 10 | done |
| 7 | DE-WEB-01 – 05 | done |
| 8 | DE-WEB-06 – 10 | done |
| 9 | EN-WEB-01 – 05 | done (commit pending) |
| 3 | EN-PHONE-01 – 05 | pending |
| 4 | EN-PHONE-06 – 10 | pending |
| 5 | IT-PHONE-01 – 05 | pending |
| 6 | IT-PHONE-06 – 10 | pending |
| 7 | DE-WEB-01 – 05 | pending |
| 8 | DE-WEB-06 – 10 | pending |
| 9 | EN-WEB-01 – 05 | pending |
| 10 | EN-WEB-06 – 10 | pending |
| 11 | IT-WEB-01 – 05 | pending |
| 12 | IT-WEB-06 – 10 | pending |

## Per-article log

### Batch 1 — DE-PHONE-01–05 (complete)

| # | Title | Keyword | Intent | Article file | Artifact files | Uniqueness | Factual | Impl. | Validation |
|---|---|---|---|---|---|---|---|---|---|
| DE-PHONE-01 | KI-Telefonassistenten Schweiz: Anbieter-Vergleich | KI Telefonassistent Schweiz Vergleich | comparison | `academy-content/swiss-ai-phone-assistant-provider-comparison.json` | `artifacts/swiss-ai-phone-assistant-provider-comparison/` | pass — differentiated from `phone-assistant-vs-alternatives.json` (category vs. vendor comparison) | 6 real providers, live-fetched 2026-07-29, sourced with access date; no invented pricing/features | done | build+QA+links+duplicates+guardrails pass |
| DE-PHONE-02 | Versteht ein KI-Telefonassistent Schweizerdeutsch wirklich? | KI Telefonassistent Schweizerdeutsch | informational | `academy-content/swiss-dialect-comprehension-test.json` | `artifacts/swiss-dialect-comprehension-test/` | pass — assumes existing pipeline/definition articles, adds original test protocol | grounded in first-party Weissmann claim only, no invented vendor claims | done | build+QA+links+duplicates+guardrails pass |
| DE-PHONE-03 | Muss sich ein KI-Telefonassistent ausweisen? | KI Telefonassistent Kennzeichnung Schweiz | informational | `academy-content/ai-phone-assistant-greeting-transparency.json` | `artifacts/ai-phone-assistant-greeting-transparency/` | pass — ~90% new material vs. `ai-transparency-disclosure.json`/`ai-phone-assistant-data-protection.json`, 4 distinct industry scripts | EU AI Act Art. 50 timeline (final guidance 2026-07-20, duties from 2026-08-02) verified live | done | build+QA+links+duplicates+guardrails pass |
| DE-PHONE-04 | Anrufe aufzeichnen mit KI: was die Schweiz erlaubt | Telefonat aufnehmen Schweiz | informational | `academy-content/ai-call-recording-legality-switzerland.json` | `artifacts/ai-call-recording-legality-switzerland/` | pass — StGB 179bis/ter/quinquies angle net-new vs. `ai-phone-assistant-data-protection.json`'s revDSG focus | EDÖB, Fedlex (StGB text), Kanton Zürich datenschutz.ch all verified live; "keine Rechtsberatung" disclaimer present | done | build+QA+links+duplicates+guardrails pass |
| DE-PHONE-05 | Bestehende Telefonnummer behalten mit KI-Assistent | KI Telefonassistent bestehende Nummer | informational | `academy-content/keep-existing-swiss-number-ai-assistant.json` | `artifacts/keep-existing-swiss-number-ai-assistant/` | pass — regulatory porting + technical connection angle, no existing page covers this | BAKOM + ombudscom verified live; Weissmann's own technical scope stated honestly (forwarding only, no invented SIP/PBX claim) | done | build+QA+links+duplicates+guardrails pass |

**Batch 1 cross-checks:** 0 duplicate titles/slugs/H1s/openings within batch; 0 slug collisions against the other 79 existing academy articles (321 unique locale-slug keys across 84 files); full build = 654 pages; `qa-gates`/`check-links`/`audit`/`audit-duplicates`/`ci-guardrails`/`validate-pricing` all pass with 0 issues; spot-checked rendered HTML confirms self-referencing canonical, honest hreflang (only `de-CH` + `x-default`, no fabricated en/it/fr alternates), correct single H1, and automatic pillar-page linking (no orphans, no manual nav wiring needed). Two titles initially exceeded the 65-char audit limit and were shortened without losing meaning.

**Remaining:** 55 articles / 55 artifact briefs.

### Batch 2 — DE-PHONE-06–10 (complete)

| # | Title | Keyword | Intent | Article file | Artifact files | Uniqueness | Factual | Impl. | Validation |
|---|---|---|---|---|---|---|---|---|---|
| DE-PHONE-06 | KI-Telefonassistent: Kalender & CRM verbinden | KI Telefonassistent Kalender Integration | informational | `academy-content/ai-phone-assistant-calendar-crm-integration.json` | `artifacts/ai-phone-assistant-calendar-crm-integration/` | pass — no existing page covers integration architecture; distinct from DE-PHONE-01's per-vendor "Integrationstiefe" line | Microsoft Graph API + Google Calendar API docs verified live; no invented Weissmann-specific integrations (Premium-only, per pricing.ts) | done | build+QA+links+duplicates+guardrails pass |
| DE-PHONE-07 | KI-Telefonassistent versteht nicht: was dann? | KI Telefonassistent Fehler | informational | `academy-content/ai-phone-assistant-failure-handling.json` | `artifacts/ai-phone-assistant-failure-handling/` | pass — assumes `how-voice-ai-works.json` pipeline, adds original 4-stage escalation framework; self-caught and rewrote one repeated 8-word phrase vs. Batch 1 | Weissmann's own escalation claim (service-content.ts) cited honestly; 4-stage framework labelled as general best practice, not a documented Weissmann spec | done | build+QA+links+duplicates+guardrails pass |
| DE-PHONE-08 | KI-Telefonassistent vs. IVR: Der Anruf-Vergleich | KI Telefonassistent vs IVR | comparison | `academy-content/ai-phone-assistant-vs-ivr-caller-journey.json` | `artifacts/ai-phone-assistant-vs-ivr-caller-journey/` | pass — highest cannibalization risk in the batch, fully differentiated from `chatbot-vs-voicebot-vs-ivr.json` (measured caller-journey turns/seconds vs. that article's definitions); one scenario intentionally favors IVR | all example calls explicitly labelled as constructed illustrations, no invented studies | done | build+QA+links+duplicates+guardrails pass |
| DE-PHONE-09 | Lohnt sich ein KI-Telefonassistent für KMU? | KI Telefonassistent KMU | commercial-investigation | `academy-content/ai-phone-assistant-small-business-case.json` | `artifacts/ai-phone-assistant-small-business-case/` | pass — personalized break-even framing, distinct from both the vendor comparison and the category-comparison article | zero invented Swiss wage/interruption-cost statistics — all 3 calculator inputs are reader-supplied; illustrative example numbers explicitly labelled as such; real pricing.ts figures for the cost side | done | build+QA+links+duplicates+guardrails pass |
| DE-PHONE-10 | KI-Werbeanrufe Schweiz: was ist erlaubt? | KI Werbeanrufe Schweiz | informational | `academy-content/ai-outbound-marketing-calls-switzerland.json` | `artifacts/ai-outbound-marketing-calls-switzerland/` | pass — outbound (calling out) vs. inbound-disclosure (DE-PHONE-03) explicitly distinguished; original "automation multiplies the stakes" thesis, not a restatement of UWG | Art. 3 lit. u / Art. 23 UWG verified via SECO + Fedlex; **caught and corrected an inaccurate "CHF 20,000 fine" claim in the original research brief** — real penalty is imprisonment up to 3 years or a Geldstrafe, Antragsdelikt; the "20,000" figure was actually a historical SECO complaint count, not a fine amount | done | build+QA+links+duplicates+guardrails pass |

**Batch 2 cross-checks:** 0 duplicate titles/slugs/H1s/openings within batch and against Batch 1; 0 slug collisions across all 89 academy-content files (326 unique locale-slug keys); full build = 659 pages; full validator suite (`qa-gates`/`check-links`/`audit`/`audit-duplicates`/`ci-guardrails`/`validate-pricing`) passes with 0 issues, 0 orphans, 0 broken links, 0 near-duplicate content.

**Notable QA finding:** DE-PHONE-10's drafting agent independently fact-checked my supplied research and found it wrong (a fine amount I'd sourced was actually a complaint count) — corrected before publication. This is the kind of factual-verification failure the master prompt's batch-QA step exists to catch; flagging it here as evidence the process works, not just the output.

**Remaining after Batch 2:** 50 articles / 50 artifact briefs (all 10 DE-PHONE complete).

### Batch 3 — EN-PHONE-01–05 (complete)

| # | Title | Keyword | Intent | Article file | Artifact files | Uniqueness | Factual | Impl. | Validation |
|---|---|---|---|---|---|---|---|---|---|
| EN-PHONE-01 | Best AI Receptionists in Switzerland: 2026 Guide | best AI receptionist Switzerland | comparison | `academy-content/best-ai-receptionists-switzerland-buyers-guide.json` | `artifacts/best-ai-receptionists-switzerland-buyers-guide/` | pass — persona-sorted structure (cost/compliance/hospitality/technical buyer), not a translation of DE-PHONE-01's flat vendor-list format; adds an international-buyer language-breadth angle DE-PHONE-01 doesn't cover | same 6 real providers re-verified against DE-PHONE-01's sourced facts, plus a fresh Alveni English-availability check; no invented data | done | build+QA+links+duplicates+guardrails pass |
| EN-PHONE-02 | Will an AI Receptionist Work With Your Phone System? | AI receptionist existing phone number Switzerland | informational | `academy-content/ai-receptionist-swiss-phone-system-compatibility.json` | `artifacts/ai-receptionist-swiss-phone-system-compatibility/` | pass — technical SIP/PBX/Teams system-compatibility layer, explicitly distinguished from DE-PHONE-05's number-porting-regulation angle (one cross-link paragraph, not repeated) | Swisscom Enterprise SIP + Sunrise Business Voice/Teams pages verified live; Weissmann's own limited (forwarding-only) technical scope stated honestly | done | build+QA+links+duplicates+guardrails pass |
| EN-PHONE-03 | AI Receptionists for Hotels in Switzerland | AI receptionist hotel Switzerland | informational | `academy-content/ai-receptionist-swiss-hotels.json` | `artifacts/ai-receptionist-swiss-hotels/` | pass — hotel-specific scenario/boundary-list guide, distinct from the commercial `industry-content/hotels.json` landing page | grounded in Weissmann's own "honest limits" copy; explicitly did not borrow Alveni's PMS-integration facts (verified for a different provider in EN-PHONE-01) | done | build+QA+links+duplicates+guardrails pass |
| EN-PHONE-04 | AI Receptionist for Swiss Property Management | AI receptionist property management Switzerland | informational | `academy-content/ai-phone-assistant-property-management.json` | `artifacts/ai-phone-assistant-property-management/` | pass — administrative-triage-vs-emergency-judgement framework, new content not covered elsewhere | no invented PM-software integrations; safety framing hard-coded into artifact UI rules | done | build+QA+links+duplicates+guardrails pass |
| EN-PHONE-05 | AI Answering Services for Swiss Trades | AI answering service trades Switzerland | informational | `academy-content/ai-answering-service-swiss-trades.json` | `artifacts/ai-answering-service-swiss-trades/` | pass — good-vs-bad qualification-script breakdown; self-caught and fixed an opening-example overlap with EN-PHONE-04 ("dripping tap") before finalizing | no invented trade-specific integrations | done | build+QA+links+duplicates+guardrails pass |

**Batch 3 cross-checks:** 0 duplicate titles/slugs/H1s/openings within batch and against Batches 1–2; 0 slug collisions across all 94 academy-content files (331 unique locale-slug keys); full build = 664 pages.

**Real bug found and fixed during this batch:** `scripts/qa-gates.mjs` hard-required `hreflang="de-CH"` on every indexable page — a pre-existing assumption from before locale-restricted articles existed. This broke the build (exit 1) the moment 5 real `languages: ['en']` pages shipped, exactly the scenario the master prompt's §2 architecture was built to support. Fixed to require a self-referencing hreflang for the page's own locale (derived from its URL prefix) instead of hardcoding `de-CH`. Verified: full build now exits 0, all EN pages render only `hreflang="en"` + `x-default` (no fabricated de-CH/it/fr alternates), full validator suite passes with 0 issues across 664 pages. (One drafting agent in this batch had reported this as "non-blocking" — it was not; `npm run build`'s real exit code was 1. Re-verified independently before trusting the report.)

**Remaining after Batch 3:** 45 articles / 45 artifact briefs (all 10 DE-PHONE + 5 EN-PHONE complete).

### Batch 4 — EN-PHONE-06–10 (complete) — all 30 phone-assistant articles now done

| # | Title | Keyword | Intent | Article file | Artifact files | Uniqueness | Factual | Impl. | Validation |
|---|---|---|---|---|---|---|---|---|---|
| EN-PHONE-06 | How to Test an AI Receptionist Before You Sign | how to test AI receptionist | commercial-investigation | `academy-content/how-to-test-ai-receptionist-before-buying.json` | `artifacts/how-to-test-ai-receptionist-before-buying/` | pass — broad 25-call pre-purchase due-diligence plan, cross-links (not repeats) the narrower DE dialect-test and failure-handling articles; zero Weissmann-favoring bias by design (no pre-populated vendors, identical scoring for all) | no invented Weissmann results | done | build+QA+links+duplicates+guardrails pass |
| EN-PHONE-07 | What Happens When Your AI Receptionist Goes Down | AI receptionist reliability / outage fallback | informational | `academy-content/ai-receptionist-reliability-outage-fallback.json` | `artifacts/ai-receptionist-reliability-outage-fallback/` | pass — system-level outage category (calendar/internet/vendor platform down), distinct from DE-PHONE-07's mid-conversation-misunderstanding category | zero invented uptime/SLA figures — confirmed by grep; Weissmann's own gap stated honestly | done | build+QA+links+duplicates+guardrails pass |
| EN-PHONE-08 | Do Customers Trust AI Receptionists? | do customers like AI receptionists | informational | `academy-content/do-customers-trust-ai-receptionists.json` | `artifacts/do-customers-trust-ai-receptionists/` | pass — 4-factor trust framework + reasoned human-first routing list, broader than DE-PHONE-03's script-specific disclosure focus | zero invented trust/psychology statistics — confirmed by grep | done | build+QA+links+duplicates+guardrails pass |
| EN-PHONE-09 | AI Voice Cloning for Swiss Businesses: The Real Risks | AI voice cloning business Switzerland | informational | `academy-content/ai-voice-cloning-business-switzerland.json` | `artifacts/ai-voice-cloning-business-switzerland/` | pass — entirely new topic (voice replication vs. inbound call answering), zero overlap with any of the other 29 phone articles | Arup case (CNN) + FBI IC3 PSA + EU AI Act Art. 50 verified live; **discovered and honestly disclosed that Weissmann's Enterprise tier does list voice cloning** (verified against pricing.ts line 258) rather than assuming it doesn't exist | done | build+QA+links+duplicates+guardrails pass |
| EN-PHONE-10 | How to Measure an AI Receptionist: 12 KPIs | AI receptionist ROI / metrics | commercial-investigation | `academy-content/how-to-measure-ai-receptionist-kpis.json` | `artifacts/how-to-measure-ai-receptionist-kpis/` | pass — post-purchase measurement guide, distinct reader stage from DE-PHONE-09's pre-purchase break-even calculator | zero invented benchmark figures — explicit "no Swiss benchmark exists, track your own trend" section | done | build+QA+links+duplicates+guardrails pass |

**Batch 4 cross-checks:** 0 duplicate titles/slugs/H1s within batch and against all prior batches; 0 slug collisions across all 99 academy-content files (336 unique locale-slug keys); full build = 669 pages; full validator suite passes with 0 issues.

**Phone-assistant progress: 20 of 30 complete** (all 10 DE-PHONE + all 10 EN-PHONE; 10 IT-PHONE remain in Batches 5–6).

**Remaining after Batch 4:** 40 articles / 40 artifact briefs (10 IT-PHONE + 30 WEB articles).

### Batch 5 — IT-PHONE-01–05 (complete)

| # | Title | Keyword | Intent | Article file | Artifact files | Uniqueness | Factual | Impl. | Validation |
|---|---|---|---|---|---|---|---|---|---|
| IT-PHONE-01 | Assistenti telefonici AI in Svizzera: guida PMI | assistente telefonico AI Svizzera / centralino AI Svizzera | comparison | `academy-content/assistenti-telefonici-ai-svizzera-pmi-ticinesi.json` | `artifacts/assistenti-telefonici-ai-svizzera-pmi-ticinesi/` | pass — third distinct structure for the same underlying 6-provider dataset (market-reach-segmented: Ticino-only vs. multilingual vs. hospitality, vs. DE's flat list and EN's persona list) | same 6 verified providers, re-confirmed Italian-language availability for all six | done | build+QA+links+duplicates+guardrails pass |
| IT-PHONE-02 | Assistente AI, centralino o segreteria a confronto | centralino AI / segreteria telefonica AI | comparison | `academy-content/assistente-ai-centralino-segreteria-confronto.json` | `artifacts/assistente-ai-centralino-segreteria-confronto/` | pass — narrative caller-journey format, explicitly differentiated from the existing 4-locale `phone-assistant-vs-alternatives.json` feature table and from DE-PHONE-08's 2-system IVR journey (this is 3 systems, new Ticino scenarios) | no invented category-product claims | done | build+QA+links+duplicates+guardrails pass |
| IT-PHONE-03 | Al telefono risponde un'IA: il cliente lo sa? | obbligo dichiarare intelligenza artificiale Svizzera | informational | `academy-content/trasparenza-ai-telefono-ticino.json` | `artifacts/trasparenza-ai-telefono-ticino/` | pass — adds a genuinely new "language-switching disclosure" thesis specific to Ticino's cross-border/cross-lingual clientele; 4 new industry scripts, not a translation of DE-PHONE-03 | cross-links (not repeats) `ai-transparency-disclosure.json`'s legal analysis | done | build+QA+links+duplicates+guardrails pass |
| IT-PHONE-04 | Registrare le telefonate AI: le regole in Svizzera | registrare telefonate Svizzera / trascrizione chiamate AI | informational | `academy-content/registrazione-chiamate-ai-legalita-svizzera.json` | `artifacts/registrazione-chiamate-ai-legalita-svizzera/` | pass — 6 named Ticino scenarios incl. a genuinely uncertain "giallo" case (preventivo) DE-PHONE-04 doesn't raise | Italian-language IFPDT + Fedlex sources verified live, exact statutory wording cross-checked; "non è consulenza legale" present | done | build+QA+links+duplicates+guardrails pass |
| IT-PHONE-05 | Numero +41 esistente con un assistente AI? | assistente AI numero esistente / centralino AI numero svizzero | informational | `academy-content/numero-esistente-assistente-ai-ticino.json` | `artifacts/numero-esistente-assistente-ai-ticino/` | pass — new primary source (2018 Italian-language ombudscom case) not used by either sibling; wizard-style action-plan artifact, distinct mechanic from both DE and EN siblings | UFCOM/ombudscom verified live; Weissmann's limited technical scope stated honestly | done | build+QA+links+duplicates+guardrails pass |

**Batch 5 cross-checks:** 0 duplicate titles/slugs/H1s within batch and against all prior batches; 0 slug collisions across all 104 academy-content files (341 unique locale-slug keys); full build = 674 pages; full validator suite passes with 0 issues.

**Phone-assistant progress: 25 of 30 complete** (all 10 DE-PHONE + all 10 EN-PHONE + IT-PHONE-01–05). IT-PHONE-06–10 remain in Batch 6.

**Remaining after Batch 5:** 35 articles / 35 artifact briefs (5 IT-PHONE remain in Batch 6; 30 WEB articles in Batches 7–12).

### Batch 6 — IT-PHONE-06–10 (complete) — all 30 phone-assistant articles now done

| # | Title | Keyword | Intent | Article file | Artifact files | Uniqueness | Factual | Impl. | Validation |
|---|---|---|---|---|---|---|---|---|---|
| IT-PHONE-06 | AI e italiano ticinese: capisce chi cambia lingua? | assistente vocale italiano Svizzera | informational | `academy-content/test-comprensione-italiano-ticinese-ai.json` | `artifacts/test-comprensione-italiano-ticinese-ai/` | pass — own 6-dimension test protocol (cadence, DE/FR loanwords, code-switching) genuinely distinct from DE-PHONE-02's 7 dialect-region dimensions, not a translation | no invented test results | done | build+QA+links+duplicates+guardrails pass |
| IT-PHONE-07 | Centralino AI amministrazioni immobiliari Ticino | centralino AI amministrazione immobiliare | informational | `academy-content/assistente-ai-amministrazione-immobiliare-ticino.json` | `artifacts/assistente-ai-amministrazione-immobiliare-ticino/` | pass — fresh Ticino scenarios (GPL gas-bottle wording, historic-building elevator), distinct opening/thesis from EN-PHONE-04 | explicit 5-item always-escalate list, first-party Weissmann honest-limits quote | done | build+QA+links+duplicates+guardrails pass |
| IT-PHONE-08 | AI per hotel, B&B e campeggi in Ticino | assistente telefonico AI hotel | informational | `academy-content/assistente-ai-hotel-bb-campeggi-ticino.json` | `artifacts/assistente-ai-hotel-bb-campeggi-ticino/` | pass — extends beyond EN-PHONE-03's hotel-only scope to genuinely distinct B&B and campsite realities | no invented PMS integrations for Weissmann; emergency boundary stated twice, enforced structurally in artifact data | done | build+QA+links+duplicates+guardrails pass; 1 title-length fix (ampersand entity-encoding) |
| IT-PHONE-09 | Assistente telefonico AI per artigiani | assistente telefonico AI artigiani | informational | `academy-content/assistente-ai-artigiani-ticino.json` | `artifacts/assistente-ai-artigiani-ticino/` | pass — 4 named trades (vs. EN sibling's 2), distinct operational-chaos scenario, scoring/building artifact mechanic vs. EN's gap-flagging | no invented integrations | done | build+QA+links+duplicates+guardrails pass |
| IT-PHONE-10 | Chiamate pubblicitarie AI in Svizzera: cosa è legale | chiamate automatiche AI Svizzera | informational | `academy-content/chiamate-commerciali-automatiche-ai-svizzera.json` | `artifacts/chiamate-commerciali-automatiche-ai-svizzera/` | pass — adds a genuinely new Ticino-specific angle (cross-border Italian numbers under separate IT/EU rules) beyond DE-PHONE-10 | independently re-verified and confirmed the DE sibling's CHF 20,000 correction; found and fixed stale SECO URLs (site restructured mid-session) | done | build+QA+links+duplicates+guardrails pass |

**Batch 6 cross-checks:** 0 duplicate titles/slugs/H1s within batch and against all prior batches; 0 slug collisions across all 109 academy-content files (346 unique locale-slug keys); full build = 679 pages; full validator suite passes with 0 issues.

**Real issue found and fixed during this batch:** SECO restructured their public website mid-session, breaking the two SECO source URLs already committed in `ai-outbound-marketing-calls-switzerland.json` (DE-PHONE-10, Batch 2) — discovered when the IT-PHONE-10 drafting agent independently re-verified the same claim and found the old URLs 404ing. Located and verified the correct current URLs (`seco.admin.ch/de/uwg-themen`, `seco.admin.ch/de/beschwerde-wegen-unlauterer-geschaeftspraktiken-melden`) and fixed the already-committed article's `sources` array (included in this batch's commit). Also fixed 2 title-length overflows caused by HTML-entity encoding of apostrophes/ampersands inflating rendered `<title>` length beyond what the raw JSON string length suggested (same class of issue IT-PHONE-03 self-caught in Batch 5) — both titles rewritten to avoid the offending character.

**All 30 AI-phone-assistant articles complete** (10 DE + 10 EN + 10 IT). **Remaining: 30 website/SEO/GEO articles across Batches 7–12.**

### Batch 7 — DE-WEB-01–05 (complete)

| # | Title | Keyword | Intent | Article file | Artifact files | Uniqueness | Factual | Impl. | Validation |
|---|---|---|---|---|---|---|---|---|---|
| DE-WEB-01 | Website-Kosten Schweiz: Was den Preis bestimmt | Website Kosten Schweiz | informational | `academy-content/website-kosten-schweiz.json` | `artifacts/website-kosten-schweiz/` | pass — cost-anatomy market education, distinct from DE-WEB-02's promotion-centric article | zero invented market-average statistics; Weissmann's own real pricing used only as one labelled example, not a market claim | done | build+QA+links+duplicates+guardrails pass |
| DE-WEB-02 | Günstige Website Schweiz für CHF 880: was ist drin? | günstige Website Schweiz | transactional | `academy-content/chf-880-website-schweiz.json` | `artifacts/chf-880-website-schweiz/` | pass — exhaustive inclusion/exclusion transparency, cross-links (not repeats) DE-WEB-01 | every price/feature bullet re-verified verbatim against live pricing.ts twice; explicitly refuses "60% discount" framing with reasoning; no fake urgency/expiry | done | build+QA+links+duplicates+guardrails pass — highest-stakes commercial article, independently re-verified by me line-by-line |
| DE-WEB-03 | Beste Webagentur Schweiz: fair vergleichen | beste Webagentur Schweiz | commercial-investigation | `academy-content/webagentur-schweiz-vergleichen.json` | `artifacts/webagentur-schweiz-vergleichen/` | pass — evaluation framework, no named/invented competing agencies (confirmed via grep) | Weissmann's own gaps honestly disclosed, not just its strengths | done | build+QA+links+duplicates+guardrails pass |
| DE-WEB-04 | Agentur, Freelancer, Baukasten oder KI? | Webagentur oder Freelancer | commercial-investigation | `academy-content/website-agentur-freelancer-baukasten-ki.json` | `artifacts/website-agentur-freelancer-baukasten-ki/` | pass — proactively caught and fixed 3 near-duplicate section headings against concurrently-drafted siblings before finalizing | 3 of 4 worked examples resolve to non-agency routes, independently verified by re-running the scoring logic | done | build+QA+links+duplicates+guardrails pass |
| DE-WEB-05 | Wix, WordPress, Webflow: Welche Plattform passt? | Wix oder WordPress | commercial-investigation | `academy-content/wix-wordpress-webflow-individuell.json` | `artifacts/wix-wordpress-webflow-individuell/` | pass — requirements-first framework, distinct axis from DE-WEB-04 (technology vs. executor) | Wix/WordPress/Webflow platform facts verified against official docs with access dates; fit matrix independently verified non-rigged (3 of 4 presets favor non-custom-dev) | done | build+QA+links+duplicates+guardrails pass |

**Batch 7 cross-checks:** 0 duplicate titles/slugs/H1s/openings within batch and against all prior batches; 0 slug collisions across all 114 academy-content files (351 unique locale-slug keys); full build = 684 pages; full validator suite passes with 0 issues.

**Remaining after Batch 7:** 25 articles / 25 artifact briefs (5 DE-WEB in Batch 8; 20 EN/IT-WEB in Batches 9–12).

### Batch 8 — DE-WEB-06–10 (complete) — all 10 German website/SEO/GEO articles now done

| # | Title | Keyword | Intent | Article file | Artifact files | Uniqueness | Factual | Impl. | Validation |
|---|---|---|---|---|---|---|---|---|---|
| DE-WEB-06 | Website mit SEO erstellen lassen: Der Preis-Check | Website mit SEO erstellen lassen | commercial-investigation | `academy-content/website-seo-im-preis-enthalten.json` | `artifacts/website-seo-im-preis-enthalten/` | pass — narrow quote-scope angle, cross-links `ai-seo-guide` instead of repeating it | 4 official sources (Google Search Central, web.dev, schema.org) verified live | done | build+QA+links+duplicates+guardrails pass |
| DE-WEB-07 | Die versteckten Kosten einer billigen Website | billige Website versteckte Kosten | commercial-investigation | `academy-content/website-versteckte-kosten-drei-jahre.json` | `artifacts/website-versteckte-kosten-drei-jahre/` | pass — transparent illustrative 3-year TCO example, cross-links DE-WEB-01 | explicitly labelled illustrative, not rigged to favor Weissmann | done | build+QA+links+duplicates+guardrails pass |
| DE-WEB-08 | One-Pager oder Firmenwebsite: Wie viele Seiten? | One Pager Kosten Schweiz | commercial-investigation | `academy-content/website-seitenanzahl-kmu.json` | `artifacts/website-seitenanzahl-kmu/` | pass — information-architecture framework, honest counter-cases for needing more pages | Google doorway-pages policy cited; worked example independently verified to recommend fewer pages (39→11) than a reader might expect | done | build+QA+links+duplicates+guardrails pass |
| DE-WEB-09 | Website schnell erstellen lassen: was wirklich zählt | Website schnell erstellen lassen | commercial-investigation | `academy-content/website-schnell-erstellen-realistisch.json` | `artifacts/website-schnell-erstellen-realistisch/` | pass — 6-factor speed framework, no Weissmann-specific timeline invented (none documented in source) | confirmed no delivery-day figure exists anywhere in pricing.ts/service-content.ts | done | build+QA+links+duplicates+guardrails pass |
| DE-WEB-10 | Website-Launch: Tag eins bei Google und KI sichtbar | Website bei Google sichtbar machen / GEO Agentur Schweiz | commercial-investigation | `academy-content/website-launch-seo-geo-sichtbarkeit.json` | `artifacts/website-launch-seo-geo-sichtbarkeit/` | pass — highest cannibalization risk in the project, resolved: time-phased launch sequence, explicitly defers to and cross-links the 5 existing GEO academy articles rather than re-deriving definitions | Google recrawl/GBP docs + schema.org verified live; explicit no-guaranteed-outcome disclaimers matching existing `geo.json` service copy | done | build+QA+links+duplicates+guardrails pass |

**Batch 8 cross-checks:** 0 duplicate titles/slugs/H1s within batch and against all prior batches; 0 slug collisions across all 119 academy-content files (356 unique locale-slug keys); full build = 689 pages; full validator suite passes with 0 issues.

**Operational note:** all 5 of this batch's first-attempt agents failed mid-task with a session/API usage-limit error ("You've hit your session limit · resets 9am (Europe/Zurich)"). Rather than looping retries, I tested with one retry first (succeeded immediately, confirming the limit had reset), then retried the remaining four — all succeeded, some finding and correctly completing their own partially-written files from the failed first attempt rather than starting over blind.

**Real site-integration gap found (not yet fixed, deferred to the Site Integration task):** `AcademyArticlePage.astro` does not render the `relatedArticles` field into a visible link anywhere on the page, despite every article in this project (and pre-existing ones) populating it correctly. Orphan-checking still passes (pillar hub pages auto-list all spokes), but the master prompt's §11 cross-linking intent ("related existing page" links, avoiding "identical 'related articles' block across all pages") is not yet visually fulfilled. Confirmed via direct grep — zero references to `relatedArticles` in the render component. Will address as part of the site-integration batch (#102) before final PR.

**Progress: 40 of 60 articles complete** — all 10 DE-PHONE, all 10 EN-PHONE, all 10 IT-PHONE, and all 10 DE-WEB. **Remaining: 20 EN-WEB + IT-WEB articles across Batches 9–12.**

### Batch 9 — EN-WEB-01–05 (complete)

| # | Title | Keyword | Intent | Article file | Artifact files | Uniqueness | Factual | Impl. | Validation |
|---|---|---|---|---|---|---|---|---|---|
| EN-WEB-01 | Website Cost in Switzerland: A Guide for Founders | website cost Switzerland | informational | `academy-content/business-website-cost-switzerland.json` | `artifacts/business-website-cost-switzerland/` | pass — quote-normalization angle for international newcomers, distinct from DE-WEB-01's cost-component anatomy; adds a Swiss-market-norms section (VAT, no-haggle culture) the DE sibling lacks | Swiss VAT rate (8.1%) live-verified against estv.admin.ch | done | build+QA+links+duplicates+guardrails pass |
| EN-WEB-02 | Affordable Premium Web Design Switzerland: CHF 880 | affordable web design Switzerland | transactional | `academy-content/chf-880-website-affordable-premium.json` | `artifacts/chf-880-website-affordable-premium/` | pass — English promotion article, freshly written (not translated), cross-links EN-WEB-01 | every price/feature bullet re-verified verbatim against pricing.ts; "65% discount" framing explicitly refused with reasoning | done | build+QA+links+duplicates+guardrails pass — 2nd highest-stakes commercial article, verified line-by-line |
| EN-WEB-03 | Best Web Design Agency in Switzerland: A Buyer Guide | best web design agency Switzerland | commercial-investigation | `academy-content/best-web-design-agencies-switzerland.json` | `artifacts/best-web-design-agencies-switzerland/` | pass — structured by due-diligence stage (call→proposal→references→contract), structurally distinct from DE-WEB-03's flat criteria list; no invented competitors | Weissmann's own real gaps (no published case studies) honestly disclosed | done | build+QA+links+duplicates+guardrails pass |
| EN-WEB-04 | Small-Business Website Checklist Before the Quote | web design for small business Switzerland | commercial-investigation | `academy-content/small-business-website-checklist-switzerland.json` | `artifacts/small-business-website-checklist-switzerland/` | pass — usable-as-brief-template format, distinct reader moment from EN-WEB-03 (before contacting any vendor vs. evaluating one) | vendor-neutral by design, confirmed in artifact brief | done | build+QA+links+duplicates+guardrails pass |
| EN-WEB-05 | Website Redesign Switzerland: 12 Warning Signs | website redesign Switzerland | commercial-investigation | `academy-content/website-redesign-signs-switzerland.json` | `artifacts/website-redesign-signs-switzerland/` | pass — 12-sign taxonomy with real business-cost mechanisms per sign, non-shaming tone woven throughout | Google mobile-first/Core Web Vitals/HTTPS-ranking-signal docs verified live | done | build+QA+links+duplicates+guardrails pass |

**Batch 9 cross-checks:** 0 duplicate titles/slugs/H1s within batch and against all prior batches; 0 slug collisions across all 124 academy-content files (361 unique locale-slug keys); full build = 694 pages; full validator suite passes with 0 issues.

**Progress: 45 of 60 articles complete.** Remaining: EN-WEB-06–10 (Batch 10), IT-WEB-01–10 (Batches 11–12).

_(Further batches logged the same way as they complete.)_
