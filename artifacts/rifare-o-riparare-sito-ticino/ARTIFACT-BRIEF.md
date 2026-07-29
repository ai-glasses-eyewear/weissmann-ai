# Artifact Brief — Mappa decisionale riparazione vs redesign

**Article:** `rifare-o-riparare-sito-ticino` ("Rifare il sito o ripararlo? La decisione che evita di pagare due volte")
**Language:** Italian (it) — the article and artifact both exist in Italian only.
**Artifact type:** Priority-ordered decision map (six qualitative factors + a four-question search-equity sub-check → one of three conditional recommendations, with the safe migration checklist unlocked as an output when the recommendation involves any migration). This is a distinct mechanic from every other artifact in the project: unlike `website-redesign-signs-switzerland`'s tiered diagnostic triage (which sorts twelve *symptoms* into urgency tiers to answer "is something wrong"), this tool takes six *known-context* factors about a site whose owner has already decided something needs fixing, and answers a different, later-stage question — repair, partial migration, or full redesign — then hands over a concrete migration checklist only when the verdict actually requires one.

## User problem

The article's thesis is that "rifare o riparare" is not a binary choice and is rarely asked honestly, because the party usually answering it (a web agency) profits from one answer. A reader who accepts the article's six-factor framework (technical debt, content quality, CMS/platform state, analytics continuity, search equity, migration risk) still needs to apply it to their own actual site and get back a specific, reasoned verdict — not a generic "it depends" — and, if the verdict involves migration, the actual safe-migration steps to hand to whoever builds the new site.

## Audience

A Ticino SME owner or manager whose website is old enough to be questioned by an agency's quote, but who suspects (rightly, per the article) that the site's existing Google visibility is worth real money and should not be sacrificed casually to a redesign that "looks nicer."

## Why an interactive artifact beats a static PDF

The decision logic is not additive — it is priority-ordered. A single severe factor (an abandoned, insecure CMS) must override an otherwise strong case for repair, while a high search-equity score must resist a redesign recommendation even when content looks dated. A static checklist cannot enforce this priority order or react differently depending on which combination of six qualitative answers plus a four-question sub-score the reader gives. The tool must also conditionally reveal an entire second artifact — the eight-item migration checklist — only for the two of three outcomes that actually need it, which a printed page cannot do interactively.

## Inputs

**Six factors**, each a three-way qualitative choice (`artifact-data.json` → `factors[]`, ids: `debito-tecnico`, `qualita-contenuti`, `stato-cms`, `continuita-analytics`, `rischio-migrazione`, each with its own `question` and three `options`). **Plus one four-question yes/no sub-check** (`artifact-data.json` → `searchEquityCheck.questions`, ids `anni-online`, `richieste-organiche`, `top3`, `link-esterni`) that resolves to a `bassa`/`media`/`alta` search-equity level via `searchEquityCheck.tiering`. No input defaults to a pre-selected option — every factor starts unanswered.

## Calculation / decision logic

See `artifact-data.json` → `decisionLogic` for the exact rule text. In order:

1. **Platform veto**: if `stato-cms` is `abbandonato` OR `debito-tecnico` is `alto`, the outcome is never `riparazione-mirata` — it is at least `migrazione-parziale`, escalating to `redesign-completo` if `rischio-migrazione` is `basso`/`medio` or `qualita-contenuti` is also `deboli`. This rule has priority over every other factor: an insecure or unmaintainable platform is never "repaired," regardless of how valuable the site's current rankings are.
2. If rule 1 does not apply, and search-equity is `alta` and `rischio-migrazione` is `alto`: outcome is `riparazione-mirata`, even if content is weak — rewrite content on the existing technical base rather than risk the accumulated rankings.
3. If rule 1 does not apply, search-equity is `media` or `alta`, and only specific pages carry most of the organic traffic: outcome is `migrazione-parziale`.
4. Otherwise: `riparazione-mirata` if both `debito-tecnico` and `stato-cms` are healthy, otherwise `redesign-completo`.
5. **Always show which specific factors produced the verdict**, not just the verdict's name — the reader must be able to verify the reasoning, not just read a conclusion. Never reduce the six inputs and the sub-check to a single numeric score.

## Outputs

- The matched outcome (`artifact-data.json` → `outcomes[]`: `riparazione-mirata`, `migrazione-parziale`, or `redesign-completo`), shown with its `description` and the specific factor values that triggered it.
- **If `showsMigrationChecklist` is true** for the matched outcome: display the full eight-item **safe migration checklist** (`artifact-data.json` → `migrationChecklist[]`) as a checkable list, labelled with the outcome's own `checklistScope` (only the migrating pages, or the entire site).
- If `showsMigrationChecklist` is false (`riparazione-mirata`): explicitly state that no migration is needed and the checklist does not apply — do not show it "just in case."

## Error states

- All inputs are three-way or yes/no choices — no numeric input, so no division-by-zero or negative-number states apply.
- If fewer than all six factors and all four sub-check questions are answered, show a neutral prompt ("Rispondete a tutti i sei fattori e alle quattro domande per vedere un esito") instead of guessing a verdict from partial data — never default an unanswered factor to its most favorable or most alarming option.
- If a reader changes an answer after seeing a result, recompute the full verdict immediately rather than leaving a stale recommendation on screen.

## Privacy considerations

All logic runs client-side. No website is scanned, fetched, or crawled automatically — every input is the reader's own self-assessment. Nothing entered is transmitted to any server or analytics endpoint. State this explicitly in a persistent note near the results, consistent with other artifacts in this project. If the tool offers to remember answers between visits, `localStorage` only, clearly labelled as on-device, with a visible "cancella risposte salvate" control.

## Accessibility requirements

Each of the six factors and four sub-check questions uses a real radio-group control with an associated `<label>` — never colour-only or icon-only selection. The results region uses `aria-live="polite"` so a screen-reader user hears the updated verdict and (when shown) the migration checklist as answers change. The priority-order reasoning ("questo fattore ha determinato l'esito perché…") is rendered as real text, not conveyed by colour or icon alone. All controls are keyboard-operable with visible focus states.

## Mobile behaviour

Single-column layout: the six factors first, grouped visually as one step, followed by the four-question search-equity sub-check as a clearly separated second step, then the results panel. No horizontal scrolling, no tab-switching between steps — a phone user scrolls down through each part in sequence. The migration checklist, when shown, renders as a single-column checkable list directly below the verdict, not in a separate view.

## CTA

One contextual, secondary link at the bottom of the results panel, shown regardless of outcome: "Colloquio gratuito: portateci il vostro sito, guardiamo insieme cosa vale la pena salvare" → `/it/kontakt/`. Shown identically for all three outcomes, including `riparazione-mirata` — the tool must stay useful even when its own honest verdict is that no redesign, and therefore no Weissmann website project, is needed yet.

## Disclaimer

`artifact-data.json` → `disclaimer`: "Tutte le risposte restano nel vostro browser e non vengono mai inviate altrove. Questo strumento non scansiona il vostro sito, non consulta Google al posto vostro e non garantisce alcun risultato specifico di posizionamento. È un modo per applicare con ordine i sei fattori descritti nell'articolo, non un audit tecnico o una sentenza definitiva." Shown persistently below the results, never behind a click.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Two visually distinct steps (six factors, then the four-question sub-check) followed by one results panel: the verdict name first, then the specific triggering factors as plain reasoning text, then — conditionally — the migration checklist as a simple checkable list. No gauge dials, no percentage score, no traffic-light colour grading of the six factors as a group. Credibility comes from showing exactly which answers produced which verdict, matching the article's own transparency standard.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in Italian called "Mappa decisionale: riparazione vs redesign". Using only the fixed data in the accompanying `artifact-data.json` — its `factors`, `searchEquityCheck`, `decisionLogic`, `outcomes`, `migrationChecklist`, and `disclaimer` fields — do not invent any additional factor, numeric score, percentage, or "typical Swiss business" adjustment. First present the six factors from `factors[]` as a radio-group step, each with its `question` and three `options`, none pre-selected. Then present the four-question search-equity sub-check from `searchEquityCheck.questions` as yes/no toggles, and compute a `bassa`/`media`/`alta` level from the count of "yes" answers per `searchEquityCheck.tiering`. Once all ten inputs are answered, apply the priority-ordered rules described in `decisionLogic` exactly as written — the platform-veto rule (`stato-cms` abandoned or `debito-tecnico` high) always overrides every other factor and must be checked first — to select one of the three `outcomes`. Display the matched outcome's `label` and `description`, followed by a short plain-language explanation naming the specific factor values that produced it (never just the outcome name alone). If the matched outcome's `showsMigrationChecklist` is true, render the full `migrationChecklist` as a checkable list labelled with that outcome's `checklistScope`; if false, state explicitly that no migration is needed rather than showing an empty or greyed-out checklist. If any of the ten inputs is unanswered, show a neutral prompt asking the reader to complete all of them instead of computing a partial or guessed verdict; recompute immediately whenever an answer changes, never leaving a stale result on screen. Everything must run entirely client-side with zero network calls and no automatic scanning of any real website; if you add "remember my answers," use `localStorage` only, labelled as on-device, with a visible "cancella risposte salvate" control. Make all ten controls keyboard-accessible with real `<label>` elements and an `aria-live="polite"` region covering the verdict, its reasoning, and the conditional checklist. Use a single-column mobile layout: six factors as step one, the four-question sub-check as a clearly separated step two, then the results panel below, no horizontal scrolling or tab-switching. End the results panel with one plain secondary link, "Colloquio gratuito: portateci il vostro sito, guardiamo insieme cosa vale la pena salvare", pointing to weissmann.ai/it/kontakt/ — shown for every outcome including `riparazione-mirata`, with no urgency language. Always display the `disclaimer` text persistently below the results, never behind a click. Style it cleanly: two input steps, one results panel showing the verdict, the reasoning, and the conditional checklist as simple stacked sections — no gauge dials, no numeric score, no traffic-light colour coding of the six factors as a group — credibility comes from showing exactly which answers produced which verdict, not from a decorative overall grade.
