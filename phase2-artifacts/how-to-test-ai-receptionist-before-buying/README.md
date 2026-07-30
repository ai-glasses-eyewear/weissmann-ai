# Pilot 2 — AI Receptionist 25-Call Test Lab (EN)

Production-ready source for the second Phase-2 Artifact. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `how-to-test-ai-receptionist-before-buying` |
| Language | English (en) |
| Article URL | https://weissmann.ai/en/ai-academy/agents-automation/how-to-test-an-ai-receptionist/ |
| Artifact title | AI Receptionist 25-Call Test Lab · Weissmann |
| Interaction type | Interactive testing workspace + scorecard (not a quiz) |
| Source file | `index.html` (self-contained: inline CSS + vanilla JS, no external deps, no storage) |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/237e9cc0-ecbb-493a-a873-ed4de3e4acae |
| **Public URL** | **NOT YET PUBLIC** — requires a manual "Share → public" action by the account owner in claude.ai |
| Publication status | **PRIVATE — awaiting manual public share** (page shows "Share, private") |
| Article backlink | "Read the complete 25-call testing guide →" (the working slug URL above) |
| Service CTA | "Explore Weissmann AI phone assistants →" → https://weissmann.ai/en/services/ai-phone-assistant/ |

> Note: the article URL uses the production **slug** `how-to-test-an-ai-receptionist` (HTTP 200). The
> id-based path `how-to-test-ai-receptionist-before-buying` returns 404 and must not be used as a link.

## What it does
Pick a business type (restaurant, hotel, medical/therapy, beauty/wellness, property management, trades,
professional services, other) — the wording of the 25 tests adapts (booking term, emergency example).
Score each of the 25 calls (Not tested / Pass / Partial / Fail / N/A), flag critical failures, add notes,
and read a live readiness result: overall + six category scores (comprehension, task completion, handover,
safety, language, reliability), failed tests, critical red flags, tests still to complete, 12 provider
questions, human-review issues, and a recommended next action. Copyable/print-friendly summary + reset.

## Safety & honesty (built in)
States clearly that it does not place calls, does not test any provider automatically, results come only
from the user's scoring, gives no medical/emergency advice, and an AI receptionist must never replace
emergency services (144 / 117 / 118). Integrations must be verified with the provider; the score is a
decision aid, not a certification. No personal data collected or transmitted; nothing stored (in-memory
only). No fake results, testimonials, benchmarks or unverified Weissmann capabilities.

## Verified gating (deterministic tests)
- Scenario A (mostly passed, no critical) → **Ready** (or Conditional by score).
- Scenario B (high score but the emergency-boundary test fails) → **Not ready** (hard safety block).
- Scenario C (few tests scored) → **More testing required**.
- Any critical red flag caps the result at **Conditional** (or Not ready); a safety/emergency-critical
  failure forces **Not ready** — "Ready" is impossible while any critical safety/emergency test fails.

## To publish publicly (manual, owner action)
Open the private URL while signed in to claude.ai → **Share** → public / "anyone with the link" → copy the
public URL → open it logged-out to confirm → record it in `docs/WEISSMANN_60_ARTIFACT_PUBLICATION_LOG.md`.
