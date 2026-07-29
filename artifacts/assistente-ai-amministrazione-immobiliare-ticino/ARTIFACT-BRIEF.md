# Artifact Brief — Pannello di triage delle richieste degli inquilini

**Article:** `assistente-ai-amministrazione-immobiliare-ticino` (IT-PHONE-07) — "Assistente telefonico AI per amministrazioni immobiliari in Ticino: meno caos, non meno responsabilità"
**Language:** Italian (it) — the article and artifact both exist in Italian only; no DE/EN/FR version is commissioned.
**Artifact type:** A live call-queue triage board, not a lookup grid. This is a deliberately different interaction model from the English sibling `ai-phone-assistant-property-management` (a static ten-card scenario grid: pick one card, read its category) and from the Italian sibling `numero-esistente-assistente-ai-ticino` (a sequential wizard that outputs one personalised action plan). Here, twelve tenant calls appear together in a fixed **arrival order** that is deliberately not priority order. The reader's one interaction is a single "Ordina per priorità" toggle that re-sorts the whole queue — emergency calls jump to the top regardless of when they rang in, urgent calls follow, routine calls settle to the bottom. The mechanic itself demonstrates the article's thesis (arrival order and handling priority are not the same thing, and the system's only real judgement call is sorting fixed categories, never rating danger) instead of just describing it.

## 1. User problem

A property manager reading the article understands, in the abstract, that "the assistant recognises fixed emergency signals and escalates immediately, regardless of tone or order" — but abstract triage rules are hard to trust until seen working under a believable mess of simultaneous calls. In real life, calls do not arrive neatly sorted by seriousness: a dripping tap might ring in before a gas smell, a viewing request before a break-in report. The reader needs to see, concretely, that whatever order calls arrive in, the system's fixed rules still surface the dangerous ones first — without the tool ever pretending to measure or rank how dangerous any one of them "really" is.

## 2. Intended audience

Ticino property managers (amministratori immobiliari, gerenze) and portfolio owners evaluating whether to route tenant calls through an AI phone assistant, plus anyone drafting the escalation rules such a system would run on and wanting to see the arrival-vs-priority distinction demonstrated rather than just asserted.

## 3. Why an interactive artifact is better than a static PDF

A printed table of "call type → category" reads the same regardless of order and never tests whether the reader actually understands *why* order shouldn't matter. The interactive queue does something a static document cannot:
- Starts in an intentionally unsorted, realistic arrival order, so the reader has to notice for themselves that a serious call (the gas-smell report) is sitting in third position, not first — mirroring how a real queue actually looks.
- Makes "sort by priority" a single visible action with a visible before/after, so the reordering itself — not a paragraph explaining it — is the proof that fixed rules beat arrival order.
- Keeps the five fixed emergency triggers permanently visible outside the queue, so the reader can check every emergency call against the same fixed list the system uses, rather than trusting a label.
- Shows the assistant's exact action and the human's exact role for every call, so a reader evaluating a real vendor can compare that vendor's actual behaviour against the pattern shown here.

## 4. Inputs

1. **No text input, no numeric input, no form field of any kind.** This is a demonstration/inspection tool, not a calculator or a form.
2. **"Ordina per priorità" toggle** — a single control that switches the twelve call cards between "Ordine di arrivo" (default, fixed chronological order 1–12) and "Ordine di priorità" (Emergenza → Urgente → Ordinaria, arrival order preserved as the secondary sort key within each group).
3. **Card expand/collapse** — clicking any call card reveals its detail (caller line, category tag, "Cosa fa l'assistente", "Cosa fa la persona", scenario note); clicking again collapses it. No card is expanded by default.
4. **Optional "Mostra tutte le schede aperte" control** — reveals all twelve detail panels at once for readers who want to scan everything in one pass, independent of the arrival/priority toggle.

## 5. Calculation / decision logic

- **No score, no percentage, no risk rating anywhere in the tool.** Every call in `artifact-data.json` already carries a fixed `category` (`routine` / `urgent` / `emergency`); the tool only looks up and displays that fixed value, it never computes or infers one.
- **Sorting logic:** in "Ordine di priorità" mode, sort by category rank (emergency = 0, urgent = 1, routine = 2), then by `arrivalOrder` ascending within each rank. In "Ordine di arrivo" mode, sort purely by `arrivalOrder`. This is the tool's only real computation, and it is a stable sort over fixed, pre-assigned fields — never a judgement about how dangerous a specific call actually is.
- **Emergency framing is fixed, not computed:** for the five emergency calls, rendered copy must always say the assistant **"riconosce"** one of the five fixed signals and **"passa subito la chiamata"** — never that it "decide", "giudica", "valuta" or "stabilisce" how dangerous the situation is. This rule is stated explicitly in the data file's `uiRules.emergencyFraming` and must be honoured for every emergency card.
- **The five-item fixed trigger list (`alwaysEscalateTriggers`) is a separate, permanently visible element**, not something the reader has to open cards to discover.

## 6. Outputs

1. Twelve call cards, each showing at minimum: its label and category tag (Ordinaria / Urgente / Emergenza, always as text, never colour-only) even when collapsed.
2. On expand: the illustrative caller line (clearly marked as constructed, not a transcript), "Cosa fa l'assistente" (`aiAction`), "Cosa fa la persona" (`humanInvolvement`) and the scenario's `note`.
3. The permanently visible five-item emergency-trigger list (`alwaysEscalateTriggers`), shown regardless of sort mode or which cards are expanded.
4. A short, persistent one-line explanation of what "Urgente" means as distinct from both "Ordinaria" and "Emergenza" (the tier readers are most likely to misread as an emergency), sourced from `categories.urgent.description`.
5. When the priority sort is triggered, the reordering should be visually legible (cards moving/re-rendering in their new position), not an instant silent reshuffle — the movement itself is the point being demonstrated.

## 7. Error states

- The tool never has an empty or loading state that matters — all twelve calls and their categories are static, bundled data; there is no network call that can fail.
- No card is expanded by default, so the initial state is a calm, readable list of twelve labelled-but-collapsed cards, not a wall of open text.
- No call is ever allowed to render without a resolved category. If a future call is added to the data file without one, treat that as a content bug to fix before publishing, not a state the UI needs to handle gracefully — the tool must never show an "unclassified" badge.

## 8. Privacy considerations

- Fully client-side; nothing is transmitted to any server. No field anywhere accepts a real tenant name, apartment number, address, or phone number — the tool only displays the twelve fixed example calls and reflects back the sort mode and which cards are expanded.
- No `localStorage`/persistence is required, since there is nothing meaningful to remember between visits; if the build adds it purely for convenience (remembering the sort mode), disclose that in one line with a visible reset control.
- A one-line note near the queue states plainly that all caller lines are constructed illustrations of call types, not recordings or transcripts of any real tenant, building, or vendor system (including Weissmann's).

## 9. Accessibility requirements

- All twelve cards and the sort toggle are fully keyboard-operable, with visible focus states.
- Ordinaria / Urgente / Emergenza are never distinguished by colour alone — every card, collapsed or expanded, shows the text label itself.
- Triggering the priority sort updates the queue inside an `aria-live="polite"` region announcing the new order in plain text (e.g. "Ordinato per priorità: 5 emergenza, 2 urgenti, 5 ordinarie"), so screen-reader users are not left to infer a silent DOM reorder.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` — card reordering happens instantly with no slide/flip animation when reduced motion is requested.
- The five-item emergency-trigger list is marked up as a genuine list (`<ul>`), not styled `<div>`s.

## 10. Mobile behaviour

- Below ~640px, the twelve cards render as a single-column vertical list; each collapsed card is a comfortable tap target (≥44×44px) showing at least the label and category tag.
- The sort toggle is a full-width switch/button pinned near the top, not a small icon control.
- The five-item "sempre in escalation" list stays visible near the top of the page on mobile too — it should not require scrolling past all twelve cards to find.
- Tapping a card expands its detail inline beneath it (accordion-style), not in a separate fixed panel requiring the reader to scroll back up.

## 11. Exact CTA

Primary CTA button, shown persistently below the queue (not gated behind any interaction):

> **"Provate come funzionerebbero davvero le regole di escalation (CHF 350, una tantum)"** → links to `/it/servizi/assistente-telefonico-ai/`

Secondary, lower-emphasis link near the top of the tool:

> "Leggete l'articolo completo sul confine tra amministrazione e giudizio d'emergenza" → links to the article's own academy page (`assistente-ai-amministrazione-immobiliare-ticino`).

No countdown, no fake urgency, no "prima che sia troppo tardi" language. The CTA text and destination never change based on sort mode or which cards are expanded — including when an emergency card is open; this tool must never turn a real hazard into a sales trigger.

## 12. Disclaimer

Include a short, visible note near the queue:

> "Tutte le battute di chi chiama in questo strumento sono esempi costruiti di tipologie di chiamata, non registrazioni o trascrizioni di una vera chiamata di un inquilino, e non un risultato misurato di Weissmann o di qualsiasi altro fornitore. L'instradamento mostrato è un esempio di buon disegno del triage, non la specifica documentata di un prodotto particolare."

This prevents the tool from being mistaken for a real call log or a benchmark of a specific vendor's actual behaviour, and makes clear the routing logic is a design pattern being taught, not a claim about how any one product (including Weissmann's) is configured today.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only for the "Emergenza" category tag — never as a large fill, flashing effect, or full-card background. "Urgente" uses a mid-weight neutral bordered tag (`--ink-soft` text); "Ordinaria" uses the plainest, lowest-emphasis tag. Visual weight escalates from Ordinaria to Urgente to Emergenza through weight/border/label only, never through a traffic-light palette (the site has no green, and no amber/yellow either).
- The sort toggle styled as a confident, simple switch — solid `--ink` (`#111111`) when "Ordine di priorità" is active, neutral/bordered when "Ordine di arrivo" is active. Not accent-red, so the control itself never reads as part of the emergency signalling.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- Call cards: simple bordered cards (`--line: #e5e5e2`, radius 12px), caller line shown in quotes in regular text, not chat-bubble graphics. When the sort mode changes, cards animate to their new position with a brief, calm transition (or reposition instantly under reduced motion) — never a dramatic shuffle effect.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on expanded cards.
- Overall feel: an operator's triage clipboard that reorders itself calmly when asked — procedural and editorial, not a dashboard or an alarm panel, even on the emergency cards. Seriousness comes through in the words ("Emergenza — passaggio immediato a una persona"), never through flashing, red backgrounds, or siren-style visual tricks.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Pannello di triage delle richieste
degli inquilini". It is an Italian-language interactive call-queue tool for
Ticino property managers (amministrazioni immobiliari) evaluating how an AI
phone assistant (any vendor) should triage tenant calls — not a calculator,
not a quiz, not a scorecard, and not a lookup-one-card-at-a-time grid.

CONTEXT
The companion article's thesis: tenant-call triage is really two different
jobs wearing one name. Administrative triage (listening, categorising,
routing, scheduling, logging) is safe to automate completely. Emergency
judgement (deciding how dangerous a situation actually is) must never be
delegated to the AI — the moment a caller's words match a small fixed list
of danger signals (gas smell, active flooding, fire/smoke, break-in, any
danger to a person), the assistant's only job is to recognise the signal and
pass the call to a human immediately, never to assess, weigh, or downgrade
it because the caller sounded calm. This tool makes a second, related point
concrete: calls do not arrive in priority order, so the assistant's fixed
rules — not the order calls happened to ring in — must be what determines
what gets handled first.

THREE FIXED CATEGORIES (use exactly this data; do not invent a fourth
category or a numeric severity score)

1. Ordinaria — coda amministrativa
   Description: Nessuna pressione di tempo. L'assistente ascolta,
   categorizza e instrada o pianifica — lo stesso lavoro di un archivio ben
   tenuto.
   AI role: Gestisce l'intera interazione: raccoglie i dettagli, conferma i
   prossimi passi, registra la richiesta.
   Human role: Rivista secondo la normale pianificazione; nessun intervento
   immediato richiesto.
   Typical response time: Coda standard — primo slot disponibile, nessuna
   scadenza fissa.

2. Urgente — accelerata, ma ancora amministrativa
   Description: Non è un segnale di pericolo, ma lasciarla nella coda
   standard crea un disagio reale. L'assistente non sta comunque giudicando
   il rischio: applica una regola di priorità fissa a una categoria nota.
   AI role: Raccoglie i dettagli, segnala la richiesta come prioritaria e
   avvisa lo stesso giorno la ditta o il custode competente.
   Human role: Interviene entro una finestra breve e definita (di norma lo
   stesso giorno lavorativo) invece che nella coda standard.
   Typical response time: Presa in carico lo stesso giorno o il giorno
   lavorativo successivo.

3. Emergenza — passaggio immediato a una persona
   Description: L'assistente non valuta mai quanto sia realmente pericolosa
   la situazione. Riconoscere uno dei cinque segnali fissi basta da solo: il
   passaggio è immediato e automatico, non un giudizio, e la calma di chi
   chiama non cambia nulla.
   AI role: Non raccoglie prima i soliti dettagli di apertura chiamata.
   Collega subito chi chiama a una persona, oppure fornisce il numero
   d'emergenza diretto se nessuno risponde all'istante. Registra la chiamata
   come segnalata.
   Human role: Valuta il pericolo reale e decide cosa fare — il giudizio di
   sicurezza spetta alla persona, non all'assistente.
   Typical response time: Immediato — minuti, non ore.

PERMANENTLY VISIBLE EMERGENCY TRIGGER LIST (show outside the queue at all
times, in every sort mode — it is the article's core safety claim):
  - Una fuga di gas, o anche solo il sospetto che ce ne sia una
  - Un allagamento in corso o un tubo scoppiato — acqua che si sta ancora
    spargendo, non una perdita lenta
  - Fumo, o qualsiasi segnale di incendio
  - Segni di effrazione, una porta forzata o un'intrusione in corso
  - Qualsiasi pericolo per una persona — un infortunio, o la sicurezza di
    qualcuno a rischio in questo momento

TWELVE CALLS in a fixed ARRIVAL ORDER (1–12, deliberately not sorted by
priority — an emergency call sits at position 3, others are spread through
the list). Use EXACTLY this content — do not invent new caller lines beyond
what's listed, do not fabricate a "measured" outcome, and do not attribute
any call to a real vendor or real tenant:

--- 1. rubinetto-che-gocciola (Ordinaria) ---
Caller line: "C'è un rubinetto in bagno che perde da lunedì, niente di
grave, ma volevo segnalarlo."
AI action: Registra la richiesta, conferma l'appartamento e il punto esatto
del guasto, e la aggiunge alla coda di manutenzione standard.
Human involvement: Rivista secondo la normale pianificazione — nessuna
azione lo stesso giorno.
Note: Una perdita lenta e contenuta è esattamente il tipo di chiamata che un
sistema AI può gestire dall'inizio alla fine senza coinvolgere subito
nessuno.

--- 2. richiesta-visita (Ordinaria) ---
Caller line: "Ho visto l'annuncio per il trilocale in via Nassa: potrei
fissare una visita questa settimana?"
AI action: Verifica gli slot disponibili e prenota direttamente la visita,
oppure propone alternative se questa settimana non ci sono orari liberi.
Human involvement: Nessun intervento necessario, salvo richieste fuori dalla
procedura standard.
Note: Un'azione di prenotazione senza alcuna componente di rischio — il caso
più chiaro di automazione completa.

--- 3. sospetto-fuga-gas (Emergenza) ---
Caller line: "Sento un odore strano vicino ai fornelli, non sono sicura al
cento per cento, forse è la bombola del gas."
AI action: Non chiede il numero dell'appartamento né segue le domande di
prassi. Collega subito chi chiama a una persona, oppure fornisce il numero
d'emergenza diretto se nessuno risponde in pochi secondi. Registra la
chiamata come segnalata.
Human involvement: Una persona valuta la situazione immediatamente — il
giudizio sul pericolo spetta a lei, non viene dedotto dal tono incerto di
chi chiama.
Note: «Non sono sicura al cento per cento» non declassa questa chiamata. Il
segnale è la parola «gas», non la sicurezza di chi parla.

--- 4. lamentela-rumore (Ordinaria) ---
Caller line: "I vicini del piano di sopra fanno festa fino a tardi da tre
weekend di fila, non è la prima volta che chiamo."
AI action: Registra la lamentela, l'appartamento coinvolto e la frequenza
del problema, poi la instrada all'amministrazione per una decisione.
Human involvement: Una persona rivede il caso e decide come intervenire —
non viene risolto durante la chiamata.
Note: Serve un giudizio su chi ha ragione e cosa fare. Il compito
dell'assistente si ferma ad ascoltare bene e archiviare correttamente.

--- 5. ascensore-bloccato (Urgente) ---
Caller line: "L'ascensore del palazzo si è fermato tra il secondo e il
terzo piano, e mia madre di 84 anni non riesce a fare le scale."
AI action: Segnala la richiesta come prioritaria e contatta lo stesso giorno
la ditta di manutenzione ascensori, informando l'inquilino sui tempi
previsti.
Human involvement: Gestita entro la giornata lavorativa — non la coda
standard, ma nemmeno un passaggio d'emergenza.
Note: Nessuno è in pericolo immediato come in caso di fuga di gas, ma
lasciare un'anziana bloccata al piano per giorni è un disagio reale che
merita priorità.

--- 6. richiesta-rendiconto-spese (Ordinaria) ---
Caller line: "Mi serve una copia del rendiconto delle spese accessorie
dell'anno scorso per la dichiarazione fiscale."
AI action: Conferma i dati identificativi già a disposizione e organizza
l'invio del documento.
Human involvement: Inviato tramite la procedura standard per i documenti;
nessuna urgenza collegata.
Note: Pratica amministrativa, non un problema — registrata e instradata
come qualsiasi altra richiesta di documenti.

--- 7. allagamento-attivo (Emergenza) ---
Caller line: "Sta uscendo acqua da sotto il lavello, è già arrivata in
corridoio e continua ad allargarsi."
AI action: Passa subito la chiamata, come nel caso del sospetto di gas —
nessuna domanda diagnostica sul tubo o sul danno prima di collegare una
persona.
Human involvement: Una persona coordina un idraulico d'urgenza e, se
necessario, gli altri appartamenti coinvolti — decisioni che l'assistente
non prende.
Note: La differenza rispetto al rubinetto che perde non è la parola
«acqua» — è «si sta allargando» contro «da lunedì». Entrambe contano per
l'instradamento corretto, ma solo una richiede il passaggio immediato.

--- 8. chiave-persa (Ordinaria) ---
Caller line: "Ho perso le chiavi di casa da qualche parte tra l'ufficio e
la fermata del bus, come faccio per un duplicato?"
AI action: Registra la richiesta e spiega la procedura standard di
sostituzione o di chiave di riserva.
Human involvement: Gestita tramite la procedura normale; nessuna azione
immediata necessaria.
Note: Una chiave persa durante l'orario normale è una pratica, non
un'emergenza. Cambierebbe categoria solo se chi chiama fosse bloccato fuori
casa in quel momento, senza alternative.

--- 9. niente-riscaldamento (Urgente) ---
Caller line: "Il riscaldamento non funziona da ieri sera, e stanotte a
Bellinzona si scende sotto zero."
AI action: Registra la richiesta come prioritaria, avvisa lo stesso giorno
la ditta di riscaldamento e comunica all'inquilino quando aspettarsi un
contatto.
Human involvement: Gestita entro la giornata lavorativa — non la coda
standard, ma nemmeno un trasferimento d'emergenza.
Note: Nessuno è in pericolo come nel caso di una fuga di gas, ma una casa
fredda per giorni è un disagio reale. Viene accelerata, non promossa a
emergenza.

--- 10. segni-effrazione (Emergenza) ---
Caller line: "La porta di casa sembra forzata, la serratura è rotta, non
sono ancora entrata."
AI action: Passa subito la chiamata e, a seconda della configurazione,
consiglia a chi chiama di non entrare nell'appartamento mentre la collega a
una persona o alla polizia.
Human involvement: Una persona, ed eventualmente la polizia, gestiscono la
situazione per intero — ben oltre ciò che un sistema amministrativo dovrebbe
tentare di fare.
Note: L'incertezza di chi chiama («non sono ancora entrata») è proprio il
motivo per cui questo caso non può restare in uno script: va subito a una
persona.

--- 11. fumo-o-incendio (Emergenza) ---
Caller line: "C'è del fumo che esce dal vano scale al primo piano, non
capisco da dove arrivi."
AI action: Passa subito la chiamata e, se nessuno risponde all'istante,
dice a chi chiama di contattare direttamente i pompieri invece di restare
in attesa.
Human involvement: I servizi d'emergenza e l'amministrazione decidono i
passi successivi — non l'assistente.
Note: Qui la velocità conta più della procedura interna. L'assistente non
cerca di far passare la chiamata prima attraverso il normale percorso di
escalation.

--- 12. pericolo-per-persona (Emergenza) ---
Caller line: "Mio padre non risponde al citofono né al telefono da
stamattina, di solito è sempre in casa a quest'ora."
AI action: Passa subito la chiamata a una persona invece di raccogliere
ulteriori dettagli anagrafici come farebbe per una richiesta ordinaria.
Human involvement: Una persona valuta la situazione e decide se contattare
un familiare, il custode o i servizi d'emergenza — una decisione che resta
umana dall'inizio alla fine.
Note: Non c'è una singola parola-chiave qui come «gas» o «fumo» — c'è la
preoccupazione per la sicurezza di una persona, ed è esattamente per questo
che rientra comunque nell'elenco dei cinque segnali fissi.

UI / INTERACTION
- Default view: all twelve call cards collapsed, in arrival order (1–12 as
  listed above), each showing its label and category tag (text, never
  colour-only).
- A single prominent toggle/button: "Ordina per priorità" / "Ordina per
  arrivo". Priority mode sorts Emergenza first, then Urgente, then
  Ordinaria; within each group, preserve the original 1–12 arrival order as
  the secondary sort. Reordering should be visually legible (cards moving to
  their new position with a brief calm transition, or repositioning
  instantly if prefers-reduced-motion is set) — not an invisible silent
  reshuffle.
- Clicking a card expands it inline (accordion) to show: the caller line in
  quotes (labelled as an illustrative example, not a transcript), the
  category tag with its one-line description, "Cosa fa l'assistente," "Cosa
  fa la persona," and the scenario's note. Clicking again collapses it. No
  card expanded by default. An optional "Mostra tutte le schede aperte"
  control expands all twelve at once.
- The five-item emergency trigger list renders permanently, outside and
  above the queue, visible in both sort modes and regardless of which cards
  are expanded.
- For every Emergenza card, the rendered copy must say the assistant
  "riconosce" the signal and "passa subito la chiamata" — never that it
  "decide," "giudica," "valuta," or "stabilisce" that the call is dangerous.
  That distinction is the whole point of the tool and must not be softened
  by convenient UI copy.
- Announce sort changes via an aria-live="polite" region with a plain-text
  summary (e.g. "Ordinato per priorità: 5 emergenza, 2 urgenti, 5
  ordinarie").

DISCLAIMER (always visible near the queue, not collapsible away)
"Tutte le battute di chi chiama in questo strumento sono esempi costruiti di
tipologie di chiamata, non registrazioni o trascrizioni di una vera
chiamata di un inquilino, e non un risultato misurato di Weissmann o di
qualsiasi altro fornitore. L'instradamento mostrato è un esempio di buon
disegno del triage, non la specifica documentata di un prodotto
particolare."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No input field anywhere asks for a real tenant name,
address, apartment number, or phone number — the tool only displays the
twelve fixed example calls and reflects back the sort mode and which cards
are expanded.

CTA
Primary button, always visible below the queue (not gated behind any
interaction):
  Label: "Provate come funzionerebbero davvero le regole di escalation
  (CHF 350, una tantum)"
  Link: https://www.weissmann.ai/it/servizi/assistente-telefonico-ai/
Secondary lower-emphasis link near the top: "Leggete l'articolo completo sul
confine tra amministrazione e giudizio d'emergenza" (link to the article
page).
Do not use countdowns, fake urgency, or "prima che sia troppo tardi"
phrasing. Do not change the CTA wording or destination based on sort mode or
which cards are expanded — including when an emergency card is open; a real
hazard must never become a sales trigger.

VISUAL STYLE — match this exactly (Swiss, editorial, calm and procedural
even on the emergency cards — an operator's clipboard that reorders itself
calmly, not a dashboard or an alarm panel):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "Emergenza" category tag,
    always paired with the word "Emergenza," never as a large fill, flashing
    effect, or full-card red background. No siren styling.
  "Urgente" tag: neutral bordered style with #3d3d3b text — visually between
    Ordinaria (plainest, lowest emphasis) and Emergenza (red text label) in
    weight, not in a traffic-light hue. Do NOT use green or yellow/amber
    anywhere; the Weissmann palette has neither.
  Sort toggle: solid #111111 background with white text when "Ordine di
    priorità" is active; neutral bordered style when "Ordine di arrivo" is
    active. Never accent-red.
  Primary CTA button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on expanded cards:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Layout: single-column card list on both desktop and mobile (a queue reads
  naturally as a vertical list; do not force it into a grid), full-width
  sort toggle pinned near the top.

ACCESSIBILITY
Full keyboard operability for every card and the sort toggle; visible focus
states; aria-live="polite" region announcing sort changes in plain text;
4.5:1 minimum contrast; respect prefers-reduced-motion (cards reposition
instantly, no slide/flip animation, when reduced motion is requested); the
five-item emergency trigger list marked up as a real <ul>, not styled divs;
category always shown as a text label, never colour alone.

LANGUAGE
All UI copy in Italian. Do not add German, English or French translations —
this tool exists only in Italian.

Do not fabricate or imply that any call shows a real recorded call from
Weissmann or any named competitor. Every caller line must read clearly as a
constructed illustration of a call type, and every emergency call's copy
must frame the assistant as recognising a fixed signal and passing the call
on immediately — never as judging or assessing danger itself.
```
