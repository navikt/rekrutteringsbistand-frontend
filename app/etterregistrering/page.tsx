import EtterregistreringSøkLayout from './EtterregistreringSøkLayout';
import { StillingsSøkProvider } from '@/app/stilling/StillingsSøkContext';
import Sidelaster from '@/components/layout/Sidelaster';
import { Suspense } from 'react';

export default function EtterregistreringIndex() {
  return (
    <Suspense fallback={<Sidelaster />}>
      <StillingsSøkProvider formidlinger={true}>
        <EtterregistreringSøkLayout />
      </StillingsSøkProvider>
    </Suspense>
  );
}
