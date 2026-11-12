import FinnStillingForKandidat from '@/app/kandidat/[kandidatNr]/finn-stilling/FinnStillingForKandidat';
import JobbsøkerensStillingsSøkProvider from '@/app/kandidat/[kandidatNr]/finn-stilling/JobbsøkerensStillingsSøkProvider';

interface FinnStillingProps {
  params: Promise<{ kandidatNr: string }>;
}
export default async function FinnStillingForKandidatPage({
  params,
}: FinnStillingProps) {
  const kandidatNr = (await params).kandidatNr;

  return (
    <JobbsøkerensStillingsSøkProvider key={kandidatNr} kandidatNr={kandidatNr}>
      <FinnStillingForKandidat kandidatNr={kandidatNr} />
    </JobbsøkerensStillingsSøkProvider>
  );
}
