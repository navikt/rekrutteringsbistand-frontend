'use client';

import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import Søkebar from '@/components/filter/Søkebar';

export default function StillingSøkebar() {
  const { setFritekst } = useStillingsSøkFilter();
  return <Søkebar label='Søk i stillinger' onSøk={setFritekst} />;
}
