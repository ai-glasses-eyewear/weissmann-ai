# Artifact Brief — Swiss Call Recording Decision Tree & Announcement Builder

**Article:** `ai-call-recording-legality-switzerland` ("Darf ein KI-Telefonassistent Gespräche aufzeichnen und transkribieren?")
**Language:** German (de) — the article and artifact both exist in German only.
**Artifact type:** Decision tree + text generator (call type → applicable StGB rule → draft spoken announcement).

## User problem

A Swiss SME owner has just read that recording phone calls is sometimes legal without asking first and sometimes a criminal offence — and that the difference depends on what the call is about, not on whether an AI or a human answers. They now have several call types running through the same phone number (reservations, support, complaints, internal calls) and no simple way to work out, type by type, which rule applies and what — if anything — they need to say out loud before the recording starts. The article explains the logic; the artifact applies it to their actual call types and hands them usable announcement text.

## Audience

Same as the article: a Swiss SME owner or manager (hospitality, healthcare reception, trades, professional services) configuring or auditing an AI phone assistant's recording settings, non-technical, reading in German.

## Why an interactive artifact beats a static PDF

The legal answer is genuinely conditional on multiple factors at once (call content, who is on the line, what the recording will be used for) — a flat checklist forces the reader to re-derive the combination themselves and risks them picking the wrong branch. A short decision sequence applies the same fixed logic from `artifact-data.json` to the reader's actual situation and, where a spoken announcement is required or merely advisable, drafts the text instead of leaving the reader to write it from a description. A PDF can list the rules; only an interactive tool can tell a specific reader which one applies to them right now and generate the sentence they can read into their call-flow configuration.

## Inputs

1. **Anruftyp** (single-select, required): Notruf/Sicherheits- oder Rettungsdienst; Bestellung/Auftrag; Reservation/Terminvereinbarung; Support/technische Hilfe; Beratung/allgemeine Auskunft; Reklamation/Beschwerde; Gemischt oder unklar.
2. **Wer ruft an?** (toggle, required): Kundschaft/externe Person, oder eigene Mitarbeitende/interner Anruf.
3. **Wofür wird die Aufnahme genutzt?** (single-select, shown only for Bestellung/Reservation): Ausschliesslich zur Beweissicherung des Geschäfts, oder auch für Schulung/KI-Training/Qualitätskontrolle/Marketing.
4. Optional free-text fields to personalise the generated announcement: Firmenname, präzise Zweckformulierung, optional Zusatzzweck — used only to fill placeholders in the output text, never sent anywhere.

## Decision logic

Evaluate the fixed, ordered `decisionTree` array in `artifact-data.json` (first match wins, exactly five branches, mirrors the article's framework):

1. **Mitarbeitende/interner Anruf** → always routes to the "Sonderfall" branch regardless of call type: no Massengeschäft exception applies to a business recording its own staff; show the employee-caution note and a recommendation to get labour-law advice instead of generating a generic script.
2. **Notruf** → Art. 179quinquies Abs. 1 lit. a StGB: no prior consent needed, purpose limited to call-origin verification / identifying an endangered person / preventing anonymous calls. No announcement generated.
3. **Bestellung/Reservation + "nur Beweissicherung"** → Art. 179quinquies Abs. 1 lit. b StGB (Massengeschäft): no prior consent legally required; purpose strictly limited to evidencing the transaction. Offer the optional courtesy-notice template, clearly labelled as not legally required.
4. **Bestellung/Reservation + "auch andere Nutzung"** → the recording itself still needs no prior consent, but the additional use (training/QM/marketing) does — generate the extended-consent announcement template that names both the base purpose and the extra purpose.
5. **Support/Beratung/Beschwerde/Gemischt** → general rule (Art. 179bis/179ter StGB): prior express consent required — generate the full consent-required announcement template with a real opt-out sentence.

Do not invent additional branches or soften the "gemischt/unklar" case into a false-confident answer — it must resolve to the same cautious general-rule branch as Support/Beratung, matching the article's "im Zweifel wie zustimmungspflichtig behandeln" guidance.

## Outputs

- A result card showing: the applicable badge (e.g. "Keine vorherige Einwilligung nötig – aber zweckgebunden"), the statute reference, a one-paragraph plain-language explanation, and the purpose limitation where one applies.
- Where `announcementNeeded` is true (or the courtesy template is offered), an editable, copyable draft announcement text with the reader's placeholders filled in, plus a "copy to clipboard" action.
- For the employee branch, no generated script — instead a clearly marked caution box pointing to the employee-caution note and recommending individual labour-law advice.
- A persistent link back to the canonical article at `https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-gespraeche-aufzeichnen/` for the full reasoning.

## Error states

- No Anruftyp selected: disable the result area and prompt the reader to choose one; never default silently to the most permissive branch.
- "Gemischt oder unklar" selected: still produce a result (the general-rule branch), but visibly flag it as the cautious default rather than a definitive classification.
- Empty placeholder fields when generating a script: fall back to the neutral example values shown in `artifact-data.json` (e.g. "Ihre Anfrage korrekt zu bearbeiten") rather than leaving `{zweck}` unresolved in the output text.

## Privacy considerations

All logic runs client-side; no call type, company name, or generated script is transmitted, stored, or logged anywhere. State this explicitly in a persistent footer note, and note that the tool is for configuring an announcement, not for recording or storing any real caller's data.

## Accessibility requirements

Every input is a real, keyboard-operable form control (radio group / select / text input) with visible labels and focus states — no click-only custom widgets. The result card uses real heading and paragraph markup so screen readers announce the rule change. The badge's meaning must never rely on colour alone (pair every colour with the text label, e.g. "Keine vorherige Einwilligung nötig" printed in full, not just a green dot).

## Mobile behaviour

Single-column stepper: Anruftyp → Wer ruft an → (bedingt) Nutzungszweck → Ergebnis, each step full-width with large tap targets; the generated announcement text sits in a scrollable, copyable text block that never requires horizontal scrolling; the "Zur Kurzformel im Artikel" link stays reachable without excessive scrolling on a phone screen.

## CTA

Contextual only, shown below the result card: "Ansage in Ihren KI-Telefonassistenten einbauen lassen" linking to the phone-assistant service page — not shown as a blocking step before the reader gets their result, and never phrased with urgency or scarcity language.

## Disclaimer

"Dieses Werkzeug ordnet die Rechtslage anhand von Art. 179bis, 179ter und 179quinquies StGB sowie öffentlichen Behördenquellen ein. Es ist keine Rechtsberatung und ersetzt keine individuelle Abklärung im Einzelfall — insbesondere nicht bei Personalfragen oder bei Anrufen mit gemischtem oder unklarem Inhalt. Stand der Rechtslage: 29. Juli 2026." Shown persistently (not only on first load), and repeated next to the employee-branch caution box specifically.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--line`, `--radius`) — a plain, editorial step-by-step flow rather than a graphical tree diagram or gamified quiz; the badge uses the accent colour sparingly for the result state only, never as decoration; the announcement text output is styled like a quotable script (monospace or clearly bordered block), not a form field that looks disposable.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in German called "Schweizer Aufzeichnungs-Entscheidungsbaum & Ansage-Generator". It walks a Swiss SME user through a short step sequence: (1) select one call type from Notruf, Bestellung/Auftrag, Reservation/Terminvereinbarung, Support/technische Hilfe, Beratung/allgemeine Auskunft, Reklamation/Beschwerde, or Gemischt/unklar; (2) select whether the caller is external customer/public ("Kundschaft") or the business's own staff/an internal call ("Mitarbeitende"); (3) if the call type is Bestellung or Reservation, ask whether the recording will be used only as evidence of the transaction or also for training/quality-control/marketing. Apply the fixed, ordered decision rules supplied in the accompanying `artifact-data.json` (`decisionTree` array, first match wins — employee calls always route to a special caution branch regardless of call type; emergency calls need no consent; genuine Bestellung/Reservation calls used only for evidence need no prior consent but are purpose-bound; the same calls used for extra purposes need a second, separate consent for that extra purpose; everything else needs prior express consent) to show a result card with: a plain-language badge, the exact statute reference, a short explanation, and the purpose limitation if any. Where the rule requires or suggests a spoken announcement, generate editable, copyable German announcement text from the matching template in `artifact-data.json.announcementTemplates`, filling in placeholders (Firmenname, Zweck, Zusatzzweck) from optional user text inputs, falling back to the example values if left blank. For the employee/staff branch, do not generate a generic script — show the `employee_caution` note instead and recommend individual labour-law advice. Persistently display this disclaimer, not just on load: "Dieses Werkzeug ordnet die Rechtslage anhand von Art. 179bis, 179ter und 179quinquies StGB sowie öffentlichen Behördenquellen ein. Es ist keine Rechtsberatung und ersetzt keine individuelle Abklärung im Einzelfall. Stand der Rechtslage: 29. Juli 2026." Make it fully keyboard-accessible with real form controls and visible focus states, mobile-responsive as a single-column stepper, collect and transmit no data anywhere (all logic runs client-side), and include one contextual, non-urgent link to weissmann.ai's phone-assistant service page below the result. Style it with a clean, editorial, Swiss-precise look — muted colours, generous whitespace, no gamified graphics, no tree-diagram visualisation, no fake precision. Do not invent additional call types, branches, or legal claims beyond what is in `artifact-data.json`.
