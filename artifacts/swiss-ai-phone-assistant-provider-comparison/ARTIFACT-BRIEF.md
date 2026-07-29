# Artifact Brief — Swiss AI Phone Assistant Comparator

**Article:** `swiss-ai-phone-assistant-provider-comparison` ("KI-Telefonassistenten Schweiz: Ehrlicher Anbieter-Vergleich 2026")
**Language:** German (de) — the article and artifact both exist in German only.
**Artifact type:** Weighted comparison lab (user-weighted criteria comparator).

## User problem

A Swiss SME owner has read the comparison article and now has six providers, five comparison criteria, and no way to know which provider actually wins *for their specific business* — the article deliberately refuses to declare one universal winner because there isn't one. The artifact lets the reader assign their own priority weight to each criterion and see a ranked result computed from the same verified data used in the article, not a fresh sales pitch.

## Audience

Same as the article: a Swiss SME owner or manager evaluating AI phone assistant vendors, most likely non-technical, reading in German.

## Why an interactive artifact beats a static PDF

The article's own conclusion is that the "right" provider depends on which criterion matters most to the specific reader (price transparency vs. dialect breadth vs. PMS integration vs. contract flexibility). A static ranked list can only express one weighting. An interactive weighting tool lets each reader get a personally relevant ranking from the same underlying facts, without Weissmann (or anyone) picking the weights for them.

## Inputs

- Five sliders or 1–5 rating inputs, one per criterion, labelled in German:
  1. Dialektabdeckung (dialect coverage granularity)
  2. Preistransparenz (price transparency — is a real number published)
  3. Hosting/Datenschutzangabe (hosting & data-protection disclosure)
  4. Integrationstiefe (integration depth — calendar/CRM/industry-specific systems)
  5. Vertragsflexibilität (contract flexibility — no minimum term vs. locked in)
- Optional: an "ich betreibe ein Hotel/eine Ferienwohnung" checkbox that boosts the weight of PMS-specific integration matches for Alveni.

## Calculation / decision logic

For each of the 6 providers (Weissmann, AlpenAgent, Suisse Voice, NEX-AI, HeyPapaya, Alveni), the artifact stores a fixed 1–5 score per criterion, pre-derived from the same verified facts as the article (see `artifact-data.json` — these scores are structural facts, e.g. "publishes a real CHF price" = 5, "no public price at all" = 1; they must stay consistent with the article's own wording, not invent new claims). The result is `Σ(userWeight[c] × providerScore[c]) for each provider`, normalized to a 0–100 display score, sorted descending. Show the raw per-criterion breakdown alongside the total so the reader can see *why* a provider ranked where it did — never show only a final number.

## Outputs

- A ranked list of all 6 providers with their computed score and one-line "why it ranked here" explanation per provider, generated from which criteria contributed most given the reader's weights.
- A visible note: "Basierend auf öffentlich zugänglichen Angaben der Anbieter, Stand 29. Juli 2026 – keine unabhängige Testmessung." (repeat the article's epistemic honesty, don't let the UI imply more certainty than the source data has).
- A link back to the canonical article at `https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistenten-schweiz-anbieter-vergleich/` for the full reasoning behind each score.

## Error states

- If the user sets all weights to 0, show a message asking them to weight at least one criterion rather than silently dividing by zero or showing a meaningless tie.

## Privacy considerations

No data is collected or transmitted — all computation happens client-side in the browser. No form submission, no analytics beyond what the hosting page itself already runs. State this explicitly in a small footer note.

## Accessibility requirements

Sliders/inputs must be keyboard-operable and have visible focus states; results list must use real heading/list markup (not div soup) so screen readers can navigate it; color must not be the only signal for rank (use numeric position + score, not just a color bar).

## Mobile behaviour

Single-column stacked layout on narrow viewports; sliders sized for touch (minimum ~44px touch target); results list remains fully readable without horizontal scrolling.

## CTA

Contextual only: near the top-ranked result, a single secondary link "Weissmann-Paket im Detail ansehen" pointing to `/preise/` — not a forced CTA on every provider row, and never phrased as urgent/limited-time (no fake scarcity, per the master prompt's promotion rules).

## Disclaimer

"Dieser Vergleich basiert auf öffentlich zugänglichen Herstellerangaben und ersetzt keinen eigenen Testanruf. Preise und Funktionsumfang können sich seit dem 29. Juli 2026 geändert haben." Shown persistently, not buried.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, Weissmann's existing type scale) — clean, data-forward, no decorative gauges or fake-precision dial graphics; a plain horizontal bar or ranked-list treatment communicates the result more honestly than a gamified score wheel.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in German called "KI-Telefonassistenten-Vergleich: Ihre Prioritäten". It lets a user set a 1–5 importance weight for 5 criteria (Dialektabdeckung, Preistransparenz, Hosting/Datenschutzangabe, Integrationstiefe, Vertragsflexibilität) via sliders, then computes a weighted score for 6 fixed Swiss AI phone assistant providers (Weissmann, AlpenAgent, Suisse Voice, NEX-AI, HeyPapaya, Alveni) using the fixed per-provider per-criterion scores supplied in the accompanying `artifact-data.json`, and displays a ranked list with per-criterion breakdown, a data-provenance note ("Stand 29. Juli 2026, Herstellerangaben, keine unabhängige Messung"), full keyboard accessibility, mobile-responsive single-column layout, no data collection/network calls, and a single contextual link to weissmann.ai/preise/ near the top result. Style it with a clean, neutral, data-forward look — no gamified dials or fake precision. Do not invent additional providers or change the fixed scores.
