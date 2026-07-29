# ARTIFACT BRIEF — Build Approach Scenario Simulator

**Companion article:** `custom-website-vs-template-vs-ai-builder` (EN-WEB-06) — "Custom Website vs Template vs AI Builder: Where Each One Wins and Where It Becomes Expensive"
**Artifact title:** Build Approach Scenario Simulator: Custom Development, Template or AI Builder?
**Language:** English (en) only — matches the article; no DE/IT/FR version is commissioned.

---

## 1. User problem

A business owner or marketing lead deciding how to build a website hears three different, equally confident recommendations — an agency pushes custom development, a template marketplace pushes themes, an AI tool pushes itself — and each is really recommending the category it sells, not the category that fits this specific business. The article's eight-factor framework is presented in prose across nine sections; this tool lets the reader answer four concrete questions about their own situation and see, instantly, which of the three build approaches actually fits best — with the other two scored just as honestly, not dismissed.

## 2. Intended audience

Founders, small-business owners and marketing leads in Switzerland who are about to commission a new or rebuilt website and want an independent, situation-driven read on whether custom development, a visual template or an AI website-generation tool is the right starting point — including readers whose honest answer will turn out to be a template or an AI tool, not Weissmann's own custom-development service.

## 3. Why an interactive artifact beats a static PDF

A printed 3×8 comparison table is either too dense to read at a glance or too simplified to be honest. The interactive version:
- Lets the reader answer four plain-language questions about their own situation instead of reading someone else's generic ranking — the same fixed 3×8 matrix produces three different top-ranked approaches (plus one genuine close call) depending on the answers, which a static table cannot demonstrate.
- Shows the reasoning behind the winner (the specific trade-off sentence per factor for the top approach), not just a label, so the recommendation is legible and checkable rather than a black box.
- Includes four example scenarios that double as a teaching device: stepping through all four shows the reader this simulator is not secretly rigged toward "custom development" — only one of the four examples has custom development winning clearly, one has it winning by a single point in a genuinely balanced case, and the other two go to the template and the AI builder respectively.
- Recomputes live as answers change, so a reader can test "what if we had two more months" in seconds instead of re-reading the article's prose section by section — the exact swing demonstrated by the first two example scenarios, which differ only in launch timeline and flip the winner from the AI builder to the template.

## 4. Inputs

1. **Four scenario questions**, each a set of 4 mutually exclusive options (radio buttons or a single-select), matching `artifact-data.json` → `inputs`:
   - **Launch timeline** — This week / A few weeks / A couple of months / No fixed deadline yet.
   - **Need to differentiate from competitors** — We look like our competitors and that's fine / We'd like to stand out a bit / Differentiation is core to how we compete / We're entering a crowded market and need to win on positioning.
   - **Technical resources on the team** — No one technical, we need to self-edit everything / A marketing or ops person comfortable with basic web tools / An internal developer or technical hire / An agency or developer partner already lined up.
   - **Expected growth trajectory** — Staying small and simple is the plan / Steady, moderate growth expected / Adding complexity (integrations, content, multiple markets) over 1–3 years / Already complex (languages, systems, teams), choosing a foundation for the long run.
2. **No question is pre-selected.** The reader must actively choose an answer to each of the four before a ranking appears (see §7).
3. **Four "Try an example" scenario cards** that pre-select all four answers to a named, plausible situation (see `artifact-data.json` → `exampleScenarios`). Selecting one is a starting point, not a lock — every answer stays changeable afterward, and changing any answer after selecting an example silently deselects the example highlight.
4. **No text input anywhere.** No name, email, company, budget figure or any personal or business detail is ever requested — see §8.

## 5. Calculation / decision logic

- **Weight derivation:** each of the 4 inputs governs exactly 2 of the 8 factors (never overlapping), using the selected option's numeric value (0–3), per `artifact-data.json` → `inputs[].governs`. Three of the four mappings are direct (weight = value); the launch-timeline input's effect on the technical-SEO factor is inverse (weight = 3 − value), reflecting that more time available also means more room to get the technical foundation right before launch, not just a slower deadline.
- **Weighted sum, per approach:** `score = Σ (derived weight[factor] × fitScore[approach][factor])` across all 8 factors, using the fixed 1–5 fit ratings in `artifact-data.json` → `approaches[].scores`. Approaches are then ranked descending by this sum.
- **No hidden bonus, malus, or tie-break rule favours any approach** — including no artificial boost for "custom development" regardless of Weissmann's own delivery model. The four example scenarios shipped in the data file are proof-of-work: the same unmodified formula produces the AI builder, the template and custom development as the top result in three separate cases (verified: `fast-simple-launch` → aiBuilder 39, `steady-accessible-build` → template 36, `differentiated-complex-build` → custom 75), plus one deliberately close case (`balanced-moderate-case` → custom 34, template 33 — a 1-point margin) to show the tool does not manufacture a dramatic winner when the real situation is genuinely balanced.
- **Ties are shown as ties** (e.g. two approaches both at rank 1) rather than being artificially broken by an undisclosed rule.
- **Incomplete state:** if fewer than all 4 questions are answered, no ranking is computed or displayed (see §7) — a partial-answer "ranking" would be arithmetic dressed up as a recommendation.
- **Scores are explicitly labelled as a structural, qualitative fit assessment** ("not a lab measurement, not a benchmark of any named product") based on how these three build categories generally and verifiably work — not a claim that any specific commercial template platform or AI website-generation product currently scores exactly this way for every plan or configuration.

## 6. Outputs

1. A ranked list (1st–3rd) of all three approaches with their computed score, each approach's `oneLiner` honest summary, and a proportional weight bar (see §13) — sized to score, not styled as a pass/fail grade.
2. For the top-ranked approach only: the eight per-factor trade-off sentences from `artifact-data.json` expanded by default, so the reader sees *why* it ranked first, factor by factor — including factors where that approach is honestly weak.
3. For the remaining two approaches: the `oneLiner` visible, full trade-offs available behind a "Show details" toggle per approach (progressive disclosure, not sixteen sentences dumped for every approach at once).
4. A small "Your answers" recap strip showing the four selections currently made, so the reader can screenshot or note the exact inputs that produced this result.

## 7. Error states

- Fewer than 4 questions answered → ranking area shows a calm empty state: "Answer all four questions to see which build approach fits your situation." No approaches are ranked, no partial score is displayed as if it meant something.
- Exact tie between two or more approaches → both shown at the same rank number with a short note: "Tied for your current answers." No coin-flip tie-break is applied.
- JavaScript disabled / artifact fails to load the interactive layer → the underlying HTML still renders the full static matrix (all 3 approaches × 8 factors, scores and trade-off text) as a plain readable table, so the page remains useful without the interactive layer.

## 8. Privacy considerations

- Fully client-side; no network requests, no analytics call, no data leaves the browser tab.
- No input field of any kind collects a name, email, company name, budget figure, or any other personal or business detail — the reader only ever selects one option per question and clicks example/toggle buttons.
- A one-line note near the questions states that the four answers are used only to compute the on-screen ranking in that browser session and are never transmitted, stored, or used to personalise anything else on the site.

## 9. Accessibility requirements

- All four questions are implemented as native, keyboard-operable radio groups (arrow keys move between options) with a visible focus ring and the selected option announced to screen readers on every change.
- Example cards and the per-approach "Show details" toggles are real buttons, fully keyboard-reachable, with visible focus states.
- The ranked list updates inside an `aria-live="polite"` region so a screen-reader user hears the new order after an answer change without having to re-navigate to the results.
- Rank, approach name and score are never conveyed by colour alone — always paired with text ("Rank 1 · Fully custom development · 75 points").
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` (rank re-ordering happens instantly, no animated reshuffle).

## 10. Mobile behaviour

- The four questions stack full-width, one per section, with options shown as large tappable rows (not a cramped dropdown).
- Example cards become a horizontally scrollable, touch-swipeable strip instead of four cards competing for width.
- Ranked results stack vertically; only the 1st-place approach is expanded by default, the other two show as collapsed one-line rows (label + score) that expand on tap — avoids a very long single-column scroll on a small screen.
- The "Your answers" recap strip collapses to a compact single line with a "Details" expand toggle on narrow viewports.

## 11. Exact CTA

Primary CTA button, shown persistently below the ranked results (not gated behind any interaction):

> **"Free consultation: bring your scenario and we will map it to the build method that honestly fits"** → links to `/en/kontakt/`

Secondary, lower-emphasis link near the top of the tool:

> "Read the full comparison with all eight factors: read the article" → links to the article's own URL (the academy spoke page for `custom-website-vs-template-vs-ai-builder`).

The CTA text and destination stay identical regardless of which approach ranks first — including when the result is a template or an AI website-generation tool, not Weissmann's own custom-development service. No countdown, no fake urgency, no "before it's too late" language.

## 12. Disclaimer

Include a short, visible note near the four questions:

> "These scores are a structural, qualitative assessment of how custom development, visual templates and AI website-generation tools generally work — not a lab measurement, not a benchmark of any single named product, and not a guarantee of a specific price or feature set. Check current terms directly with any specific provider you are considering."

This prevents the scores from being read as a live-verified benchmark of any particular template platform or AI tool, and makes clear the simulator is a structured decision aid, not a product test.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only for the rank-1 badge number ("1"), never as a full-approach "winner" fill — all three approaches otherwise share the same near-black (`--ink`) treatment so the tool doesn't read as pushing one approach visually before the reader has answered any question.
- Score bars: simple horizontal bars, thin 1px border (`--line: #e5e5e2`), fill in a single neutral tone (dark grey, not a traffic-light gradient) with the numeric score printed at the bar's end — a counted result, not a gauge implying a pass/fail threshold.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- Question options styled as large, clearly bordered selectable rows — no gamified quiz skins, no emoji, no progress-bar-with-confetti feel.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the expanded rank-1 detail card.
- Overall feel: a situation worksheet that computes itself — calm and analytical, not a "which build method are you?" personality-quiz aesthetic.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Build Approach Scenario Simulator:
Custom Development, Template or AI Builder?" — an English-language
interactive decision tool for businesses deciding how to build a website.
It is a weighted multi-criteria fit calculator based on a real business
scenario, not a lead-generation quiz and not a calculator that always
crowns "custom development" the winner.

CONTEXT
The companion article's thesis: there is no universally best way to build
a business website. Fully custom development, a visual template (theme-
based, whether on a content-management system or a standalone builder)
and an AI website-generation tool (auto-generates layout, copy and images
from a prompt or brief) each win clearly on different factors across eight
dimensions: speed to launch, flexibility/customisation ceiling,
differentiation from competitors, accessibility for non-technical editors,
low ongoing maintenance burden, integration capacity, content & code
ownership/portability, and technical SEO baseline. This tool must let the
user answer four plain scenario questions (launch timeline, need to
differentiate, technical resources on the team, expected growth
trajectory) and compute a live ranking of the three approaches. It must
NEVER hard-code a winner — the ranking must be pure arithmetic from the
answers and the fixed score table below.

FIXED DATA — FACTORS (id, label)
1. speed — "Speed to launch"
2. flexibility — "Flexibility & customisation ceiling"
3. differentiation — "Differentiation from competitors"
4. accessibility — "Accessibility for non-technical editors"
5. maintenance — "Low ongoing maintenance burden"
6. integrations — "Integration capacity"
7. ownership — "Content & code ownership / portability"
8. seo — "Technical SEO baseline"

FIXED DATA — APPROACHES, SCORES (1–5) AND TRADE-OFF TEXT
(id, label, oneLiner, scores per factor in the order above, then the
eight trade-off sentences in the same factor order)

1. custom — "Fully custom development" — "The highest ceiling on control,
   integrations and search foundations — but the slowest launch, the
   highest cost and the fullest maintenance responsibility."
   Scores: speed 2, flexibility 5, differentiation 5, accessibility 3,
   maintenance 2, integrations 5, ownership 5, seo 5.
   Trade-offs:
   - Speed: "Slowest of the three by design — strategy, design and
     working code all have to exist before a page can go live."
   - Flexibility: "No structural ceiling; anything a team can design and
     code, it can build, at a cost matching the ambition."
   - Differentiation: "Can express a genuinely distinct identity, because
     nothing about the build is shared with another business."
   - Accessibility: "Depends entirely on whether an editorial system was
     explicitly commissioned — done well it matches a template's ease,
     left out every edit needs a developer."
   - Maintenance: "Fullest responsibility of the three: no shared
     platform patches things centrally, so hosting, certificates and
     monitoring sit with the business or its agency."
   - Integrations: "Can connect to almost any system a budget allows,
     because the integration is simply built rather than found in a
     plugin store."
   - Ownership: "Typically the fullest ownership of code and content,
     portable to a new developer if the work was documented."
   - SEO: "Highest ceiling — full control over markup, speed and URL
     architecture — but only reached if someone actually built it
     properly."

2. template — "Visual template" — "The most balanced of the three —
   never the worst option on any single factor, rarely the best, and
   usually the safest default when nothing points strongly elsewhere."
   Scores: speed 4, flexibility 3, differentiation 3, accessibility 5,
   maintenance 3, integrations 4, ownership 3, seo 4.
   Trade-offs:
   - Speed: "Choosing a theme, populating content and configuring
     settings typically takes days to a few weeks."
   - Flexibility: "Bounded by the theme's own architecture — deep
     customisation is often possible, but a request outside the
     component library usually means a workaround."
   - Differentiation: "Shares its underlying structure with every other
     site on the same theme, but specific content and photography can
     still differentiate within that shared frame."
   - Accessibility: "Usually the most accessible of the three — visual,
     drag-and-drop or block-based editing was the point of building it
     that way."
   - Maintenance: "Varies by setup: a self-installed content-management
     system needs its own ongoing updates, a standalone hosted builder
     patches centrally."
   - Integrations: "A plugin or app ecosystem comfortably covers common
     cases — payments, bookings, basic CRM — but can hit a wall on
     anything unusual."
   - Ownership: "Varies enormously: software on infrastructure the
     business controls is generally portable, a hosted all-in-one
     platform usually is not."
   - SEO: "Can reach a solid, workable baseline with mature SEO-focused
     settings, though a heavy, poorly configured theme can undercut even
     a well-chosen one."

3. aiBuilder — "AI website-generation tool" — "The fastest way to a
   working first draft and highly approachable to edit — but typically
   the weakest on differentiation, integration depth and technical SEO."
   Scores: speed 5, flexibility 2, differentiation 1, accessibility 4,
   maintenance 4, integrations 2, ownership 2, seo 2.
   Trade-offs:
   - Speed: "Produces a usable first draft fastest of the three, often
     within minutes — though a draft and a launch-ready site are not
     the same claim."
   - Flexibility: "Tightest of the three: most tools give limited or no
     direct access to underlying code, so a request outside the
     interface is often simply not possible."
   - Differentiation: "Greatest differentiation risk of the three —
     drafts drawn from patterns learned across many similar businesses
     can end up strikingly similar without human rework."
   - Accessibility: "Close to a template on ease: editing happens through
     the same conversational interface used to create the site, though
     fine-grained control can be more limited."
   - Maintenance: "Provider-hosted, so the business's own patching and
     update load is typically low."
   - Integrations: "Typically the most limited — most tools are built to
     produce a self-contained marketing site rather than a connected
     system."
   - Ownership: "Least portable of the three — the generated site
     commonly lives inside the tool that made it, and leaving usually
     means rebuilding rather than migrating."
   - SEO: "Typically weakest on technical depth — structured data,
     heading hierarchy and crawlable architecture are the unglamorous
     detail these tools do not yet reliably get right without review."

FOUR SCENARIO QUESTIONS (id, label, 4 options each with a numeric value
0–3; value derives the weight of the factor(s) it governs — see GOVERNS)

1. launchTimeline — "Launch timeline"
   - "This week" = 3
   - "A few weeks" = 2
   - "A couple of months" = 1
   - "No fixed deadline yet" = 0
   GOVERNS: speed weight = value (direct). seo weight = 3 − value
   (inverse — more time available also means more room to get the
   technical foundation right, not just a slower deadline).

2. differentiationNeed — "Need to differentiate from competitors"
   - "We look like our competitors and that's fine" = 0
   - "We'd like to stand out a bit" = 1
   - "Differentiation is core to how we compete" = 2
   - "We're entering a crowded market and need to win on positioning" = 3
   GOVERNS: differentiation weight = value (direct). flexibility weight =
   value (direct, same value as differentiation).

3. technicalResources — "Technical resources on the team"
   - "No one technical on the team — we need to self-edit everything" = 3
   - "A marketing or ops person comfortable with basic web tools" = 2
   - "An internal developer or technical hire" = 1
   - "An agency or developer partner already lined up" = 0
   GOVERNS: accessibility weight = value (direct). maintenance weight =
   value (direct, same value as accessibility).

4. growthTrajectory — "Expected growth trajectory"
   - "Staying small and simple is the plan" = 0
   - "Steady, moderate growth expected" = 1
   - "We expect to add complexity — integrations, content, multiple
     markets — over the next 1–3 years" = 2
   - "We're already complex (multiple languages, systems, teams) and
     choosing a foundation for the long run" = 3
   GOVERNS: integrations weight = value (direct). ownership weight =
   value (direct, same value as integrations).

Each of the 8 factors is governed by exactly one of the 4 questions (2
factors each) — there is no overlap and no summing needed, by design, so
the arithmetic stays fully transparent.

EXAMPLE SCENARIOS (4 cards; selecting one pre-fills all four answers;
every answer stays changeable afterward — selecting an example is a
starting point, not a lock)
1. "The fast, simple launch" → This week / same as competitors is fine /
   no one technical / staying simple. Derived weights: speed 3, seo 0,
   differentiation 0, flexibility 0, accessibility 3, maintenance 3,
   integrations 0, ownership 0. Computes to: custom 21, template 36,
   aiBuilder 39 → AI builder wins.
2. "The steady, accessible build" → A couple of months / same as
   competitors is fine / no one technical / staying simple. Derived
   weights: speed 1, seo 2, differentiation 0, flexibility 0,
   accessibility 3, maintenance 3, integrations 0, ownership 0. Computes
   to: custom 27, template 36, aiBuilder 33 → template wins. (Note: this
   differs from scenario 1 only in launch timeline — proof the timeline
   answer alone can flip the winner.)
3. "The differentiated, complex build" → No fixed deadline yet /
   crowded market, need to win on positioning / agency or developer
   partner already lined up / already complex, choosing a foundation for
   the long run. Derived weights: speed 0, seo 3, differentiation 3,
   flexibility 3, accessibility 0, maintenance 0, integrations 3,
   ownership 3. Computes to: custom 75, template 51, aiBuilder 27 →
   custom wins clearly.
4. "The balanced, moderate case" → A few weeks / stand out a bit /
   internal developer / steady moderate growth. Derived weights: speed 2,
   seo 1, differentiation 1, flexibility 1, accessibility 1, maintenance
   1, integrations 1, ownership 1. Computes to: custom 34, template 33,
   aiBuilder 27 → custom wins by only 1 point — a deliberately close,
   honest case, not a landslide.

Verify your implementation reproduces these four results from these four
answer sets using nothing but the formula below — if your build always
ranks "Fully custom development" first regardless of scenario, the logic
is wrong and must be fixed before shipping.

CALCULATION
For each approach: score = Σ over the eight factors of (derived weight
for that factor × that approach's 1–5 rating for that factor). Rank
approaches descending by score. Ties render at the same rank with a
"Tied for your current answers" note. If fewer than all four questions
are answered, show no ranking at all — see ERROR STATES.

UI / INTERACTION
- Four question blocks, each a set of 4 selectable option rows (radio
  behaviour), showing the question label and all four options plainly —
  no numeric value shown to the user, only the plain-language option
  text.
- Four "Try an example" cards above or beside the questions; selecting
  one sets all four answers to that example's choices (still changeable
  after).
- A live-updating ranked list below the questions: rank number, approach
  label, computed score, one-line "oneLiner". The rank-1 approach is
  expanded by default showing all eight trade-off sentences; the other
  two show collapsed with a "Show details" toggle per approach.
- A small "Your answers" recap strip showing the four current selections.
- Recompute and re-render instantly on every answer change — no submit
  button.

ERROR STATES
- Fewer than 4 questions answered: show "Answer all four questions to see
  which build approach fits your situation." and no ranked list.
- Exact score tie between approaches: show them at the same rank with
  "Tied for your current answers."
- If JavaScript fails to run, the page must still show the full static
  3×8 matrix (all scores and trade-off text) as a plain table —
  progressive enhancement, not a blank page.

DISCLAIMER (always visible near the questions, not collapsible away)
"These scores are a structural, qualitative assessment of how custom
development, visual templates and AI website-generation tools generally
work — not a lab measurement, not a benchmark of any single named
product, and not a guarantee of a specific price or feature set. Check
current terms directly with any specific provider you are considering."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs, no storage beyond in-memory session state. No input
field of any kind asks for a name, email, company or budget figure.

CTA
Primary button, always visible below the ranked results (not gated
behind any interaction):
  Label: "Free consultation: bring your scenario and we will map it to
  the build method that honestly fits"
  Link: https://www.weissmann.ai/en/kontakt/
Secondary lower-emphasis link near the top: "Read the full comparison
with all eight factors: read the article" (link to the article page).
Keep the CTA text and destination identical no matter which approach
ranks first, including when it is a template or an AI website-generation
tool rather than Weissmann's own custom-development service. No
countdowns, no fake urgency, no "before it's too late" phrasing.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a situation
worksheet that computes itself, not a personality quiz):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the rank-1 badge number,
    never as a full-approach colour fill; all three approaches otherwise
    share the same near-black treatment so nothing looks pre-selected
    before the user answers any question.
  Score bars: simple horizontal bars, 1px border #e5e5e2, single neutral
    dark-grey fill with the numeric score printed at the end — not a
    traffic-light gradient, not a gauge implying pass/fail.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Corner radius 10px (small elements) / 14px (cards). Soft shadow only on
    the expanded rank-1 detail card: 0 1px 2px rgba(17,17,17,.05),
    0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Question options: large bordered selectable rows, no gamified skins,
    no emoji.

ACCESSIBILITY
All four questions are native, keyboard-operable radio groups (arrow keys
move between options) with visible focus states and the selected option
announced on change. Example cards and "Show details" toggles are real
buttons, fully keyboard-reachable. Ranked list updates inside an
aria-live="polite" region. Rank/approach/score never conveyed by colour
alone — always paired with text. 4.5:1 minimum contrast. Respect
prefers-reduced-motion (no animated re-shuffle of the ranked list).

LANGUAGE
All UI copy in English. Do not add German, Italian or French
translations — this tool exists only in English.

Do not fabricate additional platform features, current pricing, or
benchmark numbers beyond what is given above. Do not hard-code "Fully
custom development" as the default or favoured winner — the ranking must
always be pure arithmetic from the four current answers.
```
