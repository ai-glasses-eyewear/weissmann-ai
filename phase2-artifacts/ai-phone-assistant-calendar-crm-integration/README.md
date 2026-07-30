# Pilot 18 — Integrations-Machbarkeits-Check (DE)

Production-ready source for Phase-2 Artifact #18. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `ai-phone-assistant-calendar-crm-integration` (api-gated-feasibility-router) |
| Language | German (de) |
| Article URL | https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-kalender-crm-integration/ |
| Artifact title | Integrations-Machbarkeits-Check · Weissmann |
| Interaction type | **Integration-feasibility checker (DE) — API-gated feasibility router: user names their system type + concrete product, answers the pivotal question (open documented API?), and is routed to one of the article's paths.** |
| Private Claude URL | https://claude.ai/code/artifact/3f0cbff8-5f03-4fcf-aa7b-7f7d67354957 |
| **Public URL** | **NOT YET PUBLIC** — manual owner Share required |
| Publication status | **PRIVATE** ("Share, private") |
| Service CTA | https://weissmann.ai/leistungen/ki-telefonassistent/ |

Every branch is drawn verbatim in substance from the article JSON. The pivotal gate = 'Hat das Zielsystem eine offene, dokumentierte API?'. API=yes routes across the article's four connection types (Native Integration / Direkte API-Anbindung / Webhook / Middleware-iPaaS Zapier·Make·n8n) with the article's own reasoning (OAuth authorization, ongoing maintenance because Microsoft/Google change APIs, Webhook push-vs-poll, middleware = extra contract/abo/failure-point + third-party server data-flow). API=no routes across the article's fallbacks (Browser-Automation/RPA störanfällig + stored full-access credentials, notify-only manual fallback, ask the software vendor about unadvertised partner APIs, wait-or-switch) plus the 'Wann lohnt sich der Aufwand nicht' logic (planned switch, sensitive data, very low call volume). API=unknown returns the article's find-out method (search vendor site for API/Entwickler/Developer/Integrationen; ask support; partner-only APIs exist). Risk lists come from 'Was kann schiefgehen'; provider questions come verbatim from the article's question list. Pricing note uses only pricing.ts figures relevant to this service: full system integration = Premium CHF 590/month, 12-month minimum term; NOT part of Starter CHF 350/month (runs without system integrations). No invented statistics, vendor names, or legal claims.

**Honesty caveats preserved:** Preserved the article's caveats: 'keine Rechtsberatung' (surfaced on middleware data-protection and in the disclaimer); 'Geld löst das Problem einer fehlenden Schnittstelle nicht'; no specific undocumented product integrations named; concrete feasibility is honestly checked in the free initial consultation before commitment; a manual fallback is often the honest solution. Disclaimer states orientation not a binding quote and not legal advice, and that all inputs stay local in the browser — nothing stored or sent (no storage/network APIs used). Product-name input is optional, transient, and local; no personal data collected.

No invented claims, statistics or results; no personal-data collection; nothing stored (in-memory only); no external calls. Theme-aware, responsive, accessible.
