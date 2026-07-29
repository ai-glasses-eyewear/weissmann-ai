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
| 1 | DE-PHONE-01 – 05 | done (commit pending) |
| 2 | DE-PHONE-06 – 10 | pending |
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

_(Further batches logged the same way as they complete.)_
