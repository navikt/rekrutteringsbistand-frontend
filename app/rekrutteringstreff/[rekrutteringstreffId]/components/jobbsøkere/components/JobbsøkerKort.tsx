import { storForbokstavString } from '@/app/kandidat/util';
import { BodyShort, Box, Heading } from '@navikt/ds-react';
import * as React from 'react';

interface JobbsøkerKortProps {
  fødselsnummer?: string;
  fornavn?: string;
  etternavn?: string;
  adresse?: JobbsøkerAdresse | null;
}

export type JobbsøkerAdresse = {
  adresse?: string;
  postnummer?: string;
  poststed?: string;
  kommune?: string;
  kommunenummer?: string;
  land?: string;
  landkode?: string;
};

const JobbsøkerKort: React.FC<JobbsøkerKortProps> = ({
  fornavn,
  etternavn,
  adresse,
}) => {
  return (
    <Box.New
      background='raised'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='4'
    >
      <Heading level='3' size='xsmall'>
        {storForbokstavString(etternavn ?? '')},{' '}
        {storForbokstavString(fornavn ?? '')}
      </Heading>
      <BodyShort size='small'>
        {adresse?.adresse}, {adresse?.postnummer} {adresse?.poststed}
      </BodyShort>
    </Box.New>
  );
};

export default JobbsøkerKort;
