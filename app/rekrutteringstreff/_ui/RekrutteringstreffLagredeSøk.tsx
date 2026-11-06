'use client';

import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import LagredeSøk from '@/components/lagrede-søk/LagredeSøk';

export default function RekrutteringstreffLagredeSøk() {
  const { lagredeSøk } = useRekrutteringstreffSøkFilter();
  return <LagredeSøk lagredeSøk={lagredeSøk} />;
}
