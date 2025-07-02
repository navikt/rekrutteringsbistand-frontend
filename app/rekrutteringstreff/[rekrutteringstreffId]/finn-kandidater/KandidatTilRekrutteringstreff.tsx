import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import TreffHeader from '../components/TreffHeader';
import KandidatSøkTabs from '@/app/kandidat/KandidatSøkTabs';
import * as React from 'react';

const KandidatTilRekrutteringstreff: React.FC = () => {
  // const [alleredeLagtTil, setAlleredeLagtTil] = React.useState<string[]>([]);

  const rekrutteringstreff = useRekrutteringstreffContext();

  // const { data: jobbsøkere } = useJobbsøkere(
  //   rekrutteringstreff.rekrutteringstreffId as string,
  // );

  // Todo skill på allerede lagt til for rekrutteringstreff og stilling
  // React.useEffect(() => {
  //   if (jobbsøkere) {
  //     const listeOverValgteJobbsøkere = jobbsøkere
  //       .map((jobbsøker) => jobbsøker.kandidatnummer)
  //       .filter((id): id is string => id !== null);

  //     setAlleredeLagtTil(listeOverValgteJobbsøkere);
  //   }
  // }, [jobbsøkere]);

  return (
    <>
      <TreffHeader endreTittel={false} />
      <KandidatSøkTabs
        rekrutteringstreffId={rekrutteringstreff?.rekrutteringstreffId}
      />
    </>
  );
};

export default KandidatTilRekrutteringstreff;
