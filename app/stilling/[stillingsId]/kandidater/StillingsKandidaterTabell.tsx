import {
  MenuElipsisHorizontalCircleIcon,
  PencilIcon,
  TrashIcon,
} from '@navikt/aksel-icons';
import { Button, Checkbox, Dropdown, HStack, Table } from '@navikt/ds-react';
import { format } from 'date-fns';
import * as React from 'react';
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
} from '../../../api/kandidat/schema.zod';
import HendelseTag from './components/HendelseTag';
import StatusTag from './components/StatusTag';
import {
  Kandidatstatus,
  Kandidatutfall,
  Utfallsendring,
} from './KandidatIKandidatlisteTyper';
import { useStillingsKandidaterFilter } from './StillingsKandidaterFilterContext';
import InfoOmKandidat from './components/InfoOmKandidat';

const StillingsKandidaterTabell: React.FC<{
  search: string;
  kandidatliste: kandidatlisteSchemaDTO;
}> = ({ search, kandidatliste }) => {
  const [sort, setSort] = React.useState<TableSortState<kandidaterSchemaDTO>>();
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const { status, hendelse } = useStillingsKandidaterFilter();

  const toggleSelectedRow = (value: string) =>
    setSelectedRows((list: string[]) =>
      list.includes(value)
        ? list.filter((id) => id !== value)
        : [...list, value],
    );

  const [kandidater, setKandidater] = React.useState<kandidaterSchemaDTO[]>(
    kandidatliste.kandidater.sort(
      applySortDirection<kandidaterSchemaDTO>(sort),
    ),
  );

  React.useEffect(() => {
    const nyListe = kandidatliste.kandidater
      .filter((kandidat) => {
        const matchesSearch =
          kandidat.etternavn.toLowerCase().includes(search.toLowerCase()) ||
          kandidat.fornavn.toLowerCase().includes(search.toLowerCase()) ||
          kandidat.fodselsnr.includes(search);

        const matchesStatus =
          status.length === 0 || status.includes(kandidat.status);

        const matchesHendelse =
          hendelse.length === 0 ||
          kandidat.utfallsendringer.some((h) => hendelse.includes(h.utfall));

        return matchesSearch && matchesStatus && matchesHendelse;
      })
      .filter(
        (kandidat) =>
          kandidat.etternavn.toLowerCase().includes(search.toLowerCase()) ||
          kandidat.fornavn.toLowerCase().includes(search.toLowerCase()) ||
          kandidat.fodselsnr.includes(search),
      )
      .sort(applySortDirection<kandidaterSchemaDTO>(sort));

    setKandidater(nyListe);
  }, [search, kandidatliste.kandidater, sort, status, hendelse]);

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
          <Table.DataCell />
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
        {kandidater.map((kandidat, i) => {
          return (
            <Table.ExpandableRow
              content={<InfoOmKandidat kandidat={kandidat} />}
              key={i + kandidat.fodselsnr}
              selected={selectedRows.includes(kandidat.fodselsnr)}
            >
              <Table.DataCell>
                <Checkbox
                  hideLabel
                  checked={selectedRows.includes(kandidat.fodselsnr)}
                  onChange={() => toggleSelectedRow(kandidat.fodselsnr)}
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
                <div className='flex gap-2'>
                  <StatusTag status={kandidat.status as Kandidatstatus} />
                  <HendelseTag
                    ikkeVisÅrstall
                    utfall={kandidat.utfall as Kandidatutfall}
                    utfallsendringer={
                      kandidat.utfallsendringer as Utfallsendring[]
                    }
                    // forespørselOmDelingAvCv={
                    //     forespørselOmDelingAvCv.kind === Nettstatus.Suksess
                    //         ? forespørselOmDelingAvCv.data.gjeldendeForespørsel
                    //         : undefined
                    // }
                    forespørselOmDelingAvCv={undefined}
                    sms={null}
                  />
                </div>
              </Table.DataCell>
              <Table.DataCell align='right'>
                <Dropdown defaultOpen={i === 0}>
                  <HStack justify='end'>
                    <Button
                      as={Dropdown.Toggle}
                      icon={<MenuElipsisHorizontalCircleIcon title='Meny' />}
                      size='small'
                      variant='tertiary'
                    />
                  </HStack>
                  <Dropdown.Menu>
                    <Dropdown.Menu.GroupedList>
                      <Dropdown.Menu.GroupedList.Item onClick={() => {}}>
                        <PencilIcon title='Rediger' /> Rediger
                      </Dropdown.Menu.GroupedList.Item>
                      <Dropdown.Menu.GroupedList.Item onClick={() => {}}>
                        <TrashIcon title='Slett' /> Slett
                      </Dropdown.Menu.GroupedList.Item>
                    </Dropdown.Menu.GroupedList>
                  </Dropdown.Menu>
                </Dropdown>
              </Table.DataCell>
            </Table.ExpandableRow>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default StillingsKandidaterTabell;
