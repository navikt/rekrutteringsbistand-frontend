'use client';

import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import LagredeSøk from '@/components/lagrede-søk/LagredeSøk';

export default function KandidatLagredeSøk() {
  const {
    lagredeSøk,
    gjeldendeFilter,
    gjeldendeSøkeord,
    frieFilterverdier,
    nullstillFiltre,
  } = useKandidatSøkFilterContext();
  if (!lagredeSøk) return null;
  return (
    <LagredeSøk
      lagredeSøk={lagredeSøk}
      gjeldendeFilter={gjeldendeFilter}
      gjeldendeFritekst={gjeldendeSøkeord}
      frieFilterverdier={frieFilterverdier}
      onBrukVanligSøk={nullstillFiltre}
    />
  );
}
