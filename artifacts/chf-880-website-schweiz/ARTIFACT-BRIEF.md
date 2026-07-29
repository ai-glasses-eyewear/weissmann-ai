# Artifact Brief — CHF 880 Starter Scope Configurator und Passungs-Check

**Article:** `chf-880-website-schweiz` ("Günstige Website in der Schweiz: Was bekommt man für CHF 880 – und was ausdrücklich nicht?")
**Language:** German (de) — the article and artifact both exist in German only.
**Artifact type:** Decision-tree / scope configurator (six inputs → one of three real package recommendations, with an honest match/mismatch explanation), distinct from the calculator mechanics (`ai-phone-assistant-small-business-case`), weighted comparators (`swiss-ai-phone-assistant-provider-comparison`) and branching wizards (`keep-existing-swiss-number-ai-assistant`) already used elsewhere in this project.

## User problem

The article's central claim is that CHF 880 buys a specific, bounded scope — not "a website" in the abstract — and that most readers who ask "what does CHF 880 get me" actually need to know which of Weissmann's three real packages (Starter CHF 880, Business CHF 4'990, individual/Complex from CHF 9'900) matches their own project. A reader who has just read the exhaustive inclusion/exclusion lists in the article still has to mentally cross-reference their own requirements (page count, languages, e-commerce, integrations) against three different scopes. The Artifact does that cross-referencing for them, transparently, using the same real package definitions the article describes — and tells them honestly when CHF 880 is *not* the right answer, without any pressure to pick the more expensive option.

## Audience

A Swiss SME owner, sole proprietor, tradesperson or small-team manager who is actively comparing website options, has read (or skimmed) the article's inclusion/exclusion breakdown, and wants a fast, non-manipulative answer to "which package is actually mine" before either buying the CHF 880 Starter directly or booking a consultation for something bigger.

## Why an interactive artifact is better than a static PDF

A static PDF could list the three packages side by side, but the reader would still have to manually check six separate conditions (page count, languages, e-commerce, booking/CRM, custom apps, own copy) against three overlapping scope definitions — and a printed comparison table cannot flag the specific boundary case where trimming one page keeps a project inside the cheaper Starter scope. The Artifact evaluates the reader's own answers against the exact same deterministic rules described in `artifact-data.json` → `decisionLogic`, shows which specific answer triggered the recommendation (not just a final verdict), and — uniquely — surfaces the "you're borderline, here's how to stay in the cheaper tier" guidance from `boundaryGuidance` only when it genuinely applies. None of that is reproducible in a static document without either omitting the nuance or forcing the reader to do the cross-referencing by hand.

## Inputs

1. **Kernseiten** (required, single-select): "1–5 Seiten" / "6–20 Seiten" / "Mehr als 20 Seiten".
2. **Sprachen** (required, single-select): "1 Sprache" / "2 oder mehr Sprachen".
3. **Online-Shop mit Zahlungsabwicklung nötig?** (required, yes/no).
4. **Buchungsstrecke oder CRM-Anbindung nötig?** (required, yes/no).
5. **Individuelle Anwendungen, Mitgliederbereich, API-Integrationen oder KI-Workflows nötig?** (required, yes/no).
6. **Texte für die Seiten schon vorhanden oder Copywriting separat eingeplant?** (optional, yes/no) — does not change the tier recommendation; only adds a reminder note, since copywriting is explicitly excluded from the Starter package per `pricing.ts`.

## Decision logic (see `artifact-data.json` → `decisionLogic` for the exact machine-readable rules)

Evaluate three rules in order, first match wins:

1. **Complex override** — if e-commerce is needed, OR custom apps/API/CRM integrations/member areas/AI workflows are needed, OR page count is "20+" → recommend the **individual/Complex website (from CHF 9'900)**.
2. **Business match** — else if page count is "6–20", OR 2+ languages are needed, OR a booking/CRM connection is needed → recommend the **Business Website (CHF 4'990)**.
3. **Starter match** — else (≤5 pages, 1 language, no e-commerce, no booking/CRM, no custom apps) → recommend the **Starter Website (CHF 880, regular CHF 2'490)**.

Do not invent a weighting system, a score, or any additional condition beyond these three real package definitions pulled from `pricing.ts`. Every recommendation must cite which specific answer(s) triggered it (e.g. "Weil Sie 2 oder mehr Sprachen benötigen, reicht der Starter-Umfang nicht — das ist laut Weissmanns Paketdefinition ein Business-Merkmal").

## Outputs

- **Empfohlenes Paket**: name, price (with the crossed-out regular price shown only for Starter, exactly as `regularPrice`/`price` in the data — never state or imply a percentage discount), and the one-line reason drawn from the specific matched rule.
- **Warum genau dieses Paket**: a short list echoing back which of the reader's own answers drove the result (transparency — this is not a black box).
- **Was in diesem Paket NICHT enthalten ist**: pull the relevant `excluded`/`disclosures` array for the recommended tier so the reader immediately sees the boundaries of what they're about to consider, not just what they get.
- **Grenzfall-Hinweis**: shown only when `boundaryGuidance`'s condition applies (page count "6–20" was the *sole* reason for a Business recommendation) — tells the reader honestly that trimming to 5 pages could keep them in the cheaper Starter scope. This must never be hidden to push a more expensive recommendation.
- **Copywriting-Hinweis**: shown whenever `hasOwnCopy` is answered "no" or left unanswered, regardless of tier.

## Error states

- If any required input (1–5) is unanswered, show a neutral prompt state ("Beantworten Sie die fünf Fragen oben, um Ihre Empfehlung zu sehen") instead of a partial or default result.
- No input combination should be able to produce "no result" silently — the three ordered rules are exhaustive over the defined input domain; if a future input combination somehow falls through (defensive coding only), show "Diese Kombination ist ungewöhnlich — bitte im kostenlosen Erstgespräch klären" with the `/kontakt/` link, never a fabricated fourth package.
- Toggling any answer after a result is shown must instantly recompute and replace the result, not append a second one.

## Privacy considerations

All evaluation happens client-side in the browser using only the static data in `artifact-data.json`. No input the reader provides — page count, e-commerce needs, or anything else — is transmitted, stored, or sent to any server or analytics endpoint. State this explicitly in a small, persistent footer note, consistent with the other artifacts in this project.

## Accessibility requirements

All select/radio and yes/no inputs are real `<select>`/`<fieldset><legend>` or radio-group controls with associated `<label>` elements (no placeholder-only labels); the result panel is an `aria-live="polite"` region so screen-reader users hear the updated recommendation immediately after changing an answer; the "Warum genau dieses Paket" and "Was NICHT enthalten ist" lists use real `<ul>`/`<li>` markup, not styled `<div>`s; all interactive elements are keyboard-operable with visible focus states; color is never the only signal distinguishing the three possible outcomes (use the package name as text, not a color chip alone).

## Mobile behaviour

Single-column layout: the six questions stacked at the top (grouped visually into "Umfang", "Funktionen", "Inhalt"), the result panel directly below with no tab-switching and no horizontal scrolling, so a phone user sees the recommendation immediately below the question they just answered. Touch targets for yes/no toggles at least 44×44px.

## CTA

Dynamic by recommended tier, using `artifact-data.json` → `ctaByTier` — never a single generic "buy now" button regardless of outcome:
- **Starter result:** "Zu den aktuellen Preisen und zum Starter-Paket" → `/preise/` (the real page hosting the current CHF 880 Stripe checkout — no raw Stripe URL is hardcoded here, since `/preise/` is the single source of truth for the live price and link).
- **Business or Complex result:** "Kostenloses Erstgespräch zur Business Website" / "…zur individuellen Website" → `/kontakt/`, because neither tier has a direct checkout yet (`ctaType: 'consult'` in `pricing.ts`) — the tool must not imply a checkout that doesn't exist.

No urgency language anywhere in the CTA copy, no "before it's too late," no artificial countdown.

## Disclaimer

"Diese Empfehlung basiert ausschliesslich auf Ihren eigenen Angaben und den öffentlich einsehbaren Paketdefinitionen von Weissmann AI (Stand 29. Juli 2026, siehe weissmann.ai/preise/). Sie ist eine unverbindliche Einordnung, kein Angebot und kein Vertrag. Der tatsächliche Umfang und Preis werden erst im Erstgespräch beziehungsweise beim Checkout verbindlich festgelegt. Alle Berechnungen erfolgen lokal in Ihrem Browser; es werden keine Daten übermittelt oder gespeichert." Shown persistently below the result, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, form-first layout: six grouped questions at the top, one clearly delineated result card below showing the package name and price large, the "warum" reasoning list directly underneath, the "nicht enthalten" list below that at slightly reduced visual weight, the boundary-case hint (when applicable) in a distinctly styled but non-alarming note, and the tier-specific CTA at the bottom. No gauge dials, no progress bars implying a "score," no gamified badges — the tool's credibility comes from showing exactly which answer drove the result, not from dressing up a verdict.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in German called "Welches Website-Paket passt zu Ihnen?". Ask exactly six questions, grouped into three visual sections: "Umfang" — (1) "Wie viele Kernseiten braucht Ihre Website?" as a single-select with options "1–5 Seiten" / "6–20 Seiten" / "Mehr als 20 Seiten"; (2) "Wie viele Sprachen braucht die Website?" as a single-select with options "1 Sprache" / "2 oder mehr Sprachen". "Funktionen" — (3) "Brauchen Sie einen Online-Shop mit Zahlungsabwicklung?" yes/no; (4) "Brauchen Sie eine Buchungsstrecke oder CRM-Anbindung?" yes/no; (5) "Brauchen Sie individuelle Anwendungen, einen Mitgliederbereich, API-Integrationen oder KI-Workflows?" yes/no. "Inhalt" — (6, optional) "Haben Sie die Texte für Ihre Seiten schon, oder planen Sie Copywriting separat ein?" yes/no. Using exactly the three package objects, their `features`/`excluded`/`disclosures` arrays, and the `decisionLogic.rules` array from the accompanying `artifact-data.json` (do not invent a fourth package, a scoring system, or any condition not listed there), evaluate the rules in order — "complex-override" first, then "business-match", then "starter-match" — and show the first one whose condition is true. Display: the recommended package's name and price (for Starter, show both `price` CHF 880 and the crossed-out `regularPrice` CHF 2'490 — never compute or display a discount percentage anywhere in the tool); a short "Warum genau dieses Paket" list that names which specific answer(s) triggered the match; a "Was in diesem Paket NICHT enthalten ist" list pulled from that package's `excluded` or `disclosures` array; and, only when the sole reason for a Business recommendation was "6–20 Seiten" with everything else at Starter-level, the `boundaryGuidance.text` note suggesting the reader could trim to 5 pages to stay in the cheaper Starter scope. Whenever the copywriting question is answered "no" or left unanswered, show the `copyReminder` note regardless of which package is recommended. If any of the five required questions is unanswered, show a neutral prompt instead of a partial result, and recompute instantly whenever any answer changes. End with a CTA that depends on the result: for a Starter recommendation, a link labelled "Zu den aktuellen Preisen und zum Starter-Paket" pointing to weissmann.ai/preise/; for a Business or Complex recommendation, a link labelled "Kostenloses Erstgespräch zur Business Website" or "…zur individuellen Website" pointing to weissmann.ai/kontakt/ — never a generic "buy now" button and never urgency language. Include the persistent disclaimer text from `artifact-data.json` below the result. Everything must run entirely client-side with zero network calls and zero data collection — state this in a small footer note. Make all inputs real `<select>`/`<fieldset>` controls with `<label>`/`<legend>` elements, an `aria-live="polite"` result region, and full keyboard operability with visible focus states. Use a single-column, touch-friendly mobile layout with touch targets of at least 44×44px. Style it cleanly: a plain grouped form, then one plain result card with the package name and price large, the "warum" list beneath it, the "nicht enthalten" list at reduced visual weight below that, and the boundary hint (when shown) in a calm, non-alarming note — no gauges, no score bars, no decorative dashboard chrome.
