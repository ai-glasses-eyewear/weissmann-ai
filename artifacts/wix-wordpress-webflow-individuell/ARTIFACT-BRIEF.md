# ARTIFACT BRIEF — Plattform-Fit-Matrix

**Companion article:** `wix-wordpress-webflow-individuell` (DE-WEB-05) — "Wix, WordPress, Webflow oder individuelle Entwicklung: Die falsche Frage kostet später am meisten"
**Artifact title:** Plattform-Fit-Matrix: Wix, WordPress, Webflow oder individuell?
**Language:** German (de) only — matches the article; no EN/IT/FR version is commissioned.

---

## 1. User problem

A Swiss SME owner comparing website platforms hears equally confident, contradictory recommendations from every advisor they talk to, because each advisor is really recommending the category they themselves sell — not the category that fits the reader's own requirements. The article's six-factor framework (ownership/portability, performance, editing, security/maintenance, multilingual SEO, total cost of ownership) is presented in prose across twelve sections; this tool lets the reader assign their own weight to each factor and see, instantly, which of the four platform categories actually scores highest for their specific situation — including the honest trade-offs that come with that answer, not just a name.

## 2. Intended audience

Swiss SME owners, office managers and marketing leads who are about to commission a new or rebuilt website (often with one or more agency quotes already in hand) and want an independent, requirement-driven gut check before choosing a platform category — including readers whose honest answer will turn out to be a template builder, not custom development.

## 3. Why an interactive artifact beats a static PDF

A printed 4×6 matrix is either too dense to read at a glance or too simplified to be honest. The interactive version:
- Lets the reader set their own priorities instead of reading someone else's generic ranking — the same fixed data produces four different top-ranked categories depending on the weights, which a static table cannot demonstrate.
- Shows the reasoning behind the winner (the specific trade-off text per factor for the top category), not just a score, so the recommendation is legible and checkable rather than a black box.
- Includes four starter presets that double as a teaching device: clicking through all four shows the reader that this matrix is not secretly rigged toward "individuelle Entwicklung" — three of the four presets top out on a different, non-custom category.
- Recomputes live as sliders move, so a reader can test "what if multilingual SEO mattered less to me" in seconds instead of re-reading the article's prose section by section.

## 4. Inputs

1. **Six weight sliders**, one per factor from the article, each 0–3 with labelled steps: 0 = "unwichtig", 1 = "eher wichtig", 2 = "wichtig", 3 = "entscheidend". All sliders start at 0 (no default weighting is pre-selected as "typical").
2. **Four "Schnellstart"-Presets** (cards, not a dropdown) that pre-fill all six sliders to a named, plausible business profile (see `artifact-data.json` → `presets`). Selecting a preset is a starting point, not a lock — every slider stays adjustable afterward, and moving any slider after selecting a preset silently deselects the preset highlight (no artificial "are you sure" friction).
3. **No text input anywhere.** No name, email, company, budget figure or any personal/business detail is ever requested — see §8.

## 5. Calculation / decision logic

- **Weighted sum, per category:** for each of the 4 categories, `score = Σ (weight[factor] × fitRating[category][factor])` across all 6 factors, using the fixed 1–5 fit ratings in `artifact-data.json` → `categories[].scores`. Categories are then ranked descending by this sum.
- **No hidden bonus, malus, or tie-break rule favours any category** — including no artificial boost for "individuelle Entwicklung" regardless of Weissmann's own delivery model. The four presets shipped in the data file are proof-of-work that the same unmodified formula produces Wix, WordPress, Webflow and custom development as the top result respectively, depending only on the weights (verified: `solo-schnell-guenstig` → Wix 42, `zweisprachig-budgetbewusst` → WordPress 17, `schnell-gepflegt-kein-aufwand` → Webflow 19, `volle-kontrolle-wachstum` → Custom 45; runner-up scores are shown alongside, not hidden).
- **Ties are shown as ties** (e.g. two categories both at rank 1) rather than being artificially broken by an undisclosed rule.
- **All-zero state:** if every slider is at 0, no ranking is computed or displayed (see §7) — a zero-weighted "ranking" would be meaningless arithmetic dressed up as a recommendation.
- **Scores are explicitly labelled as a structural, qualitative fit assessment** ("keine Note, kein Messwert") based on how these platform categories generally and verifiably work — not a benchmark of any specific product's current pricing, plan tier or feature set, and not a claim that any of the three named third-party products (Wix, WordPress, Webflow) works exactly as scored for every possible plan or configuration.

## 6. Outputs

1. A ranked list (1st–4th) of all four categories with their computed score, each category's `oneLiner` honest summary, and a visual weight bar (see §13) — proportional to score, not styled as a pass/fail grade.
2. For the top-ranked category only: the six per-factor trade-off sentences from `artifact-data.json` expanded by default, so the reader sees *why* it ranked first, factor by factor — including factors where that category is honestly weak.
3. For the remaining three categories: the `oneLiner` visible, full trade-offs available behind a "Details anzeigen" toggle per category (progressive disclosure, not six paragraphs dumped for every category at once).
4. A small "Ihre Gewichtung" recap strip showing the six slider values currently set, so the reader can screenshot or note down the exact inputs that produced this result.

## 7. Error states

- All six sliders at 0 → ranking area shows a calm empty state: "Setzen Sie mindestens einen Regler auf über 0, um eine Rangfolge zu sehen." No categories are ranked, no score of 0 is displayed as if it meant something.
- Exact tie between two or more categories → both shown at the same rank number with a short note: "Gleichauf bei Ihrer aktuellen Gewichtung." No coin-flip tie-break is applied.
- JavaScript disabled / artifact fails to load the interactive layer → the underlying HTML still renders the full static matrix (all 4 categories × 6 factors, scores and trade-off text) as a plain readable table, so the page remains useful without the slider interaction.

## 8. Privacy considerations

- Fully client-side; no network requests, no analytics call, no data leaves the browser tab.
- No input field of any kind collects a name, email, company name, budget figure, or any other personal or business detail — the reader only ever moves sliders and clicks preset/toggle buttons.
- A one-line note near the sliders states that the six weights are used only to compute the on-screen ranking in that browser session and are never transmitted, stored, or used to personalise anything else on the site.

## 9. Accessibility requirements

- All six sliders are native, keyboard-operable range inputs (arrow keys adjust by 1 step) with a visible focus ring and the current numeric value + label ("2 — wichtig") announced to screen readers on every change.
- Preset cards and the per-category "Details anzeigen" toggles are real buttons, fully keyboard-reachable, with visible focus states.
- The ranked list updates inside an `aria-live="polite"` region so a screen-reader user hears the new order after a slider change without having to re-navigate to the results.
- Rank, category name and score are never conveyed by colour alone — always paired with text ("Platz 1 · Baukasten (Wix-Typ) · 42 Punkte").
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` (rank re-ordering happens instantly, no animated reshuffle).

## 10. Mobile behaviour

- Sliders stack full-width, one per row, with the numeric value shown directly above the thumb (not only in a tooltip that requires touch-and-hold).
- Preset cards become a horizontally scrollable, touch-swipeable strip instead of four cards competing for width.
- Ranked results stack vertically; only the 1st-place category is expanded by default, the other three show as collapsed one-line rows (label + score) that expand on tap — avoids a very long single-column scroll on a small screen.
- The "Ihre Gewichtung"-recap strip collapses to a compact single line with a "Details" expand toggle on narrow viewports.

## 11. Exact CTA

Primary CTA button, shown persistently below the ranked results (not gated behind any interaction):

> **"Kostenloses Erstgespräch: Wir ordnen Ihre Anforderungen der passenden Plattform zu"** → links to `/leistungen/ki-webentwicklung/`

Secondary, lower-emphasis link near the top of the tool:

> "Zum vollständigen Artikel mit allen sechs Faktoren: Artikel lesen" → links to the article's own URL (the academy spoke page for `wix-wordpress-webflow-individuell`).

The CTA text and destination stay identical regardless of which category ranks first — including when the result is Wix, WordPress or Webflow, not Weissmann's own custom-development service. No countdown, no fake urgency, no "before it's too late" language.

## 12. Disclaimer

Include a short, visible note near the sliders:

> "Die Punktzahlen sind eine strukturelle, qualitative Einschätzung dazu, wie diese vier Plattform-Kategorien grundsätzlich funktionieren – keine Messung, kein Benchmark einzelner Produkte und keine Garantie für ein bestimmtes Preis- oder Funktionsangebot zum Zeitpunkt Ihrer Nutzung. Prüfen Sie aktuelle Konditionen direkt beim jeweiligen Anbieter."

This prevents the scores from being read as a live-verified benchmark of Wix, WordPress or Webflow's current specific plans, and makes clear the tool is a structured decision aid, not a product test.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only for the rank-1 badge number ("1"), never as a full-category "winner" fill — all four categories otherwise share the same near-black (`--ink`) treatment so the tool doesn't read as pushing one category visually before the reader has set any weights.
- Score bars: simple horizontal bars, thin 1px border (`--line: #e5e5e2`), fill in a single neutral tone (dark grey, not a traffic-light gradient) with the numeric score printed at the bar's end — a counted result, not a gauge implying a pass/fail threshold.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- Sliders styled as simple native range inputs re-skinned to the brand's ink/paper palette — no gamified slider skins, no emoji.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the expanded rank-1 detail card.
- Overall feel: a requirements worksheet that computes itself — calm and analytical, not a "which platform are you?" personality-quiz aesthetic.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Plattform-Fit-Matrix: Wix,
WordPress, Webflow oder individuell?" — a German-language (de-CH)
interactive decision tool for Swiss businesses choosing a website
platform category. It is a weighted multi-criteria fit calculator, not a
lead-generation quiz and not a calculator that always crowns "individuelle
Entwicklung" the winner.

CONTEXT
The companion article's thesis: "which platform is best" is the wrong
question — the right one is "which platform fits MY requirements" across
six factors: ownership & portability, performance potential, editing ease
for non-technical staff, security & maintenance burden, multilingual SEO
capability, and total cost of ownership over 3+ years. Four platform
categories are scored 1 (weak fit) to 5 (strong fit) per factor, based on
how these categories generally and verifiably work — not on any single
product's current pricing or feature list. This tool must let the user
set how much each factor matters to them (0–3) and compute a ranking live.
It must NEVER hard-code a winner — the ranking must be pure arithmetic
from the weights and the fixed score table below.

FIXED DATA — FACTORS (id, label)
1. ownershipPortability — "Eigentum & Portabilität"
2. performance — "Performance-Potenzial"
3. editing — "Bearbeitbarkeit für Nicht-Techniker"
4. securityMaintenance — "Sicherheit & geringer Wartungsaufwand"
5. multilingualSeo — "Mehrsprachiges SEO"
6. totalCost — "Gesamtkosten über 3+ Jahre"

FIXED DATA — CATEGORIES, SCORES (1–5) AND TRADE-OFF TEXT
(id, label, oneLiner, scores per factor in the order above, then the six
trade-off sentences in the same factor order)

1. wix — "Baukasten (Wix-Typ)" — "Am schnellsten startklar und am
   einfachsten selbst zu pflegen — dafür am stärksten an den Anbieter
   gebunden."
   Scores: ownershipPortability 1, performance 2, editing 5,
   securityMaintenance 5, multilingualSeo 2, totalCost 4.
   Trade-offs:
   - Eigentum & Portabilität: "Kein Export von Design oder Seitencode
     vorgesehen; ein Anbieterwechsel bedeutet praktisch einen Neubau."
   - Performance: "Ausreichend für die meisten kleinen Websites, aber
     ohne eigene technische Eingriffsmöglichkeit nach oben begrenzt."
   - Bearbeitbarkeit: "Direktes visuelles Editieren ohne
     Entwickler-Kenntnisse — der stärkste Faktor dieser Kategorie."
   - Sicherheit & Wartung: "Der Anbieter patcht zentral; für den Betrieb
     entsteht praktisch kein eigener Wartungsaufwand."
   - Mehrsprachiges SEO: "Eingebaute Mehrsprachigkeit vorhanden, aber
     begrenzte Kontrolle über URL-Struktur und hreflang bei komplexeren
     Anforderungen."
   - Gesamtkosten: "Niedriger, planbarer Einstieg; wächst mit jeder
     zusätzlich gebuchten App oder Funktion."

2. wordpress — "WordPress (selbst gehostet)" — "Die grösste Bandbreite:
   volles Eigentum und starke Mehrsprachigkeit möglich — aber nur mit
   eigener, laufender Pflege."
   Scores: ownershipPortability 4, performance 3, editing 3,
   securityMaintenance 2, multilingualSeo 4, totalCost 3.
   Trade-offs:
   - Eigentum & Portabilität: "Als WordPress.org quelloffen (GPL) auf
     jedem Hosting installierbar; volles Eigentum an Code und Datenbank.
     Gilt nicht für WordPress.com."
   - Performance: "Grösste Spannbreite aller vier Kategorien: schlank
     gepflegt sehr schnell, mit vielen Plugins spürbar langsam."
   - Bearbeitbarkeit: "Block-Editor deckt einfache Änderungen ab; bei
     Page-Builder-Aufbau hängt die Bearbeitbarkeit stark vom sauberen
     Setup ab."
   - Sicherheit & Wartung: "Kern, Theme und jedes Plugin brauchen
     eigenständig Updates — eine der häufigsten Ursachen für gehackte
     Seiten, wenn das liegen bleibt."
   - Mehrsprachiges SEO: "Ausgereiftes Plugin-Ökosystem erlaubt feine
     Kontrolle über Sprach-URLs und hreflang, auf Kosten zusätzlicher
     Komplexität."
   - Gesamtkosten: "Software kostenlos, aber Hosting, Theme, Plugins und
     Wartung summieren sich — im Erstangebot oft unterschätzt."

3. webflow — "Webflow" — "Solide Mitte zwischen Baukasten und
   Individualentwicklung — nirgends Spitzenreiter, nirgends schwach."
   Scores: ownershipPortability 2, performance 4, editing 3,
   securityMaintenance 4, multilingualSeo 3, totalCost 3.
   Trade-offs:
   - Eigentum & Portabilität: "Code-Export (HTML/CSS/JS) auf
     kostenpflichtigen Workspace-Plänen möglich, aber dynamische
     CMS-Inhalte werden nicht mitexportiert."
   - Performance: "Für überwiegend statische Marketing-Seiten meist
     sauber und schlank; wächst mit CMS-Logik und Interaktionen."
   - Bearbeitbarkeit: "Editor und Designer sind getrennt: einfache
     Textänderungen in bestehenden CMS-Feldern sind zugänglich, neue
     Strukturen verlangen den Designer."
   - Sicherheit & Wartung: "Anbieter-gehostet, zentral gepatcht —
     ähnlich niedriger Aufwand wie bei einem Baukasten."
   - Mehrsprachiges SEO: "Native Lokalisierung mit Subdirectory- oder
     Domain-Optionen vorhanden; Umfang und Konditionen vor Entscheid
     aktuell prüfen."
   - Gesamtkosten: "Keine separate Hosting-Rechnung, aber
     Content-Wachstum kann durch CMS-Item-Limits eine teurere
     Plan-Stufe erzwingen."

4. custom — "Individuelle Entwicklung" — "Die höchste Obergrenze bei
   Kontrolle, Performance und mehrsprachigem SEO — aber die höchste
   Anfangsinvestition und das grösste Scope-Risiko."
   Scores: ownershipPortability 5, performance 5, editing 3,
   securityMaintenance 3, multilingualSeo 5, totalCost 2.
   Trade-offs:
   - Eigentum & Portabilität: "Code und Datenmodell gehören vollständig
     Ihnen — aber nur wirklich portabel mit sauberer Dokumentation,
     sonst faktisch genauso gebunden wie ein Baukasten."
   - Performance: "Höchste erreichbare Obergrenze, weil jedes
     ausgelieferte Byte eine bewusste Entscheidung ist — eine Obergrenze
     ist aber kein automatisches Ergebnis."
   - Bearbeitbarkeit: "Komplett offen: kann so einfach wie ein
     Baukasten-Editor sein, wenn ein Redaktionssystem explizit
     beauftragt wird — sonst geht jede Änderung über die
     Entwickler-Person."
   - Sicherheit & Wartung: "Keine Plugin-Update-Tretmühle bei schlankem
     Aufbau, aber die volle Verantwortung für Hosting, Zertifikate und
     Monitoring liegt bei Ihnen oder Ihrer Agentur."
   - Mehrsprachiges SEO: "Volle Kontrolle über URL-Architektur und
     hreflang — muss aber explizit eingeplant werden, sonst nützt die
     Kategorie nichts."
   - Gesamtkosten: "Höchste Anfangsinvestition der vier Kategorien;
     zahlt sich nur bei kontrolliertem Scope über einen längeren
     Zeitraum aus."

PRESETS (4 cards, pre-fill the six sliders; user can still adjust every
slider afterward — selecting a preset is a starting point, not a lock)
1. "Ich will schnell online sein und selbst pflegen, ohne mich um
   Wartung oder Kosten zu kümmern" → weights: ownershipPortability 0,
   performance 0, editing 3, securityMaintenance 3, multilingualSeo 0,
   totalCost 3. (Computes to Wix on top.)
2. "Ich verkaufe zweisprachig, bin kostenbewusst, will aber echte
   Kontrolle über die Sprach-URLs" → weights: ownershipPortability 0,
   performance 0, editing 0, securityMaintenance 0, multilingualSeo 2,
   totalCost 3. (Computes to WordPress on top.)
3. "Ich will eine schnelle, gepflegte Seite, ohne selbst Wartung zu
   betreiben" → weights: ownershipPortability 0, performance 2, editing 0,
   securityMaintenance 2, multilingualSeo 0, totalCost 1. (Computes to
   Webflow on top.)
4. "Ich brauche volle Kontrolle, Höchstleistung und mehrsprachige
   Architektur für ein Wachstumsprojekt" → weights: ownershipPortability 3,
   performance 3, editing 0, securityMaintenance 0, multilingualSeo 3,
   totalCost 0. (Computes to Individuelle Entwicklung on top.)

Verify your implementation reproduces these four different winners from
these four weight sets using nothing but the formula below — if your
build always ranks "Individuelle Entwicklung" first regardless of preset,
the logic is wrong and must be fixed before shipping.

CALCULATION
For each category: score = Σ over the six factors of (slider weight for
that factor × that category's 1–5 rating for that factor). Rank
categories descending by score. Ties render at the same rank with a
"Gleichauf" note. If all six sliders are 0, show no ranking at all — see
ERROR STATES.

UI / INTERACTION
- Six labelled range sliders (0–3, integer steps), each showing its
  current numeric value and word label ("0 unwichtig" / "1 eher wichtig"
  / "2 wichtig" / "3 entscheidend") live as it's dragged or moved by
  keyboard.
- Four preset cards above or beside the sliders; selecting one sets all
  six sliders to that preset's weights (still adjustable after).
- A live-updating ranked list below the sliders: rank number, category
  label, computed score, one-line "oneLiner". The rank-1 category is
  expanded by default showing all six trade-off sentences; the other
  three show collapsed with a "Details anzeigen" toggle per category.
- A small "Ihre Gewichtung" recap strip showing the six current slider
  values.
- Recompute and re-render instantly on every slider change — no submit
  button.

ERROR STATES
- All sliders at 0: show "Setzen Sie mindestens einen Regler auf über 0,
  um eine Rangfolge zu sehen." and no ranked list.
- Exact score tie between categories: show them at the same rank with
  "Gleichauf bei Ihrer aktuellen Gewichtung."
- If JavaScript fails to run, the page must still show the full static
  4×6 matrix (all scores and trade-off text) as a plain table — progressive
  enhancement, not a blank page.

DISCLAIMER (always visible near the sliders, not collapsible away)
"Die Punktzahlen sind eine strukturelle, qualitative Einschätzung dazu,
wie diese vier Plattform-Kategorien grundsätzlich funktionieren – keine
Messung, kein Benchmark einzelner Produkte und keine Garantie für ein
bestimmtes Preis- oder Funktionsangebot zum Zeitpunkt Ihrer Nutzung.
Prüfen Sie aktuelle Konditionen direkt beim jeweiligen Anbieter."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs, no storage beyond in-memory session state. No input
field of any kind asks for a name, email, company or budget figure.

CTA
Primary button, always visible below the ranked results (not gated
behind any interaction):
  Label: "Kostenloses Erstgespräch: Wir ordnen Ihre Anforderungen der
  passenden Plattform zu"
  Link: https://www.weissmann.ai/leistungen/ki-webentwicklung/
Secondary lower-emphasis link near the top: "Zum vollständigen Artikel
mit allen sechs Faktoren: Artikel lesen" (link to the article page).
Keep the CTA text and destination identical no matter which category
ranks first, including when it is Wix, WordPress or Webflow rather than
Weissmann's own custom-development service. No countdowns, no fake
urgency, no "before it's too late" phrasing.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a
requirements worksheet that computes itself, not a personality quiz):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the rank-1 badge number,
    never as a full-category colour fill; all four categories otherwise
    share the same near-black treatment so nothing looks pre-selected
    before the user sets any weights.
  Score bars: simple horizontal bars, 1px border #e5e5e2, single neutral
    dark-grey fill with the numeric score printed at the end — not a
    traffic-light gradient, not a gauge implying pass/fail.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Corner radius 10px (small elements) / 14px (cards). Soft shadow only on
    the expanded rank-1 detail card: 0 1px 2px rgba(17,17,17,.05),
    0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Sliders: native range inputs re-skinned to the ink/paper palette, no
    gamified skins, no emoji.

ACCESSIBILITY
All six sliders keyboard-operable (arrow keys, 1-step increments) with
visible focus states and the numeric value + word label announced on
change. Preset cards and "Details anzeigen" toggles are real buttons,
fully keyboard-reachable. Ranked list updates inside an
aria-live="polite" region. Rank/category/score never conveyed by colour
alone — always paired with text. 4.5:1 minimum contrast. Respect
prefers-reduced-motion (no animated re-shuffle of the ranked list).

LANGUAGE
All UI copy in German (Swiss spelling: "ss", not "ß"). Do not add
English, Italian or French translations — this tool exists only in
German.

Do not fabricate additional platform features, current pricing, or
benchmark numbers beyond what is given above. Do not hard-code
"Individuelle Entwicklung" as the default or favoured winner — the
ranking must always be pure arithmetic from the current slider weights.
```
