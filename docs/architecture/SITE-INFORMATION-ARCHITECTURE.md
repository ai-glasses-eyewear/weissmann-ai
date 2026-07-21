# Weissmann AI — Canonical Site-Wide Information Architecture

**Status:** Recommended, implementation-ready. Supersedes the three lens proposals (SEO-first, GEO-first, UX/scalability-first).
**Scope:** Astro 5 static · Netlify · i18n (DE at root, `/en/` `/it/` `/fr/`, `trailingSlash` always) · central config as single source of truth.

---

## 0. Verdict — Endorse the owner's structure, with three mandatory upgrades

**I endorse the owner's five-section hierarchy (HOME → SERVICES → INDUSTRIES → RESOURCES → COMPANY) and the proposed service/industry/resource inventories.** The taxonomy is correct and I am not overriding it.

However, the current *implementation* is internally inconsistent, and the owner left three critical decisions open. I am making them decisively, because all three independent lenses converged on the same answers and the convergence is the strongest possible signal:

1. **Silo every service under a localized `/leistungen/` segment** (not flat root). Migrate the one legacy exception (`/ki-telefonassistent/`) with a 301. *Reason: at hundreds of pages, path hierarchy is the primary machine-readable signal of parent→child relationships for both crawlers and LLMs, it produces URL-derived breadcrumbs, it concentrates internal PageRank on the service entity, and it removes the current split-brain (one service flat, one already siloed).*
2. **Fully localize URL segments per language** via a central slug registry (not German slugs reused under `/en/ /it/ /fr/`). *Reason: keyword-in-URL in the page's own language is a real ranking + click + trust signal; German slugs on English/French pages read as untranslated and leak relevance. The site is small enough now that the 301 + hreflang cost is trivial and only grows.*
3. **Separate commercial intent (Services) from informational intent (Academy) by a one-keyword-one-URL contract**, never by canonicalization. *Reason: different query intents don't compete, so both rank; assigning any head keyword to two URLs is the only thing that causes cannibalization, and a registry-enforced keyword map designs the conflict out.*

Everything below is superior to a flat/German-slug/merged model on **all four axes simultaneously**: SEO (silo authority + keyword-in-URL), GEO (unambiguous entity graph in URL + schema + `llms.txt`), UX (four low-load sections, URL-derived breadcrumbs, single conversion goal per page), and scalability (every page generated from registries; orphans and thin pages blocked at build time).

---

## 1. Decision comparison table

| Decision | Owner's proposal | **Canonical recommendation** | Why it wins |
|---|---|---|---|
| **Service URL model** | Flat root (`/ki-telefonassistent/` precedent) | **Siloed `/leistungen/{service}/`**, all 9, localized segment; 301 the one legacy root page | Silo = URL-derived breadcrumbs, topical authority concentration, unambiguous namespace, structural orphan prevention. Subfolders rank on par with root in modern Google; the 301 preserves ~all equity of the single legacy page. |
| **Services index/hub** | Not explicit | **Yes — a real pillar at `/leistungen/`** (`ItemList`/`OfferCatalog`), co-existing with Home | Ranks the head "AI services Zürich/Schweiz" term, distributes equity so no service is orphaned, and is the hub every service links up to. (Currently missing — an active orphan risk.) |
| **Service × Industry matrix** | "Scale without thin pages" (placement unspecified) | **Service-primary, single canonical `/leistungen/{service}/{industry}/`**, behind a hard uniqueness gate; industry hub links to it but never copies it | Buyer intent is service-led ("KI-Telefonassistent Zahnarzt"); one canonical parent consolidates long-tail authority on the service entity and prevents the same page existing under two paths. |
| **Service disambiguation** | 4 overlapping services listed | **Crisp scopes:** Consulting *decides* → Automation *(deterministic rules)* / Agents *(autonomous reasoning)* / Integrations *(connectivity)*; Phone Assistant = productized voice-agent *instance* of Agents | A disambiguation block per page + explicit schema relationships stop the four build-services (and the generic Agents vs the specific Phone Assistant) from cannibalizing each other. |
| **Resources / Academy nesting** | Academy under Resources; Downloads a top-level category | **Academy hub + 9 clusters nest under `/ressourcen/`; Downloads demoted to a cross-cutting *filter view*** over Templates/Guides | Keeps the informational authority engine intact; a standalone Downloads silo would duplicate Templates/Guides and create a thin, cannibalizing index. |
| **Academy vs Service cannibalization** | Flagged as a risk to solve | **Intent separation + registry keyword map**; both pages self-canonical; reciprocal cross-links | Informational vs commercial are different intents → both rank. No head keyword is ever assigned twice — the map is the binding contract, enforced at content-brief time. |
| **Nav model** | HOME→SERVICES→INDUSTRIES→RESOURCES→COMPANY, Pricing its own item | **Same 5 sections.** Mega-menus for Services/Industries/Resources; light dropdown for Company; **Pricing kept as a persistent utility link beside a persistent Demo CTA** | Four low-cognitive-load, scalable sections; Company rarely needs a mega-menu; high-intent Pricing access and one always-visible conversion CTA are preserved. |
| **Localized URL segments** | German slugs reused under all locales | **Fully localized per language** from a central slug registry (`services/servizi/services`, `branchen/industries/settori/secteurs`, …) | Per-locale keyword-in-URL match + native trust; ship with a 301 map + regenerated hreflang. |
| **Company pages placement** | "COMPANY" bucket | **Nav cluster, not a URL silo** — pages flat at German root (`/ueber-uns/`, `/methodik/`, `/technologie/`, `/kontakt/`), localized under locale prefix | Entity/trust pages gain nothing from nesting; flat keeps existing `/ueber-uns/` and `/kontakt/` intact (no migration). |
| **Privacy & Security** | One "Privacy & Security" item | **Split into two entities:** a marketing *trust* page (Company) **distinct from** the legal `/datenschutz/` policy | Different intent + schema role; merging dilutes both and lets the legal page cannibalize "AI data security" informational queries. |

---

## 2. Top-level navigation, mega-menu, breadcrumb & hreflang model

### 2.1 Primary navigation (5 sections + utility)

| Section (DE label) | Purpose | Children | Nav pattern |
|---|---|---|---|
| **Home** (`/`) | Introduces the **ecosystem only**; routes to silos. Never a service dump. Carries `Organization` + `WebSite`(+`SearchAction`) + `LocalBusiness` schema and the primary `sameAs` cluster. Answer-first 40–60-word hero summary. | — | Logo link |
| **Leistungen / Services** | Primary commercial entry. Mega-menu of the 9 services, curated into **Build / Grow / Advise**, plus "Alle Leistungen" → `/leistungen/` hub. | 9 services + hub | Mega-menu |
| **Branchen / Industries** | Demand-side sector hubs grouped by cluster; frame sector pains, link to relevant services + published matrix pages. Not duplicated service copy. | 14 industries + hub | Mega-menu (grouped, "Alle Branchen") |
| **Ressourcen / Resources** | Informational authority engine grouped **Learn / Tools / Proof**. Hosts the AI Academy + typed libraries. | Academy, Glossary, Guides, Comparisons, Case Studies, Templates, Calculators, Insights | Mega-menu |
| **Unternehmen / Company** | E-E-A-T / trust layer. Landing = About. | About, Methodology, Technology, Privacy & Security, Contact | Light dropdown |
| **Preise / Pricing** *(utility)* | High-intent buyers. Text link beside the persistent **Demo/Contact CTA** + language switcher. | — | Utility link |

**Build / Grow / Advise grouping** (communicates non-overlap in the menu itself):
- **Build:** AI Websites · AI Automation · AI Agents · AI Integrations · AI Phone Assistant
- **Grow:** SEO · GEO · Google Ads
- **Advise:** AI Consulting

### 2.2 Breadcrumb model
`BreadcrumbList` JSON-LD on **every non-home page**, mirroring the canonical URL silo exactly (e.g. Home › Leistungen › KI-Telefonassistent › Zahnarztpraxen). Breadcrumbs are **derived from the URL path**, which is the core reason the siloed model is chosen — flat root cannot produce them.

### 2.3 hreflang model
- Every page emits a **reciprocal `de`/`en`/`it`/`fr` cluster + `x-default` → German root**, generated from the central slug registry (never hand-written).
- `trailingSlash` always; DE at root (`prefixDefaultLocale: false`).
- **Four-language-sync invariant:** a page cannot ship unless all four locale slugs exist in the registry — this structurally prevents partial hreflang clusters (honoring the four-language sync policy).

---

## 3. Full URL scheme (de / en / it / fr) — siloed & localized

**Decision: siloed, not flat root.** Justification in §0 and §1. `x-default` → German root.

| Page type | DE | EN | IT | FR |
|---|---|---|---|---|
| Home | `/` | `/en/` | `/it/` | `/fr/` |
| **Services hub** | `/leistungen/` | `/en/services/` | `/it/servizi/` | `/fr/services/` |
| AI Phone Assistant | `/leistungen/ki-telefonassistent/` | `/en/services/ai-phone-assistant/` | `/it/servizi/assistente-telefonico-ai/` | `/fr/services/assistant-telephonique-ia/` |
| AI Websites | `/leistungen/ki-webentwicklung/` † | `/en/services/ai-web-development/` | `/it/servizi/sviluppo-siti-web-ai/` | `/fr/services/developpement-web-ia/` |
| SEO | `/leistungen/seo/` | `/en/services/seo/` | `/it/servizi/seo/` | `/fr/services/seo/` |
| GEO | `/leistungen/generative-engine-optimization/` | `/en/services/generative-engine-optimization/` | `/it/servizi/generative-engine-optimization/` | `/fr/services/generative-engine-optimization/` |
| Google Ads | `/leistungen/google-ads/` | `/en/services/google-ads/` | `/it/servizi/google-ads/` | `/fr/services/google-ads/` |
| AI Automation | `/leistungen/ki-automatisierung/` | `/en/services/ai-automation/` | `/it/servizi/automazione-ai/` | `/fr/services/automatisation-ia/` |
| AI Agents | `/leistungen/ki-agenten/` | `/en/services/ai-agents/` | `/it/servizi/agenti-ai/` | `/fr/services/agents-ia/` |
| AI Consulting | `/leistungen/ki-beratung/` | `/en/services/ai-consulting/` | `/it/servizi/consulenza-ai/` | `/fr/services/conseil-ia/` |
| AI Integrations | `/leistungen/ki-integrationen/` | `/en/services/ai-integrations/` | `/it/servizi/integrazioni-ai/` | `/fr/services/integrations-ia/` |
| **Service × Industry** (pattern) | `/leistungen/{service}/{branche}/` | `/en/services/{service}/{industry}/` | `/it/servizi/{service}/{settore}/` | `/fr/services/{service}/{secteur}/` |
| **Industries hub** | `/branchen/` | `/en/industries/` | `/it/settori/` | `/fr/secteurs/` |
| Industry (pattern) | `/branchen/{branche}/` | `/en/industries/{industry}/` | `/it/settori/{settore}/` | `/fr/secteurs/{secteur}/` |
| **Resources hub** | `/ressourcen/` | `/en/resources/` | `/it/risorse/` | `/fr/ressources/` |
| **AI Academy hub** | `/ressourcen/ki-academy/` | `/en/resources/ai-academy/` | `/it/risorse/ai-academy/` | `/fr/ressources/academie-ia/` |
| Academy cluster (×9) | `/ressourcen/ki-academy/{cluster}/` | `/en/resources/ai-academy/{cluster}/` | `/it/risorse/ai-academy/{cluster}/` | `/fr/ressources/academie-ia/{cluster}/` |
| AI Glossary (index + term) | `/ressourcen/ki-glossar/{begriff}/` | `/en/resources/ai-glossary/{term}/` | `/it/risorse/glossario-ai/{termine}/` | `/fr/ressources/glossaire-ia/{terme}/` |
| Guides | `/ressourcen/ratgeber/` | `/en/resources/guides/` | `/it/risorse/guide/` | `/fr/ressources/guides/` |
| Comparisons | `/ressourcen/vergleiche/` | `/en/resources/comparisons/` | `/it/risorse/confronti/` | `/fr/ressources/comparatifs/` |
| Case Studies | `/ressourcen/fallstudien/` | `/en/resources/case-studies/` | `/it/risorse/casi-studio/` | `/fr/ressources/etudes-de-cas/` |
| Templates | `/ressourcen/vorlagen/` | `/en/resources/templates/` | `/it/risorse/modelli/` | `/fr/ressources/modeles/` |
| Calculators | `/ressourcen/rechner/` | `/en/resources/calculators/` | `/it/risorse/calcolatori/` | `/fr/ressources/calculateurs/` |
| Insights (News) | `/ressourcen/insights/` | `/en/resources/insights/` | `/it/risorse/insights/` | `/fr/ressources/insights/` |
| *Downloads* | *filter view over Templates/Guides — not a URL* | — | — | — |
| Company: About | `/ueber-uns/` | `/en/about/` | `/it/chi-siamo/` | `/fr/a-propos/` |
| Company: Methodology | `/methodik/` | `/en/methodology/` | `/it/metodologia/` | `/fr/methodologie/` |
| Company: Technology | `/technologie/` | `/en/technology/` | `/it/tecnologia/` | `/fr/technologie/` |
| Company: Privacy & Security *(trust)* | `/datensicherheit/` | `/en/privacy-security/` | `/it/privacy-sicurezza/` | `/fr/confidentialite-securite/` |
| Company: Contact | `/kontakt/` | `/en/contact/` | `/it/contatto/` | `/fr/contact/` |
| Pricing | `/preise/` | `/en/pricing/` | `/it/prezzi/` | `/fr/tarifs/` |
| Legal: Imprint | `/impressum/` | `/en/imprint/` | `/it/note-legali/` | `/fr/mentions-legales/` |
| Legal: Privacy policy | `/datenschutz/` | `/en/privacy/` | `/it/privacy/` | `/fr/confidentialite/` |
| Legal: Terms | `/agb/` | `/en/terms/` | `/it/termini/` | `/fr/cgv/` |
| Thank-you *(noindex)* | `/danke/` | `/en/thank-you/` | `/it/grazie/` | `/fr/merci/` |
| Machine files (root, cross-locale) | `/robots.txt` · `/llms.txt` · `/llms-full.txt` · `/sitemap.xml` | | | |

**Localized industry slugs (the 14):**

| Industry | DE | EN | IT | FR |
|---|---|---|---|---|
| Healthcare *(Clinics fold in)* | gesundheitswesen | healthcare | sanita | sante |
| Restaurants | gastronomie | restaurants | ristoranti | restaurants |
| Hotels | hotellerie | hotels | hotel | hotellerie |
| Retail | einzelhandel | retail | commercio-al-dettaglio | commerce-de-detail |
| Real Estate | immobilien | real-estate | immobiliare | immobilier |
| Insurance | versicherungen | insurance | assicurazioni | assurances |
| Professional Services *(Law firms fold in)* | dienstleister | professional-services | servizi-professionali | services-professionnels |
| Beauty & Wellness | beauty-wellness | beauty-wellness | bellezza-benessere | beaute-bien-etre |
| Manufacturing | produktion ‡ | manufacturing | produzione | industrie |
| Construction | baugewerbe | construction | edilizia | construction |
| Logistics | logistik | logistics | logistica | logistique |
| Education | bildung | education | istruzione | education |
| Finance | finanzwesen | finance | finanza | finance |
| E-commerce | e-commerce | e-commerce | e-commerce | e-commerce |

† **AI Websites DE slug:** migrate the grandfathered `ai-websites` → `ki-webentwicklung` (captures the "Webentwicklung" search volume and standardizes the `ki-` German prefix). 301 required — flagged to confirm. **German AI-prefix standard: `ki-` for all German service slugs.**
‡ **Manufacturing DE** (`produktion`) and **GEO slug** (full `generative-engine-optimization` over bare `geo`, to disambiguate from "geographic") are flagged to confirm in §9. The GEO H1 localizes; the slug stays the universal technical term across locales.

---

## 4. Service page model + service scope boundaries

### 4.1 Mandatory template (every service = exactly one page, one `Service` entity)
No service is ever merged onto a shared page. Each ships all of:

1. **Unique H1** — service name + commercial/local qualifier ("… Zürich / Schweiz").
2. **Unique metadata** — title + meta description + OG, keyword-mapped, no reuse across pages.
3. **Answer-first summary** — a 40–60-word direct-answer block immediately under H1 (the snippet AI Overviews/Perplexity lift and attribute; doubles as the human value prop).
4. **Problem → solution narrative** unique to the service.
5. **"How it works" / methodology** block (links to `/methodik/`).
6. **"Industries we serve"** block linking **down** to published matrix pages — the internal-link engine for the long-tail; sub-gate combos render here as sections, not URLs.
7. **Disambiguation block** — "How this differs from *[sibling service]*", explicitly linking overlapping siblings so LLMs never conflate entities.
8. **Real, verifiable case studies** — or a clearly marked **NEEDS VERIFICATION** placeholder. Never invented.
9. **Transparent pricing / next step** — from `pricing.ts` only; links to `/preise/`. `Offer` schema only when a real price exists.
10. **Unique FAQ** (5–8 Q&A) as `FAQPage` schema.
11. **"Learn the fundamentals"** contextual link to the matching **Academy pillar** (passes authority, signals the informational↔commercial relation, avoids cannibalization).
12. **Unique CTA** (demo/contact), repeated hero + mid + end, sticky on mobile.

**Schema stack per page:** `Service` (serviceType, provider→Organization, areaServed = CH/Zürich, offers→Offer when priced) + `FAQPage` + `BreadcrumbList`, all self-canonical.
**Keyword contract:** each service page owns commercial modifiers (Agentur, Anbieter, Kosten, für [Branche], Zürich) and must **not** target the informational head query owned by its Academy pillar.

### 4.2 Crisp, non-overlapping scopes

| Service | Scope (deliverable) | Distinct from | Buyer question |
|---|---|---|---|
| **AI Consulting** | Advisory & strategy **only** — readiness assessment, use-case discovery, feasibility, roadmap, governance, build-vs-buy, training. Deliverable = a **decision/plan**. Ships no software. | Sits **before** the build services — decides *what* to build. | "What should we do with AI?" |
| **AI Automation** | **Deterministic**, rule/trigger-based workflow automation (Make/n8n/Zapier-class, document processing, data sync, RPA-lite). Deliverable = **running pipelines**. | Fixed rules, **not** autonomous reasoning (Agents); owns the **workflow logic**, not just wiring (Integrations). | "Automate this repetitive process." |
| **AI Agents** | **Autonomous / semi-autonomous LLM agents** that reason, use tools, and act with delegated autonomy (support/research agents, chat & voice agents). Deliverable = a **decision-making agent**. The **AI Phone Assistant** is the productized voice-agent *instance* of this category. | Model-driven autonomy, **not** fixed rules (Automation); a built system, **not** advice (Consulting). | "Build an AI that decides & acts for us." |
| **AI Integrations** | The **connectivity/plumbing layer** — wiring AI/models into the existing stack via APIs, CRM/ERP, data pipelines, model/vendor connectors. Deliverable = **AI wired into existing systems**. | Moves/connects data, **not** process logic (Automation) or autonomous behavior (Agents); implements, unlike Consulting. Often the enabling layer beneath an Agent/Automation build. | "Connect AI to our existing systems." |

The generic **AI Agents** page and the specific **AI Phone Assistant** page carry a reciprocal disambiguation block and a schema `isSubTypeOf`/instance relationship so the two never cannibalize.

---

## 5. Service × Industry matrix — scalable long-tail without thin pages

**Structure:** service-primary, **single canonical** at `/leistungen/{service}/{industry}/` (e.g. `/leistungen/ki-telefonassistent/zahnarztpraxen/`). The industry hub links to it; it is **never** copied under `/branchen/`.

Four hard rules:

1. **Uniqueness gate (the primary thin-content defense).** A combo earns its own URL only when it clears a content-depth threshold (~800–1000 words of genuinely industry-specific pain points, use cases, example workflows/scripts, industry-relevant integrations, an industry FAQ, and **real proof** — or at minimum one genuinely unique block: a real named case study **OR** unique industry stats/ROI/workflow). Below the gate, the combo renders as a **section** on the parent service page's "Industries we serve" block — indexable, but not a standalone URL. **This is a hard CI rule, not a guideline.**
2. **Single canonical.** The page exists in exactly one place (the service silo).
3. **Synonym discipline.** One canonical term per language (`zahnarztpraxen`, not also `zahnarzt`/`dentist`); variants 301 to the canonical.
4. **Bidirectional linking.** Each matrix page links **up** to its service pillar and its industry hub, and is listed on both — never orphaned (≥2 inbound internal links, enforced in CI).

**Schema:** `Service` (with `areaServed`/`audience` = the industry) + `FAQPage` + `BreadcrumbList`. `isPartOf` → service; `about`/`mentions` → industry hub.
**Rollout:** demand-first, **not** exhaustive 9×14. Start with proven verticals — recommend **AI Phone Assistant × Healthcare** and **× Restaurants (Gastronomie)** first. A `matrix.ts` registry tracks every cell with status (`live` / `backlog` / `section-only`) + a required-unique-fields checklist; CI blocks publishing any combo lacking the required fields or a real proof source.

**Canonical industry taxonomy:** the owner's 14 stand. **Clinics → Healthcare** and **Law Firms → Professional Services** fold in as `Audience` sub-segments / in-page sections (schema `Audience`), never as parallel top-level hubs — this captures their long-tail without a combinatorial explosion of near-duplicate hubs. Sub-industries (e.g. dental practices, physiotherapy) live as leaf matrix pages under the **service** silo. Industries needing business confirmation before publish are flagged in §9.

---

## 6. Resources model + AI Academy (9 clusters) without cannibalization

**`/ressourcen/` is the informational authority engine.** It hosts, each with its own index (orphan prevention) and consistent schema:

- **AI Academy** — hub + **9 topical cluster pillars:** `grundlagen-glossar` (foundations/glossary) · `kmu-business` (business & SMEs) · `agenten-automatisierung-voice-chatbots` · `modelle-anbieter` (models & vendors) · `lokal-open-source` · `vertrauen-sicherheit-datenschutz-regulierung` (trust/security/privacy/regulation) · `marketing-seo-geo` · `branchen` (industries) · `funktionen` (functions). Clusters carry `Article` + `FAQPage`, authored by a named `Person` (Giovanna Carpi / Nicola Mössner) for E-E-A-T.
- **AI Glossary** — `DefinedTermSet` + `DefinedTerm` term pages; answer-first 1–2-sentence definitions = prime GEO/AI-citation surface.
- **Guides** (how-to Articles) · **Comparisons** ("X vs Y" — the format LLMs quote most, keeps comparison intent off commercial pages) · **Case Studies** (real only → NEEDS VERIFICATION; reused as proof modules across service/industry/matrix pages) · **Templates** · **Calculators** (e.g. the existing MissedCallsCalculator — link magnet + conversion assist) · **Insights/News** (`Article`, named author, freshness signal).
- **Downloads** is a **cross-cutting filter/view** over Templates/Guides/Whitepapers — *not* its own silo (prevents a thin, duplicate index).

**Anti-cannibalization = intent separation + a one-keyword-one-URL contract (enforced in the registry):**
- **Academy pillars/terms own INFORMATIONAL intent** — "Was ist ein KI-Agent?", "Automatisierung vs. Agenten", "GEO erklärt". `Article`/`DefinedTerm` + `FAQ` schema, educational answer-first layout, no pricing in primary content.
- **Service pages own COMMERCIAL/transactional intent** — "KI-Agenten entwickeln lassen", "KI-Beratung Zürich", "Anbieter/Kosten/für [Branche]". `Service`/`Offer` schema, CTA-first.
- Because these are genuinely different query intents, **both rank without competing**, and **both stay self-canonical — never cross-canonicalize.** The keyword-to-URL map (one head keyword → exactly one URL, tagged by intent) is the binding enforcement point, applied at content-brief time.
- **Reciprocal cross-links:** Academy pillar → "Ready to implement? → [service]"; service page → "Learn the fundamentals → [Academy pillar]". Authority flows both directions and gives Google/AI assistants an explicit informational↔commercial topical relationship, so the Academy's authority **compounds onto** the money pages instead of splitting rankings.

---

## 7. Internal linking, orphan prevention, entity model & migration

### 7.1 Central registries = single source of truth
Extend the existing `site.ts`/`pricing.ts` pattern with data-driven registries: `slugs.ts` (page-type → `{de,en,it,fr}` localized slugs), `services.ts`, `industries.ts`, `matrix.ts` (cells + publish status + unique-field checklist), `academy.ts`, `glossary.ts`, `caseStudies.ts`, `resources.ts`. Each entry declares: **pageType, localized slug map, primaryKeyword, intent (commercial|transactional|informational), silo, relatedServices[]/relatedIndustries[]/relatedAcademy[].** Plus the **keyword-to-URL map** (the cannibalization enforcement point).

These registries **deterministically generate**: localized URLs, reciprocal hreflang (+`x-default`=DE root), breadcrumbs, the per-page "Related" module, curated footer link sets, XML + HTML sitemaps, `llms.txt`/`llms-full.txt`, and the internal-link/orphan audit. Humans edit **data**, not nav markup — so nothing drifts.

### 7.2 Hub-and-spoke link graph (mandatory directions)
1. Services hub ↔ each service (down + up). 2. Service → its matrix pages (down); matrix → service (up). 3. Industries hub ↔ each industry; industry → its matrix pages; matrix → its industry hub (every matrix page ≥2 inbound). 4. Service ↔ matching Academy pillar (commercial↔informational bridge). 5. Academy hub ↔ clusters ↔ glossary terms; terms link up to cluster + out to the operationalizing service. 6. Curated footer (top services + industries + key resources + company + legal) on every page as a safety net. 7. A registry-driven "Related pages" module on every page.

**Orphan prevention:** no indexable page ships unless reachable from (a) the mega-menu or its hub, (b) breadcrumbs, and (c) ≥1 contextual in-body link. **CI fails** any indexable page with <2 inbound internal links, any broken link, and any incomplete hreflang cluster. Exact-match/descriptive anchor text toward the canonical target.

### 7.3 Entity model (three redundant machine channels)
The same entity graph is expressed identically in **URL path hierarchy + Schema.org JSON-LD + `llms.txt` enumeration**, so no crawler/LLM guesses relationships. `Organization` (NAP from `site.ts`: **Technoparkstrasse 6, 8005 Zürich**) → founder edges to two `Person` entities (Giovanna Carpi — Founder & CEO; Nicola Mössner — Co-founder, Strategy & PR) with `sameAs`. The named **Weissmann AI Method** is reified on `/methodik/` as a citeable `HowTo`. Legal-entity fields (registered name, legal form, UID) stay visible **"pending legal confirmation"** placeholders — never invented.

### 7.4 Migration note vs current site
The current implementation is inconsistent: **`/ki-telefonassistent/` sits flat at root** while **`/leistungen/ai-websites/` is already siloed**, and `/leistungen/` **has no index page** (a live orphan/hub gap). Migration, shipped as **one coordinated change** (301 map + canonical + hreflang + `llms.txt` + sitemap together, verified in staging):
1. Create the `/leistungen/` hub pillar (closes the orphan gap).
2. 301 `/ki-telefonassistent/` → `/leistungen/ki-telefonassistent/`; update self-canonical.
3. 301 `/leistungen/ai-websites/` → `/leistungen/ki-webentwicklung/` (if the slug migration is approved).
4. 301 the German-slug EN/IT/FR URLs (`/en/leistungen/…`, `/en/preise/…`) → their localized equivalents; regenerate hreflang from the registry.
5. Localize legal slugs **last** (lowest ranking value); keep German aliases 301'd.
Respect the Netlify **24 h JS-cache** caveat when scheduling verification windows, and confirm the repo is **out of OneDrive** before large-scale page generation (prior corruption incident).

**Forbidden entities — never introduce on any page:** "Podomedics", the obsolete "Culmannstrasse 39 / 8006 Zürich" address, or "eyewear".

---

## 8. Scalability guardrails (hundreds of pages, no decay)
1. Pages are **declared as data**, not hand-wired — linking, breadcrumbs, hreflang, schema render automatically.
2. The **uniqueness gate** on matrix pages is the structural brake on thin content — the page count grows only where real demand/content exists.
3. **One-canonical-per-combo + synonym-301 discipline** prevents duplicate-path bloat.
4. **CI governance gate:** orphan check + broken-link check + hreflang-completeness check + matrix required-unique-fields check all fail the build.
5. **Curated, grouped mega-menus** (fixed size, "see all" hub links) keep nav cognitive load flat regardless of total pages.
6. **Demand-first phased rollout** per silo; keep money pages ≤3 clicks from root; prune/consolidate underperforming matrix pages to protect crawl budget + internal PageRank.

---

## 9. Decisions to confirm (owner)

1. **Approve the two structural migrations:** (a) silo all services under localized `/leistungen|/services|/servizi/` with a 301 from root `/ki-telefonassistent/`; (b) full slug localization per language via the central registry (301 map for existing EN/IT/FR German-slug URLs, incl. `preise`→`pricing`/`prezzi`/`tarifs`).
2. **AI Websites DE slug:** approve migrating grandfathered `ai-websites` → `ki-webentwicklung` (301), and the **`ki-` German prefix standard** across all service slugs.
3. **GEO slug:** confirm full `generative-engine-optimization` over bare `/geo/` (recommended, for disambiguation).
4. **Manufacturing DE slug:** confirm `produktion` (vs `industrie`/`fertigung`).
5. **Academy token per language:** confirm `ki-academy` (DE) / `ai-academy` (EN, IT) / `academie-ia` (FR); and whether all 9 clusters launch together (four-language-sync) or a subset first.
6. **Real case studies / customers** — per service and per priority matrix combo. None may be invented; anything unconfirmed renders **NEEDS VERIFICATION**.
7. **Confirmed industries actually served** (which of the 14 have genuine demand + content to publish first) and **launch-priority matrix combos** (recommend AI Phone Assistant × Healthcare and × Restaurants first).
8. **Supported integrations/tools** for the AI Integrations and AI Automation pages (none may be invented).
9. **Legal entity data** — registered name, legal form, UID — to replace the pending-confirmation placeholders on Impressum/legal + `Organization` schema.
10. **Real pricing in `pricing.ts`** for services beyond the phone assistant/websites — otherwise pages use "request a quote" and carry **no** `Offer` schema (never invent prices).
11. **`robots.txt` policy for AI crawlers** (GPTBot / ClaudeBot / PerplexityBot / Google-Extended) — recommend **allow** to maximize GEO citeability; a conscious owner decision.
12. **Authoritative `sameAs` targets** to add once available: Zefix/Handelsregister entry, Google Business Profile, Wikidata QID, founders' LinkedIn.
