import { Suspense } from 'react';
import Loading from '../laoading';
import StillingsSøk from '../stillingssok/StillingsSøk';
import { StillingsSøkProvider } from '../stillingssok/StillingsSøkContext';

export default function FormidlingIndex() {
  return (
    <Suspense fallback={<Loading />}>
      <StillingsSøkProvider>
        <StillingsSøk bareFormidling />
      </StillingsSøkProvider>
    </Suspense>
  );
}
