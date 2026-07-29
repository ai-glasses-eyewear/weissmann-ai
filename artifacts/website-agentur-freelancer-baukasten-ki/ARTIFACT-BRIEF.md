# Artifact Brief — Website Build-Route Decision Engine

**Article:** `website-agentur-freelancer-baukasten-ki` ("Agentur, Freelancer, Baukasten oder KI: Wer sollte Ihre Website bauen?")
**Language:** German (de) — the article and artifact both exist in German only.
**Artifact type:** Rule-based decision engine (six self-assessed inputs → weighted-score recommendation across four routes), distinct from the single-criterion weighted comparator (`swiss-ai-phone-assistant-provider-comparison`, which scores fixed *providers*) and from the three-number arithmetic calculator (`ai-phone-assistant-small-business-case`). This tool scores four *routes* against six *situational* variables the reader answers about their own project, not about competing named vendors.

## User problem

The article's thesis is that no build route is universally best — the right one depends on six variables (time budget, money budget, own skill, brand complexity, integration needs, accountability need) considered together, not on any single one of them or on company size. A reader who accepts this logic still has to weigh six variables against four routes in their head, which is exactly the kind of multi-factor comparison people get wrong by anchoring on the one variable that occurred to them first (usually budget). The tool does that weighing for them, transparently, using the same six-variable framework and worked examples from the article — and it is built so that it can and does recommend Baukasten or Freelancer, not just Agentur, when the reader's answers point there.

## Audience

A Swiss SME owner, sole proprietor, or decision-maker who is about to commission or build a website and is weighing (or being pitched) more than one of the four routes, and wants a reasoned answer specific to their own project rather than a generic "it depends."

## Why an interactive artifact beats a static PDF

A static decision matrix (e.g. a printed table of "if X then Y") cannot combine six independent variables into one weighted, explainable recommendation — the number of realistic combinations is too large to print usefully, and a static table would force the reader to do the cross-referencing and addition themselves, which is exactly the error-prone step this tool removes. Because the four routes have deliberately different maximum achievable scores (Baukasten 18, Agentur 18, Freelancer 16, KI-Tool 17 — see `artifact-data.json` → `scoringNote`), a static table also could not show *why* a given route won without recomputation live. The interactive tool recalculates instantly as the reader changes an answer, letting them see how sensitive the recommendation is to any one variable (e.g. "if only my integration need were lower, the freelancer would win instead").

## Inputs

Six required single-select questions, one per variable (`artifact-data.json` → `variables`, in this exact order):

1. **Zeitbudget bis zum Launch** — sehr knapp (unter 2 Wochen) / knapp (2–6 Wochen) / moderat (6–12 Wochen) / flexibel (über 12 Wochen).
2. **Geld-Budget (grobe Grössenordnung)** — sehr klein (unter CHF 500) / klein (CHF 500–3'000) / mittel (CHF 3'000–10'000) / gross (über CHF 10'000). Framed explicitly as the reader's own rough self-assessment, not an industry benchmark.
3. **Eigene technische/gestalterische Erfahrung** — keine / etwas (z. B. schon einmal einen Baukasten genutzt) / gut (Code oder Design) / professionelle Erfahrung im eigenen Team vorhanden.
4. **Markenkomplexität** — einfach (1 Zielgruppe, 1 Sprache, 1 Standort) / mittel (mehrere Zielgruppen oder 2 Sprachen) / komplex (mehrere Sprachen, Standorte oder Marken).
5. **Integrationsbedarf** — keine (reine Informationsseite) / einfach (Kontaktformular, Karte, Buchungslink) / mittel (Kalender, Zahlungsanbindung, CRM) / hoch (individuelle Anwendungen, mehrere Systeme, E-Commerce).
6. **Risikotoleranz / Accountability-Bedürfnis** — niedrig / mittel / hoch (exact option text in `artifact-data.json`).

## Decision logic

For each variable, the chosen option carries a fixed 0–3 point score per route (`artifact-data.json` → `variables[].options[].scores`), pre-derived from the article's own reasoning about which route structurally fits which situation — not from any invented industry benchmark. Sum the six scores per route (`Σ scores[route]` across the six answered variables) and sort descending. The route with the highest total is the primary recommendation. **The four routes have different maximum achievable totals by design** (Baukasten 18, Agentur 18, Freelancer 16, KI-Tool 17) because no route is structurally the best fit for every combination — this asymmetry must be preserved exactly as given in `artifact-data.json`, not normalized away, since it is itself part of the honest signal (e.g. even a "perfect" freelancer-fit profile tops out below a "perfect" agency-fit or Baukasten-fit profile).

Do not invent additional variables, additional routes, or additional scoring constants beyond what is in `artifact-data.json`. Do not weight Weissmann's own Agentur route upward relative to the published scores under any circumstance.

## Outputs

- **Recommended route** (highest total), shown with its `routeProfiles[route].strengthSummary` (why it fits) *and* its `routeProfiles[route].honestLimit` (what to watch out for) — always both, never the strength alone.
- **Full ranked breakdown** of all four routes with their totals, not just the winner — so the reader can see how close the second-place route was and reconsider if it's close.
- **Per-variable contribution note**: highlight which one or two variables contributed most to the winning route's score (e.g. "Ihr niedriger Integrationsbedarf und Ihr knappes Zeitbudget sprechen hier am stärksten für Baukasten"), generated from which variables gave the winning route its highest relative scores versus the runner-up.
- **Tie handling**: if two routes are within 1 point of each other, show both side by side with their respective `honestLimit` text and the matching guidance from `artifact-data.json` → `tieBreakGuidance`, instead of forcing a single winner.
- A visible provenance note: "Basierend auf dem im Artikel erklärten Punktesystem, Stand 29. Juli 2026 — kein Ersatz für ein eigenes Angebotsgespräch."
- A link back to the canonical article for the full reasoning behind each variable and route.

## Error states

- If any of the six questions is unanswered, do not compute a partial or misleading result — show a neutral prompt ("Beantworten Sie alle sechs Fragen, um Ihre Empfehlung zu sehen") and visually indicate which questions remain open.
- If the reader changes an answer after seeing a result, recompute immediately and update all displayed totals and the breakdown — never leave a stale result on screen after an input change.
- The near-tie case (within 1 point) is not an error but a defined output state (see above) — never silently pick one route by an internal tiebreaker without disclosing it happened.

## Privacy considerations

All computation happens client-side in the browser using only the fixed scoring table in `artifact-data.json` and the reader's six selections. No input is transmitted, stored, or sent to any server or analytics endpoint. State this explicitly in a small, persistent footer note, consistent with the other artifacts in this project.

## Accessibility requirements

Each of the six questions is a real fieldset/radiogroup (or equivalent native select) with an associated `<legend>`/`<label>` — not styled divs with click handlers only; results update in an `aria-live="polite"` region so screen-reader users hear the new recommendation when they change an answer; the ranked breakdown uses real heading/list markup, not div soup; color is never the only signal for rank or for the tie state (use explicit numeric scores and text labels); all controls keyboard-operable with visible focus states.

## Mobile behaviour

Single-column, one-question-at-a-time or short-scroll layout (no horizontal scrolling, no multi-column question grid that requires pinch-zoom); result panel appears directly below the six questions so a phone user scrolls down once, not back and forth; touch targets on the select options sized for comfortable tapping (minimum ~44px).

## CTA

One contextual, secondary link at the bottom of the result panel, shown identically regardless of which route wins (including Baukasten or Freelancer): the `ctaLabel` from `artifact-data.json` — "Unsicher, welche Route zu Ihnen passt? Wir sagen es ehrlich – auch wenn die Antwort nicht «Agentur» lautet" → `/kontakt/`. No urgency language, no CTA wording that changes to sound more persuasive when Agentur is not the winning route, no forced upsell attached to the Baukasten or Freelancer results.

## Disclaimer

Use the exact `disclaimer` string from `artifact-data.json`: "Dieses Ergebnis basiert ausschliesslich auf Ihren eigenen Antworten und einem transparenten, im Artikel erklärten Punktesystem. Es ist eine Entscheidungshilfe, keine Garantie und kein Ersatz für ein eigenes Angebotsgespräch. Alle Berechnungen erfolgen lokal in Ihrem Browser; es werden keine Daten übermittelt oder gespeichert." Shown persistently below the result, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, form-first layout: six questions presented as clear single-select groups (radio buttons or a segmented control, not a slider — these are discrete categories, not a continuum), a clearly delineated result card below showing the winning route's name large, its strength and honest-limit text directly underneath, then the full four-route ranked breakdown as a plain horizontal bar or numbered list. No gauge dials, no gamified scoring wheel, no gradient-heavy "match percentage" badge implying false precision — the tool's credibility comes from showing its reasoning (which variables drove the result), not from dressing up a single number.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in German called "Website-Bauroute-Entscheidungs-Rechner". Present exactly six required single-select questions, in this order, using the exact option labels from the accompanying `artifact-data.json` → `variables`: (1) Zeitbudget bis zum Launch (4 options), (2) Geld-Budget, grobe Grössenordnung (4 options, explicitly framed as the reader's own rough estimate, not an industry benchmark), (3) Eigene technische/gestalterische Erfahrung (4 options), (4) Markenkomplexität (3 options), (5) Integrationsbedarf (4 options), (6) Risikotoleranz/Accountability-Bedürfnis (3 options). Use real fieldset/legend or radiogroup markup, not styled divs. For each of the four routes (Baukasten, KI-Tool, Freelancer, Agentur — ids and labels from `artifact-data.json` → `routes`), sum the fixed 0–3 point score the reader's chosen option carries for that route across all six variables (use exactly the `scores` values given in `artifact-data.json` — do not invent, average, or rebalance them, and do not equalize the routes' differing maximum totals of 18/17/16/18). Recompute live on every answer change. Show the top-scoring route as the primary recommendation with its `routeProfiles[route].strengthSummary` AND `routeProfiles[route].honestLimit` text, both visible together — never the strength alone. Below that, show the full ranked breakdown of all four routes with their totals. If two routes are within 1 point of each other, show both side by side with their own honestLimit text and a short note from `tieBreakGuidance`, instead of forcing one winner. If any question is unanswered, show a neutral prompt instead of a partial result, and indicate which questions remain open. Add a one-line note identifying which one or two variables contributed most to the winning route's score. Show the fixed disclaimer text from `artifact-data.json` → `disclaimer`, persistently visible, not in a collapsed footer. Everything must run entirely client-side with zero network calls and zero data collection — state this in a small footer note. Make every control keyboard-accessible with real labels/legends, and put the result panel in an `aria-live="polite"` region so screen readers announce recommendation changes. Use a single-column, touch-friendly mobile layout with comfortably sized tap targets on every option (no sliders — these are discrete categories). End the result panel with one plain secondary link using the exact `ctaLabel` and `ctaHref` from `artifact-data.json`, shown identically no matter which route wins — including when the winner is Baukasten or Freelancer, with no urgency language and no wording that shifts to sound more persuasive depending on the outcome. Style it cleanly: plain question groups, a plain result card with the winning route's name large and its strength/limit text directly beneath, and a plain ranked list or horizontal-bar breakdown below that — no gauges, no gamified "match percentage" badge, no decorative dashboard chrome. Do not invent additional variables, routes, or scoring constants beyond what `artifact-data.json` provides.
