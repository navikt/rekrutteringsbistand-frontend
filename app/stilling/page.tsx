'use client';

import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { StillingsSøkProvider } from '@/app/stilling/StillingsSøkContext';
import StillingsSøkLayout from '@/app/stilling/StillingsSøkLayout';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingsSidePage from '@/app/stilling/[stillingsId]/page';
import { EKSCLUDERTE_STANDARDSOK_PARAMETERE } from '@/app/stilling/_ui/standardsøk/standardSokUtils';
import Sidelaster from '@/components/layout/Sidelaster';
import WindowView from '@/components/window/WindowView';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

export default function StillingsSøkIndex() {
  const searchParams = useSearchParams();
  const brukerStandardSøkData = useUseBrukerStandardSøk();

  useEffect(() => {
    if (
      searchParams.get('brukStandardsok') !== null &&
      !brukerStandardSøkData.isLoading
    ) {
      const newSearch =
        brukerStandardSøkData.data?.søk ||
        'publisert=intern&statuser=publisert';

      const eksludert = EKSCLUDERTE_STANDARDSOK_PARAMETERE;
      const urlSearchParams = new URLSearchParams(newSearch);
      eksludert.forEach((param) => {
        if (urlSearchParams.has(param)) {
          urlSearchParams.delete(param);
        }
      });

      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${urlSearchParams.toString()}`,
      );
    }
  }, [searchParams, brukerStandardSøkData]);

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
        <StillingsSøkProvider>
          <StillingsSøkLayout />
        </StillingsSøkProvider>
      </WindowView>
    </Suspense>
  );
}
