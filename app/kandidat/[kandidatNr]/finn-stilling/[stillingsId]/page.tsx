import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingsSidePage from '@/app/stilling/[stillingsId]/page';

export default function StillingForKandidat({
  params,
}: {
  params: { kandidatNr: string; stillingsId: string };
}) {
  return (
    <StillingsContextProvider stillingsId={params.stillingsId}>
      <StillingsSidePage kandidatId={params.kandidatNr} />
    </StillingsContextProvider>
  );
}
