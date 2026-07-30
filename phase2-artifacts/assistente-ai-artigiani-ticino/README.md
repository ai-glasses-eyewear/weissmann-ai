# Pilot 53 — Costruttore di copione pre-sopralluogo per artigiani (IT)

Production-ready source for Phase-2 Artifact #53. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `assistente-ai-artigiani-ticino` (assistente-ai-artigiani-ticino) |
| Language | Italian (it) |
| Article URL | https://weissmann.ai/it/ai-academy/agenti-automazione/assistente-ai-artigiani-ticino/ |
| Artifact title | Costruttore di copione pre-sopralluogo per artigiani |
| Interaction type | **Per-trade dispatch-qualification script builder (IT): pick idraulico / elettricista / installatore risc.-clima / ditta di ristrutturazione, toggle and reorder the article's six pre-sopralluogo questions, add optional zona, richiamata time, an agreed indicative price band and a same-person-on-phone profile flag, and generate a copy-able qualification script with per-trade urgency signal and photo-fallback closed questions.** |
| Private Claude URL | https://claude.ai/code/artifact/61c68ca6-73d5-4aab-8fe9-d826f58a04b6 |
| **Public URL** | **NOT YET PUBLIC** — manual owner Share required |
| Publication status | **PRIVATE** ("Share, private") |
| Service CTA | https://weissmann.ai/it/servizi/assistente-telefonico-ai/ |

Every question, rationale and caveat is drawn from the article JSON: the six categories (zona/comune, tipo di lavoro, urgenza, foto/video, accesso, fascia oraria) from 'Le sei domande'; per-trade urgency signals verbatim-ish from 'Copione buono/cattivo' and 'caos operativo' (idraulico: l'acqua ancora esce/si è fermata; elettricista: odore di bruciato/scintille/interruzione totale; installatore: fermato del tutto vs difetto + perdita, foto della targhetta + video del rumore/perdita; ristrutturazione: chi consegna chiavi/codice, cantiere aperto o da coordinare, urgenza reordered last per FAQ). Photo-fallback closed questions anchored on the article's 'acqua che scorre / spia accesa' example. Preventivo block reflects the 'gestire le aspettative' section: fascia indicativa only if the business supplied one (user input, never invented), otherwise honest 'dipende da quello che il tecnico trova sul posto'. Caveats list mirrors 'Cosa può ancora andare storto'. Escalation/hand-off note and 'zona ricompare in comuni diversi' from the article. Pricing: only the CHF 350 one-time trial figure from pricing.ts + the article CTA is used; no other prices imported.

**Honesty caveats preserved:** Kept the article's own guardrails: no fixed price on the phone (only an optional indicative band the user must supply); 'verifichiamo e vi richiamiamo' instead of guessing on borderline zone; a copione is only worth the escalation behind it; hand off to a person for dialect / mixed IT-DE terms; for solo artisans and project-based renovation firms the tool is explicitly less useful (same-person flag note + reordered/de-emphasized urgency). Disclaimer states it is orientation, not advice or a quote, questions must be adapted and verified by the user, and nothing is stored or sent (in-browser only, placeholders like [la vostra impresa]).

No invented claims, statistics or results; no personal-data collection; nothing stored (in-memory only); no external calls. Theme-aware, responsive, accessible.
