'use client';

import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import LagredeSøk from '@/components/lagrede-søk/LagredeSøk';

export default function StillingsLagredeSøk() {
  const { lagredeSøk } = useStillingsSøkFilter();
  return <LagredeSøk lagredeSøk={lagredeSøk} />;
}
