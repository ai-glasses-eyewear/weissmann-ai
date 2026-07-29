# Artifact Brief — AI Receptionist KPI and ROI Dashboard

**Article:** `how-to-measure-ai-receptionist-kpis` ("How to Measure an AI Receptionist: 12 KPIs That Matter More Than 'Calls Answered'")
**Language:** English (en) — the article and artifact both exist in English only.
**Artifact type:** ROI/KPI dashboard (sixteen raw counts → twelve derived rates, read as plain-language text plus optional own-history trend), distinct from the break-even calculator (`ai-phone-assistant-small-business-case`, three inputs → a single break-even verdict) and the weighted vendor comparators used elsewhere in this project.

## User problem

The article's thesis is that "calls answered" is close to 100% for any working AI receptionist by design and therefore tells a reader almost nothing, that eleven other metrics matter more, and that every one of those eleven can be made to look better than it is — with no credible published Swiss or international benchmark available to check any of them against. A reader who accepts this logic still needs somewhere to actually enter their own call counts, get the twelve numbers calculated correctly and consistently, and see the same cross-metric contradictions the article warns about (a high containment rate sitting next to a rising repeat-call rate, a resolution rate suspiciously identical to a containment rate) applied to their own data rather than to the article's illustrative examples.

## Audience

A Swiss business owner or manager who already has an AI phone assistant live — from Weissmann or any other vendor — and wants an honest read of a recent period's call data, without trusting a vendor dashboard's own framing of what counts as "resolved" or "contained."

## Why an interactive artifact beats a static PDF

Twelve KPIs, several of them sharing raw inputs (`totalCalls` alone feeds seven of the twelve formulas) and several requiring cross-checks against each other rather than being read alone, are impractical to compute reliably by hand without a spreadsheet-grade tool — and a static worksheet could not run the contradiction checks (containment vs. repeat-call rate, resolution vs. containment near-equality, handling-time vs. resolution-rate trend) that are the artifact's main point of difference from just handing the reader twelve formulas in a table. The article's central discipline — track your own trend, not an external benchmark — also requires the tool to store and compare a previous period's figures, which a static document cannot do interactively.

## Inputs

**Current period — raw counts (`artifact-data.json` → `rawInputs`, 16 fields).** Only `totalCalls` is required; every other field is optional, and any KPI whose required raw inputs are missing shows a "not enough data yet" message (see `kpis[].lowDataMessage`) instead of a broken or zero-filled result. Each field has help text drawn directly from the article — for example, `callsResolved` explicitly warns the reader to use their own honest definition of "resolved," not just "ended without a transfer," pointing at the article's gaming section.

**Previous period — optional, per KPI (`artifact-data.json` → `previousPeriodInputs`).** For any of the twelve KPIs, the reader may optionally enter a remembered or previously exported value (percentage or minutes) from an earlier period of their own. This is used only for directional trend display — never compared to a target or to any other business's number.

## Calculation logic

See `artifact-data.json` → `kpis` for the exact twelve formulas (mirrors the article's KPI sections one-to-one, no additional invented variables):

1. Calls Answered Rate = `(totalCalls − callsMissedDespiteAssistant) / totalCalls`
2. Resolution Rate = `callsResolved / totalCalls`
3. Containment Rate = `(totalCalls − callsTransferred) / totalCalls`
4. Booking Conversion Rate = `bookingsConfirmed / callsWithBookingIntent` (denominator is booking-intent calls, not all calls — deliberately, per the article's section on denominator gaming)
5. Correction Rate = `callsWithCorrection / totalCalls`
6. Customer Effort Index = `totalCorrectionEvents / totalCalls` (a depth measure distinct from Correction Rate's breadth measure)
7. Transfer Success Rate = `transfersConnected / callsTransferred`
8. Abandonment Rate = `callsAbandoned / totalCalls`
9. Repeat-Call Rate = `repeatCalls / totalCalls`
10. Bad-Answer Rate (sampled) = `sampledBadAnswers / sampledCallsReviewed` — the only KPI that requires the reader to have actually done a manual review; if `sampledCallsReviewed` is 0, show the `lowDataMessage`, not a 0% result, since 0% here would misleadingly imply a clean audit rather than no audit at all.
11. After-Hours Resolution Share = `afterHoursResolvedOrBooked / afterHoursCalls`
12. Average Handling Time (minutes) = `totalCallMinutes / totalCalls`

**Consistency checks (`artifact-data.json` → `consistencyChecks`, 6 rules).** These compare the reader's own metrics to each other or to their own previous period — never to an external number — and surface the exact patterns the article's gaming section describes: containment high while repeat-call rate is also elevated/rising; resolution rate and containment rate suspiciously near-identical (a sign "resolved" may quietly mean "not transferred"); handling time and resolution rate both falling together; a low correction rate alongside a rising abandonment rate; and a small-sample caution below 30 total calls (a general numeracy caution about percentage volatility on small samples, not an industry benchmark).

**Do not invent any additional multiplier, average, or "typical Swiss business" adjustment.** The tool computes only what the reader's own numbers produce and what the reader's own history shows. The `noBenchmarkStatement` field in `artifact-data.json` must be shown in the UI, not just held as internal metadata.

## Outputs

- All twelve KPI cards, each showing: the calculated value (or the `lowDataMessage` if the required raw inputs are missing), the KPI's `read` text in plain language (what the number means and what to check it against — never a colour-coded "good/bad" verdict against a target), and, when a previous-period value was supplied for that KPI, a plain directional trend line ("up," "down," or "flat vs. your last period" — no red/green semantics, since direction alone carries the information).
- A dedicated **"Things worth double-checking"** panel listing any consistency-check messages that triggered, in plain sentences, each explicitly framed as "worth a look," never as an error or a failing grade.
- A persistent **"No benchmark" banner** using the `noBenchmarkStatement` text, visible whenever results are shown, not just on first load.
- Raw computed figures (e.g., calls per period, transferred count) are not restated separately from the KPI cards — the twelve cards are the entire output surface, keeping the tool from turning into an extra, unlabelled thirteenth dashboard.

## Error states

- If `totalCalls` is empty or zero, show a single neutral prompt state across the whole dashboard ("Enter your total call count to begin") rather than twelve broken cards.
- If a KPI's other required raw inputs are missing (e.g., `callsResolved` for Resolution Rate) but `totalCalls` is present, show that KPI's `lowDataMessage`, while the KPIs that do have enough data still render normally — partial data must produce partial, honestly-labelled results, not an all-or-nothing block.
- Reject negative numbers with inline validation text; clamp nothing silently.
- If a formula's denominator is 0 (e.g., `callsWithBookingIntent` is 0 for Booking Conversion Rate), show "Not enough booking-intent calls recorded yet" rather than a division-by-zero result or a fabricated 0%.
- If `sampledCallsReviewed` is 0, use the KPI's specific `lowDataMessage` (calling out that this is the metric most often skipped), not the generic low-data message.

## Privacy considerations

All computation happens client-side in the browser. Nothing entered — including any previous-period figures, which are effectively a slice of the business's call-handling history — is transmitted, stored on a server, or sent to any analytics endpoint. If the tool offers to remember values between visits, that must be `localStorage` only, clearly labelled as on-device, with a visible "clear saved data" control. State the no-transmission fact explicitly in a small, persistent footer note, consistent with the other artifacts in this project.

## Accessibility requirements

All sixteen raw inputs and twelve optional previous-period inputs are real `<input type="number">` controls with associated `<label>` elements (not placeholder-only labels); help text linked via `aria-describedby`; the results region uses `aria-live="polite"` so a screen-reader user hears updated KPI reads and consistency-check messages as inputs change, without needing to renavigate; the "Things worth double-checking" panel is a landmark region with a clear heading; all interactive elements are keyboard-operable with visible focus states; trend direction is conveyed with explicit words ("up," "down," "flat") plus an arrow glyph, never colour alone.

## Mobile behaviour

Single-column layout: raw inputs grouped under short subheadings matching the article's KPI groupings (e.g., "Resolution & containment," "Booking," "Correction & effort") so the input form does not read as one undifferentiated wall of sixteen fields; results render directly below the input section, in the same single column, so a phone user sees updated KPI cards without horizontal scrolling or tab-switching. Numeric inputs use `inputmode="decimal"`/`"numeric"` so mobile keyboards show the number pad. Previous-period fields are collapsed under an optional "Compare to an earlier period" disclosure, closed by default, so the mobile form is not overwhelming on first load.

## CTA

One contextual, secondary link at the bottom of the results panel: "Free consultation: we'll go through your own call numbers together" → `/en/kontakt/`. Shown regardless of what the numbers say — including when every consistency check is clean — since the article's own honesty standard means the tool must stay useful and non-pushy no matter the result. No urgency language, no CTA wording that changes based on the results to sound more persuasive.

## Disclaimer

"This tool performs only the arithmetic described in 'How to Measure an AI Receptionist' (weissmann.ai) on the numbers you enter. It does not compare your figures to any external benchmark, because no credible published one exists for these metrics. It is not a substitute for actually listening to or reading a sample of your own calls, particularly for the Bad-Answer Rate. All calculations run locally in your browser; nothing you enter is transmitted or stored." Shown persistently below the results, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, form-first layout: grouped inputs at the top (matching the article's KPI pairings), twelve compact result cards below in a simple grid that stacks to one column on mobile, the "Things worth double-checking" panel directly under the cards, then the no-benchmark banner and disclaimer. No gauge dials, no traffic-light colour coding on the KPI cards, no fake precision beyond one decimal place on percentages — the tool's credibility comes from showing exactly what it calculated and why, not from dressing up twelve numbers as a scorecard.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in English called "AI Receptionist KPI and ROI Dashboard". Using the fixed data in the accompanying `artifact-data.json` — use exactly its `rawInputs`, `kpis`, `consistencyChecks`, `gamingPatterns`, `noBenchmarkStatement`, `trendGuidance`, `disclaimer`, `ctaHref` and `ctaLabel` fields, and do not invent any additional formula, constant, or "typical Swiss business" adjustment — collect the sixteen current-period raw counts described in `rawInputs` (only `totalCalls` is required; everything else is optional), grouped under short subheadings that match the article's KPI pairings (Calls Answered; Resolution & Containment; Booking; Correction & Customer Effort; Transfer & Abandonment; Repeat Calls & Bad-Answer Rate; After-Hours & Handling Time). Add a collapsed, optional "Compare to an earlier period" section where the reader can enter a previous value for any of the twelve KPIs, purely for a directional up/down/flat trend display — never a comparison to any target or external number. On every input change, compute all twelve KPIs from `kpis[].formula` and display each as a compact card showing: the calculated value (or that KPI's specific `lowDataMessage` if its required raw inputs are missing or its denominator is zero — never a fabricated 0% or a broken result), that KPI's `read` text in plain language, and, when available, the trend direction versus the previous-period value the reader supplied. Below the cards, run the six rules in `consistencyChecks` against the current computed values (and previous-period trend where relevant) and list any that trigger in a "Things worth double-checking" panel, worded exactly as their `message` field, framed as worth a look rather than as errors. Always display the `noBenchmarkStatement` text as a persistent banner and the `disclaimer` text persistently below the results — never hide either behind a click. Everything must run entirely client-side with zero network calls and zero data collection; if you add "remember my numbers," use `localStorage` only, label it as on-device, and provide a visible "clear saved data" control. Make all inputs and controls keyboard-accessible with real `<label>` elements, `aria-describedby` help text tied to each input's help copy from `rawInputs`, and an `aria-live="polite"` region covering the KPI cards and the consistency-check panel. Use a single-column, touch-friendly mobile layout with `inputmode="decimal"`/`"numeric"` on numeric fields, and keep the previous-period section collapsed by default on small screens. End the results panel with one plain secondary link, "Free consultation: we'll go through your own call numbers together", pointing to weissmann.ai/en/kontakt/ — shown for every outcome, with no urgency language and no wording that changes based on the results. Style it cleanly: grouped plain input sections, a simple grid of twelve compact result cards (one column on mobile), no gauge dials, no traffic-light colour coding, no decorative dashboard chrome — the tool's credibility comes from showing its arithmetic plainly, not from scoring the reader.
