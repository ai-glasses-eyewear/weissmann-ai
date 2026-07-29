# ARTIFACT BRIEF — Three-Year Website Total-Cost Calculator

**Companion article:** `website-versteckte-kosten-drei-jahre` (DE-WEB-07) — "Die versteckten Kosten einer billigen Website: Ein Drei-Jahres-Rechenbeispiel"
**Artifact title:** Drei-Jahres-Website-Kostenrechner
**Language:** German (de) only — matches the article; no EN/IT/FR version is commissioned.

---

## 1. User problem

A reader comparing website offers can see the sticker price of each option but has no way to project what any of them will actually cost by year three — hosting, licence renewals, an eventual redesign, and (if code/content ownership is unclear) a possible migration bill. The article's worked example uses three fixed illustrative scenarios to teach the mechanic; it deliberately does not — and cannot — tell the reader what *their* specific offer will cost, because that depends on numbers only the reader has. Without a tool, the reader either re-does the arithmetic by hand or falls back to comparing only the two sticker prices the article opens by warning against.

## 2. Intended audience

Swiss SME owners, office managers or marketing leads sitting between two or more real website offers (or between "keep the cheap site" and "invest in a rebuild") who want to see their own numbers projected across three years before deciding — not a generic market benchmark.

## 3. Why an interactive artifact beats a static PDF

A static PDF can only ever show the article's own three illustrative scenarios (CHF 1'590 / CHF 2'390 / CHF 3'940) — numbers the article repeatedly labels as an example, not a prediction for the reader's project. A calculator that accepts the reader's own start price, hosting cost, maintenance plan, redesign timing and licence costs produces a projection that is actually about their situation, while showing every line of arithmetic openly (the article's central complaint about vague "SEO inklusive"-style offers is that nothing is shown — this tool cannot repeat that mistake). It also makes the article's fairness point tangible: the same tool, fed different assumptions, can make a cheap DIY option come out ahead or behind — nothing is hard-coded to favour one path.

## 4. Inputs

1. **Startpreis (CHF)** — number input, the one-time build/setup cost paid in Year 1. No default; required.
2. **Jährliche Hosting- und Domainkosten (CHF)** — number input, applied identically in Year 1, 2 and 3. Default 0 (some Baukasten-Abos bundle this into the subscription fee below instead).
3. **Laufendes Abo (CHF pro Monat)** — number input for subscription-style products (Baukasten, some managed plans). Default 0. Converted to an annual figure internally (× 12) and applied every year.
4. **Wartungsvertrag** — toggle: "Ja, mit monatlicher Wartungsgebühr" (reveals a CHF/Monat field, default 0, × 12 applied every year) vs. "Nein / in Eigenregie" (no fee, but triggers an on-screen note that the reader's own time is a real, unbezifferter cost, consistent with the article's own disclosure rule).
5. **Zusätzliche Jahreslizenzen (CHF pro Jahr)** — number input for plugins/extensions/third-party tools billed yearly. Default 0. Applied every year the reader marks as active (see input 6).
6. **In welchem Jahr wird die zusätzliche Lizenz nötig?** — single-select: "Ab Jahr 1", "Ab Jahr 2", "Ab Jahr 3", "Nicht benötigt" — governs from which year input 5 is added.
7. **Erwarteter Redesign-Zeitpunkt** — single-select: "Kein Redesign in den nächsten 3 Jahren", "Jahr 1", "Jahr 2", "Jahr 3". When a year is chosen, a **Redesign-Kosten (CHF)** field appears (no default; required once a year is chosen) added once, in that year only.
8. **Eigentum an Code und Inhalten geklärt?** — toggle: "Ja, ich kann exportieren / mitnehmen" vs. "Nein / unklar". When "Nein/unklar" is selected, an optional **Geschätzte Migrationskosten, falls nötig (CHF)** field appears, defaulting to blank/not included — the tool never invents this figure; it only adds it to a year (selectable: Jahr 1/2/3) if the reader actively enters one.
9. **Wie wichtig ist die Website für neue Anfragen?** — single-select: "Eher gering (z. B. Visitenkarte, Empfehlungsgeschäft)", "Mittel", "Hoch (Website ist ein Hauptkanal für neue Anfragen)". This drives only a qualitative note in the output (see §5/§6) — it never converts to a CHF line, matching the article's explicit refusal to fabricate a conversion-loss figure.

All numeric inputs accept only non-negative numbers; the tool does not pre-fill any of them with the article's own illustrative example numbers (CHF 300, CHF 900, CHF 2'500, etc.) so a reader cannot mistake the article's example for a live default.

## 5. Calculation / decision logic

- **Fully additive, no hidden weighting.** For each of Year 1, Year 2 and Year 3:
  `Jahreskosten = (Startpreis, nur Jahr 1) + Hosting/Domain + (Abo × 12) + (Wartungsgebühr × 12, falls aktiv) + (Jahreslizenz, falls ab diesem Jahr aktiv) + (Redesign-Kosten, nur im gewählten Jahr) + (Migrationskosten, nur falls eingetragen und diesem Jahr zugeordnet)`
- **Three-year total** is the plain sum of the three year figures — never rounded, discounted or weighted.
- **No invented figures.** Every number in the total was typed in by the reader. The tool performs arithmetic only; it never substitutes a market-average, a benchmark, or one of the article's own illustrative numbers.
- **Qualitative risk flags (never converted to CHF):**
  - If "Wartungsvertrag: Nein/Eigenregie" → show a fixed note: "Ihre eigene Zeit für Pflege und Updates ist nicht in dieser Summe enthalten, aber real."
  - If "Eigentum: Nein/unklar" and no migration figure was entered → show a fixed note: "Migrationsrisiko nicht beziffert — Sie haben kein Eigentum an Code/Inhalten angegeben, aber keine Migrationskosten eingetragen. Diese Summe könnte im Ernstfall höher ausfallen."
  - The "Wie wichtig ist die Website für neue Anfragen" answer only ever changes the wording of one fixed disclaimer sentence about performance/conversion (three pre-written variants, gering/mittel/hoch) — it never multiplies into the total.
- **Comparison mode (optional, not required to use the tool):** the reader may fill in the form twice — once per option being compared — and the tool keeps both projections on screen side by side with the same line-by-line breakdown, so the comparison stays as transparent as the single-scenario view. Neither slot is pre-labelled "Weissmann" or "Baukasten" — both are neutral "Option A" / "Option B" containers the reader fills with their own real offers.

## 6. Outputs

1. A year-by-year table (Jahr 1 / Jahr 2 / Jahr 3), each row listing every contributing line item with its amount, so the reader can trace exactly how each year's figure was built — never a single number without its components.
2. The three-year total, computed live as inputs change.
3. The qualitative risk notes described in §5, shown as plain text next to the total, never folded into it.
4. If comparison mode is used: both options' tables and totals shown side by side (or stacked on mobile — see §10), with a plain-language final line ("Option A liegt über drei Jahre CHF X unter/über Option B") — described neutrally, never as "Sie sollten wählen…".
5. A "Rechnung kopieren" block: a plain-text summary of every input and the resulting year-by-year figures, for pasting into an email or note.

## 7. Error states

- Startpreis left empty → the year-by-year table and total stay hidden with the prompt "Geben Sie mindestens den Startpreis ein, um eine Projektion zu sehen." (the only required field).
- A redesign year is chosen but the Redesign-Kosten field is left empty → that year's table row shows "Redesign-Kosten fehlt" instead of silently treating it as CHF 0, so the omission is visible rather than hidden.
- Negative numbers entered in any field → field-level validation message "Bitte eine Zahl ab 0 eingeben"; the total does not compute until fixed.
- JavaScript disabled → a static explanation of the formula (the same line shown in §5) renders in plain text so the page is not blank, with a note that the interactive projection requires JavaScript.

## 8. Privacy considerations

- Fully client-side; no input is transmitted anywhere. No field asks for a name, company, email address or exact business identity.
- If inputs are held in `localStorage` for convenience between visits, this is disclosed in one visible line with a working "Eingaben zurücksetzen" control.
- No analytics tied to individual input values; if aggregate, anonymous usage analytics are added, this must be disclosed.

## 9. Accessibility requirements

- All numeric fields, toggles and selects are keyboard-operable with visible focus states, grouped with `<fieldset>`/`<legend>` per logical group (Startkosten, laufende Kosten, Redesign, Eigentum, Wichtigkeit).
- The live-updating table and total are wrapped in an `aria-live="polite"` region so screen-reader users hear the update without losing their position in the form.
- Minimum 4.5:1 text contrast; respects `prefers-reduced-motion` (totals update instantly, no animated counting).
- The year-by-year breakdown is marked up as a real `<table>` with proper header cells, not a styled `<div>` grid.

## 10. Mobile behaviour

- Single-column stacked form; the output table renders below the form and scrolls into view as fields are completed, rather than requiring a tab switch.
- In comparison mode, Option A and Option B stack vertically on narrow screens (rather than side by side) with a clear heading per option; the "difference" summary line stays pinned above both once both totals exist.
- The "Rechnung kopieren" button is full-width and thumb-reachable; all numeric inputs use `inputmode="decimal"` for the correct mobile keyboard.

## 11. Exact CTA

Primary CTA, shown persistently below the output:

> **"Eigene Website-Kosten über drei Jahre einordnen lassen"** → links to `/kontakt/`

Secondary, lower-emphasis link near the top of the tool:

> "Zum Artikel mit dem Rechenbeispiel und der Kostentreiber-Checkliste: Artikel lesen" → links to the article's own URL (`/ki-academy/marketing-seo-geo/website-versteckte-kosten-drei-jahre/`).

No countdown, no fake urgency. Wording and destination never change based on which numbers the reader enters or which option (A/B) projects lower.

## 12. Disclaimer

Shown near the top of the tool, and repeated above the total:

> "Dieser Rechner verwendet ausschliesslich Ihre eigenen Eingaben. Er kennt keine Marktdurchschnitte und ergänzt keine fehlenden Zahlen automatisch. Entgangene Anfragen durch schlechte Performance oder ein Migrationsrisiko ohne Code-Eigentum werden als Hinweis angezeigt, nicht in Franken beziffert — dazu erklärt der Artikel, warum."

This keeps the tool consistent with the article's explicit refusal to invent cost statistics.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only for the risk-note icons/labels (migration risk, unbezifferte Zeit) — never as a large fill, never the only signal (always paired with the note's text).
- Primary CTA button: solid `--btn-bg: #111111`, hover `#2b2b2b`, white text.
- The year-by-year breakdown is a real bordered `<table>` (1px lines, `--line: #e5e5e2`) — deliberately plain, not a bar chart or stacked-area chart, so the tool never visually implies more precision or trend data than three discrete, reader-supplied years actually provide.
- Typography `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the active output panel.
- Overall feel: a spreadsheet-like worksheet the reader fills in line by line — calm and legible, not a dashboard or gamified "score".

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Drei-Jahres-Website-Kostenrechner"
(Three-Year Website Total-Cost Calculator). It is a German-language (de-CH)
interactive worksheet that projects a reader's OWN website costs across
three years, showing every line of arithmetic — it never substitutes a
market average or an invented number for a field the reader left blank.

CONTEXT
The companion article's thesis: a website's sticker price is not its
three-year cost. The article walks through three illustrative, clearly
labelled example scenarios (a DIY subscription site, a cheap one-time
build with no maintenance plan, and a professionally built site with a
maintenance contract) and finds — honestly, without rigging the outcome —
that the DIY option is cheapest in raw cash over three years in that
specific example, while the cheap one-time build without a maintenance
plan or ownership clarity ends up the riskiest because of migration cost
if the freelancer disappears. The article explicitly refuses to invent a
CHF figure for lost conversions from poor performance, or for the
reader's own time spent on maintenance — those are shown as qualitative
notes, never folded into a total. This tool must follow the exact same
rule: it computes only with numbers the reader actually types in.

INPUTS (single scenario; a "Vergleichsmodus" toggle duplicates the whole
form into Option A / Option B — see COMPARISON MODE below)
1. Startpreis (CHF) — number, required, no default (do not pre-fill with
   any of the article's own example numbers).
2. Jährliche Hosting- und Domainkosten (CHF) — number, default 0.
3. Laufendes Abo (CHF pro Monat) — number, default 0. Internally ×12 per
   year.
4. Wartungsvertrag — toggle: "Ja, mit monatlicher Gebühr" (reveals CHF/Monat
   field, default 0, ×12 per year) vs. "Nein / in Eigenregie" (adds CHF 0,
   but always shows the note: "Ihre eigene Zeit für Pflege und Updates ist
   nicht in dieser Summe enthalten, aber real.").
5. Zusätzliche Jahreslizenzen (CHF pro Jahr) — number, default 0.
6. Ab welchem Jahr benötigt? — select: "Ab Jahr 1" / "Ab Jahr 2" /
   "Ab Jahr 3" / "Nicht benötigt" — governs which years include input 5.
7. Erwarteter Redesign-Zeitpunkt — select: "Kein Redesign in den nächsten
   3 Jahren" / "Jahr 1" / "Jahr 2" / "Jahr 3". Choosing a year reveals a
   required "Redesign-Kosten (CHF)" field, added once, only in that year.
   If the year is chosen but the cost field is left empty, that year's
   table row must show "Redesign-Kosten fehlt" instead of silently using 0.
8. Eigentum an Code und Inhalten geklärt? — toggle: "Ja, ich kann
   exportieren / mitnehmen" vs. "Nein / unklar". Choosing "Nein/unklar"
   reveals an OPTIONAL "Geschätzte Migrationskosten, falls nötig (CHF)"
   field (blank by default, never auto-filled) plus a year-select (Jahr
   1/2/3) for when to add it if the reader supplies a number. If left
   blank, show the fixed note instead of a number: "Migrationsrisiko nicht
   beziffert — Sie haben kein Eigentum an Code/Inhalten angegeben, aber
   keine Migrationskosten eingetragen. Diese Summe könnte im Ernstfall
   höher ausfallen."
9. Wie wichtig ist die Website für neue Anfragen? — select: "Eher gering",
   "Mittel", "Hoch". Drives ONLY the wording of one fixed disclaimer
   sentence near the total (three pre-written variants) — never a CHF
   multiplier. Example wording for "Hoch": "Weil die Website für Sie ein
   Hauptkanal für neue Anfragen ist, lohnt es sich besonders, Ladezeit und
   Bedienbarkeit ernst zu nehmen — auch wenn diese Rechnung das nicht in
   Franken beziffert."

CALCULATION (implement exactly, no hidden weighting or rounding):
For Year N (1, 2, 3):
  JahrN = (Startpreis if N==1 else 0)
        + Hosting/Domain
        + (Abo_Monat × 12)
        + (Wartung_Monat × 12, if Wartungsvertrag == ja)
        + (Jahreslizenz, if N >= the selected "ab Jahr" value and a value
          other than "Nicht benötigt" was chosen)
        + (Redesign-Kosten, only if N == the selected redesign year)
        + (Migrationskosten, only if entered AND N == the selected year
          for it)
Drei-Jahres-Total = Jahr1 + Jahr2 + Jahr3 (plain sum, no discounting).
Recompute live on every input change. Never substitute a default, average,
or one of the article's own illustrative numbers (CHF 300 / 420 / 870,
CHF 1080 / 430 / 880, CHF 2980 / 480 / 480) for a blank required field —
show the "fehlt"/empty-state messaging instead (see ERROR STATES).

COMPARISON MODE
A toggle "Zwei Optionen vergleichen" duplicates the entire form into two
neutral containers labelled "Option A" and "Option B" (never pre-labelled
with a provider name, a platform name, or "günstig"/"teuer" — the reader
assigns meaning by what they type). When both totals exist, show one
extra line: "Option A liegt über drei Jahre CHF {difference} unter/über
Option B." stated neutrally, with no recommendation language.

OUTPUT LAYOUT
1. A real <table> per option: rows = Jahr 1/2/3, columns = each
   contributing line item + a Jahr-total column, so every year's number
   is traceable to its components (never show a total without the rows
   that built it).
2. Drei-Jahres-Total, large and clearly labelled, computed live.
3. The qualitative risk notes (own-time note if no Wartungsvertrag;
   migration-risk note if ownership unclear and no figure entered;
   performance/conversion disclaimer sentence keyed to the "Wichtigkeit"
   select) shown as plain-text notes beside — never inside — the total.
4. Comparison-mode difference line, if active.
5. "Rechnung kopieren" — a plain-text summary of every input and every
   year's line items and total, copied via the Clipboard API with a
   manual-select fallback if it fails silently (no thrown error shown to
   the user).

ERROR STATES
- Startpreis empty → table/total hidden, show: "Geben Sie mindestens den
  Startpreis ein, um eine Projektion zu sehen."
- Redesign year chosen but cost field empty → that year's row shows
  "Redesign-Kosten fehlt" in place of a number; do not treat as 0.
- Negative number in any field → inline message "Bitte eine Zahl ab 0
  eingeben"; total does not compute until corrected.
- JavaScript disabled → render a static plain-text explanation of the
  formula (same wording as above) instead of a blank page.

DISCLAIMER (shown near the top of the tool, and repeated above the total)
"Dieser Rechner verwendet ausschliesslich Ihre eigenen Eingaben. Er kennt
keine Marktdurchschnitte und ergänzt keine fehlenden Zahlen automatisch.
Entgangene Anfragen durch schlechte Performance oder ein Migrationsrisiko
ohne Code-Eigentum werden als Hinweis angezeigt, nicht in Franken
beziffert — dazu erklärt der Artikel, warum."

PRIVACY
Fully client-side. No network requests, no external fonts/scripts/CDNs,
no field for name, company or email. If inputs are kept in localStorage
for convenience, disclose it in one visible line with a working
"Eingaben zurücksetzen" button.

CTA
Primary button, always visible below the output:
  Label: "Eigene Website-Kosten über drei Jahre einordnen lassen"
  Link: https://www.weissmann.ai/kontakt/
Secondary, lower-emphasis link near the top: "Zum Artikel mit dem
Rechenbeispiel und der Kostentreiber-Checkliste: Artikel lesen" (link to
the article page). No countdowns or fake urgency. Wording and destination
never change based on the numbers entered.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a
spreadsheet-style worksheet, not a dashboard):
  Background #ffffff, secondary panels #f7f7f5.
  Text #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red) #c51a2e — ONLY for the risk-note labels (own-time
  note, migration-risk note), always paired with the note's text, never a
  large fill and never the only signal. No green or traffic-light system.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
  (cards). Soft shadow only on the active output panel:
  0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font 'Instrument Sans' with system-sans-serif fallback stack.
  The year-by-year breakdown is a real bordered <table>, NOT a bar chart,
  line chart or gauge — this is a ledger, not a data-visualisation, and
  must not visually imply more precision than three reader-supplied years
  provide.
  Layout: single-column stacked form on mobile, output table below it;
  comparison mode stacks Option A above Option B on narrow screens.

ACCESSIBILITY
Full keyboard operability for all inputs/selects/toggles with visible
focus states; proper fieldset/legend grouping (Startkosten, laufende
Kosten, Redesign, Eigentum, Wichtigkeit); aria-live="polite" region
wrapping the table and total so screen readers announce updates;
4.5:1 minimum contrast; respect prefers-reduced-motion (totals update
instantly, no animated counting); the breakdown is a real <table> with
header cells, not a div grid.

LANGUAGE
All UI copy in German (Swiss spelling: "ss", not "ß"). Do not add
English, Italian or French translations — this tool exists only in
German.

Do not pre-fill any numeric field with one of the article's own
illustrative example numbers. Do not compute or display any total that
includes a number the reader did not type in.
```
