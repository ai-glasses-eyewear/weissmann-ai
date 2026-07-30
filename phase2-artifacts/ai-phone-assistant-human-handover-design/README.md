# Pilot 27 — Übergabe-Protokoll-Builder: Vom Bot zum Menschen (DE)

Production-ready source for Phase-2 Artifact #27. **PRIVATE — awaiting manual public share.**

| Field | Value |
|---|---|
| Article ID | `ai-phone-assistant-human-handover-design` (ki-telefonassistent-uebergabe-mensch) |
| Language | German (de) |
| Article URL | https://weissmann.ai/ki-academy/agenten-automatisierung/ki-telefonassistent-uebergabe-mensch/ |
| Artifact title | Übergabe-Protokoll-Builder: Vom Bot zum Menschen · Weissmann |
| Interaction type | **Handover-protocol builder — configurator (team availability + fixed/dynamic escalation triggers) that assembles a copyable bot→human context-package protocol** |
| Private Claude URL | https://claude.ai/code/artifact/3d197b82-5c2e-48df-bf83-60bdfdfd5dfb |
| **Public URL** | **NOT YET PUBLIC** — manual owner Share required |
| Publication status | **PRIVATE** ("Share, private") |
| Service CTA | https://weissmann.ai/leistungen/ki-telefonassistent/ |

Every configurator option is drawn verbatim from the article JSON. The five fixed «immer Mensch» triggers (rechtlich/versicherungstechnisch, akute Beschwerden mit Reputationsrisiko, Zahlungsverzug/Inkasso, Presse/Behörden, ausdrücklicher Wunsch — the last locked as 'zuverlässigster Trigger, braucht keine weitere Prüfung') come from Entscheidung eins. The three dynamic-threshold signals (Tonfall, Signalwörter «Beschwerde/Anwalt/kündigen/Notfall», Gesprächsdauer im Kreis) and the 'im Zweifel eher zu früh' cost framing come from Entscheidung zwei. The four context-package fields (Wer+Ein-Satz-Anliegen, bereits versucht, Grund der Übergabe fest/dynamisch, Stimmung neutral/ungeduldig/verärgert) and the warm-vs-cold Herr-Müller example come from Entscheidung drei + Warmer-Transfer section. The team-availability inputs, named-person requirement, second stage, and three fallback options (zweite Person / Combox mit Kontext / Rückrufzusage mit Zeitfenster) come from Entscheidung vier + FAQ. Team-size guidance (solo: 'alles unter 1 Minute geht sofort weiter') from the 'Wann nicht nötig' section. The five pitfalls and the 'halbe Seite' rule-of-thumb are quoted from the respective sections/FAQ. No statistics exist in the article, so none are shown or invented. Pricing.ts was read to confirm the phone-assistant service; no price figure is displayed because the article discusses none and the service link covers pricing.

**Honesty caveats preserved:** Disclaimer (.disc, in German/Swiss ss) states: Orientierungshilfe, kein Angebot und keine Rechtsberatung; the tool only summarizes the article's four decisions into a meeting template; concrete design remains the operator's own homework ('Hausaufgabe des Betriebs'); all inputs stay local in the browser — nothing stored, nothing sent; use placeholders instead of real personal data. The generated protocol uses [Platzhalter] fields for per-call and identity data. The article's own framing is preserved: handover is Design not a Notlösung, no reliable single signal, review triggers regularly, and a broken fallback is worse than none. Footer attribution: 'a companion to the guide. Orientation, not a quote.'

No invented claims, statistics or results; no personal-data collection; nothing stored (in-memory only); no external calls. Theme-aware, responsive, accessible.
