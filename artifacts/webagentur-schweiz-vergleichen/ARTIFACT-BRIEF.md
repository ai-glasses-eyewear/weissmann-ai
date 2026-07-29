# Artifact Brief — Web Agency Comparison Scorecard

**Article:** `webagentur-schweiz-vergleichen` ("Die beste Webagentur der Schweiz: wie Sie fair vergleichen, ohne auf die schönste Eigenwerbung hereinzufallen")
**Language:** German (de) — the article and artifact both exist in German only.
**Artifact type:** Weighted comparison scorecard with user-supplied agency data (no pre-populated vendors).

## User problem

A Swiss SME owner or manager has two or three real web agency quotes or discovery-call notes in hand and no consistent way to score them against each other beyond gut feeling about which portfolio looked nicer. The article gives seven criteria and a red-flag pattern for each; the artifact lets the reader actually apply that framework to their own real candidates and get a weighted, ranked comparison from their own inputs — not from a fixed dataset, because this article deliberately does not name or score any real competing agency.

## Audience

Same as the article: a Swiss SME owner or manager who already has (or is actively collecting) proposals from web agencies, most likely non-technical, reading in German.

## Why an interactive artifact beats a static PDF

A static checklist can only be filled in on paper and re-scored by hand for every new criterion weighting. An interactive tool lets the reader enter each candidate agency once, then instantly re-rank them as their own priorities shift (e.g. "actually, ownership matters more to me than price transparency") — and shows the per-criterion breakdown, not just a final number, so the reader understands *why* one agency ranked ahead of another using their own judgment, not a vendor's marketing copy.

## Inputs

- Up to 3 agency slots. Each slot has a free-text **label** field the user fills in themselves (e.g. "Agentur A" or the agency's real name) — no agency name is pre-populated anywhere in the tool.
- For each filled-in agency slot, one **1–5 score input** per criterion (Nachweis, Prozess, Ownership, Performance, SEO-Fundament, Support & Wartung, Vertragsbedingungen), each with the criterion's `whyItMatters` and `redFlag` text (from `artifact-data.json`) shown as inline help/tooltip so the user scores with the same definitions the article uses.
- One optional short free-text **note** field per criterion per agency (e.g. "sagte im Gespräch: keine Mindestlaufzeit").
- 7 global **importance weight** sliders (0–5, default 3), one per criterion, shared across all agencies — these represent the reader's own priorities, not agency-specific values.
- An integrated, collapsible checklist of the 10 discovery-call questions from `artifact-data.json`, each tagged to its criterion, so the reader can tick them off during or after a real sales call before scoring.

## Calculation / decision logic

For every agency slot with at least one non-zero score entered: `score(agency) = Σ(userWeight[c] × userScore[c][agency])` across the 7 criteria, normalized to 0–100 relative to the maximum possible score given the weights actually set (`5 × Σ userWeight[c]`), per `artifact-data.json`'s `scoringFormula`. Sort agencies descending by normalized score. Agency slots left completely empty are excluded from the ranking, not scored as zero. Show the full per-criterion contribution breakdown next to the total for every ranked agency, and surface which criterion contributed most to each agency's position ("lag vor allem bei Ownership vorn" / "verlor Punkte vor allem bei Vertragsbedingungen").

## Outputs

- A ranked list of the filled-in agencies (2 or 3; a single filled-in agency shows as a standalone profile, not a "ranking" of one) with normalized score and a one-line explanation of the top contributing and top losing criterion.
- A side-by-side table: rows = 7 criteria, columns = the entered agencies, cells = the user's own 1–5 scores plus their notes.
- Any criterion where the user's own note text contains a red-flag keyword pattern is not auto-flagged (no fake pattern-matching intelligence) — instead, the criterion's stored `redFlag` description stays visible next to the score input at all times as a manual reference the user checks themselves.
- A persistent link back to the full article and to the 10-question discovery-call checklist section.

## Error states

- No agency slots filled in at all: show a prompt ("Geben Sie mindestens eine Agentur ein, um zu starten") instead of an empty ranking.
- All weights set to 0: show a message asking the user to weight at least one criterion rather than dividing by zero or showing a meaningless flat ranking.
- An agency slot has a label but zero scores entered: exclude it from the ranking and show "noch keine Bewertung eingetragen" next to its name rather than silently ranking it last with a score of 0 (a 0 would misleadingly imply the agency failed every criterion, when really no data was entered).

## Privacy considerations

All computation and storage happen entirely client-side in the browser (e.g. component state or `localStorage` only, no network calls, no form submission, no analytics event tied to entered content). No real agency name is pre-populated anywhere in the tool or its data file — every agency label, score and note comes only from what the user types. State this explicitly in a persistent footer note, not just in this brief.

## Accessibility requirements

All score inputs and weight sliders must be full keyboard-operable with visible focus states and proper `<label>` association; the results table/list must use real table or list markup (not div soup) so screen readers can navigate rows and columns; rank order must be conveyed through explicit text ("Platz 1 von 3") and numeric score, never through color alone; tooltips for `whyItMatters`/`redFlag` text must also be reachable and readable without a mouse hover (e.g. an expandable inline disclosure, not a hover-only tooltip).

## Mobile behaviour

Single-column stacked layout on narrow viewports: one agency card at a time with a swipe or tab control to switch between the up-to-3 agencies, rather than a cramped horizontal comparison table; sliders and score inputs sized for touch (minimum ~44px touch target); the discovery-call checklist collapses to an accordion.

## CTA

Contextual only: a single secondary link near the results, "Zum vollständigen Artikel mit den sieben Kriterien und roten Signalen", pointing back to the article, plus one small link "Wie Weissmann diese Fragen selbst beantwortet" pointing to `/leistungen/ki-webentwicklung/` — never a forced CTA per agency row, never phrased with urgency or scarcity.

## Disclaimer

"Alle Werte in diesem Artefakt stammen ausschliesslich von Ihnen selbst und werden nur in Ihrem Browser gespeichert – keine Agenturnamen sind vorausgefüllt, keine Daten verlassen dieses Gerät. Das Ergebnis ersetzt keine eigene Vertragsprüfung." Shown persistently in the footer, not buried in a modal.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale) — clean, data-forward, no decorative gauges, no gamified score wheels or fake-precision dials. A plain per-criterion bar/table treatment communicates the breakdown more honestly than a single glowing "match percentage" badge would.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in German called "Webagentur-Vergleich: Ihr eigenes Bewertungsraster". Let the user add up to 3 agency slots, each with a free-text name field they fill in themselves (do not pre-populate any real or fictional agency name). For each filled-in agency, provide a 1–5 score input for each of these 7 criteria: Nachweis, Prozess, Ownership, Performance, SEO-Fundament, Support & Wartung, Vertragsbedingungen — show each criterion's "why it matters" and "red flag" explanation as an always-reachable (not hover-only) inline disclosure, using the text supplied in the accompanying `artifact-data.json`. Also let the user set a 0–5 importance weight per criterion (default 3), shared across all agencies. Compute `Σ(weight × score)` per agency, normalize to 0–100 against the maximum possible given the set weights, and show a ranked list (excluding agencies with zero scores entered, never showing them as a scored "0") with a per-criterion breakdown table and a one-line explanation of each agency's strongest and weakest contributing criterion. Include a collapsible checklist of the 10 discovery-call questions from `artifact-data.json`, each tagged to its criterion. Make all inputs fully keyboard-accessible with visible focus states, use real table/list markup for results, never encode rank in color alone, and use a mobile-responsive single-column/tabbed layout with 44px+ touch targets. Do all computation client-side with no network calls and no data leaving the browser; show a persistent footer disclaimer stating that all data is user-entered and stored locally only. Add exactly two contextual links (back to the article, and to `/leistungen/ki-webentwicklung/`), no forced or urgent CTAs. Style it with a clean, neutral, data-forward look — no gamified dials, no fake precision, no decorative gauges.
