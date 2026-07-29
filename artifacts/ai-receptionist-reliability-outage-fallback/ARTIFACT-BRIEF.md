# Artifact Brief — Resilience and Fallback Scenario Simulator

**Article:** `ai-receptionist-reliability-outage-fallback` ("What Happens When Your AI Receptionist, Calendar or Internet Goes Down?")
**Language:** English (en) — the article and artifact both exist in English only.
**Artifact type:** Side-by-side timeline simulator (distinct mechanic from the German `ai-phone-assistant-failure-handling` Conversation Failure Simulator, which replays a single in-call exchange, and from the English `ai-receptionist-swiss-phone-system-compatibility` Planner, which outputs static checklists. This tool shows the same outage unfolding twice, second by second, once under poor fallback design and once under good, so the abstract "fail open vs. fail closed" framework from the article becomes something the reader watches happen.)

## User problem

The article's core claim is that every AI receptionist depends on three things that can each fail independently — the caller's connection, the calendar or booking system, and the vendor's own platform — and that what matters is not whether a failure happens but what the system does in the following seconds. A reader who has finished the article understands the principle in the abstract; the simulator makes it concrete by picking one of the three outage types and watching a plausible poor-design timeline and a plausible good-design timeline unfold side by side, second by second, ending in visibly different outcomes for the caller.

## Audience

The same reader as the article: a Swiss or internationally-run SME decision-maker evaluating or already using an AI receptionist, who is not a systems engineer, and wants to walk into a vendor conversation with a concrete mental model of what "good fallback design" actually looks like in practice, not just as a phrase in a sales deck.

## Why an interactive artifact beats a static PDF

A flat document can list "poor design" and "good design" bullet points, but it cannot make the reader feel the branch point — the exact second where a well-built system admits uncertainty and a poorly built one presses on regardless. An interactive tool lets the reader pick their own outage type (the one most relevant to their business or their current vendor conversation), see both timelines rendered as a sequence rather than a wall of text, and optionally plug in their own weekly call volume to turn "an outage can go unnoticed" from an abstract warning into a specific, own-number estimate. None of that works as well flattened onto a page a reader skims once.

## Inputs

1. **Which outage do you want to explore?** (required, radio): The calendar or booking system is not responding / The caller's own connection is poor / The AI vendor's own platform is down.
2. **Roughly how many calls do you get per week?** (optional, number field): used only to compute the illustrative impact estimate; left blank, the impact estimate section simply does not render.

## Decision logic

See `artifact-data.json` for the full data. There is no branching calculation beyond a direct lookup: the selected `outageType` id selects one `scenarios` entry, which carries a fixed `context` sentence, a `poorTimeline` (5–6 time-stamped steps), a `goodTimeline` (5–6 time-stamped steps) and a one-line `takeaway`. Render the two timelines side by side (or stacked on mobile) under shared time labels where they align, so the moment they diverge — always the "does it admit uncertainty and defer, or guess and proceed" step — is visually obvious.

If `weeklyCallVolume` is provided and greater than zero, compute `Math.round(weeklyCallVolume / 45)` using the fixed `impactEstimate.assumedBusinessHoursPerWeek` value (45) from the data file, and render it as "an undetected one-hour outage during business hours could affect roughly N calls" alongside the `formulaDescription` text, which must always be shown next to the number so it is never mistaken for a measured statistic. Do not invent a different assumption or hide the 45-hour figure — it must always be visible, not buried in a tooltip.

## Outputs

- The scenario's `context` sentence, shown once above both timelines.
- Two labelled timelines ("Poor design" / "Good design"), each rendered as an ordered sequence of time-stamped steps, not a paragraph.
- The scenario's `takeaway` line, shown below both timelines.
- The impact estimate, only if a call volume was entered, with its assumption text always visible alongside the number.
- The `weissmannNote`, shown once, low-key, near the bottom.
- The persistent `disclaimer`.
- A link back to the full article.

## Error states

- If no outage type has been selected, show a neutral placeholder ("Choose a scenario above to see both timelines") instead of an empty or broken panel.
- If the call-volume field is left blank, zero, or non-numeric, simply omit the impact-estimate block — never show an error message or a broken calculation for an optional field.
- If a negative or absurd number is entered (e.g. more calls per week than minutes in a week), silently clamp the impact estimate calculation to a sane range rather than displaying a nonsensical result, and do not block the rest of the tool.

## Privacy considerations

All computation happens client-side in the browser. No data — including any typed call-volume number — is transmitted, stored, or sent to any server or analytics endpoint. State this explicitly in a small, persistent footer note.

## Accessibility requirements

The outage-type radio group is wrapped in `<fieldset>`/`<legend>`; all controls are keyboard-operable with a visible focus state. Each timeline renders as a real ordered list (`<ol>`), not styled `div`s, so screen readers can step through "Poor design" and "Good design" independently and in order. The two timelines must not rely on colour alone to distinguish poor from good — label each column explicitly in text, and consider a "worse outcome" / "better outcome" textual marker at the final step of each, not just a colour cue. The impact-estimate number and its assumption text must be programmatically associated (e.g. `aria-describedby`) so screen-reader users hear the assumption alongside the figure, not just the number.

## Mobile behaviour

Single-column layout: the outage-type selector first, then the two timelines stacked vertically (poor above good, both full-width) rather than side-by-side columns, since two narrow columns of time-stamped text do not work at phone width. Each timeline step should read as a compact, tappable-height list item. The impact-estimate input and result sit directly below the timelines on the same scroll.

## CTA

One contextual, secondary link at the bottom: "Stress-test the assistant's fallback behaviour yourself (CHF 350, one-time)" → `/en/services/ai-phone-assistant/`. Shown once, not repeated per scenario, no urgency language — consistent with the article's own CTA and the master prompt's promotion rules.

## Disclaimer

"This simulator illustrates the difference between well-designed and poorly-designed fallback behaviour, based on general reliability-engineering practice (timeouts, fail-open channels, fail-closed actions, independent fallback paths). The timings shown are illustrative, not measured figures, and the scenarios do not describe the actual behaviour of any specific vendor's system, including Weissmann's, unless explicitly stated as a documented fact. It is not a technical guarantee or a substitute for a written answer from your vendor. Correct as of 29 July 2026." Shown persistently below the result, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Two clearly differentiated timeline columns/blocks — plain ordered lists with time labels, not decorative flowchart graphics, animated countdowns, or a gamified score. The only visual emphasis reserved is on the single step in each timeline where the two designs diverge (e.g. a subtle left-border accent), so the reader's eye finds the actual decision point without needing extra graphics. No fake precision in the impact-estimate number — render it as a plain sentence, not a large dashboard-style statistic.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in English called "Resilience and Fallback Scenario Simulator". Ask the user to choose one outage scenario (required, radio): "The calendar or booking system is not responding" / "The caller's own connection is poor" / "The AI vendor's own platform is down". Also offer an optional number field: "Roughly how many calls do you get per week?" Using only the fixed data in the accompanying `artifact-data.json` (do not invent new scenarios, steps, numbers or facts — use exactly the `scenarios`, `impactEstimate`, `weissmannNote` and `disclaimer` fields provided), render for the chosen scenario: its `context` sentence, then two labelled, time-stamped timelines side by side on desktop and stacked on mobile — "Poor design" using `poorTimeline` and "Good design" using `goodTimeline` — each as a real ordered list of time-stamped steps, then the scenario's `takeaway` line. If a call-volume number greater than zero was entered, compute `Math.round(weeklyCallVolume / 45)` and show it as "an undetected one-hour outage during business hours could affect roughly N calls," always displaying the `impactEstimate.formulaDescription` text next to the number so it reads as a transparent estimate from the reader's own input, never as a measured statistic; if the field is empty, simply omit this block without an error. If no scenario is chosen yet, show a neutral placeholder instead of an empty panel. Show the `weissmannNote` once, low-key, near the bottom, and the full `disclaimer` text persistently below the result. Everything must run client-side with zero network calls and zero data collection — state this in a small footer note. Make all controls keyboard-accessible with visible focus states, use real `<ol>` list markup for each timeline (not styled divs) so screen readers can navigate them independently, label each timeline explicitly in text rather than relying on colour alone to distinguish "poor" from "good," and associate the impact-estimate number with its assumption text via `aria-describedby`. End the panel with one plain secondary link, "Stress-test the assistant's fallback behaviour yourself (CHF 350, one-time)," pointing to weissmann.ai/en/services/ai-phone-assistant/ — no urgency language, no repeated CTAs. Style it cleanly and honestly: two plain timeline lists with a subtle visual marker only at the step where the two designs diverge, no decorative flowchart graphics, no countdown animation, no gamified scoring, no oversized "statistic" styling on the impact-estimate number.
