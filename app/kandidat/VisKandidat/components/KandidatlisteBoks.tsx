import { useKandidatlisteForEier } from '../../../api/kandidat/useKandidatlisteForEier';
import { useKandidatlisteInfo } from '../../../api/kandidat/useKandidatlisteInfo';
import SWRLaster from '../../../components/SWRLaster';
import { useStillingsContext } from '../../../stilling/[stillingsId]/StillingsContext';
import KandidatlisteWrapper from '../../../stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';
import KandidatVisningSidebar from '../../../stilling/[stillingsId]/kandidatliste/components/KandidatVisningSidebar/KandidatVisningSidebar';
import LeggKandidatTilKandidatliste from './LeggKandidatTilKandidatliste';
import { Box } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatlisteBoksProps {
  kandidatnr: string;
}

const KandidatlisteBoks: React.FC<KandidatlisteBoksProps> = ({
  kandidatnr,
}) => {
  const { stillingsData, erEier } = useStillingsContext();

  const kandidatlisteEierHook = useKandidatlisteForEier(stillingsData, erEier);
  const kandidatlisteInfoHook = useKandidatlisteInfo(
    stillingsData.stillingsinfo,
  );

  // Felles styling for boks-komponenter
  const BoksWrapper: React.FC<{
    children: React.ReactNode;
  }> = ({ children }) => (
    <Box.New
      borderColor='neutral-subtleA'
      borderWidth='1'
      padding='4'
      borderRadius='xlarge'
      className='mb-2'
    >
      {children}
    </Box.New>
  );

  return (
    <SWRLaster
      hooks={[kandidatlisteEierHook, kandidatlisteInfoHook]}
      skjulFeilmelding
    >
      {(kandidatliste, kandidatlisteInfo) => {
        if (
          kandidatliste &&
          kandidatliste.kandidater.some(
            (kandidat) => kandidat.kandidatnr === kandidatnr,
          )
        ) {
          return (
            <div className='mb-4'>
              <KandidatlisteWrapper>
                <BoksWrapper>
                  <KandidatVisningSidebar kandidatnr={kandidatnr} />
                </BoksWrapper>
              </KandidatlisteWrapper>
            </div>
          );
        } else if (kandidatlisteInfo) {
          return (
            <BoksWrapper>
              <div className='flex justify-between'>
                <div>
                  <div className='mb-2'>{stillingsData.stilling.title}</div>
                  <LeggKandidatTilKandidatliste
                    kandidatId={kandidatlisteInfo.kandidatlisteId}
                    stillingId={stillingsData.stilling.uuid}
                  />
                </div>
              </div>
            </BoksWrapper>
          );
        }
        return null;
      }}
    </SWRLaster>
  );
};

export default KandidatlisteBoks;
