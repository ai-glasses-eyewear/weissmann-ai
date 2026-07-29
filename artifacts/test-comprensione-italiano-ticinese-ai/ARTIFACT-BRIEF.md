# Artifact Brief — Laboratorio di cambio lingua e test di comprensione

**Article:** `test-comprensione-italiano-ticinese-ai` ("Un assistente telefonico AI capisce l'italiano ticinese e chi cambia lingua durante la chiamata?")
**Language:** Italian (it) — the article and artifact both exist in Italian only.
**Artifact type:** Combinatorial scenario builder + running priority matrix. This is a materially different interaction model from every existing Italian phone-assistant sibling: `assistenti-telefonici-ai-svizzera-pmi-ticinesi` is a static-data provider comparator, `assistente-ai-centralino-segreteria-confronto` is a single fixed 3-system journey walkthrough, `trasparenza-ai-telefono-ticino` has no artifact of its own in this set, and `numero-esistente-assistente-ai-ticino` is a linear one-path-at-a-time wizard that ends in one action plan. This tool instead lets the reader assemble *any number* of test scenarios from four independent variables, generates a ready-to-read call script for each one, and accumulates every scored scenario into a single ranked "what to fix first" table — closer to a configuration builder feeding a live priority matrix than to a wizard or a scorecard. It is also a different mechanic from the German sibling `swiss-dialect-comprehension-test` (Dialekt-Stresstest-Builder), which asks the reader to tick a fixed set of seven pre-defined dialect/condition dimensions and produces one weighted pass/fail verdict; this tool builds open-ended combinations of Ticino-specific variables and produces a ranked action list, not a verdict.

## User problem

The article's thesis is that "does it understand Ticino Italian?" is not one question but a combination of independent variables — regional cadence, business loanwords, a language switch mid-call, background noise — and that testing them one at a time (or not combining them at all) misses exactly the failure mode that happens on a difficult real call. A reader who has finished the article knows *what* to combine but still has to write their own call script by hand for each combination and invent their own way to compare results across several test calls. The Laboratorio removes both steps: it assembles a specific, ready-to-read script from the reader's own choices, and it turns every scored scenario into one row of a running table that ranks which real-call combination is the most urgent to fix — not just whether a single test "passed."

## Audience

A Ticino SME owner, studio professionale, hotel or artigiano evaluating an AI phone assistant (any vendor, including but not limited to Weissmann) who wants to build test calls that actually resemble their own difficult days — a client switching languages, a loud workshop, a dictated address — rather than a single easy demo-style call.

## Why an interactive artifact is better than a static PDF

The right test script depends on four independent choices (accent context, loanword focus, language-switch pattern, noise condition) plus one optional toggle (name/address dictation) — a combinatorial space a static page cannot pre-print without either listing dozens of scripts at once (burying the two or three the reader actually needs) or forcing the reader to manually assemble a script from scattered examples, which is the exact shortcut the article warns against ("un test che isola gli ingredienti finisce per misurare il caso più facile"). An interactive builder generates exactly one clean script per combination, on demand, and — critically — a static page cannot accumulate results: only an interactive tool can hold several scored scenarios in the same session and compute which one deserves attention first, weighted by how often that exact combination happens in the reader's real calls.

## Inputs

**Per scenario (repeatable — the reader can build as many scenarios as they want in one session):**

1. **Contesto di cadenza** (required, select): Luganese/Mendrisiotto · Bellinzonese · Locarnese e valli · Cliente svizzero non italofono (accento marcato) · Cliente italiano di confine (Lombardia). Five options, each with a one-line description of what makes that voice distinct for the test.
2. **Prestito linguistico da includere** (required, select): Nessuno (italiano semplice) · Termine tedesco amministrativo (es. «Krankenkasse») · Sigla svizzera pronunciata alla tedesca (es. «SBB») · Termine francese commerciale (es. «vernissage»). Each non-"nessuno" option carries a fixed example phrase from `artifact-data.json`, never invented live.
3. **Pattern di cambio lingua** (required, select): Nessuno · Italiano → tedesco a metà chiamata · Italiano → francese a metà chiamata · Italiano → inglese a metà chiamata · Cambio multiplo (più di una volta nella stessa chiamata).
4. **Condizione di rumore di fondo** (required, select): Ufficio silenzioso · Reception turistica con viavai · Cantiere o officina · Auto in vivavoce · Cucina di ristorante.
5. **Includi nome e indirizzo da dettare** (optional, checkbox): if checked, the tool inserts one fixed fictional name+address pair from a small built-in library (never a free-text field — see Privacy) into the script.
6. **Frequenza reale** (required once the reader is ready to score, select): Raro · Frequente · Molto frequente — how often this exact combination happens in the reader's own call volume. Asked once per scenario, not per checkpoint.

## Decision / generation logic

See `artifact-data.json` for the full data. On every change to inputs 1–5, regenerate the script live (no submit button needed):

- **Script assembly order:** opening line (from `accentContexts[id].openingLine`) → request line (from `loanwordFocus[id].requestLine`, or a plain default request if "nessuno") → name/address line (from `nameAddressLibrary`, rotating through the small fixed list, only if input 5 is checked) → switch line (from `switchPatterns[id].switchLine`, only if input 3 is not "nessuno") → a closing "condizione di sfondo" note describing the noise setting to recreate (from `noiseConditions[id].description`), shown as tester guidance, not read aloud.
- **Checkpoints generated per scenario:** always `apertura-e-cadenza` and `corpo-della-richiesta`; `cambio-lingua` is added only if input 3 ≠ "nessuno" — it must never appear as a greyed-out or "N/A" row.
- **Scoring scale per checkpoint** (entered by the reader after making the real call, never simulated): Continuità = 2, Recupero = 1, Rottura = 0 — exact definitions in `artifact-data.json`, matching the article's three-outcome scale.
- **Scenario score:** sum of entered checkpoint scores out of the scenario's own maximum (4 if two checkpoints, 6 if three).
- **Adding to the Laboratorio table:** once every checkpoint for a scenario has a score and a frequency is set, an "Aggiungi al laboratorio" action appends it as one row to a running table for the session; the reader can keep building and scoring further scenarios without losing earlier ones.
- **Priority ranking:** for every complete row, `priority = (scenarioMax − scenarioScore) × frequencyWeight` (frequencyWeight: Raro=1, Frequente=2, Molto frequente=3). Sort the table descending by `priority`. This is the tool's central output: not a pass/fail verdict, but an ordered list of which real-call combination is worth fixing first.
- **Hard-flag rule:** any row containing a Rottura (0) on a checkpoint AND frequency = "Molto frequente" is labelled "Priorità alta" in a fixed text badge, regardless of where it lands in the sorted order by raw priority number — this mirrors the article's point that a dangerous, frequent failure should never quietly average out.
- **No vendor is pre-filled or ranked.** The tool has no concept of "Weissmann's result" — it only structures the reader's own test calls, for whichever assistant they are evaluating.

## Outputs

1. **Copione generato** (live, before any scoring): the assembled script text, ready to read aloud on the test call, plus the "condizione di sfondo" tester note and the list of checkpoints this scenario will need scored.
2. **Modulo di valutazione** for the current scenario: one Continuità/Recupero/Rottura selector per checkpoint (with the meaning shown inline, not just the word), plus the frequency selector.
3. **Tabella del laboratorio**: one row per added scenario — short label (auto-built from the four choices, e.g. "Locarnese · sigla tedesca · cambio → francese · cantiere"), checkpoint scores, frequency, scenario score, and the computed priority.
4. **Matrice di priorità**: the same table, sorted by priority descending, with "Priorità alta" badges where the hard-flag rule applies — this is the artifact's headline deliverable, the ranked list of what to test-fix first.
5. A plain **"copia la tabella"** control that selects the table as text, so the reader can paste it into an email or an internal note.

## Error states

- If any of inputs 1–4 is unset, no script is generated — show a neutral prompt ("Completate le quattro scelte per generare il copione") instead of a broken or partial script.
- If a scenario is scored only partially (some checkpoints entered, others not), it cannot be added to the table yet; show "Valutazione incompleta" next to the missing checkpoint(s), never treat a blank checkpoint as a 0.
- If frequency is not set, block adding to the table with the same "incompleta" state — a scenario without a frequency cannot be prioritised and must not silently default to "Raro".
- Empty Laboratorio table (no scenarios added yet): show a calm placeholder ("Il laboratorio è vuoto: costruite e valutate il primo scenario qui sopra"), never an empty grid with headers only.
- Two scenarios with identical inputs are both allowed (the reader may want to re-test the same combination) and both appear as separate rows — the tool must not silently merge or overwrite them.

## Privacy considerations

Everything runs client-side; no input, script, score, or table row is transmitted or stored on any server. The name/address line is always drawn from a small fixed fictional library shipped inside the tool (`artifact-data.json` → `nameAddressLibrary`) — there is deliberately **no free-text field** for names or addresses, so a reader cannot accidentally type in a real customer's personal data. State this explicitly in a short, persistent note near the script output: "I nomi e gli indirizzi in questo copione sono sempre inventati — non inserite mai dati di clienti reali." The session table may be held in the browser's local storage so a reader does not lose progress on reload; disclose this in one sentence with a visible "Svuota il laboratorio" reset control.

## Accessibility requirements

Each of the five scenario inputs is a labelled `<select>` or checkbox inside a `<fieldset>`/`<legend>`; the generated script and checkpoint list update inside an `aria-live="polite"` region so screen-reader users are told when the script changes after an input edit. Continuità/Recupero/Rottura entered as labelled radio buttons with the full word always visible, never colour-only dots. The priority matrix uses a real `<table>` with `<th>` headers (not styled `<div>` grids) so row/column relationships are announced correctly; "Priorità alta" badges pair an icon with the visible text "Priorità alta", never colour alone. Minimum 4.5:1 contrast; respect `prefers-reduced-motion` (no animated re-sorting transitions beyond an instant reorder).

## Mobile behaviour

Single-column layout under ~640px: the five scenario inputs stack vertically, the generated script appears directly below them in the same scroll (not a separate tab or modal). The Laboratorio table becomes a stacked card list on narrow screens (one card per scenario, same fields, no horizontal scrolling table). Touch targets on selects/radios sized at minimum ~44×44px. A persistent, low-profile "Laboratorio: N scenari" counter stays visible while scrolling so the reader always knows how many scenarios they have already scored.

## Exact CTA

Primary CTA, shown once at least one scenario has been added to the table (any priority level, not only high-priority results):

> **"Mettere alla prova l'assistente telefonico AI di Weissmann (CHF 350, una tantum)"** → `/it/servizi/assistente-telefonico-ai/`

Secondary, lower-emphasis link near the top of the tool:

> "Il protocollo completo e il ragionamento dietro le sei condizioni: leggere l'articolo" → links to the article's own academy page.

No countdown, no fake urgency, no vendor pre-ranking. The CTA text and presence do not change based on how many scenarios scored "Rottura" — the tool must remain equally useful, and equally honest, when the reader is testing a competitor.

## Disclaimer

Shown persistently near the priority matrix, not collapsible away:

> "Questo laboratorio non sostituisce una vera telefonata di test. Genera copioni e struttura la valutazione dei risultati che ottenete voi stessi, con persone reali. Weissmann non ha pubblicato punteggi di questo protocollo per alcun fornitore, incluso il proprio: la valutazione si basa esclusivamente sui vostri inserimenti."

## Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" tokens (`src/styles/global.css`): `--paper: #ffffff` / `--paper-soft: #f7f7f5` backgrounds, `--ink: #111111` primary text with `--ink-soft`/`--ink-mute` for secondary text, Swiss-red `--accent: #c51a2e` used only for labels, the active scenario-input state, and the "Priorità alta" badge text/icon — never as a large fill and never as the sole signal for urgency. Primary CTA button solid `--btn-bg: #111111` with white text (not accent-red), matching the site-wide rule. Typography `'Instrument Sans'` with system-sans fallback; 1px borders (`--line: #e5e5e2`); corner radius 10px/14px; soft shadow only on the script-output card and the priority-matrix card. Overall feel: a calm scenario-builder next to a clean, printable ranked table — no gauges, no gamified scoring animation, no decorative call-flow diagram.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single self-contained HTML/CSS/JS artifact (inline, no external dependencies, no network calls) in Italian called "Laboratorio di cambio lingua e test di comprensione". It supports a Ticino-focused article whose thesis is that testing whether an AI phone assistant understands Ticino Italian requires combining several real conditions at once (regional cadence, German/French business loanwords, a language switch mid-call, and background noise), not testing them one at a time, and that the useful output is a ranked list of which real-call combination to fix first — not a single pass/fail score. The tool does not place or simulate any phone call itself; it helps the user (a) generate a ready-to-read test-call script from their own choices and (b) turn the scores from real calls they make themselves into a prioritized action list.
>
> SCENARIO BUILDER (repeatable — the user can build and score multiple scenarios in one session):
> Five inputs, using exactly the data and example phrases in the accompanying `artifact-data.json` (do not invent new accent contexts, loanword phrases, switch lines, noise descriptions, or name/address pairs — use the ones provided, light rewording for UI clarity only):
> 1. "Contesto di cadenza" — select, required: Luganese/Mendrisiotto, Bellinzonese, Locarnese e valli, Cliente svizzero non italofono (accento marcato), Cliente italiano di confine (Lombardia).
> 2. "Prestito linguistico da includere" — select, required: Nessuno (italiano semplice), Termine tedesco amministrativo, Sigla svizzera pronunciata alla tedesca, Termine francese commerciale.
> 3. "Pattern di cambio lingua" — select, required: Nessuno, Italiano → tedesco a metà chiamata, Italiano → francese a metà chiamata, Italiano → inglese a metà chiamata, Cambio multiplo.
> 4. "Condizione di rumore di fondo" — select, required: Ufficio silenzioso, Reception turistica con viavai, Cantiere o officina, Auto in vivavoce, Cucina di ristorante.
> 5. "Includi nome e indirizzo da dettare" — checkbox, optional. If checked, insert one entry from the fixed `nameAddressLibrary` (rotate through the list on each new scenario) — never a free-text field for names or addresses.
>
> Regenerate the script live on every input change, assembled in this order: opening line (from the chosen accent context) → request line (from the chosen loanword focus, or a plain default request if "Nessuno") → name/address line (only if input 5 is checked) → language-switch line (only if input 3 is not "Nessuno") → a "condizione di sfondo" tester note describing the noise setting (guidance text, not part of what is read aloud).
>
> CHECKPOINTS AND SCORING
> Always generate two checkpoints, "Apertura e cadenza" and "Corpo della richiesta"; add a third, "Cambio lingua", only if input 3 is not "Nessuno" (never show it as a disabled/N/A row otherwise). For each checkpoint let the user pick one of three outcomes, AFTER they have made the real test call (never simulate a result): Continuità (2 punti) — the system follows the cadence, loanword or language switch without making the caller repeat themselves or audibly changing tone; Recupero (1 punto) — the system loses the thread briefly but self-corrects or asks naturally, without inventing an answer; Rottura (0 punti) — the system keeps answering in the wrong language/register, ignores an explicit correction, or gives a confident answer built on a partial understanding (flag this as the most dangerous case in the UI copy). Also require a "Frequenza reale" select (Raro / Frequente / Molto frequente) before the scenario can be added to the table below.
>
> LABORATORIO TABLE AND PRIORITY MATRIX
> An "Aggiungi al laboratorio" action (enabled only once every checkpoint is scored and frequency is set) appends the scenario as one row to a running session table: an auto-built short label from the four choices, each checkpoint's score, frequency, the scenario's total score out of its own maximum (4 if two checkpoints, 6 if three), and a computed priority = (scenarioMax − scenarioScore) × frequencyWeight (Raro=1, Frequente=2, Molto frequente=3). Sort the table by priority descending — this ranked table, not any single verdict, is the artifact's main output. Any row with a Rottura (0) on any checkpoint AND frequency = "Molto frequente" gets a fixed "Priorità alta" text+icon badge regardless of its numeric rank. Allow duplicate-input scenarios to be added as separate rows (never merge or overwrite). Add a plain "copia la tabella" button that selects the table as text.
>
> ERROR STATES: if inputs 1–4 are incomplete, show no script, just a neutral prompt. If a scenario's checkpoints or frequency are incomplete, block adding it to the table and show "Valutazione incompleta" rather than defaulting any missing value to zero or "Raro". If the table is empty, show a calm placeholder sentence, never bare table headers.
>
> PRIVACY: everything client-side, zero network calls. No free-text field anywhere for real names, addresses, or phone numbers — state this explicitly in a short note near the script: "I nomi e gli indirizzi in questo copione sono sempre inventati — non inserite mai dati di clienti reali." You may persist the session table in localStorage with one disclosure sentence and a visible "Svuota il laboratorio" reset button.
>
> ACCESSIBILITY: every input as a labelled control inside a fieldset/legend; script and checkpoint updates announced via aria-live="polite"; Continuità/Recupero/Rottura as labelled radio buttons with the full word always visible, never colour-only; the priority matrix as a real semantic `<table>` with `<th>` headers; "Priorità alta" always paired with visible text, never colour alone; 4.5:1 minimum contrast; respect prefers-reduced-motion.
>
> MOBILE: single-column stacked inputs under ~640px, script directly below in the same scroll, table becomes stacked cards (no horizontal scroll), touch targets ≥44×44px, a persistent small "Laboratorio: N scenari" counter.
>
> DISCLAIMER (always visible near the priority matrix, not collapsible): "Questo laboratorio non sostituisce una vera telefonata di test. Genera copioni e struttura la valutazione dei risultati che ottenete voi stessi, con persone reali. Weissmann non ha pubblicato punteggi di questo protocollo per alcun fornitore, incluso il proprio: la valutazione si basa esclusivamente sui vostri inserimenti."
>
> CTA: primary button, shown once at least one scenario is in the table (any priority level, never hidden or reworded based on results): label "Mettere alla prova l'assistente telefonico AI di Weissmann (CHF 350, una tantum)", linking to https://www.weissmann.ai/it/servizi/assistente-telefonico-ai/. Secondary plain link near the top: "Il protocollo completo e il ragionamento dietro le sei condizioni: leggere l'articolo". No countdowns or urgency language.
>
> VISUAL STYLE: background #ffffff / secondary panels #f7f7f5; text #111111 primary, #3d3d3b/#5f5f5f secondary; Swiss red #c51a2e used only for labels, the active input state, and the "Priorità alta" badge — never a large fill, never the sole signal (always paired with visible text); primary button solid #111111 with white text; 1px borders #e5e5e2; corner radius 10px/14px; soft shadow only on the script-output and priority-matrix cards; font 'Instrument Sans' with system-sans fallback; generous whitespace, calm editorial tone, no gauges, no gamified score animation, no decorative call-flow graphics.
>
> LANGUAGE: all UI copy in Italian. Do not add German, English or French translations — this tool exists only in Italian. Do not fabricate or imply any specific vendor's real test results anywhere in the UI copy or placeholder content.
