# Artifact Brief — +41 Number Compatibility Mapper

**Article:** `keep-existing-swiss-number-ai-assistant` ("Kann ich meine bestehende Schweizer Telefonnummer mit einem KI-Assistenten behalten?")
**Language:** German (de) — the article and artifact both exist in German only.
**Artifact type:** Branching decision tree / configurator (distinct from the weighted-comparator mechanic used in `swiss-ai-phone-assistant-provider-comparison`).

## User problem

The article explains that "keeping your number" almost always means one of five different technical situations (mobile forwarding, landline forwarding, PBX with or without a SIP trunk, SIP trunk without a PBX), plus a separate regulatory question (real porting) that most readers don't actually need. A reader who has just finished the article still has to mentally map their own setup onto the right paragraph and assemble their own question list. The Mapper does that mapping for them: a few short questions in, a specific path and a ready-to-use question list for their telecom provider come out.

## Audience

Same as the article: a Swiss SME owner, office manager or founder who wants to add an AI phone assistant, is not a telecom specialist, and wants to walk into (or call) a conversation with their phone provider already knowing which questions matter for their exact setup.

## Why an interactive artifact beats a static PDF

The right answer depends on four independent yes/no/either branches (number type, PBX, SIP trunk, plus two optional toggles for business numbers and full porting). A static checklist would have to either show all five paths at once (overwhelming, and readers skim past the parts that apply to them) or force the reader to self-navigate a text decision tree (error-prone). An interactive tool asks the questions once and shows only the relevant path, checklist and rollback note — plus it can insert the reader's own provider name into the output questions, which a static document cannot do.

## Inputs

1. **Nummerntyp** (required, radio): Mobilnummer / Festnetznummer.
2. **Eigene Telefonanlage (PBX)?** (required, radio): Ja / Nein.
3. **SIP-Trunk vorhanden?** (required, radio): Ja / Nein / Weiss ich nicht — with a one-line help text explaining what a SIP trunk is, since many readers won't know.
4. **Aktueller Telefonanbieter bekannt?** (optional, radio): Ja (reveals a text field for the provider name, used to personalize the output text, e.g. "Fragen Sie Swisscom: …") / Nein (shows a short tip on how to find out instead of blocking the tool).
5. **Ist es eine Geschäftsnummer?** (optional checkbox, e.g. +41 051 / +41 058) — appends the business-document checklist.
6. **Ich plane einen kompletten Anbieterwechsel (echte Portierung)** (optional checkbox) — appends the full porting-preconditions checklist and the 20–40-working-day timeout warning, regardless of which technical path was selected. This directly operationalizes the article's central thesis: forwarding and porting are different questions, and most readers only need one of them.

## Decision logic

See `artifact-data.json` for the full data. Matching order (first match wins) using inputs 1–3:

1. `hasPbx = yes` AND `hasSipTrunk = yes` → path `pbx-sip`.
2. `hasPbx = yes` AND `hasSipTrunk` is `no` or `unknown` → path `pbx-nosip`.
3. `hasPbx = no` AND `hasSipTrunk = yes` → path `sip-nopbx`.
4. `hasPbx = no` AND `hasSipTrunk` is `no`/`unknown` AND `numberType = mobile` → path `mobile-forward`.
5. `hasPbx = no` AND `hasSipTrunk` is `no`/`unknown` AND `numberType = landline` → path `landline-forward`.

Each path object carries a fixed `label`, `explanation`, `checklist` (3 questions) and `rollback` note — all phrased consistently with the article body, not freshly invented. After the primary path renders, append (in this order, if selected): the business-number addendum, then the full-portation addendum. If `providerKnown = yes` and a name was typed, replace the generic "Ihrem Telefonanbieter" / "unserem Anbieter" phrasing in the checklist items with the typed name where grammatically sensible (simple string substitution, not a rewrite of the sentence).

## Outputs

- A path label ("Ihr Weg: …") and one short explanation paragraph.
- A checklist of 3 (plus, if applicable, up to 8 more from the two addenda) concrete questions, rendered as a real, copyable list — the reader should be able to select and paste it into an email to their provider.
- A rollback/fallback note specific to the path (forwarding = instantly reversible; PBX/SIP = depends on documentation; full porting = no undo button, must re-port).
- The `weissmannNote` from the data file, shown once, low-key, near the bottom of the result — not as a sales pitch, but as the same honesty check the article applies to itself: what Weissmann's own public materials do and do not describe.
- The persistent disclaimer (see below).
- A link back to the full article for readers who want the reasoning behind a given path, not just the checklist.

## Error states

- If `numberType` or `hasPbx` has not been answered yet, show a neutral placeholder ("Beantworten Sie die beiden ersten Fragen, um Ihren Weg zu sehen") instead of a broken or empty result panel.
- If `providerKnown = yes` but the text field is left empty, fall back silently to the generic "Ihrem Telefonanbieter" phrasing rather than showing an empty gap in a sentence.
- If `providerKnown = no`, show the `unknownProviderTip` block instead of the personalization, not a dead end.

## Privacy considerations

All computation happens client-side in the browser. No data — including any typed provider name — is transmitted, stored, or sent to any server or analytics endpoint. State this explicitly in a small, persistent footer note, matching the honesty standard the article itself sets.

## Accessibility requirements

Radio groups wrapped in `<fieldset>`/`<legend>` with the input's `label` text; all controls keyboard-operable with a visible focus state; the result panel uses real heading and list markup (not styled `div`s) so screen readers can navigate path label → explanation → checklist → rollback in order; no information conveyed by color alone.

## Mobile behaviour

Single-column stacked layout; radio/checkbox targets sized for touch (minimum ~44px); the result panel appears directly below the questions (no separate tab or hidden panel) so a phone user doesn't have to scroll back and forth between questions and answer.

## CTA

One contextual, secondary link at the bottom of the result panel: "Kostenloses Erstgespräch: Wir klären, welcher Anschluss zu Ihnen passt" → `/kontakt/`. Not repeated per path, no urgency language, consistent with the article's own CTA and the master prompt's promotion rules (no fake scarcity, no forced pitch).

## Disclaimer

"Diese Einschätzung fasst öffentlich zugängliche Informationen von BAKOM und ombudscom sowie die öffentlich einsehbaren Angaben von Weissmann AI zusammen (Stand 29. Juli 2026). Sie ersetzt keine Rechtsberatung und keine verbindliche Auskunft Ihres Telefon- oder KI-Anbieters — Verfahren und Fristen können sich ändern." Shown persistently below the result, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale) — a plain, form-first layout: questions at the top, one clearly delineated result card below. No decorative flowchart graphics, no gamified progress wheel, no fake-precision scoring — the honest output here is a short paragraph and a text checklist, and the design should not dress that up as more elaborate than it is.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in German called "+41 Nummer-Kompatibilitäts-Mapper". Ask the user four questions in order: (1) Nummerntyp — Mobilnummer oder Festnetznummer (radio, required); (2) Eigene Telefonanlage (PBX)? — Ja/Nein (radio, required); (3) Läuft Ihre Telefonie über einen SIP-Trunk? — Ja/Nein/Weiss ich nicht (radio, required, with a one-line explanation of what a SIP trunk is); (4) Kennen Sie Ihren aktuellen Telefonanbieter? — Ja (reveals a text input for the provider name) / Nein (shows a short tip to check the last invoice or the customer portal instead). Add two optional checkboxes: "Ist es eine Geschäftsnummer (z. B. +41 051 / +41 058)?" and "Ich plane einen kompletten Anbieterwechsel (echte Portierung), nicht nur eine Weiterleitung." Using the fixed data and matching rules in the accompanying `artifact-data.json` (do not invent new paths, questions or facts — use exactly the `paths`, `businessNumberAddendum`, `planningFullPortationAddendum`, `weissmannNote` and `disclaimer` fields provided), determine which of the five paths (`pbx-sip`, `pbx-nosip`, `sip-nopbx`, `mobile-forward`, `landline-forward`) applies from questions 1–3, and render: a path label, one explanation paragraph, a copyable checklist of questions to ask the provider (personalized with the typed provider name where the reader supplied one, otherwise generic phrasing), a rollback/fallback note, the two optional addenda if their checkboxes are checked, the Weissmann honesty note, and the persistent disclaimer text. If question 1 or 2 is unanswered, show a neutral placeholder instead of a result. Everything must run client-side with zero network calls and zero data collection — state this in a small footer note. Make all controls keyboard-accessible with visible focus states and real semantic list/heading markup for the result. Use a single-column, touch-friendly mobile layout. End the result panel with one plain secondary link, "Kostenloses Erstgespräch: Wir klären, welcher Anschluss zu Ihnen passt", pointing to weissmann.ai/kontakt/ — no urgency language, no repeated CTAs. Style it cleanly and honestly: a plain form and a plain result card, no decorative flowchart graphics or gamified scoring.
