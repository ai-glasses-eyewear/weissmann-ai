# Artifact Brief — Local SEO Evidence and Location-Page Planner

**Article:** `local-seo-switzerland-doorway-pages` ("Local SEO for Swiss SMEs: How to Rank in Zurich, Zug, Basel or Geneva Without Building 100 Empty City Pages")
**Language:** English (en) — the article and artifact both exist in English only.
**Artifact type:** Repeatable multi-item planner (add N real locations → score each against a fixed four-part evidence test → per-location classification plus an overall page-count recommendation), distinct from every single-subject calculator or twelve-item tiered diagnostic elsewhere in this project — this is the only artifact in the project where the reader supplies a variable-length list of their own locations rather than answering a fixed set of questions about one subject.

## User problem

The article's thesis is that building a dedicated page for a city is not a content-marketing preference but a four-part evidence test, and that most Swiss SMEs asking "should I have a page for Zurich, Zug, Basel and Geneva" are being sold Google's own definition of a doorway page. A reader who accepts that logic still has to apply it to their own actual list of offices, depots and service towns — which the article's worked examples (a two-office fiduciary partnership, a single-depot pest-control company) do not cover directly — and needs an honest, per-location answer plus a concrete checklist for any page that does qualify.

## Audience

A Swiss SME owner, marketer or web-project lead who serves customers in more than one town or canton and is deciding, before commissioning any web work, how many location pages the business actually needs — often after an agency or a generic SEO checklist has already suggested "one page per city" without applying any real test to that number.

## Why an interactive artifact beats a static PDF

A static checklist can list the four evidence criteria once, but it cannot repeat the test across a variable number of locations the reader supplies, keep each location's score separate from the others, or produce a distinct sufficiency checklist only for the locations that actually qualify. The value of this tool is entirely in the repetition and the separation: scoring five locations independently and never blending them into one overall number is the article's central discipline, and only an interactive tool can enforce that as the reader adds, edits or removes locations.

## Inputs

For each location the reader adds (up to 20, matching Google's own service-area limit — see `artifact-data.json` → `maxLocations`):

- A free-text location name (e.g. "Basel office," "Zug service area").
- Four answers, one per `evidenceCriteria` item, each `yes` / `partial` / `no` (`artifact-data.json` → `evidenceCriteria`, `responseOptions`, `defaultResponse`). No answer defaults to `yes`; an unanswered question counts as `no`, so the tool never accidentally recommends a page on the strength of an unanswered question.

## Calculation / decision logic

See `artifact-data.json` → `scoring`, `sufficiencyChecklist`, `serviceAreaGuidance`, and `outputSummary` for the exact rules:

1. Score each location independently: `yes` = 1, `partial` = 0.5, `no` = 0, summed across the four criteria (max 4 per location). Scores are never averaged or blended across locations — each location gets its own classification.
2. Match each location's score against `scoring.classifications` in descending `minScore` order: 3 or above → **Flagship**; 1.5 to just under 3 → **Borderline**; below 1.5 → **Coverage only**.
3. For every location classified Flagship, display the full `sufficiencyChecklist.items` list as a per-location checklist the reader must complete before publishing — not a generic pass/fail badge.
4. For every location classified Borderline or Coverage only, display the `serviceAreaGuidance.rules` instead, directing the reader to Google's own service-area business mechanism and a single shared coverage page rather than a dedicated page.
5. Once all locations are scored, count how many fall into each classification and match that count against `outputSummary.recommendationRules` to show one plain-language structural recommendation (zero dedicated pages / a handful of flagship pages only / a systematic template, with a caution to still audit each one).

**Do not invent a single blended "local SEO score," a percentage, a star rating, or any language implying a guaranteed ranking or indexing outcome.** The tool only classifies the reader's own entered locations against the fixed evidence test and the fixed sufficiency checklist.

## Outputs

- A results row per location: name, score out of 4, classification label, and either the sufficiency checklist (Flagship) or the service-area guidance (Borderline / Coverage only).
- One overall summary: counts of Flagship / Borderline / Coverage-only locations, plus the matched `recommendationRules` message.
- A visible reminder, shown once regardless of results, that Borderline and Coverage-only locations still belong in the business's Google service-area declaration and coverage page — the tool must never imply those locations should simply be dropped or ignored.

## Error states

- Fewer than one location entered: show a neutral prompt ("Add at least one location to see a result") rather than an empty results panel.
- All four answers left at the default (`no`) for a location: still score and classify it normally as Coverage only — this is a correct, honest outcome, not an error state, and must not be suppressed or flagged as incomplete.
- More than 20 locations: block further additions with a plain message referencing Google's own 20-area service-area limit, rather than silently truncating the list.
- Duplicate or empty location names: allow them (a reader may genuinely test two candidate names for the same place) but do not let an empty name row silently disappear from the results — show it with a placeholder label instead.

## Privacy considerations

All scoring runs client-side in the browser. No website, Google Business Profile, or search ranking data is fetched, scanned or verified automatically — every input is the reader's own self-assessment. Nothing entered is transmitted to any server or analytics endpoint. If the tool offers to remember entered locations between visits, that must be `localStorage` only, clearly labelled as on-device, with a visible "clear saved locations" control. State the no-transmission fact explicitly in a persistent footer note, consistent with the other artifacts in this project.

## Accessibility requirements

Each location is a distinct, labelled group (not a flat, unlabelled repeating block) with a real heading tying its four questions and its result together. The four-way input per question uses a real radio group with an associated `<label>`, not colour-only selection. The "add location" and "remove location" controls are real buttons with descriptive accessible names (e.g. "Remove Basel office," not a bare icon). Results update in an `aria-live="polite"` region so a screen-reader user hears each location's new classification as answers change. Classification is conveyed through explicit text labels (Flagship / Borderline / Coverage only), never through colour alone. All controls are keyboard-operable with visible focus states.

## Mobile behaviour

Single-column layout: one location "card" at a time, each showing its name field, four questions, and its own result directly beneath it — no side-by-side comparison table that would force horizontal scrolling. An "add another location" button sits clearly below the existing cards. The overall summary renders as a compact panel above or below the location cards, not in a separate tab. Touch targets for the yes/partial/no control are large and clearly separated, matching the pattern used elsewhere in this project's artifacts.

## CTA

One contextual, secondary link shown once at the bottom of the overall summary, regardless of outcome: "Free consultation: we will count your real locations together, not assume more pages is better" → `/en/services/seo/`. Shown even when every location scores Coverage only — the tool must stay useful and non-pushy no matter what the reader's honest count turns out to be.

## Disclaimer

"This tool sorts the locations you enter using only the answers you provide. It does not scan your website, your Google Business Profile, or any search ranking data automatically, and it does not guarantee a ranking, indexing or traffic outcome. It is a structured starting point for a page-count decision, not an SEO audit, a legal opinion on Google's policies, or a guarantee against manual action. All processing happens locally in your browser; nothing you enter is transmitted or stored." Shown persistently below the overall summary, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, form-first layout: a short intro, then a stack of location cards (name field, four questions, per-location result), an "add location" action, and one overall summary panel at the top or bottom of the stack. No map graphics, no gauge dials, no single combined "score out of 100" — the tool's credibility comes from showing exactly which of the reader's own answers produced which classification for which named location, not from a decorative aggregate grade.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in English called "Local SEO Evidence and Location-Page Planner". Using the fixed data in the accompanying `artifact-data.json` — use exactly its `evidenceCriteria`, `scoring`, `sufficiencyChecklist`, `serviceAreaGuidance`, `outputSummary`, and `disclaimer` fields, and do not invent any additional criterion, score, percentage, or ranking guarantee — let the reader add up to `maxLocations` (20) named locations, one at a time, via an "add location" button, each removable. For each location, show a text field for its name and the four `evidenceCriteria` questions, each answered via a three-way Yes / Partial / No control defaulting to no selection rather than defaulting to "no" visually, though an unanswered question should score as "no" (0 points) per the scoring rules. As answers change, compute each location's score (yes=1, partial=0.5, no=0, summed across the four criteria, max 4) independently — never average or blend scores across locations — and match each score against `scoring.classifications` in descending `minScore` order to show that location's classification label and message directly beneath its four questions. Beneath a location classified "flagship," render the full `sufficiencyChecklist.items` list as a checklist specific to that location; beneath a location classified "borderline" or "coverage-only," render the `serviceAreaGuidance.rules` instead. Once at least one location is scored, show an overall summary panel counting how many locations fall into each classification and displaying the single matching message from `outputSummary.recommendationRules`. If no locations have been added yet, show a neutral prompt instead of an empty summary panel. Block adding a 21st location with a message referencing Google's own 20-area service-area limit rather than silently truncating the list. Everything must run entirely client-side with zero network calls and no automatic scanning of any real website, Google Business Profile, or search data; if you add "remember my locations," use `localStorage` only, label it as on-device, and provide a visible "clear saved locations" control. Make every control keyboard-accessible with real `<label>` elements, descriptive accessible names on the add/remove buttons (not bare icons), and an `aria-live="polite"` region covering the per-location results and the overall summary. Use a single-column, touch-friendly mobile layout showing one location card at a time with its own result directly beneath it, and large, clearly separated touch targets for the yes/partial/no control. End the overall summary with one plain secondary link, "Free consultation: we will count your real locations together, not assume more pages is better", pointing to weissmann.ai/en/services/seo/ — shown for every outcome, including when every location scores coverage-only, with no urgency language. Always display the `disclaimer` text persistently below the overall summary, never behind a click. Style it cleanly: a stack of location cards, one overall summary panel, no map graphics, no gauge dials, no single blended score out of 100 — the tool's credibility comes from showing exactly which answers produced which classification for which named location, not from a decorative aggregate grade.
