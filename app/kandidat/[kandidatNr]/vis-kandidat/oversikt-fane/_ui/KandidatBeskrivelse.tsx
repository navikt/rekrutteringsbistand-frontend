import { BodyLong, Heading } from '@navikt/ds-react';
import { FC } from 'react';

export interface KandidatBeskrivelseProps {
  kandidatSammendrag?: string | null;
}

const KandidatBeskrivelse: FC<KandidatBeskrivelseProps> = ({
  kandidatSammendrag,
}) => {
  return (
    <>
      <Heading size='medium' className='mb-4'>
        Sammendrag
      </Heading>
      <BodyLong> {kandidatSammendrag ?? '-'} </BodyLong>
    </>
  );
};

export default KandidatBeskrivelse;
