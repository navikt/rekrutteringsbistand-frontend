import OmStillingBoks from './OmStillingBoks';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import Definisjon from '@/app/stilling/[stillingsId]/_ui/Definisjon';
import capitalizeEmployerName from '@/app/stilling/_util/stilling-util';
import VisEditorTekst from '@/components/felles/rikteksteditor/VisEditorTekst';
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
