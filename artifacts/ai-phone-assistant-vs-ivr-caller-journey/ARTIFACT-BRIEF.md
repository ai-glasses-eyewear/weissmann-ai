# ARTIFACT BRIEF — Split-Screen IVR vs Conversational Call Simulator

**Companion article:** `ai-phone-assistant-vs-ivr-caller-journey` (DE-PHONE-08) — "KI-Telefonassistent oder «Drücken Sie die 1»: Warum Menschen Telefonmenüs hassen"
**Artifact title:** Anruf-Simulator: Telefonmenü gegen KI-Telefonassistent
**Language:** German (de) only — matches the article; no EN/IT/FR version is commissioned.

---

## 1. User problem

A Swiss SME owner comparing "keep our IVR" against "switch to an AI phone assistant" only ever hears the claim in the abstract ("callers prefer talking to typing"). They have no way to see, turn by turn, what that actually costs or saves for a call like the ones their own business gets. The article walks through two full example calls in prose; this tool lets the reader replay those same calls (plus a third, deliberately IVR-favouring one) as a side-by-side transcript with running counters for turns, elapsed time and corrections — the exact three numbers the article uses as its comparison method — so the reader can apply the same method to a fourth scenario in their own head instead of taking the article's numbers on faith.

## 2. Intended audience

Swiss SME owners, office managers and practice managers who already have some form of phone menu (or are being sold one) and are deciding whether a conversational AI phone assistant is worth the switch — including readers who suspect, correctly, that the answer is "not always."

## 3. Why an interactive artifact beats a static PDF

A printed transcript of two calls is readable once. The interactive version:
- Lets the reader step through both paths turn by turn at their own pace, or reveal the whole transcript at once — the article's prose can only do the latter.
- Runs a live counter (turns / elapsed seconds / corrections) that updates as each turn is revealed, making the comparison numbers something the reader watches accumulate rather than a summary they have to trust.
- Includes a third scenario not in the article at all — a noisy-environment emergency dispatch call — where the IVR path wins outright, so the tool itself demonstrates the article's honest "IVR is sometimes the better choice" section instead of only asserting it in text.
- Lets the reader pick which of the three scenarios to explore first, matching whichever is closest to their own business instead of forcing a fixed reading order.

## 4. Inputs

1. **Scenario picker** — three tabs/cards, one per scenario: "Termin verschieben, vertippte Kundennummer" (Autowerkstatt), "Rückgabe, falsches Stichwort" (Haushaltsgeräte-Geschäft), "Notdienst aus lauter Umgebung" (Sanitär-Pikettdienst). No default selection — an empty state invites a choice.
2. **Path display mode** — "Beide nebeneinander" (default on desktop) vs a single-path focus mode; on narrow viewports this becomes the only way to switch between IVR and AI (see §10).
3. **Playback mode** — "Schritt für Schritt" toggle (off by default). Off: full transcript and final counters shown immediately. On: turns reveal one at a time via a "Weiter" button on each path independently, with the running counter updating live as turns are revealed.
4. **No text input anywhere.** The tool never asks the reader to type a phone number, name or any personal detail — see §8.

## 5. Calculation / decision logic

- **No score, no ranking, no "you should switch" verdict.** The tool computes only the three counters (turns, seconds, corrections) already fixed per path in `artifact-data.json`, plus the `outcome` string for each path. It never aggregates the three scenarios into one number or declares an overall winner across all three — each scenario stands on its own, and one of the three (`notdienst-laute-umgebung`) is deliberately built so the IVR path has fewer turns, less time and no corrections.
- **Scenario → transcript lookup:** selecting a scenario loads its fixed `ivrPath.steps` and `aiPath.steps` arrays from `artifact-data.json`. Nothing is generated, randomised or personalised — all dialogue is pre-written and clearly framed as illustrative (see disclaimer, §12).
- **Live counters in step mode:** as each turn is revealed, the turn counter increments only on steps carrying a `turn` field (system announcements/prompts don't count as a caller turn); the seconds counter jumps to that step's `t` timestamp; the corrections counter increments only on steps carrying `correction: true`. In non-step mode, the final `summary` object for that path is shown directly instead of being animated.
- **Comparison bar:** below each fully-revealed pair, render the two `summary` blocks side by side (turns / seconds / corrections / outcome) so the reader sees the same three numbers used in the article, computed from the same transcript they just read — not a separately asserted claim.

## 6. Outputs

1. Two labelled transcripts ("Telefonmenü" / "KI-Telefonassistent") for the selected scenario, each turn showing speaker (Ansage/Anrufer or Assistent/Anrufer), the line, elapsed time, and — where present — a short italic note explaining why that turn matters (e.g. "Rücksprung zum Hauptmenü" or "Der Assistent gleicht die unsichere Zifferneingabe selbst ab").
2. A comparison bar per scenario: Züge (turns), Zeit (seconds, formatted m:ss), Korrekturen (corrections), Ergebnis (outcome) for both paths side by side.
3. For the noisy-environment scenario specifically, no special "AI wins" styling is applied — the same neutral comparison bar is used, and the IVR numbers are simply better, exactly as computed from the data.
4. A persistent, unobtrusive link back to the article's "Testen Sie Ihr eigenes Telefonmenü" checklist section, so the tool does not have to repeat those six questions itself.

## 7. Error states

- No scenario selected → transcript area stays empty with a plain prompt ("Wählen Sie oben ein Szenario, um beide Anrufe zu sehen.") — a calm empty state, not an error banner.
- Step mode reaches the last turn of a path → the "Weiter" button for that path disables and is replaced with "Von vorn beginnen"; the other path's button keeps working independently (the two paths are not forced to stay in sync).
- JavaScript disabled / artifact fails to load the interactive layer → the underlying HTML still lists all three scenarios' full transcripts and summary bars in a static, readable stacked order (progressive enhancement, not a blank page).

## 8. Privacy considerations

- Fully client-side; nothing is transmitted to any server, and there is no analytics call of any kind.
- No input field ever collects a real phone number, name, customer number or any other personal detail — every line of dialogue is fixed example content from `artifact-data.json`; the reader only ever clicks tabs and a "Weiter" button.
- A one-line note near the scenario picker states explicitly that all transcripts are constructed illustrations of typical interaction patterns, not recordings or transcripts of any real call, business or vendor system (Weissmann included).

## 9. Accessibility requirements

- Scenario tabs, path-mode toggle and step buttons fully keyboard-operable (arrow keys or tab order), with visible focus states.
- "Telefonmenü" and "KI-Telefonassistent" are never distinguished by colour alone — always paired with the text label; the comparison bar's numbers are plain text, not colour-coded pass/fail icons.
- Step reveals and the live counter update inside an `aria-live="polite"` region so screen-reader users hear the new turn and updated counts without re-navigating.
- Minimum 4.5:1 text contrast; respect `prefers-reduced-motion` — turns appear instantly (no slide/fade) when reduced motion is requested.
- Each transcript is marked up as a genuine ordered list (not bare `<div>`s) so screen readers can move turn by turn and get the running order for free.

## 10. Mobile behaviour

- Below ~640px, "Beide nebeneinander" is replaced by the single-path focus mode automatically, with a small sticky toggle ("Telefonmenü" / "KI-Telefonassistent") at the top of the transcript so the reader can flip sides without losing scroll position.
- Scenario picker becomes a horizontally scrollable card strip (touch-swipeable) instead of three cards competing for width.
- "Weiter" buttons are full-width and thumb-reachable at the bottom of the viewport.
- The comparison bar stacks to two rows (one per path) instead of a four-column table.

## 11. Exact CTA

Primary CTA button, shown persistently below the scenario area (not gated behind finishing a transcript):

> **"Eigenes Telefonmenü testen lassen: kostenloses Erstgespräch"** → links to `/leistungen/ki-telefonassistent/`

Secondary, lower-emphasis link near the top of the tool:

> "Zum vollständigen Artikel mit der Sechs-Fragen-Checkliste: Artikel lesen" → links to the article's own URL (the academy spoke page for `ai-phone-assistant-vs-ivr-caller-journey`).

No countdown, no fake urgency, no "before it's too late" language. The CTA text and destination stay identical regardless of which scenario is showing — including the one where the IVR path wins.

## 12. Disclaimer

Include a short, visible note near the scenario picker:

> "Alle drei Anrufe in diesem Werkzeug sind konstruierte Beispiele typischer Abläufe — keine Mitschnitte oder Transkripte eines echten Anrufs, weder von Weissmann noch von einem anderen Anbieter. Zeiten und Zugzahlen zeigen ein realistisches Muster, kein gemessenes Ergebnis eines bestimmten Systems."

This prevents the tool from being mistaken for a real call recording or a benchmark of any specific vendor's actual performance, and makes clear that the third scenario's IVR-favourable result is an honest illustration, not a concession dressed up as data.

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`):
- Background: `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text: `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) used sparingly — only for the "Korrekturen" count when it is greater than zero, always paired with the number and word, never as a large fill or the only signal. The two path labels ("Telefonmenü" / "KI-Telefonassistent") are both `--ink` (near-black); this is a comparison, not a good/bad simulator, so neither side gets a "winner" colour treatment even in the scenario where one path clearly outperforms the other.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- Transcript turns rendered as simple labelled rows (speaker in small caps, elapsed time in a monospace tabular figure, line in regular text), not chat-bubble graphics — an annotated call log on paper, not a messaging-app mockup.
- Comparison bar: a plain four-column (desktop) / two-row (mobile) stat strip, thin 1px borders (`--line: #e5e5e2`), no bar charts or gauges — this is a counted fact, not a data visualisation.
- Typography: `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the active transcript panel.
- Overall feel: a stopwatch held over an annotated transcript — calm, editorial, precise — not a game and not a sales-y "vs." battle graphic.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) called "Anruf-Simulator: Telefonmenü gegen
KI-Telefonassistent" (Split-Screen IVR vs Conversational Call Simulator).
It is a German-language (de-CH) interactive tool for Swiss businesses
comparing how a classic IVR phone menu and a conversational AI phone
assistant each handle the exact same caller request — not a calculator,
not a lead-generation quiz.

CONTEXT
The companion article's method: measure every call on three numbers —
Züge (the distinct actions the caller must take: a keypress or a spoken
turn), Zeit (elapsed seconds to resolution), and Korrekturen (how many
times the caller had to redo or clarify something). The article walks
through two example calls this way and concludes that IVR is not
"outdated," it simply pushes classification work onto the caller one turn
at a time, while a conversational assistant absorbs that work itself —
except in situations that are already a single, unambiguous binary
decision or happen in acoustically difficult conditions, where a plain
keypress can still beat speech recognition. This tool must demonstrate
BOTH sides honestly: two scenarios where the AI path is clearly faster
with fewer turns, and one scenario where the IVR path is clearly faster
with fewer turns — do not skew the third scenario's numbers to make AI
win anyway.

SCENARIOS (3, user picks exactly one at a time, no default selected)

1. termin-verschieben-vertippte-kundennummer — "Termin verschieben,
   vertippte Kundennummer" (Autowerkstatt). Caller wants to move
   tomorrow's 10:00 oil-change appointment to 15:00 and mistypes their
   six-digit customer number.

   IVR PATH (7 turns, 88 seconds total, 1 correction, outcome "erledigt,
   aber ohne Bestätigung"):
   0:00 Ansage: "Für Terminvereinbarung drücken Sie die 1, für
   Terminänderung die 2, für den Pannendienst die 3, für alle übrigen
   Anliegen die 0."
   0:12 Anrufer (Zug 1): presses 2.
   0:13 Ansage: "Bitte geben Sie Ihre sechsstellige Kundennummer ein,
   gefolgt von der Rautetaste."
   0:18 Anrufer (Zug 2): types the number, transposes two digits.
   0:26 Ansage (Korrektur): "Diese Kundennummer ist uns nicht bekannt.
   Bitte versuchen Sie es erneut." — no fuzzy match offered.
   0:33 Anrufer (Zug 3, Korrektur): types the number again, correctly.
   0:43 Ansage: "Ihr nächster Termin: Donnerstag, 10:00 Uhr, Ölwechsel.
   Zum Verschieben die 1, zum Stornieren die 2."
   0:53 Anrufer (Zug 4): presses 1.
   0:53 Ansage: "Bitte geben Sie das neue Datum ein, vierstellig, Tag und
   Monat."
   0:59 Anrufer (Zug 5): enters the date.
   1:05 Ansage: "Bitte geben Sie die gewünschte Uhrzeit ein, vierstellig,
   zum Beispiel 1400 für 14 Uhr."
   1:11 Anrufer (Zug 6): enters "1500".
   1:15 Ansage: "Donnerstag, 15:00 Uhr. Zur Bestätigung die 1."
   1:23 Anrufer (Zug 7): presses 1.
   1:23 Ansage: "Ihr Termin wurde verschoben. Auf Wiederhören." — no SMS
   or email confirmation exists in this menu.

   AI PATH (4 turns, 34 seconds total, 0 corrections, outcome "erledigt
   mit SMS-Bestätigung"):
   0:00 Assistent: "Guten Tag, hier spricht der digitale Assistent der
   Autowerkstatt. Wie kann ich Ihnen helfen?"
   0:03 Anrufer (Zug 1): "Guten Tag, ich habe am Donnerstag einen Termin
   um zehn Uhr für den Ölwechsel, den möchte ich auf drei Uhr nachmittags
   verschieben. Meine Kundennummer ist glaub 118429 – oder 114829, ich
   bin mir grad nicht ganz sicher."
   0:12 Assistent: "Kein Problem. Unter 114829 finde ich einen Termin auf
   Ihren Namen, Donnerstag 10:00 Uhr, Ölwechsel – meinen Sie diesen?" —
   resolves the uncertain number to its most likely match instead of
   rejecting it.
   0:18 Anrufer (Zug 2): "Ja, genau der."
   0:20 Assistent: "Ich verschiebe ihn auf Donnerstag, 15:00 Uhr. Passt
   das für Sie?"
   0:24 Anrufer (Zug 3): "Perfekt, danke."
   0:26 Assistent: "Erledigt. Sie erhalten in Kürze eine SMS-Bestätigung.
   Sonst noch etwas?"
   0:30 Anrufer (Zug 4): "Nein, das wär's."
   0:32 Assistent: "Gerne, einen schönen Tag noch."

2. rueckgabe-falsches-stichwort — "Rückgabe, falsches Stichwort"
   (Haushaltsgeräte-Fachgeschäft). An older caller with a hearing aid
   bought a kettle last week, simply doesn't like it, and knows neither
   the word "Widerruf" nor the shop's internal category logic.

   IVR PATH (4 turns, 71 seconds total, 2 corrections, outcome "nur in
   Warteschlange, nichts gelöst"):
   0:00 Ansage: "Für Reklamationen zu einer bestehenden Bestellung die 1,
   für Rückgaben und Widerruf die 2, für Ersatzteile die 3, für alle
   übrigen Anfragen die 0."
   0:14 Anrufer (Zug 1): presses 1 ("Reklamation") — the wrong branch;
   she hesitates and picks the word mentioned first because it sounds
   vaguely related.
   0:20 Ansage: "Bitte nennen Sie die Bestellnummer, gefolgt von der
   Rautetaste." — she doesn't have it at hand.
   0:25 Anrufer (Zug 2, Korrektur): presses 0, hoping to reach a person.
   0:28 Ansage (Korrektur): "Sie haben keine gültige Eingabe gemacht. Ich
   verbinde Sie zurück zum Hauptmenü." — full menu replays from the top.
   0:34 Ansage replays in full: "Für Reklamationen die 1, für Rückgaben
   und Widerruf die 2, für Ersatzteile die 3, für alle übrigen Anfragen
   die 0."
   0:48 Anrufer (Zug 3): presses 2 ("Rückgabe und Widerruf") this time.
   0:50 Ansage: "Für einen Widerruf innerhalb der 14-tägigen Frist die 1,
   für eine Rückgabe aus anderem Grund die 2." — she doesn't know the
   legal distinction and guesses.
   0:59 Anrufer (Zug 4): presses 2.
   1:01 Ansage: "Bitte bleiben Sie in der Leitung, alle Mitarbeitenden
   sind derzeit besetzt. Ihre geschätzte Wartezeit beträgt sieben
   Minuten." — after over a minute of menu navigation, nothing is
   actually resolved yet, only correctly filed into a queue.

   AI PATH (4 turns, 40 seconds total, 0 corrections, outcome "Rückgabe
   angelegt, ohne Warteschlange"):
   0:00 Assistent: "Guten Tag, hier ist der digitale Assistent. Wie kann
   ich helfen?"
   0:03 Anrufer (Zug 1): "Ich habe letzte Woche einen Wasserkocher
   gekauft, und der gefällt mir einfach nicht, ich möchte ihn
   zurückgeben."
   0:08 Assistent: "Das ist kein Problem, ein freiwilliger Umtausch ohne
   Mangel. Haben Sie die Bestellnummer zur Hand, oder darf ich mit Namen
   und ungefährem Kaufdatum suchen?" — understands "Rückgabe" from the
   whole sentence; she never used that word herself.
   0:14 Anrufer (Zug 2): "Die Nummer hab ich nicht griffbereit, aber ich
   heisse Ruth Bieri, letzten Donnerstag gekauft."
   0:18 Assistent: "Gefunden – ein Wasserkocher, gekauft am Donnerstag in
   der Filiale Bern. Ich lege eine Rückgabe an, Sie haben 14 Tage Zeit,
   das Gerät zurückzubringen. Möchten Sie es vorbeibringen oder abholen
   lassen?"
   0:26 Anrufer (Zug 3): "Vorbeibringen, das schaffe ich noch diese
   Woche."
   0:29 Assistent: "Perfekt. Da ich keine SMS-fähige Nummer von Ihnen
   habe, schicke ich Ihnen die Rückgabenummer per Post. Sonst noch
   etwas?"
   0:35 Anrufer (Zug 4): "Nein, das reicht, danke vielmal."
   0:38 Assistent: "Gern geschehen, alles Gute."

3. notdienst-laute-umgebung — "Notdienst-Anruf aus lauter Umgebung"
   (Sanitär-Pikettdienst). THIS SCENARIO MUST SHOW THE IVR PATH WINNING
   — fewer turns, less time, no corrections. Do not alter this to favour
   the AI path. Weekend burst-pipe emergency, caller is on a hands-free
   car kit with engine and wind noise.

   IVR PATH (1 turn, 12 seconds total, 0 corrections, outcome "sofort mit
   Pikettdienst verbunden"):
   0:00 Ansage: "Sanitär-Service. Für einen Notfall ausserhalb der
   Geschäftszeiten sofort die 1, für alle anderen Anliegen die 2." — only
   two options, one sentence.
   0:08 Anrufer (Zug 1): presses 1 — a keypress is unaffected by
   background noise.
   0:09 Ansage: "Sie werden direkt mit dem Pikettdienst verbunden."

   AI PATH (2 turns, 25 seconds total, 1 correction, outcome "mit
   Pikettdienst verbunden, aber langsamer"):
   0:00 Assistent: "Guten Tag, hier ist der digitale Assistent des
   Sanitär-Notdiensts. Wie kann ich helfen?"
   0:03 Anrufer (Zug 1): "(Motorengeräusch, Wind) Ja hallo, ich hab hier
   en Rohrbruch im Keller, 's Wasser lauft, ich chas nid stoppe—" —
   speech recognition only catches fragments due to noise and the
   hands-free mic.
   0:09 Assistent (Korrektur): "Ich habe akustisch nur Teile verstanden —
   ging es um einen Rohrbruch mit auslaufendem Wasser?" — a clarifying
   question triggered by low recognition confidence, not by any mistake
   the caller made.
   0:14 Anrufer (Zug 2): "Ja genau, Rohrbruch, dringend!"
   0:17 Assistent: "Verstanden, das ist ein Notfall. Ich verbinde Sie
   direkt mit dem Pikettdienst, bleiben Sie dran."

For every step, use EXACTLY this dialogue (light UI-label rewording is
fine; do not invent new dialogue or change any timing, turn count, or
correction count). Do not fabricate or imply that any scenario shows a
real recorded call from Weissmann or any named competitor.

UI / INTERACTION
- Scenario picker: 3 cards/tabs, none selected by default. Selecting one
  loads both its IVR and AI transcripts plus their summary stats (turns,
  seconds formatted m:ss, corrections, outcome).
- Layout: both transcripts side by side on desktop; on narrow widths
  (<640px) only one shows at a time with a small sticky "Telefonmenü" /
  "KI-Telefonassistent" toggle above the transcript.
- Optional "Schritt für Schritt" toggle (off by default). Off: show the
  full transcript and final stat bar immediately. On: reveal turns one at
  a time per path via independent "Weiter" buttons (the two paths do NOT
  have to stay in sync with each other); a live counter above each
  transcript updates as turns are revealed — increment the turn counter
  only on steps with a caller turn, jump the time to that step's
  timestamp, and increment the correction counter only on steps flagged
  as a correction. When a path's last turn is reached, replace its
  "Weiter" button with "Von vorn beginnen".
- Comparison bar beneath both transcripts once fully revealed (or
  immediately in non-step mode): four stats per path — Züge, Zeit,
  Korrekturen, Ergebnis — displayed as plain neutral text, NOT colour- or
  icon-coded as good/bad, not even for scenario 3 where the numbers
  happen to favour the IVR path.
- Do not compute or display any single combined "winner" across the three
  scenarios; each scenario's comparison stands alone.

DISCLAIMER (always visible near the scenario picker, not collapsible
away)
"Alle drei Anrufe in diesem Werkzeug sind konstruierte Beispiele
typischer Abläufe — keine Mitschnitte oder Transkripte eines echten
Anrufs, weder von Weissmann noch von einem anderen Anbieter. Zeiten und
Zugzahlen zeigen ein realistisches Muster, kein gemessenes Ergebnis eines
bestimmten Systems."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs. No input field of any kind asks for a real name,
number, or caller detail — the tool only displays fixed example dialogue.

CTA
Primary button, always visible below the scenario area (not gated behind
any interaction):
  Label: "Eigenes Telefonmenü testen lassen: kostenloses Erstgespräch"
  Link: https://www.weissmann.ai/leistungen/ki-telefonassistent/
Secondary lower-emphasis link near the top: "Zum vollständigen Artikel mit
der Sechs-Fragen-Checkliste: Artikel lesen" (link to the article page).
Do not use countdowns, fake urgency, or "before it's too late" phrasing.
Keep the CTA identical across all three scenarios, including the one
where IVR wins.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a stopwatch
held over an annotated transcript, not a game or a sales battle graphic):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for a non-zero "Korrekturen"
    count, always paired with the number and word, never as a large fill.
  Both path labels use near-black (#111111) — this is a comparison tool,
    not a good/bad simulator, so no "winner" colour treatment on either
    side even in scenario 3.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the active transcript panel:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  Transcript turns as simple labelled rows: speaker in small caps, elapsed
    time in a monospace tabular figure, line in regular text — not chat
    bubbles.
  Comparison bar: plain four-column (desktop) / two-row (mobile) stat
    strip, no bar charts, gauges or progress rings — these are counted
    facts, not a data visualisation.

ACCESSIBILITY
Full keyboard operability for scenario tabs, path toggle, and step
buttons; visible focus states; aria-live="polite" region for step reveals
and live counter updates; 4.5:1 minimum contrast; respect
prefers-reduced-motion (turns appear instantly, no slide/fade); each
transcript marked up as a real ordered list, not bare divs.

LANGUAGE
All UI copy in German (Swiss spelling: "ss", not "ß"). Do not add English,
Italian or French translations — this tool exists only in German.

Do not fabricate or imply that any scenario shows a real recorded call
from Weissmann or any named competitor. Every dialogue line must read
clearly as a constructed illustration of a typical interaction pattern.
```
