import capitalizeEmployerName from '@/app/stilling/_util/stilling-util';
import { BodyShort, Box, Heading, Tag } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface ArbeidsgiverKortProps {
  organisasjonsnummer?: string;
  navn?: string;
  organisasjonsform?: string;
  antallAnsatte?: number;
  adresse?: ArbeidsgiverAdresse | null;
  status?: string;
  naringskoder?: naringskode[] | null;
  actionSlot?: ReactNode;
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

const ArbeidsgiverKort: FC<ArbeidsgiverKortProps> = ({
  navn,
  adresse,
  status,
  organisasjonsnummer,
  actionSlot,
}) => {
  const adresseLinje = [
    adresse?.adresse,
    [adresse?.postnummer, adresse?.poststed].filter(Boolean).join(' '),
    adresse?.kommune,
  ]
    .filter((x) => x && String(x).trim().length > 0)
    .join(', ');

  return (
    <Box.New
      background='raised'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='4'
      marginBlock='2'
      className='flex items-start justify-between'
    >
      <div>
        <Heading level='3' size='xsmall'>
          {capitalizeEmployerName(navn || '')}
        </Heading>
        <BodyShort size='small' className='mt-1'>
          {organisasjonsnummer && (
            <>
              Org.nr. {organisasjonsnummer}
              {adresseLinje ? '  ' : ''}
            </>
          )}
          {adresseLinje}
        </BodyShort>
      </div>
      <div className='ml-2 self-start flex items-center gap-2'>
        {status && (
          <Tag size='medium' variant='info'>
            {status}
          </Tag>
        )}
        {actionSlot}
      </div>
    </Box.New>
  );
};

export default ArbeidsgiverKort;
