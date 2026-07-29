# Artifact Brief — Business Voice Use Policy Builder

**Article:** `ai-voice-cloning-business-switzerland` (EN-PHONE-09) — "AI Voice Cloning for Swiss Business Calls: Consent, Security and the Fastest Way to Damage a Brand"
**Language:** English (en) — article and artifact both English-only.
**Artifact type:** Policy generator / document builder — distinct mechanic from the sibling voice/phone artifacts in this cluster (no scenario playback, no scoring, no comparison table). This is the first "produces a document you can actually use" mechanic in the phone-assistant artifact family.

## 1. User problem

A reader has just learned that voice cloning is a real, purchasable feature — not a hypothetical — and that the same technology that could make their AI phone assistant sound like their own founder is the exact mechanism behind the Arup fraud and the FBI's 2024 warning. The article gives them a three-part framework (consent, access control, revocation) and a fixed rule (voice alone must never authorise a sensitive action), but reading a framework and having a usable internal policy are two different things. Most small and mid-sized Swiss businesses have no legal or compliance department to turn "we should probably write this down" into an actual document, and the gap between good intentions and a written policy is exactly where the failure modes in the article's "what can go wrong" section live — consent scoped to one purpose quietly reused for another, a departed contractor's access nobody remembered to revoke.

## 2. Intended audience

Swiss business owners, operations leads and IT/compliance-adjacent staff at companies that are considering — or already use — a cloned voice for an AI phone assistant, IVR greeting, marketing material or internal training content, including anyone evaluating Weissmann's or a competing provider's Enterprise-tier voice-cloning option before agreeing to it.

## 3. Why an interactive artifact beats a static PDF

A static checklist tells a reader what a good policy should contain; it does not produce one. This tool takes the specific facts of a reader's situation — whose voice, for what purpose, who is allowed to use it, when it ends — and assembles them into an actual draft policy document in the reader's own words and details, with the article's non-negotiable safeguard (the verification rule for sensitive actions) built into every output automatically, whether or not the reader thought to ask for it. That is the difference between reading advice and leaving with something to paste into an internal document today. A downloadable PDF template can't adapt its wording to whether consent has actually been obtained yet; this tool visibly flags an incomplete policy as a draft rather than letting it look finished before it is.

## 4. Inputs

- **Whose voice** (required, free text) — a name or role, e.g. "Maria Keller, Founder" or "Reception team lead." No other personal identifiers requested.
- **Purpose** (required, single select with a free-text "Other" option) — options: *AI phone assistant greeting*, *IVR / phone menu*, *Marketing or advertising content*, *Internal training or onboarding material*, *Other (describe)*. Selecting a purpose scopes the generated policy explicitly to that purpose and no other.
- **Authorised requesters** (required, at least one) — repeatable rows of name + role, meaning "who is allowed to ask for new audio generated in this voice." Add/remove rows; no upper limit enforced in the UI beyond practical scrolling.
- **Consent status** (required, single select) — *Obtained in writing*, *Verbal only (not yet documented)*, *Not yet obtained*. This directly changes the wording and prominence of warnings in the generated Consent section — it is not a decorative field.
- **Consent date** (optional, shown only when "Obtained in writing" is selected) — free text or date, e.g. "12 March 2026."
- **Revocation trigger** (required, single select) — *A known departure or end date* (reveals a date field) or *Ongoing — no scheduled end date*. Both produce meaningfully different Revocation & Offboarding wording (see Logic).

## 5. Calculation / decision logic

No score, no ranking. The tool assembles five fixed policy sections from string templates in `artifact-data.json`, substituting the reader's inputs into placeholders. Logic branches:

- **Consent section** — if `consentStatus === "written"`, render the confirmed-consent template (includes the consent date if given). If `"verbal"` or `"none"`, render the **draft-warning template**, prefixed with a fixed ⚠ "DRAFT — NOT READY TO USE" banner that also propagates to the top of the whole generated document (see Outputs) — the tool never lets an unconfirmed-consent policy look finished.
- **Access Control section** — lists every authorised-requester row entered; if only one row exists, the wording still uses "the following person, and no one else" (singular-aware phrasing) rather than an awkward list-of-one.
- **Revocation & Offboarding section** — if a departure/end date was given, render the dated template (deactivation tied to that date). If "ongoing," render the no-date template, which explicitly instructs revoking access "the moment they leave or withdraw consent, whichever happens first" rather than implying no action is needed.
- **Verification Rule for Sensitive Actions** — a fixed clause, identical in every generated policy regardless of inputs (only the voice-owner name is substituted in). This is deliberately not optional or removable through the UI: it operationalises the article's central safety rule ("voice alone should never authorise a sensitive action") as a permanent line item in every policy this tool produces.
- **Scope & Purpose section** — always generated first, stating the voice owner and the single selected purpose, with an explicit sentence that any use beyond that purpose requires new, separate consent.

## 6. Outputs

1. A five-section draft policy (Scope & Purpose, Consent, Access Control, Revocation & Offboarding, Verification Rule for Sensitive Actions) rendered as real headings and paragraphs, in reading order, ready to copy into an internal document.
2. A persistent **"DRAFT — NOT READY TO USE"** banner at the top of the output whenever consent is not yet fully obtained in writing — removed only when the reader changes Consent status to "Obtained in writing."
3. A **Copy to clipboard** control and a **Print** control (browser print dialogue) — no file upload/download to any server, no email capture.
4. A short, always-visible sidebar note reiterating in one sentence why the verification rule exists (a one-line reference to the fact pattern behind the Arup case, not a retelling), linking to the full article for the detail.
5. A visible link back to the full article and the standard CTA (see §11).

## 7. Error states

- Required field missing (voice owner name, purpose, zero authorised requesters, or no revocation-trigger choice made) → the **Generate policy** button stays disabled, and a single calm inline hint appears near the first missing field ("Add at least one authorised requester to continue"). No red error-banner treatment, no pop-up alerts.
- Consent status left at "Not yet obtained" → this is not an error state; the tool generates the policy anyway, clearly marked as a draft, because drafting a policy in advance of obtaining consent is a legitimate and encouraged use of the tool.
- All fields valid → **Generate policy** becomes enabled; clicking it reveals the output panel and moves keyboard focus to it.
- JavaScript disabled → the form and a static example of a completed policy (using clearly fictional placeholder details, e.g. "Jane Doe, Reception") are both visible in the static HTML, so the page still communicates what the tool does even without the interactive layer.

## 8. Privacy considerations

- Fully client-side. Nothing entered into the form is transmitted to any server, logged, or stored beyond the current browser tab's memory — closing or refreshing the tab clears it. No `localStorage`/`sessionStorage` persistence, no analytics, no external scripts or fonts.
- The tool only ever asks for a first name and role/title — never a full legal name requirement, ID number, phone number, email address, banking detail or any other sensitive personal data. A note near the "Whose voice" field states this plainly.
- The **Copy to clipboard** action is entirely local (the standard browser clipboard API); nothing is sent anywhere when it is used.

## 9. Accessibility requirements

- Every input has a real, visible `<label>` (no placeholder-only labelling); repeatable "authorised requester" rows use accessible add/remove controls with clear text, not icon-only buttons.
- The disabled state of **Generate policy** is conveyed with `aria-disabled` plus the inline hint text, never colour alone.
- On generation, the output region uses `aria-live="polite"` so screen-reader users hear that a policy was produced, and keyboard focus moves to the output heading.
- The "DRAFT — NOT READY TO USE" banner is marked up with real heading/alert semantics (`role="status"` or equivalent), never conveyed by colour alone — always paired with the text itself.
- Minimum 4.5:1 text contrast; respects `prefers-reduced-motion` (no slide/fade reveal animation when set).
- Generated policy sections use genuine `<h3>`/`<p>` structure so the output is navigable section by section with a screen reader, not one undifferentiated block of text.

## 10. Mobile behaviour

- Single-column form, full-width fields, generous tap targets for the add/remove requester-row buttons.
- **Generate policy** becomes a sticky button pinned near the bottom of the viewport once the form is scrolled past, so it stays reachable without scrolling back up on a long form.
- Generated output stacks in a single column below the form; **Copy** and **Print** controls sit directly above the output, not hidden in a menu.

## 11. Exact CTA

Primary CTA, shown persistently below the generated output (available even before generating, in a lower-emphasis form):

> **"Ask about voice-cloning safeguards before you say yes"** → links to `/en/services/ai-phone-assistant/`

Secondary, lower-emphasis link near the top of the tool:

> "Read the full article" → links to the article's own page (the academy spoke page for `ai-voice-cloning-business-switzerland`).

No countdown, no fake urgency, no "before it's too late" language. CTA text and destination never change based on form inputs.

## 12. Disclaimer

Shown twice: once near the top of the form (before any input) and once directly above the generated output, worded slightly differently for context but never removed or collapsible away:

> Top of form: "This tool drafts a starting point for an internal voice-use policy based on the framework in the accompanying article. It is not legal advice and does not replace review by a qualified lawyer — especially for anything involving an employee's consent, cross-border data, or a specific fraud or liability concern."
>
> Above output: "This is a draft you have generated, not a finished or legally reviewed policy. Have it checked by someone qualified before you rely on it, particularly if consent has not yet been confirmed in writing."

This is deliberately more prominent than a typical single-line disclaimer, given that the tool's subject matter directly touches fraud exposure and employee consent — two areas where a false sense of completeness carries real cost.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`), reusing the same token set as the sibling `ai-receptionist-swiss-hotels` and `ai-phone-assistant-failure-handling` artifacts for visual consistency across the phone-assistant artifact family:

- Background `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text `--ink: #111111` with a muted secondary tone for helper text and the sidebar note.
- Accent colour `--accent: #c51a2e` (Swiss red) used **only** for the "DRAFT — NOT READY TO USE" banner and its icon — never as a large fill, always paired with the banner's own text, never colour alone. A completed, consent-confirmed policy shows a simple black check mark next to "Ready to use as a draft," not green — the site's palette has none.
- Primary CTA and **Generate policy** buttons styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text); red stays reserved for the draft-warning state, never used for calls to action.
- The generated policy is rendered as a plain, document-like block — serif-adjacent spacing, generous line height, real headings — closer to a printed letter than a dashboard card, reflecting that its purpose is to be copied into a real document.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; 1px borders (`--line: #e5e5e2`), corner radius 10px (form fields) / 14px (output card), soft shadow only on the active output panel.
- Form fields use clear, generous spacing (no dense multi-column form on desktop beyond the requester-row pairs) — this tool rewards feeling unhurried, not rewarding speed.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Business Voice Use Policy Builder".
It is an English-language document-generation tool for Swiss business
owners and operations leads who are considering — or already use — a
cloned voice (of a founder, executive or staff member) for an AI phone
assistant, IVR greeting, marketing content or training material. It is
not a calculator, not a quiz, not a scenario simulator — its job is to
turn a reader's specific situation into an actual draft internal policy
document they can copy or print.

CONTEXT
The companion article's central argument: cloning a real person's voice
on purpose is safe only when three things are nailed down in writing —
who consented and for what specific purpose, who is allowed to generate
new audio with that voice, and what happens the day that person leaves —
and regardless of any of that, voice or video alone should never be
treated as sufficient authorisation for a sensitive action like moving
money or resetting a credential (the lesson of the 2024 Arup deepfake
fraud, in which fraudsters used AI-cloned video and audio of real
executives to authorise $25 million in transfers). This tool generates a
draft policy that always includes that verification rule, regardless of
what the user enters, because it is not optional.

FORM FIELDS (single column, in this order)
1. "Whose voice is this?" — free text, required. Label + helper text:
   "A name or role is enough — e.g. 'Maria Keller, Founder' or
   'Reception team lead.' Never enter an ID number, phone number or
   other sensitive personal data here."
2. "What is it being used for?" — required single-select dropdown or
   radio group: "AI phone assistant greeting" / "IVR or phone menu" /
   "Marketing or advertising content" / "Internal training or onboarding
   material" / "Other" (selecting Other reveals a required free-text
   field). Helper text: "The generated policy will state that any use
   beyond this purpose needs new, separate consent."
3. "Who is allowed to request new audio in this voice?" — repeatable
   rows, each with a Name field and a Role field, an "Add another
   person" button, and a small remove ("×") control per row once more
   than one row exists. At least one complete row is required.
4. "Has consent been given?" — required single-select: "Obtained in
   writing" / "Verbal only (not yet documented)" / "Not yet obtained."
   If "Obtained in writing" is selected, reveal an optional "Consent
   date" free-text field.
5. "When does this policy end or get reviewed?" — required single-
   select: "On a known departure or end date" (reveals a required date
   or free-text date field) / "Ongoing — no scheduled end date."

DISCLAIMER #1 (always visible above the form, not collapsible)
"This tool drafts a starting point for an internal voice-use policy
based on the framework in the accompanying article. It is not legal
advice and does not replace review by a qualified lawyer — especially
for anything involving an employee's consent, cross-border data, or a
specific fraud or liability concern."

GENERATE BUTTON
Labelled "Generate policy." Disabled (aria-disabled, not just visually
greyed out) until all required fields are filled, with a single calm
inline hint next to the first missing field (e.g. "Add at least one
authorised requester to continue") — no error-banner or alert-popup
styling. On click, enable and reveal the output panel below the form,
move keyboard focus to the output's first heading, and announce the
update via an aria-live="polite" region.

OUTPUT: GENERATED POLICY (5 sections, in this order, rendered as real
<h3> + <p> structure, styled like a plain printed document rather than a
dashboard card)

If Consent status is "Verbal only" or "Not yet obtained", show a fixed
banner ABOVE the whole generated policy, in the accent red (#c51a2e),
always paired with its own text, never colour alone:
  "⚠ DRAFT — NOT READY TO USE. Consent has not yet been confirmed in
  writing for the voice described below."
If Consent status is "Obtained in writing", show instead a plain black
check mark and the text "Consent confirmed — this is a draft ready to
review, not a legally finalised policy." (Do not use green anywhere —
the site's palette has none.)

1. SCOPE & PURPOSE
Template (substitute [VOICE] = the "whose voice" field and [PURPOSE] =
the selected/typed purpose):
"This policy governs the use of a voice clone of [VOICE] for the
following purpose only: [PURPOSE]. Any use beyond this stated purpose
requires new, separate consent before it begins."

2. CONSENT
If "Obtained in writing" (use [DATE] if a consent date was given, else
omit the date clause):
"[VOICE] gave informed, written consent for this specific purpose[ on
DATE, if given]. They received: a description of the exact purpose
above, the ability to review sample output before it went live, and an
explicit statement of their right to withdraw consent at any time. This
consent does not extend to any purpose not listed above."
If "Verbal only" or "Not yet obtained":
"No consent has been recorded in writing yet for [VOICE]. Before this
voice is cloned or used for [PURPOSE], obtain informed, written consent
covering: the specific purpose above, the chance to review output
before it goes live, and an explicit, ongoing right to withdraw."

3. ACCESS CONTROL
List every authorised-requester row as "Name (Role)"; if exactly one row
exists, use singular-aware phrasing:
"The following [person is / people are], and no one else, authorised to
generate new speech using this voice: [LIST]. Every generation request
should be logged with requester, date and stated purpose. Access to
voice generation should be kept separate from general content or chat
tools used for other work."

4. REVOCATION & OFFBOARDING
If a departure/end date was given ([DATE]):
"Consent and access end automatically on [DATE]. On that date: the
underlying voice model should be deleted or deactivated, all generation
access listed above tied to this voice should be revoked, and any
still-live use (such as a phone greeting) should be replaced or
separately reconfirmed in writing with [VOICE] before their departure."
If "Ongoing — no scheduled end date":
"No departure date is currently scheduled. This policy must be
revisited — and access revoked — the moment [VOICE] leaves the company
or formally withdraws consent, whichever happens first. Do not wait for
a scheduled review."

5. VERIFICATION RULE FOR SENSITIVE ACTIONS (fixed — always included,
identical structure regardless of inputs, only [VOICE] substituted)
"Regardless of how this voice is used, no one may authorise a payment, a
change of bank details, a credential reset or any other sensitive action
based on a voice or video call alone — including a call that sounds
exactly like [VOICE]. Any such request must be confirmed through a
second, independent channel, such as calling back a phone number already
on file before the call took place, not a number supplied during it."

CONTROLS BELOW THE OUTPUT
- "Copy to clipboard" button (uses the standard clipboard API, purely
  client-side).
- "Print" button (triggers window.print()).
- Small sidebar or footnote, always visible once output is generated:
  "Why this rule exists: in a widely reported 2024 case, fraudsters used
  AI-generated video and voice of real company executives on a video
  call to authorise roughly $25 million in transfers. The call looked
  and sounded completely real. Read the full article for the details."
  (Do not name the company inline here if it risks reading as a scare
  tactic in a UI context — a neutral, factual tone throughout.)

DISCLAIMER #2 (directly above the generated output, always visible,
not collapsible)
"This is a draft you have generated, not a finished or legally reviewed
policy. Have it checked by someone qualified before you rely on it,
particularly if consent has not yet been confirmed in writing."

CTA
Primary button, shown persistently below the output (and in a lower-
emphasis form even before the form is filled in):
  Label: "Ask about voice-cloning safeguards before you say yes"
  Link: https://www.weissmann.ai/en/services/ai-phone-assistant/
Secondary, lower-emphasis link near the top of the tool: "Read the full
article" (link to the article page). No countdowns, no fake urgency,
no "before it's too late" phrasing. CTA text and destination never
change based on form inputs.

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs, no localStorage/sessionStorage persistence — closing
or refreshing the tab clears everything entered. The form never asks for
a full legal name, ID number, phone number, email address or any other
sensitive personal data — only a first name/role is requested for the
voice owner and for each authorised requester, with a visible note
saying so near the first such field.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a plain
printed document, not a dashboard or chat app):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the draft-warning banner
    and its icon, always paired with text, never as a large fill or the
    only signal.
  Confirmed-consent state: near-black (#111111) with a simple check
    glyph — do NOT use green; the site's palette has none.
  Primary/Generate buttons: solid #111111 background, #ffffff text,
    hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (form fields) / 14px
    (output card). Soft shadow only on the output panel once generated:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Generated policy text styled with generous line height and real
    heading hierarchy, closer to a printed letter than a UI card.
  Layout: form at top (single column, generous spacing); Generate
    button becomes sticky near the bottom of the viewport on mobile
    once scrolled past; output appears below the form on both desktop
    and mobile, full width.

ACCESSIBILITY
Every field has a real visible <label>. Generate button uses
aria-disabled plus an inline text hint (never colour alone) while
incomplete. Output region uses aria-live="polite" and receives keyboard
focus on generation. The draft-warning banner uses role="status" or
equivalent and is never conveyed by colour alone. Minimum 4.5:1 text
contrast. Respect prefers-reduced-motion (no slide/fade reveal
animation). Generated sections use real <h3>/<p> markup, not bare divs,
so a screen reader can navigate section by section.

If JavaScript fails to load the interactive layer, the static HTML
should still show the form fields and one fully worked static example
(clearly fictional placeholder names, e.g. "Jane Doe, Reception") so the
page communicates what the tool does even without interactivity.

Do not fabricate or imply that any generated policy has been legally
reviewed, that Weissmann has reviewed it, or that following it
guarantees compliance with any specific law. Keep the tone factual and
calm throughout — this tool deals with real fraud and consent risk, and
should never use alarmist or urgent language to push the reader toward
a decision.
```
