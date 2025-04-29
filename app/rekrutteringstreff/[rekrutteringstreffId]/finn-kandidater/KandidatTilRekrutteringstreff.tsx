import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
import KandidatSøk from '../../../kandidat/KandidatSøkSide';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import * as React from 'react';

export interface KandidatTilRekrutteringstreffProps {
  rekrutteringstreff?: RekrutteringstreffDTO;
}

const KandidatTilRekrutteringstreff: React.FC<
  KandidatTilRekrutteringstreffProps
> = ({ rekrutteringstreff }) => {
  const [alleredeLagtTil, setAlleredeLagtTil] = React.useState<string[]>([]);

  const kandidatlisteHook = useKandidatliste(rekrutteringstreff?.id);

  React.useEffect(() => {
    if (kandidatlisteHook?.data?.kandidater) {
      const listeOverValgteKandidater = kandidatlisteHook.data.kandidater
        .map((kandidat) => kandidat.kandidatnr)
        .filter((id): id is string => id !== null);

      setAlleredeLagtTil(listeOverValgteKandidater);
    }
  }, [kandidatlisteHook?.data?.kandidater]);

  return (
    <>
      <KandidatSøk
        rekrutteringstreffId={rekrutteringstreff?.id}
        alleredeLagtTil={alleredeLagtTil}
      />
    </>
  );
};

export default KandidatTilRekrutteringstreff;
