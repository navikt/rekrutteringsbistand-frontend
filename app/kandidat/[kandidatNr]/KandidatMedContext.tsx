import { KandidatContextProvider } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import VisKandidat from '@/app/kandidat/[kandidatNr]/vis-kandidat/VisKandidat';

export interface KandidatMedContextProps {
  kandidatId: string;
}

export default function KandidatMedContext({
  kandidatId,
}: KandidatMedContextProps) {
  return (
    <KandidatContextProvider kandidatId={kandidatId}>
      <VisKandidat />
    </KandidatContextProvider>
  );
}
