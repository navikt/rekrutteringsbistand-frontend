import LeggKandidatTilKandidatliste from './LeggKandidatTilKandidatliste';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useKandidatlisteInfo } from '@/app/api/kandidat/useKandidatlisteInfo';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import KandidatlisteWrapper from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';
import KandidatVisningSidebar from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatVisningSidebar/KandidatVisningSidebar';
import SWRLaster from '@/components/SWRLaster';
import { Box } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

export interface KandidatlisteBoksProps {
  kandidatnr: string;
}

const KandidatlisteBoks: FC<KandidatlisteBoksProps> = ({ kandidatnr }) => {
  const { stillingsData, erEier } = useStillingsContext();

  const kandidatlisteEierHook = useKandidatlisteForEier(stillingsData, erEier);
  const kandidatlisteInfoHook = useKandidatlisteInfo(
    stillingsData.stillingsinfo,
  );

  // Felles styling for boks-komponenter
  const BoksWrapper: FC<{
    children: ReactNode;
  }> = ({ children }) => (
    <Box.New
      borderColor='neutral-subtleA'
      background='neutral-soft'
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
      allowPartialData={true}
    >
      {(kandidatlisteEier, kandidatlisteInfo) => {
        if (
          kandidatlisteEier &&
          kandidatlisteEier.kandidater.some(
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
        }

        if (kandidatlisteInfo) {
          return (
            <BoksWrapper>
              <div className='flex justify-between'>
                <div>
                  <div className='mb-2'>{stillingsData.stilling.title}</div>
                  <LeggKandidatTilKandidatliste
                    kandidatId={kandidatnr}
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
