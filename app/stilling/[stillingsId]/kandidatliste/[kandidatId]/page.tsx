import KandidatlisteKandidatView from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteKandidatView';

export default async function KandidatlisteKandidatIndex({
  params,
}: {
  params: Promise<{ stillingsId: string; kandidatId: string }>;
}) {
  const { kandidatId } = await params;

  return <KandidatlisteKandidatView kandidatId={kandidatId} />;
}
