import FinnStillingForKandidat from '@/app/kandidat/[kandidatNr]/finn-stilling/FinnStillingForKandidat';
import { StillingsSøkProvider } from '@/app/stilling/StillingsSøkContext';

interface FinnStillingProps {
  params: Promise<{ kandidatNr: string }>;
}
export default async function FinnStillingForKandidatPage({
  params,
}: FinnStillingProps) {
  const kandidatNr = (await params).kandidatNr;

  return (
    <StillingsSøkProvider>
      <FinnStillingForKandidat kandidatNr={kandidatNr} />
    </StillingsSøkProvider>
  );
}
