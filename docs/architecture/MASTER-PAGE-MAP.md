# Weissmann AI — Master Page Map

**Status:** Definitive · review-ready · planning-only (no implementation) · owner sign-off required before build
**Company:** Weissmann AI, Zürich · Technoparkstrasse 6, 8005 Zürich · Founders: Giovanna Carpi (CEO), Nicola Mössner (Strategy/PR)
**Stack invariants:** Astro 5 static · Netlify · i18n (DE at root, `/en/ /it/ /fr/`, `trailingSlash: 'always'`, `prefixDefaultLocale: false`) · central config + typed registries as the single source of truth
**Design language:** Concept B — Premium Technology
**Guardrails carried through every section:** revDSG/nFADP (never "DSGVO"), EDÖB/FDPIC, "ss" not sharp-s, CHF; no fabricated prices/stats/testimonials/customers/case studies/integrations/certifications; prices from `pricing.ts` only; demand as labelled tiers, never search volumes; unknowns flagged `NEEDS VERIFICATION`. **Forbidden forever on any page or slug:** "Podomedics", the obsolete "Culmannstrasse 39 / 8006 Zürich" address, "eyewear", "Even Realities".

---

## 1. Executive summary

### 1.1 What this document is

This is the definitive, consolidated **Master Page Map** for weissmann.ai — the single planning artefact that fuses four designed parts (master IA + URL architecture; the commercial inventory of Services, Industries and the service×industry matrix; the de-duplicated AI Academy inventory; and the internal-linking, authority-asset and GEO/EEAT/CWV layer) into one coherent, review-ready reference. It supersedes the earlier 5-section model by promoting **AI Academy to its own top-level pillar** (owner decision) and folds in every fix from the prior adversarial IA stress test and knowledge-hub critique.

### 1.2 The 5–10-year thesis

Build the **most authoritative AI-implementation platform in Switzerland, then Europe** — a site that is simultaneously a high-converting AI agency and one of the best AI educational resources online. Every architectural choice is made for the option that is **strongest in 5–10 years** for SEO, GEO, EEAT, multilingual reach and scalability — never the option that is merely easier now. Three structural bets encode that thesis:

1. **Siloed + fully-localized URLs, generated from registries.** Path hierarchy is the primary machine-readable parent→child signal; it is the only URL model that wins on *all* axes (SEO, GEO, EEAT, multilingual, scalability, CWV) at once. Migration cost is trivially small today and only grows, so it is paid once, early.
2. **One canonical owner per topic, enforced in CI.** Informational intent lives in the Academy; commercial/transactional intent lives in Services; a build-failing keyword-map registry makes cannibalization structurally impossible rather than merely discouraged.
3. **A Swiss/DACH data moat in four synchronized languages with first-party structured data.** revDSG/nFADP, EDÖB, EU AI Act, Apertus/ETH/EPFL/CSCS, Innosuisse, CHF and .ch reality — each a named entity with `sameAs`, each surfaced answer-first with a dated primary source — is the hard-to-replicate edge that global US-centric explainers structurally lack.

### 1.3 How it serves both goals at once

Education and commerce are one funnel, not two sites. **Informational Academy content accumulates topical authority and passes it *down* to commercial Service pages;** Industries hubs are the bridge that routes sector demand into the concrete service×industry matrix. Educational assets (glossary, calculators, checklists, datasets) build the E-E-A-T and GEO citeability that generate qualified leads, while the commercial pages remain deliberate PageRank near-sinks that convert. The verb-test governance rule (understand → Academy; use/download/prove → Resources) keeps the two adjacent pillars from ever overlapping, and the registry-driven build guarantees zero orphans and four-language parity as the platform scales to hundreds of pages.

---

## 2. Top-level information architecture

### 2.1 The six pillars

The site is organized as **six low-cognitive-load pillars**, each with a single non-overlapping purpose. Home routes to the ecosystem; the other five are the durable silos.

| # | Pillar (DE / EN label) | Purpose (one sentence) | Direct children | Schema anchor |
|---|---|---|---|---|
| 1 | **Home** (`/`) | Introduces the **ecosystem** and routes to silos — never a service dump; the entity root. | — | `Organization` + `WebSite`+`SearchAction` + `LocalBusiness`, primary `sameAs` cluster |
| 2 | **Leistungen / Services** | Primary **commercial** entry: 9 fully-separated service pages + the service×industry matrix. | 9 services + hub + matrix leaves | `OfferCatalog`/`ItemList` (hub); `Service` (each) |
| 3 | **Branchen / Industries** | Demand-side **sector hubs** that frame sector pains and route to service×industry pages. | 14 industry hubs + hub | `ItemList` (hub); `CollectionPage` (each) |
| 4 | **AI Academy** | The **topical-authority engine**: 9 clusters (pillars + spokes), guides, tutorials, comparisons, glossary, FAQs, industry-AI explainers. Owns **informational** intent. | 9 clusters, Glossary, Comparisons, Tools sub-cluster, industry explainers | `Article`/`LearningResource` + `DefinedTermSet` + named `Person` authors |
| 5 | **Ressourcen / Resources** | Practical/utility **assets & proof**: templates, checklists, calculators, tools directory, GitHub repos, datasets, case studies, insights. Owns **use/download/prove** intent. | Templates, Checklists, Calculators, Tools, Repos, Datasets, Case Studies, Insights | `HowTo`/`SoftwareApplication`/`Dataset`/`Article` per type |
| 6 | **Unternehmen / Company** | **E-E-A-T / trust** layer: About, Methodology, Technology, Privacy & Security, Contact. | About, Methodology, Technology, Data-Security, Contact | `AboutPage` + `HowTo` (Method) + `Person` edges |

**Utility (not a pillar):** **Preise / Pricing** persists as a header text link beside a persistent **Demo/Contact CTA** and the language switcher — high-intent access without a sixth mega-menu.

### 2.2 The clean Academy-vs-Resources split — one deciding rule

The single most important governance rule of the structure, because the two pillars are adjacent and would otherwise overlap. It is a **verb test** applied at content-brief time and enforced in the registry.

> **THE RULE — Academy is to *understand*; Resources is to *use, download, or prove*.**
> If the page's primary job is to **explain, define, teach, or compare a concept** so the reader (human or AI) *understands* it → **AI Academy**.
> If the page's primary job is to **hand over a usable artifact or evidence** — a downloadable file, an interactive tool, a code repo, a dataset, or a real case study that *proves* results → **Resources**.

| Signal | → AI Academy | → Resources |
|---|---|---|
| Reader leaves with… | knowledge / a mental model | a file, a tool output, or proof |
| Dominant schema | `Article`, `DefinedTerm`, `LearningResource`, `FAQPage` | `HowTo`, `SoftwareApplication`, `Dataset`, `Article` (case study) |
| Content shape | answer-first prose, explainers, comparisons, glossary | template, checklist, calculator, repo, dataset, case study, news |
| Example | "Was ist ein KI-Agent?" · "Automatisierung vs. Agenten" · "GEO erklärt" | "KI-Automatisierungs-Vorlage (n8n)" · "ROI-Rechner" · "Case Study: Zahnarztpraxis" |
| Freshness model | evergreen, periodically refreshed | tool/version-driven or dated (news, datasets) |

**Consequences that resolve the overlaps:** comparisons live in Academy (not Resources); case studies live in Resources and are *reused as proof modules* on service/industry pages, never re-authored; the glossary lives in Academy; datasets, first-party GitHub repos, calculators and the tools directory are Resources even though they build authority. **Interactive first-party tools** appear in the Academy as the *interactive learning asset*; the downloadable file/embed of the same tool lives in Resources (one canonical annotated Academy page ↔ a Resources download that links to it, never duplicates the prose).

### 2.3 Navigation model

Six pillars are **not** all mega-menus, to avoid nav overload.

| Item | Pattern | Contents |
|---|---|---|
| Home | logo link | — |
| **Services** | mega-menu | 9 services grouped **Build / Grow / Advise** + "Alle Leistungen" → hub |
| **Industries** | mega-menu | 14 sectors grouped by cluster + "Alle Branchen" → hub |
| **AI Academy** | light dropdown → hub | 9 cluster names + Glossary + "Zur Academy"; does **not** enumerate spokes |
| **Resources** | light dropdown → hub | Typed links (Templates · Checklists · Calculators · Tools · Case Studies · Insights) + "Alle Ressourcen"; does **not** enumerate items |
| **Company** | light dropdown | About · Methodology · Technology · Data-Security · Contact |
| **Pricing + Demo CTA + lang switcher** | utility cluster | persistent |

**Build / Grow / Advise** groupings (communicate non-overlap in the menu itself):
- **Build:** AI Websites · AI Automation · AI Agents · AI Integrations · AI Phone Assistant
- **Grow:** SEO · GEO · Google Ads
- **Advise:** AI Consulting

**Mobile:** five accordions; Academy and Resources collapse to "browse hub" links rather than long enumerated scrolls. Promoting Academy to its own pillar also de-densifies the previously-overloaded Resources menu.

### 2.4 Breadcrumb model

`BreadcrumbList` JSON-LD on **every non-home page**, **derived from the canonical URL path** — e.g. `Home › Leistungen › KI-Telefonassistent › Zahnarztpraxen`, `Home › AI Academy › Agenten › Was ist ein KI-Agent`. URL-derived breadcrumbs are a primary reason the siloed model is chosen; flat-root cannot produce them. The pillar segment is the structural, template-guaranteed uplink that exists even when body copy is thin. Breadcrumbs are language-local.

---

## 3. Long-term URL architecture

### 3.1 The decision

**Siloed paths, fully localized per language, generated from a central slug registry.** `x-default` → **English**. Company is a nav cluster kept flat (zero migration); every other pillar is a real path silo.

### 3.2 The 5–10-year justification

| Axis | Siloed + localized (chosen) | Flat-root | German-slug-everywhere |
|---|---|---|---|
| **SEO** | Path hierarchy = primary machine-readable parent→child signal; concentrates internal PageRank on each entity; keyword-in-URL **in the page's own language** is a real ranking + CTR signal; URL-derived breadcrumbs. | No hierarchy signal, no URL breadcrumbs, diffuse PageRank. | German slugs on EN/FR/IT read as untranslated → leak relevance, depress CTR/trust in-market. |
| **GEO / AI search** | The **same entity graph expressed three redundant ways** — URL path + Schema.org + `llms.txt`. Unambiguous URLs are what assistants cite and attribute. | Ambiguous URLs force LLMs to infer relationships → weaker, less citable graph. | Non-native slugs muddy entity extraction for non-German locales. |
| **EEAT** | Clean, native, human-readable paths signal a real, organized entity; named authors + `HowTo` Method reinforce it. | Flat pile looks unstructured at scale. | Untranslated URLs undercut the "native, trustworthy" signal. |
| **Multilingual** | Per-locale keyword-in-URL + native trust; registry guarantees reciprocal hreflang + `x-default`. | Wastes the URL as a locale-relevance signal. | One slug can't be keyword-relevant in four languages. |
| **Scalability** | Every URL generated from registries; orphans/thin pages blocked in CI; hundreds of pages, zero nav drift. | Namespace collisions and orphan risk grow with page count. | Localization debt compounds; retrofitting later is a mass 301 event. |
| **Core Web Vitals** | Static Astro output; silo depth is a routing concern, not a render cost; predictable paths cache cleanly on CDN. | Neutral. | Neutral. |

**Net:** siloed+localized is the only option strongest on **all axes simultaneously**, and the migration cost only grows — so pay it once, early.

### 3.3 Localized top-level segments

| Pillar | DE (root) | EN (`/en/…`) | IT (`/it/…`) | FR (`/fr/…`) |
|---|---|---|---|---|
| Home | `/` | `/en/` | `/it/` | `/fr/` |
| **Services** | `leistungen` | `services` | `servizi` | `services` |
| **Industries** | `branchen` | `industries` | `settori` | `secteurs` |
| **AI Academy** | `ki-academy` | `ai-academy` | `ai-academy` | `academie-ia` |
| **Resources** | `ressourcen` | `resources` | `risorse` | `ressources` |
| **Company** *(flat nav cluster)* | `ueber-uns` etc. | `about` etc. | flat | flat |

### 3.4 Canonical URL scheme

| Page type | DE | EN | IT | FR |
|---|---|---|---|---|
| Services hub | `/leistungen/` | `/en/services/` | `/it/servizi/` | `/fr/services/` |
| Service (pattern) | `/leistungen/{svc}/` | `/en/services/{svc}/` | `/it/servizi/{svc}/` | `/fr/services/{svc}/` |
| Service × Industry | `/leistungen/{svc}/{branche}/` | `/en/services/{svc}/{ind}/` | `/it/servizi/{svc}/{settore}/` | `/fr/services/{svc}/{secteur}/` |
| Industries hub | `/branchen/` | `/en/industries/` | `/it/settori/` | `/fr/secteurs/` |
| Industry (pattern) | `/branchen/{branche}/` | `/en/industries/{ind}/` | `/it/settori/{settore}/` | `/fr/secteurs/{secteur}/` |
| Academy hub | `/ki-academy/` | `/en/ai-academy/` | `/it/ai-academy/` | `/fr/academie-ia/` |
| Academy cluster (×9) | `/ki-academy/{cluster}/` | `/en/ai-academy/{cluster}/` | `/it/ai-academy/{cluster}/` | `/fr/academie-ia/{cluster}/` |
| Academy article (spoke) | `/ki-academy/{cluster}/{artikel}/` | `/en/ai-academy/{cluster}/{article}/` | … | … |
| Glossary (index + term) | `/ki-academy/glossar/{begriff}/` | `/en/ai-academy/glossary/{term}/` | `/it/ai-academy/glossario/{termine}/` | `/fr/academie-ia/glossaire/{terme}/` |
| Resources hub | `/ressourcen/` | `/en/resources/` | `/it/risorse/` | `/fr/ressources/` |
| Templates | `/ressourcen/vorlagen/` | `/en/resources/templates/` | `/it/risorse/modelli/` | `/fr/ressources/modeles/` |
| Checklists | `/ressourcen/checklisten/` | `/en/resources/checklists/` | `/it/risorse/checklist/` | `/fr/ressources/check-lists/` |
| Calculators | `/ressourcen/rechner/` | `/en/resources/calculators/` | `/it/risorse/calcolatori/` | `/fr/ressources/calculateurs/` |
| Tools directory | `/ressourcen/tools/` | `/en/resources/tools/` | `/it/risorse/strumenti/` | `/fr/ressources/outils/` |
| Repos / Datasets | `/ressourcen/datensaetze/` | `/en/resources/datasets/` | `/it/risorse/dataset/` | `/fr/ressources/jeux-de-donnees/` |
| Case Studies | `/ressourcen/fallstudien/` | `/en/resources/case-studies/` | `/it/risorse/casi-studio/` | `/fr/ressources/etudes-de-cas/` |
| Insights (News) | `/ressourcen/insights/` | `/en/resources/insights/` | `/it/risorse/insights/` | `/fr/ressources/insights/` |
| Company: About | `/ueber-uns/` | `/en/about/` | `/it/chi-siamo/` | `/fr/a-propos/` |
| Company: Methodology | `/methodik/` | `/en/methodology/` | `/it/metodologia/` | `/fr/methodologie/` |
| Company: Technology | `/technologie/` | `/en/technology/` | `/it/tecnologia/` | `/fr/technologie/` |
| Company: Data-Security | `/datensicherheit/` | `/en/privacy-security/` | `/it/privacy-sicurezza/` | `/fr/confidentialite-securite/` |
| Company: Contact | `/kontakt/` | `/en/contact/` | `/it/contatto/` | `/fr/contact/` |
| Pricing *(utility)* | `/preise/` | `/en/pricing/` | `/it/prezzi/` | `/fr/tarifs/` |
| Legal | `/impressum/` `/datenschutz/` `/agb/` | `/en/imprint/` `/en/privacy/` `/en/terms/` | … | … |
| Machine files (root) | `/robots.txt` · `/llms.txt` · `/llms-full.txt` · `/sitemap.xml` | | | |

**The 9 service slugs** (localized; `ki-` German-prefix standard): `ki-telefonassistent` · `ki-webentwicklung` · `seo` · `generative-engine-optimization` · `google-ads` · `ki-automatisierung` · `ki-agenten` · `ki-beratung` · `ki-integrationen`. **The 14 industry slugs** are the localized set (`gesundheitswesen/healthcare/sanita/sante`, …).

### 3.5 Depth budget

- **Matrix stops at service/industry level** — `/leistungen/{svc}/{ind}/` (max 3 path segments + locale). No deeper matrix nesting.
- **Academy articles never exceed 4 path segments** — `/ki-academy/{cluster}/{article}/`. Glossary terms sit at cluster level.
- **Every money page ≤ 3 clicks from a locale root**, guaranteed by mega-menu + hub + breadcrumb + in-body links.

### 3.6 hreflang & Swiss region targeting

- Every page emits a **reciprocal `de`/`en`/`it`/`fr` cluster + `x-default`**, generated from the slug registry — never hand-written.
- **`x-default` → ENGLISH** (`/en/…`), not German root: the GEO strategy targets global AI-assistant citation and international discovery; routing untargeted/global queries to German under-serves the exact audience the strategy exists to win.
- **Four-language-sync as a structural rule:** a page cannot ship unless all four locale slugs exist in the registry (prevents partial hreflang clusters). The hard *content* publish-gate is decoupled per locale (§8) so the invariant never forces machine-translated thin pages.
- **Swiss region targeting — recommendation: ship plain `de`/`en`/`it`/`fr` now; do NOT adopt `de-CH`/`fr-CH`/`it-CH` yet.** The GEO ambition is Switzerland → Europe; hard-pinning `-CH` narrows reach and forfeits adjacent DACH discovery. Swiss-intent signals are better carried by on-page + entity signals (CHF, revDSG/nFADP/EDÖB language, `LocalBusiness` NAP = Technoparkstrasse 6, 8005 Zürich, `areaServed` = CH/Zürich, Google Business Profile). Plain codes are upgradeable to `-CH` later per-locale from the registry with **zero URL change** — reversible; region-pinning first and unwinding later is costly. Flagged for owner sign-off; default = plain codes.

### 3.7 Migration / 301 plan — shipped atomically

The current site is inconsistent: `/ki-telefonassistent/` sits flat at root, `/leistungen/ai-websites/` is already siloed, `/leistungen/` has no hub (a live orphan gap), and EN/IT/FR carry German slugs. Ship as **ONE coordinated change** (301 map + self-canonical + hreflang + `llms.txt` + sitemap together, verified in staging):

1. **Create the `/leistungen/` hub pillar** (closes the orphan gap) and the new `/ki-academy/` top-level hub (301 from any old `/ressourcen/ki-academy/*` if present).
2. **301 `/ki-telefonassistent/` → `/leistungen/ki-telefonassistent/`**; update self-canonical (the one live page — the highest-value redirect).
3. **301 `/leistungen/ai-websites/` → `/leistungen/ki-webentwicklung/`** (`ki-` prefix standard).
4. **301 all EN/IT/FR German-slug URLs** (`/en/leistungen/…` → `/en/services/…`, `/en/preise/…` → `/en/pricing/…`, etc.) to localized equivalents; regenerate hreflang from the registry.
5. **Localize legal slugs last** (lowest ranking value); keep German aliases 301'd; accept the brief incomplete-hreflang window on legal pages only.
6. **Full round-trip hreflang validation in staging** across 4 locales × every page — the single highest-risk step; a missing reciprocal return tag silently invalidates the whole cluster.
7. **Set `x-default` → English** in the same deploy.
8. **Schedule field verification around the Netlify 24 h JS-cache window**; confirm the repo is **out of OneDrive** before mass page generation (prior corruption incident).

---

## 4. Complete page inventory

Every topic has **exactly one canonical owner**. A `keyword-map` registry stores `{ headKeyword → single URL, intent }` and CI **fails the build** if any head keyword resolves to two URLs. Academy pillars own informational head queries; Service pages own commercial/transactional head queries.

### 4.0 The cluster-to-service keyword map (closing the #1 cannibalization risk)

Every commercial page maps to **exactly one** informational pillar; the taxonomy was split so no pillar sits above two money pages.

| Academy pillar (informational) | Maps to (commercial) | Owns head query | Money page owns |
|---|---|---|---|
| `seo` | `/leistungen/seo/` | "Was ist SEO", "SEO erklärt" | "SEO Agentur Zürich", "SEO Kosten" |
| `geo` | `/leistungen/generative-engine-optimization/` | "Was ist GEO" | "GEO Agentur", "GEO für KMU" |
| `ki-agenten` | `/leistungen/ki-agenten/` | "Was ist ein KI-Agent" | "KI-Agenten entwickeln lassen" |
| `ki-automatisierung` | `/leistungen/ki-automatisierung/` | "Automatisierung vs. Agenten" | "KI-Automatisierung Anbieter" |
| `ki-telefonassistent` | `/leistungen/ki-telefonassistent/` | "Was ist ein KI-Telefonassistent" | "KI-Telefonassistent Zürich" |

### 4.1 Services — the 9 dedicated pages

Each is exactly one `Service` entity on its own URL, never merged. Common schema on all: `Service` (serviceType, provider→Organization, areaServed = CH/Zürich) + `FAQPage` + `BreadcrumbList`, self-canonical. `Offer` is added **only** where a real price exists in `pricing.ts`. EN/IT/FR slugs follow the registry pattern deterministically.

| # | Service | DE URL (en / it / fr slug) | H1 concept | Primary commercial keyword | Intent | Offer? | Unique lead asset / CTA | Academy pillar linked |
|---|---|---|---|---|---|---|---|---|
| 1 | **AI Phone Assistant** | `/leistungen/ki-telefonassistent/` (`ai-phone-assistant` / `assistente-telefonico-ai` / `assistant-telephonique-ia`) | "KI-Telefonassistent für Schweizer KMU — verpasst nie einen Anruf" | KI-Telefonassistent | Transactional | **Yes** (real price) | Missed-call / no-show revenue calculator → Demo CTA | C3 Agents/Automation/Voice |
| 2 | **AI Websites** (Web Dev) | `/leistungen/ki-webentwicklung/` † (`ai-web-development` / `sviluppo-siti-web-ai` / `developpement-web-ia`) | "KI-gestützte Webentwicklung — schnelle, mehrsprachige, GEO-ready Websites" | KI Webentwicklung / AI Website Agentur | Commercial | **Yes** (real price) | Free website + CWV/GEO-readiness audit → Contact | C9 Functions (+ C7) |
| 3 | **SEO** | `/leistungen/seo/` (`seo` all locales) | "SEO-Agentur Zürich — nachhaltige organische Sichtbarkeit" | SEO Agentur Zürich | Commercial | Quote | Free SEO / technical-visibility audit → Contact | C7 Marketing/SEO/GEO |
| 4 | **GEO** | `/leistungen/generative-engine-optimization/` (same slug all locales) | "Generative Engine Optimization — in KI-Antworten zitiert werden" | Generative Engine Optimization / GEO Agentur | Commercial (emerging) | Quote | "Are you cited in AI answers?" GEO audit → Contact | C7 Marketing/SEO/GEO |
| 5 | **Google Ads** | `/leistungen/google-ads/` (`google-ads` all locales) | "Google Ads Management — messbarer ROI für Schweizer KMU" | Google Ads Agentur Schweiz | Transactional | Quote (Offer if priced) | Wasted-spend / ROAS audit → Contact | C7 Marketing/SEO/GEO |
| 6 | **AI Automation** | `/leistungen/ki-automatisierung/` (`ai-automation` / `automazione-ai` / `automatisation-ia`) | "KI-Automatisierung — repetitive Prozesse deterministisch automatisieren" | KI-Automatisierung | Commercial | Quote | Process-automation ROI calculator → Contact | C3 Agents/Automation/Voice |
| 7 | **AI Agents** | `/leistungen/ki-agenten/` (`ai-agents` / `agenti-ai` / `agents-ia`) | "KI-Agenten entwickeln lassen — autonome, handelnde Assistenten" | KI-Agenten entwickeln | Commercial | Quote | Build-vs-buy AI-agent guide + discovery call | C3 Agents/Automation/Voice |
| 8 | **AI Consulting** | `/leistungen/ki-beratung/` (`ai-consulting` / `consulenza-ai` / `conseil-ia`) | "KI-Beratung Zürich — Strategie, Readiness & Roadmap" | KI-Beratung Zürich | Commercial | Quote | AI-readiness assessment + use-case prioritization matrix | C2 KMU/Business |
| 9 | **AI Integrations** | `/leistungen/ki-integrationen/` (`ai-integrations` / `integrazioni-ai` / `integrations-ia`) | "KI-Integrationen — KI in Ihre bestehenden Systeme einbinden" | KI-Integrationen / AI Integration Schweiz | Commercial | Quote | Integration / tech-stack readiness audit (CRM/ERP/API) | C9 Functions (+ C3) |

† AI Websites DE slug migrates `ai-websites` → `ki-webentwicklung` (301) — pending owner confirmation.

**Scope-disambiguation block** (must appear on the four Build/Advise pages + Phone Assistant, with reciprocal cross-links so none cannibalizes):

| Service | Owns (deliverable) | Never | Buyer question |
|---|---|---|---|
| **AI Consulting** | Advisory & strategy only — readiness, use-case discovery, feasibility, roadmap, governance, build-vs-buy. Deliverable = **a decision/plan**. | Builds/wires nothing. | "What should we do with AI?" |
| **AI Automation** | **Deterministic**, rule/trigger workflow automation (Make/n8n/Zapier-class, doc processing, data sync, RPA-lite). Deliverable = **running pipelines**. | Not autonomous reasoning; not just wiring. | "Automate this repetitive process." |
| **AI Agents** | **Autonomous/semi-autonomous LLM agents** that reason, use tools, act with delegated autonomy. Deliverable = **a decision-making agent**. | Not fixed rules; not advice. | "Build an AI that decides & acts." |
| **AI Integrations** | **Connectivity/plumbing** — wiring AI into the stack via APIs, CRM/ERP, pipelines, connectors. Deliverable = **AI wired into existing systems**. | Not process logic; not autonomous behavior. | "Connect AI to our systems." |
| **AI Phone Assistant** | The **productized voice-agent instance of AI Agents** — answers calls, books, deflects, escalates. Schema `isSubTypeOf` link to AI Agents. | — | "Give us an AI that answers the phone." |

### 4.2 Industries — the 14 sector hubs

Sector-demand hubs (`/branchen/{slug}/`) that frame sector pain and route to services + published matrix pages; they never copy service or matrix copy. **Clinics fold into Healthcare; Law firms fold into Professional Services** as `Audience` sub-segments. Schema: `CollectionPage`/`ItemList` + `BreadcrumbList`.

| # | Industry | DE URL (en / it / fr slug) | Sector framing (pain → AI angle) | Featured services |
|---|---|---|---|---|
| 1 | **Healthcare** *(clinics fold in)* | `/branchen/gesundheitswesen/` (`healthcare` / `sanita` / `sante`) | Overloaded front desks, no-shows, revDSG-sensitive data, Swissmedic caution | Phone Assistant, AI Websites, AI Automation, AI Consulting |
| 2 | **Restaurants** | `/branchen/gastronomie/` (`restaurants` / `ristoranti` / `restaurants`) | Missed reservation calls during service, staff shortage, multilingual guests | Phone Assistant, AI Websites, GEO |
| 3 | **Hotels** | `/branchen/hotellerie/` (`hotels` / `hotel` / `hotellerie`) | 24/7 reservations & concierge, OTA-commission leakage, multilingual comms | Phone Assistant, AI Websites, GEO, SEO |
| 4 | **Retail** | `/branchen/einzelhandel/` (`retail` / `commercio-al-dettaglio` / `commerce-de-detail`) | Demand forecasting, personalization, dynamic-pricing legality | AI Websites, SEO, GEO, Google Ads, AI Automation |
| 5 | **Real Estate** | `/branchen/immobilien/` (`real-estate` / `immobiliare` / `immobilier`) | AVM valuation, 24/7 lead capture/qualification, multilingual exposés | Phone Assistant, AI Websites, SEO, Google Ads, AI Automation |
| 6 | **Insurance** | `/branchen/versicherungen/` (`insurance` / `assicurazioni` / `assurances`) | Claims triage/STP, document extraction, fraud signals, FINMA + Art. 21 revDSG | AI Automation, AI Integrations, AI Agents, AI Consulting |
| 7 | **Professional Services** *(law firms fold in)* | `/branchen/dienstleister/` (`professional-services` / `servizi-professionali` / `services-professionnels`) | Legal research/doc review, Berufsgeheimnis, hallucination risk, no-US-hosting | Phone Assistant, AI Websites, AI Automation, AI Consulting |
| 8 | **Beauty & Wellness** | `/branchen/beauty-wellness/` (`beauty-wellness` / `bellezza-benessere` / `beaute-bien-etre`) | Booking/no-shows, after-hours calls, local visibility | Phone Assistant, AI Websites, Google Ads |
| 9 | **Manufacturing** | `/branchen/produktion/` ‡ (`manufacturing` / `produzione` / `industrie`) | Back-office automation, document extraction, forecasting, system connectivity | AI Automation, AI Integrations, AI Agents, AI Consulting |
| 10 | **Construction** | `/branchen/baugewerbe/` (`construction` / `edilizia` / `construction`) | Missed calls on site, quote/admin automation, scheduling | Phone Assistant, AI Websites, AI Automation |
| 11 | **Logistics** | `/branchen/logistik/` (`logistics` / `logistica` / `logistique`) | Track-and-trace queries, document processing, routing/dispatch | AI Automation, AI Integrations, AI Agents |
| 12 | **Education** | `/branchen/bildung/` (`education` / `istruzione` / `education`) | Enquiry handling, admin automation, tutoring/assistant agents | AI Websites, AI Automation, AI Agents |
| 13 | **Finance** | `/branchen/finanzwesen/` (`finance` / `finanza` / `finance`) | Document extraction, compliance-safe assistants, back-office automation, FINMA | AI Automation, AI Integrations, AI Consulting, AI Agents |
| 14 | **E-commerce** | `/branchen/e-commerce/` (`e-commerce` all locales) | Multilingual support, personalization/forecasting, paid + organic + AI-answer visibility | AI Websites, SEO, GEO, Google Ads, AI Automation |

‡ Manufacturing DE slug `produktion` pending owner confirmation vs `industrie`/`fertigung`.

### 4.3 Service × Industry matrix — priority cells (demand-first, NOT 9×14)

Single canonical under the service silo `/leistungen/{service}/{industry}/`; the industry hub links to it but never copies it. Each cell must clear the **uniqueness gate** (~800–1000 words of genuinely industry-specific pains, workflows/scripts, integrations, an industry FAQ, and **≥1 real proof block or unique stat/ROI/workflow** — else it stays a `section-only` block on the parent service page, not a URL). Schema: `Service` (audience = industry) + `FAQPage` + `BreadcrumbList`; `isPartOf` → service, `about` → industry hub. Every cell ≥2 inbound links. **The phone-assistant vertical pages live HERE ONCE** (removed from the Academy; the Academy's informational sector overviews stay in C8 and link out to these cells).

**Wave 1 — launch first**

| Cell | Canonical DE URL | Unique lead asset | Demand | Gate proof |
|---|---|---|---|---|
| Phone Assistant × Healthcare | `/leistungen/ki-telefonassistent/arztpraxen/` | No-show cost calculator + emergency-escalation script (DE/EN/IT/FR) | high | Real practice case study — **NEEDS VERIFICATION** |
| Phone Assistant × Restaurants | `/leistungen/ki-telefonassistent/gastronomie/` | Missed-reservation revenue calculator + call-flow template | high (pilot) | **NEEDS VERIFICATION** |
| Phone Assistant × Hotels | `/leistungen/ki-telefonassistent/hotellerie/` | Direct-booking vs OTA-commission savings calculator | high | **NEEDS VERIFICATION** |

**Wave 2 — strong secondary demand**

| Cell | Canonical DE URL | Unique lead asset | Demand |
|---|---|---|---|
| Phone Assistant × Real Estate | `/leistungen/ki-telefonassistent/immobilien/` | Speed-to-lead ROI calculator | high |
| Phone Assistant × Professional Services | `/leistungen/ki-telefonassistent/dienstleister/` | Confidentiality-safe intake-call script | high |
| Phone Assistant × Beauty & Wellness | `/leistungen/ki-telefonassistent/beauty-wellness/` | Booking/no-show recovery calculator | medium-high |
| AI Automation × Insurance | `/leistungen/ki-automatisierung/versicherungen/` | Claims-automation ROI calc + revDSG Art. 21 / FINMA checklist | medium |
| AI Websites × Real Estate | `/leistungen/ki-webentwicklung/immobilien/` | Multilingual listing/exposé template pack | high |

**Wave 3 — build once Wave 1–2 proof exists (each still gated)**

| Cell | Canonical DE URL | Rationale |
|---|---|---|
| AI Automation × Manufacturing | `/leistungen/ki-automatisierung/produktion/` | Back-office/document automation demand |
| AI Automation × Logistics | `/leistungen/ki-automatisierung/logistik/` | Document/routing automation |
| SEO × Retail | `/leistungen/seo/einzelhandel/` | High organic demand |
| GEO × Hotels | `/leistungen/generative-engine-optimization/hotellerie/` | AI-answer visibility for bookings |
| Google Ads × E-commerce | `/leistungen/google-ads/e-commerce/` | Transactional paid demand |
| AI Integrations × Insurance | `/leistungen/ki-integrationen/versicherungen/` | CRM/claims-system connectivity |
| AI Consulting × Healthcare | `/leistungen/ki-beratung/gesundheitswesen/` | Highest-caution sector needs strategy first |

**Everything else stays `section-only`** on the parent service page's "Industries we serve" block until it independently clears the uniqueness gate — tracked in `matrix.ts` with status `live`/`backlog`/`section-only` and a required-unique-fields checklist enforced in CI.

### 4.4 AI Academy — de-duplicated inventory (9 clusters + gaps + glossary + comparisons + tools)

Academy path base: `/ki-academy/…` (EN `/en/ai-academy/…`, etc.). Slugs shown are the English base. All are **informational**; each hands commercial head terms to a Service or matrix page. Legend: `↑` up to pillar · `↔` sibling · `⬇` glossary · `→` commercial page.

**Hub + cluster pillars**

| Page | Slug | Type | Primary keyword | Intent | Canonical owner | Key links |
|---|---|---|---|---|---|---|
| AI Academy (hub) | `academy` | hub | KI Academy | Navigational | self | ↓ 9 pillars · ↓ glossary · → all Services |
| Was ist Künstliche Intelligenz? (C1) | `artificial-intelligence-explained` | pillar | was ist künstliche intelligenz | Info hub | self | ↓ C1 spokes · ⬇ AI/ML/LLM · ↔ C4 |
| AI for SMEs in Switzerland (C2) | `ai-for-smes-switzerland` | pillar | KI für KMU | Info+commercial | self | ↓ C2 · → AI Consulting |
| KI-Automatisierung, Agenten & Conversational AI (C3) | `ai-automation-agents-conversational-ai` | pillar | KI-Automatisierung | Category hub | self | ↓ C3 · **→ AI Phone Assistant / Agents / Automation** |
| KI-Modelle & Anbieter im Vergleich (C4) | `ai-models-vendors-guide` | pillar | KI-Modelle Vergleich | Info+investigation | self | ↓ C4 · ↔ C5 · → Consulting/Integrations |
| Local AI & AI Sovereignty (C5) | `local-ai-sovereignty` | pillar | local AI | Info authority | self | ↓ C5 · ↔ C6 · → AI Integrations |
| AI Compliance in Switzerland (C6) | `ai-compliance-switzerland` | pillar | AI compliance Switzerland | **Canonical compliance home** | self | ↓ C6 · ↔ C5 · → AI Consulting |
| AI Marketing & Search (C7) | `ai-marketing-seo-geo` | pillar | AI marketing | Info orientation | self | ↓ C7 · **→ GEO / SEO / Google Ads** |
| AI by Industry — Swiss Playbook (C8) | `ai-by-industry` | pillar | AI by industry Switzerland | Info orientation | self | ↓ C8 · → matrix |
| AI by Business Function (C9) | `ai-by-business-function` | pillar | AI by business function | Nav+info | self | ↓ C9 · → Phone Assistant / Websites |

**Cluster 1 — AI Foundations, Concepts & Learning Formats**

| Title | Slug | Type | Primary keyword | Canonical owner | Key links |
|---|---|---|---|---|---|
| Maschinelles Lernen einfach erklärt | `how-machine-learning-works` | spoke | maschinelles lernen einfach erklärt | self | ↑ · ⬇ ML/Deep Learning |
| Wie funktionieren LLMs? | `how-large-language-models-work` | spoke | wie funktionieren large language models | self | ↑ · ⬇ Transformer/Token · → C4 |
| Arten von Künstlicher Intelligenz | `types-of-artificial-intelligence` | spoke | arten von künstlicher intelligenz | self | ↑ · ⬇ ANI/AGI/ASI |
| Was ist generative KI? | `what-is-generative-ai` | spoke | was ist generative ki | self | ↑ · ↔ Tools sub-cluster |
| KI-Glossar (100+ Begriffe A–Z) | `ai-glossary` | glossary | ki glossar | **self (only atomic-definition home)** | ⬇ all terms |
| Prompt Engineering | `prompt-engineering-guide` | tutorial | prompt engineering | self | ↑ · ↔ ai-prompts |
| KI-Prompts & ChatGPT-Vorlagen (150+) | `ai-prompts` | tool | chatgpt prompts | self | ↑ · ↔ prompt-engineering-guide |
| Die besten KI-Tools 2026 | `best-ai-tools` | directory | beste ki tools | **self (general audience)** | ↑ · ↓ Tools sub-cluster |
| KI für Anfänger (30-Min-Tutorial) | `how-to-use-ai-for-beginners` | tutorial | ki für anfänger | self | ↑ · ↔ how-to-learn-ai |
| KI lernen 2026: Der Lernpfad | `how-to-learn-ai` | spoke | ki lernen | self | ↑ · ↔ how-to-use-ai-for-beginners |
| ~~KI-Agenten & Workflows~~ | `ai-workflows-and-agents` | **redirect** | *(merged)* | → C3 `ki-agenten-agentic-ai-automation` | Overlap #2 |
| ~~ChatGPT vs Claude vs Gemini~~ | `chatgpt-vs-claude-vs-gemini` | **redirect** | *(merged)* | → C4 `claude-vs-chatgpt-vs-gemini` | Overlap #1 |

**Cluster 2 — AI for Business & SMEs (KMU)**

| Title | Slug | Type | Primary keyword | Canonical owner | Key links |
|---|---|---|---|---|---|
| How to Implement AI in Your SME | `how-to-implement-ai-in-your-sme` | tutorial | KI im Unternehmen einführen | self | ↑ · → AI Consulting |
| 50 Real AI Use Cases & Automation Examples | `ai-use-cases-automation-examples-smes` | spoke/dataset | KI Anwendungsbeispiele KMU | self | ↑ · ↔ C9 |
| AI ROI for SMEs (with Calculator) | `ai-roi-business-case-smes` | tool | KI ROI berechnen KMU | self | ↑ · → AI Consulting |
| Is Your SME Ready for AI? (Scorecard) | `ai-readiness-assessment-smes` | tool | KI Readiness KMU | self | ↑ · ⬇ AI Readiness |
| What Does AI Implementation Cost? | `ai-implementation-cost-switzerland` | spoke | Was kostet KI Einführung KMU | self | ↑ · → AI Consulting (prices from config) |
| AI Compliance for KMU (practical checklist) | `ai-compliance-fadp-eu-ai-act-smes` | tutorial | KI Datenschutz KMU Schweiz | **links up to C6 pillar** | Overlap #6 (re-scoped) |
| Real AI Case Studies from Swiss SMEs | `ai-case-studies-swiss-smes` | spoke | KI Fallstudien KMU Schweiz | self (**permission-gated**) | ↑ · → all Services |
| Best AI Tools for SMEs (Swiss lens) | `best-ai-tools-for-smes` | directory | KI Tools für KMU | **self (KMU audience)** | ↔ C1 `best-ai-tools` (Overlap #10 split) |
| Building an AI Strategy & Roadmap | `ai-strategy-roadmap-smes` | spoke | KI Strategie KMU | self | ↑ · → AI Consulting |
| AI Funding & Subsidies (Innosuisse + cantonal) | `ai-funding-subsidies-switzerland` | spoke/dataset | KI Förderung Schweiz KMU | self | ↑ · ⬇ Innosuisse |
| ~~AI Agents vs Automation vs RPA~~ | `ai-agents-vs-automation` | **redirect** | *(merged)* | → C3 | Overlap #2 |

**Cluster 3 — AI Agents, Automation, Voice & Chatbots** *(Pilot cluster)*

| Title | Slug | Type | Primary keyword | Canonical owner | Key links |
|---|---|---|---|---|---|
| Was ist ein KI-Telefonassistent? | `was-ist-ki-telefonassistent` | spoke | KI-Telefonassistent | self | ↑ · **→ AI Phone Assistant** |
| KI-Telefonassistent Kosten & ROI | `ki-telefonassistent-kosten` | tool | KI-Telefonassistent Kosten | self | ↑ · **→ AI Phone Assistant** |
| KI-Telefonassistent Anbieter im Vergleich | `ki-telefonassistent-anbieter-vergleich` | comparison | KI-Telefonassistent Vergleich | self (neutral) | ↑ · → AI Phone Assistant |
| Wie funktioniert Voice AI? (STT→LLM→TTS) | `how-voice-ai-works` | spoke | wie funktioniert Voice AI | self | ↑ · ⬇ STT/TTS/Barge-in |
| KI-Agenten, Agentic AI & Automatisierung | `ki-agenten-agentic-ai-automation` | spoke | KI-Agenten | **Canonical "agents vs automation" home** | ← redirects from C1+C2 (Overlap #2) |
| Chatbot vs Voicebot vs IVR vs Conversational AI | `chatbot-vs-voicebot-vs-ivr` | comparison | Chatbot vs Voicebot | self | ↑ · ⬇ IVR/Voicebot |
| KI-Telefonassistent & Datenschutz (revDSG/EU AI Act) | `ki-telefonassistent-datenschutz-revdsg` | spoke | KI-Telefonassistent Datenschutz | self | ↑ · ↑ C6 · ⬇ EU AI Act Art. 50 |
| AI Voice Agent selbst bauen oder kaufen? | `build-vs-buy-ai-voice-agent` | spoke | AI Voice Agent erstellen | self | ↑ · → Agents/Integrations |
| RAG-Chatbot für Kundenservice & Wissensdatenbank | `rag-chatbot-wissensdatenbank` | spoke | RAG Chatbot | **self (customer-service/KB RAG)** | ↔ C5 private-RAG (Overlap #9) |
| KI-Terminbuchung per Telefon (No-Show senken) | `ki-terminbuchung-no-show` | spoke | KI Terminbuchung | self | ↑ · **→ AI Phone Assistant** |
| **[GAP] Best AI Automation Platforms (n8n/Make/Zapier)** | `best-ai-automation-platforms` | comparison/directory | KI Automatisierung Plattformen Vergleich | self | ↑ · **→ AI Automation / Integrations** |
| ~~Phone-assistant vertical pages~~ | `ki-telefonassistent-arztpraxis` · `-restaurant` | **moved out** | — | → commercial matrix (Overlap #3) | C8 keeps informational only |

**Cluster 4 — AI Models & Vendors**

| Title | Slug | Type | Primary keyword | Canonical owner | Key links |
|---|---|---|---|---|---|
| Claude vs ChatGPT vs Gemini (2026) | `claude-vs-chatgpt-vs-gemini` | comparison | Claude vs ChatGPT vs Gemini | **Canonical flagship comparison** | ← C1 redirect (Overlap #1) |
| ChatGPT für Unternehmen | `chatgpt-for-business` | brand | ChatGPT für Unternehmen | self | ↑ · ↔ claude/gemini-for-business |
| Claude (Anthropic) für Unternehmen | `claude-for-business` | brand | Claude KI für Unternehmen | self | ↑ · ↔ openai-vs-anthropic |
| Google Gemini für Unternehmen | `gemini-for-business` | brand | Google Gemini für Unternehmen | self | ↑ · ↔ microsoft-copilot |
| Microsoft Copilot für Unternehmen | `microsoft-copilot-for-business` | brand | Microsoft Copilot für Unternehmen | self | ↑ · ↔ gemini-for-business |
| OpenAI vs Anthropic | `openai-vs-anthropic` | comparison | OpenAI vs Anthropic | self (company axis) | ↑ · ↔ brand pages |
| Welche KI für Schweizer Unternehmen? | `best-ai-model-swiss-business` | spoke | welche KI Schweizer Unternehmen | self (model-selection) | ↑ C6 for the law (Overlap #5) |
| ChatGPT, Claude & Gemini Preise im Vergleich | `ai-model-pricing-comparison` | comparison | KI Preise Vergleich | self (dated/sourced) | ↑ · never hardcode prices |
| Open-Source- & selbst gehostete KI-Modelle | `open-source-vs-proprietary-llm` | comparison | Open Source LLM für Unternehmen | **self (evaluative axis)** | ↔ C5 listicle (Overlap #7) |
| Die beste KI für Marketing, Content & SEO | `best-ai-for-marketing-content` | comparison | beste KI für Marketing | self | ↑ · **→ C7 / SEO / GEO** |
| **[GAP] Perplexity für Unternehmen** | `perplexity-for-business` | brand | Perplexity für Unternehmen | self | ↑ · ↔ C7 get-cited |
| **[GAP] Grok / DeepSeek / Mistral im Überblick** *(optional)* | `grok-deepseek-mistral-overview` | brand | Grok DeepSeek Mistral Vergleich | self | ↑ · ↔ C5 sovereignty |

**Cluster 5 — Local AI, Open Source & Sovereignty**

| Title | Slug | Type | Primary keyword | Canonical owner | Key links |
|---|---|---|---|---|---|
| Best Open-Source LLMs in 2026 | `best-open-source-llms` | comparison | best open source LLM | **self (listicle axis)** | ↔ C4 evaluative (Overlap #7) |
| How to Self-Host an LLM (Ollama/vLLM/LM Studio) | `self-hosted-llm-deployment` | tutorial | self-hosted LLM | self | ↑ · ⬇ Ollama/vLLM |
| On-Device & Edge AI (Offline & Private) | `on-device-ai` | spoke | on-device AI | self | ↑ · ⬇ Edge AI/SLM |
| AI Data Sovereignty in Switzerland | `ai-data-sovereignty-switzerland` | spoke | AI data sovereignty | **Canonical sovereignty home** | ← C6 redirect (Overlap #4) |
| Apertus & Swiss Sovereign AI | `apertus-swiss-sovereign-ai` | spoke | Apertus LLM | self | ↑ · ⬇ Apertus |
| Private ChatGPT Alternative (self-hosted) | `private-chatgpt-alternative` | spoke | private ChatGPT alternative | self | ↑ · → AI Integrations |
| Private RAG on Company Documents | `private-rag-company-documents` | tutorial | private RAG | **self (self-hosted RAG)** | ↔ C3 rag-chatbot (Overlap #9) |
| Local AI vs Cloud AI (GPU & TCO Guide) | `local-ai-vs-cloud-ai` | comparison | local AI vs cloud AI | self (TCO axis) | ↑ · → AI Integrations |
| Open Weights vs Open Source (Licensing) | `open-weights-vs-open-source-licensing` | spoke | open weights vs open source | self | ↑ · ⬇ OSAID |
| The EU AI Act and Open-Source / Self-Hosted AI | `eu-ai-act-open-source` | spoke | EU AI Act open source | self | ↑ · ↑ C6 · ⬇ GPAI |
| Local & Sovereign AI for Regulated Industries | `local-ai-regulated-industries-switzerland` | spoke | local AI regulated industries | self | ↑ · ↔ C8 |

**Cluster 6 — AI Trust: Security, Privacy & Regulation** *(canonical compliance home = the C6 pillar; C2/C5/C8/C9 compliance pages link up)*

| Title | Slug | Type | Primary keyword | Canonical owner | Key links |
|---|---|---|---|---|---|
| The EU AI Act Explained for Swiss Companies | `eu-ai-act-switzerland` | spoke | EU AI Act Switzerland | self | ↑ · ⬇ High-risk |
| AI and the Swiss Data Protection Act (revFADP/nDSG) | `ai-swiss-data-protection-act` | spoke | AI data protection Switzerland | **Canonical "AI data protection CH" home** | ← C9 merged (Overlap #5) |
| AI Acceptable Use Policy (Swiss Template) | `ai-acceptable-use-policy` | tutorial/tool | AI acceptable use policy | self | ↑ · ⬇ Shadow AI |
| AI Security Risks (OWASP Top 10 for LLMs) | `ai-security-risks` | spoke | AI security risks | self | ↑ · ⬇ Prompt Injection |
| AI Governance Frameworks Compared (ISO 42001/NIST) | `ai-governance-iso-42001` | comparison | AI governance framework | self | ↑ · ⬇ ISO 42001/NIST |
| How to Run a DPIA for an AI System | `ai-data-protection-impact-assessment` | tutorial | AI DPIA | self | ↑ · ⬇ DPIA/DSFA/FRIA |
| AI Transparency & Disclosure Rules | `ai-transparency-disclosure` | spoke | AI transparency requirements | self | ↑ · ⬇ Art. 50 |
| AI Compliance for Swiss Clinics & Healthcare | `ai-compliance-healthcare-switzerland` | spoke | AI healthcare compliance Switzerland | self (vertical) | ↑ · ↔ C8 |
| AI Vendor & Third-Party Risk (DPAs) | `ai-vendor-risk-dpa` | tutorial | AI vendor risk assessment | self | ↑ · ⬇ DPA |
| ~~Swiss AI Data Sovereignty~~ | `swiss-ai-data-sovereignty` | **redirect** | *(merged)* | → C5 (Overlap #4) | — |

**Cluster 7 — AI Marketing, SEO & GEO**

| Title | Slug | Type | Primary keyword | Canonical owner | Key links |
|---|---|---|---|---|---|
| What Is Generative Engine Optimization (GEO)? | `generative-engine-optimization` | spoke | generative engine optimization | self | ↑ · **→ GEO service** |
| GEO vs SEO vs AEO | `geo-vs-seo-vs-aeo` | comparison | GEO vs SEO | self | ↑ · ↔ ai-seo |
| AI SEO | `ai-seo` | spoke | AI SEO | self | ↑ · **→ SEO service** |
| SEO for Google AI Overviews & AI Mode | `google-ai-overviews-seo` | tutorial | Google AI Overviews SEO | self | ↑ · ⬇ AI Overviews |
| How to Get Cited by ChatGPT, Claude, Perplexity & Gemini | `get-cited-by-ai-chatbots` | tutorial | how to get cited by ChatGPT | self | ↑ · → GEO service |
| AI Visibility Tracking (Share of Model) | `ai-visibility-tracking` | tool | AI visibility tracking | self | ↑ · ⬇ Share of Model |
| llms.txt, robots.txt & AI Crawlers | `llms-txt-ai-crawlers` | tutorial | llms.txt | self | ↑ · ⬇ AI Crawler |
| Structured Data & Schema for AI Search | `structured-data-for-ai-search` | tutorial | schema markup for AI search | self | ↑ · ⬇ Structured Data |
| Local SEO for Swiss Businesses | `local-seo-switzerland` | tutorial | local SEO Switzerland | self | ↑ · → SEO service |
| AI Content Marketing (protects E-E-A-T) | `ai-content-marketing` | spoke | AI content marketing | self | ↑ · ⬇ E-E-A-T |
| Keyword & Topic Research with AI | `ai-keyword-research` | tutorial | AI keyword research | self | ↑ · ↔ ai-content-marketing |
| Answer Engine Optimization (AEO) | `answer-engine-optimization` | spoke | answer engine optimization | self | ↑ · ↔ geo-vs-seo-vs-aeo |

**Cluster 8 — AI by Industry (Swiss Sector Playbooks)** *(informational only; phone-assistant vertical pages do NOT live here — they are commercial matrix cells)*

| Title | Slug | Type | Primary keyword | Canonical owner | Key links |
|---|---|---|---|---|---|
| AI in Healthcare in Switzerland | `ai-fuer-gesundheitswesen` | industry | KI im Gesundheitswesen Schweiz | self | ↑ · ↔ C6 · → matrix |
| AI for Medical & Dental Practices | `ai-fuer-arztpraxen` | industry | KI in der Arztpraxis Schweiz | self (informational) | **→ matrix: Phone Assistant × Healthcare** (Overlap #3) |
| AI for Restaurants | `ai-fuer-restaurants` | industry | KI für Restaurants Schweiz | self (informational) | **→ matrix: Phone Assistant × Restaurants** (Overlap #3) |
| AI for Hotels | `ai-fuer-hotels` | industry | KI für Hotels | self | ↑ · → matrix |
| AI for Real Estate in Switzerland | `ai-fuer-immobilien` | industry | KI für Immobilien Schweiz | self | ↑ · ⬇ AVM · → matrix |
| AI for Retail in Switzerland | `ai-fuer-detailhandel` | industry | KI im Detailhandel Schweiz | self | ↑ · ⬇ Demand Forecasting |
| AI for Insurance in Switzerland | `ai-fuer-versicherungen` | industry | KI in der Versicherung Schweiz | self | ↑ · ↔ C6 · ⬇ STP |
| AI for Law Firms in Switzerland | `ai-fuer-anwaltskanzleien` | industry | KI für Anwaltskanzleien Schweiz | self | ↑ · ⬇ Berufsgeheimnis |
| **[GAP] AI for Manufacturing / Industrie 4.0** | `ai-fuer-industrie-fertigung` | industry | KI in der Fertigung Schweiz | self | ↑ · → Automation/Integrations |
| **[GAP] AI for Logistics & Supply Chain** | `ai-fuer-logistik` | industry | KI in der Logistik Schweiz | self | ↑ · → AI Automation |

**Cluster 9 — AI by Business Function**

| Title | Slug | Type | Primary keyword | Canonical owner | Key links |
|---|---|---|---|---|---|
| AI for Customer Support | `ai-for-customer-support` | spoke | AI for customer support | self | ↑ · → AI Phone Assistant |
| AI Voice & Phone Agents for Customer Service | `ai-voice-agent-customer-service` | spoke | AI voice agent for customer service | **self (CS-function angle)** | ↔ C3 product pages (Overlap #8) |
| AI for Sales (Playbook) | `ai-for-sales` | spoke | AI for sales | self | ↑ · ↔ lead-qualification |
| AI Lead Qualification & AI SDRs | `ai-lead-qualification` | spoke | AI lead qualification | self | ↑ · → AI Websites |
| AI in HR (Recruiting → People Ops) | `ai-for-hr` | spoke | AI in HR | self | ↑ · ↔ recruiting-eu-ai-act |
| AI in Recruiting & the EU AI Act | `ai-recruiting-eu-ai-act` | spoke | AI recruiting EU AI Act | self | ↑ · ↑ C6 · ⬇ Human Oversight |
| AI in Finance & Accounting (CFO View) | `ai-in-finance` | spoke | AI in finance | self | ↑ · ↔ accounts-payable |
| AI for Accounts Payable (Touchless Invoicing) | `ai-accounts-payable-automation` | spoke | AI accounts payable automation | self | ↑ · ⬇ STP/IDP · → AI Automation |
| AI ROI by Business Function (Where to Start) | `ai-roi-by-business-function` | tool | AI ROI by business function | self | ↑ · → AI Consulting |
| ~~AI, Data Protection & Data Sovereignty for Business~~ | `ai-data-protection-switzerland-business` | **redirect** | *(merged)* | → C6 (Overlap #5) | — |

**Gap: Tools sub-cluster** (under C1, feeds `best-ai-tools`) — each answer-first + comparison table, filterable, EU/CH data-residency flags; a "free AI tools" filter view satisfies that query.

| Title | Slug | Type | Primary keyword | Canonical owner |
|---|---|---|---|---|
| Best AI Image Generators | `best-ai-image-generators` | comparison/directory | beste KI Bildgenerator | self |
| Best AI Video Generators | `best-ai-video-generators` | comparison/directory | beste KI Video Generator | self |
| Best AI Coding Assistants | `best-ai-coding-assistants` | comparison/directory | beste KI Coding Tools | self (→ AI Websites) |
| Best AI Writing Tools | `best-ai-writing-tools` | comparison/directory | beste KI Schreibtools | self |
| AI Meeting & Transcription Assistants | `best-ai-meeting-transcription-tools` | comparison/directory | KI Meeting Transkription Tools | self |
| AI Tools Directory (versioned dataset) | `ai-tools-directory` | tool/dataset | KI Tools Verzeichnis | self (Academy page ↔ Resources download) |

**Gap: high-demand evergreen explainers + citation-magnet dataset** (under C1)

| Title | Slug | Type | Primary keyword | Canonical owner |
|---|---|---|---|---|
| Will AI Take My Job? (Swiss labour lens) | `will-ai-take-my-job` | spoke | wird KI meinen Job ersetzen | self |
| Free AI Tools (2026) | `free-ai-tools` | directory/spoke | kostenlose KI Tools | self (or directory filter view) |
| Why Does AI Hallucinate? | `why-ai-hallucinates` | spoke | warum halluziniert KI | self |
| Is ChatGPT Safe / Free? | `is-chatgpt-safe` | spoke | ist ChatGPT sicher | self |
| **AI Statistics 2026 (citation-magnet dataset)** | `ai-statistics-2026` | dataset | AI statistics 2026 | self (annotated Academy page ↔ Resources raw download) |

**Glossary (the DefinedTermSet).** One shared 4-language glossary at `ki-academy/glossar/` (~160 consolidated terms; near-duplicate variants collapse to one, e.g. revDSG/nDSG/nFADP/revFADP → one). One canonical anchor per term; every cluster deep-links its key terms *down* to this single anchor set — the internal-linking backbone. Per-term: 40–60-word answer-first definition; DE/EN/IT/FR variants; "how it works / why it matters"; up-links to owning pillar + related terms; primary-source citation (ISO/IEC 22989, EU AI Act article, Fedlex/revDSG, OWASP, OSI OSAID); `DefinedTerm` + `QAPage` schema inside a `DefinedTermSet`; visible "last verified" date. **The glossary is the only home for atomic definitions** — spokes link the canonical term rather than re-defining it.

**Comparisons library** at `ki-academy/comparisons/` — a central index that only *links*; each comparison lives once in its owner cluster. A pillar or service-disambiguation section may summarise a comparison in ≤1 table + a link, never reproduce the full head-to-head. Academy comparisons stay neutral/informational; Service-page comparisons stay transactional (Weissmann vs alternatives on delivery).

### 4.5 Resources — assets & proof

Practical/utility assets (use/download/prove). Datasets are versioned, carry `Dataset` JSON-LD, publish as machine-readable JSON + human tables, mirror to GitHub, and get a Zenodo DOI on each release.

| Asset | DE URL (pattern) | Type | Primary keyword | Intent | Canonical owner | Notes |
|---|---|---|---|---|---|---|
| Templates hub | `/ressourcen/vorlagen/` | index | KI Vorlagen | Use | self | AUP template, DPIA/DSFA, Vendor/DPA + RFP, prompt pack |
| Checklists hub | `/ressourcen/checklisten/` | index | KI Checklisten | Use | self | revDSG+EU AI Act checklist, GEO audit checklist |
| Calculators hub | `/ressourcen/rechner/` | index | KI Rechner | Use | self | Missed-call ROI, ROI-by-function, implementation-cost (CH) |
| Tools directory (download) | `/ressourcen/tools/` | dataset/directory | KI Tools Verzeichnis | Use | links to Academy `ai-tools-directory` | Raw file mirror; prose lives in Academy |
| Repos / Datasets | `/ressourcen/datensaetze/` | dataset | KI Datensätze | Use | self | Glossary JSON, comparison data, funding directory, AI-statistics-2026 raw |
| Case Studies | `/ressourcen/fallstudien/` | proof (`Article`) | KI Fallstudien | Prove | self | **HARD-GATED** — framework only until written permission + verified metrics |
| Insights (News) | `/ressourcen/insights/` | news (`Article`) | KI News Schweiz | Prove/inform | self | Dated editorial |
| GitHub org (`weissmann-ai`) | external, linked from `/ressourcen/datensaetze/` | repos | — | Use | self | `ai-glossary`, `ai-tools-directory`, `ai-comparison-data`, `swiss-ai-funding`, `llms-txt-examples`, `schema-snippets`, `local-ai-recipes` |

### 4.6 Company

| Page | DE URL (en / it / fr) | Type | Primary keyword | Intent | Canonical owner |
|---|---|---|---|---|---|
| About | `/ueber-uns/` (`about` / `chi-siamo` / `a-propos`) | `AboutPage` | Weissmann AI Team / KI Agentur Zürich | Trust | self |
| Methodology (The Weissmann AI Method) | `/methodik/` (`methodology` / `metodologia` / `methodologie`) | `HowTo` | Weissmann AI Method | Trust/EEAT | self (citeable `DefinedTerm`/`CreativeWork`) |
| Technology | `/technologie/` (`technology` / `tecnologia` / `technologie`) | `AboutPage` | Weissmann AI Technologie | Trust | self |
| Privacy & Security (trust) | `/datensicherheit/` (`privacy-security` / `privacy-sicurezza` / `confidentialite-securite`) | `AboutPage` | KI Datensicherheit Schweiz | Trust | self |
| Contact | `/kontakt/` (`contact` / `contatto` / `contact`) | `ContactPage` | Weissmann AI Kontakt | Trust/commercial | self |

### 4.7 The 10 overlaps — resolution ledger

| # | Overlap | Resolution |
|---|---|---|
| 1 | Two flagship chatbot comparisons | Canonical C4 `claude-vs-chatgpt-vs-gemini`; C1 → 301 + cross-link |
| 2 | "Agents vs automation" ×3 | Canonical C3 `ki-agenten-agentic-ai-automation`; C1 + C2 → redirect/link up |
| 3 | Phone-assistant Arztpraxis/Restaurant duplicated in Academy | Moved OUT to commercial matrix; C8 keeps informational sector playbooks |
| 4 | Swiss data sovereignty ×2 | Canonical C5 `ai-data-sovereignty-switzerland`; C6 → redirect |
| 5 | "AI data protection Switzerland" ×N | Canonical C6 `ai-swiss-data-protection-act`; C9 merged; C4 re-keyed to model-selection |
| 6 | AI compliance ×3 | Canonical home = C6 pillar; C2 re-scoped to KMU checklist linking up; healthcare = C6 vertical spoke |
| 7 | Open-source LLM split | C5 = "best OSS LLM" listicle; C4 = "OSS vs proprietary" evaluative; cross-linked |
| 8 | "AI voice agent" split | C3 owns product/tech; C9 owns customer-service-function angle |
| 9 | RAG ×2 | C3 owns "RAG Chatbot" (CS/KB); C5 owns "private RAG" (self-hosted); both link glossary RAG |
| 10 | Best-AI-tools ×2 | C1 general vs C2 KMU audience; both feed the Tools directory |

---

## 5. Internal-linking & authority-flow model

### 5.1 Design goal

A link graph that is **generated, not hand-maintained** — links derived from a typed content model plus a build-time link engine, so DE/EN/IT/FR stay in parity and zero orphans can ship. Three non-negotiables:

1. **Zero orphans** — every page ≥ its type's inbound floor, reachable ≤ 3 clicks from its language home.
2. **Language-closed graph** — an internal `<a>` never crosses languages; cross-language relationships are expressed **only** through hreflang.
3. **Build-time provable** — validated by CI gates that fail the Netlify build, not by human review.

### 5.2 Authority direction (informational → commercial)

Academy (pillars + spokes + glossary) owns informational intent and accumulates topical authority; Services (9 pages) own commercial intent and are deliberate **PageRank near-sinks**; Industries (14 hubs) are the bridge. **Directionality bias:** an Academy spoke sends ≤ 2 commercial links; a service page sends ≤ 1 back to the Academy (usually its concept explainer) so equity does not leak from the money page. Glossary terms and services accumulate the most inbound links by design — making them the strongest-ranking, most-citeable nodes.

### 5.3 Page-type → required-links matrix

`R` = required · `O` = optional/conditional · `—` = none.

| From ↓ / Class → | Uplink→Pillar | Downlink→Spokes | Sibling/Related | Glossary (auto) | Service (CTA) | Industry | Cross-Pillar | Breadcrumb | Contact | **Min inbound** |
|---|---|---|---|---|---|---|---|---|---|---|
| `cluster-pillar` | — | **R (all)** | R (6) | R (≤6) | O (≤2) | O | **R (2–3)** | R | R | **4** |
| `cluster-spoke` | **R (×2)** | — | **R (2–4)** | R (≤6) | O (by tier) | O | O (0–1) | **R** | R | **3** |
| `comparison` | **R** | — | R (3–4) | R | O–R (1–2) | O | R (each entity) | R | R | **3** |
| `glossary-index` | — | **R (all owners)** | — | — | O (≤1) | — | — | R | R | — |
| `glossary-term` | **R (owning spoke)** | — | R (2–3) | self-excl. | — | — | — | R | O | **2** |
| `tool-directory` | O | **R (comparisons)** | R (3) | R (≤4) | **R (per category)** | O | — | R | R | **3** |
| `service` | O (1 concept spoke) | — | — | — | — (self) | O (back to industries) | — | R | R | **5** |
| `industry` | O | **R (2–3 spokes)** | R (3) | R (≤4) | **R (1–2)** | O | — | R | R | **3** |
| `learning-path` | **R** | **R (every stage)** | O | R | O | — | O | R | R | **2** |
| `home` / `academy-index` | — | **R (9 pillars)** | — | O | R (9 services) | R | — | — | R | n/a |

Absolute floor for **any** page: ≥ 2 inbound + reachable ≤ 3 clicks from home.

### 5.4 Mechanisms

- **Link engine:** Astro content collections with a Zod schema; `slug` is language-neutral; one helper `url(slug, lang)` resolves the URL from `site.ts`. Writers reference targets by slug via an MDX `<Link to="…">` shortcode; a raw hand-written internal `<a href>` is a lint error.
- **Hub-and-spoke spine (bidirectional, auto-enforced):** pillar → every spoke via a generated cluster-nav block (adding a spoke auto-adds its inbound link — the strongest orphan-prevention mechanism); spoke → pillar in breadcrumb + one contextual in-body link; spoke ↔ 2–4 same-cluster siblings; pillar ↔ 2–3 adjacent pillars (single connected component, ≤ 2 hops).
- **Glossary auto-linking:** a rehype plugin links only the first occurrence of each term, cap 6 per page, self-excludes the owning page, never touches headings/code/TL;DR/existing links; each glossary entry links back out to its canonical explainer.
- **Related-articles engine:** deterministic build-time block (pillar 6 / spoke 4 / comparison 4 slots), mandatory mix (≥1 same-cluster spoke, ≥1 pillar, ≥1 cross-cluster/glossary/tool), reciprocity injection, de-orphaning boost for pages below floor.
- **Contextual discipline:** ~1 internal link per 120–180 words; first-mention-wins; the answer-first TL;DR holds ≤ 1 internal link; no links inside H1–H4.
- **Anchor discipline:** ≤ 20% exact-match anchors per target; variety ladder (exact→partial→branded→descriptive→verb phrase); banned "hier klicken"/"click here"/naked URLs; anchors written natively per language.

### 5.5 Zero-orphan CI gates (fail the Netlify build)

`scripts/qa/link-graph.mjs` parses the rendered graph per language from `dist/<lang>/`: (1) **orphan gate** — every node ≥ type floor, per locale; (2) **reachability gate** — BFS ≤ 3 clicks; (3) **connected-component gate** — pillar layer single component; (4) **language-parity gate** — a slug in DE exists in EN/IT/FR with same `pageType`/`clusterId`/`pillarSlug` + comparable inbound count; (5) **language-leak gate**; (6) **raw-href lint**; (7) budget/anchor gates; (8) reciprocity report (auto-healed next build). The sitemap is generated from content collections; a URL present in the sitemap but orphaned still **FAILS** gate 1 — you cannot merge a spoke without wiring its pillar. Additional build-failing governance gates: an indexable page with a `NEEDS VERIFICATION` placeholder (must be `noindex`), a duplicate head-keyword→URL assignment, a matrix cell missing required-unique-fields or a real-proof source.

---

## 6. First-party authority assets & external-source strategy

### 6.1 Governing principles

| # | Rule |
|---|---|
| P1 | **No fabricated data — ever.** Ungrounded → `NEEDS VERIFICATION` or not shipped. |
| P2 | **Prices only from `pricing.ts`;** illustrative numbers labelled "Beispiel/example". |
| P3 | **Four-language parity is a ship gate** (self-referential + reciprocal hreflang + canonical). |
| P4 | **Answer-first + schema-marked** (40–60-word TL;DR + correct JSON-LD) or it doesn't ship. |
| P5 | **Date + "last verified" stamp** on every volatile fact and asset. |
| P6 | **Light, honest gating** — the useful thing works without a form; email only for the portable/downloadable version. A gated wall is unciteable. |
| P7 | **No artificial authority** — no bought/exchanged links, PBNs, spun content, fake reviews. |

### 6.2 Asset priority matrix (build order)

Priority = (lead-gen × cluster leverage × citation value) / effort.

| Rank | Asset | Type | Service on-ramp | Tier |
|---|---|---|---|---|
| 1 | **4-Language AI Glossary** (dataset + pages) | Dataset/reference | All | 1 |
| 2 | **Missed-Call + Phone-Assistant ROI Calculator** | Calculator | KI-Telefonassistent | 1 |
| 3 | **AI Readiness Assessment & Scorecard** | Interactive → report | Discover workshop | 1 |
| 4 | **revDSG + EU AI Act Compliance Checklist** | Checklist/PDF | Advisory/audit | 1 |
| 5 | **AI Tools Directory** (versioned) | Dataset/directory | SEO/GEO + advisory | 2 |
| 6 | **AI ROI-by-Function Prioritization Calculator** | Calculator | Discover | 2 |
| 7 | **Model/Chatbot Comparison Tables** (versioned) | Dataset/tables | GEO Authority | 2 |
| 8 | **AI Acceptable-Use Policy Template (Swiss)** | Template | Advisory | 2 |
| 9 | **Prompt Library** (150+, filterable, copy) | Template | Newsletter/lead | 2 |
| 10 | **AI Implementation Cost Estimator (CH)** | Calculator | All services | 2 |
| 11 | **Swiss AI Funding & Subsidies Directory** | Dataset | Advisory | 3 |
| 12 | **DPIA/DSFA Template + guided builder** | Template/HowTo | Advisory | 3 |
| 13 | **Vendor/DPA due-diligence + RFP template** | Template/checklist | Advisory | 3 |
| 14 | **GEO / AI-Visibility Audit Checklist + tool** | Checklist/tool | GEO Authority | 3 |
| 15 | **SME Use-Case Dataset (50+ automations)** | Dataset | Advisory | 3 |
| 16 | **GitHub org** (datasets + llms.txt + schema + local-AI) | Repos | Developer trust | 3 |

**Fabrication-defence highlights:** calculators compute from the user's own inputs plus config-sourced constants; any pre-fill (e.g. "avg % missed") is a labelled, editable estimate with a cited tier, never asserted as measured Weissmann data. The Implementation Cost Estimator states only central-config prices as Weissmann prices; every non-Weissmann figure is a labelled sourced range. **Case studies are the one asset that cannot be fabricated** — `/ressourcen/fallstudien/` ships as a framework ("what a Weissmann case study measures") until written client permission + verified metrics exist; no calculator, dataset or scorecard may display a client metric, logo, or result without documented permission. Datasets are versioned, `Dataset`-schema'd, mirrored to GitHub, and DOI'd via the eyewear-dataset v1.1.0 workflow (GitHub release → Zenodo DOI → optional Hugging Face mirror), each CC BY 4.0 so attribution flows back to weissmann.ai. Regulated-vertical assets are **reviewed by Nicola Mössner** and carry "Rechtsstand per <Datum>".

### 6.3 External-source whitelist

| Tier | Source type | Examples | Use for |
|---|---|---|---|
| **1 — Primary law/standards** | Regulators, legal texts, standards bodies | Fedlex (revDSG/nFADP), EDÖB/FDPIC, Innosuisse, SECO/kmu.admin.ch, Swissmedic, FINMA; EUR-Lex (Reg. (EU) 2024/1689), EU AI Office; NIST AI RMF, ISO/IEC 42001, ISO/IEC 22989, OECD AI, Convention 108+, OWASP Top 10 for LLMs, OSI OSAID | Every legal/compliance/definitional claim — cite exact article + "as of" date |
| **2 — Official vendor/model docs** | First-party product/model/pricing/safety pages | OpenAI, Anthropic, Google DeepMind/Gemini, Microsoft Copilot, Mistral, Meta (Llama license), Apertus (ETH/EPFL/CSCS), Swisscom, Ollama/vLLM/llama.cpp/LM Studio | Capabilities, tiers, data-handling, pricing (linked, never restated), licensing |
| **3 — Peer-reviewed / research** | Academic + reputable labs | arXiv, Stanford HAI, MIT, the Princeton/Georgia Tech/IIT-Delhi GEO study, ETH/EPFL | Mechanism explainers, GEO tactics, ML/LLM concepts — attribute to authors + year |
| **4 — Reputable industry/market** | Named analysts + Swiss surveys | Gartner, McKinsey, Deloitte (incl. CH), EY, AXA Switzerland, digitalswitzerland, MIT NANDA | Adoption/market *context only*, attributed + dated, never Weissmann-measured |
| **5 — Reputable OSS** | Maintained projects | Ollama, vLLM, llama.cpp, Hugging Face, Mistral/Meta repos, OWASP repos | Local-AI/self-hosting how-tos, licensing — cite repo + release + date |

**Citation rules (enforced in review):** every statistic/legal fact/price/benchmark inline-attributed to a whitelist source with link + date, or cut / `NEEDS VERIFICATION`. Prefer primary over secondary. Prices/benchmarks never restated as fact ("as of <month/year>, per <source>" + link). ~1 citation per 150–200 words in factual sections. No copyrighted-text reproduction — paraphrase + cite. Contested points stated honestly (e.g. "Google states llms.txt is not required"). **Explicitly prohibited forever:** buying/exchanging links, PBNs, comment/forum spam, low-quality directory submissions, article spinning, fake reviews, paid "mentions" presented as editorial.

**Legitimate authority-earning:** linkable-asset PR (the 4-language glossary + DOI'd datasets as the canonical DACH reference; the Apertus/Swiss-sovereign-AI explainer; the Swiss funding directory; reproducible first-party research); genuine expert sourcing (Carpi/Mössner on Swiss AI compliance); and entity seeding across Wikidata, Crunchbase, LinkedIn, Google Business Profile and .ch directories (same name, founders, Technoparkstrasse 6 Zürich, the Weissmann AI Method).

---

## 7. GEO / EEAT / semantic / Core Web Vitals implementation checklist

### 7.1 Design principles

1. **Config-derived, never hand-written** — every JSON-LD block emitted by a shared Astro component from typed config (guarantees 4-language parity).
2. **One entity, four languages** — DE/EN/IT/FR share the same `@id`, `sameAs`, author `@id`, Organization `@id`; only human-readable strings and `inLanguage` change.
3. **Answer-first or it does not ship** — a 40–60-word lead answer + TL;DR box required (LLMs retrieve paragraphs, not pages).
4. **Grounded or labelled** — every stat carries inline source + date, or is a labelled tier, or is `NEEDS VERIFICATION` and not rendered as fact.
5. **Freshness is a ranking signal** — `dateModified` + a visible "Zuletzt aktualisiert / Last verified" stamp, truthful (from git/frontmatter, never `Date.now()`).

### 7.2 Answer-first page skeleton (mandatory, all 4 languages)

```
H1  (entity/question, matches primary kw)
─ Kurzantwort / TL;DR box   ← 40–60 words, self-contained, entity named in full (no "it"/"this")
─ Key facts / Kernaussagen  ← 3–5 standalone, independently quotable + grounded bullets
─ Definition-first paragraph ← "X ist … / X is …" (feeds entity resolution + DefinedTerm)
H2 = real question → 2–3 sentence direct answer, THEN expand
H2 = real question → same
… comparison table / verdict box where applicable …
─ Quellen / Sources  (inline links, dated)
─ Autor + "Zuletzt aktualisiert / Last verified: <date>"
```

H2/H3 are questions phrased as the query is actually typed per language, and these strings must equal `Question.name` in FAQPage schema. Each H2 must read correctly lifted out with zero context (name the entity every time). The TL;DR is a real DOM element (`<aside class="tldr">`), not schema-only, so it survives extraction.

### 7.3 Structured-data matrix (per page type)

Every page emits a `@graph` with stable `@id` per node, cross-linked by reference. Baseline on every page: `Organization` (ref), `WebSite`, `BreadcrumbList`, `WebPage`.

| Page type | Primary type(s) | Key properties |
|---|---|---|
| Pillar | `Article` + `WebPage` | headline, author(@id), publisher(@id), datePublished, dateModified, inLanguage, about, mentions[], isPartOf, image |
| Concept explainer | `TechArticle` + `FAQPage` | + FAQPage `mainEntity[]` mirroring H2 questions |
| Comparison / taxonomy | `Article` + `ItemList` (+ `FAQPage`) | itemListElement[] with position; each entity `Thing`/`SoftwareApplication` + `sameAs`; explicit verdict node |
| Glossary hub | `DefinedTermSet` + `CollectionPage` | hasDefinedTerm[], inLanguage, stable @id |
| Glossary term | `DefinedTerm` in `QAPage` | inDefinedTermSet(@id), sameAs (Wikidata/official), Question/acceptedAnswer |
| How-to / procedure | `HowTo` + `Article` | step[] (name+text+url anchor), totalTime, tool/supply where real |
| Learning path | `Course` + `LearningResource` | teaches, educationalLevel, provider(@id) |
| Prompt / template library | `Article` + `ItemList` (+ `Dataset`) | ItemList of prompts; Dataset if downloadable |
| Tools directory | `Article` + `ItemList` of `SoftwareApplication` | applicationCategory, operatingSystem, sameAs, Swiss-residency as additionalProperty |
| Service-adjacent commercial | `TechArticle` + `FAQPage` + `Service`(ref) | Article about → Service@id; price via `pricing.ts` only |
| Industry / function | `Article` + `FAQPage` (+ ItemList of use cases) | about(industry), audience(`BusinessAudience`), Swiss-regulator mentions |
| Calculator / asset | `WebApplication` + `Dataset` | applicationCategory:"BusinessApplication"; Dataset license, creator(@id), dateModified |
| Case-study framework | `Article` only | **never** emit `Review`/`AggregateRating` until real + permissioned |

### 7.4 Entity / semantic strategy

- **`entities.ts`** — every concept has a canonical name + `sameAs` (Anthropic/Claude, OpenAI/ChatGPT, Google DeepMind/Gemini, Microsoft Copilot → Wikidata + official; EU AI Act → EUR-Lex; revDSG/nFADP, EDÖB → Fedlex, edoeb.admin.ch; ISO 42001, NIST AI RMF, OWASP → official; Apertus, ETH, EPFL, CSCS → Wikidata + official; Innosuisse, SECO → .admin.ch; Transformer/RAG/attention → Wikipedia/Wikidata).
- **Weissmann knowledge graph** (emitted once, `@id`-referenced): `Organization` `#org` (NAP Technoparkstrasse 6, 8005 Zürich, `sameAs`, founder edges, `areaServed` CH/DACH); `WebSite` `#website` + `SearchAction`; `Person` `#giovanna-carpi` (CEO/author) and `#nicola-moessner`; `Service` nodes per offering; **"The Weissmann AI Method"** as a `DefinedTerm`/`CreativeWork` with its own `@id`, identical across all 4 languages. Legal-entity fields stay "pending legal confirmation" — never invented.
- **Off-site seeding (ops):** Wikidata item, Crunchbase, LinkedIn company + founder profiles, Zürich directories — so `sameAs` targets exist and citations resolve.

### 7.5 EEAT

Named byline (Giovanna Carpi) with `Person` schema + `sameAs` on every Academy page; expert review by Nicola Mössner for legal/compliance and healthcare/finance verticals with "Rechtsstand per <Datum>" and provisional flags on moving parts (labelled uncertainty is itself a trust signal); sourcing discipline per §6.3; regulatory instruments named precisely ("EU AI Act = Regulation (EU) 2024/1689"; "OWASP LLM01 = Prompt Injection").

### 7.6 Comparison / table formatting for extraction

Criteria table (rows = criteria, columns = options; every cell a short factual value or "n/a", never blank/invented; mirrored to `ItemList` JSON-LD); an answer-first `<aside class="verdict">` "Empfehlung nach Anwendungsfall" one line per use case; contrastive pages (GEO vs SEO vs AEO; agents vs automation vs RPA; nFADP vs GDPR vs EU AI Act; data residency vs sovereignty) always ship as a 3-column contrast table (the format most reliably lifted into AI Overviews); all tables wrapped in `overflow-x:auto`.

### 7.7 AI-discoverability + technical signals

- **`llms.txt`** — generated (root DE-led + `/en/ /it/ /fr/`) from `clusters.ts` + `glossary.ts` + `authors.ts`, built alongside `sitemap.xml`: org summary, language pointers, canonical references (glossary + 9 pillars first), clusters, first-party datasets, authors + entity. Optional `/llms-full.txt`. Do not invent `ai.txt`.
- **`robots.txt`** — explicit AI-crawler allowlist: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot — all `Allow: /`. Do not add `X-Robots-Tag: noai`.
- **`/ki-academy/` hub-index** — real HTML TOC listing all 9 pillars + spoke sub-lists (a clean second path to every pillar).
- **`_headers` (Netlify):** HTML `Cache-Control: public, max-age=0, must-revalidate` so fresh `dateModified` reaches crawlers immediately (24h JS-cache caveat affects hashed assets only); keep `X-Content-Type-Options: nosniff`, `Referrer-Policy`, restrictive `Permissions-Policy`.

### 7.8 Core Web Vitals (Astro/Netlify static)

Server-render the citeable text (Astro ships zero JS by default; interactive islands hydrate only where needed via `client:visible`). **LCP:** static HTML + CDN; hero `<img>` with explicit dimensions, `loading="eager"` + `fetchpriority="high"`, responsive `srcset`, AVIF/WebP. **CLS:** explicit dimensions on all images/embeds; reserve space for islands + TL;DR/verdict asides; self-host fonts `font-display: optional`. **INP:** minimal JS; small Preact/vanilla-TS islands; GA4 deferred/consent-gated. **No external CDN anywhere** (fonts, calculator PDF libs, all assets bundled locally — CSP-safe). Version calculator bundles against the 24h JS-cache caveat.

### 7.9 CI parity & freshness gates (FAIL the build)

DE/EN/IT/FR versions share identical `@id`, `author.@id`, `about.@id`, `datePublished`, and numeric facts (divergent numbers fail); `dateModified` from frontmatter/git, never build time; TL;DR + author + `dateModified` present; no price string outside `pricing.ts`; every `DefinedTerm` has `@id` + resolvable `sameAs` or explicit none; hreflang self-referential + reciprocal across 4 languages, `x-default` → EN, trailing slash everywhere.

### 7.10 Engineer-facing checklist

- [ ] Registries created: `slugs.ts`, `services.ts`, `industries.ts`, `matrix.ts`, `academy.ts`, `glossary.ts`, `resources.ts`, `keyword-map.ts`; `site.ts` extended with org `@id`/logo/`sameAs[]`; `authors.ts`, `entities.ts`, `clusters.ts`.
- [ ] `<SchemaGraph>` assembles per-page `@graph`; page-type schema components (`<ArticleSchema>`, `<FaqSchema>`, `<HowToSchema>`, `<DefinedTermSetSchema>`, `<ItemListSchema>`, `<CourseSchema>`, `<DatasetSchema>`, `<ServiceSchema>`).
- [ ] MDX layout enforces answer-first skeleton (build fails if TL;DR missing); `<CompareTable>` + `<VerdictBox>`.
- [ ] `url(slug, lang)` resolver + `<Link to>`; raw internal `<a>` banned; reusable blocks `<Breadcrumb>`, `<ClusterNav>`, `<PillarUplink>`, `<RelatedArticles>`, `<GlossaryTooltipLink>`, `<ServiceCTA>` (pulls `pricing.ts`).
- [ ] rehype auto-glossary plugin (cap + self-exclusion); cross-pillar adjacency + service/industry maps in `site.ts`.
- [ ] `scripts/qa/link-graph.mjs` wired into Netlify CI, gates 1–6 blocking; generated `llms.txt` (root + 3) + `sitemap.xml`; `robots.txt` AI-crawler allowlist.
- [ ] Off-site (ops): Wikidata/Crunchbase/LinkedIn `sameAs` targets created.

---

## 8. Phased rollout

**Ship all four languages of each page together (structural invariant); publish DE + EN first at full quality, IT + FR when professionally translated (or high-quality human-reviewed).** Do not let the sync invariant force machine-translated thin pages.

**Phase 0 — Platform foundations (before any content).** Registries + link engine + `<SchemaGraph>` + CI gates + `llms.txt`/`robots.txt`/sitemap generation + the atomic migration/301 map (§3.7) executed in staging with full hreflang round-trip validation. Confirm the repo is out of OneDrive first.

**Phase 1 — Pilot: Cluster 3 + glossary seed (~10 pages × 4 languages).** Proves the answer-first / four-language / schema / lead-magnet template end-to-end. Pairs directly with the **highest-commercial-intent build**: the AI Phone Assistant service page + Wave-1 matrix cells (Phone Assistant × Healthcare, × Restaurants, × Hotels) and the flagship Missed-Call ROI Calculator + 4-language glossary (Priority-1 assets). This is the recommended pilot — it validates the whole system on the single most commercially valuable topic.

**Phase 2 — Money clusters:** C2 (KMU) + C7 (Marketing/SEO/GEO) with their mapped services (Consulting, SEO, GEO, Google Ads) and Wave-2 matrix cells; ship the AI Readiness Scorecard + revDSG/EU AI Act checklist.

**Phase 3 — Trust & differentiation:** C6 (Compliance — canonical home) + C5 (Local AI/Sovereignty), the Apertus explainer, funding directory, DPIA/vendor templates; regulated-vertical expert review.

**Phase 4 — Breadth & authority:** C4 (Models/Vendors) + C8 (Industry playbooks) + C1/C9 (Foundations, Functions, Tools sub-cluster, evergreen explainers, AI-Statistics-2026 dataset); Wave-3 matrix cells as proof accrues; GitHub org + Zenodo DOIs.

Throughout: every new spoke auto-wires its pillar (CI enforces it); no page ships that fails an orphan/parity/keyword-collision gate; case studies remain framework-only until permissioned.

---

## 9. Open decisions the owner must confirm before build

1. **Approve the two structural migrations** — silo + 301 from root `/ki-telefonassistent/`; full per-language slug localization (incl. `preise` → `pricing`/`prezzi`/`tarifs`).
2. **`x-default` = English** (recommended) and **Swiss targeting = plain codes now, upgradeable to `-CH` later** (recommended) — confirm both.
3. **Translation resourcing** — professional IT/FR for pillar/service/high-value pages vs. demand-gated long-tail matrix + glossary (§8).
4. **Slug sign-offs** — `ki-webentwicklung` (AI Websites `ai-websites` → `ki-webentwicklung` 301); Manufacturing DE = `produktion` vs `industrie`/`fertigung`; GEO = full `generative-engine-optimization`; Academy token = `ki-academy`/`ai-academy`/`academie-ia`.
5. **Real data — none may be invented; unconfirmed → `NEEDS VERIFICATION` + `noindex`:** real case studies (per service + per Wave-1 cell — all currently flagged), real prices (only Phone Assistant + Websites carry `Offer`; all others "auf Anfrage"), supported integrations, legal-entity data, confirmed served industries, launch-priority matrix combos (recommend Phone Assistant × Healthcare and × Restaurants first).
6. **`robots.txt` for AI crawlers** — recommend **allow** (GPTBot/ClaudeBot/PerplexityBot/Google-Extended et al.) to maximize GEO citeability.
7. **`sameAs` targets** to add once available — Zefix/Handelsregister, Google Business Profile, Wikidata QID, founders' LinkedIn.

---

*Source documents (source of truth): `SITE-INFORMATION-ARCHITECTURE.md`, `IA-STRESS-TEST.md`, `knowledge-hub/{clusters.json, CRITIQUE.md, STRATEGY.md, TOPIC-CLUSTERS.md, INTERNAL-LINKING.md, GEO-AND-SCHEMA.md, RESOURCES-AND-AUTHORITY.md}`. This master map reconciles all of them with the owner's six-pillar promotion of AI Academy and folds in every stress-test fix and all 10 knowledge-hub overlap resolutions.*
