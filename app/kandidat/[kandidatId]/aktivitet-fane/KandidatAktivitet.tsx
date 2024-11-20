import { Table } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatListeoversikt } from '../../../api/kandidat/useKandidatListeoversikt';
import SWRLaster from '../../../components/SWRLaster';
import { useKandidatContext } from '../KandidatContext';

const KandidatAktivitet: React.FC = () => {
  const { kandidatId } = useKandidatContext();

  const hook = useKandidatListeoversikt(kandidatId);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope='col'>Navn</Table.HeaderCell>
          <Table.HeaderCell scope='col'>Fødselsnr.</Table.HeaderCell>
          <Table.HeaderCell scope='col'>Start</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <SWRLaster hook={hook}>
          {(data) => {
            return <div>hei</div>;
          }}
        </SWRLaster>
        {/* {data.map(({ name, fnr, start }, i) => {
          return (
            <Table.Row key={i + fnr}>
              <Table.HeaderCell scope='row'>{name}</Table.HeaderCell>
              <Table.DataCell>{fnr}</Table.DataCell>
              <Table.DataCell>{format(new Date(start))}</Table.DataCell>
            </Table.Row>
          );
        })} */}
      </Table.Body>
    </Table>
  );
};

export default KandidatAktivitet;
