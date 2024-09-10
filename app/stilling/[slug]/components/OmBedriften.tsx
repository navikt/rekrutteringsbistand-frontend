import { BodyLong, Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useStillingsContext } from '../StillingsContext';

import parse from 'html-react-parser';
import Definisjon from '../components/Definisjon';

const OmBedriften: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const innhold = stillingsData.stilling?.properties;

  if (!innhold) {
    return null;
  }
  return (
    <div>
      <Heading size='large'>Om bedriften</Heading>

      <BodyLong className='my-4'>
        {parse(innhold.employerdescription ?? '')}
      </BodyLong>

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

export default OmBedriften;
