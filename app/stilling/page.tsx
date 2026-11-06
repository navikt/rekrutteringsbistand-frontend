'use client';

import { StillingsSøkProvider } from '@/app/stilling/StillingsSøkContext';
import StillingsSøkLayout from '@/app/stilling/StillingsSøkLayout';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingsSidePage from '@/app/stilling/[stillingsId]/page';
import Sidelaster from '@/components/layout/Sidelaster';
import WindowView from '@/components/window/WindowView';
import { Suspense } from 'react';

export default function StillingsSøkIndex() {
  return (
    <Suspense fallback={<Sidelaster />}>
      <WindowView
        param='visStillingId'
        window={(stillingsId) => (
          <StillingsContextProvider stillingsId={stillingsId}>
            <StillingsSidePage />
          </StillingsContextProvider>
        )}
      >
        <StillingsSøkProvider brukerLagredeSøk>
          <StillingsSøkLayout />
        </StillingsSøkProvider>
      </WindowView>
    </Suspense>
  );
}
