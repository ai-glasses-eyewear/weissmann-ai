# Artifact Brief — Integration Architecture Builder

**Article:** `ai-phone-assistant-calendar-crm-integration` ("KI-Telefonassistent mit Kalender, CRM und Buchungssystem verbinden: Was funktioniert wirklich?")
**Language:** German (de) — the article and artifact both exist in German only.
**Artifact type:** Branching decision tree / configurator (same general mechanic family as `keep-existing-swiss-number-ai-assistant`'s Number Mapper, but built on a completely different decision variable — API/webhook/middleware/RPA architecture instead of telecom forwarding vs. porting — so the logic, questions and output content are original to this article).

## User problem

The article's thesis is that "Integration" is marketing shorthand for five technically distinct situations, and that the single fact deciding which one applies — whether the target system has a documented API — is rarely surfaced before a reader commits to a package or a quote. A reader who has finished the article understands the five paths in the abstract but still has to map their own calendar/CRM/booking system onto the right one. The Builder does that mapping directly: a handful of short questions about the reader's own system produce one concrete path, a tailored vendor-question checklist, and a plain-language next step — instead of the reader re-reading five paragraphs and guessing which applies.

## Audience

Same as the article: a Swiss SME owner, office manager or founder evaluating an AI phone assistant who is not a developer, does not know whether their calendar/CRM/booking software has an API, and wants to walk into (or send an email to) a vendor conversation with the right question already in hand instead of accepting "ja, das lässt sich integrieren" at face value.

## Why an interactive artifact beats a static PDF

The right answer depends on up to four branching, partly conditional inputs (system category, native-connector availability, API availability, webhook support) plus two optional risk modifiers (no in-house technical owner, sensitive data). A static checklist would either have to print all five paths at once — most of which don't apply to a given reader and would be skimmed past — or force the reader to self-navigate a text decision tree, which is exactly the kind of "read five paragraphs, guess which applies" friction the artifact exists to remove. An interactive tool asks the four questions once, resolves the branch automatically, and inserts the reader's own system category ("Ihr Kalender" / "Ihr CRM" / "Ihr Buchungssystem") into the output text so the checklist reads as if written for their situation, not a generic template.

## Inputs

1. **Um welche Art von System geht es?** (required, radio): Kalender / CRM / Buchungssystem — used only to substitute `{system}` in the output text (`Ihr Kalender` / `Ihr CRM` / `Ihr Buchungssystem`), not to change the branching logic itself.
2. **Hat dieses System eine dokumentierte, öffentlich zugängliche API?** (required, radio): Ja / Nein / Weiss ich nicht — with a one-line help text pointing the reader to check the vendor's website for "API"/"Entwickler"/"Developer"/"Integrationen" or to ask support directly.
3. **Bietet Ihr KI-Telefonassistent-Anbieter für genau dieses System bereits eine fertige, native Integration an?** (required, radio): Ja / Nein / Weiss ich nicht — this takes priority over the API question in the matching logic, because a native connector can exist even when the reader themselves doesn't know whether the underlying system has a public API.
4. **Unterstützt das System Webhooks?** (optional, radio, shown only when `hasApi = yes`): Ja / Nein / Weiss ich nicht.
5. **Niemand bei uns kann Zugangsdaten und laufende Wartung einer technischen Anbindung verantworten.** (optional checkbox) — appends the no-tech-team addendum, relevant mainly to the API and RPA paths.
6. **Wir verarbeiten über dieses System besonders sensible Daten (z. B. Gesundheitsdaten).** (optional checkbox) — appends the sensitive-data addendum, which steers away from Browser-Automation and unreviewed middleware.

## Decision logic

See `artifact-data.json` for the full data. Matching order (first match wins), evaluated against `hasNativeConnector`, `hasApi`, `hasWebhooks`:

1. `hasNativeConnector = yes` → path `native` (wins regardless of the other answers — a ready-made connector is the best case no matter what the reader knows about the underlying API).
2. `hasNativeConnector` is `no`/`unknown` AND `hasApi = yes` AND `hasWebhooks = yes` → path `api-webhook`.
3. `hasNativeConnector` is `no`/`unknown` AND `hasApi = yes` AND `hasWebhooks` is `no`/`unknown` → path `api-poll`.
4. `hasNativeConnector` is `no`/`unknown` AND `hasApi = unknown` → path `check-first`.
5. `hasNativeConnector` is `no`/`unknown` AND `hasApi = no` → path `no-api`.

Each path object carries a fixed `label`, `explanation` (with a `{system}` placeholder), a `checklist` (3–4 vendor questions) and a `nextStep` — all phrased consistently with the article body, not freshly invented. After the primary path renders, append (in this order, if selected): `noTechTeamAddendum`, then `sensitiveDataAddendum`. Replace every `{system}` token in the rendered text with the `phrase` value of the selected `systemCategory` option (simple string substitution).

## Outputs

- A path label ("Ihr Weg: …") and one explanation paragraph, with `{system}` resolved to the reader's own category.
- A checklist of 3–4 concrete vendor questions, rendered as real, copyable list text — the reader should be able to select and paste it into an email to their software vendor or phone-assistant provider.
- A short, concrete `nextStep` line.
- Up to two addenda (no-tech-team, sensitive-data) if the corresponding checkboxes are ticked.
- The `weissmannNote` from the data file, shown once, low-key, near the bottom of the result — an honesty check consistent with the article, not a sales pitch: what Weissmann's own published packages do and do not include, and that the concrete system is still checked case by case.
- The persistent `disclaimer` (see below).
- A link back to the full article for readers who want the underlying reasoning, not just the checklist.

## Error states

- If `systemCategory`, `hasApi` or `hasNativeConnector` has not been answered yet, show a neutral placeholder ("Beantworten Sie die drei ersten Fragen, um Ihren Weg zu sehen") instead of a broken or empty result panel.
- If `hasApi ≠ yes`, hide question 4 (webhooks) entirely rather than showing a disabled or irrelevant control.
- Unknown answers (`unknown`) are treated as legitimate, common inputs (see the `check-first` path) — never penalized or flagged as an error.

## Privacy considerations

All computation happens client-side in the browser. No data — including the selected system category or checkbox answers — is transmitted, stored, or sent to any server or analytics endpoint. State this explicitly in a small, persistent footer note, matching the honesty standard the article itself sets when discussing where middleware platforms process data.

## Accessibility requirements

Radio groups wrapped in `<fieldset>`/`<legend>` with the input's `label` text; checkboxes individually labelled; all controls keyboard-operable with a visible focus state; the result panel uses real heading and list markup (not styled `div`s) so screen readers can navigate path label → explanation → checklist → next step → addenda in order; no information conveyed by color alone.

## Mobile behaviour

Single-column stacked layout; radio/checkbox targets sized for touch (minimum ~44px); the webhook question appears/disappears inline (no layout jump or hidden accordion) as soon as the API question is answered; the result panel appears directly below the questions so a phone user doesn't have to scroll back and forth between questions and answer.

## CTA

One contextual, secondary link at the bottom of the result panel: "Kostenloses Erstgespräch: Wir prüfen ehrlich, was bei Ihrem System technisch möglich ist" → `/kontakt/`. Not repeated per path, no urgency language, consistent with the article's own CTA and the master prompt's promotion rules (no fake scarcity, no forced pitch, no automatic Weissmann recommendation baked into the branching logic itself).

## Disclaimer

"Diese Einschätzung ordnet allgemeine technische Zusammenhänge (API, Webhook, Middleware, Browser-Automation) ein, basierend auf öffentlicher technischer Dokumentation von Microsoft und Google (Stand 29. Juli 2026) sowie den öffentlich einsehbaren Angaben von Weissmann AI. Sie ersetzt keine verbindliche technische Abklärung mit dem Hersteller Ihres konkreten Systems und keine Rechtsberatung zu Datenschutzfragen." Shown persistently below the result, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale) — a plain, form-first layout: questions at the top, one clearly delineated result card below. No decorative architecture diagrams, no gamified progress bar, no fake-precision scoring — the honest output here is a short paragraph, a text checklist and a next step, and the design should not dress that up as more elaborate than it is.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in German called "Integration Architecture Builder". Ask the user four questions in order: (1) Um welche Art von System geht es? — Kalender / CRM / Buchungssystem (radio, required); (2) Hat dieses System eine dokumentierte, öffentlich zugängliche API? — Ja / Nein / Weiss ich nicht (radio, required, with a one-line help text suggesting the reader check the vendor's website for "API"/"Entwickler"/"Developer"/"Integrationen" or ask support directly); (3) Bietet Ihr KI-Telefonassistent-Anbieter für genau dieses System bereits eine fertige, native Integration an? — Ja / Nein / Weiss ich nicht (radio, required); (4) Unterstützt das System Webhooks? — Ja / Nein / Weiss ich nicht (radio, optional, shown only when question 2 is answered "Ja"). Add two optional checkboxes: "Niemand bei uns kann Zugangsdaten und laufende Wartung einer technischen Anbindung verantworten." and "Wir verarbeiten über dieses System besonders sensible Daten (z. B. Gesundheitsdaten)." Using the fixed data and matching rules in the accompanying `artifact-data.json` (do not invent new paths, questions or facts — use exactly the `paths`, `noTechTeamAddendum`, `sensitiveDataAddendum`, `weissmannNote` and `disclaimer` fields provided), determine which of the five paths (`native`, `api-webhook`, `api-poll`, `check-first`, `no-api`) applies using this priority order: native connector "Ja" always wins regardless of the other answers; otherwise use the API and webhook answers as specified in each path's `matchWhen`. Render: a path label, one explanation paragraph with every `{system}` placeholder replaced by the selected category's `phrase` (Ihr Kalender / Ihr CRM / Ihr Buchungssystem), a copyable checklist of vendor questions (also with `{system}` resolved), a next-step line, the two optional addenda if their checkboxes are checked, the Weissmann honesty note, and the persistent disclaimer text. If questions 1–3 are not all answered, show a neutral placeholder instead of a result. Question 4 should only appear once question 2 is answered "Ja". Everything must run client-side with zero network calls and zero data collection — state this in a small footer note. Make all controls keyboard-accessible with visible focus states and real semantic list/heading markup for the result. Use a single-column, touch-friendly mobile layout. End the result panel with one plain secondary link, "Kostenloses Erstgespräch: Wir prüfen ehrlich, was bei Ihrem System technisch möglich ist", pointing to weissmann.ai/kontakt/ — no urgency language, no repeated CTAs. Style it cleanly and honestly: a plain form and a plain result card, no decorative architecture diagrams or gamified scoring.
