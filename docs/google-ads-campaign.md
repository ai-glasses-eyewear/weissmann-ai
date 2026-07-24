# Google Ads Search Campaign — Weissmann AI (KI-Telefonassistent)

Launch-ready Google Ads **Search** campaign for the AI phone assistant, importable via **Google Ads Editor**.

- **File:** `docs/google-ads-campaign.csv`
- **Campaign:** `Weissmann AI - KI-Telefonassistent Search` (Campaign Type = Search)
- **Structure:** 5 ad groups by intent · 65 commercial-intent keywords total (Phrase + Exact) · 1 Responsive Search Ad each · 32 shared campaign negatives.

## Ad groups & landing pages

| Ad group | Intent | Final URL |
|---|---|---|
| AG1 – KI-Telefonassistent | Core DE demand | `https://weissmann.ai/ki-telefonassistent/` |
| AG2 – Anrufbeantworter / virtuelle Telefonistin | DE synonyms | `https://weissmann.ai/ki-telefonassistent/` |
| AG3 – AI Receptionist Schweiz (EN) | English demand | `https://weissmann.ai/en/ki-telefonassistent/` |
| AG4 – Praxis / Arztpraxis | Healthcare vertical | `https://weissmann.ai/branchen/gesundheitswesen/` |
| AG5 – Demo / Termin buchen | Demo & trial intent (**new**) | `https://weissmann.ai/kontakt/` |

All URLs verified live. AG5 sends demo/trial searches ("… demo", "… testen", "… ausprobieren") straight to the demo-request form on `/kontakt/`, aligning with the `request_demo` / `book_consultation` conversions. Swap AG4 to `https://weissmann.ai/branchen/zahnarztpraxen/` if you prefer to lead with dental. Move any ad group to `https://weissmann.ai/preise/` if the price page converts better in testing.

Every RSA ships 15 headlines + 4 descriptions, all within Google's limits (headline ≤30, description ≤90, path ≤15 chars — validated on generation; current maxima: headline 27, description 88, path 12). Copy is **outcome-focused and strictly truthful**: no invented customers, reviews, ratings, certifications or numbers. Claims used are all verifiable — 24/7 availability, DE/EN/FR/IT, books appointments, qualifies leads, human handover, WhatsApp/email summary, live demo line **+41 56 539 18 67**, and the real Starter price **ab CHF 350/Monat** (excl. VAT).

### Refreshed selling angles (2026-07-23)

The RSAs now lead with the strongest newly-confirmed, low-risk angles:

- **Cancel anytime / no minimum term** — *"Monatlich kündbar"*, *"Keine Mindestlaufzeit"*, *"Cancel Anytime"*, *"No Minimum Contract"*. This reflects the **Starter** plan (CHF 350/mo), which has **no minimum contract term** and is cancellable any time. (Premium's 12-month minimum is **not** advertised here — the ads promote the CHF 350 entry offer.)
- **Understands Swiss German** — *"Versteht Schweizerdeutsch"* / *"Understands Swiss German"*, a strong Swiss differentiator taken from live site copy.
- **From CHF 350/month · no setup fee** — *"Ab CHF 350/Monat"*, *"Keine Setup-Gebühr"*, *"From CHF 350/Month"*, *"No Setup Fee"*.
- **Try the AI live / book a demo** — descriptions invite prospects to call the real demo line **+41 56 539 18 67** or *"buchen Sie eine 15-minütige Demo"* / *"Book a 15-Min Demo"*; AG5 is a dedicated demo/trial ad group.
- **Honest traction** — one description each in AG1 and AG5 uses the single permitted traction claim: *"Über 20 Schweizer Unternehmen haben (bereits) eine Live-Demo angefragt."* No customers, reviews or ratings are claimed (none exist yet).

New negatives were added to block DIY-voicemail and consumer intent: `sprüche, ansage, vorlage, besprechen, fritzbox, lustig, lustige, abhören, handy` (on top of the existing jobs / free / informational / DIY blockers).

## Budget guidance

- Start at **CHF 25/day** for the test (the CSV `Budget` column is set to 25). Sensible test window: **CHF 20–30/day**.
- That is roughly **CHF 600–900/month**. Run it for **2–4 weeks** before judging — a single AI-phone customer at CHF 350+/month recurring pays back a large share of the test spend.
- Suggested starting **Max CPC**: CHF 3.50 for the core `KI-Telefonassistent` group, CHF 3.00 elsewhere. These are placeholders — let Google's data adjust them, or switch to **Maximize conversions** once you have ~15–30 conversions logged.
- Keep it **Search-only** (no Search Partners / Display expansion) while testing, and geo-target **Switzerland** (optionally German-speaking cantons first).

## GA4 conversions to import

Import these existing GA4 **key events** as **conversion actions** (Google Ads → Goals → Conversions → *New from GA4/Google Analytics*), then set the primary one for bidding. These are the four money events already defined in `docs/measurement-plan.md`:

- `begin_checkout` — clicks **Subscribe** on a pricing card (carries `value` + `currency`; the deepest signal — recommend as **primary for bidding** once volume allows).
- `call_ai_live` — visitor calls/clicks the live demo line **+41 56 539 18 67** (strong early-intent signal; use as primary while `begin_checkout` volume is still thin).
- `book_consultation` — books a consultation.
- `request_demo` — requests a demo (the intent AG5 is built to capture).

Link Google Ads ↔ GA4 (Admin → Product links) first, allow up to 24–48h for events to appear, then import. Verify each shows status **Recording conversions** before scaling budget. See `docs/measurement-plan.md` for the full event catalog and the exact GA4 setup.

## How to import the CSV (Google Ads Editor)

1. Open **Google Ads Editor** and download the target account (**Account → Get recent changes**).
2. **Account → Import → From file…** and select `docs/google-ads-campaign.csv`.
3. On the **column-mapping** screen, confirm mappings (Editor auto-detects most): `Campaign`, `Campaign Type`, `Budget`, `Ad Group`, `Max CPC`, `Criterion Type`, `Keyword`, `Headline 1–15`, `Description 1–4`, `Path 1/2`, `Final URL`. RSA rows are recognised automatically from the Headline columns.
4. Review the **proposed changes** (1 campaign, 5 ad groups, 65 keywords, 5 RSAs, 32 negatives). Fix any warnings.
5. Set campaign **geo-targeting = Switzerland**, **networks = Search only**, and **language = German + English** (add FR/IT if desired).
6. **Post/Keep** changes to upload to the live account.

### Notes
- **Match types:** the `Criterion Type` column carries `Phrase` / `Exact` for keywords and `Negative` for negatives. Confirm match types on the review screen if Editor prompts.
- **Negatives** are set at **campaign level** (shared across all 5 ad groups). Includes the required `jobs, gratis, kostenlos, download, ausbildung` plus job/DIY/informational blockers and the new voicemail/consumer blockers (`sprüche, ansage, vorlage, besprechen, fritzbox, lustig, lustige, abhören, handy`). To reuse across future campaigns, copy them into **Tools → Shared library → Negative keyword lists** and attach the list.
- **Encoding:** UTF-8. If any umlaut looks wrong after import, re-open the CSV and re-save as *CSV UTF-8*.
- **Before launch:** confirm conversion tracking fires, double-check Final URLs resolve, and add sitelink/callout/call assets (the live number **+41 56 539 18 67** makes a strong call asset).
