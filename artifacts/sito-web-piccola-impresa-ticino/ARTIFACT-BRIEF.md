# Artifact Brief — Generatore del brief per PMI ticinesi

**Article:** `sito-web-piccola-impresa-ticino` ("Sito web per una piccola impresa ticinese: cosa serve davvero e cosa può aspettare")
**Language:** Italian (it) — the article and artifact both exist in Italian only.
**Artifact type:** Configuration / brief generator (business-type selector → a genuinely different, copiable minimum-site brief per type), distinct from the tiered decision-tree mechanics already used for website scope (`chf-880-website-schweiz`, `chf-880-website-affordable-premium`) and from the weighted provider comparators used across the phone-assistant articles. This tool does not recommend a price tier by default; it produces a content-and-priority brief for one of five business types, with a single honest scope check appended.

## User problem

The article's thesis is that a "minimum serious website" is not one universal list of pages with the business name swapped — a restaurant, a beauty salon, an artisan, a consultant and a medical practice each need a genuinely different set of priorities, because the one action that must happen right after the click is different for each. A reader who agrees with that thesis still has to translate it into an actual brief they can hand to Weissmann, another agency, or a freelancer. The Artifact does that translation: pick your business type, get the specific pages, above-the-fold requirements, proof elements, deferred features and single biggest failure risk for that type — not a generic checklist with your business name pasted in.

## Audience

A Ticino SME owner or manager — running a restaurant, a beauty/wellness studio, a trade/artisan business, a consulting or professional-services practice, or a small medical practice/clinic — who has read the article, recognises their own business type among the five, and wants a concrete, ready-to-use brief before requesting a quote or briefing whoever will build the site.

## Why an interactive artifact is better than a static PDF

A static PDF listing all five profiles side by side would force the reader to find their own row among four others and mentally filter out the noise. The Artifact instead asks one question — which of the five business types are you — and returns only that profile's content, assembled into a single copiable brief text in a fixed, useful order (core pages, above-the-fold musts, proof elements, what can wait, the single failure point, the recommended call to action). It also runs one additional honest check (the `scopeCheck` in `artifact-data.json`) that a static document cannot adapt to the reader's answer: if the reader's needs clearly exceed the Starter perimeter (e-commerce, many distinct services, structured multilingual service), the tool says so and redirects to a consultation instead of silently handing over an undersized brief.

## Inputs

1. **Business type** (required, single-select, exactly five options): Ristorante / Centro estetico o parrucchiere / Artigiano / Consulente o libero professionista / Studio medico o clinica. Maps directly to the five keys in `artifact-data.json` → `businessTypes` (`restaurant`, `beauty`, `artisan`, `consultant`, `medical`).
2. **Scope check** (optional, single yes/no question, shown after the business type is picked): "La vostra attività vende anche prodotti fisici con pagamento online, ha più di sei o sette servizi molto diversi da spiegare a fondo, o serve stabilmente una clientela in più lingue oltre l'italiano?" — from `artifact-data.json` → `scopeCheck.question`.

## Logic (see `artifact-data.json` for the exact machine-readable content)

1. On selecting a business type, look up the matching object in `businessTypes` and assemble the brief using the exact order in `briefOutputTemplate.description`: label + one-line description → primary conversion action → pages to include → above-the-fold musts → proof elements → what can wait → single failure point → suggested CTA. Do not invent a sixth field, a score, or content not present in the matching object — the five profiles are deliberately different in substance (different page lists, different proof mechanisms, different failure points), not just different labels on the same list.
2. If the scope-check question is answered "yes", append the `scopeCheck.onYes.note` above the brief and swap the default CTA for `scopeCheck.onYes.cta` (a consultation link) instead of the Starter pricing link — this must never be hidden or softened, since the honest answer here may be "the Starter scope is not for you."
3. If answered "no" or left unanswered, show `scopeCheck.onNo.note` and use `scopeCheck.onNo.cta` (or `defaultCta`, identical content) as the CTA.

## Outputs

- A single assembled, copiable brief text for the selected business type (see the exact field order in `briefOutputTemplate`), rendered as clearly labelled sections, not a wall of text.
- A "Copia il brief" button that copies the plain-text version to the clipboard, so the reader can paste it directly into an email or a document.
- The scope-check note and matching CTA, shown only after the business type is selected (the scope question is meaningless in isolation).
- The persistent disclaimer text from `artifact-data.json` → `disclaimer`.

## Error states

- If no business type is selected, show a neutral prompt ("Scegliete il tipo di attività per generare il brief") instead of a default profile — never default silently to one of the five types.
- Changing the business type after a brief is shown must immediately replace the entire brief (all fields), not merge old and new content.
- The scope-check question and its note/CTA only appear once a business type is chosen; answering it does not change which business-type profile is shown, only the closing note and CTA.
- If the copy-to-clipboard action fails (browser permission denied), show the full brief text pre-selected in a text area as a fallback so the reader can copy it manually — never a silent failure.

## Privacy considerations

Everything runs client-side using only the static data in `artifact-data.json`. The business-type selection and the scope-check answer are never transmitted, stored, or sent to any server or analytics endpoint. State this explicitly in a small, persistent footer note, consistent with the other artifacts in this project.

## Accessibility requirements

The business-type selector is a real `<fieldset>`/`<legend>` radio group (not styled `<div>`s) with associated `<label>` elements; the scope-check question is a real yes/no radio group or toggle with a `<label>`; the generated brief renders in an `aria-live="polite"` region so screen-reader users hear it update immediately after a selection; all lists (pages to include, above-the-fold musts, proof elements, what can wait) use real `<ul>`/`<li>` markup; the "Copia il brief" button has a clear accessible name and announces success ("Brief copiato") via an `aria-live` region; all interactive elements are keyboard-operable with visible focus states.

## Mobile behaviour

Single-column layout: the five business-type options as a vertical radio list (not a horizontal scroller) at the top, the assembled brief directly below with no tab-switching, the scope-check question and CTA at the bottom of the brief. No horizontal scrolling at any width. Touch targets for the radio options and the copy button at least 44×44px.

## CTA

Dynamic by scope-check answer, using `artifact-data.json` → `scopeCheck.onYes.cta` / `scopeCheck.onNo.cta` (identical in substance to `defaultCta`):
- **Default / scope fits Starter:** "Guarda cosa include il sito Starter di Weissmann" → `/it/preise/`.
- **Scope exceeds Starter:** "Prenota una consulenza gratuita" → `/it/kontakt/`.

No urgency language anywhere in the CTA copy, no artificial countdown, no claim that every project fits the Starter price.

## Disclaimer

"Questo generatore crea un brief indicativo, basato sulle priorità tipiche del vostro tipo di attività in Ticino secondo l'articolo collegato e sull'ambito pubblico del pacchetto Starter di Weissmann AI (stato 29.07.2026, vedi weissmann.ai/it/preise/). Non sostituisce un'analisi personalizzata della vostra attività specifica, non è un'offerta né un contratto. Tutti i calcoli avvengono nel vostro browser: nessun dato viene inviato o memorizzato." Shown persistently below the generated brief, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, form-first layout: five radio options at the top styled as simple cards (icon-free, label-only — no stock icons standing in for photos of the reader's actual business), the assembled brief below in a clearly sectioned card (heading + list per field, matching the order in `briefOutputTemplate`), the "Copia il brief" button directly under the brief, and the scope-check question plus its note/CTA in a visually distinct but calm block at the very bottom. No gauges, no progress bars, no gamified scoring — the tool's value is the specificity of the five profiles, not decoration.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in Italian called "Generatore del brief per PMI ticinesi". Show five radio options for "Che tipo di attività avete?": Ristorante, Centro estetico o parrucchiere, Artigiano, Consulente o libero professionista, Studio medico o clinica — mapped to the five keys `restaurant`, `beauty`, `artisan`, `consultant`, `medical` in the accompanying `artifact-data.json` → `businessTypes`. When one is selected, assemble and display a brief using exactly that business type's data, in this fixed order: (1) the type's `label` and `oneLineDescription`; (2) "Azione principale del sito:" followed by `primaryConversionAction`; (3) "Pagine da includere" as a bulleted list from `pagesToInclude`; (4) "Nella prima schermata deve comparire" as a bulleted list from `aboveTheFoldMustHave`; (5) "Elementi di prova" as a bulleted list from `proofElements`; (6) "Può aspettare" as a bulleted list from `canWait`; (7) "Errore numero uno da evitare:" followed by `singleFailurePoint`; (8) a suggested call-to-action line using `ctaSuggestion.label`. Do not invent a sixth business type, a scoring system, or any field not present in the JSON — the five profiles must read as genuinely different content, not the same list with the business name swapped. Add a "Copia il brief" button that copies the assembled brief as plain text to the clipboard, with a text-area fallback and an `aria-live` success message if the clipboard API is unavailable or denied. Below the brief, show one more question from `artifact-data.json` → `scopeCheck.question` (yes/no). If answered "yes", show `scopeCheck.onYes.note` and a CTA button using `scopeCheck.onYes.cta` (label + href); otherwise show `scopeCheck.onNo.note` and `scopeCheck.onNo.cta`. Always show the persistent disclaimer text from `artifact-data.json` → `disclaimer` below the brief. Everything must run entirely client-side with zero network calls and zero data collection — state this in a small footer note. Use a real `<fieldset>/<legend>` radio group with `<label>` elements for the business-type choice and for the yes/no question, an `aria-live="polite"` region for the generated brief so it is announced on change, real `<ul>/<li>` markup for every list, and full keyboard operability with visible focus states. Use a single-column, touch-friendly mobile layout with touch targets of at least 44×44px and no horizontal scrolling. Style it cleanly: five simple label-only radio cards at the top, one clearly sectioned result card below matching the eight-part order above, the copy button directly beneath it, and the scope-check question with its note and CTA in a calm, visually distinct block at the very bottom — no gauges, no score bars, no decorative dashboard chrome.
