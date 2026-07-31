/**
 * Weissmann AI — Interactive Tools registry (first-party, single-language).
 *
 * Each entry is a genuinely useful interactive tool (calculator, planner,
 * matcher, checker) that lives on-site under the Resources pillar. Unlike the
 * 4-language `resources.ts` products, each tool exists in ONE language (it is a
 * companion to a specific single-language Academy article) — so it emits only
 * that locale's route + hreflang, exactly like locale-restricted articles.
 *
 * The interactive widget itself is a self-contained document served from
 * /public/tools-embed/<id>.html and embedded in an isolated same-origin frame
 * (perfect CSS/JS isolation, auto-resized). The page around it carries the real
 * indexable SEO content (intro, "how it works", FAQ) + internal links to the
 * source article and the related commercial service.
 *
 * Grounding rule (same as the artifacts): every claim/number here must trace to
 * the source article or pricing.ts. No invented statistics.
 */
import type { Locale } from './site';
import { underPillar, type LocaleMap, type LocalePaths } from './routes';

export interface ToolFaq { q: string; a: string }
export interface ToolDef {
  id: string;            // matches the phase-2 artifact id + the embed filename
  lang: Locale;          // the single language this tool exists in
  slug: string;          // leaf slug under the Resources pillar (localized segment added by underPillar)
  order: number;
  status: 'live' | 'draft';
  /** Root-relative path + label of the related commercial service (internal link). */
  service: { path: string; name: string };
  /** Root-relative path + title of the source Academy article (internal link). */
  article: { path: string; title: string };
  /** Fallback iframe height (px) before the auto-resize handshake lands. */
  embedH: number;
  meta: { title: string; description: string };
  h1: string;
  kicker: string;
  intro: string;
  about: string[];       // 2–3 paragraphs of unique, indexable copy
  how: string[];         // short "how to use it" steps
  faq: ToolFaq[];
}

const sameSlug = (s: string): LocaleMap => ({ de: s, en: s, it: s, fr: s });

export const TOOLS: ToolDef[] = [
  // ───────────────────────────── DE · Web / Kosten ─────────────────────────────
  {
    id: 'website-kosten-schweiz', lang: 'de', slug: 'website-kosten-rechner', order: 1, status: 'live',
    service: { path: '/leistungen/ki-webentwicklung/', name: 'KI-Webentwicklung' },
    article: { path: '/ki-academy/marketing-seo-geo/website-kosten-schweiz/', title: 'Website-Kosten in der Schweiz: der ehrliche Leitfaden' },
    embedH: 1500,
    meta: { title: 'Website-Kosten-Rechner Schweiz: Bausteine statt Pauschale · Weissmann', description: 'Kostenloser Rechner: Wählen Sie die Bausteine Ihres Website-Projekts und sehen Sie transparente CHF-Orientierungsbänder – ohne erfundene Pauschalzahl.' },
    h1: 'Website-Kosten-Rechner: aus Bausteinen statt aus einer Pauschale',
    kicker: 'Kostenloses Tool',
    intro: 'Eine ehrliche Website-Offerte hat keinen Pauschalpreis – sie hat Bausteine. Wählen Sie unten die Teile, die Ihr Projekt wirklich braucht, und Sie sehen transparente CHF-Orientierungsbänder statt einer Zahl, die auf der Rechnung plötzlich anders aussieht.',
    about: [
      'Die meisten «Was kostet eine Website»-Antworten sind entweder eine Wunschzahl oder ein Reizpreis, der später wächst. Dieser Rechner zerlegt den Preis stattdessen in die Komponenten, die den Aufwand tatsächlich bestimmen: Seitenzahl, Sprachen, Design-Tiefe, Texterstellung, Funktionen und die laufenden Kosten. So sehen Sie, welcher Baustein Ihr Budget bewegt – und welcher weggelassen werden kann.',
      'Die Bänder sind Orientierung, kein Angebot. Sie stützen sich auf die drei realen Weissmann-Pakete (Starter ab CHF 880 als Aktionspreis, regulär CHF 2’490; Business; individuell) und auf die im Artikel beschriebenen Kostentreiber. Nichts wird erfunden – das Tool speichert und sendet keine Ihrer Eingaben.',
    ],
    how: [
      'Haken Sie die Bausteine ab, die Ihr Projekt enthält.',
      'Lesen Sie die CHF-Orientierungsbänder je Baustein.',
      'Nutzen Sie das Ergebnis als Vergleichsbasis für Offerten – nicht als Festpreis.',
    ],
    faq: [
      { q: 'Ist das Ergebnis ein verbindliches Angebot?', a: 'Nein. Es sind transparente Orientierungsbänder, die zeigen, welche Bausteine den Preis treiben. Ein verbindliches Angebot entsteht erst nach einem kurzen Gespräch über Ihr konkretes Projekt.' },
      { q: 'Woher stammen die Zahlen?', a: 'Aus den öffentlich einsehbaren Weissmann-Paketpreisen und den Kostentreibern, die der zugehörige Leitfaden beschreibt. Es werden keine erfundenen Durchschnitte verwendet.' },
    ],
  },
  {
    id: 'website-versteckte-kosten-drei-jahre', lang: 'de', slug: 'website-kosten-3-jahre-rechner', order: 2, status: 'live',
    service: { path: '/leistungen/ki-webentwicklung/', name: 'KI-Webentwicklung' },
    article: { path: '/ki-academy/marketing-seo-geo/website-versteckte-kosten-drei-jahre/', title: 'Die versteckten Website-Kosten über drei Jahre' },
    embedH: 1500,
    meta: { title: 'Drei-Jahres-Kostenrechner für Websites · Weissmann', description: 'Der Angebotspreis ist nur die erste Zeile. Rechnen Sie Hosting, Wartung, Lizenzen und Änderungen über drei Jahre zusammen – mit Ihren eigenen Zahlen.' },
    h1: 'Drei-Jahres-Kostenrechner: was eine Website wirklich kostet',
    kicker: 'Kostenloses Tool',
    intro: 'Der Angebotspreis ist die erste Zeile einer dreijährigen Rechnung. Tragen Sie Ihre eigenen Zahlen für Hosting, Wartung, Lizenzen und Änderungen ein – der Rechner zeigt die Gesamtkosten, die selten in der ursprünglichen Offerte stehen.',
    about: [
      'Zwei Offerten mit demselben Startpreis können über drei Jahre hunderte oder tausende Franken auseinanderliegen – je nach Hosting-Modell, Wartungsvertrag, Plugin-Lizenzen und dem Preis pro Änderung. Dieser Rechner macht diese zweite, unsichtbare Rechnung sichtbar, bevor Sie unterschreiben.',
      'Sie geben Ihre eigenen Beträge ein; das Tool erfindet keine Zahlen und speichert nichts. Das Ergebnis ist eine Total-Cost-of-Ownership-Schätzung über drei Jahre, die Sie direkt gegen jede Offerte halten können.',
    ],
    how: [
      'Tragen Sie Ihre erwarteten Beträge für die laufenden Positionen ein.',
      'Der Rechner summiert sie über drei Jahre und zeigt den Anteil jenseits des Angebotspreises.',
      'Vergleichen Sie zwei Offerten auf derselben Drei-Jahres-Basis.',
    ],
    faq: [
      { q: 'Warum drei Jahre?', a: 'Weil sich versteckte Kosten – Wartung, Lizenzen, Änderungen – erst über die Laufzeit zeigen. Ein niedriger Startpreis mit teurer Pflege kann über drei Jahre teurer sein als ein höherer Startpreis mit fairer Wartung.' },
      { q: 'Werden meine Zahlen gespeichert?', a: 'Nein. Die Berechnung läuft vollständig in Ihrem Browser; nichts wird gesendet oder gespeichert.' },
    ],
  },
  {
    id: 'chf-880-website-schweiz', lang: 'de', slug: 'starter-website-eignungscheck', order: 3, status: 'live',
    service: { path: '/leistungen/ki-webentwicklung/', name: 'KI-Webentwicklung' },
    article: { path: '/ki-academy/marketing-seo-geo/guenstige-website-schweiz-chf-880/', title: 'Günstige Website in der Schweiz: was CHF 880 wirklich abdeckt' },
    embedH: 1400,
    meta: { title: 'Passt Ihr Projekt in den Starter (CHF 880)? Eignungscheck · Weissmann', description: 'Eine kurze Anforderungs-Checkliste ordnet Ihr Website-Projekt ein: Starter (CHF 880/2’490), Business oder individuell – mit dem exakten Starter-Umfang.' },
    h1: 'Passt Ihr Projekt in den Starter? Der Eignungscheck',
    kicker: 'Kostenloses Tool',
    intro: 'Die Starter Website zu CHF 880 (regulär CHF 2’490) ist kein Reizpreis mit Sternchen – aber sie hat einen klar umrissenen Umfang. Beantworten Sie ein paar Fragen und der Check ordnet Ihr Projekt ehrlich ein: Starter, Business oder individuell.',
    about: [
      'Ein günstiger Festpreis ist nur dann fair, wenn klar ist, was er abdeckt – und was nicht. Dieser Eignungscheck prüft Ihr Vorhaben gegen den tatsächlichen Starter-Umfang (bis 5 Hauptseiten, eine Sprache, technische SEO- und GEO-Grundlage, GA4 und Search Console, Basis-Structured-Data, Performance, Sicherheits-Header, Netlify-Hosting; ohne Texterstellung, Zusatzsprachen und kostenpflichtige Drittanbieter-Tools).',
      'Braucht Ihr Projekt E-Commerce, integrierte Buchung, mehrere strukturierte Sprachen oder viele eigene Service-Seiten, sagt Ihnen der Check das klar – und verweist auf das passende Paket, statt einen Festpreis zu überdehnen. Alle Angaben stammen aus der Weissmann-Preisliste; nichts wird erfunden oder gespeichert.',
    ],
    how: [
      'Haken Sie ab, was Ihr Projekt braucht.',
      'Der Check ordnet Sie einem Paket zu und zeigt den Starter-Umfang.',
      'Bei «grösseren» Anforderungen sehen Sie sofort, welches Paket passt.',
    ],
    faq: [
      { q: 'Ist CHF 880 ein Lockangebot?', a: 'Nein. Es ist ein Aktionspreis (regulär CHF 2’490) für einen exakt definierten Umfang. Der Check zeigt genau diesen Umfang, damit es keine Überraschungen gibt.' },
      { q: 'Was, wenn mein Projekt grösser ist?', a: 'Dann ist der Starter nicht die richtige Kategorie – der Check sagt es Ihnen und nennt das passende Paket (Business oder individuell), statt einen Festpreis zu überdehnen.' },
    ],
  },
  {
    id: 'ai-phone-assistant-small-business-case', lang: 'de', slug: 'ki-telefonassistent-roi-rechner', order: 4, status: 'live',
    service: { path: '/leistungen/ki-telefonassistent/', name: 'KI-Telefonassistent' },
    article: { path: '/ki-academy/agenten-automatisierung/ki-telefonassistent-lohnt-sich-fuer-kmu/', title: 'Lohnt sich ein KI-Telefonassistent für KMU?' },
    embedH: 1500,
    meta: { title: 'Lohnt sich ein KI-Telefonassistent? Break-Even-Rechner · Weissmann', description: 'Drei eigene Zahlen – Anrufe pro Woche, Anteil verpasst, Wert pro Anruf – ergeben Ihren geretteten Umsatz pro Monat und den Break-Even gegenüber CHF 350.' },
    h1: 'Lohnt sich ein KI-Telefonassistent? Ihr Break-Even in 30 Sekunden',
    kicker: 'Kostenloses Tool',
    intro: 'Ob sich ein KI-Telefonassistent lohnt, hängt nicht von der Unternehmensgrösse ab, sondern von drei Zahlen, die nur Sie kennen: wie viele Anrufe pro Woche eingehen, wie viele davon unbeantwortet bleiben und was ein gewonnener Anruf im Schnitt wert ist. Tragen Sie sie ein – der Rechner zeigt Ihren Break-Even.',
    about: [
      'Es gibt keinen ehrlichen «Schweizer Durchschnitt» dafür, was ein verpasster Anruf kostet – deshalb fragt der Rechner nach Ihren eigenen Zahlen statt eine Zahl zu erfinden. Aus Anrufvolumen, Verpasst-Quote und Wert pro Anruf ergibt sich der gerettete Umsatz pro Monat und der Vergleich mit den CHF 350/Monat des Starter-Pakets.',
      'Zusätzlich rechnet das Tool eine konservative Variante mit halbem Wert und zeigt die Amortisation des einmaligen Starter-Tests (CHF 350, ohne laufendes Abo). Keine Garantie, keine Erfolgsversprechen – nur Ihre Zahlen, transparent gerechnet und nirgends gespeichert.',
    ],
    how: [
      'Tragen Sie Anrufe/Woche, Anteil verpasst und Wert pro Anruf ein.',
      'Lesen Sie geretteten Umsatz/Monat und Break-Even gegenüber CHF 350.',
      'Prüfen Sie die konservative Halbwert-Variante als Robustheitscheck.',
    ],
    faq: [
      { q: 'Woher weiss ich den «Wert pro Anruf»?', a: 'Als grobe Näherung: durchschnittlicher Auftragswert × Wahrscheinlichkeit, dass aus einem zurückgerufenen Interessenten ein Kunde wird. Das Tool bietet dafür eine optionale Hilfe.' },
      { q: 'Was kostet der Assistent?', a: 'Das Starter-Paket kostet CHF 350/Monat (1’500 Minuten inkl., keine Mindestlaufzeit, keine Einrichtungsgebühr); ein einmaliger Starter-Test kostet ebenfalls CHF 350 ohne Abo.' },
    ],
  },
  {
    id: 'google-ads-kosten-schweiz-kmu', lang: 'de', slug: 'google-ads-budget-rechner-schweiz', order: 5, status: 'live',
    service: { path: '/leistungen/google-ads/', name: 'Google Ads' },
    article: { path: '/ki-academy/marketing-seo-geo/google-ads-kosten-schweiz-kmu/', title: 'Google Ads Kosten in der Schweiz: was KMU wirklich zahlen' },
    embedH: 1550,
    meta: { title: 'Google-Ads-Budget-Rechner für Schweizer KMU · Weissmann', description: 'Realistische CHF-Budgetbänder für Google Ads in der Schweiz: Branche und Region rein, ehrliche monatliche Spanne raus – plus die oft vergessene Management-Ebene.' },
    h1: 'Google-Ads-Budget-Rechner für Schweizer KMU',
    kicker: 'Kostenloses Tool',
    intro: 'Wie viel Budget braucht Google Ads in der Schweiz wirklich? Wählen Sie Branche und Region und der Rechner zeigt eine realistische monatliche CHF-Spanne – inklusive der Management-Ebene, die in vielen «Budget»-Rechnungen fehlt.',
    about: [
      'Schweizer Klickpreise liegen über dem globalen Durchschnitt, und der Zürcher Markt ist teurer als der Rest des Landes. Der Rechner arbeitet nur mit den im Artikel belegten Spannen (keine erfundene Präzision) und trennt sauber die Werbeausgaben von der Management-Gebühr, die separat anfällt.',
      'So sehen Sie nicht nur, was Google kostet, sondern was ein realistisches Gesamtbudget ist. Zur Einordnung: das Google-Ads-Growth-Management von Weissmann kostet CHF 690/Monat, die Werbeausgaben werden separat und direkt an Google bezahlt.',
    ],
    how: [
      'Wählen Sie Branche und Region.',
      'Lesen Sie die realistische monatliche CHF-Spanne (nur Bänder, keine Scheinpräzision).',
      'Beachten Sie die getrennte Management-Ebene für das Gesamtbudget.',
    ],
    faq: [
      { q: 'Warum nur Spannen statt einer genauen Zahl?', a: 'Weil ein exakter Klickpreis von Keyword, Wettbewerb und Qualität abhängt. Ehrliche Bänder sind belastbarer als eine erfundene Punktzahl.' },
      { q: 'Sind die Werbeausgaben im Management-Preis enthalten?', a: 'Nein. Die CHF 690/Monat sind das Management; die Werbeausgaben zahlen Sie separat und direkt an Google.' },
    ],
  },
  {
    id: 'wix-wordpress-webflow-individuell', lang: 'de', slug: 'website-plattform-finder', order: 6, status: 'live',
    service: { path: '/leistungen/ki-webentwicklung/', name: 'KI-Webentwicklung' },
    article: { path: '/ki-academy/marketing-seo-geo/wix-wordpress-webflow-oder-individuelle-website/', title: 'Wix, WordPress, Webflow oder individuell?' },
    embedH: 1450,
    meta: { title: 'Website-Plattform-Finder: Wix, WordPress, Webflow oder individuell · Weissmann', description: 'Beschreiben Sie Ihre Anforderungen und sehen Sie, welche Plattform passt – Wix, WordPress, Webflow oder individuell. Keine beste Plattform, nur Passung.' },
    h1: 'Website-Plattform-Finder: welche passt zu Ihrem Projekt?',
    kicker: 'Kostenloses Tool',
    intro: 'Es gibt keine «beste» Website-Plattform – nur die, die zu Ihren Anforderungen passt. Beschreiben Sie kurz Ihr Projekt und der Finder zeigt, welcher Ansatz (Wix, WordPress, Webflow oder individuell) am besten passt und warum.',
    about: [
      'Baukasten, WordPress, Webflow und eine individuelle Umsetzung lösen unterschiedliche Probleme. Der Finder gleicht Ihre Anforderungen – Umfang, Redaktions-Workflow, Wachstum, Budget – gegen die Stärken und Grenzen jeder Plattform ab, die der Leitfaden beschreibt, und zeigt die passende Kategorie mit nachvollziehbarer Begründung.',
      'Das ist eine Entscheidungshilfe, kein Verkaufsargument für eine bestimmte Plattform. Ihre Eingaben werden nicht gespeichert.',
    ],
    how: [
      'Wählen Sie Ihre Anforderungen.',
      'Sehen Sie die empfohlene Plattform-Kategorie mit Begründung.',
      'Nutzen Sie das Ergebnis als neutrale Grundlage fürs Anbietergespräch.',
    ],
    faq: [
      { q: 'Empfiehlt der Finder immer eine individuelle Lösung?', a: 'Nein. Für viele Projekte ist ein Baukasten oder WordPress die richtige Wahl – der Finder sagt es ehrlich, wenn das auf Sie zutrifft.' },
      { q: 'Ersetzt das ein Beratungsgespräch?', a: 'Es ist eine gute Vorbereitung. Die endgültige Wahl hängt von Details ab, die am besten im Gespräch geklärt werden.' },
    ],
  },
  // ───────────────────────────── EN · Web / Ads ─────────────────────────────
  {
    id: 'business-website-cost-switzerland', lang: 'en', slug: 'website-cost-comparator', order: 7, status: 'live',
    service: { path: '/en/services/ai-web-development/', name: 'AI Web Development' },
    article: { path: '/en/ai-academy/marketing-seo-geo/business-website-cost-switzerland/', title: 'Business website cost in Switzerland' },
    embedH: 1550,
    meta: { title: 'Swiss Website Quote Normaliser: compare quotes like-for-like · Weissmann', description: 'Put two website quotes on the same scope sheet, normalise net vs gross VAT, and finally compare them like-for-like — with follow-up questions per provider.' },
    h1: 'Swiss Website Quote Normaliser',
    kicker: 'Free tool',
    intro: 'Two website quotes are almost never comparable as written — different scope, different VAT basis, different assumptions. This tool puts both on the same scope sheet so you can finally compare them like-for-like.',
    about: [
      'The reason website quotes feel impossible to compare is that each provider includes and excludes different things, and some quote net while others quote gross. This normaliser walks you through the same scope questions for each quote, aligns the VAT basis, and shows the true comparison — plus the exact follow-up questions to close the gaps.',
      'It runs entirely in your browser and stores nothing. The pricing anchors it uses (Starter CHF 880 promo / CHF 2’490 regular, and the 8.1% Swiss VAT rate) come from the Weissmann price list and the source article; no figures are invented.',
    ],
    how: [
      'Answer the same scope questions for each quote.',
      'Align the VAT basis (net vs gross).',
      'Read the like-for-like comparison and the follow-up questions to ask.',
    ],
    faq: [
      { q: 'Does it store my quote details?', a: 'No. Everything runs locally in your browser; nothing is sent or saved.' },
      { q: 'Why does VAT matter here?', a: 'Because a net quote and a gross quote can look thousands apart while being identical. Normalising the VAT basis removes that false difference.' },
    ],
  },
  {
    id: 'google-ads-cost-switzerland-smes', lang: 'en', slug: 'google-ads-budget-planner', order: 8, status: 'live',
    service: { path: '/en/services/google-ads/', name: 'Google Ads' },
    article: { path: '/en/ai-academy/marketing-seo-geo/google-ads-cost-switzerland-smes/', title: 'Google Ads costs in Switzerland for SMEs' },
    embedH: 1500,
    meta: { title: 'Swiss Google Ads Budget Planner: what a tier really buys · Weissmann', description: 'Pick a budget tier and see what that CHF range realistically buys as a clicks-to-enquiries funnel — using the honest Swiss ranges, plus the agency-fee layer.' },
    h1: 'Swiss Google Ads Budget Planner',
    kicker: 'Free tool',
    intro: 'A Google Ads budget is meaningless until you see what it actually buys. Pick a budget tier and this planner turns it into a realistic clicks-to-enquiries funnel using the honest Swiss cost ranges — and adds the management-fee layer most "budget" numbers forget.',
    about: [
      'Swiss clicks cost more than the global average, so a budget that works abroad can underdeliver here. The planner uses only the ranges the source article gives (no fabricated precision) to show, per tier, roughly how many clicks and enquiries a monthly budget yields — and keeps the ad spend separate from the management fee so the total is honest.',
      'For reference, Weissmann’s Google Ads Growth management is CHF 690/month, with ad spend billed separately and directly by Google. Nothing you enter is stored.',
    ],
    how: [
      'Pick a budget tier.',
      'See the clicks-to-enquiries funnel for that CHF range.',
      'Add the separate management layer for the true total.',
    ],
    faq: [
      { q: 'Are these guaranteed results?', a: 'No — they are honest ranges for planning, not promises. Real numbers depend on your industry, keywords and landing pages.' },
      { q: 'Is management included in the ad spend?', a: 'No. Management (CHF 690/month) and the ad spend you pay Google are two separate lines.' },
    ],
  },
  {
    id: 'multilingual-website-switzerland-seo', lang: 'en', slug: 'hreflang-planner', order: 9, status: 'live',
    service: { path: '/en/services/ai-web-development/', name: 'AI Web Development' },
    article: { path: '/en/ai-academy/marketing-seo-geo/multilingual-website-switzerland-seo/', title: 'Multilingual website SEO in Switzerland' },
    embedH: 1600,
    meta: { title: 'Multilingual URL & hreflang Planner (Switzerland) · Weissmann', description: 'Pick your languages and markets, get a recommended URL structure and a copyable, reciprocal hreflang + canonical head block — plus the pitfalls that break it.' },
    h1: 'Multilingual URL & hreflang Planner',
    kicker: 'Free tool',
    intro: 'Multilingual SEO breaks silently: one missing reciprocal tag and Google discards the whole annotation. Pick your languages and markets and this planner gives you a recommended URL structure and a copy-ready, reciprocal hreflang + canonical head block.',
    about: [
      'For a Swiss site with German, French, Italian and English, the two decisions that matter are the URL structure (prefix vs subdomain vs subdirectory) and a correct, reciprocal hreflang set with self-referencing canonicals. This planner generates both, previews the exact head block to paste, and flags the pitfalls that quietly break multilingual rankings — slug drift, non-reciprocal tags, canonicals pointing at the wrong locale.',
      'It is grounded in Google’s documentation on localized versions and the BCP 47 language-tag standard, and mirrors the real i18n architecture this very site runs on. Nothing you enter is stored.',
    ],
    how: [
      'Choose your languages and markets.',
      'Read the recommended URL structure.',
      'Copy the generated hreflang + canonical head block and review the pitfalls.',
    ],
    faq: [
      { q: 'What is the most common hreflang mistake?', a: 'Non-reciprocal tags: every locale must list all the others and itself, or Google ignores the whole set. The planner builds a reciprocal set for you.' },
      { q: 'Prefix, subdomain or subdirectory?', a: 'It depends on your setup; the planner recommends one based on your inputs and explains the trade-off.' },
    ],
  },
  {
    id: 'best-ai-receptionists-switzerland-buyers-guide', lang: 'en', slug: 'ai-receptionist-buyer-match', order: 10, status: 'live',
    service: { path: '/en/services/ai-phone-assistant/', name: 'AI Phone Assistant' },
    article: { path: '/en/ai-academy/agents-automation/best-ai-receptionists-switzerland/', title: 'Best AI receptionists in Switzerland: a buyer’s guide' },
    embedH: 1450,
    meta: { title: 'Which AI-receptionist buyer are you? Persona matcher · Weissmann', description: 'Answer five priority questions to find which of the four AI-receptionist buyer personas you are — and what to prioritise, ask, and watch out for.' },
    h1: 'Which AI-receptionist buyer are you?',
    kicker: 'Free tool',
    intro: 'There is no single "best" AI receptionist — only the best fit for your priorities. Answer five quick questions and this matcher tells you which of the four buyer personas you are, and exactly what to prioritise, ask and watch out for.',
    about: [
      'Buyers of AI phone answering split into a few clear personas — the one who lives and dies by dialect coverage, the one who needs deep calendar/CRM integration, the price-transparency buyer, the compliance-first buyer. The matcher maps your answers to the persona from the buyer’s guide and hands you that persona’s priorities and vendor questions, instead of a fake "winner".',
      'It surfaces a persona and a priority list, not a ranking of named products. Nothing you enter is stored.',
    ],
    how: [
      'Answer five priority questions.',
      'See your buyer persona and its priorities.',
      'Take the persona’s questions into any vendor conversation.',
    ],
    faq: [
      { q: 'Does it recommend a specific product?', a: 'No. It gives you a persona and the priorities/questions that matter for that persona — the honest way to shortlist, since there is no single best product.' },
      { q: 'How long does it take?', a: 'About a minute — five questions and a result.' },
    ],
  },
  // ───────────────────────────── IT · Ticino ─────────────────────────────
  {
    id: 'costo-sito-web-ticino-svizzera', lang: 'it', slug: 'calcolatore-costo-sito-web', order: 11, status: 'live',
    service: { path: '/it/servizi/sviluppo-siti-web-ai/', name: 'Sviluppo siti web AI' },
    article: { path: '/it/ai-academy/marketing-seo-geo/costo-sito-web-ticino-svizzera/', title: 'Quanto costa un sito web in Ticino e in Svizzera' },
    embedH: 1550,
    meta: { title: 'Calcolatore costo sito web: lancio vs continuativo · Weissmann', description: 'Assegnate ogni voce di costo del sito a «al lancio» o «ogni anno», inserite i vostri importi e vedete il totale del primo anno vs gli anni successivi.' },
    h1: 'Calcolatore del costo reale di un sito: lancio vs continuativo',
    kicker: 'Strumento gratuito',
    intro: 'Il prezzo di un sito non è un numero unico: è una parte «al lancio» e una parte «ogni anno». Assegnate ogni voce e inserite i vostri importi — il calcolatore mostra il totale del primo anno e quello degli anni successivi.',
    about: [
      'Due preventivi con lo stesso prezzo iniziale possono divergere di parecchio nel tempo, a seconda di hosting, manutenzione, licenze e modifiche. Questo calcolatore separa le voci una tantum da quelle ricorrenti, con i vostri importi, e mostra una proiezione a tre anni — così confrontate i preventivi sulla stessa base.',
      'È orientamento, non un preventivo, e ancorato ai pacchetti reali di Weissmann (Starter CHF 880 promo / CHF 2’490 regolare) e alla struttura di costi descritta nell’articolo. Nessun importo è inventato e nulla viene salvato.',
    ],
    how: [
      'Assegnate ogni voce a «al lancio» o «ogni anno».',
      'Inserite i vostri importi in CHF.',
      'Leggete il totale del primo anno vs gli anni successivi e la proiezione a tre anni.',
    ],
    faq: [
      { q: 'È un preventivo vincolante?', a: 'No. È uno strumento di orientamento che rende visibili i costi ricorrenti oltre al prezzo iniziale. Un preventivo vincolante nasce da una breve conversazione.' },
      { q: 'I miei importi vengono salvati?', a: 'No. Il calcolo avviene interamente nel vostro browser; nulla viene inviato o salvato.' },
    ],
  },
  {
    id: 'google-ads-ticino-costi', lang: 'it', slug: 'google-ads-ticino-budget', order: 12, status: 'live',
    service: { path: '/it/servizi/google-ads/', name: 'Google Ads' },
    article: { path: '/it/ai-academy/marketing-seo-geo/google-ads-ticino-costi/', title: 'Google Ads in Ticino: costi e quando conviene' },
    embedH: 1550,
    meta: { title: 'Google Ads in Ticino: costi e decisione · Weissmann', description: 'Due pannelli per il Ticino: un ancoraggio ai costi CHF reali (solo fasce) e una guida «quando conviene vs quando bastano SEO e profilo locale».' },
    h1: 'Google Ads in Ticino: costi e quando conviene davvero',
    kicker: 'Strumento gratuito',
    intro: 'Prima di investire in Google Ads in Ticino conviene rispondere a due domande: quanto costa davvero, e quando conviene rispetto a SEO e scheda locale. Questo strumento affronta entrambe — con fasce di costo reali e una guida alla decisione.',
    about: [
      'Il Ticino è un mercato più piccolo e più locale di Zurigo o Basilea, e i costi per clic lo riflettono. Il primo pannello mostra fasce di costo CHF realistiche (solo fasce, niente precisione inventata); il secondo aiuta a capire quando Google Ads ha senso e quando bastano una buona SEO locale e una scheda Google curata.',
      'Per riferimento, la gestione Google Ads Growth di Weissmann costa CHF 690/mese, con la spesa pubblicitaria pagata separatamente e direttamente a Google. Nulla di ciò che inserite viene salvato.',
    ],
    how: [
      'Leggete le fasce di costo CHF per il Ticino.',
      'Rispondete alle domande sulla decisione.',
      'Vedete se conviene investire in Ads o rafforzare prima SEO e scheda locale.',
    ],
    faq: [
      { q: 'Perché fasce e non un numero preciso?', a: 'Perché il costo per clic dipende da parola chiave, concorrenza e qualità. Fasce oneste sono più affidabili di un numero inventato.' },
      { q: 'La spesa pubblicitaria è inclusa nella gestione?', a: 'No. I CHF 690/mese sono la gestione; la spesa pubblicitaria si paga separatamente e direttamente a Google.' },
    ],
  },
];

export function toolPaths(t: ToolDef): LocalePaths {
  return underPillar('resources', sameSlug(t.slug));
}
/** The interactive-tools hub, one localized segment under the Resources pillar. */
export function toolsHubPaths(): LocalePaths {
  return underPillar('resources', { de: 'tools', en: 'tools', it: 'strumenti', fr: 'outils' });
}
export const liveTools = (): ToolDef[] => TOOLS.filter((t) => t.status === 'live').sort((a, b) => a.order - b.order);
export const toolsForLocale = (l: Locale): ToolDef[] => liveTools().filter((t) => t.lang === l);
export const toolLocales = (): Locale[] => [...new Set(liveTools().map((t) => t.lang))];
export const getTool = (id: string): ToolDef | undefined => TOOLS.find((t) => t.id === id);
