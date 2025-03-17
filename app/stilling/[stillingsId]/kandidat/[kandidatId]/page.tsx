import KandidatForStilling from './KandidatForStilling';

export default async function KandidatIKontekstAvStilling(
  params: Promise<{ kandidatId: string }>,
) {
  const kandidatId = (await params).kandidatId;
  return (
    <>
      <KandidatForStilling kandidatId={kandidatId} />
    </>
  );
}
