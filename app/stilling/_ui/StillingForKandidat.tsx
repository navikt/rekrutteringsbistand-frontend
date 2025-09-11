import { useKandidatsammendrag } from '@/app/api/kandidat-sok/useKandidatsammendrag';
import SWRLaster from '@/components/SWRLaster';
import { Heading } from '@navikt/ds-react';

export interface StillingForKandidatProps {
  kandidatnr: string;
}

const StillingForKandidat: React.FC<StillingForKandidatProps> = ({
  kandidatnr,
}) => {
  const kandidatSammendragHook = useKandidatsammendrag(kandidatnr);

  return (
    <SWRLaster hooks={[kandidatSammendragHook]}>
      {(data) => (
        <div className='mb-4'>
          <Heading size='medium'>
            Finner stilling for: {data.fornavn} {data.etternavn}
          </Heading>
        </div>
      )}
    </SWRLaster>
  );
};

export default StillingForKandidat;
