# Weissmann Assistant — Chat Specification v3 (zero AI cost, approved)

Status: **architecture approved by owner 2026-07-20; build after homepage
concept (A/B) selection**, as part of the same design system. Owner decisions:
no recurring AI API costs in v1; conversational experience (§5a), premium
same-design-language UI (§5b), branding "Weissmann Assistant" (§5); engine
abstraction unchanged so a future LLM swap replaces only the backend engine,
never the interface (§9). Research drafts live in `docs/chat/research/`.

---

## 1. Architecture (v1 — fully static, CHF 0/month)

```
Build time                                   Browser (everything runs client-side)
──────────                                   ─────────────────────────────────────
src/data/pricing.ts  ─┐                      Chat island, lazy-loaded on first open
src/data/site.ts     ─┼→ scripts/build-kb →  ├─ Guided flows (decision tree)
src/i18n/ui.ts       ─┤   public/chat-kb/    ├─ Local search index (per language)
src/chat/faq/*.md    ─┘   {de,en,it,fr}.json ├─ Curated answer renderer
src/chat/flows/*.json                        └─ WhatsApp handover (wa.me draft)
```

- No backend, no serverless function, no API key anywhere. The only network
  request the chat makes is loading its own KB JSON from the same static site.
- Launcher is server-rendered as a plain locale-aware `<a href="/kontakt/">`,
  progressively enhanced into the chat toggle (works with JS disabled; crawlers
  see a meaningful link).
- Engine seam for the future: UI calls `engine.answer(question, ctx)` returning
  `{text, sources, confidence, followUps}`. v1 = `LocalFaqEngine` (sync,
  client-side). Future `RemoteAiEngine` implements the same interface (§9).

## 2. Knowledge base (anti-drift by construction)

Adapted from `research/kb-design.md`; the generation pipeline carries over 1:1.

- `kb/generated/pricing.json` + `contact.json` are **imported** from
  `src/data/pricing.ts` / `site.ts` at build time (sorted keys, stable order) —
  prices, minutes, overage, contract terms, disclosures, Stripe links and the
  VAT note (`price.vatNote` from `src/i18n/ui.ts`) can never diverge from the site.
- Hand-authored docs (`services/*.md`, `faq/{de,en,it,fr}/*.md`, `company.md`,
  `process.md`, `limitations.md`) are **price-free by lint**: build fails if any
  hand-written KB file matches `CHF\s*\d`, a `buy.stripe.com` URL, or a phone
  number other than `SITE.phone`.
- `limitations.md` is the negative-knowledge doc: business hours NOT confirmed,
  legal entity/UID NOT confirmed, named integrations NOT verified, no discounts,
  no delivery-time promises. When a fact is confirmed it moves OUT of this file.
- Existing dist QA gates (no Podomedics, no legacy address, no CHF 590, verified
  Stripe links only) also scan `public/chat-kb/*.json`.
- Every answer node carries: localized text, optional CTA (pricing / contact /
  WhatsApp), and its disclosure lines (12-month contract, ad spend excluded,
  no ranking/citation guarantees) so honesty travels with the answer.

## 3. Conversation model

- Greeting + disclosure → topic chips (KI-Telefonassistent, Website-Pakete,
  SEO & GEO, Preise, Ablauf, Kontakt) → decision-tree answers with follow-up
  chips → free-text search at every step → conversion CTAs.
- Max 3 qualification questions (business type, service, goal), always skippable.
- Every leaf offers a human exit. No dead ends.
- **No-match path** (search confidence low or zero hits): honest "keine
  gesicherte Antwort" + immediate WhatsApp offer. Fires `chat_no_answer`.
- **Human-only topics** (never answered by the assistant): custom quotes, legal
  or contract interpretation, complaints, data-deletion requests, anything medical.
- **Emergency/medical rule** (critic fix): the medical/emergency response states
  the chat is not for emergencies and refers to the local emergency number —
  it contains **no sales content and no WhatsApp CTA**. Healthcare-related pages
  additionally pin: "Dieser Chat bietet keine medizinische Beratung und ist
  nicht für Notfälle geeignet." (+ EN/IT/FR — see research/privacy.md §1.4).

## 4. WhatsApp handover (approval-first, never auto-send)

1. Triggers: visitor request, no-match, or human-only topic (except the
   emergency message, which never carries the CTA).
2. Summary built ONLY from the visitor's selected topic + typed question;
   sensitive data (names, phone, email, health, payment) stripped; shown as an
   **editable preview** with Approve / Edit / Cancel. Cancel is free.
3. Templates (research/flows.md §2.4, verbatim):
   - DE `Hallo Weissmann AI, ich habe gerade mit dem Website-Assistenten gesprochen. Ich interessiere mich für [service]. Meine Frage ist: [summary].`
   - EN `Hello Weissmann AI, I just spoke with the website assistant. I am interested in [service]. My question is: [summary].`
   - IT `Buongiorno Weissmann AI, ho appena parlato con l'assistente del sito web. Mi interessa [service]. La mia domanda è: [summary].`
   - FR `Bonjour Weissmann AI, je viens de parler avec l'assistant du site web. Je m'intéresse à [service]. Ma question est : [summary].`
   `[service]` = localized package name from pricing.ts; the sentence is dropped
   entirely (never guessed) if no service was discussed.
4. URL: `https://wa.me/41783459788?text=` + encodeURIComponent(approved message).
   Clear notice: conversation continues outside the website on WhatsApp; the
   visitor sends the draft themselves.
5. Availability honesty — the only permitted wording family (never claim someone
   is available now; business hours unconfirmed):
   - DE "Sie können uns trotzdem auf WhatsApp schreiben – das Team meldet sich so schnell wie möglich."
   - EN/IT/FR equivalents in research/flows.md §2.6. A config object
     (`docs/chat/availability.json`: per-weekday hours, tz Europe/Zurich) ships
     EMPTY; richer wording only unlocks when the business fills it.
6. Privacy exception, documented (critic fix): the wa.me `?text=` prefill is the
   single allowed case of visitor content in a URL — user-approved,
   user-initiated, PII-stripped, opens a third-party app.

## 5. Branding & languages (owner decision 2026-07-20)

Product name: **Weissmann Assistant** (identical in all four languages — it is
a brand name, not a description). Rationale: premium and brand-anchored; makes
no capability claim v1 can't back; graduates naturally to "Weissmann AI
Assistant" when the §9 LLM engine ships. "Ask Weissmann" is reserved as an
optional EN marketing label; do not mix names in the UI.

Disclosure line under the title (small, always visible):
- DE "Basiert auf der Weissmann Wissensdatenbank. Bei komplexen Fragen verbinden wir Sie mit unserem Team."
- EN "Powered by our Weissmann knowledge base. For complex questions you'll be connected with our team."
- IT "Basato sulla knowledge base di Weissmann. Per domande complesse la mettiamo in contatto con il nostro team."
- FR "Basé sur la base de connaissances Weissmann. Pour les questions complexes, nous vous mettons en contact avec notre équipe."

Launcher labels stay localized: Mit Weissmann chatten / Chat with Weissmann /
Chatta con Weissmann / Discutez avec Weissmann. Four-language microcopy pack
(consent line, buttons, error, offline) in research/flows.md §4 — replace any
"KI-Assistent"/"Digitaler Assistent" wording with "Weissmann Assistant" + the
disclosure above; explicit AI self-description is reserved for the §9 upgrade.
Swiss orthography (ss, never ß), formal address (Sie/Lei/vous). Chat opens in
page language; in-chat switch reloads the per-language KB; no mixed-language turns.

## 5a. Conversational experience (never a FAQ page)

- Friendly greeting; the assistant asks **one question at a time**.
- Answers are short: max ~60 words / 2 sentences per bubble; longer content is
  split into sequential bubbles with a natural pause, or linked to the page.
- Every assistant turn ends with a **clear next action**: 2–4 follow-up chips
  plus one primary CTA (pricing, demo, consultation, WhatsApp).
- **Topic memory per session**: the current topic/service persists in
  sessionStorage; follow-ups resolve against it ("Und was kostet Premium?"
  works after the phone-agent topic is active) and the recommended next step
  is topic-aware (phone agent → demo; websites → consultation; SEO/GEO → audit).
- Never dump documentation; never show more than one question or one answer
  block at once; typing/appear transitions pace the exchange (no fake delays
  pretending a human is typing — a brief 200–400ms reveal is pacing, not deception).

## 5b. Visual design (same design system, no widget look)

- Built from the site's design tokens — the assistant is part of the chosen
  homepage concept (A or B), not a separate style. No third-party widget.
- Panel: rounded **glass surface** (backdrop blur + translucent paper tone,
  hairline border from --line), premium spacing, site typography (Instrument Sans).
- Motion: subtle and functional — panel scale/fade on open (~250ms ease-out),
  messages fade/slide in (~200ms, staggered), chip hover transitions; all
  gated by prefers-reduced-motion; no infinite/decorative animation (QA
  screenshot-stability rule applies).
- Desktop: docked bottom-right panel (~390px). Mobile: full-height sheet with
  slide-up transition. Benchmark: Apple support chat, not helpdesk widgets.

## 6. Analytics (single schema — critic fix #1)

All events via existing `wmEvent()` (Consent Mode v2 respected; no new consent
logic; never call gtag directly). **Closed parameter set:** `language`,
`service_slug` (pricing.ts id or 'none'), `turn_count`, `trigger`
(`user_request | no_answer | human_topic`). **Never free text.**

| Event | Trigger | Key event |
|---|---|---|
| chat_open | panel opened | no |
| chat_question | free-text question submitted | no |
| chat_service_selected | topic/service chip chosen | no |
| chat_pricing_view | a pricing answer rendered | no |
| chat_demo_request | demo CTA clicked | yes |
| chat_consultation_request | consultation CTA clicked (precedes form's generate_lead) | yes |
| chat_whatsapp_transfer | approved wa.me link opened (distinct from site-wide whatsapp_click) | yes |
| chat_no_answer | no-match path shown | no |
| chat_error | KB failed to load / runtime error (param error_code) | no |
| chat_close | panel closed | no |

KPI loop: containment rate, handover rate, top service interests, no-answer
rate. Monthly: review `chat_no_answer` + question-category taxonomy → add FAQ
entries in all four languages together (four-language sync policy). Full
measurement design: research/analytics.md.

## 7. Privacy & security (v1)

- No data leaves the browser except the visitor-tapped wa.me link. No cookies,
  no accounts, no server logs; conversation state in `sessionStorage['wm-chat']`
  only. Nothing to retain or breach server-side; no API keys exist.
- CSP unchanged (no new connect-src). If `api.anthropic.com` ever appears in a
  CSP diff, someone moved a model call client-side — reject the change.
- Answers render as text with a whitelist-only linkifier (own domain, the wa.me
  number, tel:, mailto:) — no innerHTML from KB content.
- Datenschutz page gains one paragraph describing the chat (client-side, no
  storage) — bundled into the pending legal review. Lawyer checklist (incl. the
  items that only apply if the AI engine is ever enabled): research/privacy.md §1.5.

## 8. Failure & fallback

KB JSON fails → panel shows contact links (microcopy "offline" pack). JS
disabled → launcher stays a plain /kontakt/ link. Search no-hit → no-answer path
(a feature, not an error). No cold starts, rate limits, or API outages exist in v1.

## 9. Future AI upgrade (design-only; NOT built; NO paid APIs now)

Enable by config flag: `RemoteAiEngine` → Netlify Function → LLM grounded in the
SAME generated KB, key only in a Netlify env var. The full hardened design is
already drafted and parked: system-prompt grounding contract & refusal templates
(research/kb-design.md §3), rate limiting/budget kill-switch/injection layers/
output allowlist (research/privacy.md §2), reference costs at ~4k msgs/month
≈ CHF 15–40 on Haiku-tier. UI, KB, analytics, handover: unchanged by the swap.
Prerequisite: owner approves recurring cost; lawyer reviews processor addendum.

## 10. Build checklist (when homepage concept is chosen)

- [ ] `scripts/build-kb.mjs` + CHF-lint + KB QA gates wired into `npm run build`
- [ ] Flows + FAQ authored in DE, then EN/IT/FR (ship together)
- [ ] Chat island + launcher (progressive enhancement), mockup as visual target
- [ ] `availability.json` empty; wording family §4.5 only
- [ ] Analytics events + GA4 key-event marking (chat_demo_request,
      chat_consultation_request, chat_whatsapp_transfer)
- [ ] Datenschutz paragraph drafted for legal review
- [ ] Preview deploy → owner approval (never straight to production)
