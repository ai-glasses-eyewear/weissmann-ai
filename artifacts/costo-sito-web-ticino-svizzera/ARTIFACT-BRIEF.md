# ARTIFACT BRIEF — Calcolatore svizzero del costo del sito

**Companion article:** `costo-sito-web-ticino-svizzera` (IT-WEB-01) — "Quanto costa un sito web professionale in Ticino e in Svizzera?"
**Artifact title:** Calcolatore svizzero del costo del sito
**Language:** Italian (it) only — matches the article; no DE/EN/FR version is commissioned.

---

## 1. User problem

A Ticino SME owner (an artisan, a restaurant, a professional practice) reads the article's seven cost components and its launch-vs-ongoing distinction, but has no way to see how those apply to *their* specific business without picking through the whole article again. Generic scope calculators (page count, language count) ignore that a Ticino business's real cost drivers usually start from "what kind of business is this" — a restaurant's booking system and a law practice's multilingual credibility are not the same category of cost as an artisan's local visibility — and almost nobody separates what is paid once at launch from what keeps running afterwards. Without a structured tool, readers either anchor on Weissmann's own published prices as if they were a market average, or walk into a vendor conversation unable to say which of the seven components actually matter for their project.

## 2. Intended audience

Owners or managers of small Ticino businesses — artisans, restaurants, professional practices (studi legali, fiduciari, consulenti) and comparable SMEs — who are about to brief a web agency or freelancer and want a personalised, honest starting point before that conversation, not a fabricated total price.

## 3. Why an interactive artifact beats a static PDF

A static checklist cannot start from "what kind of business are you" and adjust; it forces every reader through the same generic list regardless of whether they run a workshop or a law practice. The interactive version:
- Starts from a **business-archetype preset** (artisan / restaurant / professional practice / other), pre-filling sensible starting values for the other inputs — the reader can then override any of them, so the tool begins from their real situation instead of a blank abstract form.
- Treats **language reach** as its own first-class dimension (Italian only / Italian + German / Italian + German + a third language), reflecting the article's Ticino-specific thesis that the number of languages — not page count — is usually the biggest hidden cost driver for a Ticino business trading beyond the canton.
- Splits its output into **two separate panels — launch costs and ongoing costs** — instead of one merged score, mirroring the article's central "lanciare o mantenere" distinction rather than collapsing everything into a single complexity number.
- Generates a personalised subset of the article's nine-item preventivo checklist and a plain-text summary the reader can paste into an email to a vendor.
- Never computes or displays an invented CHF total. The only real prices shown are Weissmann's three published tiers, and only when the current selection cleanly matches that tier's stated scope.

## 4. Inputs

1. **Tipo di attività** (archetype preset) — single-select, four options: "Artigiano (elettricista, idraulico, falegname…)", "Ristorante o locale", "Studio professionale (avvocato, fiduciario, consulente…)", "Altro / preferisco configurare da zero". Selecting a preset pre-fills inputs 2–5 below with sensible defaults for that business type; the reader may change any of them afterwards without losing the preset label. Selecting "Altro" leaves all inputs 2–5 unset.
2. **Lingue del sito** — single-select: "Solo italiano", "Italiano e tedesco", "Italiano, tedesco e una terza lingua (francese o inglese)".
3. **Ampiezza del sito** — single-select: "Poche pagine mirate (1–5)", "Sito aziendale (6–12 pagine)", "Architettura ampia (12+ pagine)".
4. **Contenuti** — toggle: "Fornisco io i testi" vs. "Serve copywriting professionale".
5. **Prenotazioni o vendita online** — single-select: "Nessuna", "Modulo di prenotazione o richiesta", "Shop completo con pagamento e spedizione".
6. **Manutenzione continuativa** — single-select: "Me ne occupo io", "Preferisco affidarla a un fornitore".

Inputs 2–6 start unset unless a preset in input 1 has filled them. The result panels stay empty until **Tipo di attività** and **Lingue del sito** are both set (the two inputs that affect every block).

## 5. Calculation / decision logic

- **No price is computed or displayed at any point**, other than the three exact, real Weissmann reference prices under the conditions below. This is a hard rule: the article's thesis is that a figure without a defined scope is meaningless, and the tool must not contradict its own article.
- **Preset defaults (input 1 → inputs 2–6):** each archetype pre-fills a starting combination (see `presets` in `artifact-data.json`) that the reader can freely override. Changing any pre-filled input after selecting a preset does not reset the preset label — presets are a starting point, not a lock.
- **Block-impact lookup, split into two groups:** four **launch blocks** (`design`, `contenuti`, `sviluppo`, `base_seo_geo`) and three **ongoing blocks** (`hosting`, `manutenzione`, `lingue_aggiuntive`), each resolved to a fixed qualitative tag (`basso` / `medio` / `alto`) from the current selection, via the fixed rules in `impactRules`. These are fixed editorial judgements, not a statistical formula.
- **No merged single score.** Unlike a generic complexity score, the tool always shows the two groups side by side, never collapsed into one number — this is the tool's structural expression of the article's launch-vs-ongoing thesis.
- **Checklist personalisation:** each of the article's nine preventivo-checklist items carries a `relevantWhen` condition. All nine are always listed; the ones triggered by the current selection are marked "Particolarmente rilevante per voi" — nothing is ever hidden.
- **Reference tier lookup (illustrative only):** if the current selection cleanly matches one of Weissmann's three published tiers' stated scope (from `referenceTiers`, sourced from `src/data/pricing.ts`), show that tier's name and exact real price as one labelled example — never as "il vostro prezzo" and never shown if more than one tier could loosely apply (show none rather than guess).

## 6. Outputs

1. **Pannello "Costi di lancio"** — four rows (design, contenuti, sviluppo, base tecnica SEO e GEO), each with a one-line plain-language explanation and a `basso`/`medio`/`alto` tag (always paired with the word, never colour-only).
2. **Pannello "Costi continuativi"** — three rows (hosting, manutenzione, lingue aggiuntive nel tempo), same tag format, shown as a visually distinct second panel directly below the launch panel.
3. The nine-item preventivo checklist, with selection-relevant items visually flagged.
4. Optionally, if the selection cleanly matches a real Weissmann tier: that tier's name and exact price (e.g. "CHF 880" or "CHF 4'990"), clearly labelled "un esempio reale, non una raccomandazione automatica per il vostro progetto".
5. A "Copiare per la vostra richiesta" block: a plain-text summary of the selected scope (archetype, languages, breadth, content responsibility, booking/shop need, maintenance preference) formatted for pasting into an email to a vendor.

## 7. Error states

- **Tipo di attività** or **Lingue del sito** not yet set → both result panels stay empty with a plain prompt: "Scegliete almeno il tipo di attività e le lingue del sito per vedere una valutazione." No partial or guessed result is shown.
- Ampiezza, contenuti, prenotazioni/shop or manutenzione left unset (e.g. reader picked "Altro" and only set the two required inputs) → those specific blocks simply show their baseline (`basso`) impact rather than blocking the whole tool.
- Selection matches no real Weissmann tier scope closely enough → the reference-tier block is omitted entirely, never force-fitted to the nearest tier.
- JavaScript disabled → the static HTML still lists all seven blocks (in their two groups), all nine checklist items and the three reference tiers in a plain, unfiltered, readable order (progressive enhancement, not a blank page).

## 8. Privacy considerations

- Fully client-side; nothing is transmitted anywhere. No field asks for a company name, email, budget or any personal or business-identifying detail — every input is a generic business-type or scope parameter.
- Selections may be held in-memory for the session only; if the build persists them via `localStorage` for convenience across visits, that must be disclosed in one visible line with a working "Azzera selezione" control.
- No analytics events tied to individual selections are required for the tool to function; if added, they must be aggregate/anonymous only and disclosed.

## 9. Accessibility requirements

- All selects/toggles fully keyboard-operable with visible focus states, grouped with proper `<fieldset>`/`<legend>` semantics per input group.
- Impact tags (`basso`/`medio`/`alto`) are always shown as text, never colour-only.
- The two result panels and the checklist update inside an `aria-live="polite"` region so screen-reader users are told a result changed without losing their place.
- Minimum 4.5:1 text contrast; respects `prefers-reduced-motion` (values update instantly, no animated counters or transitions).
- The seven-block breakdown and nine-item checklist are marked up as real lists, not bare `<div>` grids.

## 10. Mobile behaviour

- Inputs render as a single-column stacked form; the two result panels (launch, then ongoing) appear below the form in that order, not in separate tabs, so the reader can scroll to see updates without losing the form.
- A small sticky summary bar (e.g. "Tipo di attività: Ristorante · Lingue: 2") stays visible while scrolling through the panels, so the reader keeps context on a long page.
- The "Copiare per la vostra richiesta" block has a full-width, thumb-reachable "Copia testo" button.
- All selects/toggles sized for touch (≥44×44px targets).

## 11. Exact CTA

Primary CTA button, shown persistently below the result panels (available even before all inputs are set, but most useful once a result exists):

> **"Richiedete una valutazione gratuita del vostro progetto di sito web"** → links to `/it/kontakt/`

Secondary, lower-emphasis link near the top of the tool:

> "Leggi l'articolo completo con le sette voci di costo e la checklist del preventivo" → links to the article's own URL (`/it/ai-academy/marketing-seo-geo/costo-sito-web-ticino-svizzera/`).

No countdown, no fake urgency, no "approfittatene ora" language. The CTA text and destination never change based on which selection is active, and it is never phrased as the only or obviously correct next step.

## 12. Disclaimer

Include a short, visible note near the top of the tool and again next to the reference-tier block:

> "Questo strumento non calcola un prezzo. Mostra quali delle sette voci di costo il vostro progetto attiva — separando quelle di lancio da quelle continuative — e crea una checklist personale per i colloqui con i fornitori. L'unica cifra reale mostrata proviene dalla struttura di prezzo pubblica di Weissmann e appare solo se la vostra selezione corrisponde all'ambito lì descritto: è un esempio, non un'offerta per il vostro progetto."

This prevents the tool from being mistaken for an actual quote generator, consistent with the article's central warning against treating a scope-less number as meaningful.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used sparingly, only for the "alto" impact tag, always paired with the word "alto" — never a large fill and never the only signal. "medio" uses a muted ink tone with the word itself; "basso" uses the quietest ink-mute tone with the word itself. No green or amber traffic-light system — the site's palette has no green.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- The two seven-block panels rendered as simple bordered lists (thin 1px lines, `--line: #e5e5e2`), not bar charts or gauges — this keeps the "no fake precision" rule visible in the visual design itself. The two panels are visually distinct (e.g. a subtle divider or heading treatment) so "lancio" and "continuativo" never blur into one list.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the active result panels.
- Overall feel: a structured worksheet built around the reader's own business type, not a dashboard, quiz or quote generator — calm, editorial, no gamified scoring visuals.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Calcolatore svizzero del costo del
sito" (Swiss Website Cost Calculator). It is an Italian-language (it-CH)
interactive worksheet for Ticino SMEs about to request website quotes. It is
explicitly NOT a price calculator that outputs a CHF figure of its own
invention — it maps the reader's own business type and project scope onto
seven cost components, split into launch costs and ongoing costs, plus a
personalised preventivo checklist.

CONTEXT
The companion article's thesis: "quanto costa un sito web" has no single
honest answer in Ticino, because the real need behind that question varies
by business type (an artisan, a restaurant, a professional practice) and,
more than page count, by how many languages the site must genuinely serve
(Italian only vs. also German, French or English for cross-border and
national reach). Every website price is assembled from seven recurring cost
components — design, contenuti e copywriting, sviluppo, base tecnica SEO e
GEO, hosting, manutenzione, lingue aggiuntive — some paid once at launch,
others recurring indefinitely. This tool lets the reader start from their
own business type, adjust the scope, and see which components their project
activates, split clearly into what is paid once and what keeps running —
never a fabricated total price.

INPUTS
1. Tipo di attività — single-select, 4 options (fixed IDs):
   "Artigiano (elettricista, idraulico, falegname…)" (artigiano)
   "Ristorante o locale" (ristorante)
   "Studio professionale (avvocato, fiduciario, consulente…)" (studio)
   "Altro / preferisco configurare da zero" (altro)
   Selecting artigiano/ristorante/studio pre-fills inputs 2–6 below with the
   PRESET DEFAULTS table below. The reader can change any pre-filled value
   afterwards; changing a value does NOT clear the archetype selection or
   its label. Selecting "altro" clears inputs 2–6 to unset.

2. Lingue del sito — single-select, 3 options:
   "Solo italiano" (solo_it)
   "Italiano e tedesco" (it_de)
   "Italiano, tedesco e una terza lingua (francese o inglese)" (it_de_altro)

3. Ampiezza del sito — single-select, 3 options:
   "Poche pagine mirate (1–5)" (poche_pagine)
   "Sito aziendale (6–12 pagine)" (sito_aziendale)
   "Architettura ampia (12+ pagine)" (ampio)

4. Contenuti — toggle:
   "Fornisco io i testi" (copywriting: false)
   "Serve copywriting professionale" (copywriting: true)

5. Prenotazioni o vendita online — single-select, 3 options:
   "Nessuna" (nessuna)
   "Modulo di prenotazione o richiesta" (prenotazione)
   "Shop completo con pagamento e spedizione" (shop_completo)

6. Manutenzione continuativa — single-select, 2 options:
   "Me ne occupo io" (self)
   "Preferisco affidarla a un fornitore" (fornitore)

PRESET DEFAULTS (applied only when the reader picks that archetype; the
reader may override any field afterwards without losing the archetype label)
  artigiano:  lingue=solo_it, ampiezza=poche_pagine, copywriting=false,
              prenotazioni=nessuna, manutenzione=self
  ristorante: lingue=it_de, ampiezza=poche_pagine, copywriting=true,
              prenotazioni=prenotazione, manutenzione=fornitore
  studio:     lingue=it_de_altro, ampiezza=sito_aziendale, copywriting=true,
              prenotazioni=nessuna, manutenzione=fornitore
  altro:      no defaults — all of inputs 2–6 remain unset until the reader
              sets them manually.

The result panels stay empty with the prompt "Scegliete almeno il tipo di
attività e le lingue del sito per vedere una valutazione." until BOTH Tipo
di attività and Lingue del sito have a value. Once both are set, show the
full result panels; any of inputs 3–6 left unset simply contributes its
baseline ("basso") impact rather than blocking anything.

SEVEN COST COMPONENTS — TWO FIXED GROUPS (fixed IDs, fixed Italian labels)
  Launch group ("Costi di lancio"):
    design            → "Design"
    contenuti         → "Contenuti e copywriting"
    sviluppo          → "Sviluppo"
    base_seo_geo      → "Base tecnica SEO e GEO"
  Ongoing group ("Costi continuativi"):
    hosting             → "Hosting"
    manutenzione        → "Manutenzione"
    lingue_aggiuntive   → "Lingue aggiuntive nel tempo"
ALWAYS render these as two visually separate panels/lists, launch group
first, ongoing group second. NEVER merge them into one combined score or
a single complexity label — the separation itself is the point of this
tool.

IMPACT LOGIC (implement exactly as these fixed rules — no numeric formula,
no weighted score, no invented price; each block's impact is the HIGHEST
tag triggered by any current selection, from basso < medio < alto):
  design: always "medio" baseline. ampiezza == ampio → alto.
  contenuti: copywriting == true → alto; copywriting == false → basso.
  sviluppo: ampiezza == poche_pagine → basso; ampiezza == sito_aziendale →
    medio; ampiezza == ampio → alto. prenotazioni == prenotazione → medio
    (only if not already higher). prenotazioni == shop_completo → alto
    (overrides).
  base_seo_geo: lingue == solo_it and ampiezza == poche_pagine → basso;
    lingue == solo_it and ampiezza in [sito_aziendale, ampio] → medio;
    lingue == it_de → medio; lingue == it_de_altro → alto.
  hosting: always "basso" baseline. prenotazioni == shop_completo → medio.
  manutenzione: manutenzione == self → basso; manutenzione == fornitore →
    medio. prenotazioni == shop_completo → alto (overrides).
  lingue_aggiuntive: lingue == solo_it → basso; lingue == it_de → medio;
    lingue == it_de_altro → alto.

CHECKLIST — NINE FIXED ITEMS, always all shown in this order; mark an item
"Particolarmente rilevante per voi" when its condition is met — never hide
any item:
1. "Il numero di pagine è elencato con i titoli reali, o resta un generico
   «fino a X pagine»?" — relevant when ampiezza != poche_pagine.
2. "Chi scrive i testi — voi, il fornitore, o il preventivo non lo
   specifica affatto?" — relevant when copywriting == true.
3. "Quante lingue sono esplicitamente contate, e quali sono?" — relevant
   when lingue != solo_it.
4. "Quanti cicli di correzione sono inclusi, e quanto costa un ciclo
   aggiuntivo?" — always shown, never specially flagged.
5. "Il codice e i file sorgente restano vostri dopo la consegna?" —
   relevant when ampiezza in [sito_aziendale, ampio].
6. "«SEO inclusa» è descritta concretamente (sitemap, dati strutturati,
   velocità) o resta una parola di marketing?" — relevant when
   base_seo_geo resolves to medio or alto.
7. "Hosting e manutenzione dopo il lancio: quanto costano, e a nome di chi
   restano dominio e hosting?" — relevant when manutenzione == fornitore.
8. "Il prezzo indicato è al netto o al lordo dell'IVA svizzera (8,1%)?" —
   always shown, never specially flagged.
9. "Cosa succede se in futuro si aggiunge una lingua o una funzione?" —
   relevant when lingue == solo_it or prenotazioni == nessuna.

REFERENCE TIER LOOKUP (show at most one, only if a clean match; show none
if ambiguous — never force a fit):
  Starter Website — matches when ampiezza == poche_pagine AND lingue ==
    solo_it. Show: "Starter Website — CHF 880 (regolare CHF 2'490), fino a
    5 pagine principali, 1 lingua, 2 cicli di correzione, base tecnica SEO
    e GEO, GA4 e Search Console." Label clearly: "Un esempio reale di un
    fornitore svizzero (Weissmann) per un ambito simile alla vostra
    selezione — non una raccomandazione automatica."
  Business Website — matches when ampiezza in [sito_aziendale, ampio] AND
    prenotazioni != shop_completo. Show: "Business Website — CHF 4'990,
    circa 10–20 pagine, predisposto per il multilingue, architettura
    orientata alla conversione, 3 cicli di correzione." Same neutral
    labelling as above.
  Sito web complesso / su misura — matches when prenotazioni ==
    shop_completo. Show: "Sito web complesso / su misura — da CHF 9'900,
    grande architettura multilingue, e-commerce o integrazioni." Same
    neutral labelling as above.
If a selection could loosely match more than one tier, or matches none
cleanly, show NO reference tier block at all rather than guessing.

OUTPUT LAYOUT
1. Panel "Costi di lancio": four rows (fixed Italian labels above), each
   with a one-line plain-language description and a "basso"/"medio"/"alto"
   tag as text, never colour-only.
2. Panel "Costi continuativi": three rows, same format, shown as a
   visually distinct second panel directly below the first.
3. The nine-item checklist, relevant items visually marked (e.g. a small
   "Particolarmente rilevante per voi" tag), never hidden or reordered.
4. Reference tier block (0 or 1 shown, per the lookup rules above).
5. "Copiare per la vostra richiesta" — a plain-text box summarising the
   current selection in sentence form (business type, languages, breadth,
   content responsibility, booking/shop need, maintenance preference),
   with a "Copia testo" button using the Clipboard API (manual-select
   fallback if it fails — no error thrown to the user).

DISCLAIMER (always visible near the top of the tool, and repeated next to
the reference-tier block)
"Questo strumento non calcola un prezzo. Mostra quali delle sette voci di
costo il vostro progetto attiva — separando quelle di lancio da quelle
continuative — e crea una checklist personale per i colloqui con i
fornitori. L'unica cifra reale mostrata proviene dalla struttura di prezzo
pubblica di Weissmann e appare solo se la vostra selezione corrisponde
all'ambito lì descritto: è un esempio, non un'offerta per il vostro
progetto."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No field asks for a name, company, email or budget —
every input is a generic business-type or scope parameter. If selections
are kept in localStorage for convenience, disclose it in one visible line
with a working "Azzera selezione" button.

CTA
Primary button, always visible below the result panels:
  Label: "Richiedete una valutazione gratuita del vostro progetto di sito
  web"
  Link: https://www.weissmann.ai/it/kontakt/
Secondary, lower-emphasis link near the top: "Leggi l'articolo completo
con le sette voci di costo e la checklist del preventivo" (link to the
article page). Do not use countdowns, fake urgency, or "approfittatene
ora" phrasing. Do not change the CTA wording based on the current
selection.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a worksheet,
not a dashboard or gamified calculator):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "alto" impact tag, always
    paired with the word "alto", never a large fill or the only signal.
    "medio" uses a muted ink tone with the word itself; "basso" uses the
    quietest ink-mute tone with the word itself. Do NOT use green or a
    traffic-light system — the site's palette has no green.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the active result panels:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  The two seven-block panels are simple bordered lists, NOT a bar chart,
  gauge, or progress ring — a chart-like visual would imply a measured
  quantity that does not exist here. Keep "lancio" and "continuativo"
  visually distinct (e.g. a divider, or a subtly different panel heading
  treatment) so they never blur into a single list.
  Layout: single-column stacked form, result panels below it in order
  (lancio, then continuativo); a small sticky summary bar stays visible
  while scrolling the panels on narrow widths.

ACCESSIBILITY
Full keyboard operability for all selects/toggles with visible focus
states; proper fieldset/legend grouping; aria-live="polite" region for
result updates; 4.5:1 minimum contrast; respect prefers-reduced-motion
(values update instantly, no animated counters); both panels and the
checklist marked up as real lists, not bare divs.

LANGUAGE
All UI copy in Italian (natural, elegant Italian for Ticino — not a
translation of German or English phrasing). Do not add German, English or
French translations — this tool exists only in Italian.

Do not compute, display or imply any CHF total that is not one of the
three explicitly named, exact Weissmann reference prices (CHF 880,
CHF 4'990, CHF 9'900 / da CHF 9'900) shown only under the matching
conditions above.
```
