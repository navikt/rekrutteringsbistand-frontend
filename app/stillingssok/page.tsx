import { Suspense } from 'react';
import Loading from '../laoading';
import StillingsSøk from './StillingsSøk';
import { StillingsSøkProvider } from './StillingsSøkContext';
export default function StillingsSøkIndex() {
  return (
    <Suspense fallback={<Loading />}>
      <StillingsSøkProvider>
        <StillingsSøk />
      </StillingsSøkProvider>
    </Suspense>
  );
}
