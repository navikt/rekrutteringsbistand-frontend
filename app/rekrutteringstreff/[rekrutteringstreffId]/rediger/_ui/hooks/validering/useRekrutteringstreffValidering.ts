'use client';

import type { RekrutteringstreffFormValues } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/RekrutteringstreffForm';
import { useFormContext } from 'react-hook-form';

/**
 * Felles valideringslogikk for rekrutteringstreff.
 *
 * Brukes av både autosave (kladd) og republisering (submit) for å
 * sikre konsistent validering på tvers av moduser.
 *
 * @returns Valideringsstatus som kan brukes til å bestemme om lagring skal skje
 */
export function useRekrutteringstreffValidering() {
  const { watch, formState } = useFormContext<RekrutteringstreffFormValues>();

  // KI-feil fra form state
  const tittelKiFeil = watch('tittelKiFeil') ?? false;
  const innleggKiFeil = watch('htmlContentKiFeil') ?? false;
  const harKiFeil = !!tittelKiFeil || !!innleggKiFeil;

  // Andre skjemafeil (unntatt root-feil som er for manuelle valideringer)
  const harAndreSkjemafeil = Boolean(
    formState.errors &&
    Object.keys(formState.errors).some((key) => key !== 'root'),
  );

  // Total vurdering
  const harFeil = harKiFeil || harAndreSkjemafeil;

  // Spesifikke feil for detaljert håndtering
  const harTittelFeil = Boolean(formState.errors.tittel);
  const harInnleggFeil = Boolean(formState.errors.htmlContent);

  // KI-sjekk status
  const tittelKiSjekketVerdi = watch('tittelKiSjekket');
  const innleggKiSjekketVerdi = watch('htmlContentKiSjekket');

  const tittelKiSjekket =
    tittelKiSjekketVerdi === undefined ? true : Boolean(tittelKiSjekketVerdi);
  const innleggKiSjekket =
    innleggKiSjekketVerdi === undefined ? true : Boolean(innleggKiSjekketVerdi);

  return {
    // Overordnet validering
    harFeil,
    harKiFeil,
    harAndreSkjemafeil,

    // Spesifikke felt-feil
    tittelKiFeil,
    innleggKiFeil,
    harTittelFeil,
    harInnleggFeil,

    // KI-sjekk status
    tittelKiSjekket,
    innleggKiSjekket,
  };
}
