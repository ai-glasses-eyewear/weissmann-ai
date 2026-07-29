# Artifact Brief — Swiss Multilingual Site Architecture Planner

**Article:** `multilingual-website-switzerland-seo` ("Multilingual Websites in Switzerland: How to Build German, English, Italian and French Pages Without Creating an SEO Mess")
**Language:** English (en) — the article and artifact both exist in English only.
**Artifact type:** Multilingual architecture planner (input: languages needed + default locale → output: a recommended URL structure, an exact hreflang tag plan, a canonical rule, and a translation-quality checklist scoped to the chosen languages). Distinct from every scorecard, calculator and comparator elsewhere in this project — this tool does not score an existing site; it generates a structural starting point for a site that does not exist yet, or that is being restructured.

## User problem

The article's thesis is that the technical decision determining whether a Swiss company's English, Italian or French pages ever get found by Google is made before a single word is translated — in the URL pattern, the hreflang set and the canonical tags — and that this decision is usually made by accident, by whatever a CMS defaults to, rather than on purpose. A reader who accepts this still needs to turn it into an actual plan for their own specific set of languages: which URL shape to ask their developer or agency for, exactly which hreflang tags each page needs, and what "genuine localization, not thin translation" concretely requires for the languages they are adding.

## Audience

A Swiss business owner, marketing lead or someone briefing a web agency, who has decided (or is deciding) to add one or more languages to an existing or new website, and needs a concrete structural brief to hand to whoever builds it — not another explanation of why it matters, which the article already covers.

## Why an interactive artifact beats a static PDF

A static template would need to show every possible combination of default locale and target languages to be useful, which is either an unusably long document or a generic one that leaves the reader to adapt it themselves — exactly the translation-shortcut problem the article warns against, applied to the planning stage. An interactive tool takes the reader's actual chosen languages and default, and returns only the URL shapes, hreflang lines and checklist items relevant to that specific combination — the recommendation is generated, not selected from a pre-written list of scenarios.

## Inputs

- **Default locale**: one selection from German, English, Italian, French (or "other," with a note that the same logic still applies).
- **Additional target locales**: any combination of the remaining three (multi-select checkboxes). No default value is pre-checked; the reader must actively choose.

No numeric input exists, so there is no unit, currency or precision question to handle.

## Calculation / decision logic

See `artifact-data.json` → `urlPatternOptions` and `recommendationLogic` for the exact rules:

1. Always recommend the locale-prefixed subfolder pattern (`urlPatternOptions[0]`, `recommended: true`), and show the other three patterns (subdomain, separate country domains, query parameter) with a one-line reason each is generally the wrong choice for a Swiss SME adding languages — do not hide the alternatives, just do not recommend them by default.
2. Generate the URL shape per `recommendationLogic.urlShapeRule`: the default locale sits at the domain root with no prefix; every additional locale gets `/[locale-code]/[localized-slug]/`, with an explicit reminder that the slug must be chosen per language, not copied from the default locale with a prefix added.
3. Generate the hreflang plan per `recommendationLogic.hreflangRule`: for N total locales (default + targets), every one of the N pages needs N hreflang tags — one per locale including itself — plus one x-default tag, and every tag must be mirrored on every other locale's page. Show this as literal tag lines the reader can check against their own site, not only as a description.
4. Set x-default per `recommendationLogic.xDefaultRule`: English if English is among the chosen locales, otherwise the chosen default locale.
5. Always show the canonical reminder (`recommendationLogic.canonicalRule`): every locale's canonical points at itself, never at the default-locale URL.
6. For every additional target locale selected, show the full seven-item `translationQualityChecklist`, each togglable as done/not done, including the `region-tag-decision` item that surfaces the de-CH/fr-CH/it-CH question specifically for German, French or Italian if chosen.

**Do not invent a numeric SEO score, a ranking probability, or any language implying a guaranteed search or AI-citation outcome.** The tool only generates a structural plan from the reader's own choices.

## Outputs

- **Recommended URL structure** — the exact shape for the default locale and every chosen additional locale, plus why the other three patterns were not recommended.
- **hreflang plan** — literal tag lines for every chosen locale's page, plus the x-default recommendation.
- **Canonical rule** — a one-line, non-skippable reminder.
- **Translation-quality checklist** — the seven items, repeated per additional locale chosen, each with a toggle and its "why it matters" text visible (not hidden behind a hover or click).

## Error states

- Zero target locales selected beyond the default: show `errorStates.noLocalesSelected` — a neutral prompt, not an empty or misleading recommendation.
- No default locale chosen yet: show `errorStates.defaultNotSelected` and do not render a URL structure or hreflang plan until one is set, since both depend on knowing the default.
- The same locale selected as both default and a target: per `errorStates.sameLocaleTwice`, ignore the duplicate silently — do not show a locale twice in the output or throw a visible error over an easy, harmless mistake.

## Privacy considerations

All logic runs client-side in the browser from the reader's own selections. No website is scanned, crawled or fetched. Nothing entered is transmitted to any server or analytics endpoint. If the tool offers to remember a reader's selections between visits, use `localStorage` only, clearly labelled as on-device, with a visible "clear saved selections" control. State the no-transmission fact explicitly and persistently, consistent with the other artifacts in this project.

## Accessibility requirements

The default-locale selector uses a real radio group (not a styled dropdown faking one) with an associated `<label>` per option. Target-locale checkboxes use real `<input type="checkbox">` elements with labels, not icon-only toggles. The generated output region uses `aria-live="polite"` so a screen-reader user hears the structure, hreflang plan and checklist update as selections change. Each output section (URL structure, hreflang plan, canonical rule, checklist) uses a real heading element so the tool is navigable by heading. All controls are keyboard-operable with visible focus states. The seven checklist items' done/not-done toggles are a real checkbox or switch, not colour-only.

## Mobile behaviour

Single-column layout: default-locale selector first, target-locale checkboxes directly below it, generated output stacked below that in the same column — no tabs, no horizontal scrolling, no side-by-side panels that would force zooming on a phone. Hreflang tag lines wrap naturally or scroll horizontally only within their own small code block, never forcing the whole page to scroll sideways. Checklist items stack as full-width rows with large tap targets for their toggles.

## CTA

One contextual, secondary link shown below the generated output regardless of which languages were selected: "Bring your language list to a free consultation and we will map the URL structure together" → `/en/kontakt/`. Shown for every combination of inputs, including a single-language selection, with no urgency language.

## Disclaimer

`artifact-data.json` → `disclaimer`: "This planner generates a URL, hreflang and canonical starting point from the languages you select — it does not scan, crawl or audit any real website, and it does not guarantee a specific search ranking or AI-citation outcome for any language. It is a structural starting point for a conversation with whoever builds or maintains your site, not a technical SEO audit or a legal or accessibility certification. All logic runs in your browser; nothing you select is transmitted or stored." Shown persistently below the output, not buried behind a link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, form-first layout: locale selectors at the top, four clearly labelled output sections below (URL structure, hreflang plan, canonical rule, translation checklist) rendered as simple stacked cards or panels — hreflang lines shown in a monospace code block so they read as literal, checkable tags rather than decorative text. No gauge dials, no percentage score, no colour-coded grading of "how multilingual-ready" the reader's plan is — the tool's value is the specificity of the generated structure, not a decorative verdict.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in English called "Swiss Multilingual Site Architecture Planner". Using the fixed data in the accompanying `artifact-data.json` — use exactly its `languageOptions`, `urlPatternOptions`, `recommendationLogic`, `translationQualityChecklist`, `errorStates`, `outputSections`, and `disclaimer` fields, and do not invent any additional language, URL pattern, ranking claim, or "typical Swiss business" adjustment — present two inputs: a default-locale radio group (German, English, Italian, French, or Other) and a target-locales checkbox group for the remaining languages (multi-select, nothing pre-checked). As selections change, generate four output sections matching `outputSections`: (1) "Recommended URL structure" showing the domain-root URL for the default locale and a `/[locale-code]/[localized-slug]/` URL for every chosen target locale, using `urlPatternOptions` to also show the other three patterns with their one-line reasons for not being recommended; (2) "hreflang plan" showing, for every chosen locale's page, the full literal list of hreflang tags it needs (one per chosen locale including itself, plus x-default per `recommendationLogic.xDefaultRule`), formatted as a monospace code block of tag lines, not prose; (3) "Canonical rule" showing the one-line self-referencing-canonical reminder from `recommendationLogic.canonicalRule`; (4) "Translation-quality checklist" showing all seven `translationQualityChecklist` items, repeated once per additional target locale chosen, each as a togglable done/not-done control with its `whyItMatters` text visible beside it. If no target locale is chosen yet, show `errorStates.noLocalesSelected` instead of an output. If no default locale is chosen, show `errorStates.defaultNotSelected` and withhold the URL/hreflang output until one is set. If a reader picks the same locale as both default and a target, silently drop the duplicate per `errorStates.sameLocaleTwice` rather than showing an error or a duplicated row. Everything must run entirely client-side with zero network calls and no scanning of any real website; if you add "remember my selections," use `localStorage` only, label it as on-device, and provide a visible "clear saved selections" control. Make the default-locale control a real radio group and the target-locale controls real checkboxes, each with proper `<label>` elements, and wrap the generated output in an `aria-live="polite"` region so it announces updates to screen readers; give each of the four output sections a real heading element. Use a single-column, touch-friendly mobile layout: selectors on top, the four output sections stacked below, hreflang tag lines in their own small scrollable code block rather than forcing the page to scroll sideways. End the output with one plain secondary link, "Bring your language list to a free consultation and we will map the URL structure together," pointing to weissmann.ai/en/kontakt/ — shown for every valid combination of inputs, with no urgency language. Always display the `disclaimer` text persistently below the output, never behind a click. Style it cleanly: locale selectors at the top, four stacked output cards below, hreflang lines in monospace — no gauge dials, no percentage score, no colour-coded "multilingual readiness" grade — the tool's credibility comes from the specificity of the generated URL/hreflang plan itself, not from a decorative verdict.
