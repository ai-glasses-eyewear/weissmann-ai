# Pilot 51 — Swiss Google Ads Budget Planner (EN)

Production-ready source for Phase-2 Artifact #51. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `google-ads-cost-switzerland-smes` (google-ads-cost-switzerland-smes) |
| Language | English (en) |
| Article URL | https://weissmann.ai/en/ai-academy/marketing-seo-geo/google-ads-cost-switzerland-smes/ |
| Artifact title | Swiss Google Ads Budget Planner · Weissmann |
| Interaction type | **3-tier budget planner: tier-based clicks-to-enquiries funnel with an agency-fee-on-top layer (distinct from Pilot 1's DE slider budget calc)** |
| Private Claude URL | https://claude.ai/code/artifact/d468fa73-5f72-496c-8f56-709fbb16ac8f |
| **Public URL** | **NOT YET PUBLIC** — manual owner Share required |
| Publication status | **PRIVATE** ("Share, private") |
| Service CTA | https://weissmann.ai/en/services/google-ads/ |

All CPC ranges taken verbatim from the article JSON: local services CHF 3.50-8, healthcare CHF 5-18, real estate CHF 4-12, professional services CHF 10-30, B2B SaaS CHF 8-25, financial services CHF 15-45. Three tiers and their ad-spend ranges from the article: Tier 1 Test CHF 500-1'200, Tier 2 Growth CHF 1'500-4'000, Tier 3 Competitive CHF 4'000-10'000+. Viability check implements the article's 'One Number That Actually Matters' (spend divided by CPC midpoint) and its ~50-70 clicks floor from 'When Google Ads Is Not the Right Move Yet'; CHF 300 input floor reflects the FAQ's ~CHF 300-400 too-thin threshold. Fee-on-top layer is the CHF 690/month Google Ads Growth management fee confirmed in pricing.ts (ads-growth) and the article's 'What CHF 690/Month Actually Buys' section; ad spend billed separately by Google. WordStream global figures (avg ~USD 5.42, USD 1.63 arts to USD 9.87 legal) and the ~30-50% Swiss premium shown as context only, attributed as in the article. Verdict math reproduces the article's own worked examples (CHF 4'000 at CHF 20 CPC = ~200 clicks; CHF 800 in a CHF 20-CPC category = too thin).

**Honesty caveats preserved:** Preserves the article's framing that all numbers are order-of-magnitude industry estimates, not Google's published rates and not per-account guarantees; the 30-50% Swiss premium is not an officially published Google figure. Conversion/enquiry rate is user-supplied because the article gives no Swiss conversion benchmark - the tool invents none and shows 'add your rate' until entered. Disclaimer states orientation not advice or a quote, and that nothing entered is stored or sent (in-memory only, no storage/network). Ad spend explicitly separated from the CHF 690 management fee, matching the pricing disclosure.

No invented claims, statistics or results; no personal-data collection; nothing stored (in-memory only); no external calls. Theme-aware, responsive, accessible.
