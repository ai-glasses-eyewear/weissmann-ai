# ARTIFACT BRIEF — Interactive Three-System Call Journey Explorer

**Companion article:** `assistente-ai-centralino-segreteria-confronto` (IT-PHONE-02) — "Assistente AI, centralino virtuale o segreteria: la stessa chiamata, tre esiti diversi"
**Artifact title (Italian, user-facing):** Percorso interattivo della stessa chiamata in tre sistemi
**Language:** Italian (it) only — matches the article; no DE/EN/FR version is commissioned.

---

## 1. User problem

A Ticino SME owner has been pitched three products that sound like synonyms — "assistente telefonico AI", "centralino virtuale", "segreteria telefonica" — often by three different vendors using nearly identical marketing language. They cannot tell, from a brochure, what actually happens the moment a real customer calls with a request that does not fit a script (a booking change plus a special request, or an ordinary question asked at the wrong moment). The article walks through two such calls in prose, once per system, three times each. This tool lets the reader pick a caller scenario and watch — or step through — the same request travel through all three systems side by side, so the difference in natural-language handling, routing, message quality and human escalation is something they see happen, not a claim they take on faith.

## 2. Intended audience

Ticino and Italian-speaking Swiss SME owners, restaurant and salon managers, and office administrators who are comparing phone-handling options (including readers who already own one of the three systems and want to know what they are actually missing, or confirm they don't need to change anything).

## 3. Why an interactive artifact beats a static PDF

- A printed transcript of six mini-calls (2 scenarios × 3 systems) is a lot to read in sequence; the tool lets the reader jump straight to the system they are curious about, or compare all three side by side for one scenario at a time.
- A live step-by-step mode turns "the AI resolves this in four turns, the centralino in six, the segreteria in one turn plus an unresolved wait" from a sentence the reader must trust into a counter they watch accumulate in real time.
- A third scenario, not in the article, shows a case where the centralino (a pre-recorded info announcement) performs almost as well as the AI assistant, and where the segreteria's fixed weakness is not complexity but the complete absence of a live answer — directly grounding the article's honest "when voicemail is still the right call" section instead of only asserting it in text.
- Letting the reader pick their own closest scenario first (restaurant, salon, or simple shop question) mirrors how they will actually use the finding: to check their own phone line, not to read three fixed stories start to finish.

## 4. Inputs

1. **Scenario picker** — three cards, none selected by default: "Prenotazione che cambia all'ultimo minuto" (ristorante Da Marco, Lugano), "Un imprevisto fuori copione" (Salone Bellavista, Bellinzona), "Una domanda semplice sugli orari" (Ferramenta Cattori, Locarno).
2. **System focus** — "Tutti e tre affiancati" (default on desktop) vs a single-system focus view; on narrow viewports the single-system view is the only mode (see §10).
3. **Playback mode** — "Passo per passo" toggle (off by default). Off: full transcripts and final summary bars shown immediately for all three systems. On: each system's turns reveal one at a time via its own "Avanti" button, independently of the other two systems.
4. **No text input anywhere.** The reader never types a name, phone number or personal detail — see §8.

## 5. Calculation / decision logic

- **No score, no ranking, no "you should switch" verdict.** The tool only replays the fixed `summary` (turns, seconds, outcome) and `steps` already defined per system in `artifact-data.json`. It never aggregates the three scenarios into one number and never declares an overall winner — each scenario stands on its own, and scenario 3 is deliberately built so the centralino performs close to the AI assistant, not worse.
- **Scenario → transcript lookup:** selecting a scenario loads its fixed `assistenteAI`, `centralinoVirtuale` and `segreteria` step arrays. Nothing is generated, randomised or personalised — every line is pre-written and explicitly framed as an illustrative reconstruction (see disclaimer, §12).
- **Live counters in step mode:** as each turn is revealed, the turn counter increments only on steps carrying a `turn` field; the elapsed-time counter jumps to that step's `t` value. In non-step mode, the `summary` block for that system is shown directly instead of being animated.
- **Comparison strip:** once all three transcripts for a scenario are fully revealed (or immediately in non-step mode), render the three `summary` blocks side by side (turns / tempo / esito) — the same numbers used in the article's "Bilancio" sections, computed from the transcript the reader just read.

## 6. Outputs

1. Three labelled transcripts ("Assistente AI" / "Centralino virtuale" / "Segreteria telefonica") for the selected scenario, each turn showing speaker, elapsed time, the line, and — where present — a short italic note explaining why the turn matters (e.g. "esegue subito ciò che può garantire" or "nessuna interazione, solo una casella vocale").
2. A three-column comparison strip per scenario: Turni, Tempo (formatted m:ss), Esito, for all three systems side by side — plain neutral text, no "winner" badge.
3. For scenario 3, the comparison strip shows the centralino performing close to the AI assistant (both resolve quickly), so the tool visibly demonstrates that the assistant's advantage is largest when the request is open-ended, not when it's a simple fixed-answer question — reinforcing, not contradicting, the article's honest "when a simpler system is enough" section.
4. A persistent, unobtrusive link back to the article's "Quando la segreteria è davvero la scelta giusta" section and its own-line test method, so the tool does not have to repeat that reasoning itself.

## 7. Error states

- No scenario selected → the transcript area stays empty with a plain prompt ("Scegliete uno scenario qui sopra per vedere tutti e tre i percorsi.") — a calm empty state, not an error banner.
- Step mode reaches the last turn of a system's path → its "Avanti" button disables and is replaced with "Ricomincia"; the other two systems' buttons keep working independently (the three paths are not forced to stay in sync).
- JavaScript disabled / the interactive layer fails to load → the underlying HTML still lists all three scenarios' full transcripts and summary strips in a static, readable stacked order (progressive enhancement, not a blank page).

## 8. Privacy considerations

- Fully client-side; nothing is transmitted to any server, and there is no analytics call of any kind.
- No input field ever collects a real phone number, name or any personal detail — every line of dialogue is fixed example content from `artifact-data.json`; the reader only clicks cards and buttons.
- A one-line note near the scenario picker states explicitly that all transcripts are constructed illustrations of typical interaction patterns, not recordings or transcripts of any real call, business or vendor system (Weissmann included).

## 9. Accessibility requirements

- Scenario cards, system-focus toggle and step buttons fully keyboard-operable, with visible focus states.
- The three system names are never distinguished by colour alone — always paired with the text label; the comparison strip's numbers are plain text, not colour- or icon-coded pass/fail.
- Step reveals and live counters update inside an `aria-live="polite"` region so screen-reader users hear the new turn and updated counts without re-navigating.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` — turns appear instantly (no slide/fade) when reduced motion is requested.
- Each transcript is marked up as a genuine ordered list, not bare `<div>`s.

## 10. Mobile behaviour

- Below ~640px, "Tutti e tre affiancati" is replaced automatically by the single-system focus view, with a small sticky three-way toggle ("AI" / "Centralino" / "Segreteria") above the transcript so the reader can flip between systems without losing scroll position.
- Scenario picker becomes a horizontally scrollable card strip (touch-swipeable) instead of three cards competing for width.
- "Avanti" buttons are full-width and thumb-reachable at the bottom of the viewport.
- The comparison strip stacks to three rows (one per system) instead of a three-column table.

## 11. Exact CTA

Primary CTA button, shown persistently below the scenario area (not gated behind finishing a transcript):

> **"Testate il vostro numero con una chiamata vera: primo colloquio gratuito"** → links to `/it/servizi/assistente-telefonico-ai/`

Secondary, lower-emphasis link near the top of the tool:

> "Leggi l'articolo completo con il test del giro di chiamata" → links to the article's own URL (`/it/ai-academy/agenti-automazione/assistente-ai-centralino-segreteria-confronto/`).

No countdown, no fake urgency, no "before it's too late" language. The CTA text and destination stay identical regardless of which scenario is showing.

## 12. Disclaimer

Include a short, visible note near the scenario picker:

> "Le tre chiamate di ogni scenario sono ricostruzioni illustrative di comportamenti tipici — non registrazioni o trascrizioni di una chiamata reale, né di Weissmann né di un altro fornitore. Tempi e numero di turni mostrano un andamento realistico, non il risultato misurato di un sistema specifico."

This prevents the tool from being mistaken for a real call recording or a benchmark of any specific vendor's actual performance.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only as a small marker on the "Esito" cell when a request was left genuinely unresolved (e.g. the segreteria path with no confirmation) — always paired with the outcome text, never a large fill. All three system labels stay `--ink` (near-black); this is a comparison, not a good/bad simulator.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- Transcript turns rendered as simple labelled rows (speaker in small caps, elapsed time in a monospace tabular figure, line in regular text), not chat-bubble graphics — an annotated call log on paper, not a messaging-app mockup.
- Comparison strip: a plain three-column (desktop) / three-row (mobile) stat table, thin 1px borders (`--line: #e5e5e2`), no bar charts or gauges.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the active transcript panel.
- Overall feel: a stopwatch held over three annotated transcripts — calm, editorial, precise — not a game and not a sales-y "vs." battle graphic.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Percorso interattivo della stessa
chiamata in tre sistemi" (Interactive Three-System Call Journey Explorer).
It is an Italian-language (it-CH, Ticino) interactive tool for Swiss
businesses comparing how an AI phone assistant, a virtual switchboard
(centralino virtuale) and a plain answering machine (segreteria
telefonica) each handle the exact same caller request — not a calculator,
not a lead-generation quiz.

CONTEXT
The companion article follows two realistic (constructed, not recorded)
phone calls through all three systems and shows that the systems only
look similar in a brochure: they diverge the moment the caller does
something the script did not anticipate. The article's method: for each
system, count turns (distinct actions the caller must take) and elapsed
seconds to a useful outcome, and note whether the outcome is a confirmed
action or just a message someone still has to act on. This tool must
replay that method for THREE scenarios, one of which shows the centralino
performing nearly as well as the AI assistant (a simple, static
question), so the tool does not always make the AI assistant look like
the automatic winner.

SCENARIOS (3, user picks exactly one at a time, no default selected)

1. prenotazione-ultimo-minuto — "Prenotazione che cambia all'ultimo
   minuto" (Ristorante Da Marco, Lugano). Signora Bernasconi has a table
   for four booked tonight at 20:00; at 18:40 she calls back because they
   will now be six, asks for a table near the window if possible, and
   mentions a gluten allergy.

   ASSISTENTE AI (3 turns, 34 seconds, outcome "coperti aggiornati
   subito, richieste speciali inoltrate per iscritto"):
   18:40 Assistente: "Ristorante Da Marco, buonasera, sono l'assistente
   digitale. Come posso aiutarla?"
   18:40 Bernasconi (turno 1): "Buonasera, ho una prenotazione per
   stasera alle otto a nome Bernasconi, eravamo in quattro, ora saremo in
   sei — e se c'è un tavolo vicino alla finestra meglio, ah, e uno di noi
   non può mangiare glutine."
   18:41 Assistente: "Trovo la prenotazione Bernasconi delle 20:00 per
   quattro persone e la aggiorno subito a sei coperti. Segno anche il
   tavolo vicino alla finestra e l'intolleranza al glutine — quale tavolo
   resta libero stasera dipende dalla sala, quindi non posso garantirglielo
   da qui." (note: executes what it can guarantee immediately, forwards
   what needs human judgement as a written note)
   18:41 Bernasconi (turno 2): "Perfetto, va benissimo così."
   18:42 Assistente: "Aggiornato: sei persone alle 20:00, richiesta
   tavolo vicino alla finestra e allergia al glutine segnalate alla sala.
   Le arriva un SMS di conferma tra poco. Altro?"
   18:42 Bernasconi (turno 3): "No, grazie mille, a dopo."

   CENTRALINO VIRTUALE (2 turns, 64 seconds, outcome "instradata
   correttamente, nessuna conferma"):
   18:40 Voce guida: "Ristorante Da Marco. Per prenotazioni prema 1, per
   la sala eventi prema 2, per tutte le altre richieste prema 0."
   18:41 Bernasconi (turno 1): preme 1, sperando sia la scelta giusta.
   18:41 Voce guida: "La trasferisco alla sala prenotazioni. Attenda in
   linea." Musica d'attesa.
   18:44 Voce guida: "Tutti gli operatori sono occupati. Può lasciare un
   messaggio dopo il segnale, oppure riprovare più tardi."
   18:44 Bernasconi (turno 2): lascia un messaggio con tutti i dettagli,
   sperando che qualcuno lo ascolti prima delle 20:00.

   SEGRETERIA TELEFONICA (1 turn, 41 seconds, outcome "messaggio
   registrato, nessuna conferma"):
   18:40 Segreteria: "Ristorante Da Marco. Siamo momentaneamente non
   raggiungibili. Lasci un messaggio dopo il segnale acustico."
   18:41 Bernasconi (turno unico, no interruption possible): "Buonasera,
   sono la signora Bernasconi, avevo prenotato per stasera alle otto in
   quattro, ora saremo in sei, se possibile un tavolo vicino alla
   finestra, e uno di noi non mangia glutine — mi richiami se c'è un
   problema, il mio numero è +41 91 923 XX XX." No confirmation of
   anything is ever given back to her.

2. imprevisto-fuori-copione — "Un imprevisto fuori copione" (Salone
   Bellavista, Bellinzona). Signor Rossi wants to move tomorrow's 15:00
   haircut to 17:00, and also asks whether they can shave his
   14-year-old son, or whether that needs parental consent — a question
   outside any standard script.

   ASSISTENTE AI (3 turns, 32 seconds, outcome "orario spostato subito,
   domanda delicata instradata con scadenza chiara"):
   Assistente: "Salone Bellavista, buongiorno, sono l'assistente
   virtuale. Come posso aiutarla?"
   Rossi (turno 1): "Buongiorno, ho il taglio domani alle tre, lo
   sposterei alle cinque se è possibile — e già che ci sono, potete fare
   la barba anche a mio figlio, ha quattordici anni, o serve il consenso
   di un genitore?"
   Assistente: "Sposto subito il suo appuntamento di domani dalle 15:00
   alle 17:00 — confermato. Sulla domanda per suo figlio non ho
   un'informazione affidabile, dipende dal barbiere di turno, e preferisco
   non improvvisare. Vuole che qualcuno la richiami oggi pomeriggio?"
   (note: distinguishes what it can execute with certainty from what it
   should escalate rather than guess)
   Rossi (turno 2): "Va bene, fatemi richiamare oggi pomeriggio."
   Assistente: "Perfetto, prendo nota: richiamare il signor Rossi oggi
   pomeriggio per la domanda sulla barba del figlio minorenne.
   L'appuntamento di domani alle 17:00 è già confermato via SMS. Altro?"
   Rossi (turno 3): "No, va bene così, grazie."

   CENTRALINO VIRTUALE (3 turns across two calls, ~95 seconds, outcome
   "due chiamate separate, nessuna delle due confermata"):
   Voce guida: "Salone Bellavista. Per appuntamenti prema 1, per
   trattamenti prema 2, per tutto il resto prema 0."
   Rossi (turno 1): preme 1.
   Voce guida: "Dica il suo nome e l'orario attuale dopo il segnale, un
   operatore la richiamerà." — a voicemail box, no interaction.
   Rossi (turno 2): lascia il messaggio con l'orario da spostare, poi
   richiama per la domanda sulla barba, perché non è chiaro se rientri in
   "appuntamenti" o "tutto il resto".
   Voce guida (seconda chiamata): stesso menu, dall'inizio. Rossi (turno
   3) preme 0. Attesa di alcuni minuti, nessuna garanzia di risposta
   prima di sera.

   SEGRETERIA TELEFONICA (1 turn, 38 seconds, outcome "nessuna delle due
   richieste confermata, rischio di doppio impegno"):
   Segreteria: "Salone Bellavista, siamo al momento assenti. Lasciate un
   messaggio dopo il segnale."
   Rossi (turno unico): lascia tutto in un solo messaggio — l'orario da
   spostare e la domanda sul figlio — senza sapere se la seconda parte
   verrà anche solo ascoltata con attenzione. Se nessuno trascrive il
   messaggio nell'agenda prima di domani, il vecchio orario delle 15:00
   resta valido.

3. domanda-semplice-orari — "Una domanda semplice sugli orari"
   (Ferramenta Cattori, Locarno). A caller just wants to know if the shop
   is open Saturday afternoon — a simple, static, non-transactional
   question. THIS SCENARIO MUST SHOW THE CENTRALINO PERFORMING CLOSE TO
   THE AI ASSISTANT, not clearly worse — do not skew this to make the AI
   assistant win by a wide margin here; the point is that a fixed,
   predictable question is exactly what a pre-recorded announcement
   handles well.

   ASSISTENTE AI (2 turns, 14 seconds, outcome "risposta immediata e
   corretta"):
   Assistente: "Ferramenta Cattori, buongiorno. Come posso aiutarla?"
   Cliente (turno 1): "Buongiorno, siete aperti sabato pomeriggio?"
   Assistente: "Sì, il sabato siamo aperti dalle 8:30 alle 12:00 e dalle
   14:00 alle 16:00. Altro?"
   Cliente (turno 2): "No, perfetto, grazie."

   CENTRALINO VIRTUALE (2 turns, 19 seconds, outcome "risposta corretta
   via annuncio registrato"):
   Voce guida: "Ferramenta Cattori. Per orari e indirizzo prema 1, per
   parlare con un addetto prema 2."
   Cliente (turno 1): preme 1.
   Voce guida (turno che si autocompleta): "Siamo aperti dal lunedì al
   venerdì dalle 8:00 alle 18:00, il sabato dalle 8:30 alle 12:00 e dalle
   14:00 alle 16:00." — a static recording, correct and almost as fast as
   the AI assistant because the question needed no interpretation at all.

   SEGRETERIA TELEFONICA (1 turn, then no answer until Monday, outcome
   "domanda utile solo prima di sabato, risposta arrivata dopo"):
   Segreteria: "Ferramenta Cattori. Siamo momentaneamente assenti.
   Lasciate un messaggio."
   Cliente (turno unico): "Buongiorno, volevo sapere se siete aperti
   sabato pomeriggio, mi richiami quando può, grazie." The message is
   heard only Monday morning, once the shop reopens — by then the
   question has lost any use, illustrating that a voicemail's structural
   weakness is not complexity, it is the absence of any live answer at
   all, even for the simplest question.

For every step, use EXACTLY this dialogue (light UI-label rewording is
fine; do not invent new dialogue or change any timing, turn count, or
outcome). Do not fabricate or imply that any scenario shows a real
recorded call from Weissmann or any named competitor.

UI / INTERACTION
- Scenario picker: 3 cards, none selected by default. Selecting one loads
  all three transcripts ("Assistente AI", "Centralino virtuale",
  "Segreteria telefonica") plus their summary stats (turns, seconds
  formatted m:ss, outcome).
- Layout: all three transcripts side by side on desktop; on narrow
  widths (<640px) only one shows at a time with a small sticky three-way
  toggle above the transcript.
- Optional "Passo per passo" toggle (off by default). Off: show full
  transcripts and final stat strip immediately for all three. On: reveal
  turns one at a time per system via independent "Avanti" buttons (the
  three systems do NOT have to stay in sync); a live counter above each
  transcript updates as turns are revealed. When a system's last turn is
  reached, replace its "Avanti" button with "Ricomincia".
- Comparison strip beneath all three transcripts once fully revealed (or
  immediately in non-step mode): three stats per system — Turni, Tempo,
  Esito — displayed as plain neutral text, NOT colour- or icon-coded as
  good/bad, not even for scenario 3 where the centralino performs almost
  as well as the AI assistant.
- Do not compute or display any single combined "winner" across the
  three scenarios; each scenario's comparison stands alone.

DISCLAIMER (always visible near the scenario picker, not collapsible
away)
"Le tre chiamate di ogni scenario sono ricostruzioni illustrative di
comportamenti tipici — non registrazioni o trascrizioni di una chiamata
reale, né di Weissmann né di un altro fornitore. Tempi e numero di turni
mostrano un andamento realistico, non il risultato misurato di un
sistema specifico."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No input field of any kind asks for a real name,
number, or caller detail — the tool only displays fixed example dialogue.

CTA
Primary button, always visible below the scenario area (not gated behind
any interaction):
  Label: "Testate il vostro numero con una chiamata vera: primo colloquio
  gratuito"
  Link: https://www.weissmann.ai/it/servizi/assistente-telefonico-ai/
Secondary lower-emphasis link near the top: "Leggi l'articolo completo
con il test del giro di chiamata" (link to the article page).
Do not use countdowns, fake urgency, or "before it's too late" phrasing.
Keep the CTA identical across all three scenarios.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a stopwatch
held over three annotated transcripts, not a game or a sales battle
graphic):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY as a small marker on an "Esito"
    cell when a request was left genuinely unresolved, always paired with
    the outcome text, never a large fill.
  All three system labels use near-black (#111111) — no "winner" colour
    treatment on any of them, including scenario 3.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the active transcript panel:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Transcript turns as simple labelled rows: speaker in small caps,
    elapsed time in a monospace tabular figure, line in regular text —
    not chat bubbles.
  Comparison strip: plain three-column (desktop) / three-row (mobile)
    stat table, no bar charts, gauges or progress rings.

ACCESSIBILITY
Full keyboard operability for scenario cards, system-focus toggle, and
step buttons; visible focus states; aria-live="polite" region for step
reveals and live counter updates; 4.5:1 minimum contrast; respect
prefers-reduced-motion (turns appear instantly, no slide/fade); each
transcript marked up as a real ordered list, not bare divs.

LANGUAGE
All UI copy in Italian (Ticino register, natural elegant Italian, do not
translate German syntax). Do not add German, English or French
translations — this tool exists only in Italian.

Do not fabricate or imply that any scenario shows a real recorded call
from Weissmann or any named competitor. Every dialogue line must read
clearly as a constructed illustration of a typical interaction pattern.
```
