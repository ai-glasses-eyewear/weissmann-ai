/**
 * Weissmann Assistant — knowledge base (zero AI cost).
 *
 * A guided-conversation graph. Every price, package name, contract term and
 * disclosure is GENERATED from the central config (src/data/pricing.ts,
 * src/data/site.ts) — never hardcoded here — so the assistant can never drift
 * from the site or invent a number. Hand-authored copy is price-free.
 *
 * The whole KB is serialized into the chat island and consumed by the
 * client-side LocalFaqEngine. When a real LLM engine is added later, it
 * receives this same KB as grounding; the UI stays identical (see SPEC §9).
 */
import { PACKAGES, getPackage, formatPrice, type PricingPackage } from '../data/pricing';
import { SITE, LOCALES, type Locale } from '../data/site';

type L = Record<Locale, string>;

/** One chat bubble is ≤ ~60 words (SPEC §5a). Answers may be several bubbles. */
export interface ChatNode {
  answer: Record<Locale, string[]>;
  chips: { to: string; label: L }[];
  /** Optional inline CTA rendered as a button under the answer. */
  cta?: { kind: 'link' | 'whatsapp' | 'consult'; href?: string; label: L; event?: string };
  /** Service slug for analytics (pricing.ts id or a category), if any. */
  service?: string;
}

export interface ChatKB {
  ui: Record<Locale, Record<string, string>>;
  greetingChips: { to: string; label: L }[];
  nodes: Record<string, ChatNode>;
  /** free-text keyword → node id, per locale (lowercased, accent-folded at runtime). */
  keywords: Record<Locale, Record<string, string>>;
  whatsapp: {
    number: string;
    template: L; // uses [service] and [summary] placeholders
    fallbackService: L; // used when no service selected
  };
}

const interval = (pkg: PricingPackage, l: Locale) =>
  pkg.interval === 'month'
    ? ({ de: 'pro Monat', en: 'per month', it: 'al mese', fr: 'par mois' } as L)[l]
    : ({ de: 'einmalig', en: 'one-time', it: 'una tantum', fr: 'paiement unique' } as L)[l];

const onRequest: L = { de: 'Preis auf Anfrage', en: 'price on request', it: 'prezzo su richiesta', fr: 'prix sur demande' };

/** "Starter CHF 350 pro Monat" — assembled from config, never typed by hand. */
function priceLine(id: string, l: Locale): string {
  const p = getPackage(id);
  const price = p.price === null ? onRequest[l] : `${p.isFrom ? ({ de: 'ab ', en: 'from ', it: 'da ', fr: 'dès ' } as L)[l] : ''}${formatPrice(p.price)} ${interval(p, l)}`;
  return `${p.name[l]}: ${price}`;
}

const vat: L = { de: 'Preise exkl. MwSt.', en: 'Prices excl. VAT.', it: 'Prezzi IVA esclusa.', fr: 'Prix hors TVA.' };

export function buildChatKB(): ChatKB {
  // ── chip label helpers ────────────────────────────────────────────────
  const C = (to: string, de: string, en: string, it: string, fr: string) => ({ to, label: { de, en, it, fr } });
  const human = C('human', 'Mit einem Menschen sprechen', 'Talk to a human', 'Parlare con una persona', 'Parler à une personne');
  const backHome = C('root', 'Zurück zum Start', 'Back to start', 'Torna all’inizio', 'Retour au début');

  const consultCta = (event: string): ChatNode['cta'] => ({
    kind: 'consult',
    label: { de: 'Beratung buchen', en: 'Book a consultation', it: 'Prenota una consulenza', fr: 'Réserver une consultation' },
    event,
  });
  const allPricesCta: ChatNode['cta'] = {
    kind: 'link',
    href: '/preise/',
    label: { de: 'Alle Preise ansehen', en: 'See all pricing', it: 'Vedi tutti i prezzi', fr: 'Voir tous les tarifs' },
    event: 'chat_pricing_view',
  };

  const nodes: Record<string, ChatNode> = {
    // ── greeting handled separately (greetingChips) ──
    root: {
      answer: {
        de: ['Gerne. Wählen Sie ein Thema oder stellen Sie einfach Ihre Frage.'],
        en: ['Of course. Pick a topic or just type your question.'],
        it: ['Certo. Scelga un argomento o scriva la sua domanda.'],
        fr: ['Bien sûr. Choisissez un sujet ou posez votre question.'],
      },
      chips: [],
    },

    // ── Phone agent ───────────────────────────────────────────────────────
    phone: {
      service: 'phone-agent',
      answer: {
        de: ['Der KI-Telefonassistent nimmt jeden Anruf entgegen, bucht Termine und beantwortet Fragen – 24/7, mehrsprachig. Was interessiert Sie?'],
        en: ['The AI phone agent answers every call, books appointments and handles questions — 24/7, multilingual. What would you like to know?'],
        it: ['L’assistente telefonico AI risponde a ogni chiamata, prenota appuntamenti e gestisce le domande — 24/7, multilingue. Cosa le interessa?'],
        fr: ['L’agent téléphonique IA répond à chaque appel, réserve des rendez-vous et traite les questions — 24/7, multilingue. Que voulez-vous savoir ?'],
      },
      chips: [
        C('phone-pricing', 'Preise', 'Pricing', 'Prezzi', 'Tarifs'),
        C('phone-features', 'Funktionen', 'Features', 'Funzioni', 'Fonctions'),
        C('languages', 'Sprachen', 'Languages', 'Lingue', 'Langues'),
        human,
      ],
      cta: { kind: 'link', href: '/ki-telefonassistent/', label: { de: 'Zur Seite', en: 'Open the page', it: 'Vai alla pagina', fr: 'Ouvrir la page' } },
    },
    'phone-pricing': {
      service: 'phone-agent',
      answer: {
        de: [
          `${priceLine('phone-starter', 'de')} · ${priceLine('phone-premium', 'de')} · ${getPackage('phone-enterprise').name.de}: ${onRequest.de}. ${vat.de}`,
          'Wichtig: Starter und Premium laufen als 12-Monatsvertrag, ohne Setup-Gebühr.',
        ],
        en: [
          `${priceLine('phone-starter', 'en')} · ${priceLine('phone-premium', 'en')} · ${getPackage('phone-enterprise').name.en}: ${onRequest.en}. ${vat.en}`,
          'Note: Starter and Premium run as a 12-month contract, with no setup fee.',
        ],
        it: [
          `${priceLine('phone-starter', 'it')} · ${priceLine('phone-premium', 'it')} · ${getPackage('phone-enterprise').name.it}: ${onRequest.it}. ${vat.it}`,
          'Nota: Starter e Premium prevedono un contratto di 12 mesi, senza costi di attivazione.',
        ],
        fr: [
          `${priceLine('phone-starter', 'fr')} · ${priceLine('phone-premium', 'fr')} · ${getPackage('phone-enterprise').name.fr}: ${onRequest.fr}. ${vat.fr}`,
          'À noter : Starter et Premium fonctionnent avec un contrat de 12 mois, sans frais d’installation.',
        ],
      },
      chips: [
        C('phone-minutes', 'Inklusiv-Minuten', 'Included minutes', 'Minuti inclusi', 'Minutes incluses'),
        human,
      ],
      cta: allPricesCta,
    },
    'phone-minutes': {
      service: 'phone-agent',
      answer: {
        de: ['Starter: 1500 Minuten/Monat, danach CHF 0.30/Min. Premium: 3500 Minuten/Monat, danach CHF 0.25/Min.'],
        en: ['Starter: 1,500 minutes/month, then CHF 0.30/min. Premium: 3,500 minutes/month, then CHF 0.25/min.'],
        it: ['Starter: 1500 minuti/mese, poi CHF 0.30/min. Premium: 3500 minuti/mese, poi CHF 0.25/min.'],
        fr: ['Starter : 1500 minutes/mois, puis CHF 0.30/min. Premium : 3500 minutes/mois, puis CHF 0.25/min.'],
      },
      chips: [C('phone', 'Zurück', 'Back', 'Indietro', 'Retour'), human],
    },
    'phone-features': {
      service: 'phone-agent',
      answer: {
        de: ['Terminbuchung in Echtzeit, Weiterleitung an Menschen per Taste 0, Zusammenfassung nach jedem Anruf, natürliche Stimme (auf Wunsch Voice-Cloning). Keine medizinische Beratung, keine Notfälle.'],
        en: ['Real-time appointment booking, human handover via key 0, a summary after every call, natural voice (voice cloning on request). No medical advice, no emergencies.'],
        it: ['Prenotazione in tempo reale, trasferimento a persone con il tasto 0, riepilogo dopo ogni chiamata, voce naturale (voice cloning su richiesta). Nessuna consulenza medica, nessuna emergenza.'],
        fr: ['Réservation en temps réel, transfert humain via la touche 0, résumé après chaque appel, voix naturelle (clonage vocal sur demande). Pas de conseil médical, pas d’urgences.'],
      },
      chips: [C('phone-pricing', 'Preise', 'Pricing', 'Prezzi', 'Tarifs'), human],
    },

    // ── Websites ──────────────────────────────────────────────────────────
    websites: {
      service: 'website',
      answer: {
        de: ['Konversionsstarke Websites mit technischem SEO- und GEO-Fundament. Drei Pakete – vom Einstieg bis zur individuellen Plattform.'],
        en: ['Conversion-focused websites with a technical SEO and GEO foundation. Three packages — from entry level to a custom platform.'],
        it: ['Siti web orientati alla conversione con fondamenta tecniche SEO e GEO. Tre pacchetti — dall’ingresso alla piattaforma su misura.'],
        fr: ['Des sites web axés conversion avec des fondations techniques SEO et GEO. Trois forfaits — de l’entrée de gamme au site sur mesure.'],
      },
      chips: [C('website-pricing', 'Preise', 'Pricing', 'Prezzi', 'Tarifs'), C('website-scope', 'Was ist enthalten?', 'What’s included?', 'Cosa è incluso?', 'Ce qui est inclus'), human],
      cta: { kind: 'link', href: '/leistungen/ai-websites/', label: { de: 'Zur Seite', en: 'Open the page', it: 'Vai alla pagina', fr: 'Ouvrir la page' } },
    },
    'website-pricing': {
      service: 'website',
      answer: {
        de: [`${priceLine('website-starter', 'de')} · ${priceLine('website-business', 'de')} · ${priceLine('website-complex', 'de')}. ${vat.de}`],
        en: [`${priceLine('website-starter', 'en')} · ${priceLine('website-business', 'en')} · ${priceLine('website-complex', 'en')}. ${vat.en}`],
        it: [`${priceLine('website-starter', 'it')} · ${priceLine('website-business', 'it')} · ${priceLine('website-complex', 'it')}. ${vat.it}`],
        fr: [`${priceLine('website-starter', 'fr')} · ${priceLine('website-business', 'fr')} · ${priceLine('website-complex', 'fr')}. ${vat.fr}`],
      },
      chips: [C('website-scope', 'Was ist enthalten?', 'What’s included?', 'Cosa è incluso?', 'Ce qui est inclus'), human],
      cta: allPricesCta,
    },
    'website-scope': {
      service: 'website',
      answer: {
        de: ['Starter: bis zu 5 Seiten, 1 Sprache, 2 Korrekturrunden. Business: ~10–20 Seiten, 3 Runden. Texterstellung, weitere Sprachen und kostenpflichtige Drittanbieter-Tools sind nicht enthalten. Individuelle Projekte per Beratung.'],
        en: ['Starter: up to 5 pages, 1 language, 2 revision rounds. Business: ~10–20 pages, 3 rounds. Copywriting, extra languages and paid third-party tools are not included. Custom projects via consultation.'],
        it: ['Starter: fino a 5 pagine, 1 lingua, 2 revisioni. Business: ~10–20 pagine, 3 revisioni. Copywriting, lingue aggiuntive e strumenti di terzi a pagamento non inclusi. Progetti su misura tramite consulenza.'],
        fr: ['Starter : jusqu’à 5 pages, 1 langue, 2 révisions. Business : ~10–20 pages, 3 révisions. Rédaction, langues supplémentaires et outils tiers payants non inclus. Projets sur mesure via consultation.'],
      },
      chips: [C('website-pricing', 'Preise', 'Pricing', 'Prezzi', 'Tarifs'), human],
      cta: consultCta('chat_consultation_request'),
    },

    // ── SEO & GEO ─────────────────────────────────────────────────────────
    'seo-geo': {
      service: 'seo',
      answer: {
        de: [`SEO für Google, GEO für KI-Antwortmaschinen. ${priceLine('seo-growth', 'de')}, ${priceLine('geo-authority', 'de')}. ${vat.de}`],
        en: [`SEO for Google, GEO for AI answer engines. ${priceLine('seo-growth', 'en')}, ${priceLine('geo-authority', 'en')}. ${vat.en}`],
        it: [`SEO per Google, GEO per i motori di risposta AI. ${priceLine('seo-growth', 'it')}, ${priceLine('geo-authority', 'it')}. ${vat.it}`],
        fr: [`SEO pour Google, GEO pour les moteurs de réponse IA. ${priceLine('seo-growth', 'fr')}, ${priceLine('geo-authority', 'fr')}. ${vat.fr}`],
      },
      chips: [C('seo-honest', 'Garantiert ihr Rankings?', 'Do you guarantee rankings?', 'Garantite i posizionamenti?', 'Garantissez-vous le classement ?'), human],
      cta: allPricesCta,
    },
    'seo-honest': {
      service: 'seo',
      answer: {
        de: ['Nein – seriös kann das niemand garantieren. Wir bauen die technischen, inhaltlichen und Autoritäts-Grundlagen, um um starke Sichtbarkeit zu konkurrieren, und messen die Ergebnisse transparent. GEO unterstützt Sichtbarkeitspotenzial in KI-Antworten, garantiert aber keine Zitierungen.'],
        en: ['No — nobody can honestly guarantee that. We build the technical, content and authority foundations to compete for strong visibility, and measure results transparently. GEO supports visibility potential in AI answers but guarantees no citations.'],
        it: ['No — nessuno può garantirlo seriamente. Costruiamo le fondamenta tecniche, di contenuto e di autorevolezza per competere per una forte visibilità, e misuriamo i risultati in modo trasparente. La GEO supporta il potenziale di visibilità nelle risposte AI ma non garantisce citazioni.'],
        fr: ['Non — personne ne peut le garantir sérieusement. Nous construisons les fondations techniques, éditoriales et d’autorité pour viser une forte visibilité, et mesurons les résultats en toute transparence. Le GEO soutient le potentiel de visibilité dans les réponses IA mais ne garantit aucune citation.'],
      },
      chips: [C('seo-geo', 'Preise', 'Pricing', 'Prezzi', 'Tarifs'), human],
      cta: consultCta('chat_consultation_request'),
    },

    // ── Google Ads ────────────────────────────────────────────────────────
    ads: {
      service: 'ads',
      answer: {
        de: [`${priceLine('ads-growth', 'de')}. ${vat.de} Wichtig: Das Google-Werbebudget ist nicht enthalten und wird direkt von Ihnen bezahlt.`],
        en: [`${priceLine('ads-growth', 'en')}. ${vat.en} Note: the Google ad budget is not included and is paid directly by you.`],
        it: [`${priceLine('ads-growth', 'it')}. ${vat.it} Nota: il budget pubblicitario Google non è incluso e viene pagato direttamente da lei.`],
        fr: [`${priceLine('ads-growth', 'fr')}. ${vat.fr} À noter : le budget publicitaire Google n’est pas inclus et est payé directement par vous.`],
      },
      chips: [human, C('root', 'Andere Themen', 'Other topics', 'Altri argomenti', 'Autres sujets')],
      cta: consultCta('chat_consultation_request'),
    },

    // ── Automation ────────────────────────────────────────────────────────
    automation: {
      service: 'automation',
      answer: {
        de: ['CRM-, E-Mail- und WhatsApp-Workflows übernehmen Follow-ups und Routinearbeit. Der Umfang hängt von Ihren Systemen ab – das besprechen wir am besten persönlich.'],
        en: ['CRM, email and WhatsApp workflows take over follow-ups and routine work. The scope depends on your systems — best discussed personally.'],
        it: ['Workflow CRM, e-mail e WhatsApp gestiscono follow-up e lavoro di routine. Il perimetro dipende dai vostri sistemi — meglio parlarne di persona.'],
        fr: ['Des workflows CRM, e-mail et WhatsApp prennent en charge les relances et le travail routinier. Le périmètre dépend de vos systèmes — à discuter personnellement.'],
      },
      chips: [human, C('root', 'Andere Themen', 'Other topics', 'Altri argomenti', 'Autres sujets')],
      cta: consultCta('chat_consultation_request'),
    },

    // ── Pricing overview ──────────────────────────────────────────────────
    pricing: {
      answer: {
        de: ['Kurzüberblick: KI-Telefonassistent ab CHF 350/Monat, Websites ab CHF 2’490, SEO ab CHF 890/Monat, GEO ab CHF 990/Monat, Google Ads ab CHF 690/Monat. Alle Preise exkl. MwSt.'],
        en: ['Quick overview: AI phone agent from CHF 350/month, websites from CHF 2,490, SEO from CHF 890/month, GEO from CHF 990/month, Google Ads from CHF 690/month. All prices excl. VAT.'],
        it: ['Riepilogo: assistente telefonico AI da CHF 350/mese, siti web da CHF 2’490, SEO da CHF 890/mese, GEO da CHF 990/mese, Google Ads da CHF 690/mese. Tutti i prezzi IVA esclusa.'],
        fr: ['Aperçu : agent téléphonique IA dès CHF 350/mois, sites web dès CHF 2’490, SEO dès CHF 890/mois, GEO dès CHF 990/mois, Google Ads dès CHF 690/mois. Tous les prix hors TVA.'],
      },
      chips: [C('phone-pricing', 'Telefonassistent', 'Phone agent', 'Assistente', 'Agent'), C('website-pricing', 'Websites', 'Websites', 'Siti web', 'Sites web'), C('seo-geo', 'SEO & GEO', 'SEO & GEO', 'SEO & GEO', 'SEO & GEO'), human],
      cta: allPricesCta,
    },

    // ── Process / method ──────────────────────────────────────────────────
    process: {
      answer: {
        de: ['Wir arbeiten nach der Weissmann AI Methode: Entdecken, Analysieren, Planen, Umsetzen, Einführen, Messen, Optimieren. Start ist ein unverbindliches Erstgespräch; danach schlagen wir konkret vor, welcher Baustein zuerst wirkt.'],
        en: ['We work by the Weissmann AI Method: Discover, Analyse, Design, Build, Deploy, Measure, Optimize. It starts with a no-obligation consultation; then we propose concretely which building block creates impact first.'],
        it: ['Lavoriamo con il Metodo Weissmann AI: Scoprire, Analizzare, Progettare, Realizzare, Attivare, Misurare, Ottimizzare. Si parte da un primo colloquio senza impegno; poi proponiamo concretamente quale componente crea impatto per primo.'],
        fr: ['Nous suivons la Méthode Weissmann AI : Découvrir, Analyser, Concevoir, Construire, Déployer, Mesurer, Optimiser. On démarre par un premier entretien sans engagement ; puis nous proposons concrètement quel composant crée de l’impact en premier.'],
      },
      chips: [C('contact', 'Kontakt', 'Contact', 'Contatto', 'Contact'), human],
      cta: consultCta('chat_consultation_request'),
    },

    // ── Languages ─────────────────────────────────────────────────────────
    languages: {
      answer: {
        de: ['Wir arbeiten in Deutsch, Englisch, Französisch und Italienisch – je nach Paket eine oder mehrere Sprachen.'],
        en: ['We work in German, English, French and Italian — one or more languages depending on the package.'],
        it: ['Lavoriamo in tedesco, inglese, francese e italiano — una o più lingue a seconda del pacchetto.'],
        fr: ['Nous travaillons en allemand, anglais, français et italien — une ou plusieurs langues selon le forfait.'],
      },
      chips: [C('phone', 'Telefonassistent', 'Phone agent', 'Assistente', 'Agent'), human],
    },

    // ── Contact ───────────────────────────────────────────────────────────
    contact: {
      answer: {
        de: [`Sie erreichen uns unter ${SITE.phoneDisplay} oder ${SITE.email}. Adresse: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}.`],
        en: [`You can reach us at ${SITE.phoneDisplay} or ${SITE.email}. Address: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}.`],
        it: [`Può contattarci al ${SITE.phoneDisplay} o ${SITE.email}. Indirizzo: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}.`],
        fr: [`Vous pouvez nous joindre au ${SITE.phoneDisplay} ou ${SITE.email}. Adresse : ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}.`],
      },
      chips: [human],
      cta: { kind: 'link', href: '/kontakt/', label: { de: 'Zum Kontaktformular', en: 'Contact form', it: 'Modulo di contatto', fr: 'Formulaire de contact' }, event: 'chat_consultation_request' },
    },

    // ── No answer (honest) ────────────────────────────────────────────────
    'no-answer': {
      answer: {
        de: ['Dazu habe ich keine gesicherte Antwort. Am besten geben Sie die Frage direkt an unser Team weiter.'],
        en: ['I don’t have a reliable answer for that. It’s best to pass the question directly to our team.'],
        it: ['Non ho una risposta sicura. Meglio inoltrare la domanda direttamente al nostro team.'],
        fr: ['Je n’ai pas de réponse fiable à cela. Le mieux est de transmettre la question directement à notre équipe.'],
      },
      chips: [human, C('root', 'Andere Themen', 'Other topics', 'Altri argomenti', 'Autres sujets')],
    },
  };

  // ── UI strings ──────────────────────────────────────────────────────────
  const ui: ChatKB['ui'] = {
    de: {
      launcher: 'Mit Weissmann chatten', title: 'Weissmann Assistant',
      disclosure: 'Basiert auf der Weissmann Wissensdatenbank. Bei komplexen Fragen verbinden wir Sie mit unserem Team.',
      greeting: 'Grüezi! Ich bin der Weissmann Assistant. Womit kann ich Ihnen helfen?',
      inputPlaceholder: 'Ihre Frage …', send: 'Senden', close: 'Schliessen', minimize: 'Minimieren', langLabel: 'Sprache',
      humanTitle: 'Mit einem Menschen auf WhatsApp sprechen?',
      humanIntro: 'Ich bereite eine kurze Nachricht vor – Sie prüfen sie, bevor WhatsApp sich öffnet. Gesendet wird nichts automatisch.',
      approve: 'Auf WhatsApp fortsetzen', edit: 'Anpassen', cancel: 'Weiter im Chat',
      availability: 'Ich kann nicht sagen, wann genau jemand antwortet – das Team meldet sich so schnell wie möglich.',
      foot: 'Weissmann Assistant', restart: 'Neu starten', privacy: 'Datenschutz', summaryLabel: 'Zusammenfassung',
    },
    en: {
      launcher: 'Chat with Weissmann', title: 'Weissmann Assistant',
      disclosure: 'Powered by our Weissmann knowledge base. For complex questions you’ll be connected with our team.',
      greeting: 'Hello! I’m the Weissmann Assistant. How can I help you?',
      inputPlaceholder: 'Your question …', send: 'Send', close: 'Close', minimize: 'Minimize', langLabel: 'Language',
      humanTitle: 'Continue with a human on WhatsApp?',
      humanIntro: 'I’ll draft a short message — you can review it before WhatsApp opens. Nothing is sent automatically.',
      approve: 'Continue on WhatsApp', edit: 'Edit', cancel: 'Stay in chat',
      availability: 'I can’t say exactly when someone will reply — the team will get back to you as soon as possible.',
      foot: 'Weissmann Assistant', restart: 'Start over', privacy: 'Privacy', summaryLabel: 'Summary',
    },
    it: {
      launcher: 'Chatta con Weissmann', title: 'Weissmann Assistant',
      disclosure: 'Basato sulla knowledge base di Weissmann. Per domande complesse la mettiamo in contatto con il nostro team.',
      greeting: 'Salve! Sono il Weissmann Assistant. Come posso aiutarla?',
      inputPlaceholder: 'La sua domanda …', send: 'Invia', close: 'Chiudi', minimize: 'Riduci', langLabel: 'Lingua',
      humanTitle: 'Continuare con una persona su WhatsApp?',
      humanIntro: 'Preparo un breve messaggio — potrà controllarlo prima che WhatsApp si apra. Nulla viene inviato automaticamente.',
      approve: 'Continua su WhatsApp', edit: 'Modifica', cancel: 'Resta in chat',
      availability: 'Non posso dire esattamente quando qualcuno risponderà — il team la ricontatterà il prima possibile.',
      foot: 'Weissmann Assistant', restart: 'Ricomincia', privacy: 'Privacy', summaryLabel: 'Riepilogo',
    },
    fr: {
      launcher: 'Discutez avec Weissmann', title: 'Weissmann Assistant',
      disclosure: 'Basé sur la base de connaissances Weissmann. Pour les questions complexes, nous vous mettons en contact avec notre équipe.',
      greeting: 'Bonjour ! Je suis le Weissmann Assistant. Comment puis-je vous aider ?',
      inputPlaceholder: 'Votre question …', send: 'Envoyer', close: 'Fermer', minimize: 'Réduire', langLabel: 'Langue',
      humanTitle: 'Continuer avec une personne sur WhatsApp ?',
      humanIntro: 'Je prépare un court message — vous pourrez le vérifier avant l’ouverture de WhatsApp. Rien n’est envoyé automatiquement.',
      approve: 'Continuer sur WhatsApp', edit: 'Modifier', cancel: 'Rester dans le chat',
      availability: 'Je ne peux pas dire exactement quand quelqu’un répondra — l’équipe vous répondra dès que possible.',
      foot: 'Weissmann Assistant', restart: 'Recommencer', privacy: 'Protection des données', summaryLabel: 'Résumé',
    },
  };

  const greetingChips = [
    C('phone', 'KI-Telefonassistent', 'AI phone agent', 'Assistente telefonico', 'Agent téléphonique'),
    C('websites', 'Websites', 'Websites', 'Siti web', 'Sites web'),
    C('seo-geo', 'SEO & GEO', 'SEO & GEO', 'SEO & GEO', 'SEO & GEO'),
    C('pricing', 'Preise', 'Pricing', 'Prezzi', 'Tarifs'),
    C('process', 'Ablauf', 'How it works', 'Come funziona', 'Déroulement'),
  ];

  // ── keyword index (lowercased; runtime folds accents) ─────────────────
  const kw = (node: string, ...words: string[]) => words.map((w) => [w, node] as const);
  const flat = <T,>(a: T[][]) => a.reduce((x, y) => x.concat(y), [] as T[]);
  const de = Object.fromEntries(flat([
    kw('phone', 'telefon', 'anruf', 'anrufe', 'telefonassistent', 'assistent', 'rezeption', 'stimme'),
    kw('phone-pricing', 'was kostet der telefon', 'telefon preis'),
    kw('websites', 'website', 'webseite', 'homepage', 'seite'),
    kw('seo-geo', 'seo', 'geo', 'sichtbarkeit', 'google ranking', 'ranking', 'suchmaschine'),
    kw('seo-honest', 'garantier', 'platz 1', 'erste seite', 'nummer 1', 'ganz oben', 'bei google'),
    kw('ads', 'google ads', 'werbung', 'anzeigen', 'kampagne'),
    kw('automation', 'automatisierung', 'workflow', 'crm', 'follow-up'),
    kw('pricing', 'preis', 'preise', 'kosten', 'kostet', 'was kostet', 'tarif'),
    kw('process', 'ablauf', 'methode', 'wie funktioniert', 'prozess', 'start'),
    kw('languages', 'sprache', 'sprachen', 'italienisch', 'englisch', 'franzosisch'),
    kw('contact', 'kontakt', 'telefonnummer', 'adresse', 'email', 'e-mail', 'erreichen'),
    kw('human', 'mensch', 'mitarbeiter', 'beraten', 'beratung', 'whatsapp', 'anrufen'),
  ]));
  const en = Object.fromEntries(flat([
    kw('phone', 'phone', 'call', 'calls', 'receptionist', 'agent', 'voice'),
    kw('websites', 'website', 'websites', 'site', 'web design', 'homepage'),
    kw('seo-geo', 'seo', 'geo', 'visibility', 'ranking', 'rankings', 'search engine'),
    kw('seo-honest', 'guarantee', 'guaranteed', 'first page', 'number one', 'top of google', 'rank 1'),
    kw('ads', 'google ads', 'ads', 'advertising', 'campaign', 'ppc'),
    kw('automation', 'automation', 'automate', 'workflow', 'crm', 'follow-up'),
    kw('pricing', 'price', 'prices', 'pricing', 'cost', 'how much', 'fee'),
    kw('process', 'process', 'method', 'how it works', 'how does it work', 'start', 'begin'),
    kw('languages', 'language', 'languages', 'italian', 'english', 'french', 'german'),
    kw('contact', 'contact', 'phone number', 'address', 'email', 'reach'),
    kw('human', 'human', 'person', 'someone', 'talk to', 'whatsapp', 'call you'),
  ]));
  const it = Object.fromEntries(flat([
    kw('phone', 'telefono', 'chiamata', 'chiamate', 'assistente telefonico', 'voce'),
    kw('websites', 'sito', 'sito web', 'website', 'homepage'),
    kw('seo-geo', 'seo', 'geo', 'visibilita', 'posizionamento', 'ranking', 'motore di ricerca'),
    kw('seo-honest', 'garanti', 'primo posto', 'prima pagina', 'numero 1', 'primi su google'),
    kw('ads', 'google ads', 'pubblicita', 'annunci', 'campagna'),
    kw('automation', 'automazione', 'workflow', 'crm', 'follow-up'),
    kw('pricing', 'prezzo', 'prezzi', 'costo', 'costa', 'quanto costa', 'tariffa'),
    kw('process', 'come funziona', 'metodo', 'processo', 'inizio'),
    kw('languages', 'lingua', 'lingue', 'italiano', 'inglese', 'francese', 'tedesco'),
    kw('contact', 'contatto', 'numero', 'indirizzo', 'email', 'contattare'),
    kw('human', 'persona', 'umano', 'qualcuno', 'parlare con', 'whatsapp', 'chiamare'),
  ]));
  const fr = Object.fromEntries(flat([
    kw('phone', 'telephone', 'appel', 'appels', 'agent telephonique', 'voix', 'standard'),
    kw('websites', 'site', 'site web', 'website', 'page'),
    kw('seo-geo', 'seo', 'geo', 'visibilite', 'classement', 'ranking', 'moteur de recherche'),
    kw('seo-honest', 'garanti', 'premiere page', 'premiere position', 'numero 1', 'premier sur google'),
    kw('ads', 'google ads', 'publicite', 'annonces', 'campagne'),
    kw('automation', 'automatisation', 'workflow', 'crm', 'relance'),
    kw('pricing', 'prix', 'tarif', 'tarifs', 'cout', 'combien', 'coute'),
    kw('process', 'comment ca marche', 'methode', 'processus', 'demarrer'),
    kw('languages', 'langue', 'langues', 'italien', 'anglais', 'francais', 'allemand'),
    kw('contact', 'contact', 'numero', 'adresse', 'email', 'joindre'),
    kw('human', 'humain', 'personne', 'quelqu', 'parler a', 'whatsapp', 'appeler'),
  ]));

  return {
    ui,
    greetingChips,
    nodes,
    keywords: { de, en, it, fr },
    whatsapp: {
      number: '41783459788',
      template: {
        de: 'Hallo Weissmann AI, ich habe gerade mit dem Website-Assistenten gesprochen. Ich interessiere mich für [service]. Meine Frage ist: [summary].',
        en: 'Hello Weissmann AI, I just spoke with the website assistant. I am interested in [service]. My question is: [summary].',
        it: 'Buongiorno Weissmann AI, ho appena parlato con l’assistente del sito web. Mi interessa [service]. La mia domanda è: [summary].',
        fr: 'Bonjour Weissmann AI, je viens de parler avec l’assistant du site web. Je m’intéresse à [service]. Ma question est : [summary].',
      },
      fallbackService: {
        de: 'Ihre Leistungen', en: 'your services', it: 'i vostri servizi', fr: 'vos services',
      },
    },
  };
}
