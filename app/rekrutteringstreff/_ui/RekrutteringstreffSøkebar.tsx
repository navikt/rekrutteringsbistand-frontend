'use client';

import { overstigerSøkeordgrensen } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import {
  MAKS_ANTALL_SØKEORD_TREFFSØK,
  MAKS_SØKEORDTEGN_TREFFSØK,
} from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import Søkebar from '@/components/filter/Søkebar';

export default function RekrutteringstreffSøkebar() {
  const { fritekst, setFritekst } = useRekrutteringstreffSøkFilter();
  const valider = (ord: string) => {
    if (
      fritekst.includes(ord) ||
      !overstigerSøkeordgrensen([...fritekst, ord], {
        antall: MAKS_ANTALL_SØKEORD_TREFFSØK,
        tegn: MAKS_SØKEORDTEGN_TREFFSØK,
      })
    ) {
      return undefined;
    }
    return `Du kan bruke opptil ${MAKS_ANTALL_SØKEORD_TREFFSØK} søkeord med til sammen ${MAKS_SØKEORDTEGN_TREFFSØK} tegn. Fjern et søkeord før du legger til flere.`;
  };
  return <Søkebar label='Søk i treff' onSøk={setFritekst} valider={valider} />;
}
