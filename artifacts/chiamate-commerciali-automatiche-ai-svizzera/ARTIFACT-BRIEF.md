# Artifact Brief — Controllo conformità e rischio reputazionale outbound

**Article:** `chiamate-commerciali-automatiche-ai-svizzera` (IT-PHONE-10) — "Chiamate commerciali automatiche con l'AI in Svizzera: legali, tollerate o semplicemente controproducenti?"
**Language:** Italian (it) — the article and artifact both exist in Italian only.
**Artifact type:** Two-part audit: a fast legal gate (sì/no/da verificare, mirroring the article's three-question test) followed by a **weighted reputational-risk scorecard** (seven scored factors, additive points, tiered result, dynamically generated top-3 action list) — a genuinely different interaction model from the German sibling artifact for `ai-outbound-marketing-calls-switzerland`, which is a single six-branch decision-tree lookup with one static, always-identical checklist. Here the legal read is deliberately minimal and fast; the scorecard — not the legal gate — is the tool's main mechanic and its reason to exist as an interactive artifact rather than a short FAQ.

## User problem

A Ticino SME owner or marketing lead is running, or about to switch on, outbound telemarketing through an AI dialer. They have read the article and understood the two-part legal test (directory status, customer relationship), but their real operational question is broader than one number: across an entire campaign — a mix of numbers, a purchased or in-house list, a script, an opt-out process, some monitoring habits — how risky is this, really, and which single change would reduce that risk the most? A yes/no legal answer per number does not tell them that. This tool does: it produces a plain legal read for the test case they enter, and, separately, a reputational-risk score for the campaign practices around it, with a ranked list of what to fix first.

## Audience

A Ticino SME owner, marketing lead, or sales-ops person (non-technical) auditing an outbound AI calling campaign — either before launch or as a health check on one already running — reading in Italian.

## Why an interactive artifact beats a static checklist

A static checklist can list "check the star registry" and "listen to sample calls" as equally weighted bullet points, but in practice they are not equally important, and a business under time pressure needs to know which one to fix first. A weighted scorecard that sums real, disclosed point values per answer — and then surfaces only the two or three worst-scoring factors as concrete next actions — gives a genuinely different, more actionable output than a flat list a reader has to prioritise themselves. Pairing that with a fast, separate legal read (allowed / not allowed / grey zone / verify first) for a specific number keeps the two questions the article insists on keeping distinct — "is this legal" and "is this still a good idea" — visually and logically separate, never merged into one verdict.

## Inputs

**Fase 1 — Verifica legale rapida (2 required selects, mirrors the article's three-question test):**
1. **Relazione con il cliente** (single-select, required): Relazione attuale o recente; Relazione debole o vecchia; Nessuna relazione – contatto a freddo; Non so / non documentata.
2. **Stato nel registro telefonico** (single-select, required): Con asterisco (*); Non elencato; Elencato senza asterisco; Non verificato.

**Fase 2 — Punteggio di rischio reputazionale (7 scored factors, all required to compute a full score; partial completion allowed with a visible "punteggio parziale" note):**
3. Volume e velocità delle chiamate automatizzate (4 options).
4. Aggiornamento della verifica del registro con asterisco/elenco (3 options).
5. Origine della lista di contatti (3 options).
6. Tono e personalizzazione dello script (3 options).
7. Gestione dell'opt-out durante la chiamata (3 options).
8. Controllo umano a campione (3 options).
9. Storico di reclami o segnalazioni (3 options).

All option labels and point values come from `artifact-data.json` (`legalGate` and `riskFactors`) — do not invent additional options or change point values.

## Decision logic

**Fase 1 (legal gate):** Evaluate the fixed, ordered `legalGate.rules` array in `artifact-data.json` (first match wins, exactly six rules, mirrors the article's "regola di base" section): an actual customer relationship always allows the call regardless of directory status; a weak/old relationship on an unprotected number is unambiguously allowed; the same weak relationship on a protected number is a flagged grey zone, not a confident yes; no relationship on an unprotected number is allowed while on a protected or unknown-status number it is blocked; an unknown relationship is always the cautious fallback (treat as protected + no relationship until clarified). Show the matching `badge`, `statute`, and `explanation` as a compact result — this is a quick reference, not the tool's centrepiece.

**Fase 2 (scorecard, the tool's core mechanic):** For each of the seven `riskFactors`, add the `points` of the option the user selected to a running total (max 135, per `scoringMethod`). Look up the resulting total in `scoreTiers` (Basso 0–30, Medio 31–65, Alto 66–100, Critico 101–135) to show the tier `label` and `tone`. Then apply `topActionsLogic`: select the three factors with the highest scored points among those actually answered (skip factors scored at 0), show each one's `actionIfWorst` text if the user picked that factor's maximum-point option, or `actionIfMiddle` otherwise; break ties by the order factors appear in `riskFactors`; show fewer than three action cards if fewer than three factors scored above zero, and show a positive "nessuna azione prioritaria" state if all seven are at zero. Do not invent an eighth factor, change a weight, or silently convert the additive score into a percentage or probability — display the raw point total and the max (e.g. "42 su 135") alongside the tier label, never a bare unlabelled number.

The two halves (legal gate and scorecard) are independent — the legal gate result must never be overwritten or hidden by a low or high reputational score, and vice versa.

## Outputs

- **Legal-read card** (Fase 1): the `badge`, `statute`, and `explanation`, clearly labelled "Lettura legale" — a fast reference, not the main visual focus of the page.
- **Score card** (Fase 2): the raw point total out of 135, the matching tier `label` with its `tone` colour treatment, and a one-line restatement of `scoringMethod` so the number is never presented as an unexplained black box.
- **Top-3 azioni prioritarie**: up to three ranked action cards generated per `topActionsLogic`, each showing the factor label, the user's selected answer, and the corresponding remediation text.
- A persistent link back to the canonical article at `https://weissmann.ai/it/ai-academy/agenti-automazione/chiamate-commerciali-automatiche-ai-svizzera/` for the full reasoning, including the Ticino-specific cross-border note and the illustrative scaling calculation.

## Error states

- Fase 1 incomplete (either select unanswered): the legal-read card stays disabled with a prompt to complete both fields; never default silently to the most permissive result.
- Fase 2 partially answered: compute and show a score from the factors answered so far, but visibly label it "Punteggio parziale — N di 7 fattori valutati" rather than presenting it as final; do not extrapolate or estimate the missing factors.
- All seven Fase 2 factors at their best (0-point) option: show the "Basso" tier and an explicit positive note ("nessuna azione prioritaria da questo controllo") instead of an empty action-list area.
- "Non so" selected for a Fase 1 or Fase 2 field where that option exists: still produce a result, but treat "non so" as its stated (typically higher-risk or cautious-fallback) point value — never as automatically low-risk.

## Privacy considerations

All logic runs client-side; no answer to either phase, no score, and no derived action list is transmitted, stored, or logged anywhere. State this explicitly in a persistent footer note. The tool never accepts or processes an actual phone number, contact list, or business name — only category selections about a described situation or campaign.

## Accessibility requirements

Every input is a real, keyboard-operable form control (radio group or select) with a visible `<label>`, not placeholder-only labelling. The legal-read card and the score card use real heading and paragraph markup so screen readers announce them as distinct sections. Tier meaning must never rely on colour alone — each tier's colour is always paired with its full text label ("Rischio reputazionale alto", not an amber dot alone). The point total and the "out of 135" denominator are both always read out, not conveyed only through a progress-bar fill level.

## Mobile behaviour

Single-column flow: Fase 1 (2 selects → legal-read card) first, then Fase 2 (7 selects, one per screen-height card, each showing its running point contribution) → score card → top-3 action cards, all stacked vertically with no horizontal scrolling. A small sticky progress indicator ("4 di 7") helps the user track Fase 2 without losing place on a long single-column scroll. The "Torna all'articolo" link stays reachable near the top of the results without excessive scrolling.

## CTA

Contextual only, shown below the results: "Configurare le chiamate outbound con un assistente telefonico AI impostato correttamente" linking to the phone-assistant service page (`/it/servizi/assistente-telefonico-ai/`) — not a blocking step before the reader sees their legal read or score, and never phrased with urgency or scarcity language.

## Disclaimer

"Questo strumento inquadra la situazione legale in base all'art. 3 cpv. 1 lett. u e all'art. 23 LCSl e a fonti pubbliche della SECO. Non è una consulenza legale e non sostituisce una verifica individuale — in particolare per liste acquistate, numeri esteri (inclusi quelli italiani) o chiamate B2B. Il punteggio di rischio reputazionale è una stima indicativa basata su fattori dichiarati dall'utente, non una misurazione, una previsione garantita o un giudizio legale. Stato della normativa: 29 luglio 2026." Shown persistently (not only on first load), and repeated next to the "Non consentita" and "Da verificare prima di chiamare" legal results specifically, and next to a "Critico" score tier.

## Visual direction

Consistent with Weissmann's site tokens (`--paper #ffffff`, `--paper-soft #f7f7f5`, `--ink #111111`, `--line #e5e5e2`, `--accent #c51a2e` used sparingly for labels/active states, `--btn-bg #111111`, Instrument Sans typeface). The legal-read card (Fase 1) and the score card + action list (Fase 2) are visually separated by a clear divider and distinct headings — never merged into one verdict block. The score card shows the point total as plain text plus a simple horizontal bar (not a gauge/dial or gamified meter) filled to the raw-points proportion, with the tier label always printed in full next to it. No literal decision-tree diagram, no traffic-light iconography beyond what is needed for the tier colour, no alarmist styling even for "Critico" — a restrained warning tone, consistent with the site's editorial, non-corporate feel.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in Italian called "Controllo conformità e rischio reputazionale outbound" for Swiss (Ticino) SME users auditing an AI-driven outbound telemarketing campaign. The tool has two independent parts, both required, shown as visually separated sections.
>
> **Fase 1 — Verifica legale rapida:** two required selects — (1) Relazione con il cliente: relazione attuale o recente, relazione debole o vecchia, nessuna relazione, non so/non documentata; (2) Stato nel registro telefonico: con asterisco, non elencato, elencato senza asterisco, non verificato. Apply the fixed, ordered `legalGate.rules` from the accompanying `artifact-data.json` (first match wins: an attuale customer relationship always allows the call regardless of directory status; a debole/vecchia relationship on an unprotected number is clearly allowed while the same relationship on a protected number is a flagged grey zone; no relationship on an unprotected number is allowed while on a protected or unknown-status number it is blocked; an unknown relationship is always the cautious fallback). Show a compact result card with the badge, statute reference, and plain-language explanation, labelled "Lettura legale."
>
> **Fase 2 — Punteggio di rischio reputazionale (the tool's main feature):** seven required selects, each with 3–4 options carrying different point values, all supplied in `artifact-data.json.riskFactors` (volume e velocità delle chiamate; aggiornamento della verifica del registro; origine della lista di contatti; tono e personalizzazione dello script; gestione dell'opt-out; controllo umano a campione; storico di reclami). Sum the points of the selected options (max 135) into a running total, look it up in `artifact-data.json.scoreTiers` (Basso 0–30, Medio 31–65, Alto 66–100, Critico 101–135), and display the raw point total (e.g. "42 su 135"), never a bare percentage or an unexplained single number. Then compute the three highest-scoring answered factors (skip any at 0 points) and show up to three ranked action cards using each factor's `actionIfWorst` (if the user picked the maximum-point option) or `actionIfMiddle` (otherwise) text from `artifact-data.json`. If fewer than three factors scored above zero, show fewer cards; if all seven are at zero, show a positive "nessuna azione prioritaria" message instead.
>
> Persistently display this disclaimer (not only on load), and repeat it next to a "Non consentita" or "Da verificare prima di chiamare" legal result and next to a "Critico" score tier: "Questo strumento inquadra la situazione legale in base all'art. 3 cpv. 1 lett. u e all'art. 23 LCSl e a fonti pubbliche della SECO. Non è una consulenza legale e non sostituisce una verifica individuale — in particolare per liste acquistate, numeri esteri (inclusi quelli italiani) o chiamate B2B. Il punteggio di rischio reputazionale è una stima indicativa basata su fattori dichiarati dall'utente, non una misurazione, una previsione garantita o un giudizio legale. Stato della normativa: 29 luglio 2026."
>
> Make it fully keyboard-accessible with real form controls (radio groups or selects) and visible focus states and labels, mobile-responsive as a single-column flow with a small sticky "N di 7" progress indicator during Fase 2, collect and transmit no data anywhere (all logic runs client-side; no real phone numbers, business names, or contact lists are accepted, only category selections), and include one contextual, non-urgent link below the results to weissmann.ai's phone-assistant service page (`/it/servizi/assistente-telefonico-ai/`). Style it with Weissmann's editorial system: white/warm-off-white background (`--paper #ffffff` / `--paper-soft #f7f7f5`), black ink typography (`--ink #111111`), thin hairline rules (`--line #e5e5e2`), a restrained red accent (`--accent #c51a2e`) used only for small labels or active/warning states — never as a full-card background — black buttons (`--btn-bg #111111`), Instrument Sans typeface (or system-ui fallback). Visually separate the Fase 1 legal-read card from the Fase 2 score card and action list with a clear divider — never merge them into one verdict. The score display is a plain number plus a simple horizontal bar (not a gauge, dial, or gamified meter), with the tier label always printed in full text next to any colour cue. Do not invent additional legal rules, risk factors, point values, or statute references beyond what is in `artifact-data.json`, and do not convert the additive point score into a fabricated probability or percentage likelihood of a complaint.
