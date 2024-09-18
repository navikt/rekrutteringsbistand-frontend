import { Heading } from '@navikt/ds-react';
import * as React from 'react';

import parse from 'html-react-parser';
import Definisjon from '../components/Definisjon';
import { useStillingsContext } from '../StillingsContext';

const OmBedriften: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const employer = stillingsData.stilling?.employer;
  const kontaktInfo = stillingsData?.stilling?.contactList[0];

  return (
    <div>
      <Heading size='large'>Om bedriften</Heading>

      <div className='my-4'>
        {parse(stillingsData.stilling?.properties?.employerdescription ?? '')}
      </div>

      <dl className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Definisjon
          tittel='Kontaktperson'
          innhold={`${kontaktInfo?.name}, ${kontaktInfo?.title}`}
        />
        <Definisjon tittel='Epost' innhold={`${kontaktInfo?.email}`} />
        <Definisjon tittel='Telefon' innhold={`${kontaktInfo?.phone}`} />
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
