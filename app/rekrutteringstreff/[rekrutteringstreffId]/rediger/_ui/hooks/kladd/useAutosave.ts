'use client';

import { useLagreInnlegg } from '../lagring/useLagreInnlegg';
import { useLagreRekrutteringstreff } from '../lagring/useLagreRekrutteringstreff';
import { erEditMode, erPublisert } from '../utils';
import { useRekrutteringstreffValidering } from '../validering/useRekrutteringstreffValidering';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

type AnyValues = Record<string, any>;

/**
 * Avgjør om autosave skal blokkeres pga KI-feil.
 *
 * Hvis felt har KI-feil:
 * - Autosave blokkeres for dette feltet
 * - Gammel verdi brukes i lagreoperasjoner
 * - Andre felt kan fortsatt lagres
 * - Bruker må trykke "Lagre likevel" for å godkjenne og lagre ny verdi
 */
const skalStanseAutosavePgaKi = (
  overstyrKiFeil: boolean,
  endrerFelt: boolean,
  kiFeil: boolean,
  kiSjekket: boolean,
): boolean => {
  if (overstyrKiFeil) return false;
  if (!endrerFelt) return false;
  return !kiSjekket || kiFeil;
};

/**
 * Autosave for rekrutteringstreff-felt (tittel, tidspunkt, sted, etc).
 * Lagrer automatisk mens bruker skriver. Blokkeres av KI-feil på tittel.
 * Deaktiveres ved redigering av publiserte treff.
 */
export function useAutosaveRekrutteringstreff() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();
  const { getValues, trigger, formState } = useFormContext<AnyValues>();
  const { lagre, byggRekrutteringstreffDto } = useLagreRekrutteringstreff();
  const { tittelKiFeil, tittelKiSjekket } = useRekrutteringstreffValidering();

  const kanAutoLagre = !skalHindreAutosave(treff);

  const autosave = useCallback(
    async (fieldsToValidate?: string[], overstyrKiFeil?: boolean) => {
      if (!kanAutoLagre) return;
      if (!rekrutteringstreffId) return;

      const valideringsFelter =
        fieldsToValidate && fieldsToValidate.length > 0
          ? (fieldsToValidate as any)
          : undefined;

      const valideringOk = await trigger(valideringsFelter, {
        shouldFocus: false,
      });
      if (!valideringOk) {
        return;
      }

      if ((formState?.errors as any)?.root?.type === 'manualPeriod') {
        const dto = byggRekrutteringstreffDto();
        const endrerPeriode =
          (dto?.fraTid ?? null) !== (treff?.fraTid ?? null) ||
          (dto?.tilTid ?? null) !== (treff?.tilTid ?? null);
        if (endrerPeriode) return;
      }

      const formVerdier = getValues();
      const trimmedTitle =
        typeof formVerdier.tittel === 'string' ? formVerdier.tittel.trim() : '';
      const endrerTittel = Boolean(
        trimmedTitle.length > 0 && trimmedTitle !== (treff?.tittel ?? ''),
      );

      if (
        skalStanseAutosavePgaKi(
          overstyrKiFeil ?? false,
          endrerTittel,
          tittelKiFeil,
          tittelKiSjekket,
        )
      ) {
        return;
      }

      await lagre();
    },
    [
      kanAutoLagre,
      rekrutteringstreffId,
      trigger,
      formState,
      byggRekrutteringstreffDto,
      treff,
      getValues,
      lagre,
      tittelKiFeil,
      tittelKiSjekket,
    ],
  );

  const lagreVedAutoLagre = useCallback(async () => {
    await autosave();
  }, [autosave]);

  return { autosave, lagreVedAutoLagre, kanAutoLagre };
}

/**
 * Autosave for innlegg (HTML-innhold).
 * Lagrer automatisk mens bruker skriver. Blokkeres av KI-feil på innlegg.
 * Deaktiveres ved redigering av publiserte treff.
 */
export function useAutosaveInnlegg() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const { getValues, trigger } = useFormContext<{
    htmlContent?: string;
  }>();
  const { lagre, innlegg } = useLagreInnlegg();

  const { harInnleggFeil, innleggKiFeil, innleggKiSjekket } =
    useRekrutteringstreffValidering();

  const kanAutoLagre = !skalHindreAutosave(treff as any);

  const autosave = useCallback(
    async (fieldsToValidate?: string[], overstyrKiFeil?: boolean) => {
      if (!kanAutoLagre) return;
      if (!rekrutteringstreffId) return;

      if (fieldsToValidate && fieldsToValidate.length) {
        const valideringOk = await trigger(fieldsToValidate as any, {
          shouldFocus: false,
        });
        if (!valideringOk) return;
      }

      const formVerdier = getValues();
      const innholdSomSkalLagres = (formVerdier.htmlContent ?? '').toString();
      const harInnleggInnhold = Boolean(innholdSomSkalLagres.trim().length > 0);

      if (!harInnleggInnhold) return;
      if (harInnleggFeil) return;

      const eksisterendeInnhold = innlegg?.htmlContent ?? '';
      const endrerInnlegg = Boolean(
        innholdSomSkalLagres.trim().length > 0 &&
          innholdSomSkalLagres !== eksisterendeInnhold,
      );

      if (
        skalStanseAutosavePgaKi(
          overstyrKiFeil ?? false,
          endrerInnlegg,
          innleggKiFeil,
          innleggKiSjekket,
        )
      ) {
        return;
      }

      await lagre();
    },
    [
      kanAutoLagre,
      rekrutteringstreffId,
      trigger,
      getValues,
      lagre,
      innlegg,
      harInnleggFeil,
      innleggKiFeil,
      innleggKiSjekket,
    ],
  );

  const lagreVedAutoLagre = useCallback(async () => {
    await autosave();
  }, [autosave]);

  return { autosave, lagreVedAutoLagre, kanAutoLagre };
}

const skalHindreAutosave = (treff: any): boolean => {
  return erPublisert(treff?.status) && erEditMode();
};
