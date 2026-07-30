# Weissmann Phase 2 — Final Audit Report

**Generated:** 2026-07-30 · **Branch:** `phase2/weissmann-public-artifacts`

## Headline numbers

| Metric | Value |
|---|---|
| Total **planned** Artifacts | 60 (30 DE / 20 EN / 10 IT, one per approved article) |
| Total **built + privately published** | 60 / 60 |
| Total **verified** (URL valid + correct article link + valid service link + correct title, no dupes) | 60 / 60 |
| Total **manually published by the owner** (Share → "Anyone with the link") | **60 / 60** (owner-confirmed 2026-07-30) |
| Missing / invalid Claude URLs | 0 |
| Duplicate Claude URLs | 0 |
| Incorrect / malformed titles | 0 |
| Broken or incorrect **article** links | 0 (all 60 match the live sitemap URL and return HTTP 200) |
| Broken **service** links | 0 (all service links return HTTP 200) |
| Non-canonical (but valid) service links | 2 — B-DE-11, B-EN-10 |
| Localhost / placeholder / invented URLs | 0 |
| Artifacts still requiring manual action | **0** — the owner has publicly shared all 60 |

## Public publication — complete

The owner has published **all 60** artifacts via **Share, 'Anyone with the link'** (confirmed 2026-07-30). The Claude URLs recorded in the registry are the canonical artifact URLs the owner shared and are now the public links. **Verification-method note:** public status is recorded on the owner's confirmation, which is authoritative -- a server-side cookie-less HTML fetch of a Claude artifact URL returns the same single-page-app shell (`<title>Claude Artifact</title>`) for both private and publicly-shared artifacts, so an external fetch cannot itself distinguish the two; the owner's in-app Share action is the definitive record. **No further GitHub or build action is required.**

## What WAS verified programmatically (this pass)

1. **ID + language** — all 60 map to an approved article in `WEISSMANN_60_ARTICLE_MASTER_PLAN.md`.
2. **Artifact title** — read from each `index.html` `<title>`; all 60 present and end with "· Weissmann"; 0 incorrect.
3. **Claude URL** — all 60 are well-formed `https://claude.ai/code/artifact/<uuid>`; **0 missing, 0 invalid, 0 duplicates**.
4. **Article link** — each artifact’s footer article link was compared to the article’s canonical production URL (resolved from the live sitemap by slug); **60/60 exact match, every one HTTP 200**.
5. **Service link** — each footer service link checked live: **60/60 HTTP 200**; 58 are the canonical category service page, 2 (`B-DE-11`, `B-EN-10`) point to the pricing page `/preise/` (valid and relevant for Google-Ads-cost articles).
6. **No stray URLs** — scanned every `href` in all 60 files: **0 localhost, 0 placeholders, 0 invented/example URLs**.
7. **Interaction distinctiveness & value** — each artifact passed an adversarial grounding+interaction audit at build time (grounded only in its article + `pricing.ts`; a distinct interaction model, not the article restated). Registry records the interaction type per row.
8. **Registry status accuracy** — this registry is generated directly from the committed files, not hand-entered.

## Per-language totals

| Language | Planned | Built+published | Verified | Publicly shared |
|---|---|---|---|---|
| DE | 30 | 30 | 30 | 30 (owner-shared) |
| EN | 20 | 20 | 20 | 20 (owner-shared) |
| IT | 10 | 10 | 10 | 10 (owner-shared) |

## Outstanding issues

None. No missing URLs, no duplicates, no incorrect titles, no broken/incorrect article links, no broken service links, no placeholders. The only non-canonical items are the two pricing-page service links noted above (valid, not errors).

## Conclusion

All **60/60** Weissmann Phase-2 Artifacts are built, grounding-audited, verified, backed up under `phase2-artifacts/<id>/`, logged, pushed to `phase2/weissmann-public-artifacts`, and **publicly published by the owner** via Share, 'Anyone with the link' (owner-confirmed 2026-07-30). Content and link integrity are fully verified; all 60 are live to the public. No PR/merge/deploy was performed and the live weissmann.ai website is untouched. **Weissmann Phase 2 is closed** and this branch stands as the off-site backup and publication record.
