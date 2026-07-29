# ARTIFACT BRIEF — Calcolatore di complessità e-commerce

**Companion article:** `costo-ecommerce-ticino` (IT-WEB-06) — "Quanto costa un e-commerce in Ticino — e perché CHF 880 non può coprire tutto"
**Artifact title:** Calcolatore di complessità e-commerce
**Language:** Italian (it) only — matches the article; no DE/EN/FR version is commissioned.

---

## 1. User problem

A Ticino business owner who wants to sell online (an artisan producer, a small multi-brand retailer, a food business) has just read the article's six complexity drivers — catalogo, pagamenti, spedizione e tasse, resi, sincronizzazione dell'inventario, lavoro operativo continuativo — but has no way to see where their own project actually lands on each one, or whether their available time genuinely matches the ongoing workload the project will create. A generic "how much does e-commerce cost" calculator would either invent a fake CHF total (which the article explicitly refuses to do, since no fixed e-commerce price exists in Weissmann's own pricing data) or produce a single vague "complexity score" that hides the real decision-relevant details. Readers need a tool that (a) confirms, once and for all, that Starter and Business do not cover this project, (b) shows exactly which of the six drivers make their project bigger or smaller, and (c) flags — honestly — when the operational workload their own choices create exceeds the time they said they can actually give it, or when their project might not need a full e-commerce build yet at all.

## 2. Intended audience

Owners or managers of small Ticino businesses considering an online shop — an artisan food producer, a multi-brand retailer, a wine or craft producer — who are trying to understand, before any conversation with a vendor, whether their specific project is a small or a large "Sito web complesso / su misura" scope, and whether they are personally ready for the ongoing work it creates.

## 3. Why an interactive artifact is better than a static PDF

A static checklist forces every reader through the same six questions regardless of their actual catalogue, payment needs or shipping ambitions, and cannot cross-check anything. The interactive version:
- Resolves each of the six complexity drivers from the article to its own `basso`/`medio`/`alto` tag, computed from the reader's own inputs — never a generic list.
- Is the only mechanism in this tool that performs a genuine **cross-check**: it compares the *expected* ongoing operational workload (derived from catalogue update frequency, sales channels and returns policy) against the *stated* available operational capacity, and produces an explicit warning when the two do not match — a decision-relevant signal a static document cannot compute.
- States, permanently and independently of any input, that Starter (CHF 880) and Business (CHF 4'990) do not cover this project — removing any ambiguity the promotional pricing language could otherwise create — while never inventing a single fixed e-commerce price.
- Classifies the overall scope into one of two honest, qualitative sizes — "Ambito complesso contenuto" or "Ambito complesso esteso" — based on how many of the six drivers land on `alto`, mirroring the article's own two worked examples (Nadia's chocolate shop vs. a multi-brand sports retailer) without fabricating a number between them.
- Explicitly flags, for a narrow but real combination of inputs, that the reader's project may not need a full e-commerce build yet — the honest "wait" conclusion the article itself reaches, which a tool designed only to sell more scope would never surface.
- Generates a plain-text discussion brief the reader can bring into a scoping conversation, instead of a preventivo they might mistake for a real quote.

## 4. Inputs

1. **Dimensione del catalogo** — single-select: "Fino a 20 prodotti", "21–100 prodotti", "Oltre 100 prodotti".
2. **Frequenza di aggiornamento del catalogo** — single-select: "Raramente (poche volte l'anno)", "Regolarmente (ogni mese)", "Molto spesso (ogni settimana o più)".
3. **Metodi di pagamento necessari** — multi-select (checkboxes, at least one recommended but not enforced): TWINT, Carte di credito/debito, Fatturazione, Pagamento anche in altre valute (es. EUR).
4. **Ambito di spedizione** — single-select: "Solo Svizzera", "Svizzera e un Paese confinante (Italia, Germania, Francia, Austria)", "Svizzera e più Paesi esteri".
5. **Politica di resi prevista** — single-select: "Nessuna politica di reso", "Resi occasionali gestiti manualmente", "Resi frequenti, serve un processo strutturato".
6. **Canali di vendita** — single-select: "Vendo solo online", "Vendo anche altrove (mercati, negozio fisico, grossisti) e serve un inventario allineato".
7. **Tempo settimanale che potete dedicare al negozio dopo il lancio** — single-select: "Poche ore alla settimana", "Mezza giornata alla settimana", "Gestione quasi quotidiana possibile".

The result panels stay empty until **Dimensione del catalogo** and **Ambito di spedizione** are both set (the two inputs with the widest swing across the six drivers). All other inputs default to their lowest-complexity option if left unset, rather than blocking the tool.

## 5. Calculation / decision logic

- **No CHF price is computed, displayed or implied anywhere in this tool.** This is a hard rule, matching the article's own refusal to invent a fixed e-commerce figure.
- **Permanent scope statement (not calculated, always shown once the gate inputs are set):** "Starter (CHF 880) e Business (CHF 4'990) non coprono questo progetto. Un negozio online con catalogo, pagamenti e spedizione appartiene al Sito web complesso / su misura, a partire da CHF 9'900 (fonte: src/data/pricing.ts)." This never changes based on inputs — it is true for every use of this tool by definition of what the tool is for.
- **Six-driver scoring**, each block resolved to the HIGHEST tag triggered by the relevant inputs (`basso` < `medio` < `alto`), exactly as specified in `impactRules` in `artifact-data.json`:
  - `catalogo` — from dimensione + frequenza di aggiornamento.
  - `pagamenti` — from the number of payment methods selected, with "altre valute" forcing `alto`.
  - `spedizione_tasse` — from ambito di spedizione.
  - `resi` — from politica di resi.
  - `inventario` — from canali di vendita (binary: `basso` if solo online, `alto` if multicanale).
  - `operativita` — from catalogo_frequenza + canali_vendita + resi_politica combined (the "how much ongoing work will this generate" driver).
- **Overall scope-size classification (not a price):** "Ambito complesso contenuto" when 0–1 of the six blocks resolve to `alto`; "Ambito complesso esteso" when 2 or more resolve to `alto`. This is the tool's structural way of showing the same real difference the article's two worked examples (Nadia vs. the multi-brand retailer) illustrate, without inventing a number between CHF 9'900 and an unstated ceiling.
- **Readiness cross-check (the tool's unique decision-support mechanic):** compare the `operativita` block's resolved tag against input 7 (tempo settimanale disponibile). If `operativita` resolves to `alto` or `medio` while the reader selected "Poche ore alla settimana", show a distinct warning block (not merged with the six-driver list): "Il carico operativo che queste scelte generano sembra superiore al tempo che avete indicato di poter dedicare ogni settimana. Vale la pena discuterne apertamente prima di procedere, non dopo il lancio." No warning is shown when capacity matches or exceeds the expected workload.
- **"Forse non serve ancora" flag:** when ALL of the following hold — dimensione == fino_20, frequenza == raro, resi_politica == nessuna, canali_vendita == solo_online, tempo == poche_ore — show a distinct, calmly worded note (not an error, not a warning) pointing out that a full e-commerce build may be premature for this specific combination, with a link back to the article's "Per chi ha senso oggi, e per chi conviene aspettare" section. This is the tool's honest "you may not need this yet" conclusion, matching the article's own position and the master brief's requirement that the tool remain useful even when it recommends waiting.
- No numeric formula, no weighted average, no invented percentage anywhere — every rule is a fixed, readable condition in `artifact-data.json`.

## 6. Outputs

1. **Banner permanente**: lo statement "Starter e Business non coprono questo progetto" (sempre visibile una volta impostati gli input del gate, mai condizionale).
2. **Pannello "I sei motori del vostro progetto"**: sei righe (catalogo, pagamenti, spedizione e tasse, resi, inventario, operatività), ciascuna con una breve spiegazione in linguaggio semplice e un'etichetta testuale `basso`/`medio`/`alto` (mai solo colore).
3. **Classificazione di ambito**: "Ambito complesso contenuto" oppure "Ambito complesso esteso", con una riga di spiegazione di cosa la distingue (numero di motori su `alto`), mai un numero o una percentuale.
4. **Blocco di allerta operativa** (0 o 1, condizionale): mostrato solo quando il carico previsto supera la disponibilità dichiarata.
5. **Nota "Forse non serve ancora"** (0 o 1, condizionale): mostrata solo per la combinazione a bassissima complessità descritta sopra, con link all'articolo.
6. **"Copiare per la vostra richiesta"**: un riepilogo testuale della selezione (dimensione catalogo, frequenza, pagamenti scelti, ambito di spedizione, resi, canali, tempo disponibile) pronto da incollare in un'e-mail per avviare una conversazione di perimetro — mai presentato come un preventivo.

## 7. Error states

- **Dimensione del catalogo** o **Ambito di spedizione** non impostati → i pannelli restano vuoti con il messaggio: "Impostate almeno la dimensione del catalogo e l'ambito di spedizione per vedere una valutazione." Nessun risultato parziale o indovinato.
- Pagamenti (multi-select) lasciato senza alcuna spunta → il motore "pagamenti" mostra semplicemente `basso`, senza bloccare il resto del risultato.
- Frequenza, resi, canali o tempo disponibile non impostati → ciascuno contribuisce con la propria opzione a complessità più bassa come impostazione predefinita, mai un blocco totale dello strumento.
- JavaScript disabilitato → la versione statica elenca comunque, in ordine leggibile e non filtrato, i sei motori con la loro descrizione, lo statement permanente Starter/Business e le due possibili classificazioni di ambito (progressive enhancement, non una pagina vuota).

## 8. Privacy considerations

- Funziona interamente nel browser. Nessuna richiesta di rete, nessun campo per nome, azienda, e-mail o budget — solo parametri generici di catalogo, pagamenti e logistica.
- Se le selezioni vengono mantenute in `localStorage` per comodità tra una visita e l'altra, questo va dichiarato con una riga visibile e un controllo "Azzera selezione" funzionante.
- Nessun evento di analytics legato alle singole selezioni è necessario al funzionamento dello strumento; se aggiunto, deve essere aggregato/anonimo e dichiarato.

## 9. Accessibility requirements

- Tutti i controlli (select singoli, checkbox multi-select) pienamente utilizzabili da tastiera, con stato di focus visibile e raggruppamento semantico corretto tramite `<fieldset>`/`<legend>`.
- Le etichette `basso`/`medio`/`alto` sono sempre testo, mai solo colore.
- I pannelli di risultato, il blocco di allerta operativa e la nota "Forse non serve ancora" si aggiornano dentro una regione `aria-live="polite"`, così chi usa uno screen reader viene informato del cambiamento senza perdere il contesto.
- Contrasto minimo 4,5:1; rispetto di `prefers-reduced-motion` (aggiornamenti istantanei, nessuna animazione dei valori).
- I sei motori e il riepilogo sono markup di liste reali, non semplici `<div>`.

## 10. Mobile behaviour

- Modulo a colonna singola; i pannelli di risultato (banner permanente, sei motori, classificazione di ambito, eventuale allerta operativa, eventuale nota "forse non serve ancora", riepilogo da copiare) appaiono sotto il modulo nello stesso ordine, senza schede separate.
- Una piccola barra di riepilogo fissa (es. "Catalogo: 21–100 · Spedizione: Svizzera + estero") resta visibile durante lo scorrimento dei pannelli.
- Il pulsante "Copia testo" del riepilogo è a piena larghezza e facilmente raggiungibile con il pollice.
- Tutti i controlli dimensionati per il tocco (minimo 44×44px).

## 11. Exact CTA

CTA primaria, sempre visibile sotto i pannelli di risultato:

> **"Richiedete una valutazione gratuita del perimetro del vostro negozio online"** → collega a `/it/kontakt/`

Link secondario, meno evidente, vicino all'inizio dello strumento:

> "Leggi l'articolo completo sui sei motori di complessità di un e-commerce" → collega alla pagina dell'articolo (`/it/ai-academy/marketing-seo-geo/costo-ecommerce-ticino/`).

Nessun conto alla rovescia, nessuna urgenza artificiale. Il testo e la destinazione della CTA non cambiano in base alla selezione corrente, incluso quando lo strumento mostra la nota "forse non serve ancora" — anche in quel caso la CTA resta la stessa richiesta di valutazione, mai nascosta o sostituita con un messaggio di vendita più aggressivo.

## 12. Disclaimer

Nota visibile vicino all'inizio dello strumento e ripetuta accanto al banner permanente Starter/Business:

> "Questo strumento non calcola un prezzo. Mostra su quali dei sei motori di complessità — catalogo, pagamenti, spedizione e tasse, resi, inventario, lavoro operativo continuativo — si colloca il vostro progetto, e se il carico operativo previsto corrisponde al tempo che avete indicato di poter dedicare. Starter (CHF 880) e Business (CHF 4'990) non coprono un negozio online: qualunque sia il risultato, un vero e-commerce appartiene al pacchetto complesso, a partire da CHF 9'900, con prezzo calcolato sul perimetro reale del progetto."

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only for the `alto` tag and for the operational-readiness warning block's border/label, always paired with text — never a large fill, never the only signal. `medio` uses a muted ink tone with the word; `basso` uses the quietest ink-mute tone with the word. No green/traffic-light system.
- The permanent Starter/Business banner uses a distinct, calm treatment (e.g. a thin top border in `--ink` tone, not red) so it reads as a factual statement, not a warning.
- The operational-readiness warning block (when shown) is the only element allowed the accent-coloured border, since it is the tool's genuine decision-relevant alert.
- The "forse non serve ancora" note uses a quiet, neutral card style — deliberately calmer than the warning block, since it is reassuring information, not a problem to fix.
- Primary CTA button: solid `--btn-bg: #111111`, hover `#2b2b2b`, white text.
- The six-driver panel is a simple bordered list (1px lines, `--line: #e5e5e2`), not a bar chart, gauge or radar chart — consistent with the site's "no fake precision" visual rule.
- Typography `'Instrument Sans'` with system-sans-serif fallback; corner radius 10px/14px; soft shadow only on active result panels.
- Overall feel: a structured worksheet for a real scoping conversation, not a dashboard, quiz or instant quote generator.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Calcolatore di complessità
e-commerce". It is an Italian-language (it-CH) interactive worksheet for
Ticino businesses considering an online shop. It is explicitly NOT a price
calculator — it never computes, displays or implies any CHF total other
than the one fixed, permanent statement below. It maps the reader's own
catalogue, payment, shipping, returns and channel choices onto six
complexity drivers, classifies the overall scope qualitatively, and
cross-checks the expected ongoing workload against the reader's own stated
available time.

CONTEXT
The companion article's thesis: a real online shop is a structurally
different project from a brochure website, and no fixed price exists for
"an e-commerce" because six variables — catalogo, pagamenti, spedizione e
tasse svizzere, resi, sincronizzazione dell'inventario, lavoro operativo
continuativo — swing too widely between projects. Weissmann's Starter
(CHF 880) and Business (CHF 4'990) packages never include e-commerce; only
the Sito web complesso / su misura package (from CHF 9'900, price
calculated per scope) does. This tool lets the reader see where their own
project lands on the six drivers, get an honest qualitative scope size
(not a number), and find out whether their own available time matches the
ongoing work their choices will create — including an honest flag if a
full e-commerce build may be premature for them right now.

PERMANENT STATEMENT (always shown once the gate inputs are set, NEVER
conditional on any input, NEVER phrased as a calculation result):
"Starter (CHF 880) e Business (CHF 4'990) non coprono questo progetto. Un
negozio online con catalogo, pagamenti e spedizione appartiene al Sito web
complesso / su misura, a partire da CHF 9'900 (fonte: src/data/pricing.ts,
Weissmann AI)."

INPUTS
1. Dimensione del catalogo — single-select:
   "Fino a 20 prodotti" (fino_20)
   "21–100 prodotti" (da_21_a_100)
   "Oltre 100 prodotti" (oltre_100)
2. Frequenza di aggiornamento del catalogo — single-select:
   "Raramente (poche volte l'anno)" (raro)
   "Regolarmente (ogni mese)" (mensile)
   "Molto spesso (ogni settimana o più)" (settimanale)
3. Metodi di pagamento necessari — multi-select checkboxes (none required):
   "TWINT" (twint), "Carte di credito/debito" (carte),
   "Fatturazione" (fatturazione), "Pagamento anche in altre valute (es. EUR)" (multivaluta)
4. Ambito di spedizione — single-select:
   "Solo Svizzera" (solo_svizzera)
   "Svizzera e un Paese confinante (Italia, Germania, Francia, Austria)" (svizzera_vicino)
   "Svizzera e più Paesi esteri" (svizzera_internazionale)
5. Politica di resi prevista — single-select:
   "Nessuna politica di reso" (nessuna)
   "Resi occasionali gestiti manualmente" (occasionali)
   "Resi frequenti, serve un processo strutturato" (strutturati)
6. Canali di vendita — single-select:
   "Vendo solo online" (solo_online)
   "Vendo anche altrove (mercati, negozio fisico, grossisti)" (multicanale)
7. Tempo settimanale disponibile dopo il lancio — single-select:
   "Poche ore alla settimana" (poche_ore)
   "Mezza giornata alla settimana" (mezza_giornata)
   "Gestione quasi quotidiana possibile" (quasi_quotidiana)

RESULT GATE
Inputs 1 (Dimensione del catalogo) and 4 (Ambito di spedizione) are
required. Until both are set, show only the empty-state message:
"Impostate almeno la dimensione del catalogo e l'ambito di spedizione per
vedere una valutazione." Inputs 2, 3, 5, 6, 7 default to their
lowest-complexity option (raro / nessuna checkbox / solo_svizzera-style
baseline / nessuna / solo_online / poche_ore respectively) when left
unset — never block the tool.

SIX-DRIVER SCORING (implement exactly as these fixed rules — no numeric
formula, no weighted average; each block's tag is the HIGHEST triggered by
the current selection, basso < medio < alto):
  catalogo:
    dimensione fino_20 -> basso; da_21_a_100 -> medio; oltre_100 -> alto
    frequenza raro -> basso; mensile -> medio; settimanale -> alto
    (block tag = max of the two)
  pagamenti:
    count selected among {twint, carte, fatturazione}: 0 or 1 -> basso;
    2 -> medio; 3 -> alto
    multivaluta checked -> alto (overrides regardless of count)
  spedizione_tasse:
    solo_svizzera -> basso; svizzera_vicino -> medio;
    svizzera_internazionale -> alto
  resi:
    nessuna -> basso; occasionali -> medio; strutturati -> alto
  inventario:
    solo_online -> basso; multicanale -> alto (no medio state for this one)
  operativita (expected ongoing workload):
    from frequenza: raro -> basso; mensile -> medio; settimanale -> alto
    from canali: multicanale -> at least medio
    from resi: strutturati -> at least medio
    (block tag = max across all three contributions)

OVERALL SCOPE-SIZE CLASSIFICATION (qualitative, never a number):
  Count how many of the six blocks resolve to "alto".
  0 or 1 alto-blocks -> "Ambito complesso contenuto"
  2 or more alto-blocks -> "Ambito complesso esteso"
  Show one sentence explaining the count, e.g. "N motori su 6 al livello
  alto." Never translate this into a price.

OPERATIONAL READINESS CROSS-CHECK (the tool's core decision-support
mechanic — implement exactly):
  If operativita resolves to "medio" or "alto" AND input 7 (tempo
  disponibile) == poche_ore, show a distinct warning block, visually
  separate from the six-driver list:
  "Il carico operativo che queste scelte generano sembra superiore al
  tempo che avete indicato di poter dedicare ogni settimana. Vale la pena
  discuterne apertamente prima di procedere, non dopo il lancio."
  Do not show this block in any other combination.

"FORSE NON SERVE ANCORA" NOTE (calm, non-alarming tone, distinct card):
  Show only when ALL of the following hold simultaneously:
  dimensione == fino_20 AND frequenza == raro AND resi == nessuna AND
  canali == solo_online AND tempo == poche_ore.
  Text: "Con questa combinazione, un e-commerce vero potrebbe essere
  prematuro. Una vetrina Starter o Business con un modulo di richiesta, o
  ordini gestiti manualmente, può bastare finché il catalogo o il volume
  non crescono. Leggi «Per chi ha senso oggi, e per chi conviene
  aspettare» nell'articolo completo." Link to the article page. This note
  never appears together with the operational-readiness warning above
  (the input combinations that trigger each are mutually exclusive by
  construction).

OUTPUT LAYOUT (in this order)
1. Permanent Starter/Business statement (always shown once gate inputs set).
2. "I sei motori del vostro progetto" — six rows (catalogo, pagamenti,
   spedizione e tasse, resi, inventario, operatività), each with a
   one-line plain-language description and its basso/medio/alto tag as
   text, never colour-only.
3. Overall scope-size classification sentence.
4. Operational-readiness warning block (0 or 1, conditional as above).
5. "Forse non serve ancora" note (0 or 1, conditional as above).
6. "Copiare per la vostra richiesta" — a plain-text box summarising the
   full selection (catalogue size, update frequency, payment methods,
   shipping scope, returns policy, sales channels, available time),
   with a "Copia testo" button (Clipboard API, manual-select fallback if
   it fails — never throw a visible error).

DISCLAIMER (visible near the top, and repeated next to the permanent
Starter/Business statement):
"Questo strumento non calcola un prezzo. Mostra su quali dei sei motori di
complessità si colloca il vostro progetto, e se il carico operativo
previsto corrisponde al tempo che avete indicato di poter dedicare.
Starter e Business non coprono un negozio online: un vero e-commerce
appartiene al pacchetto complesso, a partire da CHF 9'900, con prezzo
calcolato sul perimetro reale del progetto."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No field asks for a name, company, email or budget. If
selections are kept in localStorage for convenience, disclose it in one
visible line with a working "Azzera selezione" button.

CTA
Primary button, always visible below the result panels:
  Label: "Richiedete una valutazione gratuita del perimetro del vostro
  negozio online"
  Link: https://www.weissmann.ai/it/kontakt/
Secondary, lower-emphasis link near the top: "Leggi l'articolo completo
sui sei motori di complessità di un e-commerce" (link to the article
page). No countdowns, no fake urgency. CTA text and destination never
change based on the current selection — including when the "forse non
serve ancora" note is shown.

VISUAL STYLE — match this exactly (Swiss, editorial, calm):
  Background #ffffff, secondary panels #f7f7f5.
  Text #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red) #c51a2e — used ONLY for the "alto" tag and the
  operational-readiness warning block's border/label, always paired with
  text, never a large fill or the only signal. "medio" uses a muted ink
  tone with the word; "basso" uses the quietest ink-mute tone with the
  word. No green or traffic-light system.
  The permanent Starter/Business statement uses a calm ink-toned top
  border, NOT red — it is a fact, not a warning.
  The "forse non serve ancora" note uses a quiet neutral card style,
  visually calmer than the warning block — it is reassurance, not a
  problem.
  Primary button: solid #111111 background, white text, hover #2b2b2b.
  Borders 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
  (cards). Soft shadow only on active result panels:
  0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font 'Instrument Sans' with system-sans-serif fallback stack.
  The six-driver panel is a simple bordered list, NOT a bar chart, gauge
  or radar chart.
  Layout: single-column stacked form; result panels below it in the fixed
  order given above; a small sticky summary bar stays visible while
  scrolling on narrow widths.

ACCESSIBILITY
Full keyboard operability for all selects/checkboxes with visible focus
states; proper fieldset/legend grouping; aria-live="polite" region for
all conditional result blocks; 4.5:1 minimum contrast; respect
prefers-reduced-motion (instant updates, no animated counters); six-driver
list and summary marked up as real lists, not bare divs.

LANGUAGE
All UI copy in Italian (natural, elegant Italian for Ticino — not a
translation of German or English phrasing). Do not add German, English or
French translations — this tool exists only in Italian.

Do not compute, display or imply any CHF total other than the single
fixed reference figure named above (CHF 9'900, always paired with "a
partire da" / "da", never a total for the reader's specific project).
```
