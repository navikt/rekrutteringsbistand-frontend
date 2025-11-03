import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import KandidatSøkResultat from '@/app/kandidat/KandidatSøkResultat';
import KandidatSøkTabs from '@/app/kandidat/KandidatSøkTabs';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { FC, useMemo } from 'react';

const KandidatTilRekrutteringstreff: FC = () => {
  const rekrutteringstreff = useRekrutteringstreffContext();

  const { data: jobbsøkere } = useJobbsøkere(
    rekrutteringstreff.rekrutteringstreffId as string,
  );

  const alleredeLagtTilTreff = useMemo(() => {
    if (!jobbsøkere) return [];

    return jobbsøkere
      .map((jobbsøker) => jobbsøker.kandidatnummer)
      .filter((id): id is string => id !== null);
  }, [jobbsøkere]);

  return (
    <>
      <KandidatSøkTabs />
      <KandidatSøkResultat
        alleredeLagtTilTreff={alleredeLagtTilTreff}
        rekrutteringstreffId={rekrutteringstreff?.rekrutteringstreffId}
      />
    </>
  );
};

export default KandidatTilRekrutteringstreff;
