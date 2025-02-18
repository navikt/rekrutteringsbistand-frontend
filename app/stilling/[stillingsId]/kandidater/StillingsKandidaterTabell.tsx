import { Checkbox, Table } from '@navikt/ds-react';
import * as React from 'react';
import {
  applySortDirection,
  firstOf,
  handleSort,
  hasKey,
  NestedKeys,
  TableSortState,
} from '../../../../util/tableUtils';
import { ForespurteOmDelingAvCvDTO } from '../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import {
  kandidaterSchemaDTO,
  kandidatlisteSchemaDTO,
} from '../../../api/kandidat/schema.zod';
import { Sms } from '../../../api/kandidatvarsel/kandidatvarsel';

import KandidatRad from './components/KandidatRad';
import {
  KandidatutfallTyper,
  UtfallsEndringTyper,
} from './components/KandidatTyper';
import UsynligKandidatRad from './components/UsynligKandidatRad';
import { useStillingsKandidaterFilter } from './StillingsKandidaterFilterContext';

export type KandidatHendelseTyper = KandidatutfallTyper | UtfallsEndringTyper;

const StillingsKandidaterTabell: React.FC<{
  markerteKandidater: kandidaterSchemaDTO[];
  setMarkerteKandidater: (val: kandidaterSchemaDTO[]) => void;
  search: string;
  kandidatliste: kandidatlisteSchemaDTO;
  stillingsId: string;
  forespurteKandidater: ForespurteOmDelingAvCvDTO;
  beskjeder: Record<string, Sms>;
}> = ({
  markerteKandidater,
  setMarkerteKandidater,
  search,
  kandidatliste,
  stillingsId,
  forespurteKandidater,
  beskjeder,
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
              kandidat.utfallsendringer.some((h) => h.utfall === utfall) ||
              (kandidat.aktørid &&
                forespurteKandidater[kandidat.aktørid]?.some(
                  (forespørsel) => forespørsel.tilstand === utfall,
                )) ||
              (kandidat.fodselsnr &&
                beskjeder[kandidat.fodselsnr]?.eksternStatus === utfall),
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
  }, [
    search,
    kandidatliste.kandidater,
    sort,
    status,
    hendelse,
    aktivtFilter,
    beskjeder,
    forespurteKandidater,
  ]);

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
          {/* <Table.HeaderCell scope='col'>Fødselsnr.</Table.HeaderCell> */}
          {/* <Table.ColumnHeader sortable sortKey='lagtTilAv.navn' scope='col'>
            Lagt til av
          </Table.ColumnHeader> */}
          <Table.ColumnHeader sortable sortKey='lagtTilTidspunkt' scope='col'>
            Dato
          </Table.ColumnHeader>
          <Table.HeaderCell scope='col'>Intern status </Table.HeaderCell>
          <Table.HeaderCell scope='col'>Siste aktivitet</Table.HeaderCell>
          <Table.HeaderCell scope='col'>Siste varsel</Table.HeaderCell>
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
              utfall={kandidat.utfall as KandidatHendelseTyper}
            />
          ))}
        {kandidater.map((kandidat, i) => {
          const innaktiv = !kandidat.fodselsnr;

          const beskjedForKandidat = beskjeder[kandidat.fodselsnr ?? ''];

          const forespørselCvForKandidat =
            kandidat.aktørid && forespurteKandidater
              ? forespurteKandidater[kandidat.aktørid]
              : null;

          return (
            <KandidatRad
              key={`kandidatrad-` + i}
              kandidatlisteId={kandidatliste.kandidatlisteId}
              stillingsId={stillingsId}
              markerKandidat={toggleSelectedRow}
              markerteKandidater={markerteKandidater}
              kandidat={kandidat}
              forespørselCvForKandidat={forespørselCvForKandidat}
              beskjedForKandidat={beskjedForKandidat}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default StillingsKandidaterTabell;
