import { Kandidatlistestatus } from '../../../api/kandidat/schema.zod';
import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
import { useKandidatlisteInfo } from '../../../api/kandidat/useKandidatlisteInfo';
import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import Sidelaster from '../../../components/Sidelaster';
import KandidatSøk from '../../../kandidat/KandidatSøkSide';
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

  const [alleredeLagtTil, setAlleredeLagtTil] = React.useState<string[]>([]);

  const kandidatlisteHook = useKandidatliste(stillingsData?.stilling.uuid);

  const kandidatListeInformasjonHook = useKandidatlisteInfo(
    stillingsData?.stilling.uuid ?? null,
  );

  React.useEffect(() => {
    if (kandidatlisteHook?.data?.kandidater) {
      const listeOverValgteKandidater = kandidatlisteHook.data.kandidater
        .map((kandidat) => kandidat.kandidatnr)
        .filter((id): id is string => id !== null);

      setAlleredeLagtTil(listeOverValgteKandidater);
    }
  }, [kandidatlisteHook?.data?.kandidater]);

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
      <KandidatSøk
        stillingsId={stillingsData?.stilling.uuid}
        alleredeLagtTil={alleredeLagtTil}
      />
    </>
  );
};

export default KandidatTilStilling;
