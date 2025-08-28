import capitalizeEmployerName from '@/app/stilling/_util/stilling-util';
import { Box, Heading, Tag } from '@navikt/ds-react';
import * as React from 'react';

interface ArbeidsgiverKortProps {
  organisasjonsnummer?: string;
  navn?: string;
  organisasjonsform?: string;
  antallAnsatte?: number;
  adresse?: ArbeidsgiverAdresse | null;
  status?: string;
  naringskoder?: naringskode[] | null;
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

export type naringskode = {
  kode?: string;
  beskrivelse?: string;
};

const ArbeidsgiverKort: React.FC<ArbeidsgiverKortProps> = ({
  navn,
  //adresse,
  status,
}) => {
  return (
    <Box.New
      background='raised'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='4'
      marginBlock='2'
      className='flex items-center justify-between'
    >
      <Heading level='3' size='xsmall'>
        {capitalizeEmployerName(navn || '')}
      </Heading>
      {/*<BodyShort size='small'>
        {adresse?.adresse}, {adresse?.postnummer} {adresse?.poststed}
      </BodyShort>*/}
      {status && (
        <Tag className={'mr-2'} size='medium' variant='info'>
          {status}
        </Tag>
      )}
    </Box.New>
  );
};

export default ArbeidsgiverKort;
