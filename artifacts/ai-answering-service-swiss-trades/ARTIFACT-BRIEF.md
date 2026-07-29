# Artifact Brief — Home-Service Call Qualification Flow Builder

**Article:** `ai-answering-service-swiss-trades` (EN-PHONE-05) — "AI Answering Services for Plumbers, Electricians and Swiss Home-Service Companies"
**Language:** English (en) — article and artifact both English-only.
**Artifact type:** Self-assessment gap analyser with a suggested-flow output (distinct mechanic from the other EN-PHONE artifacts in this batch: not a scenario simulator like the hotel front-desk tool, not a branching migration planner like the phone-system-compatibility tool, and not a persona-matching selection lab like the buyer's-guide tool — this one compares the reader's own current script against a fixed good-practice question set and produces two concrete outputs: what's missing, and what order to ask it in).

---

## 1. User problem

An owner or office manager at a small Swiss plumbing, electrical, heating or locksmith business already has *some* answering process — a person, a voicemail script, or an AI vendor's default setup — and has no easy way to tell whether it actually asks the right things before a technician gets dispatched. The article explains, in prose, which six questions matter and why a missing one causes real operational damage; but reading that list once does not tell a reader whether *their own* current script has the gap. They need to check their own flow against the pattern, for their own trade, and see the actual consequence of each specific gap — not a generic warning that "qualification matters."

## 2. Intended audience

Owners and office managers of small Swiss home-service trades businesses (plumbing, electrical, heating, locksmith and similar) with a small, fixed number of technicians — evaluating an AI answering service, reviewing a script a vendor has proposed, or auditing what their own staff currently ask on the phone.

## 3. Why an interactive artifact beats a static PDF

A printed checklist of "six questions to ask" is generic until it is applied to a specific trade and a specific current state. The interactive version:
- Lets the reader select their own trade (plumber or electrician, each with different urgency signals and different things that go wrong when a question is skipped) instead of reading generic advice and doing the translation themselves.
- Lets the reader honestly mark what their *current* process actually does for each of the six categories — not asked, asked vaguely, or asked specifically — and reveals the concrete operational consequence tied to exactly that gap, not a generic "this matters" statement.
- Produces a second, independent output — a suggested question order for the selected trade — so the reader leaves with something usable even if their current script already covers all six categories individually but asks them in a sequence that wastes time (e.g. asking about access before confirming the job is even in the service area).
- Reacts to the reader's own input; a PDF checklist cannot tell a plumber's office which specific gap in *their* script maps to which specific failure mode.

## 4. Inputs

1. **Trade selector** — two tabs/buttons: "Plumber" and "Electrician". Exactly one active at a time; no default pre-selected (empty state prompts a choice). The data structure is built to extend to further trades later without changing the mechanic, but only these two are populated now.
2. **Six-row self-assessment checklist**, one row per question category (Service area, Urgency, Job type, Photo, Access, Availability), each row offering exactly three mutually exclusive states via a small button group (not a dropdown, so all options are visible at once):
   - "Not asked"
   - "Asked, but vague"
   - "Asked specifically"
   No row has a default selection; an unset row is visually distinct from "asked specifically" (never default-assume the best case).
3. **"Show suggested flow" toggle** (off by default) — reveals the recommended order and trade-specific phrasing for all six questions regardless of what the reader has marked in the checklist. This is a separate, always-available output, not gated behind completing the checklist.

## 5. Calculation / decision logic

- **No score, no percentage, no pass/fail verdict.** This tool never aggregates the six rows into a single number or grade — it is a gap-flagging and sequencing aid, not a scorecard (the project already uses a numeric scoring mechanic for a different, German-language article; this English tool stays a different mechanic on purpose).
- **Gap lookup:** for any row marked "Not asked" or "Asked, but vague", the tool looks up that category's fixed `riskIfMissing` or `riskIfVague` text for the selected trade from `artifact-data.json` and adds it to the "Flagged gaps" panel. Rows marked "Asked specifically" produce no flag.
- **Trade switch resets nothing destructively** — if the reader switches from Plumber to Electrician, the six checklist states are cleared (they describe a specific trade's script, so a plumber's self-assessment does not carry over as if it applied to an electrician's), but the tool shows a brief, plain notice that the checklist reset, not a silent wipe.
- **Suggested flow is static per trade** — a fixed, ordered list of the six categories with trade-specific example question phrasing, pulled directly from `artifact-data.json`. It does not change based on the checklist answers; it is the same reference sequence whether the reader's script is missing one question or all six.

## 6. Outputs

1. **Flagged gaps panel** — for every row marked "Not asked" or "Asked, but vague", a card showing: the category name, the specific trade-tuned question that should be asked, and the concrete operational consequence of the gap (e.g., for a plumber's missing urgency question: "Two calls both described as ‘urgent’ by tone alone get treated identically, so a routine job can take the one free slot ahead of an active leak"). If no rows are flagged (all six marked "Asked specifically"), the panel shows a plain, unexcited confirmation — "No gaps flagged against this question set" — never inflated praise, and with a one-line reminder that this reflects what the reader reported, not an independent verification of call quality.
2. **Suggested flow panel** (shown when the toggle is on, or always visible in a collapsed summary form) — the six categories in the recommended order for the selected trade, each with its trade-specific example phrasing and a one-line "why this position" note (e.g. urgency sits early because it decides whether the call interrupts the day's schedule at all, before time is spent on details that only matter for an in-scope job).
3. A short, persistent link back to the article's "good script, bad script" section, so the tool never has to re-explain the underlying reasoning.

## 7. Error states

- No trade selected → checklist and outputs stay empty with a plain prompt ("Choose a trade to see its question set.") — a calm empty state, not an error banner.
- No checklist rows touched yet for the selected trade → "Flagged gaps" panel shows a neutral prompt ("Mark each row to see what's missing.") rather than a false "no gaps found."
- All six rows marked "Asked specifically" → confirmation message as described in §6, with no numeric score implied.
- JavaScript disabled / interactive layer fails to load → the underlying HTML still lists the full six-question good-practice set and the suggested flow for both trades in a static, readable order (progressive enhancement, not a blank page).

## 8. Privacy considerations

- Fully client-side; nothing is transmitted to any server. The checklist has no field for a real customer's name, address, phone number or job detail — it only records the reader's own self-assessment of their script (three-state selections) against a fixed reference set.
- Selections may be kept in the browser session only for convenience (no requirement to persist across visits); if the build stores them locally, disclose that in one line with a visible reset control.
- A one-line note states that the tool reflects the reader's own self-reported answers, not a recording, transcript, or independent audit of any real call — consistent with the article's disclaimer style.

## 9. Accessibility requirements

- Trade tabs and the three-state row controls fully keyboard-operable (arrow keys or tab order), with visible focus states.
- The three states ("Not asked" / "Asked, but vague" / "Asked specifically") are always shown as text labels, never colour- or icon-only; the accent colour may highlight "Not asked" but the word itself is always present.
- Flagged-gap reveals and the trade-switch reset notice appear in an `aria-live="polite"` region so screen-reader users hear updates without re-navigating.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` — panel reveals appear instantly, no slide/fade animation, when reduced motion is requested.
- The six-row checklist and the suggested-flow list are marked up as genuine list structures (not bare `<div>`s) so screen readers can navigate row by row.

## 10. Mobile behaviour

- Below ~640px, the trade selector becomes two full-width stacked buttons (not a dropdown) so both trades stay visible at once.
- Each checklist row stacks its label above its three-state button group, with each button sized for touch (≥44×44px) and full width within the row.
- The "Flagged gaps" and "Suggested flow" panels stack vertically below the checklist rather than sitting side by side.
- The "Show suggested flow" toggle is a full-width, thumb-reachable control.

## 11. Exact CTA

Primary CTA button, shown persistently below the tool (not gated behind completing the checklist):

> **"Try the AI phone assistant on real calls (CHF 350, one-time)"** → links to `/en/services/ai-phone-assistant/`

Secondary, lower-emphasis link near the top of the tool:

> "Read the full article: the six-question breakdown" → links to the article's own URL (`/en/ai-academy/agents-automation/ai-answering-service-swiss-trades/`).

No countdown, no fake urgency, no "before it's too late" language. The CTA text and destination never change based on the selected trade or the checklist state.

## 12. Disclaimer

Include a short, visible note near the trade selector:

> "This tool reflects your own self-assessment of your current script, checked against a general good-practice question set — it does not test, record or independently verify any real phone call, and it is not a guarantee of how any specific vendor's system, including Weissmann's, actually performs. The risk descriptions are illustrative consequences of a missing question, not a measured outcome."

This prevents the tool from being read as an audit of a specific system's real behaviour, consistent with the article's rule against inventing vendor-specific claims or fake precision.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only for the "Not asked" state indicator and its flagged-gap card border/label — always paired with the text itself, never a colour-only signal, never a large fill. "Asked specifically" uses `--ink` (near-black) with a simple check glyph — no green anywhere in the palette. "Asked, but vague" uses a muted `--ink-mute` tone with the word itself doing the work, not colour alone.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- Checklist rows and flagged-gap cards rendered as simple bordered rows/cards (thin 1px borders, `--line: #e5e5e2`), corner radius `10px`/`14px`, soft shadow (`--shadow`) only on the active/expanded panel — editorial and calm, not a gamified quiz or a dashboard with meters.
- Typography: `'Instrument Sans'` with system-sans-serif fallback.
- Overall feel: a working checklist on paper that happens to be interactive — not a chat-app mockup, not a scored quiz.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Home-Service Call Qualification
Flow Builder". It is an English-language interactive gap-analysis tool for
Swiss plumbing and electrical businesses reviewing their own AI answering
service or phone script — not a scorecard, not a calculator, not a
conversation simulator.

CONTEXT
The companion article's thesis: a small trades business with two or three
technicians has almost no spare capacity to absorb a badly qualified call.
Six questions separate a working script from a risky one: service area /
postcode, a specific urgency signal, job type, a requested photo, access
instructions, and a realistic availability window. This tool lets the
reader pick their trade, self-assess whether their current script asks
each of the six questions (not at all / vaguely / specifically), and see
two outputs: which gaps are flagged with a concrete operational
consequence, and a suggested order to ask all six questions in.

TRADES (exactly 2 populated now: plumber, electrician — build the data
structure so a third trade could be added later without changing the
mechanic, but do not invent content for any trade beyond these two)

For each trade, the six categories are, in this recommended order:
1. service-area
2. urgency
3. job-type
4. photo
5. access
6. availability

Use EXACTLY this content per trade and category (light rewording for UI
labels is fine; do not invent new categories or new trades):

--- PLUMBER ---
1. service-area
   question: "What's the postcode, or the street and town?"
   whyOrderMatters: "Confirmed first, because nothing else is worth
     establishing if the job is outside the service area."
   riskIfMissing: "A technician can be dispatched toward an address before
     anyone confirms it's within range, wasting the drive and delaying the
     next genuinely in-area customer."
   riskIfVague: "A caller's vague sense of the area (\"just outside town\")
     gets treated as confirmed, and the actual distance only becomes clear
     once a technician is already on the way."
2. urgency
   question: "Is water actively running or flowing right now, or has it
     stopped or slowed?"
   whyOrderMatters: "Asked early, because it decides whether this call
     interrupts today's schedule at all, before time goes into details
     that only matter for an in-scope job."
   riskIfMissing: "Two calls both described as \"urgent\" by tone alone get
     treated identically, so a routine job can take the one free slot
     ahead of an active leak."
   riskIfVague: "A caller's own word (\"bad\", \"urgent\") gets logged
     without the specific detail a dispatcher needs to compare it against
     the next call."
3. job-type
   question: "In your own words — what's happening, and where (tap,
     toilet, boiler, pipe, drain)?"
   whyOrderMatters: "Comes after urgency, so the dispatcher already knows
     how much time pressure applies before gathering the details."
   riskIfMissing: "The technician arrives without knowing which of several
     different toolkits and parts to bring, and diagnoses the job again
     from scratch on arrival."
   riskIfVague: "A generic description like \"a leak\" hides whether this
     is a dripping tap or a burst pipe until someone is standing in the
     room."
4. photo
   question: "Could you send a quick photo or short video of the problem
     to this number?"
   whyOrderMatters: "Requested once the job type is known, so the caller
     knows what's useful to photograph."
   riskIfMissing: "The technician's first real look at the job happens on
     site, after the van is already loaded on a guess at the right
     parts."
   riskIfVague: "A verbal description alone can't show scale, so \"a bit
     of water on the floor\" and \"water coming through the light
     fitting\" sound similar over the phone and are not."
5. access
   question: "Is there anything the technician needs to know to get in —
     entry code, key location, parking, a pet?"
   whyOrderMatters: "Only worth asking once the job is confirmed and
     scheduled — no point collecting access details for a job that turns
     out to be out of area."
   riskIfMissing: "A technician arrives on time and then loses fifteen to
     twenty minutes at the door, eating into the next customer's slot."
   riskIfVague: "An access note like \"someone will be around\" doesn't
     say who, or what happens if they're not."
6. availability
   question: "When are you actually free for a visit, and will someone be
     at the address?"
   whyOrderMatters: "Asked last, once every other detail is known, so the
     window offered is one the business can actually keep."
   riskIfMissing: "A slot gets promised without checking whether a
     technician is actually free then, and the office has to call back to
     walk it back."
   riskIfVague: "\"Anytime\" sounds flexible but tells the scheduler
     nothing usable, so the job defaults to whichever slot is open rather
     than one that suits the customer."

--- ELECTRICIAN ---
1. service-area
   question: "What's the postcode, or the street and town?"
   whyOrderMatters: (same as plumber)
   riskIfMissing: (same pattern as plumber, reworded) "A technician can be
     sent toward an address before anyone confirms it's within range,
     wasting the drive and delaying the next genuinely in-area customer."
   riskIfVague: "A caller's vague sense of the area gets treated as
     confirmed, and the real distance only becomes clear once a
     technician is already on the way."
2. urgency
   question: "Is there any smell of burning or visible sparking, or has
     the power gone out completely — or is this a switch or socket that
     just isn't working?"
   whyOrderMatters: "Asked early, for the same reason as the plumber
     script: it decides whether the call interrupts today's schedule."
   riskIfMissing: "A flickering hallway light and a scorched, sparking
     socket both get logged as \"an electrical problem\", so the
     genuinely dangerous one can wait behind the cosmetic one."
   riskIfVague: "\"Something's wrong with the wiring\" doesn't tell a
     dispatcher whether this can wait until tomorrow or needs a
     technician diverted from another job right now."
3. job-type
   question: "What exactly isn't working, and where (a single socket, a
     whole circuit, a light fitting, the fuse box)?"
   whyOrderMatters: "Comes after urgency, once the time pressure is
     already established."
   riskIfMissing: "The technician can't tell from the booking whether this
     is a five-minute swap or a fuse-box job, and arrives without the
     right test equipment."
   riskIfVague: "\"The electrics are playing up\" could mean one loose
     socket or a failing consumer unit; only one of those is safe to
     leave until next week."
4. photo
   question: "Could you send a photo of the socket, switch or fuse box in
     question?"
   whyOrderMatters: "Requested once the job type is known, so the caller
     knows what to photograph."
   riskIfMissing: "Scorch marks, melted plastic or a tripped breaker that
     won't reset are all invisible over the phone, and change what the
     technician should treat as urgent."
   riskIfVague: "A caller who says \"it looks a bit burnt\" without a
     photo leaves the technician guessing how urgent \"a bit\" really
     is."
5. access
   question: "Is there anything the technician needs to know to get in —
     entry code, key location, parking, or where the fuse box actually
     is?"
   whyOrderMatters: "Only worth asking once the job is confirmed and
     scheduled."
   riskIfMissing: "A technician who can get into the building but not find
     the fuse box loses time that was never accounted for in the slot."
   riskIfVague: "A vague note like \"it's somewhere in the basement\"
     leaves the technician searching instead of working."
6. availability
   question: "When are you actually free for a visit, and will someone be
     at the address?"
   whyOrderMatters: "Asked last, once every other detail is known."
   riskIfMissing: "A slot gets promised without checking technician
     availability, and the office has to call back to walk it back."
   riskIfVague: "\"Anytime\" tells the scheduler nothing usable, so the
     job defaults to whichever slot is open rather than one that suits
     the customer."

UI / INTERACTION
- Trade selector: 2 tabs/buttons ("Plumber", "Electrician"), none selected
  by default. Selecting one loads its six-row checklist and clears any
  previous trade's checklist state, with a brief plain-text notice that
  the checklist reset (not a silent wipe).
- Six-row checklist, one row per category, in the fixed order above. Each
  row: category label, then a three-button group ("Not asked" / "Asked,
  but vague" / "Asked specifically"), no default selection, one active
  state per row.
- "Flagged gaps" panel: for every row currently marked "Not asked" or
  "Asked, but vague", show a card with the category name, the trade's
  exact question text, and the matching riskIfMissing or riskIfVague text.
  If no rows are marked yet, show a neutral prompt ("Mark each row to see
  what's missing"). If all six rows are marked "Asked specifically", show
  a plain confirmation ("No gaps flagged against this question set") with
  a one-line note that this reflects the reader's own answers, not an
  independent check of call quality. Never show a score, percentage, or
  grade.
- "Show suggested flow" toggle (off by default): when on, reveal the six
  categories in the fixed recommended order for the selected trade, each
  with its exact question text and its whyOrderMatters note. This panel
  does not depend on the checklist state — show it even if no checklist
  row has been touched.
- Persistent secondary link near the top: "Read the full article: the
  six-question breakdown" (link to the article page).

DISCLAIMER (always visible near the trade selector, not collapsible away)
"This tool reflects your own self-assessment of your current script,
checked against a general good-practice question set — it does not test,
record or independently verify any real phone call, and it is not a
guarantee of how any specific vendor's system, including Weissmann's,
actually performs. The risk descriptions are illustrative consequences of
a missing question, not a measured outcome."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No field ever asks for a real customer's name,
address, phone number, or job detail — only the reader's own three-state
self-assessment per category.

CTA
Primary button, always visible below the tool (not gated behind any
interaction):
  Label: "Try the AI phone assistant on real calls (CHF 350, one-time)"
  Link: https://www.weissmann.ai/en/services/ai-phone-assistant/
Secondary lower-emphasis link near the top: "Read the full article: the
six-question breakdown" (link to the article page).
Do not use countdowns, fake urgency, or "before it's too late" phrasing.
Do not change the CTA wording based on the selected trade or checklist
state.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a working
checklist on paper that happens to be interactive, not a gamified quiz or
SaaS dashboard):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "Not asked" state and its
    flagged-gap card border/label, always paired with the text itself,
    never a large fill or the only signal.
  "Asked specifically": near-black (#111111) with a simple check glyph —
    do NOT use green; the site's palette has no green in it.
  "Asked, but vague": a muted grey tone (#5f5f5f), text label doing the
    work, not colour alone.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the active/expanded panel:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Layout: trade selector as two tabs at the top, six-row checklist below,
    "Flagged gaps" and "Suggested flow" panels stacked beneath (side by
    side on wide desktop widths is acceptable, stacked below ~640px).

ACCESSIBILITY
Full keyboard operability for trade tabs and the three-state row buttons;
visible focus states; aria-live="polite" region for flagged-gap updates
and the trade-switch reset notice; 4.5:1 minimum contrast; respect
prefers-reduced-motion (panels appear instantly, no slide/fade); checklist
and suggested-flow lists marked up as real list structures, not bare
divs.

LANGUAGE
All UI copy in English. Do not add German, Italian or French translations
— this tool exists only in English.

Do not fabricate or imply that any risk description is a measured outcome
of a real call, or a claim about Weissmann's or any named competitor's
actual system behaviour. Every risk description must read as an
illustrative consequence of a missing question, not a benchmark result.
```
