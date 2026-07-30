# Pilot 29 — Fallback-Readiness Self-Audit (EN)

Production-ready source for Phase-2 Artifact #29. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `ai-receptionist-reliability-outage-fallback` (ai-receptionist-outage-fallback) |
| Language | English (en) |
| Article URL | https://weissmann.ai/en/ai-academy/agents-automation/ai-receptionist-outage-fallback/ |
| Artifact title | Fallback-Readiness Self-Audit · Weissmann |
| Interaction type | **Per-failure-point fallback-readiness self-audit** |
| Private Claude URL | https://claude.ai/code/artifact/b8f7cdfd-4588-4377-b7a6-4c253ee2cb50 |
| **Public URL** | **NOT YET PUBLIC** — manual owner Share required |
| Publication status | **PRIVATE** ("Share, private") |
| Service CTA | https://weissmann.ai/en/services/ai-phone-assistant/ |

Every audit item, description, and status message is drawn only from the article JSON. The three failure points are the article's three dependencies (caller's own connection; calendar/booking system queried mid-call; vendor's own platform). Per-point checklist items come from the article's 'well designed' scenario behaviours and the 'What a Resilient Fallback Chain Actually Looks Like' layers: change-approach-on-low-confidence / early handover / label-uncertain-as-unverified (Scenario Two + capture-and-defer); defined timeout with a number, tell-caller-plainly, capture-and-defer, immediate internal alert (Scenario One + resilient chain); carrier-level independent backup destination, tested backup, monitoring notices call-volume drop, named on-call owner (Scenario Three + resilient chain + silent-failure section). The 'fail open on the channel / fail closed on the action' framing and the 'chain only as resilient as its weakest link' synthesis are the article's own. The call-volume profile toggle ('a handful of calls a week' vs higher volume) and treating monitoring/named-owner as 'scales with volume' come verbatim from 'When This Is Not Worth Engineering Around'. Copyable vendor questions are the article's five 'Ask Any Vendor These Questions Before You Sign' items plus the bad-connection FAQ. Pricing: only the article CTA figure is used - CHF 350 one-time trial ('Stress-test the assistant's fallback behaviour yourself'), confirmed against pricing.ts phone-starter-trial. No statistics, uptime numbers, timeout figures, or results were invented.

**Honesty caveats preserved:** Preserves the article's 'Where Weissmann's Own Documentation Stops' disclosure verbatim in intent: Weissmann publishes around-the-clock reachability, capture-and-escalate, and a dedicated line with call forwarding, but does NOT publish a specific uptime %, a documented calendar-timeout figure, or a monitoring/incident process - so ask directly. Keeps 'no vendor, Weissmann included, can promise a line never meets a broken dependency' and 'every dependency will fail eventually'. Disclaimer states orientation not advice/quote, not a reliability guarantee, and that nothing is stored, sent, or saved (in-memory only). No localStorage/sessionStorage/cookies/network; clipboard copy is of the user's own generated text only. Exactly two footer anchors: article first, service (primary) second, both target=_blank rel=noopener noreferrer with 'opens in a new tab' aria-labels.

No invented claims, statistics or results; no personal-data collection; nothing stored (in-memory only); no external calls. Theme-aware, responsive, accessible.
