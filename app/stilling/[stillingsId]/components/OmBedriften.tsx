import VisEditorTekst from '../../../components/rikteksteditor/VisEditorTekst';
import capitalizeEmployerName from '../../stilling-util';
import { useStillingsContext } from '../StillingsContext';
import Definisjon from '../components/Definisjon';
import OmStillingBoks from './OmStillingBoks';
import * as React from 'react';

const OmBedriften: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const employer = stillingsData.stilling?.employer;

  return (
    <OmStillingBoks
      tittel={`Om ${capitalizeEmployerName(employer?.name ?? '-')}`}
      kontaktpersoner
      innhold={
        <VisEditorTekst
          htmlTekst={stillingsData.stilling?.properties?.employerdescription}
        />
      }
      gridInnhold={
        <>
          {stillingsData?.stilling?.properties?.facebookpage && (
            <Definisjon
              tittel='Facebook'
              innhold={stillingsData?.stilling?.properties?.facebookpage}
            />
          )}
          {stillingsData?.stilling?.properties?.linkedinpage && (
            <Definisjon
              tittel='LinkedIn'
              innhold={stillingsData?.stilling?.properties?.linkedinpage}
            />
          )}
          {stillingsData?.stilling?.properties?.twitteraddress && (
            <Definisjon
              tittel='X (Twitter)'
              innhold={stillingsData?.stilling?.properties?.twitteraddress}
            />
          )}
          {stillingsData?.stilling?.properties?.employerhomepage && (
            <Definisjon
              tittel='Nettside'
              innhold={stillingsData?.stilling?.properties?.employerhomepage}
            />
          )}

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
