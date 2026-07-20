# Chat with Weissmann â€” GA4 Event Plan & Measurement Design

Property: `G-3L30SCGWGT` (loaded once via `ConsentAnalytics.astro`). All chat events fire through the existing `window.wmEvent(name, params)` helper, guarded as `if (window.wmEvent) window.wmEvent(...)` like `MissedCallsCalculator.astro` and `ContactPage.astro` do. No new gtag loader, no second property.

## 0. Shared parameter vocabulary (the only params allowed)

No free text of the conversation is ever sent. Every parameter is a closed enum or an integer.

| Parameter | Type | Values | Notes |
|---|---|---|---|
| `language` | enum | `de` \| `en` \| `fr` \| `it` | Derived from URL locale prefix (`''` = de, `/en`, `/fr`, `/it`), matching `localePrefix()` in `src/data/site.ts` |
| `service_slug` | enum | `phone-starter` \| `phone-premium` \| `phone-enterprise` \| `website-starter` \| `website-business` \| `website-complex` \| `seo-growth` \| `geo-authority` \| `ads-growth` \| `general` | Exactly the `id` values in `src/data/pricing.ts` (single source of truth); `general` when no package identified |
| `turn_count` | integer | 0â€“n | Count of **user** messages so far in this conversation |
| `qualification_step` | enum | `none` \| `service_identified` \| `pricing_discussed` \| `contact_offered` \| `contact_accepted` | Monotonic; never downgraded within a conversation |
| `question_category` | enum | `pricing` \| `package_scope` \| `contract_terms` \| `languages` \| `technical` \| `integrations` \| `business_hours` \| `legal_entity` \| `booking` \| `support` \| `out_of_scope` \| `other` | Classified client-side/by the bot into this fixed taxonomy â€” **never the raw question text** |

GA4 setup (one-time, Admin): register `service_slug`, `language`, `qualification_step`, `question_category` as **event-scoped custom dimensions** and `turn_count` as an **event-scoped custom metric**. Without registration the params are collected but not reportable.

## 1. Chat event plan

| Event | Trigger | Parameters | GA4 key event? | Consent behaviour | Test method |
|---|---|---|---|---|---|
| `chat_open` | User expands the chat widget (first open per page load; guard with a `sessionStorage` flag so re-opens in the same session fire at most once per page) | `language` | No | Fires always via `wmEvent`; under Consent Mode v2 with `analytics_storage: denied` it is sent as a cookieless ping (no persistent ID, feeds modeling only). Granted â†’ normal persisted hit. No consent check inside chat code â€” the helper + Consent Mode handle it uniformly | Open chat with `wm-consent=granted` in localStorage â†’ event visible in GA4 DebugView (enable via Tag Assistant or `debug_mode`). Repeat with consent denied â†’ Network tab still shows `/g/collect` ping with `gcs=G100`, DebugView shows nothing persisted |
| `chat_question` | User submits a message (every user turn) | `language`, `turn_count`, `question_category`, `service_slug` (current, or `general`) | No | Same as above â€” high-volume event, deliberately not a key event | Send 3 messages â†’ 3 events with `turn_count` 1, 2, 3 in DebugView; verify payload contains only enum/int params, no message text, by inspecting the `/g/collect` request |
| `chat_service_selected` | Bot resolves which package the user is asking about (first time per `service_slug` per conversation â€” dedupe with an in-memory set) | `language`, `service_slug`, `turn_count` | No | Standard Consent Mode behaviour | Ask "What does the Premium phone agent cost?" â†’ one event with `service_slug: phone-premium`; ask again â†’ no duplicate; ask about SEO â†’ new event with `seo-growth` |
| `chat_pricing_view` | Bot renders a price answer (a card/answer containing CHF figures from `pricing.ts`), once per `service_slug` per conversation | `language`, `service_slug`, `turn_count`, `qualification_step` (â‰¥ `pricing_discussed`) | No | Standard | Trigger a price answer for Starter â†’ event with `service_slug: phone-starter`, `qualification_step: pricing_discussed`; confirm price shown matches `pricing.ts` (CHF 350) |
| `chat_demo_request` | User clicks the in-chat "book/see a demo" CTA (click on the control, not on bot suggestion render) | `language`, `service_slug`, `turn_count`, `qualification_step` | **Yes** | Standard; as a key event it is also eligible for conversion modeling when consent is denied | Click demo CTA â†’ event in DebugView; verify it is toggled "key event" in Admin â†’ Events; verify it does **not** also fire the existing `request_demo` (distinct name) |
| `chat_consultation_request` | User clicks the in-chat "book a consultation" CTA that deep-links to the contact form / booking (fires on click, before navigation, `transport_type: 'beacon'`) | `language`, `service_slug`, `turn_count`, `qualification_step` (set to `contact_accepted`) | **Yes** | Standard | Click CTA â†’ event fires, then landing on `/kontakt` shows the normal `form_start` â†’ `form_submit` â†’ `generate_lead` chain from `ContactPage.astro`; confirm exactly one `chat_consultation_request` and zero `generate_lead` until the form is actually submitted |
| `chat_whatsapp_transfer` | User clicks the WhatsApp handover link **inside the chat** (`https://wa.me/41783459788?text=Hello%20I%20am%20interested...`). Implementation note: this anchor must **not** carry `data-track="whatsapp_click"` â€” the delegated listener in `ConsentAnalytics.astro` fires `wmEvent` for any `a[data-track]`, which would double count. Either omit `data-track` and fire manually, or set `data-track="chat_whatsapp_transfer"` and let delegation handle it (pick one, not both) | `language`, `service_slug`, `turn_count`, `qualification_step` | **Yes** | Standard | Click chat WhatsApp link â†’ exactly one `chat_whatsapp_transfer` and **zero** `whatsapp_click` in DebugView; then click a page-level WhatsApp button â†’ `whatsapp_click` only |
| `chat_human_handover` | Bot offers/executes escalation to a human for any reason: user asks for a person, bot hits a hard limit (medical, emergency, unverified integrations, business hours, legal entity, anything requiring "I don't know") and presents phone/WhatsApp/email contact | `language`, `service_slug`, `turn_count`, `qualification_step`, `question_category` (the category that triggered escalation) | No (operational metric, not a conversion) | Standard | Ask "What are your opening hours?" â†’ bot declines to invent hours, offers human contact â†’ `chat_human_handover` with `question_category: business_hours`. If the user then taps WhatsApp, `chat_whatsapp_transfer` fires additionally |
| `chat_no_answer` | Bot answers with its "I don't know" pattern (no grounded answer in the verified facts) and offers human contact | `language`, `turn_count`, `question_category`, `service_slug` | No | Standard | Ask something outside the KB ("Do you integrate with TheFork?") â†’ `chat_no_answer` with `question_category: integrations`; verify raw question text is absent from the request payload |
| `chat_close` | User collapses/ends the chat, or page `visibilitychange`/`pagehide` with an open conversation (use `transport_type: 'beacon'`; dedupe so close fires once per conversation) | `language`, `turn_count`, `qualification_step`, `service_slug` | No | Standard | Open chat, send 2 messages, close â†’ event with `turn_count: 2`; close tab mid-conversation â†’ beacon event still recorded (check DebugView/Realtime) |

**Key events summary:** mark only `chat_demo_request`, `chat_consultation_request`, `chat_whatsapp_transfer` as GA4 key events. `generate_lead`, `book_consultation`, `request_demo` remain the existing form/page-level key events. Do **not** mark `chat_open` or `chat_question` â€” they would drown real conversions.

**Consent (applies to all rows):** the chat adds no consent logic of its own. `ConsentAnalytics.astro` defaults all storage to `denied`, re-applies `localStorage['wm-consent']`, and `wmEvent` always calls `gtag('event', ...)`. Under denied consent, hits go out cookieless (Consent Mode v2 advanced mode) and are used only for aggregate modeling; under granted consent they persist normally. "Events simply don't persist if denied" â€” nothing is queued, retried, or stored locally.

## 2. Interaction with the existing funnel

| Concern | Rule |
|---|---|
| **WhatsApp double counting** | `whatsapp_click` stays the page-level CTA event; `chat_whatsapp_transfer` is chat-only. Distinct names, and the chat anchor must not match the `a[data-track="whatsapp_click"]` delegation (see table above). Total WhatsApp intent = `whatsapp_click + chat_whatsapp_transfer`; never sum a shared name |
| **Phone** | If the chat displays `tel:+41783459788`, give it `data-track="chat_human_handover"`-adjacent handling or no `data-track` at all; the page-level `phone_click` remains reserved for page CTAs |
| **Consultation â†’ lead** | `chat_consultation_request` = intent (chat CTA click). `generate_lead` = outcome, and continues to fire **only** on actual form submit in `ContactPage.astro`. Expected sequence: `chat_consultation_request` â†’ `form_start` â†’ `form_submit` â†’ `generate_lead`. Never fire `generate_lead` from the chat itself |
| **Demo** | `chat_demo_request` (chat) vs existing `request_demo` (page CTA) â€” same split as WhatsApp. `demo_play`/`demo_complete` stay video-only |
| **Calculator** | If the chat links to the missed-calls calculator, `calculator_start`/`calculator_complete` keep firing from the calculator component; no chat duplicate |
| **Attribution reading** | In funnel explorations, treat `chat_*` events as assist steps preceding the canonical key events (`generate_lead`, `book_consultation`, `request_demo`); the canonical events remain the single source for lead counting so historical comparisons stay valid |

## 3. KPI dashboard sketch (GA4 Explorations / Looker Studio, one page)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ CONTAINMENT RATE           â”‚ HANDOVER RATE              â”‚ NO-ANSWER RATE             â”‚
â”‚ scorecard, monthly trend   â”‚ scorecard + sparkline      â”‚ scorecard + sparkline      â”‚
â”‚ = sessions w/ chat_open    â”‚ = sessions w/               â”‚ = chat_no_answer           â”‚
â”‚   and NO chat_human_       â”‚   chat_human_handover OR   â”‚   / chat_question          â”‚
â”‚   handover and NO chat_    â”‚   chat_whatsapp_transfer   â”‚ (also: % sessions with     â”‚
â”‚   whatsapp_transfer        â”‚   / sessions w/ chat_open  â”‚  â‰¥1 no-answer)             â”‚
â”‚   / sessions w/ chat_open  â”‚ breakout: whatsapp vs otherâ”‚ target: falling m/m        â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ TOP SERVICE INTERESTS                    â”‚ CONVERSION ASSIST                          â”‚
â”‚ bar chart: chat_service_selected count   â”‚ funnel exploration (session-scoped):       â”‚
â”‚ by service_slug, split by language       â”‚ chat_open â†’ chat_pricing_view â†’            â”‚
â”‚ (phone-starter â€¦ ads-growth)             â”‚ chat_consultation_request â†’ generate_lead  â”‚
â”‚ secondary: chat_pricing_view by slug     â”‚ + segment compare: sessions WITH chat_open â”‚
â”‚ = demand signal per package              â”‚ vs WITHOUT â†’ lead rate uplift              â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ QUALIFICATION DEPTH                      â”‚ NO-ANSWER BREAKDOWN (feeds KB loop, Â§4)    â”‚
â”‚ chat_close count by qualification_step   â”‚ table: chat_no_answer by question_category â”‚
â”‚ + avg turn_count at close                â”‚ Ã— language, sorted desc, m/m delta         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

Definitions:

- **Containment rate** â€” share of chat sessions resolved without any human transfer: `(sessions with chat_open âˆ’ sessions with chat_human_handover OR chat_whatsapp_transfer) / sessions with chat_open`.
- **Handover rate** â€” complement, with a WhatsApp-vs-other breakout (`chat_whatsapp_transfer` is the measurable half of handover; phone/email offers are counted via `chat_human_handover`).
- **Top service interests** â€” `chat_service_selected` by `service_slug`; compare against actual `chat_consultation_request` by slug to spot packages with interest but no conversion.
- **No-answer rate** â€” `chat_no_answer / chat_question`; the input metric for the KB loop below.
- **Conversion assist** â€” session-scoped funnel `chat_open â†’ generate_lead`, plus a segment comparison (chat vs non-chat sessions) for lead-rate uplift.

Caveat on every scorecard: with `analytics_storage` denied for a share of visitors, session-scoped metrics are partly **modeled**; read trends, not absolute counts, and keep date ranges â‰¥28 days.

## 4. Monthly KB-improvement loop

**Cadence:** first week of each month, ~1 hour.

1. **Export** â€” GA4 exploration: `chat_no_answer` and `chat_human_handover` for the previous month, dimensions `question_category` Ã— `language` Ã— `service_slug`, plus `chat_question` totals for the rate. No raw text exists anywhere in GA4 â€” the taxonomy is the review unit by design.
2. **Prioritize** â€” rank categories by count; act on any category with â‰¥3 occurrences or any category whose no-answer rate rose month-over-month. Weight categories that co-occur with high `qualification_step` (a no-answer at `pricing_discussed` costs more than one at `none`).
3. **Triage each category into exactly one bucket:**
   - **Answerable from verified facts** â†’ write a new FAQ/KB entry sourced strictly from `pricing.ts` / `site.ts` / approved page copy. Ship in all four languages (DE+EN+FR+IT together, per the four-language sync policy) before the next review.
   - **Needs business confirmation** (`business_hours`, `legal_entity`, `integrations`, anything not in the verified facts) â†’ add to a "pending confirmation" queue for Giovanna; the bot keeps saying "I don't know" + human contact until the fact is confirmed. **Never** close these by inventing an answer â€” hard limits stay hard.
   - **Correctly out of scope** (`out_of_scope`: medical, emergency, guarantees) â†’ no KB change; verify the refusal + handover wording is working and `chat_human_handover` fired.
4. **Refine the taxonomy** â€” if `other` exceeds ~20% of no-answers, split it into new enum values, update the classifier and the GA4 custom-dimension documentation in the same deploy.
5. **Close the loop** â€” after deploy, note the shipped FAQ entries against last month's categories; next month's dashboard (Â§3, no-answer breakdown with m/m delta) verifies the no-answer rate dropped in exactly those categories. Target: overall no-answer rate trending down while `chat_question` volume grows.
