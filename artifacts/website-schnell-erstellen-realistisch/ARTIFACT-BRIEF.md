# ARTIFACT BRIEF — Website Delivery Readiness & Timeline Planner

**Companion article:** `website-schnell-erstellen-realistisch` (DE-WEB-09) — "Kann eine professionelle Website in sieben Tagen fertig sein – oder ist das nur Agentur-Theater?"
**Artifact title:** Bereitschafts-Check: Wie zügig kann Ihr Website-Projekt wirklich werden?
**Language:** German (de) only — matches the article; no EN/IT/FR version is commissioned.

---

## 1. User problem

A reader who just heard a vendor promise "live in a week" (or the opposite — a vague, unjustified six-week estimate) has no way to check that number against their own situation. The article gives six factors that make genuine speed possible, four of which are the reader's own responsibility. But reading a list is not the same as knowing, concretely, which of those four factors is currently the bottleneck in your own company — and what to ask a vendor about the two factors you cannot self-assess (their reusable design system, their testing discipline). Without this, readers either accept an unrealistic promise at face value or reject a genuinely fast, honest offer out of unfounded suspicion.

## 2. Intended audience

Swiss SME owners, office managers or marketing leads who are about to brief one or more web agencies or freelancers — particularly anyone who has already received a timeline promise (fast or slow) and wants to sanity-check it against their own readiness before the first meeting.

## 3. Why an interactive artifact beats a static PDF

A static checklist forces a single generic pass through seven questions with no synthesis. The interactive version:
- Combines the reader's own answers across four self-assessable factors into one qualitative readiness picture, instead of leaving the reader to average seven "yes/no" answers in their head.
- Identifies which specific factor is the actual bottleneck, so the reader's next action is concrete ("finish the German copy for the three missing pages") rather than a vague "be more prepared."
- Always surfaces the two vendor-side factors as a fixed question block, making explicit what the reader can and cannot assess about themselves — a distinction a flat PDF checklist blurs.
- Never invents a day-count, a date, or a delivery promise. A tool that generated "your project will take 9 days" would directly contradict the article's central argument; the tool's entire value is in refusing to do that while still being genuinely useful.

## 4. Inputs

1. **Entscheidungsprozess** — single-select, 3 options: "Eine Person entscheidet direkt", "2–3 Personen, Abstimmung meist innert Tagen möglich", "Grösseres Gremium oder mehrstufige interne Freigabe". No default.
2. **Content-Status** — single-select, 3 options: "Texte, Bilder und Logo sind vollständig fertig und freigegeben", "Grösstenteils vorhanden, einzelne Lücken", "Noch in Arbeit oder noch nicht begonnen". No default.
3. **Umfang schriftlich definiert** — toggle: "Seitenliste und Funktionen stehen schriftlich fest" vs. "Der Umfang ist noch offen oder könnte sich ändern".
4. **Feedback-Fähigkeit** — single-select, 3 options: "Wir antworten meist innert 24–48 Stunden", "Wir brauchen meist einige Tage", "Rückmeldungen dauern bei uns oft über eine Woche".
5. **Sprachen** — single-select, 4 options: "1 Sprache", "2 Sprachen", "3 Sprachen", "4 Sprachen (DE/EN/FR/IT)". Used only as a caveat modifier, never scored as pass/fail.
6. **Korrekturrunden-Bedarf** — single-select, 2 options: "1–2 Runden reichen uns realistisch", "Wir brauchen eher 3 oder mehr Runden". Used only as a caveat modifier.

The result panel stays empty until at least **Entscheidungsprozess** and **Content-Status** are set — the two factors the article identifies as the biggest levers. The other four inputs refine the result but do not gate it.

## 5. Calculation / decision logic

- **No day-count, date or delivery promise is ever computed or displayed.** This is a hard rule, not a style choice: the tool exists specifically to demonstrate the article's thesis that a timeline without a known scope is not a real timeline. It must not silently reintroduce the fabricated number the article warns against.
- **Four self-assessable factors**, each resolved to one of three tags (`bereit` / `teilweise` / `nicht bereit`) from a fixed lookup table in `artifact-data.json`'s `factorRules`:
  - `entscheidungsfaehigkeit` ← Entscheidungsprozess
  - `content_bereitschaft` ← Content-Status
  - `definierter_umfang` ← Umfang-Toggle
  - `feedback_tempo` ← Feedback-Fähigkeit
- **Overall readiness tier** (qualitative label only, never a number of days): count how many of the four factors resolve to `nicht bereit`, using fixed thresholds in `readinessTiers` — "Bereit für ein zügiges Projekt" (0 factors nicht bereit), "Mit gezielter Vorbereitung bereit" (1–2), "Grundlagen zuerst schaffen" (3–4). The result names the specific factor(s) driving the tier, never just the label alone.
- **Caveat modifiers** (do not change the tier, only add one visible sentence each): Sprachen ≥ 2 adds a note that multilingual content extends the content-readiness phase specifically; Korrekturrunden = "3 oder mehr" adds a note that more rounds means more total feedback-loop time even once each round is fast.
- **Vendor-side question block is fixed and always shown in full**, independent of any input — it covers the two factors the article says the reader cannot self-assess (reusable design system, testing discipline) plus a general "ask for the written, scope-tied schedule" prompt. It is never personalised, because personalising it would imply the tool can assess a third party it has no data about.
- **Checklist personalisation:** each of the article's 7 self-test questions carries a `relevantWhen` condition tied to the current inputs (e.g. item 4 — "Seitenliste schriftlich fest?" — is flagged when Umfang is set to "offen"). All 7 items are always listed in full; only the visual "besonders relevant für Sie" flag changes.

## 6. Outputs

1. The overall readiness tier headline with a one-line explanation naming the 1–2 factors currently driving it (e.g. "Vor allem Content-Bereitschaft und Feedback-Tempo bremsen aktuell.").
2. A four-row factor breakdown: factor name, one-line explanation, and the `bereit`/`teilweise`/`nicht bereit` tag as text (never colour-only).
3. Any active caveat lines (Sprachen, Korrekturrunden), shown only when triggered.
4. The full 7-item self-test checklist from the article, with input-relevant items visually flagged "Besonders relevant für Sie" — nothing ever hidden.
5. The fixed "Fragen an jeden Anbieter" block (vendor-side factors + written-schedule request), always shown in full regardless of inputs.
6. A "Für Ihr nächstes Gespräch kopieren" plain-text summary of the selected inputs plus the resulting tier, formatted for pasting into an email or bringing into a first call.

## 7. Error states

- Entscheidungsprozess or Content-Status not yet selected → the factor breakdown, tier headline and personalised checklist stay empty with the prompt "Wählen Sie mindestens Entscheidungsprozess und Content-Status, um eine Einschätzung zu sehen." The fixed vendor-question block and the full checklist (unflagged) remain visible even in this state, since they do not depend on inputs.
- Sprachen, Korrekturrunden-Bedarf or Umfang not set → those specific caveats or flags simply do not appear; the two required inputs alone gate the core result.
- JavaScript disabled → static HTML still lists all four factors (unscored), all 7 checklist items (unflagged) and the full vendor-question block in plain, readable order — progressive enhancement, not a blank page.

## 8. Privacy considerations

- Fully client-side; nothing is transmitted anywhere. No field asks for a company name, email, project budget or any personal or business-identifying detail — every input is a generic project-readiness parameter.
- If selections are persisted via `localStorage` for convenience across visits, this must be disclosed in one visible line with a working "Auswahl zurücksetzen" control.
- No analytics events tied to individual selections are required for the tool to function; if added, they must be aggregate/anonymous only and disclosed.

## 9. Accessibility requirements

- All selects/toggles fully keyboard-operable with visible focus states; grouped with proper `<fieldset>`/`<legend>` semantics per input group.
- Readiness tags (`bereit`/`teilweise`/`nicht bereit`) and the overall tier are always shown as text, never colour-only.
- The result panel updates announce themselves via an `aria-live="polite"` region so screen-reader users know the result changed without losing their place.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` (no animated transitions on value change — values update instantly).
- The four-factor breakdown, the 7-item checklist and the vendor-question block are marked up as real lists, not bare `<div>` grids.

## 10. Mobile behaviour

- Inputs render as a single-column stacked form; the result panel (tier, breakdown, checklist, vendor questions, copy-block) appears below the form so the reader can scroll down to see updates without losing the form.
- A small sticky summary bar ("Aktuelle Einschätzung: Mit gezielter Vorbereitung bereit") stays visible while scrolling through the result, so the reader keeps context on a long page.
- The "Für Ihr nächstes Gespräch kopieren" block has a full-width, thumb-reachable "Text kopieren" button.
- Toggle and select controls sized for touch (≥44×44px targets).

## 11. Exact CTA

Primary CTA button, shown persistently below the result panel (available even before both required inputs are set, but most useful once a result exists):

> **"Eigenes Projekt und realistischen Zeitplan besprechen"** → links to `/kontakt/`

Secondary, lower-emphasis link near the top of the tool:

> "Zum vollständigen Artikel mit den sechs Faktoren und den Agentur-Theater-Signalen: Artikel lesen" → links to the article's own URL (`/ki-academy/marketing-seo-geo/website-schnell-erstellen-lassen/`).

No countdown, no fake urgency, no "jetzt sichern" language. The CTA text and destination never change based on which selection is active.

## 12. Disclaimer

Include a short, visible note near the top of the tool and again next to the readiness-tier headline:

> "Dieses Werkzeug berechnet keinen Liefertermin und keine Tageszahl. Es zeigt, wie weit Sie bei den vier Faktoren stehen, die Sie selbst beeinflussen können, und listet die Fragen, die Sie zu den restlichen zwei Faktoren jedem Anbieter stellen sollten. Den tatsächlichen Zeitplan legt ein Anbieter erst fest, wenn der Umfang Ihres Projekts bekannt ist."

This prevents the tool from being mistaken for a delivery-date generator, consistent with the article's central warning against treating a scope-less timeline promise as real.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used sparingly, only for the "nicht bereit" tag, always paired with the word — never a large fill and never the only signal. "teilweise" uses a muted ink tone with the word itself; "bereit" uses the quietest ink-mute tone with the word itself. No green or amber traffic-light system — the site's palette has no green.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- The four-factor breakdown and the vendor-question block render as simple bordered lists (thin 1px lines, `--line: #e5e5e2`), not a progress bar, gauge or countdown — this keeps the "no fake precision" rule visible in the visual design itself.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the active result panel.
- Overall feel: a structured self-assessment worksheet, not a dashboard, countdown or quote generator — calm, editorial, no gamified scoring visuals.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Bereitschafts-Check: Wie zügig
kann Ihr Website-Projekt wirklich werden?" (Website Delivery Readiness
& Timeline Planner). It is a German-language (de-CH) interactive
self-assessment for Swiss businesses about to brief a web agency or
freelancer — it is explicitly NOT a delivery-date calculator and must
never output a day-count, a date, or any delivery promise.

CONTEXT
The companion article's thesis: genuine speed in a website project
depends on six factors — four controlled by the client (decisiveness,
content readiness, a defined scope, fast feedback turnaround) and two
controlled by the vendor (a reusable design system, testing discipline
before launch). A vendor who promises a fixed number of days before
discussing any of these six factors is likely doing "Agentur-Theater"
(sales theatre), not planning. This tool lets the reader assess their
own readiness on the four client-side factors, see which one is their
current bottleneck, get a personalised checklist, and get a fixed list
of questions to ask any vendor about the two vendor-side factors it
cannot assess.

INPUTS (all start unselected)
1. Entscheidungsprozess — single-select, 3 options: "Eine Person
   entscheidet direkt" (value: solo), "2–3 Personen, Abstimmung meist
   innert Tagen möglich" (value: small_group), "Grösseres Gremium oder
   mehrstufige interne Freigabe" (value: committee).
2. Content-Status — single-select, 3 options: "Texte, Bilder und Logo
   sind vollständig fertig und freigegeben" (value: ready), "Grösstenteils
   vorhanden, einzelne Lücken" (value: partial), "Noch in Arbeit oder
   noch nicht begonnen" (value: not_started).
3. Umfang schriftlich definiert — toggle: "Seitenliste und Funktionen
   stehen schriftlich fest" (defined: true) vs. "Der Umfang ist noch
   offen oder könnte sich ändern" (defined: false).
4. Feedback-Fähigkeit — single-select, 3 options: "Wir antworten meist
   innert 24–48 Stunden" (value: fast), "Wir brauchen meist einige Tage"
   (value: medium), "Rückmeldungen dauern bei uns oft über eine Woche"
   (value: slow).
5. Sprachen — single-select, 4 options: "1 Sprache" (1), "2 Sprachen"
   (2), "3 Sprachen" (3), "4 Sprachen (DE/EN/FR/IT)" (4). Caveat
   modifier only — never scored as a factor.
6. Korrekturrunden-Bedarf — single-select, 2 options: "1–2 Runden
   reichen uns realistisch" (value: standard), "Wir brauchen eher 3 oder
   mehr Runden" (value: extended). Caveat modifier only.

The scored result panel (factor breakdown, tier headline, personalised
checklist) stays in an empty prompt state — "Wählen Sie mindestens
Entscheidungsprozess und Content-Status, um eine Einschätzung zu sehen."
— until BOTH Entscheidungsprozess and Content-Status have a value. The
fixed vendor-question block and the full unflagged 7-item checklist are
ALWAYS visible, even before those two inputs are set, because they do
not depend on the reader's inputs.

FOUR SELF-ASSESSABLE FACTORS (fixed IDs, fixed German labels — use
exactly)
  entscheidungsfaehigkeit → "Entscheidungsfähigkeit"
  content_bereitschaft → "Content-Bereitschaft"
  definierter_umfang → "Definierter Umfang"
  feedback_tempo → "Feedback-Tempo"

FACTOR SCORING (implement exactly as these fixed rules — do not invent
a numeric or weighted formula; each factor resolves to exactly one tag:
bereit / teilweise / nicht bereit):
  entscheidungsfaehigkeit: solo → bereit; small_group → teilweise;
    committee → nicht bereit.
  content_bereitschaft: ready → bereit; partial → teilweise;
    not_started → nicht bereit.
  definierter_umfang: defined true → bereit; defined false →
    nicht bereit. (This factor has no middle "teilweise" state — a
    scope is either written down or it is not.)
  feedback_tempo: fast → bereit; medium → teilweise; slow →
    nicht bereit.

OVERALL READINESS TIER (qualitative label only, NEVER a number of days
or a date): count how many of the four factors resolve to
"nicht bereit" once both required inputs are set:
  0 factors nicht bereit → "Bereit für ein zügiges Projekt"
  1–2 factors nicht bereit → "Mit gezielter Vorbereitung bereit"
  3–4 factors nicht bereit → "Grundlagen zuerst schaffen"
Show one explanatory line naming the 1–2 factors currently at
"nicht bereit" or, if none, at "teilweise" (the factor(s) actually
driving the tier), e.g. "Vor allem Content-Bereitschaft und
Feedback-Tempo bremsen aktuell."

CAVEAT MODIFIERS (do not change the tier — add one extra sentence each,
only when triggered):
  Sprachen >= 2 → show: "Mehrsprachigkeit (ab 2 Sprachen) verlängert die
    Content-Bereitschaft-Phase zusätzlich, unabhängig vom sonstigen
    Tempo."
  Korrekturrunden-Bedarf == extended → show: "Mehr Korrekturrunden
    bedeuten mehr gesamte Feedback-Zeit, selbst wenn jede einzelne Runde
    schnell abläuft."

SELF-TEST CHECKLIST (7 fixed items, always all shown in full, in this
order; mark an item "Besonders relevant für Sie" when its condition is
met — never hide any item):
1. "Gibt es eine Person, die Entwürfe freigeben kann, ohne dass eine
   weitere interne Runde nötig ist?" — relevant when Entscheidungsprozess
   is small_group or committee.
2. "Liegen die Texte für jede geplante Seite bereits fertig geschrieben
   vor?" — relevant when Content-Status is partial or not_started.
3. "Sind finales Logo, Markenfarben und verwendbare Fotos oder Grafiken
   bereits vorhanden?" — relevant when Content-Status is partial or
   not_started.
4. "Steht die genaue Seitenliste samt benötigten Funktionen schriftlich
   fest?" — relevant when Umfang schriftlich definiert is false.
5. "Können Sie sich verbindlich verpflichten, auf Entwürfe innert 24 bis
   48 Stunden zu reagieren?" — relevant when Feedback-Fähigkeit is
   medium or slow.
6. "Ist geklärt, wer rechtlich nötige Texte (Impressum, AGB,
   Datenschutzerklärung) prüft und freigibt, bevor die Seite live
   geht?" — always shown, never specially flagged.
7. "Wissen Sie realistisch, wie viele Korrekturrunden Sie tatsächlich
   brauchen werden?" — relevant when Korrekturrunden-Bedarf is extended.

FIXED VENDOR-QUESTION BLOCK (always shown in full, independent of every
input — this covers the two factors the reader cannot self-assess):
Heading: "Fragen an jeden Anbieter (unabhängig von Ihrer Bereitschaft)"
1. "Verwenden Sie ein bereits bestehendes, wiederverwendbares Design-
   und Code-Fundament, oder wird jede Komponente neu entworfen?"
2. "Welche Tests führen Sie vor dem Livegang konkret durch — Mobile
   Darstellung, Formulare, Ladezeit, Links?"
3. "Können Sie mir einen schriftlichen, an meinen Umfang gebundenen
   Zeitplan geben, statt nur eine allgemeine Tageszahl?"

OUTPUT LAYOUT
1. Readiness tier headline (one of the three fixed labels) + one-line
   driver explanation.
2. Four-row factor breakdown: factor name (fixed label above) + one
   short explanatory sentence + tag "bereit"/"teilweise"/"nicht bereit"
   as text, never colour-only.
3. Any active caveat lines (0–2), shown only when triggered.
4. The 7-item self-test checklist, relevant items visually marked (e.g.
   a small "Besonders relevant für Sie" tag), never hidden or reordered.
5. The fixed 3-item vendor-question block, always shown in full.
6. "Für Ihr nächstes Gespräch kopieren" — a plain-text box summarising
   the current selections and the resulting tier in sentence form, with
   a "Text kopieren" button using the Clipboard API (manual-select
   fallback if it fails — no error thrown to the user).

DISCLAIMER (always visible near the top of the tool, and repeated next
to the readiness-tier headline)
"Dieses Werkzeug berechnet keinen Liefertermin und keine Tageszahl. Es
zeigt, wie weit Sie bei den vier Faktoren stehen, die Sie selbst
beeinflussen können, und listet die Fragen, die Sie zu den restlichen
zwei Faktoren jedem Anbieter stellen sollten. Den tatsächlichen
Zeitplan legt ein Anbieter erst fest, wenn der Umfang Ihres Projekts
bekannt ist."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No field asks for a name, company, email or budget —
every input is a generic readiness parameter. If selections are kept in
localStorage for convenience, disclose it in one visible line with a
working "Auswahl zurücksetzen" button.

CTA
Primary button, always visible below the result panel:
  Label: "Eigenes Projekt und realistischen Zeitplan besprechen"
  Link: https://www.weissmann.ai/kontakt/
Secondary lower-emphasis link near the top: "Zum vollständigen Artikel
mit den sechs Faktoren und den Agentur-Theater-Signalen: Artikel lesen"
(link to the article page). Do not use countdowns, fake urgency, or
"jetzt sichern" phrasing. Do not change the CTA wording based on the
current selection.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a
self-assessment worksheet, not a dashboard or countdown):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "nicht bereit" tag,
    always paired with the word, never as a large fill or the only
    signal. "teilweise" uses a muted ink tone with the word itself;
    "bereit" uses the quietest ink-mute tone with the word itself. Do
    NOT use green or a traffic-light system — the site's palette has no
    green.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the active result panel:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  The four-factor breakdown and vendor-question block are simple
  bordered lists, NOT a progress bar, gauge, countdown timer or
  circular meter — a countdown-like visual would directly contradict
  the tool's disclaimer.
  Layout: single-column stacked form, result panel below it; a small
  sticky summary bar ("Aktuelle Einschätzung: Mit gezielter Vorbereitung
  bereit") stays visible while scrolling the result on narrow widths.

ACCESSIBILITY
Full keyboard operability for all selects/toggles with visible focus
states; proper fieldset/legend grouping; aria-live="polite" region for
result updates; 4.5:1 minimum contrast; respect prefers-reduced-motion
(values update instantly, no animated transitions); factor breakdown,
checklist and vendor-question block marked up as real lists, not bare
divs.

LANGUAGE
All UI copy in German (Swiss spelling: "ss", not "ß"). Do not add
English, Italian or French translations — this tool exists only in
German.

Do not compute, display or imply any day-count, date, or delivery
promise anywhere in the tool, under any input combination.
```
