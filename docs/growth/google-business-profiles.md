# Google Business Profiles — both businesses (prepared)

Prepared 2026-07-23. Two SEPARATE profiles, two SEPARATE addresses, two SEPARATE
roles. Both are free and high-ROI for local + "near me" + Maps discovery. Each
needs Giovanna's Google account + address verification (the only manual step —
exact instructions at the end).

**Keep each profile's Name/Address/Phone (NAP) identical to that business's own
website** — Google cross-checks them. The on-site LocalBusiness schema for
Weissmann already ships (PR #5); the AI-Eyewear buy pages ship the reseller
framing (ai-eyewear PR #1).

---

## Profile 1 — Weissmann AI  (Giovanna = FOUNDER)

Full step-by-step is in **`docs/google-business-profile.md`**. Summary:

- **Name:** `Weissmann AI`
- **Primary category:** Software company · **Additional:** Marketing agency,
  Business management consultant, Telephone answering service
- **Address:** Technoparkstrasse 6, 8005 Zürich (or run as a service-area business)
- **Service area:** Zürich + all Switzerland · **Website:** https://weissmann.ai
- **Phone:** the Weissmann business number (matches the site footer)
- **Description:** see `docs/google-business-profile.md` §2 (mentions Swiss German,
  Starter ab CHF 350/mo cancel-anytime, the live demo line, "Über 20 Unternehmen
  haben bereits eine Live-Demo angefragt").
- Giovanna may be listed as the founder — that is accurate here.

---

## Profile 2 — AI-Eyewear  (Giovanna = OFFICIAL SWISS SALES PARTNER / RESELLER — NOT founder)

**Role integrity (hard rule):** this profile represents an **authorised Swiss
reseller / showroom** for **Even Realities** smart glasses. Do **not** present
Giovanna or AI-Eyewear as the manufacturer, founder, or owner of Even Realities.
Wording is always "official Swiss sales partner", "authorised Swiss reseller",
"Even Realities showroom Zürich".

- **Name:** `AI-Eyewear — Even Realities Zürich` (or your registered business
  name; the "Even Realities" descriptor is truthful as an authorised reseller).
  If Google objects to the brand in the name, use `AI-Eyewear` and put "Official
  Swiss partner for Even Realities" in the description.
- **Primary category:** `Optician` (you do showroom fittings) —
  **Additional:** `Sunglasses store`, `Electronics store`. (Pick the primary that
  best matches what you actually do in the showroom.)
- **Address (showroom, physical):** **Villa Zeltweg, Zeltweg 74, 8032 Zürich**
- **Service area:** Zürich + Switzerland · **Website:** https://ai-eyewear.ch
- **Phone:** the AI-Eyewear / showroom number (match the ai-eyewear.ch site)
- **Attributes:** "In-store shopping", "By appointment", "Online appointments",
  "Wheelchair-accessible entrance" (only if true).

### Description (paste — EN; add a DE version as secondary)

> AI-Eyewear is the official Swiss sales partner and authorised reseller of
> Even Realities smart glasses. Try the Even Realities G2 — live translation,
> live captions and a discreet AI assistant, right in your field of view — and
> the R1 ring, at our Zürich showroom (Villa Zeltweg, Zeltweg 74). Book a
> personal fitting, buy in CHF with no customs charges, and get local Swiss
> support. Smart eyewear for work, travel, accessibility and everyday focus.

(Truthful: authorised reseller framing, real showroom, CHF/no-customs, real
products. No invented reviews or customer counts.)

### Services / products (add each)

Even Realities G2 smart glasses (e.g. CHF 699) · Even Realities R1 ring ·
Showroom fitting & demo · Personal consultation.

### Photos, posts, reviews

- **Photos:** the Villa Zeltweg showroom (exterior + interior), the products in
  a real setting, you fitting a customer (with consent). Real photos only.
- **Google Posts:** weekly — a product use-case, "book a showroom fitting",
  a live-translation demo clip. Each links to ai-eyewear.ch.
- **Reviews:** never buy/incentivise/fabricate. Once you have real customers,
  ask happy ones for an honest review via the GBP review link. Until then, an
  empty verified profile still ranks.

---

## The ONLY manual step you must do (verification)

For **each** profile:

1. Go to **business.google.com** → *Add / manage your business* → enter the name
   + address above.
2. Choose categories, add website, phone, description, hours, photos (all
   prepared above).
3. **Set real opening hours** — I could not invent them. (For AI-Eyewear the
   showroom may be "by appointment"; set that.)
4. **Verify:** Google offers postcard / phone / email / video. Pick the fastest.
   - Weissmann (Technoparkstrasse 6) and AI-Eyewear (Zeltweg 74) each verify
     independently at their own address.
   - A **postcard** takes ~1–2 weeks; **video verification** (if offered) is
     fastest — have the address, your face, and the premises ready to film.
5. After verification: publish, add photos, and post weekly.

## What I still need from you to finish the on-site local schema
- **AI-Eyewear showroom opening hours** (or "by appointment") → to add
  `openingHoursSpecification` and geo to the AI-Eyewear pages' LocalBusiness
  schema (separate PR in the ai-eyewear repo).
- **Weissmann opening hours** → same for weissmann.ai (PR #5 left hours out).
- Confirm each business's **public phone number** for its GBP (must match the
  site).
