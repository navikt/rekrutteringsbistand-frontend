import { BodyLong, Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useStillingsContext } from '../StillingsContext';

import parse from 'html-react-parser';
import Definisjon from '../components/Definisjon';

const OmBedriften: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const employer = stillingsData.stilling?.employer;
  const { name, title, phone, email } = stillingsData?.stilling?.contactList[0];

  return (
    <div>
      <Heading size='large'>Om bedriften</Heading>

      <BodyLong className='my-4'>
        {parse(stillingsData.stilling?.properties?.employerdescription ?? '')}
      </BodyLong>

      <dl className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Definisjon tittel='Kontaktperson' innhold={`${name}, ${title}`} />
        <Definisjon tittel='Epost' innhold={`${email}`} />
        <Definisjon tittel='Telefon' innhold={`${phone}`} />
        <Definisjon tittel='Nettside' />
        <Definisjon tittel='LinkedIn' />
        <Definisjon tittel='Twitter' />
        <Definisjon tittel='Virksomhetsnummer' innhold={`${employer?.orgnr}`} />
        <Definisjon
          tittel='Sektor'
          innhold={`${stillingsData.stilling?.properties?.sector}`}
        />
      </dl>
    </div>
  );
};

export default OmBedriften;
