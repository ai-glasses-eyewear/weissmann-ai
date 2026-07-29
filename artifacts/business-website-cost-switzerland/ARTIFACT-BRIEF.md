# ARTIFACT BRIEF — Swiss Website Budget and Quote Normaliser

**Companion article:** `business-website-cost-switzerland` (EN-WEB-01) — "How Much Does a Business Website Cost in Switzerland?"
**Artifact title:** Swiss Website Budget and Quote Normaliser
**Language:** English (en) only — matches the article; no DE/IT/FR version is commissioned.

---

## 1. User problem

An international founder or manager holds two or three CHF website quotes in their inbox that look nothing alike — different totals, different formats, different levels of detail — and has no reliable way to tell whether the gap between them is a scope difference or a straightforward rip-off. The article's method (thirteen questions, applied to every quote in the same order) is described in prose; nothing lets the reader actually run their own real quotes through it and see, side by side, which categories line up, which are silently missing, and which quotes flatly disagree on what is included. Without a structured place to do this, most readers fall back on comparing the one number they do understand — the total — which is exactly the mistake the article warns against.

## 2. Intended audience

International founders, relocating managers or local operations leads in Switzerland who already have two or three real website quotes (or draft quotes) in hand and need to compare them fairly before signing anything — not readers who are still building a budget from zero with no quotes yet.

## 3. Why an interactive artifact beats a static PDF

A static checklist tells the reader what to ask; it cannot hold their own three quotes next to each other and show where they actually diverge. The interactive version:
- Lets the reader enter what each of up to three real quotes states (or leaves unstated) across the article's own thirteen scope categories, instead of re-reading three PDFs manually and holding the comparison in their head.
- Surfaces, category by category, whether the quotes agree, disagree, or simply never said — the exact distinction the article's thesis rests on (scope, not honesty, drives the gap).
- Generates a personalised, copyable follow-up message per quote, listing only the categories that quote left unstated — turning a vague "can you clarify" into a specific, answerable request.
- Never computes or infers a price. A static comparison chart implies its output is a verdict; a tool that visibly says "these totals are not yet comparable until every category is specified" is honest about what can and cannot be concluded before the quotes are actually complete.

## 4. Inputs

The tool supports up to **three quotes** (labelled "Quote A", "Quote B", "Quote C" by default; the reader may rename each label, e.g. to a provider's first name only — see Privacy). For each quote the reader is entered into the tool, they set a status for each of the same **thirteen scope categories** (matching the article's method exactly):

1. Page count, defined precisely
2. Copywriting responsibility
3. Design origin (custom vs. template)
4. Language count, stated as a number
5. Revision rounds, as a number
6. Technical SEO & GEO foundation
7. Analytics setup (GA4 / Search Console)
8. Hosting & maintenance
9. Ownership after handover
10. Integrations (CRM / booking / payment)
11. Timeline & dependency on client-supplied content
12. Post-launch support minimum
13. VAT treatment (net or gross of Swiss VAT)

For each category, per quote, the reader picks one of three states:
- **Included / specified** — with an optional one-line free-text note (e.g. "3 rounds", "DE + EN only")
- **Excluded / not needed** — the quote explicitly says this is not included
- **Not stated in this quote** — the default; the quote simply never mentions it

Optionally, the reader may enter each quote's **total CHF figure** as a plain label (not used in any calculation — see Logic).

All thirteen categories default to "Not stated" for every quote until the reader changes them; the tool never assumes a category is included or excluded without the reader saying so.

## 5. Calculation / decision logic

- **No price is computed, inferred, or estimated at any point.** This is a hard rule. The tool's entire premise is that CHF totals cannot be compared until scope is aligned; the tool must never contradict that by producing its own number.
- **Per-category comparison:** for each of the thirteen categories, across whichever quotes have been entered (minimum two to activate the comparison view):
  - If every entered quote has a status other than "Not stated" → the category is marked **Comparable**, and each quote's status/note is shown side by side.
  - If one or more quotes are "Not stated" for that category → the category is marked **Unclear** and the specific quote(s) missing it are named; that category is added to each affected quote's gap list.
  - If quotes actively disagree (e.g. one "Included", another "Excluded") → the category is marked **Different scope — not the same offer**, shown as a highlighted difference rather than an error (this is useful signal, not a fault in the tool).
- **Scope completeness, per quote:** a simple count, "X of 13 categories specified" (Included or Excluded both count; "Not stated" does not). Always shown as a plain count, never rebadged as a quality score, a trust score, or anything correlated with price.
- **Comparability banner:** if any entered quote has fewer than 13 of 13 categories specified, a persistent banner reads "These totals are not yet comparable — N categories are still unclear across your quotes." Once every entered quote reaches 13 of 13, the banner changes to a neutral statement: "All categories specified for every quote — the totals below now describe the same scope." This is descriptive, never a recommendation of which quote to choose.
- **Total figures, if entered:** shown only as plain labels next to each quote's name, always beneath the comparability banner above, never highlighted, ranked, or visually implied as "best value".
- **No provider is ever favoured.** If a reader labels one quote "Weissmann", the tool treats it exactly like "Quote A" or "Quote B" — same logic, same display, no special styling, no automatic best-match flag.

## 6. Outputs

1. A thirteen-row comparison table (one row per scope category), with a column per entered quote, showing each quote's status (Included / Excluded / Not stated) and its optional note, plus a per-row flag: Comparable, Unclear, or Different scope.
2. A scope-completeness count per quote ("9 of 13 categories specified") shown as a plain fraction, never as a percentage bar, gauge or star rating.
3. The comparability banner (see Logic above), updating live as inputs change.
4. A personalised, copyable gap message per quote, built from the categories that quote left "Not stated", using the article's own script: "Before I compare this with another proposal, could you confirm [list of missing categories] so I'm comparing like for like?"
5. If total CHF figures were entered, a plain side-by-side label list of those totals, directly beneath the comparability banner, with no ranking, colour-coding, or "best deal" styling of any kind.

## 7. Error states

- Fewer than two quotes have any category set → the tool shows only that single quote's own gap list (which of the thirteen categories it has not yet specified) rather than a comparison view, with a plain prompt: "Add a second quote to see a side-by-side comparison."
- A fourth quote is attempted → the UI does not offer a fourth slot; a short note explains: "Compare in groups of up to three quotes at a time for clarity."
- A quote has all thirteen categories left at "Not stated" → that quote is flagged "Not enough detail to evaluate yet" and excluded from the per-category comparison view until at least one category is set, with a direct suggestion to send the gap message (all thirteen items) back to that provider first.
- JavaScript disabled → the static HTML still lists all thirteen categories with their plain-language definitions and the three status options, in a readable, unfiltered order (progressive enhancement, not a blank page).

## 8. Privacy considerations

- Fully client-side; nothing is transmitted anywhere. No field asks for a provider's full company name, a personal name, an email address, or any identifying detail — quote labels are free text the reader controls (defaulting to "Quote A/B/C") and the tool actively suggests keeping them generic.
- Optional CHF totals are treated as plain numbers with no other business-identifying data attached.
- If the build persists inputs via `localStorage` for convenience across a session, this must be disclosed in one visible line with a working "Clear all quotes" control.
- No analytics events tied to individual category selections are required for the tool to function; if added, they must be aggregate/anonymous only and disclosed.

## 9. Accessibility requirements

- The comparison table uses real `<table>` markup with proper `<th scope="col">` / `<th scope="row">` headers, not a bare grid of `<div>`s, so screen readers can navigate it category by category.
- All status selectors are fully keyboard-operable with visible focus states, grouped with `<fieldset>`/`<legend>` per category.
- Comparable / Unclear / Different-scope flags are always shown as text labels, never colour-only (an icon or colour may accompany the word, never replace it).
- The live comparability banner and completeness counts update inside an `aria-live="polite"` region so screen-reader users are told when a result changes without losing their place.
- Minimum 4.5:1 text contrast; respects `prefers-reduced-motion` (values update instantly, no animated counters).
- The gap-message text areas are properly labelled and their "Copy" buttons announce success/failure to assistive tech.

## 10. Mobile behaviour

- On narrow screens, the thirteen-category comparison renders as a stacked list of category cards (one card per category, with each quote's status listed inside), not a horizontally-scrolling wide table that hides columns.
- A small sticky bar at the top shows the current comparability banner text while scrolling through the category list, so the reader keeps context on a long page.
- Each quote's gap-message block has a full-width, thumb-reachable "Copy message" button.
- Status selectors and toggles are sized for touch (≥44×44px targets); adding a second or third quote is a single tap that reveals its column/card set without leaving the page.

## 11. Exact CTA

Primary CTA, shown persistently below the comparison results (available even with only one quote entered):

> **"Request an itemized Weissmann quote in this same scope format"** → links to `/en/kontakt/`

Secondary, lower-emphasis link near the top of the tool:

> "Read the full method behind these thirteen categories" → links to the article's own URL (`/en/ai-academy/marketing-seo-geo/business-website-cost-switzerland/`).

No countdown, no fake urgency, no "lock in this price" language. The CTA wording and destination never change based on which quotes score higher or lower on completeness, and the tool never implies that requesting a Weissmann quote is the only or obviously correct next step — it works identically well for comparing three quotes that have nothing to do with Weissmann at all.

## 12. Disclaimer

Include a short, visible note near the top of the tool and again next to the comparability banner:

> "This tool does not calculate or estimate a price. It compares what each of your quotes says — and does not say — across thirteen scope categories, so the totals you already have finally describe the same thing. It does not recommend a provider, and it works the same way regardless of who sent the quotes you enter."

This prevents the tool from being mistaken for a price calculator or a Weissmann-favouring sales tool, consistent with the article's central argument that a scope-less number cannot be judged fairly.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) reserved only for the "Different scope — not the same offer" flag, always paired with that exact text, never a large fill and never the only signal. "Unclear" uses a muted ink tone with its own label; "Comparable" uses the quietest ink-mute tone with its own label. No green or amber traffic-light system — the site's palette has no green.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- The thirteen-row comparison rendered as a genuine bordered table (thin 1px lines, `--line: #e5e5e2`), not a bar chart, gauge or scorecard visual — this keeps the "no fake precision" rule visible in the design itself.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the active comparability banner.
- Overall feel: a shared worksheet the reader fills in against real documents already in front of them, not a dashboard, quiz, or quote generator — calm, editorial, precise.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Swiss Website Budget and Quote
Normaliser". It is an English-language interactive worksheet for
founders and managers in Switzerland who already hold two or three real
website quotes and need to compare them fairly. It is explicitly NOT a
price calculator — it never computes, estimates or displays a CHF total
of its own invention.

CONTEXT
The companion article's thesis: when two Swiss website quotes for what
looks like the same brief differ by a factor of ten, the gap is almost
never dishonesty on either side — it's that "the same brief" was never
actually the same scope. The fix is mechanical: force every quote to
answer the same thirteen scope questions (page count, copywriting
responsibility, design origin, language count, revision rounds,
technical SEO/GEO foundation, analytics setup, hosting & maintenance,
ownership after handover, integrations, timeline dependency, post-launch
support, VAT treatment) before comparing the CHF figures at all. This
tool lets the reader actually do that with their own quotes.

QUOTES
Support up to THREE quotes, labelled "Quote A", "Quote B", "Quote C" by
default. Each label is an editable text field (the reader may rename it,
e.g. to a provider's first name — encourage keeping it generic, no full
company names or personal data needed). Provide an "Add a quote" control
that reveals Quote B and then Quote C; do not show a fourth slot — if
somehow requested, show a note: "Compare in groups of up to three quotes
at a time for clarity."

THIRTEEN SCOPE CATEGORIES (fixed IDs, fixed English labels — use exactly)
  page_count           → "Page count, defined precisely"
  copywriting           → "Copywriting responsibility"
  design_origin         → "Design origin (custom vs. template)"
  languages             → "Language count, stated as a number"
  revision_rounds       → "Revision rounds, as a number"
  seo_geo_foundation    → "Technical SEO & GEO foundation"
  analytics_setup       → "Analytics setup (GA4 / Search Console)"
  hosting_maintenance   → "Hosting & maintenance"
  ownership             → "Ownership after handover"
  integrations          → "Integrations (CRM / booking / payment)"
  timeline_dependency   → "Timeline & dependency on your content"
  post_launch_support   → "Post-launch support minimum"
  vat_treatment         → "VAT treatment (net or gross)"

For each category, for each entered quote, the reader picks ONE of:
  - "Included / specified" — reveals an optional one-line free-text note
    field (e.g. "3 rounds", "DE + EN only")
  - "Excluded / not needed"
  - "Not stated in this quote" (the default for every category, every
    quote, until the reader changes it)

Optionally, per quote, a plain numeric field: "Total quoted (CHF,
optional)". This number is NEVER used in any calculation — it is only
ever displayed as a plain label.

COMPARISON LOGIC (implement exactly — no numeric scoring formula, no
weighting, no invented price):
- The comparison view only activates once at least TWO quotes have at
  least one category set to something other than "Not stated".
- For each of the thirteen categories, across all entered quotes:
    - If every entered quote's status for that category is "Included"
      or "Excluded" (i.e. none are "Not stated") → mark the row
      "Comparable" and show each quote's status + note side by side.
    - If one or more entered quotes are "Not stated" for that category
      → mark the row "Unclear" and name exactly which quote(s) are
      missing it.
    - If the entered quotes' statuses disagree (e.g. one "Included",
      another "Excluded") → mark the row "Different scope — not the
      same offer" (a distinct visual flag, not an error state — this is
      useful information, not a fault).
- Scope completeness per quote = count of categories NOT "Not stated"
  out of 13, shown as "{n} of 13 categories specified". Never convert
  this into a percentage bar, star rating, or anything resembling a
  quality or price score.
- Comparability banner (persistent, updates live):
    - If any entered quote has fewer than 13 of 13 specified: "These
      totals are not yet comparable — {n} categories are still unclear
      across your quotes."
    - If every entered quote has reached 13 of 13: "All categories
      specified for every quote — the totals below now describe the
      same scope." (Still not a recommendation of which to pick.)
- If optional CHF totals were entered, show them as a plain label list
  directly under the comparability banner — same font weight and colour
  for every quote, no highlighting, ranking, "best value" badge, or
  colour-coding based on amount.
- Treat every quote label identically in all logic and styling. If a
  reader types "Weissmann" as a label, it must receive no special
  styling, no auto-flagged recommendation, and no different treatment
  from "Quote A".

GAP MESSAGE (generated per quote)
For each quote, list every category still "Not stated" and generate a
copyable message using this exact template, filling in the category
labels:
  "Before I compare this with another proposal, could you confirm
  {comma-separated list of missing category labels} so I'm comparing
  like for like?"
If a quote has zero "Not stated" categories, show: "This quote specifies
all thirteen categories — no follow-up needed." Include a "Copy message"
button using the Clipboard API with a manual-select fallback if it
fails (never throw a visible error to the user).

ERROR / EMPTY STATES
- Fewer than two quotes have any category set → show only that single
  quote's own gap list (all thirteen categories it hasn't specified
  yet), with the prompt: "Add a second quote to see a side-by-side
  comparison."
- A quote with all 13 categories still "Not stated" → label it "Not
  enough detail to evaluate yet" and exclude it from the per-category
  comparison table until at least one category is set; suggest sending
  its full gap message (all 13 items) to that provider first.
- JavaScript disabled → static HTML still lists all thirteen categories
  with plain-language one-line definitions and the three status options
  in a readable order (progressive enhancement, not a blank page).

OUTPUT LAYOUT
1. A genuine <table> with one row per scope category (13 rows) and one
   column per entered quote, each cell showing status + optional note,
   plus a row-level flag: "Comparable" / "Unclear" / "Different scope —
   not the same offer", always shown as text (icon/colour may
   accompany, never replace, the word).
2. Scope completeness per quote as a plain "{n} of 13 categories
   specified" line above or beside each quote's column.
3. The comparability banner, updating live, in an aria-live="polite"
   region.
4. Optional CHF total labels, plain list, no styling based on amount.
5. Per-quote gap-message boxes with "Copy message" buttons, below the
   table.

DISCLAIMER (always visible near the top of the tool, and repeated next
to the comparability banner)
"This tool does not calculate or estimate a price. It compares what each
of your quotes says — and does not say — across thirteen scope
categories, so the totals you already have finally describe the same
thing. It does not recommend a provider, and it works the same way
regardless of who sent the quotes you enter."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No field asks for a full company name, personal
name, email or address — quote labels default to "Quote A/B/C" and the
tool should suggest keeping them generic. If inputs are kept in
localStorage for convenience, disclose it in one visible line with a
working "Clear all quotes" button.

CTA
Primary button, always visible below the results:
  Label: "Request an itemized Weissmann quote in this same scope format"
  Link: https://www.weissmann.ai/en/kontakt/
Secondary, lower-emphasis link near the top: "Read the full method
behind these thirteen categories" (link to the article page). Do not
use countdowns, fake urgency, or "lock in this price" phrasing. Do not
change the CTA wording or styling based on which quote scores higher on
completeness — the tool must work identically well for quotes that have
nothing to do with Weissmann.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a shared
worksheet, not a dashboard, quiz or quote generator):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "Different scope — not
    the same offer" flag, always paired with that exact text, never a
    large fill or the only signal. "Unclear" uses a muted ink tone with
    its own label; "Comparable" uses the quietest ink-mute tone with its
    own label. Do NOT use green or a traffic-light system — the site's
    palette has no green.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the active comparability banner:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  The thirteen-row comparison is a genuine bordered table, NOT a bar
  chart, gauge, or scorecard visual — a chart-like visual would imply a
  measured quantity that does not exist here.
  Layout: quote columns/cards stack vertically on narrow screens instead
  of a horizontally-scrolling table; a small sticky bar shows the
  current comparability banner text while scrolling on narrow widths.

ACCESSIBILITY
Real <table> markup with <th scope="col"/"row"> headers, not bare divs.
Full keyboard operability for all status selectors with visible focus
states; proper fieldset/legend grouping per category. Comparable /
Unclear / Different-scope flags always shown as text, never colour-only.
aria-live="polite" region for the comparability banner and completeness
counts. 4.5:1 minimum contrast; respect prefers-reduced-motion (values
update instantly, no animated counters). Copy buttons announce success/
failure to assistive tech.

LANGUAGE
All UI copy in English. Do not add German, Italian or French
translations — this tool exists only in English.

Do not compute, display or imply any CHF total that the reader did not
type in themselves as a plain label. Never rank, colour-code, or
recommend based on price. Never give Weissmann (or any labelled quote)
special treatment in the logic or the visuals.
```
