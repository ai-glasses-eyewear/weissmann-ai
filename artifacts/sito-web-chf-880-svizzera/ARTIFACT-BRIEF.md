# Artifact Brief — Configuratore della promozione CHF 880 (Sito web Starter)

**Article:** `sito-web-chf-880-svizzera` ("Sito web economico in Svizzera: cosa include davvero la promozione Weissmann da CHF 880")
**Language:** Italian (it) — the article and artifact both exist in Italian only (IT-WEB-02, the Italian central-promotion article, parallel to the German `chf-880-website-schweiz` and English `chf-880-website-affordable-premium` versions — a fresh Italian build, not a translation of either).
**Artifact type:** Decision-tree / scope configurator (six inputs → one of three real package recommendations, with an honest match/mismatch explanation), the same mechanic family as the DE and EN siblings' configurators (deliberately kept consistent across the three parallel promotion articles, since all three describe the identical real commercial offer) but re-implemented from scratch in Italian with its own copy, own reasoning strings and no re-use of German/English text.

## User problem

The article's central claim is that CHF 880 buys a specific, bounded scope — not "un sito web" in the abstract — and most readers asking "cosa ottengo davvero per CHF 880" actually need to know which of Weissmann's three real packages (Starter CHF 880, Business CHF 4,990, Complex from CHF 9,900) matches their own project. A reader who has just read the article's exhaustive inclusion/exclusion lists still has to mentally cross-reference their own requirements (page count, languages, e-commerce, integrations) against three different scopes. The Artifact does that cross-referencing for them, transparently, using the same real package definitions the article describes — and tells them honestly when CHF 880 is *not* the right answer, without any pressure to pick the more expensive option.

## Audience

A Ticino or Italian-speaking-Switzerland SME owner, sole proprietor, tradesperson (artigiano) or small-team manager who is actively comparing website options, has read (or skimmed) the article's inclusion/exclusion breakdown, and wants a fast, non-manipulative answer to "quale pacchetto è davvero il mio" before either buying the CHF 880 Starter directly or booking a free consultation for something bigger.

## Why an interactive artifact is better than a static PDF

A static PDF could list the three packages side by side, but the reader would still have to manually check six separate conditions (page count, languages, e-commerce, booking/CRM, custom apps, own copy) against three overlapping scope definitions — and a printed comparison table cannot flag the specific boundary case where trimming one page keeps a project inside the cheaper Starter scope. The Artifact evaluates the reader's own answers against the exact same deterministic rules described in `artifact-data.json` → `decisionLogic`, shows which specific answer triggered the recommendation (not just a final verdict), and — uniquely — surfaces the "siete al limite, ecco come restare nella fascia più economica" guidance from `boundaryGuidance` only when it genuinely applies. None of that is reproducible in a static document without either omitting the nuance or forcing the reader to do the cross-referencing by hand.

## Inputs

1. **Pagine principali** (required, single-select): "1–5 pagine" / "6–20 pagine" / "Più di 20 pagine".
2. **Lingue** (required, single-select): "1 lingua" / "2 o più lingue".
3. **Negozio online con pagamenti necessario?** (required, yes/no).
4. **Percorso di prenotazione o integrazione CRM necessario?** (required, yes/no).
5. **Applicazioni personalizzate, area riservata, integrazioni API o workflow AI necessari?** (required, yes/no).
6. **Testi per le pagine già pronti, o copywriting pianificato separatamente?** (optional, yes/no) — does not change the tier recommendation; only adds a reminder note, since copywriting is explicitly excluded from the Starter package per `pricing.ts`.

## Decision logic (see `artifact-data.json` → `decisionLogic` for the exact machine-readable rules)

Evaluate three rules in order, first match wins:

1. **Complex override** — if e-commerce is needed, OR custom apps/API/CRM integrations/member areas/AI workflows are needed, OR page count is "20+" → recommend the **Sito web complesso / su misura (from CHF 9,900)**.
2. **Business match** — else if page count is "6–20", OR 2+ languages are needed, OR a booking/CRM connection is needed → recommend the **Sito web Business (CHF 4,990)**.
3. **Starter match** — else (≤5 pages, 1 language, no e-commerce, no booking/CRM, no custom apps) → recommend the **Sito web Starter (CHF 880, regular CHF 2,490)**.

Do not invent a weighting system, a score, or any additional condition beyond these three real package definitions pulled from `pricing.ts`. Every recommendation must cite which specific answer(s) triggered it (e.g. "Poiché avete bisogno di 2 o più lingue, il perimetro Starter non basta — secondo la definizione dei pacchetti Weissmann questa è una caratteristica Business").

## Outputs

- **Pacchetto consigliato**: name, price (with the crossed-out regular price shown only for Starter, exactly as `regularPrice`/`price` in the data — never state or imply a discount percentage), and the one-line reason drawn from the specific matched rule.
- **Perché proprio questo pacchetto**: a short list echoing back which of the reader's own answers drove the result (transparency — this is not a black box).
- **Cosa NON è incluso in questo pacchetto**: pull the relevant `excluded`/`disclosures` array for the recommended tier so the reader immediately sees the boundaries of what they are about to consider, not just what they get.
- **Avviso caso limite**: shown only when `boundaryGuidance`'s condition applies (page count "6–20" was the *sole* reason for a Business recommendation) — tells the reader honestly that trimming to 5 pages could keep them in the cheaper Starter scope. This must never be hidden to push a more expensive recommendation.
- **Promemoria testi**: shown whenever `hasOwnCopy` is answered "no" or left unanswered, regardless of tier.

## Error states

- If any required input (1–5) is unanswered, show a neutral prompt state ("Rispondete alle cinque domande sopra per vedere la vostra raccomandazione") instead of a partial or default result.
- No input combination should be able to produce "no result" silently — the three ordered rules are exhaustive over the defined input domain; if a future input combination somehow falls through (defensive coding only), show "Questa combinazione è insolita — chiaritela nel colloquio conoscitivo gratuito" with the `/it/kontakt/` link, never a fabricated fourth package.
- Toggling any answer after a result is shown must instantly recompute and replace the result, not append a second one.

## Privacy considerations

All evaluation happens client-side in the browser using only the static data in `artifact-data.json`. No input the reader provides — page count, e-commerce needs, or anything else — is transmitted, stored, or sent to any server or analytics endpoint. State this explicitly in a small, persistent footer note, consistent with the other artifacts in this project.

## Accessibility requirements

All select/radio and yes/no inputs are real `<select>`/`<fieldset><legend>` or radio-group controls with associated `<label>` elements (no placeholder-only labels); the result panel is an `aria-live="polite"` region so screen-reader users hear the updated recommendation immediately after changing an answer; the "Perché proprio questo pacchetto" and "Cosa NON è incluso" lists use real `<ul>`/`<li>` markup, not styled `<div>`s; all interactive elements are keyboard-operable with visible focus states; colour is never the only signal distinguishing the three possible outcomes (use the package name as text, not a colour chip alone).

## Mobile behaviour

Single-column layout: the six questions stacked at the top (grouped visually into "Perimetro", "Funzioni", "Contenuto"), the result panel directly below with no tab-switching and no horizontal scrolling, so a phone user sees the recommendation immediately below the question they just answered. Touch targets for yes/no toggles at least 44×44px.

## CTA

Dynamic by recommended tier, using `artifact-data.json` → `ctaByTier` — never a single generic "compra ora" button regardless of outcome:
- **Starter result:** "Vai ai prezzi attuali e al pacchetto Starter" → `/it/preise/` (the real page hosting the current CHF 880 Stripe checkout — no raw Stripe URL is hardcoded here, since `/it/preise/` is the single source of truth for the live price and link).
- **Business or Complex result:** "Colloquio conoscitivo gratuito per il Sito web Business" / "…per il sito su misura" → `/it/kontakt/`, because neither tier has a direct checkout yet (`ctaType: 'consult'` in `pricing.ts`) — the tool must not imply a checkout that does not exist.

No urgency language anywhere in the CTA copy, no "prima che sia troppo tardi", no artificial countdown.

## Disclaimer

"Questa raccomandazione si basa esclusivamente sulle vostre risposte e sulle definizioni dei pacchetti pubblicamente consultabili di Weissmann AI (dato al 29 luglio 2026, vedi weissmann.ai/it/preise/). È un orientamento non vincolante, non un'offerta né un contratto. Il perimetro e il prezzo effettivi vengono stabiliti in modo vincolante solo nel colloquio conoscitivo o al checkout. Tutti i calcoli avvengono localmente nel vostro browser; nessun dato viene trasmesso o memorizzato." Shown persistently below the result, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, form-first layout: six grouped questions at the top, one clearly delineated result card below showing the package name and price large, the "perché" reasoning list directly underneath, the "non incluso" list below that at slightly reduced visual weight, the boundary-case hint (when applicable) in a distinctly styled but non-alarming note, and the tier-specific CTA at the bottom. No gauge dials, no progress bars implying a "score", no gamified badges — the tool's credibility comes from showing exactly which answer drove the result, not from dressing up a verdict.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in Italian called "Quale pacchetto sito web fa per voi?". Ask exactly six questions, grouped into three visual sections: "Perimetro" — (1) "Quante pagine principali serve al vostro sito?" as a single-select with options "1–5 pagine" / "6–20 pagine" / "Più di 20 pagine"; (2) "Quante lingue serve al sito?" as a single-select with options "1 lingua" / "2 o più lingue". "Funzioni" — (3) "Vi serve un negozio online con pagamenti?" yes/no; (4) "Vi serve un percorso di prenotazione o un'integrazione CRM?" yes/no; (5) "Vi servono applicazioni personalizzate, un'area riservata, integrazioni API o workflow AI?" yes/no. "Contenuto" — (6, optional) "Avete già i testi per le vostre pagine, o pianificate il copywriting separatamente?" yes/no. Using exactly the three package objects, their `features`/`excluded`/`disclosures` arrays, and the `decisionLogic.rules` array from the accompanying `artifact-data.json` (do not invent a fourth package, a scoring system, or any condition not listed there), evaluate the rules in order — "complex-override" first, then "business-match", then "starter-match" — and show the first one whose condition is true. Display: the recommended package's name and price (for Starter, show both `price` CHF 880 and the crossed-out `regularPrice` CHF 2,490 — never compute or display a discount percentage anywhere in the tool); a short "Perché proprio questo pacchetto" list that names which specific answer(s) triggered the match; a "Cosa NON è incluso in questo pacchetto" list pulled from that package's `excluded` or `disclosures` array; and, only when the sole reason for a Business recommendation was "6–20 pagine" with everything else at Starter-level, the `boundaryGuidance.text` note suggesting the reader could trim to 5 pages to stay in the cheaper Starter scope. Whenever the copywriting question is answered "no" or left unanswered, show the `copyReminder` note regardless of which package is recommended. If any of the five required questions is unanswered, show a neutral prompt instead of a partial result, and recompute instantly whenever any answer changes. End with a CTA that depends on the result: for a Starter recommendation, a link labelled "Vai ai prezzi attuali e al pacchetto Starter" pointing to weissmann.ai/it/preise/; for a Business or Complex recommendation, a link labelled "Colloquio conoscitivo gratuito per il Sito web Business" or "…per il sito su misura" pointing to weissmann.ai/it/kontakt/ — never a generic "compra ora" button and never urgency language. Include the persistent disclaimer text from `artifact-data.json` below the result. Everything must run entirely client-side with zero network calls and zero data collection — state this in a small footer note. Make all inputs real `<select>`/`<fieldset>` controls with `<label>`/`<legend>` elements, an `aria-live="polite"` result region, and full keyboard operability with visible focus states. Use a single-column, touch-friendly mobile layout with touch targets of at least 44×44px. Style it cleanly: a plain grouped form, then one plain result card with the package name and price large, the "perché" list beneath it, the "non incluso" list at reduced visual weight below that, and the boundary hint (when shown) in a calm, non-alarming note — no gauges, no score bars, no decorative dashboard chrome.
