/**
 * Post-launch media assets.
 *
 * When a REAL audio recording of the Weissmann AI phone agent is available,
 * drop the file(s) in `public/audio/` and set the path(s) below. The
 * <AudioSample> player then renders automatically on the homepage (just below
 * the demo video). Until a value is set it stays null and NOTHING renders — no
 * broken player. A locale with no own file falls back to DE, then EN.
 *
 * Truthful only: point these at a genuine recording of the Weissmann AI agent,
 * never a stock/AI-generated stand-in presented as our product.
 */
import type { Locale } from './site';

export const AUDIO_SAMPLE: Record<Locale, string | null> = {
  de: null, // e.g. '/audio/ai-sample-de.mp3'
  en: null, // e.g. '/audio/ai-sample-en.mp3'
  it: null, // e.g. '/audio/ai-sample-it.mp3'
  fr: null, // e.g. '/audio/ai-sample-fr.mp3'
};
