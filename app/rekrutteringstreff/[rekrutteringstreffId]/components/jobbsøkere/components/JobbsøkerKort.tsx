import { BodyShort, Box, Heading, Link } from '@navikt/ds-react';
import * as React from 'react';

interface JobbsøkerKortProps {
  fødselsnummer?: string;
  kandidatnummer: string | null;
  fornavn: string;
  etternavn: string;
  navKontor?: string;
  veileder?: Veileder | null;
}

export type Veileder = {
  navn?: string;
  navIdent?: string;
  navKontor?: string;
};

const JobbsøkerKort: React.FC<JobbsøkerKortProps> = ({
  fornavn,
  etternavn,
  kandidatnummer,
  navKontor,
  veileder,
}) => {
  const storForbokstavFlereOrd = (s: string | null | undefined) => {
    if (!s || s.length === 0) return s;
    return s
      .split(' ')
      .map((o) =>
        o.length > 0 ? o[0].toUpperCase() + o.substring(1).toLowerCase() : o,
      )
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
    >
      <Heading className='underline' size='small'>
        <Link href={`/kandidat/${kandidatnummer}`}>
          {storForbokstavFlereOrd(etternavn ?? '')},{' '}
          {storForbokstavFlereOrd(fornavn ?? '')}
        </Link>
      </Heading>
      <BodyShort size='small'>
        {navKontor && `${navKontor}`}{' '}
        {veileder?.navn &&
          `${veileder.navn} (${veileder.navIdent ? veileder.navIdent : 'Ukjent nav-ident'})`}
      </BodyShort>
    </Box.New>
  );
};

export default JobbsøkerKort;
