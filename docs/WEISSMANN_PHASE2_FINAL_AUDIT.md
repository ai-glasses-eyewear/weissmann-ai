# Weissmann Phase 2 — Final Audit Report

**Generated:** 2026-07-30 · **Branch:** `phase2/weissmann-public-artifacts`

## Headline numbers

| Metric | Value |
|---|---|
| Total **planned** Artifacts | 60 (30 DE / 20 EN / 10 IT, one per approved article) |
| Total **built + privately published** | 60 / 60 |
| Total **verified** (URL valid + correct article link + valid service link + correct title, no dupes) | 60 / 60 |
| Total **publicly verified** (anonymous access confirmed) | **0 / 60** — see note |
| Missing / invalid Claude URLs | 0 |
| Duplicate Claude URLs | 0 |
| Incorrect / malformed titles | 0 |
| Broken or incorrect **article** links | 0 (all 60 match the live sitemap URL and return HTTP 200) |
| Broken **service** links | 0 (all service links return HTTP 200) |
| Non-canonical (but valid) service links | 2 — B-DE-11, B-EN-10 |
| Localhost / placeholder / invented URLs | 0 |
| Artifacts still requiring manual action | 60 (owner must publicly **Share** each; that is the only outstanding step) |

## Why "publicly verified" is 0 / 60 (not a defect)

The Claude Artifact tool publishes **private-only**. Public access requires the owner to open each artifact in claude.ai and choose **Share → anyone with the link**. Until then the artifacts are reachable only when signed in as the owner. Evidence: a cookie-less `GET` of a canonical artifact URL returns HTTP 200 but only the generic single-page-app shell (`<title>Claude Artifact</title>`), never the artifact content — so anonymous accessibility cannot be, and must not be, claimed. The eventual public URL is not derivable from the private one and must be recorded after each Share. **This is the sole remaining action to finish Phase 2 end-to-end.**

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
| DE | 30 | 30 | 30 | 0 (Share pending) |
| EN | 20 | 20 | 20 | 0 (Share pending) |
| IT | 10 | 10 | 10 | 0 (Share pending) |

## Outstanding issues

None. No missing URLs, no duplicates, no incorrect titles, no broken/incorrect article links, no broken service links, no placeholders. The only non-canonical items are the two pricing-page service links noted above (valid, not errors).

## Conclusion

All **60/60** Weissmann Phase-2 Artifacts are built, grounding-audited, verified, backed up under `phase2-artifacts/<id>/`, logged, and pushed to `phase2/weissmann-public-artifacts`. Content and link integrity are fully verified. The **only** remaining step is the owner’s manual public **Share** of each artifact (and capturing the resulting public URLs). No PR/merge/deploy was performed; the live weissmann.ai website is untouched. This branch stands as the off-site backup and publication record.
