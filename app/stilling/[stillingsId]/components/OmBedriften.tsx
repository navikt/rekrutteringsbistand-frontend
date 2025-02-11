import * as React from 'react';

import parse from 'html-react-parser';
import capitalizeEmployerName from '../../stilling-util';
import Definisjon from '../components/Definisjon';
import { useStillingsContext } from '../StillingsContext';
import OmStillingBoks from './OmStillingBoks';

const OmBedriften: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const employer = stillingsData.stilling?.employer;

  return (
    <OmStillingBoks
      tittel={`Om ${capitalizeEmployerName(employer?.name ?? '-')}`}
      kontaktpersoner
      innhold={
        <>
          {parse(
            String(
              stillingsData.stilling?.properties?.employerdescription ?? '-',
            ),
          )}
        </>
      }
      gridInnhold={
        <>
          <Definisjon tittel='Nettside' />
          <Definisjon tittel='LinkedIn' />
          <Definisjon tittel='X (Twitter)' />
          <Definisjon
            tittel='Organisasjonsnummer'
            innhold={employer?.orgnr ?? '-'}
          />
          <Definisjon
            tittel='Sektor'
            innhold={stillingsData.stilling?.properties?.sector ?? '-'}
          />
        </>
      }
    />
  );
};

export default OmBedriften;
