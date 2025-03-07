import { storForbokstavString } from '../../../../kandidat/util';
import { utfallsEndringPresentasjon } from './KandidatHendelse';
import { UtfallsEndringTyper } from './KandidatTyper';
import UsynligKandidatHendelseTag from './UsynligKandidatHendelsestag';
import { Table } from '@navikt/ds-react';
import * as React from 'react';

export interface UsynligKandidatRadProps {
  fornavn?: string;
  etternavn?: string;
  utfall?: string;
}

const UsynligKandidatRad: React.FC<UsynligKandidatRadProps> = ({
  fornavn,
  etternavn,
  utfall,
}) => {
  const utfallVisning = utfallsEndringPresentasjon(
    utfall as UtfallsEndringTyper,
  );
  return (
    <Table.Row>
      <Table.DataCell colSpan={2} />
      <Table.DataCell>
        {storForbokstavString(etternavn ?? '')},{' '}
        {storForbokstavString(fornavn ?? '')}
      </Table.DataCell>
      <Table.DataCell colSpan={2}>
        Ikke synlig i Rekrutteringsbistand
      </Table.DataCell>
      <Table.DataCell colSpan={3}>
        {utfall && <UsynligKandidatHendelseTag utfall={utfallVisning} />}
      </Table.DataCell>
    </Table.Row>
  );
};

export default UsynligKandidatRad;
