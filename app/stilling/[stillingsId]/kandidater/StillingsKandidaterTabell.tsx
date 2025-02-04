import { Checkbox, Table, Tooltip } from '@navikt/ds-react';
import { format } from 'date-fns';
import Link from 'next/link';
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
import InfoOmKandidat from './components/InfoOmKandidat';
import KandidatDropdown from './components/KandidatDropdown';
import SmsStatusPopup from './components/SendSMS/SmsStatusPopup';
import StatusTag from './components/StatusTag';
import UsynligKandidatRad from './components/UsynligKandidatRad';
import { Kandidatstatus, Kandidatutfall } from './KandidatIKandidatlisteTyper';
import { useStillingsKandidaterFilter } from './StillingsKandidaterFilterContext';

const StillingsKandidaterTabell: React.FC<{
  markerteKandidater: kandidaterSchemaDTO[];
  setMarkerteKandidater: (val: kandidaterSchemaDTO[]) => void;
  search: string;
  kandidatliste: kandidatlisteSchemaDTO;
  stillingsId: string;
  stillingskategori: string | null;
}> = ({
  markerteKandidater,
  setMarkerteKandidater,
  search,
  kandidatliste,
  stillingsId,
  stillingskategori,
}) => {
  const [sort, setSort] = React.useState<TableSortState<kandidaterSchemaDTO>>();

  const { status, hendelse } = useStillingsKandidaterFilter();

  const toggleSelectedRow = (kandidat: kandidaterSchemaDTO) =>
    setMarkerteKandidater(
      markerteKandidater.includes(kandidat)
        ? markerteKandidater.filter(
            (kandidat) => kandidat.fodselsnr !== kandidat.fodselsnr,
          )
        : [...markerteKandidater, kandidat],
    );

  const aktivtFilter =
    search.length > 0 || status.length > 0 || hendelse.length > 0;

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
          (kandidat.fodselsnr && kandidat.fodselsnr.includes(search));

        const matchesStatus =
          status.length === 0 || status.includes(kandidat.status);

        const matchesHendelse =
          hendelse.length === 0 ||
          hendelse.some(
            (utfall) =>
              kandidat.status === utfall ||
              kandidat.utfallsendringer.some((h) => h.utfall === utfall),
          );

        // Skjuler de som ikke har fnr hvis filter er valgt for å ikke utlede hendelser.

        const erSynlig =
          kandidat.fodselsnr !== null && kandidat.fodselsnr !== undefined;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesHendelse &&
          (!aktivtFilter || erSynlig)
        );
      })
      .filter(
        (kandidat) =>
          kandidat.etternavn.toLowerCase().includes(search.toLowerCase()) ||
          kandidat.fornavn.toLowerCase().includes(search.toLowerCase()) ||
          (kandidat.fodselsnr && kandidat.fodselsnr.includes(search)) ||
          kandidat.fodselsnr === null,
      )
      .sort(applySortDirection<kandidaterSchemaDTO>(sort));

    setKandidater(nyListe);
  }, [search, kandidatliste.kandidater, sort, status, hendelse, aktivtFilter]);

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
    <Table sort={sort} onSortChange={tableSort}>
      <Table.Header>
        <Table.Row>
          <Table.DataCell />
          <Table.DataCell>
            <Checkbox
              checked={markerteKandidater.length === kandidater.length}
              indeterminate={
                markerteKandidater.length > 0 &&
                markerteKandidater.length !== kandidater.length
              }
              onChange={() => {
                markerteKandidater.length
                  ? setMarkerteKandidater([])
                  : setMarkerteKandidater(
                      kandidater.filter((k) => k.fodselsnr !== null),
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
          <Table.HeaderCell scope='col' />
          <Table.HeaderCell scope='col'>Fødselsnr.</Table.HeaderCell>
          <Table.ColumnHeader sortable sortKey='lagtTilAv.navn' scope='col'>
            Lagt til av
          </Table.ColumnHeader>
          <Table.ColumnHeader sortable sortKey='lagtTilTidspunkt' scope='col'>
            Dato
          </Table.ColumnHeader>
          <Table.HeaderCell scope='col'>Intern status </Table.HeaderCell>
          <Table.HeaderCell scope='col'>Siste hendelse</Table.HeaderCell>
          <Table.HeaderCell scope='col'></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {!aktivtFilter &&
          kandidatliste.formidlingerAvUsynligKandidat.length > 0 &&
          kandidatliste.formidlingerAvUsynligKandidat.map((kandidat, i) => (
            <UsynligKandidatRad
              key={i}
              fornavn={kandidat.fornavn}
              etternavn={kandidat.etternavn}
              utfall={kandidat.utfall as Kandidatutfall}
            />
          ))}
        {kandidater.map((kandidat, i) => {
          if (kandidat.fodselsnr === null) {
            return (
              <UsynligKandidatRad
                key={i}
                fornavn={kandidat.fornavn}
                etternavn={kandidat.etternavn}
              />
            );
          }

          return (
            <Table.ExpandableRow
              content={
                <InfoOmKandidat
                  kandidat={kandidat}
                  kandidatlisteId={kandidatliste.kandidatlisteId}
                />
              }
              key={i + kandidat.fodselsnr}
              selected={markerteKandidater.includes(kandidat)}
            >
              <Table.DataCell>
                <Checkbox
                  hideLabel
                  checked={markerteKandidater.includes(kandidat)}
                  onChange={() => toggleSelectedRow(kandidat)}
                  aria-labelledby={`id-${kandidat.fodselsnr}`}
                >
                  {' '}
                </Checkbox>
              </Table.DataCell>
              <Table.DataCell scope='row'>
                <Link
                  href={`/kandidat/${kandidat.kandidatnr}`}
                  id={`id-${kandidat.fodselsnr}`}
                >
                  {kandidat.etternavn}, {kandidat.fornavn}
                </Link>
              </Table.DataCell>
              <Table.DataCell className='align-middle'>
                <SmsStatusPopup
                  fnr={kandidat.fodselsnr}
                  stillingId={stillingsId}
                  stillingskategori={stillingskategori}
                />
              </Table.DataCell>
              <Table.DataCell>{kandidat.fodselsnr}</Table.DataCell>
              <Table.DataCell>
                <Tooltip content={kandidat.lagtTilAv?.ident} arrow={false}>
                  <span> {kandidat.lagtTilAv?.navn}</span>
                </Tooltip>
              </Table.DataCell>
              <Table.DataCell align='right'>
                {format(kandidat.lagtTilTidspunkt, 'dd.MM.yyyy')}
              </Table.DataCell>
              <Table.DataCell>
                <StatusTag status={kandidat.status as Kandidatstatus} />
              </Table.DataCell>
              <Table.DataCell>
                <HendelseTag
                  ikkeVisÅrstall
                  utfall={kandidat.utfall as Kandidatutfall}
                  utfallsendringer={kandidat.utfallsendringer}
                  // forespørselOmDelingAvCv={
                  //     forespørselOmDelingAvCv.kind === Nettstatus.Suksess
                  //         ? forespørselOmDelingAvCv.data.gjeldendeForespørsel
                  //         : undefined
                  // }
                  forespørselOmDelingAvCv={undefined}
                  sms={null}
                />
              </Table.DataCell>
              <Table.DataCell>
                <div className='flex items-baseline flex-end'>
                  <KandidatDropdown
                    kandidat={kandidat}
                    stillingsId={stillingsId}
                  />
                </div>
              </Table.DataCell>
            </Table.ExpandableRow>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default StillingsKandidaterTabell;
