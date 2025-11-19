'use client';

import StillingsSøkLayout from '@/app/stilling/StillingsSøkLayout';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingsSidePage from '@/app/stilling/[stillingsId]/page';
import WindowView from '@/components/window/WindowView';

export interface FinnStillingForKandidatProps {
  kandidatNr: string;
}

export default function FinnStillingForKandidat({
  kandidatNr,
}: FinnStillingForKandidatProps) {
  return (
    <WindowView
      param='visStillingId'
      window={(stillingsId) => (
        <StillingsContextProvider stillingsId={stillingsId}>
          <StillingsSidePage kandidatId={kandidatNr} />
        </StillingsContextProvider>
      )}
    >
      <StillingsSøkLayout
        key={`stilling-${kandidatNr}`}
        forKandidatNr={kandidatNr}
      />
    </WindowView>
  );
}
