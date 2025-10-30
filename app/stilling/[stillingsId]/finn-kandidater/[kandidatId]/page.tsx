import KandidatMedContext from '@/app/kandidat/[kandidatNr]/KandidatMedContext';

export default function KanddidatForStilling({
  params,
}: {
  params: { kandidatId: string; stillingsId: string };
}) {
  return <KandidatMedContext kandidatId={params.kandidatId} />;
}
