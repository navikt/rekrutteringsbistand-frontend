'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { erEierAvTreff } from '@/app/rekrutteringstreff/_utils/eiere';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';

export const useJobbsøkerSøkEndepunkt = (id?: string) => {
  const applikasjonskontekst = useApplikasjonContext();
  const eierOgKontor = useRekrutteringstreff(id)?.data?.eierOgKontor;
  const kanHenteJobbsøkere =
    erEierAvTreff(eierOgKontor ?? [], applikasjonskontekst.brukerData.ident) ||
    applikasjonskontekst.harRolle([
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
    ]);

  return id && kanHenteJobbsøkere
    ? `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/sok`
    : null;
};
