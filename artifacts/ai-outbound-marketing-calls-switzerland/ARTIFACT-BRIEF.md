# Artifact Brief — Outbound-Anruf-Compliance- und Reputations-Checker

**Article:** `ai-outbound-marketing-calls-switzerland` ("Automatische KI-Werbeanrufe in der Schweiz: Was ist erlaubt und was ist einfach eine schlechte Idee?")
**Language:** German (de) — the article and artifact both exist in German only.
**Artifact type:** Decision tree with a parallel, independent reputational-risk layer (legality result + automation-scaling advice, not a legal verdict alone).

## User problem

A Swiss SME owner or marketing lead wants to run (or is already running) outbound telemarketing through an AI phone system and has just read that the legality of a call depends on the directory status of the number and whether an existing customer relationship exists — not on whether a human or a machine dials. They now have an actual contact list with a mix of number types and relationship ages, and no simple way to work through it, entry by entry, to see which numbers are safe to call, which are not, and — because they're specifically automating this — how much a single list-hygiene mistake could cost them once it runs at scale. The article explains the reasoning; the artifact applies it to the reader's actual situation and adds the reputational layer the law itself doesn't cover.

## Audience

A Swiss SME owner, marketing lead, or sales-ops person (non-technical) evaluating or auditing an outbound calling list — either before switching on an AI dialer or while already running one — reading in German.

## Why an interactive artifact beats a static PDF

The legal answer depends on two independent variables at once (directory status and the strength of the customer relationship), and the practical advice on top of that depends on a third (whether the reader is automating). A checklist forces the reader to combine three variables in their head and risks a false-confident answer, especially in the genuine grey zone (an old or loose customer relationship on a protected number). A short input sequence applies the same fixed logic from `artifact-data.json` to the reader's actual number and — unlike a flat legal FAQ — pairs the legal read with a reputational-risk read that a static document cannot personalise, plus a concrete pre-call checklist scaled to whether automation is in play.

## Inputs

1. **Verzeichnisstatus der Nummer** (single-select, required): Sternmarkierte Nummer; Nicht im Verzeichnis eingetragen; Normal gelistet, kein Sterneintrag; Verzeichnisstatus nicht geprüft/unbekannt.
2. **Kundenbeziehung** (single-select, required): Aktueller Vertrag oder kürzlicher Kauf; Liegt lange zurück oder ist lose (z. B. nur Newsletter-Anmeldung); Keine Kundenbeziehung – reine Kaltakquise; Nicht sicher/nicht dokumentiert.
3. **Wird automatisiert angerufen?** (toggle, required): Ja, ein KI-/Dialer-System ruft automatisiert an — oder Nein, ein Mensch wählt manuell. Controls whether the automation-multiplier note and the pre-call checklist are shown.
4. **Herkunft der Kontaktliste** (single-select, optional, shown only when the automation toggle is "Ja"): Eigene, selbst geführte Kundenliste; Gekaufte oder extern zusammengestellte Liste; Herkunft nicht dokumentiert/unbekannt. Adds a documentation warning from `artifact-data.json.listSourceWarnings` for the latter two.

## Decision logic

Evaluate the fixed, ordered `decisionTree` array in `artifact-data.json` (first match wins, exactly six branches, mirrors the article's three-question framework and the "Grundregel" section):

1. **Kundenbeziehung = "aktuell"** → always `allowed_exception`, regardless of directory status — the existing-customer exception in Art. 3 Abs. 1 lit. u UWG applies independent of whether the number is starred.
2. **Kundenbeziehung = "alt_lose" AND Verzeichnisstatus = "gelistet_ohne_stern"** → `allowed_clear` — moot point, the directory protection never applied here anyway.
3. **Kundenbeziehung = "alt_lose"** (any other directory status) → `allowed_borderline` — the exception likely covers it but is weakly documented; flagged as a genuine grey zone, not a confident yes.
4. **Verzeichnisstatus = "gelistet_ohne_stern"** (remaining cases: "keine" or "unbekannt" relationship) → `allowed_clear` — no protection applies regardless of relationship.
5. **Kundenbeziehung = "keine"** (remaining: protected directory status) → `not_allowed`.
6. **Kundenbeziehung = "unbekannt"** (remaining: protected or unknown directory status) → `verify_first`, the cautious fallback — never default silently to an allowed result when key facts are missing.

Independently of which branch fires, when the automation toggle is "Ja": show the matching `automationMultiplierText` entry (`low_stakes` for `allowed_exception`/`allowed_clear`, `high_stakes` for `allowed_borderline`/`not_allowed`/`verify_first`) and the full `preCallChecklist` (five items, always the same list — it is a pre-call hygiene checklist, not branch-specific). When a `listSource` warning applies (`gekauft_extern` or `unbekannt_herkunft`), show it as an additional note beneath the result, not merged into the main explanation. Do not invent additional branches, soften the "unbekannt" cases into a confident answer, or let a strong customer relationship answer get overridden by directory status — the exception in Art. 3 Abs. 1 lit. u UWG applies regardless of the star.

## Outputs

- A result card: the `badge`, the `statute` reference, the `explanation` in plain language, and the `reputationAdvice` paragraph — legal read and reputational read shown as two distinct, separately labelled blocks, never merged into one sentence that implies "legal = risk-free".
- When automation is "Ja": a separate, visually distinct panel with the automation-multiplier text and the five-item pre-call checklist.
- When a list-source warning applies: a small additional note, clearly separate from the main result.
- A persistent link back to the canonical article at `https://weissmann.ai/ki-academy/agenten-automatisierung/ki-werbeanrufe-schweiz-erlaubt/` for the full reasoning, including the illustrative scaling calculation.

## Error states

- No Verzeichnisstatus or no Kundenbeziehung selected: disable the result area and prompt the reader to complete both; never default silently to the most permissive branch (`allowed_clear` or `allowed_exception`).
- "Nicht geprüft/unbekannt" or "Nicht sicher/nicht dokumentiert" selected: still produce a result (`verify_first` in the relevant combination), but visibly mark it as a cautious placeholder pending verification, not a definitive classification.
- Automation toggle left at its default: default it to "Nein" (manual calling), never pre-select "Ja" — the reader must actively indicate they are automating before seeing automation-specific advice.

## Privacy considerations

All logic runs client-side; no directory status, relationship answer, list-source choice, or result is transmitted, stored, or logged anywhere. State this explicitly in a persistent footer note. Make clear the tool classifies a described situation — it never accepts or processes an actual phone number or contact list.

## Accessibility requirements

Every input is a real, keyboard-operable form control (radio group / select / toggle) with visible labels and focus states — no click-only custom widgets. The result card and the automation panel use real heading and paragraph markup so screen readers announce both blocks distinctly. Badge meaning must never rely on colour alone — pair every badge colour with its full text label (e.g. "Nicht erlaubt – nicht anrufen" printed in full, not a red dot alone).

## Mobile behaviour

Single-column stepper: Verzeichnisstatus → Kundenbeziehung → Automatisiert? → (bedingt) Herkunft der Liste → Ergebnis, each step full-width with large tap targets. The result card, automation panel, and checklist stack vertically without requiring horizontal scrolling. The "Zum Artikel" link stays reachable without excessive scrolling on a phone screen.

## CTA

Contextual only, shown below the result: "Outbound-Anrufe mit einem sauber konfigurierten KI-Telefonassistenten umsetzen" linking to the phone-assistant service page — not a blocking step before the reader sees their result, and never phrased with urgency or scarcity language.

## Disclaimer

"Dieses Werkzeug ordnet die Rechtslage anhand von Art. 3 Abs. 1 lit. u und Art. 23 UWG sowie öffentlichen SECO-Quellen ein. Es ist keine Rechtsberatung und ersetzt keine individuelle Abklärung im Einzelfall – insbesondere nicht bei gekauften Kontaktlisten, grenzüberschreitenden Kampagnen oder B2B-Kaltakquise. Stand der Rechtslage: 29. Juli 2026." Shown persistently (not only on first load), and repeated next to the `not_allowed` and `verify_first` results specifically.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--line`, `--radius`) — a plain, editorial step-by-step flow, not a graphical tree diagram or gamified quiz. The legal-result block and the reputational/automation block are visually separated (e.g. a divider or distinct background tint) so the reader never reads them as one merged verdict. The badge uses the accent colour sparingly for the result state only; a `not_allowed` result may use a restrained warning tone, never alarmist styling.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in German called "Outbound-Anruf-Compliance- und Reputations-Checker". It walks a Swiss SME user through a short step sequence: (1) select the directory status of a phone number they want to call — sternmarkiert, nicht im Verzeichnis eingetragen, normal gelistet ohne Sterneintrag, or unbekannt; (2) select the strength of the customer relationship with that number — aktueller Vertrag/kürzlicher Kauf, alt oder lose (z. B. nur Newsletter), keine Kundenbeziehung, or nicht sicher/nicht dokumentiert; (3) a toggle: wird automatisiert angerufen (KI-/Dialer-System) oder manuell durch einen Menschen; (4) if automated, an optional select for the contact list's origin — eigene Kundenliste, gekauft/extern, or unbekannte Herkunft. Apply the fixed, ordered decision rules supplied in the accompanying `artifact-data.json` (`decisionTree` array, first match wins — an aktuelle Kundenbeziehung always allows the call regardless of directory status; a lose/alte Beziehung on an unprotected number is clearly allowed while the same relationship on a protected number is a flagged grey zone; no relationship on an unprotected number is allowed while on a protected or unknown-status number it is blocked; an unknown relationship is always the cautious fallback) to show a result card with: the badge, the exact statute reference, a plain-language explanation, and a separately labelled reputational-advice paragraph — never merge the legal read and the reputational read into one sentence. When automation is "Ja", show a second, visually distinct panel with the matching text from `artifact-data.json.automationMultiplierText` (`low_stakes` or `high_stakes` depending on the result) plus the full five-item `preCallChecklist`, and when relevant the matching `listSourceWarnings` entry. Persistently display this disclaimer, not just on load: "Dieses Werkzeug ordnet die Rechtslage anhand von Art. 3 Abs. 1 lit. u und Art. 23 UWG sowie öffentlichen SECO-Quellen ein. Es ist keine Rechtsberatung und ersetzt keine individuelle Abklärung im Einzelfall. Stand der Rechtslage: 29. Juli 2026." — and repeat it next to `not_allowed`/`verify_first` results specifically. Make it fully keyboard-accessible with real form controls and visible focus states, mobile-responsive as a single-column stepper, collect and transmit no data anywhere (all logic runs client-side, no real phone numbers or lists are accepted as input, only category selections), and include one contextual, non-urgent link to weissmann.ai's phone-assistant service page below the result. Style it with a clean, editorial, Swiss-precise look — muted colours, generous whitespace, no gamified graphics, no literal tree-diagram visualisation, no fake precision, no alarmist red styling even for the "nicht erlaubt" result. Do not invent additional inputs, branches, statute references, or legal claims beyond what is in `artifact-data.json`.
