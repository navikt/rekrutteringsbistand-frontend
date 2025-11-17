import { KandidatContextProvider } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import VisKandidat from '@/app/kandidat/[kandidatNr]/vis-kandidat/VisKandidat';

export interface KandidatMedContextProps {
  kandidatId: string;
  stillingsId?: string;
}

export default function KandidatMedContext({
  kandidatId,
  stillingsId,
}: KandidatMedContextProps) {
  return (
    <KandidatContextProvider kandidatId={kandidatId}>
      <VisKandidat stillingsId={stillingsId} />
    </KandidatContextProvider>
  );
}
