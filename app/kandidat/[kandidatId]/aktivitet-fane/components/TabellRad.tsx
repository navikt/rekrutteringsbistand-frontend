import { Table } from '@navikt/ds-react';
import { format } from 'date-fns';
import Link from 'next/link';
import * as React from 'react';
import KandidatStatusTag from '../../../../stilling/[stillingsId]/kandidater/components/StatusTag';

export interface TabellRadProps {
  erMaskert: boolean;
  dato?: string;
  tittel?: string;
  arbeidsgiver?: string;
  lagtTilAv?: string;
  status?: string;
  stilling?: string;
  stillingId?: string;
}

const TabellRad: React.FC<TabellRadProps> = ({
  dato,
  tittel,
  erMaskert,
  arbeidsgiver,
  lagtTilAv,
  status,
  stillingId,
}) => {
  return (
    <Table.Row>
      <Table.HeaderCell scope='row'>
        {dato ? format(new Date(dato), 'dd.MM.yyyy') : ''}
      </Table.HeaderCell>
      <Table.DataCell>
        {erMaskert ? (
          <span className='text-red-600'>Ingen tilgang</span>
        ) : (
          <Link href={`/stilling/${stillingId}`}>{tittel}</Link>
        )}
      </Table.DataCell>
      <Table.DataCell>{arbeidsgiver}</Table.DataCell>
      <Table.DataCell>{lagtTilAv}</Table.DataCell>
      <Table.DataCell>
        <KandidatStatusTag status={status ?? ''} />
      </Table.DataCell>
    </Table.Row>
  );
};

export default TabellRad;
