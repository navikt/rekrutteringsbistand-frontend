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
      className='@container'
    >
      {/* Smale kort (for eksempel ved 200 % zoom) stabler status og handlinger under
          navnet, så de står likt i alle kort uansett hvor lang adressen er. */}
      <div className='flex flex-col gap-3 @xl:flex-row @xl:items-start @xl:justify-between'>
        <div className='min-w-0 [overflow-wrap:anywhere] @xl:flex-1'>
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
        <div className='flex flex-wrap items-center gap-2 whitespace-nowrap @xl:shrink-0'>
          {status && (
            <Tag data-color='info' size='medium' variant='outline'>
              {storForbokstav(status)}
            </Tag>
          )}
          {actionSlot}
        </div>
      </div>
    </Box>
  );
};

export default ArbeidsgiverKort;
