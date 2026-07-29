# Artifact Brief — Generatore di messaggi trasparenti in italiano, tedesco e inglese

**Companion article:** `trasparenza-ai-telefono-ticino` (IT-PHONE-03) — "Bisogna dire al cliente che sta parlando con un'AI? Trasparenza e fiducia in Svizzera"
**Artifact language (UI chrome):** Italian (all labels, headings and helper text are Italian; the tool's *reason for existing* is that its **generated output renders in Italian, German and English simultaneously**, side by side, for every single generation — not as a language picker the user chooses between)
**Status:** brief + data only, not yet built as a live Claude Artifact

## 1. User problem

A Ticino business does not serve one linguistic audience. A hotel in Ascona, a fiduciary office in Lugano, an artisan in Bellinzona or a property administrator handling flats owned by people who live in Zug or Geneva all take calls in Italian, Swiss German and English within the same afternoon — often within the same call, when a caller switches language mid-sentence. The companion article argues that the real design question in Ticino is not just *whether* to disclose that an AI is answering, but *in which language, first, and how to keep the disclosure intact when the caller switches*. A business owner who accepts that argument still needs the actual sentences — in three languages, ready to use, not machine-translated word for word (which the article explicitly criticises). This tool produces them.

## 2. Intended audience

Ticino SME owners and office managers in hospitality, professional practices (legal/notarial/fiduciary), trades, and property/condominium administration — the four industries the article covers in depth. Equally useful to a reader who will never buy a Weissmann product: the output is plain text usable with any AI phone provider, a human receptionist's script, or an answering-machine message in three languages.

## 3. Why an interactive tool beats a static list of 4 examples

The article's four worked examples are necessarily single-language (Italian) illustrations of tone and structure. A Ticino business that actually needs the German and English versions of its own greeting would otherwise have to translate them itself — exactly the "word for word translation sounds wrong" trap the article warns against — or pay for three separate pieces of copywriting. This tool is the only artifact in the entire 60-article project that composes a **genuinely independent, natural phrasing in three languages at once** from the same underlying building blocks (business name, disclosure, one or two capabilities, escape route to a human), rather than letting the user pick one output language. That trilingual-simultaneous mechanic is the direct, mechanical answer to the article's central thesis and is not reproduced by any other artifact in the project — including the German companion tool for DE-PHONE-03, which lets the user select a single output language from a menu.

## 4. Inputs

1. **Nome dell'attività** (free text, optional — industry-specific placeholder such as "Hotel Riviera Ascona"; if left empty, all three outputs use a visibly bracketed placeholder in their own language, never a fabricated name).
2. **Settore** (single select, drives defaults for register, vocabulary and whether a fixed "cannot authorise/cannot bind" clause is appended):
   Hotel / alloggio turistico · Studio professionale (legale, notarile, fiduciario) · Artigiano (idraulico, elettricista, falegname…) · Amministrazione immobiliare.
3. **Tonalità**: Cordiale e diretta · Neutra e professionale · Formale e riservata (industry sets a sensible default the user can override — the article's point that a trades business can stay informal only if the business itself is, and that a fiduciary office should not, only works if tone is a genuine separate control).
4. **Escalation per urgenza attiva?** (yes/no toggle). If yes, the fixed default emergency keyword for each language is used automatically ("urgente" / "dringend" / "urgent") — the tool does **not** ask the user to supply and translate a custom keyword, because inventing a plausible German or English translation of an arbitrary Italian word the user types would itself be a fabrication the tool cannot verify. This is a deliberate, disclosed design limitation (see §7).

Note: there is no language-selection input. Generating all three languages on every run is the point of the tool.

## 5. Generation logic (deterministic template composition per language, not machine translation)

1. Look up the selected industry's default tone, self-reference term and one-to-two capability phrases from `artifact-data.json` — **separately authored for each of the three languages**, not derived from one master string. The Italian, German and English phrasing follow the same four-block structure (Chi/Wer/Who → disclosure → capability → escape route) but use each language's own natural word order, register markers (Sie vs. Du-equivalent formality, Lei in Italian) and idiom, exactly as the article insists a good trilingual greeting must.
2. Apply the user's tone override, if any, to all three languages at once (a single tone choice, e.g. "Formale e riservata", changes the Italian, German and English output consistently).
3. For Studio professionale and Amministrazione immobiliare, append the fixed "non-binding / cannot authorise" clause (in all three languages) after the capability sentence.
4. For Artigiano and Amministrazione immobiliare with escalation enabled, append the escape-route sentence with the language's own fixed emergency keyword.
5. Render three output cards side by side (stacked on mobile): **Italiano**, **Deutsch**, **English** — each a complete, natural, standalone greeting, not a translation of the one next to it (even though they express the same content).
6. Never claim legal sufficiency in any language. A fixed, non-generated Italian disclaimer (see §9) always renders beneath the three results.

No external API calls and no AI-model call at runtime — pure template composition over `artifact-data.json`, so the output is fast, offline-capable, and auditable (a developer or a curious user can see exactly which stored phrase produced which sentence, in any of the three languages).

## 6. Outputs

- Three complete greeting scripts (Italiano / Deutsch / English) as plain, copyable text, generated simultaneously from one set of inputs.
- Individual "Copia" (copy-to-clipboard) button per language card.
- One "Scarica tutte e tre come testo" (.txt) option bundling all three versions together, clearly labelled by language.
- A one-line note per card naming which building blocks are present (for the reader who wants to verify nothing was silently dropped in one language and not another).

## 7. Error / edge states

- No settore selected → generation disabled; inline note explains that a business type is needed to choose sensible defaults for register and vocabulary in all three languages at once.
- Nome dell'attività left empty → each of the three cards shows its own bracketed placeholder ("[Nome azienda]" / "[Firmenname]" / "[Business name]") and a small warning to replace it before use in every language — never invents a business name.
- Escalation enabled → the fixed default keyword is used per language (see §4); the UI states explicitly, in Italian, that a custom keyword typed by the user is not auto-translated into German or English, to avoid presenting a fabricated translation as reliable.
- Settore = Studio professionale or Amministrazione immobiliare → the "non-binding / cannot authorise" clause is always shown as a fixed, non-removable sentence in all three cards, with a short note that it is not part of the editable greeting itself.

## 8. Privacy considerations

Everything runs client-side; no field (business name, settore, tone, escalation choice) is transmitted, logged, stored, or sent to Weissmann AI or any third party. No cookies, no analytics tied to input values, no account or email required. An explicit one-line Italian notice in the UI: "Tutti i dati inseriti restano nel suo browser." A business name plus phone-handling preferences could otherwise look like a captured sales lead — it explicitly is not.

## 9. Disclaimer (always visible, not generated text)

"Questo modello è un aiuto alla scrittura, non una consulenza legale. Se e in quale forma valga un obbligo di dichiarazione per la vostra azienda dipende dal singolo caso (si veda l'articolo sulla trasparenza dell'IA). In caso di dubbio è consigliabile una verifica individuale." Rendered directly beneath all three generated results, not only on a separate page.

## 10. Accessibility requirements

- All selects/toggles reachable and operable by keyboard alone, logical tab order (Nome attività → Settore → Tonalità → Escalation → the three result cards).
- Every control has a visible `<label>` (not placeholder-only labelling).
- The three output cards are written to a live region (`aria-live="polite"`) so screen-reader users hear the update once, in card order, without needing to re-navigate after every input change.
- Colour is never the only distinction between the three language cards — each is headed by a visible text label ("Italiano" / "Deutsch" / "English"), not colour-coding alone.
- Minimum 4.5:1 text contrast; respects OS-level reduced-motion settings (no animated transitions when results refresh).

## 11. Mobile behaviour

Single-column, stacked layout: inputs first, then the three result cards stacked vertically in a fixed order (Italiano, Deutsch, English), each with its own copy button reachable by thumb without scrolling past the others. Selects use native mobile pickers. No horizontal scrolling at any width. A sticky mini language-jump ("IT · DE · EN") lets the user skip directly to a card on long screens without scrolling through all three every time.

## 12. Exact CTA (soft, not pushy, not always Weissmann)

Below the three results, a single low-emphasis Italian line, not a button styled as urgent:
"Vuole configurare davvero questo assistente per la sua attività? [Richieda una demo gratuita con i suoi dati →]" linking to the Weissmann phone-assistant service page (`/it/servizi/assistente-telefonico-ai/`).
This CTA must remain optional and must never appear inside the generated/copyable text itself — the copied scripts belong to the reader, clean, with no embedded Weissmann branding, usable with any provider or with a human receptionist in any of the three languages.

## 13. Visual direction

Match Weissmann.ai's existing "Swiss Editorial" system: white/warm off-white background (`--paper #ffffff` / `--paper-soft #f7f7f5`), black ink typography (`--ink #111111`), thin hairline rules (`--line #e5e5e2`), Swiss red (`--accent #c51a2e`) used only for small labels/active states — never as a full-card background, black CTA buttons (`--btn-bg #111111`), Instrument Sans typeface. No gradients, no glow, no neon, no decorative illustration. The three output cards should read like three typed documents laid side by side (or stacked on mobile), each headed by its language name — this is a set of scripts to be read aloud or handed to staff, not a chat transcript.

## 14. No private APIs, no fabricated benchmarks

Pure client-side template composition over the accompanying `artifact-data.json`. No LLM call at runtime, no legal-compliance "score," no invented statistic about multilingual caller behaviour or abandonment rates. Any explanatory building-block note must trace back to the article's own framework (Chi/Cosa/Può fare/Via d'uscita/Lingua), not to invented research.

---

## 15. Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

```
Build a single-file interactive web tool, with an Italian-language user interface, called "Generatore di messaggi trasparenti in italiano, tedesco e inglese" for Ticino (Swiss-Italian) small businesses that use an AI phone assistant.

CONTEXT: Swiss law does not mandate one fixed sentence for disclosing that a caller is speaking with an AI (the EU AI Act Article 50 applies only when the business has an EU-facing nexus). Ticino businesses face an extra practical challenge beyond German-speaking Switzerland: the same business routinely serves Italian-, German- and English-speaking callers, sometimes within the same call. This tool generates a natural greeting script in all three languages at once from one set of inputs — the outputs must NOT be literal word-for-word translations of each other, but independently natural phrasings of the same four-part structure (who / AI disclosure / one-to-two capabilities / route to a human).

INPUTS (Italian UI labels):
- Nome dell'attività (free text, optional, placeholder text)
- Settore (single select): Hotel / alloggio turistico, Studio professionale (legale, notarile, fiduciario), Artigiano (idraulico, elettricista, falegname...), Amministrazione immobiliare
- Tonalità (single select, with an industry-based smart default the user can override): Cordiale e diretta, Neutra e professionale, Formale e riservata
- Escalation per urgenza (toggle) — when enabled, uses a FIXED default emergency keyword per language ("urgente" / "dringend" / "urgent"); do not offer a free-text keyword field that would need to be auto-translated, since an unverified machine translation of an arbitrary word should not be presented as reliable

LOGIC: Deterministic template composition (no external API, no AI call at runtime). For EACH of the three languages independently, compose a greeting from four blocks: WHO (business name), DISCLOSURE (a calm, non-defensive AI-disclosure clause — never "I promise I'm not a robot" style over-assurance), CAPABILITY (max. 2 capability clauses, industry-specific), ESCAPE ROUTE (a concrete route to a human, using the fixed emergency keyword if escalation is enabled). For Studio professionale and Amministrazione immobiliare, always append a fixed, non-editable sentence in all three languages stating the assistant cannot give binding advice or authorise expenses. Compose per the selected industry (which sets vocabulary formality and, in Italian, Lei vs. a warmer register) and the chosen tone. The three language versions must read as if written separately by a fluent native speaker of each language, not as translations of one another, while conveying the same four blocks.

OUTPUT: Render THREE versions side by side (stacked on mobile, in fixed order Italiano / Deutsch / English), each as plain copyable text with its own copy-to-clipboard button, each headed by a clear language label. Add a "Scarica tutte e tre come testo" button for all three combined. Add a persistent, non-generated Italian disclaimer beneath the results: this is a writing aid, not legal advice, and disclosure obligations depend on individual circumstances.

DESIGN: White/warm-off-white background, black ink typography, thin 1px hairline rules, a single restrained red accent colour used only for small labels or active states (never as a card background), black buttons with white text, a clean sans-serif font (Instrument Sans if available, otherwise system-ui). Output cards should look like three typed documents, not chat bubbles. No gradients, no glow, no decorative illustration, no dark neon theme.

CONSTRAINTS: Do not call any external API or LLM at runtime — pure deterministic string composition from a data object you define in the code, with separately authored phrase sets per language (not runtime translation). Do not store, transmit, or log any user input anywhere; state "Tutti i dati inseriti restano nel suo browser" visibly in the UI. Do not fabricate legal certainty, statistics, or a "compliance score." Include one soft, clearly optional CTA line below the results linking (as placeholder text, not a real tracked link) to "Richieda una demo gratuita" — it must not appear inside the copyable generated text itself. Make all controls keyboard-accessible with visible labels, and announce output changes via an aria-live region. Support all four industries listed above with genuinely different generated phrasing per industry AND per language — never the same sentence with only the industry name swapped, and never one language that is visibly just a translation of another.
```
