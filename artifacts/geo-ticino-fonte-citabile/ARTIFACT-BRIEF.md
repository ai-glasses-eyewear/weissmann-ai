# Artifact Brief — Valutazione della citabilità nelle risposte AI (Ticino)

**Companion article:** `geo-ticino-fonte-citabile` (IT-WEB-09) — "GEO in Ticino: come diventare una fonte che ChatGPT e Perplexity possono citare"
**Artifact title:** Valutazione della citabilità nelle risposte AI
**Language:** Italian (it) only — matches the article; no DE/EN/FR version is commissioned.
**Artifact type:** A regional entity-signal audit, not a generic GEO checklist. This is the master-prompt's own named artifact concept for IT-WEB-09, reframed to fit the article's narrow thesis: it audits five categories of *third-party, Ticino-specific corroboration* (commercial register/Cc-Ti, category associations, regional press, local directories, original local expertise) plus a four-point name/address/phone/description consistency check — never the generic answer-first / schema / crawler-access / freshness items already owned by `src/data/resource-content/geo-audit-checklist.json`. No numeric score, no citation-probability estimate, no ranking.

## 1. User problem

A Ticino business owner has read the companion article and now knows, in the abstract, that five categories of local third-party corroboration exist and that a small regional market does not build them automatically. What they lack is a structured way to check their *own* current state against those five categories plus the consistency test the article describes, and to know which one thing to fix first given limited time. Without this, most owners either try to do all five at once (and burn out after category two) or fix nothing because the list feels abstract until it is applied to their actual business.

## 2. Intended audience

A Ticino SME owner, manager or the person handling marketing part-time (a `fiduciaria`, a `studio professionale`, an artisan workshop, a boutique retailer) who has already read the article's framework and wants to apply it to their own business in ten minutes, not a reader still learning what GEO is (that reader belongs on the article's cross-linked foundational pages: `get-cited-by-ai-assistants` and `what-is-generative-engine-optimization`).

## 3. Why an interactive artifact is better than a static PDF

A printed version of the five categories forces the reader to hold the article's priority order in their head while manually checking their own website, register entry, association listing and any press mentions. The interactive version:
- Applies the article's own fixed priority sequence (register → local directories/alignment → category association → original expertise → regional press) automatically, instead of asking the reader to remember and re-derive it.
- Enforces the article's one non-negotiable rule mechanically: if **any** of the four consistency checks (legal name, address, +41 phone format, short description) is marked inconsistent, the tool always surfaces "fix your existing sources first" as the top action, regardless of how complete the five categories otherwise look — matching the article's own principle that correcting an existing wrong source outranks adding a new one.
- Produces a **personalised, ordered action list** — "next recommended step" plus a queue — rather than a static list where every reader has to figure out their own starting point.
- Deliberately produces **no numeric AI-citation-probability score**. The only count shown is a plain checklist tally ("X of Y elements already confirmed"), explicitly labelled as a completion count, never as a prediction of whether ChatGPT or Perplexity will actually cite the business — consistent with this project's existing GEO artifacts (`geo-agency-red-flags-switzerland`'s tool refuses a fake "AI visibility score" for the same reason).
- Is genuinely distinct from the generic `geo-audit-checklist.json` resource (which audits answer-first content, schema.org markup, technical crawler access and freshness) and from the German (time-phased launch-day/week-one/month-one readiness audit) and English (ten-claim vendor-pitch red-flag auditor) GEO artifacts already shipped in this project — this one audits *regional third-party entity corroboration only*.

## 4. Inputs

All values come from `artifact-data.json`.

**Four consistency checks** (`consistencyChecks`), each answered with one of three states (`consistencyStatusOptions`), defaulting to "Non ancora controllato":
1. Ragione sociale
2. Indirizzo
3. Numero di telefono
4. Descrizione breve dell'attività

**Five entity-signal categories** (`categories`), each answered with one of up to four states (`categoryStatusOptions`), defaulting to "Non ancora presente":
1. Iscrizione al registro di commercio e alla Camera di Commercio del Cantone Ticino (Cc-Ti) — `allowNotApplicable: false`, so this category never offers "Non pertinente".
2. Presente coerente in directory ed elenchi di settore locali — allows "Non pertinente".
3. Appartenenza a un'associazione di categoria o a un ordine professionale pertinente — allows "Non pertinente".
4. Competenza o dati originali legati al territorio pubblicati sul vostro sito — `allowNotApplicable: false`.
5. Menzioni verificabili nella stampa regionale ticinese — allows "Non pertinente".

No free-text company name or any identifying detail is requested anywhere in the tool.

## 5. Calculation / decision logic

Implements `artifact-data.json`'s `outputLogic` exactly. In summary:

1. **Consistency override (non-negotiable):** if any of the 4 consistency checks is "Diversa in almeno una fonte", the top action shown is always "Correggete prima le fonti già esistenti", naming the specific inconsistent items — this appears regardless of the state of the 5 categories.
2. **Priority walk:** only once the override is shown (or if there is none), walk the 5 categories in the fixed order given by `priorityOrder` (`registro_commercio → directory_locali → associazione_categoria → competenza_originale → stampa_regionale`), skipping any category marked "Sì, verificato e coerente" or "Non pertinente per la mia attività". The first remaining category (either "Non ancora presente" or "Presente ma incoerente o da aggiornare") becomes the **"prossimo passo consigliato"**; every later remaining category becomes part of an **"in coda"** queue, in the same fixed order.
3. **Stable state:** if every applicable category is "verificato" or "non pertinente" *and* all 4 consistency checks are "coerente", show `stableStateNote` (a periodic-recheck reminder, not a permanent "done" badge).
4. **Tally:** show "`X` di `Y` elementi già confermati", where `Y` = 9 minus however many categories were marked "non pertinente" (consistency checks always count toward the denominator; categories marked not applicable are excluded from both numerator and denominator). This tally is always paired with `noScoreNote`, making explicit that it is a checklist completion count, not a citation-probability estimate.
5. **No pitch/company is ever treated specially.** The tool has no field for a company name at all, so there is nothing to bias.

## 6. Outputs

1. A single, always-visible priority banner: either the consistency-override action, or the "prossimo passo consigliato" category, whichever the logic selects.
2. An ordered "in coda" queue of the remaining not-yet-confirmed categories.
3. The plain-text tally ("X di Y elementi già confermati") with `noScoreNote` shown directly beneath it, every time, not only on request.
4. `stableStateNote` in place of the priority banner when nothing remains to act on.
5. A short "perché conta" (why it matters) line under each category and consistency item, reachable via an always-available disclosure (not hover-only), reusing `whyItMatters` / `description` from `artifact-data.json` verbatim so the tool and the article never drift apart.

## 7. Error states

- **Nothing answered yet** (all 9 inputs at default) → show only `insufficientDataNote` ("Rispondete ad almeno un elemento per vedere un elenco di azioni personalizzato"); no priority banner, no tally.
- **A category marked "Non pertinente" is later needed for the override or the tally** → the tool must never re-include a "non pertinente" category in the priority queue or the tally denominator, even if the reader marked it after already having other answers; state stays consistent on every recalculation.
- **JavaScript disabled** → the static HTML still lists the 4 consistency items and 5 categories with their status options and `whyItMatters`/`description` text in a readable, unfiltered order (progressive enhancement, not a blank page).
- **Reader looks for a numeric AI-citation-probability score or a ranking against competitors** → not offered; show `noScoreNote` verbatim: "Questo strumento non stima una probabilità di citazione da parte di ChatGPT, Perplexity o altri assistenti AI."

## 8. Privacy considerations

- Fully client-side; nothing is transmitted anywhere, and no analytics tied to individual answers is required. No company name, personal name, email address or any other identifying field exists anywhere in the tool — inputs are limited to the 4 consistency statuses and 5 category statuses.
- If the build persists answers via `localStorage` for convenience across a session, this must be disclosed in one visible line with a working "Cancella le risposte" control.

## 9. Accessibility requirements

- Each of the 4 consistency checks and 5 categories is a `<fieldset>` with a `<legend>` stating the item, and the status options are real radio inputs, not styled `<div>`s.
- The priority banner, "in coda" queue and tally update inside an `aria-live="polite"` region so a screen-reader user is told when the result changes without losing their place.
- The consistency-override banner and the stable-state note are always shown as text, never colour-only; an accent colour may accompany the override banner but never replace the text.
- Minimum 4.5:1 text contrast; respects `prefers-reduced-motion` (the result updates instantly, no animated counters standing in for the plain tally this tool intentionally keeps simple).
- The `whyItMatters` / `description` disclosures use a native, keyboard-operable element (e.g. `<details>`), never a hover-only tooltip.

## 10. Mobile behaviour

- The 4 consistency checks render first, as a compact stacked block; the 5 categories render below as one card per category, each with its status options beneath it — never a wide table or horizontally scrolling grid.
- A small sticky bar at the top shows the current priority banner (override or "prossimo passo consigliato") while the reader scrolls through the cards.
- Status option controls are sized for touch (≥44×44px targets).

## 11. Exact CTA

Primary CTA, shown persistently once at least one item has been answered:

> **"Parlare con Weissmann dell'entità della propria azienda"** → links to `/it/kontakt/`

Secondary, lower-emphasis link near the top of the tool:

> "Leggere l'articolo completo sulle categorie di prove" → links to the article's own URL (`/it/ai-academy/marketing-seo-geo/geo-ticino-fonte-citabile/`).

Tertiary, contextual link near the result:

> "Scoprire il programma GEO Authority di Weissmann" → links to `/it/servizi/generative-engine-optimization/`.

No countdown, no fake urgency, no scarcity framing. CTA wording and destinations never change based on the reader's answers or how many elements are already confirmed.

## 12. Disclaimer

Shown persistently near the tally, not buried in a modal:

> "Tutte le risposte restano nel vostro browser e non vengono mai inviate altrove. Nessuna citazione da parte di ChatGPT, Perplexity o altri assistenti AI è mai garantita da questo strumento, da Weissmann o da chiunque altro venda servizi GEO. Il risultato è un elenco di priorità pratiche, non una previsione né una consulenza legale."

## 13. Visual direction (Weissmann brand)

Match the site's live "Swiss Editorial" design tokens (`src/styles/global.css`), consistent with other Weissmann artifacts:
- Background `--paper: #ffffff` / `--paper-soft: #f7f7f5`; text `--ink: #111111` with `--ink-soft` / `--ink-mute` for secondary text.
- Accent colour `--accent: #c51a2e` (Swiss red) reserved only for the consistency-override banner ("Correggete prima le fonti già esistenti"), always paired with the text label, never a large fill and never the only signal. The "prossimo passo consigliato" banner and the stable-state note use a calm ink tone with their own text label — no green, no traffic-light system.
- Primary CTA button styled as confident black (`--btn-bg: #111111`, hover `#2b2b2b`, white text).
- The 4 consistency checks and 5 categories render as genuine bordered cards/fieldsets (thin 1px lines, `--line: #e5e5e2`), not a dial, gauge, dashboard or scorecard visual — no visual element should imply a measured probability that does not exist. The tally is plain text, never a progress ring or percentage bar.
- Typography `'Instrument Sans'` with system-sans-serif fallback; corner radius `10px`/`14px`; soft shadow (`--shadow`) only on the active priority banner.
- Overall feel: a calm, editorial self-audit worksheet the reader fills in against their own business, not a quiz, dashboard, or AI-visibility scoring tool.

## 14. Self-contained build prompt (paste into Claude to build this as a standalone HTML/Artifact)

```
Build a single self-contained HTML artifact (inline CSS + JS, no external
dependencies, no network calls) in ITALIAN called "Valutazione della
citabilità nelle risposte AI". It is a self-audit worksheet for Ticino SME
owners who have read a companion article about building regional
third-party entity signals (commercial register, category associations,
regional press, local directories, original local expertise) so that AI
assistants like ChatGPT and Perplexity can recognise their business as a
real, citable entity. It is explicitly NOT a generic GEO checklist (that
already exists elsewhere on the site as a separate resource covering
answer-first content, schema.org markup, crawler access and freshness) and
NOT an AI-citation-probability calculator — it only audits regional
third-party corroboration and basic data consistency, and produces no
numeric score of any kind.

CONTEXT
The companion article's thesis: in a small, concentrated market like
Ticino, an AI system recognises a business as a real, citable entity
mainly through third-party corroboration outside the business's own
website — consistent registration, category-association membership,
regional press mentions, local directory listings, and genuinely original
local expertise — because a small market does not generate that
corroboration automatically the way a large market does. The article also
states one hard rule: fixing an existing inconsistent source (wrong
address, inconsistent phone format) is worth more, immediately, than
adding a brand-new source. This tool lets the reader check their own
current state against exactly this framework and get a personalised,
ordered action list — never a numeric AI-visibility or citation-likelihood
score (a fake "AI visibility score" is explicitly rejected as a red flag by
a sibling tool already in this project).

INPUTS — FOUR CONSISTENCY CHECKS (fixed IDs and Italian labels, use exactly)
  ragione_sociale → "Ragione sociale — Il nome legale della vostra azienda
    compare in modo identico sul sito, sul registro di commercio e su ogni
    altra fonte in cui siete elencati."
  indirizzo → "Indirizzo — L'indirizzo compare nella stessa forma ovunque
    (stessa via, stesso numero, stesso comune, stessa formattazione)."
  telefono → "Numero di telefono — Il numero compare sempre nello stesso
    formato +41, non a volte con lo 0 iniziale e a volte con il prefisso
    internazionale."
  descrizione → "Descrizione breve dell'attività — La riga che descrive
    cosa fate resta coerente nel significato ovunque compare, anche se le
    parole esatte cambiano leggermente."
Each answered with one of three states, defaulting to "Non ancora
controllato": "Uguale ovunque" / "Diversa in almeno una fonte" / "Non
ancora controllato".

INPUTS — FIVE ENTITY-SIGNAL CATEGORIES (fixed IDs, Italian labels and
whyItMatters — use exactly; two never offer "Non pertinente")
  registro_commercio (no "non pertinente" option) → "Iscrizione al
    registro di commercio e alla Camera di Commercio del Cantone Ticino
    (Cc-Ti)" — whyItMatters: "È il segnale di entità più basilare e
    verificabile che esista: conferma che la vostra azienda è una persona
    giuridica reale, con una ragione sociale e una sede precise."
  directory_locali (offers "non pertinente") → "Presenza coerente in
    directory ed elenchi di settore locali" — whyItMatters: "Elenchi
    cantonali, comunali o di categoria sono utili solo se nome, indirizzo e
    descrizione restano identici a quelli del sito; dati vecchi o
    discordanti confondono più che aiutare."
  associazione_categoria (offers "non pertinente") → "Appartenenza a
    un'associazione di categoria o a un ordine professionale pertinente" —
    whyItMatters: "Essere elencati come membri di un'associazione di
    settore ticinese segnala che pari del vostro stesso ambito vi
    riconoscono come un'attività reale."
  competenza_originale (no "non pertinente" option) → "Competenza o dati
    originali legati al territorio pubblicati sul vostro sito" —
    whyItMatters: "È la sostanza che rende le altre categorie citabili a
    loro volta: senza un contenuto originale, associazioni, stampa e
    directory non hanno nulla di concreto da riprendere."
  stampa_regionale (offers "non pertinente") → "Menzioni verificabili
    nella stampa regionale ticinese" — whyItMatters: "Un'intervista o un
    articolo scritto da una redazione che non controllate vale più di
    dieci righe di autopromozione, perché proviene da una fonte
    indipendente."
Each answered with, by default, "Non ancora presente", plus "Sì, verificato
e coerente", "Presente ma incoerente o da aggiornare", and — only for the
three categories marked "offers non pertinente" above — "Non pertinente
per la mia attività".

No company name, personal name or any identifying field is requested
anywhere in this tool.

LOGIC (implement exactly — no numeric scoring, no weighting, no ranking):
1. Non-negotiable override: if ANY of the 4 consistency checks is "Diversa
   in almeno una fonte", the priority banner ALWAYS shows: "Correggete
   prima le fonti già esistenti", listing by name which consistency items
   are inconsistent. This appears regardless of the state of the 5
   categories, and outranks everything below.
2. If there is no override, walk the 5 categories in this FIXED order:
   registro_commercio → directory_locali → associazione_categoria →
   competenza_originale → stampa_regionale. Skip any category marked "Sì,
   verificato e coerente" or "Non pertinente per la mia attività". The
   first remaining category becomes the priority banner, labelled
   "Prossimo passo consigliato: {category label}". Every later remaining
   category is listed below, in the same fixed order, under the heading
   "In coda".
3. If every applicable category is "verificato" or "non pertinente" AND
   all 4 consistency checks are "coerente": replace the priority banner
   with: "Le fonti verificate risultano coerenti oggi. Questo non è un
   traguardo permanente: rifate questo controllo ogni volta che cambiate
   indirizzo, nome commerciale o numero di telefono."
4. Tally (always shown beneath the banner, in plain text, never a
   progress ring or percentage): "{X} di {Y} elementi già confermati",
   where Y = 9 minus the number of categories marked "non pertinente"
   (consistency checks always count toward Y), and X counts only "Uguale
   ovunque" / "Sì, verificato e coerente" answers. Directly beneath this
   tally, always show: "Questo strumento non stima una probabilità di
   citazione da parte di ChatGPT, Perplexity o altri assistenti AI.
   Verifica solo se le tracce di entità verificabili discusse
   nell'articolo esistono già, sono coerenti, o mancano ancora."

OUTPUTS
1. The priority banner (override, "prossimo passo consigliato", or the
   stable-state message) — always visible, always text-based.
2. The "In coda" ordered queue of remaining categories.
3. The plain tally plus its no-score disclaimer, shown together every
   time, never the tally alone.
4. Under every consistency check and category, an always-reachable (not
   hover-only) disclosure — e.g. a native <details> element — showing that
   item's whyItMatters/description text verbatim.

ERROR / EMPTY STATES
- All 9 inputs still at default → show only: "Rispondete ad almeno un
  elemento per vedere un elenco di azioni personalizzato." No banner, no
  tally.
- JavaScript disabled → static HTML still lists all 4 consistency checks
  and 5 categories with their status options and why-it-matters text in a
  readable, unfiltered order (progressive enhancement, not a blank page).
- If a user looks for a numeric AI-visibility score or a ranking against
  competitors, show: "Questo strumento non stima una probabilità di
  citazione da parte di ChatGPT, Perplexity o altri assistenti AI."

DISCLAIMER (shown persistently near the tally, not in a modal)
"Tutte le risposte restano nel vostro browser e non vengono mai inviate
altrove. Nessuna citazione da parte di ChatGPT, Perplexity o altri
assistenti AI è mai garantita da questo strumento, da Weissmann o da
chiunque altro venda servizi GEO. Il risultato è un elenco di priorità
pratiche, non una previsione né una consulenza legale."

PRIVACY
Fully client-side. No network requests, no analytics, no external
fonts/scripts/CDNs, no company name or personal data field anywhere. If
answers are kept in localStorage for convenience, disclose it in one
visible line with a working "Cancella le risposte" button.

CTA
Primary button, visible once at least one item is answered:
  Label: "Parlare con Weissmann dell'entità della propria azienda"
  Link: https://www.weissmann.ai/it/kontakt/
Secondary, lower-emphasis link near the top: "Leggere l'articolo completo
sulle categorie di prove" (link to the article page). Tertiary, contextual
link near the result: "Scoprire il programma GEO Authority di Weissmann"
(link to /it/servizi/generative-engine-optimization/). No countdowns or
fake urgency. CTA wording and destinations never change based on answers.

VISUAL STYLE — match this exactly (Swiss, editorial, calm — a self-audit
worksheet, not a quiz, dashboard or AI-visibility scoring tool):
  Background: #ffffff, secondary panels #f7f7f5.
  Text: #111111 primary, #3d3d3b / #5f5f5f secondary/muted.
  Accent (Swiss red): #c51a2e — use ONLY for the consistency-override
    banner, always paired with text, never a large fill or the only
    signal. The "prossimo passo consigliato" banner and the stable-state
    message use a calm ink tone with their own text label. Do NOT use
    green or a traffic-light system.
  Primary button: solid #111111 background, #ffffff text, hover #2b2b2b.
  Borders: 1px solid #e5e5e2. Corner radius 10px (small elements) / 14px
    (cards). Soft shadow only on the active priority banner:
    0 1px 2px rgba(17,17,17,.05), 0 18px 44px rgba(17,17,17,.10).
  Font: 'Instrument Sans' with a system-sans-serif fallback stack.
  The 4 consistency checks and 5 categories render as genuine bordered
  cards/fieldsets, NOT a dial, gauge, or scorecard visual — this tool has
  no numeric score to display, only a plain "X of Y" text tally.
  Layout: consistency checks first as a compact stacked block, then one
  card per category below; a small sticky bar shows the current priority
  banner while scrolling on narrow widths.

ACCESSIBILITY
Each consistency check and category is a real <fieldset> with a <legend>
and real radio inputs (not styled divs). Full keyboard operability with
visible focus states. The priority banner and tally always shown as text,
never colour-only. aria-live="polite" region for the banner, queue and
tally. 4.5:1 minimum contrast; respect prefers-reduced-motion (results
update instantly, no animated counters). Why-it-matters disclosures use a
native, keyboard-operable <details> element, never a hover-only tooltip.

LANGUAGE
All UI copy in Italian. Do not add German, English or French
translations — this tool exists only in Italian.

Never compute or display a numeric AI-citation-probability score,
percentage, or ranking of any kind.
```
