import { Buildings3Icon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading, Link, Tag } from '@navikt/ds-react';
import * as React from 'react';

interface JobbsøkerKortProps {
  fødselsnummer?: string;
  kandidatnummer: string | null;
  fornavn: string;
  etternavn: string;
  navKontor?: string;
  veileder?: Veileder | null;
  datoLagtTil?: string;
  lagtTilAv?: string;
  status?: string;
}

export type Veileder = {
  navn?: string;
  navIdent?: string;
};

const JobbsøkerKort: React.FC<JobbsøkerKortProps> = ({
  fornavn,
  etternavn,
  kandidatnummer,
  navKontor,
  veileder,
  datoLagtTil,
  lagtTilAv,
  status,
}) => {
  const storForbokstavFlereOrd = (s: string | null | undefined) => {
    if (!s || s.length === 0) return s;
    return s
      .split(' ')
      .map((o) => (o ? o[0].toUpperCase() + o.substring(1).toLowerCase() : o))
      .join(' ');
  };

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
      <div>
        <Heading size='small'>
          <Link href={`/kandidat/${kandidatnummer}`}>
            {storForbokstavFlereOrd(etternavn)},{' '}
            {storForbokstavFlereOrd(fornavn)}
          </Link>
        </Heading>
        <BodyShort
          size='small'
          className='text-text-subtle flex gap-6 items-center mt-1'
        >
          {navKontor && (
            <span className='flex items-center gap-1'>
              <Buildings3Icon fontSize='1.25rem' />
              {navKontor}
            </span>
          )}
          {veileder?.navn && (
            <span className='flex items-center gap-1'>
              <PersonIcon fontSize='1.25rem' />
              Følges opp av {veileder.navn}{' '}
              {veileder.navIdent && `(${veileder.navIdent})`}
            </span>
          )}
          {lagtTilAv && datoLagtTil && (
            <span>
              Lagt til av {lagtTilAv}, {datoLagtTil}
            </span>
          )}
        </BodyShort>
      </div>

      {status && (
        <Tag className={'mr-2'} size='medium' variant='info'>
          {status}
        </Tag>
      )}
    </Box.New>
  );
};

export default JobbsøkerKort;
