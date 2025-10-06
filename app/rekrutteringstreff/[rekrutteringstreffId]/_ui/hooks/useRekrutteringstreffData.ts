import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_domain/constants';
import { getActiveStepFromHendelser } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
import { useMemo } from 'react';

export type ActiveStep =
  | 'PUBLISERE'
  | 'INVITERE'
  | 'FULLFØRE'
  | 'AVLYST'
  | string
  | undefined;

/**
 * Sentralisert hook for å hente og beregne rekrutteringstreff-data
 *
 * Brukes av mange komponenter for å unngå duplisering av:
 * - Data-henting (useRekrutteringstreff, useInnlegg)
 * - Beregning av derived state (activeStep, avlyst, harPublisert, etc.)
 * - Oppdatering av data
 *
 * Dette reduserer props drilling og gjør komponenter mer self-contained.
 *
 * @example
 * ```tsx
 * const { activeStep, avlyst, harPublisert, treff, oppdaterData } = useRekrutteringstreffData();
 * ```
 */
export const useRekrutteringstreffData = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);
  const { data: innlegg } = useInnlegg(rekrutteringstreffId);

  const treff = rekrutteringstreffHook.data;
  const hendelser = treff?.hendelser;

  const activeStep: ActiveStep = useMemo(
    () => getActiveStepFromHendelser(hendelser),
    [hendelser],
  );

  const avlyst = activeStep === 'AVLYST';
  const harPublisert = activeStep === 'INVITERE' || activeStep === 'FULLFØRE';

  // Sjekk om noen er invitert basert på hendelser
  const harInvitert = useMemo(() => {
    if (!hendelser) return false;
    return hendelser.some(
      (h) =>
        h.hendelsestype === JobbsøkerHendelsestype.INVITER ||
        h.hendelsestype === 'INVITERT',
    );
  }, [hendelser]);

  // Sjekk om fra-tidspunkt har passert
  const fraTidspunktHarPassert = useMemo(() => {
    if (!treff?.fraTid) return false;
    return new Date(treff.fraTid) < new Date();
  }, [treff?.fraTid]);

  // Sjekk om til-tidspunkt har passert (brukes i Rekrutteringstreff.tsx)
  const tilTidspunktHarPassert = useMemo(() => {
    if (!treff?.tilTid) return false;
    return new Date(treff.tilTid) < new Date();
  }, [treff?.tilTid]);

  const innleggHtmlFraBackend = innlegg?.[0]?.htmlContent ?? null;

  const oppdaterData = () => {
    rekrutteringstreffHook.mutate();
  };

  return {
    // IDs og raw data
    rekrutteringstreffId,
    treff,
    hendelser,
    innlegg,

    // Computed state
    activeStep,
    avlyst,
    harPublisert,
    harInvitert,
    fraTidspunktHarPassert,
    tilTidspunktHarPassert,
    innleggHtmlFraBackend,

    // Funksjoner
    oppdaterData,

    // Hook selv (for mer avansert bruk)
    rekrutteringstreffHook,
  };
};
