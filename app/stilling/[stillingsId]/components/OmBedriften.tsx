import { Heading } from '@navikt/ds-react';
import * as React from 'react';

import parse from 'html-react-parser';
import Definisjon from '../components/Definisjon';
import { useStillingsContext } from '../StillingsContext';

const OmBedriften: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const employer = stillingsData.stilling?.employer;
  const kontaktInfo = stillingsData?.stilling?.contactList;

  return (
    <div>
      <Heading size='large'>Om bedriften</Heading>

      <div className='my-4'>
        {parse(
          String(stillingsData.stilling?.properties?.employerdescription ?? ''),
        )}
      </div>

      {kontaktInfo?.map((kontakt, index) => (
        <dl
          className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 print:grid print:grid-cols-3 print:gap-6'
          key={index}
        >
          <Definisjon
            tittel='Kontaktperson'
            innhold={`${kontakt.name ?? '-'} ${
              kontakt.title ? `, ${kontakt.title}` : ''
            }`}
          />
          <Definisjon tittel='Epost' innhold={kontakt.email ?? '-'} />
          <Definisjon tittel='Telefon' innhold={kontakt.phone ?? '-'} />
        </dl>
      ))}
      <dl className='grid grid-cols-1 md:grid-cols-3 gap-6 print:grid print:grid-cols-3 print:gap-6'>
        <Definisjon tittel='Nettside' />
        <Definisjon tittel='LinkedIn' />
        <Definisjon tittel='X' />
        <Definisjon
          tittel='Virksomhetsnummer'
          innhold={employer?.orgnr ?? '-'}
        />
        <Definisjon
          tittel='Sektor'
          innhold={`${stillingsData.stilling?.properties?.sector}`}
        />
      </dl>
    </div>
  );
};

export default OmBedriften;
