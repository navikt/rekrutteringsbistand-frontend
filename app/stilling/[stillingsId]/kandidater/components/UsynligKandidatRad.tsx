import { Table } from '@navikt/ds-react';
import * as React from 'react';
import { storForbokstavString } from '../../../../kandidat-sok/util';
import UsynligKandidatHendelseTag from './UsynligKandidatHendelsestag';

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
        {utfall && <UsynligKandidatHendelseTag utfall={utfall} />}
      </Table.DataCell>
    </Table.Row>
  );
};

export default UsynligKandidatRad;
