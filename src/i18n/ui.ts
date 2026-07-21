/**
 * UI string dictionaries for all four locales.
 * Navigation, footer, CTAs, form labels, shared microcopy.
 * Page-level copy lives in the page files; everything reusable lives here.
 */
import type { Locale } from '../data/site';

type Dict = Record<string, string>;

export const UI: Record<Locale, Dict> = {
  de: {
    'nav.solutions': 'KI-Lösungen',
    'nav.services': 'Leistungen',
    'nav.industries': 'Branchen',
    'nav.academy': 'AI Academy',
    'nav.resources': 'Ressourcen',
    'nav.company': 'Unternehmen',
    'nav.learn': 'AI Wissen',
    'nav.tools': 'Tools',
    'nav.cases': 'Referenzen',
    'nav.pricing': 'Preise',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Demo anfordern',
    'nav.menu': 'Menü',

    'footer.tagline':
      'Wir helfen Unternehmen, mehr Kunden zu gewinnen, jede Anfrage zu beantworten, Abläufe zu automatisieren und mit praktischer KI zu wachsen.',
    'footer.contactTitle': 'Kontakt',
    'footer.legalTitle': 'Rechtliches',
    'footer.navTitle': 'Navigation',
    'footer.impressum': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.follow': 'Folgen Sie uns',

    'cta.consultation': 'Beratung buchen',
    'cta.demo': 'Demo anfordern',
    'cta.contact': 'Kontakt aufnehmen',
    'cta.whatsapp': 'Per WhatsApp schreiben',
    'cta.call': 'Anrufen',
    'cta.buy': 'Jetzt abschliessen',
    'cta.learnMore': 'Mehr erfahren',
    'cta.allPricing': 'Alle Preise ansehen',

    'form.name': 'Name',
    'form.email': 'E-Mail-Adresse',
    'form.company': 'Firma',
    'form.phone': 'Telefonnummer',
    'form.service': 'Gewünschte Leistung',
    'form.businessType': 'Art des Unternehmens',
    'form.challenge': 'Ihre grösste Herausforderung',
    'form.website': 'Aktuelle Website (optional)',
    'form.language': 'Bevorzugte Sprache',
    'form.message': 'Nachricht',
    'form.consent':
      'Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert werden. Hinweise in der Datenschutzerklärung.',
    'form.submit': 'Anfrage senden',
    'form.select': 'Bitte wählen',

    'price.month': 'pro Monat',
    'price.once': 'einmalig',
    'price.from': 'ab',
    'price.onRequest': 'Preis auf Anfrage',
    'price.vatNote': 'Preise exkl. MwSt.',

    'consent.title': 'Datenschutz-Einstellungen',
    'consent.text':
      'Wir verwenden Google Analytics, um zu verstehen, wie unsere Website genutzt wird. Die Messung startet erst nach Ihrer Zustimmung.',
    'consent.accept': 'Analyse akzeptieren',
    'consent.decline': 'Nur notwendige',

    'lang.switch': 'Sprache',
    'breadcrumb.home': 'Startseite',
    'meta.suffix': 'Weissmann AI',
    'stub.title': 'Diese Seite erscheint in Kürze',
    'stub.text':
      'Wir bauen unsere Website derzeit in vier Sprachen aus. Diese Sprachversion ist in Vorbereitung – die deutschen und englischen Seiten sind bereits verfügbar.',
    'stub.cta': 'Zur deutschen Version',
  },

  en: {
    'nav.solutions': 'AI Solutions',
    'nav.services': 'Services',
    'nav.industries': 'Industries',
    'nav.academy': 'AI Academy',
    'nav.resources': 'Resources',
    'nav.company': 'Company',
    'nav.learn': 'Learn AI',
    'nav.tools': 'Tools',
    'nav.cases': 'Case Studies',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cta': 'Request a demo',
    'nav.menu': 'Menu',

    'footer.tagline':
      'We help businesses attract customers, answer every enquiry, automate repetitive work and grow through practical artificial intelligence.',
    'footer.contactTitle': 'Contact',
    'footer.legalTitle': 'Legal',
    'footer.navTitle': 'Navigation',
    'footer.impressum': 'Legal notice',
    'footer.privacy': 'Privacy policy',
    'footer.terms': 'Terms & conditions',
    'footer.rights': 'All rights reserved.',
    'footer.follow': 'Follow us',

    'cta.consultation': 'Book a consultation',
    'cta.demo': 'Request a demo',
    'cta.contact': 'Get in touch',
    'cta.whatsapp': 'Message us on WhatsApp',
    'cta.call': 'Call us',
    'cta.buy': 'Subscribe now',
    'cta.learnMore': 'Learn more',
    'cta.allPricing': 'See all pricing',

    'form.name': 'Name',
    'form.email': 'Email address',
    'form.company': 'Company',
    'form.phone': 'Phone number',
    'form.service': 'Service you need',
    'form.businessType': 'Type of business',
    'form.challenge': 'Your main challenge',
    'form.website': 'Current website (optional)',
    'form.language': 'Preferred language',
    'form.message': 'Message',
    'form.consent':
      'I agree that my details may be stored to process my enquiry. See our privacy policy for details.',
    'form.submit': 'Send enquiry',
    'form.select': 'Please select',

    'price.month': 'per month',
    'price.once': 'one-time',
    'price.from': 'from',
    'price.onRequest': 'Price on request',
    'price.vatNote': 'Prices excl. VAT.',

    'consent.title': 'Privacy settings',
    'consent.text':
      'We use Google Analytics to understand how our website is used. Measurement only starts after you consent.',
    'consent.accept': 'Accept analytics',
    'consent.decline': 'Essential only',

    'lang.switch': 'Language',
    'breadcrumb.home': 'Home',
    'meta.suffix': 'Weissmann AI',
    'stub.title': 'This page is coming soon',
    'stub.text':
      'We are currently expanding our website into four languages. This language version is in preparation — the German and English pages are already available.',
    'stub.cta': 'Go to the English version',
  },

  it: {
    'nav.solutions': 'Soluzioni AI',
    'nav.services': 'Servizi',
    'nav.industries': 'Settori',
    'nav.academy': 'AI Academy',
    'nav.resources': 'Risorse',
    'nav.company': 'Azienda',
    'nav.learn': 'Impara l’AI',
    'nav.tools': 'Strumenti',
    'nav.cases': 'Referenze',
    'nav.pricing': 'Prezzi',
    'nav.about': 'Chi siamo',
    'nav.contact': 'Contatto',
    'nav.cta': 'Richiedi una demo',
    'nav.menu': 'Menu',

    'footer.tagline':
      'Aiutiamo le aziende ad attirare clienti, rispondere a ogni richiesta, automatizzare il lavoro ripetitivo e crescere con l’intelligenza artificiale pratica.',
    'footer.contactTitle': 'Contatto',
    'footer.legalTitle': 'Note legali',
    'footer.navTitle': 'Navigazione',
    'footer.impressum': 'Impressum',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Condizioni generali',
    'footer.rights': 'Tutti i diritti riservati.',
    'footer.follow': 'Seguiteci',

    'cta.consultation': 'Prenota una consulenza',
    'cta.demo': 'Richiedi una demo',
    'cta.contact': 'Contattaci',
    'cta.whatsapp': 'Scrivici su WhatsApp',
    'cta.call': 'Chiamaci',
    'cta.buy': 'Abbonati ora',
    'cta.learnMore': 'Scopri di più',
    'cta.allPricing': 'Vedi tutti i prezzi',

    'form.name': 'Nome',
    'form.email': 'Indirizzo e-mail',
    'form.company': 'Azienda',
    'form.phone': 'Numero di telefono',
    'form.service': 'Servizio desiderato',
    'form.businessType': 'Tipo di azienda',
    'form.challenge': 'La vostra sfida principale',
    'form.website': 'Sito web attuale (facoltativo)',
    'form.language': 'Lingua preferita',
    'form.message': 'Messaggio',
    'form.consent':
      'Acconsento alla memorizzazione dei miei dati per l’elaborazione della mia richiesta. Dettagli nell’informativa sulla privacy.',
    'form.submit': 'Invia richiesta',
    'form.select': 'Selezionare',

    'price.month': 'al mese',
    'price.once': 'una tantum',
    'price.from': 'da',
    'price.onRequest': 'Prezzo su richiesta',
    'price.vatNote': 'Prezzi IVA esclusa.',

    'consent.title': 'Impostazioni privacy',
    'consent.text':
      'Utilizziamo Google Analytics per capire come viene usato il nostro sito. La misurazione inizia solo dopo il vostro consenso.',
    'consent.accept': 'Accetta analytics',
    'consent.decline': 'Solo essenziali',

    'lang.switch': 'Lingua',
    'breadcrumb.home': 'Pagina iniziale',
    'meta.suffix': 'Weissmann AI',
    'stub.title': 'Questa pagina sarà presto disponibile',
    'stub.text':
      'Stiamo ampliando il nostro sito in quattro lingue. Questa versione linguistica è in preparazione: le pagine in tedesco e inglese sono già disponibili.',
    'stub.cta': 'Vai alla versione tedesca',
  },

  fr: {
    'nav.solutions': 'Solutions IA',
    'nav.services': 'Services',
    'nav.industries': 'Secteurs',
    'nav.academy': 'AI Academy',
    'nav.resources': 'Ressources',
    'nav.company': 'Entreprise',
    'nav.learn': 'Comprendre l’IA',
    'nav.tools': 'Outils',
    'nav.cases': 'Références',
    'nav.pricing': 'Tarifs',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.cta': 'Demander une démo',
    'nav.menu': 'Menu',

    'footer.tagline':
      'Nous aidons les entreprises à attirer des clients, répondre à chaque demande, automatiser les tâches répétitives et croître grâce à l’intelligence artificielle pratique.',
    'footer.contactTitle': 'Contact',
    'footer.legalTitle': 'Mentions légales',
    'footer.navTitle': 'Navigation',
    'footer.impressum': 'Mentions légales',
    'footer.privacy': 'Protection des données',
    'footer.terms': 'CGV',
    'footer.rights': 'Tous droits réservés.',
    'footer.follow': 'Suivez-nous',

    'cta.consultation': 'Réserver une consultation',
    'cta.demo': 'Demander une démo',
    'cta.contact': 'Nous contacter',
    'cta.whatsapp': 'Écrire sur WhatsApp',
    'cta.call': 'Appeler',
    'cta.buy': 'Souscrire',
    'cta.learnMore': 'En savoir plus',
    'cta.allPricing': 'Voir tous les tarifs',

    'form.name': 'Nom',
    'form.email': 'Adresse e-mail',
    'form.company': 'Entreprise',
    'form.phone': 'Numéro de téléphone',
    'form.service': 'Service souhaité',
    'form.businessType': 'Type d’entreprise',
    'form.challenge': 'Votre principal défi',
    'form.website': 'Site web actuel (facultatif)',
    'form.language': 'Langue préférée',
    'form.message': 'Message',
    'form.consent':
      'J’accepte que mes données soient enregistrées pour le traitement de ma demande. Détails dans la déclaration de confidentialité.',
    'form.submit': 'Envoyer la demande',
    'form.select': 'Veuillez choisir',

    'price.month': 'par mois',
    'price.once': 'paiement unique',
    'price.from': 'dès',
    'price.onRequest': 'Prix sur demande',
    'price.vatNote': 'Prix hors TVA.',

    'consent.title': 'Paramètres de confidentialité',
    'consent.text':
      'Nous utilisons Google Analytics pour comprendre l’utilisation de notre site. La mesure ne démarre qu’après votre consentement.',
    'consent.accept': 'Accepter les analytics',
    'consent.decline': 'Essentiels uniquement',

    'lang.switch': 'Langue',
    'breadcrumb.home': 'Accueil',
    'meta.suffix': 'Weissmann AI',
    'stub.title': 'Cette page arrive bientôt',
    'stub.text':
      'Nous développons actuellement notre site en quatre langues. Cette version linguistique est en préparation — les pages allemandes et anglaises sont déjà disponibles.',
    'stub.cta': 'Voir la version allemande',
  },
};

export function t(locale: Locale, key: string): string {
  const v = UI[locale][key] ?? UI.de[key];
  if (v === undefined) throw new Error(`Missing i18n key: ${key}`);
  return v;
}
