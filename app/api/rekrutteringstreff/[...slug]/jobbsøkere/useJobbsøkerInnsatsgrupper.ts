'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useSWRGet } from '@/app/api/useSWRGet';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { z } from 'zod';

export const JobbsøkerInnsatsgrupperSchema = z.object({
  innsatsgrupper: z.array(z.string()),
});

export const useJobbsøkerInnsatsgrupper = (id?: string) => {
  const applikasjonskontekst = useApplikasjonContext();
  const eiere = useRekrutteringstreff(id)?.data?.eiere;

  const kanHente =
    eiere?.includes(applikasjonskontekst.brukerData.ident) ||
    applikasjonskontekst.harRolle([
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
    ]);

  const key =
    id && kanHente
      ? `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/innsatsgrupper`
      : null;

  return useSWRGet(key, JobbsøkerInnsatsgrupperSchema);
};
