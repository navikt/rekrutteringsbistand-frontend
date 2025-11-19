import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingsSidePage from '@/app/stilling/[stillingsId]/page';

export default async function StillingForKandidat({
  params,
}: {
  params: Promise<{ kandidatNr: string; stillingsId: string }>;
}) {
  const { kandidatNr, stillingsId } = await params;

  return (
    <StillingsContextProvider stillingsId={stillingsId}>
      <StillingsSidePage kandidatId={kandidatNr} />
    </StillingsContextProvider>
  );
}
