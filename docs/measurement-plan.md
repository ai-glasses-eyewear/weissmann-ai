# Weissmann AI — Conversion Measurement Plan (GA4)

Prepared 2026-07-23. Property: **G-3L30SCGWGT** (existing, loaded once via
`ConsentAnalytics.astro`, Google **Consent Mode v2**, `anonymize_ip`).

The site already fires a GA4 event for **every** annotated CTA — a single
delegated listener sends `gtag('event', <data-track value>, …)` for any
`<a data-track="…">`, on every page and language. This doc is the catalog +
the exact GA4 setup so you can **measure and optimise revenue**, not just
traffic.

> Nothing here changes the site's behaviour for visitors. The only code change
> shipped with this plan: the Stripe checkout button now also sends the plan's
> **CHF price** (`value` + `currency`) so GA4 can measure the value of checkout
> starts.

---

## 1. Event catalog

| Event | Fires when | Where | Extra params | Mark as Key Event? |
|---|---|---|---|---|
| **`begin_checkout`** | Visitor clicks **Subscribe** (Stripe) | pricing cards (phone, SEO, GEO, Ads) | `value` (CHF price), `currency` (CHF), `item_id` (package id) | ✅ **Primary** |
| **`call_ai_live`** | Taps a **call-the-live-AI** button (`tel:`) | hero, phone page, header, mobile bar, industry pages, contact | `link_url`, `page_path` | ✅ |
| **`book_consultation`** | Clicks **"Questions first / Book a call"** | pricing cards, contact links | `link_url` | ✅ |
| **`request_demo`** | Clicks **"Request a demo"** | homepage, industry, services, checklist CTAs | `link_url` | ✅ |
| `lead_magnet_submit` | Submits the checklist email form | resource/checklist pages* | `resource` | ✅ (once PR merges) |
| `lead_magnet_view` | Loads a page with the capture form | resource/checklist pages* | `resource` | — |
| `roi_calculator_view` | Clicks through to the ROI calculator | pricing / phone page | `link_url` | — (micro) |
| `phone_click` / `email_click` / `whatsapp_click` | Uses a direct contact channel | contact page | `link_url` | — (micro) |
| `demo_play` / `demo_complete` | Plays / finishes the voice demo video | homepage | — | — (micro) |
| `checklist_progress` | Ticks checklist items | resource checklists | `checked`, `total` | — (engagement) |
| `glasses_view` | Clicks through to ai-eyewear.ch | homepage, services hub | `link_url` | — |

\* `lead_magnet_*` ship with the "Buyer's Checklist" PR; the rest are live now.

---

## 2. What to do in GA4 (once, ~10 minutes)

**A. Mark the 5 money events as Key Events (conversions).**
Admin → **Key events** → *New key event* → type the event name exactly:
`begin_checkout`, `call_ai_live`, `book_consultation`, `request_demo`,
`lead_magnet_submit`. (You can add them before data arrives — the name must
match exactly. Existing events also get a "Mark as key event" toggle under
Admin → Events after ~24–48h of collection.)

**B. Value.** `begin_checkout` now carries `value` + `currency`, so
Reports → Monetization and the Events report show CHF value per checkout start.
Treat it as **monthly recurring value at checkout start**, not confirmed
revenue — **Stripe remains the source of truth for actual payments.** (Website
packages send their one-off price.)

**C. Import to Google Ads.** Admin → **Product links → Google Ads** → link the
account, then import `begin_checkout`, `call_ai_live`, `book_consultation`,
`request_demo` as conversions so the Ads campaign (see
`docs/google-ads-campaign.csv`) can bid on them.

**D. Build the funnel.** Explore → Funnel exploration:
`call_ai_live` **or** `request_demo` → `book_consultation` → `begin_checkout`.
This shows exactly where visitors drop between "experienced/asked" and "bought".

---

## 3. Consent & accuracy notes

- Consent Mode v2 is implemented: before the visitor accepts the banner, GA4
  sends **cookieless modeled** pings only; after acceptance, full events. So
  absolute counts undercount a little — trust **trends and ratios**, not exact
  totals.
- The delegated listener tracks `<a>` clicks (CTAs) and explicit `wmEvent`
  calls (form submit, video, checklist). Plain `<button>`/form fields without
  an anchor are not auto-tracked by design.

## 4. The one revenue question to watch weekly

**`begin_checkout` count + value, and its rate from `call_ai_live` /
`request_demo`.** If lots of `call_ai_live` but few `begin_checkout` → the
product demo works but the offer/price page leaks; if few `call_ai_live` →
the top of funnel (traffic, hero, ads) is the constraint.
