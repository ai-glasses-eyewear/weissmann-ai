# Pilot 4 — Welcher KI-Telefonassistent passt zu Ihnen? (DE)

Production-ready source for the fourth Phase-2 Artifact. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `swiss-ai-phone-assistant-provider-comparison` (A-DE-01, flagship, "commercial, high") |
| Language | German (de) |
| Article URL | https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistenten-schweiz-anbieter-vergleich/ |
| Artifact title | Welcher KI-Telefonassistent passt zu Ihnen? · Weissmann |
| Interaction type | **Provider-fit matcher / weighted recommender** (distinct from Pilot 1 calculator, Pilot 2 scorecard, Pilot 3 decision-tree) |
| Documented concept | "Provider-fit matcher — reader answers priority questions, tool surfaces the 1–2 best-fit vendors from the verified 6-provider dataset with the stated reasoning shown" |
| Source file | `index.html` (self-contained: inline CSS + vanilla JS, no external deps, no storage) |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/4e823644-61f3-4749-bd9e-f1dc60ba85aa |
| **Public URL** | **NOT YET PUBLIC** — requires a manual "Share → public" action by the account owner in claude.ai |
| Publication status | **PRIVATE — awaiting manual public share** (page shows "Share, private") |
| Article backlink | "Vollständigen Anbieter-Vergleich lesen →" (the article URL above) |
| Service CTA | "Weissmann KI-Telefonassistent ansehen →" → https://weissmann.ai/leistungen/ki-telefonassistent/ |

## What it does
The reader selects which of five verified criteria matter (public price, concretely-named dialect coverage,
explicit Swiss hosting/data-protection, deep integrations, month-to-month cancelability) plus an optional
context (hospitality-with-PMS / own tech team / small team without IT). The tool ranks the six providers
(Weissmann AI, AlpenAgent, Suisse Voice, NEX-AI, HeyPapaya, Alveni) by fit and shows the best matches **with
the exact reasoning**, alongside a full, scrollable comparison matrix and a source link per provider.

## Factual integrity (the reason this article was chosen carefully)
- **Every fact and every recommendation traces to the published, fact-checked article** — no invented
  claims, prices, statistics or dialect rates. The scoring reproduces the article's own
  "Wann welcher Ansatz passt" mapping.
- **Weissmann is disclosed as publisher *and* provider and does NOT auto-win**: for hospitality-with-PMS,
  Alveni ranks first; on dialect breadth Suisse Voice/Alveni lead; on general integration Suisse
  Voice/HeyPapaya lead. Verified deterministically.
- All data is a **dated snapshot (29.07.2026), self-reported by each vendor**; the tool repeats the
  article's caveats (three vendors publish no price; dialect claims are self-reported, not measured;
  verify the current website; run your own test calls). No personal data collected or transmitted; nothing
  stored (in-memory only).

## Verified matcher behaviour (deterministic)
Priority=price → Weissmann / Suisse Voice / NEX-AI (the transparent-price group; the three no-public-price
vendors score 0). Priority=dialect → Suisse Voice / Alveni. Integration (general) → Suisse Voice / HeyPapaya
(Alveni downgraded — its PMS strength counts only in hospitality). Integration + hospitality context →
Alveni first. Integration + own-tech-team → Suisse Voice first. Price+cancelable + no-IT → Weissmann / NEX-AI.

## To publish publicly (manual, owner action)
Open the private URL while signed in to claude.ai → **Share** → public / "anyone with the link" → copy the
public URL → open it logged-out to confirm → record it in `docs/WEISSMANN_60_ARTIFACT_PUBLICATION_LOG.md`.
