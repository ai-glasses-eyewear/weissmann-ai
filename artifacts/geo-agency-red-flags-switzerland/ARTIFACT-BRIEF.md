# ARTIFACT BRIEF — GEO Pitch Red-Flag Auditor

**Companion article:** `geo-agency-red-flags-switzerland` (EN-WEB-10) — "How Do You Tell a Legitimate GEO Agency From a Snake-Oil Pitch?"
**Artifact title:** GEO Pitch Red-Flag Auditor
**Language:** English (en) only — matches the article; no DE/IT/FR version is commissioned.

---

## 1. User problem

A reader has just been pitched by a GEO ("get cited by ChatGPT") agency, by cold email, LinkedIn message or referral, and has a specific set of claims in front of them, not a vague unease. The article explains which ten patterns are worth distrusting and why, but reading a checklist and actually holding a real pitch against it, claim by claim, are different tasks. Without a structured place to do the second one, most readers either dismiss the whole pitch on a hunch (and possibly miss a legitimate vendor) or wave the whole thing through because the deck looked professional (and possibly miss two claims that are provably false). The tool's job is to make that specific judgment mechanical and repeatable, for this pitch and the next one.

## 2. Intended audience

Swiss SME owners, managers or marketing leads who are currently holding an actual GEO/AI-visibility sales pitch, verbal or written, and need a fast, honest read on how many of its claims match known false or unverifiable patterns before a follow-up call or a signature — not readers who are researching GEO mechanics from zero (that reader belongs on the article's cross-linked foundational pages instead).

## 3. Why an interactive artifact is better than a static PDF

A static checklist makes the reader hold ten patterns in their head while re-reading a sales deck or an email thread. The interactive version:
- Lets the reader answer each of the article's ten red-flag patterns against this specific pitch, one at a time, instead of scanning a paragraph list and guessing which ones apply.
- Separates the two claims that are **provably false regardless of context** (a guaranteed citation, a Google-mandated AI schema) from the eight claims that are **common warning signs but not automatically disqualifying**, and treats them differently in the result, exactly as the article does.
- Generates a specific, copyable follow-up message naming only the claims this particular pitch actually made, turning a vague "this feels off" into an answerable written question to the vendor.
- Deliberately produces **no numeric score**. A 0–100 "AI visibility score with no disclosed inputs" is red flag #6 in the companion article; a tool built to evaluate pitches cannot use the exact device the article warns against. The output is a plain-language risk read with named reasons, never a number.

## 4. Inputs

A single pitch is evaluated at a time. The reader may optionally label it (e.g. "Agency X", a first name, or leave it blank — see Privacy) before answering.

For each of the **ten claims below**, the reader selects one of three states: **"Yes, they said this"**, **"No, they didn't say this"**, or **"Not sure / need to ask"**. Every item defaults to "Not sure" until changed.

Two claims are marked **critical** (matching the article's "Two Claims That Are Always False" section):
1. A guaranteed number or date for an AI citation ("live in ChatGPT within 30/60 days", "triple your AI visibility").
2. A claim that Google (or another AI provider) requires special AI-only schema, markup or a "compliance tag".

Eight claims are marked **caution** (matching the ten-line checklist, items 2 and 4–10 minus the two above):
3. A "proprietary GEO algorithm" or "secret ranking signals" that cannot be plainly described.
4. Pay-per-citation or pay-only-if-cited pricing.
5. Case studies built only from an AI chat screenshot, with no reproducible method shown.
6. A proprietary "AI visibility score" with no disclosed inputs.
7. Urgency around a "narrow window before competitors catch up" with no specifics.
8. A quote that never references your existing SEO, content or crawlability.
9. Vagueness about which AI systems and which languages are actually in scope.
10. Pressure to sign before you can verify any earlier claim independently.

Every claim label reuses the article's own wording, so the tool and the article never drift out of sync.

## 5. Calculation / decision logic

- **No numeric score is computed at any point.** This is a hard rule, matching the tool's own anti-red-flag-#6 premise.
- **Critical-claim rule:** if either critical claim (1 or 2) is answered "Yes", the overall read is **"High concern — these are not judgment calls"**, regardless of every other answer. The rationale shown is the same two-part explanation from the article (no one controls a competitor's model; Google's own documentation states no special schema is required), not a generic warning.
- **Caution-claim rule (only reached if neither critical claim is "Yes"):** count how many of the eight caution claims are "Yes".
  - 0–1 → **"Low concern — still confirm every answer before signing."**
  - 2–3 → **"Moderate concern — work through the five due-diligence questions before signing."**
  - 4 or more → **"High concern — multiple independent warning signs are present."**
- **"Not sure" answers never count toward either concern level.** Instead, every item left at "Not sure" is collected into a separate "still unknown" list that drives the generated follow-up message (see Outputs). A pitch with all ten items at "Not sure" produces no risk read at all, only a full list of things to ask.
- **No pitch is ever treated differently based on its optional label.** A pitch labelled "Weissmann" runs through exactly the same two rules as one labelled "Agency X" or left blank — same thresholds, same wording, no auto-favourable outcome and no special leniency.

## 6. Outputs

1. A plain-language risk read (Low / Moderate / High concern, or "not enough information yet"), shown as text with a short reason line, never as a percentage, gauge, or star rating.
2. A list of every claim answered "Yes", each with the one-line explanation reused verbatim from the article, so the reader understands *why* it matters, not just *that* it was flagged.
3. A list of every claim left "Not sure", framed as "still worth asking about", feeding directly into the generated message below.
4. A copyable follow-up message to send back to the vendor, built from the "Yes" and "Not sure" items and the article's own five due-diligence questions, e.g.: *"Before we go further, could you clarify [named claims], and could you answer these directly: [relevant subset of the five questions]?"*
5. A static, always-visible reminder of the two claims that are false regardless of any answer given (see Disclaimer), so a reader who skips straight to the result still sees the two non-negotiable facts.

## 7. Error states

- Fewer than one claim answered (all ten at default "Not sure") → no risk read is shown; the tool instead displays only the full ten-item "still worth asking about" list and the complete five-question message, with a plain note: "Answer at least one claim to see a concern read for this pitch."
- A reader tries to enter a custom eleventh claim or a free-text score → not offered; the UI is limited to the ten fixed claims by design, with a short note if the reader looks for more: "This tool checks the ten documented patterns from the companion article, not a general-purpose rating."
- JavaScript disabled → the static HTML still lists all ten claims with their plain-language explanations and the three answer states in a readable, unfiltered order (progressive enhancement, not a blank page).

## 8. Privacy considerations

- Fully client-side; nothing is transmitted anywhere. The only free-text field is an optional, generic pitch label (e.g. "Agency X"); the tool does not ask for the vendor's registered company name, any personal name, an email address, or any other identifying detail, and a short line suggests keeping the label generic.
- If the build persists answers via `localStorage` for convenience across a session, this must be disclosed in one visible line with a working "Clear this pitch" control.
- No analytics tied to individual claim answers is required for the tool to function; if added, it must be aggregate/anonymous only and disclosed.

## 9. Accessibility requirements

- Each of the ten claims is a `<fieldset>` with a `<legend>` stating the claim, and the three answer states are real radio inputs, not styled `<div>`s, so screen readers announce the claim and the available choices together.
- The risk read and the "still worth asking about" list update inside an `aria-live="polite"` region, so a screen-reader user is told when the result changes without losing their place.
- Concern levels are always shown as text ("Low concern", "Moderate concern", "High concern"), never colour-only; an accent colour may accompany the High-concern label but never replace the word.
- Minimum 4.5:1 text contrast; respects `prefers-reduced-motion` (the result updates instantly, no animated counters or transitions standing in for the numeric score this tool deliberately does not have).
- The "Copy message" button is properly labelled and announces success or failure to assistive technology.

## 10. Mobile behaviour

- The ten claims render as a stacked list of cards, one claim per card with its three-way toggle beneath it, never a wide table or horizontally scrolling grid.
- A small sticky bar at the top shows the current concern read while the reader scrolls through the ten cards, so context is not lost on a long page.
- The generated follow-up message has a full-width, thumb-reachable "Copy message" button.
- Answer toggles are sized for touch (≥44×44px targets).

## 11. Exact CTA

Primary CTA, shown persistently once at least one claim has been answered:

> **"Run any GEO pitch, ours included, past a Weissmann call"** → links to `/en/kontakt/`

Secondary, lower-emphasis link near the top of the tool:

> "Read the full checklist and the two claims that are always false" → links to the article's own URL (`/en/ai-academy/marketing-seo-geo/geo-agency-red-flags-switzerland/`).

No countdown, no fake urgency, no "protect yourself before it's too late" framing. The CTA wording and destination never change based on the pitch's concern level or its optional label — the tool works identically for a High-concern pitch, a Low-concern pitch, and a pitch labelled "Weissmann".

## 12. Disclaimer

Shown near the top of the tool, and repeated next to the risk read:

> "This tool does not predict whether a GEO agency will perform well, and it is not legal advice. It only checks a pitch's claims against ten documented patterns: two that are false for any vendor, always (no one can guarantee an AI citation; no AI system, including Google's, requires special AI-only schema), and eight that are common warning signs but not automatic disqualifiers on their own. It cannot verify anyone's honesty beyond the answers you enter, and it treats a pitch labelled 'Weissmann' exactly like any other."

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`), consistent with other Weissmann artifacts:
- Background `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) reserved only for the "High concern" label and the two always-false claims reminder, always paired with the text label, never a large fill and never the only signal. "Moderate concern" uses a mid ink tone with its own label; "Low concern" uses the quietest ink-mute tone with its own label. No green and no traffic-light system — the site's palette has no green.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- The ten claims render as genuine bordered cards/fieldsets (thin 1px lines, `--line: #e5e5e2`), not a dial, gauge, or scorecard visual — no visual element should imply a measured quantity that does not exist.
- Typography `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the active risk-read banner.
- Overall feel: a calm, editorial due-diligence worksheet the reader fills in against a pitch already in front of them, not a quiz, dashboard, or lead-scoring tool.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "GEO Pitch Red-Flag Auditor". It is
an English-language due-diligence worksheet for Swiss SME owners and
managers who have just received a GEO ("get cited by ChatGPT/Gemini/
Perplexity") agency sales pitch and want to check its claims before a
follow-up call or a signature. It is explicitly NOT a lead-scoring tool
and NOT a general AI-visibility calculator — it evaluates the PITCH, not
the reader's own website.

CONTEXT
The companion article's thesis: two specific claims in a GEO sales pitch
are not just optimistic, they are false for any vendor, always — a
guaranteed AI citation (no one, including Google itself, can guarantee
inclusion in an AI answer) and a claim that Google or another AI provider
requires special "AI schema" (Google's own developer documentation says
no such requirement exists). Eight further claims are common warning
signs but not automatic disqualifiers on their own. This tool lets the
reader check a real pitch against exactly these ten patterns and get a
plain-language read plus a copyable follow-up message, never a numeric
score (a fake 0-100 "AI visibility score with no disclosed inputs" is
itself one of the ten red flags, so this tool must not produce one).

CLAIMS (fixed IDs and fixed English labels — use exactly; two are marked
critical, eight are marked caution)
  CRITICAL:
  guaranteed_citation → "They promised a specific number or date for an
    AI citation (e.g. \"live in ChatGPT within 30/60 days\", \"triple
    your AI visibility this quarter\")."
  ai_schema_required → "They claimed Google (or another AI provider)
    requires special AI-only schema, markup, or a \"compliance tag\"."
  CAUTION:
  secret_algorithm → "They referenced a \"proprietary GEO algorithm\" or
    \"secret ranking signals\" they would not plainly describe."
  pay_per_citation → "Their pricing is pay-per-citation or pay-only-if-
    cited."
  screenshot_case_study → "Their case studies are built only from an AI
    chat screenshot, with no reproducible method shown."
  fake_score → "They offered a proprietary \"AI visibility score\" with
    no disclosed inputs."
  fake_urgency → "They pushed urgency about a \"narrow window before
    competitors catch up\" with no specifics."
  ignores_seo → "Their quote never mentions your existing SEO, content
    quality, or crawler accessibility."
  vague_scope → "They were vague about which AI systems and which
    languages are actually in scope."
  pressure_to_sign → "They pushed you to sign before you could verify any
    earlier claim independently."

For each claim, the reader picks ONE of three states, defaulting to
"Not sure" for every claim until changed:
  - "Yes, they said this"
  - "No, they didn't say this"
  - "Not sure / need to ask"

An optional free-text field lets the reader label the pitch generically
(e.g. "Agency X"); do not ask for a company's registered name, a personal
name, an email, or any other identifying detail, and show a short note
suggesting the label stay generic.

LOGIC (implement exactly — no numeric scoring, no weighting):
- If EITHER critical claim is "Yes, they said this": overall read is
  "High concern — these are not judgment calls", regardless of every
  other answer. Show both critical-claim explanations regardless of
  which one triggered it:
    1. "No one, including Weissmann, can guarantee an AI citation. AI
       assistants retrieve from a live index and a model the vendor does
       not control; Google itself will not guarantee inclusion in its
       own AI Overviews even when every best practice is met."
    2. "Google's own developer documentation states no special AI-only
       schema or markup is required to appear in AI features. No
       comparable requirement exists for ChatGPT, Gemini or Perplexity."
- Otherwise (neither critical claim is "Yes"), count how many of the
  eight caution claims are "Yes, they said this":
    0-1 → "Low concern — still confirm every answer before signing."
    2-3 → "Moderate concern — work through the five due-diligence
      questions before signing."
    4+  → "High concern — multiple independent warning signs are
      present."
- "Not sure" answers never count toward either concern level. Collect
  every claim left at "Not sure" into a separate "still unknown" list.
- If ALL ten claims are still "Not sure": show no risk read at all —
  only the full ten-item "still worth asking about" list and a note:
  "Answer at least one claim to see a concern read for this pitch."
- Treat the optional pitch label identically in all logic and styling.
  A pitch labelled "Weissmann" must receive no special treatment, no
  favourable rounding, and no different wording anywhere.

OUTPUTS
1. The plain-language risk read (see Logic), always shown as text with a
   one-line reason, never a percentage, gauge, dial or star rating.
2. A list of every "Yes" claim with its one-line explanation (reuse the
   claim's own label plus, for the two critical claims, the two fixed
   explanation paragraphs above).
3. A list of every "Not sure" claim, labelled "still worth asking about".
4. A copyable follow-up message built from the "Yes" and "Not sure"
   claims plus these five fixed due-diligence questions (include only
   the ones relevant to what was flagged, or all five if more than three
   claims are Yes/Not sure):
     - "Show me one recent page you rewrote for a client, before and
       after, not a chat screenshot, the actual page."
     - "Which specific assistants and which languages are in scope, and
       how will you check them over time?"
     - "What happens on the invoice in a quarter where no citation
       appears anywhere?"
     - "Who reviews my crawlability and technical SEO baseline first,
       and can I see that report before any GEO work starts?"
     - "If I apply these same questions to your own pitch, will you sit
       through that conversation?"
   Template: "Before we go further, could you clarify: {list of Yes/Not-
   sure claim labels}? And could you answer directly: {selected
   questions}?" Include a "Copy message" button using the Clipboard API
   with a manual-select fallback if it fails (never throw a visible
   error).
5. A small, always-visible static reminder box (not dependent on any
   answer) stating the two claims that are false regardless of context,
   so a reader sees them even before answering anything.

ERROR / EMPTY STATES
- All ten claims still "Not sure" → show only the full "still worth
  asking about" list and the five-question message; no risk read; note:
  "Answer at least one claim to see a concern read for this pitch."
- JavaScript disabled → static HTML still lists all ten claims with
  plain-language descriptions and the three answer states in a readable,
  unfiltered order (progressive enhancement, not a blank page).
- Do not offer a way to add an eleventh custom claim or a free-text
  score; if a user looks for one, show: "This tool checks the ten
  documented patterns from the companion article, not a general-purpose
  rating."

DISCLAIMER (always visible near the top of the tool, and repeated next
to the risk read)
"This tool does not predict whether a GEO agency will perform well, and
it is not legal advice. It only checks a pitch's claims against ten
documented patterns: two that are false for any vendor, always, and
eight that are common warning signs but not automatic disqualifiers on
their own. It cannot verify anyone's honesty beyond the answers you
enter, and it treats a pitch labelled 'Weissmann' exactly like any
other."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. The only free-text field is an optional, generic
pitch label — no company name, personal name, email or address is
requested. If answers are kept in localStorage for convenience, disclose
it in one visible line with a working "Clear this pitch" button.

CTA
Primary button, visible once at least one claim is answered:
  Label: "Run any GEO pitch, ours included, past a Weissmann call"
  Link: https://www.weissmann.ai/en/kontakt/
Secondary, lower-emphasis link near the top: "Read the full checklist
and the two claims that are always false" (link to the article page).
No countdowns or fake urgency. CTA wording and styling never change
based on the concern level or the optional pitch label.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a
due-diligence worksheet, not a quiz, dashboard or lead-scoring tool):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "High concern" label and
    the always-false-claims reminder box, always paired with text, never
    a large fill or the only signal. "Moderate concern" uses a mid ink
    tone; "Low concern" uses the quietest ink-mute tone; each with its
    own text label. Do NOT use green or a traffic-light system.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the active risk-read banner:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  The ten claims render as genuine bordered cards/fieldsets, NOT a dial,
  gauge, or scorecard visual — this tool has no numeric score to display.
  Layout: claim cards stack vertically on all screen sizes; a small
  sticky bar shows the current risk read while scrolling on narrow
  widths.

ACCESSIBILITY
Each claim is a real <fieldset> with a <legend> and three real radio
inputs (not styled divs). Full keyboard operability with visible focus
states. Concern levels always shown as text, never colour-only.
aria-live="polite" region for the risk read and the "still unknown"
list. 4.5:1 minimum contrast; respect prefers-reduced-motion (results
update instantly, no animated counters). Copy button announces success/
failure to assistive tech.

LANGUAGE
All UI copy in English. Do not add German, Italian or French
translations — this tool exists only in English.

Never compute or display a numeric score of any kind. Never give a pitch
labelled "Weissmann" (or any other label) special treatment in the logic
or the visuals.
```
