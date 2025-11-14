import KandidatMedContext from '@/app/kandidat/[kandidatNr]/KandidatMedContext';

export default async function KandidatForStilling({
  params,
}: {
  params: Promise<{ kandidatId: string; stillingsId: string }>;
}) {
  const { kandidatId, stillingsId } = await params;

  return (
    <KandidatMedContext kandidatId={kandidatId} stillingsId={stillingsId} />
  );
}
