import { Kandidatlistestatus } from '../../../api/kandidat/schema.zod';
import { useKandidatlisteInfo } from '../../../api/kandidat/useKandidatlisteInfo';
import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import Sidelaster from '../../../components/Sidelaster';
import KandidatSøk from '../../../kandidat-sok/page';
import { useFinnKandidatForStilling } from './useFinnKandidatForStilling';
import { Alert } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatTilStillingProps {
  stillingsData?: StillingsDataDTO;
}

const KandidatTilStilling: React.FC<KandidatTilStillingProps> = ({
  stillingsData,
}) => {
  useFinnKandidatForStilling(stillingsData);
  const kandidatListeInformasjonHook = useKandidatlisteInfo(
    stillingsData?.stilling.uuid ?? null,
  );

  if (kandidatListeInformasjonHook?.isLoading) {
    return <Sidelaster />;
  }

  return (
    <>
      {!kandidatListeInformasjonHook?.data?.kandidatlisteId && (
        <Alert variant='error'>
          Det er ingen kandidatlister knyttet til stillingen, så du kan ikke
          legge til kandidater.
        </Alert>
      )}
      {kandidatListeInformasjonHook?.data?.kandidatlisteStatus ===
        Kandidatlistestatus.Lukket && (
        <Alert variant='error'>
          Kandidatliste er lukket, så du kan ikke legge til kandidater.
        </Alert>
      )}
      <KandidatSøk stillingsId={stillingsData?.stilling.uuid} />
    </>
  );
};

export default KandidatTilStilling;
