'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';

export const useJobbsøkerSøkEndepunkt = (id?: string) => {
  const applikasjonskontekst = useApplikasjonContext();
  const eiere = useRekrutteringstreff(id)?.data?.eiere;
  const kanHenteJobbsøkere =
    eiere?.includes(applikasjonskontekst.brukerData.ident) ||
    applikasjonskontekst.harRolle([
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
    ]);

  return id && kanHenteJobbsøkere
    ? `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/sok`
    : null;
};
