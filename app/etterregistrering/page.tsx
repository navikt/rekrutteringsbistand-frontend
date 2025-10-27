'use client';

import EtterregistreringSøkLayout from './EtterregistreringSøkLayout';
import { StillingsSøkProvider } from '@/app/stilling/StillingsSøkContext';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingsSidePage from '@/app/stilling/[stillingsId]/page';
import Sidelaster from '@/components/layout/Sidelaster';
import WindowView from '@/components/window/WindowView';
import { Suspense } from 'react';

export default function EtterregistreringIndex() {
  return (
    <WindowView
      param='visStillingId'
      window={(stillingsId) => (
        <StillingsContextProvider stillingsId={stillingsId}>
          <StillingsSidePage />
        </StillingsContextProvider>
      )}
    >
      <Suspense fallback={<Sidelaster />}>
        <StillingsSøkProvider formidlinger={true}>
          <EtterregistreringSøkLayout />
        </StillingsSøkProvider>
      </Suspense>
    </WindowView>
  );
}
