import { BodyLong } from '@navikt/ds-react';
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
    <div className='py-10'>
      <BodyLong> {kandidatSammendrag} </BodyLong>
    </div>
  );
};

export default KandidatBeskrivelse;
