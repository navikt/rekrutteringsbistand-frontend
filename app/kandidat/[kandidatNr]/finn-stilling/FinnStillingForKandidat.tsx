'use client';

import StillingsSøkLayout from '@/app/stilling/StillingsSøkLayout';

export interface FinnStillingForKandidatProps {
  kandidatNr: string;
}

export default function FinnStillingForKandidat({
  kandidatNr,
}: FinnStillingForKandidatProps) {
  return (
    <StillingsSøkLayout
      key={`stilling-${kandidatNr}`}
      forKandidatNr={kandidatNr}
    />
  );
}
