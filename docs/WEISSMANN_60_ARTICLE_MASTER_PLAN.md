# Weissmann.ai — 60-Article Master Content Plan (Phase 1)

**Status:** 47 of 60 rows are already-published articles (kept from the prior build, verified against this new spec). 13 rows are new articles being written in this restructuring pass (Batches A/B/C). No Claude Artifacts are built in this phase — only a one-line future concept is recorded per row, per the Phase 1 / Phase 2 split.

**Distribution target:** 60 articles total. Category A (AI phone/voice) = 30 (15 DE + 10 EN + 5 IT). Category B (websites/SEO/GEO/Google Ads) = 30 (15 DE + 10 EN + 5 IT). No French articles. Grand total: 30 DE + 20 EN + 10 IT.

**Demand labels** are qualitative (high/medium/low/rising/commercial/local/comparison/informational), not invented search-volume numbers, per the brief's explicit instruction. Where a label is grounded in a specific research signal (WebSearch results, competitor SERP presence), that's noted.

**Format tags** are a first-pass editorial classification used to enforce "no more than 3 articles share substantially the same structure." They are provisional pending the detailed close-read audit (a spot-check on `ai-outbound-marketing-calls-switzerland` already showed a title-based guess was wrong — it reads as an "investigation" built around a scaling-risk calculation, not a flat "legal explainer" — so labels below are best-effort and the full verification happens in the dedicated audit pass, logged separately in this same doc's Audit Log section once complete).

---

## CATEGORY A — AI Phone Assistants, Receptionists, Voice AI (30 articles)

### A · German (15 — 10 kept + 5 new)

#### A-DE-01 · `swiss-ai-phone-assistant-provider-comparison` (KEPT)
- **Working title:** KI-Telefonassistenten Schweiz: Anbieter-Vergleich
- **Primary keyword:** KI Telefonassistent Schweiz Vergleich
- **Secondary keywords:** Weissmann AI, AlpenAgent, Suisse Voice, NEX-AI, HeyPapaya, Anbieter Vergleich
- **Search intent:** comparison
- **Target reader:** SME owner evaluating multiple providers before committing
- **Unique thesis:** There is no single "best" provider — six genuinely different products optimized for different buyer priorities (dialect breadth, price transparency, hosting, integrations, contract terms)
- **Swiss angle:** All 6 vendors are Swiss-market providers; dialect coverage and CHF pricing are core comparison axes
- **Why different:** Flagship flat vendor-by-vendor list with a stated methodology section (vs. EN's persona-sorted and IT's market-reach-segmented treatments of the same underlying dataset)
- **Closest existing page:** `what-is-an-ai-phone-assistant`, `phone-assistant-vs-alternatives`
- **Cannibalisation risk:** Low — the only DE flat vendor comparison; differentiated from EN/IT siblings by structure
- **Internal links:** what-is-an-ai-phone-assistant, phone-assistant-vs-alternatives
- **CTA:** CHF 350 Starter-Test unverbindlich ausprobieren
- **Future Artifact concept:** Provider-fit matcher — reader answers 3 priority questions, tool surfaces the 1-2 best-fit vendors from the verified 6-provider dataset with the stated reasoning shown
- **Demand:** commercial, high (flagship comparison term)
- **Format:** comparison / buyer's guide

#### A-DE-02 · `swiss-dialect-comprehension-test` (KEPT)
- **Working title:** Versteht ein KI-Telefonassistent Schweizerdeutsch?
- **Primary keyword:** KI Telefonassistent Schweizerdeutsch
- **Secondary keywords:** Zürichdeutsch, Berndeutsch, Baseldeutsch, Zentralschweizer Mundart, Spracherkennung
- **Search intent:** informational
- **Target reader:** Owner worried a voice AI won't understand local dialect callers
- **Unique thesis:** "Understanding" splits into two separate, separately-testable layers — recognition (STT) vs. speaking back in dialect — and most vendors only do the first
- **Swiss angle:** Regional dialect variation (Zürich/Bern/Basel/Zentralschweiz) is the whole subject
- **Why different:** Only DE dialect-comprehension piece; IT sibling covers Ticinese/code-switching, a different linguistic phenomenon
- **Closest existing page:** `what-is-an-ai-phone-assistant`, `how-voice-ai-works`
- **Cannibalisation risk:** Low
- **Internal links:** what-is-an-ai-phone-assistant, how-voice-ai-works
- **CTA:** KI-Telefonassistent unverbindlich testen (CHF 350, einmalig)
- **Future Artifact concept:** Self-test script generator — produces a printable 10-call dialect test protocol tailored to the reader's own region
- **Demand:** informational, medium-high (recurring objection in sales conversations)
- **Format:** practical test

#### A-DE-03 · `ai-phone-assistant-greeting-transparency` (KEPT)
- **Working title:** Muss sich ein KI-Telefonassistent ausweisen?
- **Primary keyword:** KI Telefonassistent Transparenzpflicht
- **Secondary keywords:** EU AI Act Artikel 50, KI-Kennzeichnung, Begrüssungstext, revDSG
- **Search intent:** informational
- **Target reader:** Owner unsure if disclosure is legally required
- **Unique thesis:** No standalone Swiss-only law mandates specific wording, but EU AI Act Art. 50 (from 2 Aug 2026) creates a real disclosure duty the moment there's any EU touchpoint
- **Swiss angle:** Swiss-vs-EU jurisdiction boundary is the core distinction
- **Why different:** Direct Q&A legal explainer, narrowly scoped to disclosure/greeting only
- **Closest existing page:** `ai-transparency-disclosure`
- **Cannibalisation risk:** Low
- **Internal links:** ai-transparency-disclosure
- **CTA:** (default consult CTA)
- **Future Artifact concept:** EU-touchpoint checker — 4 yes/no questions determine whether Art. 50 disclosure applies to the reader's specific business
- **Demand:** informational, medium, rising (EU AI Act enforcement date is a genuine news hook)
- **Format:** legal/privacy explainer

#### A-DE-04 · `ai-call-recording-legality-switzerland` (KEPT)
- **Working title:** Anrufe aufzeichnen mit KI: was die Schweiz erlaubt
- **Primary keyword:** KI Telefonassistent Anrufe aufzeichnen
- **Secondary keywords:** Art. 179bis StGB, Art. 179ter StGB, Art. 179quinquies StGB, Beweissicherung
- **Search intent:** informational
- **Target reader:** Owner wanting to log calls for QA/training and unsure what's legal
- **Unique thesis:** Legality depends on call content, not on whether an AI answers — and only a narrow order/reservation exception allows recording without consent
- **Swiss angle:** Swiss Criminal Code articles are the entire legal basis
- **Why different:** Direct explainer; recently fixed metaDescription to stop auto-truncation from cutting the "not legal advice" disclaimer
- **Closest existing page:** `ai-phone-assistant-data-protection`
- **Cannibalisation risk:** Low
- **Internal links:** ai-phone-assistant-data-protection
- **CTA:** (default consult CTA)
- **Future Artifact concept:** Recording-legality decision tree — call type in, permitted/not-permitted + citation out
- **Demand:** informational, medium
- **Format:** legal/privacy explainer

#### A-DE-05 · `keep-existing-swiss-number-ai-assistant` (KEPT)
- **Working title:** Bestehende Telefonnummer behalten: KI-Assistent
- **Primary keyword:** Telefonnummer behalten KI Telefonassistent
- **Secondary keywords:** Rufnummernportierung, Rufnummernmitnahme, BAKOM, ombudscom, SIP-Trunk, PBX
- **Search intent:** informational
- **Target reader:** Owner afraid switching means losing their number
- **Unique thesis:** "Keeping" the number is almost always forwarding, not porting — a distinction that determines cost, timeline and risk
- **Swiss angle:** BAKOM/ombudscom are the Swiss regulatory bodies governing this
- **Why different:** Technical/practical explainer with a genuine decision fork (forward vs. port)
- **Closest existing page:** `what-is-an-ai-phone-assistant`, `swiss-ai-phone-assistant-provider-comparison`
- **Cannibalisation risk:** Low
- **Internal links:** what-is-an-ai-phone-assistant, swiss-ai-phone-assistant-provider-comparison
- **CTA:** Kostenloses Erstgespräch: Wir klären, welcher Anschluss zu Ihnen passt
- **Future Artifact concept:** Forward-vs-port decision tool based on carrier and current contract type
- **Demand:** informational, medium
- **Format:** diagnostic/technical explainer

#### A-DE-06 · `ai-phone-assistant-calendar-crm-integration` (KEPT)
- **Working title:** KI-Telefonassistent: Kalender & CRM verbinden
- **Primary keyword:** KI Telefonassistent CRM Integration
- **Secondary keywords:** API, Webhook, Middleware, iPaaS, RPA
- **Search intent:** informational
- **Target reader:** Owner with an existing calendar/CRM stack wondering about integration feasibility
- **Unique thesis:** Integration feasibility hinges on one technical fact — does the target system expose an open API — and the four fallback approaches when it doesn't
- **Swiss angle:** References Swiss-common booking/CRM tools
- **Why different:** API-gated decision-framework structure
- **Closest existing page:** `what-is-an-ai-phone-assistant`, `swiss-ai-phone-assistant-provider-comparison`
- **Cannibalisation risk:** Low
- **Internal links:** what-is-an-ai-phone-assistant, swiss-ai-phone-assistant-provider-comparison
- **CTA:** Kostenloses Erstgespräch: Wir prüfen ehrlich, was bei Ihrem System technisch möglich ist
- **Future Artifact concept:** Integration-feasibility checker — reader names their calendar/CRM, tool flags API-open vs. workaround-needed
- **Demand:** informational, medium
- **Format:** decision framework

#### A-DE-07 · `ai-phone-assistant-failure-handling` (KEPT)
- **Working title:** KI-Telefonassistent versteht nicht: was dann?
- **Primary keyword:** KI Telefonassistent versteht nicht
- **Secondary keywords:** Konfidenzschwelle, Eskalation, Human Handoff, Warmer Transfer
- **Search intent:** informational
- **Target reader:** Owner worried about the AI mishandling a confused caller
- **Unique thesis:** Failure isn't binary — confidence thresholds and escalation design determine whether a misunderstanding is silent or caught
- **Swiss angle:** General but framed for Swiss SME call volumes
- **Why different:** Failure-mode diagnostic, distinct from the new human-handover-design piece (which is about deliberate design of handover points, not error recovery)
- **Closest existing page:** `how-voice-ai-works`
- **Cannibalisation risk:** Low (watch vs. new A-DE-14 human-handover article — differentiated: this is about errors, that one about designed escalation points)
- **Internal links:** how-voice-ai-works
- **CTA:** Eskalationslogik in der Praxis testen (CHF 350, einmalig)
- **Future Artifact concept:** Failure-mode simulator — walks through 5 common misunderstanding scenarios and shows good vs. bad escalation behavior
- **Demand:** informational, medium
- **Format:** diagnostic article

#### A-DE-08 · `ai-phone-assistant-vs-ivr-caller-journey` (KEPT)
- **Working title:** KI-Telefonassistent vs. IVR: Der Anruf-Vergleich
- **Primary keyword:** KI Telefonassistent vs IVR
- **Secondary keywords:** IVR, DTMF, Voicebot, Conversational AI
- **Search intent:** comparison
- **Target reader:** Owner currently running a phone-menu system
- **Unique thesis:** IVR makes the caller do the categorization work; AI does it from a single sentence — shown via a side-by-side caller journey, not a feature table
- **Swiss angle:** General but framed around Swiss SME call patterns
- **Why different:** Customer-journey narrative structure, not a spec comparison
- **Closest existing page:** `chatbot-vs-voicebot-vs-ivr`, `what-is-an-ai-phone-assistant`
- **Cannibalisation risk:** Low
- **Internal links:** chatbot-vs-voicebot-vs-ivr, what-is-an-ai-phone-assistant, ai-phone-assistant-failure-handling
- **CTA:** Kostenloses Erstgespräch: Wir zählen gemeinsam die Züge in Ihrem eigenen Telefonmenü
- **Future Artifact concept:** "Count your menu's steps" tool — reader inputs their current IVR tree, tool shows step-count vs. AI equivalent
- **Demand:** comparison, medium
- **Format:** comparison / customer journey

#### A-DE-09 · `ai-phone-assistant-small-business-case` (KEPT)
- **Working title:** Lohnt sich ein KI-Telefonassistent für KMU?
- **Primary keyword:** KI Telefonassistent lohnt sich KMU
- **Secondary keywords:** Break-Even-Rechnung, verpasster Anruf, Combox
- **Search intent:** commercial-investigation
- **Target reader:** Owner doing ROI math before buying
- **Unique thesis:** Worth-it isn't about company size — it's three numbers the reader must supply themselves (weekly calls, missed-call rate, value per lead)
- **Swiss angle:** CHF-denominated break-even math
- **Why different:** Cost-breakdown/break-even format, distinct from the new Google Ads cost pieces (different product, different market)
- **Closest existing page:** `what-is-an-ai-phone-assistant`, `swiss-ai-phone-assistant-provider-comparison`
- **Cannibalisation risk:** Low
- **Internal links:** what-is-an-ai-phone-assistant, swiss-ai-phone-assistant-provider-comparison
- **CTA:** Kostenloses Erstgespräch: Wir rechnen Ihren Break-Even gemeinsam durch
- **Future Artifact concept:** Break-even calculator — 3 inputs, one number out
- **Demand:** commercial-investigation, high
- **Format:** cost breakdown

#### A-DE-10 · `ai-outbound-marketing-calls-switzerland` (KEPT)
- **Working title:** KI-Werbeanrufe Schweiz: was ist erlaubt?
- **Primary keyword:** KI Werbeanrufe Schweiz erlaubt
- **Secondary keywords:** UWG, Sterneintrag, SECO, Skalierungsrisiko
- **Search intent:** informational
- **Target reader:** Owner considering automated outbound calling
- **Unique thesis:** The law doesn't change with automation — the *risk* does, because a single list-hygiene error multiplies by volume before anyone notices (a scaling-math investigation, not a flat legal explainer)
- **Swiss angle:** UWG Art. 3/23, SECO complaints process
- **Why different:** Built around a quantitative scaling-risk calculation as the organizing device (confirmed on close read — genuinely distinct from the two flat legal explainers above)
- **Closest existing page:** `ai-phone-assistant-greeting-transparency`
- **Cannibalisation risk:** Low
- **Internal links:** ai-phone-assistant-greeting-transparency
- **CTA:** (default consult CTA)
- **Future Artifact concept:** Pre-call list-hygiene checker — the 3-question test from the article, applied to a sample list
- **Demand:** informational, low-medium, niche
- **Format:** investigation / risk analysis

#### A-DE-11 · `ai-phone-assistant-beauty-wellness-switzerland` (NEW)
- **Working title:** KI-Empfang für Beauty- und Wellness-Salons: die 6-Punkte-Checkliste
- **Primary keyword:** KI Empfang Beauty Salon Schweiz
- **Secondary keywords:** KI Terminbuchung Kosmetikstudio, Coiffeur, Nagelstudio, No-Show
- **Search intent:** local, commercial
- **Target reader:** Salon/studio owner (hair, nails, cosmetics, wellness) evaluating AI phone reception
- **Unique thesis:** The salon vertical's real pain point isn't answering the phone — it's the no-show/rebooking cycle that happens *between* calls, and whether the AI integrates with actual salon-booking software
- **Swiss angle:** References real Swiss salon-software landscape (MySalon.ch-style CHF/Swiss-receipt tooling) as a genuine integration consideration, without naming a specific vendor as a Weissmann partner
- **Why different:** Checklist format (not the narrative field-guide style used for hotels/property-mgmt/trades), keeping vertical count balanced against the format-diversity cap
- **Closest existing page:** `ai-receptionist-swiss-hotels` (EN, hospitality vertical — cross-link, don't repeat), `what-is-an-ai-phone-assistant`
- **Cannibalisation risk:** Low — first beauty/wellness vertical piece in the project
- **Internal links:** what-is-an-ai-phone-assistant, ai-receptionist-swiss-hotels
- **CTA:** default consult CTA
- **Future Artifact concept:** Salon-fit checklist tool — 6 yes/no questions scored against real booking-software-integration needs
- **Demand:** local, commercial, rising (real competitor content found: ConciergeBeauty, MySalon.ch actively serving this vertical in CH)
- **Format:** checklist

#### A-DE-12 · `ai-phone-assistant-when-not-appropriate` (NEW)
- **Working title:** Wann ein KI-Telefonassistent die falsche Wahl ist
- **Primary keyword:** KI Telefonassistent ungeeignet
- **Secondary keywords:** KI Telefonassistent Grenzen, wann KI Empfang nicht passt
- **Search intent:** informational
- **Target reader:** Owner sold hard on AI reception everywhere, needs an honest counter-view
- **Unique thesis:** A deliberately contrarian, commercially self-limiting piece — five concrete scenarios (acute complaints, older/particular clientele, reputationally sensitive practices, extremely low call volume, no one able to maintain it) where AI reception is the wrong call, stated plainly by the vendor itself
- **Swiss angle:** Swiss client-trust norms (e.g. legal/medical practices) shape which scenarios are flagged
- **Why different:** Contrarian-argument format — a first for the project; deliberately undercuts the sales pitch
- **Closest existing page:** `ai-phone-assistant-failure-handling` (cross-link, don't repeat — that's about runtime errors, this is about a priori unsuitability)
- **Cannibalisation risk:** Low — genuinely new angle
- **Internal links:** ai-phone-assistant-failure-handling, ai-phone-assistant-small-business-case
- **CTA:** default consult CTA, reframed honestly ("we'll tell you if it's not right for you")
- **Future Artifact concept:** Suitability self-screen — a short quiz that can output "AI reception may not be right for you yet" as a real possible result
- **Demand:** informational, low-medium (real signal found: multiple competitor articles on "wann KI Telefonassistent nervt/ungeeignet")
- **Format:** contrarian argument

#### A-DE-13 · `ai-phone-assistant-emergency-limitations-switzerland` (NEW)
- **Working title:** Der Notfall-Check: Was Ihr KI-Assistent können muss, bevor er ans Telefon geht
- **Primary keyword:** KI Telefonassistent Notfall Grenzen
- **Secondary keywords:** medizinische Beratung, Notfall-Triage, Weiterleitungsprotokoll
- **Search intent:** informational, local
- **Target reader:** Owner in a practice/service business where a caller might have a genuine emergency
- **Unique thesis:** Framed as a pre-deployment capability checklist ("must never do X, must always do Y") rather than a straight legal explainer — deliberately distinct structure from the DE-04/DE-03 legal explainers to avoid over-concentrating that format
- **Swiss angle:** revDSG/EDÖB context plus Swiss emergency-number norms (144/117/118)
- **Why different:** Diagnostic/checklist structure, not a Q&A legal piece; explicitly states Weissmann's assistants give no medical advice and no emergency triage
- **Closest existing page:** `ai-call-recording-legality-switzerland` (cross-link, don't repeat — different legal domain)
- **Cannibalisation risk:** Low
- **Internal links:** ai-call-recording-legality-switzerland, ai-phone-assistant-failure-handling
- **CTA:** default consult CTA
- **Future Artifact concept:** Pre-launch capability checklist — the must-never/must-always list as a printable sign-off sheet
- **Demand:** informational, low-medium, high-stakes/trust-critical
- **Format:** diagnostic / checklist

#### A-DE-14 · `ai-phone-assistant-human-handover-design` (NEW)
- **Working title:** Vom Bot zum Menschen: Die Übergabe richtig gestalten
- **Primary keyword:** KI Telefonassistent Übergabe Mensch
- **Secondary keywords:** Eskalationsschwelle, Kontextübergabe, Warmer Transfer
- **Search intent:** informational, commercial-investigation
- **Target reader:** Owner planning how the AI hands off complex/emotional calls to staff
- **Unique thesis:** Deliberate handover design (sentiment triggers, context-package quality, staff-side protocol) is a distinct discipline from error recovery — most vendors conflate the two
- **Swiss angle:** Swiss SME staffing realities (often 1-2 people available to receive a handover)
- **Why different:** Decision-framework structure focused on proactive design, not reactive failure
- **Closest existing page:** `ai-phone-assistant-failure-handling` (cross-link, explicit differentiation stated in the article)
- **Cannibalisation risk:** Low, differentiation explicitly written into the article body
- **Internal links:** ai-phone-assistant-failure-handling, ai-phone-assistant-vs-ivr-caller-journey
- **CTA:** default consult CTA
- **Future Artifact concept:** Handover-protocol builder — reader defines their team's availability, tool outputs a recommended escalation-trigger + context-package template
- **Demand:** informational, medium (real grounding found: sentiment-triggered handoff, context-package quality are established best-practice topics)
- **Format:** decision framework

#### A-DE-15 · `ai-phone-assistant-onboarding-30-days` (NEW)
- **Working title:** KI-Telefonassistent einführen: der realistische 30-Tage-Plan
- **Primary keyword:** KI Telefonassistent einführen KMU
- **Secondary keywords:** Onboarding, Testphase, Skript, Rollout
- **Search intent:** commercial-investigation
- **Target reader:** Owner who has already decided to buy and needs an implementation roadmap
- **Unique thesis:** A genuinely new funnel stage — everything else in the DE set is pre-purchase (comparison/cost/legal); this is post-purchase, week-by-week
- **Swiss angle:** References realistic Swiss SME staffing/time constraints in the rollout pacing
- **Why different:** Implementation-plan format, the only one of its kind in the DE set
- **Closest existing page:** `ai-phone-assistant-small-business-case` (cross-link — that's the pre-purchase ROI case, this is post-purchase execution)
- **Cannibalisation risk:** Low
- **Internal links:** ai-phone-assistant-small-business-case, swiss-ai-phone-assistant-provider-comparison
- **CTA:** default consult CTA
- **Future Artifact concept:** 30-day rollout planner — generates a week-by-week checklist from a few inputs (industry, current phone volume, staff count)
- **Demand:** commercial-investigation, medium
- **Format:** implementation plan

### A · English (10 — all kept, unchanged)

#### A-EN-01 · `best-ai-receptionists-switzerland-buyers-guide` (KEPT)
Primary keyword: best AI receptionist Switzerland · Intent: comparison · Format: buyer's guide · Thesis: no single best product, 4 buyer personas with different priorities · Closest page: swiss-ai-phone-assistant-provider-comparison (DE sibling, persona-sorted vs. flat-list differentiation) · Artifact concept: persona-matcher tool.

#### A-EN-02 · `ai-receptionist-swiss-phone-system-compatibility` (KEPT)
Primary keyword: AI receptionist phone system compatibility · Intent: informational · Format: diagnostic/technical explainer · Thesis: compatibility depends on infrastructure type + integration depth, two separate questions · Closest page: keep-existing-swiss-number-ai-assistant (DE) · Artifact concept: compatibility checker by carrier/system type.

#### A-EN-03 · `ai-receptionist-swiss-hotels` (KEPT)
Primary keyword: AI receptionist Swiss hotels · Intent: informational, local · Format: field guide (vertical) · Thesis: value shows up in the ten-minute front-desk crunch, not in reciting breakfast times · Closest page: assistente-ai-hotel-bb-campeggi-ticino (IT, same vertical, different market/depth) · Artifact concept: front-desk-crunch simulator.

#### A-EN-04 · `ai-phone-assistant-property-management` (KEPT)
Primary keyword: AI receptionist property management Switzerland · Intent: informational · Format: field guide (vertical) · Thesis: AI safely handles logistics, never decides emergency severity · Closest page: ai-phone-assistant-emergency-limitations-switzerland (new DE, cross-link) · Artifact concept: call-triage rule builder for property managers.

#### A-EN-05 · `ai-answering-service-swiss-trades` (KEPT)
Primary keyword: AI answering service Swiss trades · Intent: informational, local · Format: field guide (vertical) · Thesis: value is in the qualification script (6 questions), not call pickup · Closest page: assistente-ai-artigiani-ticino (IT, same vertical) · Artifact concept: qualification-script builder.

#### A-EN-06 · `how-to-test-ai-receptionist-before-buying` (KEPT)
Primary keyword: how to test AI receptionist · Intent: commercial-investigation · Format: checklist · Thesis: test with your own realistic calls, not the vendor demo · Closest page: swiss-dialect-comprehension-test (DE) · Artifact concept: printable pre-purchase test script.

#### A-EN-07 · `ai-receptionist-reliability-outage-fallback` (KEPT)
Primary keyword: AI receptionist outage fallback · Intent: informational · Format: diagnostic article · Thesis: 3 independent failure points (caller connection, calendar API, vendor platform), each needs its own fallback · Closest page: ai-phone-assistant-failure-handling (DE) · Artifact concept: fallback-readiness self-audit.

#### A-EN-08 · `do-customers-trust-ai-receptionists` (KEPT)
Primary keyword: do customers trust AI receptionists · Intent: informational · Format: investigation/opinion · Thesis: trust comes from 4 factors, not voice realism · Closest page: ai-phone-assistant-greeting-transparency (DE) · Artifact concept: trust-factor self-score.

#### A-EN-09 · `ai-voice-cloning-business-switzerland` (KEPT)
Primary keyword: AI voice cloning business risks · Intent: informational · Format: investigation · Thesis: voice cloning ≠ generic synthetic voice; real risks are impersonation/consent, governed by EU AI Act Art. 50 · Closest page: ai-phone-assistant-greeting-transparency (DE) · Artifact concept: none needed beyond risk checklist.

#### A-EN-10 · `how-to-measure-ai-receptionist-kpis` (KEPT)
Primary keyword: AI receptionist KPIs · Intent: commercial-investigation · Format: diagnostic/checklist · Thesis: "calls answered" is a vanity metric; 12 real KPIs including containment/resolution/correction rate · Closest page: ai-phone-assistant-small-business-case (DE) · Artifact concept: KPI dashboard template generator.

### A · Italian (5 — kept)

#### A-IT-01 · `assistenti-telefonici-ai-svizzera-pmi-ticinesi` (KEPT)
Primary keyword: assistenti telefonici AI Svizzera PMI · Intent: comparison · Format: comparison (market-reach-segmented) · Thesis: right question is language coverage, not "which is best" · Closest page: swiss-ai-phone-assistant-provider-comparison (DE) · Artifact concept: market-reach matcher (Ticino-only vs. multilingual vs. hospitality).

#### A-IT-02 · `registrazione-chiamate-ai-legalita-svizzera` (KEPT)
Primary keyword: registrare chiamate AI Svizzera · Intent: informational · Format: legal/privacy explainer · Thesis: parallels DE call-recording piece, own IT framing/examples · Closest page: ai-call-recording-legality-switzerland (DE) · Artifact concept: recording-legality decision tree (IT).

#### A-IT-03 · `test-comprensione-italiano-ticinese-ai` (KEPT)
Primary keyword: AI italiano ticinese comprensione · Intent: informational · Format: practical test · Thesis: regional cadence + code-switching are two separately-testable layers · Closest page: swiss-dialect-comprehension-test (DE, different linguistic phenomenon) · Artifact concept: Ticinese self-test script.

#### A-IT-04 · `assistente-ai-hotel-bb-campeggi-ticino` (KEPT)
Primary keyword: AI hotel B&B campeggi Ticino · Intent: informational, local · Format: field guide (vertical) · Thesis: tourism-seasonality-driven multilingual reception · Closest page: ai-receptionist-swiss-hotels (EN) · Artifact concept: seasonal-load readiness check. *(relatedArticles fixed 2026-07-29: dangling ref to a cut IT-phone article replaced with `registrazione-chiamate-ai-legalita-svizzera`.)*

#### A-IT-05 · `assistente-ai-artigiani-ticino` (KEPT)
Primary keyword: assistente AI artigiani Ticino · Intent: informational, local · Format: field guide (vertical) · Thesis: value is in the pre-dispatch qualification questions · Closest page: ai-answering-service-swiss-trades (EN) · Artifact concept: dispatch-qualification script builder (IT).

---

## CATEGORY B — Websites, CHF 880, SEO, GEO, Google Ads (30 articles)

### B · German (15 — 10 kept + 5 new Google Ads)

#### B-DE-01 · `website-kosten-schweiz` (KEPT) — Primary KW: Website Kosten Schweiz · Intent: informational · Format: cost breakdown · Thesis: no honest flat number exists, only the real cost components · Artifact concept: cost-component estimator.

#### B-DE-02 · `chf-880-website-schweiz` (KEPT) — Primary KW: günstige Website Schweiz CHF 880 · Intent: transactional · Format: promotion explainer, honest-framing · Thesis: CHF 880 promo scope stated exactly, no percentage-discount framing · Artifact concept: scope-fit checker (does your project fit Starter?).

#### B-DE-03 · `webagentur-schweiz-vergleichen` (KEPT) — Primary KW: beste Webagentur Schweiz · Intent: commercial-investigation · Format: buyer's guide (7 criteria) · Thesis: fair comparison starts post-launch, not at the portfolio · Artifact concept: 10-question agency interview script.

#### B-DE-04 · `website-agentur-freelancer-baukasten-ki` (KEPT) — Primary KW: Webagentur Freelancer Baukasten KI · Intent: commercial-investigation · Format: decision framework · Thesis: the right route depends on 6 project variables, not vendor marketing · Artifact concept: route-recommender quiz.

#### B-DE-05 · `wix-wordpress-webflow-individuell` (KEPT) — Primary KW: Wix WordPress Webflow Vergleich · Intent: commercial-investigation · Format: comparison · Thesis: no best platform, only fit-for-requirements · Artifact concept: platform-fit matcher.

#### B-DE-06 · `website-seo-im-preis-enthalten` (KEPT) — Primary KW: Website SEO im Preis · Intent: commercial-investigation · Format: checklist/price-check · Thesis: technical SEO foundation should always be included, itemized · Artifact concept: quote-scanner checklist (does your quote include X?).

#### B-DE-07 · `website-versteckte-kosten-drei-jahre` (KEPT) — Primary KW: versteckte Kosten Website · Intent: commercial-investigation · Format: investigation (3-year TCO) · Thesis: quote price is only the first line of a 3-year bill · Artifact concept: 3-year TCO calculator.

#### B-DE-08 · `website-seitenanzahl-kmu` (KEPT) — Primary KW: wie viele Seiten Website KMU · Intent: commercial-investigation · Format: decision framework · Thesis: page count follows 4 variables, not a formula · Artifact concept: page-count recommender.

#### B-DE-09 · `website-schnell-erstellen-realistisch` (KEPT) — Primary KW: Website schnell erstellen lassen · Intent: commercial-investigation · Format: diagnostic/checklist · Thesis: speed depends on 6 factors, most on the client's own readiness · Artifact concept: readiness self-score.

#### B-DE-10 · `website-launch-seo-geo-sichtbarkeit` (KEPT) — Primary KW: Website Launch SEO GEO · Intent: commercial-investigation · Format: implementation plan (launch sequence) · Thesis: visibility follows a fixed, non-skippable order · Artifact concept: launch-day checklist generator. Cannibalisation note: reframed vs. the 5 existing generic GEO academy articles as a time-phased launch blueprint, <20% mechanics re-explained (verified in original Batch 8).

#### B-DE-11 · `google-ads-kosten-schweiz-kmu` (NEW)
- **Working title:** Google Ads Kosten Schweiz: was KMU wirklich zahlen
- **Primary keyword:** Google Ads Kosten Schweiz
- **Secondary keywords:** Google Ads KMU Budget, Klickpreis Schweiz, CPC Schweiz
- **Search intent:** commercial-investigation
- **Target reader:** Owner budgeting a first or renewed Google Ads campaign
- **Unique thesis:** Real Swiss CPC benchmarks (CHF 1-5 typical, CHF 3.50-8 local services, higher in Zürich) plus the often-omitted agency-fee layer on top of ad spend
- **Swiss angle:** Zürich CPC premium vs. rest-of-Switzerland; CHF budgeting bands
- **Why different:** First Ads article in the project — cost-breakdown format, mirrors the website-cost article's honesty pattern but for a different product
- **Closest existing page:** `website-kosten-schweiz` (cross-link on methodology, not content)
- **Cannibalisation risk:** Low — genuinely new topic area
- **Internal links:** website-kosten-schweiz, chf-880-website-schweiz
- **CTA:** See Google Ads Growth pricing (CHF 690/month management, ad spend separate — verified against pricing.ts `ads-growth` package before writing)
- **Future Artifact concept:** Budget-band calculator — industry + region in, realistic monthly CHF range out (ranges only, no fabricated precision)
- **Demand:** commercial, high (multiple competitor articles found on this exact query — confirms real demand)
- **Format:** cost breakdown

#### B-DE-12 · `google-ads-fehler-kmu-schweiz` (NEW)
- **Working title:** Die teuersten Google-Ads-Fehler von Schweizer KMU
- **Primary keyword:** Google Ads Fehler KMU
- **Secondary keywords:** Google Ads Anfängerfehler, Streuverluste, Conversion Tracking
- **Search intent:** informational, commercial
- **Target reader:** Owner already running (or about to run) a self-managed campaign
- **Unique thesis:** Mistake-analysis format — real, verifiable mistake categories (broad match without negatives, no conversion tracking, weak landing pages, ignoring Quality Score) rather than generic tips
- **Swiss angle:** Swiss-specific mistakes (e.g. budgeting for national reach when the business is genuinely local-only)
- **Why different:** Mistake-analysis format — new to the project
- **Closest existing page:** `google-ads-kosten-schweiz-kmu` (sibling, cross-link, no repeated content)
- **Cannibalisation risk:** Low
- **Internal links:** google-ads-kosten-schweiz-kmu, google-ads-landingpage-schweiz
- **CTA:** See Google Ads Growth pricing (CHF 690/month management, ad spend separate — verified against pricing.ts `ads-growth` package)
- **Future Artifact concept:** Mistake self-audit — checklist against the named failure categories
- **Demand:** informational, medium-high (real competitor content found confirming demand: "10 Google-Ads-Fehler KMU Schweiz")
- **Format:** mistake analysis

#### B-DE-13 · `google-ads-oder-seo-schweiz` (NEW)
- **Working title:** Google Ads oder SEO zuerst? Die ehrliche Antwort für KMU
- **Primary keyword:** Google Ads oder SEO Schweiz
- **Secondary keywords:** SEA vs SEO, Suchmaschinenmarketing Reihenfolge
- **Search intent:** commercial-investigation
- **Target reader:** Owner with limited budget choosing where to start
- **Unique thesis:** Decision framework based on 3 real variables (urgency, content type, budget horizon) rather than "do both" hand-waving — grounded in real research showing Ads-first for urgent/seasonal needs, SEO-first for evergreen content
- **Swiss angle:** Swiss KMU budget realities
- **Why different:** Decision-framework format, explicitly differentiated from the GEO-vs-SEO academy content (paid vs. organic, not AI-search vs. traditional-search)
- **Closest existing page:** `website-launch-seo-geo-sichtbarkeit` (cross-link on SEO/GEO mechanics, does not repeat)
- **Cannibalisation risk:** Low — explicitly scoped to paid-vs-organic, not SEO-vs-GEO
- **Internal links:** website-launch-seo-geo-sichtbarkeit, google-ads-kosten-schweiz-kmu
- **CTA:** See Google Ads Growth pricing (CHF 690/month management, ad spend separate — verified against pricing.ts `ads-growth` package)
- **Future Artifact concept:** Ads-vs-SEO-first recommender — 3 questions in, recommendation + reasoning out
- **Demand:** commercial-investigation, medium-high (real competitor content confirms this is a common query)
- **Format:** decision framework

#### B-DE-14 · `google-ads-landingpage-schweiz` (NEW)
- **Working title:** Landingpages für Google Ads: was in der Schweiz wirklich konvertiert
- **Primary keyword:** Google Ads Landingpage Schweiz
- **Secondary keywords:** Qualitätsfaktor, Message Match, Conversion Rate Landingpage
- **Search intent:** commercial-investigation
- **Target reader:** Owner running Ads to their homepage and wondering why conversion is low
- **Unique thesis:** A dedicated landing page (not the homepage) with Message Match improves Quality Score and cuts CPC — grounded in real Quality Score mechanics (relevance × expected CTR × landing page experience)
- **Swiss angle:** References Swiss conversion-rate benchmarks (5-15% landing page vs. 1-3% homepage)
- **Why different:** Practical-test/checklist format focused specifically on the Ads→landing-page link, distinct from the general conversion-design topic (which was cut from EN in this restructuring)
- **Closest existing page:** `google-ads-oder-seo-schweiz` (sibling)
- **Cannibalisation risk:** Low
- **Internal links:** google-ads-oder-seo-schweiz, chf-880-website-schweiz
- **CTA:** See Google Ads Growth pricing (CHF 690/month management, ad spend separate — verified against pricing.ts `ads-growth` package)
- **Future Artifact concept:** 7-element landing-page checklist scorer
- **Demand:** commercial, medium (real grounding: Quality Score mechanics independently verified)
- **Format:** checklist / practical test

#### B-DE-15 · `google-ads-erfolg-messen-kmu` (NEW)
- **Working title:** Google Ads Erfolg messen: die Zahlen, die für KMU zählen
- **Primary keyword:** Google Ads Erfolg messen KMU
- **Secondary keywords:** ROAS, Cost per Lead, Conversion Tracking Schweiz
- **Search intent:** commercial-investigation
- **Target reader:** Owner unsure which Ads metrics actually matter for a small business
- **Unique thesis:** Diagnostic piece distinguishing vanity metrics (impressions, clicks) from decision-relevant ones (cost per qualified lead, not just cost per click)
- **Swiss angle:** Swiss CHF-denominated worked example
- **Why different:** Diagnostic format, closes out the DE Ads mini-cluster on measurement rather than spend/mistakes/strategy
- **Closest existing page:** `google-ads-kosten-schweiz-kmu` (sibling)
- **Cannibalisation risk:** Low
- **Internal links:** google-ads-kosten-schweiz-kmu, google-ads-fehler-kmu-schweiz
- **CTA:** See Google Ads Growth pricing (CHF 690/month management, ad spend separate — verified against pricing.ts `ads-growth` package)
- **Future Artifact concept:** Cost-per-qualified-lead calculator
- **Demand:** commercial-investigation, medium
- **Format:** diagnostic

### B · English (10 — 8 kept + 2 new Google Ads, replacing 2 cut articles)

#### B-EN-01 · `business-website-cost-switzerland` (KEPT) — cost breakdown, scope-normalization thesis.
#### B-EN-02 · `chf-880-website-affordable-premium` (KEPT) — promotion explainer, honest framing, verified against pricing.ts line-by-line.
#### B-EN-03 · `best-web-design-agencies-switzerland` (KEPT) — buyer's guide, 4 due-diligence stages.
#### B-EN-04 · `small-business-website-checklist-switzerland` (KEPT) — checklist, pre-quote brief template.
#### B-EN-05 · `website-redesign-signs-switzerland` (KEPT) — diagnostic, 12 warning signs.
#### B-EN-06 · `multilingual-website-switzerland-seo` (KEPT) — technical explainer, uses this codebase's real i18n architecture as a verified case study.
#### B-EN-07 · `local-seo-switzerland-doorway-pages` (KEPT) — decision framework, doorway-page risk.
#### B-EN-08 · `geo-agency-red-flags-switzerland` (KEPT) — vendor-pitch-evaluation format; highest cannibalization risk in the project, resolved (verified <10% overlap with existing GEO cluster).

#### B-EN-09 · `google-ads-cost-switzerland-smes` (NEW, replaces cut `custom-website-vs-template-vs-ai-builder`)
- **Working title:** Google Ads Costs in Switzerland: A Realistic Budget Guide for SMEs
- **Primary keyword:** Google Ads cost Switzerland
- **Secondary keywords:** Google Ads budget SME, CPC Switzerland, Google Ads pricing
- **Search intent:** commercial-investigation
- **Target reader:** English-speaking SME owner or expat founder budgeting Ads
- **Unique thesis:** Own structure/examples (not a translation of the DE cost piece) — framed around 3 budget tiers with the honest "Switzerland costs more than global averages" reality up front
- **Swiss angle:** Swiss CPC premium vs. global benchmarks, CHF budgeting
- **Why different:** Distinct opening/examples from the DE sibling per the project's cross-language non-translation rule
- **Closest existing page:** `business-website-cost-switzerland` (cross-link on methodology only)
- **Cannibalisation risk:** Low
- **Internal links:** business-website-cost-switzerland, chf-880-website-affordable-premium
- **CTA:** See Google Ads Growth pricing (CHF 690/month management, ad spend separate — verified against pricing.ts `ads-growth` package)
- **Future Artifact concept:** Budget-band calculator (EN version, distinct UI copy from DE sibling)
- **Demand:** commercial, medium-high
- **Format:** cost breakdown

#### B-EN-10 · `google-ads-vs-seo-switzerland` (NEW, replaces cut `website-conversion-design-switzerland`)
- **Working title:** Google Ads vs SEO for Swiss Small Business: An Honest Comparison
- **Primary keyword:** Google Ads vs SEO Switzerland
- **Secondary keywords:** paid vs organic search Switzerland, SEA vs SEO
- **Search intent:** commercial-investigation
- **Target reader:** English-speaking SME owner choosing where to invest first
- **Unique thesis:** Own comparison structure (feature-by-feature: speed to results, cost curve over time, durability) distinct from the DE decision-framework sibling's 3-variable-in/recommendation-out approach
- **Swiss angle:** Swiss budget/market-size realities
- **Why different:** Comparison format vs. DE-13's decision-framework format — same topic area, different structural treatment, satisfies both cross-language uniqueness and format diversity
- **Closest existing page:** `geo-agency-red-flags-switzerland` (cross-link on GEO/AI-search being a separate axis, does not repeat)
- **Cannibalisation risk:** Low — explicitly scoped to paid-vs-organic
- **Internal links:** geo-agency-red-flags-switzerland, google-ads-cost-switzerland-smes
- **CTA:** See Google Ads Growth pricing (CHF 690/month management, ad spend separate — verified against pricing.ts `ads-growth` package)
- **Future Artifact concept:** Side-by-side timeline visualizer (Ads results curve vs. SEO results curve)
- **Demand:** commercial-investigation, medium-high
- **Format:** comparison

### B · Italian (5 — 4 kept + 1 new Google Ads, replacing 6 cut articles)

#### B-IT-01 · `costo-sito-web-ticino-svizzera` (KEPT) — informational cost anatomy, launch-vs-ongoing split.
#### B-IT-02 · `sito-web-chf-880-svizzera` (KEPT) — promotion explainer, verified line-by-line against pricing.ts, "prezzo civetta" skepticism framing.
#### B-IT-03 · `sito-web-piccola-impresa-ticino` (KEPT) — 5 business-type priority profiles (ristorante/estetica/artigiano/consulente/studio medico).
#### B-IT-04 · `seo-locale-ticino` (KEPT) — doorway-page decision framework, Ticino-specific comune-merger check (Lugano/Bellinzona).

#### B-IT-05 · `google-ads-ticino-costi` (NEW, replaces 6 cut IT-web articles — see restructuring note below)
- **Working title:** Google Ads in Ticino: quanto costa e quando conviene davvero
- **Primary keyword:** Google Ads costi Ticino
- **Secondary keywords:** Google Ads Svizzera italiana, pubblicità Google PMI Ticino
- **Search intent:** commercial-investigation, local
- **Target reader:** Ticino SME owner considering Google Ads for the first time
- **Unique thesis:** Combines cost anchoring (Ticino/Swiss CPC reality) and a decision framework (when Ads makes sense vs. when SEO/local listings are enough) in one piece, since this is Italian's only Ads slot
- **Swiss angle:** Ticino-specific competitive landscape (smaller, more local-service-driven market than Zürich/Basel)
- **Why different:** Only IT Google Ads piece — deliberately broader in scope than the single-angle DE Ads articles to cover both cost and decision-making in one place
- **Closest existing page:** `costo-sito-web-ticino-svizzera` (cross-link on methodology)
- **Cannibalisation risk:** Low — first Ads content in Italian
- **Internal links:** costo-sito-web-ticino-svizzera, seo-locale-ticino
- **CTA:** See Google Ads Growth pricing (CHF 690/month management, ad spend separate — verified against pricing.ts `ads-growth` package)
- **Future Artifact concept:** Ticino budget + decision calculator (combines both DE mini-tools' logic into one)
- **Demand:** commercial-investigation, local, medium
- **Format:** cost breakdown + decision framework (combined, justified by single-slot constraint)

---

## Restructuring note — articles cut from the prior build

To hit the new 15 DE / 10 EN / 5 IT per-category split (previously 10/10/10), 13 articles were removed from the branch on 2026-07-29 (git history preserves full content):

**IT phone (5 cut):** `assistente-ai-centralino-segreteria-confronto`, `trasparenza-ai-telefono-ticino`, `numero-esistente-assistente-ai-ticino`, `assistente-ai-amministrazione-immobiliare-ticino`, `chiamate-commerciali-automatiche-ai-svizzera`

**IT web (6 cut):** `preventivo-sito-web-20-voci`, `migliore-agenzia-web-ticino`, `costo-ecommerce-ticino`, `sito-multilingue-svizzera-ticino`, `geo-ticino-fonte-citabile`, `rifare-o-riparare-sito-ticino`

**EN web (2 cut, replaced by Google Ads articles):** `custom-website-vs-template-vs-ai-builder`, `website-conversion-design-switzerland`

All 60 Claude Artifact `ARTIFACT-BRIEF.md` + `artifact-data.json` file pairs were also removed from `artifacts/` — Phase 2 (building the 60 public Artifacts) has not started. This plan's "Future Artifact concept" field is the Phase 1 deliverable for that requirement.

One dangling `relatedArticles` reference (in the kept `assistente-ai-hotel-bb-campeggi-ticino`, pointing at a cut article) was found and fixed to point at `registrazione-chiamate-ai-legalita-svizzera` instead.

---

## Audit log (format-diversity + factual-honesty compliance)

Completed 2026-07-29 after all 13 new articles were written. Two dedicated passes:

### Fictional-scenario labeling (master prompt §7)

Every one of the 60 articles was checked for narrative/illustrative examples that could read as a real Weissmann customer (a real risk, since Weissmann has no real customers/testimonials yet). Calibration: label a scene when it is a named invented actor OR a vividly specific worked case presented as fact with no illustrative flag before it; leave generic category phrasing, general mechanism statements, real sourced facts, and scenes already disclosed as illustrative.

- **13 new articles:** written with the labeling convention built into their briefs; each author confirmed correct use (or no fictional scenes).
- **47 kept articles:** 20 files received a label (21 labels total) where a named/vivid invented scene previously ran unflagged. Highest-risk cases fixed: the IT CHF-880 article's "Marco fa l'elettricista" reacting to the real promo price; the EN KPI article's physiotherapy-practice "6-month outcome" that read as a real result; the EN redesign article's Zug architecture practice; the DE call-recording article's Bern boutique-hotel opener. 27 kept files reviewed and left unchanged (scenes already disclosed, generic openers, or real sourced facts — e.g. the Arup deepfake case, AWS Chime docs, the real 6-vendor comparison set, Weissmann's own pricing, the codebase's real i18n architecture).

### Format diversity (no more than 3 articles sharing substantially the same structure)

Close-read classification of all 60. **No structural reframe was required** — nothing exceeds 3 at the level of shared section logic:

- **Legal/privacy explainer:** only 2 are genuinely law-anchored explainers (`ai-call-recording-legality-switzerland` + IT sibling `registrazione-chiamate-ai-legalita-svizzera`). `ai-phone-assistant-greeting-transparency` is on close read a greeting-craft field guide (bad/good scripts + building blocks + self-test), and the new `ai-phone-assistant-emergency-limitations-switzerland` is a diagnostic/checklist ("must never / must always / escalation protocol / pre-launch test") — deliberately NOT a 4th legal explainer. Even counted generously = 3, at the cap.
- **Field guide (vertical):** 5 candidates, but distinct organizing spines — hotels EN (guest-call transcript + escalation boundary + 9-Q checklist), property-mgmt EN (triage rule-set + always-escalate list + grey-zone case), trades EN (6-Q qualification script), IT hotel/B&B/camping (three-property-type triptych + fixed 144/117/118 rule), IT artigiani (6-Q script + per-trade good/bad). Only trades-EN and artigiani-IT share substantially the same skeleton = 2 ≤ 3.
- **CHF 880 promotion trio** (DE/EN/IT) = 3 by design (one per language), at the cap.
- All other genres (decision framework, diagnostic, comparison, cost breakdown, stress test, implementation playbook, etc.): at the level of shared section logic, none exceeds 3.

**Result:** project is within both the fictional-labeling and format-diversity rules. Build (709 pages) and all 6 validators pass clean after the 20 labeling edits.
