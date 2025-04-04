import { storForbokstavString } from '@/app/kandidat/util';
import { BodyShort, Box, Heading } from '@navikt/ds-react';
import * as React from 'react';

interface JobbsøkerKortProps {
  fødselsnummer?: string;
  kandidatnummer?: string;
  fornavn?: string;
  etternavn?: string;
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
  navKontor,
  veileder,
}) => {
  return (
    <Box.New
      background='raised'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='4'
      marginBlock='2'
    >
      <Heading level='3' size='xsmall'>
        {storForbokstavString(etternavn ?? '')},{' '}
        {storForbokstavString(fornavn ?? '')}
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
