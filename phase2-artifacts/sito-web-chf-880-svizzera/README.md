# Pilot 3 — Il sito web da CHF 880 è adatto alla tua azienda? (IT)

Production-ready source for the third Phase-2 Artifact. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `sito-web-chf-880-svizzera` |
| Language | Italian (it) |
| Article URL | https://weissmann.ai/it/ai-academy/marketing-seo-geo/sito-web-economico-svizzera-chf-880/ |
| Artifact title | Il sito web da CHF 880 è adatto alla tua azienda? · Weissmann |
| Interaction type | Scope diagnostic / decision tree (11 guided questions → one of three verdicts) |
| Source file | `index.html` (self-contained: inline CSS + vanilla JS, no external deps, no storage) |
| Private Claude URL (owner-only) | https://claude.ai/code/artifact/6b502b88-c844-486b-a049-cbe6b7b4d746 |
| **Public URL** | **NOT YET PUBLIC** — requires a manual "Share → public" action by the account owner in claude.ai |
| Publication status | **PRIVATE — awaiting manual public share** (page shows "Share, private") |
| Article backlink | "Leggi la guida completa →" (the working slug URL above) |
| Service CTA | "Scopri il servizio siti web di Weissmann →" → https://weissmann.ai/it/servizi/sviluppo-siti-web-ai/ |

> Article-URL note: the production **slug** is `sito-web-economico-svizzera-chf-880` (HTTP 200). The
> id-based path `sito-web-chf-880-svizzera` returns 404 and is not used as a link.

## What it does
Eleven questions — pages, languages, shop, booking, custom integrations, branding, content, SEO, design
complexity, deadline, maintenance — each answer tagged Starter / da ridurre / progetto più grande. It
returns one of three verdicts and **explains exactly which answers caused it**:
- **Adatto al pacchetto CHF 880** — everything fits the Starter perimeter.
- **Possibile riducendo lo scope** — close to Starter; lists each over-scope item *and* a concrete way to
  trim it back into CHF 880 (launch one language first, drop the cart for a contact form, provide own
  texts, simplify the design, …).
- **Meglio un progetto personalizzato** — a hard blocker (e-commerce with payments, integrated booking,
  CRM/API, reserved area, web app, or clearly larger scale). Recommends **Business CHF 4'990** for scale or
  **Complesso / su misura da CHF 9'900** for shop/integrations.

## Accuracy & honesty (built in)
- The offer is presented accurately from `src/data/pricing.ts`: **CHF 880** (regular **CHF 2'490**,
  one-time fixed price), the six Starter inclusions and the exclusions (copywriting, extra languages, paid
  third-party tools, e-commerce/booking/CRM/reserved areas). Business **CHF 4'990**; Complex **from
  CHF 9'900**.
- Framed as **"Premium, non economico"** — never as cheap quality.
- No invented discount or scarcity; the disclaimer states the two prices are published and fixed and that
  this is guidance, not a quote. No personal data collected or transmitted; nothing stored (in-memory only).

## Verified verdict logic (deterministic)
All-fit → *Adatto al pacchetto CHF 880*; soft only (e.g. 6–8 pages) → *Possibile riducendo lo scope*;
shop-with-payments → *Meglio un progetto personalizzato* + Complesso (da 9'900); >8 pages → Business
(4'990); many pages + shop → Complesso; partial answers → provisional verdict from what's answered.

## To publish publicly (manual, owner action)
Open the private URL while signed in to claude.ai → **Share** → public / "anyone with the link" → copy the
public URL → open it logged-out to confirm → record it in `docs/WEISSMANN_60_ARTIFACT_PUBLICATION_LOG.md`.
