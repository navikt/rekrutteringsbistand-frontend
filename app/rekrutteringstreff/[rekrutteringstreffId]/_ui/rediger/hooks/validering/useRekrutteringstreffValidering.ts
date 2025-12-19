'use client';

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
  const { watch, formState } = useFormContext();

  // KI-feil fra form state
  const tittelKiFeil = (watch('tittelKiFeil' as any) as any) ?? false;
  const innleggKiFeil = (watch('htmlContentKiFeil' as any) as any) ?? false;
  const harKiFeil = !!tittelKiFeil || !!innleggKiFeil;

  // Andre skjemafeil (unntatt root-feil som er for manuelle valideringer)
  const harAndreSkjemafeil = Boolean(
    formState.errors &&
      Object.keys(formState.errors).some((key) => key !== 'root'),
  );

  // Total vurdering
  const harFeil = harKiFeil || harAndreSkjemafeil;

  // Spesifikke feil for detaljert håndtering
  const harTittelFeil = Boolean((formState?.errors as any)?.tittel);
  const harInnleggFeil = Boolean((formState?.errors as any)?.htmlContent);

  // KI-sjekk status
  const tittelKiSjekketVerdi = watch('tittelKiSjekket' as any) as any;
  const innleggKiSjekketVerdi = watch('htmlContentKiSjekket' as any) as any;

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
