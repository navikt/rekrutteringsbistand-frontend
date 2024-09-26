import { PencilIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button, Checkbox, Table } from '@navikt/ds-react';
import { format } from 'date-fns';
import * as React from 'react';
import SWRLaster from '../../../../components/SWRLaster';
import {
  applySortDirection,
  firstOf,
  handleSort,
  hasKey,
  NestedKeys,
  TableSortState,
} from '../../../../util/tableUtils';
import {
  kandidaterSchemaDTO,
  kandidatlisteSchemaDTO,
} from '../../../api/kandidat/typer/kandidatliste.zod';
import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
import { useStillingsContext } from '../StillingsContext';

const StillingsKandidaterTabell: React.FC = () => {
  const { kandidatlisteId } = useStillingsContext();
  const hook = useKandidatliste(kandidatlisteId);
  return (
    <SWRLaster hook={hook}>
      {(data) => <StillingsKandidaterTabellVisning data={data} />}
    </SWRLaster>
  );
};

const StillingsKandidaterTabellVisning: React.FC<{
  data: kandidatlisteSchemaDTO;
}> = ({ data }) => {
  const [sort, setSort] = React.useState<TableSortState<kandidaterSchemaDTO>>();
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const kandidater = data.kandidater.sort(
    applySortDirection<kandidaterSchemaDTO>(sort),
  );

  function tableSort(sortKey?: string) {
    if (
      sortKey &&
      hasKey(firstOf(kandidater), sortKey as NestedKeys<kandidaterSchemaDTO>)
    ) {
      handleSort<kandidaterSchemaDTO>(
        sortKey as NestedKeys<kandidaterSchemaDTO>,
        setSort,
        sort,
      );
    }
  }

  return (
    <Table zebraStripes sort={sort} onSortChange={tableSort}>
      <Table.Header>
        <Table.Row>
          <Table.DataCell>
            <Checkbox
              checked={selectedRows.length === kandidater.length}
              indeterminate={
                selectedRows.length > 0 &&
                selectedRows.length !== kandidater.length
              }
              onChange={() => {
                selectedRows.length
                  ? setSelectedRows([])
                  : setSelectedRows(
                      kandidater.map(
                        ({ fodselsnr }: { fodselsnr: string }) => fodselsnr,
                      ),
                    );
              }}
              hideLabel
            >
              Velg alle rader
            </Checkbox>
          </Table.DataCell>
          <Table.ColumnHeader sortable sortKey='etternavn' scope='col'>
            Navn
          </Table.ColumnHeader>
          <Table.HeaderCell scope='col'>Fødselsnr.</Table.HeaderCell>
          <Table.ColumnHeader sortable sortKey='lagtTilAv.navn' scope='col'>
            Lagt til av
          </Table.ColumnHeader>
          <Table.ColumnHeader sortable sortKey='lagtTilTidspunkt' scope='col'>
            Dato lagt til
          </Table.ColumnHeader>
          <Table.HeaderCell scope='col'>Status og hendelser</Table.HeaderCell>
          <Table.HeaderCell scope='col'></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data?.kandidater.map((kandidat, i) => {
          return (
            <Table.Row
              key={i + kandidat.fodselsnr}
              selected={selectedRows.includes(kandidat.fodselsnr)}
            >
              <Table.DataCell>
                <Checkbox
                  hideLabel
                  checked={selectedRows.includes(kandidat.fodselsnr)}
                  // onChange={() => toggleSelectedRow(kandidat.fodselsnr)}
                  aria-labelledby={`id-${kandidat.fodselsnr}`}
                >
                  {' '}
                </Checkbox>
              </Table.DataCell>
              <Table.DataCell scope='row'>
                <span id={`id-${kandidat.fodselsnr}`}>
                  {kandidat.etternavn}, {kandidat.fornavn}
                </span>
              </Table.DataCell>
              <Table.DataCell>{kandidat.fodselsnr}</Table.DataCell>
              <Table.DataCell>
                {kandidat.lagtTilAv?.navn} ({kandidat.lagtTilAv?.ident})
              </Table.DataCell>
              <Table.DataCell>
                {format(kandidat.lagtTilTidspunkt, 'dd.MM.yyyy')}
              </Table.DataCell>
              <Table.DataCell>
                <Button
                  variant='tertiary'
                  icon={<PencilIcon title='Rediger' />}
                />
              </Table.DataCell>
              <Table.DataCell>
                <Button variant='tertiary' icon={<TrashIcon title='Slett' />} />
              </Table.DataCell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default StillingsKandidaterTabell;
