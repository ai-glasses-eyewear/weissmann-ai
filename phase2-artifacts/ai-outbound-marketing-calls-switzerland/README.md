# Pilot 20 — Listen-Hygiene-Check für KI-Werbeanrufe (DE)

Production-ready source for Phase-2 Artifact #20. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `ai-outbound-marketing-calls-switzerland` (ai-outbound-marketing-calls-switzerland) |
| Language | German (de) |
| Article URL | https://weissmann.ai/ki-academy/agenten-automatisierung/ki-werbeanrufe-schweiz-erlaubt/ |
| Artifact title | Listen-Hygiene-Check für KI-Werbeanrufe · Weissmann |
| Interaction type | **Pre-call list-hygiene checker: the article's 3-question gate applied to a target list → traffic-light verdict, plus a scaling-risk illustration (one list-hygiene error × call volume)** |
| Private Claude URL | https://claude.ai/code/artifact/2df79619-5922-44ed-a47c-ed8032afa936 |
| **Public URL** | **NOT YET PUBLIC** — manual owner Share required |
| Publication status | **PRIVATE** ("Share, private") |
| Service CTA | https://weissmann.ai/leistungen/ki-telefonassistent/ |

Every legal claim, number and category comes from the article JSON only. The 3-question gate is the article's 'Drei-Fragen-Test' (Verzeichnisstatus / Kundenbeziehung / Nachweis) plus its 'kurze Formel'. Verdict logic mirrors the article: normally-listed numbers → Art. 3 Abs. 1 lit. u UWG does not apply → regulär anrufbar; starred/unlisted (incl. unlisted mobiles treated like a Sterneintrag) without a documented current customer relationship → belongs off the list; documented current relationship → exception applies even for starred numbers; loose/old relationship or incomplete origin proof → caution. Legal citations verbatim from the article: Art. 3 Abs. 1 lit. u UWG, Art. 23 UWG (Antragsdelikt, Freiheitsstrafe bis zu drei Jahren oder Geldstrafe, Verfolgung nur auf Antrag), SECO complaint office (can forward to kantonale Strafverfolgung, cannot itself block a number or fine), and Art. 3 Abs. 1 lit. o UWG named only to scope out SMS/email. Scaling illustration uses only the article's own figures — 60–80 manual calls/day, 'mehrere tausend' automated, and 'jede hundertste' (1%) error rate — as editable, user-supplied inputs; the erroneous-call count is pure arithmetic (volume × error%), never an invented statistic. No pricing figure is shown: the article carefully frames Weissmann's phone assistant as inbound, so attaching a price to an outbound cold-call context would mischaracterise the product; pricing.ts was read only to confirm this scoping decision.

**Honesty caveats preserved:** Reproduces the article's own disclaimers: 'keine Rechtsberatung im Einzelfall' and 'das Rechenbeispiel ist eine Veranschaulichung, keine gemessene Grösse'. Preserves that 'Kundenbeziehung' is not conclusively defined in law and that older/looser relationships are less reliable; that a bought/external list without documented origin is no proof in a dispute; that enforcement is complaint-only; and the second (non-legal) mechanism that a synthetic-sounding call gets reported more readily even when lawful. Scope note distinguishes outbound (this tool) from inbound greeting-transparency. 'Grenzen dieses Checks' lists the article's out-of-scope cases (bought lists, cross-border, B2B, SMS/email). Privacy: inputs are transient and in-memory only — nothing stored, sent or evaluated; the only network-free convenience is copying the user's own generated summary to the clipboard.

No invented claims, statistics or results; no personal-data collection; nothing stored (in-memory only); no external calls. Theme-aware, responsive, accessible.
