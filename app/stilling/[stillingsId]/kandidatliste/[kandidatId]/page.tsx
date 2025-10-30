import { KandidatContextProvider } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import VisKandidat from '@/app/kandidat/[kandidatNr]/vis-kandidat/VisKandidat';
import KandidatlisteWrapper from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';

export interface pageProps {
  kandidatId: string;
}

export default function KandidatlisteKandidatIndex({
  params,
}: {
  params: { stillingsId?: string; kandidatId: string };
}) {
  const { kandidatId } = params;

  return (
    <KandidatlisteWrapper>
      <KandidatContextProvider kandidatId={kandidatId}>
        <VisKandidat kandidatlisteKandidat={kandidatId} />
      </KandidatContextProvider>
    </KandidatlisteWrapper>
  );
}
