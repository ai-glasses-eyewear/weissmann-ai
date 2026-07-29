# Artifact Brief — Website Redesign Triage Audit

**Article:** `website-redesign-signs-switzerland` ("Website Redesign in Switzerland: 12 Signs Your Old Site Is Quietly Costing You Sales")
**Language:** English (en) — the article and artifact both exist in English only.
**Artifact type:** Weighted diagnostic triage tool (twelve yes/no/unsure self-assessment items → a tiered, prioritized worklist), distinct from the time-phased done/open launch checklist used elsewhere in this project (`website-launch-seo-geo-sichtbarkeit`) and from every calculator/comparator artifact in the project — this one sorts *existing* problems by financial urgency rather than tracking completion of a fixed sequence of launch tasks.

## User problem

The article's thesis is that a website rarely announces that it has stopped converting, and that twelve specific, checkable signs separate a site that is quietly losing sales from one that merely looks a few years old — but that the twelve are not equally urgent. Five can block a sale outright, four erode results gradually and invisibly, and three cost a business time and consistency more than a single sale. A reader who accepts this logic still needs to apply it to their own actual website, not the article's illustrative examples, and get back an honestly prioritized answer to two different questions at once: what is actually costing sales right now, and what is real but can legitimately wait.

## Audience

A Swiss business owner or manager with a website more than a few years old who suspects — often from a stray comment by a customer, or a vague sense that enquiries feel low — that something on the site might be losing them business, but has no structured way to tell which of many possible issues actually matters.

## Why an interactive artifact beats a static PDF

A static checklist can list twelve items, but it cannot enforce the article's central discipline: that a blended score across all twelve would hide the difference between one revenue-blocking problem and three cosmetic ones. The tool needs to count "yes" answers separately within each of three tiers, apply tier-aware logic to produce one of several distinct diagnostic messages, and then reorder the reader's own "yes" and "unsure" answers into two different action lists (fix now vs. test first) — none of which a printed checklist can do interactively based on the reader's own specific pattern of answers.

## Inputs

**Twelve items, each answered `yes` / `no` / `unsure`** (`artifact-data.json` → `tiers[].items`, 5 + 4 + 3 = 12 fields). No item defaults to yes or no; the honest starting assumption is that most of this has not actually been tested on a real phone yet, so unanswered items should read as `unsure`, not silently as `no`. Each item carries a `shortDescription` (what to look for), a `businessCostMechanism` (why it matters, drawn directly from the article), and a `testHint` (a concrete, specific action for turning an unsure answer into a yes or no).

## Calculation / decision logic

See `artifact-data.json` → `gapLogic` and `summaryRules` for the exact rules:

1. Count `yes` answers separately within each of the three tiers — `revenue-blocking` (max 5), `compounding` (max 4), `operational` (max 3). Never combine these into one overall percentage; a single revenue-blocking "yes" is treated as more consequential than several operational ones, and an average would erase that distinction, which is the article's central point.
2. Match the three tier counts (plus a count of `unsure` answers) against `summaryRules`, in order, and show the first message whose condition is true — ranging from "a redesign conversation is already overdue" (3+ revenue-blocking signs) down to "none of the twelve signs are present; if sales still feel weak, the cause is more likely traffic or positioning" (all clear, nothing marked unsure).
3. Build three separate output lists (`artifact-data.json` → `outputSections`): every `yes` item as a **prioritized worklist**, ordered tier-first, each shown with its `businessCostMechanism`; every `unsure` item under **"Test these before deciding"**, shown with its `testHint`; and any operational-tier `yes` item repeated under a separate **"Cosmetic — real, but can wait"** panel, so it is never read with the same urgency as a revenue-blocking item even though it also appears in the main worklist.

**Do not invent a numeric score, a percentage, a red/yellow/green rating, or any language implying a guaranteed sales or ranking outcome.** The tool only reorders the reader's own twelve answers by the tiering already established in the article.

## Outputs

- The one matched message from `summaryRules`, shown prominently at the top of the results.
- **Prioritized worklist** — every item marked `yes`, revenue-blocking items first, then compounding, then operational, each with its plain-language cost mechanism.
- **Test these before deciding** — every item marked `unsure`, each with a specific, doable next action (no vague "consult a professional" filler).
- **Cosmetic — real, but can wait** — any operational-tier `yes` item, shown a second time in its own panel so it is not mistaken for equally urgent.
- If all twelve are `no` and none are `unsure`: a distinct, honest message that the website itself does not show these signs, and that a persistent sales problem is more likely traffic or positioning — explicitly not a sales pitch for a redesign the data does not support.

## Error states

- If every item is left at its default (`unsure`), show a single neutral prompt ("Answer at least a few items to see a result") rather than a populated but meaningless report.
- There is no numeric input to validate — all inputs are three-way choices, so no negative-number or division-by-zero states apply. Ensure a fourth, unanswered state is visually distinct from `unsure` so the two are never conflated in the output.
- If a reader marks all twelve `unsure`, route the entire result into the "Test these before deciding" list rather than showing an empty worklist, so the tool never implies a false all-clear.

## Privacy considerations

All logic runs client-side in the browser. No website is scanned, fetched, or analyzed automatically — every answer is the reader's own self-assessment, typed or clicked in. Nothing entered is transmitted to any server or analytics endpoint. If the tool offers to remember answers between visits, that must be `localStorage` only, clearly labelled as on-device, with a visible "clear saved answers" control. State the no-transmission fact explicitly in a persistent footer note, consistent with the other artifacts in this project.

## Accessibility requirements

All twelve items use a real three-option control (radio group or equivalent) with an associated `<label>`, not colour-only or icon-only selection; `shortDescription` and `testHint` text linked via `aria-describedby`; the results region uses `aria-live="polite"` so a screen-reader user hears the updated summary message and worklists as answers change; tier headings are real heading elements so the three-list structure is navigable; all controls are keyboard-operable with visible focus states; urgency is conveyed through explicit tier labels and wording, never through colour alone.

## Mobile behaviour

Single-column layout: the twelve items presented as three short, clearly labelled groups matching the article's tiers (not one undifferentiated list of twelve), so a phone user always knows which tier they are answering within. Results render directly below the questions in the same single column — no tab-switching, no horizontal scrolling. The three-way yes/no/unsure control uses large, clearly separated touch targets rather than a cramped dropdown.

## CTA

One contextual, secondary link at the bottom of the results panel, shown regardless of outcome: "Free consultation: bring your own site and we will go through the twelve signs together" → `/en/kontakt/`. Shown even when the result is "none of the twelve signs are present" — the tool must stay useful and non-pushy no matter what the reader finds, matching the article's own honesty standard that a redesign is not always the right next step.

## Disclaimer

"This tool reorders the twelve signs from 'Website Redesign in Switzerland' (weissmann.ai) using only the answers you provide. It does not scan your website automatically, does not produce a numeric score, and does not guarantee a specific sales, ranking, or search-visibility outcome. It is a prioritized starting point for a conversation, not a technical, legal, or accessibility audit. All processing happens locally in your browser; nothing you enter is transmitted or stored." Shown persistently below the results, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, form-first layout: three clearly labelled question groups in tier order, a single results panel below showing the matched summary message first, then the three output lists (worklist, test-first, cosmetic) as simple stacked sections — no gauge dials, no percentage score, no traffic-light colour coding across the twelve items as a group. The tool's credibility comes from showing exactly which of the reader's own answers produced which recommendation, not from a decorative overall grade.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in English called "Website Redesign Triage Audit". Using the fixed data in the accompanying `artifact-data.json` — use exactly its `tiers`, `gapLogic`, `summaryRules`, `outputSections`, and `disclaimer` fields, and do not invent any additional item, score, percentage, or "typical Swiss business" adjustment — present the twelve items grouped under their three tier labels (Revenue-blocking, Compounding, Operational), each item shown with its `label` and `shortDescription`, and a three-way answer control (Yes / No / Unsure) defaulting to no selection rather than defaulting to "no". As answers change, count `yes` responses separately within each of the three tiers and match the three counts (plus a count of `unsure` answers) against `summaryRules` in the order given, displaying the first matching `message` prominently at the top of a results panel. Below that message, build three lists: a "Prioritized worklist" containing every item marked `yes`, ordered revenue-blocking first, then compounding, then operational, each shown with its `businessCostMechanism` text; a "Test these before deciding" list containing every item marked `unsure`, each shown with its `testHint`; and a "Cosmetic — real, but can wait" panel repeating any operational-tier item marked `yes`. If every item is unanswered, show a single neutral prompt instead of an empty or misleading report; if all twelve are answered `unsure`, route the whole result into the test-first list rather than implying an all-clear. Everything must run entirely client-side with zero network calls and no automatic scanning of any real website; if you add "remember my answers," use `localStorage` only, label it as on-device, and provide a visible "clear saved answers" control. Make all twelve controls keyboard-accessible with real `<label>` elements, `aria-describedby` help text tied to each item's `shortDescription`/`testHint`, and an `aria-live="polite"` region covering the summary message and the three output lists. Use a single-column, touch-friendly mobile layout with the three tiers as clearly separated groups and large touch targets for the yes/no/unsure control. End the results panel with one plain secondary link, "Free consultation: bring your own site and we will go through the twelve signs together", pointing to weissmann.ai/en/kontakt/ — shown for every outcome, including a fully clean result, with no urgency language. Always display the `disclaimer` text persistently below the results, never behind a click. Style it cleanly: three grouped question sections, one results panel with the summary message and three simple stacked output lists — no gauge dials, no numeric score, no traffic-light colour coding across the twelve items as a whole — the tool's credibility comes from showing exactly which answers produced which recommendation, not from a decorative overall grade.
