'use client';

import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import Søkebar from '@/components/filter/Søkebar';

export default function RekrutteringstreffSøkebar() {
  const { setFritekst } = useRekrutteringstreffSøkFilter();
  return <Søkebar label='Søk i rekrutteringstreff' onSøk={setFritekst} />;
}
