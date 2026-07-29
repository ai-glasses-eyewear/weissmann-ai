# Artifact Brief — Trust Experience Lab

**Article:** `do-customers-trust-ai-receptionists` (EN-PHONE-08) — "Do Customers Trust AI Receptionists? The Human-Touch Problem Nobody Solves With a Better Voice Alone"
**Language:** English (en) — article and artifact both English-only.
**Artifact type:** Interactive comparison lab (distinct mechanic from the other EN-PHONE artifacts in this batch: not a self-assessment gap checklist like the trades tool, not a branching migration planner, not a persona-matching selection lab — this one lets the reader pick two pre-built greeting-and-handover script variants, see them side by side, and read a reasoned trust-factor analysis for each, grounded in the article's own four-factor framework. It never produces a numeric score.).

---

## 1. User problem

A business owner evaluating an AI receptionist has usually only heard two kinds of guidance: marketing claims that a more realistic voice builds more trust, or a single "good greeting / bad greeting" example. Neither helps them reason about their *own* choice between several plausible script styles a vendor might propose, or judge why one style is likely to earn more trust than another beyond "it sounds nicer." They need to see complete script variants — not just the opening line, but how each one handles a question it can't answer and a request to speak to a person — compared side by side against the same fixed criteria, with the reasoning made explicit rather than asserted.

## 2. Intended audience

Owners and managers evaluating an AI receptionist for a Swiss business, comparing a vendor's proposed greeting/handover script against alternatives, or auditing whether their current script's *design philosophy* (not just its wording) is likely to build or erode caller trust.

## 3. Why an interactive artifact beats a static PDF

A printed table of "five approaches and their trust impact" is useful once, in the abstract. The interactive version:
- Lets the reader choose exactly two variants to compare directly, rather than scanning a flat list and doing the comparison themselves.
- Shows the *complete* interaction — greeting, an out-of-scope question, and a request to speak to a human — for each variant, so the comparison reflects a full call shape, not only an opening sentence.
- Adds a context toggle that demonstrates, concretely, the article's second core argument: for an emotionally weighted or high-stakes call, no script variant passes, regardless of how well-designed it is. A static table cannot make that override visceral the way an interactive lab that visibly "fails" every variant on demand can.
- Generates a short, deterministic "what differs" note between the two selected variants, so the reader leaves with a specific takeaway rather than having to infer one from five parallel rows.

## 4. Inputs

1. **Variant A selector** and **Variant B selector** — dropdowns or button groups, five options each: Silent, Apologetic, Buried, Direct, Direct + Proof. No default selection on first load (empty state prompts a choice). The two selectors must hold different variants; selecting the same variant in both disables that option in the other selector rather than silently duplicating the comparison.
2. **Call-context toggle** — two options, "Routine call" (default) and "Emotionally weighted or high-stakes call". Always visible, independent of whether variants are selected yet.

## 5. Calculation / decision logic

- **No score, no percentage, no aggregate verdict, ever.** Each variant carries three factor ratings (Transparency, Competence, Escape route), each a fixed three-level qualitative label — Strong / Adequate / Weak — pulled directly from `artifact-data.json`, never computed, never combined into a single number.
- **Variant comparison:** selecting Variant A and Variant B renders both cards side by side: philosophy, the three script excerpts (opening, out-of-scope handling, escalation handling), and the three factor ratings with their fixed rationale text.
- **"What differs" line:** a short, deterministic, template-generated sentence comparing A and B's factor ratings — e.g. "A and B match on Escape route, but differ on Transparency (Weak vs Strong) and Competence (Weak vs Strong)." This is assembled from the fixed rating data, not freely generated text, and never invents a claim beyond restating the rating difference.
- **Context override:** when "Emotionally weighted or high-stakes call" is selected, a persistent banner appears above both cards stating that the Context factor fails for all five variants regardless of design quality, with the four reasoning categories from the article (grief-adjacent, safeguarding, serious complaints, caller-signalled distress). The three factor-rating rows on both cards are visually de-emphasised and re-labelled "Not applicable — see context note above" rather than continuing to show Strong/Adequate/Weak, so a well-designed script never appears to "solve" an unsuitable context.
- Switching either variant selector updates only that side of the comparison; switching the context toggle does not clear the selected variants.

## 6. Outputs

1. **Two side-by-side script cards** (Variant A, Variant B), each showing: variant name, one-line design philosophy, the three script excerpts, and the three factor ratings with rationale.
2. **"What differs" summary line** beneath the two cards, generated as described above.
3. **Context override banner** (shown only when "Emotionally weighted or high-stakes call" is selected): the fixed override message plus the four reasoning categories, positioned above the two cards so it is the first thing read once that context is chosen.
4. A short, persistent link back to the article's comparison and human-routing sections, so the tool never has to re-explain the underlying reasoning.

## 7. Error states

- Fewer than two variants selected → comparison area stays empty with a plain prompt ("Choose two variants to compare.") — a calm empty state, not an error banner.
- Same variant chosen for both sides → prevented at the input level (already-selected variant is disabled in the other selector), not caught after the fact as an error message.
- JavaScript disabled / interactive layer fails to load → the underlying HTML still lists all five variants' full script excerpts and factor ratings in a static, readable order, plus the context-override message, as a fallback reference table (progressive enhancement, not a blank page).

## 8. Privacy considerations

- Fully client-side; nothing is transmitted to any server, no analytics, no external calls.
- No field anywhere collects a real caller's name, phone number, or any personal detail — every string in the tool is fixed reference content about the five variants and the context override.
- Selections (which variants, which context) may be kept in-session for convenience only; no requirement to persist across visits.

## 9. Accessibility requirements

- Both variant selectors and the context toggle fully keyboard-operable, with visible focus states.
- Factor ratings (Strong / Adequate / Weak) are always shown as text labels, never colour- or icon-only; an accent colour may highlight "Weak" but the word itself is always present.
- The context-override banner appears in an `aria-live="polite"` region so screen-reader users hear it the moment the context toggle changes.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` — card content updates instantly, no slide/fade animation, when reduced motion is requested.
- The two comparison cards and the script excerpts within them are marked up as genuine list/section structures (not bare `<div>`s) so screen readers can navigate them in order.

## 10. Mobile behaviour

- Below ~640px, the two variant selectors stack vertically (full-width) above the context toggle, which becomes two full-width stacked buttons.
- The two comparison cards stack vertically rather than sitting side by side; each factor row stacks its label above its rating.
- The context-override banner spans full width and appears above both cards regardless of viewport.
- All interactive controls sized for touch (≥44×44px).

## 11. Exact CTA

Primary CTA button, shown persistently below the tool (not gated behind selecting variants):

> **"Try the AI phone assistant on real calls (CHF 350, one-time)"** → links to `/en/services/ai-phone-assistant/`

Secondary, lower-emphasis link near the top of the tool:

> "Read the full article: the trust-factors framework" → links to the article's own URL (`/en/ai-academy/agents-automation/do-customers-trust-ai-receptionists/`).

No countdown, no fake urgency. The CTA text and destination never change based on the selected variants or context.

## 12. Disclaimer

Include a short, visible note near the variant selectors:

> "These five variants are illustrative script designs built to demonstrate the article's trust-factors framework — they are not transcripts of any real vendor's system, including Weissmann's, and the ratings are reasoned judgments against stated design principles, not a measured trust score from real callers. Real-world performance still depends on how a specific system is actually built and configured."

This keeps the tool from being read as a benchmark of any real product, consistent with the article's rule against fabricated precision or vendor claims.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only for the "Weak" rating label and the context-override banner border — always paired with the text itself, never a colour-only signal, never a large fill. "Strong" uses `--ink` (near-black) with a simple check glyph — no green anywhere in the palette. "Adequate" uses a muted `--ink-mute` tone with the word itself doing the work.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- The two comparison cards rendered as simple bordered panels (thin 1px borders, `--line: #e5e5e2`), corner radius `10px`/`14px`, soft shadow (`--shadow`) only when both cards are populated — editorial and calm, not a gamified quiz or a scored dashboard. No gauges, meters, or star ratings anywhere.
- Typography: `'Instrument Sans'` with system-sans-serif fallback.
- Overall feel: two annotated scripts laid side by side on a reading desk, with a plain-text verdict banner that can appear above them — not a chat-app mockup, not a scored comparison-shopping widget.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Trust Experience Lab". It is an
English-language interactive comparison tool for evaluating AI receptionist
greeting-and-handover script styles by their likely effect on caller trust —
not a calculator, not a scored quiz, not a greeting generator.

CONTEXT
The companion article's thesis: caller trust in an AI receptionist depends
on four factors — Transparency, Competence, Escape routes, and Context —
not on how realistic the voice sounds. This tool lets the reader compare
two of five pre-built script variants side by side against the first three
factors, and demonstrates the fourth (Context) by showing that for an
emotionally weighted or high-stakes call, every variant fails regardless of
its design quality.

VARIANTS (exactly 5, use this content verbatim or with only light editorial
polish — do not invent new variants or change the factor ratings)

1. id: silent, label: "Silent (voice-realism-only)"
   philosophy: "Never states it's AI; relies entirely on sounding
     convincingly human to build rapport."
   scriptOpening: "Good afternoon, thank you for calling — how can I help
     you today?"
   scriptOutOfScope: "Caller: 'What's your cancellation policy for a large
     group booking?' Assistant: 'Of course — for groups, cancellations are
     generally accepted up to 48 hours ahead, though it can vary a little
     depending on the event.' (No such policy exists; the answer is
     invented to sound plausible rather than admitting uncertainty.)"
   scriptEscalation: "Caller: 'Can I speak to a person?' Assistant: 'I can
     help you with most things right here — what did you need?' (Deflects
     rather than transferring; a human is only reached after the caller
     insists a second or third time.)"
   transparency: Weak — "Never discloses being AI at any point in the
     call, even when directly asked in a roundabout way; the caller can
     only find out by accident."
   competence: Weak — "Fills a genuine gap in its knowledge with a
     confident, invented answer rather than admitting the limit — the
     failure that costs the most trust once discovered."
   escapeRoute: Weak — "No proactive offer of a human exists; a request to
     speak to a person is deflected at least once before being honoured."
   overallReasoning: "This variant optimises entirely for sounding human in
     the moment and has nothing to fall back on the moment a caller notices
     something is off — the eventual discovery tends to feel like being
     deceived, not just talking to a machine."

2. id: apologetic, label: "Apologetic"
   philosophy: "Discloses honestly, but frames the disclosure and every
     limitation as something to apologise for."
   scriptOpening: "Hi, I'm sorry — you've reached our automated assistant,
     not a real person. I'll do my best to help."
   scriptOutOfScope: "Caller: 'What's your cancellation policy for a large
     group booking?' Assistant: 'I'm really sorry, I'm just a computer
     program, so I'm not 100% sure about that one — I hope that's okay, let
     me try to find someone who might know.'"
   scriptEscalation: "Caller: 'Can I speak to a person?' Assistant: 'Of
     course, I'm sorry I'm not more helpful — I'll transfer you now,
     apologies again for the inconvenience.'"
   transparency: Adequate — "Discloses clearly and early, but frames it as
     something to apologise for rather than a plain fact — the apology
     itself signals the business isn't confident the choice was
     reasonable."
   competence: Adequate — "Handles genuine limits honestly, but attaches
     the same hedging and apology to routine, low-stakes answers too, so
     the caller can no longer tell a real limitation from a reflexive
     one."
   escapeRoute: Adequate — "Transfers promptly when asked, but the
     apologetic framing reads as an excuse rather than a confident, normal
     part of the service."
   overallReasoning: "Honest, but the tone undermines the honesty — a
     caller is more likely to conclude 'this business isn't confident in
     its own system' than 'this business is being transparent with me.'"

3. id: buried, label: "Buried"
   philosophy: "Discloses correctly, but only after a long introduction,
     so the disclosure and the escalation option both arrive too late to
     be useful."
   scriptOpening: "Thank you for calling [Business]. We're a family-run
     team serving the region since [year], proud to offer [services]...
     you're currently speaking with our digital assistant, and I'm happy
     to help with bookings and general questions."
   scriptOutOfScope: "Caller: 'What's your cancellation policy for a large
     group booking?' Assistant: 'I can check that for you — for standard
     bookings the policy is 24 hours, though for larger groups it's best
     confirmed directly with the team, would you like me to arrange a
     callback?' (A reasonable, honest answer — the issue with this variant
     is timing, not competence.)"
   scriptEscalation: "Caller: 'Can I speak to a person?' Assistant:
     'Certainly — as I mentioned, you can always ask for our team, one
     moment please.' (The 'as I mentioned' refers to a line buried in the
     long opening the caller likely didn't retain.)"
   transparency: Weak — "Technically present, but placed after a lengthy
     introduction; a caller who hangs up early, or simply stops listening
     during the preamble, never actually receives it."
   competence: Adequate — "Handles the actual question competently and
     honestly once the caller's real request is reached — the design flaw
     here is timing, not knowledge."
   escapeRoute: Adequate — "Works when used, but is only ever mentioned
     once, early, in a sentence with no reason to be remembered three
     minutes later when the caller actually needs it."
   overallReasoning: "Nothing here is dishonest, which makes the flaw easy
     to miss in a script review — the problem only shows up on a live
     call, when a caller who didn't catch the opening has no real
     disclosure or escalation path in practice."

4. id: direct, label: "Direct"
   philosophy: "States plainly what it is, then moves straight to the
     caller's actual reason for calling."
   scriptOpening: "Hi, this is the digital assistant for [Business]. I can
     help with bookings and general questions — what can I do for you?"
   scriptOutOfScope: "Caller: 'What's your cancellation policy for a large
     group booking?' Assistant: 'That one's outside what I can confirm
     accurately — I'll connect you with the team, they'll have the exact
     answer.'"
   scriptEscalation: "Caller: 'Can I speak to a person?' Assistant: 'Of
     course — connecting you now.' (Recognised on the first ask, in
     ordinary phrasing, at any point in the call.)"
   transparency: Strong — "States its nature plainly and briefly in the
     opening line, with no apology or padding, and confirms honestly if
     asked again later in the call."
   competence: Adequate — "Handles what it knows correctly and states the
     limit plainly the moment it reaches one, without inventing an answer
     or over-hedging on things it does know."
   escapeRoute: Strong — "Recognises a request for a human on the first
     try, in ordinary language, and hands over immediately rather than
     requiring an exact trigger phrase."
   overallReasoning: "A caller's first impression is 'this is
     straightforward,' and nothing later in the call contradicts that —
     disclosure reads as a fact stated in passing, not a decision requiring
     justification."

5. id: direct-plus-proof, label: "Direct + Proof"
   philosophy: "Same brief, confident disclosure as Direct, immediately
     followed by visible evidence that it actually understood the
     request."
   scriptOpening: "Hi, this is the digital assistant for [Business]. So
     you're calling about a booking — for how many people, and for which
     day?"
   scriptOutOfScope: "Caller: 'What's your cancellation policy for a large
     group booking?' Assistant: 'That's outside what I can confirm
     accurately for a group — I'll connect you with the team now so you
     get the exact terms, not a guess.'"
   scriptEscalation: "Caller: 'Can I speak to a person?' Assistant: 'Of
     course — connecting you now.' Later in a long call: 'Just so you
     know, you can ask for a person at any point — happy to keep going
     too.' (The offer is repeated once, naturally, without being asked, if
     the call runs long.)"
   transparency: Strong — "Same brief, confident disclosure as Direct, and
     repeats it naturally if the call runs long or transfers, rather than
     relying on the caller to remember the opening line."
   competence: Strong — "Demonstrates it understood the request in the
     very next sentence after disclosing, rather than only proving
     competence later — the disclosure and the first proof of capability
     land together."
   escapeRoute: Strong — "Available throughout, recognised on ordinary
     phrasing, and reinforced once more without being asked if the
     conversation runs long — never left to the caller's memory of a
     single early mention."
   overallReasoning: "This is the combination the article argues is
     strongest: the caller learns what they're talking to and gets proof
     it's worth talking to in the same breath, so the first impression is
     'this works,' not just 'this is honest.'"

CONTEXT TOGGLE (exactly 2 options)
- "Routine call" (default): variants are shown with their normal factor
  ratings as above.
- "Emotionally weighted or high-stakes call": show a persistent banner
  ABOVE both comparison cards with this exact message: "No script variant
  passes here. The Context factor fails for all five variants regardless
  of their Transparency, Competence or Escape Route design — this category
  of call needs a human as the first responder, not a better-designed
  handover to one. Route it directly." Below the banner, list these four
  categories: "Grief-adjacent calls (bereavement, serious accident)",
  "Safeguarding concerns involving a child or vulnerable person", "Serious
  complaints with reputational or legal weight", "Any call the caller's
  tone signals is not routine, even if the topic isn't listed above." When
  this context is active, re-label the three factor-rating rows on BOTH
  cards as "Not applicable — see context note above" instead of showing
  Strong/Adequate/Weak, so a well-rated script never appears to resolve an
  unsuitable context.

UI / INTERACTION
- Two variant selectors (dropdowns or button groups), labelled "Variant A"
  and "Variant B", five options each, no default selection on first load.
  If the same variant is chosen in one selector, it becomes unavailable
  (disabled) in the other selector — never allow comparing a variant
  against itself.
- Context toggle: two buttons, "Routine call" selected by default.
- On selecting two different variants, render two side-by-side cards, each
  showing: variant name, philosophy, the three labelled script excerpts
  (Opening / Out-of-scope question / Escalation request), and the three
  factor ratings with their rationale text (or the context-override
  re-label, per the rule above).
- Below the two cards, show a single generated sentence comparing the two
  variants' factor ratings, built from a fixed template, e.g.: "[Variant A]
  and [Variant B] match on [factor], but differ on [factor] ([rating A] vs
  [rating B]) and [factor] ([rating A] vs [rating B])." List every factor
  that differs; if all three factors match, say so plainly instead of
  omitting the sentence.
- Persistent secondary link near the top: "Read the full article: the
  trust-factors framework" (link to the article page).

DISCLAIMER (always visible near the variant selectors, not collapsible
away)
"These five variants are illustrative script designs built to demonstrate
the article's trust-factors framework — they are not transcripts of any
real vendor's system, including Weissmann's, and the ratings are reasoned
judgments against stated design principles, not a measured trust score
from real callers. Real-world performance still depends on how a specific
system is actually built and configured."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No field ever asks for a real caller's name, number, or
any personal detail.

CTA
Primary button, always visible below the tool (not gated behind any
interaction):
  Label: "Try the AI phone assistant on real calls (CHF 350, one-time)"
  Link: https://www.weissmann.ai/en/services/ai-phone-assistant/
Secondary lower-emphasis link near the top: "Read the full article: the
trust-factors framework" (link to the article page).
Do not use countdowns or fake urgency. Do not change the CTA wording based
on the selected variants or context.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — two annotated
scripts on a reading desk, not a gamified quiz or a scored dashboard):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "Weak" rating label and
    the context-override banner border, always paired with the text
    itself, never a large fill or the only signal.
  "Strong": near-black (#111111) with a simple check glyph — do NOT use
    green; the site's palette has no green in it.
  "Adequate": a muted grey tone (#5f5f5f), text label doing the work.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only when both cards are populated:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Layout: two variant selectors + context toggle at the top, two
    comparison cards below (side by side on desktop, stacked below
    ~640px), "what differs" sentence beneath, context-override banner
    (when active) above the cards spanning full width.

ACCESSIBILITY
Full keyboard operability for both variant selectors and the context
toggle; visible focus states; aria-live="polite" region for the
context-override banner; 4.5:1 minimum contrast; respect
prefers-reduced-motion (card content updates instantly, no slide/fade);
comparison cards and script excerpts marked up as real list/section
structures, not bare divs.

LANGUAGE
All UI copy in English. Do not add German, Italian or French translations
— this tool exists only in English.

Do not fabricate or imply that any factor rating is a measured outcome
from real callers, or a claim about Weissmann's or any named competitor's
actual system behaviour. Every rating must read as a reasoned judgment
against the stated design principles in this brief, not a benchmark
result or a numeric score.
```
