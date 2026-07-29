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
      {
        heading: L('Ehrliche Grenzen', 'Honest limits', 'Limiti onesti', 'Des limites honnêtes'),
        bullets: [
          L(
            'Der Assistent gibt keine medizinische Beratung, keine Diagnosen und keine Notfall-Triage. Notfälle werden gemäss einem definierten Protokoll an Menschen oder Notfallnummern verwiesen.',
            'The assistant provides no medical advice, no diagnoses and no emergency triage. Emergencies are referred to humans or emergency numbers according to a defined protocol.',
            'L’assistente non fornisce consulenza medica, diagnosi né triage d’emergenza. Le emergenze vengono indirizzate a persone o numeri di emergenza secondo un protocollo definito.',
            'L’assistant ne fournit ni conseil médical, ni diagnostic, ni triage d’urgence. Les urgences sont orientées vers des personnes ou des numéros d’urgence selon un protocole défini.',
          ),
          L(
            'Komplexe Verhandlungen, Beschwerden mit Fingerspitzengefühl und Spezialfälle gehören zu Menschen – der Assistent leitet sie weiter.',
            'Complex negotiations, sensitive complaints and special cases belong with humans – the assistant transfers them.',
            'Trattative complesse, reclami delicati e casi speciali spettano alle persone – l’assistente li trasferisce.',
            'Les négociations complexes, les réclamations sensibles et les cas particuliers relèvent des humains – l’assistant les transfère.',
          ),
          L(
            'Die Einrichtung erfolgt sorgfältig und datenschutzkonform; welche Daten wie verarbeitet werden, legen wir transparent mit Ihnen fest.',
            'Setup is done carefully and in a privacy-compliant way; we define transparently with you which data is processed and how.',
            'La configurazione avviene con cura e nel rispetto della protezione dei dati; definiamo con voi in modo trasparente quali dati vengono trattati e come.',
            'La mise en place est soignée et conforme à la protection des données ; nous définissons avec vous, en toute transparence, quelles données sont traitées et comment.',
          ),
        ],
      },
      {
        heading: L('So läuft die Einrichtung ab', 'How setup works', 'Come funziona l’attivazione', 'Comment se déroule la mise en place'),
        paragraphs: [
          L(
            'Kein IT-Projekt und kein Aufwand für Sie: Wir übernehmen die komplette Einrichtung. In der Regel ist Ihr Assistent in wenigen Tagen live. Bevor Sie sich entscheiden, können Sie unsere Live-KI anrufen oder eine kostenlose Demo mit Ihrer eigenen Wissensbasis anfordern – ohne Setup-Gebühr und mit Live-Test durch Ihr Team vor dem Start.',
            'Not an IT project and no work for you: we handle the entire setup. Your assistant is typically live within a few days. Before you decide, you can call our live AI or request a free demo configured with your own knowledge base – no setup fee, with a live test by your team before go-live.',
            'Non è un progetto IT e non richiede lavoro da parte vostra: ci occupiamo noi dell’intera configurazione. Di norma il vostro assistente è attivo in pochi giorni. Prima di decidere, potete chiamare la nostra AI dal vivo o richiedere una demo gratuita configurata con la vostra base di conoscenza – senza costi di attivazione, con test dal vivo del vostro team prima dell’avvio.',
            'Ce n’est pas un projet informatique et cela ne vous demande aucun travail : nous nous occupons de toute la mise en place. En général, votre assistant est opérationnel en quelques jours. Avant de décider, vous pouvez appeler notre IA en direct ou demander une démo gratuite configurée avec votre propre base de connaissances – sans frais d’installation, avec un test en conditions réelles par votre équipe avant le lancement.',
          ),
        ],
        bullets: [
          L(
            'Kostenlose Demo & Erstgespräch: Wir konfigurieren eine kostenlose Test-Demo mit Ihren Angaben – Öffnungszeiten, Leistungen und wie Anrufe behandelt werden sollen.',
            'Free demo & discovery: we configure a free test demo with your details – opening hours, services and how you want calls handled.',
            'Demo gratuita e primo colloquio: configuriamo una demo di prova gratuita con i vostri dati – orari, servizi e come volete che vengano gestite le chiamate.',
            'Démo gratuite & découverte : nous configurons une démo d’essai gratuite avec vos informations – horaires, prestations et la façon dont vous voulez gérer les appels.',
          ),
          L(
            'Wir bauen & trainieren Ihren Assistenten: auf Ihr Unternehmen und Ihre Sprachen – inklusive Schweizerdeutsch.',
            'We build & train your assistant: on your business and your languages – including Swiss German.',
            'Costruiamo e addestriamo il vostro assistente: sulla vostra azienda e sulle vostre lingue – svizzero tedesco incluso.',
            'Nous construisons et entraînons votre assistant : sur votre entreprise et vos langues – suisse allemand inclus.',
          ),
          L(
            'Live-Test mit Ihrem Team: Sie testen den Assistenten im Live-Betrieb und geben ihn erst frei, wenn alles passt.',
            'Live test with your team: you test the assistant in live operation and only approve it once everything fits.',
            'Test dal vivo con il vostro team: testate l’assistente in condizioni reali e lo approvate solo quando tutto è a posto.',
            'Test en conditions réelles avec votre équipe : vous testez l’assistant et ne le validez qu’une fois tout au point.',
          ),
          L(
            'Live-Schaltung: Der Assistent nimmt jeden Anruf rund um die Uhr an – und nach jedem Gespräch erhalten Sie eine Zusammenfassung.',
            'Go live: the assistant answers every call around the clock – and after each conversation you receive a summary.',
            'Messa in funzione: l’assistente risponde a ogni chiamata 24 ore su 24 – e dopo ogni conversazione ricevete un riepilogo.',
            'Mise en service : l’assistant répond à chaque appel 24h/24 – et après chaque conversation vous recevez un résumé.',
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
      {
        q: L('Merken Anrufende, dass sie mit einer KI sprechen?', 'Do callers notice they are talking to an AI?', 'I chiamanti si accorgono di parlare con un’AI?', 'Les appelants remarquent-ils qu’ils parlent à une IA ?'),
        a: L(
          'Die Stimmen klingen natürlich und ohne Roboterpausen. Viele Anrufende merken es nicht – auf Wunsch weist sich der Assistent aber transparent als digitaler Assistent aus.',
          'The voices sound natural without robotic pauses. Many callers don’t notice — on request, the agent transparently identifies itself as a digital assistant.',
          'Le voci suonano naturali, senza pause robotiche. Molti non se ne accorgono — su richiesta l’assistente si presenta in modo trasparente come assistente digitale.',
          'Les voix sont naturelles, sans pauses robotiques. Beaucoup ne le remarquent pas — sur demande, l’agent s’identifie de façon transparente comme assistant numérique.',
        ),
      },
      {
        q: L('Gibt es eine Mindestvertragslaufzeit und wie kündige ich?', 'Is there a minimum contract term, and how do I cancel?', 'C’è una durata contrattuale minima e come posso disdire?', 'Y a-t-il une durée de contrat minimale et comment résilier ?'),
        a: L(
          'Der Starter (CHF 350/Monat) hat keine Mindestlaufzeit und ist jederzeit monatlich kündbar. Premium (CHF 590/Monat) und Enterprise enthalten die vollständigen Systemintegrationen und haben eine Mindestlaufzeit von 12 Monaten; die Kündigung muss dann mindestens einen Monat vor dem Verlängerungsdatum erfolgen.',
          'Starter (CHF 350/month) has no minimum term and can be cancelled at any time, month to month. Premium (CHF 590/month) and Enterprise include full system integrations and have a 12-month minimum term; cancellation must then reach us at least one month before the renewal date.',
          'Starter (CHF 350/mese) non ha durata minima ed è disdicibile in qualsiasi momento, di mese in mese. Premium (CHF 590/mese) ed Enterprise includono le integrazioni di sistema complete e prevedono una durata minima di 12 mesi; la disdetta deve pervenire almeno un mese prima della data di rinnovo.',
          'Starter (CHF 350/mois) n’a pas de durée minimale et peut être résilié à tout moment, d’un mois à l’autre. Premium (CHF 590/mois) et Enterprise incluent les intégrations système complètes et ont une durée minimale de 12 mois ; la résiliation doit alors nous parvenir au moins un mois avant la date de renouvellement.',
        ),
      },
      {
        q: L('Versteht der Assistent Schweizerdeutsch?', 'Does the assistant understand Swiss German?', 'L’assistente capisce lo svizzero tedesco?', 'L’agent comprend-il le suisse allemand ?'),
        a: L(
          'Ja. Der Assistent versteht Schweizerdeutsch und nimmt Anrufe von Schweizerdeutsch sprechenden Anrufenden entgegen – so fühlt sich Ihre Kundschaft von Anfang an verstanden.',
          'Yes. The assistant understands Swiss German and handles calls from Swiss-German-speaking callers – so your customers feel understood from the very first word.',
          'Sì. L’assistente capisce lo svizzero tedesco e gestisce le chiamate di chi parla svizzero tedesco – così i vostri clienti si sentono capiti fin dalla prima parola.',
          'Oui. L’agent comprend le suisse allemand et prend les appels des personnes qui parlent le suisse allemand – vos clients se sentent ainsi compris dès le premier mot.',
        ),
      },
      {
        q: L('Ist ein KI-Telefonassistent dasselbe wie ein AI-Rezeptionist oder eine virtuelle Telefonistin?', 'Is an AI phone assistant the same as an AI receptionist or a virtual telephonist?', 'Un assistente telefonico AI è la stessa cosa di un receptionist AI o di un centralinista virtuale?', 'Un agent téléphonique IA est-il la même chose qu’un réceptionniste IA ou un standardiste virtuel ?'),
        a: L(
          'Ja. Ein KI-Telefonassistent – auch AI-Rezeptionist, virtuelle Telefonistin oder virtuelle Empfangskraft genannt – nimmt Anrufe entgegen, bucht Termine, qualifiziert Anfragen und leitet bei Bedarf an einen Menschen weiter.',
          'Yes. An AI phone assistant – also called an AI receptionist or virtual telephonist – answers calls, books appointments, qualifies enquiries and hands over to a human when needed.',
          'Sì. Un assistente telefonico AI – chiamato anche receptionist AI o centralinista virtuale – risponde alle chiamate, prenota appuntamenti, qualifica le richieste e passa a una persona quando serve.',
          'Oui. Un agent téléphonique IA – aussi appelé réceptionniste IA ou standardiste virtuel – répond aux appels, réserve des rendez-vous, qualifie les demandes et transfère à un humain si nécessaire.',
        ),
      },
      {
        q: L('Kann ich meine bestehende Telefonnummer behalten?', 'Can I keep my existing phone number?', 'Posso mantenere il mio numero di telefono attuale?', 'Puis-je conserver mon numéro de téléphone actuel ?'),
        a: L(
          'Ja. Sie behalten Ihre bisherige Geschäftsnummer. Jedes Paket enthält eine dedizierte Leitung für den Assistenten – Sie leiten Ihre Anrufe einfach dorthin weiter: immer, nur ausserhalb der Öffnungszeiten oder nur wenn besetzt.',
          'Yes. You keep your current business number. Every package includes a dedicated line for the assistant, and you simply forward your calls to it – always, only outside opening hours, or only when your line is busy.',
          'Sì. Mantenete il vostro numero aziendale attuale. Ogni pacchetto include una linea dedicata per l’assistente e voi inoltrate semplicemente le chiamate a quella linea – sempre, solo fuori orario o solo quando la linea è occupata.',
          'Oui. Vous conservez votre numéro professionnel actuel. Chaque forfait inclut une ligne dédiée pour l’agent, et vous transférez simplement vos appels vers celle-ci – toujours, uniquement en dehors des heures d’ouverture ou seulement lorsque votre ligne est occupée.',
        ),
      },
      {
        q: L('Lässt sich der Assistent mit meinem Kalender und Buchungssystem verbinden?', 'Can the assistant connect to my calendar and booking system?', 'L’assistente può collegarsi al mio calendario e sistema di prenotazione?', 'L’agent peut-il se connecter à mon agenda et à mon système de réservation ?'),
        a: L(
          'In vielen Fällen ja – Termine werden direkt in Ihr bestehendes Buchungssystem eingetragen. Was in Ihrem konkreten Fall technisch möglich ist, prüfen wir ehrlich im kostenlosen Erstgespräch, bevor Sie sich entscheiden.',
          'In many cases, yes – appointments are entered directly into your existing booking system. What is technically possible in your specific case we assess honestly in the free initial call, before you decide.',
          'In molti casi sì – gli appuntamenti vengono inseriti direttamente nel vostro sistema di prenotazione esistente. Cosa è tecnicamente possibile nel vostro caso specifico lo verifichiamo con onestà nel primo colloquio gratuito, prima che decidiate.',
          'Dans de nombreux cas, oui – les rendez-vous sont saisis directement dans votre système de réservation existant. Ce qui est techniquement possible dans votre cas précis, nous l’évaluons honnêtement lors du premier entretien gratuit, avant que vous décidiez.',
        ),
      },
      {
        q: L('Kann ich den Assistenten zuerst einmalig testen, ohne ein Abo abzuschliessen?', 'Can I try the assistant once first, without committing to a subscription?', 'Posso provare l’assistente una prima volta senza sottoscrivere un abbonamento?', 'Puis-je d’abord essayer l’assistant une fois, sans m’engager dans un abonnement ?'),
        a: L(
          'Ja. Der AI Telefonassistent Starter-Test kostet einmalig CHF 350 – kein Abonnement, keine automatische Verlängerung. Danach entscheiden Sie in Ruhe, ob Sie zu einem monatlichen Paket wechseln möchten. Details auf der Preisseite.',
          'Yes. The AI Phone Agent Starter Trial is a one-time CHF 350 – not a subscription, no automatic renewal. Afterwards you decide, without pressure, whether to move to a monthly plan. See the pricing page for details.',
          'Sì. La Prova Starter Assistente Telefonico AI costa una tantum CHF 350 – non è un abbonamento, nessun rinnovo automatico. In seguito deciderete con calma se passare a un pacchetto mensile. Dettagli nella pagina prezzi.',
          'Oui. L’Essai Starter Assistant Téléphonique IA coûte un paiement unique de CHF 350 – ce n’est pas un abonnement, aucun renouvellement automatique. Vous déciderez ensuite, sans pression, de passer ou non à un forfait mensuel. Détails sur la page tarifs.',
        ),
      },
    ],
    pricingIds: ['phone-starter', 'phone-premium', 'phone-enterprise'],
  },
};

// Additional service content authored as JSON data files (one per service).
// The JSON shape matches ServiceContent exactly (LocaleMap = {de,en,it,fr}),
// so new services drop in as data with no code change.
const generated = import.meta.glob<{ default: ServiceContent }>('./service-content/*.json', { eager: true });
for (const mod of Object.values(generated)) {
  const c = mod.default;
  if (c && c.id) SERVICE_CONTENT[c.id] = c;
}

export function getServiceContent(id: string): ServiceContent | undefined {
  return SERVICE_CONTENT[id];
}
