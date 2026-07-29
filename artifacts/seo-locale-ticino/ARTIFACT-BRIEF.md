# Artifact Brief — Audit SEO locale per il Ticino

**Article:** `seo-locale-ticino` ("SEO locale in Ticino: come farsi trovare a Lugano, Bellinzona e Locarno senza riempire il sito di pagine vuote")
**Language:** Italian (it) — the article and artifact both exist in Italian only.
**Artifact type:** Single-subject self-audit scorecard (one candidate location scored at a time against seven fixed criteria, producing a verdict plus a matching action list). This is a distinct mechanic from the English sibling article's tool: `local-seo-switzerland-doorway-pages`'s "Local SEO Evidence and Location-Page Planner" lets the reader add an open-ended, repeatable list of locations and classifies each independently. This Italian artifact does not manage a list at all — it is a fixed scorecard the reader fills in once per location they are actually deciding about, with a seventh criterion (administrative status after a Ticino municipal merger) and a hard override rule that have no equivalent in the English tool.

## User problem

The article's thesis is that a dedicated page for a Ticino comune is justified only when it clears a four-part evidence test, and that Ticino's own municipal geography adds a fifth wrinkle no other Swiss region has in the same way: several well-known place names people still search for (Breganzona, Pregassona in Lugano; Giubiasco in Bellinzona) are no longer separate comuni at all, having been absorbed into a larger città through a comunal aggregazione. A reader who accepts the article's logic still needs to apply the full test — including the administrative-status check — to one specific location they are actually deciding about right now, and get a concrete, honest verdict plus the right next step (publish, strengthen first, or declare a service area instead).

## Audience

A Ticino SME owner, marketer or web-project lead — a tradesperson, a fiduciary, a small retail or hospitality business — who is deciding whether a specific comune, ex-comune or quartiere deserves its own page, often after a freelance SEO consultant or generic checklist has already recommended "one page per comune served" without applying any real test to that recommendation.

## Why an interactive artifact beats a static PDF

A printed checklist can list seven criteria once, but it cannot compute a verdict from the reader's own combination of answers, apply the one non-negotiable override rule (administrative status plus internal duplication risk) automatically, or switch the displayed next-step content (a full sufficiency checklist vs. service-area guidance) based on that verdict. The value is in the branching and the override logic, not in the list of questions alone — a static document would need the reader to do that arithmetic and rule-checking by hand.

## Inputs

For the one location the reader is auditing:

- A free-text **location name** field (e.g. "Bellinzona," "Giubiasco," "sede di Chiasso") — no location is pre-populated.
- Seven answers, one per `criteria` item in `artifact-data.json`, each `si` / `parziale` / `no` (see `responseOptions`, `responseLabels`, `defaultResponse`). An unanswered question counts as `no` — the tool never rewards an unanswered question with a favourable score.

## Calculation / decision logic

See `artifact-data.json` → `scoring`, `nonNegotiableOverride`, `sufficiencyChecklist`, and `serviceAreaGuidance` for the exact rules:

1. Score the location: `si` = 1, `parziale` = 0.5, `no` = 0, summed across the seven criteria (max score 7). Never shown as a percentage or a school-style grade.
2. Match the score against `scoring.verdicts` in descending `minScore` order: 5.5 or above → **Pagina giustificata**; 3 to just under 5.5 → **Zona grigia**; below 3 → **Area di servizio**.
3. **Non-negotiable override, evaluated independently of the score:** if `entita-amministrativa` is answered `no` (the comune is already a merged quartiere) AND `assenza-duplicazione` is also answered `no` (the business already has another of its own pages covering an overlapping area), always display the `nonNegotiableOverride` warning — regardless of the computed score or verdict. This is the artifact's one hard rule and it must never be suppressed or softened by a high score on the other five criteria.
4. If the verdict is **Pagina giustificata**, display the full `sufficiencyChecklist.items` list as a pre-publication checklist specific to this location.
5. If the verdict is **Zona grigia** or **Area di servizio**, display `serviceAreaGuidance.rules` instead, pointing to Google's own service-area mechanism and a single shared coverage page.

**Do not invent a blended "SEO score," a percentage, a star rating, or any language implying a guaranteed ranking or indexing outcome.** The tool only classifies the one location the reader describes, using only the reader's own answers.

## Outputs

- One result panel: location name, score out of 7, verdict label and message.
- The non-negotiable override banner, shown above everything else whenever its condition is met, independent of the verdict.
- Either the sufficiency checklist (Pagina giustificata) or the service-area guidance (Zona grigia / Area di servizio) — never both, never neither.
- A short, plain restatement that the reader can re-run the audit for a different location at any time by changing the name field and answers — since this is a single-subject tool, not a saved list.

## Error states

- No location name entered: allow scoring to run anyway (the criteria do not require a name to compute), but label the result panel "Sede senza nome" instead of leaving it blank, so the reader notices before publishing anything based on it.
- All seven answers left at the default (`no`): score and classify normally as "Area di servizio" — this is a correct, honest outcome, not an error, and must not be flagged as incomplete or suppressed.
- The non-negotiable override condition and a high raw score (e.g. 6/7) occurring together: always show the override banner above the verdict, never let a high score visually outrank or crowd out the override warning.

## Privacy considerations

All scoring runs client-side in the browser. No website, Google Business Profile, or search ranking data is fetched, scanned or verified automatically — every input is the reader's own self-assessment of one location. Nothing entered is transmitted to any server or analytics endpoint. If the tool offers to remember the last-entered location between visits, that must be `localStorage` only, clearly labelled as on-device, with a visible "cancella dati salvati" control. State the no-transmission fact explicitly in a persistent footer note.

## Accessibility requirements

The location-name field and each of the seven criteria use real, labelled form controls — a text input with an associated `<label>`, and a native radio group (or equivalent) for each Sì/Parziale/No choice, never colour-only selection. The `whyItMatters` reference text for each criterion is reachable and readable without a mouse hover (an always-available disclosure element such as `<details>`, not a hover-only tooltip). The verdict, the override banner and the checklist/guidance content update inside an `aria-live="polite"` region as answers change, so a screen-reader user hears the new result. Verdict and override are always conveyed through explicit text labels, never colour alone. All controls are keyboard-operable with visible focus states.

## Mobile behaviour

Single-column layout: location name field, then the seven criteria stacked one below another, each with its question, its three-way answer control, and its collapsible "perché conta" note. The result panel (score, verdict, override banner if triggered, checklist or guidance) renders below the questions, not in a separate tab or modal. Touch targets for the Sì/Parziale/No control are large and clearly separated.

## CTA

One contextual, secondary link shown once below the result panel, regardless of verdict: "Colloquio gratuito: contiamo insieme le vostre sedi reali" → `/it/servizi/seo/`. Shown even when the verdict is "Area di servizio" — the tool must stay useful and non-pushy no matter what the honest outcome is.

## Disclaimer

"Questo strumento classifica la sede che descrivete usando solo le risposte che fornite voi. Non analizza il vostro sito, il vostro profilo Google Business o dati di posizionamento reali, e non garantisce alcun risultato di ranking, indicizzazione o traffico. È un punto di partenza strutturato per decidere se costruire una pagina, non un audit SEO né un parere legale sulle policy di Google. Tutta l'elaborazione avviene nel vostro browser; nulla di ciò che inserite viene trasmesso o conservato altrove." Shown persistently below the result panel, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, form-first layout: a short intro, the location-name field, seven stacked criteria with their answer controls, one result panel. No map graphics, no gauge dials, no single combined "score out of 100" — the tool's credibility comes from showing exactly which of the seven answers produced the verdict and whether the override rule fired, not from a decorative aggregate grade. The override banner may use a distinct bordered treatment since it is the one non-negotiable signal in the tool, but it must always carry its own text label, never rely on colour alone.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in Italian called "Audit SEO locale per il Ticino". Using the fixed data in the accompanying `artifact-data.json` — use exactly its `criteria`, `responseOptions`, `responseLabels`, `defaultResponse`, `scoring`, `nonNegotiableOverride`, `sufficiencyChecklist`, `serviceAreaGuidance`, and `disclaimer` fields, and do not invent any additional criterion, score, percentage, or ranking guarantee — show a single free-text field for the location's name (e.g. "Bellinzona" or "Giubiasco"), then the seven `criteria` items in order, each with its `question` and a three-way Sì / Parziale o incerto / No control (no default visual selection, though an unanswered question must score as "no" per the scoring rules), plus its `whyItMatters` text reachable via an always-available disclosure element such as `<details>`, never hover-only. As answers change, compute the score (sì=1, parziale=0.5, no=0, summed across the seven criteria, max 7) and match it against `scoring.verdicts` in descending `minScore` order to show the verdict label and message. Independently of the score, if the `entita-amministrativa` criterion is answered "no" AND the `assenza-duplicazione` criterion is also answered "no", always render the `nonNegotiableOverride` banner above the verdict, regardless of how high the score is — this banner must never be hidden, softened, or outranked visually by a good score. Beneath a "Pagina giustificata" verdict, render the full `sufficiencyChecklist.items` as a checklist; beneath "Zona grigia" or "Area di servizio", render `serviceAreaGuidance.rules` instead. If no location name has been entered, label the result panel "Sede senza nome" rather than leaving it blank, but still compute and show the result. Make every control keyboard-accessible with real `<label>` elements and an `aria-live="polite"` region covering the verdict, the override banner and the checklist/guidance content. Use a single-column, touch-friendly mobile layout with the seven criteria stacked vertically and large, clearly separated touch targets for the Sì/Parziale/No control. End the result panel with one plain secondary link, "Colloquio gratuito: contiamo insieme le vostre sedi reali", pointing to weissmann.ai/it/servizi/seo/ — shown for every verdict, including "Area di servizio", with no urgency language. Always display the `disclaimer` text persistently below the result panel, never behind a click. Do all computation client-side with no network calls and no data leaving the browser; if you add "remember my last location," use `localStorage` only, label it as on-device, and provide a visible "cancella dati salvati" control. Style it cleanly: an intro line, a location-name field, seven stacked criteria, one result panel — no map graphics, no gauge dials, no single blended score out of 100 — the tool's credibility comes from showing exactly which of the seven answers produced the verdict and whether the override rule fired, not from a decorative aggregate grade.
