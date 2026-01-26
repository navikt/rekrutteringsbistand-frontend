import KandidatMedContext from '@/app/kandidat/[kandidatNr]/KandidatMedContext';

export default async function KandidatForStilling({
  params,
}: {
  params: Promise<{ kandidatId: string; stillingsId: string }>;
}) {
  const { kandidatId } = await params;

  return <KandidatMedContext kandidatId={kandidatId} />;
}
