# Pilot 5 — Dialekt-Testprotokoll-Generator (DE)

Production-ready source for the fifth Phase-2 Artifact. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `swiss-dialect-comprehension-test` (A-DE-02, "informational, medium-high") |
| Language | German (de) |
| Article URL | https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-schweizerdeutsch-test/ |
| Artifact title | Dialekt-Testprotokoll-Generator für KI-Telefonassistenten · Weissmann |
| Interaction type | **Generator / builder** — inputs → a tailored, printable/copyable test protocol (5th distinct model, vs. calculator / scorecard / decision-tree / matcher) |
| Documented concept | "Self-test script generator — produces a printable 10-call dialect test protocol tailored to the reader's own region" |
| Source file | `index.html` (self-contained: inline CSS + vanilla JS, no external deps, no storage) |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/fa03864c-0a40-4d17-9823-fb8037491d1d |
| **Public URL** | **NOT YET PUBLIC** — requires a manual "Share → public" action by the account owner in claude.ai |
| Publication status | **PRIVATE — awaiting manual public share** (page shows "Share, private") |
| Article backlink | "Ganzen Dialekt-Artikel lesen →" (article URL above) |
| Service CTA | "Weissmann KI-Telefonassistent testen →" → https://weissmann.ai/leistungen/ki-telefonassistent/ |

## What it does (complements the article — does not copy it)
The article *explains why* "understanding Swiss German" is really several separately-testable abilities.
This Artifact *generates the plan*: the reader selects which dialect regions actually call them
(Zürichdeutsch / Berndeutsch / Baseldeutsch / Zentralschweizer Mundart), their business type, and optional
dimensions (names & addresses, code-switching, background noise, clean-exit-on-uncertainty). It builds a
tailored, numbered test protocol (~4–12 calls) — each call gives a concrete task (a Terminanfrage or offene
Frage tailored to the business, with a regional dialect hint word and a mid-sentence correction), what to
check against the four understanding stages, and a 0–3 score field. Copy or print the protocol; reset any
time. Scales to "rund ein Dutzend Testanrufe" when all regions + dimensions are selected.

## Honesty & safety (built in)
- States clearly it **places no calls** and tests nothing automatically — the reader makes the calls, with
  real dialect speakers at normal tempo. The dialect *wording* is left to the speaker (only the scenario +
  a typical dialect hint word + what to check are given) — so nothing puts invented dialect sentences in a
  speaker's mouth.
- Repeats the article's real distinctions (understand ≠ speak back; four understanding stages; the 0–3
  scale: 0 Ausfall / 1 Stille Fehlleistung / 2 Ehrliche Unsicherheit / 3 Korrekt) and testing pitfalls.
- No invented statistics, no performance claims, no success guarantee. No personal data collected or
  transmitted; nothing stored (in-memory only). Dialect hint words (Zmorge, Ändlie, Drämmli, Merci vilmal,
  Swiss surnames) and the CHF 350 one-time trial framing are taken from the published article.

## Verified generator behaviour (deterministic)
1 region (default) + names + exit → 4 calls · 2 regions + names + exit → 6 · all 4 regions + names +
code-switching + noise + exit → 12 · 3 regions + names + code + exit → 9.

## To publish publicly (manual, owner action)
Open the private URL while signed in to claude.ai → **Share** → public / "anyone with the link" → copy the
public URL → open it logged-out to confirm → record it in `docs/WEISSMANN_60_ARTIFACT_PUBLICATION_LOG.md`.
