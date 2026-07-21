/**
 * Weissmann AI — long-form content for the dedicated service landing pages.
 *
 * The ServicePage template renders from this structured model + the services.ts
 * registry + pricing.ts. Keeping copy here (not in the template) lets every
 * service be authoritative and unique while the template stays consistent.
 *
 * Guardrails: never invent prices (they come from pricing.ts by id), customers,
 * results, statistics or integrations. Claims are about how the service works,
 * not about unverified outcomes.
 */
import type { Locale } from './site';
import type { LocaleMap } from './routes';

export interface RichSection {
  heading: LocaleMap;
  paragraphs?: LocaleMap[];
  bullets?: LocaleMap[];
}

export interface ServiceContent {
  id: string;
  /** <title> and meta description. */
  title: LocaleMap;
  metaDescription: LocaleMap;
  /** Eyebrow label above the H1. */
  kicker: LocaleMap;
  h1: LocaleMap;
  /** Answer-first 40–60 word definition (the passage AI engines lift + cite). */
  answerFirst: LocaleMap;
  /** "What you get" cards. */
  benefits: Array<{ title: LocaleMap; text: LocaleMap }>;
  /** Problem / solution / how-it-works body. */
  sections: RichSection[];
  faq: Array<{ q: LocaleMap; a: LocaleMap }>;
  /** pricing.ts package ids surfaced on the page (in order). */
  pricingIds: string[];
}

const L = (de: string, en: string, it: string, fr: string): LocaleMap => ({ de, en, it, fr });

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'phone-assistant': {
    id: 'phone-assistant',
    title: L(
      'KI-Telefonassistent für Unternehmen | Weissmann AI',
      'AI Phone Assistant for Business | Weissmann AI',
      'Assistente telefonico AI per aziende | Weissmann AI',
      'Assistant téléphonique IA pour entreprises | Weissmann AI',
    ),
    metaDescription: L(
      'Ein KI-Telefonassistent, der jeden Anruf annimmt, Termine bucht und Fragen beantwortet – rund um die Uhr, mehrsprachig und in der Schweiz gehostet. Individuell für Ihre Branche eingerichtet.',
      'An AI phone assistant that answers every call, books appointments and handles questions – around the clock, multilingual and Swiss-hosted. Configured for your industry.',
      'Un assistente telefonico AI che risponde a ogni chiamata, prenota appuntamenti e gestisce le domande – 24/7, multilingue e ospitato in Svizzera. Configurato per il vostro settore.',
      'Un assistant téléphonique IA qui répond à chaque appel, prend les rendez-vous et gère les questions – 24h/24, multilingue et hébergé en Suisse. Configuré pour votre secteur.',
    ),
    kicker: L('Erreichbarkeit rund um die Uhr', 'Around-the-clock reachability', 'Reperibilità 24/7', 'Joignabilité 24h/24'),
    h1: L(
      'KI-Telefonassistent für Schweizer Unternehmen',
      'AI Phone Assistant for Swiss businesses',
      'Assistente telefonico AI per le imprese svizzere',
      'Assistant téléphonique IA pour les entreprises suisses',
    ),
    answerFirst: L(
      'Ein KI-Telefonassistent ist eine Sprach-KI, die Ihre Anrufe automatisch entgegennimmt: Sie beantwortet häufige Fragen, bucht Termine und leitet Wichtiges an Ihr Team weiter – rund um die Uhr und in mehreren Sprachen. Weissmann AI richtet ihn individuell für Ihre Branche ein, mit dedizierter Telefonleitung und Schweizer Datenschutz.',
      'An AI phone assistant is a voice AI that answers your calls automatically: it handles common questions, books appointments and routes what matters to your team – around the clock and in several languages. Weissmann AI configures it for your industry, with a dedicated phone line and Swiss data protection.',
      'Un assistente telefonico AI è un’intelligenza artificiale vocale che risponde automaticamente alle chiamate: gestisce le domande frequenti, prenota appuntamenti e inoltra ciò che conta al vostro team – 24 ore su 24 e in più lingue. Weissmann AI lo configura per il vostro settore, con linea dedicata e protezione dei dati svizzera.',
      'Un assistant téléphonique IA est une IA vocale qui répond automatiquement à vos appels : elle gère les questions courantes, prend les rendez-vous et transmet l’essentiel à votre équipe – 24h/24 et en plusieurs langues. Weissmann AI le configure pour votre secteur, avec une ligne dédiée et une protection des données suisse.',
    ),
    benefits: [
      {
        title: L('Kein verpasster Anruf', 'No missed calls', 'Nessuna chiamata persa', 'Aucun appel manqué'),
        text: L(
          'Jeder Anruf wird angenommen – auch nach Feierabend, am Wochenende und wenn Ihr Team beschäftigt ist.',
          'Every call is answered – after hours, on weekends and when your team is busy.',
          'Ogni chiamata riceve risposta – anche fuori orario, nel weekend e quando il team è occupato.',
          'Chaque appel obtient une réponse – hors des heures, le week-end et quand votre équipe est occupée.',
        ),
      },
      {
        title: L('Termine automatisch buchen', 'Automatic appointment booking', 'Prenotazione automatica', 'Prise de rendez-vous automatique'),
        text: L(
          'Der Assistent bucht, verschiebt und bestätigt Termine direkt im Gespräch.',
          'The assistant books, reschedules and confirms appointments during the call.',
          'L’assistente prenota, sposta e conferma gli appuntamenti durante la chiamata.',
          'L’assistant réserve, reporte et confirme les rendez-vous pendant l’appel.',
        ),
      },
      {
        title: L('Mehrsprachig', 'Multilingual', 'Multilingue', 'Multilingue'),
        text: L(
          'Deutsch, Englisch, Französisch und Italienisch – ideal für die viersprachige Schweiz.',
          'German, English, French and Italian – ideal for multilingual Switzerland.',
          'Tedesco, inglese, francese e italiano – ideale per la Svizzera plurilingue.',
          'Allemand, anglais, français et italien – idéal pour la Suisse plurilingue.',
        ),
      },
      {
        title: L('Schweizer Datenschutz', 'Swiss data protection', 'Protezione dati svizzera', 'Protection des données suisse'),
        text: L(
          'Aufgesetzt mit Blick auf das revidierte Datenschutzgesetz (revDSG) und transparente Anrufhinweise.',
          'Set up with the revised Swiss Data Protection Act (revDSG) and transparent call disclosures in mind.',
          'Configurato tenendo conto della legge svizzera sulla protezione dei dati (nLPD) e di avvisi di chiamata trasparenti.',
          'Configuré en tenant compte de la loi suisse révisée sur la protection des données (nLPD) et d’avis d’appel transparents.',
        ),
      },
    ],
    sections: [
      {
        heading: L(
          'Was der KI-Telefonassistent für Sie übernimmt',
          'What the AI phone assistant handles for you',
          'Cosa gestisce per voi l’assistente telefonico AI',
          'Ce que l’assistant téléphonique IA gère pour vous',
        ),
        bullets: [
          L('Häufige Fragen zu Öffnungszeiten, Standort, Leistungen und Preisen beantworten',
            'Answer common questions about hours, location, services and pricing',
            'Rispondere alle domande frequenti su orari, sede, servizi e prezzi',
            'Répondre aux questions courantes sur les horaires, le lieu, les services et les prix'),
          L('Termine buchen, verschieben und bestätigen',
            'Book, reschedule and confirm appointments',
            'Prenotare, spostare e confermare appuntamenti',
            'Réserver, reporter et confirmer des rendez-vous'),
          L('Anliegen aufnehmen und strukturiert an Ihr Team weiterleiten',
            'Capture requests and route them to your team in a structured way',
            'Raccogliere le richieste e inoltrarle al team in modo strutturato',
            'Recueillir les demandes et les transmettre à votre équipe de façon structurée'),
          L('Dringende Anrufe erkennen und nach Ihren Regeln eskalieren',
            'Recognise urgent calls and escalate them by your rules',
            'Riconoscere le chiamate urgenti ed effettuare l’escalation secondo le vostre regole',
            'Reconnaître les appels urgents et les escalader selon vos règles'),
        ],
      },
      {
        heading: L('So funktioniert es', 'How it works', 'Come funziona', 'Comment ça marche'),
        paragraphs: [
          L(
            'Der Assistent wandelt Sprache in Text um, versteht das Anliegen mit einem Sprachmodell und antwortet mit einer natürlichen Stimme. Er ist kein starres Menü, sondern führt ein echtes Gespräch – und übergibt an einen Menschen, sobald es sinnvoll ist.',
            'The assistant turns speech into text, understands the request with a language model and replies in a natural voice. It is not a rigid menu but a real conversation – and hands over to a person whenever that makes sense.',
            'L’assistente converte la voce in testo, comprende la richiesta con un modello linguistico e risponde con una voce naturale. Non è un menu rigido ma una vera conversazione – e passa a una persona quando è opportuno.',
            'L’assistant transforme la parole en texte, comprend la demande avec un modèle de langage et répond d’une voix naturelle. Ce n’est pas un menu rigide mais une vraie conversation – et il transmet à une personne dès que c’est pertinent.',
          ),
          L(
            'Die Einrichtung erfolgt individuell – wir konfigurieren Wissen, Gesprächsführung und Weiterleitungsregeln für Ihre Branche, inklusive dedizierter Telefonleitung und Hosting.',
            'Setup is bespoke – we configure knowledge, conversation flow and routing rules for your industry, including a dedicated phone line and hosting.',
            'La configurazione è su misura – impostiamo conoscenze, flusso di conversazione e regole di instradamento per il vostro settore, con linea dedicata e hosting inclusi.',
            'La configuration est sur mesure – nous paramétrons les connaissances, le déroulé de conversation et les règles de routage pour votre secteur, avec ligne dédiée et hébergement inclus.',
          ),
        ],
      },
    ],
    faq: [
      {
        q: L('Was ist ein KI-Telefonassistent?', 'What is an AI phone assistant?', 'Cos’è un assistente telefonico AI?', 'Qu’est-ce qu’un assistant téléphonique IA ?'),
        a: L(
          'Eine Sprach-KI, die Anrufe automatisch entgegennimmt, Fragen beantwortet, Termine bucht und Anliegen an Ihr Team weiterleitet – natürlich im Gespräch statt über ein Tastenmenü.',
          'A voice AI that answers calls automatically, handles questions, books appointments and routes requests to your team – conversationally, not through a keypad menu.',
          'Un’IA vocale che risponde automaticamente alle chiamate, gestisce le domande, prenota appuntamenti e inoltra le richieste al team – in modo conversazionale, non con un menu a tasti.',
          'Une IA vocale qui répond automatiquement aux appels, gère les questions, prend les rendez-vous et transmet les demandes à votre équipe – de façon conversationnelle, sans menu à touches.',
        ),
      },
      {
        q: L('Ersetzt er mein Team?', 'Does it replace my team?', 'Sostituisce il mio team?', 'Remplace-t-il mon équipe ?'),
        a: L(
          'Nein. Er übernimmt wiederkehrende Anrufe und Routineauskünfte, damit Ihr Team Zeit für das Wichtige hat. Komplexe oder heikle Anliegen werden an einen Menschen übergeben.',
          'No. It handles repetitive calls and routine information so your team has time for what matters. Complex or sensitive requests are handed over to a person.',
          'No. Gestisce le chiamate ripetitive e le informazioni di routine, così il team ha tempo per ciò che conta. Le richieste complesse o delicate passano a una persona.',
          'Non. Il gère les appels répétitifs et les informations de routine pour que votre équipe se concentre sur l’essentiel. Les demandes complexes ou sensibles sont transmises à une personne.',
        ),
      },
      {
        q: L('Welche Sprachen werden unterstützt?', 'Which languages are supported?', 'Quali lingue sono supportate?', 'Quelles langues sont prises en charge ?'),
        a: L(
          'Deutsch, Englisch, Französisch und Italienisch. Die inkludierten Sprachen hängen vom gewählten Paket ab.',
          'German, English, French and Italian. The included languages depend on the chosen package.',
          'Tedesco, inglese, francese e italiano. Le lingue incluse dipendono dal pacchetto scelto.',
          'Allemand, anglais, français et italien. Les langues incluses dépendent du forfait choisi.',
        ),
      },
      {
        q: L('Wie steht es um den Datenschutz?', 'What about data protection?', 'Come viene gestita la protezione dei dati?', 'Qu’en est-il de la protection des données ?'),
        a: L(
          'Der Assistent wird mit Blick auf das revidierte Schweizer Datenschutzgesetz (revDSG) aufgesetzt, mit transparentem Hinweis auf die KI im Gespräch. Die konkrete Ausgestaltung stimmen wir mit Ihnen ab.',
          'The assistant is set up with the revised Swiss Data Protection Act (revDSG) in mind, with a transparent disclosure that callers are speaking with an AI. We align the specifics with you.',
          'L’assistente è configurato tenendo conto della legge svizzera riveduta sulla protezione dei dati (nLPD), con un avviso trasparente che si sta parlando con un’IA. I dettagli li definiamo con voi.',
          'L’assistant est configuré en tenant compte de la loi suisse révisée sur la protection des données (nLPD), avec un avis transparent indiquant qu’il s’agit d’une IA. Nous définissons les détails avec vous.',
        ),
      },
      {
        q: L('Was passiert, wenn er eine Frage nicht beantworten kann?', 'What happens if it cannot answer a question?', 'Cosa succede se non sa rispondere?', 'Que se passe-t-il s’il ne peut pas répondre ?'),
        a: L(
          'Er nimmt das Anliegen strukturiert auf und leitet es an die richtige Person weiter oder eskaliert nach Ihren Regeln – niemand bleibt ohne Antwort.',
          'It captures the request in a structured way and routes it to the right person or escalates by your rules – no one is left without a response.',
          'Raccoglie la richiesta in modo strutturato e la inoltra alla persona giusta o effettua l’escalation secondo le vostre regole – nessuno resta senza risposta.',
          'Il recueille la demande de façon structurée et la transmet à la bonne personne ou l’escalade selon vos règles – personne ne reste sans réponse.',
        ),
      },
      {
        q: L('Wie schnell ist er einsatzbereit?', 'How quickly is it ready?', 'Quanto velocemente è operativo?', 'À quelle vitesse est-il opérationnel ?'),
        a: L(
          'Nach einem Setup-Termin richten wir den Assistenten individuell für Ihre Branche ein. Den konkreten Zeitrahmen legen wir im Erstgespräch gemeinsam fest.',
          'After a setup session we configure the assistant specifically for your industry. We agree the concrete timeline together in an initial call.',
          'Dopo una sessione di setup configuriamo l’assistente specificamente per il vostro settore. Il calendario preciso lo definiamo insieme in un primo colloquio.',
          'Après une session de configuration, nous paramétrons l’assistant spécifiquement pour votre secteur. Nous fixons ensemble le calendrier précis lors d’un premier échange.',
        ),
      },
    ],
    pricingIds: ['phone-starter', 'phone-premium', 'phone-enterprise'],
  },
};

export function getServiceContent(id: string): ServiceContent | undefined {
  return SERVICE_CONTENT[id];
}
