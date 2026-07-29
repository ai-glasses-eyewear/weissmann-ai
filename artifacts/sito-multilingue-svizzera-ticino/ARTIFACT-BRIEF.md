# ARTIFACT BRIEF — Planner dell'architettura multilingue

**Companion article:** `sito-multilingue-svizzera-ticino` (IT-WEB-07) — "Sito multilingue in Svizzera: come strutturare italiano, tedesco, francese e inglese senza duplicati"
**Artifact title:** Planner dell'architettura multilingue
**Language:** Italian (it) only — matches the article; no DE/EN/FR version is commissioned.

**Distinct mechanic vs. the EN sibling artifact** (`multilingual-website-switzerland-seo` / "Swiss Multilingual Site Architecture Planner"): the English tool lets the reader pick any set of target locales plus a default, and instantly returns one flat URL/hreflang/checklist set for all of them at once. This tool does not. It starts from the article's own thesis — a Ticino business selling beyond the canton has three additional audiences (German-speaking Switzerland, French-speaking Switzerland, international English), each with its own real weight, and a limited, honest capacity to keep a language properly maintained — and returns a **capacity-gated, phased rollout**: which locales to launch now (Fase 1), which are real but must wait (Fase 2), and which have no real audience today (Escluse) — never recommending more live locales than the stated maintenance capacity supports. The translation-quality checklist it generates is also locale-specific in its actual wording (different concerns for German, French and English), not one static universal list repeated per language.

---

## 1. User problem

A Ticino business owner reads the article's three-audience framing and the "how many languages, and at what pace" section, but has no way to turn "we have some customers in Zurich and some tourists" into an actual, sequenced decision without re-reading the whole article each time their situation changes. Generic language-selector tools treat every additional language as equally ready to launch today; in reality a business with real German-speaking demand but no one to keep a German page current is better served by waiting than by launching a page it will abandon within a year — the exact failure mode the article's "cosa può andare storto" section names. Without a structured tool, readers either add every language they can name (matching nothing to real maintenance capacity) or add none (leaving a real, monetizable audience unserved).

## 2. Intended audience

Owners or managers of Ticino SMEs — wineries, artisans, hospitality businesses, professional practices, exporters — who sell or expect to sell beyond the canton (German-speaking Switzerland, Romandy, or international clients) and are deciding which language to add next, and when, before briefing a developer or translator.

## 3. Why an interactive artifact beats a static PDF

A static checklist cannot weigh three independent audiences against one stated maintenance capacity and return a different phased answer for each combination; it can only list the same four locales for every reader. The interactive version:
- Treats **German-speaking Switzerland, French-speaking Switzerland and international English demand as three independently weighted inputs** (nessuna / bassa / media / alta), reflecting the article's "tre pubblici" thesis — a business can have strong German demand and zero French demand, and the tool must reflect that asymmetry rather than bundling all non-Italian locales together.
- Introduces a **maintenance-capacity input** that caps how many locales can launch now, and actively **defers** high-weight locales to a labelled "Fase 2 (non ora)" when capacity does not support them yet — a structural warning against the article's central failure mode (a launched-then-abandoned translation), not just a generic recommendation.
- Generates a **locale-specific translation-quality checklist** — the German checklist emphasises delivery terms and certifications, the French checklist emphasises Romandy-specific framing, the English checklist emphasises international shipping and payment — rather than one universal checklist shown three times.
- Never invents a ranking outcome, a timeline, or a market-size figure. It only ever restates the reader's own inputs back as a structured, sequenced plan.

## 4. Inputs

1. **Peso — Svizzera tedesca** — single-select: "Nessuna", "Bassa", "Media", "Alta" ("Quanto è importante oggi la clientela in Svizzera tedesca?").
2. **Peso — Svizzera romanda** — single-select, same four options ("Quanto è importante oggi la clientela in Svizzera francese?").
3. **Peso — clientela internazionale anglofona** — single-select, same four options ("Quanto è importante oggi la clientela internazionale che si aspetta l'inglese?").
4. **Capacità di manutenzione** — single-select, required: "Bassa (poche ore al mese, nessuno dedicato)", "Media (qualche ora regolare, senza una persona dedicata)", "Alta (una persona o un fornitore dedicato alla manutenzione multilingue)".
5. **Domanda stagionale** — toggle: "La domanda in altre lingue si concentra in un periodo specifico dell'anno (es. alta stagione turistica)?" Sì / No.

Inputs 1–3 default to unset (must be explicitly chosen, even if the answer is "Nessuna" — the tool never assumes a weight). The result stays empty until all of inputs 1, 2, 3 and 4 are set.

## 5. Calculation / decision logic

- **Weight scale:** Nessuna = 0, Bassa = 1, Media = 2, Alta = 3. Italian is always the default, unprefixed locale and is never itself weighted — it is the given baseline the article assumes throughout.
- **Capacity slots:** Bassa capacità → 0 slots (no additional locale launches now, regardless of weight). Media → 1 slot. Alta → 2 slots.
- **Candidate list:** every locale (de, fr, en) with weight > 0. Sorted descending by weight; ties broken by a fixed, disclosed editorial default order — de before fr before en — reasoning: for most Ticino businesses selling beyond the canton, German-speaking Switzerland is the larger adjacent market before Romandy or an international English audience. This is stated in the tool's own output as an editorial default, not a measured statistic, and a reader who weights fr or en higher overrides it automatically since sorting is by weight first.
- **Fase 1 (da lanciare ora):** the top N candidates, where N = capacity slots.
- **Fase 2 (non ora):** any remaining candidate with weight > 0 not selected into Fase 1.
- **Escluse:** any locale with weight = Nessuna.
- **Capacity-mismatch warning:** if capacità = Bassa and at least one candidate has weight = Alta, show an explicit warning block (see §6.5) rather than silently placing that locale in Fase 2.
- **Seasonality note:** if the seasonality toggle is Sì, append one line to every Fase 1 locale's card recommending the content review happen before the high season starts, not during it.
- No numeric traffic, ranking or revenue estimate is ever computed or implied — the logic only sequences the reader's own stated weights against their own stated capacity.

## 6. Outputs

1. **Fase 1 — da lanciare ora:** one card per locale, containing: the URL shape (`vostro-dominio.ch/{locale}/[slug-localizzato]/`, with a reminder that the slug must be written for that language, not the Italian slug with a prefix stapled on), the hreflang set required among the currently-live locale set only (self-referencing canonical reminder + reciprocal hreflang across it + every Fase 1 locale, never listing a Fase 2 or Escluse locale), the x-default rule (→ en if English is itself in Fase 1, otherwise → it), and that locale's own 3-item translation-quality checklist (see §5 wording, distinct per locale).
2. **Fase 2 — non ora:** one line per deferred locale: "Pubblico reale, capacità insufficiente oggi: rimandata, non lanciata a metà", plus the explicit reminder: "Non create hreflang né un link del selettore di lingua verso questa versione finché non esiste davvero."
3. **Escluse:** one line per zero-weight locale: "Nessun pubblico reale indicato oggi — aggiungerla ora sarebbe manutenzione senza ritorno."
4. **Avviso di capacità** (only when triggered, see §5): a distinct, visually separated warning card, never silently folded into Fase 2.
5. **"Copiare per il vostro fornitore"** — a plain-text summary (Fase 1 / Fase 2 / Escluse / capacità dichiarata) the reader can paste into a brief for a developer or translator.

## 7. Error states

- Any of inputs 1–4 unset → the result stays empty with a plain prompt: "Indicate il peso delle tre clientele aggiuntive e la vostra capacità di manutenzione per vedere un piano." No partial or guessed phase is shown.
- All three weights (de, fr, en) = Nessuna → show a distinct, non-salesy result: "Con il solo italiano non serve oggi un piano multilingue. Rivalutate questa scheda se cambia la vostra clientela — non è necessario aggiungere lingue perché esistono in Svizzera." (Matches the article's own honest position that fewer, well-maintained languages beat four badly maintained ones.)
- Capacità = Bassa and no candidate has weight > 0 → simply show the "solo italiano" message above; the capacity-mismatch warning only fires when a real Alta-weight candidate exists.
- JavaScript disabled → the static HTML still lists the three weight selects, the capacity select, the seasonality toggle and a plain explanation of the phasing rule, rather than a blank page (progressive enhancement).

## 8. Privacy considerations

- Fully client-side; nothing is transmitted anywhere. No field asks for a company name, email, revenue or customer list — every input is a generic weight or capacity selection.
- If selections are persisted via `localStorage` for convenience across visits, this must be disclosed in one visible line with a working "Azzera selezione" control.
- No analytics tied to individual selections are required for the tool to function; if added, aggregate/anonymous only, disclosed.

## 9. Accessibility requirements

- All selects/toggles fully keyboard-operable with visible focus states, grouped with proper `<fieldset>`/`<legend>` semantics per input.
- Fase 1 / Fase 2 / Escluse are marked up as three distinct, labelled lists (not colour-only groupings) — a card's phase is always stated in text, never conveyed by colour alone.
- The result region updates inside an `aria-live="polite"` area so screen-reader users are told when the plan changes.
- Minimum 4.5:1 text contrast; respects `prefers-reduced-motion` (no animated transitions between phases).

## 10. Mobile behaviour

- Inputs render as a single-column stacked form; Fase 1, Fase 2, Escluse and (when triggered) the capacity warning appear below the form in that fixed order.
- A small sticky summary bar (e.g. "Capacità: Media · Fase 1: Tedesco") stays visible while scrolling through the result cards.
- The "Copiare per il vostro fornitore" block has a full-width, thumb-reachable "Copia testo" button.
- All selects/toggles sized for touch (≥44×44px targets).

## 11. Exact CTA

Primary CTA, shown persistently below the results:

> **"Descriveteci le lingue dei vostri clienti: pianifichiamo insieme la struttura del sito"** → links to `/it/kontakt/`

Secondary, lower-emphasis link near the top of the tool:

> "Leggi l'articolo completo su URL, hreflang e traduzione autentica" → links to the article's own URL (`/it/ai-academy/marketing-seo-geo/sito-multilingue-svizzera-ticino/`).

No countdown, no fake urgency. CTA text and destination never change based on the computed phase.

## 12. Disclaimer

Visible near the top of the tool and repeated next to the Fase 1 results:

> "Questo planner non analizza il vostro sito reale e non garantisce un posizionamento specifico in nessuna lingua. Genera un punto di partenza strutturale — quali lingue lanciare ora, quali rimandare, e quale hreflang serve tra le lingue effettivamente live — soltanto a partire dai pesi e dalla capacità che indicate. Tutta la logica gira nel browser; nessun dato viene trasmesso o salvato altrove."

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent `--accent: #c51a2e` (Swiss red) reserved only for the capacity-mismatch warning card's label text — never a large fill, always paired with words, never colour-only. Fase 1 / Fase 2 / Escluse are distinguished by heading treatment and position, not by a traffic-light colour system (the site's palette has no green).
- Primary CTA styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- The three phase groups render as simple bordered card lists (1px lines, `--line: #e5e5e2`), not gauges, meters or progress bars — no visual should imply a measured quantity that does not exist.
- Typography `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the active result cards.
- Overall feel: a sequencing worksheet, not a quiz, dashboard or scorecard — calm and editorial, consistent with the companion cost-calculator artifact already live on the site.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Planner dell'architettura
multilingue" (Multilingual Architecture Planner). It is an Italian-language
(it-CH) interactive planner for Ticino businesses deciding which additional
language to add to their website, and when. It is explicitly NOT a generic
"pick your languages, get hreflang tags for all of them" tool — it gates
its recommendation by a stated maintenance capacity and returns a PHASED
rollout (Fase 1 / Fase 2 / Escluse), never recommending more live locales
than the reader's own stated capacity supports.

CONTEXT
The companion article's thesis: a Ticino business selling beyond the
canton has three distinct additional audiences — German-speaking
Switzerland, French-speaking Switzerland (Romandy), and international
English-speaking clients — each with a different real weight, and a real,
limited capacity to keep an additional language properly maintained.
Launching a language without the capacity to maintain it is worse than not
launching it (an abandoned, outdated translated page is a worse trust
signal than no page at all). Italian is always the default, unprefixed
locale for these businesses and is never itself weighted in this tool.

INPUTS (fixed IDs, fixed Italian labels)
1. Peso Svizzera tedesca — single-select, required:
   "Nessuna" (0) / "Bassa" (1) / "Media" (2) / "Alta" (3)
   Label: "Quanto è importante oggi la clientela in Svizzera tedesca?"
2. Peso Svizzera romanda — single-select, required, same 4 options/values.
   Label: "Quanto è importante oggi la clientela in Svizzera francese?"
3. Peso clientela internazionale anglofona — single-select, required, same
   4 options/values.
   Label: "Quanto è importante oggi la clientela internazionale che si
   aspetta l'inglese?"
4. Capacità di manutenzione — single-select, required:
   "Bassa (poche ore al mese, nessuno dedicato)" (slots: 0)
   "Media (qualche ora regolare, senza una persona dedicata)" (slots: 1)
   "Alta (una persona o un fornitore dedicato)" (slots: 2)
5. Domanda stagionale — toggle, optional, default "No":
   "La domanda in altre lingue si concentra in un periodo specifico
   dell'anno (es. alta stagione turistica)?"

The result stays empty, with the prompt "Indicate il peso delle tre
clientele aggiuntive e la vostra capacità di manutenzione per vedere un
piano.", until inputs 1, 2, 3 AND 4 all have a value.

PHASE ASSIGNMENT LOGIC (implement exactly)
1. Build the candidate list: any of {de, fr, en} with weight > 0.
2. If the candidate list is empty (all three weights = "Nessuna"), skip
   straight to the "solo italiano" result (see OUTPUT rule 0) and do not
   compute phases at all.
3. Sort candidates descending by weight value. Break ties in this fixed
   order: de, then fr, then en (state in the UI, next to the sort, that
   this is an editorial default for typical Ticino cross-border demand,
   not a measured statistic — the reader's own weights are what actually
   drive the result).
4. slots = 0 if capacità == "Bassa", 1 if "Media", 2 if "Alta".
5. Fase 1 = the first `slots` candidates from the sorted list (may be
   empty if slots = 0).
6. Fase 2 = every remaining candidate not placed in Fase 1.
7. Escluse = every locale (of de, fr, en) with weight = "Nessuna".
8. Capacity-mismatch warning: if capacità == "Bassa" AND at least one
   candidate has weight == "Alta" (i.e. it would have qualified for Fase 1
   under higher capacity), show a separate warning card (see OUTPUT rule
   4) in addition to the normal Fase 1/2/Escluse output (Fase 1 will be
   empty in this case, since slots = 0).

OUTPUT RULES
0. If the candidate list was empty (step 2 above): show ONLY this result,
   no phase cards: "Con il solo italiano non serve oggi un piano
   multilingue. Rivalutate questa scheda se cambia la vostra clientela —
   non è necessario aggiungere lingue perché esistono in Svizzera."
1. Fase 1 card per locale (heading "Fase 1 — da lanciare ora"): for each
   locale in Fase 1, render:
   a. URL shape: "vostro-dominio.ch/{locale}/[slug-localizzato]/" with the
      note: "lo slug va scritto per come si cerca in questa lingua, non
      tradotto parola per parola dall'italiano."
   b. hreflang reminder: "Ogni pagina live (italiano + {elenco delle
      lingue in Fase 1}) deve elencare se stessa e tutte le altre lingue
      live come alternate reciproche — mai una lingua di Fase 2 o
      Esclusa." Plus: canonical reminder "ogni versione punta a se
      stessa, mai all'italiano."
   c. x-default rule: "en" if English is itself in Fase 1, otherwise "it".
   d. If seasonality toggle = Sì: append "Pianificate la revisione dei
      contenuti in questa lingua prima dell'inizio della stagione alta,
      non durante."
   e. That locale's 3-item translation-quality checklist, using EXACTLY
      this wording (do not paraphrase, do not merge across locales):

      de (Svizzera tedesca):
      - "Il testo tedesco spiega tempi di consegna, garanzie o
        certificazioni, non solo la storia del prodotto o dell'azienda?"
      - "Il registro è più formale e diretto rispetto al testo italiano,
        non una copia letterale del suo tono?"
      - "Prezzi, IVA e condizioni sono scritti in modo esplicito, senza
        dare per scontato che il lettore telefoni per chiedere?"

      fr (Svizzera romanda):
      - "Il testo francese spiega le condizioni pratiche (consegna,
        pagamento, garanzie) con la stessa chiarezza della versione
        tedesca, non come una traduzione abbreviata dell'italiano?"
      - "I riferimenti locali (luoghi, eventi, stagionalità) sono pensati
        per un lettore romando, non per un lettore ticinese che legge in
        francese?"
      - "Lo slug e i titoli sono scritti per come si cerca in francese,
        non ricalcati sulla struttura italiana?"

      en (clientela internazionale):
      - "Il testo inglese mette in evidenza spedizione internazionale,
        valuta e tempi di consegna fuori Svizzera, non solo la
        narrazione del prodotto?"
      - "Il tono è sintetico e diretto, coerente con un lettore che
        confronta più fornitori in poco tempo, non una traduzione parola
        per parola del testo italiano?"
      - "Sono indicati chiaramente i metodi di pagamento accettati
        dall'estero?"

2. Fase 2 line per locale (heading "Fase 2 — non ora"): "Pubblico reale,
   capacità insufficiente oggi: rimandata, non lanciata a metà." plus:
   "Non create hreflang né un link del selettore di lingua verso questa
   versione finché non esiste davvero."
3. Escluse line per locale (heading "Escluse"): "Nessun pubblico reale
   indicato oggi — aggiungerla ora sarebbe manutenzione senza ritorno."
4. Capacity-mismatch warning card (only when triggered per step 8 above),
   visually distinct (bordered, accent-coloured label text only): "Avete
   indicato un pubblico ad alta priorità ma una capacità di manutenzione
   bassa. Lanciare ora rischia di creare una lingua abbandonata. Aumentate
   la capacità prima di lanciare, oppure rivalutate il peso di questa
   lingua."
5. "Copiare per il vostro fornitore": a plain-text box summarising Fase 1
   locales, Fase 2 locales, Escluse locales and the declared capacity, in
   sentence form, with a "Copia testo" button (Clipboard API, manual-
   select fallback if it fails — never throw a visible error).

DISCLAIMER (always visible near the top, repeated next to Fase 1)
"Questo planner non analizza il vostro sito reale e non garantisce un
posizionamento specifico in nessuna lingua. Genera un punto di partenza
strutturale — quali lingue lanciare ora, quali rimandare, e quale hreflang
serve tra le lingue effettivamente live — soltanto a partire dai pesi e
dalla capacità che indicate. Tutta la logica gira nel browser; nessun dato
viene trasmesso o salvato altrove."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No field asks for a name, company, email or revenue —
every input is a generic weight or capacity selection. If selections are
kept in localStorage for convenience, disclose it in one visible line with
a working "Azzera selezione" button.

CTA
Primary button, always visible below the results:
  Label: "Descriveteci le lingue dei vostri clienti: pianifichiamo insieme
  la struttura del sito"
  Link: https://www.weissmann.ai/it/kontakt/
Secondary, lower-emphasis link near the top: "Leggi l'articolo completo su
URL, hreflang e traduzione autentica" (link to the article page). No
countdowns, no fake urgency. CTA text and destination never change based
on the computed phase.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a sequencing
worksheet, not a dashboard or gamified quiz):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the capacity-mismatch
    warning card's label text, always paired with the words themselves,
    never a large fill or the only signal. Do NOT use green or a
    traffic-light system anywhere (the site's palette has no green) —
    distinguish Fase 1 / Fase 2 / Escluse by heading and position, not
    by colour.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on active result cards:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Layout: single-column stacked form; Fase 1, Fase 2, Escluse and (when
  triggered) the warning card appear below it in that fixed order; a
  small sticky summary bar stays visible while scrolling on narrow
  widths.

ACCESSIBILITY
Full keyboard operability for all selects/toggles with visible focus
states; proper fieldset/legend grouping; aria-live="polite" region for
result updates; 4.5:1 minimum contrast; respect prefers-reduced-motion
(no animated transitions between phases); Fase 1/2/Escluse marked up as
real labelled lists, not bare divs, and never distinguished by colour
alone.

LANGUAGE
All UI copy in Italian (natural, elegant Italian for Ticino — not a
translation of German or English phrasing). Do not add German, English or
French translations — this tool exists only in Italian, matching its
companion article.

Do not compute, display or imply any market-size, ranking or revenue
figure. Every phase, checklist item and warning must derive only from the
reader's own five inputs.
```
