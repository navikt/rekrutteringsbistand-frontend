import capitalizeEmployerName from '@/app/stilling/stilling-util';
import { BodyShort, Box, Heading } from '@navikt/ds-react';
import * as React from 'react';

interface ArbeidsgiverKortProps {
  organisasjonsnummer?: string;
  navn?: string;
  organisasjonsform?: string;
  antallAnsatte?: number;
  adresse?: ArbeidsgiverAdresse | null;
}

export type ArbeidsgiverAdresse = {
  adresse?: string;
  postnummer?: string;
  poststed?: string;
  kommune?: string;
  kommunenummer?: string;
  land?: string;
  landkode?: string;
};

const ArbeidsgiverKort: React.FC<ArbeidsgiverKortProps> = ({
  navn,
  adresse,
}) => {
  return (
    <Box.New
      background='raised'
      borderColor='neutral-subtleA'
      borderRadius='large'
      borderWidth='1'
    >
      <Heading level='3' size='xsmall'>
        {capitalizeEmployerName(navn || '')}
      </Heading>
      <BodyShort size='small'>
        {adresse?.adresse}, {adresse?.postnummer} {adresse?.poststed}
      </BodyShort>
    </Box.New>
  );
};

export default ArbeidsgiverKort;
