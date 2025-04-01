import { BodyShort, Heading } from '@navikt/ds-react';
import * as React from 'react';

export interface DeltakereProps {
  children?: React.ReactNode | undefined;
}

const Jobbsøkere: React.FC<DeltakereProps> = () => {
  return (
    <div className='p-4'>
      <Heading level='2' size='medium' className='mb-2'>
        Deltakere
      </Heading>
      <BodyShort>TODO</BodyShort>
    </div>
  );
};

export default Jobbsøkere;
