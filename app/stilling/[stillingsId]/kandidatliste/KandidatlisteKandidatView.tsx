'use client';

import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import KandidatlisteWrapper from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';

export interface KandidatlisteKandidatViewProps {
  kandidatId: string;
}

const KandidatlisteKandidatView = ({
  kandidatId,
}: KandidatlisteKandidatViewProps) => {
  return (
    <KandidatlisteWrapper>
      <VisJobbsøker kandidatId={kandidatId} />
    </KandidatlisteWrapper>
  );
};

export default KandidatlisteKandidatView;
