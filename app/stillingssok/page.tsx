'use client';
import StillingsSøk from './StillingsSøk';
import { StillingsSøkProvider } from './StillingsSøkContext';

export default function StillingsSøkIndex() {
  return (
    <StillingsSøkProvider>
      <StillingsSøk />
    </StillingsSøkProvider>
  );
}
