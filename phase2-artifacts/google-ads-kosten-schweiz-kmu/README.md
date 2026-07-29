# Pilot 1 — Google-Ads-Budgetplaner für Schweizer KMU (DE)

Production-ready source for the first Phase-2 Artifact. **This is source code, not proof of public publication.**

| Field | Value |
|---|---|
| Article ID | `google-ads-kosten-schweiz-kmu` |
| Language | German (de) |
| Article URL | https://weissmann.ai/ki-academy/marketing-seo-geo/google-ads-kosten-schweiz-kmu/ |
| Artifact title | Google-Ads-Budgetplaner für Schweizer KMU · Weissmann |
| Interaction type | Calculator / scenario model |
| Source file | `index.html` (self-contained: inline CSS + vanilla JS, no external deps) |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/437a7d7b-0e5c-47de-a79e-70543280d1e6 |
| **Public URL** | **NOT YET PUBLIC** — requires a manual "Share → public" action by the account owner in claude.ai |
| Publication status | Published **privately**; anonymous access returns the claude.ai app shell, not the tool |

## Why there is no public URL

The Artifact tooling available to this automated session publishes artifacts as **private by default**.
The artifact renders and works inside Claude, but its share state is "private" (confirmed: the artifact
page's own control reads "Share, private"). Turning it public — so the URL opens without a claude.ai
login — is a manual step only the signed-in account owner can perform via the Share menu. This session
cannot flip that toggle and cannot verify anonymous access (a cookie-less request to the URL returns the
claude.ai application shell, not the calculator).

## What the tool does

Grounded in the article above, it estimates — from the user's own editable assumptions — monthly clicks,
enquiries, cost per enquiry (ad spend and management fee shown separately), an approximate break-even in
paying customers, whether the budget is too small for a meaningful test, which assumption is the biggest
lever, and what to measure before scaling. Pricing (CHF 690/month Google Ads Growth management, ad spend
paid separately to Google) is taken from `src/data/pricing.ts`. No promise of leads, revenue or
profitability; all defaults are labelled examples, not Swiss guarantees.

## To publish publicly (manual, owner action)

1. Open the private URL above while signed in to claude.ai.
2. Use **Share** → choose the public / "anyone with the link" option.
3. Copy the resulting public URL.
4. Open it in a logged-out browser to confirm it loads without authentication.
5. Record that public URL in `docs/WEISSMANN_60_ARTIFACT_PUBLICATION_LOG.md`.

Computation logic was verified deterministically (e.g. budget CHF 2'000 @ CPC 4, 4% CR →
500 clicks, 20 enquiries, ~CHF 135 per enquiry, break-even 3 customers; CHF 120 budget → "too small
for a meaningful test"; CPC 0 → graceful validation error).
