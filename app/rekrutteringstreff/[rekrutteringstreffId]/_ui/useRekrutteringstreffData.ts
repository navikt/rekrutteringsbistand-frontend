import { useInviteringsStatus } from './stegviser/useInviteringsStatus';
import {
  InnleggListeDTO,
  useInnlegg,
} from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import {
  HendelseDto,
  RekrutteringstreffUtenHendelserDTO,
  useRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { useMemo } from 'react';

interface RekrutteringstreffData {
  rekrutteringstreffId: string;
  hendelser?: HendelseDto[];
  harPublisert: boolean;
  harInvitert: boolean;
  avlyst: boolean;
  fraTidspunktHarPassert: boolean;
  tilTidspunktHarPassert: boolean;
  innleggHtmlFraBackend: string | null;
  treff?: RekrutteringstreffUtenHendelserDTO;
  oppdaterData: () => void;
  rekrutteringstreffHook: ReturnType<typeof useRekrutteringstreff>;
  innlegg: InnleggListeDTO;
}

/**
 * Sentralisert hook for å hente og beregne rekrutteringstreff-data
 *
 * Brukes av mange komponenter for å unngå duplisering av:
 * - Data-henting (useRekrutteringstreff, useInnlegg)
 * - Beregning av derived state (avlyst, harPublisert, etc.)
 * - Oppdatering av data
 */
export const useRekrutteringstreffData = (): RekrutteringstreffData => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);
  const { data: innlegg } = useInnlegg(rekrutteringstreffId);

  const treffDataMedHendelser = rekrutteringstreffHook.data;
  const treff = treffDataMedHendelser?.rekrutteringstreff;
  const hendelser = treffDataMedHendelser?.hendelser;
  const fraTid = treff?.fraTid;
  const tilTid = treff?.tilTid;

  const avlyst = treff?.status === RekrutteringstreffStatus.AVLYST;
  const harPublisert =
    treff?.status === RekrutteringstreffStatus.PUBLISERT ||
    treff?.status === RekrutteringstreffStatus.FULLFØRT;

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

    avlyst,
    harPublisert,
    harInvitert,
    fraTidspunktHarPassert,
    tilTidspunktHarPassert,
    innleggHtmlFraBackend,

    oppdaterData,

    rekrutteringstreffHook,
  } as RekrutteringstreffData;
};
