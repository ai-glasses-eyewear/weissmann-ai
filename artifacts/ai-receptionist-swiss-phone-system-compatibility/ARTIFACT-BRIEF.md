# Artifact Brief — Phone-System Compatibility and Migration Planner

**Article:** `ai-receptionist-swiss-phone-system-compatibility` ("Will an AI Receptionist Work With My Existing Swiss Phone System?")
**Language:** English (en) — the article and artifact both exist in English only.
**Artifact type:** Branching diagnostic planner with a dual-owner checklist output (distinct mechanic from the German `keep-existing-swiss-number-ai-assistant` Mapper, which outputs one merged checklist; this tool deliberately keeps two separate lists because the article's thesis is that two different parties — telecom provider and AI vendor — must each be asked their own half of the question).

## User problem

The article's central claim is that "does an AI receptionist work with our phone system" is not one fact but two: what infrastructure the reader has (mobile forwarding, landline forwarding, on-premise PBX, PBX with a SIP trunk, or Teams-based cloud telephony), and what integration method their specific AI vendor supports. A reader who has finished the article still has to work out which of five scenarios applies to them and assemble two separate question lists by hand. The Planner does that mapping automatically: a couple of short questions in, the reader gets their scenario explained in plain language, plus a ready-to-use question list for their telecom provider and a separate one for their AI vendor.

## Audience

Same as the article: an English-speaking decision-maker at a Swiss or internationally-run company in Zürich, Zug, Basel, Geneva or elsewhere, who is not a telecom specialist, is evaluating one or more AI receptionist vendors, and wants to walk into a vendor or IT conversation already knowing which questions matter for their exact setup.

## Why an interactive artifact beats a static PDF

The right output depends on up to three sequential inputs (setup type, then a conditional SIP-trunk or Teams-connection follow-up), and the same underlying facts must be split into two independently useful lists, not one. A static one-pager would either show all five scenarios and both full checklists at once, which buries the two or three questions that actually apply to the reader, or force the reader to self-navigate a branching document, which is error-prone. An interactive tool asks the branching questions once, shows only the relevant scenario and its two checklists, and can drop in the reader's own provider name — none of which a flat document can do.

## Inputs

1. **How do calls currently reach your business?** (required, radio): Mobile number only / Landline number / On-premise PBX / Microsoft Teams-based (cloud telephony) / I don't know.
2. **Does that PBX already connect to the outside world via a SIP trunk?** (required only if PBX was selected; radio): Yes / No, a traditional line / Not sure — with a one-line plain-English explanation of what a SIP trunk is, since many readers won't know.
3. **How is your Teams calling connected to the phone network?** (optional, shown only if Teams was selected; radio): Operator Connect / Direct Routing / Not sure — with a help line pointing the reader to whoever manages their Microsoft 365 tenant.
4. **Do you know your current telecom provider?** (optional, radio): Yes (reveals a text field for the provider name, used to personalize the output, e.g. "Ask Swisscom: …") / No (shown a short tip instead of a dead end).
5. **We are planning a change to our phone system in the next 12 months** (optional checkbox) — appends a migration-specific note, directly operationalizing the article's warning that a future infrastructure change requires re-asking the same questions, not a one-off setup step.

## Decision logic

See `artifact-data.json` for the full data. Matching order (first match wins) using inputs 1–2:

1. `currentSetup = mobile` → path `mobile`.
2. `currentSetup = landline` → path `landline`.
3. `currentSetup = pbx` AND `pbxHasSipTrunk = yes` → path `pbx-sip`.
4. `currentSetup = pbx` AND `pbxHasSipTrunk` is `no` or `unknown` → path `pbx-nosip`.
5. `currentSetup = teams` → path `teams` (the `teamsConnectionType` answer, if given, personalizes one line of the output text but does not change which path renders — all Teams setups get the same two checklists, since the reader needs to establish Operator Connect vs. Direct Routing as part of the answer, not before it).
6. `currentSetup = unknown` → do not render a scenario path at all. Instead render `unknownSetupGuidance` (three plain tips for finding out, plus a short two-item generic checklist) so the reader always leaves with something actionable, never a dead end.

Each path object carries a fixed `label`, `explanation`, `telecomChecklist` (3 items), `vendorChecklist` (3 items) and `goWrong` one-liner — all phrased consistently with the article body, not freshly invented. If `providerKnown = yes` and a name was typed, substitute it into the `telecomChecklist` items' generic "our provider" phrasing where grammatically sensible (simple string substitution, not a sentence rewrite). If `planningToMigrate` is checked, append the `migrationAddendum` block after the two checklists, regardless of which path was selected.

## Outputs

- A scenario label ("Your path: …") and one short explanation paragraph.
- Two clearly separated, real, copyable checklists: "Questions for your telecom provider" and "Questions for your AI vendor" — the reader should be able to select and paste either one into an email.
- One "what can go wrong" line specific to the scenario.
- The migration addendum, if the reader checked that box.
- The `weissmannNote`, shown once, low-key, near the bottom — the same honesty check the article applies to itself, not a sales pitch.
- The persistent disclaimer (see below).
- A link back to the full article for readers who want the reasoning behind a scenario, not just the checklist.

## Error states

- If question 1 has not been answered, show a neutral placeholder ("Answer the first question to see your path") instead of an empty or broken result panel.
- If PBX is selected but the SIP-trunk question is left unanswered, still render the `pbx-nosip` path (treating "unanswered" the same as "not sure") rather than blocking the result — the explanation text for that path already tells the reader why finding out matters.
- If `currentSetup = unknown`, never show an error: render the `unknownSetupGuidance` block, which is a first-class output, not a fallback message.
- If `providerKnown = yes` but the text field is left empty, fall back silently to generic "your provider" phrasing rather than leaving a blank gap in a sentence.

## Privacy considerations

All computation happens client-side in the browser. No data — including any typed provider name — is transmitted, stored, or sent to any server or analytics endpoint. State this explicitly in a small, persistent footer note, matching the honesty standard the article itself sets.

## Accessibility requirements

Radio groups wrapped in `<fieldset>`/`<legend>` using each input's `label` text; all controls keyboard-operable with a visible focus state; the result panel uses real heading and list markup (not styled `div`s) so screen readers can navigate scenario label → explanation → telecom checklist → vendor checklist → what-can-go-wrong in order; no information conveyed by colour alone; the conditional second/third question is announced (e.g. via `aria-live="polite"`) when it appears after question 1 changes.

## Mobile behaviour

Single-column stacked layout; radio/checkbox targets sized for touch (minimum ~44px); the result panel appears directly below the questions on the same scroll, not a separate tab or hidden panel, so a phone user does not have to jump between questions and answer.

## CTA

One contextual, secondary link at the bottom of the result panel: "Free consultation: we'll map your setup before you commit to anything" → `/en/kontakt/`. Not repeated per scenario, no urgency language, consistent with the article's own CTA and the master prompt's promotion rules (no fake scarcity, no forced pitch).

## Disclaimer

"This planner summarises publicly available information from Swisscom, Sunrise and Weissmann AI's own published service pages, correct as of 29 July 2026. It is not technical or legal advice and does not replace written confirmation from your telecom provider or your AI vendor; products, features and terms can change." Shown persistently below the result, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale) — a plain, form-first layout: questions at the top, one clearly delineated result card below, with the two checklists visually distinguished (e.g. two side-by-side or stacked cards with different labels, "Ask your telecom provider" / "Ask your AI vendor") so the article's two-different-owners thesis is visible in the layout itself, not just the copy. No decorative flowchart graphics, no gamified progress wheel, no fake-precision scoring.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in English called "Phone-System Compatibility and Migration Planner". Ask the user: (1) "How do calls currently reach your business?" — Mobile number only / Landline number / On-premise PBX / Microsoft Teams-based (cloud telephony) / I don't know (radio, required). (2) If "On-premise PBX" was chosen, ask "Does that PBX already connect to the outside world via a SIP trunk?" — Yes / No, a traditional line / Not sure (radio, with a one-line plain-English explanation of what a SIP trunk is). (3) If "Microsoft Teams-based" was chosen, ask "How is your Teams calling connected to the phone network?" — Operator Connect / Direct Routing / Not sure (radio, optional, with a help line about asking whoever manages the Microsoft 365 tenant). (4) "Do you know your current telecom provider?" — Yes (reveals a text field for the provider name, used to personalize output text) / No (shows a short tip instead of blocking). (5) An optional checkbox: "We are planning a change to our phone system in the next 12 months." Using the fixed data and matching rules in the accompanying `artifact-data.json` (do not invent new paths, questions or facts — use exactly the `paths`, `unknownSetupGuidance`, `migrationAddendum`, `weissmannNote` and `disclaimer` fields provided), determine which of the five scenarios (`mobile`, `landline`, `pbx-nosip`, `pbx-sip`, `teams`) applies from questions 1–2, or render `unknownSetupGuidance` if the reader chose "I don't know". Render: a scenario label, one explanation paragraph, two separately labelled, copyable checklists ("Ask your telecom provider" and "Ask your AI vendor"), a short "what can go wrong" line, the migration addendum if the checkbox is checked, the Weissmann honesty note, and the persistent disclaimer text. If provider name was supplied, personalize the generic "your provider" phrasing in the telecom checklist with the typed name. Never show a blocked or broken state — "I don't know" is a first-class answer with its own useful output, not an error. Everything must run client-side with zero network calls and zero data collection — state this in a small footer note. Make all controls keyboard-accessible with visible focus states and real semantic list/heading markup for the result, and announce newly revealed conditional questions to screen readers. Use a single-column, touch-friendly mobile layout, with the two checklists visually distinguished from each other. End the result panel with one plain secondary link, "Free consultation: we'll map your setup before you commit to anything", pointing to weissmann.ai/en/kontakt/ — no urgency language, no repeated CTAs. Style it cleanly and honestly: a plain form and a plain result card, no decorative flowchart graphics or gamified scoring.
