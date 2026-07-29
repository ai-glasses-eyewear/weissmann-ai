# Artifact Brief — Conversion Leak Detector

**Article:** `website-conversion-design-switzerland` ("A Beautiful Website That Does Not Convert Is Expensive Decoration")
**Language:** English (en) — the article and artifact both exist in English only.
**Artifact type:** Weighted, multi-question self-assessment across six named conversion factors (headline clarity, proof visibility, CTA clarity, form length, mobile experience, load speed), each scored from three graduated-severity diagnostic questions, producing a funnel-ordered prioritized leak list. This is a genuinely different mechanic from every other scorecard-style artifact in this project: instead of a flat yes/no/unsure count across a fixed list of signs (as in `website-redesign-signs-switzerland`'s triage tool), each factor here is scored on a 0–6 scale from three separate sub-questions, banded independently, and ranked using a two-part rule (band, then funnel position) rather than a lookup table of fixed message conditions.

## User problem

The article's thesis is that visual design quality and conversion performance are two different, separately testable properties of a website — a page can look excellent and still fail to generate enquiries, because conversion depends on five underlying mechanics (message hierarchy, proof, friction, calls to action, mobile behaviour) that have almost nothing to do with typography. A reader who accepts this reasoning still needs to apply it to their own actual website, not the article's illustrative Basel studio, and get back a specific, prioritized answer: of the six checkable elements, which ones are actually likely to be losing enquiries right now, and which can reasonably wait.

## Audience

A Swiss business owner, marketer or manager whose website has recently been redesigned, or is about to be, and who has design-quality feedback (their own opinion, an agency's portfolio, compliments from customers or peers) but no structured way to check whether the site is also mechanically built to convert visitors into enquiries.

## Why an interactive artifact beats a static checklist

A printed list of six factors cannot enforce the article's central discipline: that a single severely broken factor (nobody understands the headline) can matter more than several mildly imperfect ones combined, and that averaging all six into one blended score would hide exactly that. The tool needs to (1) collect three graduated-severity answers per factor rather than a single yes/no, (2) band each factor independently rather than producing one number, and (3) rank the resulting leaks using the article's own funnel logic — a problem earlier in a visitor's decision path is listed first because it blocks every later factor from getting a fair chance to matter — none of which a static document can compute interactively from a reader's own specific pattern of answers.

## Inputs

**Six factors, each with three questions, each question a three-way graduated choice** (`artifact-data.json` → `factors[].questions[]`, 6 × 3 = 18 fields total). Every option carries a `severity` value of 0 (no problem), 1 (partial or unverified), or 2 (likely a problem) — nothing defaults to a selection; a factor only gets scored once its own questions are answered. Each question carries a `testHint`: a concrete, doable action for actually checking the answer rather than guessing (e.g. "submit the form yourself, from a phone, on mobile data").

## Calculation / decision logic

See `artifact-data.json` → `scoring` and `outputLogic` for the exact rules:

1. Each factor's raw score is the sum of the severity values chosen across its three questions (0–6). This raw score is used only internally for ranking; it is never displayed to the user as a number or percentage.
2. Each factor is banded independently using `scoring.bands`: 0–1 "Low risk", 2–3 "Worth checking", 4–6 "Likely leak — prioritize this." The tool never combines the six factor scores into one overall grade, because one severely broken factor (for example, message hierarchy) can cost more in lost enquiries than three mildly imperfect ones, and an average would erase that distinction, which is the article's central point.
3. Every factor banded "medium" or "high" is placed into the **Prioritized Leak List**, sorted first by band (high before medium), then by raw score within the same band, then — only if still tied — by `funnelOrder` ascending, reflecting the order the article argues visitors actually encounter these mechanics (message hierarchy, then proof, then the call to action, then form friction, then mobile experience, then load speed). This tie-break is stated explicitly in the UI as "listed first because it sits earlier in the visitor's decision path," not as a claim that it is inherently worse.
4. Factors banded "low" are shown separately underneath, in their own clearly labelled section, so a factor that passed is still visible but is never confused with an active leak.
5. If a factor has only some of its three questions answered, it is scored on the answered subset (average severity, scaled to the 6-point range) and shown with a visible "partially assessed" note — it is never silently dropped or silently treated as a full pass.

**Do not invent a single overall percentage, a red/yellow/green traffic-light grade across all six factors as a group, or any language implying a guaranteed increase in enquiries, conversions or ranking.** The tool only reorders the reader's own eighteen answers using the rules above.

## Outputs

- **Prioritized Leak List** — every factor banded "medium" or "high," in the sorted order described above, each shown with its `whyItMatters` text and the specific sub-questions that were flagged (severity ≥ 1), each paired with its `testHint` so the next action is concrete, not vague.
- **Low-risk factors** — every factor banded "low," listed separately with a short confirmation note, so a clean result is visible rather than simply absent.
- **Partially assessed** — any factor with unanswered questions, clearly marked as incomplete rather than folded into either list above.
- If every question is left unanswered: the tool shows `emptyStateMessage` instead of a populated but meaningless report.

## Error states

- No question defaults to a selection; an unanswered question is visually distinct from a "no problem" (severity 0) answer, so the two are never conflated in scoring.
- If a user answers only one or two questions within a factor, that factor is marked "partially assessed" per the `partialAnswerRule` rather than silently scored as if fully answered or silently excluded.
- There is no free-text or numeric input to validate; all eighteen inputs are three-way choices, so no format-validation or division-by-zero states apply.
- If a user answers every question with the lowest severity (a fully clean result), show the low-risk list in full with an explicit note that no leak was flagged anywhere, rather than implying the tool found nothing to say.

## Privacy considerations

All logic runs client-side in the browser. No website is scanned, crawled or automatically tested; every answer is the reader's own self-assessment, typed or clicked in by hand. Nothing entered is transmitted to any server or analytics endpoint. If the tool offers to remember answers between visits, that must be `localStorage` only, clearly labelled as on-device, with a visible "clear saved answers" control. State the no-transmission fact explicitly in a persistent footer note, consistent with the other artifacts in this project.

## Accessibility requirements

All eighteen questions use a real three-option control (radio group or equivalent) with an associated `<label>`, never colour-only or icon-only selection. Each `testHint` is linked via `aria-describedby` so assistive technology reads it alongside the question. The results region uses `aria-live="polite"` so a screen-reader user hears the updated band labels and prioritized list as answers change. The six factor headings and the Prioritized Leak List / Low-risk sections use real heading elements so the structure is navigable by heading. All controls are keyboard-operable with visible focus states. Severity and band are conveyed through explicit text labels ("Likely leak — prioritize this"), never through colour alone.

## Mobile behaviour

Single-column layout: the six factors presented as clearly labelled, collapsible groups of three questions each, so a phone user always knows which factor they are currently answering and can collapse a completed factor to reduce scrolling. Results render directly below the questions in the same single column, no tab-switching, no horizontal scrolling. The three-way answer control uses large, clearly separated touch targets (stacked buttons or a large radio group), not a cramped dropdown, matching how the article itself argues tap targets should behave.

## CTA

One contextual, secondary link at the bottom of the results panel, shown for every outcome including a fully clean result: "Free consultation: bring your own site and we will walk through the five factors together" → `/en/kontakt/`. No urgency language, matching the article's own explicit rejection of manufactured pressure.

## Disclaimer

"This tool reorders six conversion factors from 'A Beautiful Website That Does Not Convert Is Expensive Decoration' (weissmann.ai) using only the answers you provide about your own website. It does not scan, crawl or automatically test your site, does not produce a percentage conversion score, and does not guarantee a specific increase in enquiries, sales or search ranking. It is a prioritized starting point for deciding what to check or fix first, not a technical, legal or accessibility audit. All processing happens locally in your browser; nothing you enter is transmitted or stored anywhere." Shown persistently below the results, not buried behind a click.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, form-first layout: six collapsible factor sections in the order headline clarity, proof visibility, CTA clarity, form length, mobile experience, load speed, each with its three questions; one results panel below showing the Prioritized Leak List first, then Low-risk factors, then any Partially assessed factors. No gauge dials, no single overall percentage or grade, no traffic-light colour wash applied to the whole tool at once — credibility comes from showing exactly which of the reader's own eighteen answers produced which factor's placement, not from a decorative overall score.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in English called "Conversion Leak Detector." Using the fixed data in the accompanying `artifact-data.json`, use exactly its `factors`, `scoring`, `outputLogic`, `emptyStateMessage`, and `disclaimer` fields, and do not invent any additional factor, question, numeric weight, or "typical Swiss business" adjustment. Present the six factors in the order given (headline clarity, proof visibility, CTA clarity, form length, mobile experience, load speed) as collapsible sections, each showing its three questions with the exact `prompt` text, a `testHint` shown via an info affordance linked with `aria-describedby`, and a three-way answer control built from each question's `options` (label plus underlying `severity` value), defaulting to no selection. As answers change, compute each factor's raw score as the sum of the severities chosen across its answered questions (using the `partialAnswerRule` scaling if a factor is only partly answered), band each factor independently per `scoring.bands`, and never combine the six scores into one overall number, percentage, or grade — display only the band label per factor, never the raw score. Build the results as three sections in this order: a "Prioritized Leak List" containing every factor banded medium or high, sorted by band (high first), then by raw score, then, only if tied, by `funnelOrder` ascending per `outputLogic.tieBreakOrder`, each entry showing its `whyItMatters` text and the specific flagged sub-questions with their `testHint`; a "Low-risk factors" section listing every factor banded low with a short confirmation note; and a "Partially assessed" section for any factor with unanswered questions. If no question anywhere has been answered, show `emptyStateMessage` instead of any populated report. Everything must run entirely client-side with zero network calls and no automatic scanning of any real website; if you add "remember my answers," use `localStorage` only, label it as on-device, and provide a visible "clear saved answers" control. Make all eighteen controls keyboard-accessible with real `<label>` elements and an `aria-live="polite"` region covering the band labels and the three result sections as answers change. Use a single-column, touch-friendly mobile layout with the six factors as collapsible groups and large touch targets for the three-way control. End the results panel with one plain secondary link, "Free consultation: bring your own site and we will walk through the five factors together," pointing to weissmann.ai/en/kontakt/, shown for every outcome including a fully clean result, with no urgency language. Always display the `disclaimer` text persistently below the results, never behind a click. Style it cleanly: six collapsible question sections, one results panel with the three stacked output sections described above — no gauge dials, no single overall percentage or grade, no traffic-light colour wash across the tool as a whole — the tool's credibility comes from showing exactly which answers produced which factor's placement, not from a decorative overall score.
