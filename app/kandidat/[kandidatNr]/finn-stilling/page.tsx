import FinnStillingForKandidat from '@/app/kandidat/[kandidatNr]/finn-stilling/FinnStillingForKandidat';

interface FinnStillingProps {
  params: Promise<{ kandidatNr: string }>;
}
export default async function FinnStillingForKandidatPage({
  params,
}: FinnStillingProps) {
  const kandidatNr = (await params).kandidatNr;

  return <FinnStillingForKandidat kandidatNr={kandidatNr} />;
}
