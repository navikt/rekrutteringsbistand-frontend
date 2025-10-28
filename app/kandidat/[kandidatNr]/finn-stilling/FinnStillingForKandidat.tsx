'use client';

import StillingForKandidat from '@/app/kandidat/[kandidatNr]/finn-stilling/[stillingsId]/page';
import StillingsSøkLayout from '@/app/stilling/StillingsSøkLayout';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
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
          <StillingForKandidat
            params={{
              kandidatNr: kandidatNr,
              stillingsId: stillingsId,
            }}
          />
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
