# Artifact Brief — Configuratore numero +41

**Article:** `numero-esistente-assistente-ai-ticino` ("Posso mantenere il mio numero +41 con un assistente telefonico AI?")
**Language:** Italian (it) — the article and artifact both exist in Italian only.
**Artifact type:** Step-by-step wizard configurator that outputs a personalized, timeline-structured action plan — deliberately a different interaction model from the German sibling `keep-existing-swiss-number-ai-assistant` (a one-page decision tree that renders a single explanation + one merged checklist) and the English sibling `ai-receptionist-swiss-phone-system-compatibility` (a one-page branching planner that renders two side-by-side checklists, "ask your telecom provider" / "ask your AI vendor"). This tool instead asks one question per screen, in sequence, and assembles the answers into an ordered **action plan** ("Questa settimana" → "Prima di firmare" → "Se qualcosa non funziona") rather than a flat Q&A list — the output reads as a short to-do plan for the reader to execute, not a document to hand to someone else.

## User problem

The article's thesis is that "can I keep my +41 number" is really three separate yes/no facts about the reader's own setup (mobile or landline, PBX or not, SIP-trunk or not) plus two optional facts (business number, real portability planned) — and that most of the article's five technical scenarios do not apply to any single reader. A reader who has finished the article still has to identify which one paragraph is theirs and manually assemble a to-do list from it. The Configurator removes that step: it asks the same three-to-five questions the article poses, one at a time, and returns a single ordered action plan scoped to that reader's exact situation, with the provider's own name dropped into the actions where supplied.

## Audience

A Ticino SME owner, studio professionale, artigiano or office manager evaluating an AI phone assistant, who is not a telecom specialist and wants to leave the tool with concrete next steps for this week, not just information to re-read.

## Why an interactive artifact is better than a static PDF

The right output depends on up to four sequential/conditional inputs (number type; PBX yes/no; SIP-trunk yes/no/unknown, shown only if PBX = yes; two independent optional add-ons), and the useful output is not one static fact but an ordered sequence of actions plus conditional addenda. A static one-pager would have to print all five scenarios and both addenda at once — burying the two or three lines that actually apply — or force the reader to self-navigate a branching document, which is exactly the error the article warns against (confusing forwarding with porting). A step-by-step tool asks each question once, reveals the SIP-trunk question only when it is relevant, and produces one clean, copyable action plan with the reader's own provider name inserted — none of which a flat document can do.

## Inputs

1. **Il numero che volete usare è mobile o fisso?** (required, radio): Numero mobile / Numero fisso.
2. **Conoscete con certezza il vostro operatore telefonico attuale?** (optional, radio): Sì (reveals a text field for the provider name, used to personalize the output, e.g. "Contattate Swisscom e chiedete…") / No (shows the `unknownProviderTip` instead of blocking progress).
3. **Avete un centralino telefonico (PBX) interno?** (required, radio): Sì / No.
4. **La vostra telefonia passa già attraverso un SIP-trunk?** (required only if step 3 = Sì; radio): Sì / No, linea classica / Non so — with a one-line plain-language explanation of what a SIP-trunk is.
5. **È un numero aziendale (ad es. con prefisso +41 051 o +41 058)?** (optional checkbox) — appends the business-document phase to the plan.
6. **Stiamo pianificando un cambio vero e proprio di operatore telefonico (portabilità), non solo una deviazione.** (optional checkbox) — appends the "Prima di firmare" phase and the 20–40-working-day timeout warning, regardless of which technical path was selected. This directly operationalizes the article's central thesis: forwarding and porting are different questions with different timelines, and only some readers face the second one.

## Decision logic

See `artifact-data.json` for the full data. Matching order (first match wins) using inputs 1, 3 and 4:

1. `hasPbx = no` AND `hasSipTrunk` is `no`/`unknown`/`n/a` AND `numberType = mobile` → path `mobile-forward`.
2. `hasPbx = no` AND `hasSipTrunk` is `no`/`unknown`/`n/a` AND `numberType = landline` → path `landline-forward`.
3. `hasPbx = yes` AND `hasSipTrunk` is `no`/`unknown` → path `pbx-nosip`.
4. `hasPbx = yes` AND `hasSipTrunk = yes` → path `pbx-sip`.
5. `hasPbx = no` AND `hasSipTrunk = yes` → path `sip-nopbx`.

Each path object carries a fixed `label`, `explanation`, `azioniQuestaSettimana` (2–3 imperative action items, not raw questions), `attenzione` (one path-specific "what can go wrong" line) and `pianoDiRipristino` (rollback) — all phrased consistently with the article body, not freshly invented. If `providerKnown = yes` and a name was typed, substitute it for the `{{operatore}}` placeholder in `azioniQuestaSettimana`; otherwise render "il vostro operatore attuale" in its place. After the primary path renders, append (in this fixed order, only if selected): the `businessNumberAddendum` phase, then the `fullPortationAddendum` phase.

## Outputs — the assembled action plan

Rendered as an ordered plan with clear phase headings, in this order:

1. **Il vostro percorso** — the path `label` and `explanation`.
2. **Questa settimana** — the path's `azioniQuestaSettimana`, plus the `businessNumberAddendum.azioni` appended under their own sub-heading if the business-number checkbox was checked.
3. **Prima di firmare** — the `fullPortationAddendum` (explanation, `azioni` and the timeout `warning`), shown only if the portability checkbox was checked. Omitted entirely otherwise — never shown as an empty or greyed-out phase.
4. **Se qualcosa non funziona** — the path's `pianoDiRipristino`, plus `fullPortationAddendum.pianoDiRipristino` appended if relevant.
5. **Nota di trasparenza Weissmann** — `weissmannNote`, shown once, low-key — the same honesty check the article applies to itself, not a sales pitch.
6. The persistent `disclaimer` (see below).
7. A link back to the full article for readers who want the reasoning behind their plan, not just the actions.
8. A plain "copia il piano" control that selects the full plan text so the reader can paste it into an email or a note — the plan is meant to leave the tool with the reader, not stay trapped in the browser tab.

## Error states

- If question 1 (`numberType`) or question 3 (`hasPbx`) is unanswered, show a neutral placeholder ("Rispondete alle prime due domande per vedere il vostro piano") instead of an empty or broken plan.
- If `hasPbx = yes` and question 4 is left unanswered, treat it the same as `unknown` and still render the `pbx-nosip` path — its explanation already tells the reader why finding out matters, so the tool never dead-ends.
- If `providerKnown = yes` but the text field is empty, fall back silently to "il vostro operatore attuale" rather than leaving a blank gap in a sentence.
- If `providerKnown = no`, show `unknownProviderTip` in place of personalization, not a dead end.

## Privacy considerations

All computation happens client-side in the browser. No data — including any typed provider name — is transmitted, stored or sent to any server or analytics endpoint. State this explicitly in a small, persistent footer note, matching the honesty standard the article itself sets.

## Accessibility requirements

Each step is a real `<fieldset>`/`<legend>` with the step's `question` as the legend text; all controls keyboard-operable with a visible focus state; step transitions announced via `aria-live="polite"` so screen-reader users know a new question (e.g. the conditional SIP-trunk question) has appeared; the final plan uses real heading levels and list markup (not styled `div`s) so its phase order — percorso → questa settimana → prima di firmare → se qualcosa non funziona → nota → disclaimer — is navigable by heading; no information conveyed by colour alone; a visible step indicator ("Passo 2 di 4") for orientation, implemented with text, not colour alone.

## Mobile behaviour

One question per screen, single-column, touch-sized controls (minimum ~44px); a persistent "indietro" control to revisit a previous step without losing later answers; the assembled plan renders on its own screen below the last question, in the same scroll, not a separate tab; the step indicator stays visible while scrolling the question card.

## CTA

One contextual, secondary link at the bottom of the plan: "Colloquio gratuito: chiariamo insieme quale collegamento fa per voi" → `/it/kontakt/`. Shown once, not repeated per phase, no urgency language, consistent with the article's own CTA and the master prompt's promotion rules (no fake scarcity, no forced pitch).

## Disclaimer

"Questo piano riassume informazioni pubblicamente accessibili di UFCOM e ombudscom, oltre alle indicazioni pubblicamente consultabili di Weissmann AI (stato: 29 luglio 2026). Non sostituisce una consulenza legale né un'informazione vincolante del vostro operatore telefonico o del vostro fornitore AI — procedure e termini possono cambiare." Shown persistently below the plan, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). A calm, one-question-at-a-time wizard card with a simple text step indicator, followed by a single assembled plan card with clearly labelled phases (small caps or bold phase headings, not coloured badges pretending to be a maturity score). No decorative flowchart graphics, no gamified progress bar with percentages, no fake-precision scoring — the honest output is a short, ordered list of real actions, and the design should not dress it up as more elaborate than it is.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in Italian called "Configuratore numero +41". Present it as a step-by-step wizard, one question per screen, with a simple text step indicator ("Passo X di Y") and a "indietro" control. Ask, in order: (1) "Il numero che volete usare è mobile o fisso?" — Numero mobile / Numero fisso (radio, required). (2) "Conoscete con certezza il vostro operatore telefonico attuale?" — Sì (reveals a text input for the provider name) / No (shows a short tip instead of blocking progress) (radio, optional). (3) "Avete un centralino telefonico (PBX) interno?" — Sì / No (radio, required). (4) Only if step 3 = Sì: "La vostra telefonia passa già attraverso un SIP-trunk?" — Sì / No, linea classica / Non so (radio, required, with a one-line explanation of what a SIP-trunk is). (5) An optional checkbox: "È un numero aziendale (ad es. con prefisso +41 051 o +41 058)?" (6) An optional checkbox: "Stiamo pianificando un cambio vero e proprio di operatore telefonico (portabilità), non solo una deviazione." Using the fixed data and matching rules in the accompanying `artifact-data.json` (do not invent new paths, questions or facts — use exactly the `paths`, `unknownProviderTip`, `businessNumberAddendum`, `fullPortationAddendum`, `weissmannNote` and `disclaimer` fields provided), determine which of the five paths (`mobile-forward`, `landline-forward`, `pbx-nosip`, `pbx-sip`, `sip-nopbx`) applies from inputs 1, 3 and 4, and assemble a single ordered action plan with these phase headings, omitting any phase that has nothing to show: "Il vostro percorso" (path label + explanation), "Questa settimana" (the path's action items, personalized with the typed provider name in place of `{{operatore}}` if supplied, otherwise "il vostro operatore attuale", plus the business-number actions appended under a sub-heading if checkbox 5 is checked), "Prima di firmare" (the full-portation addendum's explanation, actions and timeout warning, shown only if checkbox 6 is checked), "Se qualcosa non funziona" (the path's rollback text, plus the portation addendum's rollback if relevant), "Nota di trasparenza Weissmann" (the `weissmannNote`, shown once, low-key), and the persistent `disclaimer` text. Add a plain "copia il piano" button that selects the assembled plan text. If question 1 or 3 is unanswered, show a neutral placeholder instead of a plan. If question 3 = Sì and question 4 is left unanswered, treat it as "Non so" and still render the `pbx-nosip` path rather than blocking. Everything must run client-side with zero network calls and zero data collection — state this in a small footer note. Make all controls keyboard-accessible with visible focus states, use real semantic heading/list markup for the assembled plan so its phase order is navigable, and announce new questions (like the conditional SIP-trunk question) to screen readers via `aria-live="polite"`. Use a one-question-per-screen, touch-friendly mobile layout with a persistent back control. End the plan with one plain secondary link, "Colloquio gratuito: chiariamo insieme quale collegamento fa per voi", pointing to weissmann.ai/it/kontakt/ — no urgency language, no repeated CTAs. Style it calmly and honestly: a simple step card and a simple plan card with plain phase headings, no decorative flowchart graphics, no gamified progress percentages, no fake-precision scoring.
