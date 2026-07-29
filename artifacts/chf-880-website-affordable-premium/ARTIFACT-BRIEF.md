# Artifact Brief — CHF 880 Website Fit Checker and Package Visualiser

**Article:** `chf-880-website-affordable-premium` ("Affordable Premium Web Design in Switzerland: What CHF 880 Can Honestly Buy")
**Language:** English (en) — the article and artifact both exist in English only.
**Artifact type:** Decision-tree fit checker (six inputs → one of three real package recommendations, with an honest match/mismatch explanation) *plus* an always-available side-by-side package visualiser — combining the two mechanics the master prompt names for this article ("CHF 880 Website Fit Checker and package visualiser"). Distinct from the German sibling's single-mode configurator (`artifacts/chf-880-website-schweiz/`) by adding the always-on comparison view described below, and distinct from the calculator mechanics (`ai-phone-assistant-small-business-case`) and weighted comparators (`swiss-ai-phone-assistant-provider-comparison`) used elsewhere in this project.

## User problem

The article's central claim is that CHF 880 buys a specific, bounded scope — not "a website" in the abstract — and that most readers asking "what does CHF 880 actually get me" need to know which of Weissmann's three real packages (Starter CHF 880, Business CHF 4,990, Complex/Custom from CHF 9,900) matches their own project. A reader who has just read the exhaustive inclusion/exclusion lists in the article still has to mentally cross-reference their own requirements (page count, languages, e-commerce, integrations) against three overlapping scopes. The Artifact does that cross-referencing for them, transparently, using the same real package definitions the article describes — and honestly says when CHF 880 is *not* the right answer, without pressure to pick the more expensive option. It also lets a reader who does not want to answer questions at all simply compare all three tiers visually first.

## Audience

An international founder, manager or SME owner in Switzerland (Zürich, Zug, Basel, Geneva and similar business centres) actively comparing website options, who has read or skimmed the article's inclusion/exclusion breakdown and wants a fast, non-manipulative answer to "which package is actually mine" before either buying the CHF 880 Starter directly or booking a consultation for something larger.

## Why an interactive artifact is better than a static PDF

A static PDF could list the three packages side by side, but the reader would still have to manually check six separate conditions (page count, languages, e-commerce, booking/CRM, custom apps, own copy) against three overlapping scope definitions — and a printed table cannot flag the specific boundary case where trimming one page keeps a project inside the cheaper Starter scope. The Artifact evaluates the reader's own answers against the exact deterministic rules in `artifact-data.json` → `decisionLogic`, shows which specific answer triggered the recommendation (not just a final verdict), and surfaces the "you're borderline, here's how to stay in the cheaper tier" guidance from `boundaryGuidance` only when it genuinely applies. The added comparison view (`comparisonView` in the data file) additionally serves readers who prefer to browse all three real tiers before committing to the questionnaire — something a linear PDF forces into a fixed reading order.

## Inputs

1. **Core pages** (required, single-select): "1-5 pages" / "6-20 pages" / "More than 20 pages".
2. **Languages** (required, single-select): "1 language" / "2 or more languages".
3. **Online shop with payment processing needed?** (required, yes/no).
4. **Booking flow or CRM connection needed?** (required, yes/no).
5. **Custom applications, member area, API integrations, or AI workflows needed?** (required, yes/no).
6. **Page copy already ready, or copywriting planned separately?** (optional, yes/no) — does not change the tier recommendation; only adds a reminder note, since copywriting is explicitly excluded from the Starter package per `pricing.ts`.

A persistent toggle labelled "Compare all three packages" is always available above the questionnaire, independent of the six answers — see Outputs.

## Decision logic (see `artifact-data.json` → `decisionLogic` for the exact machine-readable rules)

Evaluate three rules in order, first match wins:

1. **Complex override** — if e-commerce is needed, OR custom apps/API/CRM integrations/member areas/AI workflows are needed, OR page count is "20+" → recommend the **Complex/Custom Website (from CHF 9,900)**.
2. **Business match** — else if page count is "6-20", OR 2+ languages are needed, OR a booking/CRM connection is needed → recommend the **Business Website (CHF 4,990)**.
3. **Starter match** — else (≤5 pages, 1 language, no e-commerce, no booking/CRM, no custom apps) → recommend the **Starter Website (CHF 880, regular CHF 2,490)**.

Do not invent a weighting system, a score, or any additional condition beyond these three real package definitions pulled from `pricing.ts`. Every recommendation must cite which specific answer(s) triggered it (e.g. "Because you need 2 or more languages, the Starter scope isn't enough — that's a Business-tier feature per Weissmann's package definition").

## Outputs

- **Recommended package**: name, price (with the crossed-out regular price shown only for Starter, exactly as `regularPrice`/`price` in the data — never state or imply a percentage discount), and the one-line reason drawn from the specific matched rule.
- **Why this package**: a short list echoing back which of the reader's own answers drove the result (transparency — this is not a black box).
- **What this package does NOT include**: pull the relevant `excluded`/`disclosures` array for the recommended tier so the reader immediately sees the boundaries of what they are about to consider, not just what they get.
- **Borderline note**: shown only when `boundaryGuidance`'s condition applies (page count "6-20" was the *sole* reason for a Business recommendation) — tells the reader honestly that trimming to 5 pages could keep them in the cheaper Starter scope. Must never be hidden to push a more expensive recommendation.
- **Copywriting reminder**: shown whenever `hasOwnCopy` is answered "no" or left unanswered, regardless of tier.
- **Comparison view** (always available, independent of the questionnaire): a plain three-column table from `comparisonView` showing price, page range, languages, revision rounds and the three headline features of each real tier, with equal visual weight for all three columns — never pre-highlighting one as "recommended" before the reader has actually answered the questionnaire.

## Error states

- If any required input (1-5) is unanswered, show a neutral prompt state ("Answer the five questions above to see your recommendation") instead of a partial or default result.
- No input combination should be able to produce "no result" silently — the three ordered rules are exhaustive over the defined input domain; if a future input combination somehow falls through (defensive coding only), show "This combination is unusual — let's clarify it in a free consultation" with the `/en/kontakt/` link, never a fabricated fourth package.
- Toggling any answer after a result is shown must instantly recompute and replace the result, not append a second one.
- Switching to the comparison view never clears or resets the questionnaire's answers underneath it.

## Privacy considerations

All evaluation happens client-side in the browser using only the static data in `artifact-data.json`. No input the reader provides — page count, e-commerce needs, or anything else — is transmitted, stored, or sent to any server or analytics endpoint. State this explicitly in a small, persistent footer note, consistent with the other artifacts in this project.

## Accessibility requirements

All select/radio and yes/no inputs are real `<select>`/`<fieldset><legend>` or radio-group controls with associated `<label>` elements (no placeholder-only labels); the result panel is an `aria-live="polite"` region so screen-reader users hear the updated recommendation immediately after changing an answer; the "Why this package" and "What this package does NOT include" lists use real `<ul>`/`<li>` markup, not styled `<div>`s; the comparison table uses real `<table>` markup with `<th scope="col">` headers, not divs styled to look like a table; all interactive elements are keyboard-operable with visible focus states; colour is never the only signal distinguishing the three possible outcomes (use the package name as text, not a colour chip alone).

## Mobile behaviour

Single-column layout: the six questions stacked at the top (grouped visually into "Scope", "Functionality", "Content"), the result panel directly below with no tab-switching and no horizontal scrolling for the questionnaire itself. The comparison view collapses the three-column table into three stacked cards (Starter, then Business, then Complex) rather than forcing horizontal scrolling. Touch targets for yes/no toggles at least 44×44px.

## CTA

Dynamic by recommended tier, using `artifact-data.json` → `ctaByTier` — never a single generic "buy now" button regardless of outcome:
- **Starter result:** "See current prices and the Starter package" → `/en/preise/` (the real page hosting the current CHF 880 Stripe checkout — no raw Stripe URL is hardcoded here, since `/en/preise/` is the single source of truth for the live price and link).
- **Business or Complex result:** "Free consultation about the Business Website" / "…about the Complex/Custom Website" → `/en/kontakt/`, because neither tier has a direct checkout yet (`ctaType: 'consult'` in `pricing.ts`) — the tool must not imply a checkout that doesn't exist.

No urgency language anywhere in the CTA copy, no "before it's too late," no artificial countdown.

## Disclaimer

"This recommendation is based solely on your own answers and on Weissmann AI's publicly listed package definitions (as of 29 July 2026, see weissmann.ai/en/preise/). It is a non-binding indication, not a quote or a contract. The actual scope and price are only fixed during a consultation or at checkout. All calculations run locally in your browser; no data is transmitted or stored." Shown persistently below the result, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, form-first layout: six grouped questions at the top, one clearly delineated result card below showing the package name and price large, the "why" reasoning list directly underneath, the "not included" list below that at slightly reduced visual weight, the borderline note (when applicable) in a distinctly styled but non-alarming note, and the tier-specific CTA at the bottom. The comparison view sits in a clearly separate panel (toggle or tab, always reachable, never hidden behind the questionnaire) styled as a plain three-column (or, on mobile, stacked) table — no gauge dials, no progress bars implying a "score," no gamified badges. The tool's credibility comes from showing exactly which answer drove the result and letting readers see the real tiers side by side, not from dressing up a verdict.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in English called "Which Website Package Fits You?". At the top, include an always-visible toggle labelled "Compare all three packages" that reveals a plain comparison table (or, on narrow screens, three stacked cards) built from the `tiers` object in the accompanying `artifact-data.json`: for Starter, Business and Complex, show price (Starter shows both `price` CHF 880 and the crossed-out `regularPrice` CHF 2,490 — never compute or display a discount percentage anywhere in the tool), page range, languages, revision rounds, and each tier's first three `features` entries, with equal visual weight for all three columns and no pre-highlighted "recommended" tier. Below that, ask exactly six questions, grouped into three visual sections: "Scope" — (1) "How many core pages does your website need?" as a single-select with options "1-5 pages" / "6-20 pages" / "More than 20 pages"; (2) "How many languages does the website need?" as a single-select with options "1 language" / "2 or more languages". "Functionality" — (3) "Do you need an online shop with payment processing?" yes/no; (4) "Do you need a booking flow or a CRM connection?" yes/no; (5) "Do you need custom applications, a member area, API integrations, or AI workflows?" yes/no. "Content" — (6, optional) "Do you already have your page copy ready, or is copywriting planned separately?" yes/no. Using exactly the three package objects, their `features`/`excluded`/`disclosures` arrays, and the `decisionLogic.rules` array from `artifact-data.json` (do not invent a fourth package, a scoring system, or any condition not listed there), evaluate the rules in order — "complex-override" first, then "business-match", then "starter-match" — and show the first one whose condition is true. Display: the recommended package's name and price; a short "Why this package" list naming which specific answer(s) triggered the match; a "What this package does NOT include" list pulled from that package's `excluded` or `disclosures` array; and, only when the sole reason for a Business recommendation was "6-20 pages" with everything else at Starter level, the `boundaryGuidance.text` note suggesting the reader could trim to 5 pages to stay in the cheaper Starter scope. Whenever the copywriting question is answered "no" or left unanswered, show the `copyReminder` note regardless of which package is recommended. If any of the five required questions is unanswered, show a neutral prompt instead of a partial result, and recompute instantly whenever any answer changes. End with a CTA that depends on the result: for a Starter recommendation, a link labelled "See current prices and the Starter package" pointing to weissmann.ai/en/preise/; for a Business or Complex recommendation, a link labelled "Free consultation about the Business Website" or "…about the Complex/Custom Website" pointing to weissmann.ai/en/kontakt/ — never a generic "buy now" button and never urgency language. Include the persistent disclaimer text from `artifact-data.json` below the result. Everything must run entirely client-side with zero network calls and zero data collection — state this in a small footer note. Make all inputs real `<select>`/`<fieldset>` controls with `<label>`/`<legend>` elements, the comparison table a real `<table>` with `<th scope="col">` headers, an `aria-live="polite"` result region, and full keyboard operability with visible focus states. Use a single-column, touch-friendly mobile layout with touch targets of at least 44×44px, and collapse the comparison table into three stacked cards on narrow screens. Style it cleanly: a plain comparison panel, then a plain grouped form, then one plain result card with the package name and price large, the "why" list beneath it, the "not included" list at reduced visual weight below that, and the borderline hint (when shown) in a calm, non-alarming note — no gauges, no score bars, no decorative dashboard chrome.
