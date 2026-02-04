import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import KandidatSøkResultat from '@/app/kandidat/KandidatSøkResultat';
import KandidatSøkTabs from '@/app/kandidat/KandidatSøkTabs';
import KandidatSøkChips from '@/app/kandidat/_ui/KandidatSøkChips';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { FC, useMemo } from 'react';

const KandidatTilRekrutteringstreff: FC = () => {
  const rekrutteringstreff = useRekrutteringstreffContext();

  const { data: jobbsøkereData } = useJobbsøkere(
    rekrutteringstreff.rekrutteringstreffId as string,
  );
  const jobbsøkere = jobbsøkereData?.jobbsøkere;

  const alleredeLagtTilTreff = useMemo(() => {
    if (!jobbsøkere) return [];

    return jobbsøkere.map((jobbsøker) => jobbsøker.fødselsnummer);
  }, [jobbsøkere]);

  return (
    <>
      <KandidatSøkResultat
        alleredeLagtTilTreff={alleredeLagtTilTreff}
        rekrutteringstreffId={rekrutteringstreff?.rekrutteringstreffId}
      />
    </>
  );
};

export default KandidatTilRekrutteringstreff;
