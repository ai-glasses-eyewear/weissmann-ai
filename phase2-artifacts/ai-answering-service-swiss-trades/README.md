# Pilot 13 — Call Qualification Script Builder for Trades (EN)

Production-ready source for the 13th Phase-2 Artifact. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `ai-answering-service-swiss-trades` (A-EN-05) |
| Language | English (en) |
| Article URL | https://weissmann.ai/en/ai-academy/agents-automation/ai-answering-service-swiss-trades/ |
| Artifact title | Call Qualification Script Builder for Trades · Weissmann |
| Interaction type | **Per-trade script composer** (pick trade → tailored 6-question script + copy-to-clipboard) — a new model |
| Private Claude URL | https://claude.ai/code/artifact/1a5e0f82-9eea-4f9d-a306-8fe80c660782 |
| **Public URL** | **NOT YET PUBLIC** — manual owner Share required |
| Publication status | **PRIVATE** ("Share, private") |
| Article backlink | "Read the full guide →" |
| Service CTA | "Explore Weissmann AI phone assistant →" → weissmann.ai/en/services/ai-phone-assistant/ |

Pick a trade (plumber / electrician / heating-gas / locksmith / general) → the article's six qualification
questions assemble in order — (1) service area/postcode first, (2) the job in their own words mapped to
trade-specific categories, (3) **the urgency question**, one specific yes/no worded for that trade, (4) a photo
by text, (5) access, (6) a realistic window checked against capacity — each with a "say this" line and a "why."
Then the honest price-expectation line ("can't give a fixed price over the phone"). A **Copy script as text**
button exports a plain-text version (clipboard API + execCommand fallback; nothing sent anywhere). Three
"is this even right for you?" toggles surface the guide's honest **not-the-right-fix** cases (sole trader who
never misses a call, mostly-scheduled contract work, can't act on an urgent flag in time). The plumber and
electrician urgency questions are verbatim to the guide; the others follow the same principle and are flagged
as examples to confirm with the tradesperson. No invented claims, no personal data, nothing stored.
