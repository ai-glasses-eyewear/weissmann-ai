# Artifact Brief — Interactive Multilingual Hotel Front Desk Simulator

**Article:** `ai-receptionist-swiss-hotels` (EN-PHONE-03) — "AI Receptionists for Swiss Hotels: Bookings, Late Arrivals and Guests Who Change Language Mid-Sentence"
**Language:** English (en) — article and artifact both English-only.
**Artifact type:** Scenario walkthrough / conversation simulator (single "good path" per scenario — distinct mechanic from the German-language sibling `ai-phone-assistant-failure-handling`, which plays a bad path against a good path; this tool has no "bad" version, because its purpose is not error recovery but showing where the line to a human sits).

## 1. User problem

A hotel manager reading the article understands the theory — routine questions get answered, emergencies always go to a human — but cannot picture what that boundary actually sounds like on a live call, in more than one language, across the specific situations a hotel reception deals with daily. Vendor demos show the easy cases (booking a room) and rarely show the hard ones (a guest who switches language mid-sentence, a safety report, a refund request). This tool lets the reader walk through five concrete situations and hear, turn by turn, where the assistant answers directly and where it hands off — including the one case that must never be handled autonomously: a guest reporting something that could be an emergency.

## 2. Intended audience

Swiss hotel owners, general managers and front-office managers (independent properties and small groups) evaluating an AI receptionist for their property, plus anyone reading the article who wants to pressure-test a vendor's escalation claims before a contract is signed.

## 3. Why an interactive artifact beats a static PDF

The article's thesis is that the line between "the assistant handles it" and "a human must handle it" is the entire point, not a footnote. A static transcript can show one example; a reader skims it once and moves on. The interactive version lets the reader deliberately choose the scenario closest to a situation their own property deals with, see the full turn-by-turn exchange, and — critically — see the same escalation logic applied consistently across a routine request (parking directions), a financial request (a refund) and a safety report (smoke on a floor), which makes the underlying rule legible as a rule rather than as one isolated good example. A persistent reference panel (see Outputs) also gives the tool standalone reference value a PDF cannot easily replicate: it stays visible and answerable regardless of which scenario is open.

## 4. Inputs

- **Scenario picker** — five buttons/tabs, one per scenario: *Late arrival* (directions, parking, door code), *Language switch* (a guest who moves from English to German mid-call), *A delicate complaint* (noise, repeat issue), *A booking change* (date change plus a refund request), *A guest reports something serious* (a safety report — the required emergency-escalation demonstration). Exactly one active at a time; no default pre-selected (empty state prompts a choice).
- No other input — this is a walkthrough tool, not a calculator, and it produces no numeric score.

## 5. Calculation / decision logic

- **No score, no ranking, no numeric verdict.** Selecting a scenario loads its fixed `turns` array from `artifact-data.json`. All dialogue is pre-written and fixed — nothing is generated, randomised or personalised.
- Each turn may carry an `annotation` (a one-line explanation of why the assistant responded the way it did) and, where relevant, a `language` tag (`en`/`de`) so the UI can visibly mark the language-switch scenario's code-switching moment.
- Each scenario carries `escalates` (boolean) and, when true, an `escalationReason` key that resolves to a one-line explanation via the shared `escalationReasons` lookup in the data file — the same five reasons (serious complaint, financial decision, fire/safety hazard, medical emergency, security incident, direct human request, out-of-scope) are reused consistently rather than rewritten per scenario.
- A separate, always-visible `boundaryReference` array (7 fixed items, mirroring the article's "what must always go to a human" list) powers a persistent side or bottom panel — this does not change based on the selected scenario.

## 6. Outputs

1. A turn-by-turn transcript for the selected scenario, each turn showing speaker (*Guest* / *Assistant*), the line, and its annotation where present.
2. A clearly visible **"Escalated to a human"** badge on any scenario where `escalates: true`, naming the specific reason from `escalationReasons` — never left implicit.
3. A one-line `outcome` summary shown once the transcript has been read, stating plainly whether the case was resolved by the assistant or handed to a person and why.
4. A persistent **"What always goes to a human"** reference panel (from `boundaryReference`), visible regardless of which scenario is open — the tool's standalone-value element.
5. A visible link back to the full article.

## 7. Error states

- No scenario selected → the transcript panel stays empty with a plain prompt ("Choose a scenario to see the full call.") — a calm empty state, not an error banner.
- JavaScript disabled / artifact fails to load its interactive layer → the underlying HTML still lists all five scenario transcripts in a static, readable stacked order (progressive enhancement, not a blank page).
- No scenario currently produces an undefined or partial state — all five are fixed, complete data; there is no user-generated input that could produce an invalid combination.

## 8. Privacy considerations

- Fully client-side; nothing is transmitted to any server, no analytics, no external scripts or fonts.
- No form field ever collects a real guest name, phone number, room number or any personal detail — the tool only displays fixed example dialogue.
- A one-line note near the scenario picker states explicitly that all dialogue is a constructed illustration, not a recording or transcript of any real hotel, guest or vendor system (see Disclaimer).

## 9. Accessibility requirements

- Scenario tabs fully keyboard-operable (arrow keys or tab order), with visible focus states.
- "Escalated to a human" is never conveyed by colour alone — always paired with the badge text and the specific reason.
- Transcript reveal (if animated) appears in an `aria-live="polite"` region so screen-reader users hear updates without re-navigating.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` — no slide/fade animation when reduced motion is requested.
- Each dialogue turn is marked up as a genuine list structure (not bare `<div>`s) so screen readers can navigate turn by turn.
- The `boundaryReference` panel uses real heading/list markup so it is independently navigable, not just a decorative sidebar.

## 10. Mobile behaviour

- Scenario picker becomes a horizontally scrollable tab strip (touch-swipeable) below ~640px, rather than five buttons wrapping awkwardly.
- Transcript stacks in a single column; escalation badges wrap onto their own line rather than being clipped.
- The `boundaryReference` panel collapses to a expandable/collapsible section below the transcript on mobile (closed by default, so the transcript stays the primary focus on small screens), opened by default on desktop widths.

## 11. Exact CTA

Primary CTA, shown persistently below the transcript area (not gated behind viewing all five scenarios):

> **"See how the AI phone assistant is configured for hotels"** → links to `/en/services/ai-phone-assistant/`

Secondary, lower-emphasis link near the top of the tool:

> "Read the full article" → links to the article's own page (the academy spoke page for `ai-receptionist-swiss-hotels`).

No countdown, no fake urgency, no "before it's too late" language. CTA text and destination never change based on which scenario is open.

## 12. Disclaimer

Visible near the scenario picker at all times:

> "Every dialogue in this tool is a constructed illustration of good practice, not a recording or transcript of any real hotel, guest or vendor system, including Weissmann's. It shows how a well-designed AI receptionist should behave, not a measured result."

This prevents the tool from being mistaken for a real call recording or a benchmark of any specific vendor's actual behaviour, and keeps the emergency scenario clearly framed as a design illustration rather than a claim about what any particular system has actually done in a real crisis.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`), reusing the same token set as the sibling `ai-phone-assistant-failure-handling` artifact for visual consistency across the phone-assistant artifact family:

- Background `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text `--ink: #111111` with muted variants for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used **only** for the "Escalated to a human" badge and the `boundaryReference` panel's item markers — never as a large fill, always paired with the word "Escalated" or the reason text, never colour alone. Scenarios that resolve without escalation use `--ink` with a simple check glyph — no green (the site's palette has none).
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text), not accent-red — red is reserved for the escalation signal, not for calls to action.
- Dialogue turns rendered as simple speech-style rows (speaker label in small caps, line in quotes), not chat-bubble graphics — an annotated transcript on paper, not a messaging-app mockup.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; 1px borders (`--line: #e5e5e2`), corner radius 10px/14px, soft shadow only on the active transcript panel.
- The language-switch scenario visibly tags each turn's language (a small "EN" / "DE" label, not colour-coded) so the code-switching moment is legible at a glance.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Interactive Multilingual Hotel
Front Desk Simulator". It is an English-language walkthrough tool for
Swiss hotel owners and managers evaluating an AI receptionist for their
property — not a calculator, not a scorecard, not a ranking tool.

CONTEXT
The companion article's thesis: a hotel AI receptionist earns its value
during the ten minutes a front desk is already doing three things at
once (a coach-group check-in, two ringing phones), by answering routine
guest questions directly and handing off everything else to a human —
including, without exception, anything resembling a medical, fire or
security emergency. This tool makes that boundary concrete by playing
out five real front-desk scenarios, turn by turn, showing exactly where
the assistant answers and where it hands off, and why.

SCENARIOS (5, user picks exactly one at a time via tabs/buttons, no
default selected)

1. late-arrival — Late arrival: directions, parking, door code.
   Setup: It's 10:40 p.m., a guest calls from the car, running late.
   Guest: "Hi, I'm still about forty minutes out — is that going to be
   a problem this late?"
   Assistant: "Not at all. Check-in after 10 p.m. uses the side
   entrance on Bahnhofstrasse. I'll text you the door code once you're
   about twenty minutes away. Do you need directions to parking as
   well?" [annotation: answered directly — routine, pre-approved info]
   Guest: "Yes please, and is there space in the garage this late?"
   Assistant: "Yes, the underground garage stays open, entrance right
   next to the side door. I've noted your estimated arrival for
   reception and sent the parking directions to this number."
   [annotation: captures the ETA for the front desk and closes the loop
   in the same call]
   Outcome: resolved entirely by the assistant, no escalation.

2. language-switch — A guest who switches language mid-call.
   Setup: A guest starts in English, then drifts into German
   mid-sentence while asking about the garage.
   Guest (EN): "Hi, I'm still on the road, I don't think I'll get there
   before eleven. Is that going to be a problem?"
   Assistant (EN): "Not at all. Check-in after 10 p.m. uses the side
   entrance — I can text you the door code once you're about twenty
   minutes out. Do you need directions to parking as well?"
   Guest (switches to DE): "Ja, genau, und … äh, entschuldigung, wo ist
   eigentlich die Einfahrt zur Tiefgarage?" [annotation: switches
   language mid-sentence without warning — a natural pattern once a
   caller relaxes]
   Assistant (DE): "Die Einfahrt liegt direkt neben dem Seiteneingang,
   Sie sehen das Hinweisschild schon von der Strasse aus. Soll ich
   Ihnen das per SMS schicken, zusammen mit dem Türcode?" [annotation:
   follows the switch immediately, in the same reply — the guest is
   never asked to repeat themselves]
   Outcome: resolved entirely by the assistant, no escalation — a
   language switch alone never triggers a handover, only content does.
   Visibly tag each turn EN or DE (small text label, not colour).

3. complaint — A delicate complaint.
   Setup: A guest calls, audibly frustrated, about noise from a
   neighbouring room the previous night.
   Guest: "This is the second night I couldn't sleep because of the
   room next door. I want this dealt with properly, not just noted
   somewhere." [annotation: frustration plus a repeat issue — a
   stronger signal than a routine question]
   Assistant: "I'm sorry to hear that — a second disrupted night is not
   something to just note and move on from. I'm connecting you to our
   team directly so someone can address it with you now, and I'll pass
   along everything you've just told me so you don't have to repeat
   it." [annotation: no attempt to resolve or offer compensation on its
   own — immediate warm handover with context]
   Outcome: ESCALATED — reason "serious complaint": complaints with
   real weight go to a person, not a scripted apology.

4. booking-change — A booking change and a refund request.
   Setup: A guest already checked in calls to shorten their stay and
   asks for a refund on the unused nights.
   Guest: "Actually, while I have you — can you cancel my last two
   nights and refund me? I'm cutting the trip short."
   Assistant: "I can note that down right away, but a cancellation with
   a refund needs someone from our team to confirm — I don't want to
   promise something I can't guarantee. I'll flag it as urgent so
   reception has it first thing, and you're welcome to call back and
   ask for a person directly if you'd rather sort it out tonight."
   [annotation: the request is captured precisely, but the assistant
   does not confirm money moving on its own authority]
   Outcome: ESCALATED — reason "financial decision": the change is
   captured accurately, the refund decision belongs to a person with
   authority over the booking.

5. emergency-boundary — A guest reports something serious. (REQUIRED
   emergency-escalation demonstration — treat this scenario with extra
   visual and textual weight; it is the safety core of the tool.)
   Setup: A guest calls sounding shaken and says they can smell smoke
   on their floor.
   Guest: "I don't want to panic anyone, but I can smell smoke on the
   third floor, near the stairs." [annotation: a safety report —
   regardless of tone or certainty, never treated as a routine
   question]
   Assistant: "Thank you for calling immediately — I'm connecting you
   to a member of our team right now, and if you feel unsafe at all,
   please also call 118 directly. Please don't wait on the line for me
   — head to a safe area first." [annotation: no attempt to assess how
   serious it is, no troubleshooting, no delay — immediate human and
   emergency-service routing is the entire response]
   Outcome: ESCALATED IMMEDIATELY, no triage attempted — reason "fire
   or safety hazard": medical situations, fire, security incidents and
   anything resembling danger always go straight to a human being or
   Swiss emergency services (144 medical, 117 police, 118 fire), a
   fixed rule, never a judgment call made by the assistant.

ESCALATION BADGE
Any scenario with an ESCALATED outcome shows a persistent, clearly
labelled badge ("Escalated to a human") plus the specific one-line
reason — never colour alone, always paired with text. Use the accent
red (#c51a2e) only for this badge and nowhere else as a large fill.
Non-escalated scenarios show a simple black check mark with the words
"Handled directly" — do not use green anywhere.

PERSISTENT REFERENCE PANEL ("What always goes to a human")
Below or beside the transcript (collapsible on mobile, open by default
on desktop), show these 7 fixed items regardless of which scenario is
selected:
1. Medical emergencies — routed to staff and, if warranted, to 144;
   never assessed or diagnosed by the assistant.
2. Fire, smoke or danger on the property — routed to staff and, if
   warranted, to 118; the assistant never judges how serious a report
   is.
3. Security incidents — a break-in, theft, intruder, or a guest who
   feels unsafe, escalated immediately every time.
4. Refunds and cancellations — captured accurately, decided by a
   person with authority over the booking.
5. Complaints with real weight — an injury, allergic reaction,
   discrimination complaint, anything with legal or safety weight,
   recorded precisely and handed to a person.
6. A direct request for a person — itself the trigger for a handover,
   never negotiated or delayed.
7. Anything outside approved rules — the assistant says so plainly
   rather than improvising a confident, wrong answer.

DISCLAIMER (always visible near the scenario picker, not collapsible
away)
"Every dialogue in this tool is a constructed illustration of good
practice, not a recording or transcript of any real hotel, guest or
vendor system, including Weissmann's. It shows how a well-designed AI
receptionist should behave, not a measured result."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No input field ever asks for a real guest name,
number, room number or any personal detail — the tool only displays
fixed example dialogue.

CTA
Primary button, always visible below the transcript (not gated behind
viewing all five scenarios):
  Label: "See how the AI phone assistant is configured for hotels"
  Link: https://www.weissmann.ai/en/services/ai-phone-assistant/
Secondary, lower-emphasis link near the top: "Read the full article"
(link to the article page). No countdowns, no fake urgency, no
"before it's too late" phrasing. CTA text and destination never change
based on which scenario is selected.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — an
annotated paper transcript, not a chat app or SaaS dashboard):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "Escalated to a human"
    badge and the reference-panel item markers, always paired with
    text, never as a large fill or the only signal.
  Non-escalated outcome: near-black (#111111) with a simple check
    glyph — do NOT use green; the site's palette has none.
  Primary button: solid #111111 background, #ffffff text, hover
    #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) /
    14px (cards). Soft shadow only on the active transcript panel:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Dialogue turns styled as simple labelled rows (speaker in small
    caps, line in quotes), not chat bubbles. Language-switch turns
    carry a small "EN"/"DE" text tag next to the speaker label.
  Layout: scenario tabs at top; transcript below; reference panel
    beside or below. Scenario picker becomes a horizontally scrollable
    tab strip on narrow widths; reference panel becomes a collapsible
    section on mobile, closed by default there, open by default on
    desktop.

ACCESSIBILITY
Full keyboard operability for scenario tabs and the reference-panel
toggle; visible focus states; aria-live="polite" region for transcript
changes; 4.5:1 minimum contrast; respect prefers-reduced-motion (no
slide/fade animation); dialogue turns and the reference panel marked up
as real list/heading structures, not bare divs.

LANGUAGE
All UI copy in English. Do not add German, Italian or French
translations — this tool exists only in English (the language-switch
scenario itself contains a few lines of German dialogue by design; that
is content, not a UI translation).

Do not fabricate or imply that any scenario is a real recorded call
from Weissmann or any named competitor. Every dialogue line must read
clearly as a constructed illustration of a design pattern, and the
emergency scenario must never be softened, joked about, or treated as
just another item in the list — it is the safety-critical case the
whole tool exists to make unambiguous.
```
