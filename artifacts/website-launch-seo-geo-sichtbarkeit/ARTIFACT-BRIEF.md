# Artifact Brief — SEO + GEO Launch Readiness Audit

**Article:** `website-launch-seo-geo-sichtbarkeit` ("Wie wird eine neue Website ab Tag eins bei Google und in KI-Antworten sichtbar?")
**Language:** German (de) — the article and artifact both exist in German only.
**Artifact type:** Tiered launch-readiness checklist (23 items across 4 urgency tiers — blockierend / Woche eins / Monat eins / laufend) that sorts everything left unchecked into a single prioritized "Nächste Schritte" list, tier order first. Distinct mechanic from every other artifact already built in this cluster: it is not a weighted scorecard (`webagentur-schweiz-vergleichen`), not a rule-based package configurator (`chf-880-website-schweiz`), not a cost calculator (`website-kosten-schweiz`), not a fit matrix (`wix-wordpress-webflow-individuell`, `website-agentur-freelancer-baukasten-ki`), and not the three-bucket confirmed/unclear/missing vendor-quote gap analyser (`website-seo-im-preis-enthalten`) — that tool audits what a *vendor promised*; this one audits what *you yourself have actually done*, sorted purely by time-based urgency rather than by confirmation status.

## User problem

A reader has just launched, or is about to launch, a new website and wants to know what actually needs to happen and in what order — not what GEO or SEO mean in the abstract (the article explicitly does not re-explain that; five other Academy articles already cover it), but the concrete sequence of actions for a website with zero crawl history, zero backlinks and zero existing citations anywhere. The article's core argument is that a brand-new site's visibility work is a sequence with real, unshortenable waiting periods baked in, not a flat pile of tasks to power through in one sitting. The reader needs to see, at a glance, which of the 23 concrete items from the article's Day-1/Week-1/Month-1/Ongoing framework are actually done — and, more importantly, which unfinished item is the single most urgent one to do next.

## Audience

The same Swiss SME owner, sole proprietor or small-team manager as the article: non-technical to semi-technical, currently mid-launch or having just launched a new site, wanting a fast way to tell "nothing is blocking me" from "I am not actually ready to call this launched."

## Why an interactive artifact is better than a static PDF

A printed 23-item checklist forces the reader to manually track which items belong to which urgency tier, remember the tier order, and then figure out by hand which unchecked item is the most urgent one — friction that makes people either skip the exercise or work through it in the wrong order (e.g. worrying about month-one content while a Day-1 blocking item is still open). The Artifact removes that friction: the reader ticks off what is actually done, and the tool continuously re-sorts the remaining work into tier order and surfaces exactly one governing message — "this is what's blocking you right now" — instead of a wall of 23 equally-weighted checkboxes.

## Inputs

- 23 checklist items from `artifact-data.json` → `tiers[].items[]`, grouped into 4 tiers (`blocking`, `week1`, `month1`, `ongoing`), each with a required binary state: erledigt (done) / offen (open, the default — an honest starting position is "not done yet," never a guess).
- No website name, domain, company name or any other identifying field — the tool only ever asks about the *status* of each item, never who or what site it is for.

## Calculation / decision logic

Per `artifact-data.json` → `gapLogic`: every open (unchecked) item is added to a single "Nächste Schritte" output list, ordered strictly by `tiers[].order` (blocking first, then week1, then month1, then ongoing) and by the item's position within its tier. No score, percentage or weighted total is computed across tiers — the reasoning is in `gapLogic.description`: a single open blocking item outweighs ten open ongoing items, and averaging them into one number would misrepresent that. The one governing summary sentence at the top is selected by evaluating `summaryRules` top to bottom (first matching condition wins, using a conceptual `openInTier(tierId)` count of unchecked items in that tier) — so the reader always sees one clear verdict ("not launch-ready yet" / "launch basics done, Week 1 pending" / etc.) instead of four separate summaries competing for attention.

## Outputs

- One governing summary sentence at the top, chosen via `summaryRules`, updated live as items are (un)checked.
- Four tier sections in fixed order (blockierend, Woche eins, Monat eins, laufend), each showing its `urgencyNote` once, then its items as a real checklist — checked items shown with a de-emphasized/completed style, unchecked items shown with their `shortDescription`, `whyItMatters` and `nextAction` visible directly (not hidden behind a click, since `nextAction` is the artifact's actual deliverable).
- A single "Nächste Schritte" list at the very top (above the four tier sections), listing only the open items in strict tier order, each linking down to its full entry — this is what a reader in a hurry actually needs.
- The full `disclaimer` text, shown persistently, not only when every item is checked.

## Error states

- Nothing checked at all is a valid, expected starting state, not an error — never block the view or require any interaction before showing results.
- If every single item across all four tiers is checked, show the final `summaryRules` message (the no-guarantee one) prominently instead of an empty "Nächste Schritte" list with no explanation.
- Toggling any single checkbox must instantly re-sort the "Nächste Schritte" list and update the summary sentence — no separate "Auswerten" button, since immediate feedback per click is the entire value of the tool.

## Privacy considerations

All state lives entirely client-side (component state or `localStorage`); zero network calls, zero form submission, zero analytics events tied to which items a specific reader left open (that would reveal how launch-ready or not their business currently is). State this explicitly and persistently in the UI, using the `disclaimer` field verbatim, not only in this brief.

## Accessibility requirements

Each of the 23 items is a real `<input type="checkbox">` with a properly associated `<label>` (never a div-based custom toggle with no native semantics); the four tier sections use real heading levels (`<h2>`/`<h3>`) so screen-reader users can navigate by tier; the "Nächste Schritte" list and the summary sentence region are both `aria-live="polite"` so their updates are announced as items are toggled; tier membership and done/open state must never be conveyed by colour alone — always paired with visible text ("Offen" / "Erledigt") and, for open items, the tier label; all interactive elements reachable and operable via keyboard alone, with visible focus states.

## Mobile behaviour

Single-column layout throughout: the summary sentence and "Nächste Schritte" list stacked first (so a phone user sees the one thing that matters without scrolling past all 23 items), followed by the four tier sections stacked vertically in order, each collapsible/expandable (closed by default except the tier containing the most urgent open item) so the full 23-item list does not force endless scrolling on a small screen; checkboxes and labels sized for touch (minimum ~44px tap target).

## CTA

One contextual link only, no forced or urgent phrasing: "Launch-Fahrplan der eigenen Website besprechen" to `/kontakt/` (matching the article's own CTA), shown once below the disclaimer — never repeated per tier or per item, and never implying that an open checklist item means the reader must hire Weissmann to close it (several items, like claiming a Google Business Profile or requesting indexing, are things any reader can do themselves in minutes).

## Disclaimer

Use `artifact-data.json` → `disclaimer` verbatim, shown persistently, not in a modal or footer link: "Alle Angaben in diesem Artefakt stammen ausschliesslich von Ihnen selbst und werden nur in Ihrem Browser verarbeitet – es wird keine echte Website vorausgefüllt, und keine Daten verlassen dieses Gerät. Das Ergebnis ist eine Orientierungshilfe zur Reihenfolge, keine technische Abnahmeprüfung. Kein Punkt auf dieser Liste, auch nicht vollständig erledigt, garantiert ein bestimmtes Google-Ranking oder eine Erwähnung in ChatGPT, Claude, Gemini, Perplexity oder Google AI Overviews."

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, checklist-first layout: no gauges, no percentage rings, no progress-bar chrome that implies a single completion score (that would contradict `gapLogic`'s explicit no-averaging stance). The "Nächste Schritte" list at the top may use a single accent-coloured border or background tint to signal "start here," but every tier and every item still carries a full text label regardless of colour.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in German called "SEO + GEO Launch Readiness Audit". Using the `tiers` array from the accompanying `artifact-data.json` (4 tiers — `blocking`, `week1`, `month1`, `ongoing`, each with `label`, `urgencyNote` and an `items` array of 23 items total), render: (1) at the very top, a single governing summary sentence chosen by evaluating `summaryRules` top to bottom against the current unchecked-item counts per tier (first matching condition wins), inside an `aria-live="polite"` region; (2) directly below it, a "Nächste Schritte" list containing only the currently unchecked items, in strict tier order (blocking, then week1, then month1, then ongoing) and in each tier's item order, also `aria-live="polite"`; (3) below that, all four tiers as collapsible sections in fixed order, each using a real heading (`<h2>` or `<h3>`) showing the tier's `label` and `urgencyNote` once, then its items as real `<input type="checkbox">` elements with properly associated `<label>` text showing the item's `label`; for every unchecked item show its `shortDescription`, `whyItMatters` and `nextAction` directly beneath the checkbox (not hidden behind a click); checked items should render in a visually de-emphasized "done" style but remain fully togglable back to open. Do not compute or display any numeric score, percentage or progress bar across tiers — the reasoning against that is in `gapLogic.description`; keep everything as plain checked/unchecked state and ordered lists. Toggling any checkbox must instantly re-sort the "Nächste Schritte" list and re-evaluate the summary sentence, with no separate "evaluate" button. Do all computation and storage entirely client-side (component state or `localStorage` only) with zero network calls and zero analytics tied to which specific items were left unchecked. Show the exact `disclaimer` text from `artifact-data.json` persistently below the tier sections, not in a modal. Use a single-column, touch-friendly mobile layout: summary and "Nächste Schritte" first, then the four tier sections stacked and collapsible (only the tier containing the most urgent open item expanded by default), checkboxes at least 44×44px tap targets. Never convey tier membership or done/open state through colour alone; always pair colour with visible text labels ("Offen" / "Erledigt", plus the tier name for open items in the Nächste-Schritte list). End with exactly one contextual link: "Launch-Fahrplan der eigenen Website besprechen" to weissmann.ai/kontakt/ — no urgency language, no per-item or per-tier CTA, and no implication that every open item requires hiring an agency to close it. Style it cleanly and consistently with Weissmann's existing design tokens: a plain checklist-first layout, no gauges, no percentage rings, no single completion score — only the "Nächste Schritte" block visually set apart (e.g. a single accent border) to signal "start here."
