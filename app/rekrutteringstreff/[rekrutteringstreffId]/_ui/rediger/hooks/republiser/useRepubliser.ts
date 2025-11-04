'use client';

import { useLagreInnlegg } from '../lagring/useLagreInnlegg';
import { useLagreRekrutteringstreff } from '../lagring/useLagreRekrutteringstreff';
import { useRekrutteringstreffValidering } from '../validering/useRekrutteringstreffValidering';
import { registrerEndring } from '@/app/api/rekrutteringstreff/[...slug]/endringer/mutations';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { AktivtSteg } from '@/app/rekrutteringstreff/_types/constants';
import { getActiveStepFromHendelser } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
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
  const { lagre: lagreRekrutteringstreff, byggRekrutteringstreffDto } =
    useLagreRekrutteringstreff();
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

      // 1. Sjekk om innlegg har endringer
      const values: any = getValues();
      const currentHtml: string = (values?.htmlContent ?? '') as string;
      const backendHtml: string = (innlegg?.htmlContent ?? '') as string;
      const shouldSaveInnlegg =
        (currentHtml ?? '').trim() !== (backendHtml ?? '').trim() &&
        (currentHtml ?? '').trim().length > 0;

      // 2. Bygg DTO for å sammenligne med backend
      const nyeVerdier = byggRekrutteringstreffDto();

      // 3. Bygg endringer objekt - kun felt som er endret
      const createEndringsfelt = (
        gammelVerdi: string | null,
        nyVerdi: string | null,
      ) => {
        if (gammelVerdi === nyVerdi) return null;
        return { gammelVerdi, nyVerdi };
      };

      const endringer = {
        tittel: createEndringsfelt(
          rekrutteringstreff?.tittel || null,
          nyeVerdier.tittel || null,
        ),
        beskrivelse: createEndringsfelt(
          rekrutteringstreff?.beskrivelse || null,
          nyeVerdier.beskrivelse || null,
        ),
        fraTid: createEndringsfelt(
          rekrutteringstreff?.fraTid || null,
          nyeVerdier.fraTid || null,
        ),
        tilTid: createEndringsfelt(
          rekrutteringstreff?.tilTid || null,
          nyeVerdier.tilTid || null,
        ),
        svarfrist: createEndringsfelt(
          rekrutteringstreff?.svarfrist || null,
          nyeVerdier.svarfrist || null,
        ),
        gateadresse: createEndringsfelt(
          rekrutteringstreff?.gateadresse || null,
          nyeVerdier.gateadresse || null,
        ),
        postnummer: createEndringsfelt(
          rekrutteringstreff?.postnummer || null,
          nyeVerdier.postnummer || null,
        ),
        poststed: createEndringsfelt(
          rekrutteringstreff?.poststed || null,
          nyeVerdier.poststed || null,
        ),
        innlegg: shouldSaveInnlegg
          ? { gammelVerdi: backendHtml, nyVerdi: currentHtml }
          : null,
      };

      // 4. Lagre rekrutteringstreff
      await lagreRekrutteringstreff();

      // 5. Lagre innlegg hvis det har endringer
      if (shouldSaveInnlegg) {
        await lagreInnlegg();
      }

      // 6. Registrer endringshendelse hvis det er endringer
      const harEndringer = Object.values(endringer).some((e) => e !== null);

      // Avled om treffet er publisert fra hendelser
      const aktivtSteg = getActiveStepFromHendelser(
        rekrutteringstreff?.hendelser,
      );
      const erPublisert =
        aktivtSteg === AktivtSteg.INVITERE ||
        aktivtSteg === AktivtSteg.FULLFØRE;

      if (harEndringer && rekrutteringstreffId && erPublisert) {
        try {
          await registrerEndring(rekrutteringstreffId, endringer);
        } catch (error) {
          // Ikke blokker brukerflyt hvis endringsevent feiler
          new RekbisError({
            message: 'Kunne ikke registrere endringshendelse:',
            error,
          });
        }
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
    byggRekrutteringstreffDto,
    getValues,
    innlegg,
    rekrutteringstreff,
    rekrutteringstreffId,
    markerSisteKiLoggSomLagret,
    setModus,
    scrollToTop,
    harFeil,
    manglerNavn,
  ]);

  return { onRepubliser };
}
