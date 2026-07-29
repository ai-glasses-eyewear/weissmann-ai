# Artifact Brief — Multilingual Transparent Greeting Generator

**Companion article:** `ai-phone-assistant-greeting-transparency` (DE-PHONE-03) — "Muss ein KI-Telefonassistent sagen, dass er eine KI ist? Transparenz in der Schweiz"
**Artifact language (UI chrome):** German (the tool's labels, headings and helper text are German; the *generated greeting output* is available in German, French, Italian and English — see Inputs)
**Status:** brief + data only, not yet built as a live Claude Artifact

## 1. User problem

A Swiss business owner has decided (or is required, or simply thinks it is honest) to tell callers they are talking to an AI phone assistant. They now face a blank page: what do they actually say, in what order, in what tone, and does it change if they run a restaurant versus a medical practice versus a law firm? The article gives four worked examples; this tool lets the reader build the fifth one — their own — without hiring a copywriter.

## 2. Intended audience

Swiss SME owners, practice managers, office managers and marketing generalists across any customer-facing industry — not only Weissmann's own phone-assistant customers. Many users will be evaluating a *different* provider, writing a script for their existing human receptionist, or drafting an answering-machine message. The tool must be equally useful to all of them.

## 3. Why an interactive tool beats a static PDF or a list of 4 examples

The article intentionally shows only four industries. A static list can never cover a hairdresser, a veterinary clinic, a real-estate agency or a driving school — and a PDF with 40 pre-written scripts would still miss the reader's specific tone, language and business name. An interactive generator instead *composes* a script from the same five building blocks the article teaches (Wer / Was / Kann / Fluchtweg / Tempo), recombined per industry, tone and language, so the output is genuinely tailored rather than a lookup table. It also lets the user compare a short version against a longer, clearer version side by side — the article's central trade-off — which is hard to convey usefully on paper.

## 4. Inputs

1. **Firmenname** (free text, optional — placeholder "Ristorante Bellavista" style per industry; if left empty, output uses `[Ihr Firmenname]` as a visible placeholder, never a fabricated name).
2. **Branche** (single select, drives defaults for urgency handling and vocabulary):
   Restaurant/Gastronomie · Arztpraxis/Gesundheit · Handwerksbetrieb/Bau · Beratung/Kanzlei/Treuhand · Hotel/Beherbergung · Detailhandel/Verkauf · Sonstige (generic neutral template).
3. **Sprache der Begrüssung**: Deutsch, Französisch, Italienisch, Englisch (the caller-facing language — independent of the tool's own German UI).
4. **Tonlage**: Locker & schnell · Neutral-professionell · Formell & diskret (industry sets a sensible default; user can override it — the article's point that "the trades line can be informal if the business itself is" only works if tone is a genuine, separate control, not locked to the industry).
5. **Dringlichkeits-Eskalation vorhanden?** (yes/no toggle — if yes, a second free-text field: "Stichwort für Eskalation", default "Notfall"; if the industry is Arztpraxis/Gesundheit, an additional fixed note reminds the user that 144 stays a separate, non-editable emergency instruction, never replaced by the AI).

## 5. Generation logic (deterministic template composition, not a black box)

1. Look up the selected industry's default tone, self-reference term ("digitaler Assistent" / "Anrufassistent" / "digitaler Empfang" etc.) and default capability phrase(s) from `artifact-data.json`.
2. Apply the user's tone override, if any, which swaps the connector phrases and formality register (Sie vs. Du, sentence length) but keeps the same five-slot structure.
3. Assemble the five building blocks in order — Wer → Was (disclosure) → Kann (max. 2 capabilities) → Fluchtweg → (Tempo is a trimming pass, not a slot): business name, disclosure clause, one or two capability clauses, an escape-route clause (using the escalation keyword if enabled), rendered in the selected language from the phrase library.
4. Produce **two outputs side by side**: a *short* version (3 building blocks: Wer + Was + Fluchtweg, capability phrase dropped) and a *complete* version (all 5). This directly demonstrates the article's Restaurant-vs-Arztpraxis trade-off instead of just asserting it.
5. Attach a 2–3 bullet "Warum das funktioniert" rationale under each output, generated from the same block metadata (e.g. "Offenlegung steht im ersten Satz, nicht nach der Anmoderation").
6. Never claim the output is legally sufficient. A fixed, non-generated disclaimer (see §9) always renders beneath the result.

No external API calls, no AI-model call required to run this — it is pure template composition over `artifact-data.json`, which keeps it fast, offline-capable and auditable (the user can see exactly why a sentence was produced).

## 6. Outputs

- Two greeting scripts (short + complete) as plain, copyable text, per the chosen language/industry/tone combination.
- A one-line "Baustein-Check" showing which of the 5 building blocks are present in each version.
- A "Warum das funktioniert" rationale (2–3 bullets) per version.
- A copy-to-clipboard button per version; a "Als Text herunterladen" (.txt) option for both versions together.

## 7. Error / edge states

- No industry selected → generation is disabled; a neutral inline note explains a business type is needed to pick sensible defaults (no silent generic fallback that looks tailored when it isn't).
- Firmenname left empty → output renders with a visibly bracketed `[Ihr Firmenname]` placeholder and a small warning to replace it before use — never invents a business name.
- Dringlichkeits-Eskalation enabled with an empty keyword field → falls back to the default "Notfall" and shows that this default was applied.
- Branche = Arztpraxis/Gesundheit → the 144 emergency line is always shown as a fixed, non-removable sentence beneath the generated script, independent of user input, with a short note that it is not part of the editable greeting itself.

## 8. Privacy considerations

Everything runs client-side; no field (business name, chosen keyword, language, industry) is transmitted, logged, stored or sent to Weissmann AI or any third party. No cookies, no analytics events tied to input values, no account or email required. State an explicit one-line notice in the UI: "Alle Eingaben bleiben in Ihrem Browser." This matters because a business name plus phone-handling details could otherwise look like it's being harvested as a sales lead — it explicitly is not.

## 9. Disclaimer (always visible, not generated text)

"Diese Vorlage ist eine Schreibhilfe, keine Rechtsberatung. Ob und in welcher Form eine Offenlegungspflicht für Ihr Unternehmen gilt, hängt vom Einzelfall ab (siehe Grundlagenartikel zu KI-Transparenz und Kennzeichnung). Bei Unsicherheit empfiehlt sich eine individuelle Abklärung." Rendered directly under every generated result, not only on a separate page.

## 10. Accessibility requirements

- All selects/toggles reachable and operable by keyboard alone, in a logical tab order (Firmenname → Branche → Sprache → Tonlage → Eskalation → Generate/auto-update).
- Every control has a visible `<label>` (not placeholder-only labelling).
- Generated output is written to a live region (`aria-live="polite"`) so screen-reader users hear updates without needing to re-navigate to the result each time an input changes.
- Colour is never the only signal for the short/complete distinction — use text labels ("Kurzversion" / "Vollständige Version"), not colour-coded cards alone.
- Minimum 4.5:1 text contrast; respects OS-level reduced-motion settings (no animated transitions between versions).

## 11. Mobile behaviour

Single-column, stacked layout: inputs first, results below, no horizontal scrolling at any width. Selects use native mobile pickers rather than custom dropdown widgets. The two output cards (short/complete) stack vertically on narrow viewports instead of side-by-side, each with its own copy button reachable by thumb without scrolling past the other card first. Sticky "Kopieren" button stays visible while scrolling a long result on small screens.

## 12. Exact CTA (soft, not pushy, not always Weissmann)

Below both results, a single low-emphasis line, not a button styled as urgent:
"Möchten Sie diese Begrüssung als echten Telefonassistenten einrichten lassen? [Kostenlose Demo mit Ihren eigenen Angaben anfragen →]" linking to the Weissmann phone-assistant service/demo page.
This CTA must remain optional and must not appear inside the generated/copyable text itself — the copied script is the reader's, clean, with no embedded Weissmann branding, usable with any provider or with a human receptionist.

## 13. Visual direction

Match Weissmann.ai's existing "Swiss Editorial" system: white/warm off-white background (`--paper #ffffff` / `--paper-soft #f7f7f5`), black ink typography (`--ink #111111`), thin hairline rules (`--line #e5e5e2`), Swiss red (`--accent #c51a2e`) used only for small labels/active states — never as a full-card background, black CTA buttons (`--btn-bg #111111`), Instrument Sans typeface. No gradients, no glow, no neon, no decorative illustration. The two output cards should look like typed documents (monospace or clean sans in a bordered card), not chat bubbles — this is a script the user will read aloud, not a conversation transcript.

## 14. No private APIs, no fabricated benchmarks

Pure client-side template composition over the accompanying `artifact-data.json`. No LLM call at runtime, no legal-compliance "score," no invented statistic about caller trust or abandonment rates. Any explanatory text ("Warum das funktioniert") must trace back to the article's five-building-block framework, not to invented research.

---

## 15. Self-contained build prompt (paste into Claude to build this as a standalone Artifact)

```
Build a single-file interactive web tool called "Multilingual Transparent Greeting Generator" for Swiss small businesses that use an AI phone assistant.

CONTEXT: Swiss law does not mandate one fixed sentence for disclosing that a caller is speaking with an AI (EU AI Act Article 50 applies only when the business has an EU-facing nexus). Regardless of the legal minimum, businesses need a well-written greeting. This tool helps them write one.

INPUTS (all in German UI labels):
- Firmenname (free text, optional, placeholder text)
- Branche (single select): Restaurant/Gastronomie, Arztpraxis/Gesundheit, Handwerksbetrieb/Bau, Beratung/Kanzlei/Treuhand, Hotel/Beherbergung, Detailhandel/Verkauf, Sonstige
- Sprache der Begrüssung (single select): Deutsch, Französisch, Italienisch, Englisch
- Tonlage (single select, with an industry-based smart default the user can override): Locker & schnell, Neutral-professionell, Formell & diskret
- Dringlichkeits-Eskalation (toggle) + optional keyword field (default "Notfall")

LOGIC: Deterministic template composition (no external API, no AI call at runtime) over five building blocks: WER (business name), WAS (a calm, non-defensive AI-disclosure clause — never "I promise I'm not a robot" style over-assurance), KANN (max. 2 capability clauses), FLUCHTWEG (a concrete route to a human, using the escalation keyword if set), and a TEMPO trimming pass. Compose these per the selected industry (which sets vocabulary formality — e.g. "Grüezi" vs "Guten Tag", Du vs Sie), tone override, and language. If Branche = Arztpraxis/Gesundheit, always append a fixed, non-editable sentence directing genuine emergencies to 144, separate from the AI-disclosure sentence.

OUTPUT: Render TWO versions side by side (stacked on mobile): a "Kurzversion" (Wer + Was + Fluchtweg only) and a "Vollständige Version" (all five blocks), each as plain copyable text with its own copy-to-clipboard button, each followed by 2–3 bullets explaining which building blocks are present and why. Add a persistent, non-generated disclaimer beneath every result: this is a writing aid, not legal advice, and disclosure obligations depend on individual circumstances.

DESIGN: White/warm-off-white background, black ink typography, thin 1px hairline rules, a single restrained red accent color used only for small labels or active states (never as a card background), black buttons with white text, a clean sans-serif font (Instrument Sans if available, otherwise system-ui). Output cards should look like typed documents, not chat bubbles. No gradients, no glow, no decorative illustration, no dark neon theme.

CONSTRAINTS: Do not call any external API or LLM at runtime — pure deterministic string composition from a data object you define in the code. Do not store, transmit, or log any user input anywhere; state "Alle Eingaben bleiben in Ihrem Browser" visibly in the UI. Do not fabricate legal certainty, statistics, or a "compliance score." Include one soft, clearly optional CTA line below the results linking (as placeholder text, not a real tracked link) to "Kostenlose Demo anfragen" — it must not appear inside the copyable generated text itself. Make all controls keyboard-accessible with visible labels, and announce output changes via an aria-live region. Support at least the six industries and four languages listed above with genuinely different generated phrasing per combination — not the same sentence with only the industry name swapped.
```
