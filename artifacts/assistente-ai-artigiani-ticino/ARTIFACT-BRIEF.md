# Artifact Brief — Qualificatore di richieste e preventivi

**Article:** `assistente-ai-artigiani-ticino` (IT-PHONE-09) — "Assistente telefonico AI per artigiani: distinguere un buon lavoro da una chiamata che fa perdere mezza giornata"
**Language:** Italian (it) — article and artifact both Italian-only.
**Artifact type:** Live request-qualification builder/scorer, covering four named trades (idraulico, elettricista, installatore di riscaldamento/climatizzazione, ditta di ristrutturazione). Deliberately a different mechanic from the closest English-language conceptual sibling `ai-answering-service-swiss-trades` (Home-Service Call Qualification Flow Builder): that tool audits the reader's own *existing script* in the abstract, produces no numeric score by design, and its "suggested flow" is a static reference list unaffected by the reader's answers. This tool instead walks through **one real, specific incoming request**, category by category, computes a live numeric readiness score and tier, and **builds** a ready-to-read qualification card for that exact call — an ordered checklist with completed items checked off, the precise next question to ask for every gap, and a fixed quote-expectation line. It produces a usable artefact for a specific job, not a diagnosis of a script in general.

---

## 1. User problem

An office worker, dispatcher or the owner themselves at a small Ticino trades business (idraulico, elettricista, installatore, or ditta di ristrutturazione) is on the phone or has just hung up with a new customer, and needs a fast, reliable way to check: is this request actually ready to be booked and assigned to a technician, or is something still missing that will cause a wasted trip, a double booking, or a technician arriving without the right tools? The article explains, in prose, which six questions matter and shows what a bad script looks like next to a good one — but reading that once does not help with the call that is happening right now, for this specific trade, with these specific gaps. The reader needs to plug in what they currently know about *this* request and get back both a clear verdict (ready or not) and the exact next question to close every gap, in language that matches their trade.

## 2. Intended audience

Office staff, dispatchers and owner-operators of small Ticino trades businesses (idraulico, elettricista, installatore di riscaldamento/climatizzazione, ditta di ristrutturazione) with more than one technician — using the tool either live, while qualifying a real incoming request, or beforehand, to rehearse the flow for their trade and see what a fully qualified request looks like.

## 3. Why an interactive artifact beats a static PDF

A printed six-question checklist is generic until it is applied to one real request for one specific trade, and a PDF cannot compute anything. This tool:
- Lets the reader pick their own trade — the exact urgency signal, job-type phrasing and access nuance differ meaningfully between an idraulico, an elettricista, an installatore and a ditta di ristrutturazione, all four explicitly covered with their own question set (not one generic "trades" script reused four times).
- Turns six honest three-state answers about *this specific call* into a live numeric score and a plain-language verdict — "pronta per essere fissata", "da completare prima di fissare" or "rischio alto" — something a static list cannot do.
- **Builds** the actual deliverable: a ready-to-read qualification card combining what is already confirmed with the exact follow-up question for every remaining gap, ending with the article's quote-expectation line — the reader leaves with something to say or write down immediately, not just a score.
- Reacts to the reader's own input in real time as they mark each category, so office staff can use it mid-call rather than only as a training exercise.

## 4. Inputs

1. **Trade selector** — four buttons: "Idraulico", "Elettricista", "Installatore (riscaldamento e climatizzazione)", "Ditta di ristrutturazione". Exactly one active at a time; none selected by default (empty state prompts a choice). Data structure is built so a fifth trade could be added later without changing the mechanic, but only these four are populated now — do not invent a fifth.
2. **Six-row live checklist for the selected request**, one row per category (Zona/CAP, Tipo di lavoro, Urgenza, Foto, Accesso, Fascia oraria), each row a three-button group (not a dropdown, so all states stay visible):
   - "Non chiesta"
   - "Chiesta, ma vaga"
   - "Chiesta in modo specifico"
   No row has a default selection; an unmarked row is visually distinct from "chiesta in modo specifico" (never default-assume the best case).
3. No free-text or personal-data fields anywhere — the tool never asks for a real customer's name, address or phone number, only the three-state status of each category for the call being qualified.

## 5. Calculation / decision logic

- **Score:** each category contributes points by its marked state — "Chiesta in modo specifico" = 1, "Chiesta, ma vaga" = 0.5, "Non chiesta" = 0 — summed across the six categories marked so far (0–6, half points allowed). Unmarked rows do not contribute and do not count as zero for display purposes until the reader has touched at least one row (see §7 empty state).
- **Tier lookup:** the summed score maps to one of three fixed tiers pulled from `artifact-data.json` → `scoreTiers`: "Pronta per essere fissata" (5.5–6), "Da completare prima di fissare" (3–5), "Rischio alto: possibile mezza giornata persa" (0–2.5). No tier is invented at build time; use the fixed thresholds exactly as given.
- **Built-flow assembly:** for every category, render one line in the fixed `categoryOrder` (Zona → Tipo di lavoro → Urgenza → Foto → Accesso → Fascia oraria): if marked "Chiesta in modo specifico", show it as completed (a check, not a colour alone) with no further text; if "Non chiesta" or "Chiesta, ma vaga", show the trade's exact `question` text as "la domanda da fare adesso" plus its `riskNote`, pulled from `artifact-data.json` for the selected trade and category. This assembly re-renders live as the reader changes any row.
- **Fixed closing line:** the built flow always ends with the `quoteExpectationLine` from `artifact-data.json`, unconditionally — regardless of score or tier, because setting quote expectations is not optional and does not depend on how well-qualified the rest of the call is.
- **Trade switch resets all six rows and the score** — a plumber's in-progress qualification does not carry over as if it described an electrician's call — with a brief plain-text notice that it reset, not a silent wipe.

## 6. Outputs

1. **Score + tier banner** — the running numeric score (e.g. "4 / 6") and its plain-language tier label and one-line description, updating live as rows are marked. Rendered only once at least one row has been touched (see §7).
2. **Qualification card ("il flusso costruito per questa chiamata")** — the assembled ordered checklist described in §5: completed items marked done, outstanding items showing the exact next question plus its risk note, and the fixed quote-expectation line at the end. Designed to be read aloud or copied into a booking note as-is.
3. A short, persistent link back to the article's "Cosa significa davvero «caos operativo»" section, so the tool never has to re-explain why the six categories matter.

## 7. Error states

- No trade selected → checklist, score banner and qualification card stay empty with a plain prompt ("Scegliete un mestiere per iniziare.") — a calm empty state, not an error banner.
- Trade selected but no row marked yet → score banner shows a neutral prompt ("Segnate almeno una categoria per vedere il punteggio.") instead of a false "0 / 6" that would read as an automatic failing grade.
- All six rows marked "Chiesta in modo specifico" → score banner shows "6 / 6 — Pronta per essere fissata" and the qualification card shows all six items completed, followed only by the fixed quote-expectation line — no other outstanding items invented to fill space.
- JavaScript disabled / interactive layer fails to load → the underlying HTML still lists the full six-category question set and the fixed quote-expectation line for all four trades in a static, readable order (progressive enhancement, not a blank page).

## 8. Privacy considerations

- Fully client-side; nothing is transmitted to any server. No field anywhere asks for a real customer's name, address, phone number or the actual content of the job — only the three-state status of six fixed categories for whichever call the reader is qualifying.
- Selections may be kept in the browser session only for convenience (no requirement to persist across visits); if the build stores them locally, disclose that in one line with a visible reset control.
- A one-line note states that the tool reflects the reader's own live input about a specific call, not a recording, transcript or independent audit — consistent with `disclaimerText` in `artifact-data.json`.

## 9. Accessibility requirements

- Trade buttons and the three-state row controls fully keyboard-operable (tab order and arrow keys within a row group), with visible focus states.
- The three states are always shown as text labels, never colour- or icon-only; the accent colour may highlight "Non chiesta" but the word itself is always present. No green anywhere in the palette.
- Score banner and qualification-card updates appear in an `aria-live="polite"` region so screen-reader users hear the live score and card change without re-navigating.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` — the card and score update instantly, no slide/fade animation, when reduced motion is requested.
- The six-row checklist and the qualification card are marked up as genuine list structures (not bare `<div>`s) so screen readers can navigate item by item.

## 10. Mobile behaviour

- Below ~640px, the four trade buttons stack as two rows of two full-width buttons (not a dropdown), so all four stay visible and reachable by thumb.
- Each checklist row stacks its category label above its three-state button group, with each button sized for touch (≥44×44px) and full width within the row.
- The score banner sits directly above the qualification card, both full-width and stacked (never side by side on mobile).
- The secondary "read the full article" link stays visible but visually secondary (smaller, lower-emphasis) below the primary CTA.

## 11. Exact CTA

Primary CTA button, shown persistently below the tool (not gated behind completing the checklist):

> **"Provate l'assistente su una chiamata vera del vostro mestiere (CHF 350, una tantum)"** → links to `/it/servizi/assistente-telefonico-ai/`

Secondary, lower-emphasis link near the top of the tool:

> "Leggi l'articolo completo: le sei domande e il caos operativo" → links to the article's own URL (`/it/ai-academy/agenti-automazione/assistente-ai-artigiani-ticino/`).

No countdown, no fake urgency, no "prima che sia troppo tardi" language. The CTA text and destination never change based on the selected trade or the checklist state.

## 12. Disclaimer

Include the exact text from `artifact-data.json` → `disclaimerText`, visible near the trade selector (not collapsible away):

> "Questo strumento vi aiuta a costruire e valutare la qualificazione di una singola richiesta, mestiere per mestiere, in base alle risposte che inserite voi — non registra, non trascrive e non verifica in modo indipendente alcuna chiamata reale, e non è una garanzia di come si comporti realmente il sistema di un fornitore specifico, Weissmann incluso. Le note di rischio descrivono conseguenze operative illustrative di un'informazione mancante o vaga, non un risultato misurato. Il punteggio è una guida pratica, non un giudizio sul cliente né sul tecnico."

This keeps the score from being read as a certification of any vendor's real system behaviour, and keeps it from being read as a judgement of the caller.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only for the "Non chiesta" state indicator and the "Rischio alto" tier label/border — always paired with the text itself, never a colour-only signal, never a large fill. "Chiesta in modo specifico" uses `--ink` (near-black) with a simple check glyph. "Chiesta, ma vaga" uses a muted `--ink-mute` tone with the word itself doing the work. No green anywhere in the palette, including for the "Pronta per essere fissata" tier — use confident near-black with a check glyph, not a green success colour.
- Score banner rendered as a simple bordered strip (not a gauge, dial or progress bar with false precision) showing the number, the tier label and the one-line description.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- Checklist rows and the qualification card rendered as simple bordered rows/cards (thin 1px borders, `--line: #e5e5e2`), corner radius `10px`/`14px`, soft shadow (`--shadow`) only on the qualification-card panel — editorial and calm, not a gamified quiz or a dashboard with meters.
- Typography: `'Instrument Sans'` with system-sans-serif fallback.
- Overall feel: a dispatcher's working card that happens to calculate itself — not a chat-app mockup, not a SaaS scorecard with gauges.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Qualificatore di richieste e
preventivi" ("Request and Quote Qualifier"). It is an ITALIAN-LANGUAGE
interactive tool for Ticino trades businesses (idraulici, elettricisti,
installatori di riscaldamento/climatizzazione, ditte di ristrutturazione)
qualifying one real incoming service request — not a self-audit of an
existing script, not a generic checklist. It is a live scorer AND builder:
it computes a numeric readiness score and assembles a ready-to-read
qualification card for the specific call being handled right now.

CONTEXT
The companion article's thesis: for a small trades business with two or
three technicians, a technician's time is sold once — a badly qualified
call (wrong address, misjudged urgency, a double-booked slot) cannot be
recovered the way a larger business absorbs a mistake. Six categories
separate a request that is ready to book from one that risks wasting half
a day: zona/CAP, tipo di lavoro, urgenza, foto, accesso, fascia oraria.
This tool lets office staff pick the trade, mark what is currently known
about ONE specific request for each of the six categories (not asked /
asked vaguely / asked specifically), and see two live outputs: a numeric
readiness score with a plain-language verdict, and a built qualification
card listing what is confirmed, the exact next question for every gap,
and a fixed reminder about how to talk about the price.

TRADES (exactly 4 populated now — build the data structure so a fifth
trade could be added later without changing the mechanic, but do not
invent content for any trade beyond these four)

Use EXACTLY this content per trade and category (light rewording for UI
labels is fine; do not invent new categories or new trades). Category
order for every trade: zona, tipo-lavoro, urgenza, foto, accesso,
fascia-oraria.

--- IDRAULICO ---
zona: question "Qual è il CAP, o la via e il comune?"
  riskNote "Un tecnico può partire verso l'indirizzo prima che sia
    confermato se rientra nella zona di intervento, con il rischio di
    scoprirlo solo a metà strada."
tipo-lavoro: question "Cosa sta succedendo, e dove — rubinetto, WC,
    boiler, tubo, scarico?"
  riskNote "Il tecnico arriva senza sapere quale attrezzatura caricare, e
    rifà la diagnosi da capo sul posto."
urgenza: question "L'acqua sta ancora uscendo adesso, o si è fermata?"
  riskNote "Due chiamate segnate entrambe «urgenti» solo dal tono vengono
    trattate allo stesso modo, e un lavoro ordinario può prendere lo slot
    libero prima di una perdita ancora attiva."
foto: question "Potete mandare una foto o un breve video del problema a
    questo numero?"
  riskNote "Il tecnico vede il problema per la prima volta sul posto, dopo
    aver caricato il furgone tirando a indovinare i pezzi necessari."
accesso: question "C'è qualcosa da sapere per entrare — codice, chiavi,
    parcheggio, un cane?"
  riskNote "Il tecnico arriva puntuale e perde quindici-venti minuti alla
    porta, a scapito dello slot del cliente successivo."
fascia-oraria: question "Quando siete davvero disponibili, e ci sarà
    qualcuno all'indirizzo?"
  riskNote "Uno slot viene promesso senza controllare se un tecnico è
    davvero libero, e l'ufficio deve poi richiamare per correggere la
    promessa."

--- ELETTRICISTA ---
zona: question "Qual è il CAP, o la via e il comune?"
  riskNote "Lo stesso nome di via ricompare in più comuni ticinesi: senza
    conferma, il tecnico può dirigersi verso il paese sbagliato."
tipo-lavoro: question "Cosa esattamente non funziona, e dove — una presa,
    un intero circuito, un punto luce, il quadro?"
  riskNote "Il tecnico non sa se si tratta di una sostituzione da cinque
    minuti o di un intervento sul quadro, e arriva senza la strumentazione
    giusta."
urgenza: question "Si sente odore di bruciato o si vedono scintille, è
    saltata completamente la corrente, oppure è solo un interruttore o una
    presa che non funziona?"
  riskNote "Una luce che sfarfalla e una presa bruciata finiscono nella
    stessa categoria «problema elettrico», e quella davvero pericolosa
    aspetta dietro quella estetica."
foto: question "Potete mandare una foto della presa, dell'interruttore o
    del quadro in questione?"
  riskNote "Segni di bruciatura, plastica fusa o un interruttore che non
    si riarma restano invisibili al telefono, e cambiano cosa andrebbe
    trattato come urgente."
accesso: question "C'è qualcosa da sapere per entrare, o dove si trova
    esattamente il quadro elettrico?"
  riskNote "Il tecnico entra nell'edificio ma perde tempo a cercare il
    quadro — un tempo mai calcolato nello slot assegnato."
fascia-oraria: question "Quando siete davvero disponibili, e ci sarà
    qualcuno all'indirizzo?"
  riskNote "Uno slot viene promesso senza controllare la disponibilità
    reale, e l'ufficio deve poi richiamare per correggere la promessa."

--- INSTALLATORE (riscaldamento e climatizzazione) ---
zona: question "Qual è il CAP, o la via e il comune?"
  riskNote "Confermarlo prima di tutto evita di scoprire, a tecnico già
    partito, che l'indirizzo è fuori dalla zona coperta."
tipo-lavoro: question "Si tratta di caldaia, pompa di calore,
    climatizzatore o un altro impianto — e cosa fa esattamente di
    strano?"
  riskNote "Il tecnico non sa quale ricambio portare tra i diversi modelli
    e marche installati in zona, e deve tornare una seconda volta."
urgenza: question "L'impianto è completamente fermo, oppure funziona ma in
    modo ridotto o rumoroso?"
  riskNote "Un impianto fermo in pieno inverno e uno che fa solo rumore
    finiscono nella stessa lista d'attesa, invece che in due priorità
    diverse."
foto: question "Potete mandare una foto della targhetta dell'apparecchio
    e, se possibile, un breve video del rumore o della spia accesa?"
  riskNote "Il tecnico scopre il modello esatto solo sul posto, dopo aver
    caricato il furgone con il pezzo sbagliato."
accesso: question "C'è qualcosa da sapere per accedere alla caldaia o
    all'unità esterna — cantina chiusa, tetto, codice?"
  riskNote "Il tecnico arriva ma non riesce a raggiungere l'unità, e il
    tempo per risolvere l'accesso non era previsto nello slot."
fascia-oraria: question "Quando siete davvero disponibili, e ci sarà
    qualcuno all'indirizzo?"
  riskNote "Uno slot viene promesso senza controllare la disponibilità
    reale, e l'ufficio deve poi richiamare per correggere la promessa."

--- DITTA DI RISTRUTTURAZIONE ---
zona: question "Qual è il CAP, o la via e il comune del cantiere?"
  riskNote "Un sopralluogo può essere fissato prima di sapere se il
    cantiere rientra nella zona che l'impresa copre davvero."
tipo-lavoro: question "Che tipo di intervento — sopralluogo, preventivo,
    lavoro già concordato — e su quale parte dell'immobile?"
  riskNote "Un sopralluogo di venti minuti e un intervento di più giorni
    vengono trattati come la stessa voce in agenda, e la giornata del
    tecnico salta."
urgenza: question "È un problema che blocca un cantiere già in corso,
    oppure una richiesta di preventivo senza scadenza urgente?"
  riskNote "Una richiesta di preventivo tranquilla e un blocco di cantiere
    reale vengono trattati allo stesso modo, e il vero blocco aspetta più
    del dovuto."
foto: question "Potete mandare qualche foto dell'ambiente o del cantiere,
    così il tecnico arriva già con un'idea del lavoro?"
  riskNote "Il primo sopralluogo diventa una sorpresa anche per il
    tecnico, e serve una seconda visita solo per capire la portata del
    lavoro."
accesso: question "Chi consegna le chiavi o il codice, e il cantiere è già
    aperto o va coordinato con un'altra impresa presente?"
  riskNote "Il tecnico arriva puntuale e aspetta chiavi che nessuno ha
    pensato di consegnargli."
fascia-oraria: question "Quando siete davvero disponibili per il
    sopralluogo o l'intervento?"
  riskNote "Una fascia viene promessa senza controllare l'agenda reale, e
    l'ufficio deve poi richiamare per correggere la promessa."

SCORING
Each category state contributes: "Chiesta in modo specifico" = 1 point,
"Chiesta, ma vaga" = 0.5 point, "Non chiesta" = 0 points. Sum the six
categories (0–6, half points allowed). Map the sum to exactly these three
tiers, no others:
  5.5–6   → "Pronta per essere fissata" — "Le informazioni raccolte
            bastano per fissare l'intervento e assegnarlo al tecnico
            giusto senza dover richiamare per completare qualcosa."
  3–5     → "Da completare prima di fissare" — "Manca almeno un elemento
            decisivo. Fissare adesso significa probabilmente dover
            richiamare più tardi, o scoprire il problema a intervento già
            avviato."
  0–2.5   → "Rischio alto: possibile mezza giornata persa" — "Troppe
            informazioni mancano o sono vaghe. Fissare adesso rischia di
            produrre esattamente il tipo di giornata descritta
            nell'articolo — indirizzo sbagliato, urgenza mal classificata
            o tempo del tecnico sprecato."
Do not render any score until at least one of the six rows has been
marked (see EMPTY STATES below).

QUALIFICATION CARD (the "built flow")
Render the six categories in fixed order (zona, tipo-lavoro, urgenza,
foto, accesso, fascia-oraria). For each:
  - If marked "Chiesta in modo specifico": show as done with a check
    glyph, category label only, no further text.
  - If marked "Chiesta, ma vaga" or "Non chiesta" (or unmarked): show the
    category label, the exact trade-specific "question" text as "La
    domanda da fare adesso", and the exact "riskNote" text beneath it.
This card re-renders live as any row changes. ALWAYS end the card with
this fixed line, regardless of score or which rows are marked:
  "Ricordate al cliente: il prezzo finale dipende da quello che il
  tecnico trova sul posto. Potete indicare una fascia indicativa solo se
  l'azienda ne ha già concordata una per gli interventi standard — mai
  una cifra esatta al telefono."

UI / INTERACTION
- Trade selector: 4 buttons ("Idraulico", "Elettricista", "Installatore
  (riscaldamento e climatizzazione)", "Ditta di ristrutturazione"), none
  selected by default. Selecting one loads its six-row checklist and
  clears any previous trade's checklist state and score, with a brief
  plain-text notice that it reset (not a silent wipe).
- Six-row checklist, one row per category, fixed order. Each row: category
  label, then a three-button group ("Non chiesta" / "Chiesta, ma vaga" /
  "Chiesta in modo specifico"), no default selection, one active state
  per row.
- Score banner: shows "X / 6" and the tier label + description once at
  least one row is marked; before that, shows a neutral prompt ("Segnate
  almeno una categoria per vedere il punteggio.") — never a bare "0 / 6"
  before any input.
- Qualification card: always visible once a trade is selected, updates
  live per the rules above.
- Persistent secondary link near the top: "Leggi l'articolo completo: le
  sei domande e il caos operativo" (link to the article page).

EMPTY STATES
- No trade selected: checklist, score banner and qualification card all
  show a calm prompt ("Scegliete un mestiere per iniziare.").
- Trade selected, no row marked: score banner shows the neutral prompt
  above; qualification card shows all six rows as "not yet marked", each
  with its question and risk note (since nothing has been confirmed yet).
- All six rows marked "Chiesta in modo specifico": score banner shows
  "6 / 6 — Pronta per essere fissata"; qualification card shows all six
  items as done, followed only by the fixed quote-expectation line.

DISCLAIMER (always visible near the trade selector, not collapsible away)
"Questo strumento vi aiuta a costruire e valutare la qualificazione di una
singola richiesta, mestiere per mestiere, in base alle risposte che
inserite voi — non registra, non trascrive e non verifica in modo
indipendente alcuna chiamata reale, e non è una garanzia di come si
comporti realmente il sistema di un fornitore specifico, Weissmann
incluso. Le note di rischio descrivono conseguenze operative illustrative
di un'informazione mancante o vaga, non un risultato misurato. Il
punteggio è una guida pratica, non un giudizio sul cliente né sul
tecnico."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No field ever asks for a real customer's name,
address, phone number, or job detail — only the three-state status of six
fixed categories for the call being qualified.

CTA
Primary button, always visible below the tool (not gated behind any
interaction):
  Label: "Provate l'assistente su una chiamata vera del vostro mestiere
    (CHF 350, una tantum)"
  Link: https://www.weissmann.ai/it/servizi/assistente-telefonico-ai/
Secondary lower-emphasis link near the top: "Leggi l'articolo completo: le
sei domande e il caos operativo" (link to the article page).
Do not use countdowns, fake urgency, or "prima che sia troppo tardi"
phrasing. Do not change the CTA wording based on the selected trade or
checklist state.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a dispatcher's
working card that happens to calculate itself, not a gamified quiz or
SaaS dashboard with gauges):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "Non chiesta" state and
    the "Rischio alto" tier label/border, always paired with the text
    itself, never a large fill or the only signal.
  "Chiesta in modo specifico" and the "Pronta per essere fissata" tier:
    near-black (#111111) with a simple check glyph — do NOT use green;
    the site's palette has no green in it, including for a good result.
  "Chiesta, ma vaga": a muted grey tone (#5f5f5f), text label doing the
    work, not colour alone.
  Score banner: a simple bordered strip showing the number and tier text
    — no gauge, dial, or progress-bar-style false precision.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the qualification-card panel:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Layout: trade selector at the top, six-row checklist below, score
    banner and qualification card stacked beneath (side by side on wide
    desktop widths is acceptable, stacked below ~640px).

ACCESSIBILITY
Full keyboard operability for trade buttons and the three-state row
buttons; visible focus states; aria-live="polite" region for the score
banner and qualification-card updates and the trade-switch reset notice;
4.5:1 minimum contrast; respect prefers-reduced-motion (card and score
update instantly, no slide/fade); checklist and qualification card marked
up as real list structures, not bare divs.

LANGUAGE
All UI copy in Italian. Do not add German, English or French
translations — this tool exists only in Italian.

Do not fabricate or imply that any risk note is a measured outcome of a
real call, or a claim about Weissmann's or any named competitor's actual
system behaviour. Every risk note must read as an illustrative consequence
of a missing or vague answer, not a benchmark result. Do not invent a
fifth trade or a seventh category.
```
