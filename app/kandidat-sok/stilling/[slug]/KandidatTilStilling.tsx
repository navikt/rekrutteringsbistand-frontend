import { Alert, Heading, Link } from '@navikt/ds-react';
import * as React from 'react';
import { Kandidatlistestatus } from '../../../api/kandidat/schema.zod';
import { useKandidatlisteInfo } from '../../../api/kandidat/useKandidatlisteInfo';
import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import Sidelaster from '../../../components/Sidelaster';
import KandidatSøk from '../../page';
import { useFinnKandidatForStilling } from './useFinnKandidatForStilling';

export interface KandidatTilStillingProps {
  stillingsData?: StillingsDataDTO;
}

const KandidatTilStilling: React.FC<KandidatTilStillingProps> = ({
  stillingsData,
}) => {
  const { isLoading } = useFinnKandidatForStilling(stillingsData);
  const kandidatListeInformasjonHook = useKandidatlisteInfo(
    stillingsData?.stilling.uuid ?? null,
  );
  if (kandidatListeInformasjonHook.isLoading || isLoading) {
    return <Sidelaster />;
  }

  return (
    <>
      {stillingsData?.stilling.uuid && (
        <div className='mb-4'>
          <div className='flex justify-between'>
            <Heading size='medium'>
              Finner kandidater for stillingen {stillingsData.stilling.title}
            </Heading>
            <Link
              href={`/stilling/${stillingsData?.stilling.uuid}?visFane=kandidater`}
            >
              Tilbake til kandidatliste
            </Link>
          </div>
          <hr />
        </div>
      )}
      {!kandidatListeInformasjonHook.data?.kandidatlisteId && (
        <Alert variant='error'>
          Det er ingen kandidatlister knyttet til stillingen, så du kan ikke
          legge til kandidater.
        </Alert>
      )}
      {kandidatListeInformasjonHook.data?.kandidatlisteStatus ===
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
