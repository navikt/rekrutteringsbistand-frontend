import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';

export default async function KandidatForStilling({
  params,
}: {
  params: Promise<{ kandidatId: string; stillingsId: string }>;
}) {
  const { kandidatId } = await params;

  return (
    <VisJobbsøker kandidatId={kandidatId} leggTilKnapp='rekrutteringstreff' />
  );
}
