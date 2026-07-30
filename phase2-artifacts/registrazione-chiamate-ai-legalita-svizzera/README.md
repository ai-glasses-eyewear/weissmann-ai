# Pilot 37 — Registrare le telefonate AI: albero decisionale (IT)

Production-ready source for Phase-2 Artifact #37. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `registrazione-chiamate-ai-legalita-svizzera` (registrazione-chiamate-ai-legalita-svizzera) |
| Language | Italian (it) |
| Article URL | https://weissmann.ai/it/ai-academy/agenti-automazione/registrazione-chiamate-ai-legalita-svizzera/ |
| Artifact title | Registrare le telefonate AI: albero decisionale · Weissmann |
| Interaction type | **Recording-legality decision tree (IT): call attributes (who + call content + intended purpose) branch to a colour-coded verdict with the exact StGB/CP citation, plus an in-page consent-announcement builder for the consent-required leaves.** |
| Private Claude URL | https://claude.ai/code/artifact/398345d2-3dcb-484a-8dfc-c708d64b012f |
| **Public URL** | **NOT YET PUBLIC** — manual owner Share required |
| Publication status | **PRIVATE** ("Share, private") |
| Service CTA | https://weissmann.ai/it/servizi/assistente-telefonico-ai/ |

Every branch, verdict, citation and note is taken directly from the article JSON: base rule art. 179bis/179ter CP (crime, querela di parte, penalties up to 1 year / up to 3 years, judge may order destruction of the recording and seizure of devices); the exception art. 179quinquies CP (in force since March 2004) for orders/mandates/reservations/analogous operations, proof-purpose only; the six Ticino examples mapped to the tree leaves (hotel reservation = green, restaurant reservation = green, quote request = yellow/dubbio, complaint = red, employee call = caso a parte, medical appointment = red with nLPD health-data note); the 'registrare non è conservare' distinction (penal vs nLPD) as the purpose branch; and the 'avviso che funziona' three-part notice with the article's weak vs better examples as the consent-announcement builder. No pricing figure was used — the article is about legality, not price, so injecting a CHF figure would be off-topic; pricing.ts was read only to confirm the phone-assistant product identity behind the service link. No statistics, tool names, or legal claims beyond the article were invented.

**Honesty caveats preserved:** Preserves the article's core disclaimer 'Non è consulenza legale' verbatim in the lede, in the verdicts, and in the .disc block, plus the article's specific caveats: not a substitute for legal advice in the individual case, especially for labour-law questions or calls whose content is not clearly classifiable; the exception covers only the commercial operation (proof purpose), and changing purpose exits the exception with the same penal consequences; nLPD governs retention after a lawful recording; employee calls need specific legal advice, not analogy. Sources (IFPDT; Codice penale svizzero art. 179bis–179quinquies, Fedlex) are attributed as plain text (not links) to keep exactly two footer anchors. Nothing is stored or sent — all inputs are transient and in-memory; the announcement builder uses [nome azienda] as a placeholder, never captured identity.

No invented claims, statistics or results; no personal-data collection; nothing stored (in-memory only); no external calls. Theme-aware, responsive, accessible.
