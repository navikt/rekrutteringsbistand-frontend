import { KandidatContextProvider } from '@/app/kandidat/vis-kandidat/KandidatContext';
import VisKandidat from '@/app/kandidat/vis-kandidat/VisKandidat';

export default function KanddidatForStilling({
  params,
}: {
  params: { kandidatId: string; stillingsId: string };
}) {
  return (
    <KandidatContextProvider kandidatId={params.kandidatId}>
      <VisKandidat />
    </KandidatContextProvider>
  );
}
