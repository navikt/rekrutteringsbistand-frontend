'use client';

import { useLagreInnlegg } from '../lagring/useLagreInnlegg';
import { useLagreRekrutteringstreff } from '../lagring/useLagreRekrutteringstreff';
import { useRekrutteringstreffValidering } from '../validering/useRekrutteringstreffValidering';
import { registrerEndring } from '@/app/api/rekrutteringstreff/[...slug]/endringer/mutations';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useKiLoggMutasjoner } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
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

  const { setLagret: setKiLagret } = useKiLoggMutasjoner(rekrutteringstreffId);

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

      // Hent skalVarsle-verdier fra form state (satt av RepubliserRekrutteringstreffButton)
      const skalVarsleMap: Record<string, boolean> =
        values?.endringerSkalVarsle ?? {};

      // 2. Bygg DTO for å sammenligne med backend
      const nyeVerdier = byggRekrutteringstreffDto();

      // 3. Bygg endringer objekt - kun felt som er endret
      // skalVarsle leses fra form state, default false
      const createEndringsfelt = (
        felt: string,
        gammelVerdi: string | null,
        nyVerdi: string | null,
      ) => {
        if (gammelVerdi === nyVerdi) return null;
        return {
          gammelVerdi,
          nyVerdi,
          skalVarsle: skalVarsleMap[felt] ?? false,
        };
      };

      // Slå sammen sted-feltene
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

      // Slå sammen tidspunkt-feltene
      const gammelTidspunkt =
        [rekrutteringstreff?.fraTid, rekrutteringstreff?.tilTid]
          .filter(Boolean)
          .join(' - ') || null;
      const nyTidspunkt =
        [nyeVerdier.fraTid, nyeVerdier.tilTid].filter(Boolean).join(' - ') ||
        null;

      const endringer = {
        navn: createEndringsfelt(
          'navn',
          rekrutteringstreff?.tittel || null,
          nyeVerdier.tittel || null,
        ),
        sted: createEndringsfelt('sted', gammelSted, nySted),
        tidspunkt: createEndringsfelt(
          'tidspunkt',
          gammelTidspunkt,
          nyTidspunkt,
        ),
        svarfrist: createEndringsfelt(
          'svarfrist',
          rekrutteringstreff?.svarfrist || null,
          nyeVerdier.svarfrist || null,
        ),
        introduksjon: shouldSaveInnlegg
          ? {
              gammelVerdi: backendHtml,
              nyVerdi: currentHtml,
              skalVarsle: skalVarsleMap['introduksjon'] ?? false,
            }
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

      const erPublisert =
        rekrutteringstreff?.status === RekrutteringstreffStatus.PUBLISERT ||
        rekrutteringstreff?.status === RekrutteringstreffStatus.FULLFØRT;

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

      // 7. Marker KI-logger som lagret
      // loggId'ene ble satt i form state av useFormFeltMedKiValidering ved KI-validering
      const tittelKiLoggId = values?.tittelKiLoggId as string | undefined;
      const innleggKiLoggId = values?.htmlContentKiLoggId as string | undefined;

      const kiLoggIder = [tittelKiLoggId, innleggKiLoggId].filter(Boolean);
      for (const loggId of kiLoggIder) {
        if (loggId && setKiLagret) {
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

      setModus('');
      scrollToTop();
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
    setModus,
    scrollToTop,
    harFeil,
    manglerNavn,
  ]);

  return { onRepubliser };
}
