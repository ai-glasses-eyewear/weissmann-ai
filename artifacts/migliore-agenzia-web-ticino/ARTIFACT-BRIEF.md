# Artifact Brief — Comparatore agenzie web Ticino

**Article:** `migliore-agenzia-web-ticino` ("La migliore agenzia web in Ticino? Prima decidiamo cosa vuol dire migliore")
**Language:** Italian (it) — the article and artifact both exist in Italian only.
**Artifact type:** Proximity-fork classifier plus qualitative suitability profile per agency (no numeric score, no ranking). This is a third, distinct mechanic from its two siblings: the German article (`webagentur-schweiz-vergleichen`) produces a weighted 1–5 score summed and ranked across 7 flat criteria; the English article (`best-web-design-agencies-switzerland`) produces a 4-stage chronological due-diligence audit trail (initial call → proposal → reference → contract) with a categorical status per item and no score. This Italian artifact instead organises everything around a single Ticino-specific fork — physical proximity vs. remote capability — answered *first* for each agency, which unlocks a tailored set of 2–3 proof questions specific to that category, followed by six shared dimension checks. The output is a side-by-side set of qualitative "suitability cards," never a ranked total.

## User problem

A Ticino SME owner (hotel, artisan workshop, studio professionale, retail shop) has two or three real web agency quotes and no consistent way to work through the one fork that is genuinely specific to this small, geographically concentrated market: is a physically local provider worth the (often higher, less competitive) price it implies, or is a remote-capable provider — from Zürich, Basel, or across the nearby Italian border — actually the better fit once its process is verified? The article explains why this fork matters more in Ticino than in larger Swiss markets; the artifact is where the reader actually applies it to real candidates.

## Audience

A Ticino SME owner or manager, non-technical, reading in Italian, comparing at most three real proposals or discovery-call impressions.

## Why an interactive artifact beats a static PDF

A printed checklist forces the reader to apply the same fixed questions to every agency regardless of its category. The whole point of this artifact is that the *first* answer (proximity category) changes which follow-up questions are relevant — a static document cannot branch. An interactive tool asks the proximity question once per agency, immediately shows only the 2–3 proof questions that matter for that category, then walks through the six shared dimensions, and finally assembles a qualitative profile card the reader can compare across up to three agencies side by side — including a hard-coded critical flag for undisclosed bundled conflicts of interest that always surfaces regardless of what else the reader prioritises.

## Inputs

- Up to 3 agency slots. Each slot has a free-text **label** field the user fills in themselves (e.g. "Agenzia A" or the agency's real name) — no agency name is pre-populated anywhere in the tool.
- One **priority question**, asked once (not per agency): "Quanto conta per voi la vicinanza fisica in questo progetto?" — options `Molto` / `Poco` / `Non lo so ancora` (from `artifact-data.json`'s `priorityQuestion`). This reflects the reader's own stated preference, used only to surface a descriptive mismatch note, never to compute a score.
- Per agency, one **proximity category** selection: `Locale`, `Ibrida`, or `Remota` (from `artifact-data.json`'s `proximityCategories`, each with a `definition` shown inline).
- Per agency, once a category is chosen: exactly the 2–3 `proofQuestions` for that category appear, each answered with one of the four `statusOptions` ("Sì, confermato" / "Parziale o vago" / "No" / "Non ancora verificato") plus an optional short free-text note.
- Per agency, the 6 shared `dimensions` (portfolio, processo, performance-seo, supporto, ownership, conflitti), each answered with the same 4 `statusOptions`, each with its `whyItMatters` and `redFlag` text shown as an always-reachable inline disclosure (not hover-only).

## Logic (fork-first classifier, not a weighted score)

There is no numeric scoring formula, no weighting, and no computed ranking — see `artifact-data.json`'s `outputLogic` for the exact rule set. In summary, per agency:

1. Show the chosen proximity category and the status of its specific proof questions.
2. Show the status of the six shared dimensions exactly as entered — a descriptive record, not a sum.
3. **Non-negotiable flag:** if the `conflitti` dimension is marked `No`, always show a prominent critical warning for that agency, regardless of the reader's stated priority or any other answer (`artifact-data.json` marks this dimension `"nonNegotiable": true`).
4. **Mismatch note:** if the reader's stated priority is `Molto` but the agency is classified `Remota` (or the reverse — priority `Poco` but the reader is still leaning toward a `Locale` agency for other reasons), show a plain-language note pointing out the mismatch. This is descriptive, not a penalty — the reader decides what it means for their case.
5. No agency is ever declared a "winner." Agencies appear as independent, side-by-side profile cards, not a ranked list.

## Outputs

- One **suitability card** per filled-in agency: proximity category + its proof-question statuses, then the six shared dimensions with their statuses and notes.
- A **critical-flag banner** on any card where `conflitti` = `No`, shown even if the reader marked "Poco" importance on physical proximity or anything else — this flag is never suppressed.
- A **mismatch note** where the reader's stated proximity priority and the agency's actual category diverge.
- A collapsible checklist of the discovery-call questions (`discoveryCallQuestions`), grouped by proximity category plus a "Comune" group for the shared-dimension questions.
- A persistent link back to the full article and to the fork explanation section.

## Error states

- No agency slots filled in: show a prompt ("Aggiungete almeno un'agenzia per iniziare") instead of an empty comparison.
- An agency slot has a label but no proximity category chosen yet: show "Categoria non ancora scelta" and do not display any proof questions or dimension inputs until a category is picked (the branching only makes sense once the fork is answered).
- Any item left at "Non ancora verificato" is never treated as a red flag and never silently counted as resolved — it must always render visibly distinct from both "Sì, confermato" and "No."
- Priority question left unanswered: the mismatch-note logic simply does not run for that session; this is not an error, just a feature that stays inactive.

## Privacy considerations

All computation and storage happen entirely client-side (component state or `localStorage` only — no network calls, no form submission, no analytics event tied to entered content). No real agency name is pre-populated anywhere in the tool or its data file — every label, category choice, status and note comes only from what the user types or selects. State this explicitly in a persistent footer note, not buried in a modal.

## Accessibility requirements

All category and status selectors must be native, fully keyboard-operable controls (radio groups or `<select>`, not custom div-dropdowns) with visible focus states and proper `<label>` association. The proof-question and dimension lists must use real list/table markup so screen readers can navigate them in order. Status must always be conveyed through explicit text labels, never through colour alone (a colour accent may reinforce a critical flag, but the text label is always present). The `whyItMatters` / `redFlag` reference text must be reachable and readable without a mouse hover — an always-available disclosure element such as `<details>`, not a hover-only tooltip.

## Mobile behaviour

Single-column layout on narrow viewports: one agency card open at a time with a swipe or tab control to move between the up-to-3 agencies, rather than a cramped side-by-side comparison. The proximity question appears first and must be answered (or explicitly left as "not yet chosen") before the proof questions for that agency expand below it. Status selectors sized for touch (minimum ~44px touch target). The discovery-call checklist collapses into an accordion grouped by category.

## CTA

Contextual only: a single secondary link near the results, "Leggete l'articolo completo sul bivio vicinanza-remoto," pointing back to the article, plus one small link "Come risponde Weissmann alle stesse domande" pointing to `/it/servizi/sviluppo-siti-web-ai/` — never a forced CTA per agency card, never phrased with urgency or scarcity.

## Disclaimer

"Tutti i valori in questo strumento vengono inseriti da voi, restano solo nel vostro browser e non vengono mai inviati altrove. Nessun nome di agenzia è precompilato. Il risultato non sostituisce una verifica contrattuale autonoma." Shown persistently in the footer, not buried in a modal.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale) — clean and card-based, closer to a set of index cards than a dashboard or a scored table. No progress rings, no gamified completion percentages, no numeric "match score" of any kind — the fork choice and the six dimension statuses should read like notes taken during a real evaluation, not a computed verdict. The critical conflict-of-interest flag may use a distinct visual treatment (e.g. a bordered banner) since it is the one non-negotiable signal in the tool, but it must always carry its own text label, never rely on colour alone.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in Italian called "Comparatore agenzie web Ticino". Let the user add up to 3 agency slots, each with a free-text name field they fill in themselves (do not pre-populate any real or fictional agency name). First, ask one shared question: "Quanto conta per voi la vicinanza fisica in questo progetto?" with options Molto / Poco / Non lo so ancora. Then, for each filled-in agency, first ask the user to classify it into exactly one of three proximity categories — Locale, Ibrida, Remota — using the `definition` text for each from the accompanying `artifact-data.json`. Once a category is chosen for an agency, reveal only that category's 2–3 `proofQuestions` from `artifact-data.json`, each answered with one of these four statuses: "Sì, confermato", "Parziale o vago", "No", "Non ancora verificato" (plus an optional short note). Below that, show the same four-status input for the 6 shared dimensions (portfolio, processo, performance-seo, supporto, ownership, conflitti — using each dimension's `label`, `shortDescription`, `whyItMatters` and `redFlag` from `artifact-data.json`, with `whyItMatters`/`redFlag` reachable via an always-available disclosure element such as `<details>`, never hover-only). Do NOT compute any score, weighted sum, percentage or ranking, and do NOT declare a "winner" agency. Instead, render one suitability card per filled-in agency showing its category, its proof-question statuses, and its six dimension statuses exactly as entered. If an agency's `conflitti` dimension is marked "No", always render a prominent, clearly labelled critical-flag banner on that card, regardless of any other answer — this flag must never be hidden or softened. If the reader's stated proximity priority is "Molto" but an agency is classified "Remota" (or the reverse mismatch), show a plain-language descriptive note pointing out the divergence — never a score penalty. Include a collapsible checklist of the `discoveryCallQuestions`, grouped by category plus a shared "Comune" group. Make every control keyboard-operable with visible focus states, use real list/table markup, and never encode status through colour alone. Use a mobile-responsive layout: the proximity question and category choice come first per agency, one agency card visible at a time on narrow screens with a tab or swipe control, 44px+ touch targets. Do all computation client-side with no network calls and no data leaving the browser; show a persistent footer disclaimer stating that all data is user-entered, stored locally only, no agency names are pre-filled, and the tool does not replace independent contract review. Add exactly two contextual links (back to the article, and to `/it/servizi/sviluppo-siti-web-ai/`), no forced or urgent CTAs. Style it as a clean, card-based comparison — no progress rings, no gamified dials, no computed "match" percentage of any kind.
