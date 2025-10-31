import { useInviteringsStatus } from './stegviser/useInviteringsStatus';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { AktivtSteg } from '@/app/rekrutteringstreff/_types/constants';
import { getActiveStepFromHendelser } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
import { useMemo } from 'react';

/**
 * Sentralisert hook for å hente og beregne rekrutteringstreff-data
 *
 * Brukes av mange komponenter for å unngå duplisering av:
 * - Data-henting (useRekrutteringstreff, useInnlegg)
 * - Beregning av derived state (activeStep, avlyst, harPublisert, etc.)
 * - Oppdatering av data
 *
 *
 */
export const useRekrutteringstreffData = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);
  const { data: innlegg } = useInnlegg(rekrutteringstreffId);

  const treff = rekrutteringstreffHook.data;
  const hendelser = treff?.hendelser;
  const fraTid = treff?.fraTid;
  const tilTid = treff?.tilTid;

  const activeStep: AktivtSteg = useMemo(
    () => getActiveStepFromHendelser(hendelser),
    [hendelser],
  );

  const avlyst = activeStep === AktivtSteg.AVLYST;
  const harPublisert =
    activeStep === AktivtSteg.INVITERE || activeStep === AktivtSteg.FULLFØRE;

  const { harInvitert } = useInviteringsStatus();

  const fraTidspunktHarPassert = useMemo(() => {
    if (!fraTid) return false;
    return new Date(fraTid) < new Date();
  }, [fraTid]);

  const tilTidspunktHarPassert = useMemo(() => {
    if (!tilTid) return false;
    return new Date(tilTid) < new Date();
  }, [tilTid]);

  const innleggHtmlFraBackend = innlegg?.[0]?.htmlContent ?? null;

  const oppdaterData = () => {
    rekrutteringstreffHook.mutate();
  };

  return {
    rekrutteringstreffId,
    treff,
    hendelser,
    innlegg,

    activeStep,
    avlyst,
    harPublisert,
    harInvitert,
    fraTidspunktHarPassert,
    tilTidspunktHarPassert,
    innleggHtmlFraBackend,

    oppdaterData,

    rekrutteringstreffHook,
  };
};
