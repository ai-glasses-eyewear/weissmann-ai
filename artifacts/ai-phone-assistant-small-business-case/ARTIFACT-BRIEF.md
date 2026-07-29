# Artifact Brief — Small-Business Fit and Break-Even Calculator

**Article:** `ai-phone-assistant-small-business-case` ("Lohnt sich ein KI-Telefonassistent für kleine KMU und Einzelfirmen?")
**Language:** German (de) — the article and artifact both exist in German only.
**Artifact type:** Calculator (three numeric inputs → break-even comparison), distinct from the weighted-comparator (`swiss-ai-phone-assistant-provider-comparison`) and branching decision-tree/configurator (`keep-existing-swiss-number-ai-assistant`) mechanics already used elsewhere in this project.

## User problem

The article's central, defensible claim is that whether a paid AI phone assistant is worth it for a small business or sole proprietorship depends on three numbers specific to that business — call volume, missed-call rate, and the value of a recovered call — not on company size, and that no honest Swiss average exists for the third number. A reader who accepts this logic still has to do the arithmetic themselves. The calculator does that arithmetic for them, using only the numbers they supply, and shows both a monthly net comparison against the CHF 350/month Starter package and a payback estimate for the CHF 350 one-time Starter Trial.

## Audience

A Swiss sole proprietor, tradesperson, small practice owner or small-team KMU manager (roughly 1–10 people) who read the article, accepts that the decision is personal to their business, and now wants a fast, honest answer using their own rough numbers — without having to trust a vendor-supplied assumption about what a missed call is worth.

## Why an interactive artifact beats a static PDF

The entire value of this tool is that it performs the article's three-step formula live with numbers the reader controls, and instantly recalculates when they adjust an input — a static worksheet would require manual multiplication (error-prone with percentages and decimals) and could not show the 50%-effectiveness sensitivity check or the trial break-even-in-weeks conversion in the same view. Because the article explicitly refuses to supply a default "value per missed call," the calculator's entire reason to exist is to make entering a *personal* number effortless and to show a worked example on demand for readers who don't have one yet — a static document would either force a guess or leave the reader stuck.

## Inputs

1. **Anrufe pro Woche** (required, number, min 0): total inbound business calls per week, all of them, not just the ones the reader personally answers.
2. **Geschätzter Anteil heute verpasster Anrufe** (required, percent, 0–100, step 5): the share of those calls not answered by a human within a few seconds — busy, unreachable, or outside opening hours. Help text explicitly asks for a cautious rather than optimistic estimate.
3. **Ihr geschätzter Wert eines geretteten Anrufs (CHF)** (required, currency, min 0): the reader's own estimate — typical order/job value × their own cautious estimate of callback-to-booking success. Help text states plainly that no Swiss average exists for this number and links to the worked example.

## Calculation logic

See `artifact-data.json` → `formula` for the exact expressions (mirrors the article's "Rechnung in drei Schritten" section one-to-one, no additional invented variables):

1. `callsPerMonth = callsPerWeek × 4.33`
2. `recoveredCallsPerMonth = callsPerMonth × (missedCallRate / 100)`
3. `monthlyRecoveredValue = recoveredCallsPerMonth × valuePerRecoveredCall`
4. `monthlyNet = monthlyRecoveredValue − 350` (the Starter package's monthly price; per-minute overage above the included 1,500 minutes is disclosed as a footnote, not modeled, because it is very rarely relevant at the call volumes this tool targets)
5. `trialWeeksToBreakEven = (350 / monthlyRecoveredValue) × 4.33`, computed only when `monthlyRecoveredValue > 0` — shown as "so viele Wochen, bis sich der einmalige CHF 350 Starter-Test amortisiert hätte"

Additionally compute and display a **sensitivity check** at 50% of `monthlyRecoveredValue` (factor in `artifact-data.json` → `sensitivityCheck`), labelled as a deliberately conservative "what if only half of this materializes" figure — this operationalizes the article's own advice to distrust an optimistic estimate.

Do not invent any additional multiplier, average, or "typical Swiss business" adjustment. The only numbers the tool contributes on its own are the CHF 350 Starter price, the 4.33 weeks-per-month constant, and the 0.5 sensitivity factor — everything else is what the reader typed.

## Outputs

- **Anrufe pro Monat** and **gerettete Anrufe pro Monat** (intermediate figures, shown so the reader can sanity-check the math, not just trust a final number).
- **Monatlicher geretteter Wert** in CHF.
- **Monatliches Plus/Minus gegenüber CHF 350** — the headline result, in green (plus) or a neutral/warning tone (minus/zero), never red-alarmist.
- **Konservative Gegenprobe (50%)** — the same net figure at half the recovered value, shown directly underneath, same visual weight, not hidden in a tooltip.
- **Starter-Test-Amortisation** — "Der einmalige CHF 350 Starter-Test würde sich nach rund X Wochen amortisieren" (only shown when `monthlyRecoveredValue > 0`).
- A one-line honest verdict text that mirrors the article's conclusion logic exactly: net positive even at 50% → "Rechnerisch spricht vieles für einen Test."; net positive only at full effectiveness → "Der Ausschlag ist knapp — prüfen Sie Ihre eigene Schätzung nochmals kritisch, bevor Sie sich entscheiden."; net negative even at full effectiveness → "Mit diesen Zahlen reicht rechnerisch eine gut besprochene Combox." No verdict text claims certainty the math doesn't support.

## Error states

- If any of the three inputs is empty or zero, do not show a broken or zero-filled result — show a neutral prompt state ("Tragen Sie Ihre drei Zahlen ein, um Ihr Ergebnis zu sehen").
- If the reader doesn't know `valuePerRecoveredCall`: provide a visible, always-available "Ich kenne meinen Wert pro Anruf nicht" toggle/link that expands the `workedExample` (Physiotherapiepraxis, CHF 90 Erstwert × 60% Erfolgsquote ≈ CHF 54) inline, with the explicit note that this is an invented illustrative example, not a benchmark to copy. This directly implements the master-prompt requirement: give a worked example, never force a guess.
- If `missedCallRate` is set to 0: show the honest result (CHF 0 recovered value, clear "eine Combox reicht" verdict) rather than blocking the input — a 0% missed-call rate is a legitimate, plausible answer for some readers.
- Clamp `missedCallRate` to 0–100 and `callsPerWeek`/`valuePerRecoveredCall` to ≥0; reject negative numbers with inline validation text, not a silent reset.

## Privacy considerations

All computation happens client-side in the browser. No input — including the reader's own estimate of their business's call value — is transmitted, stored, or sent to any server or analytics endpoint. State this explicitly in a small, persistent footer note, consistent with the other artifacts in this project.

## Accessibility requirements

All three inputs are real `<input type="number">` or range-equivalent controls with associated `<label>` elements (not placeholder-only labels); help text linked via `aria-describedby`; results announced via an `aria-live="polite"` region so screen-reader users hear the updated verdict when they change a value, without needing to re-navigate to it; sufficient color contrast for the plus/minus states without relying on color alone (use explicit "Plus"/"Minus" text plus an icon, not color coding by itself); all interactive elements keyboard-operable with visible focus states.

## Mobile behaviour

Single-column layout: the three inputs stacked at the top, the result panel directly below (no tab switching, no horizontal scrolling), so a phone user sees the recalculated result immediately below the input they just changed without scrolling back up. Numeric inputs use `inputmode="decimal"`/`"numeric"` so mobile keyboards show the number pad.

## CTA

One contextual, secondary link at the bottom of the result panel: "Kostenloses Erstgespräch: Wir rechnen Ihren Break-Even gemeinsam durch" → `/kontakt/`. Shown regardless of verdict (including the "eine Combox reicht" case, since the article's own honesty standard means this tool must remain useful and non-pushy even when the honest answer is "don't buy"). No urgency language, no repeated CTAs, no CTA that changes wording based on the result to sound more persuasive.

## Disclaimer

"Diese Berechnung basiert ausschliesslich auf Ihren eigenen Eingaben und den öffentlich einsehbaren Preisen von Weissmann AI (Stand 29. Juli 2026). Sie ersetzt keine betriebswirtschaftliche Beratung und ist keine Umsatz- oder Ertragsgarantie. Alle Berechnungen erfolgen lokal in Ihrem Browser; es werden keine Daten übermittelt oder gespeichert." Shown persistently below the result, not buried in a footer link.

## Visual direction

Consistent with Weissmann's site tokens (`--paper`, `--ink`, `--accent`, `--radius`, existing type scale). Plain, form-first layout: three inputs at the top (with the worked-example toggle directly below input 3), one clearly delineated result card below showing the headline net figure large, the conservative 50% figure directly underneath at slightly reduced visual weight, and the trial-payback line and verdict text below that. No gauge dials, no fake-precision decimal places beyond whole CHF francs, no gamified scoring — the tool's credibility comes from showing its arithmetic, not from dressing up a single number.

## Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

> Build a single-page interactive HTML/CSS/JS tool in German called "Fit- und Break-Even-Rechner für kleine KMU". Ask for exactly three inputs: (1) "Anrufe pro Woche" — number, min 0; (2) "Geschätzter Anteil heute verpasster Anrufe" — percent slider or number, 0–100, step 5, with help text asking the reader to estimate cautiously rather than optimistically; (3) "Ihr geschätzter Wert eines geretteten Anrufs (CHF)" — number, min 0, with help text explaining this is the reader's own estimate (typical order/job value × their own cautious callback-success estimate) and that no Swiss average exists for this figure. Add a toggle/link "Ich kenne meinen Wert pro Anruf nicht", which expands an inline worked example (a Physiotherapiepraxis: 35 calls/week, 25% missed, CHF 90 first-visit value × 60% estimated success rate ≈ CHF 54 value per recovered call — clearly labelled as an invented illustrative example, not a benchmark). Using the fixed data in the accompanying `artifact-data.json` (use exactly its `formula`, `sensitivityCheck`, `workedExample`, `comboxGuidance`, `disclaimer`, `ctaHref` and `ctaLabel` fields — do not invent new constants besides the 4.33 weeks-per-month figure and the CHF 350 Starter price already given), compute on every input change: calls per month, recovered calls per month, monthly recovered value in CHF, monthly net vs. the CHF 350 Starter package, the same net at 50% effectiveness as a conservative check, and — only when recovered value is positive — how many weeks it would take the one-time CHF 350 Starter Trial to pay for itself. Show a one-line honest verdict that ranges from "a test is worth it" through "it's close, double-check your estimate" to "a simple answering machine (Combox) is the right answer at these numbers" — never overstate certainty. If any required input is empty, show a neutral prompt instead of a broken result. If `missedCallRate` is 0, show the honest zero-value result, not an error. Everything must run entirely client-side with zero network calls and zero data collection — state this in a small footer note. Make all inputs and controls keyboard-accessible with real `<label>` elements, `aria-describedby` help text, and an `aria-live="polite"` result region. Use a single-column, touch-friendly mobile layout with `inputmode="decimal"` on numeric fields. End the result panel with one plain secondary link, "Kostenloses Erstgespräch: Wir rechnen Ihren Break-Even gemeinsam durch", pointing to weissmann.ai/kontakt/ — shown for every verdict, including the "Combox reicht" case, with no urgency language. Include the persistent disclaimer text from `artifact-data.json`. Style it cleanly: a plain form, a plain result card with the headline monthly net figure large and the 50%-conservative figure directly beneath it at reduced weight — no gauges, no gamified scoring, no decorative dashboard chrome.
