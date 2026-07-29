# Artifact Brief — Interactive Small-Business Website Brief Builder

**Article:** `small-business-website-checklist-switzerland` (EN-WEB-04) — "The Small-Business Website Checklist Swiss Agencies Rarely Show Before the Quote"
**Language:** English (en) — article and artifact both English-only.
**Artifact type:** Fill-in brief assembler (distinct mechanic from the other EN-WEB artifacts: not a cost calculator like EN-WEB-01's quote normaliser, not a promo configurator like EN-WEB-02's package visualiser, not a due-diligence workspace for evaluating a vendor like EN-WEB-03, and not a triage/audit scorer like EN-WEB-05's redesign triage. This tool does not score, rank or calculate anything — it turns the reader's own answers to eight fixed questions into a structured, exportable brief document).

---

## 1. User problem

A small-business owner in Switzerland is about to ask for a website quote and has just read that most agencies never ask the eight questions that actually determine scope, price and outcome — audience, offer, calls to action, legal pages, proof, tracking, local details and content ownership. Knowing the eight questions exist is not the same as having answered them in a form a vendor can actually use. Left to a blank document or their own memory, most readers will answer two or three of the eight sections, forget the rest, and end up back where they started: a vague first call that a vendor has to spend time extracting basic facts during, instead of designing from. The reader needs a structured place to answer all eight sections once, see clearly what is still missing, and walk away with an actual document — not just an intention to write one later.

## 2. Intended audience

Owners, managers or office staff at a small or medium Swiss business — a clinic, a trade business, a consultancy, a shop, a hospitality operation — who are preparing to request a website quote from any vendor: an agency, a freelancer, a website-builder plan they will configure themselves, or Weissmann's own Starter Website. No technical or design background assumed.

## 3. Why an interactive artifact beats a static PDF

A printed checklist tells the reader what to think about but gives them nowhere to actually write the answer, so the thinking happens once, in passing, and evaporates. The interactive version:
- Gives every one of the eight sections its own labelled input fields with the article's own fill-in prompts shown as help text, so the reader answers in place rather than translating a checklist into their own document structure from scratch.
- Tracks completeness live ("14 of 24 answered") so the reader can see at a glance which sections are thin before they call it finished, instead of discovering the gap on a call with a vendor.
- Assembles the answers into one clean, structured document on demand — headed by section, in the same order a vendor would want to read them — which a blank page or a scattered set of sticky notes cannot do.
- Produces something copyable and exportable in one click, so the actual outcome of using the tool is a document the reader can paste into an email or attach as a file, not merely a completed form sitting in a browser tab.
- Persists answers locally between visits, so a reader can fill in three sections today and the rest tomorrow without losing what they already wrote — something a paper checklist handles by accident and a naive web form usually does not handle at all.

## 4. Inputs

Eight sections, each matching one section of the article, each with two to three free-text fields. No field is required; all fields accept plain text and are shown with the article's own guiding question as placeholder or help text.

1. **Audience**
   - Primary visitor (textarea) — "Describe your single most valuable visitor by situation, not demographic."
   - What they already believe or doubt (textarea) — "Price-shopping? Worried about reliability? Unsure you serve their area?"
   - Device and moment (text) — "Phone outside a competitor's door, or a calm read at a desk?"
2. **Offer**
   - Core offer in plain language (textarea) — "Your single most bookable service or product, the way a customer searches for it."
   - Secondary items (textarea) — "Two or three things people ask about that do not need their own page yet."
   - Deliberate exclusions (text) — "Anything you do not offer, so the site does not invite the wrong enquiries."
3. **Calls to action**
   - Primary homepage action (text) — "Call, book, or fill a form — pick one."
   - Phone preference (text) — "Preferred first contact, or a friction point to route around?"
   - Response commitment (text) — "What happens within one business day of that action?"
4. **Legal pages**
   - Registered legal name and form (text) — "Exact legal name and form, not a trading name."
   - Postal address and contact (textarea) — "Real address and a working way to make contact."
   - Privacy-notice owner (text) — "Who keeps the privacy notice current as tools change?"
5. **Reviews and proof**
   - Existing review locations (textarea) — "Where reviews already exist, and who holds each login."
   - Concrete outcomes (textarea) — "Two or three honest, specific outcomes — no invented quotes."
   - Plan if none exist yet (text) — "How you will start asking once the new site is live."
6. **Tracking and analytics**
   - Account ownership (text) — "Who creates and controls the GA4 / Search Console account?"
   - Key monthly metric (text) — "Enquiries, calls, or bookings — the one number that matters."
   - Existing tracking to carry over (text) — "Any old analytics account or pixel not to abandon."
7. **Local details**
   - Phone number and who answers (text) — "+41 landline, mobile, or a dedicated line — and who picks up."
   - Address exactly as it should appear (textarea) — "Same wording everywhere: GBP, footer, legal notice."
   - Languages actually used by customers (text) — "Not just the canton's official language."
8. **Content ownership**
   - Domain registration (text) — "Must sit in your business's name, whoever pays the invoice."
   - Copy and photo ownership (text) — "Do these become your property on final payment?"
   - Handover access (text) — "Real admin logins at handover, not a verbal promise."

## 5. Assembly logic (no calculations, no scoring)

- This tool does not compute a score, a price, a recommendation or a ranking of any kind. Its only logic is assembly and completeness tracking.
- **Completeness counter:** count of non-empty fields out of 24, shown persistently (e.g. "14 of 24 answered") and broken down per section (e.g. a small "2 of 3" badge next to each section heading) so the reader can see exactly which sections are thin.
- **No field is ever required.** An empty field is simply omitted from the assembled document rather than shown as blank or as an error — a brief with twelve honest answers is more useful than one padded with placeholder text to look complete.
- **Assembled document generation:** on request, the tool compiles all non-empty answers into one continuous document, in the fixed order Audience → Offer → Calls to Action → Legal Pages → Reviews and Proof → Tracking and Analytics → Local Details → Content Ownership, each answer under its own field label, with a one-line header ("Website brief — prepared with Weissmann's Small-Business Website Checklist, [today's date]") and the standing legal disclaimer (see §12) appended once at the end.
- **No vendor bias anywhere in the logic.** The assembled document is generic prose the reader can send to any vendor; it never mentions Weissmann inside the document body itself, only in the one-line header crediting where the checklist came from — and that header line can be deleted by the reader before sending, which must be stated explicitly next to the export controls.

## 6. Outputs

1. **Live completeness counter** — overall ("14 of 24 answered") and per-section badges, updating as the reader types.
2. **Assembled brief document** — a preview pane showing the compiled document as it will be copied or downloaded, updating live as fields change.
3. **Copy to clipboard** — one click copies the assembled document as plain text, ready to paste into an email or a proposal request.
4. **Download as a text file** — a client-side download (no server involved) of the same document as a `.txt` file, named from the business name if entered, or "website-brief.txt" otherwise.
5. **Print-friendly view** — a clean, single-column layout suitable for the browser's native print-to-PDF, for readers who want a physical or PDF copy rather than a pasted email.

## 7. Error states

- No fields filled in yet → completeness counter reads "0 of 24 answered," export buttons remain visible but disabled with a plain tooltip ("Answer at least one question to build your brief"), never a blocking error message.
- Only some sections answered → the assembled document simply omits empty sections' unanswered fields; it never inserts "(not answered)" placeholders that would make the brief look broken or incomplete to a vendor reading it.
- Copy-to-clipboard blocked by browser permissions → a visible fallback shows the assembled text in a selectable text box with "select all" pre-highlighted, so the reader can copy manually.
- JavaScript disabled — the eight sections and their questions still render as a plain, fillable HTML form (the browser's own "Print" function still works on the filled-in page); only the live assembly preview and one-click copy require the interactive layer.

## 8. Privacy considerations

- Fully client-side. Nothing the reader types is transmitted anywhere — no server, no analytics call, no network request of any kind.
- If the build persists entries in browser local storage so a reader can return later, this is disclosed in one visible line next to an always-available "clear all answers" control, and no answer is ever synced, emailed or shared automatically without the reader's own copy/download action.
- Because the fields ask about the reader's own business (legal name, address, phone number, domain), not about any third party or customer, there is no personal data belonging to someone else collected or stored anywhere in this tool.

## 9. Accessibility requirements

- Every field has a real, visibly associated `<label>` (not a placeholder standing in for a label) plus the article's guiding question as separate help text below the input.
- The completeness counter and per-section badges update via an `aria-live="polite"` region so screen-reader users hear progress without it interrupting typing.
- Full keyboard operability for every field, the section navigation, and both export buttons, with visible focus states throughout.
- Minimum 4.5:1 text contrast; respects `prefers-reduced-motion` — the assembled-document preview updates instantly with no slide or fade transition when reduced motion is requested.
- The eight sections are marked up as a genuine sequence of `<section>`/`<fieldset>` elements with proper headings, so screen-reader users can jump section to section rather than tabbing through 24 unlabelled fields in a flat list.

## 10. Mobile behaviour

- Below ~640px, the eight sections render as a stacked accordion (one section expanded at a time) rather than one long scroll of 24 fields at once, so the reader is never lost in an undifferentiated wall of inputs.
- Textareas auto-grow to fit content rather than becoming small scrollable boxes on a small screen.
- The completeness counter and the "Copy" / "Download" buttons stay pinned in a slim bar at the bottom of the viewport, always reachable without scrolling back to the top.
- The assembled-document preview becomes a full-screen, dismissible overlay on mobile rather than a side-by-side pane, since there is no room for both the form and the preview at once on a small screen.

## 11. Exact CTA

Primary CTA, shown persistently below the tool, not gated behind completing any section:

> **"Bring your finished brief to us, or to any web design partner you are considering"** → links to `/en/kontakt/`

Secondary, lower-emphasis link near the top of the tool:

> "Read the full article: what to decide before you ask for a quote" → links to the article's own page (`/en/ai-academy/marketing-seo-geo/small-business-website-checklist/`).

No countdown, no fake urgency, no "before it's too late" language. The primary CTA text and destination never change based on how complete the brief is, and never claim or imply that only Weissmann can use the finished document.

## 12. Disclaimer

Two short, always-visible notes:

> **Ownership note:** "Every answer here comes from you and stays on your device until you copy or download it. This brief is not addressed to Weissmann specifically — it is written to be handed to any web design agency, freelancer or platform you are considering, Weissmann included."

> **Legal note (shown near the Legal Pages section):** "Switzerland requires businesses offering goods or services electronically to disclose clear identity and contact information (commonly called an Impressum), and a separate privacy notice wherever personal data is collected. This is a general requirement stated simply, not legal advice on the exact wording your business needs — confirm specifics with a Swiss lawyer or trust adviser."

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text and help copy.
- Accent colour `--accent: #c51a2e` (Swiss red) used sparingly — only for the "answer at least one question" empty-state note and any inline validation-style hints, never as a large fill or a warning-heavy palette; this is a calm working document, not an alert screen.
- Section badges ("2 of 3") styled as simple bordered pills, `--ink-mute` text on `--paper-soft`, turning to solid `--ink` text once a section is fully answered — no colour-only signal (green/red), since completion is communicated through the number and label together.
- Primary export buttons ("Copy brief", "Download as text") styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text); the print/PDF option as a secondary outlined button.
- Fields and section cards rendered as simple bordered elements (thin 1px borders, `--line: #e5e5e2`), corner radius `10px`/`14px`, soft shadow (`--shadow`) only on the section currently being edited.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; the assembled-document preview uses a clean serif or monospace treatment to visually read as "a document," distinct from the sans-serif form fields around it.
- Overall feel: a working intake form on quality stationery, not a SaaS dashboard or a gamified quiz — no progress-bar confetti, no scorecard styling, no vendor logos anywhere inside the assembled document.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Small-Business Website Brief
Builder". It is an English-language tool that lets a Swiss small-business
owner answer eight fixed sets of questions about their own business and
assemble the answers into one clean, exportable brief document they can
hand to ANY web design vendor — an agency, a freelancer, a website
builder, or Weissmann — before requesting a quote. It is NOT a
calculator, NOT a quiz with right/wrong answers, and NOT a lead-scoring
tool. It has no score, no ranking, no recommendation logic of any kind —
its only job is to collect the reader's own free-text answers and
compile them into a document.

CONTEXT
The companion article's thesis: most web design quotes in Switzerland
arrive before a business has actually decided who the site is for, what
it sells, what action each page should drive, which legal pages
Switzerland requires, what proof of trust already exists, who owns the
analytics accounts, the local details a visitor needs, and who owns the
content and domain after launch. Deciding these eight things yourself,
in writing, before contacting any vendor turns a vague first call into a
comparable, checkable quote. This tool is the fill-in version of that
brief.

DATA MODEL — eight sections, in this exact order, each with the fields
below. Each field is optional free text (textarea unless marked "text"
for a single-line input). Use the article's own prompts as placeholder
text or help text under each field's label — do not invent different
wording.

1. AUDIENCE
   - "Primary visitor" (textarea) — help text: "Describe your single
     most valuable visitor by situation, not demographic (e.g. 'a
     facilities manager comparing three cleaning contractors on a
     Tuesday afternoon', not 'SMEs in the Zurich area')."
   - "What they already believe or doubt" (textarea) — help text: "Are
     they price-shopping, worried about reliability, unsure you serve
     their area?"
   - "Device and moment" (text) — help text: "Phone outside a
     competitor's door, or a calm read at a desk?"

2. OFFER
   - "Core offer in plain language" (textarea) — help text: "Your
     single most bookable service or product, the way a customer
     searches for it, not the way your industry describes it."
   - "Secondary items" (textarea) — help text: "Two or three things
     people ask about that do not need their own page yet."
   - "Deliberate exclusions" (text) — help text: "Anything you do not
     offer, so the site does not invite the wrong enquiries."

3. CALLS TO ACTION
   - "Primary homepage action" (text) — help text: "Call, book, or fill
     a form — pick the one action that matters most."
   - "Phone preference" (text) — help text: "Is a phone call your
     preferred first contact, or a friction point to route around?"
   - "Response commitment" (text) — help text: "What happens within one
     business day of that action being taken?"

4. LEGAL PAGES
   - "Registered legal name and form" (text) — help text: "Exact legal
     name and form as registered, not a trading name."
   - "Postal address and contact" (textarea) — help text: "A real
     address and a working way to make contact."
   - "Privacy-notice owner" (text) — help text: "Who keeps the privacy
     notice current as tools change?"

5. REVIEWS AND PROOF
   - "Existing review locations" (textarea) — help text: "Where reviews
     already exist (Google Business Profile, directories, Facebook) and
     who holds each login."
   - "Concrete outcomes" (textarea) — help text: "Two or three honest,
     specific outcomes — do not invent a quote nobody gave you."
   - "Plan if none exist yet" (text) — help text: "How you will start
     asking for reviews once the new site is live."

6. TRACKING AND ANALYTICS
   - "Account ownership" (text) — help text: "Who creates and controls
     the GA4 / Search Console account — it should be your business, not
     the vendor's."
   - "Key monthly metric" (text) — help text: "Enquiries, calls, or
     bookings — the one number that actually matters to you."
   - "Existing tracking to carry over" (text) — help text: "Any old
     analytics account or social pixel not to abandon."

7. LOCAL DETAILS
   - "Phone number and who answers" (text) — help text: "A +41
     landline, a mobile line, or a dedicated line for the website — and
     who genuinely answers it."
   - "Address exactly as it should appear" (textarea) — help text: "The
     same wording everywhere it is used: Google Business Profile, the
     site footer, the legal notice."
   - "Languages actually used by customers" (text) — help text: "Not
     just the official language of your canton."

8. CONTENT OWNERSHIP
   - "Domain registration" (text) — help text: "Must sit in your
     business's name, regardless of who pays the renewal invoice."
   - "Copy and photo ownership" (text) — help text: "Do you expect the
     written copy and photography to become your property on final
     payment?"
   - "Handover access" (text) — help text: "Real admin logins at
     handover, not a verbal promise to 'reach out if anything comes
     up'."

COMPLETENESS TRACKING
- Count non-empty fields out of 24 total, shown as a persistent counter
  (e.g. "14 of 24 answered").
- Show a small "(n of 3)" badge next to each of the 8 section headings,
  updating live as the user types. No field is ever required; nothing
  blocks the user from exporting a partial brief.

DOCUMENT ASSEMBLY
- On demand (and live in a preview pane as the user types), compile all
  NON-EMPTY answers into one continuous plain-text document, in the
  fixed section order above, each answer under its own field label as a
  sub-heading. Skip any field left empty entirely — do not insert
  "(not answered)" placeholders.
- Prepend a one-line header: "Website brief — prepared with Weissmann's
  Small-Business Website Checklist, [today's date]" and note next to
  the export controls that this header line can be deleted before
  sending, since the document itself must read as vendor-neutral.
- Append the legal disclaimer (see DISCLAIMERS below) once, at the very
  end of the assembled document, every time it is copied, downloaded or
  printed.

OUTPUTS / CONTROLS
- "Copy to clipboard" button — copies the assembled document as plain
  text. If the Clipboard API is unavailable or blocked, fall back to
  showing the text in a selectable `<textarea readonly>` with its
  content pre-selected, plus a one-line instruction to copy manually.
- "Download as .txt" button — triggers a client-side text file download
  (via a Blob and a temporary anchor element; no server involved),
  named from the business name if the reader entered one anywhere,
  otherwise "website-brief.txt".
- A print-friendly view/stylesheet (`@media print`) that renders only
  the assembled document cleanly for the browser's native print-to-PDF,
  hiding all form controls and buttons.

ERROR / EMPTY STATES
- Zero fields filled in: counter reads "0 of 24 answered"; both export
  buttons are visibly present but disabled, with a tooltip/aria-label
  "Answer at least one question to build your brief" — never a blocking
  modal or a red error banner.
- Partially filled: assembled document simply omits empty fields; this
  is normal, expected behaviour, not an error state.

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. If you persist answers in localStorage so a user can
return later, disclose this in one visible line next to an
always-available "Clear all answers" control. Never auto-send, sync, or
transmit any entered text anywhere.

DISCLAIMERS (always visible, not collapsible away)
1. Near the top of the tool: "Every answer here comes from you and
   stays on your device until you copy or download it. This brief is
   not addressed to Weissmann specifically — it is written to be handed
   to any web design agency, freelancer or platform you are considering,
   Weissmann included."
2. Near the Legal Pages section specifically: "Switzerland requires
   businesses offering goods or services electronically to disclose
   clear identity and contact information (commonly called an
   Impressum), and a separate privacy notice wherever personal data is
   collected. This is a general requirement stated simply, not legal
   advice on the exact wording your business needs — confirm specifics
   with a Swiss lawyer or trust adviser."

CTA
Primary button, always visible below the tool (not gated behind any
interaction):
  Label: "Bring your finished brief to us, or to any web design partner you are considering"
  Link: https://www.weissmann.ai/en/kontakt/
Secondary, lower-emphasis link near the top: "Read the full article:
what to decide before you ask for a quote" (link to the article page).
No countdowns, no fake urgency, no "before it's too late" language. The
CTA never changes based on how complete the brief is.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a working
intake form on quality stationery, not a SaaS dashboard or a gamified
quiz):
  Background: #ffffff, secondary panels/section cards #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/help text.
  Accent (Swiss red): #c51a2e — used sparingly, only for the empty-state
    note near the disabled export buttons; never a large fill, never a
    general warning colour.
  Section-completion badges: bordered pill, muted grey text/background
    while incomplete, switching to solid near-black text once that
    section's fields are all filled — no red/green traffic-light colour
    coding.
  Primary buttons ("Copy brief", "Download as text"): solid #111111
    background, #ffffff text, hover #2b2b2b. Secondary button (print):
    outlined, same corner radius.
  Borders: 1px solid #e5e5e2. Corner radius 10px (fields) / 14px
    (section cards). Soft shadow only on the section currently focused:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Fonts: 'Instrument Sans' with system-sans-serif fallback for all form
    UI; the assembled-document preview pane uses a clean serif (or
    monospace) treatment so it visually reads as "a document" distinct
    from the surrounding form.
  Explicitly avoid: progress-bar gamification, confetti, star ratings,
    scorecard/leaderboard styling, or any Weissmann logo/branding placed
    inside the assembled document itself (only the one removable header
    line references where the checklist came from).

ACCESSIBILITY
Every field has a real, visible <label> (not a placeholder standing in
for one) plus separate help text below it. Completeness counter and
section badges update via an aria-live="polite" region. Full keyboard
operability for every field and both export buttons, with visible focus
states. Minimum 4.5:1 contrast. Respect prefers-reduced-motion — the
live preview updates instantly, no slide/fade. Mark up the eight
sections as real <section>/<fieldset> elements with proper headings, not
bare divs, so screen-reader users can navigate section by section.

MOBILE BEHAVIOUR
Below ~640px: render the eight sections as a stacked accordion (one
section open at a time) rather than one long scroll of 24 fields.
Textareas auto-grow instead of becoming small internally-scrolling
boxes. Keep the completeness counter and the two export buttons pinned
in a slim bottom bar, always reachable. The assembled-document preview
becomes a full-screen, dismissible overlay on mobile rather than a
side-by-side pane.

LANGUAGE
All UI copy, help text and the assembled document itself are in
English. Do not add German, Italian or French translations — this tool
exists only in English, matching its companion article.

NEUTRALITY (hard requirement)
The assembled document must never mention Weissmann inside its body
text, must never imply it can only be used with Weissmann, and must
work identically well handed to any agency, freelancer or platform. Do
not fabricate example answers, sample business names, or placeholder
testimonials anywhere in the UI — every field starts genuinely empty.
```
