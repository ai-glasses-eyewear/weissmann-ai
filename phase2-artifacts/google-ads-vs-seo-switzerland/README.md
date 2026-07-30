# Pilot 6 — Google Ads vs SEO: How They Behave Over Time (EN)

Production-ready source for the sixth Phase-2 Artifact. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `google-ads-vs-seo-switzerland` (B-EN-10, "commercial-investigation, medium-high") |
| Language | English (en) |
| Article URL | https://weissmann.ai/en/ai-academy/marketing-seo-geo/google-ads-vs-seo-switzerland/ |
| Artifact title | Google Ads vs SEO: How They Behave Over Time · Weissmann |
| Interaction type | **Interactive data visualisation / timeline** — a 6th distinct model (vs. calculator / scorecard / decision-tree / matcher / generator) |
| Documented concept | "Side-by-side timeline visualizer (Ads results curve vs. SEO results curve)" |
| Source file | `index.html` (self-contained: inline CSS + vanilla JS + inline SVG, no external deps, no storage) |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/9b2bafa0-d22d-4137-82ec-42ee6d9c3084 |
| **Public URL** | **NOT YET PUBLIC** — requires a manual "Share → public" action by the account owner in claude.ai |
| Publication status | **PRIVATE — awaiting manual public share** (page shows "Share, private") |
| Article backlink | "Read the full Ads vs SEO comparison →" (article URL above) |
| Service CTA | "See Weissmann SEO & Ads pricing →" → https://weissmann.ai/en/preise/ (matches the article's own CTA) |

## What it does (complements the article — does not copy it)
The article compares Ads and SEO feature by feature. This Artifact turns its core thesis into an
**interactive timeline chart** (inline SVG): move the controls — time horizon (12/24/36 months), "pause the
Ads campaign at month X", and "keep maintaining the SEO / stop maintaining it" — and watch the two shapes
respond. Google Ads rises immediately and stays flat while it runs, then **drops to zero the moment it's
paused** (a light switch). SEO starts near zero, **compounds over months**, then either holds if maintained
or **slowly leaks** if neglected. A live text readout narrates the current shapes in the article's words,
plus feature cards (speed / cost / durability) and the article's own "reading it for your business" test.

## Honesty & safety (the key concern for a results-shaped visual)
- A prominent **"Illustrative — not a forecast"** banner: the curves show *shape*, carry **no numbers**, and
  are **not a prediction**. No agency (Weissmann included) can guarantee a ranking, CPC or outcome.
- The shapes are the article's own explicit qualitative claims (fast-but-switches-off vs slow-but-durable) —
  not invented data. The y-axis is labelled "Visibility (illustrative)" with no values; the x-axis is months.
- Pricing (CHF 690 Ads management, CHF 890 SEO) is Weissmann's published price from `src/data/pricing.ts`,
  shown as text with the "ad spend paid separately to Google" disclosure. Backlinko's ~39.8% #1-organic CTR
  is the figure corrected during the Phase-1 quality pass. No personal data collected; nothing stored.

## Verified (deterministic)
Syntax-checked (`node --check`); the full script runs `sync()→draw()→readout()` without throwing under a DOM
shim; curve math confirmed: Ads flat 0.72 while running → 0 after the chosen pause month; SEO ~0.03 (m0) →
0.80 (m12) → 0.84 plateau if maintained, or 0.66 (m18) → 0.51 (m24) slow decay if neglected.

## To publish publicly (manual, owner action)
Open the private URL while signed in to claude.ai → **Share** → public / "anyone with the link" → copy the
public URL → open it logged-out to confirm → record it in `docs/WEISSMANN_60_ARTIFACT_PUBLICATION_LOG.md`.
