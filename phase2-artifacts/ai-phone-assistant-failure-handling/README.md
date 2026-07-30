# Pilot 19 — Fehlermodus-Simulator: KI-Telefonassistent (DE)

Production-ready source for Phase-2 Artifact #19. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `ai-phone-assistant-failure-handling` (ai-phone-assistant-failure-handling) |
| Language | German (de) |
| Article URL | https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-versteht-nicht/ |
| Artifact title | Fehlermodus-Simulator: KI-Telefonassistent · Weissmann |
| Interaction type | **Failure-mode scenario stepper with good/bad escalation contrast (DE) plus generated test-call checklist** |
| Private Claude URL | https://claude.ai/code/artifact/9c483828-d90e-4040-b657-815356541eee |
| **Public URL** | **NOT YET PUBLIC** — manual owner Share required |
| Publication status | **PRIVATE** ("Share, private") |
| Service CTA | https://weissmann.ai/leistungen/ki-telefonassistent/ |

Every string is drawn from the article JSON (ai-phone-assistant-failure-handling.json). The five scenarios (falsch verstandener Name, Hintergrundgeraeusche, Frage ausserhalb des Wissens, veraergerte Anrufende, Stille/Verbindungsabbruch) come from the 'Fuenf Wege, wie ein Anruf kippt' bullets. The four-stage escalation ladder (Konfidenzschwelle, gezielte Rueckfrage, Wiederholung mit Umformulierung, warme menschliche Uebergabe) comes verbatim from 'Das Eskalationsgeruest'. The noise and angry-caller contrast cards reproduce the article's two verbatim dialogue examples ('Gute und schlechte Wiederherstellung'). Bad-path consequences come from 'Warnsignale' and 'Was kann schiefgehen'. The confidence-threshold segmented control uses the article's own 'zu niedrig / ausgewogen / zu hoch' descriptions. Per-scenario stage highlighting reflects the article's distinctions (e.g. Abdeckungsproblem vs Verstaendnisproblem; silence as 'ein eigener Fall'). The test-call checklist is grounded in the article's explicit framing of the five scenarios as a 'Drehbuch fuer einen eigenen Testanruf'. The single pricing figure (CHF 350 einmaliger Starter-Test, kein Abo) matches pricing.ts phone-starter-trial and the article CTA. No numbers, tools, or claims were invented.

**Honesty caveats preserved:** Preserves the article's caveat that the four-stage framework is 'allgemeine gute Praxis fuer Sprachassistenten, keine dokumentierte Weissmann-Spezifikation' (repeated in the .disc disclaimer). Frames the tool as orientation, not advice or a quote. States that nothing is stored or sent and that input stays in the browser. Keeps the article's point that the key metric is the Wiederherstellungsquote, not the Fehlerquote (which 'wird nie null sein'). Silence scenario is honestly marked as sitting outside the four-stage ladder. No fabricated dialogue: descriptive text is used where the article gives no verbatim quote; guillemet quotes appear only where the article supplies them verbatim.

No invented claims, statistics or results; no personal-data collection; nothing stored (in-memory only); no external calls. Theme-aware, responsive, accessible.
