'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  JobbsøkerSøkResponsSchema,
  type JobbsøkerSøkResponsDTO,
  type JobbsøkerSøkTreffDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useSWRPost } from '@/app/api/useSWRPost';
import { erEierAvTreff } from '@/app/rekrutteringstreff/_utils/eiere';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';

export type JobbsøkerDTO = JobbsøkerSøkTreffDTO;
export type JobbsøkereResponseDTO = JobbsøkerSøkResponsDTO;

export const useJobbsøkere = (id?: string, refreshInterval?: number) => {
  const applikasjonskontekst = useApplikasjonContext();
  const eierOgKontor = useRekrutteringstreff(id)?.data?.eierOgKontor;

  const kanHenteJobbsøkere =
    erEierAvTreff(eierOgKontor ?? [], applikasjonskontekst.brukerData.ident) ||
    applikasjonskontekst.harRolle([
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
    ]);

  const endpoint =
    id && kanHenteJobbsøkere
      ? `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/sok`
      : null;

  const body = endpoint ? { side: 1, antallPerSide: 100 } : null;

  return useSWRPost(endpoint, JobbsøkerSøkResponsSchema, body, {
    nonImmutable: !!refreshInterval,
    refreshInterval,
  });
};
