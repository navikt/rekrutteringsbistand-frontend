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
  const { stillingsData, erEier } = useStillingsContext();

  const kandidatlisteHook = useKandidatliste(
    stillingsData.stilling.uuid,
    erEier,
  );

  return (
    <SWRLaster hooks={[kandidatlisteHook]} skjulFeilmelding>
      {(kandidatliste) => {
        if (!kandidatliste) {
          return null;
        }

        if (
          kandidatliste.kandidater.some(
            (kandidat) => kandidat.kandidatnr === kandidatnr,
          )
        ) {
          return (
            <div className='mb-4'>
              <KandidatlisteWrapper>
                <KandidatVisningSidebar kandidatnr={kandidatnr} />
              </KandidatlisteWrapper>
            </div>
          );
        }
        return null;
      }}
    </SWRLaster>
  );
};

export default KandidatListeKandidat;
