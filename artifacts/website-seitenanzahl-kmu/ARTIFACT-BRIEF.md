# ARTIFACT BRIEF — Website-Grösse und Informationsarchitektur-Planer

**Companion article:** `website-seitenanzahl-kmu` (DE-WEB-08) — "One-Pager oder komplette Unternehmenswebsite: Wie viele Seiten braucht ein KMU wirklich?"
**Artifact title:** Website-Grösse und Informationsarchitektur-Planer
**Language:** German (de) only — matches the article; no EN/IT/FR version is commissioned.

---

## 1. User problem

A Swiss SME owner planning a new or rebuilt website has usually heard two contradictory pieces of advice: an agency or SEO consultant telling them "more pages equals more visibility" (which produced Corinne's 39-page near-duplicate site in the article), or a budget-driven instinct to build the smallest possible site regardless of how many genuinely distinct services, audiences and locations the business actually has. Neither instinct is reliable. This tool replaces both with the article's own four-variable arithmetic — the reader enters their real numbers and gets a page count and structure that is neither inflated nor arbitrarily minimal, including the honest, sometimes uncomfortable case where the number comes out lower than a One-Pager they didn't think was "enough."

## 2. Intended audience

Swiss SME owners, office managers and marketing leads who are scoping a new or restructured website — often mid-way through, or before, an agency quote — and want an independent, arithmetic-based sanity check on how many pages their business genuinely needs before committing to a budget, a Sitemap, or an agency's opinion.

## 3. Why an interactive artifact beats a static PDF

- The article's four variables (Leistungen, Zielgruppen, Standorte, Sales-Cycle-Länge) interact — a static worksheet would force the reader to do the arithmetic themselves and would not catch the constraint that `genuineLocalContentCount` can never exceed `rawLocationCount`.
- The tool can show its work: a full page-by-page breakdown (Home, Kontakt, Über uns, N Leistungsseiten, N Zielgruppenseiten, N Standortseiten + Übersicht, N Sales-Cycle-Seiten), not just a final number — so the recommendation is checkable, not a black box.
- It can demonstrate, live, that the same formula produces wildly different results for different businesses — including the One-Pager override, which a static PDF could describe but not let the reader trigger themselves by entering their own numbers.
- Recomputes instantly as inputs change, so a reader can test "what if I only count 2 of my 9 delivery towns as having real content" in seconds and watch the location-page count and total collapse accordingly.

## 4. Inputs

1. **Distinct services** (integer, 0–15, default 1) — with inline help text quoting the article's own distinction ("Vier Reinigungsarten mit unterschiedlichen Kund:innen, Preisen und Abläufen sind vier echte Leistungen. Drei Grössen desselben Gartenhäuschens sind eine Leistung mit drei Optionen").
2. **Audience segments** (integer, 1–6, default 1) — help text: count only groups needing different proof, language or CTA.
3. **Total locations served** (integer, 1–50, default 1).
4. **Of those, locations with genuine own content** (integer, 0–50, default 0, constrained ≤ input 3) — help text: own team, own hours, own reviews; a swapped place-name in identical copy does not count.
5. **Typical sales-cycle length** (single-select: Tage / Wochen / Monate / 6+ Monate).

No text input anywhere. No name, email, company or budget figure is ever requested (see §8).

## 5. Calculation / decision logic

Full formula and worked examples are given in `artifact-data.json`. Summary:

- **One-Pager override** (checked first): if `distinctServices ≤ 1 AND audienceSegments ≤ 1 AND rawLocationCount ≤ 1 AND salesCycle == 'days'` → recommend a single page with anchor navigation. Total = 1. No further arithmetic runs.
- Otherwise, sum:
  - Fixed floor: Home (1) + Kontakt (1) + Über uns/Vertrauen (1) = 3.
  - Service pages: 0 for 0–1 services; `n` for 2–6; capped at 6 + 1 hub page for 7+, with an on-screen warning to re-run the article's three-question test before building more than 7.
  - Audience pages: 0 for 1 segment; 1 for 2 segments; `n − 1` for 3+ (the first segment always rides along on the existing pages).
  - Location pages: 0 if only 1 location total. If more than 1 location total and 0 have genuine content → exactly 1 bundled overview page, zero dedicated pages (this is the tool's sharpest "fewer than expected" case). If ≥1 location has genuine content → that many dedicated pages, plus 1 overview page only if raw total exceeds the genuine count.
  - Sales-cycle pages: 0 for days/weeks; 1 (Ablauf/Prozess) for months; 2 (Ablauf/Prozess + Ressourcen-Hub) for 6+ months.
- **No hidden bonus toward any particular page count or toward Weissmann's own packages.** The reference bands in §6 are read off the total after the fact — they never feed back into the calculation.
- Verified reproducible examples (see `artifact-data.json` → `workedExamples`): Corinne's real numbers (4 services, 2 audiences, 9 locations/2 genuine, weeks) → **11 pages**, versus the 39-page structure she was originally sold. A solo consultant with everything minimal → **1 page** (One-Pager override). A consultant who had planned 8 city pages for 3 services → **8 pages total**, not the 11+ a naive "one page per city" approach would produce.

## 6. Outputs

1. A single headline number ("Empfohlene Seitenzahl: 11") plus, immediately below it, the itemised breakdown that produced it (one line per component, matching the formula above) — the number is never shown without its derivation.
2. The matching reference band from `artifact-data.json` → `referenceBands` (One-Pager / Starter / schlanker Business / Business / Complex), shown as context, explicitly labelled "Einordnung, kein Kaufzwang."
3. For every component that came out lower than its raw input might suggest (most commonly the location component), a one-line explanation of *why* — e.g. "7 von 9 Standorten haben keinen eigenen Inhalt und wurden zu 1 Übersichtsseite gebündelt statt 7 Einzelseiten."
4. If the service or location cap/warning triggered, a visible (not hidden) note prompting the reader to re-apply the article's three-question test to the excess candidates.

## 7. Error states

- `genuineLocalContentCount` entered greater than `rawLocationCount` → input is clamped to the raw count and a short inline note explains why ("Kann nicht grösser sein als die Gesamtzahl der Standorte — auf X korrigiert.").
- All numeric inputs at their minimum (0 or 1) with `salesCycle` not "days" → the One-Pager override does *not* fire (by design — a long sales cycle means even a minimal business benefits from a process page), and the tool shows the regular 3+ page floor instead, with a note explaining why the override didn't apply.
- JavaScript disabled / interactive layer fails to load → the page still renders the fixed floor, the formula table and all three worked examples from `artifact-data.json` as plain static text, so the page remains informative without interactivity.
- Non-numeric or out-of-range input → field reverts to its last valid value; no silent zero substitution that could produce a misleadingly small total.

## 8. Privacy considerations

- Fully client-side; no network requests, no analytics call, nothing leaves the browser tab.
- No field of any kind collects a name, email, company name, address or budget figure — only counts and one dropdown selection.
- A one-line note near the inputs states that all values are used only to compute the on-screen result in that browser session and are never transmitted, stored, or reused elsewhere on the site.

## 9. Accessibility requirements

- All numeric inputs are native `<input type="number">` fields with visible labels and inline help text (not placeholder-only text, which disappears on focus and fails many screen readers).
- The sales-cycle selector is a native `<select>` with visible, keyboard-operable options.
- The breakdown and total update inside an `aria-live="polite"` region so a screen-reader user hears the new total and breakdown after any input change without re-navigating.
- The reference band and any warning notes are conveyed with text and icons together, never colour alone.
- Minimum 4.5:1 text contrast; respects `prefers-reduced-motion` (breakdown updates instantly, no animated counter).

## 10. Mobile behaviour

- Inputs stack full-width, one per row, each with its help text visible directly beneath (not in a tooltip requiring touch-and-hold).
- The headline number and breakdown stack below the inputs rather than side-by-side, so the result is reached by a single scroll, not a horizontal layout that breaks on narrow screens.
- The three worked examples collapse into a horizontally swipeable strip of cards on small screens, expandable to full detail on tap.

## 11. Exact CTA

Primary CTA button, shown persistently below the result (not gated behind any interaction):

> **"Kostenloses Erstgespräch: Wir zählen Ihre echte Seitenzahl gemeinsam durch"** → links to `/leistungen/ki-webentwicklung/`

Secondary, lower-emphasis link near the top of the tool:

> "Zum vollständigen Artikel mit dem Drei-Fragen-Test: Artikel lesen" → links to the article's own URL (the academy spoke page for `website-seitenanzahl-kmu`).

The CTA text and destination stay identical regardless of the computed total — including when the result is a 1-page One-Pager that implies a far smaller project than Weissmann's average engagement. No countdown, no fake urgency, no "jetzt handeln" language.

## 12. Disclaimer

Include a short, visible note near the result:

> "Diese Zahl ist eine strukturierte Einschätzung auf Basis Ihrer eigenen Angaben zu Leistungen, Zielgruppen, Standorten und Verkaufsdauer — keine verbindliche Offerte und keine Garantie für ein bestimmtes Suchmaschinen-Ranking. Die Einordnung in Starter-, Business- oder individuelle Bänder orientiert sich an den aktuellen Weissmann-Paketen und kann sich ändern."

This prevents the output from being read as a binding quote or as a ranking guarantee, and makes clear the reference bands describe Weissmann's current packages, not a universal industry standard.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only for the headline total number, never as a full-panel "verdict" fill.
- The breakdown renders as a simple, itemised list (label — value), each row with a thin 1px bottom border (`--line: #e5e5e2`) — a receipt, not a chart with gauges or traffic lights.
- The reference-band strip renders as five small labelled segments in a single horizontal bar (One-Pager → Starter → schlanker Business → Business → Complex), with the reader's current total marked as a single dot/marker on the bar — never a "you should buy this" badge.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- Typography: `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the result card.
- Overall feel: a worksheet that adds itself up in front of the reader — calm and arithmetic, not a lead-gen quiz with a "your score is..." reveal animation.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Website-Grösse und
Informationsarchitektur-Planer" — a German-language (de-CH) interactive
page-count and structure planner for Swiss SMEs planning a website. It is
an additive arithmetic calculator with full breakdown transparency, not a
lead-generation quiz, and it must be able to recommend FEWER pages than a
user might expect — including recommending a single-page site.

CONTEXT
The companion article's thesis: the right number of website pages is not
"more is better" or a fixed number — it comes from four variables (number
of genuinely distinct services, number of audience segments needing
different messaging, number of locations with genuine own content, and
typical sales-cycle length), filtered through a three-question test per
candidate page (own search intent? own content? someone to maintain it?).
This tool turns that framework into a live, reproducible arithmetic count.

INPUTS (all numeric unless noted; no text/name/email/budget fields ever)
1. distinctServices — integer 0–15, default 1. Help text: "Zählen Sie nur
   Leistungen, die je eine eigenständige Kaufentscheidung mit eigener
   Suchintention auslösen — nicht Varianten derselben Leistung."
2. audienceSegments — integer 1–6, default 1. Help text: "Zählen Sie nur
   Gruppen, die unterschiedliche Beweise, Sprache oder Call-to-Action
   brauchen."
3. rawLocationCount — integer 1–50, default 1. Help text: "Alle Orte, in
   denen Sie tätig sind oder liefern."
4. genuineLocalContentCount — integer 0–50, default 0, constrained to
   never exceed rawLocationCount (clamp + inline note if the user types a
   higher value). Help text: "Nur Standorte mit eigenem Team, eigenen
   Öffnungszeiten oder eigenen Bewertungen zählen."
5. salesCycle — select: "days" (Tage), "weeks" (Wochen), "months"
   (Monate), "long" (6+ Monate). Default "weeks".

CALCULATION LOGIC (implement exactly, in this order)

Step 1 — One-Pager override check:
  IF distinctServices <= 1 AND audienceSegments <= 1 AND
     rawLocationCount <= 1 AND salesCycle == "days":
    → total = 1. Show the One-Pager result (see OUTPUT below) and SKIP
      steps 2–6 entirely. Do not show a page-by-page breakdown of 3+
      pages in this case — show the override explanation instead.

Step 2 — Fixed floor (always, when override does not apply):
  home = 1, kontakt = 1, trust = 1  → subtotal 3

Step 3 — Service pages:
  n = distinctServices
  IF n <= 1: servicePages = 0
  ELSE IF n <= 6: servicePages = n
  ELSE: servicePages = 6, plus add 1 hub page, and show a visible warning:
    "Mehr als 6 Leistungen geplant — prüfen Sie jede zusätzliche mit dem
    Drei-Fragen-Test aus dem Artikel, bevor Sie weitere Seiten bauen."
    (so servicePages effectively becomes 7 in this branch: 6 + 1 hub)

Step 4 — Audience pages:
  n = audienceSegments
  IF n <= 1: audiencePages = 0
  ELSE IF n == 2: audiencePages = 1
  ELSE: audiencePages = n - 1

Step 5 — Location pages:
  raw = rawLocationCount, genuine = genuineLocalContentCount (clamped to
  never exceed raw)
  IF raw <= 1: locationPages = 0
  ELSE IF genuine == 0: locationPages = 1 (a single bundled "Standorte"
    overview page, zero dedicated pages) — this is the tool's clearest
    "fewer pages than expected" branch; when it fires, show the note:
    "{raw} Standorte, aber 0 mit eigenem Inhalt — gebündelt auf 1
    Übersichtsseite statt {raw} Einzelseiten."
  ELSE: locationPages = genuine + (raw > genuine ? 1 : 0)

Step 6 — Sales-cycle pages:
  days → 0, weeks → 0, months → 1 (label: "Ablauf/Prozess-Seite"),
  long → 2 (label: "Ablauf/Prozess-Seite + Ressourcen/Wissens-Hub")

Total (non-override case) = 3 (floor) + servicePages + audiencePages +
  locationPages + cyclePages

Reference band lookup (after total is computed, display-only, must never
feed back into the calculation):
  1 → "One-Pager"
  2–5 → "Starter-Bereich (~5 Kernseiten) — Starter Website, CHF 880
        Aktionspreis, regulär CHF 2'490"
  6–9 → "Schlanker Business-Bereich"
  10–20 → "Business-Bereich — Business Website, ab CHF 4'990"
  21+ → "Complex/individuelle Architektur — ab CHF 9'900"

VERIFY these three reproductions before shipping (from the article and
artifact-data.json — if your implementation does not reproduce all three
exactly, the logic is wrong and must be fixed):
1. distinctServices=4, audienceSegments=2, rawLocationCount=9,
   genuineLocalContentCount=2, salesCycle="weeks" → total = 11
   (3 floor + 4 services + 1 audience + 3 locations [2 genuine + 1
   overview] + 0 cycle).
2. distinctServices=1, audienceSegments=1, rawLocationCount=1,
   genuineLocalContentCount=1, salesCycle="days" → total = 1 (One-Pager
   override fires).
3. distinctServices=3, audienceSegments=1, rawLocationCount=8,
   genuineLocalContentCount=1, salesCycle="weeks" → total = 8
   (3 floor + 3 services + 0 audience + 2 locations [1 genuine + 1
   overview] + 0 cycle).

OUTPUT
- Headline: "Empfohlene Seitenzahl: {total}" in large accent-coloured
  type (only the number in accent colour, not a full panel fill).
- Directly beneath: an itemised breakdown list, one row per non-zero
  component with its label and page count (Home, Kontakt, Über uns,
  Leistungsseiten, Zielgruppenseiten, Standortseiten, Standort-Übersicht,
  Sales-Cycle-Seiten) — never show the total without this derivation.
- The matching reference band, labelled "Einordnung, kein Kaufzwang."
- Any triggered warning/explanation notes from steps 3 and 5 above,
  shown inline, not hidden behind a toggle.
- In the One-Pager override case: replace the breakdown list with a
  short explanation of why a single page with anchor navigation was
  recommended instead of the normal 3-page floor.

ERROR STATES
- genuineLocalContentCount typed greater than rawLocationCount → clamp
  to rawLocationCount and show: "Kann nicht grösser sein als die
  Gesamtzahl der Standorte — auf {raw} korrigiert."
- All inputs at minimum but salesCycle is NOT "days" → override does not
  fire; show the normal 3-page floor plus cycle pages, with a short note
  explaining why the One-Pager override did not apply ("Bei einer
  Verkaufsdauer über Tage hinaus lohnt sich mindestens eine
  Prozess-Seite.").
- Non-numeric or out-of-range typed input → revert the field to its last
  valid value; never silently substitute zero.
- If JavaScript fails to load, render the fixed floor, the full formula
  table and the three worked examples above as static readable text —
  progressive enhancement, not a blank page.

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs, no storage beyond in-memory session state. No field
of any kind asks for a name, email, company or budget figure.

DISCLAIMER (always visible near the result, not collapsible away)
"Diese Zahl ist eine strukturierte Einschätzung auf Basis Ihrer eigenen
Angaben zu Leistungen, Zielgruppen, Standorten und Verkaufsdauer — keine
verbindliche Offerte und keine Garantie für ein bestimmtes
Suchmaschinen-Ranking. Die Einordnung in Starter-, Business- oder
individuelle Bänder orientiert sich an den aktuellen Weissmann-Paketen
und kann sich ändern."

CTA
Primary button, always visible below the result:
  Label: "Kostenloses Erstgespräch: Wir zählen Ihre echte Seitenzahl
  gemeinsam durch"
  Link: https://www.weissmann.ai/leistungen/ki-webentwicklung/
Secondary lower-emphasis link near the top: "Zum vollständigen Artikel
mit dem Drei-Fragen-Test: Artikel lesen" (link to the article page).
Keep the CTA identical regardless of the computed total, including when
the result is a 1-page One-Pager. No countdowns, no fake urgency.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a worksheet
that adds itself up, not a lead-gen quiz with a reveal animation):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the headline total number.
  Breakdown: simple list rows, label left / count right, 1px bottom
    border #e5e5e2 per row — a receipt, not a chart.
  Reference-band bar: five small labelled segments in one horizontal
    strip with the current total marked as a single dot — not a "buy
    this" badge.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Corner radius 10px (small elements) / 14px (cards). Soft shadow only on
    the result card: 0 1px 2px rgba(17,17,17,.05), 0 18px 44px
    rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.

ACCESSIBILITY
All numeric inputs are native <input type="number"> with visible labels
and visible (not placeholder-only) help text. Sales-cycle is a native
<select>. Result/breakdown update inside an aria-live="polite" region.
Warnings and the reference band use text + icon together, never colour
alone. 4.5:1 minimum contrast. Respect prefers-reduced-motion (no
animated counter reveal).

LANGUAGE
All UI copy in German (Swiss spelling: "ss", not "ß"). Do not add
English, Italian or French translations — this tool exists only in
German.

Do not fabricate additional pricing tiers, search-ranking guarantees, or
benchmark numbers beyond what is given above. Do not bias the formula
toward any particular reference band or toward recommending a purchase —
the calculation must always be pure arithmetic from the five inputs.
```
