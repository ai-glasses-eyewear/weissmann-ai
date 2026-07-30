# Weissmann 60 — Public Claude Artifact Publication Log (Phase 2)

Target: 60 public, interactive Claude Artifacts (30 DE / 20 EN / 10 IT), one per approved article.
This task scoped **3 pilots**. Status below is reported honestly against the strict definition of
"completed Artifact" (real · renders in Claude · **published publicly** · public URL · **opens without
auth** · interactive on the public version · visible article link · **anonymously re-verified**).

## Capability finding (blocker)

**Public, no-authentication Artifact publication is not available from this automated session.**

- The Artifact tool available here **creates and publishes** an artifact to a real claude.ai URL, and the
  artifact **renders and works inside Claude** — but it is **private by default**.
- Making an artifact publicly accessible (URL opens without a claude.ai login) is a **manual action only the
  signed-in account owner can perform** via the artifact's **Share** menu. This session cannot flip that
  toggle.
- Evidence: the published artifact's own control reads **"Share, private"**; a cookie-less (anonymous)
  request to the artifact URL returns the **claude.ai application shell, not the tool** (HTTP 200 but no
  artifact content).
- Therefore the strict "completed" criteria #3 (published publicly), #5 (opens without auth) and #8
  (anonymous re-verification) **cannot be satisfied by this session** for any of the 60.

**Update:** in later rounds the owner asked to proceed pilot-by-pilot anyway, publishing each **privately**
for a manual public Share. All **three pilots are now built and privately published** (details below); each
still shows "Share, private" and awaits the owner's manual public share + anonymous verification. No
substitute artifacts or spec directories were created for the remaining 57.

## Pilot 1 — google-ads-kosten-schweiz-kmu (DE)

| Field | Value |
|---|---|
| Article ID | `google-ads-kosten-schweiz-kmu` |
| Language | German (de) |
| Production article URL | https://weissmann.ai/ki-academy/marketing-seo-geo/google-ads-kosten-schweiz-kmu/ |
| Artifact title | Google-Ads-Budgetplaner für Schweizer KMU · Weissmann |
| Interaction type | Calculator / scenario model |
| Source (repo) | `phase2-artifacts/google-ads-kosten-schweiz-kmu/index.html` |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/437a7d7b-0e5c-47de-a79e-70543280d1e6 |
| **Public Claude URL** | **— none yet (manual Share required) —** |
| Renders in Claude | Yes (verified: correct title, served from artifact sandbox `frame.claudeusercontent.com`) |
| Functional test | Passed (formulas/verdicts verified deterministically) |
| Anonymous-access result | **Fail — private** (anonymous request returns claude.ai app shell, not the tool) |
| Mobile test | Source is responsive (single-column ≤860px, no horizontal overflow by design) |
| Article backlink | Present — visible "Vollständigen Leitfaden lesen →" to the DE article |
| Service CTA | Present — restrained "Google Ads Growth ansehen" → weissmann.ai/preise/ |
| Pricing accuracy | CHF 690/mo management + ad-spend-separate; verified vs `src/data/pricing.ts` |
| Remaining issue | **Public sharing** — owner must Share→public, then anonymously verify and record the URL here |
| Public verification (this round) | **Not done — no public URL supplied.** The "Pilot 1 public URL" field in the request was left as the literal placeholder `[PASTE THE PUBLIC URL HERE]`. Re-checked the private URL anonymously: still returns the app shell → **still private**. Public verification is pending a real public URL from the owner. No URL was invented. |

**v2 update (same private URL):** added a prominent visible footer link band below the disclaimer — two real anchor links (`target="_blank" rel="noopener noreferrer"`, accessible aria-labels): "Vollständigen Leitfaden lesen →" (DE article) and "Google Ads Growth von Weissmann ansehen →" (weissmann.ai/preise/). Content corrections: removed the fixed Zürich +25 % CPC factor (now prose caveat only); softened the click-count verdicts (no absolute "enough" claim); renamed the customer-value input to **average contribution margin per acquired customer** (correct break-even basis); flagged **CPC** and **conversion rate** as the two main variables (always-visible note + "Hauptvariable" badges). Republished to the same URL `…/artifact/437a7d7b-0e5c-47de-a79e-70543280d1e6`; still private.

## Pilot 2 — how-to-test-ai-receptionist-before-buying (EN)

| Field | Value |
|---|---|
| Article ID | `how-to-test-ai-receptionist-before-buying` |
| Language | English (en) |
| Production article URL | https://weissmann.ai/en/ai-academy/agents-automation/how-to-test-an-ai-receptionist/ |
| Artifact title | AI Receptionist 25-Call Test Lab · Weissmann |
| Interaction type | Interactive testing workspace + scorecard (business-type-adaptive; not a quiz) |
| Source (repo) | `phase2-artifacts/how-to-test-ai-receptionist-before-buying/index.html` |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/237e9cc0-ecbb-493a-a873-ed4de3e4acae |
| **Public Claude URL** | **— none yet (manual Share required) —** |
| Publication status | **PRIVATE — awaiting manual public share** (page control reads "Share, private") |
| Renders in Claude | Yes (verified: correct title in the artifact view) |
| Functional test | Passed — gating verified deterministically (A→Ready, B[emergency fail]→Not ready, C[few scored]→More testing required; any critical flag caps at Conditional; safety/emergency fail forces Not ready) |
| Mobile test | Responsive by construction (single-column grids, sticky bar wraps, no horizontal overflow) |
| Article backlink | Present — "Read the complete 25-call testing guide →" (working slug URL above) |
| Service CTA | Present — "Explore Weissmann AI phone assistants →" → weissmann.ai/en/services/ai-phone-assistant/ |
| Safety | States it places no calls / tests no provider automatically / gives no medical or emergency advice / never replaces emergency services (144·117·118); decision aid, not a certification; no data stored or transmitted |
| Remaining issue | **Public sharing** — owner must Share→public, then anonymously verify and record the URL here |

> Article-URL note: the production **slug** is `how-to-test-an-ai-receptionist` (HTTP 200). The id-based
> path `how-to-test-ai-receptionist-before-buying` returns 404 and is not used as a link.

## Pilot 3 — sito-web-chf-880-svizzera (IT)

| Field | Value |
|---|---|
| Article ID | `sito-web-chf-880-svizzera` |
| Language | Italian (it) |
| Production article URL | https://weissmann.ai/it/ai-academy/marketing-seo-geo/sito-web-economico-svizzera-chf-880/ |
| Artifact title | Il sito web da CHF 880 è adatto alla tua azienda? · Weissmann |
| Interaction type | Scope diagnostic / decision tree (11 guided questions → one of three verdicts) |
| Source (repo) | `phase2-artifacts/sito-web-chf-880-svizzera/index.html` |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/6b502b88-c844-486b-a049-cbe6b7b4d746 |
| **Public Claude URL** | **— none yet (manual Share required) —** |
| Publication status | **PRIVATE — awaiting manual public share** (page control reads "Share, private") |
| Renders in Claude | Yes (verified: correct title in the artifact view) |
| Functional test | Passed — verdicts verified deterministically (all-fit → Adatto; soft → Possibile riducendo lo scope; shop/booking/CRM/web-app → Meglio un progetto personalizzato + Complesso da 9'900; >8 pages / 3+ languages → Business 4'990; partial → provisional) |
| Mobile test | Responsive by construction (single-column ≤900px, no horizontal overflow) |
| Article backlink | Present — "Leggi la guida completa →" (working slug URL above) |
| Service CTA | Present — "Scopri il servizio siti web di Weissmann →" → weissmann.ai/it/servizi/sviluppo-siti-web-ai/ |
| Pricing accuracy | CHF 880 / regular CHF 2'490 (one-time); Business CHF 4'990; Complex from CHF 9'900 — verified vs `src/data/pricing.ts`. "Premium, non economico"; no invented discount/scarcity |
| Remaining issue | **Public sharing** — owner must Share→public, then anonymously verify and record the URL here |
| Public verification (attempted) | Owner reports Pilot 3 is public. Confirmed: the artifact's own control now reads **"Share, shared with anyone who has the link"** (so it IS shared). **But no public URL was supplied, and it isn't derivable** — the guessable forms `claude.site/artifacts/<id>` and `claude.ai/public/artifacts/<id>` return **"Page not found"** (the public share link uses a different id/URL than the `/code/artifact` owner URL). A cookie-less request to the owner URL still returns the app shell. **Anonymous "opens without login" could not be verified without the actual public link.** No URL was invented. → **Owner: paste the exact public link from the Share dialog's "Copy link".** |

> Article-URL note: the production **slug** is `sito-web-economico-svizzera-chf-880` (HTTP 200). The
> id-based path `sito-web-chf-880-svizzera` returns 404 and is not used as a link.

## Pilot 4 — swiss-ai-phone-assistant-provider-comparison (DE)

Selected as the **highest-priority article without an Artifact** (A-DE-01, the flagship provider comparison, "commercial, high"). The other "high" article, A-DE-09, was skipped because its documented concept is a break-even *calculator* — the same interaction model as Pilot 1 — and the task requires a different model.

| Field | Value |
|---|---|
| Article ID | `swiss-ai-phone-assistant-provider-comparison` |
| Language | German (de) |
| Production article URL | https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistenten-schweiz-anbieter-vergleich/ |
| Artifact title | Welcher KI-Telefonassistent passt zu Ihnen? · Weissmann |
| Interaction type | **Provider-fit matcher / weighted recommender** — 4th distinct model (vs. calculator / scorecard / decision-tree) |
| Source (repo) | `phase2-artifacts/swiss-ai-phone-assistant-provider-comparison/index.html` |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/4e823644-61f3-4749-bd9e-f1dc60ba85aa |
| **Public Claude URL** | **— none yet (manual Share required) —** |
| Publication status | **PRIVATE — awaiting manual public share** (page control reads "Share, private") |
| Renders in Claude | Yes (verified: correct title in the artifact view) |
| Functional test | Passed — matcher reproduces the article's mapping deterministically: price→Weissmann/Suisse Voice/NEX-AI; dialect→Suisse Voice/Alveni; integration+hospitality→Alveni; integration+tech-team→Suisse Voice; no-IT→Weissmann/NEX-AI |
| Mobile test | Responsive by construction (chips wrap, comparison table scrolls in its own `overflow-x` container, no page overflow) |
| Article backlink | Present — "Vollständigen Anbieter-Vergleich lesen →" (article URL above) |
| Service CTA | Present — "Weissmann KI-Telefonassistent ansehen →" → weissmann.ai/leistungen/ki-telefonassistent/ |
| Factual integrity | Every fact + recommendation traces to the published, fact-checked article (six vendors, five criteria, dated 29.07.2026, self-reported). **Weissmann disclosed as publisher+provider and does NOT auto-win** (Alveni wins hospitality). No invented data; three vendors' prices shown as "kein öffentlicher Preis". No personal data; nothing stored |
| Remaining issue | **Public sharing** — owner must Share→public, then anonymously verify and record the URL here |

## Pilot 5 — swiss-dialect-comprehension-test (DE)

Next highest-priority article without an Artifact after Pilot 4. A-DE-09 (also "high") was again skipped — its concept is a break-even *calculator* (same model as Pilot 1). A-DE-02 (medium-high, core phone product, "recurring objection in sales conversations") was chosen; its concept is a **test-script generator** — a 5th distinct interaction model.

| Field | Value |
|---|---|
| Article ID | `swiss-dialect-comprehension-test` |
| Language | German (de) |
| Production article URL | https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-schweizerdeutsch-test/ |
| Artifact title | Dialekt-Testprotokoll-Generator für KI-Telefonassistenten · Weissmann |
| Interaction type | **Generator / builder** — inputs → tailored, printable/copyable test protocol (distinct from calculator / scorecard / decision-tree / matcher) |
| Source (repo) | `phase2-artifacts/swiss-dialect-comprehension-test/index.html` |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/fa03864c-0a40-4d17-9823-fb8037491d1d |
| **Public Claude URL** | **— none yet (manual Share required) —** |
| Publication status | **PRIVATE — awaiting manual public share** (page control reads "Share, private") |
| Renders in Claude | Yes (verified: correct title in the artifact view) |
| Functional test | Passed — generator scales deterministically: 1 region → 4 calls; 2 → 6; all 4 + names+code+noise+exit → 12; copy/print/reset present |
| Mobile test | Responsive by construction (two-column ≥920px → single column; no horizontal overflow) |
| Article backlink | Present — "Ganzen Dialekt-Artikel lesen →" (article URL above) |
| Service CTA | Present — "Weissmann KI-Telefonassistent testen →" → weissmann.ai/leistungen/ki-telefonassistent/ |
| Factual integrity | Complements the article (generates the plan) without copying it. States it places no calls; dialect *wording* left to the real speaker (only scenario + hint word + what-to-check given — no invented dialect sentences). Article's 4 understanding stages + 0–3 scale + pitfalls reused; hint words (Zmorge, Ändlie, Drämmli, Merci vilmal, Swiss surnames) and CHF 350 one-time trial from the article. No invented stats, no guarantee, no personal data, nothing stored |
| Remaining issue | **Public sharing** — owner must Share→public, then anonymously verify and record the URL here |

## Pilot 6 — google-ads-vs-seo-switzerland (EN)

Next highest-priority article with a genuinely new format. A-DE-09 ("high") skipped a third time (break-even calculator = Pilot 1). B-EN-10 (medium-high) chosen; its concept is a **timeline visualizer** — a 6th distinct interaction model (data visualisation).

| Field | Value |
|---|---|
| Article ID | `google-ads-vs-seo-switzerland` |
| Language | English (en) |
| Production article URL | https://weissmann.ai/en/ai-academy/marketing-seo-geo/google-ads-vs-seo-switzerland/ |
| Artifact title | Google Ads vs SEO: How They Behave Over Time · Weissmann |
| Interaction type | **Interactive data visualisation / timeline** (inline SVG) — distinct from calculator / scorecard / decision-tree / matcher / generator |
| Source (repo) | `phase2-artifacts/google-ads-vs-seo-switzerland/index.html` |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/9b2bafa0-d22d-4137-82ec-42ee6d9c3084 |
| **Public Claude URL** | **— none yet (manual Share required) —** |
| Publication status | **PRIVATE — awaiting manual public share** (page control reads "Share, private") |
| Renders in Claude | Yes (verified: correct title in the artifact view) |
| Functional test | Passed — syntax OK (`node --check`); full script runs `sync→draw→readout` without throwing (DOM shim); curves verified: Ads flat then 0 at the chosen pause month; SEO near-0 → compounds → holds (maintain) or slow-leaks (neglect) |
| Mobile test | Responsive by construction (SVG scales via viewBox in an overflow-x container; controls stack ≤640px) |
| Article backlink | Present — "Read the full Ads vs SEO comparison →" (article URL above) |
| Service CTA | Present — "See Weissmann SEO & Ads pricing →" → weissmann.ai/en/preise/ (article's own CTA) |
| Factual integrity | **"Illustrative — not a forecast" banner**; curves carry no numbers and are the article's own qualitative thesis (fast-but-switches-off vs slow-but-durable), not invented data. Pricing CHF 690/890 from `pricing.ts` with the spend-separate disclosure; Backlinko 39.8% (the Phase-1 corrected figure). No guarantee, no personal data, nothing stored |
| Remaining issue | **Public sharing** — owner must Share→public, then anonymously verify and record the URL here |

## Pilot 7 — ai-phone-assistant-small-business-case (DE)

The **highest remaining "high"-demand article** (A-DE-09), built at last. Its concept is a break-even *calculator*; differentiated from Pilot 1 (phone ROI, not ad budget: three own numbers → net + one-time-trial payback + a conservative half-value robustness check).

| Field | Value |
|---|---|
| Article / URL | `ai-phone-assistant-small-business-case` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-lohnt-sich-fuer-kmu/ |
| Artifact title | Lohnt sich ein KI-Telefonassistent? Break-Even-Rechner · Weissmann |
| Interaction type | Break-even calculator (phone ROI) |
| Source (repo) | `phase2-artifacts/ai-phone-assistant-small-business-case/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/1575a3c2-0641-49dc-b1f0-4c999786e719 |
| Publication status | **PRIVATE** ("Share, private") · renders in Claude (verified) |
| Functional test | Passed (20/wk, 30 %, CHF 54 → 26 missed/mo, CHF 1'403 rescued, +CHF 1'053, payback ~1.1 wk); syntax OK |
| Links | Article backlink + service CTA → weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | No invented Swiss average (user supplies value); CHF 350 Starter from `pricing.ts`; no guarantee; nothing stored |

## Pilot 8 — ai-phone-assistant-vs-ivr-caller-journey (DE)

A genuinely new format: an interactive **step-counter / configurator**.

| Field | Value |
|---|---|
| Article / URL | `ai-phone-assistant-vs-ivr-caller-journey` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-vs-ivr-anrufvergleich/ |
| Artifact title | Zählen Sie die Schritte in Ihrem Telefonmenü · Weissmann |
| Interaction type | Interactive IVR step-counter + AI comparison |
| Source (repo) | `phase2-artifacts/ai-phone-assistant-vs-ivr-caller-journey/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/82f9ce16-40c0-4f33-87ca-61ea0cb5c5bb |
| Publication status | **PRIVATE** ("Share, private") · renders in Claude (verified) |
| Functional test | Passed (2 levels/long/code/date/loop → 8 moves, 1:14); syntax OK |
| Links | Article backlink + service CTA → weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | Move count exact from structure; time is a labelled estimate (not a measurement); AI value (≈4 turns/0:34) from the article; nothing stored |

## Pilot 9 — how-to-measure-ai-receptionist-kpis (EN)

An interactive **live KPI dashboard** — a new model.

| Field | Value |
|---|---|
| Article / URL | `how-to-measure-ai-receptionist-kpis` · https://weissmann.ai/en/ai-academy/agents-automation/how-to-measure-ai-receptionist-kpis/ |
| Artifact title | AI Receptionist KPI Dashboard: 12 Numbers That Matter · Weissmann |
| Interaction type | Data-entry → live KPI cards + cross-check flags |
| Source (repo) | `phase2-artifacts/how-to-measure-ai-receptionist-kpis/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/57578f8c-3af7-4976-b735-68b4f8744d69 |
| Publication status | **PRIVATE** ("Share, private") · renders in Claude (verified) |
| Functional test | Passed (defaults → resolution 75.4 %, repeat 9 %, containment 90.5 %, no false flags); syntax OK |
| Links | Article backlink + service CTA → weissmann.ai/en/services/ai-phone-assistant/ |
| Integrity | 12 KPIs from user's own counts; **no invented benchmark** (article: none exists) — compare to your own earlier period; cross-checks + low-volume note reused from the article; nothing stored |

## Pilot 10 — sito-web-piccola-impresa-ticino (IT)

A **per-trade priority profiler**.

| Field | Value |
|---|---|
| Article / URL | `sito-web-piccola-impresa-ticino` · https://weissmann.ai/it/ai-academy/marketing-seo-geo/sito-web-piccola-impresa-ticino/ |
| Artifact title | Le priorità del vostro sito, per mestiere · Weissmann |
| Interaction type | Business-type profiler → tailored must-have checklist |
| Source (repo) | `phase2-artifacts/sito-web-piccola-impresa-ticino/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/03c5dbf4-cc07-4493-ab78-0fa5516c73ad |
| Publication status | **PRIVATE** ("Share, private") · renders in Claude (verified) |
| Functional test | Passed (per-trade priorities render, "da sistemare" flags, bigger-project note toggles); syntax OK |
| Links | Article backlink + service CTA → weissmann.ai/it/servizi/sviluppo-siti-web-ai/ |
| Integrity | Priorities + Starter scope from the article / `pricing.ts`; 144-emergency + association caveats kept; no invented claims; nothing stored |

## Pilot 11 — website-redesign-signs-switzerland (EN)

A **tiered symptom-checker / redesign triage**.

| Field | Value |
|---|---|
| Article / URL | `website-redesign-signs-switzerland` · https://weissmann.ai/en/ai-academy/marketing-seo-geo/website-redesign-signs-switzerland/ |
| Artifact title | Website Redesign Triage · Weissmann |
| Interaction type | Multi-select 12 signs across 3 cost tiers → weighted verdict |
| Source (repo) | `phase2-artifacts/website-redesign-signs-switzerland/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/955b69c8-e7f3-4cc0-be51-f1e7879baa2a |
| Publication status | **PRIVATE** ("Share, private") |
| Functional test | Passed (verdict logic asserted at all tier boundaries: 3+ crit → overdue, 1–2 → targeted, only compounding → improve, only operational → process, none → recheck; fix-first list); syntax OK |
| Links | Article backlink + service CTA → weissmann.ai/en/services/ai-web-development/ |
| Integrity | 12 signs + verdict thresholds from the article; diagnostic not a quote; no invented claims; no personal data; nothing stored |

## Pilot 12 — google-ads-landingpage-schweiz (DE)

An **element-presence auditor + message-match tester + timed 5-second test**.

| Field | Value |
|---|---|
| Article / URL | `google-ads-landingpage-schweiz` · https://weissmann.ai/ki-academy/marketing-seo-geo/google-ads-landingpage-schweiz/ |
| Artifact title | Landingpage-Check für Google Ads · Weissmann |
| Interaction type | 9-point score bar + keyword-overlap message match + 5-second countdown + Quality-Score explainer |
| Source (repo) | `phase2-artifacts/google-ads-landingpage-schweiz/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/8781815b-8b85-4b93-8383-122155f260d4 |
| Publication status | **PRIVATE** ("Share, private") |
| Functional test | Passed (score/priority logic + message-match overlap asserted: sample ad/LP → shared [sanitär, zürich, minuten]; timer is a clean state machine); syntax OK |
| Links | Article backlink + service CTA → weissmann.ai/leistungen/google-ads/ |
| Integrity | 9 points, Quality-Score components, actual-CPC formula from Google Ads Help; **no invented Swiss stat** (WordStream ranges labelled international context; "no reliable Swiss study" stated); nothing stored |

## Pilot 13 — ai-answering-service-swiss-trades (EN)

A **per-trade qualification-script composer**.

| Field | Value |
|---|---|
| Article / URL | `ai-answering-service-swiss-trades` · https://weissmann.ai/en/ai-academy/agents-automation/ai-answering-service-swiss-trades/ |
| Artifact title | Call Qualification Script Builder for Trades · Weissmann |
| Interaction type | Pick trade → tailored 6-question script + copy-to-clipboard + fit toggles |
| Source (repo) | `phase2-artifacts/ai-answering-service-swiss-trades/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/1a5e0f82-9eea-4f9d-a306-8fe80c660782 |
| Publication status | **PRIVATE** ("Share, private") |
| Functional test | Passed (6 steps assemble per trade with trade-specific urgency question; copy exports plain text via clipboard API + execCommand fallback; fit toggles surface not-the-right-fix note); syntax OK |
| Links | Article backlink + service CTA → weissmann.ai/en/services/ai-phone-assistant/ |
| Integrity | 6 questions + honest price line from the article; plumber/electrician urgency verbatim, others flagged as adaptable examples; no invented claims; no personal data; nothing stored |

## Pilot 14 — keep-existing-swiss-number-ai-assistant (DE)

A **two-question routing wizard → personalised action plan**.

| Field | Value |
|---|---|
| Article / URL | `keep-existing-swiss-number-ai-assistant` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-bestehende-nummer-behalten/ |
| Artifact title | Nummer behalten: Weiterleitung oder Portierung? · Weissmann |
| Interaction type | Q1 keep/switch + Q2 telephony (5 cases) + business-number toggle → path, questions, reversibility, risks |
| Source (repo) | `phase2-artifacts/keep-existing-swiss-number-ai-assistant/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/5bd9c12a-6288-4f93-a873-89c3688fda35 |
| Publication status | **PRIVATE** ("Share, private") |
| Functional test | Passed (routing + list-assembly asserted: keep+mobile → 3 asks/2 risks/rev easy; switch → +porting checklist, rev hard; +biz → +proofs); syntax OK |
| Links | Article backlink + service CTA → weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | Forwarding-vs-porting split, reversibility, risks from the article; regulatory points attributed to BAKOM/ombudscom; Weissmann forwarding-only disclosure kept; no invented claims; nothing stored |

## Pilot 15 — assistente-ai-hotel-bb-campeggi-ticino (IT)

A **fit-assessment + per-structure configuration**.

| Field | Value |
|---|---|
| Article / URL | `assistente-ai-hotel-bb-campeggi-ticino` · https://weissmann.ai/it/ai-academy/agenti-automazione/assistente-ai-hotel-bb-campeggi-ticino/ |
| Artifact title | Assistente AI per la vostra struttura ticinese · Weissmann |
| Interaction type | Structure select + 3-factor fit score → conviene/dipende/non-conviene + per-structure handling + fixed escalation |
| Source (repo) | `phase2-artifacts/assistente-ai-hotel-bb-campeggi-ticino/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/083164ca-17e7-4180-a85e-4fdaaa97172a |
| Publication status | **PRIVATE** ("Share, private") |
| Functional test | Passed (fit-score verdict asserted at boundaries; per-structure routine list + fixed 144/117/118 escalation, campeggio adds child-near-water case); syntax OK |
| Links | Article backlink + service CTA → weissmann.ai/it/servizi/assistente-telefonico-ai/ |
| Integrity | Structure handling, escalation boundary, 8 supplier questions, non-conviene cases from the article; example call labelled illustrative; nLPD note kept; no invented claims; no personal data; nothing stored |

## Pilot 16 — ai-phone-assistant-greeting-transparency (DE)

EU-touchpoint applicability checker (4 yes/no questions -> Art. 50 disclosure verdict + article greeting example).

| Field | Value |
|---|---|
| Article / URL | `ai-phone-assistant-greeting-transparency` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-transparenz-begruessung/ |
| Artifact title | EU-Bezug-Check zur KI-Offenlegung · Weissmann |
| Interaction type | EU-touchpoint applicability checker (4 yes/no questions -> Art. 50 disclosure verdict + article greeting example) |
| Source (repo) | `phase2-artifacts/ai-phone-assistant-greeting-transparency/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/d5eca918-02e4-4a81-b5e4-5c09aed5a669 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | Every criterion, date and legal citation is drawn verbatim from the article JSON. Q1 EU-Bezug = 'Sobald sich ein Angebot an Personen in der EU richtet, gilt zusaetzlich Artikel 50'. Q2 date = 'ab dem 2. August 2026'. Q3 obviousness exception = 'sofern das nicht ohnehin offensichtlich ist'. Q4 Switzerland = 'Massgeblich ist der allgemeine Transparenzgrundsatz des revDSG'. Verdict reasons quote the article (EU-Kommission finale Auslegung Ende Juli 2026; Treu und Glauben; 'Spreche ich mit einem Menschen?'; natural voice often not recognised as software). The four example greetings (Restaurant/Ristorante Bellavista, Arztpraxis Mueller + 144, Handwerk Elektro Steiner, Kanzlei Berger & Partner) and the five Bausteine (Wer/Was/Kann/Fluchtweg/Tempo) are reproduced from the article's 'Gut' bullets and checklist section. Weissmann note ('pro Branche konfigurieren, nicht die Werkseinstellung') is from the article; the only pricing figure used (Starter CHF 350/Monat, keine Setup-Gebuehr, keine Mindestvertragslaufzeit) comes from pricing.ts phone-starter and matches the article's service. No statistics, conversion rates, tools, or legal claims were invented. Caveats: Article's own caveats preserved: 'Keine Rechtsberatung' / individuelle Abklaerung stated in lede and .disc; Swiss-vs-EU jurisdiction distinction kept explicit (revDSG vs Art. 50); the obviousness exception is flagged as unreliable at the phone per the article rather than treated as a safe exemption; verdict never says disclosure is legally 'not needed' outright, only 'not required by Art. 50 but still advisable under revDSG/Treu und Glauben'. Out-of-scope jurisdictions (non-CH, non-EU) are explicitly labelled outside the guide's scope instead of guessed. Disclaimer states orientation not advice/quote and that nothing is stored or sent; inputs are transient and in-memory only. No invented claims; no personal data; nothing stored. |

## Pilot 17 — ai-call-recording-legality-switzerland (DE)

Recording-legality decision tree (DE): branching wizard on call constellation + content + intended use, outputting permitted/not-permitted verdict with the exact StGB article as citation..

| Field | Value |
|---|---|
| Article / URL | `ai-call-recording-legality-switzerland` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-gespraeche-aufzeichnen/ |
| Artifact title | Anrufe aufzeichnen mit KI: Entscheidungsbaum zur Zulässigkeit (StGB) · Weissmann |
| Interaction type | Recording-legality decision tree (DE): branching wizard on call constellation + content + intended use, outputting permitted/not-permitted verdict with the exact StGB article as citation. |
| Source (repo) | `phase2-artifacts/ai-call-recording-legality-switzerland/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/569d2c81-9d20-49c3-8905-e072ca4ec6db |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | Every branch, verdict and legal citation is taken verbatim from the article JSON: the Grundsatz that recording a non-public conversation without consent of all parties is punishable (Art. 179bis / 179ter StGB); the narrow Massengeschaefte exception (Art. 179quinquies StGB) covering only Bestellungen/Auftraege/Reservationen and Hilfs-/Rettungs-/Sicherheitsdienste, and only for Beweissicherung; the usage-limitation section (marketing/quality-control/model-training/Weitergabe leave the exception); the Ansage requirements (name that/what/how to refuse; vague 'zur Qualitaetssicherung' insufficient; refusal must be immediate and without disadvantage) with the article's own weak/besser example wording; the employee special case (Persoenlichkeitsschutz + Arbeitsrecht, Zurich public-sector example not 1:1 transferable, get labor-law advice); the mixed-content FAQ; penalties (Antragsdelikt; up to 1 year for a participant per Art. 179ter, up to 3 years for an uninvolved third party per Art. 179bis; deletion + Einziehung per Art. 69 StGB); and revDSG governing retention/deletion once a recording lawfully exists. Attributions to EDOEB and the Datenschutzbeauftragte des Kantons Zurich preserved. The single pricing line (CHF 350/month, 1'500 minutes incl., then CHF 0.30/min, no setup fee, no minimum term) is the phone-starter package from pricing.ts. No statistics, results, tool names, or legal claims beyond the article were invented. Caveats: Prominent 'Keine Rechtsberatung' in the lede, the .disc disclaimer, and the copyable result summary. Preserved: that a Bandansage's criminal validity is judged case-by-case by the prosecuting authorities (per Datenschutzaufsicht Zurich); that the Zurich example is public-sector and not one-to-one transferable to a private SME; that staff/internal calls need separate labor-law advice; that recording lawfully does not make the recording usable for any purpose; that revDSG sets no blanket retention period; and the 'im Zweifel wie zustimmungspflichtig behandeln' caution. Privacy: inputs are transient and local, nothing is stored or sent; clipboard copies only the user's own generated summary. Footer framed as 'Orientierung, kein Angebot.' No invented claims; no personal data; nothing stored. |

## Pilot 18 — ai-phone-assistant-calendar-crm-integration (DE)

Integration-feasibility checker (DE) — API-gated feasibility router: user names their system type + concrete product, answers the pivotal question (open documented API?), and is routed to one of the article's paths..

| Field | Value |
|---|---|
| Article / URL | `ai-phone-assistant-calendar-crm-integration` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-kalender-crm-integration/ |
| Artifact title | Integrations-Machbarkeits-Check · Weissmann |
| Interaction type | Integration-feasibility checker (DE) — API-gated feasibility router: user names their system type + concrete product, answers the pivotal question (open documented API?), and is routed to one of the article's paths. |
| Source (repo) | `phase2-artifacts/ai-phone-assistant-calendar-crm-integration/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/3f0cbff8-5f03-4fcf-aa7b-7f7d67354957 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | Every branch is drawn verbatim in substance from the article JSON. The pivotal gate = 'Hat das Zielsystem eine offene, dokumentierte API?'. API=yes routes across the article's four connection types (Native Integration / Direkte API-Anbindung / Webhook / Middleware-iPaaS Zapier·Make·n8n) with the article's own reasoning (OAuth authorization, ongoing maintenance because Microsoft/Google change APIs, Webhook push-vs-poll, middleware = extra contract/abo/failure-point + third-party server data-flow). API=no routes across the article's fallbacks (Browser-Automation/RPA störanfällig + stored full-access credentials, notify-only manual fallback, ask the software vendor about unadvertised partner APIs, wait-or-switch) plus the 'Wann lohnt sich der Aufwand nicht' logic (planned switch, sensitive data, very low call volume). API=unknown returns the article's find-out method (search vendor site for API/Entwickler/Developer/Integrationen; ask support; partner-only APIs exist). Risk lists come from 'Was kann schiefgehen'; provider questions come verbatim from the article's question list. Pricing note uses only pricing.ts figures relevant to this service: full system integration = Premium CHF 590/month, 12-month minimum term; NOT part of Starter CHF 350/month (runs without system integrations). No invented statistics, vendor names, or legal claims. Caveats: Preserved the article's caveats: 'keine Rechtsberatung' (surfaced on middleware data-protection and in the disclaimer); 'Geld löst das Problem einer fehlenden Schnittstelle nicht'; no specific undocumented product integrations named; concrete feasibility is honestly checked in the free initial consultation before commitment; a manual fallback is often the honest solution. Disclaimer states orientation not a binding quote and not legal advice, and that all inputs stay local in the browser — nothing stored or sent (no storage/network APIs used). Product-name input is optional, transient, and local; no personal data collected. No invented claims; no personal data; nothing stored. |

## Pilot 19 — ai-phone-assistant-failure-handling (DE)

Failure-mode scenario stepper with good/bad escalation contrast (DE) plus generated test-call checklist.

| Field | Value |
|---|---|
| Article / URL | `ai-phone-assistant-failure-handling` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-versteht-nicht/ |
| Artifact title | Fehlermodus-Simulator: KI-Telefonassistent · Weissmann |
| Interaction type | Failure-mode scenario stepper with good/bad escalation contrast (DE) plus generated test-call checklist |
| Source (repo) | `phase2-artifacts/ai-phone-assistant-failure-handling/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/9c483828-d90e-4040-b657-815356541eee |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | Every string is drawn from the article JSON (ai-phone-assistant-failure-handling.json). The five scenarios (falsch verstandener Name, Hintergrundgeraeusche, Frage ausserhalb des Wissens, veraergerte Anrufende, Stille/Verbindungsabbruch) come from the 'Fuenf Wege, wie ein Anruf kippt' bullets. The four-stage escalation ladder (Konfidenzschwelle, gezielte Rueckfrage, Wiederholung mit Umformulierung, warme menschliche Uebergabe) comes verbatim from 'Das Eskalationsgeruest'. The noise and angry-caller contrast cards reproduce the article's two verbatim dialogue examples ('Gute und schlechte Wiederherstellung'). Bad-path consequences come from 'Warnsignale' and 'Was kann schiefgehen'. The confidence-threshold segmented control uses the article's own 'zu niedrig / ausgewogen / zu hoch' descriptions. Per-scenario stage highlighting reflects the article's distinctions (e.g. Abdeckungsproblem vs Verstaendnisproblem; silence as 'ein eigener Fall'). The test-call checklist is grounded in the article's explicit framing of the five scenarios as a 'Drehbuch fuer einen eigenen Testanruf'. The single pricing figure (CHF 350 einmaliger Starter-Test, kein Abo) matches pricing.ts phone-starter-trial and the article CTA. No numbers, tools, or claims were invented. Caveats: Preserves the article's caveat that the four-stage framework is 'allgemeine gute Praxis fuer Sprachassistenten, keine dokumentierte Weissmann-Spezifikation' (repeated in the .disc disclaimer). Frames the tool as orientation, not advice or a quote. States that nothing is stored or sent and that input stays in the browser. Keeps the article's point that the key metric is the Wiederherstellungsquote, not the Fehlerquote (which 'wird nie null sein'). Silence scenario is honestly marked as sitting outside the four-stage ladder. No fabricated dialogue: descriptive text is used where the article gives no verbatim quote; guillemet quotes appear only where the article supplies them verbatim. No invented claims; no personal data; nothing stored. |

## Pilot 20 — ai-outbound-marketing-calls-switzerland (DE)

Pre-call list-hygiene checker: the article's 3-question gate applied to a target list → traffic-light verdict, plus a scaling-risk illustration (one list-hygiene error × call volume).

| Field | Value |
|---|---|
| Article / URL | `ai-outbound-marketing-calls-switzerland` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-werbeanrufe-schweiz-erlaubt/ |
| Artifact title | Listen-Hygiene-Check für KI-Werbeanrufe · Weissmann |
| Interaction type | Pre-call list-hygiene checker: the article's 3-question gate applied to a target list → traffic-light verdict, plus a scaling-risk illustration (one list-hygiene error × call volume) |
| Source (repo) | `phase2-artifacts/ai-outbound-marketing-calls-switzerland/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/2df79619-5922-44ed-a47c-ed8032afa936 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | Every legal claim, number and category comes from the article JSON only. The 3-question gate is the article's 'Drei-Fragen-Test' (Verzeichnisstatus / Kundenbeziehung / Nachweis) plus its 'kurze Formel'. Verdict logic mirrors the article: normally-listed numbers → Art. 3 Abs. 1 lit. u UWG does not apply → regulär anrufbar; starred/unlisted (incl. unlisted mobiles treated like a Sterneintrag) without a documented current customer relationship → belongs off the list; documented current relationship → exception applies even for starred numbers; loose/old relationship or incomplete origin proof → caution. Legal citations verbatim from the article: Art. 3 Abs. 1 lit. u UWG, Art. 23 UWG (Antragsdelikt, Freiheitsstrafe bis zu drei Jahren oder Geldstrafe, Verfolgung nur auf Antrag), SECO complaint office (can forward to kantonale Strafverfolgung, cannot itself block a number or fine), and Art. 3 Abs. 1 lit. o UWG named only to scope out SMS/email. Scaling illustration uses only the article's own figures — 60–80 manual calls/day, 'mehrere tausend' automated, and 'jede hundertste' (1%) error rate — as editable, user-supplied inputs; the erroneous-call count is pure arithmetic (volume × error%), never an invented statistic. No pricing figure is shown: the article carefully frames Weissmann's phone assistant as inbound, so attaching a price to an outbound cold-call context would mischaracterise the product; pricing.ts was read only to confirm this scoping decision. Caveats: Reproduces the article's own disclaimers: 'keine Rechtsberatung im Einzelfall' and 'das Rechenbeispiel ist eine Veranschaulichung, keine gemessene Grösse'. Preserves that 'Kundenbeziehung' is not conclusively defined in law and that older/looser relationships are less reliable; that a bought/external list without documented origin is no proof in a dispute; that enforcement is complaint-only; and the second (non-legal) mechanism that a synthetic-sounding call gets reported more readily even when lawful. Scope note distinguishes outbound (this tool) from inbound greeting-transparency. 'Grenzen dieses Checks' lists the article's out-of-scope cases (bought lists, cross-border, B2B, SMS/email). Privacy: inputs are transient and in-memory only — nothing stored, sent or evaluated; the only network-free convenience is copying the user's own generated summary to the clipboard. No invented claims; no personal data; nothing stored. |

## Pilot 21 — ai-phone-assistant-beauty-wellness-switzerland (DE)

Weighted 6-point salon-fit checklist (Ja/Nein/Unklar) -> coverage score + highest-cost gap.

| Field | Value |
|---|---|
| Article / URL | `ai-phone-assistant-beauty-wellness-switzerland` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-empfang-beauty-wellness-salon/ |
| Artifact title | Salon-Fit-Check: KI-Empfang in 6 Punkten · Weissmann |
| Interaction type | Weighted 6-point salon-fit checklist (Ja/Nein/Unklar) -> coverage score + highest-cost gap |
| Source (repo) | `phase2-artifacts/ai-phone-assistant-beauty-wellness-switzerland/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/7894a5a8-8140-4d9d-b0e5-7d166e03d3e1 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | All six checklist points, their sub-questions and the score bands come verbatim from the article JSON's six sections (Punkt 1-6), the 'Was schiefgehen kann', 'Fuer wen sich das (noch) nicht lohnt' and 'Der Test vor der Unterschrift' sections, and the FAQ. Weights (P1=3 Systemanbindung, P4=3 Absage/Warteliste, P3=2 No-Shows, P2/P5/P6=1) are a disclosed design choice reflecting the article's stated emphasis on the rhythm between calls, not a measured value. Pricing figures used (Starter CHF 350/month without integration; Premium CHF 590/month, 12-month minimum term, with real integration; language tiers 1/2/4 for Starter/Premium/Enterprise) match both the article body and pricing.ts. No software is named as a Weissmann partner (MySalon.ch not mentioned in the tool). No statistics, conversion rates or results invented. Caveats: Preserved the article's caveats: no reliable Switzerland-representative no-show figures exist; the weighting is orientation not a measured value; real system integration depends on the salon's system having an open interface; a signed contract does not make any point work automatically; final proof is a real book+cancel test run before signing. Included the 'not worth it' cases (single-operator salon, low call volume where a good online booking page + reminder SMS suffices, system about to be replaced). Boundary point (Punkt 6) keeps health questions referred to a professional, no advice given. Disclaimer states: orientation not advice/quote/legal counsel, nothing stored or sent, transient in-browser only. No invented claims; no personal data; nothing stored. |

## Pilot 22 — ai-phone-assistant-when-not-appropriate (DE)

Honest suitability self-screen (deliberately contrarian). A 5-question screening quiz over the article's five 'wrong choice' scenarios plus a scoping question, producing one of four honest outcomes — genuinely capable of a negative 'eher nicht' result. Distinct mechanic: per-scenario red/amber/green verdicts modulated by an abgrenzbar (scopeable) question; no ROI number-crunching, no article restatement..

| Field | Value |
|---|---|
| Article / URL | `ai-phone-assistant-when-not-appropriate` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-falsche-wahl/ |
| Artifact title | Eignungs-Selbstcheck: KI-Telefonassistent – die falsche Wahl? · Weissmann |
| Interaction type | Honest suitability self-screen (deliberately contrarian). A 5-question screening quiz over the article's five 'wrong choice' scenarios plus a scoping question, producing one of four honest outcomes — genuinely capable of a negative 'eher nicht' result. Distinct mechanic: per-scenario red/amber/green verdicts modulated by an abgrenzbar (scopeable) question; no ROI number-crunching, no article restatement. |
| Source (repo) | `phase2-artifacts/ai-phone-assistant-when-not-appropriate/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/9da93e5c-c4b2-4d20-b2f7-d0fd4d132f76 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | Every question, note and outcome is drawn only from the article JSON (five scenarios, seven self-check questions, FAQ) and verified pricing.ts. Numbers used: CHF 350/month Starter (no setup fee, no minimum term) and the one-time Starter-Test CHF 350 (no subscription) — both from pricing.ts; the article's ~15 minutes/week maintenance figure; the article's illustrative boutique 'four to five calls/week' example (attributed as the article's example, not a threshold); Notrufnummern 144/117/118; Five9 '75%'. NO break-even formula or invented conversion numbers were reconstructed — the article deliberately defers that computation to another article, so Scenario 2 stays a qualitative self-assessment (never a fabricated calculator). No vendors/tools named beyond the article's own sources (Five9, American Bar Association, lexdial, Smith.ai are referenced only as the article references them). Caveats: Preserved verbatim in spirit: (1) the disclosed interessenkonflikt (Weissmann sells the product yet lists reasons not to buy); (2) an AI assistant never replaces 144/117/118 and makes no medical decisions; (3) the American Bar Association point is US-based, 'keine Schweizer Rechtsauskunft' and does not replace one's own legal advice; (4) the Five9 75% figure is international, not Swiss-specific; (5) a mere hunch about customer preference is explicitly NOT a reason to abstain — only documented/repeatedly observed preference counts; (6) the five scenarios are Warnsignale/a Momentaufnahme, not automatic rejection, and can shift as the business grows. Tool-level disclaimer states it is orientation, not a quote/offer/legal advice, and that nothing is stored or sent (fully in-memory, no storage/network/external resources). No invented claims; no personal data; nothing stored. |

## Pilot 23 — google-ads-erfolg-messen-kmu (DE)

Cost-per-qualified-lead calculator (CPQL): user enters spend, clicks, account conversion rate and share qualified; tool derives conversions, Cost per Conversion (the dashboard number) vs Cost per Qualified Lead (the decision number) and the multiple between them, plus bereinigte Conversion-Rate, and separates vanity metrics (CTR, CPC) from decision metrics. Optional extension computes orders, revenue, ROAS and CAC..

| Field | Value |
|---|---|
| Article / URL | `google-ads-erfolg-messen-kmu` · https://weissmann.ai/ki-academy/marketing-seo-geo/google-ads-erfolg-messen-kmu/ |
| Artifact title | Cost per Qualified Lead berechnen · Weissmann |
| Interaction type | Cost-per-qualified-lead calculator (CPQL): user enters spend, clicks, account conversion rate and share qualified; tool derives conversions, Cost per Conversion (the dashboard number) vs Cost per Qualified Lead (the decision number) and the multiple between them, plus bereinigte Conversion-Rate, and separates vanity metrics (CTR, CPC) from decision metrics. Optional extension computes orders, revenue, ROAS and CAC. |
| Source (repo) | `phase2-artifacts/google-ads-erfolg-messen-kmu/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/4dc5d45c-08dd-4683-a309-bc728f40ac9f |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/google-ads/ |
| Integrity | All copy, metric definitions and logic come from the article JSON. CPQL = spend / qualified leads; Cost per Conversion = spend / all counted conversions; the 'vanity vs decision metric' framing, the four vanity metrics (impressions/CTR/CPC/raw conversions) and the decision metrics (CPQL, ROAS, bereinigte Conversion-Rate, CAC) are the article's own categories. The 'Beispiel laden' button prefills the article's illustrative electrical-installation example (CHF 1'800; 620 clicks; 38 conversions -> 6.13% conv rate; 14 qualified -> 36.8% share; CHF 47.40 Cost per Conversion; ~CHF 129 CPQL = 2.7x; 6 orders at CHF 950; revenue CHF 5'700; ROAS 3.2) and the calculator reproduces these exactly. Six-question audit checklist is the article's 'Sechs Fragen'. Small-volume warning (<30 clicks) is the article's 'unterhalb einiger Dutzend Klicks' point. Pricing fact CHF 690/month management with ad spend paid separately/directly to Google is from pricing.ts (ads-growth) and the article's CTA section. No invented benchmarks or 'typical' numbers. Caveats: Preserves the article's caveats: the worked example is explicitly frei erfunden and no market average; CPQL and ROAS are only as honest as the conversion tracking (verzerrt in beide Richtungen); a ROAS of 3 means CHF 3 revenue not CHF 3 profit and there is no serious cross-industry ROAS benchmark (whether it suffices depends on your own margin); below a few dozen clicks per month rates carry no trend, look at individual inquiries instead. Disclaimer states orientation not advice/quote, everything computed in-browser, nothing stored or sent. Google Ads Growth is CHF 690/month for management; ad spend billed separately and paid directly to Google. No invented claims; no personal data; nothing stored. |

## Pilot 24 — geo-agency-red-flags-switzerland (EN)

Claim-by-claim GEO/AEO pitch red-flag scanner: reader ticks the lines their vendor's pitch actually makes; each is sorted into 'describes something no one can deliver' (2 always-false claims), 'worth a direct question' (8 red flags), or 'a reasonable sign' (5 legitimate-work signals), with the article's own 'why' revealed inline, a live verdict, a UWG note, and a copyable summary plus the article's five vendor questions. Distinct from B-EN-03: the mechanic is a per-claim vendor-pitch scanner, not a restated article or generic quiz..

| Field | Value |
|---|---|
| Article / URL | `geo-agency-red-flags-switzerland` · https://weissmann.ai/en/ai-academy/marketing-seo-geo/geo-agency-red-flags-switzerland/ |
| Artifact title | GEO Pitch Red-Flag Scanner · Weissmann |
| Interaction type | Claim-by-claim GEO/AEO pitch red-flag scanner: reader ticks the lines their vendor's pitch actually makes; each is sorted into 'describes something no one can deliver' (2 always-false claims), 'worth a direct question' (8 red flags), or 'a reasonable sign' (5 legitimate-work signals), with the article's own 'why' revealed inline, a live verdict, a UWG note, and a copyable summary plus the article's five vendor questions. Distinct from B-EN-03: the mechanic is a per-claim vendor-pitch scanner, not a restated article or generic quiz. |
| Source (repo) | `phase2-artifacts/geo-agency-red-flags-switzerland/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/16333306-ebca-4d68-9241-84afdf4ecd96 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-web-development/ |
| Integrity | Every claim, verdict, and 'why' is drawn verbatim/paraphrased from the article JSON: the two always-false claims (guaranteed AI citation; Google requires special AI schema) with Google's own documentation quotes ('doesn't mean that Google will crawl, index, or serve'; 'isn't guaranteed'; 'don't need to create new machine readable files, AI text files, or markup'; 'there's also no special schema.org structured data'); the 10-line red-flag checklist (2 elevated to always-false, 8 as red flags); the 5 legitimate-work signals from 'What Legitimate GEO Work Actually Looks Like'; the 5 vendor questions from 'Five Questions That Separate a Specialist From a Reseller'; the UWG Art. 3 backdrop; and the 'what can go wrong even with a legitimate agency' prevention notes. From pricing.ts: only the article-consistent fact that Weissmann quotes GEO individually with NO fixed published price — no CHF figure is displayed or invented (the provided pricing facts list no GEO price, and the article states GEO has no fixed price). Caveats: Preserves the article's caveats: no agency including Weissmann can guarantee an AI citation; Google requires no AI-only file or schema; UWG note explicitly marked 'not legal advice — raise with a lawyer'; passing the scan removes the most dishonest risk, not every risk (put cadence/language scope in writing); GEO is quoted individually with no fixed price; disclaimer states the tool is orientation not advice/quote, that it stores nothing and sends nothing and runs entirely in-browser. No fabricated statistics, results, conversion rates, vendor names, or numeric red-flag thresholds were added. No invented claims; no personal data; nothing stored. |

## Pilot 25 — costo-sito-web-ticino-svizzera (IT)

One-time / recurring cost splitter — reader assigns each of the article's seven website-cost items to launch (una tantum), ongoing (all'anno) or both, supplies own CHF amounts, and reads first-year total vs each-following-year total plus a 3-year projection; optional Swiss VAT 8,1% view; three article-grounded scenario presets (artigiano / ristorante / studio) that set only the assignment pattern, never amounts..

| Field | Value |
|---|---|
| Article / URL | `costo-sito-web-ticino-svizzera` · https://weissmann.ai/it/ai-academy/marketing-seo-geo/costo-sito-web-ticino-svizzera/ |
| Artifact title | Lancio o continuativo: il costo reale del sito · Weissmann |
| Interaction type | One-time / recurring cost splitter — reader assigns each of the article's seven website-cost items to launch (una tantum), ongoing (all'anno) or both, supplies own CHF amounts, and reads first-year total vs each-following-year total plus a 3-year projection; optional Swiss VAT 8,1% view; three article-grounded scenario presets (artigiano / ristorante / studio) that set only the assignment pattern, never amounts. |
| Source (repo) | `phase2-artifacts/costo-sito-web-ticino-svizzera/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/106e2134-7ddd-4901-a8a4-cc31e58c9e3f |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/it/servizi/sviluppo-siti-web-ai/ |
| Integrity | The seven cost items (Design, Contenuti/copywriting, Sviluppo, Base tecnica SEO+GEO, Hosting, Manutenzione, Lingue aggiuntive) and their una-tantum/continuativo classification come verbatim from the article's 'Le sette voci' section (including the parenthetical badges). The launch-vs-3-years framing, the 'chiedi il costo dei prossimi tre anni' checklist points, and the 8,1% Swiss VAT net/gross question are all from the article ('La distinzione…', 'Cosa controllare…', 'Cosa può andare storto', FAQ). The three scenario presets (artigiano / ristorante / studio) reproduce only the assignment emphasis described in the article's 'Tre progetti reali' section — they set which voci are active and how they are classified, and never fill invented amounts. The only figures shown are user-entered, except the Starter anchor: CHF 880 launch (regular CHF 2'490), up to 5 pages, 1 language, 2 revision rounds, technical SEO+GEO, excludes copywriting/extra languages/paid third-party tools — confirmed against pricing.ts (website-starter) and matching the article's 'Un esempio concreto' section. No pricing beyond the websites product is used; no recurring/hosting figure is invented (article states none reliably exists). Caveats: Preserved the article's core honesty stance: 'non esiste una media di mercato affidabile', totals depend on which of the seven voci the project activates and how many languages are needed, all amounts are user-supplied. Kept the Starter figures framed as one provider's real prices — not a market average and not what another provider's quote should cost. Preserved the Swiss VAT 8,1% net/gross caveat (optional toggle, labelled). Explicitly states it is orientation, not a preventivo or advice, and that nothing is stored, sent or shared (in-memory only; clipboard copy is of the user's own generated summary). No invented claims; no personal data; nothing stored. |

## Pilot 26 — ai-phone-assistant-emergency-limitations-switzerland (DE)

Pre-launch capability checklist / go-live sign-off sheet.

| Field | Value |
|---|---|
| Article / URL | `ai-phone-assistant-emergency-limitations-switzerland` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-notfall-grenzen/ |
| Artifact title | Notfall-Sign-off: KI-Telefonassistent · Weissmann |
| Interaction type | Pre-launch capability checklist / go-live sign-off sheet |
| Source (repo) | `phase2-artifacts/ai-phone-assistant-emergency-limitations-switzerland/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/885c4e47-9cc1-41c3-975f-b710d87543a5 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | Every checklist item is taken directly from the article JSON: the five 'never' behaviours (Vorab-Check Teil 1), the five 'always' behaviours (Vorab-Check Teil 2), the six Praxistest scenarios, and the three operator-owned responsibilities (branch-specific signal list, who takes the handover, ensuring that person is reachable). The three-step forwarding protocol (erkennen, unterbrechen, weiterleiten) and the emergency numbers 144 Sanität / 117 Polizei / 118 Feuerwehr come verbatim from the article (source: Stadt Zürich – Notrufe). The legal-frame note (no standalone Swiss law; revDSG/EDÖB duties; EU AI Act Anhang III Ziffer 5 lit. d Hochrisiko) is quoted from the article's 'Was schiefgehen kann' section and FAQ. Only pricing fact used is Phone Assistant Starter CHF 350/month, no minimum term, no setup fee (pricing.ts), matching the article's related service (phone-assistant). No statistics, results, tool names or legal claims beyond the article were invented. Total 19 must-items; status flips to 'Bereit fürs Telefon' only at 19/19. Caveats: Preserves the article's core caveats: the limitation is 'die richtige Grenze, dauerhaft', not a temporary technical gap; the assistant can never itself alarm emergency services, only forward and advise the caller to hang up and dial directly; 'lieber einmal zu früh weiterleiten als einmal zu spät' (false positives are the safer error direction); retest after every major change and at least yearly; there is no standalone Swiss law and 'Dies ist keine Rechtsberatung im Einzelfall'; call-recording legality is a separate criminal-law question. The artifact adds its own disclaimer: orientation not advice or a quote, a companion to the guide, no real test-run substitute, and nothing is stored, sent or evaluated (all inputs stay in-browser). No invented claims; no personal data; nothing stored. |

## Pilot 27 — ai-phone-assistant-human-handover-design (DE)

Handover-protocol builder — configurator (team availability + fixed/dynamic escalation triggers) that assembles a copyable bot→human context-package protocol.

| Field | Value |
|---|---|
| Article / URL | `ai-phone-assistant-human-handover-design` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-uebergabe-mensch/ |
| Artifact title | Übergabe-Protokoll-Builder: Vom Bot zum Menschen · Weissmann |
| Interaction type | Handover-protocol builder — configurator (team availability + fixed/dynamic escalation triggers) that assembles a copyable bot→human context-package protocol |
| Source (repo) | `phase2-artifacts/ai-phone-assistant-human-handover-design/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/3d197b82-5c2e-48df-bf83-60bdfdfd5dfb |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | Every configurator option is drawn verbatim from the article JSON. The five fixed «immer Mensch» triggers (rechtlich/versicherungstechnisch, akute Beschwerden mit Reputationsrisiko, Zahlungsverzug/Inkasso, Presse/Behörden, ausdrücklicher Wunsch — the last locked as 'zuverlässigster Trigger, braucht keine weitere Prüfung') come from Entscheidung eins. The three dynamic-threshold signals (Tonfall, Signalwörter «Beschwerde/Anwalt/kündigen/Notfall», Gesprächsdauer im Kreis) and the 'im Zweifel eher zu früh' cost framing come from Entscheidung zwei. The four context-package fields (Wer+Ein-Satz-Anliegen, bereits versucht, Grund der Übergabe fest/dynamisch, Stimmung neutral/ungeduldig/verärgert) and the warm-vs-cold Herr-Müller example come from Entscheidung drei + Warmer-Transfer section. The team-availability inputs, named-person requirement, second stage, and three fallback options (zweite Person / Combox mit Kontext / Rückrufzusage mit Zeitfenster) come from Entscheidung vier + FAQ. Team-size guidance (solo: 'alles unter 1 Minute geht sofort weiter') from the 'Wann nicht nötig' section. The five pitfalls and the 'halbe Seite' rule-of-thumb are quoted from the respective sections/FAQ. No statistics exist in the article, so none are shown or invented. Pricing.ts was read to confirm the phone-assistant service; no price figure is displayed because the article discusses none and the service link covers pricing. Caveats: Disclaimer (.disc, in German/Swiss ss) states: Orientierungshilfe, kein Angebot und keine Rechtsberatung; the tool only summarizes the article's four decisions into a meeting template; concrete design remains the operator's own homework ('Hausaufgabe des Betriebs'); all inputs stay local in the browser — nothing stored, nothing sent; use placeholders instead of real personal data. The generated protocol uses [Platzhalter] fields for per-call and identity data. The article's own framing is preserved: handover is Design not a Notlösung, no reliable single signal, review triggers regularly, and a broken fallback is worse than none. Footer attribution: 'a companion to the guide. Orientation, not a quote.' No invented claims; no personal data; nothing stored. |

## Pilot 28 — ai-phone-assistant-property-management (EN)

Call-triage rule-set builder: reader assigns tenant-call types to tiers (routine/administrative vs urgent-administrative vs a locked emergency list) and compiles a copyable triage rule sheet, grounded in 'AI handles logistics, never decides emergency severity.'.

| Field | Value |
|---|---|
| Article / URL | `ai-phone-assistant-property-management` · https://weissmann.ai/en/ai-academy/agents-automation/ai-phone-assistant-property-management/ |
| Artifact title | Tenant-Call Triage Rule Builder |
| Interaction type | Call-triage rule-set builder: reader assigns tenant-call types to tiers (routine/administrative vs urgent-administrative vs a locked emergency list) and compiles a copyable triage rule sheet, grounded in 'AI handles logistics, never decides emergency severity.' |
| Source (repo) | `phase2-artifacts/ai-phone-assistant-property-management/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/cf56e352-4b7f-426b-9243-6d32bcfcf714 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-phone-assistant/ |
| Integrity | All content from the article JSON: the five fixed emergency signals (gas, active flooding/burst pipe, smoke/fire, break-in/intruder, injury/safety) are the locked, non-editable list; the routine/booking/human-decision/urgent-administrative call categories and their canonical placement come verbatim from the article's 'Tenant-Call Categorisation Checklist' and 'No Heat in Winter' sections; the two failure modes surfaced by the builder (under-escalation/under-servicing and over-escalation) come from 'What Can Go Wrong'; the default-to-escalate standing rule and the 'trigger list agreed by a human in advance, assistant applies not writes it' framing come from the article + FAQ; the fallback (give caller the direct fire-brigade/police/gas-utility number) is from the escalation section. Only pricing fact used is from pricing.ts and the article CTA: one-time Starter trial CHF 350, no subscription. No numbers, results, dialects, vendor names, or legal claims invented; specific emergency phone numbers left for the user to supply rather than fabricated. Caveats: Preserved the article's core boundary (AI handles logistics, never decides how dangerous a call is; never runs scripted questions before escalating; a calm voice reporting gas is still gas). Emergency list kept locked/non-downgradable to embody 'never decides severity'. Sheet framed as a working draft to review with staff, not a finished policy. Disclaimer states: orientation not advice or a quote; nothing stored/sent/saved (in-memory only, entries vanish on close); use placeholders not real identity; not legal advice. Kept 'trigger list agreed by a human and reviewed periodically' and default-to-escalate as the named fix for under-escalation. No storage, no network, no external assets; clipboard copy of the user's own generated sheet only. No invented claims; no personal data; nothing stored. |

## Pilot 29 — ai-receptionist-reliability-outage-fallback (EN)

Per-failure-point fallback-readiness self-audit.

| Field | Value |
|---|---|
| Article / URL | `ai-receptionist-reliability-outage-fallback` · https://weissmann.ai/en/ai-academy/agents-automation/ai-receptionist-outage-fallback/ |
| Artifact title | Fallback-Readiness Self-Audit · Weissmann |
| Interaction type | Per-failure-point fallback-readiness self-audit |
| Source (repo) | `phase2-artifacts/ai-receptionist-reliability-outage-fallback/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/b8f7cdfd-4588-4377-b7a6-4c253ee2cb50 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-phone-assistant/ |
| Integrity | Every audit item, description, and status message is drawn only from the article JSON. The three failure points are the article's three dependencies (caller's own connection; calendar/booking system queried mid-call; vendor's own platform). Per-point checklist items come from the article's 'well designed' scenario behaviours and the 'What a Resilient Fallback Chain Actually Looks Like' layers: change-approach-on-low-confidence / early handover / label-uncertain-as-unverified (Scenario Two + capture-and-defer); defined timeout with a number, tell-caller-plainly, capture-and-defer, immediate internal alert (Scenario One + resilient chain); carrier-level independent backup destination, tested backup, monitoring notices call-volume drop, named on-call owner (Scenario Three + resilient chain + silent-failure section). The 'fail open on the channel / fail closed on the action' framing and the 'chain only as resilient as its weakest link' synthesis are the article's own. The call-volume profile toggle ('a handful of calls a week' vs higher volume) and treating monitoring/named-owner as 'scales with volume' come verbatim from 'When This Is Not Worth Engineering Around'. Copyable vendor questions are the article's five 'Ask Any Vendor These Questions Before You Sign' items plus the bad-connection FAQ. Pricing: only the article CTA figure is used - CHF 350 one-time trial ('Stress-test the assistant's fallback behaviour yourself'), confirmed against pricing.ts phone-starter-trial. No statistics, uptime numbers, timeout figures, or results were invented. Caveats: Preserves the article's 'Where Weissmann's Own Documentation Stops' disclosure verbatim in intent: Weissmann publishes around-the-clock reachability, capture-and-escalate, and a dedicated line with call forwarding, but does NOT publish a specific uptime %, a documented calendar-timeout figure, or a monitoring/incident process - so ask directly. Keeps 'no vendor, Weissmann included, can promise a line never meets a broken dependency' and 'every dependency will fail eventually'. Disclaimer states orientation not advice/quote, not a reliability guarantee, and that nothing is stored, sent, or saved (in-memory only). No localStorage/sessionStorage/cookies/network; clipboard copy is of the user's own generated text only. Exactly two footer anchors: article first, service (primary) second, both target=_blank rel=noopener noreferrer with 'opens in a new tab' aria-labels. No invented claims; no personal data; nothing stored. |

## Pilot 30 — ai-receptionist-swiss-phone-system-compatibility (EN)

Two-axis compatibility classifier: reader picks (1) their phone infrastructure and (2) how the AI vendor receives calls; the 4x4 matrix returns a compatibility read plus tailored questions for the telecom provider and the vendor, and a copyable one-question script. Distinct from the forward-vs-port pilot..

| Field | Value |
|---|---|
| Article / URL | `ai-receptionist-swiss-phone-system-compatibility` · https://weissmann.ai/en/ai-academy/agents-automation/ai-receptionist-phone-system-compatibility/ |
| Artifact title | Will an AI receptionist work with your Swiss phone system? |
| Interaction type | Two-axis compatibility classifier: reader picks (1) their phone infrastructure and (2) how the AI vendor receives calls; the 4x4 matrix returns a compatibility read plus tailored questions for the telecom provider and the vendor, and a copyable one-question script. Distinct from the forward-vs-port pilot. |
| Source (repo) | `phase2-artifacts/ai-receptionist-swiss-phone-system-compatibility/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/b70d08af-68b2-4f46-a814-e0774f9639ab |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-phone-assistant/ |
| Integrity | All copy grounded in the article JSON only. Axis 1 infrastructure options (mobile/landline forwarding, on-premise PBX, SIP trunk, Teams-based telephony) taken verbatim from the 'Four Ways Swiss Offices Actually Receive Calls' section. Axis 2 vendor connection methods (forwarded-number only, direct SIP-trunk termination, Teams-native Direct Routing/Operator Connect, no clear answer) from 'Two Different Questions, With Two Different Owners' and the 'Questions to Ask Your AI Vendor' list. Verdict bodies paraphrase the article's per-scenario guidance (least-risky forwarding path; PBX routing rule is the admin's job; SIP forwarding-only expectation gap and 'sometimes costlier'; Teams rarely on marketing pages; classic both-sides-assume failure). Telecom checklist from 'Questions to Ask Your Telecom Provider'; vendor checklist from 'Questions to Ask Your AI Vendor'. The copyable question is 'The One Question That Replaces All the Others'. Operator Connect = pure cloud/no on-site hardware and Direct Routing = hybrid via on-site session border controller taken from the article. Weissmann self-disclosure block (dedicated line included, keep number by forwarding, no SIP/PBX/Teams integration documented) from 'Where Weissmann's Own Setup Fits'; only pricing figure added is Phone Assistant Starter CHF 350/month, 1'500 min incl., then CHF 0.30/min, no minimum term, no setup fee, from pricing.ts. No statistics, results, vendor names, or legal claims invented beyond the article. Caveats: Preserved the article's core caveats: number portability is explicitly out of scope (separate regulatory topic); Swisscom and Sunrise publish nothing about which AI vendors can plug into their connections and only the vendor can confirm compatibility; forwarding almost always works as a fallback so no combination is framed as outright 'incompatible' (verdicts are Straightforward / Confirm first / Ask precisely, an expectation-gap framing, not pass/fail); get answers in writing before signing. Disclaimer states orientation not advice or a quote, nothing saved or sent, selections stay in the browser. Weissmann's own limitation (forwarding path only, no SIP/PBX/Teams integration documented) disclosed rather than hidden. No storage/network/external assets; clipboard copy is of the user's own generated question text only. No invented claims; no personal data; nothing stored. |

## Pilot 31 — ai-voice-cloning-business-switzerland (EN)

Risk classifier: sorts the reader's intended use into generic-synthetic (lower-risk) vs cloning-a-real-person, then runs a 12-item consent/access-control/revocation readiness gap analysis, an EU AI Act Article 50 reach check, and a fraud verification-defence check, and generates a copyable one-page written answer. Distinct from a quiz: output is a classification + tailored duty/gap list, not a score..

| Field | Value |
|---|---|
| Article / URL | `ai-voice-cloning-business-switzerland` · https://weissmann.ai/en/ai-academy/agents-automation/ai-voice-cloning-business-switzerland/ |
| Artifact title | AI Voice-Cloning Risk Self-Check · Weissmann |
| Interaction type | Risk classifier: sorts the reader's intended use into generic-synthetic (lower-risk) vs cloning-a-real-person, then runs a 12-item consent/access-control/revocation readiness gap analysis, an EU AI Act Article 50 reach check, and a fraud verification-defence check, and generates a copyable one-page written answer. Distinct from a quiz: output is a classification + tailored duty/gap list, not a score. |
| Source (repo) | `phase2-artifacts/ai-voice-cloning-business-switzerland/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/0f484042-a61e-4854-88e7-96e93f114ce9 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-phone-assistant/ |
| Integrity | Every classification, duty and warning is drawn verbatim-in-substance from the article JSON: the cloning-vs-generic-synthetic distinction (answerFirst + FAQ 'Is a generic AI phone-assistant voice the same risk as a cloned one?'), the four consent bullets, four access-control bullets, four revocation bullets, the 'what can go wrong even with a written policy' failure modes (used as watch-items), the 'when cloning is not the right answer' reconsider note, the Arup 2024 case (US$25m / fifteen transfers / video call), FBI IC3 Dec 2024 warning + callback rule, EU AI Act Article 50(2) marking from 2 August 2026 via C2PA/Content Credentials and its extraterritorial reach (FAQ), the watermarking-proves-genuine-not-fake limit, and revDSG/personality-rights + 'no single Swiss law' + 'not legal advice'. Pricing is limited to this article's service (AI phone assistant), confirmed against src/data/pricing.ts: standard synthetic voice in Starter (CHF 350/month) and Premium (CHF 590/month); voice cloning only as an Enterprise-tier, on-request option (price on request). No figures, tools, vendors, rates or legal claims were invented; where a value depends on the reader's situation (voice type, EU reach, governance items, intended-use text) the user supplies it. Caveats: Preserved the article's own hedges: no single Swiss law bans/permits voice cloning; revDSG treats voice as personal data and personality rights likely apply; 'general information, not legal advice — get advice specific to your situation'; watermarking only proves a recording genuine (never proves fake) and only on a platform that adds one, so it is a partial signal not a fraud-detection verdict; Article 50 reaches purely-domestic Swiss use only indirectly (outside its direct reach, still good practice); the Arup account is drawn from public reporting, not firsthand review; 'a policy on paper doesn't enforce itself'; most businesses don't need cloning and a standard voice does the same job. In-artifact .disc states orientation not advice/quote and that nothing is stored, sent or shared; all inputs are transient and local (no storage APIs, no network calls); optional free-text uses placeholders like [your business] and is never captured or transmitted. No invented claims; no personal data; nothing stored. |

## Pilot 32 — ai-phone-assistant-onboarding-30-days (DE)

Phased-timeline generator (30-day rollout planner): Setup/Ausgangslage, Branche, Team und Anrufvolumen erzeugen einen phasenweisen, kopierbaren Rollout-Zeitplan (Phase 1-4) mit optionalen Kalenderdaten..

| Field | Value |
|---|---|
| Article / URL | `ai-phone-assistant-onboarding-30-days` · https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-einfuehren-30-tage-plan/ |
| Artifact title | KI-Telefonassistent einführen: 30-Tage-Planer |
| Interaction type | Phased-timeline generator (30-day rollout planner): Setup/Ausgangslage, Branche, Team und Anrufvolumen erzeugen einen phasenweisen, kopierbaren Rollout-Zeitplan (Phase 1-4) mit optionalen Kalenderdaten. |
| Source (repo) | `phase2-artifacts/ai-phone-assistant-onboarding-30-days/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/c1d60a0c-d66d-48d7-8027-4ffd9e8f0cbf |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-telefonassistent/ |
| Integrity | Every phase, task, intro line and time estimate is taken from the article's four phases (Phase 1 Tage 1-7 Vorbereitung/Kickoff; Phase 2 Tage 8-14 Aufbau/interner Test; Phase 3 Tage 15-21 begrenzte Pilotphase; Phase 4 Tage 22-30 Vollbetrieb/Bilanz) and its FAQ time investment (1-2h Wissensbasis, 1-2h Testanrufe, ~20 min/Woche Anrufzusammenfassungen, ~1h Kickoff). The four alternative timelines (standard ~30 Tage; Saisonbetrieb 7-10 Tage kompakt; grosses Team mit Projektleitung ~2 Wochen; Premium volle Systemintegration 6-8 Wochen) are all stated in the article; sub-phase day bands for the compressed/expanded scenarios are proportional planning bands, framed as Planungshorizont not a fixed rule. Industry hints use only article-named specifics: Sanitaer -> Anfahrtspauschale + Pikettdienst; Praxis -> Medizinisches/rechtlich Heikles immer an einen Menschen; inhabergefuehrter Betrieb -> volle vier Wochen realistisch; Saisonbetrieb -> kurze aber nicht uebersprungene Pilotphase. Pricing: only CHF 350 einmaliger Starter-Test is cited, verbatim from the article and confirmed in pricing.ts (phone-starter-trial, once). No deflection/conversion numbers invented; call volume is echoed only as a Phase-4 baseline (article: 'wie viele Anrufe kamen an'). No storage, no network, no external assets; clipboard copy of the user's own generated plan only. Caveats: Preserves the article's core caveats: the 30 days are a Planungshorizont, not a Vertragsversprechen (individuell im Erstgespraech festgelegt); the technical setup is much faster; a slip of one to two weeks is normal for small businesses and not a failed project; medical or legally sensitive matters always go to a human, never the KI. Disclaimer states it is orientation, not legal/contract/investment advice and not a binding quote, and that all inputs stay in the browser (nothing stored, nothing sent). Business identity uses the placeholder [Ihr Betrieb]; no personal data captured. No invented claims; no personal data; nothing stored. |

## Pilot 33 — best-ai-receptionists-switzerland-buyers-guide (EN)

Buyer-persona matcher: five priority questions map the reader to one (or a tie of) the article's four buyer personas, then surface that persona's priorities, vendor questions and caveats — surfaces a persona + priorities, not a vendor ranking (distinct from Pilot 4)..

| Field | Value |
|---|---|
| Article / URL | `best-ai-receptionists-switzerland-buyers-guide` · https://weissmann.ai/en/ai-academy/agents-automation/best-ai-receptionists-switzerland/ |
| Artifact title | Which AI-receptionist buyer are you? · Weissmann |
| Interaction type | Buyer-persona matcher: five priority questions map the reader to one (or a tie of) the article's four buyer personas, then surface that persona's priorities, vendor questions and caveats — surfaces a persona + priorities, not a vendor ranking (distinct from Pilot 4). |
| Source (repo) | `phase2-artifacts/best-ai-receptionists-switzerland-buyers-guide/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/64016eee-38ec-43b7-bfbf-5ba7da580520 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-phone-assistant/ |
| Integrity | All four personas, their priorities, provider fits and caveats come verbatim in substance from the article JSON's persona sections (cost-conscious founder, compliance-minded ops lead, hotelier with PMS, technical team) plus the language and 'what can go wrong' sections. Provider facts (Weissmann CHF 350/mo no-min-term Starter + CHF 350 one-time trial; Suisse Voice annual plan + CHF 20 no-card trial, never trains on customer data, Zapier/n8n/Make.com/webhooks; NEX-AI from CHF 149/mo cancel monthly; AlpenAgent/HeyPapaya/Alveni no public price; AlpenAgent undisclosed hosting; Alveni Protel/Sihot/ASA Hotel/Mews/apaleo + 100 parallel calls; Alveni 30 / Suisse Voice 17+ language claims) are all stated in the article. Weissmann pricing figures (CHF 350/mo Starter, 1,500 min then CHF 0.30/min, no minimum term; CHF 350 one-time trial; CHF 590 Premium) cross-checked against src/data/pricing.ts (phone-starter, phone-starter-trial, phone-premium). No numbers, vendors, stats or claims were invented; no unrelated website/SEO/Ads pricing introduced. Caveats: Preserves the guide's core 'no single best AI receptionist' framing (shown in lede, intro, dual/tie handling and secondary-lean note); the publisher disclosure (Weissmann publishes the guide and is one of six compared, not the fit for every persona — hotelier persona names Alveni plainly); hosting/dialect/language claims are providers' self-declarations, not independently audited; broad language lists are a starting point for the reader's own test calls, not a quality guarantee; ask for a data-processing agreement and sub-processor list; read package scope like a lease and get contract length/cancellation in writing. Disclaimer states orientation not advice or a quote, and that nothing entered is stored or sent (runs entirely in-browser). No invented claims; no personal data; nothing stored. |

## Pilot 34 — ai-receptionist-swiss-hotels (EN)

Front-desk-crunch simulator: a live crunch stepper that plays out the article's ten-minute 4 p.m. rush, sorting each incoming call or in-person event into one of four lanes (AI absorbs / captured for a human / straight to a human now / stays at the desk), with an optional 'test my read' predict-before-reveal layer, a running tally board, a filling event log, and an end-of-window summary..

| Field | Value |
|---|---|
| Article / URL | `ai-receptionist-swiss-hotels` · https://weissmann.ai/en/ai-academy/agents-automation/ai-receptionist-swiss-hotels/ |
| Artifact title | The Ten-Minute Front-Desk Crunch, Sorted Live · Weissmann |
| Interaction type | Front-desk-crunch simulator: a live crunch stepper that plays out the article's ten-minute 4 p.m. rush, sorting each incoming call or in-person event into one of four lanes (AI absorbs / captured for a human / straight to a human now / stays at the desk), with an optional 'test my read' predict-before-reveal layer, a running tally board, a filling event log, and an end-of-window summary. |
| Source (repo) | `phase2-artifacts/ai-receptionist-swiss-hotels/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/5b2d23ce-2e4c-495c-bfab-63b9f0a099b0 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-phone-assistant/ |
| Integrity | Every event, disposition and rationale is drawn verbatim-in-substance from the article JSON: the 4 p.m. crunch (coach group, courier signature, phone ringing a third time in six minutes); the late-arrival + side-entrance/parking/door-code-by-SMS scenario; the English-to-German mid-sentence switch handled without asking the guest to restart; refund/cancellation of nights already paid captured and flagged urgent for a person; reservation change captured as a structured note (auto-write vs by-hand depends on the hotel's system); the hard emergency boundary for medical, fire/smoke and security with Swiss numbers 144 ambulance / 117 police / 118 fire; a direct request to speak to a person as its own handover trigger; and 'in-person work stays at the desk'. The four lane names and definitions restate the article's 'Where the Line Is', 'Reading the Transcript', 'Peak Season' and 'Why the boundary is the feature' sections. Pricing is the only non-article fact: from pricing.ts — Phone Agent Starter CHF 350/month (1,500 min incl., then CHF 0.30/min, no minimum term, no setup fee) and the one-time CHF 350 trial (no subscription); tied to the article's own 'test it yourself, as a guest would, before committing to a contract' advice. No statistics, conversion rates, vendor names or results were invented. Caveats: Preserved the article's caveats: 'constructed illustration, not a recorded call' and 'not measured data'; the emergency boundary is 'a hard rule, not a configurable preference' (from the FAQ); the right line depends on the rules configured for a specific property; revDSG/nFADP must be taken into account and confirmed with the provider before go-live; and the 'test it yourself in more than one language before signing' guidance. The disclaimer states it is orientation, not a quote or contract, and that nothing is stored or sent (runs entirely in-browser). Pricing labelled 'Orientation only — not a quote'. Assistant explicitly does not diagnose, triage or assess severity. No invented claims; no personal data; nothing stored. |

## Pilot 35 — do-customers-trust-ai-receptionists (EN)

Trust-factor self-score (EN): the reader rates their own AI-receptionist setup against the article's four trust factors — transparency, competence, escape routes and context (voice realism explicitly excluded) — on a Reliably / Partly / Not-yet scale across 12 statements. Output is a per-factor bar profile, a weighted self-rating (Context weighted x2 vs the other three), the weakest factor to fix first, answer-specific red flags, and the article's stranger-test. Mechanic = weighted self-score, not a quiz..

| Field | Value |
|---|---|
| Article / URL | `do-customers-trust-ai-receptionists` · https://weissmann.ai/en/ai-academy/agents-automation/do-customers-trust-ai-receptionists/ |
| Artifact title | AI receptionist trust self-score · Weissmann |
| Interaction type | Trust-factor self-score (EN): the reader rates their own AI-receptionist setup against the article's four trust factors — transparency, competence, escape routes and context (voice realism explicitly excluded) — on a Reliably / Partly / Not-yet scale across 12 statements. Output is a per-factor bar profile, a weighted self-rating (Context weighted x2 vs the other three), the weakest factor to fix first, answer-specific red flags, and the article's stranger-test. Mechanic = weighted self-score, not a quiz. |
| Source (repo) | `phase2-artifacts/do-customers-trust-ai-receptionists/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/47356f0f-c0a2-445b-9e8a-c6e844c97288 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-phone-assistant/ |
| Integrity | Every factor, statement, fix and red flag is drawn only from the article JSON. The four factors and their definitions come verbatim from the 'Four things that actually decide...' section. The per-factor statements paraphrase the article's reinforces/erodes-trust bullets: Transparency (disclose up front not buried; answer a direct 'are you a person?' immediately; re-disclose on transfer/callback; no over-apologising) from the Transparency section; Competence (specific honest limitation statement + hand over vs confident invention; graceful correction; don't force callers to repeat) from the Competence section, including the phone-vs-chatbot authority point; Escape routes (available the whole call, range of natural phrasings not one exact phrase, actually reaches a staffed person in reasonable time) from the Escape-routes section and the 'escalation promised, not delivered' failure mode; Context (name in advance which calls to never automate; hand over on emotional-weight signals like 'I don't know who else to call'; keep a human primary if calls are predominantly grief-adjacent/emotionally weighted) from the Context, route-to-human, and 'not the right first point of contact' sections. The weakest-factor 'fix' texts and the stranger-test steps (call; ask if you're speaking to a person; ask for a human mid-call and time it; describe something outside the script) come from 'The decision that actually matters' and the Escape-routes test. Context is weighted x2 because the article calls it 'the factor that gets skipped, and the one that matters most' and states no tuning of the others compensates for getting it wrong. The only pricing fact used is the article's own CTA / phone-starter-trial from pricing.ts: CHF 350 one-time Starter trial, no subscription, plus Starter CHF 350/month with no minimum term and no setup fee. No statistics, benchmarks, conversion rates, vendor/tool names or claims beyond the article were invented. Caveats: The .disc disclaimer states it is orientation, not advice or a quote; that it aggregates the user's own self-ratings; and preserves the article's own caveat that its readings are 'a reasoned reading of what each approach signals,' not a measured ranking from testing calls at scale — so the score and the x2 weighting are labelled orientation, not a measured score, in the results and the weighting note. The results explicitly warn that a self-score is not the same as a real call and that any AI receptionist (including Weissmann's) should be tested as a stranger would before the score is trusted. The two red flags preserve the article's strongest honest positions: a broken/unstaffed escape route does more damage than no AI receptionist at all, and calls that are predominantly grief-adjacent or emotionally weighted should keep a human as the primary point of contact regardless of how well the AI is built. Voice realism is stated to be deliberately excluded (a threshold to clear, not a factor). Privacy: inputs are transient and in-memory only, nothing is stored or sent; the copy button copies only the user's own generated summary via the clipboard API with an execCommand fallback; placeholder [your business] is used instead of any captured identity. Footer framed as a companion to the guide, orientation not a quote. No invented claims; no personal data; nothing stored. |

## Pilot 36 — assistenti-telefonici-ai-svizzera-pmi-ticinesi (IT)

Market-reach matcher (IT) — reader profiles their callers' languages/reach + hospitality status; a classifier maps them to one of the article's three reach segments (solo Ticino / multilingue / hôtellerie) and highlights the matching providers, per the 'language coverage is the real question' thesis..

| Field | Value |
|---|---|
| Article / URL | `assistenti-telefonici-ai-svizzera-pmi-ticinesi` · https://weissmann.ai/it/ai-academy/agenti-automazione/assistenti-telefonici-ai-svizzera-pmi-ticinesi/ |
| Artifact title | Raggio linguistico: quale segmento fa per i vostri chiamanti · Weissmann |
| Interaction type | Market-reach matcher (IT) — reader profiles their callers' languages/reach + hospitality status; a classifier maps them to one of the article's three reach segments (solo Ticino / multilingue / hôtellerie) and highlights the matching providers, per the 'language coverage is the real question' thesis. |
| Source (repo) | `phase2-artifacts/assistenti-telefonici-ai-svizzera-pmi-ticinesi/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/3f627f7f-62b6-4589-bca2-098608660bc7 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/it/servizi/assistente-telefonico-ai/ |
| Integrity | Segments (solo Ticino / multilingue DE-FR / hôtellerie) and their guidance come verbatim in substance from the article's three situational sections + FAQ. The six-provider reference card is built only from the article's 'un paragrafo onesto ciascuno' bullets and FAQ: Weissmann (CHF 350/590, prova CHF 350, general Swiss German), AlpenAgent (no public price, no data location, 6 sectors), Suisse Voice (17+ langs, named ZH/BS/BE/LU dialects, annual 1200 min, CHF 20 trial, CH hosting, Zapier/n8n/Make/webhook), NEX-AI (from CHF 149/mo monthly-cancellable, 100% CH hosting, Websoft AG/Nexus), HeyPapaya (FR/DE/IT/EN fixed, no price, 30-min consult, 2–4 wk, CH/EU + nLPD, Twilio), Alveni (30+ langs, ZH/BE/BS/Wallis dialects, Protel/Sihot/ASA/Mews/apaleo + FFS PMS, 100 parallel calls). Hosting per-row uses FAQ4's 'five of six declare CH or CH/EU; AlpenAgent does not'. Weissmann phone-assistant figures cross-checked against pricing.ts (Starter CHF 350/mo 1500 min no min term; Premium CHF 590/mo 3500 min 12-month; one-time trial CHF 350). NEX-AI CHF 149 and Suisse Voice figures are the article's provider-cited numbers, presented as such. The six 'questions to ask' come from the article's 'Cosa non pubblica' + 'Cosa può andare storto' sections. No statistics, recognition rates, or provider claims were invented. Caveats: Preserved the article's core honesty: (1) Weissmann is itself one of the six providers and the guide's publisher — stated in attribution and Note field. (2) For hôtellerie with an existing PMS, the article names a competitor (Alveni) as clearly more suitable — the tool says so plainly rather than steering to Weissmann. (3) All language/hosting claims — including Weissmann's — are provider self-declarations, not independently tested; surfaced in the multilingue caveat box and the global disclaimer. (4) No independently verified recognition rate exists for Ticinese Italian — verify with real trial calls. (5) Three of six publish no public price; comparison stays incomplete until a concrete offer. (6) Data as of 29.07.2026. (7) Orientation, not advice or a quote; nothing stored or sent — all in-memory, no storage/network APIs. No invented claims; no personal data; nothing stored. |

## Pilot 37 — registrazione-chiamate-ai-legalita-svizzera (IT)

Recording-legality decision tree (IT): call attributes (who + call content + intended purpose) branch to a colour-coded verdict with the exact StGB/CP citation, plus an in-page consent-announcement builder for the consent-required leaves..

| Field | Value |
|---|---|
| Article / URL | `registrazione-chiamate-ai-legalita-svizzera` · https://weissmann.ai/it/ai-academy/agenti-automazione/registrazione-chiamate-ai-legalita-svizzera/ |
| Artifact title | Registrare le telefonate AI: albero decisionale · Weissmann |
| Interaction type | Recording-legality decision tree (IT): call attributes (who + call content + intended purpose) branch to a colour-coded verdict with the exact StGB/CP citation, plus an in-page consent-announcement builder for the consent-required leaves. |
| Source (repo) | `phase2-artifacts/registrazione-chiamate-ai-legalita-svizzera/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/398345d2-3dcb-484a-8dfc-c708d64b012f |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/it/servizi/assistente-telefonico-ai/ |
| Integrity | Every branch, verdict, citation and note is taken directly from the article JSON: base rule art. 179bis/179ter CP (crime, querela di parte, penalties up to 1 year / up to 3 years, judge may order destruction of the recording and seizure of devices); the exception art. 179quinquies CP (in force since March 2004) for orders/mandates/reservations/analogous operations, proof-purpose only; the six Ticino examples mapped to the tree leaves (hotel reservation = green, restaurant reservation = green, quote request = yellow/dubbio, complaint = red, employee call = caso a parte, medical appointment = red with nLPD health-data note); the 'registrare non è conservare' distinction (penal vs nLPD) as the purpose branch; and the 'avviso che funziona' three-part notice with the article's weak vs better examples as the consent-announcement builder. No pricing figure was used — the article is about legality, not price, so injecting a CHF figure would be off-topic; pricing.ts was read only to confirm the phone-assistant product identity behind the service link. No statistics, tool names, or legal claims beyond the article were invented. Caveats: Preserves the article's core disclaimer 'Non è consulenza legale' verbatim in the lede, in the verdicts, and in the .disc block, plus the article's specific caveats: not a substitute for legal advice in the individual case, especially for labour-law questions or calls whose content is not clearly classifiable; the exception covers only the commercial operation (proof purpose), and changing purpose exits the exception with the same penal consequences; nLPD governs retention after a lawful recording; employee calls need specific legal advice, not analogy. Sources (IFPDT; Codice penale svizzero art. 179bis–179quinquies, Fedlex) are attributed as plain text (not links) to keep exactly two footer anchors. Nothing is stored or sent — all inputs are transient and in-memory; the announcement builder uses [nome azienda] as a placeholder, never captured identity. No invented claims; no personal data; nothing stored. |

## Pilot 38 — test-comprensione-italiano-ticinese-ai (IT)

Tailored Ticinese test-script generator: user builds a scenario (cadence/loan-word start + name + Swiss CAP + mid-call language switch + realistic noise), the tool assembles a ready-to-read copione plus a printable/copyable protocol, then scores each moment (Continuità 2 / Recupero 1 / Rottura 0) and returns a frequency-weighted priority verdict (priority-matrix logic, not a scholastic average)..

| Field | Value |
|---|---|
| Article / URL | `test-comprensione-italiano-ticinese-ai` · https://weissmann.ai/it/ai-academy/agenti-automazione/assistente-ai-italiano-ticinese-cambio-lingua/ |
| Artifact title | Generatore di copioni di test — italiano ticinese · Weissmann |
| Interaction type | Tailored Ticinese test-script generator: user builds a scenario (cadence/loan-word start + name + Swiss CAP + mid-call language switch + realistic noise), the tool assembles a ready-to-read copione plus a printable/copyable protocol, then scores each moment (Continuità 2 / Recupero 1 / Rottura 0) and returns a frequency-weighted priority verdict (priority-matrix logic, not a scholastic average). |
| Source (repo) | `phase2-artifacts/test-comprensione-italiano-ticinese-ai/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/e9b778e4-e799-4350-989a-ae6492cc10ad |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/it/servizi/assistente-telefonico-ai/ |
| Integrity | Every option and label comes verbatim from the article JSON: the six test conditions (cadenza/ritmo ticinese, prestiti DE/FR nel linguaggio commerciale, nomi propri, indirizzi/CAP svizzeri, cambio di lingua a metà chiamata, rumore di fondo); loan words Krankenkasse / SBB (alla tedesca) / vernissage; names Bianchetti, Pedrazzini, Zanetti, Schmidt, O'Brien; CAPs 6900 Lugano, 6500 Bellinzona, 6600 Locarno, 6830 Chiasso; switch targets tedesco/francese/inglese with the article's three motivi; noise contexts (reception weekend Locarno Film Festival, officina/cantiere, viavai studio orari di punta, sala d'attesa); speaker types (madrelingua naturale, non-madrelingua DE/FR con accento, cliente lombardo); the 3-outcome scale with exact point values and definitions; the priority-matrix logic (molto frequente + Rottura before raro). The 'combina almeno tre elementi' rule and the two concrete example scenarios shape the copione builder. Pricing: only the article-relevant figure — CHF 350 one-time trial (phone-starter-trial from pricing.ts, no subscription) — is mentioned, matching the article's CTA. No invented street names, stats, phrases in foreign languages, tools, or legal claims; the switch is left as a natural-improvisation stage direction, not a scripted sentence. Caveats: Preserved: ticinese is NOT a separate dialect like Swiss German (grammar/lexis stay standard Italian); a single successful call is not proof — repeat each scenario at least twice with two different natural speakers; the only valid test is the one played on your own real number; the silent demo studio is exactly what NOT to reproduce; use only invented data or data from consenting colleagues, never a non-consenting person's information; test cadence and language-switch together, not in isolation; 'when this test is not the priority' is honored via the 'nessun cambio' option that drops the switch moment. Disclaimer states orientation not a quote/advice and that nothing is stored or sent. No storage, no network, no external resources; clipboard copies only the user's own generated protocol; window.print() for the printable protocol. No invented claims; no personal data; nothing stored. |

## Pilot 39 — website-kosten-schweiz (DE)

Cost-component band estimator (Bausteine-Rechner): user selects scope components (page count, languages, design, copywriting, functions, ongoing) and the tool maps them to the article's three real Weissmann price tiers plus the article's verbal orientation bands, generating a copyable offer-comparison basis. No fabricated per-component CHF precision..

| Field | Value |
|---|---|
| Article / URL | `website-kosten-schweiz` · https://weissmann.ai/ki-academy/marketing-seo-geo/website-kosten-schweiz/ |
| Artifact title | Website-Kosten aus Bausteinen · Weissmann |
| Interaction type | Cost-component band estimator (Bausteine-Rechner): user selects scope components (page count, languages, design, copywriting, functions, ongoing) and the tool maps them to the article's three real Weissmann price tiers plus the article's verbal orientation bands, generating a copyable offer-comparison basis. No fabricated per-component CHF precision. |
| Source (repo) | `phase2-artifacts/website-kosten-schweiz/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/ed893071-bbbb-4b01-85d6-9de0943f250e |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-webentwicklung/ |
| Integrity | All CHF anchors are the article's/pricing.ts three real tiers: Starter CHF 880 promo (regular CHF 2'490), Business CHF 4'990, Individuelle/Complex ab CHF 9'900. The ten Bausteine, the tier scope definitions (up to 5 pages/1 lang/2 revision rounds; 10-20 pages multilingual conversion architecture; large multilingual + e-commerce/integrations), and the three verbal bands ('unteren bis mittleren vierstelligen Bereich', 'typischerweise deutlich darüber', 'sprengt diese Grössenordnungen meist nach oben') are quoted/paraphrased verbatim from the article. The 11 offer-checklist questions and per-component cost-nature notes (copywriting excluded from Starter, each language multiplies effort, shop workload, template vs custom design, 3-year running cost) all come directly from the article. No per-component CHF numbers were invented because the article gives none. Pricing confirmed against src/data/pricing.ts (website-starter price 880 / regularPrice 2490; website-business 4990; website-complex from 9900). Caveats: Preserved the article's central 'keine ehrliche Pauschalzahl' point as a persistent warning banner and disclaimer. Preserved verbatim the caveat that Weissmann's tiers are 'ein reales Beispiel eines einzelnen Schweizer Anbieters, kein Marktdurchschnitt' and that serious comparisons require several self-obtained offers. Output is labelled orientation/Grössenordnung, explicitly not a price or offer. No fabricated statistics or per-component prices. Nothing stored or sent; all inputs stay in-browser; clipboard copy is of the user's own generated text only. No invented claims; no personal data; nothing stored. |

## Pilot 40 — chf-880-website-schweiz (DE)

Scope-fit tier classifier (Starter / Business / Individuell).

| Field | Value |
|---|---|
| Article / URL | `chf-880-website-schweiz` · https://weissmann.ai/ki-academy/marketing-seo-geo/guenstige-website-schweiz-chf-880/ |
| Artifact title | Passt Ihr Projekt in den Starter? · Weissmann |
| Interaction type | Scope-fit tier classifier (Starter / Business / Individuell) |
| Source (repo) | `phase2-artifacts/chf-880-website-schweiz/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/bfba0f01-1268-4344-ad53-cb33b248d26a |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-webentwicklung/ |
| Integrity | A requirements checklist classifies the user's project into one of three website tiers. Every fact is grounded in the article JSON (chf-880-website-schweiz.json) and confirmed against pricing.ts. Starter perimeter (in/not-in lists) verbatim from the article's 'Genau das ist im Starter-Paket enthalten' / 'ausdrücklich NICHT enthalten' / 'Drei weitere Grenzen' sections and pricing.ts website-starter features/disclosures: up to 5 core pages, responsive, contact/lead form, technical SEO+GEO foundation, GA4+Search Console set up, basic structured data, performance optimization, security headers, Netlify deployment, 1 language, 2 revision rounds; excludes copywriting, further languages, paid third-party tools, page 6, third revision round, e-commerce/booking/CRM/member areas. Prices verbatim: Starter CHF 880 promo / regular CHF 2'490 one-time (pricing.ts price 880, regularPrice 2490, interval once); Business CHF 4'990; Complex from CHF 9'900. Business tier triggers (>5 pages, >1 language, blog/knowledge section, booking/CRM form) and its description (approx. 10-20 pages, multilingual-ready, blog/knowledge, advanced forms with booking/CRM, GA4 conversion tracking, 3 revision rounds) taken from the 'Wann Sie ein grösseres Paket brauchen' section and pricing.ts website-business features. Complex tier triggers (e-commerce/payment, login/member area/dashboard, custom app/API/CRM integration/AI workflow, large multilingual architecture/interactive tools) and its 'price by scope, consultation not direct checkout' framing from the same section and pricing.ts website-complex. No invented statistics, conversion rates, percentages, or vendor names. No discount percentage is computed (article explicitly declines to). No promo end-date/countdown (article's FAQ declines to state one). Caveats: Preserves the article's core honesty stance: CHF 880 is the price for a defined scope, not for every project. No discount-percentage sales framing (two real numbers, not a rounded %). No promo end-date, 'remaining slots' or countdown. The technical SEO/GEO foundation improves starting conditions but is explicitly not a ranking or AI-citation guarantee. Copywriting is not included in any fixed price. The tool states it is orientation, not a binding quote, and directs to weissmann.ai/preise/ for the binding price. Nothing is stored or sent; inputs are transient and in-memory only (clipboard copies only the user's own generated summary). No invented claims; no personal data; nothing stored. |

## Pilot 41 — website-agentur-freelancer-baukasten-ki (DE)

Route-recommender quiz — six project variables score four routes (Agentur / Freelancer / Baukasten / KI-Tool) with reasoning.

| Field | Value |
|---|---|
| Article / URL | `website-agentur-freelancer-baukasten-ki` · https://weissmann.ai/ki-academy/marketing-seo-geo/webagentur-freelancer-baukasten-oder-ki/ |
| Artifact title | Routen-Finder: Wer baut Ihre Website? · Weissmann |
| Interaction type | Route-recommender quiz — six project variables score four routes (Agentur / Freelancer / Baukasten / KI-Tool) with reasoning |
| Source (repo) | `phase2-artifacts/website-agentur-freelancer-baukasten-ki/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/9a173149-ad2f-474b-8421-4109b2dbcba9 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-webentwicklung/ |
| Integrity | All six questions, their options, help texts, route descriptions, 'wann richtig', Stolperfallen and Gegenmittel are taken verbatim in substance from the article JSON (sections 'Woran die Entscheidung wirklich hängt', 'Die vier Routen', the four 'Wann …' sections, and 'Wo jede Route typischerweise stolpert'). The scoring weights were tuned so the article's three worked examples resolve correctly — Nagelstudio→Baukasten, Treuhandbüro→Freelancer, Hotelgruppe→Agentur — verified in Node; a fourth (KI-niche) resolves to KI-Tool as a close call, matching the article's framing of KI as a fast first draft. The opening 'Offenlegung' pointe (every advisor earns on one answer; Weissmann earns on the Agentur route) is reproduced at the top. Pricing shown only in the Agentur result — CHF 880 promo (regular CHF 2'490), Business CHF 4'990, Complex ab CHF 9'900 — matches pricing.ts and the article's own pricing paragraph. No invented statistics, tools, vendors, conversion rates or benchmarks. Caveats: Kept the article's self-interest disclosure ('Weissmann AI verdient an der Agentur-Route') and made the tool state it 'rechnet gegen das eigene Interesse'. Kept the KI-Website-Generator vs. KI-Webentwicklungsagentur distinction, the 'menschliche Prüfrunde bei rechtlich relevanten Seiten' warning (Impressum/Datenschutz), the Freelancer 'Single Point of Failure' caveat, the Baukasten migration/abo caveat, and 'ein Routenwechsel später ist kein Scheitern'. Result is framed as Orientierung, not advice or a binding offer; the point score is labelled an Entscheidungshilfe, not a metric with external meaning. Disclaimer states nothing is stored or sent; inputs stay in-browser. No localStorage/sessionStorage/fetch/external assets; clipboard copies only the user's own generated summary. No invented claims; no personal data; nothing stored. |

## Pilot 42 — wix-wordpress-webflow-individuell (DE)

Platform-fit matcher (DE): user states six requirements (ownership/portability, performance, editability, security/maintenance, multilingual SEO, cost horizon), each factor optionally weighted x2; the tool scores all four platform categories (Baukasten/Wix, WordPress.org, Webflow, individuelle Entwicklung) per requirement and ranks fit live. Mechanic is a requirements-to-platform matcher, distinct from B-DE-04 (build-route recommender)..

| Field | Value |
|---|---|
| Article / URL | `wix-wordpress-webflow-individuell` · https://weissmann.ai/ki-academy/marketing-seo-geo/wix-wordpress-webflow-oder-individuelle-website/ |
| Artifact title | Plattform-Passung: Wix, WordPress, Webflow oder individuell? · Weissmann |
| Interaction type | Platform-fit matcher (DE): user states six requirements (ownership/portability, performance, editability, security/maintenance, multilingual SEO, cost horizon), each factor optionally weighted x2; the tool scores all four platform categories (Baukasten/Wix, WordPress.org, Webflow, individuelle Entwicklung) per requirement and ranks fit live. Mechanic is a requirements-to-platform matcher, distinct from B-DE-04 (build-route recommender). |
| Source (repo) | `phase2-artifacts/wix-wordpress-webflow-individuell/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/b1af2c7f-07b8-4a3e-8be8-a29bae77dffe |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-webentwicklung/ |
| Integrity | Every factor, option note and fit level comes verbatim in substance from the article's six-factor sections and its per-category descriptions (Eigentum/Portabilitaet, Performance, Bearbeitbarkeit, Sicherheit/Wartung, mehrsprachiges SEO, Gesamtkosten), plus the 'when a Baukasten like Wix is right' and 'what can go wrong' sections and the FAQ. Wix export limits (CSV only, no design/code export = rebuild not migration), WordPress.org vs .com distinction, Webflow code export excludes CMS content, individuell needs documentation + explicitly commissioned editing system, WordPress maintenance as documented hack cause, Astro+Netlify as Weissmann's own disciplined-individuell example: all article-sourced. Pricing note (Website Starter CHF 880 promo, regular CHF 2'490; excludes copywriting/extra languages/paid third-party tools) taken only from pricing.ts website-starter record, the one product matching this article's service (ki-webentwicklung / individuelle Entwicklung). No numbers, benchmarks, conversion rates or vendor names invented beyond the article. Caveats: Preserves the article's core thesis 'es gibt keine beste Plattform, nur eine, die passt' and refuses to prescribe (mirrors article deliberately not revealing Sandra's choice). Kept caveats: WordPress = self-hosted WordPress.org not WordPress.com; Webflow conditions/localization/CMS limits change over time -> check current price list; 'individuell' does not auto-fix a bad language/editing/maintenance concept and must be explicitly ordered/documented; upper bound is not a result (performance); provider-dependency trade-off for centrally-maintained platforms. Weissmann-honesty note from FAQ preserved: a Baukasten/other-system result is legitimate even though it isn't Weissmann's offer. Framed throughout as Orientierung, kein Angebot/keine Beratung. No storage/network: inputs stay local in-browser, nothing saved or sent; only clipboard copy of the user's own generated summary. No invented claims; no personal data; nothing stored. |

## Pilot 43 — website-seo-im-preis-enthalten (DE)

Quote-inclusion scanner (itemised inclusion scan of a website quote against the article's 10-point technical-SEO baseline).

| Field | Value |
|---|---|
| Article / URL | `website-seo-im-preis-enthalten` · https://weissmann.ai/ki-academy/marketing-seo-geo/website-seo-im-preis-enthalten/ |
| Artifact title | Offerten-Check: SEO im Website-Preis · Weissmann |
| Interaction type | Quote-inclusion scanner (itemised inclusion scan of a website quote against the article's 10-point technical-SEO baseline) |
| Source (repo) | `phase2-artifacts/website-seo-im-preis-enthalten/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/04ab8592-d755-4ddc-9e49-a2fb8c1d8a62 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-webentwicklung/ |
| Integrity | All 10 checklist items are the exact technical-SEO foundation bullets from the article section 'Das technische SEO-Fundament: zehn Punkte' (Crawlbarkeit/robots.txt/noindex, individuelle Seitentitel+Meta, Canonical, XML-Sitemap erstellt UND eingereicht, strukturierte Daten schema.org, interne Verlinkung, Core Web Vitals, mobile-first, HTTPS/URL, GA4+Search Console). Each item's 'Fragen'-hint is drawn verbatim from the article's 'Fragen vor der Unterschrift' list or the 'Was kann schiefgehen' prevention notes. The three verdict states map exactly to the article's three '«inklusive»'-Varianten (ehrliches inklusive / inklusive mit Lücken / Warnsignal for zero named) plus the Variante-3 'ein Wort, zwei Rechnungen' framing used in the ongoing-SEO gate. The crawl special note quotes the article ('Ohne diesen Punkt ist jeder andere bedeutungslos'). The 6 ongoing-SEO items are the article's 'NICHT in einen einmaligen Website-Preis' bullets (Content-Produktion, Backlink-Aufbau, laufende Optimierung, monatliches Reporting, lokale Signale, Konkurrenzbeobachtung). The Starter reference card figures (CHF 880 promo, regular CHF 2'490, one-time; included: technisches SEO-/GEO-Fundament, GA4+Search Console, Basis-Strukturdaten, Performance/Security-Header, bis 5 Kernseiten, 1 Sprache, 2 Korrekturrunden; excluded: Texterstellung, weitere Sprachen, kostenpflichtige Drittanbieter-Tools, laufende SEO-Betreuung) come from pricing.ts (website-starter package) and match the article's 'Ein konkretes Beispiel' section. No statistics, conversion rates, tool names or claims were invented beyond article + pricing.ts. Caveats: Disclaimer states it is orientation only, not legal or purchase advice and not a quote; nothing is stored, sent or evaluated (in-memory only). Preserves the article's own caveat that a technical foundation alone does not guarantee ranking, that ongoing SEO is a legitimate separate recurring service (not a bundled extra), and the article's note that the Starter example is 'kein Aufruf, sich für dieses eine Paket zu entscheiden'. Placeholders [Ihr Unternehmen] / [Anbieter] used; no personal data collected. Copy-to-clipboard outputs only the user's own generated checklist text. No invented claims; no personal data; nothing stored. |

## Pilot 44 — website-versteckte-kosten-drei-jahre (DE)

3-year TCO (Total Cost of Ownership) calculator: user enters own amounts for the article's cost drivers with a frequency (once / per year x3 / per month x36) over a fixed 36-month window; outputs quote price, costs beyond the quote over 3 years, and total TCO plus the quote's share..

| Field | Value |
|---|---|
| Article / URL | `website-versteckte-kosten-drei-jahre` · https://weissmann.ai/ki-academy/marketing-seo-geo/website-versteckte-kosten-drei-jahre/ |
| Artifact title | Drei-Jahres-Kostenrechner für Websites · Weissmann |
| Interaction type | 3-year TCO (Total Cost of Ownership) calculator: user enters own amounts for the article's cost drivers with a frequency (once / per year x3 / per month x36) over a fixed 36-month window; outputs quote price, costs beyond the quote over 3 years, and total TCO plus the quote's share. |
| Source (repo) | `phase2-artifacts/website-versteckte-kosten-drei-jahre/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/97fcc30e-276a-4248-ad74-23e6972426ba |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-webentwicklung/ |
| Integrity | All calculator positions come verbatim-in-substance from the article's nine hidden cost-driver bullets plus the Startpreis/Angebotspreis (section 'Die versteckten Kostentreiber'): Domain & Hosting-Verlängerung, Baukasten-Abogebühr, Plugin-/Erweiterungslizenzen, Sicherheitsupdates & Wartung, Redesign/Auffrischung, Content-Pflege über den Anbieter, Migration bei Anbieterwechsel, Drittanbieter-Tools mit eigenem Abo, ungeplanter Support nach Stundensatz. Row descriptions paraphrase those bullets. The 36-month window is the article's stated Betrachtungszeitraum. The three static example scenarios (A CHF 1'590, B CHF 2'390, C CHF 3'940) with their year-by-year lines are copied verbatim from the article's Szenario A/B/C sections and labelled as illustration, not statistics. Core Web Vitals note is from the article's performance/conversion section. The Weissmann orientation note (Starter regular CHF 2'490, promo CHF 880; no bundled multi-year maintenance package) matches both the article and pricing.ts (website-starter: price 880, regularPrice 2490, one-time; disclosures: copywriting/extra languages/paid third-party tools excluded). No amounts are pre-filled in the calculator; the user supplies every figure. No invented statistics, conversion rates, benchmarks, or vendor names. Caveats: Preserves the article's core caveats: example scenarios are explicitly flagged 'Illustration der Mechanik, keine Marktstatistik, keine Herstellerangaben'; there is no reliable Swiss 'average' website cost to quote; the user's own time (Eigenleistung) is real but deliberately not counted as an invented hourly rate; lost enquiries from poor performance/conversion (Core Web Vitals) are deliberately not quantified in CHF because a single franc figure would fake a precision that does not exist; a cheap website can still be the right choice (four honest exceptions listed); a one-time build price is not a multi-year maintenance contract; the winner depends on usage duration, upkeep effort and code/content ownership (vendor lock-in). Disclaimer states orientation not advice/quote, inputs stay in-tab, nothing stored or sent. Aria-live outputs; every input labelled; Swiss spelling (ss, no ß). No invented claims; no personal data; nothing stored. |

## Pilot 45 — business-website-cost-switzerland (EN)

Like-for-like quote normaliser: toggle what each of two quotes includes across the article's 13 scope questions, normalise both CHF figures onto the same VAT basis, and generate a follow-up asking each provider for its own missing items..

| Field | Value |
|---|---|
| Article / URL | `business-website-cost-switzerland` · https://weissmann.ai/en/ai-academy/marketing-seo-geo/business-website-cost-switzerland/ |
| Artifact title | Swiss Website Quote Normaliser |
| Interaction type | Like-for-like quote normaliser: toggle what each of two quotes includes across the article's 13 scope questions, normalise both CHF figures onto the same VAT basis, and generate a follow-up asking each provider for its own missing items. |
| Source (repo) | `phase2-artifacts/business-website-cost-switzerland/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/c664e17e-c939-4fa5-b919-b01c2efcc230 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-web-development/ |
| Integrity | Every scope dimension is one of the article's thirteen questions (verbatim short forms of bullets 1-13 in 'The Method' section); VAT is question 13, handled as the net/gross figure adjustment. VAT rate 8.1% and the net/gross convention come from the article ('What Counts as Normal Here'). The tenfold-gap framing and the CHF 1'650 / CHF 17'400 illustrative figures are the article's own opening scenario, used only as placeholder text, never hard-coded as inputs (user supplies figures). The three published reference tiers (Starter CHF 880 promo / CHF 2'490 regular, Business CHF 4'990, Complex from CHF 9'900) come from the article's 'One Published Reference Point' section and are confirmed against pricing.ts. The 'Load Weissmann Starter into Quote B' preset maps the Starter Website scope to tri-state values strictly from pricing.ts (pages up to 5 = Included, copywriting = Excluded per disclosure, design bespoke = Included, 1 language = Included, 2 revisions = Included, technical SEO+GEO = Included, GA4+Search Console = Included, Netlify hosting = Included; ownership, timeline and post-launch support = Not stated because pricing.ts does not state them; integrations = Excluded as Starter excludes paid third-party tools). Distinct from DE sibling B-DE-01: this normalises scope so two quotes compare like-for-like plus a VAT-basis normalisation, rather than breaking down a single price's anatomy. Caveats: Disclaimer preserves the article's caveats: no single verified Swiss website figure exists; the CHF 1'650 / CHF 17'400 quotes and the two illustrative quotes are constructed illustrations, not real proposals; the reference tiers are one provider's published example, not a market average; VAT is 8.1% 'at the time of writing' and the net/gross adjustment is an estimate to confirm in writing; not legal or tax advice. Tool states plainly it is orientation not a quote or advice, judges no provider, and that all inputs stay in-browser with nothing stored, sent or shared. Result copy avoids implying a cheaper quote is worse (echoes FAQ: the problem is a low price implying a scope it will not deliver, and gaps are unanswered questions, not fraud). No invented claims; no personal data; nothing stored. |

## Pilot 46 — chf-880-website-affordable-premium (EN)

Inclusion map explorer: 22 website elements sorted into included-in-CHF-880 / separately-quoted-add-on / points-to-larger-package, each revealing its exact scope line, plus a requirement builder that verdicts the user's selection against the Starter scope.

| Field | Value |
|---|---|
| Article / URL | `chf-880-website-affordable-premium` · https://weissmann.ai/en/ai-academy/marketing-seo-geo/affordable-premium-website-chf-880/ |
| Artifact title | What CHF 880 Includes — Inclusion Explorer · Weissmann |
| Interaction type | Inclusion map explorer: 22 website elements sorted into included-in-CHF-880 / separately-quoted-add-on / points-to-larger-package, each revealing its exact scope line, plus a requirement builder that verdicts the user's selection against the Starter scope |
| Source (repo) | `phase2-artifacts/chf-880-website-affordable-premium/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/380d88b1-408a-41e7-b234-dbd723940d62 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-web-development/ |
| Integrity | All 22 elements grounded strictly in the article JSON (chf-880-website-affordable-premium.json) and src/data/pricing.ts. Included tiles carry the six verbatim website-starter feature bullets from pricing.ts as scope lines; add-on tiles carry the verbatim exclusion disclosure 'Copywriting, additional languages and paid third-party tools are not included' plus the article's exclusion paragraphs; larger-tier tiles carry verbatim Business (CHF 4,990) and Complex (from CHF 9,900) feature lines. Prices CHF 2,490 / CHF 880 / CHF 4,990 / from CHF 9,900 all match pricing.ts and article; CHF 1,610 difference is the exact franc arithmetic (2490-880), not a rounded percentage. Notes paraphrase the article sections 'What These Six Lines Actually Change', 'What Is Explicitly Not Included', 'Three More Boundaries', and the FAQ (e-commerce/login -> Complex). No invented numbers, tools, or claims. Caveats: Preserves the article's deliberate refusal to frame the promo as a rounded percentage or countdown (shows two real prices + exact franc figure, no end date). Keeps 'does not guarantee a ranking / AI citation' on the SEO+GEO foundation. States one-time fixed fee, not a subscription. Verdict language mirrors 'The One Decision That Actually Matters' — start in the larger category honestly rather than shrinking scope to fit CHF 880. Disclaimer: orientation not a quote/advice, nothing saved/sent/tracked, defers binding figures to weissmann.ai/en/preise/. No data collection; clipboard copy is the user's own generated checklist only. No invented claims; no personal data; nothing stored. |

## Pilot 47 — best-web-design-agencies-switzerland (EN)

Agency due-diligence tracker (staged due-diligence scorecard): the user rates ONE candidate agency across the article's four due-diligence stages (initial call, written proposal, reference check, contract review) using the article's 12 verbatim questions as checkpoints, logs the answer they actually got as clear/vague/evasive plus a free-text note, and gets a live readiness read that tallies their own inputs and surfaces the article's guidance. Distinct from B-DE (question/interview-script generator): this captures and scores answers and outputs a readiness read + copyable record, rather than generating a take-away question script..

| Field | Value |
|---|---|
| Article / URL | `best-web-design-agencies-switzerland` · https://weissmann.ai/en/ai-academy/marketing-seo-geo/best-web-design-agencies-switzerland/ |
| Artifact title | Web design agency due-diligence tracker · Weissmann |
| Interaction type | Agency due-diligence tracker (staged due-diligence scorecard): the user rates ONE candidate agency across the article's four due-diligence stages (initial call, written proposal, reference check, contract review) using the article's 12 verbatim questions as checkpoints, logs the answer they actually got as clear/vague/evasive plus a free-text note, and gets a live readiness read that tallies their own inputs and surfaces the article's guidance. Distinct from B-DE (question/interview-script generator): this captures and scores answers and outputs a readiness read + copyable record, rather than generating a take-away question script. |
| Source (repo) | `phase2-artifacts/best-web-design-agencies-switzerland/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/a322998c-9ece-4ca5-b346-804efb05e3b1 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-web-development/ |
| Integrity | Every string is grounded in best-web-design-agencies-switzerland.json. The four stage names and one-line blurbs are the article's 'Four moments, not one first impression' bullets. All 12 checkpoint questions are copied verbatim from the 'Questions worth asking at each stage' list, kept in the article's stage order (3 per stage). Each checkpoint's strong/red-flag hint is a faithful condensation of that stage's narrative paragraphs (e.g. Stage 1 mockup-first red flag; Stage 2 itemised 'SEO included' = page structure/metadata/sitemap/structured data; Stage 3 PageSpeed self-test and the six-months-after-launch change question; Stage 4 which accounts transfer + FADP DPA). The six inline 'Article note' lines reproduce the article's own honest self-disclosures about Weissmann (process before code; packages list exclusions in writing; no published case studies yet; Astro/Netlify pre-rendered stack testable via weissmann.ai; un-itemised 'handover' gap; billed once not a subscription). The solo/team continuity note is from the 'single point of contact who disappears' scenario and FAQ 6. The reference-check + contract priority tip is from FAQ 1; the ownership 'cost deferred' line is from FAQ 4. Only ONE pricing figure is surfaced, and only in Weissmann article-notes tied to Stage 2 exclusions and Stage 4 one-time billing: Website Starter CHF 880 promotion, regular CHF 2'490, one-time, from pricing.ts. No thresholds, benchmarks, conversion rates, competitor names, results or claims were invented; the readiness read only counts the user's own ratings and never issues a verdict or a numeric score. Caveats: Preserves the article's lead disclosure verbatim in intent: Weissmann builds websites and has a commercial interest, does not name or rank competing agencies, and does not automatically favour itself (shown as an on-page disclosure banner and repeated in the disclaimer). Keeps the article's own honest gap (Weissmann has no published customer case studies yet — an honest 'not yet', not automatically disqualifying for any young agency). Names the revised Swiss FADP data-processing agreement only where the article does (Stage 4 / Q12). Names Google PageSpeed Insights as the free self-test tool. The readiness read explicitly refuses to make the decision ('it still does not tell you to hire them') and mirrors the article's 'apply it to the proposals in your inbox / compare only once every stage is complete'. Disclaimer states: orientation, not advice or a quote, and not legal advice; scores nothing on its own (ratings and notes are the user's); the copy/export is the user's OWN generated text; nothing is stored, sent or shared, inputs stay in the page only; placeholder identity only ([candidate agency]). English copy; titles end with ' · Weissmann'. No invented claims; no personal data; nothing stored. |

## Pilot 48 — small-business-website-checklist-switzerland (EN)

Pre-quote brief builder — reader fills the eight brief fields the article lists across audience, offer, calls to action, legal pages, reviews/proof, tracking, local details and content ownership; the tool assembles a copyable plain-text project brief to hand to any agency or freelancer, plus an optional scope snapshot. Mechanic = brief generator (no scoring, no quiz)..

| Field | Value |
|---|---|
| Article / URL | `small-business-website-checklist-switzerland` · https://weissmann.ai/en/ai-academy/marketing-seo-geo/small-business-website-checklist/ |
| Artifact title | Pre-Quote Website Brief Builder · Weissmann |
| Interaction type | Pre-quote brief builder — reader fills the eight brief fields the article lists across audience, offer, calls to action, legal pages, reviews/proof, tracking, local details and content ownership; the tool assembles a copyable plain-text project brief to hand to any agency or freelancer, plus an optional scope snapshot. Mechanic = brief generator (no scoring, no quiz). |
| Source (repo) | `phase2-artifacts/small-business-website-checklist-switzerland/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/7e52749c-00c8-40e5-b6ab-94cef21b3111 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-web-development/ |
| Integrity | Every section title, helper line, and field prompt is drawn verbatim/paraphrased from the article's eight brief sections and their bullets. Legal note restates the article's UWG/Impressum + Swiss data-protection privacy-notice paragraph and cites its source (UWG, SR 241, Art. 3). The only numbers are the Starter Website scope facts the article itself states (up to five core pages, one language, two revision rounds, CHF 880 promotional vs regular CHF 2,490), used only in the optional scope snapshot readout; these match pricing.ts (website-starter: price 880, regularPrice 2490). No invented statistics, conversion rates, vendor/tool names, or legal claims beyond the article. GA4/Search Console named because the article names them. Caveats: Preserves the article's caveats: not detailed legal advice, confirm details with a Swiss lawyer or trust adviser (especially multi-owner companies); the Impressum obligation is a genuine requirement stated simply; 'none of this requires working with Weissmann specifically.' Disclaimer states it is orientation not advice and not a quote, does not check compliance or price a project, and that nothing is stored, sent or shared. Empty fields render as '— not yet decided' so the brief honestly surfaces remaining decisions rather than inventing answers. Scope readout is labelled 'orientation from the guide, not a quote.' No personal data collection: inputs are transient, in-memory only, cleared by the Clear button; clipboard copies only the user's own generated text. No invented claims; no personal data; nothing stored. |

## Pilot 49 — multilingual-website-switzerland-seo (EN)

Multilingual URL & hreflang structure planner/configurator: reader picks languages + a default locale, a URL pattern (subfolder / subdomain / separate domain / query param), and a localized slug per language, then gets recommended per-locale URLs, a live reciprocal hreflang + self-canonical <head> preview (copyable), and a context-driven watch-outs list..

| Field | Value |
|---|---|
| Article / URL | `multilingual-website-switzerland-seo` · https://weissmann.ai/en/ai-academy/marketing-seo-geo/multilingual-website-switzerland-seo/ |
| Artifact title | Multilingual URL & hreflang Planner · Weissmann |
| Interaction type | Multilingual URL & hreflang structure planner/configurator: reader picks languages + a default locale, a URL pattern (subfolder / subdomain / separate domain / query param), and a localized slug per language, then gets recommended per-locale URLs, a live reciprocal hreflang + self-canonical <head> preview (copyable), and a context-driven watch-outs list. |
| Source (repo) | `phase2-artifacts/multilingual-website-switzerland-seo/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/8261b2f4-bd64-4730-9634-ab10fb2017a1 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-web-development/ |
| Integrity | All mechanics and copy come from the article JSON: the four URL patterns and their verdicts (separate country domains, subdomains, locale-prefixed subfolders as the recommended default, query parameters as the one to avoid); reciprocal hreflang ('ignored if two pages don't both point to each other'), self-referencing canonicals never pointing back to the default, and x-default as a fallback not a ranking signal; de-CH under BCP 47 for Swiss High German (ss not ß) while en/it/fr use plain codes with the optional Swiss-variant caveat; the 'aus einer Hand' -> 'one team handles the whole project' localization example; the What-Can-Go-Wrong pitfalls (non-reciprocal hreflang, canonicalizing to default, thin machine translation, abandoned/outdated translation, slug drift); the maintenance test ('which can I keep current for as long as the page stays live'); and the real live example of this site's own slugs (leistungen/ki-webentwicklung, /en/services/ai-web-development/, /it/servizi/sviluppo-siti-web-ai/, /fr/services/developpement-web-ia/), English-only article with one self-alternate + x-default. Pricing facts are from pricing.ts, using only the websites service figures: Starter Website CHF 880 promo (regular CHF 2'490, one language, technical SEO/GEO foundation, extra languages not included), Business Website CHF 4'990 (multilingual-ready), Complex from CHF 9'900 (large multilingual architectures). No statistics, timelines, tool names, or legal claims were invented; user domain/slugs are transient inputs. Caveats: Preserved the article's own caveats: no honest single timeline or price for adding a language without knowing page count and architecture; region tags (en-CH/it-CH/fr-CH) only matter if you specifically distinguish Swiss variants from France's/Italy's; publishing fewer well-maintained languages beats four with one abandoned; four national languages is not itself a reason to publish all four. Attributions kept to Google Search Central (localized versions, canonicalization) and IETF BCP 47. The .disc states it is orientation, not advice or a quote, cites those sources, and confirms the planner runs entirely in-browser with nothing saved, sent or stored; [your domain] is only a placeholder. Pricing framed as 'where a build fits', not a quote. No invented claims; no personal data; nothing stored. |

## Pilot 50 — local-seo-switzerland-doorway-pages (EN)

Per-location doorway-page risk classifier with a running honest-count ledger.

| Field | Value |
|---|---|
| Article / URL | `local-seo-switzerland-doorway-pages` · https://weissmann.ai/en/ai-academy/marketing-seo-geo/local-seo-switzerland-doorway-pages/ |
| Artifact title | Doorway-Page Risk Checker · Weissmann |
| Interaction type | Per-location doorway-page risk classifier with a running honest-count ledger |
| Source (repo) | `phase2-artifacts/local-seo-switzerland-doorway-pages/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/2bdfe37a-4370-4d5a-96b8-ea3d1346c325 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/ai-web-development/ |
| Integrity | Every input, verdict and explanation comes from the article JSON (local-seo-switzerland-doorway-pages.json). The four evidence tests are the article's exact bullets: staffed presence or sustained local service base; independently distinguishable content; genuinely separable search demand; a named owner who keeps it current. Business-model bands and their honest page counts (zero for a single depot; one per staffed branch for 2-4; systematic templated pages for 10+; skip entirely for a single location) are taken verbatim from the 'How many location pages' and 'When you can skip' sections. The dispatch-entry / pest-control 'Zug' framing, the doorway quote 'pages targeted at specific regions or cities that funnel users to one page' (attributed to Google Search Central, accessed 29 July 2026), the service-area business definition and its specifics (SAB for a business that visits/delivers but doesn't serve customers at its address; up to twenty named cities/postal codes not a fixed radius; ~two hours' driving-time outer edge; remove address if no walk-ins; one coverage page with map + honest town list + strongest real reviews, attributed to Google Business Profile Help, accessed 29 July 2026), keyword cannibalization, and the noindex paid-campaign exception are all drawn directly from the article. The only pricing figure used is Website Starter CHF 880 / regular CHF 2'490 (matching the ai-web-development service), from pricing.ts. No statistics, results or numbers were invented. Caveats: Disclaimer states orientation not advice or a quote, not legal advice, not a full SEO audit; attributes reasoning to the linked guide which cites Google's own Search Central and Business Profile docs (accessed 29 July 2026). Google policy phrases are shown in quotes with attribution as the article does. Preserves the article's own nuances: doorway policy does not ban location pages; the noindex campaign-page exception; that removing an address has no reliable evidence of harm; that folding into a service-area profile + one coverage page is often the honest answer. States plainly that nothing is saved, sent or stored and inputs stay in the browser; uses placeholder location names. No invented claims; no personal data; nothing stored. |

## Pilot 51 — google-ads-cost-switzerland-smes (EN)

3-tier budget planner: tier-based clicks-to-enquiries funnel with an agency-fee-on-top layer (distinct from Pilot 1's DE slider budget calc).

| Field | Value |
|---|---|
| Article / URL | `google-ads-cost-switzerland-smes` · https://weissmann.ai/en/ai-academy/marketing-seo-geo/google-ads-cost-switzerland-smes/ |
| Artifact title | Swiss Google Ads Budget Planner · Weissmann |
| Interaction type | 3-tier budget planner: tier-based clicks-to-enquiries funnel with an agency-fee-on-top layer (distinct from Pilot 1's DE slider budget calc) |
| Source (repo) | `phase2-artifacts/google-ads-cost-switzerland-smes/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/d468fa73-5f72-496c-8f56-709fbb16ac8f |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/en/services/google-ads/ |
| Integrity | All CPC ranges taken verbatim from the article JSON: local services CHF 3.50-8, healthcare CHF 5-18, real estate CHF 4-12, professional services CHF 10-30, B2B SaaS CHF 8-25, financial services CHF 15-45. Three tiers and their ad-spend ranges from the article: Tier 1 Test CHF 500-1'200, Tier 2 Growth CHF 1'500-4'000, Tier 3 Competitive CHF 4'000-10'000+. Viability check implements the article's 'One Number That Actually Matters' (spend divided by CPC midpoint) and its ~50-70 clicks floor from 'When Google Ads Is Not the Right Move Yet'; CHF 300 input floor reflects the FAQ's ~CHF 300-400 too-thin threshold. Fee-on-top layer is the CHF 690/month Google Ads Growth management fee confirmed in pricing.ts (ads-growth) and the article's 'What CHF 690/Month Actually Buys' section; ad spend billed separately by Google. WordStream global figures (avg ~USD 5.42, USD 1.63 arts to USD 9.87 legal) and the ~30-50% Swiss premium shown as context only, attributed as in the article. Verdict math reproduces the article's own worked examples (CHF 4'000 at CHF 20 CPC = ~200 clicks; CHF 800 in a CHF 20-CPC category = too thin). Caveats: Preserves the article's framing that all numbers are order-of-magnitude industry estimates, not Google's published rates and not per-account guarantees; the 30-50% Swiss premium is not an officially published Google figure. Conversion/enquiry rate is user-supplied because the article gives no Swiss conversion benchmark - the tool invents none and shows 'add your rate' until entered. Disclaimer states orientation not advice or a quote, and that nothing entered is stored or sent (in-memory only, no storage/network). Ad spend explicitly separated from the CHF 690 management fee, matching the pricing disclosure. No invented claims; no personal data; nothing stored. |

## Pilot 52 — webagentur-schweiz-vergleichen (DE)

Agency interview-script generator (DE) — assembles the article's 10 verbatim first-meeting questions, mapped across its 7 criteria, into a copyable meeting script; distinct from a due-diligence scorecard/tracker.

| Field | Value |
|---|---|
| Article / URL | `webagentur-schweiz-vergleichen` · https://weissmann.ai/ki-academy/marketing-seo-geo/webagentur-schweiz-vergleichen/ |
| Artifact title | Erstgespräch-Skript für Webagenturen · Weissmann |
| Interaction type | Agency interview-script generator (DE) — assembles the article's 10 verbatim first-meeting questions, mapped across its 7 criteria, into a copyable meeting script; distinct from a due-diligence scorecard/tracker |
| Source (repo) | `phase2-artifacts/webagentur-schweiz-vergleichen/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/cc00b6db-5715-4c46-975f-d03ae5470553 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-webentwicklung/ |
| Integrity | Every element comes only from webagentur-schweiz-vergleichen.json. The 7 criteria (Nachweis, Prozess, Ownership, Performance, SEO-Fundament, Support & Wartung, Vertragsbedingungen) and their sub-titles are taken from the article's section headings and the 'sieben Kriterien im Ueberblick' bullets. All 10 questions are reproduced verbatim from the 'Fragen, die Sie in jedem Erstgespraech stellen sollten' bullet list and mapped to criteria: Q1->Nachweis; Q3,Q8,Q9->Prozess; Q2->Ownership; Q4->Performance; Q5->SEO-Fundament; Q6->Support; Q7,Q10->Vertragsbedingungen (1+3+1+1+1+1+2 = 10). Each 'Worauf achten' note condenses the article's 'Rotes Licht' paragraph for that criterion; the Ownership 'Tipp' is the article's lock-in-prevention advice (transfer at least one access during the project). The framing 'Kriterien, die erst nach der Live-Schaltung zaehlen' is from answerFirst. No pricing figure is injected: the article states no prices and its thesis is anti-hype; the website Starter price (CHF 880 promo, reg. CHF 2'490) was confirmed in pricing.ts but deliberately left out to preserve the article's neutral tone. No invented statistics, vendors, or results. Caveats: Preserved faithfully: disclosure that Weissmann AI is itself an agency with commercial interest; 'Orientierung, keine Rangliste, keine Rechtsberatung, kein Angebot'; a self-report by an agency does not replace independent verification (own PageSpeed Insights test, reading the contract clause); an honest 'noch keine veroeffentlichten Fallstudien' is not a red flag while an invented reference is; revDSG Auftragsverarbeitungsvertrag reference kept for form/analytics data; hreflang vs. translation-plugin distinction kept. Nothing is stored or sent — all inputs stay in-browser; copy uses navigator.clipboard with an execCommand fallback. No invented claims; no personal data; nothing stored. |

## Pilot 53 — assistente-ai-artigiani-ticino (IT)

Per-trade dispatch-qualification script builder (IT): pick idraulico / elettricista / installatore risc.-clima / ditta di ristrutturazione, toggle and reorder the article's six pre-sopralluogo questions, add optional zona, richiamata time, an agreed indicative price band and a same-person-on-phone profile flag, and generate a copy-able qualification script with per-trade urgency signal and photo-fallback closed questions..

| Field | Value |
|---|---|
| Article / URL | `assistente-ai-artigiani-ticino` · https://weissmann.ai/it/ai-academy/agenti-automazione/assistente-ai-artigiani-ticino/ |
| Artifact title | Costruttore di copione pre-sopralluogo per artigiani |
| Interaction type | Per-trade dispatch-qualification script builder (IT): pick idraulico / elettricista / installatore risc.-clima / ditta di ristrutturazione, toggle and reorder the article's six pre-sopralluogo questions, add optional zona, richiamata time, an agreed indicative price band and a same-person-on-phone profile flag, and generate a copy-able qualification script with per-trade urgency signal and photo-fallback closed questions. |
| Source (repo) | `phase2-artifacts/assistente-ai-artigiani-ticino/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/61c68ca6-73d5-4aab-8fe9-d826f58a04b6 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/it/servizi/assistente-telefonico-ai/ |
| Integrity | Every question, rationale and caveat is drawn from the article JSON: the six categories (zona/comune, tipo di lavoro, urgenza, foto/video, accesso, fascia oraria) from 'Le sei domande'; per-trade urgency signals verbatim-ish from 'Copione buono/cattivo' and 'caos operativo' (idraulico: l'acqua ancora esce/si è fermata; elettricista: odore di bruciato/scintille/interruzione totale; installatore: fermato del tutto vs difetto + perdita, foto della targhetta + video del rumore/perdita; ristrutturazione: chi consegna chiavi/codice, cantiere aperto o da coordinare, urgenza reordered last per FAQ). Photo-fallback closed questions anchored on the article's 'acqua che scorre / spia accesa' example. Preventivo block reflects the 'gestire le aspettative' section: fascia indicativa only if the business supplied one (user input, never invented), otherwise honest 'dipende da quello che il tecnico trova sul posto'. Caveats list mirrors 'Cosa può ancora andare storto'. Escalation/hand-off note and 'zona ricompare in comuni diversi' from the article. Pricing: only the CHF 350 one-time trial figure from pricing.ts + the article CTA is used; no other prices imported. Caveats: Kept the article's own guardrails: no fixed price on the phone (only an optional indicative band the user must supply); 'verifichiamo e vi richiamiamo' instead of guessing on borderline zone; a copione is only worth the escalation behind it; hand off to a person for dialect / mixed IT-DE terms; for solo artisans and project-based renovation firms the tool is explicitly less useful (same-person flag note + reordered/de-emphasized urgency). Disclaimer states it is orientation, not advice or a quote, questions must be adapted and verified by the user, and nothing is stored or sent (in-browser only, placeholders like [la vostra impresa]). No invented claims; no personal data; nothing stored. |

## Pilot 54 — website-seitenanzahl-kmu (DE)

Page-count recommender: the article's 4 variables (Leistungen, Zielgruppen, Standorte, Sales-Cycle) plus a catchment toggle and a Sonderfall toggle produce a transparent line-item breakdown, a reasoned page-count RANGE (not a formula), and a band relation to Starter/Business/Individual, with a copyable summary..

| Field | Value |
|---|---|
| Article / URL | `website-seitenanzahl-kmu` · https://weissmann.ai/ki-academy/marketing-seo-geo/website-seitenanzahl-kmu/ |
| Artifact title | Seitenzahl-Rechner für KMU-Websites · Weissmann |
| Interaction type | Page-count recommender: the article's 4 variables (Leistungen, Zielgruppen, Standorte, Sales-Cycle) plus a catchment toggle and a Sonderfall toggle produce a transparent line-item breakdown, a reasoned page-count RANGE (not a formula), and a band relation to Starter/Business/Individual, with a copyable summary. |
| Source (repo) | `phase2-artifacts/website-seitenanzahl-kmu/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/ccae9739-fb85-42c0-a55d-1b3102d0a836 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-webentwicklung/ |
| Integrity | All logic mirrors the article's own worked example (Corinne): base pages Startseite/Über uns/Kontakt = 3; each real Leistung = 1 page; additional Zielgruppen beyond the primary = +1 each (primary runs within Leistungsseiten); Standorte with genuine distinct content = 1 page each (single location folds into Start/Kontakt); a single bundled Einzugsgebiets-Übersicht for further towns; a Wissens-/Blogbereich (1–3) only for a long Sales-Cycle; an optional Referenzen page as the high-bound. The compute reproduces the article's stated results — Corinne = 11 (lean), the ultra-minimal profile = One-Pager up to ~5 core pages (from answerFirst + FAQ). Bands and prices are the article's three Grössenordnungen bullets mapped to pricing.ts: Starter CHF 880 promo (regulär CHF 2'490), Business CHF 4'990, Individual ab CHF 9'900 — all present in pricing.ts; Starter 880/2'490 and 'statt CHF 4'990' also appear verbatim in the article. Drei-Fragen-Test (eigene Suchintention, eigener Inhalt, eigene Pflege) and the 'mindestens zwei von drei' bar quoted from answerFirst + the test section. Doorway warning drawn from the article's Doorway-Seiten section citing Google's Spam-Richtlinien. Caveats: Framed as Orientierung, kein Angebot / keine verbindliche Umfangsberatung. States explicitly it is a reasoned Grössenordnung, not a formula (article: nicht «Leistungen mal Standorte»). Preserves 'Fünf starke Seiten schlagen fünfzig schwache' and 'keine Verkaufsvorgabe'. Every candidate page is bound to the Drei-Fragen-Test (at least two of three). No invented statistics, conversion rates or ranking claims. Inputs are transient and local — the disclaimer states nothing is stored or sent; no storage/network/external assets used. Copy-to-clipboard acts only on the user's own generated summary text. No invented claims; no personal data; nothing stored. |

## Pilot 55 — website-schnell-erstellen-realistisch (DE)

Readiness self-score (Selbsttest): the article's seven Selbsttest questions are self-rated Ja/Teilweise/Nein and rolled into a 0-100% readiness meter (scored only over answered questions, never counting unanswered as 0) plus per-factor status chips. The six readiness questions map to the four client-side factors (Entscheidungsfähigkeit; Content-Texte; Content Bild & Marke; definierter Umfang; schnelle Rückmeldungen) plus the legal-text sign-off. The seventh question captures the revision-round expectation and ties it to Starter vs. Business scope. Instead of any invented day count, the readiness position is mapped to the article's own two illustrative time anchors (eine Woche möglich vs. the illustrative sechs bis acht Wochen). Full time-range framing and the dynamically built 'offene Punkte fürs Erstgespräch' list (each gap -> the article's own Vorbeugung action, plus the 2 provider-side questions to ask) unlock only once all seven are answered; a copyable summary of the user's own inputs is generated. Distinct from B-DE-08: mechanic is a self-readiness score + time-pole positioning, not a cost/scope estimator..

| Field | Value |
|---|---|
| Article / URL | `website-schnell-erstellen-realistisch` · https://weissmann.ai/ki-academy/marketing-seo-geo/website-schnell-erstellen-lassen/ |
| Artifact title | Website-Bereitschaft: Selbsttest & realistischer Zeitrahmen · Weissmann |
| Interaction type | Readiness self-score (Selbsttest): the article's seven Selbsttest questions are self-rated Ja/Teilweise/Nein and rolled into a 0-100% readiness meter (scored only over answered questions, never counting unanswered as 0) plus per-factor status chips. The six readiness questions map to the four client-side factors (Entscheidungsfähigkeit; Content-Texte; Content Bild & Marke; definierter Umfang; schnelle Rückmeldungen) plus the legal-text sign-off. The seventh question captures the revision-round expectation and ties it to Starter vs. Business scope. Instead of any invented day count, the readiness position is mapped to the article's own two illustrative time anchors (eine Woche möglich vs. the illustrative sechs bis acht Wochen). Full time-range framing and the dynamically built 'offene Punkte fürs Erstgespräch' list (each gap -> the article's own Vorbeugung action, plus the 2 provider-side questions to ask) unlock only once all seven are answered; a copyable summary of the user's own inputs is generated. Distinct from B-DE-08: mechanic is a self-readiness score + time-pole positioning, not a cost/scope estimator. |
| Source (repo) | `phase2-artifacts/website-schnell-erstellen-realistisch/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/b5d99baa-b1e6-46e6-97a9-c4c52b5232f4 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-webentwicklung/ |
| Integrity | Everything is drawn from the article JSON. The six factors and the 4-liegen-bei-Ihnen / 2-beim-Anbieter split come verbatim from the 'Die sechs Faktoren' section and are echoed by the FAQ ('die vier grössten Hebel liegen bei Ihnen'). The seven self-test questions are quoted (lightly trimmed for length: AGB expanded) from the 'Der Selbsttest' section; the 24-48h feedback window, 'gilt in beide Richtungen', and the 'ein Nein ist kein durchgefallener Test' framing are the article's own words. The two illustrative time anchors — 'eine Woche' (possible only if preconditions are met, from answerFirst + FAQ) and the illustrative 'sechs bis acht Wochen' (Anbieter B in the opening example) — are the ONLY numeric time references and are labelled as the article's illustrative example, never as a Weissmann quote or promise. The two provider factors (wiederverwendbares Design-System; Testdisziplin) and the five Agentur-Theater signals are quoted/paraphrased from their respective sections. The closing takeaway ('Was müsste auf meiner Seite stimmen … und was tun Sie, damit daraus kein Pfusch wird?') is the article's final-section wording. Scope figures for the revision-round note (Starter: up to 5 Kernseiten, 1 Sprache, 2 definierte Korrekturrunden; Business: ca. 10-20 Seiten, mehrsprachigkeitsfähig, 3 definierte Korrekturrunden) appear in the article's Weissmann section AND were confirmed against src/data/pricing.ts (website-starter 880/regular 2490, 5 pages/1 language/2 rounds; website-business 4990, 10-20 pages/multilingual/3 rounds). No day count, conversion rate, statistic, tool name or claim was invented beyond these sources. Caveats: The article's central thesis — no responsible fixed day count before scope and starting position are known — is preserved as the core behaviour: the tool never outputs an invented day figure, only a qualitative position between the article's two illustrative anchors, and every result restates that a serious timeline comes in the Erstgespräch (and that Weissmann bewusst keine pauschale Tageszahl nennt). A 'Nein' is explicitly framed as an honest starting position, not a failed test (article wording). 'Schnell ist nicht hastig' is carried through the low-readiness framing. The illustrative 'sechs bis acht Wochen' is always attributed as the article's illustrative Beispiel, not a universal number or a quote about any provider's ability. The two provider factors are shown as questions to ASK rather than things the user scores. The disclaimer states it is Orientierung, keine verbindliche Zeitzusage, keine Offerte und keine Rechtsberatung. No statistics or results were fabricated. Nothing is stored or sent — all inputs stay in-browser (no storage/network/external assets); the clipboard copy acts only on the user's own generated summary. No invented claims; no personal data; nothing stored. |

## Pilot 56 — website-launch-seo-geo-sichtbarkeit (DE)

Ordered, phase-gated launch-sequence checklist generator (Tag eins / Woche eins / Monat eins) with copyable text export.

| Field | Value |
|---|---|
| Article / URL | `website-launch-seo-geo-sichtbarkeit` · https://weissmann.ai/ki-academy/marketing-seo-geo/website-launch-seo-geo-sichtbarkeit/ |
| Artifact title | Website-Launch-Fahrplan in fester Reihenfolge |
| Interaction type | Ordered, phase-gated launch-sequence checklist generator (Tag eins / Woche eins / Monat eins) with copyable text export |
| Source (repo) | `phase2-artifacts/website-launch-seo-geo-sichtbarkeit/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/9a3ffc24-8506-4fbe-91d3-f5363ad547cd |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/ki-webentwicklung/ |
| Integrity | Every checklist item is the verbatim/near-verbatim bullet text from the article's three sequenced sections: Tag eins (7 blocking items), Woche eins (7 active items, llms.txt flagged optional), Monat eins (5 items, weitere Sprachen flagged optional). Phase intros condensed from the article's own section paragraphs. The 'Achtung' item notes are drawn from the article's 'Was in dieser Phase schiefgehen kann' pitfalls (robots.txt/KI-Crawler, NAP-Abweichung, llms.txt vor Crawlbarkeit, hreflang) and the impatience/rebuild pitfall as the Phase-3 note. The lock messages reuse the article's own reasoning ('Wer GEO-Massnahmen vor der Indexierung beginnt, optimiert eine Seite, die noch niemand lesen kann'). The seven Launch-Mythen and the four exceptions are reproduced from the article's respective sections. Nachhol-Modus is grounded in FAQ #3 (same urgency order). Pricing disclose uses only Website Starter facts from pricing.ts (CHF 880 promo, regular CHF 2'490, up to 5 core pages, 1 language, 2 revision rounds, Netlify, technical SEO/GEO foundation, GA4+Search Console, basic structured data; excludes copywriting/extra languages/paid third-party tools) plus FAQ #6 (agency builds Tag-eins tech, owner must confirm active steps). No invented numbers: the only quantitative claim is Google's own 'einige Tage bis mehrere Wochen, ohne Garantie', taken verbatim from the article. Date windows are pure arithmetic on the user's own optional launch date (Tag eins = date, Woche eins = +1..+7, Monat eins = +8..+30); phase NAMES come from the article, not the arithmetic. Caveats: Preserved verbatim: Google indexing takes 'einige Tage bis mehrere Wochen, ohne Garantie'; a re-indexing request guarantees no inclusion; AI citations cannot be forced or booked ('kein Einreichformular'); llms.txt is not a ranking factor, only an optional signal, and only sensible after crawlability is confirmed; more schema types do not equal more visibility; the order cannot be reversed. Disclaimer states: orientation only, not advice/offer/legal or ranking guidance; nothing is stored or sent (inputs stay in-tab); uses placeholder [Ihr Unternehmen], no personal data captured. Pricing shown with its exclusions. Exceptions section states this roadmap is not always the priority (campaign landing pages, intentional noindex tools, referral-only businesses, already-live sites). No invented claims; no personal data; nothing stored. |

## Pilot 57 — google-ads-fehler-kmu-schweiz (DE)

Google Ads mistake self-audit — checklist of the article's actual mistake categories; user marks each as done/open/unsure, result groups the flagged items into priority tiers (foundation, direct budget leaks, silent drift, covered-elsewhere) with each mistake's cost mechanism + avoidance, and a copy-to-clipboard action list. Distinct from Pilot 1 (budget calculator) and Pilot 12 (LP auditor): a diagnostic self-audit, no numbers computed..

| Field | Value |
|---|---|
| Article / URL | `google-ads-fehler-kmu-schweiz` · https://weissmann.ai/ki-academy/marketing-seo-geo/google-ads-fehler-kmu-schweiz/ |
| Artifact title | Google-Ads-Fehler-Check für Schweizer KMU · Weissmann |
| Interaction type | Google Ads mistake self-audit — checklist of the article's actual mistake categories; user marks each as done/open/unsure, result groups the flagged items into priority tiers (foundation, direct budget leaks, silent drift, covered-elsewhere) with each mistake's cost mechanism + avoidance, and a copy-to-clipboard action list. Distinct from Pilot 1 (budget calculator) and Pilot 12 (LP auditor): a diagnostic self-audit, no numbers computed. |
| Source (repo) | `phase2-artifacts/google-ads-fehler-kmu-schweiz/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/0c8ad29a-8c68-4f4f-b662-b2b633c94412 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/google-ads/ |
| Integrity | Every checklist item, cost mechanism and avoidance text is lifted directly from the article JSON: Fehler 1 Negativ-Keywords/Suchbegriffs-Bericht (Fenster-montieren example), Fehler 2 Conversion-Tracking (set up before first franc, blind-flight + click-optimization double mechanism), Fehler 3 geo-targeting (illustrative Thurgau Maler / Genf-Lausanne-Lugano example, kept explicitly labelled 'illustratives Beispiel'), Fehler 4 Empfehlungs-Automatik, Fehler 5 laufende Pflege (schleichend), plus the two 'anderswo behandelt' errors the article names (Klickpreis-only planning error -> costs article; Startseite statt passende Seite -> landing-page article). Priority tiers derive only from the article's own emphasis: Conversion-Tracking = foundation (article: einrichten bevor der erste Franken investiert wird; without it everything optimizes blind); Negative Keywords + geo = FAQ names them as most common/most costly; recommendations + maintenance = 'stille/schleichende' drift; the two deferred errors = own tier. Red-thread closing note quotes the article's 'nichts auf der Standardeinstellung belassen'. Pricing: only the relevant figure used — Google Ads Growth CHF 690/Monat management from pricing.ts, shown once with the article's caveat that the ad budget is a separate item paid directly to Google, not via Weissmann. The assigned model's 'Quality Score ignoriert' category was DROPPED because the article never mentions Quality Score (HARD RULE 1: invent nothing); replaced by the article's real categories. Caveats: No numbers, percentages, savings or 'typical' figures are invented or computed — the tool is purely qualitative, matching the article which gives no reliable figures ('spürbarer Teil', 'ein Teil'). The geo example is kept marked as 'illustratives Beispiel'. Result 'all clear' state explicitly states it is a self-assessment, not a verified account audit. Disclaimer (.disc) states: orientation not advice/quote, no account analysis, no amounts computed, nothing stored, nothing sent. Two deferred errors labelled 'in eigenen Beiträgen behandelt' with 'Wo es behandelt wird' rather than inventing detail. Pricing note preserves the article's 'Werbebudget ist ein separater Posten, direkt an Google'. Fully local: no storage, no network, no external assets; clipboard only copies the user's own generated action list. Swiss spelling (ss). No invented claims; no personal data; nothing stored. |

## Pilot 58 — google-ads-oder-seo-schweiz (DE)

Ads-vs-SEO-first recommender (3-question decider: Dringlichkeit, Inhaltstyp, Budget-Horizont -> Ads-first / SEO-first / phased combination, with a nulltes-Kriterium gate and honest-exception flags).

| Field | Value |
|---|---|
| Article / URL | `google-ads-oder-seo-schweiz` · https://weissmann.ai/ki-academy/marketing-seo-geo/google-ads-oder-seo-schweiz/ |
| Artifact title | Google Ads oder SEO zuerst? Der 3-Variablen-Entscheider · Weissmann |
| Interaction type | Ads-vs-SEO-first recommender (3-question decider: Dringlichkeit, Inhaltstyp, Budget-Horizont -> Ads-first / SEO-first / phased combination, with a nulltes-Kriterium gate and honest-exception flags) |
| Source (repo) | `phase2-artifacts/google-ads-oder-seo-schweiz/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/0d54876d-928b-4f1a-9f56-0cfbf546f391 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/leistungen/google-ads/ |
| Integrity | Every number and claim is drawn from the article JSON (google-ads-oder-seo-schweiz.json) or from pricing.ts. From the article: Ads reacts within hours/days and needs inquiries in 2-4 weeks; Morningscore survey of 75 SEO experts (67.2% first results 2-4 months, 28.4% 6+ months, 94.6% within 6 months, full effect 12-24 months, new site 6-12 months); Swiss agency ranges Ads CHF 1'000-5'000/mo + ad spend separate, SEO CHF 500-3'000/mo; low-four-figure budget rule of thumb -> SEO first but ONLY if urgency leaves room; tap-vs-reservoir metaphor; evergreen 3-year test; nulltes Kriterium (5-second offer clarity) as a pre-filter; three-phase combination for contradictory signals; four 'weder Ads noch SEO' exceptions (offer unclear=gate, fully booked/no growth, order value below click cost, upcoming relaunch); GEO is a separate axis not a 4th variable; the six pitfalls from 'Was schiefgehen kann'. From pricing.ts: Google Ads Growth CHF 690/mo (ad spend separate/direct to Google), SEO Growth CHF 890/mo, combined + real ad budget quickly CHF 2'000+/mo. No invented statistics, conversion rates, tools, or results. Caveats: Preserved the article's own caveats: SEO timelines come from a 75-expert survey and are not guaranteed; no ranking guarantees (per SEO Growth disclosure); Google ad spend is paid separately and directly to Google; concrete Swiss click-price/budget-height figures are deliberately deferred to the separate Ads-costs article; GEO is an independent axis, explicitly excluded from the decider; acute urgency cannot be 'budget-thought-nice' into SEO; the tool is orientation, not advice or a quote. Disclaimer states nothing is stored or sent and inputs stay in-browser; illustrative examples are fictional. Swiss spelling (ss) used throughout. No invented claims; no personal data; nothing stored. |

## Pilot 59 — seo-locale-ticino (IT)

Ticino local-page risk + comune-merger checker: per-location four-point sufficiency test combined with the Lugano/Bellinzona fused-quartiere check, producing an honest dedicated-page count.

| Field | Value |
|---|---|
| Article / URL | `seo-locale-ticino` · https://weissmann.ai/it/ai-academy/marketing-seo-geo/seo-locale-ticino/ |
| Artifact title | SEO locale Ticino: pagina o doorway page? · Weissmann |
| Interaction type | Ticino local-page risk + comune-merger checker: per-location four-point sufficiency test combined with the Lugano/Bellinzona fused-quartiere check, producing an honest dedicated-page count |
| Source (repo) | `phase2-artifacts/seo-locale-ticino/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/f1fb6c1c-1643-4eb9-9560-49fe31295ac2 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/it/servizi/sviluppo-siti-web-ai/ |
| Integrity | Every fact comes from seo-locale-ticino.json. Merger data verbatim: Breganzona/Pregassona = Lugano quartieri since the first 2004 aggregation; Val Colla = Lugano quartiere grouping several ex-comuni (2004-2013 waves, Luganese 98->48 comuni, 21 quartieri); Giubiasco = fused into new Bellinzona on 3 April 2017 (13 comuni, district 17->6); Paradiso and Massagno = autonomous comuni that rejected aggregation to Lugano. Four-point test wording (real sustained presence, authentically distinct content, separable search demand, designated maintainer) taken directly from the article's bullet list. Doorway-page definition, the 'multiple pages targeting regions funneling users to one page' example, and the noindex paid-landing-page exception are the article's own paraphrase of Google Search Central (verified 29 July 2026). Google Business Profile service-area rules (remove address if no walk-ins, declare areas by comune/postal code not km radius, ~2h drive, up to 20 areas, Bellinzona depot covers Locarno/Mendrisiotto/Lugano but not Coira/Sion) from the article. Three business-model tiers, self-cannibalization/diluted-reviews/maintenance-debt/border-address risks, and the Lugano+Chiasso fiduciario = 2 pages (not 5) example all from the article. Pricing: only Website Starter CHF 880 (regular CHF 2'490, up to 5 main pages, technical SEO+GEO, GA4+Search Console) cited, matching the assigned sviluppo-siti-web-ai service; confirmed against pricing.ts. Caveats: Disclaimer states orientation not an audit nor legal advice; nothing stored or sent (in-browser only); Google rules cited as verified 29 July 2026 in the source article and noted as not banning location pages per se, only name-swapping without distinct substance. Tool never invents merger status for comuni the article does not name (e.g. Locarno, Mendrisio, Chiasso) - it forces the user to declare comune-autonomo vs quartiere-fuso, preserving the article's 'this is the check you must do first' stance. Pricing framed as orientation, not a quote. No invented claims; no personal data; nothing stored. |

## Pilot 60 — google-ads-ticino-costi (IT)

Combined CHF cost anchor + 'conviene vs SEO/profilo locale' decision guide (IT).

| Field | Value |
|---|---|
| Article / URL | `google-ads-ticino-costi` · https://weissmann.ai/it/ai-academy/marketing-seo-geo/google-ads-ticino-costi/ |
| Artifact title | Google Ads in Ticino: costi e decisione · Weissmann |
| Interaction type | Combined CHF cost anchor + 'conviene vs SEO/profilo locale' decision guide (IT) |
| Source (repo) | `phase2-artifacts/google-ads-ticino-costi/index.html` |
| Private Claude URL | https://claude.ai/code/artifact/7eb12b32-877a-454e-a83b-e029e69252c2 |
| Publication status | **PRIVATE** ("Share, private") |
| Links | Article backlink + service CTA → https://weissmann.ai/it/servizi/google-ads/ |
| Integrity | Two panels, both grounded only in the article JSON + pricing.ts. Panel 1 (cost anchor): three profiles taken verbatim from the article's budget bullets — Piccola attività locale (CPC servizi locali CHF 3.50–8, budget CHF 800–1'500, total CHF 1'490–2'190), PMI media regionale (CPC most-sectors CHF 1–5, budget CHF 1'500–3'000, total CHF 2'190–3'690), Settore molto competitivo (CPC CHF 10–30+, budget da CHF 3'000, total oltre CHF 3'690). Management CHF 690/mese = Google Ads Growth from pricing.ts (ads-growth). Optional budget input computes a click order-of-magnitude by dividing the user's own number by the article's CPC range (arithmetic on article ranges, heavily rounded, labelled 'ordine di grandezza') and flags the article's realistic-start floor of CHF 1'000–1'500. Panel 2 (decision): five yes/no questions = the article's three decision criteria (urgenza, volume di ricerca, orizzonte di budget) plus the two remaining 'SEO/profilo wins' situations (capacità al limite, landing page all'altezza). Verdict text quotes the article's own reasoning. Pitfalls card = the article's four 'Cosa può andare storto' items. No invented statistics, no fabricated CPCs, no results/conversion figures. Caveats: Preserves: Google publishes no CPC list, price forms in a real-time auction; ranges are Swiss-agency observations (digital M., Growth Junction, mid-2026), orientamento not tariffa/official Google figures; CHF 1'000–1'500 is not a magic threshold; the click estimate is only an order of magnitude derived from the article's ranges, not a guaranteed Google figure; ad budget is ALWAYS a separate line paid directly to Google and the CHF 690 covers management only; the metric that matters is cost per qualified request, not CPC alone. Disclaimer states orientation not a quote/advice and that everything is processed only in-browser, nothing stored or sent. No invented claims; no personal data; nothing stored. |

## What is needed to complete the pilots

1. **Owner publishes Pilot 1 publicly**: open the private URL while signed in to claude.ai → **Share** →
   choose the public / "anyone with the link" option → copy the public URL.
2. **Verify anonymously**: open that public URL in a logged-out browser; confirm the calculator loads and
   works. Record the public URL + result in the Pilot 1 row above.
3. **Confirm the automated build/publish path**: decide whether the remaining pilots (and the eventual 60)
   should be published via manual Share each time, or via a session/tooling configuration that permits
   public artifact publication directly. Only then does it make sense to scale to Pilots 2–3 and beyond.
