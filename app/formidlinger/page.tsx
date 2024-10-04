import { Suspense } from 'react';
import Loading from '../laoading';
import StillingsSøk from '../stillings-sok/StillingsSøk';
import { StillingsSøkProvider } from '../stillings-sok/StillingsSøkContext';

export default function FormidlingIndex() {
  return (
    <Suspense fallback={<Loading />}>
      <StillingsSøkProvider formidlinger>
        <StillingsSøk formidlinger />
      </StillingsSøkProvider>
    </Suspense>
  );
}
