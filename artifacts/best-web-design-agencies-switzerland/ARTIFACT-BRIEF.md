# Artifact Brief — Swiss Agency Due-Diligence Workspace

**Article:** `best-web-design-agencies-switzerland` ("Best Web Design Agency in Switzerland: A Buyer Guide")
**Language:** English (en) — the article and artifact both exist in English only.
**Artifact type:** Structured due-diligence workspace organised by buying-journey stage (initial call, proposal review, reference check, contract review), with user-supplied agency data. This is deliberately **not** a weighted scorecard or a numeric ranking — that mechanic already exists on the German sibling article (`webagentur-schweiz-vergleichen`), which scores 7 flat criteria and produces a ranked, weighted total. This artifact instead produces a stage-by-stage audit trail with no single "winner" score.

## User problem

A reader comparing two or three real web design agency candidates has no consistent way to record what was actually said or written at each step of the buying process — the initial call, the written proposal, reference conversations, the contract — and tends to fall back on overall gut feeling from the sales meeting. The article's four-stage framework only becomes useful once it is actually applied to real candidates; this workspace is where that application happens.

## Audience

A Swiss SME owner, manager or international founder currently in conversation with, or reviewing proposals from, two or three real web design agencies, reading in English.

## Why an interactive artifact beats a static PDF

A static checklist can be printed and ticked once, but it cannot help the reader carry findings from a phone call into a later comparison of the written proposal, and it cannot flag, on its own, when the same question got a "confirmed in writing" answer from one agency and a "vague" answer from another. An interactive workspace lets the reader log a finding the moment it happens (after the call, after reading the proposal, after the reference conversation, after reading the contract) and see the accumulated picture build stage by stage, with red flags surfaced automatically from the reader's own entries — not from a fixed dataset, because this article deliberately does not name or pre-score any real agency.

## Inputs

- Up to 3 agency slots. Each slot has a free-text **label** field the user fills in themselves (e.g. "Agency A" or the agency's real name) — no agency name is pre-populated anywhere in the tool.
- Four due-diligence **stages**, in fixed order: Initial Call, Proposal Review, Reference Check, Contract Review (from `artifact-data.json`).
- For each stage, 3 fixed **checklist items** per stage (12 total), each with a `question`, `whatGoodLooksLike` and `redFlag` reference text shown as an always-reachable inline disclosure (not hover-only).
- For each item, per agency: one **status** selection from a fixed 4-value set — "Confirmed in writing", "Answered, not in writing", "Vague or avoided", "Not asked yet" (from `artifact-data.json`'s `statusOptions`). This is a categorical status, not a 1–5 numeric score.
- One optional short free-text **note** field per item per agency (e.g. "said domain stays with them until final invoice is paid").

## Logic (structured workspace, not a weighted score)

There is no scoring formula, no weighting, and no computed ranking. The workspace's only computation is descriptive aggregation of the user's own entries:

- **Stage completion**, per agency: count of items in that stage marked with any status other than "Not asked yet" (e.g. "Contract review: 2 of 3 items recorded").
- **Red-flag count**, per agency: count of items across all 12 marked "Vague or avoided", surfaced as a running total, not folded into any single score.
- **Comparison view**: a stage-by-stage table where rows are the 12 items (grouped visually by stage) and columns are the entered agencies, each cell showing that agency's status label (and note, if present) for that item — a side-by-side audit trail the reader reads and judges themselves, not a ranked output the tool judges for them.
- No agency is ever declared the "winner." The workspace explicitly avoids producing a single number or rank, per the article's own point that a lower total on some criteria can still be the right choice depending on what the reader cares about most.

## Outputs

- A stage-by-stage workspace view (accordion or tabbed by stage: Initial Call → Proposal Review → Reference Check → Contract Review), each showing all entered agencies' statuses and notes for that stage's 3 items.
- A compact "red flags so far" panel per agency, listing only the specific items marked "Vague or avoided," each with its `redFlag` reference text attached so the reader remembers why it was flagged.
- A "how much have I actually checked" indicator per agency (stage completion counts) so a reader does not mistake "no red flags yet" for "fully vetted" when most items are still "Not asked yet."
- A persistent link back to the full article and its 12-question checklist section.

## Error states

- No agency slots filled in at all: show a prompt ("Add at least one agency to start recording notes") instead of an empty workspace.
- An item left at "Not asked yet" is never counted as a red flag and never silently treated as resolved — it must always display distinctly from both "Confirmed in writing" and "Vague or avoided," so an unanswered question is never mistaken for a clean answer.
- An agency slot has a label but no items recorded yet: show "No notes recorded yet" in the comparison view rather than a blank row that looks like a data-loading error.

## Privacy considerations

All computation and storage happen entirely client-side in the browser (component state or `localStorage` only — no network calls, no form submission, no analytics event tied to entered content). No real agency name is pre-populated anywhere in the tool or its data file — every agency label, status and note comes only from what the user types. State this explicitly in a persistent footer note, not buried in a modal.

## Accessibility requirements

All status selectors must be full keyboard-operable (e.g. a native `<select>` or a radio group, not a custom div-based dropdown) with visible focus states and proper `<label>` association; the stage-by-stage comparison view must use real table or list markup so screen readers can navigate items and agencies as rows and columns; status must be conveyed through explicit text labels, never through colour alone (a "tone" hint may add a colour accent but the label text is always present); the `whatGoodLooksLike`/`redFlag` reference text must be reachable and readable without a mouse hover, via an expandable inline disclosure (e.g. a `<details>` element or an accessible accordion), not a hover-only tooltip.

## Mobile behaviour

Single-column stacked layout on narrow viewports: one stage open at a time in an accordion, with one agency card at a time inside it and a swipe or tab control to move between the up-to-3 agencies, rather than a cramped horizontal table; status selectors and note fields sized for touch (minimum ~44px touch target); the "red flags so far" panel collapses to a small expandable summary above the stage accordion.

## CTA

Contextual only: a single secondary link near the workspace, "Read the full stage-by-stage guide," pointing back to the article, plus one small link "How Weissmann answers these same questions," pointing to `/en/services/ai-web-development/` — never a forced CTA per agency row, never phrased with urgency or scarcity.

## Disclaimer

"All notes in this workspace are entered by you and stored only in your own browser. No agency names are pre-filled, no Weissmann-specific values are hidden in the data, and nothing you type is sent anywhere. This workspace does not replace your own legal review of any contract." Shown persistently in the footer, not buried in a modal.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale) — clean, document-like and audit-trail in feel, closer to a structured notes pad than a dashboard. No progress rings, no gamified completion percentages, no "match score" badge of any kind — the whole point of this artifact, distinct from the German sibling's weighted scorecard, is that it stays a record of what was actually said rather than a computed verdict.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in English called "Swiss Agency Due-Diligence Workspace". Let the user add up to 3 agency slots, each with a free-text name field they fill in themselves (do not pre-populate any real or fictional agency name). Organise the tool around 4 fixed due-diligence stages, in this order: Initial Call, Proposal Review, Reference Check, Contract Review — each stage has exactly 3 fixed checklist questions (12 total; use the questions, "what good looks like" and "red flag" text supplied in the accompanying `artifact-data.json`). For each question, let the user pick, per agency, one of exactly 4 statuses: "Confirmed in writing", "Answered, not in writing", "Vague or avoided", "Not asked yet" — plus an optional short free-text note. Do NOT compute any weighted score, percentage or ranking, and do NOT declare a "winner" — this tool is a structured record of findings, not a scored comparison. Show, per agency: how many of the 12 items have been recorded so far (excluding "Not asked yet"), and a running list of only the items marked "Vague or avoided" with their red-flag explanation attached. Present the full comparison as a real table (rows = the 12 questions grouped visually by stage, columns = the agencies) with status shown as explicit text labels, never colour alone. Make the "what good looks like" / "red flag" reference text reachable via an always-available disclosure element (e.g. `<details>`), not a hover-only tooltip. Make every control keyboard-operable with visible focus states. Use a mobile-responsive layout: one stage open at a time in an accordion, one agency visible at a time within it with a tab or swipe control, 44px+ touch targets. Do all computation client-side with no network calls and no data leaving the browser; show a persistent footer disclaimer stating that all data is user-entered, stored locally only, and that the tool does not replace independent legal review of any contract. Add exactly two contextual links (back to the article, and to `/en/services/ai-web-development/`), no forced or urgent CTAs. Style it as a clean, document-like audit trail — no progress rings, no gamified dials, no computed "match" badge of any kind.
