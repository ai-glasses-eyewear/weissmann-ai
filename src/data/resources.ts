/**
 * Weissmann AI — Resources registry (first-party tools, checklists, templates).
 *
 * The Resources pillar hosts genuinely useful, use/download/prove assets
 * (docs/architecture/MASTER-PAGE-MAP.md §2 verb test). Each is a real product:
 * interactive calculators, compliance checklists, templates, datasets. These
 * are the site's most citeable, most linkable assets and the primary lead-gen
 * surface — they must add genuine value, never fabricate data.
 *
 * `status: 'live'` gates publication.
 */
import type { LocaleMap, LocalePaths } from './routes';
import { underPillar } from './routes';

export type ResourceType = 'calculator' | 'checklist' | 'template' | 'guide' | 'dataset';

export interface ResourceDef {
  id: string;
  type: ResourceType;
  order: number;
  status: 'live' | 'draft';
  slug: LocaleMap;
  name: LocaleMap;
  tagline: LocaleMap;
  /** Related service ids (commercial cross-link + lead-gen tie). */
  relatedServices?: string[];
}

export const RESOURCES: ResourceDef[] = [
  {
    id: 'phone-roi-calculator',
    type: 'calculator',
    order: 1,
    status: 'live',
    slug: { de: 'roi-rechner-telefonassistent', en: 'phone-assistant-roi-calculator', it: 'calcolatore-roi-assistente-telefonico', fr: 'calculateur-roi-assistant-telephonique' },
    name: { de: 'ROI-Rechner: verpasste Anrufe', en: 'ROI Calculator: missed calls', it: 'Calcolatore ROI: chiamate perse', fr: 'Calculateur ROI : appels manqués' },
    tagline: {
      de: 'Schätzen Sie in 30 Sekunden, was Ihnen verpasste Anrufe pro Monat kosten – transparent gerechnet.',
      en: 'Estimate in 30 seconds what missed calls cost you per month – transparently calculated.',
      it: 'Stimate in 30 secondi quanto vi costano le chiamate perse al mese – con calcolo trasparente.',
      fr: 'Estimez en 30 secondes ce que les appels manqués vous coûtent par mois – calcul transparent.',
    },
    relatedServices: ['phone-assistant'],
  },
  {
    id: 'phone-buyer-checklist',
    type: 'checklist',
    order: 2,
    status: 'live',
    slug: { de: 'ki-telefonassistent-checkliste', en: 'ai-phone-assistant-checklist', it: 'checklist-assistente-telefonico-ai', fr: 'checklist-agent-telephonique-ia' },
    name: { de: 'Kaufberater-Checkliste: KI-Telefonassistent', en: 'Buyer’s Checklist: AI phone assistant', it: 'Checklist per la scelta: assistente telefonico AI', fr: 'Checklist de l’acheteur : agent téléphonique IA' },
    tagline: {
      de: '13 Fragen, die einen KI-Telefonassistenten, der Kunden gewinnt, von einem trennen, der still Kunden verliert.',
      en: '13 questions that separate a phone AI that wins you customers from one that quietly loses them.',
      it: '13 domande che distinguono un assistente telefonico AI che conquista clienti da uno che li perde in silenzio.',
      fr: '13 questions qui séparent un agent téléphonique IA qui gagne des clients de celui qui en perd en silence.',
    },
    relatedServices: ['phone-assistant'],
  },
  {
    id: 'ai-readiness-assessment',
    type: 'checklist', order: 2, status: 'live',
    slug: { de: 'ki-readiness-check', en: 'ai-readiness-assessment', it: 'valutazione-maturita-ai', fr: 'evaluation-maturite-ia' },
    name: { de: 'KI-Readiness-Check', en: 'AI Readiness Assessment', it: 'Valutazione di maturità AI', fr: 'Évaluation de maturité IA' },
    tagline: { de: 'Wie bereit ist Ihr Unternehmen für KI? Ein strukturierter Selbst-Check.', en: 'How ready is your business for AI? A structured self-assessment.', it: 'Quanto è pronta la vostra azienda per l’AI? Un’autovalutazione strutturata.', fr: 'Votre entreprise est-elle prête pour l’IA ? Une auto-évaluation structurée.' },
    relatedServices: ['consulting'],
  },
  {
    id: 'revdsg-ai-checklist',
    type: 'checklist', order: 3, status: 'live',
    slug: { de: 'revdsg-ki-checkliste', en: 'revdsg-ai-checklist', it: 'checklist-ai-nlpd', fr: 'checklist-ia-nlpd' },
    name: { de: 'revDSG & EU AI Act Checkliste', en: 'revDSG & EU AI Act Checklist', it: 'Checklist nLPD & EU AI Act', fr: 'Checklist nLPD & EU AI Act' },
    tagline: { de: 'Die wichtigsten Datenschutz- und Compliance-Punkte beim KI-Einsatz in der Schweiz.', en: 'The key data-protection and compliance points when using AI in Switzerland.', it: 'I punti chiave di protezione dati e compliance nell’uso dell’AI in Svizzera.', fr: 'Les points clés de protection des données et de conformité lors de l’usage de l’IA en Suisse.' },
    relatedServices: ['consulting'],
  },
  {
    id: 'geo-audit-checklist',
    type: 'checklist', order: 4, status: 'live',
    slug: { de: 'geo-audit-checkliste', en: 'geo-audit-checklist', it: 'checklist-audit-geo', fr: 'checklist-audit-geo' },
    name: { de: 'GEO-Audit-Checkliste', en: 'GEO Audit Checklist', it: 'Checklist audit GEO', fr: 'Checklist d’audit GEO' },
    tagline: { de: 'Prüfen Sie, wie sichtbar Ihre Website für KI-Antwortmaschinen ist.', en: 'Check how visible your website is to AI answer engines.', it: 'Verificate quanto è visibile il vostro sito ai motori di risposta AI.', fr: 'Vérifiez la visibilité de votre site pour les moteurs de réponse IA.' },
    relatedServices: ['geo'],
  },
];

export function resourcePaths(r: ResourceDef): LocalePaths {
  return underPillar('resources', r.slug);
}
export function getResource(id: string): ResourceDef | undefined {
  return RESOURCES.find((r) => r.id === id);
}
export const liveResources = (): ResourceDef[] => RESOURCES.filter((r) => r.status === 'live').sort((a, b) => a.order - b.order);
export const orderedResources = (): ResourceDef[] => [...RESOURCES].sort((a, b) => a.order - b.order);
