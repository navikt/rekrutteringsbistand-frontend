'use client';

import { useLagreInnlegg } from '../lagring/useLagreInnlegg';
import { useLagreRekrutteringstreff } from '../lagring/useLagreRekrutteringstreff';
import { useRekrutteringstreffValidering } from '../validering/useRekrutteringstreffValidering';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * Hook for republisering av publisert rekrutteringstreff.
 */
export function useRepubliser(
  setModus: (modus: string) => void,
  scrollToTop: () => void,
  rekrutteringstreff?: any,
) {
  const { rekrutteringstreffId, startLagring, stoppLagring } =
    useRekrutteringstreffContext();
  const { getValues } = useFormContext();
  const { lagre: lagreRekrutteringstreff } = useLagreRekrutteringstreff();
  const { lagre: lagreInnlegg } = useLagreInnlegg();
  const { data: innleggListe } = useInnlegg(rekrutteringstreffId);
  const innlegg = innleggListe?.[0];

  const { harFeil } = useRekrutteringstreffValidering();

  const DEFAULT_TITTEL = 'Treff uten navn';
  const lagretTittel = rekrutteringstreff?.tittel ?? '';
  const manglerNavn =
    typeof lagretTittel === 'string' && lagretTittel.trim() === DEFAULT_TITTEL;

  const kiTittelLogg = useKiLogg(rekrutteringstreffId, 'tittel');
  const kiInnleggLogg = useKiLogg(rekrutteringstreffId, 'innlegg');

  const markerSisteKiLoggSomLagret = useCallback(async () => {
    const mark = async (
      liste:
        | { id: string; opprettetTidspunkt: string; lagret: boolean }[]
        | undefined,
      setLagret?: (arg: { id: string; lagret: boolean }) => Promise<void>,
    ) => {
      if (!liste || liste.length === 0 || !setLagret) return;

      const sorted = [...liste].sort(
        (a, b) =>
          new Date(b.opprettetTidspunkt).getTime() -
          new Date(a.opprettetTidspunkt).getTime(),
      );
      const siste = sorted[0];

      if (siste && !siste.lagret) {
        await setLagret({ id: siste.id, lagret: true });
      }
    };

    try {
      const [tittelListe, innleggListe] = await Promise.all([
        kiTittelLogg.refresh(),
        kiInnleggLogg.refresh(),
      ]);

      await Promise.all([
        mark(tittelListe ?? kiTittelLogg.data, kiTittelLogg.setLagret),
        mark(innleggListe ?? kiInnleggLogg.data, kiInnleggLogg.setLagret),
      ]);
    } catch (error) {
      new RekbisError({
        message: 'Kunne ikke oppdatere KI-logg lagret-status:',
        error,
      });
    }
  }, [kiTittelLogg, kiInnleggLogg]);

  const onRepubliser = useCallback(async () => {
    if (harFeil) {
      return;
    }

    if (manglerNavn) {
      return;
    }

    try {
      startLagring('republiser');

      // 1. Lagre rekrutteringstreff
      await lagreRekrutteringstreff();

      // 2. Lagre innlegg hvis det har endringer
      const values: any = getValues();
      const currentHtml: string = (values?.htmlContent ?? '') as string;
      const backendHtml: string = (innlegg?.htmlContent ?? '') as string;
      const shouldSaveInnlegg =
        (currentHtml ?? '').trim() !== (backendHtml ?? '').trim() &&
        (currentHtml ?? '').trim().length > 0;

      if (shouldSaveInnlegg) {
        await lagreInnlegg();
      }

      await markerSisteKiLoggSomLagret();

      setModus('');
      scrollToTop();
    } finally {
      stoppLagring('republiser');
    }
  }, [
    startLagring,
    stoppLagring,
    lagreRekrutteringstreff,
    lagreInnlegg,
    getValues,
    innlegg,
    markerSisteKiLoggSomLagret,
    setModus,
    scrollToTop,
    harFeil,
    manglerNavn,
  ]);

  return { onRepubliser };
}
