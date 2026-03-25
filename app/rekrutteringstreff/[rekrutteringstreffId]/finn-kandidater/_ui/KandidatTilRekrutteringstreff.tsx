import { useJobbsøkerFodselsnumre } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import KandidatSøkResultat from '@/app/kandidat/KandidatSøkResultat';
import KandidatSøkChips from '@/app/kandidat/_ui/KandidatSøkChips';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { FC } from 'react';

const KandidatTilRekrutteringstreff: FC = () => {
  const rekrutteringstreff = useRekrutteringstreffContext();

  const { data: fodselsnumre } = useJobbsøkerFodselsnumre(
    rekrutteringstreff.rekrutteringstreffId as string,
  );

  return (
    <>
      <KandidatSøkResultat
        alleredeLagtTilTreff={fodselsnumre ?? []}
        rekrutteringstreffId={rekrutteringstreff?.rekrutteringstreffId}
      />
    </>
  );
};

export default KandidatTilRekrutteringstreff;
