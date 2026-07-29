# Artifact Brief — Analizzatore interattivo di preventivi web (Interactive Website Quote Analyser)

**Article:** `preventivo-sito-web-20-voci` ("Preventivo per un sito web: le 20 voci che devono essere scritte prima di dire sì")
**Language:** Italian (it) — the article and artifact both exist in Italian only.
**Artifact type:** Quote analyser / completeness-gap checklist (not a scored comparison between vendors — a single-quote audit tool).

## User problem

A Ticino or Italian-speaking Swiss business owner has one real website quote in hand (or two, to compare) and no structured way to tell whether it is actually complete before signing. The quote shows a total price and a handful of adjectives ("SEO incluso", "assistenza inclusa"), but the reader cannot tell, from the total alone, which of the 20 concrete line items the article describes are genuinely written down versus silently assumed. The artifact lets the reader tick off, item by item, what their own quote actually states — for any vendor's quote, not only Weissmann's.

## Audience

A Swiss SME owner or manager in Ticino (or elsewhere) who already has a written quote or proposal for a new website or a redesign, most likely non-technical, reading in Italian. Also usable by someone still collecting quotes from two or three vendors who wants a consistent way to check each one before comparing prices.

## Why an interactive artifact is better than a static PDF

A printed checklist can only be filled in once and re-read from scratch each time. An interactive tool lets the reader mark each of the 20 items as written / missing / unclear / not applicable, instantly see a completeness percentage that correctly excludes not-applicable items from the denominator (so a brand-new business with nothing to migrate is not unfairly penalised for leaving that item blank), see which of the four groups (content & scope, technical & SEO foundations, ownership & exit, ongoing support) is weakest, and get a ready-to-copy list of the exact questions to ask the vendor for only the items still missing — rather than re-reading the whole 20-item article to remember what to ask.

## Inputs

- 20 checklist items, grouped into the same 4 logical groups as the article (from `artifact-data.json`): Contenuto e portata (7 items), Fondamenta tecniche e SEO (6 items), Proprietà e uscita (5 items), Supporto continuativo (2 items).
- For each item, a 4-way status selector: **Scritto per iscritto** (written), **Manca / non specificato** (missing), **Vago** (mentioned but without verifiable detail), **Non si applica** (not applicable to this project) — default state on load is "Manca" for every item (never pre-filled as "written", so the tool never flatters any quote by default).
- Each item shows its `whyItMatters` explanation and its `questionToAsk` as always-visible inline text (not hidden behind a hover tooltip), sourced verbatim from `artifact-data.json`.
- Optional: a second, independent set of the same 20 statuses to compare a second quote side by side (useful for a reader actively choosing between two vendors), clearly labelled "Preventivo A" / "Preventivo B" with user-editable labels (no vendor name pre-filled).

## Calculation / decision logic

For each quote entered: `completeness% = (count("written") + 0.5 × count("unclear")) / (20 − count("not applicable")) × 100`, exactly as specified in `artifact-data.json`'s `scoringFormula`. Items marked "not applicable" are removed from both the numerator and the denominator — they are never counted as gaps. Map the resulting percentage to one of the four `completenessBands` in `artifact-data.json` (0–39 "ad alto rischio", 40–69 "parzialmente scritto", 70–89 "solido", 90–100 "quasi completo"). Separately compute a per-group percentage (using the same formula scoped to that group's items only) so the tool can name the weakest group, per `outputGuidance`.

## Outputs

- One overall completeness percentage and its matching band label + description (from `completenessBands`).
- A per-group breakdown (4 bars or rows, one per group) showing each group's own completeness percentage, with the weakest group highlighted in plain text ("il gruppo con più voci mancanti è: Proprietà e uscita").
- A generated, copyable list of `questionToAsk` strings for every item currently marked "Manca" or "Vago" — grouped the same way, ready to paste into an email or read out on a call. This is the single most actionable output and should be visually prominent, with a one-click "copy all" action.
- If two quotes are being compared, a simple side-by-side table (rows = 20 items, columns = the two quotes' statuses) so the reader sees at a glance where the two proposals actually differ, without a fabricated combined "winner" score — the article's thesis is that they should compare item-by-item, not just by total price.

## Error states

- No items touched yet (all still on default "Manca"): this is a valid starting state, not an error — show the resulting (low) completeness score immediately, since "everything defaults to missing" is itself an honest, useful signal that the reader has not yet reviewed their quote against the list.
- All 20 items marked "Non si applica" for one quote: show a message ("Con tutte le voci segnate come non applicabili non resta nulla da valutare — controllate le vostre selezioni") instead of dividing by zero or showing a fake 100%.
- Second-quote comparison started but never filled in: keep it collapsed/optional and never force the reader to enter a second quote to see the first quote's result.

## Privacy considerations

All computation and storage happen entirely client-side (component state or `localStorage` only) — no network calls, no form submission, no data sent anywhere, no analytics event tied to entered content. No real vendor or agency name is pre-populated anywhere in the tool or in `artifact-data.json`; both quote labels are free-text fields the user fills in themselves. State this explicitly in a persistent footer note.

## Accessibility requirements

All status selectors must be real, labelled form controls (radio group or button group per item, not color-only chips) with full keyboard operability and visible focus states; the `whyItMatters` and `questionToAsk` text must be always present in the DOM and readable by screen readers, not hover-only; the per-group breakdown must use real list/table markup with the group name and percentage as text, never conveyed by colour alone; the "copy all questions" action must have an accessible label and a text confirmation (not just a visual toast) when the copy succeeds.

## Mobile behaviour

Single-column accordion layout: one group expanded at a time (Gruppo 1–4), with the overall completeness score pinned near the top so it stays visible while scrolling through items; status selectors sized for touch (44px+ targets, four clearly separated options rather than a cramped dropdown); the generated question list appears as its own expandable section at the end, with the copy button full-width and easy to tap.

## CTA

Contextual only: a single secondary link near the results, "Leggi l'articolo completo con le 20 voci spiegate", pointing back to the article, plus the article's own CTA link to `/it/kontakt/` labelled "Colloquio gratuito: sottoponeteci le stesse 20 voci" — never a forced CTA per item, never phrased with urgency or scarcity, and never presented as if a low score means the reader should contact Weissmann specifically rather than simply go back to their own vendor with better questions.

## Disclaimer

"Questo strumento non sostituisce una verifica contrattuale né emette un giudizio legale: aiuta solo a individuare quali delle 20 voci restano da chiarire per iscritto prima di firmare. Tutti i dati inseriti restano nel vostro browser e non vengono condivisi con nessuno, incluso Weissmann. Lo strumento funziona allo stesso modo per il preventivo di qualsiasi fornitore." Shown persistently in the footer, not buried in a modal.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale) — clean, checklist-forward, no decorative gauges or gamified score wheels. The per-group breakdown should read as a plain, honest bar or row treatment, not a "grade" badge that implies more precision than a self-reported checklist can actually deliver. The generated question list is the visual centrepiece of the results view, not an afterthought below a big score number.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in Italian called "Analizzatore interattivo di preventivi web". Load the 20 checklist items from the accompanying `artifact-data.json`, organised into its 4 groups (Contenuto e portata, Fondamenta tecniche e SEO, Proprietà e uscita, Supporto continuativo). For each item, show its `label`, its `whyItMatters` text and its `questionToAsk` text always visible (not hover-only), plus a 4-way status control defaulting to "Manca / non specificato": Scritto per iscritto, Manca / non specificato, Vago, Non si applica. Compute completeness as `(count(written) + 0.5 × count(unclear)) / (20 − count(not applicable)) × 100`, map it to the `completenessBands` in the data file, and also compute the same formula scoped to each of the 4 groups to show a per-group breakdown and highlight the weakest group in plain text. Generate a copyable, grouped list of the `questionToAsk` strings for every item currently marked "Manca" or "Vago", with a one-click "copia tutte le domande" action and a visible (not just visual-toast) success confirmation. Support an optional second quote ("Preventivo A" / "Preventivo B", user-editable labels, nothing pre-filled) scored independently, shown as a simple side-by-side table without a fabricated combined winner. Handle the edge case where all 20 items are marked "Non si applica" with a message instead of a divide-by-zero or a fake 100%. Make every control a real labelled form element, fully keyboard-operable with visible focus states, never conveying the score or group ranking through colour alone. Use a mobile-first single-column accordion (one group expanded at a time) with the overall score pinned near the top, 44px+ touch targets, and the question list as an expandable section at the end. Do all computation client-side with no network calls and no data leaving the browser; show a persistent footer disclaimer (exact text supplied in this brief) stating the tool does not replace contract or legal review and works identically for any vendor's quote, including Weissmann's own. Add exactly two contextual links (back to the article, and to `/it/kontakt/`), no forced or urgent CTAs. Style it with a clean, neutral, checklist-forward look using CSS custom properties for theming — no gamified dials, no fake precision, no decorative gauges.
