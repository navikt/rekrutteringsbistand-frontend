'use client';

import { KandidatContextProvider } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import VisKandidat from '@/app/kandidat/[kandidatNr]/vis-kandidat/VisKandidat';
import KandidatlisteWrapper from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';

export interface KandidatlisteKandidatViewProps {
  kandidatId: string;
}

const KandidatlisteKandidatView = ({
  kandidatId,
}: KandidatlisteKandidatViewProps) => {
  return (
    <KandidatlisteWrapper>
      <KandidatContextProvider kandidatId={kandidatId}>
        <VisKandidat kandidatlisteKandidat={kandidatId} />
      </KandidatContextProvider>
    </KandidatlisteWrapper>
  );
};

export default KandidatlisteKandidatView;
