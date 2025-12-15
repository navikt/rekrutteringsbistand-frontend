import { BodyShort } from '@navikt/ds-react';
import { FC } from 'react';

export const ManglendeTreffFeilmelding: FC = () => {
  return (
    <div className='py-8 text-center'>
      <BodyShort>Kunne ikke laste rekrutteringstreff</BodyShort>
    </div>
  );
};
