import { useKandidatliste } from '../../api/kandidat/useKandidatliste';
import SWRLaster from '../../components/SWRLaster';
import { useStillingsContext } from '../../stilling/[stillingsId]/StillingsContext';
import KandidatlisteWrapper from '../../stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';
import KandidatVisningSidebar from '../../stilling/[stillingsId]/kandidatliste/components/KandidatVisningSidebar/KandidatVisningSidebar';
import * as React from 'react';

export interface KandidatListeKandidatProps {
  kandidatnr: string;
}

const KandidatListeKandidat: React.FC<KandidatListeKandidatProps> = ({
  kandidatnr,
}) => {
  const { stillingsData } = useStillingsContext();

  const kandidatlisteHook = useKandidatliste(stillingsData.stilling.uuid);

  return (
    <SWRLaster hooks={[kandidatlisteHook]}>
      {(kandidatliste) => {
        if (!kandidatliste) {
          return <div> ingen kandidatliste</div>;
        }

        if (
          kandidatliste.kandidater.some(
            (kandidat) => kandidat.kandidatnr === kandidatnr,
          )
        ) {
          return (
            <KandidatlisteWrapper>
              <KandidatVisningSidebar kandidatnr={kandidatnr} />
            </KandidatlisteWrapper>
          );
        }
        return <div> Kandidat ikke i liste </div>;
      }}
    </SWRLaster>
  );
};

export default KandidatListeKandidat;
