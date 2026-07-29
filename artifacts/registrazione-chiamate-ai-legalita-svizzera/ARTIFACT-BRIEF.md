# Artifact Brief — Semaforo legale e generatore dell'avviso di registrazione

**Article:** `registrazione-chiamate-ai-legalita-svizzera` ("Registrare e trascrivere le telefonate con l'AI in Svizzera: la regola cambia con il tipo di chiamata")
**Language:** Italian (it) — the article and artifact both exist in Italian only.
**Artifact type:** Traffic-light legal indicator + announcement-text generator (named Ticino call scenario → verde/giallo/rosso/caso-speciale rating → draft spoken announcement). Deliberately a different interaction model from the German sibling article's abstract call-type decision tree: this tool starts from six named, concrete scenarios rather than abstract call categories, and communicates the result as a traffic-light rating rather than a branching tree.

## User problem

A Ticino SME owner (hotel, restaurant, artisan, property manager, clinic reception) has just read that recording phone calls is sometimes legal without asking first and sometimes a criminal offence — and that the difference depends on what the call is actually about. They don't think in terms of statute paragraphs; they think in terms of the calls that actually hit their phone line on a Tuesday: a room booking, a table reservation, a quote request, a complaint, an internal call with staff, a medical appointment. The article explains the legal logic behind six such scenarios; the artifact lets the reader pick their own scenario (and, where relevant, how they intend to use the recording) and get an immediate verde/giallo/rosso rating plus, where needed, ready-to-use announcement text.

## Audience

Same as the article: a Ticino or Italian-speaking Swiss SME owner or office manager configuring or auditing an AI phone assistant's recording settings — non-technical, reading in Italian, likely juggling several call types on the same phone number.

## Why an interactive artifact beats a static PDF

The legality of recording a given call depends on the combination of what the call is about and, for genuine commercial transactions, what the recording will later be used for. A static list of six scenarios still forces the reader to map their real situation onto the right bucket and then work out what a compliant announcement should say. An interactive tool applies the fixed logic in `artifact-data.json` to the reader's actual selection, shows a plain-language traffic-light result instead of a paragraph of legal reasoning, and — where an announcement is required or merely advisable — drafts the exact sentence the reader can read into their call flow. A PDF can list six examples; only an interactive tool can rate the reader's own call and hand them usable text for it.

## Inputs

1. **Tipo di chiamata** (single-select, required, exactly the six scenarios from the article): Prenotazione alberghiera; Prenotazione al ristorante; Richiesta di preventivo; Reclamo su un servizio o un ordine già fornito; Chiamata con o tra vostri dipendenti; Appuntamento medico o terapeutico.
2. **Uso previsto della registrazione** (single-select, shown ONLY when the selected scenario is Prenotazione alberghiera or Prenotazione al ristorante — the two scenarios where the commercial exception can apply): Solo come prova della prenotazione, oppure Anche per addestramento AI, controllo qualità o marketing.
3. Optional free-text fields to personalise the generated announcement: nome dell'azienda, formulazione dello scopo, scopo aggiuntivo (only for the extended-use case) — used only to fill placeholders in the output text, never sent, stored, or logged anywhere.

## Decision logic (the "semaforo")

Evaluate the fixed, ordered `semaforo` array in `artifact-data.json` (first match wins, exactly six rules, one or two per scenario):

1. **Prenotazione alberghiera / al ristorante + "solo prova"** → `verde`. Art. 179quinquies cpv. 1 lett. b CP: no prior consent needed; use strictly limited to evidencing the reservation. Offer the optional, legally non-mandatory courtesy-notice template.
2. **Prenotazione alberghiera / al ristorante + "anche per altro"** → `verde_esteso`. The recording itself still needs no prior consent, but the additional use (AI training / quality control / marketing) needs its own, separately communicated consent — generate the extended-consent announcement template naming both purposes.
3. **Richiesta di preventivo** → `giallo`. A quote request is a preliminary step, not yet an ordinazione/mandato/prenotazione in the statute's sense — genuinely uncertain, so it resolves to the cautious "treat as requiring consent" branch, same underlying template as the red cases but flagged with the amber badge and explanation.
4. **Reclamo** → `rosso`. General rule applies (Art. 179bis/179ter CP): prior express consent required, full consent-required announcement template.
5. **Chiamata con o tra vostri dipendenti** → `speciale`. Always routes here regardless of anything else about the call — the commercial exception does not apply to a business's own staff. No generated script; show the `nota_dipendenti` caution note and recommend individual labour-law advice.
6. **Appuntamento medico** → `rosso`, with an added sensitive-data note (health information under the nLPD) alongside the same consent-required template.

Do not invent a seventh scenario, do not soften the "richiesta di preventivo" case into a confident green, and do not generate a generic script for the employee scenario — these three constraints mirror the article's own reasoning and must not be relaxed for the sake of a tidier UI.

## Outputs

- A result card headed by a large, clearly labelled traffic-light badge (verde / giallo / rosso / caso a parte — colour is never the only signal; the word is always printed in full next to it), the statute reference, a one-paragraph plain-language explanation, and the purpose limitation where one applies.
- Where `announcementNeeded` is true (or the courtesy template is offered), an editable, copyable draft announcement in Italian with the reader's placeholders filled in, plus a "copia negli appunti" action.
- For the employee scenario, no generated script — instead a clearly marked caution box showing the `nota_dipendenti` text and recommending individual labour-law advice.
- A persistent link back to the canonical article at `https://weissmann.ai/it/ai-academy/agenti-automazione/registrazione-chiamate-ai-legalita-svizzera/` for the full reasoning.

## Error states

- No scenario selected: disable the result area and prompt the reader to choose one; never default silently to the most permissive (verde) result.
- Scenario is a "prenotazione" type but no usage purpose selected yet: hold the result and prompt for the purpose question before rating — do not assume "solo prova" silently.
- Empty placeholder fields when generating a script: fall back to the neutral example values shown in `artifact-data.json` (e.g. "gestire correttamente la sua richiesta") rather than leaving `{scopo}` unresolved in the output text.

## Privacy considerations

All logic runs client-side; no scenario choice, company name, or generated script is transmitted, stored, or logged anywhere. State this explicitly in a persistent footer note, and clarify that the tool is for drafting an announcement and rating a call type, not for recording or storing any real caller's data.

## Accessibility requirements

Every input is a real, keyboard-operable form control (radio group / select / text input) with visible labels and focus states — no click-only custom widgets. The result card uses real heading and paragraph markup so screen readers announce the rating change. The traffic-light colour is never the only carrier of meaning: each badge always shows the full word ("Verde — nessun consenso preventivo necessario", not just a coloured dot) and sufficient colour contrast for both light and dark rendering.

## Mobile behaviour

Single-column stepper: Tipo di chiamata → (condizionale) Uso previsto → Risultato, each step full-width with large tap targets; the generated announcement text sits in a scrollable, copyable text block that never requires horizontal scrolling; the "Torna all'articolo" link stays reachable without excessive scrolling on a phone screen.

## CTA

Contextual only, shown below the result card: "Fatevi configurare l'avviso nel vostro assistente telefonico AI" linking to the phone-assistant service page — not shown as a blocking step before the reader sees their result, and never phrased with urgency or scarcity language.

## Disclaimer

"Questo strumento inquadra la situazione giuridica sulla base degli art. 179bis, 179ter e 179quinquies del Codice penale svizzero (CP) e di fonti ufficiali pubbliche. Non è consulenza legale e non sostituisce una valutazione individuale del vostro caso, in particolare per le chiamate con dipendenti o per contenuti misti o non chiaramente classificabili. Stato della normativa: 29 luglio 2026." Shown persistently (not only on first load, not dismissible into oblivion), and repeated next to the employee-scenario caution box specifically, since that is the case most likely to be misapplied.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--line`, `--radius`). The traffic light itself is a simple, editorial row of three labelled states (not a glossy graphical stoplight icon or a gamified quiz element) with the active state visually emphasised; the fourth "caso a parte" state for employee calls is visually distinct from the three-colour scale (a neutral outlined box, not a fourth colour), signalling it is not just another shade on the same spectrum. The announcement text output is styled like a quotable script (monospace or a clearly bordered block), not a disposable-looking form field.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in Italian called "Semaforo legale e generatore dell'avviso di registrazione". It walks a Ticino SME user through a short step sequence: (1) select exactly one call scenario from Prenotazione alberghiera, Prenotazione al ristorante, Richiesta di preventivo, Reclamo su un servizio o un ordine già fornito, Chiamata con o tra vostri dipendenti, or Appuntamento medico o terapeutico; (2) only if the selected scenario is a hotel or restaurant reservation, ask a second question: will the recording be used solo come prova della prenotazione, or anche per addestramento AI, controllo qualità o marketing. Apply the fixed, ordered rules supplied in the accompanying `artifact-data.json` (`semaforo` array, first match wins): hotel/restaurant reservations used only as evidence get a green ("verde") result under Art. 179quinquies cpv. 1 lett. b CP with no prior consent needed but strict purpose limitation; the same reservations used for extra purposes get a "verde con consenso aggiuntivo" result requiring a second, separate consent for that extra purpose; a quote request ("richiesta di preventivo") gets an amber ("giallo") result — genuinely uncertain, treated cautiously as requiring consent; a complaint or a medical appointment get a red ("rosso") result requiring prior express consent (the medical case additionally flags sensitive health-data handling under the nLPD); a call with or between the business's own employees ALWAYS gets a special fourth result ("caso a parte") regardless of anything else, with no generated script — show the `nota_dipendenti` caution note instead and recommend individual labour-law advice. Render the result as a labelled traffic-light card (the word is always printed in full, colour is never the only signal) with the statute reference and a plain-language explanation. Where the rule requires or suggests a spoken announcement, generate editable, copyable Italian announcement text from the matching template in `artifact-data.json.announcementTemplates`, filling in placeholders (azienda, scopo, scopo_aggiuntivo) from optional user text inputs, falling back to the example values if left blank. Persistently display this disclaimer, not just on load: "Questo strumento inquadra la situazione giuridica sulla base degli art. 179bis, 179ter e 179quinquies del Codice penale svizzero (CP) e di fonti ufficiali pubbliche. Non è consulenza legale e non sostituisce una valutazione individuale del vostro caso. Stato della normativa: 29 luglio 2026." — repeat it a second time next to the employee-scenario caution box. Make it fully keyboard-accessible with real form controls and visible focus states, mobile-responsive as a single-column stepper, collect and transmit no data anywhere (all logic runs client-side), and include one contextual, non-urgent link to weissmann.ai's phone-assistant service page below the result. Style it with a clean, editorial, Swiss-precise look — muted colours, generous whitespace, a simple labelled three-state traffic light (not a glossy stoplight icon, not a gamified quiz), and the fourth "caso a parte" state visually distinct as a neutral outlined box rather than a fourth colour on the scale. Do not invent additional scenarios, branches, or legal claims beyond what is in `artifact-data.json`.
