import { storForbokstav } from '@/app/kandidat/util';
import capitalizeEmployerName from '@/app/stilling/_util/stilling-util';
import { BodyShort, Box, Heading, Tag } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface ArbeidsgiverKortProps {
  organisasjonsnummer: string;
  navn: string;
  organisasjonsform?: string;
  antallAnsatte?: number;
  gateadresse?: string | null;
  postnummer?: string | null;
  poststed?: string | null;
  status?: string;
  naringskoder?: naringskode[] | null;
  actionSlot?: ReactNode;
}

export type naringskode = {
  kode?: string;
  beskrivelse?: string;
};

const ArbeidsgiverKort: FC<ArbeidsgiverKortProps> = ({
  navn,
  gateadresse,
  postnummer,
  poststed,
  status,
  organisasjonsnummer,
  actionSlot,
}) => {
  const adresse = `${gateadresse ? gateadresse + ', ' : ''}${postnummer || ''} ${poststed || ''}`;

  return (
    <Box
      background='neutral-softA'
      borderRadius='12'
      padding='space-16'
      marginBlock='space-8'
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
              {adresse ? '  ' : ''}
            </>
          )}
          {adresse}
        </BodyShort>
      </div>
      <div className='ml-2 flex items-center gap-2 self-start'>
        {status && (
          <Tag data-color='info' size='medium' variant='outline'>
            {storForbokstav(status)}
          </Tag>
        )}
        {actionSlot}
      </div>
    </Box>
  );
};

export default ArbeidsgiverKort;
