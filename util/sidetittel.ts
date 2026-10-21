import { isLocal } from '@/util/env';
import type { Metadata } from 'next';

export const APPNAVN = isLocal
  ? 'Local - Rekrutteringsbistand'
  : 'Rekrutteringsbistand';

// title.template gjelder bare nærmeste nivå, så hele tittelen settes eksplisitt.
// Titler sendes til Umami og skal ikke inneholde navn på personer.
export const sidetittel = (tittel: string): Metadata['title'] => ({
  absolute: `${tittel} – ${APPNAVN}`,
});
