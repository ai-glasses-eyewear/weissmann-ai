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

Per the task's contingency, work **stopped after the first pilot**. Pilots 2 and 3 were **not** built, and
**no unpublished substitute artifacts / spec directories** were created for the remaining 59.

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

**v2 update (same private URL):** added a prominent visible footer link band below the disclaimer — two real anchor links (`target="_blank" rel="noopener noreferrer"`, accessible aria-labels): "Vollständigen Leitfaden lesen →" (DE article) and "Google Ads Growth von Weissmann ansehen →" (weissmann.ai/preise/). Content corrections: removed the fixed Zürich +25 % CPC factor (now prose caveat only); softened the click-count verdicts (no absolute "enough" claim); renamed the customer-value input to **average contribution margin per acquired customer** (correct break-even basis); flagged **CPC** and **conversion rate** as the two main variables (always-visible note + "Hauptvariable" badges). Republished to the same URL `…/artifact/437a7d7b-0e5c-47de-a79e-70543280d1e6`; still private.

## Pilot 2 — how-to-test-ai-receptionist-before-buying (EN)
Not built — blocked by the capability finding above (build stopped after Pilot 1 per task instruction).

## Pilot 3 — sito-web-chf-880-svizzera (IT)
Not built — blocked by the capability finding above (build stopped after Pilot 1 per task instruction).

## What is needed to complete the pilots

1. **Owner publishes Pilot 1 publicly**: open the private URL while signed in to claude.ai → **Share** →
   choose the public / "anyone with the link" option → copy the public URL.
2. **Verify anonymously**: open that public URL in a logged-out browser; confirm the calculator loads and
   works. Record the public URL + result in the Pilot 1 row above.
3. **Confirm the automated build/publish path**: decide whether the remaining pilots (and the eventual 60)
   should be published via manual Share each time, or via a session/tooling configuration that permits
   public artifact publication directly. Only then does it make sense to scale to Pilots 2–3 and beyond.
