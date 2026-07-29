# ARTIFACT BRIEF — Swiss Dialect Stress-Test Builder and Scoring Sheet

**Companion article:** `swiss-dialect-comprehension-test` (DE-PHONE-02) — "Versteht ein KI-Telefonassistent Schweizerdeutsch wirklich? Der Dialekt-Praxistest"
**Artifact title:** Dialekt-Stresstest-Builder für KI-Telefonassistenten
**Language:** German (de) only — matches the article; no EN/IT/FR version is commissioned.

---

## 1. User problem

A Swiss SME owner is told by every vendor (including Weissmann) that its AI phone assistant "understands Swiss German." That sentence is unfalsifiable on its own. The reader has no ready-made way to turn the article's seven-dimension test protocol into an actual, repeatable test plan with real testers, and no consistent way to turn the results of those calls into a comparable score — so most readers would either skip testing entirely (trusting the sales claim) or test informally and forget half the dimensions.

## 2. Intended audience

Swiss SME decision-makers (owners, office managers, practice managers) evaluating an AI phone assistant — for their own business or to compare against Weissmann's — who have German-speaking (dialect) callers and want evidence before signing a monthly contract.

## 3. Why an interactive artifact beats a static PDF

A static checklist would list the seven dimensions once and go stale the moment the reader's business doesn't match the default assumptions. The interactive version:
- Lets the reader pick only the dialects/regions and call scenarios relevant to *their* caller base, instead of forcing all seven every time.
- Lets the reader set custom weights per dimension (a Bern-based tradesperson and a Lake Zürich hotel should not use the same weighting) and see the weighted verdict recalculate live.
- Generates a concrete, printable list of test calls to actually go make — a PDF can describe the method, but only an interactive builder can produce *your* specific call list from *your* selections.
- Lets the reader score two providers side by side in the same session without re-deriving the rubric from scratch, and immediately flags "silent failure" (score 1) dimensions that a simple average would hide.

## 4. Inputs

1. **Caller-mix selection** — checkboxes for the four regional dialect dimensions (Zürichdeutsch, Berndeutsch, Baseldeutsch, Zentralschweizer Mundart) plus the three condition dimensions (Code-Switching, Namen & Adressen, Hintergrundgeräusche). Reader ticks only the ones relevant to their business; unticked dimensions are excluded from the test list and scoring entirely (supports the article's "wann ist das nicht die richtige Frage" section — a reader can legitimately select fewer than seven).
2. **Per-dimension weight** — a 1–5 slider or number input per *selected* dimension, defaulting to 3 ("normal"), representing how often that dimension actually occurs in the business's real call volume.
3. **Scenario picker per dimension** — for each selected dimension, a choice of 1–3 test scenarios from the scenario library in `artifact-data.json` (e.g. "Terminanfrage", "Offene Frage", "Name/Adresse diktieren", "Unterbrechung/Korrektur"). At least one scenario must be selected per active dimension.
4. **Provider label(s)** — free-text field(s) so the reader can name which system they are testing (e.g. "Anbieter A", "Weissmann Starter-Test"); supports running the sheet twice for a side-by-side comparison. This is a plain label, never a preset list of vendor names — the tool must not imply an endorsed or ranked provider list.
5. **Score entry (0–3) per dimension**, entered *after* the reader has actually made the real phone calls — the tool does not simulate or guess results.

## 5. Calculation / decision logic

- **Test-list generation:** For every ticked dimension × every selected scenario, generate one row in the "Testanrufe" list (dimension, scenario, suggested tester note e.g. "Testperson mit echtem Bern-Dialekt, normales Sprechtempo"). This list is the artifact's first output, available before any scores are entered.
- **Weighted score:** `weighted_score = Σ(weight_d × score_d) / Σ(weight_d)` across all dimensions with an entered score, rounded to one decimal, on the 0–3 scale.
- **Hard-fail override (silent-failure rule):** if **any** dimension scores exactly **1** ("stille Fehlleistung" — understood wrong and acted confidently), the overall verdict is forced to "Nicht bestanden — stille Fehlleistung" regardless of the weighted average. This mirrors the article's explicit point that an average can hide the most dangerous failure mode. A dimension scoring **0** (hard failure/dropped call) is flagged as "Kritisch" but does not by itself override the verdict the way a silent 1 does, since a 0 is at least visible to the caller and business owner immediately.
- **Verdict bands** (only applied when no dimension scored 1): ≥2.5 → "Bestanden"; 1.5–2.49 → "Bestanden mit Einschränkungen — [liste der schwachen Dimensionen]"; <1.5 → "Nicht bestanden".
- **No auto-recommendation of Weissmann.** The tool never inserts Weissmann's name into the verdict text and produces the same verdict logic regardless of which provider label was entered. If the user has not entered a provider label, the sheet still functions generically.
- **Minimum-input guard:** the verdict area stays empty (not zero, not a false "0.0 Nicht bestanden") until at least one dimension has both a weight and a score entered.

## 6. Outputs

1. A generated **test-call list** (table): dimension, scenario, tester guidance — ready to hand to whoever is making the calls.
2. A **live scoring grid**: one row per selected dimension with weight input, score input (0–3 buttons/select), and a short reminder of what each score number means (pulled from `artifact-data.json`).
3. A **weighted verdict block**: numeric score, verdict band text, and — if triggered — the silent-failure override message naming which dimension(s) caused it.
4. A **print/export view**: a clean, single-page, black-and-white-friendly layout of the filled-in sheet (dimensions, weights, scores, verdict, provider label, date) suitable for saving as a PDF via the browser's print dialog or attaching to an internal decision document. No server-side export, no login, no file upload.

## 7. Error states

- No dimension selected → test-list and scoring grid stay empty with a plain prompt ("Wählen Sie mindestens eine Dimension, die zu Ihren Anrufenden passt.") — not an error banner, just an empty, calm state.
- A dimension is selected but no scenario chosen for it → that dimension is visually marked "unvollständig" and excluded from the verdict calculation until a scenario is picked.
- A weight is set but no score entered (or vice versa) → that dimension is excluded from the weighted calculation and shown as "noch nicht getestet", never silently treated as 0.
- All entered scores are 0 → verdict correctly shows "Nicht bestanden", not a division-by-zero or blank state.
- Provider label left empty → sheet still works; print view shows "Anbieter: (nicht angegeben)" instead of breaking layout.

## 8. Privacy considerations

- Everything runs client-side; no test-call content, scores, phone numbers, names, or provider labels are transmitted anywhere or stored server-side.
- State may persist only in the browser's local storage (so a reader doesn't lose an in-progress sheet on refresh) — this must be disclosed in-page in one short sentence, with a visible "Zurücksetzen" (reset/clear) control that wipes local storage.
- No caller's real personal data (names, numbers, recordings) should ever be typed into the tool itself — the tool captures *scores and labels about a test*, not real customer data. State this explicitly as a one-line note near the input area, since the underlying topic (recording real calls for testing) touches personal-data-adjacent territory even though the tool itself stores none.

## 9. Accessibility requirements

- Full keyboard operability for every input (checkboxes, sliders/number inputs, score selectors, text fields); logical tab order matching the visual flow (dimension selection → weights/scenarios → scoring → verdict).
- Score selectors implemented as labelled radio buttons or a labelled `<select>`, not color-only indicators — pair every score (0–3) with its short text meaning so screen-reader users get the same information as sighted users.
- The silent-failure override and verdict changes must be announced via an `aria-live="polite"` region so screen-reader users are told when the verdict updates.
- Minimum 4.5:1 text contrast; do not use the Swiss-red accent as the sole signal for "fail" — pair colour with text/iconography (e.g. an explicit word "Kritisch" or "Stille Fehlleistung", not just a red dot).
- Respect `prefers-reduced-motion` — no animated score-count-up effects beyond a simple, instant value change.

## 10. Mobile behaviour

- Single-column layout below ~640px: dimension cards stack vertically, each expandable/collapsible (accordion) to keep the page scannable on a phone, since a reader may be filling this in from the same phone they just used to make a test call.
- Score buttons (0–3) sized for touch (minimum ~44×44px targets), no hover-only affordances.
- The print/export view should still be usable if triggered from mobile (falls back to the browser's native "save as PDF" share sheet); no layout that only works at desktop print widths.
- Sticky, always-visible mini verdict summary (score + band) pinned at the bottom of the viewport on mobile once at least one dimension has been scored, so the reader doesn't have to scroll back up after each entry.

## 11. Exact CTA

Primary CTA button, shown after a verdict is produced (any band, not only "Bestanden" — the tool must remain useful even when the reader is testing a competitor or when the result is "Nicht bestanden"):

> **"KI-Telefonassistent von Weissmann unverbindlich testen (CHF 350, einmalig)"** → links to `/leistungen/ki-telefonassistent/`

Secondary, lower-emphasis link/text (not a button) near the article-context header:

> "Zum vollständigen Testprotokoll und Hintergrund: Artikel lesen" → links to the article's own URL (the academy spoke page for `swiss-dialect-comprehension-test`).

No countdown, no fake urgency, no "before it's too late" language, per the project's promotion rules. The CTA must not change wording based on the verdict (i.e. do not soften/hide the CTA when the tested provider is not Weissmann, and do not oversell it when the verdict is poor).

## 12. Disclaimer

Include a short, visible note near the verdict output:

> "Dieses Werkzeug ersetzt keinen echten Testanruf. Es strukturiert und bewertet Ergebnisse, die Sie selbst mit echten Testpersonen erheben. Weissmann hat für dieses Werkzeug keine Testergebnisse für einzelne Anbieter erhoben oder veröffentlicht — die Bewertung basiert ausschliesslich auf Ihren eigenen Eingaben."

This directly prevents the tool from being mistaken for a published benchmark or a claim about any specific vendor's real-world performance — consistent with the article's core rule against reporting invented test scores.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used *only* for labels, active/selected states, and the silent-failure warning — never as a large background fill or as the only fail signal (see accessibility above).
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text) — not accent-red — matching the site-wide rule that CTAs are black, not accent-coloured.
- Typography: `'Instrument Sans'` (fall back to system sans-serif stack); generous whitespace, editorial/calm tone rather than a "dashboard" look — thin 1px borders (`--line: #e5e5e2`), rounded corners `10px`/`14px` (`--radius` / `--radius-lg`), soft shadow (`--shadow`) on the scoring card only.
- Overall feel: a printable paper form that happens to be interactive — not a SaaS analytics dashboard. No gauges, no gradients, no decorative iconography beyond simple check/warning glyphs.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Swiss Dialect Stress-Test Builder".
It is a German-language (de-CH) interactive test-planning and scoring tool
for Swiss businesses evaluating whether an AI phone assistant (any vendor)
actually understands the Swiss-German dialects their real callers use.

CONTEXT
The tool supports a companion article whose thesis is: "understanding a
dialect" and "speaking a dialect" are separate capabilities, and the only
honest way to know if a specific AI phone assistant handles a business's
real callers is to run a structured multi-dimension test with real dialect
speakers — not to trust a vendor's one-line marketing claim. This tool does
not run or simulate any phone calls itself. It (a) helps the user build a
concrete list of test calls to go make in real life, and (b) turns the
scores from those real calls into a single, honest, weighted verdict.

DIMENSIONS (7 total, all optional/selectable, not all required)
Four regional Swiss-German dialects: Zürichdeutsch, Berndeutsch,
Baseldeutsch, Zentralschweizer Mundart (Luzern/Zug/Uri/Schwyz/Ob- und
Nidwalden). Three call-condition dimensions: Code-Switching (mixing in
French/Italian/English mid-call), Namen & Adressen (spelling Swiss surnames,
place names, 4-digit postcodes), Hintergrundgeräusche (background noise:
workshop, car handsfree, busy kitchen, construction site).

STEP 1 — Caller-mix selection
Checkboxes for all 7 dimensions, unchecked by default. Only checked
dimensions appear in later steps.

STEP 2 — Per dimension (only for checked ones), let the user:
 - set a weight from 1–5 (default 3), representing how often this dimension
   occurs in their real call volume;
 - pick 1–3 test scenarios from this small library (use exactly this data,
   do not invent new scenario text beyond light rewording for UI clarity):
     "Terminanfrage" — caller asks to book/move an appointment in dialect.
     "Offene Frage" — caller asks a general question (hours, price range,
        directions) in dialect.
     "Name/Adresse diktieren" — caller spells an unusual Swiss surname and
        dictates a full address including a 4-digit postcode.
     "Unterbrechung/Korrektur" — caller self-corrects mid-sentence
        ("nein, doch nicht Dienstag, Mittwoch") or talks over the assistant.

STEP 3 — Generate a "Testanrufe" (test-call) list: one row per selected
dimension × selected scenario, each row showing the dimension, the scenario,
and a short tester-guidance note (e.g. "Testperson mit echtem
Bern-Dialekt-Alltag, normales Sprechtempo — nicht extra deutlich sprechen").
This list must be visible and usable (e.g. printable) even before any
scores are entered — it is a standalone useful output on its own.

STEP 4 — Scoring grid: for every dimension with an entered weight, let the
user enter one score 0–3 AFTER they have made the real test calls. Score
meanings (show these inline, not just as numbers):
  0 = Ausfall (system fails / call breaks down / caller hangs up)
  1 = Stille Fehlleistung (understood wrong but acted confidently anyway —
      the most dangerous case, flag this clearly)
  2 = Ehrliche Unsicherheit (partial understanding, but the system notices
      and asks or hands off cleanly)
  3 = Korrekt (understood and acted correctly, no follow-up needed)
Also add a free-text "Anbieter" (provider) label field so the sheet can be
filled in once per system being tested/compared. Never hard-code or suggest
specific vendor names.

STEP 5 — Verdict logic (implement exactly):
  weighted_score = sum(weight_d * score_d for scored dimensions) /
                    sum(weight_d for scored dimensions), one decimal place.
  If ANY scored dimension = 1 (silent failure), force the verdict to
    "Nicht bestanden — stille Fehlleistung" and name which dimension(s)
    caused it, REGARDLESS of the weighted average.
  Else if weighted_score >= 2.5: "Bestanden".
  Else if weighted_score >= 1.5: "Bestanden mit Einschränkungen" and list
    which dimensions scored below 2.
  Else: "Nicht bestanden".
  If no dimension yet has both a weight and a score, show no verdict at
  all (an empty/neutral state, not "0.0").
Show this verdict update inside an aria-live="polite" region.

OUTPUTS / UI
- A clean print/export view (use CSS @media print) showing dimensions,
  weights, scenarios, scores, provider label, date, and the verdict, laid
  out for a single page.
- Sticky bottom-of-screen mini verdict summary on mobile once at least one
  dimension is scored.

DISCLAIMER (show near the verdict, always visible, not collapsible away)
"Dieses Werkzeug ersetzt keinen echten Testanruf. Es strukturiert und
bewertet Ergebnisse, die Sie selbst mit echten Testpersonen erheben.
Weissmann hat für dieses Werkzeug keine Testergebnisse für einzelne
Anbieter erhoben oder veröffentlicht — die Bewertung basiert
ausschliesslich auf Ihren eigenen Eingaben."

Also show one short line near the input area warning against entering real
customers' personal data: this tool is for scoring a test, not for logging
real caller information.

PRIVACY
Client-side only. You may use localStorage to persist an in-progress sheet
across reloads, but you must say so in one visible sentence and provide a
clearly labelled "Zurücksetzen" button that clears it. No network requests,
no analytics, no external fonts/scripts/CDNs.

CTA
Primary button, shown once a verdict exists (any verdict, including "Nicht
bestanden" — never hide or change the CTA based on the result, and never
change its wording depending on which provider was tested):
  Label: "KI-Telefonassistent von Weissmann unverbindlich testen
          (CHF 350, einmalig)"
  Link: https://www.weissmann.ai/leistungen/ki-telefonassistent/
Do not use countdowns, fake urgency, or "before it's too late" phrasing.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — NOT a SaaS
analytics dashboard):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for labels, the selected/active
    state, and the silent-failure warning text. Never as a large fill.
    Never rely on this color alone to signal failure — always pair with
    a text label like "Kritisch" or "Stille Fehlleistung".
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b
    (buttons are confident black, NOT accent-red).
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) /
    14px (cards). Soft shadow only on the scoring card:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Layout: generous whitespace, single readable column on mobile
    (<640px) with each dimension as a collapsible card; a wider
    multi-column layout permitted at desktop widths. No gauges,
    gradients, or decorative icons beyond simple check/warning glyphs.

ACCESSIBILITY
Full keyboard operability, logical tab order, score inputs as labelled
radio buttons/select (not color-only dots) with their text meaning always
visible, 4.5:1 minimum contrast, aria-live region for verdict updates,
respect prefers-reduced-motion (no animated counters).

LANGUAGE
All UI copy in German (Swiss spelling: "ss", not "ß"). Do not add English,
Italian or French translations — this tool exists only in German.

Do not fabricate or hint at any specific vendor's real test results inside
the tool's copy, help text, or placeholder content — every score shown in
the UI as an example must be clearly marked as a placeholder/example, never
presented as if it were a real measured result.
```
