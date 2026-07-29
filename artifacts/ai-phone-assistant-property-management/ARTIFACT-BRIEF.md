# ARTIFACT BRIEF — Tenant Request Routing Board

**Companion article:** `ai-phone-assistant-property-management` (EN-PHONE-04) — "AI Phone Assistants for Swiss Property Management: Triage Without Treating Every Dripping Tap Like the Apocalypse"
**Artifact title:** Tenant Request Routing Board
**Language:** English (en) only — matches the article; no DE/IT/FR version is commissioned.

---

## 1. User problem

A Swiss property manager (or a decision-maker evaluating a vendor on their behalf) cannot picture, in the abstract, what "the AI handles routine calls and escalates emergencies" actually means for a specific tenant call. Vendor language like "recognises urgent calls and escalates by your rules" is unfalsifiable until it is applied to an actual call type. The reader needs to see, concretely, that a dripping tap and a smell of gas do not just get different words in a brochure — they get structurally different handling, and the emergency ones are never a judgement the AI makes on its own.

## 2. Intended audience

Swiss property managers and Verwaltungen (portfolio owners, office managers, Hauswart-adjacent staff) evaluating whether to route tenant calls through an AI phone assistant — for their own operation or in comparison with Weissmann's — plus anyone drafting the escalation rules such a system would run on and wanting a concrete starting checklist rather than a blank page.

## 3. Why an interactive artifact beats a static PDF

A static table of "call type → category" is readable once and forgotten, and it invites the reader to skim past the one row that matters most. The interactive version:
- Lets the reader pick exactly the call type they are worried about (a portfolio with older tenants cares differently about "no heat" than a student-housing operator does) instead of reading all ten rows every time.
- Makes the Routine / Urgent / Emergency boundary a visible, binary decision for each scenario rather than a paragraph of caveats — the reader sees the category before they see the reasoning, which mirrors how the AI itself is supposed to behave (recognise the category fast, don't philosophise about it).
- Shows the AI's exact action and the human's exact role side by side for every scenario, so the reader can check a real vendor's behaviour against the pattern rather than trusting a marketing claim.
- Keeps the fixed "always escalates" trigger list visible and separate from the scenario picker, so the reader internalises the five-item list itself, not just this tool's ten examples of it.

## 4. Inputs

1. **Scenario picker** — ten cards or a list, one per tenant-call type: dripping tap, no heat in winter, lost key, noise complaint, viewing request, rent document request, smell of gas, active flooding / burst pipe, break-in / forced entry, smoke or signs of fire. No default selection on load (empty state prompts a choice).
2. **View toggle (optional, secondary)** — "Show all ten at once" vs. "One at a time," purely a presentation preference, does not change content.
3. No text input, no numeric input, no free-text field of any kind. This is a lookup-and-explain tool, not a form.

## 5. Calculation / decision logic

- **No score, no percentage, no risk rating.** The tool never computes or displays a number. It looks up one of exactly three fixed categories — Routine, Urgent, Emergency — for the selected scenario, from the fixed data in `artifact-data.json`. Nothing is generated, inferred, or randomised.
- **Scenario → category lookup:** each scenario in the data file carries a fixed `category` field. The UI resolves that to the matching entry in `categories` (label, description, `aiRole`, `humanRole`, `typicalResponseTime`) and displays both together.
- **Emergency framing is fixed, not computed:** for the four emergency scenarios, the UI must never say the AI "decided," "judged," "assessed," or "determined" the call was dangerous. The copy always frames it as the AI **recognising** one of the five fixed trigger words/phrases and **escalating automatically** — the danger judgement itself belongs to the human the call is handed to. This rule is stated explicitly in the data file's `uiRules.emergencyFraming` and must be honoured in every emergency scenario's rendered text.
- **The five-item "always escalates" list is a separate, always-visible element** (`alwaysEscalateTriggers`), not something the reader has to click through scenarios to discover — it is the article's core claim and the tool should not bury it inside ten separate cards.

## 6. Outputs

1. For the selected scenario: its label, the illustrative caller line (clearly marked as constructed, not a transcript), the resolved category with its label, a one-line "what the AI does" (`aiAction`), a one-line "what the human does" (`humanInvolvement`), and the scenario-specific rationale (`note`).
2. The always-visible five-item emergency-trigger list, shown regardless of which scenario is selected.
3. A short, persistent explanation of what "Urgent" means as distinct from both "Routine" and "Emergency" (since it is the tier readers are most likely to misunderstand) — sourced from `categories.urgent.description`.
4. If "Show all ten at once" is selected: all ten scenario cards render in a single scannable grid or list, grouped or clearly labelled by category, with no scenario looking visually "worse" than another purely through colour.

## 7. Error states

- No scenario selected → the detail panel stays empty with a plain prompt ("Choose a call type to see how it's routed.") — a calm empty state, not an error banner.
- JavaScript disabled / interactive layer fails to load → the underlying HTML still lists all ten scenarios with their category and reasoning in a static, readable stacked order (progressive enhancement, not a blank page).
- The tool is never allowed to render an "unclassified" or "unsure" state for any of the ten scenarios — every scenario in the data file always has a category. If a future scenario is added without one, treat that as a content bug to fix before publishing, not a state the UI needs to handle gracefully.

## 8. Privacy considerations

- Fully client-side; nothing is transmitted to any server. No field anywhere accepts a real tenant name, unit number, address, or phone number — the tool only displays fixed example scenarios and reflects back which card the reader selected.
- No `localStorage` or persistence is required, since there is nothing meaningful to remember between visits; if the build adds it purely for UI convenience (e.g. remembering the view toggle), disclose that in one line with a visible reset control.
- A one-line note near the scenario picker states plainly that all caller lines are constructed illustrations of call types, not recordings or transcripts of any real tenant, building, or vendor system (including Weissmann's).

## 9. Accessibility requirements

- Scenario cards are fully keyboard-operable (tab order or arrow-key grid navigation), with visible focus states.
- Routine / Urgent / Emergency are never distinguished by colour alone — every card and every detail panel shows the text label itself, not a colour swatch or icon-only signal.
- Selecting a scenario updates the detail panel inside an `aria-live="polite"` region so screen-reader users hear the change without needing to re-navigate.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` — the detail panel appears instantly on selection, no slide/fade animation, when reduced motion is requested.
- The always-visible five-item emergency-trigger list is marked up as a genuine list (`<ul>`/`<ol>`), not styled `<div>`s, so it is reliably navigable and announced as a list.

## 10. Mobile behaviour

- Below ~640px, the ten scenario cards become a single-column vertical list (not a cramped grid), each card tall enough for a comfortable tap target.
- Selecting a card scrolls the detail panel into view directly below it (or opens inline beneath the card, accordion-style) rather than requiring the reader to scroll back up to a separate fixed panel.
- The five-item "always escalates" list stays visible near the top of the page on mobile too — it should not require scrolling past all ten cards to find.
- All tap targets ≥44×44px; the view toggle (if used) is a simple full-width switch, not a small icon button.

## 11. Exact CTA

Primary CTA button, shown persistently below the scenario board (not gated behind selecting a scenario):

> **"Test how the escalation rules would actually work (CHF 350, one-time)"** → links to `/en/services/ai-phone-assistant/`

Secondary, lower-emphasis link near the top of the tool:

> "Read the full article on triage vs. emergency judgement" → links to the article's own URL (the academy spoke page for `ai-phone-assistant-property-management`).

No countdown, no fake urgency, no "before it's too late" language. The CTA text and destination never change based on which scenario is selected — including, deliberately, the emergency ones; this tool must never turn a real hazard into a sales trigger.

## 12. Disclaimer

Include a short, visible note near the scenario picker:

> "All caller lines in this tool are constructed illustrations of common call types, not recordings or transcripts of a real tenant call, and not a measured result from Weissmann or any other vendor's system. The routing shown is an example of good triage design, not a documented specification of any single product."

This prevents the tool from being mistaken for a real call log or a benchmark of a specific vendor's actual behaviour, and — just as importantly — makes clear that the routing logic is a design pattern being taught, not a claim about exactly how any one product (including Weissmann's) is configured today.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only for the "Emergency" category label/tag — never as a large fill, and always paired with the word "Emergency," never colour alone. "Urgent" uses a mid-weight neutral tag (e.g. bordered, `--ink-soft` text) and "Routine" uses the plainest, lowest-emphasis tag — the visual weight should escalate from Routine to Urgent to Emergency, but always through weight/border/label, not through a traffic-light palette (the site has no green, and amber/yellow is not part of its palette either).
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text) — not accent-red, so the CTA itself never looks like part of the emergency signalling.
- Scenario cards: simple bordered cards (`--line: #e5e5e2`, radius 12px), caller line shown in quotes in regular text — not chat-bubble graphics. Keep it editorial, like an annotated intake sheet, not a dashboard widget.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the active/selected card or open detail panel.
- Overall feel: a clipboard-style routing sheet that happens to be interactive — calm and procedural, not alarm-styled, even on the emergency scenarios. The seriousness of an emergency scenario should come through in the words ("Emergency — immediate human escalation"), not through flashing, red backgrounds, or siren-style visual tricks.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Tenant Request Routing Board". It is
an English-language interactive lookup tool for Swiss property managers
evaluating how an AI phone assistant (any vendor) should route different
kinds of tenant calls — not a calculator, not a quiz, not a scorecard.

CONTEXT
The companion article's thesis: property-management phone triage is really
two different jobs wearing one name. Administrative triage (listening,
categorising, routing, scheduling, logging) is safe to automate completely.
Emergency judgement (deciding how dangerous a situation actually is) must
never be delegated to the AI — the moment a caller's words match a small
fixed list of danger signals (gas smell, active flooding, fire/smoke,
break-in, any mention of injury or immediate danger), the AI's only job is
to escalate to a human immediately, not to assess, weigh, or downgrade the
situation itself. This tool makes that boundary concrete across ten
realistic tenant-call types.

THREE FIXED CATEGORIES (use exactly this data, do not invent a fourth
category or a numeric severity score)

1. Routine — administrative queue
   Description: No time pressure. The assistant listens, categorises, and
   routes or schedules — the same job as filing correctly.
   AI role: Handles the full interaction: captures the details, confirms
   next steps, logs the request.
   Human role: Reviewed on the normal schedule; no immediate involvement
   required.
   Typical response time: Standard queue — next available slot, no fixed
   deadline.

2. Urgent — fast-tracked, still administrative
   Description: Not a danger signal, but leaving it in the standard queue
   creates real hardship. The assistant still is not judging risk here — it
   is applying a fixed priority rule to a known category.
   AI role: Captures the details, flags the request as high priority, and
   notifies the relevant contractor or caretaker the same day.
   Human role: Acts within a defined short window (typically same business
   day) rather than the standard queue.
   Typical response time: Same-day or next-business-day acknowledgement.

3. Emergency — immediate human escalation
   Description: The assistant never evaluates how dangerous the situation
   actually is. Recognising one of a small, fixed set of signal words is
   enough on its own — escalation is immediate and automatic, not a
   judgement call, and confidence or calmness in the caller's voice does
   not change it.
   AI role: Does not gather the usual intake details first. Connects the
   caller to a human immediately, or gives them the direct emergency number
   if nobody can be reached instantly. Logs the call as flagged afterwards.
   Human role: Assesses the actual danger and decides what happens next —
   the human, not the AI, makes the safety judgement.
   Typical response time: Immediate — minutes, not hours.

ALWAYS-VISIBLE EMERGENCY TRIGGER LIST (show this permanently, not buried
inside a scenario card — it is the article's core safety claim):
  - Smell of gas, or any suspicion of a gas leak
  - Active flooding or a burst pipe (water currently spreading, not a slow
    drip)
  - Smoke, or any indication of fire
  - Signs of a break-in, forced entry, or an intruder on the property
  - Any mention of injury or of someone's safety being at risk right now

TEN SCENARIOS (user picks one at a time from a card grid; no default
selected on load). Use EXACTLY this content — do not invent new caller
lines beyond what's listed, do not fabricate a "measured" outcome, and do
not attribute any scenario to a real vendor or real tenant:

--- dripping-tap (Routine) ---
Caller line: "There's a tap in the bathroom that's been dripping since
Tuesday. It's not urgent, just annoying."
AI action: Logs the request, confirms the unit and the exact tap location,
and adds it to the standard maintenance queue.
Human involvement: Reviewed on the normal schedule — no same-day action
required.
Note: A slow, contained drip is exactly the kind of call an AI system
should handle from start to finish without involving anyone immediately.

--- no-heat-winter (Urgent) ---
Caller line: "The heating hasn't worked since yesterday morning and it's
minus two outside."
AI action: Logs the request as high priority, notifies the heating
contractor the same day, and tells the tenant when to expect contact.
Human involvement: Acted on within the same business day — not the
standard queue, but not an emergency transfer either.
Note: Nobody is in danger the way a gas leak implies danger, but a cold
home for several days is a real hardship. This gets fast-tracked, not
escalated as an emergency.

--- lost-key (Routine) ---
Caller line: "I've lost my key somewhere between the office and home — can
I get a replacement?"
AI action: Logs the request and explains the standard replacement or
spare-key process.
Human involvement: Handled through the normal replacement process; no
immediate action needed.
Note: A lost key during ordinary hours is paperwork, not a crisis. It would
only move to a different category if the caller were currently locked out
with no fallback available.

--- noise-complaint (Routine) ---
Caller line: "The neighbours upstairs have had loud music going since
eleven, and it's not the first time."
AI action: Logs the complaint, the unit involved, and how often it has
happened, then routes it to the property manager for a decision.
Human involvement: A person reviews and decides how to handle it — not
resolved on the call.
Note: This needs a value judgement about who is right and what to do next.
The assistant's job stops at listening accurately and filing correctly.

--- viewing-request (Routine) ---
Caller line: "I saw the listing for the two-bedroom on Bahnhofstrasse —
could I arrange a viewing this week?"
AI action: Checks available slots and books the viewing directly, or
proposes alternatives if none are open this week.
Human involvement: None required unless the caller has a request outside
the standard process.
Note: A booking action with no danger dimension at all — the clearest
possible case for full automation.

--- rent-document-request (Routine) ---
Caller line: "I need a copy of my rent statement for this year for my tax
return."
AI action: Confirms the identity details already on file and arranges for
the document to be sent.
Human involvement: Sent through the standard document process; no urgency
attached.
Note: Paperwork, not a problem — logged and routed like any other
administrative request.

--- gas-smell (Emergency) ---
Caller line: "I think I can smell gas near the kitchen — I'm not totally
sure."
AI action: Does not ask for the unit number or run through normal intake
questions first. Connects the caller to a human immediately, or gives the
direct emergency number if nobody is reached within seconds. Logs the call
as flagged afterwards.
Human involvement: A person assesses the situation immediately — the
danger judgement is made by a human, not inferred by the AI from how calm
or unsure the caller sounds.
Note: "I'm not totally sure" does not downgrade this call. The trigger is
the word "gas," not the caller's confidence.

--- active-flooding (Emergency) ---
Caller line: "Water is coming out from under the sink — it's already on
the floor and spreading."
AI action: Escalates immediately, the same way as the gas-smell scenario —
no diagnostic questions about the pipe or the damage first.
Human involvement: A person coordinates an emergency plumber and, if
needed, other affected units — decisions the AI does not make.
Note: The distinction from the dripping-tap scenario is not the word
"water" — it's "spreading" versus "since Tuesday." Both matter for accurate
routing; only one requires immediate escalation.

--- break-in (Emergency) ---
Caller line: "My door looks like it's been forced open. I don't think
anyone's inside right now, but I haven't gone in."
AI action: Escalates immediately and, depending on configuration, advises
the caller not to enter the unit while connecting them to a human or the
police.
Human involvement: A person, and where relevant the police, take over
entirely — well outside anything an administrative system should attempt
to manage.
Note: The caller's own uncertainty ("I don't think anyone's inside") is
exactly why this cannot be left to a script — it goes straight to a human.

--- smoke-fire (Emergency) ---
Caller line: "There's smoke coming from the stairwell on the third floor."
AI action: Escalates immediately and, if nobody can be reached instantly,
tells the caller to contact the fire brigade directly rather than waiting
on the line.
Human involvement: Emergency services and the property manager decide what
happens next — not the AI.
Note: Speed matters more than internal process here. The assistant does
not try to route this through the normal escalation chain first.

UI / INTERACTION
- Scenario picker: 10 cards in a grid (single column on mobile), grouped or
  clearly tagged by category (Routine / Urgent / Emergency shown as a text
  label on every card, never colour-only). None selected by default.
- Selecting a card opens a detail panel (inline/accordion on mobile, beside
  or below the grid on desktop) showing: the caller line in quotes
  (labelled as an illustrative example, not a transcript), the category tag
  and its one-line description, "What the AI does," "What happens next"
  (human involvement), and the scenario-specific note.
- The five-item always-escalates trigger list renders permanently near the
  top of the page, above or beside the scenario grid — visible regardless
  of which scenario (if any) is selected.
- Optional "Show all ten at once" toggle: reveals all ten detail panels in a
  single scannable page instead of requiring one-at-a-time selection. Purely
  a presentation preference.
- For every Emergency scenario, the rendered copy must say the AI
  "recognised" the signal and "escalated automatically" — never that it
  "decided," "judged," "assessed," or "determined" the call was dangerous.
  That distinction is the whole point of the tool and must not be softened
  by convenient UI copy.

DISCLAIMER (always visible near the scenario picker, not collapsible away)
"All caller lines in this tool are constructed illustrations of common call
types, not recordings or transcripts of a real tenant call, and not a
measured result from Weissmann or any other vendor's system. The routing
shown is an example of good triage design, not a documented specification
of any single product."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No input field anywhere asks for a real tenant name,
address, unit number, or phone number — the tool only displays fixed
example scenarios and reflects back which card was selected.

CTA
Primary button, always visible below the scenario board (not gated behind
any interaction):
  Label: "Test how the escalation rules would actually work (CHF 350,
  one-time)"
  Link: https://www.weissmann.ai/en/services/ai-phone-assistant/
Secondary lower-emphasis link near the top: "Read the full article on
triage vs. emergency judgement" (link to the article page).
Do not use countdowns, fake urgency, or "before it's too late" phrasing.
Do not change the CTA wording or destination based on which scenario is
selected — including the emergency ones; a real hazard must never become a
sales trigger.

VISUAL STYLE — match this exactly (Swiss, editorial, calm and procedural
even on the emergency scenarios — a routing clipboard, not a dashboard or
an alarm panel):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "Emergency" category tag,
    always paired with the word "Emergency," never as a large fill, flashing
    effect, or full-card red background. No siren styling.
  "Urgent" tag: neutral bordered style with #3d3d3b text — visually between
    Routine (plainest, lowest emphasis) and Emergency (red text label) in
    weight, not in a traffic-light hue. Do NOT use green or yellow/amber
    anywhere; the Weissmann palette has neither.
  Primary CTA button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the selected/open card:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Layout: responsive card grid (auto-fit, min ~16rem per card) on desktop,
  single column on mobile; detail panel opens inline beneath the selected
  card on mobile rather than in a separate fixed region.

ACCESSIBILITY
Full keyboard operability for scenario cards and the optional view toggle;
visible focus states; aria-live="polite" region for the detail panel so
screen readers announce a new selection; 4.5:1 minimum contrast; respect
prefers-reduced-motion (detail panel appears instantly, no slide/fade); the
five-item emergency trigger list marked up as a real <ul>, not styled divs.

LANGUAGE
All UI copy in English. Do not add German, Italian or French translations —
this tool exists only in English.

Do not fabricate or imply that any scenario shows a real recorded call from
Weissmann or any named competitor. Every caller line must read clearly as a
constructed illustration of a call type, and every emergency scenario's
copy must frame the AI as recognising a fixed signal and escalating
automatically — never as judging or assessing danger itself.
```
