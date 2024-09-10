import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useStillingsContext } from '../StillingsContext';

import Definisjon from './Definisjon';

const OmAnnonsen: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const innhold = stillingsData.stilling?.properties;

  if (!innhold) {
    return null;
  }
  return (
    <div className='mt-4'>
      <Heading size='large' className='my-4'>
        Om annonsen
      </Heading>

      <dl className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Definisjon tittel='TBD' innhold='TBD' />
        <Definisjon tittel='TBD' innhold='TBD' />
        <Definisjon tittel='TBD' innhold='TBD' />
        <Definisjon tittel='TBD' innhold='TBD' />
        <Definisjon tittel='TBD' innhold='TBD' />
        <Definisjon tittel='TBD' innhold='TBD' />
        <Definisjon tittel='TBD' innhold='TBD' />
        <Definisjon tittel='TBD' innhold='TBD' />
        <Definisjon tittel='TBD' innhold='TBD' />
      </dl>
    </div>
  );
};

export default OmAnnonsen;
