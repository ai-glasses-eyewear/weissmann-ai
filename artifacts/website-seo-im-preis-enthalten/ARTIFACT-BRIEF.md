# Artifact Brief — Website-Offerten SEO-Analyser

**Article:** `website-seo-im-preis-enthalten` ("Website mit SEO erstellen lassen: Was muss im Preis bereits enthalten sein?")
**Language:** German (de) — the article and artifact both exist in German only.
**Artifact type:** Gap-analysis checklist tool (10 technical items + 1 scope-separation check, each rated confirmed/unclear/missing → sorted into three result buckets with a tailored vendor question per gap). Distinct mechanic from the weighted scorecard (`webagentur-schweiz-vergleichen`), the rule-based package configurator (`chf-880-website-schweiz`), the cost calculator (`website-kosten-schweiz`) and the fit matrices (`website-agentur-freelancer-baukasten-ki`, `wix-wordpress-webflow-individuell`) already built for this cluster — no scoring, no weighting, no ranking, just an honest three-bucket sort.

## User problem

A reader has a website quote (or a verbal sales promise) in hand that says "SEO inklusive" — or is about to ask for one. The article explains that this single phrase usually conflates two different things: a one-time technical foundation that must be built into the site's architecture, and ongoing SEO work that is a separate recurring service. The reader now needs to actually apply this distinction to their own real quote, item by item, instead of re-reading the article's checklist and manually cross-referencing it against a PDF or an email thread. The Artifact does that cross-referencing and tells the reader exactly which of the 10 technical points plus the scope-separation question their own quote leaves vague or missing — and which question to ask the vendor for each gap.

## Audience

The same Swiss SME owner, sole proprietor or small-team manager as the article: non-technical, currently evaluating one or more website quotes, reading in German, wanting a fast and honest way to tell "solid" from "vague" before signing.

## Why an interactive artifact is better than a static PDF

A printed checklist forces the reader to manually re-read every item, decide its status, remember which items were vague, and then look back through the article to find the matching vendor question for each gap — friction that causes people to skip the exercise entirely. The Artifact lets the reader mark each of the 10 checklist items (plus the scope-separation check) once, instantly sorts them into three honest buckets, and surfaces the exact `vendorQuestion` text next to every item that is not confirmed — so the reader leaves with a short, concrete list of questions to send the vendor today, not a vague sense of "some SEO stuff is missing."

## Inputs

- 10 checklist items from `artifact-data.json` → `checklistItems`: Crawlbarkeit und Indexierbarkeit, Individuelle Seitentitel und Meta-Beschreibungen, Canonical-Tags, XML-Sitemap erstellt UND eingereicht, Strukturierte Daten nach schema.org, Durchdachte interne Verlinkung, Ladezeit und Core Web Vitals, Mobile-first responsives Design, HTTPS und sprechende URL-Struktur, Google Analytics 4 und Search Console eingerichtet.
- For each item, one required 3-way status selection using `statusOptions`: "Ausdrücklich zugesagt" / "Nur vage erwähnt / unsicher" (default) / "Nicht erwähnt" — each option's `description` shown as inline help so the reader applies the same standard the article uses (not a guess).
- One additional, separately framed required input: the `scopeSeparationCheck` — same 3-way status, asking whether the quote explicitly states that ongoing SEO work (content, link building, continuous optimization) is *not* automatically included in the website price.
- No agency name, company name or any other identifying field — the tool only ever asks about the *content* of the quote, never who sent it.

## Calculation / decision logic

Per `artifact-data.json` → `gapLogic`: sort the 10 checklist items plus the scope-separation check into exactly one of three buckets based on their status — `confirmed` → "Solide abgedeckt", `unclear` → "Unklar – vor der Unterschrift nachfragen", `missing` → "Fehlt – klären oder Offerte ablehnen". Do not compute a score, percentage or weighted total (per `gapLogic.description`'s explicit reasoning: a single missing sitemap submission can matter as much as five vague items combined, so collapsing this into one number would misrepresent it). Select the overall summary message using `summaryRules` in order (first matching condition wins): all confirmed → reassurance message; nothing missing but some unclear → "ask before signing" message; anything missing → "clarify or reject" message.

## Outputs

- Three clearly labelled result lists (Solide abgedeckt / Unklar / Fehlt), each showing the item's `label` and `shortDescription`.
- For every item in "Unklar" or "Fehlt": the item's `vendorQuestion` shown directly next to it, ready to copy into an email — this is the tool's actual deliverable, not the bucket sort itself.
- For every item in "Solide abgedeckt": the item's `selfCheck` shown as a secondary, collapsed note — "so prüfen Sie es nach dem Launch trotzdem selbst" — because a confirmed promise is not yet a verified fact.
- The `scopeSeparationCheck` result is always shown as its own distinct block above the 10-item results, not folded into the same three lists, because it is the article's central thesis-level question, not one technical item among ten.
- One overall summary sentence at the top, chosen via `summaryRules`.
- A persistent link back to the full article and its "Fragen, die Sie vor der Unterschrift stellen sollten" section.

## Error states

- No items answered at all (all left at the `unclear` default is a valid state, not an error — the tool must not require the reader to "complete" anything to see a result, since an honest starting position is "I don't know yet").
- If the reader has not touched any input, show a neutral framing note ("Noch nichts geprüft — beginnen Sie mit dem ersten Punkt") above the three (still-populated, all-unclear) buckets rather than blocking the view.
- Changing any single item's status must instantly re-sort and update the summary sentence — never require a separate "Auswerten"-button click, since the value of the tool is immediate feedback per item.

## Privacy considerations

All state lives entirely client-side (component state or `localStorage`); no network calls, no form submission, no analytics event tied to which items a reader marked as missing (that would reveal which vendor's quote is weak). State this explicitly and persistently in the UI, not only in this brief, per `artifact-data.json` → `disclaimer`.

## Accessibility requirements

Each of the 11 status selectors is a real `<fieldset>`/`<legend>` radio group (three radio buttons, not a custom-styled dropdown-only control) with visible focus states; the three result buckets use real `<ul>`/`<li>` list markup; bucket membership must never be conveyed by colour alone — each item's current bucket is also stated as text ("Status: Fehlt"); the summary sentence region is `aria-live="polite"` so screen-reader users hear it update as they change answers; all `vendorQuestion` text must be reachable and copyable via keyboard (a real `<button>` "Frage kopieren" per item, not a hover-only copy icon).

## Mobile behaviour

Single-column layout: the 11 questions stacked top to bottom as compact radio groups (label + three inline radio pills sized for touch, minimum ~44px), the scope-separation question visually set apart at the top with a border or background tint, and the three result buckets stacked below in fixed order (Fehlt, Unklar, Solide abgedeckt — most urgent first) rather than side by side, so a phone user does not have to scroll sideways to see their own gaps.

## CTA

Two contextual links only, no forced or urgent phrasing: "Zum vollständigen Artikel mit der technischen Checkliste" back to the article, and "Technisches SEO-Fundament Ihrer nächsten Website besprechen" to `/kontakt/` (matching the article's own CTA) — shown once at the bottom, never repeated per bucket or per item, and never implying that every gap means the reader should switch to Weissmann.

## Disclaimer

Use `artifact-data.json` → `disclaimer` verbatim, shown persistently below the results, not in a modal or footer link: "Alle Angaben in diesem Artefakt stammen ausschliesslich von Ihnen selbst und werden nur in Ihrem Browser verarbeitet – es wird keine echte Agentur oder Offerte vorausgefüllt, und keine Daten verlassen dieses Gerät. Das Ergebnis ist eine Orientierungshilfe, keine rechtliche oder technische Abnahmeprüfung und kein Ersatz für eine eigene Prüfung der unterschriftsreifen Offerte."

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, list-first layout: no gauges, no percentage rings, no traffic-light dashboard chrome beyond the three named buckets themselves (text labels always accompany any colour used). The scope-separation check gets a visually distinct card above the 10-item list, signalling "this one question matters more than the rest," not decoration for its own sake.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in German called "Website-Offerten SEO-Analyser". Using the `checklistItems` array (10 items) and the separate `scopeSeparationCheck` object from the accompanying `artifact-data.json`, render 11 questions total: the `scopeSeparationCheck` first, visually set apart in its own card, then the 10 `checklistItems` below it as a list. For each question show its `label` and `shortDescription`, and let the user pick one of exactly three states from `statusOptions` ("Ausdrücklich zugesagt" / "Nur vage erwähnt / unsicher" — default — / "Nicht erwähnt") using a real radio-button group with a `<fieldset>`/`<legend>`, not a styled dropdown. Do not pre-fill any real agency or offer name anywhere. As the user answers, continuously sort all 11 items into three named result buckets per `gapLogic` — "Solide abgedeckt" (confirmed), "Unklar – vor der Unterschrift nachfragen" (unclear/unanswered), "Fehlt – klären oder Offerte ablehnen" (missing) — and render them as three real `<ul>` lists in that order (Fehlt first, then Unklar, then Solide abgedeckt), each item showing its `label`. Never compute or display a numeric score, percentage or weighted total — the reasoning against that is in `gapLogic.description`; keep it purely categorical. For every item in "Unklar" or "Fehlt", show its `vendorQuestion` text directly beneath the item with a "Frage kopieren" button that copies it to the clipboard (a real, keyboard-operable `<button>`, not a hover-only icon). For every item in "Solide abgedeckt", show its `selfCheck` text as a collapsed secondary note titled "So prüfen Sie es nach dem Launch selbst". Show the `scopeSeparationCheck` result as its own distinct block above the three 10-item buckets, never merged into them. At the top, show one summary sentence chosen by evaluating `summaryRules` in order and using the first matching condition's `message`. Update the sort and summary instantly on every change, with no separate "evaluate" button, and make the summary region `aria-live="polite"`. Do all computation and storage entirely client-side (component state or `localStorage` only) with zero network calls and zero analytics tied to which items were marked missing; show the exact `disclaimer` text from `artifact-data.json` persistently below the results, not in a modal. Use a single-column, touch-friendly mobile layout (radio pills at least 44×44px, buckets stacked vertically, most urgent bucket — Fehlt — shown first). Never convey bucket membership through colour alone; always pair colour with the bucket's text label. End with exactly two contextual links: back to the full article, and "Technisches SEO-Fundament Ihrer nächsten Website besprechen" to weissmann.ai/kontakt/ — no urgency language, no forced CTA per item. Style it cleanly and consistently with Weissmann's existing design tokens: a plain list-first layout, no gauges, no percentage rings, no gamified dashboard chrome — only the scope-separation card visually set apart to signal its extra importance.
