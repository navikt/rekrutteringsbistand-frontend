'use client';

import { useLagreInnlegg } from '../lagring/useLagreInnlegg';
import { useLagreRekrutteringstreff } from '../lagring/useLagreRekrutteringstreff';
import { useRekrutteringstreffValidering } from '../validering/useRekrutteringstreffValidering';
import {
  Endringsfelttype,
  registrerEndring,
} from '@/app/api/rekrutteringstreff/[...slug]/endringer/mutations';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useOppdaterKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { RekbisError } from '@/util/rekbisError';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * Hook for republisering av publisert rekrutteringstreff.
 */
export function useRepubliser(onFerdig: () => void, rekrutteringstreff?: any) {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
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

  const { setLagret: setKiLagret } = useOppdaterKiLogg(rekrutteringstreffId);

  const onRepubliser = useCallback(async () => {
    if (harFeil) {
      return;
    }

    if (manglerNavn) {
      return;
    }

    try {
      // 1. Sjekk om innlegg har endringer
      const values: any = getValues();
      const currentHtml: string = (values?.htmlContent ?? '') as string;
      const backendHtml: string = (innlegg?.htmlContent ?? '') as string;
      const shouldSaveInnlegg =
        (currentHtml ?? '').trim() !== (backendHtml ?? '').trim() &&
        (currentHtml ?? '').trim().length > 0;

      // 2. Bygg DTO for å sammenligne med backend
      const nyeVerdier = byggRekrutteringstreffDto();

      // 3. Bygg liste over endrede felt
      const gammelSted =
        [
          rekrutteringstreff?.gateadresse,
          rekrutteringstreff?.postnummer,
          rekrutteringstreff?.poststed,
        ]
          .filter(Boolean)
          .join(', ') || null;
      const nySted =
        [nyeVerdier.gateadresse, nyeVerdier.postnummer, nyeVerdier.poststed]
          .filter(Boolean)
          .join(', ') || null;

      const gammelTidspunkt =
        [rekrutteringstreff?.fraTid, rekrutteringstreff?.tilTid]
          .filter(Boolean)
          .join(' - ') || null;
      const nyTidspunkt =
        [nyeVerdier.fraTid, nyeVerdier.tilTid].filter(Boolean).join(' - ') ||
        null;

      const endringer: Endringsfelttype[] = [];

      if (
        (rekrutteringstreff?.tittel || null) !== (nyeVerdier.tittel || null)
      ) {
        endringer.push(Endringsfelttype.NAVN);
      }
      if (gammelSted !== nySted) {
        endringer.push(Endringsfelttype.STED);
      }
      if (gammelTidspunkt !== nyTidspunkt) {
        endringer.push(Endringsfelttype.TIDSPUNKT);
      }
      if (
        (rekrutteringstreff?.svarfrist || null) !==
        (nyeVerdier.svarfrist || null)
      ) {
        endringer.push(Endringsfelttype.SVARFRIST);
      }
      if (shouldSaveInnlegg) {
        endringer.push(Endringsfelttype.INTRODUKSJON);
      }

      // 4. Lagre rekrutteringstreff
      await lagreRekrutteringstreff();

      // 5. Lagre innlegg hvis det har endringer
      if (shouldSaveInnlegg) {
        await lagreInnlegg();
      }

      // 6. Registrer endringshendelse hvis det er endringer
      const harEndringer = endringer.length > 0;

      const erPublisert =
        rekrutteringstreff?.status === RekrutteringstreffStatus.PUBLISERT ||
        rekrutteringstreff?.status === RekrutteringstreffStatus.FULLFØRT;

      if (harEndringer && rekrutteringstreffId && erPublisert) {
        try {
          const skalVarsleMap: Record<string, boolean> =
            values?.endringerSkalVarsle ?? {};
          const endredeFelter = endringer.filter((felt) => skalVarsleMap[felt]);

          if (endredeFelter.length > 0) {
            await registrerEndring(rekrutteringstreffId, { endredeFelter });
          }
        } catch (error) {
          // Ikke blokker brukerflyt hvis endringsevent feiler
          new RekbisError({
            message: 'Kunne ikke registrere endringshendelse:',
            error,
          });
        }
      }

      // 7. Marker KI-logger som lagret
      // loggId'ene ble satt i form state av useFormFeltMedKiValidering ved KI-validering
      const tittelKiLoggId = values?.tittelKiLoggId as string | undefined;
      const innleggKiLoggId = values?.htmlContentKiLoggId as string | undefined;

      const kiLoggIder = [tittelKiLoggId, innleggKiLoggId].filter(
        (id): id is string => !!id,
      );
      if (setKiLagret) {
        for (const loggId of kiLoggIder) {
          try {
            await setKiLagret({ id: loggId, lagret: true });
          } catch (error) {
            new RekbisError({
              message: `Feil ved oppdatering av /lagret for KI-logg ${loggId}.`,
              error,
            });
          }
        }
      }

      onFerdig();
    } catch (error) {
      throw new RekbisError({
        message: 'Kunne ikke republisere rekrutteringstreff',
        error,
      });
    }
  }, [
    lagreRekrutteringstreff,
    lagreInnlegg,
    byggRekrutteringstreffDto,
    getValues,
    innlegg,
    rekrutteringstreff,
    rekrutteringstreffId,
    setKiLagret,
    onFerdig,
    harFeil,
    manglerNavn,
  ]);

  return { onRepubliser };
}
