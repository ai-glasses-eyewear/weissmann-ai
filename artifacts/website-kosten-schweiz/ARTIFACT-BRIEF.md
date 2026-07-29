# ARTIFACT BRIEF — Swiss Website Cost Calculator

**Companion article:** `website-kosten-schweiz` (DE-WEB-01) — "Was kostet eine professionelle Website in der Schweiz wirklich?"
**Artifact title:** Website-Kosten-Rechner Schweiz
**Language:** German (de) only — matches the article; no EN/IT/FR version is commissioned.

---

## 1. User problem

A Swiss SME owner who is about to request website quotes has no way to translate "we need 8 pages, two languages and a small shop" into an understanding of which cost drivers that combination actually triggers. Vendor pricing pages give one flat number for a fixed scope; nothing lets the reader plug in their own scope and see, in the article's own terms (the ten cost-building-blocks and the offer checklist), what to expect and what to ask for. Without this, readers either anchor on a random number they saw online or accept an offer without knowing which of the ten blocks it silently excludes.

## 2. Intended audience

Swiss SME owners, office managers or marketing leads who are about to brief one or more web agencies or freelancers and want to arrive at that conversation with a clear, personalised scope description — not a fabricated price tag.

## 3. Why an interactive artifact beats a static PDF

A static price table forces the reader into someone else's scope buckets ("5 pages" / "10 pages") and cannot react to combinations (2 languages *and* a small shop *and* a CRM connection). The interactive version:
- Lets the reader combine their own real parameters (page count, languages, copywriting need, design ambition, e-commerce complexity, integrations, ongoing maintenance) instead of picking the closest pre-set bucket.
- Maps every selection directly onto the article's own ten cost-building-blocks, so the reader learns to see their own project through the same lens the article teaches, not a new one.
- Generates a personalised subset of the article's offer checklist — the exact questions to bring into a vendor conversation, cut down to only the ones that matter for *their* scope.
- Never invents a total price. A static PDF price table implicitly claims precision it cannot back up; a tool that visibly reasons "this selection affects these blocks, at this relative weight" is honest about what can and cannot be known before a real quote exists.

## 4. Inputs

1. **Seitenumfang** — a single-select of four page-count bands: "1–5 Seiten", "6–10 Seiten", "11–20 Seiten", "20+ Seiten". No default selected.
2. **Sprachen** — a single-select: "1 Sprache", "2 Sprachen", "3 Sprachen", "4 Sprachen (DE/EN/FR/IT)".
3. **Texte** — toggle: "Ich brauche professionell geschriebene Texte" vs. "Ich liefere die Texte selbst".
4. **Design** — toggle: "Individuelles Design" vs. "Vorlage/Theme genügt".
5. **Shop / E-Commerce** — single-select: "Kein Shop", "Kleiner Katalog ohne Zahlungsabwicklung", "Vollständiger Shop mit Zahlung, Versand, Retouren".
6. **Integrationen** — toggle: "CRM-, Buchungs- oder API-Anbindung nötig" vs. "Keine externen Systeme nötig".
7. **Laufender Betrieb** — single-select: "Ich möchte Hosting/Wartung/Updates abgeben", "Ich betreue das selbst weiter".
8. **Korrekturrunden** — single-select: "2 Runden reichen", "3 oder mehr Runden gewünscht".

All inputs start unselected; the result panel stays empty until at least Seitenumfang and Sprachen are set (the two inputs that affect every block).

## 5. Calculation / decision logic

- **No price is computed or displayed at any point.** The tool never outputs a CHF figure of its own invention. This is a hard rule, not a style preference — the article's entire thesis is that a number without a defined scope is meaningless, and the tool must not contradict its own article.
- **Block-impact lookup:** each input maps to one or more of the article's ten cost-building-blocks (`strategie`, `copywriting`, `design`, `entwicklung`, `mobile`, `performance`, `analytics`, `seo_geo_fundament`, `hosting_wartung`, `korrekturrunden`) with a fixed qualitative weight (`gering` / `mittel` / `hoch`) per selection value, taken from `artifact-data.json`'s `blockImpacts` table. Weights are fixed editorial judgements, not derived from any statistic.
- **Complexity tier (qualitative, not numeric):** the tool counts how many blocks land on `hoch` vs `mittel` vs `gering` across the current selection and resolves this to one of four fixed labels — "Schlank", "Mittel", "Umfangreich", "Komplex" — via simple fixed thresholds in `complexityTiers`. This label is explicitly presented as a relative scope description, never as a price band synonym (the UI copy must never say "das kostet etwa…").
- **Checklist personalisation:** each of the article's 11 offer-checklist items carries a `relevantWhen` condition (e.g. the "Sprachen"-item only surfaces prominently when 2+ languages are selected, the shop-related item only when a shop tier above "Kein Shop" is chosen). All 11 items are always listed, but the ones triggered by the current selection are visually marked "Für Sie besonders relevant" — nothing is ever hidden, only emphasised.
- **Illustrative reference lookup:** if the current selection's page band and language count land inside one of Weissmann's three published tiers' stated scope (from `referenceTiers`, sourced from `src/data/pricing.ts`), show that tier's name and exact real price as one labelled example — never as "your price" and never auto-selected as a recommendation when multiple tiers could loosely fit (in that case, show none rather than guess).

## 6. Outputs

1. A ten-row breakdown, one per cost-building-block, each showing a plain-language one-line explanation and a `gering` / `mittel` / `hoch` impact tag driven by the current selection (never a colour-only signal — always paired with the word).
2. The current complexity tier label ("Schlank" / "Mittel" / "Umfangreich" / "Komplex") with a one-line explanation of what drove it (e.g., "Vor allem Shop und Mehrsprachigkeit treiben den Umfang hier nach oben").
3. The full 11-item offer checklist from the article, with the selection-relevant items visually flagged.
4. Optionally, if the selection lines up with a real Weissmann tier's stated scope: that tier's name and exact price (e.g., "CHF 880" or "CHF 4'990"), clearly labelled "ein reales Beispiel, keine automatische Empfehlung für Ihr Projekt".
5. A "Für Ihre nächste Anfrage kopieren" block: a plain-text summary of the selected scope (page band, languages, copywriting need, design ambition, shop tier, integrations, maintenance preference) formatted so the reader can paste it directly into an email to a vendor.

## 7. Error states

- Seitenumfang or Sprachen not yet selected → the breakdown and tier panels stay empty with a plain prompt ("Wählen Sie mindestens Seitenumfang und Sprachen, um eine Einschätzung zu sehen.") — no partial/guessed result.
- No shop tier, integration or maintenance preference selected → those specific blocks simply show their baseline (`gering`) impact rather than blocking the whole tool; only the two required inputs gate the result.
- Selection matches no real Weissmann tier scope closely enough → the reference block is omitted entirely, never force-fitted to the nearest tier.
- JavaScript disabled → the static HTML still lists all ten blocks, all eleven checklist items and the three reference tiers in a plain, unfiltered, readable order (progressive enhancement, not a blank page).

## 8. Privacy considerations

- Fully client-side; nothing is transmitted anywhere. No field asks for a company name, email, budget or any personal or business-identifying detail — every input is a generic scope parameter (page count, language count, toggles).
- Selections may be held in-memory for the session only; if the build persists them via `localStorage` for convenience across visits, that must be disclosed in one visible line with a working "Auswahl zurücksetzen" control.
- No analytics events tied to individual selections are required for the tool to function; if added, they must be aggregate/anonymous only and disclosed.

## 9. Accessibility requirements

- All selects/toggles fully keyboard-operable with visible focus states; grouped with proper `<fieldset>`/`<legend>` semantics per input group.
- Impact tags (`gering`/`mittel`/`hoch`) and the complexity tier are always shown as text, never colour-only.
- The breakdown and checklist update announce themselves via an `aria-live="polite"` region so screen-reader users are told the result changed without losing their place.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` (no animated counters or transitions on value change — values update instantly).
- The ten-block breakdown and eleven-item checklist are marked up as real lists, not bare `<div>` grids.

## 10. Mobile behaviour

- Inputs render as a single-column stacked form; the result panel (breakdown, tier, checklist, copy-block) appears below the form, not in a separate tab, so the reader can scroll down to see updates without losing the form.
- A small sticky summary bar ("Aktuelle Einschätzung: Mittel") stays visible while scrolling through the ten-block breakdown, so the reader keeps context on a long page.
- The "Für Ihre nächste Anfrage kopieren" block has a full-width, thumb-reachable "Text kopieren" button.
- Toggle controls sized for touch (≥44×44px targets).

## 11. Exact CTA

Primary CTA button, shown persistently below the result panel (available even before all inputs are set, but most useful once a result exists):

> **"Eigenes Website-Projekt kostenlos einordnen lassen"** → links to `/kontakt/`

Secondary, lower-emphasis link near the top of the tool:

> "Zum vollständigen Artikel mit den zehn Bausteinen und der Offerten-Checkliste: Artikel lesen" → links to the article's own URL (`/ki-academy/marketing-seo-geo/website-kosten-schweiz/`).

No countdown, no fake urgency, no "jetzt sichern" language. The CTA text and destination never change based on which selection is active, and it is never phrased as if it were the only or the obviously correct next step.

## 12. Disclaimer

Include a short, visible note near the top of the tool and again next to the reference-tier block:

> "Dieses Werkzeug berechnet keinen Preis. Es zeigt, welche der zehn Kostenbausteine Ihre Auswahl betrifft, und erstellt eine persönliche Checkliste für Offertengespräche. Die einzige echte Preisangabe stammt aus der öffentlich einsehbaren Preisstruktur von Weissmann und wird nur gezeigt, wenn Ihre Auswahl zum dort beschriebenen Umfang passt — sie ist ein Beispiel, kein Angebot für Ihr Projekt."

This prevents the tool from being mistaken for an actual quote generator, consistent with the article's central warning against pretending a scope-less number is meaningful.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used sparingly, only for the "hoch" impact tag and always paired with the word "hoch" — never as a large fill and never the only signal. "Mittel" uses a muted ink tone with the word itself; "gering" uses the quietest ink-mute tone with the word itself. No green or amber traffic-light system — the site's palette has no green.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- The ten-block breakdown rendered as a simple bordered list/table (thin 1px lines, `--line: #e5e5e2`), not a bar chart or gauge — this keeps the "no fake precision" rule visible in the visual design itself (a bar chart implies a measured quantity; a labelled list does not).
- Typography: `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the active result panel.
- Overall feel: a structured worksheet the reader fills in, not a dashboard or a quote generator — calm, editorial, no gamified scoring visuals.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Website-Kosten-Rechner Schweiz"
(Swiss Website Cost Calculator). It is a German-language (de-CH)
interactive worksheet for Swiss businesses about to request website
quotes — it is explicitly NOT a price calculator that outputs a CHF
figure. It maps the reader's own project scope onto ten cost-driving
work packages and a personalised offer checklist.

CONTEXT
The companion article's thesis: a website price without a defined scope
is meaningless. Every professional website is assembled from ten
recurring work packages (Strategie & Konzeption, Copywriting, Design,
Entwicklung, Mobile-Optimierung, Performance, Analytics-Einrichtung,
Technisches SEO- und GEO-Fundament, Hosting & Wartung, Korrekturrunden).
What differs between a CHF 900 offer and a CHF 16'000 offer for
"the same" page count is which of these ten packages are actually
included, and how many times each is repeated (more pages, more
languages, e-commerce, custom integrations). This tool makes that
personal: the reader describes their own project, and the tool shows
which packages that description activates, at what relative weight —
never a fabricated total price.

INPUTS (all start unselected)
1. Seitenumfang — single-select, 4 options: "1–5 Seiten" (value: xs),
   "6–10 Seiten" (value: s), "11–20 Seiten" (value: m), "20+ Seiten"
   (value: l).
2. Sprachen — single-select, 4 options: "1 Sprache" (1), "2 Sprachen" (2),
   "3 Sprachen" (3), "4 Sprachen (DE/EN/FR/IT)" (4).
3. Texte — toggle: "Ich brauche professionell geschriebene Texte"
   (copywriting: true) vs. "Ich liefere die Texte selbst"
   (copywriting: false).
4. Design — toggle: "Individuelles Design" (custom: true) vs.
   "Vorlage/Theme genügt" (custom: false).
5. Shop — single-select, 3 options: "Kein Shop" (none), "Kleiner Katalog
   ohne Zahlungsabwicklung" (catalog), "Vollständiger Shop mit Zahlung,
   Versand, Retouren" (full).
6. Integrationen — toggle: "CRM-, Buchungs- oder API-Anbindung nötig"
   (true) vs. "Keine externen Systeme nötig" (false).
7. Laufender Betrieb — single-select, 2 options: "Ich möchte
   Hosting/Wartung/Updates abgeben" (managed), "Ich betreue das selbst
   weiter" (self).
8. Korrekturrunden — single-select, 2 options: "2 Runden reichen"
   (two), "3 oder mehr Runden gewünscht" (three_plus).

The result panel (items below) stays empty with the prompt "Wählen Sie
mindestens Seitenumfang und Sprachen, um eine Einschätzung zu sehen."
until BOTH Seitenumfang and Sprachen have a value. Once both are set,
show the full result panel; unset optional inputs simply contribute
their baseline ("gering") impact rather than blocking anything.

TEN COST-BUILDING-BLOCKS (fixed IDs, fixed German labels — use exactly)
  strategie → "Strategie & Konzeption"
  copywriting → "Copywriting & Texterstellung"
  design → "Design"
  entwicklung → "Entwicklung & Umsetzung"
  mobile → "Mobile-Optimierung"
  performance → "Performance"
  analytics → "Analytics-Einrichtung"
  seo_geo_fundament → "Technisches SEO- und GEO-Fundament"
  hosting_wartung → "Hosting & Wartung"
  korrekturrunden → "Korrekturrunden"

IMPACT LOGIC (implement exactly as these fixed rules — do not invent a
numeric formula or weighted score; each block's impact is simply the
HIGHEST tag triggered by any current selection, from gering < mittel <
hoch):
  strategie: seitenumfang m or l → mittel; sonst gering. shop != none →
    hoch (a shop always forces real strategic planning).
  copywriting: copywriting toggle true → hoch; sonst gering.
  design: custom toggle true → hoch; sonst gering.
  entwicklung: seitenumfang l → hoch; seitenumfang m → mittel; sonst
    gering. integrationen true → hoch (overrides if higher). shop ==
    full → hoch.
  mobile: always mittel as a baseline (every professional site needs
    this); shop == full → hoch.
  performance: seitenumfang l or shop == full → hoch; seitenumfang m →
    mittel; sonst gering.
  analytics: always gering baseline; shop != none → mittel (conversion
    tracking adds setup work).
  seo_geo_fundament: sprachen >= 2 → hoch; sprachen == 1 and
    seitenumfang >= m → mittel; sonst gering.
  hosting_wartung: laufender_betrieb == managed → mittel; shop == full
    → hoch (regardless of managed/self).
  korrekturrunden: korrekturrunden == three_plus → mittel; sonst gering.

COMPLEXITY TIER (qualitative label only, NEVER a number or price):
Count how many of the ten blocks are at "hoch" once both required inputs
are set:
  0–1 blocks at hoch → "Schlank"
  2–3 blocks at hoch → "Mittel"
  4–5 blocks at hoch → "Umfangreich"
  6+ blocks at hoch → "Komplex"
Show one explanatory line naming the 1–3 blocks that are driving the
tier (the ones at "hoch"), e.g. "Vor allem Copywriting und Shop treiben
den Umfang hier nach oben."

OFFER CHECKLIST (11 fixed items, always all shown, in this order; mark
an item "Für Sie besonders relevant" when its condition is met — do not
hide any item ever):
1. "Ist die Seitenzahl konkret aufgelistet, oder steht nur ein
   unbestimmtes «bis zu X Seiten»?" — relevant when seitenumfang is m or l.
2. "Wer schreibt die Texte — Sie selbst, der Anbieter, oder ist das
   ungeregelt?" — relevant when copywriting is true.
3. "Wie viele Korrekturrunden sind enthalten, und was kostet eine
   zusätzliche?" — relevant when korrekturrunden is three_plus.
4. "Gehören Ihnen Code und Quelldateien nach Projektabschluss?" —
   relevant when custom (Design) is true.
5. "Ist SEO konkret beschrieben (Sitemap, strukturierte Daten,
   Ladezeit) oder ein vages Marketingwort?" — relevant when
   seo_geo_fundament resolves to mittel or hoch.
6. "Was kostet Hosting und Wartung nach dem Launch, und auf wessen
   Namen laufen Domain und Hosting?" — relevant when laufender_betrieb
   is managed.
7. "Ist die Anzahl Sprachen explizit gezählt?" — relevant when sprachen
   >= 2.
8. "Gibt es einen Zeitplan, und was passiert bei verspäteten Inhalten
   von Ihrer Seite?" — always shown, never specially flagged.
9. "Sind GA4 und Search Console Teil des Grundpreises oder ein
   Extra?" — always shown, never specially flagged.
10. "Ist ein Shop, ein Buchungssystem oder eine CRM-Anbindung bereits
    eingepreist oder folgt eine separate Offerte?" — relevant when shop
    != none or integrationen is true.
11. "Ist ein Mindestmass an Support nach dem Launch im Preis enthalten,
    oder wird jede Stunde einzeln verrechnet?" — relevant when
    laufender_betrieb is managed.

REFERENCE TIER LOOKUP (show at most one, only if a clear match; show
none if ambiguous — never force a fit):
  Starter Website — matches when seitenumfang == xs AND sprachen == 1.
    Show: "Starter Website — CHF 880 (regulär CHF 2'490), bis zu 5
    Kernseiten, 1 Sprache, 2 Korrekturrunden, technisches SEO- und
    GEO-Fundament, GA4 und Search Console." Label clearly: "Ein reales
    Beispiel eines Schweizer Anbieters (Weissmann) für einen Umfang wie
    Ihre Auswahl — keine automatische Empfehlung."
  Business Website — matches when seitenumfang is m or l AND shop ==
    none. Show: "Business Website — CHF 4'990, ca. 10–20 Seiten,
    mehrsprachigkeitsfähig, konversionsorientierte Architektur, 3
    Korrekturrunden." Same neutral labelling as above.
  Individuelle Website / Web-Plattform — matches when shop == full OR
    integrationen == true. Show: "Individuelle Website / Web-Plattform
    — ab CHF 9'900, grosse mehrsprachige Architektur, E-Commerce oder
    Integrationen." Same neutral labelling as above.
If a selection could loosely match more than one tier, or matches none
cleanly, show NO reference tier block at all rather than guessing.

OUTPUT LAYOUT
1. Ten-row block breakdown: block name (fixed German label above) + one
   short explanatory sentence (reuse the article's own descriptions,
   summarised to one line) + impact tag "gering"/"mittel"/"hoch" as
   text, never colour-only.
2. Complexity tier headline ("Schlank"/"Mittel"/"Umfangreich"/"Komplex")
   with the one-line driver explanation.
3. The 11-item checklist, relevant items visually marked (e.g. a small
   "Für Sie besonders relevant" tag), never hidden or reordered.
4. Reference tier block (0 or 1 shown, per the lookup rules above).
5. "Für Ihre nächste Anfrage kopieren" — a plain-text box summarising
   the current selection in sentence form (page band, language count,
   copywriting need, design ambition, shop tier, integrations,
   maintenance preference), with a "Text kopieren" button using the
   Clipboard API (with a manual-select fallback if it fails — no error
   thrown to the user).

DISCLAIMER (always visible near the top of the tool, and repeated next
to the reference-tier block)
"Dieses Werkzeug berechnet keinen Preis. Es zeigt, welche der zehn
Kostenbausteine Ihre Auswahl betrifft, und erstellt eine persönliche
Checkliste für Offertengespräche. Die einzige echte Preisangabe stammt
aus der öffentlich einsehbaren Preisstruktur von Weissmann und wird nur
gezeigt, wenn Ihre Auswahl zum dort beschriebenen Umfang passt — sie ist
ein Beispiel, kein Angebot für Ihr Projekt."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No field asks for a name, company, email or budget —
every input is a generic scope parameter. If selections are kept in
localStorage for convenience, disclose it in one visible line with a
working "Auswahl zurücksetzen" button.

CTA
Primary button, always visible below the result panel:
  Label: "Eigenes Website-Projekt kostenlos einordnen lassen"
  Link: https://www.weissmann.ai/kontakt/
Secondary lower-emphasis link near the top: "Zum vollständigen Artikel
mit den zehn Bausteinen und der Offerten-Checkliste: Artikel lesen"
(link to the article page). Do not use countdowns, fake urgency, or
"jetzt sichern" phrasing. Do not change the CTA wording based on the
current selection.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a worksheet,
not a dashboard or gamified calculator):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "hoch" impact tag,
    always paired with the word "hoch", never as a large fill or the
    only signal. "mittel" uses a muted ink tone with the word itself;
    "gering" uses the quietest ink-mute tone with the word itself. Do
    NOT use green or a traffic-light system — the site's palette has no
    green.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the active result panel:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  The ten-block breakdown is a simple bordered list/table, NOT a bar
  chart, gauge, or progress ring — a chart-like visual would imply a
  measured quantity that does not exist here.
  Layout: single-column stacked form, result panel below it; a small
  sticky summary bar ("Aktuelle Einschätzung: Mittel") stays visible
  while scrolling the breakdown on narrow widths.

ACCESSIBILITY
Full keyboard operability for all selects/toggles with visible focus
states; proper fieldset/legend grouping; aria-live="polite" region for
result updates; 4.5:1 minimum contrast; respect prefers-reduced-motion
(values update instantly, no animated counters); breakdown and checklist
marked up as real lists, not bare divs.

LANGUAGE
All UI copy in German (Swiss spelling: "ss", not "ß"). Do not add
English, Italian or French translations — this tool exists only in
German.

Do not compute, display or imply any CHF total that is not one of the
three explicitly named, exact Weissmann reference prices (CHF 880,
CHF 4'990, CHF 9'900 / ab CHF 9'900) shown only under the matching
conditions above.
```
