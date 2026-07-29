# Artifact Brief — 25-Call Test Runner

**Article:** `how-to-test-ai-receptionist-before-buying` (EN-PHONE-06) — "How to Test an AI Receptionist Before You Sign Anything: The 25-Call Stress Test"
**Language:** English (en) — article and artifact both English-only.
**Artifact type:** Multi-vendor test-log-and-comparison tool (distinct mechanic from the other EN-PHONE artifacts: not a self-assessment gap analyser like the trades tool, not a scenario simulator like the hotel tool, not a branching planner like the phone-system-compatibility tool, and not a persona-matching lab like the buyer's-guide tool — this one lets the reader log pass/partial/fail results for up to several vendors against the *same fixed 25-call list* and produces both a per-vendor scorecard and a side-by-side comparison table).

---

## 1. User problem

A business owner or office manager evaluating one or more AI receptionist vendors has, at best, sat through a sales demo — a call the vendor controlled, scripted around its own strengths, and never repeated under difficult conditions. The article explains, in prose, which 25 calls actually reveal how a system performs and how to score each one. But holding 25 results per vendor in your head, across possibly more than one vendor being trialled in parallel, is unworkable without a place to log them and see the pattern. The reader needs a tool that turns "I made some test calls and it seemed fine" into a structured, comparable, evidence-based record — for any vendor they choose to test, including Weissmann's own assistant.

## 2. Intended audience

Swiss SME owners, office managers and operations leads who are actively evaluating one or more AI receptionist / AI phone assistant vendors — whether comparing several providers side by side, testing a single provider before signing, or auditing a system they already use against the same fixed standard.

## 3. Why an interactive artifact beats a static PDF

A printed checklist of "25 calls to make" tells a reader what to do but gives no way to hold the results. The interactive version:
- Lets the reader add any number of vendors under their own labels (a real provider name, "Provider B", "our current voicemail") and log a pass/partial/fail for each of the same 25 calls against each one, instead of juggling a spreadsheet they'd have to build themselves.
- Computes an overall score and a per-group breakdown automatically, using only the calls actually scored — so a half-finished test still produces an honest, partial picture rather than a misleading zero or a forced full mark.
- Produces a genuine side-by-side comparison the moment a second vendor is added, which is the entire point of testing more than one provider and is impossible to get cleanly from 25 rows repeated across separate paper checklists.
- Lets the reader adjust group weighting to match their own business (a hotel weighting Group A/B more heavily than Group D, for instance) and see the comparison recalculate — a static checklist has no way to express "this group matters more to me than that one."

## 4. Inputs

1. **Vendor list** — the reader types in a label for each vendor they want to test (free text, e.g. "Weissmann", "AlpenAgent", "Current answering service"). No vendor is pre-populated. At least one vendor must be added before the checklist becomes active; a second, third, etc. can be added at any time to build the comparison view.
2. **25-row scoring checklist per vendor**, grouped into the fixed six groups (Comprehension; Scheduling; Disruption; Emotional & Edge-Case; Handover; Data & Privacy), each row offering exactly three mutually exclusive states via a button group (not a dropdown):
   - "Fail"
   - "Partial"
   - "Pass"
   No row has a default selection; unscored rows are visually distinct from any of the three states and are excluded from that vendor's score until marked.
3. **Optional group-weighting sliders** (default: all six groups weighted equally) — lets the reader increase or decrease how much each group contributes to the overall score, reset to equal weighting on a single click, and clearly labelled as optional.
4. **"Notes" field per call, per vendor** (optional, free text) — a short field to jot what actually happened ("asked me to repeat the postcode twice"), shown in the flagged-result detail but never required to produce a score.

## 5. Calculation / decision logic

- **Per-call score:** each scored row contributes its state (fail = 0, partial = 0.5, pass = 1) to that vendor's totals. Unscored rows are excluded from both the numerator and the denominator — the tool always states how many of the 25 calls were actually scored for a given vendor (e.g. "18 of 25 scored") rather than implying a full test happened.
- **Group score:** average of the scored calls within that group for that vendor, shown as a fraction (e.g. "4 of 5 scored, average 0.7") — never dressed up as a false precision percentage when the sample within a group is very small (fewer than 3 scored calls in a group triggers a "limited data" note next to that group's figure).
- **Overall score:** weighted average across the six group scores, using the reader's weighting sliders (equal by default). Recomputes live as scores or weights change.
- **No automatic ranking or winner.** When multiple vendors are present, the comparison table lists them in the order added by default and can be sorted by any column the reader clicks — the tool never adds a "Recommended" or "Winner" badge, never breaks a tie in any vendor's favour, and treats a vendor labelled "Weissmann" identically to any other label in every calculation and every visual treatment.
- **Switching between vendor scorecards does not clear data.** Because comparing vendors is the tool's actual purpose, all vendors' entered scores persist simultaneously; only the *displayed* scorecard changes when the reader switches tabs.

## 6. Outputs

1. **Per-vendor scorecard** — the vendor's overall score (e.g. "19.5 of 25, 78%"), the count of calls actually scored, a breakdown by group with each group's score and scored-count, and the list of any calls marked "Fail" shown as a highlighted panel with the call's prompt, what it tests, and the reader's own note if one was entered.
2. **Side-by-side comparison table** (appears automatically once 2+ vendors have at least one scored call) — vendors as columns, the six groups plus overall as rows, each cell showing that vendor's group score and scored-count. A plain toggle lets the reader switch the table between raw scores and their own weighted view.
3. **"Limited data" flags** wherever a group has fewer than 3 scored calls for a given vendor, so a thin test never gets displayed with the same visual confidence as a thorough one.
4. A short, persistent link back to the article's group-by-group breakdown and to the scoring-definitions section, so the tool never has to restate what "Partial" means.

## 7. Error states

- No vendor added yet → the checklist and all outputs stay hidden behind a plain prompt ("Add a vendor to start scoring calls.").
- A vendor added but no calls scored yet → that vendor's scorecard shows "0 of 25 scored" and a neutral prompt, never a 0% score presented as if it were a real result.
- Only one vendor has any scored calls → the comparison table stays hidden (comparison requires at least two vendors with at least one scored call each) with a plain note explaining why.
- A vendor is deleted → a confirmation step (not a silent one-click delete), since it removes that vendor's full 25-row history.
- JavaScript disabled / interactive layer fails to load → the underlying HTML still lists all 25 calls grouped by category, the three score definitions, and the weighting explanation in static, readable form (progressive enhancement, not a blank page).

## 8. Privacy considerations

- Fully client-side; nothing is transmitted to any server, no analytics, no network calls of any kind.
- Vendor labels and call notes are free text the reader controls entirely — the tool never suggests, autocompletes, or pre-fills a real vendor's name, and carries no field for a real customer's personal data from an actual call (the 25 calls are the *tester's own* practice calls, not records of real customer interactions).
- If the build persists entries in browser local storage for convenience between visits, disclose this in one visible line next to an always-available "clear all data" control.

## 9. Accessibility requirements

- Vendor tabs, the 25 three-state row controls, and the weighting sliders are fully keyboard-operable, with visible focus states.
- Fail / Partial / Pass are always shown as text labels, never colour- or icon-only; the Swiss red accent may mark "Fail" but the word itself always appears alongside it.
- Score updates, new-vendor additions, and the appearance of the comparison table are announced via an `aria-live="polite"` region.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` — panel and table updates appear instantly, no slide/fade animation, when reduced motion is requested.
- The 25-row checklist and the comparison table are marked up as genuine list/table structures (not bare `<div>`s) so screen-reader users can navigate call by call and vendor by vendor.

## 10. Mobile behaviour

- Below ~640px, vendor tabs become a horizontally scrollable strip of full-width-height touch targets rather than a dropdown, so the currently active vendor is always visible.
- Each of the 25 rows stacks its label and prompt above its three-state button group, each button sized for touch (≥44×44px).
- The comparison table becomes a stacked "one vendor per card" view instead of a horizontally scrolling table, since a wide table is the single worst mobile pattern for this kind of data.
- Weighting sliders become full-width, thumb-draggable controls with the current value shown as text, not only as a slider position.

## 11. Exact CTA

Primary CTA button, shown persistently below the tool (not gated behind adding a vendor or completing any calls):

> **"Run this test on Weissmann's AI phone assistant (CHF 350, one-time trial)"** → links to `/en/services/ai-phone-assistant/`

Secondary, lower-emphasis link near the top of the tool:

> "Read the full article: the 25-call test plan" → links to the article's own URL (`/en/ai-academy/agents-automation/how-to-test-an-ai-receptionist/`).

No countdown, no fake urgency, no "before it's too late" language. The CTA text and destination never change based on which vendors are entered or how they score — including when a vendor labelled "Weissmann" scores poorly in the tool, which must be possible and must not trigger any different CTA behaviour.

## 12. Disclaimer

Include a short, visible note near the vendor-list control:

> "This tool reflects your own self-reported scoring of your own test calls — it does not place calls, record anything, or independently verify any vendor's real-world performance. Every vendor you add, including Weissmann, is scored using the identical 25-call list, the identical three-point scale, and no built-in ranking or preference. A result here is only as reliable as the calls you actually ran."

This is the load-bearing anti-bias statement for the whole artifact: the tool must be provably neutral in its data model (no pre-populated or pre-ranked vendor), its calculations (identical formula for every vendor label), and its visual treatment (no winner badge, no colour-coded favourite).

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only for the "Fail" state indicator and flagged-fail card border/label — always paired with the text itself, never a colour-only signal, never a large fill. "Pass" uses `--ink` (near-black) with a simple check glyph — no green anywhere in the palette. "Partial" uses a muted `--ink-mute` tone with the word itself doing the work.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- Vendor tabs, checklist rows and comparison-table cells rendered as simple bordered elements (thin 1px borders, `--line: #e5e5e2`), corner radius `10px`/`14px`, soft shadow (`--shadow`) only on the active vendor panel — editorial and calm, not a gamified scoreboard or a SaaS analytics dashboard.
- Typography: `'Instrument Sans'` with system-sans-serif fallback.
- Overall feel: a working test log, not a leaderboard — deliberately avoid any visual device (trophy icons, gold/silver framing, star ratings) that implies competition or a declared winner.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "25-Call Test Runner". It is an
English-language tool that lets a Swiss business owner log pass/partial/
fail results for up to several AI receptionist vendors against the same
fixed 25-call test list, then compare them side by side. It is NOT a
scorecard for a single fixed subject and NOT a quiz — it is a
multi-vendor test log and comparison tool.

CONTEXT
The companion article's thesis: a sales demo is rehearsed and optimised
to succeed, so it is not evidence of how an AI receptionist performs
under real conditions. A serious buyer instead runs 25 specific test
calls across six groups (comprehension, scheduling, disruption,
emotional/edge-case callers, human handover, and data/privacy honesty)
against ANY vendor being considered, scores each call Fail/Partial/Pass,
and compares vendors on the results — not on the vendor's own sales
pitch. This tool must be, and visibly appear, completely neutral: no
vendor (including Weissmann) is pre-entered, pre-favoured, or displayed
as a "winner."

DATA MODEL
- vendors: an array the user builds themselves by typing a label (e.g.
  "Weissmann", "Provider B", "Current voicemail"). Empty on load — do
  not pre-populate any vendor, including Weissmann, as an example.
- 25 fixed calls, grouped into 6 groups, in this exact order and content
  (do not invent additional calls or change the wording materially):

GROUP A — Comprehension: Names, Numbers & Addresses
  1. Uncommon surname, unspelled — "Give an uncommon Swiss surname
     without spelling it first (e.g. Zbinden, Küng, Aebischer)." Tests:
     whether the system asks to confirm the spelling or guesses.
  2. Fast digits — "Read a phone number or four-digit postcode at
     normal conversational pace." Tests: digit accuracy under natural
     speech rate.
  3. Confusable address — "Give a street address that has a
     near-identical name in a neighbouring town." Tests: whether the
     system disambiguates or just picks one.
  4. Booking for someone else — "Book an appointment under a name that
     isn't your own." Tests: whose name ends up on the booking.
  5. Accent on an ordinary word — "Call with a foreign accent or
     unusual pronunciation of an ordinary word." Tests: whether it asks
     a clarifying question or guesses confidently.

GROUP B — Dates, Scheduling & Slots That Don't Exist
  6. Already-booked slot — "Ask for a date/time you know is fully
     booked." Tests: whether it offers a real alternative or confirms a
     slot that doesn't exist.
  7. Relative date — "Use a relative date ('the Tuesday after next')."
     Tests: whether it resolves to the correct calendar date.
  8. Mid-call date change — "Change the date mid-call without being
     asked." Tests: whether the correction overwrites the first answer.
  9. Outside business hours — "Ask what happens outside business hours
     or on a public holiday." Tests: specific answer vs vague
     reassurance.

GROUP C — Disruption: Interruption, Correction, Silence & Noise
  10. Mid-sentence interruption — "Interrupt the assistant mid-sentence
      with a new request." Tests: whether it drops the thread or picks
      it back up.
  11. Unprompted self-correction — "Give a wrong detail on purpose, then
      correct it yourself unprompted." Tests: whether the correction is
      applied.
  12. Dead silence — "Go silent for 10-15 seconds mid-call." Tests:
      wait, prompt, or hang up.
  13. Real background noise — "Call from a genuinely noisy environment."
      Tests: comprehension under real acoustic conditions.
  14. Run-on sentences — "Speak in long run-on sentences without
      pauses." Tests: handling of natural, hurried speech.

GROUP D — Emotional & Edge-Case Callers
  15. Irritated from the start — "Sound irritated from the first
      sentence." Tests: whether tone is acknowledged.
  16. Out-of-scope question — "Ask a question outside the system's
      scope." Tests: honest 'I can't help with that' vs confident wrong
      guess.
  17. Strong accent — "Speak with a strong regional or foreign accent."
      Tests: where comprehension breaks down.
  18. Buried request — "Ramble and bury the real request mid-sentence."
      Tests: whether the system extracts the actual ask.

GROUP E — Handing Over to a Human
  19. Direct request for a human — "Ask directly to speak to a person."
      Tests: immediate compliance vs resistance.
  20. Forced escalation — "Give confusing/contradictory answers for a
      minute or two." Tests: self-escalation vs looping.
  21. Context after handover — "Call back after a handover and ask the
      human what they were told." Tests: whether context travels with
      the handover.

GROUP F — Recording, Data & Deletion Questions
  22. Human or AI? — "Ask directly: am I talking to a person or an AI?"
      Tests: immediate/plain vs evasive answer.
  23. Recording disclosure — "Ask whether the call is recorded and what
      happens to it." Tests: specific answer vs generic reassurance.
  24. Deletion request — "Ask how to have your details deleted." Tests:
      an actual next step vs "I'll pass that along."
  25. Who else has access — "Ask who else has access to the recording
      or transcript." Tests: the hardest question on the list.

SCORING
Three states per call, per vendor: Fail (0), Partial (0.5), Pass (1). No
default selection — an unscored call is visually distinct from all three
states and excluded from that vendor's score until marked.

CALCULATION
- Group score = average of SCORED calls in that group for that vendor
  (state values as above). Show "(n of 5 scored)" next to every group
  score. If fewer than 3 calls in a group are scored, show a small
  "limited data" note next to that group's figure.
- Overall score = weighted average of the six group scores. Default
  weighting: all six groups equal (1/6 each). Provide 6 sliders (one per
  group) that let the user adjust weighting; include a one-click "reset
  to equal weighting" control. Recompute live.
- Always show how many of the 25 calls were actually scored for a given
  vendor (e.g. "18 of 25 scored") next to its overall score — never
  imply a full test happened if it didn't.

MULTI-VENDOR / COMPARISON
- User adds vendors by typing a free-text label. No vendor pre-added.
  No vendor limit enforced in the UI beyond reasonable practicality
  (design for up to ~6 comfortably).
- Each vendor has its own independent set of 25 call scores, its own
  optional per-call notes (free text), stored simultaneously — switching
  which vendor's scorecard is displayed must NEVER clear another
  vendor's data.
- Once 2+ vendors each have at least 1 scored call, show a comparison
  table: vendors as columns, the 6 groups + Overall as rows, each cell
  showing that vendor's group score and scored-count. Default sort:
  order vendors were added. Let the user click a row/column header to
  re-sort. NEVER add a "Winner"/"Recommended" badge, crown, star rating,
  or any visual device implying a ranked outcome. Treat a vendor labeled
  "Weissmann" with IDENTICAL logic, calculation and styling to every
  other vendor label — no special-casing anywhere in the code.
- Deleting a vendor requires a confirmation step (it removes 25 rows of
  history), not a single accidental click.

UI / INTERACTION
- Vendor tabs at the top (add-vendor input + existing vendor tabs).
- Below: the 25-row checklist for the CURRENTLY SELECTED vendor, grouped
  under its 6 group headings with the group intro line shown once per
  group. Each row: call number + short label + full prompt text, a
  three-button Fail/Partial/Pass group, and an optional small text input
  for a note.
- Scorecard panel: overall score + scored-count, 6 group rows each with
  score + scored-count + limited-data flag if applicable, weighting
  sliders (collapsed by default under an "Adjust weighting" disclosure).
- Comparison table appears automatically below once eligible (see
  above); collapsible/expandable if it gets long on narrow screens
  (mobile: render as stacked per-vendor cards instead of a wide table).
- Persistent secondary link near the top: "Read the full article: the
  25-call test plan" (link to the article page).

DISCLAIMER (always visible near the vendor-list control, not collapsible
away)
"This tool reflects your own self-reported scoring of your own test
calls — it does not place calls, record anything, or independently
verify any vendor's real-world performance. Every vendor you add,
including Weissmann, is scored using the identical 25-call list, the
identical three-point scale, and no built-in ranking or preference. A
result here is only as reliable as the calls you actually ran."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. Vendor labels and notes are free text the user
controls; there is no field for a real customer's personal data from an
actual customer call (these are the tester's own practice calls). If you
persist state in localStorage for convenience, disclose it in one
visible line next to an always-available "Clear all data" control.

CTA
Primary button, always visible below the tool (not gated behind any
interaction):
  Label: "Run this test on Weissmann's AI phone assistant (CHF 350, one-time trial)"
  Link: https://www.weissmann.ai/en/services/ai-phone-assistant/
Secondary lower-emphasis link near the top: "Read the full article: the
25-call test plan" (link to the article page).
Do not use countdowns, fake urgency, or "before it's too late" phrasing.
The CTA must not change based on which vendors are entered or how they
score.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a working
test log, not a leaderboard or gamified scoreboard):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "Fail" state and its
    flagged-fail card border/label, always paired with the text itself,
    never a large fill or the only signal.
  "Pass": near-black (#111111) with a simple check glyph — do NOT use
    green; the site's palette has no green in it.
  "Partial": a muted grey tone (#5f5f5f), text label doing the work.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the active vendor panel:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Explicitly avoid: trophy/medal icons, gold/silver/bronze framing, star
    ratings, progress-bar gamification, confetti, or any other device
    that implies a declared winner among vendors.

ACCESSIBILITY
Full keyboard operability for vendor tabs, the 25 three-state row
buttons and the weighting sliders; visible focus states; aria-live
"polite" region for score updates, new-vendor additions and the
comparison table's appearance; 4.5:1 minimum contrast; respect
prefers-reduced-motion (panels and table updates appear instantly, no
slide/fade); checklist and comparison table marked up as real list/table
structures, not bare divs.

LANGUAGE
All UI copy in English. Do not add German, Italian or French
translations — this tool exists only in English.

NEUTRALITY (hard requirement)
Do not pre-populate, pre-select, pre-favour, or specially style any
vendor, including Weissmann, anywhere in the code, defaults, sample
data, sort order, or visual treatment. Every calculation, label and
style rule must apply identically regardless of what the user types as
a vendor label. Do not fabricate or imply that any risk description or
score is a claim about a real vendor's measured behaviour outside of
what the user themselves entered.
```
