# Weissmann 60 — Public Claude Artifact Publication Log (Phase 2)

Target: 60 public, interactive Claude Artifacts (30 DE / 20 EN / 10 IT), one per approved article.
This task scoped **3 pilots**. Status below is reported honestly against the strict definition of
"completed Artifact" (real · renders in Claude · **published publicly** · public URL · **opens without
auth** · interactive on the public version · visible article link · **anonymously re-verified**).

## Capability finding (blocker)

**Public, no-authentication Artifact publication is not available from this automated session.**

- The Artifact tool available here **creates and publishes** an artifact to a real claude.ai URL, and the
  artifact **renders and works inside Claude** — but it is **private by default**.
- Making an artifact publicly accessible (URL opens without a claude.ai login) is a **manual action only the
  signed-in account owner can perform** via the artifact's **Share** menu. This session cannot flip that
  toggle.
- Evidence: the published artifact's own control reads **"Share, private"**; a cookie-less (anonymous)
  request to the artifact URL returns the **claude.ai application shell, not the tool** (HTTP 200 but no
  artifact content).
- Therefore the strict "completed" criteria #3 (published publicly), #5 (opens without auth) and #8
  (anonymous re-verification) **cannot be satisfied by this session** for any of the 60.

**Update:** in later rounds the owner asked to proceed pilot-by-pilot anyway, publishing each **privately**
for a manual public Share. All **three pilots are now built and privately published** (details below); each
still shows "Share, private" and awaits the owner's manual public share + anonymous verification. No
substitute artifacts or spec directories were created for the remaining 57.

## Pilot 1 — google-ads-kosten-schweiz-kmu (DE)

| Field | Value |
|---|---|
| Article ID | `google-ads-kosten-schweiz-kmu` |
| Language | German (de) |
| Production article URL | https://weissmann.ai/ki-academy/marketing-seo-geo/google-ads-kosten-schweiz-kmu/ |
| Artifact title | Google-Ads-Budgetplaner für Schweizer KMU · Weissmann |
| Interaction type | Calculator / scenario model |
| Source (repo) | `phase2-artifacts/google-ads-kosten-schweiz-kmu/index.html` |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/437a7d7b-0e5c-47de-a79e-70543280d1e6 |
| **Public Claude URL** | **— none yet (manual Share required) —** |
| Renders in Claude | Yes (verified: correct title, served from artifact sandbox `frame.claudeusercontent.com`) |
| Functional test | Passed (formulas/verdicts verified deterministically) |
| Anonymous-access result | **Fail — private** (anonymous request returns claude.ai app shell, not the tool) |
| Mobile test | Source is responsive (single-column ≤860px, no horizontal overflow by design) |
| Article backlink | Present — visible "Vollständigen Leitfaden lesen →" to the DE article |
| Service CTA | Present — restrained "Google Ads Growth ansehen" → weissmann.ai/preise/ |
| Pricing accuracy | CHF 690/mo management + ad-spend-separate; verified vs `src/data/pricing.ts` |
| Remaining issue | **Public sharing** — owner must Share→public, then anonymously verify and record the URL here |
| Public verification (this round) | **Not done — no public URL supplied.** The "Pilot 1 public URL" field in the request was left as the literal placeholder `[PASTE THE PUBLIC URL HERE]`. Re-checked the private URL anonymously: still returns the app shell → **still private**. Public verification is pending a real public URL from the owner. No URL was invented. |

**v2 update (same private URL):** added a prominent visible footer link band below the disclaimer — two real anchor links (`target="_blank" rel="noopener noreferrer"`, accessible aria-labels): "Vollständigen Leitfaden lesen →" (DE article) and "Google Ads Growth von Weissmann ansehen →" (weissmann.ai/preise/). Content corrections: removed the fixed Zürich +25 % CPC factor (now prose caveat only); softened the click-count verdicts (no absolute "enough" claim); renamed the customer-value input to **average contribution margin per acquired customer** (correct break-even basis); flagged **CPC** and **conversion rate** as the two main variables (always-visible note + "Hauptvariable" badges). Republished to the same URL `…/artifact/437a7d7b-0e5c-47de-a79e-70543280d1e6`; still private.

## Pilot 2 — how-to-test-ai-receptionist-before-buying (EN)

| Field | Value |
|---|---|
| Article ID | `how-to-test-ai-receptionist-before-buying` |
| Language | English (en) |
| Production article URL | https://weissmann.ai/en/ai-academy/agents-automation/how-to-test-an-ai-receptionist/ |
| Artifact title | AI Receptionist 25-Call Test Lab · Weissmann |
| Interaction type | Interactive testing workspace + scorecard (business-type-adaptive; not a quiz) |
| Source (repo) | `phase2-artifacts/how-to-test-ai-receptionist-before-buying/index.html` |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/237e9cc0-ecbb-493a-a873-ed4de3e4acae |
| **Public Claude URL** | **— none yet (manual Share required) —** |
| Publication status | **PRIVATE — awaiting manual public share** (page control reads "Share, private") |
| Renders in Claude | Yes (verified: correct title in the artifact view) |
| Functional test | Passed — gating verified deterministically (A→Ready, B[emergency fail]→Not ready, C[few scored]→More testing required; any critical flag caps at Conditional; safety/emergency fail forces Not ready) |
| Mobile test | Responsive by construction (single-column grids, sticky bar wraps, no horizontal overflow) |
| Article backlink | Present — "Read the complete 25-call testing guide →" (working slug URL above) |
| Service CTA | Present — "Explore Weissmann AI phone assistants →" → weissmann.ai/en/services/ai-phone-assistant/ |
| Safety | States it places no calls / tests no provider automatically / gives no medical or emergency advice / never replaces emergency services (144·117·118); decision aid, not a certification; no data stored or transmitted |
| Remaining issue | **Public sharing** — owner must Share→public, then anonymously verify and record the URL here |

> Article-URL note: the production **slug** is `how-to-test-an-ai-receptionist` (HTTP 200). The id-based
> path `how-to-test-ai-receptionist-before-buying` returns 404 and is not used as a link.

## Pilot 3 — sito-web-chf-880-svizzera (IT)

| Field | Value |
|---|---|
| Article ID | `sito-web-chf-880-svizzera` |
| Language | Italian (it) |
| Production article URL | https://weissmann.ai/it/ai-academy/marketing-seo-geo/sito-web-economico-svizzera-chf-880/ |
| Artifact title | Il sito web da CHF 880 è adatto alla tua azienda? · Weissmann |
| Interaction type | Scope diagnostic / decision tree (11 guided questions → one of three verdicts) |
| Source (repo) | `phase2-artifacts/sito-web-chf-880-svizzera/index.html` |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/6b502b88-c844-486b-a049-cbe6b7b4d746 |
| **Public Claude URL** | **— none yet (manual Share required) —** |
| Publication status | **PRIVATE — awaiting manual public share** (page control reads "Share, private") |
| Renders in Claude | Yes (verified: correct title in the artifact view) |
| Functional test | Passed — verdicts verified deterministically (all-fit → Adatto; soft → Possibile riducendo lo scope; shop/booking/CRM/web-app → Meglio un progetto personalizzato + Complesso da 9'900; >8 pages / 3+ languages → Business 4'990; partial → provisional) |
| Mobile test | Responsive by construction (single-column ≤900px, no horizontal overflow) |
| Article backlink | Present — "Leggi la guida completa →" (working slug URL above) |
| Service CTA | Present — "Scopri il servizio siti web di Weissmann →" → weissmann.ai/it/servizi/sviluppo-siti-web-ai/ |
| Pricing accuracy | CHF 880 / regular CHF 2'490 (one-time); Business CHF 4'990; Complex from CHF 9'900 — verified vs `src/data/pricing.ts`. "Premium, non economico"; no invented discount/scarcity |
| Remaining issue | **Public sharing** — owner must Share→public, then anonymously verify and record the URL here |

> Article-URL note: the production **slug** is `sito-web-economico-svizzera-chf-880` (HTTP 200). The
> id-based path `sito-web-chf-880-svizzera` returns 404 and is not used as a link.

## What is needed to complete the pilots

1. **Owner publishes Pilot 1 publicly**: open the private URL while signed in to claude.ai → **Share** →
   choose the public / "anyone with the link" option → copy the public URL.
2. **Verify anonymously**: open that public URL in a logged-out browser; confirm the calculator loads and
   works. Record the public URL + result in the Pilot 1 row above.
3. **Confirm the automated build/publish path**: decide whether the remaining pilots (and the eventual 60)
   should be published via manual Share each time, or via a session/tooling configuration that permits
   public artifact publication directly. Only then does it make sense to scale to Pilots 2–3 and beyond.
