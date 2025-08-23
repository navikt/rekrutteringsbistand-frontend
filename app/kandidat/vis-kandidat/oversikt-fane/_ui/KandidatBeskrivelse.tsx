import { BodyLong, Heading } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatBeskrivelseProps {
  kandidatSammendrag?: string | null;
}

const KandidatBeskrivelse: React.FC<KandidatBeskrivelseProps> = ({
  kandidatSammendrag,
}) => {
  if (!kandidatSammendrag) {
    return null;
  }
  return (
    <>
      <Heading size='medium' className='mb-4'>
        Sammendrag
      </Heading>
      <BodyLong> {kandidatSammendrag} </BodyLong>
    </>
  );
};

export default KandidatBeskrivelse;
