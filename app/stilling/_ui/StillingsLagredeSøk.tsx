'use client';

import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import LagredeSøk from '@/components/lagrede-søk/LagredeSøk';

export default function StillingsLagredeSøk() {
  const { lagredeSøk, gjeldendeFilter, fritekst, nullstillFiltre } =
    useStillingsSøkFilter();
  if (!lagredeSøk) return null;
  return (
    <LagredeSøk
      lagredeSøk={lagredeSøk}
      gjeldendeFilter={gjeldendeFilter}
      gjeldendeFritekst={fritekst}
      onBrukVanligSøk={nullstillFiltre}
    />
  );
}
