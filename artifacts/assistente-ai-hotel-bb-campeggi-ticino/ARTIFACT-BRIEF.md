# Artifact Brief — Concierge multilingue interattivo (Interactive Multilingual Concierge)

**Article:** `assistente-ai-hotel-bb-campeggi-ticino` (IT-PHONE-08) — "Assistente telefonico AI per hotel, B&B e campeggi in Ticino"
**Language:** Italian (it) — article and artifact both Italian-only. Dialogue turns themselves may contain German, French or English lines as content (guests who switch language mid-call), the same way the article's own transcript does — this is not a UI translation, it is the phenomenon the tool demonstrates.
**Artifact type:** Two-step scenario matrix / conversation walkthrough. Distinct mechanic from the English sibling `ai-receptionist-swiss-hotels` artifact (a flat, single-step, five-tab hotel-only simulator): this tool is a **2D picker** — the reader first chooses a property type (Hotel / B&B / Campeggio), then a situation category (arrival, ambiguous request, emergency) — producing 9 addressable scenarios across three genuinely different business realities, not one.

## 1. User problem

A reader of the article understands, in the abstract, that a hotel, a B&B and a campsite need different rules for the same AI phone assistant — but abstract understanding doesn't stick. This tool lets the reader pick their own property type first, then walk the same three situation types (a routine late arrival with a language switch, a request that sounds simple but isn't, and a genuine emergency) and see, concretely, how the assistant's behaviour — and who it hands off to, and how honestly it talks about reachability — changes with the property. Comparing "hotel emergency" against "B&B emergency" against "campsite emergency" side by side makes the article's central claim legible as a rule, not just three isolated anecdotes.

## 2. Intended audience

Ticino hotel managers, B&B owner-operators and campsite managers evaluating an AI phone assistant for their specific property type, plus anyone reading the article who wants to pressure-test a vendor's claim that "it works for any accommodation" before signing a contract.

## 3. Why an interactive artifact beats a static PDF

The article's thesis is that the same situation — a late arrival, an ambiguous request, an emergency — plays out differently depending on who can realistically be reached and when. A static page can show this once per property type at most before becoming unreadable. The interactive matrix lets a B&B owner go straight to "B&B" and ignore the hotel and campsite content entirely, or lets a curious reader flip between all three "emergency" scenarios back to back to see that the escalation principle never changes even though the situation (fire, a fall, a missing child) does. A persistent boundary panel (see Outputs) gives the tool reference value that outlasts a single reading, which a PDF cannot replicate without becoming a second static document.

## 4. Inputs

- **Step 1 — Property type** (required first choice, 3 options, single-select): *Hotel*, *B&B*, *Campeggio*. Each option carries a one-line note (from `propertyTypes[].note`) shown as a hint before the reader even picks a scenario — e.g. the B&B option notes that the person who answers may be unreachable for hours, not minutes.
- **Step 2 — Scenario category** (enabled only after step 1, 3 options, single-select): *Arrivo tardivo e cambio di lingua* (never escalates), *Una richiesta che sembra semplice* (always escalates, non-emergency), *Una situazione che non è mai di routine* (always escalates, emergency — the required safety demonstration).
- No free-text input anywhere — this is a fixed-content walkthrough, not a form, and it produces no score or ranking.

## 5. Calculation / decision logic

- **No score, no ranking, no numeric verdict.** The (propertyType, category) pair selects exactly one of the 9 fixed `scenarios` entries in `artifact-data.json` (id pattern `{propertyType}-{category}`). All dialogue is pre-written; nothing is generated or randomised.
- Each scenario carries `escalates` (boolean) and, when true, an `escalationReason` key resolved via the shared `escalationReasons` lookup — reused across scenarios rather than rewritten per case (e.g. `financial-decision` appears for both the hotel's group-rate request and the B&B's refund request).
- Each dialogue turn may carry a `language` tag (`it`/`de`/`fr`/`en`) and an `annotation` explaining the assistant's behaviour. The UI must visibly tag the language of each turn (small text label, not colour) so a language switch is legible at a glance.
- A separate, always-visible `boundaryReference` array (7 items, mirroring the article's "cosa deve sempre arrivare a una persona" list) powers a persistent panel that does not change based on the current selection.
- The three `emergency` scenarios (`hotel-emergency`, `bb-emergency`, `campeggio-emergency`) are the required safety-critical set: one per property type, each with a different hazard (fire/smoke, a fall/medical situation, a missing child), each ending in immediate, unconditional escalation with no attempt at severity assessment.

## 6. Outputs

1. A turn-by-turn transcript for the selected (property type × category) pair, each turn showing speaker (*Ospite* / *Assistente*), its language tag, the line, and its annotation where present.
2. A clearly labelled **"Passato a una persona"** badge on any scenario where `escalates: true`, naming the specific reason from `escalationReasons` — never left implicit. Non-escalated scenarios show a plain "Gestito direttamente" mark instead.
3. A one-line `outcome` summary beneath the transcript, stating plainly whether the case was resolved by the assistant or handed to a person, and why.
4. A persistent **"Cosa va sempre a una persona"** reference panel (`boundaryReference`), visible regardless of which property type or category is selected.
5. A visible secondary link back to the full article, and the primary CTA (see §11).

## 7. Error states

- No property type selected yet → step 2 stays visibly disabled/greyed out with a plain prompt ("Scegliete prima il tipo di struttura.") — not an error banner.
- Property type selected but no category yet → the transcript panel stays empty with a plain prompt ("Scegliete una situazione per vedere la chiamata completa.").
- JavaScript disabled / artifact fails to load its interactive layer → the underlying HTML still lists all 9 scenarios, grouped by property type, in a static readable order (progressive enhancement, not a blank page).
- All 9 (propertyType, category) combinations are fixed, complete data — there is no reachable combination that produces an undefined or partial state.

## 8. Privacy considerations

- Fully client-side; nothing is transmitted to any server, no analytics, no external scripts or fonts.
- No form field ever collects a real guest name, phone number, licence plate or any personal detail — the tool only displays fixed example dialogue.
- The disclaimer (see §12) is shown near the property-type picker at all times, making clear every scenario is a constructed illustration, not a real recording from any hotel, B&B, campsite or vendor system, including Weissmann's.

## 9. Accessibility requirements

- Both the property-type step and the category step are fully keyboard-operable (arrow keys or tab order), with visible focus states; step 2 is properly disabled (not just visually dimmed) until step 1 has a selection, and this is exposed to assistive tech via `aria-disabled`.
- "Passato a una persona" is never conveyed by colour alone — always paired with the badge text and the specific reason.
- Transcript reveal appears in an `aria-live="polite"` region so screen-reader users hear updates without re-navigating after each selection.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` — no slide/fade animation when reduced motion is requested.
- Each dialogue turn is marked up as a genuine list item (not a bare `<div>`), and the `boundaryReference` panel uses real heading/list markup so it is independently navigable.

## 10. Mobile behaviour

- Property-type step renders as three full-width stacked cards (not a cramped row) below ~640px; category step follows the same pattern once unlocked.
- Transcript stacks in a single column; language tags and escalation badges wrap onto their own line rather than being clipped.
- The `boundaryReference` panel collapses to an expandable/collapsible section below the transcript on mobile (closed by default there, so the transcript stays the primary focus), open by default on desktop widths.

## 11. Exact CTA

Primary CTA, shown persistently below the transcript area (not gated behind viewing all 9 scenarios):

> **"Scoprite come si configura l'assistente telefonico AI per la vostra struttura"** → links to `/it/servizi/assistente-telefonico-ai/`

Secondary, lower-emphasis link near the top of the tool:

> "Leggi l'articolo completo" → links to the article's own Academy page.

No countdown, no fake urgency, no "prima che sia troppo tardi" language. CTA text and destination never change based on which property type or scenario is selected.

## 12. Disclaimer

Visible near the property-type picker at all times:

> "Ogni dialogo di questo strumento è un'illustrazione costruita di buona pratica, non una registrazione o trascrizione reale di un hotel, B&B, campeggio o fornitore, incluso Weissmann. Mostra come dovrebbe comportarsi un buon assistente telefonico AI, non un risultato misurato."

This keeps every emergency scenario clearly framed as a design illustration, never as a claim about what any specific vendor's system has actually done in a real crisis.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`), consistent with the sibling `ai-receptionist-swiss-hotels` artifact for visual continuity across the phone-assistant artifact family, adapted for the two-step picker:

- Background `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text `--ink: #111111` with muted variants for secondary text and the property-type notes.
- Accent colour `--accent: #c51a2e` (Swiss red) used **only** for the "Passato a una persona" badge and the `boundaryReference` panel's item markers — never as a large fill, always paired with the word "Passato" or the reason text. Non-escalated scenarios use `--ink` with a simple check glyph — no green (the site's palette has none).
- Step 1 and step 2 rendered as two clearly separated card rows (not a dropdown) so both the property type and the situation category stay visible as context once selected — the reader should always see "Hotel → Arrivo tardivo" as a visible breadcrumb-like state, not lose track of what they picked.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text) — red is reserved for the escalation signal only.
- Dialogue turns rendered as simple speech-style rows (speaker label in small caps, line in guillemets «…», matching the article's own quoting style), not chat-bubble graphics.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; 1px borders (`--line: #e5e5e2`), corner radius 10px/14px, soft shadow only on the active transcript panel.
- Each turn's language tag (a small "IT" / "DE" / "FR" / "EN" label, not colour-coded) sits next to the speaker label so a mid-call language switch is legible at a glance.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Concierge multilingue interattivo".
It is an ITALIAN-language walkthrough tool for Ticino hotel, B&B and
campsite owners evaluating an AI phone assistant for their property — not
a calculator, not a scorecard, not a ranking tool. All UI copy is in
Italian; some dialogue lines are in German, French or English by design
(guests who switch language mid-call) — do not translate those lines,
they are content, not UI text.

CONTEXT
The companion article's thesis: a hotel, a B&B and a campsite do not lose
the same phone calls, because the person who should answer, how fast they
can, and what the caller is actually asking all change with the property
type. This tool makes that concrete with a two-step picker: choose a
property type, then a situation category, and see the exact call that
results — proving the same three situation types (routine arrival,
ambiguous request, emergency) play out differently across all three
business realities.

STEP 1 — PROPERTY TYPE (3 cards, single-select, required first choice)
- Hotel — note: "Reception a turni: il problema è quasi sempre il volume,
  non l'assenza di personale."
- B&B — note: "Spesso una sola persona gestisce tutto: ogni chiamata
  persa pesa di più, e chi risponde può essere irraggiungibile per ore,
  non minuti."
- Campeggio — note: "Ospiti diversi — famiglie, camper, caravan — e una
  reception aperta solo in certe fasce orarie."

STEP 2 — SITUATION CATEGORY (3 cards, single-select, disabled/greyed out
until step 1 has a selection)
- Arrivo tardivo e cambio di lingua (never escalates)
- Una richiesta che sembra semplice (always escalates, non-emergency)
- Una situazione che non è mai di routine (always escalates, emergency —
  treat this category with extra visual and textual weight across all
  three property types; it is the safety core of the tool)

9 SCENARIOS (exactly one shown per property-type + category combination)

HOTEL — Arrivo tardivo (not escalated)
Setup: 22:30, un ospite in treno verso Lugano avvisa che arriverà tardi.
Ospite (FR): "Bonsoir, je suis dans le train, j'arriverai vers 23h. Est-ce
un problème ?"
Assistente (FR): "Aucun problème. Après 22h, utilisez l'entrée latérale —
le code vous a été envoyé par e-mail. Voulez-vous aussi les indications
pour le garage ?" [annotazione: informazione di routine, già approvata
dalla reception]
Ospite (passa all'italiano): "Sì grazie, e per il parcheggio dell'albergo?"
Assistente (IT): "Il garage sotterraneo è aperto tutta la notte, entrata
a due passi dall'ingresso laterale." [annotazione: l'assistente segue il
cambio di lingua nella stessa risposta, senza chiedere di ripetere]
Esito: risolto interamente dall'assistente, nessuna escalation.

HOTEL — Richiesta ambigua (escalated, non-emergency: financial-decision)
Setup: un gruppo già in hotel chiede di prolungare il soggiorno e ottenere
la tariffa di gruppo anche sulle notti extra.
Ospite: "Volevamo restare altre due notti, e sapere se possiamo avere la
tariffa di gruppo anche su queste, visto che siamo già sei camere."
Assistente: "Prendo nota del prolungamento e della richiesta sulla
tariffa, ma una modifica tariffaria la deve confermare la reception. Giro
subito la richiesta al team, che vi richiama entro un'ora." [annotazione:
richiesta registrata con precisione, decisione lasciata al team]
Esito: escalato — una modifica di tariffa è una decisione commerciale.

HOTEL — Emergenza (escalated, emergency: fire-safety-hazard) — REQUIRED
emergency demonstration for this property type.
Setup: un ospite segnala un odore sospetto al terzo piano.
Ospite: "Sento odore di bruciato al terzo piano, vicino alle scale."
[annotazione: una segnalazione di sicurezza, trattata come tale
indipendentemente dal tono]
Assistente: "Grazie per averlo segnalato subito — sto avvisando il
personale in questo istante. Se percepisce un pericolo reale, chiami
direttamente il 118 e si allontani verso l'uscita di sicurezza."
[annotazione: nessun tentativo di valutare quanto sia serio l'odore]
Esito: escalato immediatamente, senza alcuna valutazione della gravità.

B&B — Arrivo tardivo (not escalated)
Setup: una coppia verso un B&B di Ascona chiama con quaranta minuti di
ritardo.
Ospite (EN): "Hi, we're running about thirty minutes late — is that
alright?"
Assistente (EN): "No problem at all. The key box by the front door opens
with the code from your booking email." [annotazione: informazione di
routine, già approvata dalla proprietaria]
Ospite (il compagno di viaggio prende la linea, IT): "Scusi, possiamo
portare il nostro cane? Non l'avevamo scritto in prenotazione."
Assistente (IT): "Certo, gli animali sono ammessi con un piccolo
supplemento che regolerete all'arrivo — ve lo confermo già ora."
[annotazione: politica della casa nota in anticipo, nessuna escalation]
Esito: risolto interamente dall'assistente.

B&B — Richiesta ambigua (escalated, non-emergency: financial-decision)
Setup: un ospite che prenota di nuovo chiede un rimborso parziale per una
notte cancellata l'anno scorso per motivi di salute.
Ospite: "L'anno scorso avevamo dovuto annullare una notte per un problema
di salute — potremmo avere un rimborso parziale ora che prenotiamo di
nuovo?"
Assistente: "Capisco la richiesta, ma un rimborso legato a una
prenotazione passata lo deve valutare la proprietaria di persona. Prendo
nota e gliela giro; in questo momento è fuori per la spesa, ma vi
richiamerà lei stessa entro sera." [annotazione: onestà sul fatto che la
proprietaria non è raggiungibile ora, invece di promettere una risposta
immediata]
Esito: escalato — in un B&B la persona che decide spesso non è
raggiungibile all'istante.

B&B — Emergenza (escalated, emergency: medical-emergency) — REQUIRED
emergency demonstration for this property type.
Setup: un ospite chiama dal giardino: un familiare è caduto sulle scale.
Ospite: "Mia madre è caduta sulle scale del giardino, non riesce ad
alzarsi bene." [annotazione: un problema medico, non una domanda di
servizio clienti]
Assistente: "Vi metto subito in contatto con la proprietaria. Se
sospettate una frattura o qualcosa di serio, chiamate ora stesso il 144 —
non aspettate che la proprietaria arrivi." [annotazione: nessuna
valutazione della gravità; l'assistente indica anche il numero di
emergenza direttamente, senza aspettare che l'unica persona raggiungibile
sia libera]
Esito: escalato immediatamente.

CAMPEGGIO — Arrivo tardivo (not escalated)
Setup: una famiglia in camper arriva dopo la chiusura della reception.
Ospite (DE): "Guten Abend, wir kommen erst gegen 23 Uhr an — funktioniert
die Schranke dann noch?"
Assistente (DE): "Kein Problem. Nach 22 Uhr öffnet sich die Schranke mit
dem Code aus Ihrer Buchungsbestätigung, direkt bei der Einfahrt."
[annotazione: procedura reale del campeggio per un arrivo fuori orario]
Ospite (un secondo viaggiatore prende la linea, IT): "Scusi, e per il
cane? Lo portiamo con noi."
Assistente (IT): "Nessun problema, la vostra piazzola per famiglie con
animali è già segnata in prenotazione, vicino ai servizi sud."
[annotazione: domanda tipica di un campeggio, gestita direttamente]
Esito: risolto interamente dall'assistente.

CAMPEGGIO — Richiesta ambigua (escalated, non-emergency:
availability-not-confirmed)
Setup: un ospite già sulla piazzola chiede di passare a una piazzola con
allacciamento elettrico per le prossime notti.
Ospite: "Potremmo cambiare dalla piazzola tenda a una con allacciamento
elettrico per le prossime tre notti?"
Assistente: "Prendo nota della richiesta, ma la disponibilità reale della
nuova piazzola la deve confermare la reception — il sistema che vedo io
potrebbe non essere aggiornato in tempo reale. Ve lo confermano entro
questa sera." [annotazione: disponibilità trattata come provvisoria, non
come conferma definitiva]
Esito: escalato — senza un collegamento aggiornato al sistema di
prenotazione, la disponibilità non è mai confermata come definitiva al
telefono.

CAMPEGGIO — Emergenza (escalated, emergency: missing-child) — REQUIRED
emergency demonstration for this property type, and the safety core of
the entire tool: treat with maximum visual and textual weight.
Setup: un genitore chiama in stato di agitazione dall'area piscina.
Ospite: "Non troviamo più nostro figlio, eravamo vicino alla piscina."
[annotazione: una situazione che coinvolge un minore non è mai una
domanda di routine, qualunque sia il tono]
Assistente: "Vi metto in contatto immediato con il personale del
campeggio, che avvisa subito tutta la struttura. Se non lo trovate nei
prossimi minuti, chiamate anche il 117 — non aspettate oltre per farlo."
[annotazione: nessun tentativo di calmare o di valutare la situazione da
sola: instradamento immediato, senza ritardo]
Esito: escalato immediatamente, senza alcun tentativo di triage.

ESCALATION BADGE
Any scenario with escalates=true shows a persistent, clearly labelled
badge ("Passato a una persona") plus the specific one-line reason from
the escalationReasons map — never colour alone, always paired with text.
Use the accent red (#c51a2e) only for this badge and nowhere else as a
large fill. Non-escalated scenarios show a simple black check mark with
the words "Gestito direttamente" — do not use green anywhere.

PERSISTENT REFERENCE PANEL ("Cosa va sempre a una persona")
Below or beside the transcript (collapsible on mobile, open by default on
desktop), show these 7 fixed items regardless of which property type or
category is selected:
1. Emergenze mediche — al personale e, se necessario, al 144; mai
   valutate dall'assistente.
2. Incendio, fumo o pericolo — a chi gestisce la struttura e, se
   necessario, al 118.
3. Incidenti di sicurezza — un'intrusione, un furto o un ospite che non
   si sente sicuro, sempre e subito a una persona.
4. Situazioni che coinvolgono un minore — particolarmente rilevanti in un
   campeggio con piscina o accesso al lago, mai una domanda di routine.
5. Rimborsi, cancellazioni e tariffe — registrati con precisione, decisi
   da chi ha l'autorità sulla struttura.
6. Una richiesta diretta di parlare con una persona — fa scattare subito
   il passaggio di consegne.
7. Tutto ciò che esce dalle regole approvate — l'assistente lo dice
   chiaramente invece di improvvisare.

DISCLAIMER (always visible near the property-type picker, not collapsible
away)
"Ogni dialogo di questo strumento è un'illustrazione costruita di buona
pratica, non una registrazione o trascrizione reale di un hotel, B&B,
campeggio o fornitore, incluso Weissmann. Mostra come dovrebbe comportarsi
un buon assistente telefonico AI, non un risultato misurato."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No input field ever asks for a real guest name,
number, licence plate or any personal detail — the tool only displays
fixed example dialogue.

CTA
Primary button, always visible below the transcript (not gated behind
viewing all 9 scenarios):
  Label: "Scoprite come si configura l'assistente telefonico AI per la
  vostra struttura"
  Link: https://www.weissmann.ai/it/servizi/assistente-telefonico-ai/
Secondary, lower-emphasis link near the top: "Leggi l'articolo completo"
(link to the article page). No countdowns, no fake urgency, no "prima che
sia troppo tardi" phrasing. CTA text and destination never change based
on the current selection.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — an annotated
paper transcript, not a chat app or SaaS dashboard):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "Passato a una persona"
    badge and the reference-panel item markers, always paired with text,
    never as a large fill or the only signal.
  Non-escalated outcome: near-black (#111111) with a simple check glyph —
    do NOT use green; the site's palette has none.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the active transcript panel:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Dialogue turns styled as simple labelled rows (speaker in small caps,
    line in guillemets «…»), not chat bubbles. Each turn carries a small
    language tag ("IT"/"DE"/"FR"/"EN", text label, not colour-coded).
  Layout: step 1 (property type) cards at top, step 2 (category) cards
    below — both remain visible once chosen, so the reader always sees
    which property type and category are active. Transcript below that;
    reference panel beside or below. On narrow widths, steps stack as
    full-width cards and the reference panel becomes a collapsible
    section, closed by default there, open by default on desktop.

ACCESSIBILITY
Full keyboard operability for both picker steps and the reference-panel
toggle; step 2 properly disabled (aria-disabled) until step 1 has a
selection; visible focus states; aria-live="polite" region for transcript
changes; 4.5:1 minimum contrast; respect prefers-reduced-motion (no
slide/fade animation); dialogue turns and the reference panel marked up
as real list/heading structures, not bare divs.

LANGUAGE
All UI copy in Italian. Do not add German, English or French UI
translations — this tool exists only in Italian. The scenarios
themselves contain German, English and French dialogue lines by design
(guests who switch language mid-call); that is content, not a UI
translation, and must not be translated into Italian.

Do not fabricate or imply that any scenario is a real recorded call from
Weissmann or any named competitor. Every dialogue line must read clearly
as a constructed illustration of a design pattern, and all three
emergency scenarios must never be softened, joked about, or treated as
just another item in the list — they are the safety-critical cases the
whole tool exists to make unambiguous.
```
