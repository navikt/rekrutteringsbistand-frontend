import { Table } from '@navikt/ds-react';
import * as React from 'react';
import { storForbokstavString } from '../../../../kandidat-sok/util';
import HendelseTag, { KandidatHendelseTyper } from './HendelseTag';

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
    <Table.Row className='bg-[var(--a-surface-warning-subtle)] text-[var(--a-text-default)]'>
      <Table.DataCell colSpan={2} />
      <Table.DataCell>
        {storForbokstavString(etternavn ?? '')},{' '}
        {storForbokstavString(fornavn ?? '')}
      </Table.DataCell>
      <Table.DataCell colSpan={5}>
        Ikke synlig i Rekrutteringsbistand
      </Table.DataCell>
      <Table.DataCell colSpan={2}>
        {utfall && <HendelseTag utfall={utfall} />}
      </Table.DataCell>
    </Table.Row>
  );
};

export default UsynligKandidatRad;
