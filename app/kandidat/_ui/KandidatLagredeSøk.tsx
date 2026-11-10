'use client';

import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import LagredeSøk from '@/components/lagrede-søk/LagredeSøk';

export default function KandidatLagredeSøk() {
  const { lagredeSøk } = useKandidatSøkFilterContext();
  return <LagredeSøk lagredeSøk={lagredeSøk} />;
}
