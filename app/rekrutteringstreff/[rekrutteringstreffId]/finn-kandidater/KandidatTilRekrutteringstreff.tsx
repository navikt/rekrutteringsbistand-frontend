import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import KandidatSøkTabs from '@/app/kandidat/KandidatSøkTabs';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { FC, useEffect, useState } from 'react';

const KandidatTilRekrutteringstreff: FC = () => {
  const [alleredeLagtTilTreff, setAlleredeLagtTil] = useState<string[]>([]);

  const rekrutteringstreff = useRekrutteringstreffContext();

  const { data: jobbsøkere } = useJobbsøkere(
    rekrutteringstreff.rekrutteringstreffId as string,
  );

  useEffect(() => {
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
        alleredeLagtTilTreff={alleredeLagtTilTreff}
        rekrutteringstreffId={rekrutteringstreff?.rekrutteringstreffId}
      />
    </>
  );
};

export default KandidatTilRekrutteringstreff;
