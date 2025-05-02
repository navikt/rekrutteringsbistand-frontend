import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import KandidatSøkTabs from '@/app/kandidat/KandidatSøkTabs';
import * as React from 'react';

const KandidatTilRekrutteringstreff: React.FC = () => {
  const [alleredeLagtTil, setAlleredeLagtTil] = React.useState<string[]>([]);

  const rekrutteringstreff = useRekrutteringstreffContext();

  const { data: jobbsøkere } = useJobbsøkere(
    rekrutteringstreff.rekrutteringstreffId as string,
  );

  React.useEffect(() => {
    if (jobbsøkere) {
      const listeOverValgteJobbsøkere = jobbsøkere
        .map((jobbsøker) => jobbsøker.kandidatnummer)
        .filter((id): id is string => id !== null);

      setAlleredeLagtTil(listeOverValgteJobbsøkere);
    }
  }, [jobbsøkere]);

  return (
    <>
      <KandidatSøkTabs
        rekrutteringstreffId={rekrutteringstreff?.rekrutteringstreffId}
        alleredeLagtTil={alleredeLagtTil}
      />
    </>
  );
};

export default KandidatTilRekrutteringstreff;
