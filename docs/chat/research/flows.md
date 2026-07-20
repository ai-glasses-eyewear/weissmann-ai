# "Chat with Weissmann" â€” Conversation UX Specification

**Mit Weissmann chatten Â· Chat with Weissmann Â· Chatta con Weissmann Â· Discutez avec Weissmann**

Scope: on-site AI assistant for weissmann.ai (Astro/Netlify, DE default + EN/IT/FR). The assistant may only state the verified facts in `src/data/pricing.ts` and `src/data/site.ts`. Everything else is an honest "I don't know" plus a human handover offer.

---

## 1. Conversation flow

```mermaid
flowchart TD
    L["Launcher: 'Mit Weissmann chatten'"] --> G["Greeting + AI disclosure line<br/>+ quick chips: Ask a question / Explore services / Talk to a human"]

    G --> CH{"Visitor's move"}
    CH -->|"Types freely"| AL["Answer loop"]
    CH -->|"Taps 'Explore services'"| Q1
    CH -->|"Taps 'Talk to a human'"| HO["WhatsApp handover flow (Section 2)"]

    subgraph QUAL["Light qualification â€” max 3 questions, every one skippable"]
        Q1["Q1: What kind of business?<br/>chips: Restaurant / Practice / Trades / Shop / Other / Skip"]
        Q2["Q2: Which service interests you?<br/>chips: Phone agent / Website / SEO-GEO / Google Ads / Not sure / Skip"]
        Q3["Q3: Main goal?<br/>chips: Miss fewer calls / New website / More visibility / More leads / Skip"]
        Q1 --> Q2 --> Q3
    end
    Q3 --> AL
    Q1 -.->|"Skip all / types a question"| AL
    Q2 -.->|"Skip"| AL

    subgraph LOOP["Answer loop"]
        AL --> K{"Is the answer a verified fact?"}
        K -->|"Yes"| ANS["Answer from pricing.ts / site.ts wording,<br/>always incl. the package's disclosures<br/>(12-mo contract, exclusions, no guarantees, excl. VAT)"]
        K -->|"No / unverified / out of scope"| IDK["Honest limit: 'I don't know' +<br/>offer WhatsApp, phone, email or consultation"]
        K -->|"Medical / emergency"| MED["Refuse medical advice + no-emergency notice<br/>+ immediate human contact options"]
    end

    ANS --> NEXT{"Suggested next step"}
    NEXT -->|"More questions"| AL
    NEXT -->|"Pricing intent"| CONV["Conversion offer:<br/>phone-starter/premium â†’ Stripe link<br/>all other packages â†’ consultation CTA"]
    NEXT -->|"Wants demo / advice"| CONS["Consultation / demo CTA (contact page)"]
    NEXT -->|"Wants a human"| HO
    IDK --> HO
    MED --> HO

    CONV --> AL
    CONS --> AL
    HO --> END["Conversation continues on WhatsApp<br/>(visitor presses send themselves)"]
```

**Always-available escape hatches** (persistent in the chat header/footer, every state, every language):

| Action | Behaviour |
|---|---|
| Ask directly | Free-text input is never disabled â€” typing anything exits qualification instantly |
| Skip | Every qualification question carries a Skip chip; skipping is never re-asked |
| WhatsApp | Opens the handover flow (Section 2) from any state |
| Book consultation | Links to the contact/consultation page in the current locale |
| Close chat | X in header; state kept for the session so reopening resumes |

**Answer-loop guardrails (hard rules):**

- Prices, minutes, languages, contract terms, revision rounds, exclusions come **verbatim** from `pricing.ts` â€” including the uncomfortable parts (12-month contract, "no ranking guarantees", "ad spend paid separately", "excl. VAT").
- Never invent: discounts, delivery times, business hours, integrations (TheFork etc. are unverified), availability, legal entity/UID, features.
- No ranking or citation guarantees, ever â€” restate the official disclosure instead.
- No medical advice, no emergency support â€” state limits and hand over.
- When unsure â†’ the "I don't know" pattern + human contact. Unsureness is a feature, not a failure state.
- Stripe checkout is offered **only** for `phone-starter` and `phone-premium` (the only verified links); every other package gets the consultation CTA.

---

## 2. WhatsApp human handover â€” detailed flow

**Trigger points:** visitor taps "Talk to a human" / handover button, assistant hits an "I don't know", medical/emergency limit, or visitor asks anything contract-negotiable (discounts, custom terms).

### Steps

1. **Consent ask.** The assistant asks whether the visitor wants to continue with a human on WhatsApp and explains what happens next: a short summary will be drafted and shown for approval before anything is prepared. Nothing happens without a clear yes.

2. **Summary drafting.** The assistant composes a 1â€“2 sentence summary of the visitor's question **only from what the visitor said in this chat**, plus the selected/discussed service (if any). The generator strips anything sensitive: no names, phone numbers, emails, health information, financial details â€” even if the visitor typed them.

3. **Visitor approval.** The summary is shown as an editable preview: *"Here is the message I would prepare â€” you can edit it. OK to use?"* Chips: **Approve** / **Edit** / **Cancel**. The pre-filled message is built **only** from the visitor-approved text.

4. **Message construction.** The wa.me link is built from the approved summary using the locale template:

   | Locale | Template |
   |---|---|
   | DE | `Hallo Weissmann AI, ich habe gerade mit dem Website-Assistenten gesprochen. Ich interessiere mich fÃ¼r [service]. Meine Frage ist: [summary].` |
   | EN | `Hello Weissmann AI, I just spoke with the website assistant. I am interested in [service]. My question is: [summary].` |
   | IT | `Buongiorno Weissmann AI, ho appena parlato con l'assistente del sito web. Mi interessa [service]. La mia domanda Ã¨: [summary].` |
   | FR | `Bonjour Weissmann AI, je viens de parler avec l'assistant du site web. Je m'intÃ©resse Ã  [service]. Ma question est : [summary].` |

   `[service]` = the localized package name from `pricing.ts` (e.g. "KI-Telefonassistent Starter"). If no service was discussed, the sentence "Ich interessiere mich fÃ¼r [â€¦]." is dropped entirely â€” never filled with a guess.

   URL: `https://wa.me/41783459788?text=` + `encodeURIComponent(localizedMessage)` (same number as the existing site-wide `SITE.whatsapp` link; the chat builds its own `?text=` payload instead of the generic prefill).

5. **Outside-the-website notice.** Before the button, the assistant states clearly that tapping it opens WhatsApp and the conversation continues **outside the website, on WhatsApp** â€” and that the message is only a draft the visitor sends themselves.

6. **Availability honesty.** Business hours are not confirmed, so the assistant **never** claims someone is available now or will reply within X minutes. Standard fallback, all locales:

   | Locale | Fallback line |
   |---|---|
   | DE | Ich kann Ihnen nicht sagen, wann genau jemand antwortet. Sie kÃ¶nnen uns trotzdem auf WhatsApp schreiben â€“ das Team meldet sich so schnell wie mÃ¶glich. |
   | EN | I can't tell you exactly when someone will reply. You can still message us on WhatsApp â€” the team will get back to you as soon as possible. |
   | IT | Non posso dirle esattamente quando qualcuno risponderÃ . PuÃ² comunque scriverci su WhatsApp: il team la ricontatterÃ  il prima possibile. |
   | FR | Je ne peux pas vous dire exactement quand quelqu'un rÃ©pondra. Vous pouvez quand mÃªme nous Ã©crire sur WhatsApp â€” l'Ã©quipe vous rÃ©pondra dÃ¨s que possible. |

7. **Analytics.** On tap of the final WhatsApp button (after approval, at the moment the wa.me link opens):

   ```js
   wmEvent('chat_whatsapp_transfer', {
     service: 'phone-starter',   // package id from pricing.ts, or 'none'
     locale: 'de',               // de | en | it | fr
     qualified: true,            // visitor completed â‰¥1 qualification question
     trigger: 'user_request'     // user_request | idk_fallback | limit_medical
   });
   ```

   Sent via the existing `wmEvent()` helper only â€” it already respects Consent Mode v2 (`analytics_storage` denied by default, consent read from `localStorage['wm-consent']`). **No free-text, no summary content, no personal data** ever enters the event payload.

### Non-negotiable handover rules

- **Never auto-send.** The chat only opens WhatsApp with a draft; the visitor presses send in WhatsApp. Also stated in the UI so the visitor knows nothing left their device yet.
- **Never include sensitive data** in the prefill (health, identity, payment, credentials) â€” stripped at drafting, and the visitor's edit is the final word.
- **Never claim immediate human availability** â€” always the Step 6 fallback.
- **Cancel is free.** Cancelling returns to the answer loop without nagging; phone (+41 78 345 97 88) and email (info@weissmann.ai) are offered as alternatives.

---

## 3. Example conversations

### 3a. German â€” phone agent pricing, honest 12-month disclosure

> **Assistent:** GrÃ¼ezi! Ich bin der **KI-Assistent von Weissmann AI**. Antworten kÃ¶nnen unvollstÃ¤ndig sein â€“ wichtige Angaben bestÃ¤tigt Ihnen unser Team gerne persÃ¶nlich per WhatsApp. Wie kann ich helfen?
> `[Frage stellen]` `[Leistungen entdecken]` `[Mit einem Menschen sprechen]`
>
> **Besucher:** Was kostet euer KI-Telefonassistent?
>
> **Assistent:** Gerne â€“ es gibt drei Pakete (alle Preise exkl. MwSt.):
>
> - **Starter â€“ CHF 350 pro Monat:** 1500 Minuten pro Monat, danach CHF 0.30 pro Minute, 1 Sprache inklusive (DE/EN/FR/IT wÃ¤hlbar), dedizierte Telefonleitung inkl. Hosting. Keine Setup-GebÃ¼hr.
> - **Premium â€“ CHF 990 pro Monat:** 3500 Minuten pro Monat, danach CHF 0.25 pro Minute, 2 Sprachen inklusive, Terminverwaltung und automatische Auskunft zu Angeboten. Keine Setup-GebÃ¼hr.
> - **Enterprise â€“ Preis auf Anfrage:** 4 Sprachen, Voice-Cloning, Smart-Routing.
>
> Ehrlicherweise wichtig: **Starter und Premium haben einen 12-Monatsvertrag.** Das sollten Sie vor dem Abschluss wissen.
>
> **Besucher:** Gibt es auch eine kÃ¼rzere Laufzeit oder einen Rabatt?
>
> **Assistent:** Das weiss ich nicht â€“ mir liegen nur die Standardkonditionen mit 12-Monatsvertrag vor, und Rabatte oder Sonderlaufzeiten darf ich nicht zusagen. Das kann Ihnen nur unser Team beantworten. MÃ¶chten Sie die Frage per WhatsApp direkt an einen Menschen stellen?
> `[Auf WhatsApp fortsetzen]` `[Weiter im Chat]`
>
> **Besucher:** Funktioniert der Assistent mit unserem Reservationssystem TheFork?
>
> **Assistent:** Auch das kann ich Ihnen nicht mit Sicherheit sagen â€“ konkrete Integrationen prÃ¼ft das Team individuell fÃ¼r Ihren Fall, und ich mÃ¶chte Ihnen nichts versprechen, was ich nicht belegen kann. Was ich sicher weiss: Premium umfasst die Verwaltung von Terminen und Kundenanfragen. FÃ¼r die TheFork-Frage empfehle ich das direkte GesprÃ¤ch.
>
> **Besucher:** Ok, dann nehme ich erstmal Starter.
>
> **Assistent:** Sehr gerne. Sie kÃ¶nnen den **KI-Telefonassistent Starter (CHF 350/Monat exkl. MwSt., 1500 Minuten, 1 Sprache, keine Setup-GebÃ¼hr, 12-Monatsvertrag)** direkt online abschliessen â€“ oder zuerst eine Beratung buchen, wenn Sie die Integrationsfrage klÃ¤ren mÃ¶chten.
> `[Jetzt abschliessen â€“ Stripe]` `[Beratung buchen]` `[Per WhatsApp schreiben]`

*(Shows: AI disclosure Â· honest 12-month disclosure Â· two "I don't know â†’ human" moments Â· verified Stripe CTA only for Starter.)*

### 3b. English â€” website package comparison â†’ consultation CTA

> **Assistant:** Hi! I'm the **AI assistant from Weissmann AI**. My answers may be incomplete â€” for anything important you can reach our team directly on WhatsApp. What can I help with?
> `[Ask a question]` `[Explore services]` `[Talk to a human]`
>
> **Visitor:** What's the difference between your website packages?
>
> **Assistant:** We have three (one-time prices, excl. VAT):
>
> - **Starter Website â€” CHF 2,490:** up to 5 core pages, responsive design, contact/lead form, technical SEO & GEO foundation, GA4 + Search Console set up, 1 language, 2 defined revision rounds. To be transparent: **copywriting, additional languages and paid third-party tools are not included.**
> - **Business Website â€” CHF 4,990:** approx. 10â€“20 pages per approved scope, premium design, conversion-focused architecture and lead-generation system, multilingual-ready, blog/knowledge section, GA4 conversion tracking, 3 defined revision rounds.
> - **Complex / Custom Website â€” from CHF 9,900:** large multilingual architectures, custom applications, e-commerce, integrations, AI workflows. Final price depends on scope, so this one is consultation-only.
>
> **Visitor:** Which one do I need for a 12-page site in German and English?
>
> **Assistant:** Two languages and ~12 pages points towards the **Business Website** â€” it's multilingual-ready and covers roughly 10â€“20 pages. One honest note: the Starter package includes only 1 language, so it wouldn't fit as-is.
>
> **Visitor:** How fast can you deliver it?
>
> **Assistant:** I don't know â€” I don't have confirmed delivery times, and I'd rather not guess. Timelines depend on scope and are agreed in the consultation. Would you like to book one, or ask the team directly on WhatsApp?
>
> **Visitor:** A consultation sounds good.
>
> **Assistant:** Great â€” the consultation is where the team confirms scope, timeline and a fixed proposal for the Business Website (CHF 4,990 one-time, excl. VAT).
> `[Book a consultation]` `[Message us on WhatsApp]` `[Keep asking questions]`

*(Shows: AI disclosure Â· honest exclusions Â· "I don't know" on delivery time Â· consultation CTA, no Stripe for websites.)*

### 3c. Italian â€” "can you guarantee Google rankings?" â†’ honest no + SEO Growth

> **Assistente:** Buongiorno! Sono l'**assistente AI di Weissmann AI**. Le risposte possono essere incomplete: per le questioni importanti puÃ² contattare direttamente il nostro team su WhatsApp. Come posso aiutarla?
> `[Fai una domanda]` `[Scopri i servizi]` `[Parla con una persona]`
>
> **Visitatore:** Potete garantirmi la prima posizione su Google?
>
> **Assistente:** No, e voglio essere onesto: **non offriamo alcuna garanzia di posizionamento** â€” nessuno puÃ² garantire seriamente una posizione su Google, perchÃ© il ranking dipende dall'algoritmo di Google e dalla concorrenza. Quello che facciamo Ã¨ costruire le basi per una forte visibilitÃ .
>
> Il nostro programma **SEO Growth (CHF 890 al mese, IVA esclusa)** comprende: audit tecnico iniziale e ricerca keyword con mappatura dell'intento di ricerca, ottimizzazione on-page e dei metadati, monitoraggio Search Console, manutenzione SEO tecnica, raccomandazioni per contenuti e SEO locale, e un report mensile con piano d'azione prioritizzato.
>
> Per trasparenza, **non** sono inclusi: redazione di contenuti, lavori di sviluppo e outreach per backlink (le raccomandazioni sÃ¬).
>
> **Visitatore:** E in quanto tempo arriverei in prima pagina?
>
> **Assistente:** Non lo so, e non posso prometterle tempi: dipende dal settore, dalla concorrenza e dal punto di partenza del sito. Chi le promette risultati garantiti in X settimane non Ã¨ sincero. Se vuole una valutazione realistica del suo caso, il team puÃ² darle un parere diretto.
> `[Prenota una consulenza]` `[Scrivici su WhatsApp]`
>
> **Visitatore:** E per essere trovato da ChatGPT?
>
> **Assistente:** Per quello esiste **GEO Authority (CHF 990 al mese, IVA esclusa)**: audit di preparazione per la ricerca AI, ottimizzazione dei contenuti citabili e delle FAQ, llms.txt e report mensile coordinato con la SEO. Anche qui, con onestÃ : la GEO supporta il **potenziale** di visibilitÃ  nei motori di risposta AI, ma **non puÃ² garantire citazioni o inclusione**.
> `[Prenota una consulenza]` `[Scrivici su WhatsApp]`

*(Shows: AI disclosure Â· honest no-guarantee twice (SEO + GEO) Â· honest "non lo so" on timing â†’ human offer.)*

### 3d. French â€” healthcare admin â†’ limits + no-medical-advice + full handover

> **Assistant :** Bonjour ! Je suis l'**assistant IA de Weissmann AI**. Mes rÃ©ponses peuvent Ãªtre incomplÃ¨tes â€” pour toute question importante, vous pouvez joindre notre Ã©quipe directement sur WhatsApp. Comment puis-je vous aider ?
> `[Poser une question]` `[DÃ©couvrir les services]` `[Parler Ã  un humain]`
>
> **Visiteur :** Nous sommes un cabinet mÃ©dical. Votre agent tÃ©lÃ©phonique peut-il gÃ©rer les appels des patients et rÃ©pondre Ã  leurs questions mÃ©dicales ?
>
> **Assistant :** Merci pour votre question â€” je dois Ãªtre prÃ©cis sur ce point.
>
> Ce que l'agent tÃ©lÃ©phonique IA peut faire pour un cabinet : gÃ©rer les rendez-vous et les demandes des clients, donner des informations automatiques sur vos offres et services, avec une ligne tÃ©lÃ©phonique dÃ©diÃ©e (Starter : CHF 350/mois, 1 langue ; Premium : CHF 990/mois, 2 langues ; prix hors TVA, contrat de 12 mois, sans frais d'installation).
>
> Ce qu'il ne fait **pas**, et je prÃ©fÃ¨re le dire clairement : **il ne donne aucun conseil mÃ©dical et ne prend pas en charge les urgences.** Les appels nÃ©cessitant un jugement mÃ©dical doivent toujours Ãªtre dirigÃ©s vers votre personnel ou les services d'urgence â€” c'est une limite ferme.
>
> **Visiteur :** D'accord. Et comment gÃ©rez-vous exactement le renvoi des urgences ? Vous Ãªtes joignables Ã  quelles heures pour en discuter ?
>
> **Assistant :** La configuration exacte du renvoi d'appels est dÃ©finie individuellement avec l'Ã©quipe â€” je ne peux pas vous donner de dÃ©tails fiables ici. Et honnÃªtement, je ne connais pas nos horaires de disponibilitÃ©, je ne veux donc pas vous en inventer. Je ne peux pas vous dire exactement quand quelqu'un rÃ©pondra. Vous pouvez quand mÃªme nous Ã©crire sur WhatsApp â€” l'Ã©quipe vous rÃ©pondra dÃ¨s que possible. Souhaitez-vous que je prÃ©pare le transfert ?
> `[Continuer sur WhatsApp]` `[Non merci]`
>
> **Visiteur :** Oui, prÃ©parez Ã§a.
>
> **Assistant :** Voici le message que je prÃ©parerais â€” vous pouvez le modifier avant de continuer :
>
> > *Bonjour Weissmann AI, je viens de parler avec l'assistant du site web. Je m'intÃ©resse Ã  l'Agent tÃ©lÃ©phonique IA Premium. Ma question est : configuration d'un agent tÃ©lÃ©phonique pour un cabinet mÃ©dical â€” gestion des rendez-vous et renvoi correct des appels urgents vers le personnel.*
>
> Aucune donnÃ©e personnelle ou mÃ©dicale n'y figure. Est-ce que cela vous convient ?
> `[Approuver]` `[Modifier]` `[Annuler]`
>
> **Visiteur :** `[Approuver]`
>
> **Assistant :** Parfait. En appuyant sur le bouton, WhatsApp s'ouvre avec ce message prÃ©-rempli â€” **rien n'est envoyÃ© automatiquement**, c'est vous qui appuyez sur Â« envoyer Â». La conversation se poursuivra ensuite **en dehors de ce site web, sur WhatsApp**.
> `[Ouvrir WhatsApp]` *(â†’ wa.me/41783459788?text=â€¦ Â· dÃ©clenche `wmEvent('chat_whatsapp_transfer', { service: 'phone-premium', locale: 'fr', qualified: false, trigger: 'limit_medical' })`)*

*(Shows: AI disclosure Â· no-medical-advice + no-emergency limit Â· unconfirmed-hours honesty with the standard fallback Â· full consent â†’ summary approval â†’ no-auto-send handover.)*

---

## 4. Microcopy pack

### Launcher label
| | |
|---|---|
| DE | Mit Weissmann chatten |
| EN | Chat with Weissmann |
| IT | Chatta con Weissmann |
| FR | Discutez avec Weissmann |

### Disclosure line (pinned under the first message, always visible in the header on scroll)
| | |
|---|---|
| DE | KI-Assistent von Weissmann AI. Antworten kÃ¶nnen unvollstÃ¤ndig sein â€“ wichtige Angaben bestÃ¤tigt Ihnen unser Team persÃ¶nlich per WhatsApp oder E-Mail. |
| EN | AI assistant from Weissmann AI. Answers may be incomplete â€” our team will confirm anything important personally via WhatsApp or email. |
| IT | Assistente AI di Weissmann AI. Le risposte possono essere incomplete: il nostro team conferma personalmente ogni informazione importante via WhatsApp o e-mail. |
| FR | Assistant IA de Weissmann AI. Les rÃ©ponses peuvent Ãªtre incomplÃ¨tes â€” notre Ã©quipe confirme personnellement toute information importante par WhatsApp ou e-mail. |

### Consent line (before WhatsApp handover)
| | |
|---|---|
| DE | MÃ¶chten Sie das GesprÃ¤ch mit einem Menschen auf WhatsApp fortsetzen? Ich erstelle dazu eine kurze Zusammenfassung, die Sie vor dem Ã–ffnen von WhatsApp prÃ¼fen und anpassen kÃ¶nnen. Gesendet wird nichts automatisch. |
| EN | Would you like to continue with a human on WhatsApp? I'll draft a short summary that you can review and edit before WhatsApp opens. Nothing is sent automatically. |
| IT | Vuole continuare la conversazione con una persona su WhatsApp? Preparo un breve riepilogo che potrÃ  controllare e modificare prima dell'apertura di WhatsApp. Nulla viene inviato automaticamente. |
| FR | Souhaitez-vous poursuivre avec un humain sur WhatsApp ? Je prÃ©pare un court rÃ©sumÃ© que vous pourrez vÃ©rifier et modifier avant l'ouverture de WhatsApp. Rien n'est envoyÃ© automatiquement. |

### Handover button
| | |
|---|---|
| DE | Auf WhatsApp fortsetzen |
| EN | Continue on WhatsApp |
| IT | Continua su WhatsApp |
| FR | Continuer sur WhatsApp |

### Error message (answer failed / backend error)
| | |
|---|---|
| DE | Entschuldigung, da ist etwas schiefgelaufen. Bitte versuchen Sie es noch einmal â€“ oder erreichen Sie uns direkt per WhatsApp, unter +41 78 345 97 88 oder info@weissmann.ai. |
| EN | Sorry, something went wrong. Please try again â€” or reach us directly on WhatsApp, at +41 78 345 97 88 or info@weissmann.ai. |
| IT | Ci scusiamo, qualcosa Ã¨ andato storto. Riprovi, per favore â€” oppure ci contatti direttamente su WhatsApp, al +41 78 345 97 88 o a info@weissmann.ai. |
| FR | DÃ©solÃ©, une erreur s'est produite. Veuillez rÃ©essayer â€” ou contactez-nous directement sur WhatsApp, au +41 78 345 97 88 ou Ã  info@weissmann.ai. |

### Offline message (assistant unavailable â€” no business-hours claim, ever)
| | |
|---|---|
| DE | Der Assistent ist gerade nicht verfÃ¼gbar. Sie kÃ¶nnen uns trotzdem auf WhatsApp schreiben, uns unter +41 78 345 97 88 anrufen oder an info@weissmann.ai schreiben â€“ das Team meldet sich so schnell wie mÃ¶glich. |
| EN | The assistant is currently unavailable. You can still message us on WhatsApp, call +41 78 345 97 88 or write to info@weissmann.ai â€” the team will get back to you as soon as possible. |
| IT | L'assistente non Ã¨ al momento disponibile. PuÃ² comunque scriverci su WhatsApp, chiamarci al +41 78 345 97 88 o scrivere a info@weissmann.ai: il team la ricontatterÃ  il prima possibile. |
| FR | L'assistant est momentanÃ©ment indisponible. Vous pouvez quand mÃªme nous Ã©crire sur WhatsApp, nous appeler au +41 78 345 97 88 ou Ã©crire Ã  info@weissmann.ai â€” l'Ã©quipe vous rÃ©pondra dÃ¨s que possible. |

**Style notes:** Swiss German orthography throughout (ss, never ÃŸ); formal address in all four languages (Sie / Lei / vous); package names, prices and disclosures must render from `pricing.ts` at build time â€” never hardcoded in chat copy â€” so the chat can never drift from the site (same single-source rule that governs the pricing pages).
