# Artifact Brief — Swiss Provider Selection Lab

**Article:** `best-ai-receptionists-switzerland-buyers-guide` ("Best AI Receptionists in Switzerland: the 2026 buyer's guide nobody paid to win")
**Language:** English (en) — article and artifact both English-only.
**Artifact type:** Persona-matching selection lab (distinct mechanic from the German-language sibling's weighted-criteria comparator).

## User problem

The article sorts six providers by four buyer personas (cost-conscious founder, compliance lead, hotelier with existing PMS, technical/API-first team) plus a language-breadth angle — but a real reader is rarely a pure match for exactly one persona. This artifact lets them pick which factors actually matter to them and see which provider(s) fit, with the reasoning shown, not just a name.

## Audience

English-speaking decision-makers evaluating AI receptionists for a Swiss business — often at an international or multinational company in Zürich, Zug, Basel or Geneva, per the article's own framing.

## Why interactive beats static

The article's core insight is that "best" depends on buyer type. A static page can only show four fixed personas. An interactive tool lets a reader who is, say, 70% cost-sensitive and 30% hospitality-integration-focused see a blended answer instead of picking the nearest of four boxes.

## Inputs

- A multi-select or ranked-priority list of factors: published pricing, dialect/language breadth, Swiss/EU hosting disclosure, hotel-PMS integration, open API/webhook access, contract flexibility (no minimum term).
- Optional single toggle: "I run hospitality with existing property software" (this alone should strongly steer toward Alveni, mirroring the article's own honest conclusion for that persona).

## Calculation / decision logic

Each of the 6 providers (Weissmann, AlpenAgent, Suisse Voice, NEX-AI, HeyPapaya, Alveni) has a fixed 0/1/2 relevance score per factor in `artifact-data.json`, derived directly from the article's own stated facts (e.g. "published pricing" = 2 for Weissmann/Suisse Voice/NEX-AI, 0 for the other three). Sum the scores for the reader's selected/ranked factors per provider, sort descending, and show the top 2–3 with a one-line reason drawn from the matching factor(s) — never show a bare number without the "why."

## Outputs

Ranked shortlist (not a single "winner") with the specific reasons each provider scored where it did, a repeated note that all data is self-reported by each vendor as of 29 July 2026, and a link back to the full article for the complete reasoning and sources.

## Error states

If no factors are selected, prompt the reader to pick at least one rather than showing an arbitrary or tied result.

## Privacy considerations

Fully client-side, no data collection, no network calls. State this in a footer note.

## Accessibility requirements

Keyboard-operable multi-select/checkboxes with visible focus states; results as real list/heading markup; rank communicated by position and label text, not color alone.

## Mobile behaviour

Single-column stacked layout; touch-friendly checkbox targets (~44px); no horizontal scroll.

## CTA

One contextual link near the top result to `/en/preise/` — no forced CTA per provider row, no urgency language.

## Disclaimer

"This tool ranks providers using facts published on each vendor's own website as of 29 July 2026. It is not an independent lab test — verify current details directly with any vendor before deciding."

## Visual direction

Same Weissmann design tokens as the sibling German artifact — clean, data-forward, no gamified dials.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in English called "Which Swiss AI Receptionist Fits You?". Let the user select/rank up to 6 priority factors (published pricing, dialect/language breadth, Swiss/EU hosting disclosure, hotel-PMS integration, open API/webhook access, contract flexibility) plus one toggle ("I run hospitality with existing property software"), then compute a relevance score for 6 fixed providers (Weissmann, AlpenAgent, Suisse Voice, NEX-AI, HeyPapaya, Alveni) using the fixed per-provider per-factor scores in the accompanying `artifact-data.json`, and show a ranked shortlist (not a single winner) with the specific reason(s) each provider matched. Include a persistent data-provenance note ("Based on vendor-published facts as of 29 July 2026 — not an independent test"), full keyboard accessibility, mobile-responsive single-column layout, zero data collection/network calls, and one contextual link to weissmann.ai/en/preise/ near the top result. Clean, neutral, data-forward visual style, no gamified dials. Do not invent additional providers or change the fixed scores.
