# Artifact Brief — Comparatore svizzero per PMI ticinesi

**Article:** `assistenti-telefonici-ai-svizzera-pmi-ticinesi` ("I migliori assistenti telefonici AI in Svizzera: guida pratica per le PMI ticinesi")
**Language:** Italian (it) — article and artifact both Italian-only.
**Artifact type:** Market-reach-segmented comparator (distinct mechanic from both the German weighted-comparator and the English persona-matching lab).

## User problem

The article's core split is "Ticino-only clientele" vs. "also serves German/French-speaking Switzerland" vs. "runs a hotel/B&B" — three different reader situations that point to different providers. A reader may not fit neatly into one category. This artifact lets them state their actual market reach and get a tailored short answer instead of re-reading three prose sections.

## Audience

Italian-speaking SME owners/managers in Ticino, per the article's own framing.

## Why interactive beats static

The article deliberately refuses one ranking because the right fit depends on market reach (Ticino-only vs. multilingual Switzerland) and industry (hospitality vs. not). A single input (market reach + industry) resolving to a tailored 1-2 provider recommendation, with reasoning, is more useful than re-reading the relevant prose section every time.

## Inputs

- Market reach: "Solo Ticino/clientela italofona" / "Anche Svizzera tedesca o francese" / "Non lo so ancora".
- Industry: "Hôtellerie o affitti vacanza" / "Altro settore".
- Optional priority nudge: price transparency vs. language breadth vs. integration depth (single choice).

## Calculation / decision logic

Fixed per-provider suitability tags in `artifact-data.json`, mirroring the article's own conclusions: hospitality + PMS → Alveni; Ticino-only + wants transparent price → Weissmann or NEX-AI; multilingual reach + wants broadest language coverage → Suisse Voice or Alveni. No numeric score — the output is 1-2 named providers plus the specific reason, matching the article's own reasoning so the tool never contradicts the text.

## Outputs

A short tailored recommendation (1-2 providers) with the specific reason, a repeated data-provenance note ("Dati pubblici dei fornitori, consultati il 29 luglio 2026 — non un test indipendente"), and a link back to the full article.

## Error states

If "Non lo so ancora" is selected for market reach, show both the Ticino-only and multilingual guidance side by side rather than forcing a guess.

## Privacy considerations

Fully client-side, no data collection, no network calls. State this in a footer note.

## Accessibility requirements

Keyboard-operable radio/select inputs with visible focus states; output as real heading/paragraph markup; no color-only signaling.

## Mobile behaviour

Single-column stacked layout; touch-friendly input targets (~44px); no horizontal scroll.

## CTA

One contextual link to `/it/preise/` near the recommendation — no forced CTA, no urgency language.

## Disclaimer

"Questo strumento si basa su dati pubblicati dai singoli fornitori, consultati il 29 luglio 2026, e non su un test indipendente. Verificate le condizioni attuali direttamente con il fornitore prima di decidere."

## Visual direction

Same Weissmann design tokens as the sibling DE/EN artifacts — clean, data-forward, no gamified dials.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in Italian called "Quale assistente telefonico AI fa per voi?". Let the user pick their market reach (Ticino-only / also German or French Switzerland / not sure yet), their industry (hospitality with existing property software / other), and optionally one priority (price transparency / language breadth / integration depth). Using the fixed provider-suitability data in the accompanying `artifact-data.json` (6 providers: Weissmann, AlpenAgent, Suisse Voice, NEX-AI, HeyPapaya, Alveni), show a tailored recommendation of 1-2 providers with the specific reason for each, never a bare ranked list. Include a persistent data-provenance note ("Dati pubblici dei fornitori, consultati il 29 luglio 2026 — non un test indipendente"), full keyboard accessibility, mobile-responsive single-column layout, zero data collection/network calls, and one contextual link to weissmann.ai/it/preise/ near the recommendation. Clean, neutral, data-forward visual style. Do not invent additional providers or contradict the fixed suitability data.
