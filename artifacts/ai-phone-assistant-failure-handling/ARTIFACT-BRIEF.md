# ARTIFACT BRIEF — Conversation Failure Simulator

**Companion article:** `ai-phone-assistant-failure-handling` (DE-PHONE-07) — "Was passiert, wenn der KI-Telefonassistent den Anrufer falsch versteht?"
**Artifact title:** Fehlerbehandlung-Simulator für KI-Telefonassistenten
**Language:** German (de) only — matches the article; no EN/IT/FR version is commissioned.

---

## 1. User problem

A Swiss SME owner evaluating (or already running) an AI phone assistant has no concrete sense of what "good failure handling" actually sounds like in a real conversation. Vendor marketing promises the system "handles errors gracefully," but that sentence is unfalsifiable and abstract. The reader cannot picture the difference between a well-designed and a poorly-designed recovery sequence for the five situations that actually break calls — a misheard name, background noise, an off-topic question, an angry caller, and sudden silence — until they hear both versions side by side, turn by turn.

## 2. Intended audience

Swiss SME decision-makers (owners, office/practice managers) who are choosing an AI phone assistant — for their own business or in comparison with Weissmann's — and want to know exactly what to listen for on a test call, plus staff who will field escalated calls and want to understand what "warm transfer with context" should feel like from the caller's side.

## 3. Why an interactive artifact beats a static PDF

A static side-by-side table of "good vs bad" scripts is readable once and then forgotten. The interactive version:
- Lets the reader choose only the failure scenario relevant to their business (a hotel cares about background noise and language switching more than a consultancy does) instead of reading all five every time.
- Plays each path (poor design vs well-designed) as a turn-by-turn sequence with a short "why this matters" annotation attached to the exact turn where the design choice happens — a static script can show the words but not point at the decision.
- Ties every annotated turn back to the article's four-stage escalation framework (Konfidenzschwelle → Rückfrage → Wiederholung mit Umformulierung → menschliche Übergabe), so the reader learns to recognise the stage a real system is (or isn't) applying, not just this one example.
- Includes a self-check the reader fills in about their *own* system's behaviour, which a static PDF cannot react to or personalise.

## 4. Inputs

1. **Scenario picker** — five buttons/tabs, one per failure scenario: falscher Name, Hintergrundgeräusche, Frage ausserhalb des Wissens, verärgerter Anrufer, Stille/Verbindungsabbruch. Exactly one active at a time; no default pre-selected (empty state prompts a choice).
2. **Path toggle** — "Schlecht gelöst" / "Gut gelöst", shown as two clearly labelled sequences (not colour-only) for the selected scenario. Default: both visible; on mobile, a toggle switches which one is showing (see §10).
3. **Playback mode** — a simple "Schritt für Schritt anzeigen" toggle (off by default): when on, turns reveal one at a time on click/tap of "Weiter"; when off, the full sequence is visible at once. Purely a presentation preference — does not change content.
4. **Selbstcheck (optional, secondary feature)** — six checkboxes drawn directly from the article's "Warnsignale eines schlecht gebauten Systems" list, letting the reader mark which behaviours they have personally noticed on calls with their own or a vendor's system.

## 5. Calculation / decision logic

- **No score, no numeric verdict.** This tool does not compute or output a number, rating, or ranking — it is a scenario walkthrough and a reflection checklist, not a scorecard (the project already has scorecard-type artifacts for other articles; this one must stay a different mechanic).
- **Scenario → sequence lookup:** selecting a scenario loads its fixed `badPath` and `goodPath` turn arrays from `artifact-data.json`. Nothing is generated or randomised — all dialogue is pre-written, fixed content, clearly framed as illustrative.
- **Turn annotation lookup:** each turn in `goodPath` carries a `stage` field (one of `konfidenzschwelle`, `rueckfrage`, `umformulierung`, `uebergabe`) which the UI resolves to a one-line explanation from the shared `frameworkStages` lookup in the data file — so the same four explanations are reused consistently across all five scenarios rather than rewritten five times. Each turn in `badPath` carries an `antiPattern` field (e.g. `stille_fehlleistung`, `keine_umformulierung`, `ton_ignoriert`, `endlosschleife`, `kontextverlust_bei_uebergabe`) resolved the same way.
- **Selbstcheck logic:** ticking a warning sign simply reveals its pre-written one-line consequence and a pointer to the relevant framework stage (e.g. "Das betrifft Stufe 3 — Wiederholung mit Umformulierung"). No aggregate score, no "your system is X% broken" language — the article is explicit that error rates and scorecards are the wrong frame here; recovery quality is qualitative, not a single number.

## 6. Outputs

1. Two labelled dialogue sequences ("Schlecht gelöst" / "Gut gelöst") for the selected scenario, each turn showing speaker (Anrufer / Assistent), the line, and — for the good path — the framework stage being applied, or — for the bad path — the anti-pattern name.
2. A one-line "Kernprinzip für dieses Szenario" summary shown once both paths have been viewed (or immediately in non-step mode).
3. If the Selbstcheck is used: a plain-language list of the ticked warning signs, each with its one-line consequence and the framework stage it maps to — never a score or percentage.
4. A persistent, unobtrusive link back to the article's four-stage framework section, so the tool never has to re-explain the framework itself.

## 7. Error states

- No scenario selected → both sequence panels stay empty with a plain prompt ("Wählen Sie ein Szenario, um beide Verläufe zu sehen.") — a calm empty state, not an error banner.
- Step-by-step mode reaches the end of a sequence → "Weiter"-button disables and is replaced with "Von vorn beginnen", never a dead click.
- Selbstcheck left fully empty → no summary panel renders; no false "0 Warnsignale gefunden" message implying a clean bill of health that was never actually assessed.
- JavaScript disabled / artifact fails to load interactive layer → the underlying HTML still lists both sequences for all five scenarios in a static, readable stacked order (progressive enhancement, not a blank page).

## 8. Privacy considerations

- Fully client-side; nothing is transmitted to any server. No form field collects a phone number, name, or any real caller information at any point — the tool only ever displays fixed example dialogue and reflects back the reader's own checkbox selections.
- Selbstcheck checkbox state may be kept in the browser session only (no `localStorage` requirement, since there is nothing worth persisting across visits) — if the build stores it locally for convenience, disclose that in one line with a visible reset control.
- A one-line note near the dialogue panels states explicitly that all example calls are constructed illustrations of a design pattern, not recordings or transcripts of any real business, caller, or vendor system (including Weissmann's).

## 9. Accessibility requirements

- Scenario tabs and the path toggle fully keyboard-operable (arrow keys or tab order), with visible focus states.
- "Schlecht" and "Gut" are never distinguished by colour alone — always paired with the text label itself; the anti-pattern/stage tags are text, not icon-only.
- Step-by-step reveal and Selbstcheck consequence text appear in an `aria-live="polite"` region so screen-reader users hear updates without needing to re-navigate.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` — turn reveals appear instantly (no slide/fade animation) when reduced motion is requested.
- Each dialogue turn is marked up as a genuine list/definition structure (not bare `<div>`s) so screen readers can navigate turn by turn.

## 10. Mobile behaviour

- Below ~640px, the two paths stack vertically instead of side by side, with a sticky small toggle ("Schlecht" / "Gut") at the top of the dialogue area so the reader can flip between them without losing scroll position.
- Scenario picker becomes a horizontally scrollable tab strip (touch-swipeable) rather than five buttons wrapping awkwardly.
- Step-by-step "Weiter" button is full-width and thumb-reachable at the bottom of the viewport.
- Selbstcheck checkboxes sized for touch (≥44×44px targets), one per row, full width.

## 11. Exact CTA

Primary CTA button, shown persistently below the scenario/sequence area (not gated behind completing the Selbstcheck):

> **"Eskalationslogik in der Praxis testen (CHF 350, einmalig)"** → links to `/leistungen/ki-telefonassistent/`

Secondary, lower-emphasis link near the top of the tool:

> "Zum vollständigen Artikel mit dem Eskalationsgerüst: Artikel lesen" → links to the article's own URL (the academy spoke page for `ai-phone-assistant-failure-handling`).

No countdown, no fake urgency, no "before it's too late" language. The CTA text and destination never change based on which scenario or path the reader is viewing.

## 12. Disclaimer

Include a short, visible note near the scenario picker:

> "Alle Gesprächsbeispiele in diesem Werkzeug sind konstruierte Illustrationen eines Designmusters — keine Mitschnitte oder Transkripte eines echten Anrufs, weder von Weissmann noch von einem anderen Anbieter. Sie zeigen, wie sich eine gute bzw. schlechte Fehlerbehandlung anhört, nicht ein gemessenes Ergebnis eines bestimmten Systems."

This directly prevents the tool from being mistaken for a real call recording or a benchmark of any specific vendor's actual behaviour — consistent with the article's rule against inventing vendor-specific claims.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used only for the "Schlecht gelöst" label/border accent and anti-pattern tags — never as a large fill, and always paired with the word "Schlecht" or the anti-pattern name, never colour alone. The "Gut gelöst" side uses `--ink` (near-black) with a simple check glyph, not green — the site has no green in its palette and this keeps the tool visually calm rather than traffic-light-coded.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text) — not accent-red.
- Dialogue turns rendered as simple speech-style rows (speaker label in small caps, line in regular text), not chat-bubble graphics — keep it editorial, like a printed call transcript, not a messaging-app mockup.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; thin 1px borders (`--line: #e5e5e2`), corner radius `10px`/`14px`, soft shadow (`--shadow`) only on the active dialogue panel.
- Overall feel: an annotated transcript on paper that happens to be interactive — not a chat-app simulator or a gamified quiz.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Fehlerbehandlung-Simulator für
KI-Telefonassistenten" (Conversation Failure Simulator). It is a
German-language (de-CH) interactive walkthrough tool for Swiss businesses
evaluating how an AI phone assistant (any vendor) should recover from a
misunderstood caller — not a scorecard, not a calculator.

CONTEXT
The companion article's thesis: every voice AI system misunderstands
callers sometimes (so does every human receptionist) — what separates a
well-built system from a poorly-built one is not the error rate but the
recovery design: a confidence threshold, a targeted clarifying question,
a rephrased retry, and a clean handover to a human, in that order, within
at most two failed attempts. This tool makes that abstract framework
concrete by playing out five real failure scenarios twice each: once as a
poorly-designed sequence, once as a well-designed one.

SCENARIOS (5, user picks exactly one at a time, no default selected)
1. falscher-name — a caller's surname is misheard/mistranscribed.
2. hintergrundgeraeusche — caller is in a noisy workshop/street environment.
3. frage-ausserhalb-wissens — caller asks something the assistant was never
   configured to answer (e.g. a tax question to a trades business).
4. veraergerter-anrufer — caller is visibly frustrated (repeat caller, has
   called about the same issue before).
5. stille-verbindungsabbruch — caller goes silent or the line drops
   mid-sentence.

For each scenario, use EXACTLY this content (light rewording for UI
labels is fine, but do not invent new dialogue beyond what's listed; do
not fabricate a "measured" outcome or attribute any script to a real
vendor):

--- falscher-name ---
BAD (antiPattern: stille_fehlleistung): Caller says "Mein Name ist
Aebischer." Assistant mishears it as "Ebischer", does not flag low
confidence, and confirms "Alles klar, Herr Ebischer, ich habe Sie
eingetragen" — booking a real appointment under the wrong name, with
nobody noticing until later.
GOOD (stage: konfidenzschwelle then rueckfrage): Caller says "Mein Name
ist Aebischer." Assistant's speech recognition returns low confidence on
the surname. Assistant asks: "Können Sie mir Ihren Nachnamen bitte kurz
buchstabieren?" Caller spells it. Assistant confirms it back before
proceeding.

--- hintergrundgeraeusche ---
BAD (antiPattern: stille_fehlleistung): Caller is in a loud workshop.
Assistant catches three isolated words and still says "Perfekt, ich habe
einen Termin für Sie gebucht" despite having understood only fragments.
GOOD (stage: rueckfrage then uebergabe): Assistant notices persistently
low confidence across multiple turns and says: "Ich kann Sie gerade
schlecht verstehen, es klingt nach viel Lärm bei Ihnen. Möchten Sie kurz
an einen ruhigeren Ort wechseln, oder soll ich Sie direkt mit unserem
Team verbinden?" — caller chooses, assistant does not guess further.

--- frage-ausserhalb-wissens ---
BAD (antiPattern: keine_umformulierung): Caller asks a detailed tax
question. Assistant, having no real answer, repeats a generic non-answer
("Dazu kann ich Ihnen leider keine Auskunft geben") without offering any
next step, leaving the caller stuck.
GOOD (stage: uebergabe): Assistant recognises the topic is out of its
configured scope and says immediately: "Das ist eine Detailfrage, die bei
uns am besten das Team direkt beantwortet. Ich verbinde Sie gleich, oder
soll ich einen Rückruf notieren?" — no pretending to understand, no
wasted retries on an unanswerable question.

--- veraergerter-anrufer ---
BAD (antiPattern: ton_ignoriert): Caller says "Das ist jetzt schon das
dritte Mal, dass ich deswegen anrufe!" Assistant replies "Gerne bearbeite
ich Ihre Terminanfrage. Für welchen Tag darf ich buchen?" — completely
ignoring the caller's frustration and continuing the script unchanged.
GOOD (stage: uebergabe): Same caller line. Assistant replies: "Das tut
mir leid, das sollte so nicht passieren. Ich verbinde Sie direkt mit
jemandem aus dem Team, der sich das ansehen kann — einen Moment." — no
attempt to argue the frustration away, immediate handover with context.

--- stille-verbindungsabbruch ---
BAD (antiPattern: endlosschleife): Caller goes silent mid-call (background
distraction). Assistant repeats "Hallo? Sind Sie noch da?" on a loop with
no time limit and no fallback, until the caller eventually just hangs up
having heard nothing useful.
GOOD (stage: uebergabe): Assistant waits a defined short period, then
says once: "Ich habe Sie kurz nicht mehr gehört. Falls Sie noch da sind:
ich rufe in ein paar Minuten gern zurück, oder Sie erreichen uns jederzeit
unter [Nummer]." Then ends the call cleanly instead of looping — no dead
air, no indefinite hold.

FRAMEWORK STAGE LABELS (reuse this exact lookup for annotations, do not
reword per scenario):
  konfidenzschwelle → "Konfidenzschwelle: das System erkennt selbst, dass
    es sich nicht sicher ist, statt zu raten."
  rueckfrage → "Gezielte Rückfrage: eine präzise, eingrenzende Frage statt
    eines vagen "Wie bitte?"."
  umformulierung → "Wiederholung mit Umformulierung: ein neuer, engerer
    Versuch statt derselbe Satz noch einmal."
  uebergabe → "Menschliche Übergabe: der geplante Ausgang, warm und mit
    vollständigem Kontext, nicht die Notbremse."

ANTI-PATTERN LABELS (reuse exactly):
  stille_fehlleistung → "Stille Fehlleistung: falsch verstanden, aber
    trotzdem entschlossen gehandelt — der gefährlichste Fehler, weil er
    unbemerkt bleibt."
  keine_umformulierung → "Keine Umformulierung: derselbe Satz noch einmal,
    ohne neuen Ansatz."
  ton_ignoriert → "Ton ignoriert: der Wortlaut wird verarbeitet, die
    erkennbare Verärgerung nicht."
  endlosschleife → "Endlosschleife: keine Obergrenze, kein definierter
    Ausstieg."
  kontextverlust_bei_uebergabe → "Kontextverlust bei Übergabe: die
    anrufende Person muss beim Menschen wieder bei null anfangen."

UI / INTERACTION
- Scenario picker: 5 tabs/buttons, none selected by default. Selecting one
  loads both its BAD and GOOD sequences.
- Path display: both sequences visible side by side on desktop widths;
  stacked with a small sticky "Schlecht" / "Gut" toggle on narrow widths
  (<640px). Never distinguish "Schlecht" vs "Gut" by colour alone — always
  show the word.
- Optional "Schritt für Schritt anzeigen" toggle (off by default): when on,
  turns reveal one at a time via a "Weiter" button; when off, show the
  full sequence at once. When the last turn is reached, replace "Weiter"
  with "Von vorn beginnen".
- Each turn shows: speaker ("Anrufer" / "Assistentin"), the line in quotes,
  and — directly beneath it — the resolved stage or anti-pattern label
  from the lookups above, styled as a small annotation, not as part of the
  spoken line itself.
- After both paths have been viewed for a scenario (or immediately if
  step-mode is off), show a one-line "Kernprinzip für dieses Szenario"
  summary (write one fitting, concise sentence per scenario based on its
  GOOD stage description above).
- SELBSTCHECK (secondary section, below the simulator): 6 checkboxes with
  exactly this text (from the article's warning-sign list):
    1. "Wiederholt beim zweiten Versuch denselben Satz, nur lauter oder
        langsamer, statt umzuformulieren." → maps to umformulierung
    2. "Bestätigt oder bucht etwas, obwohl die Angaben erkennbar unsicher
        verstanden wurden." → maps to konfidenzschwelle
    3. "Kennt keine Obergrenze für Rückfragen, der Anruf dreht sich im
        Kreis." → maps to rueckfrage
    4. "Übergabe an einen Menschen erfolgt ohne Kontext, man muss sich
        wiederholen." → maps to uebergabe
    5. "Reagiert auf einen verärgerten Ton nicht anders als auf einen
        neutralen." → maps to uebergabe
    6. "Stille am anderen Ende führt zu keiner definierten Reaktion." →
        maps to rueckfrage
  Ticking a box reveals (in an aria-live region) that item's stage-lookup
  text as a one-line "Das betrifft: [Stufe] — [Erklärung]" note. Do NOT
  compute or display any score, percentage, count, or verdict — this is a
  reflection aid, not a scorecard. Leaving all boxes unticked shows no
  summary panel at all (not a "0 problems found" message).

DISCLAIMER (always visible near the scenario picker, not collapsible away)
"Alle Gesprächsbeispiele in diesem Werkzeug sind konstruierte
Illustrationen eines Designmusters — keine Mitschnitte oder Transkripte
eines echten Anrufs, weder von Weissmann noch von einem anderen Anbieter.
Sie zeigen, wie sich eine gute bzw. schlechte Fehlerbehandlung anhört,
nicht ein gemessenes Ergebnis eines bestimmten Systems."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No input field ever asks for a real name, number, or
caller detail — the tool only displays fixed example dialogue and reflects
the reader's own checkbox choices.

CTA
Primary button, always visible below the simulator (not gated behind any
interaction):
  Label: "Eskalationslogik in der Praxis testen (CHF 350, einmalig)"
  Link: https://www.weissmann.ai/leistungen/ki-telefonassistent/
Secondary lower-emphasis link near the top: "Zum vollständigen Artikel mit
dem Eskalationsgerüst: Artikel lesen" (link to the article page).
Do not use countdowns, fake urgency, or "before it's too late" phrasing.
Do not change the CTA wording based on which scenario is selected.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — an annotated
paper transcript, not a chat-app or SaaS dashboard):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the "Schlecht gelöst" label
    and anti-pattern annotation tags, always paired with text, never as a
    large fill or as the only signal.
  "Gut gelöst" side: near-black (#111111) with a simple check glyph — do
    NOT use green; the site's palette has no green in it.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the active dialogue panel:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Dialogue turns styled as simple labelled rows (speaker in small caps,
  line in quotes), not chat bubbles.
  Layout: two-column side-by-side on desktop, stacked with a sticky
  Schlecht/Gut toggle below 640px. Scenario picker becomes a horizontally
  scrollable tab strip on narrow widths.

ACCESSIBILITY
Full keyboard operability for scenario tabs, path toggle, step button and
checkboxes; visible focus states; aria-live="polite" region for step
reveals and Selbstcheck consequence text; 4.5:1 minimum contrast; respect
prefers-reduced-motion (turns appear instantly, no slide/fade); dialogue
turns marked up as a real list structure, not bare divs.

LANGUAGE
All UI copy in German (Swiss spelling: "ss", not "ß"). Do not add English,
Italian or French translations — this tool exists only in German.

Do not fabricate or imply that any scenario shows a real recorded call
from Weissmann or any named competitor. Every dialogue line must read
clearly as a constructed illustration of a design pattern.
```
