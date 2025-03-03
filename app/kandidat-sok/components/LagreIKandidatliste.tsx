import { leggTilKandidater } from '../../api/kandidat-sok/leggTilKandidat';
import { useMineKandidatlister } from '../../api/kandidat/useMineKandidatlister';
import SWRLaster from '../../components/SWRLaster';
import { useVisVarsling } from '../../components/varsling/Varsling';
import { useKandidatSøkMarkerteContext } from '../KandidatSøkMarkerteContext';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import {
  Button,
  Checkbox,
  Link,
  Loader,
  Modal,
  Pagination,
  Table,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import * as React from 'react';

interface LagreIKandidatlisteProps {
  stillingsId?: string;
}

const LagreIKandidatliste: React.FC<LagreIKandidatlisteProps> = ({
  stillingsId,
}) => {
  const ref = React.useRef<HTMLDialogElement>(null);
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();
  const [pageNumber, setPageNumber] = React.useState(1);
  const mineKandidatlisterHook = useMineKandidatlister(
    pageNumber > 1 ? pageNumber - 1 : 0,
  );
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [laster, setLaster] = React.useState(false);
  const visVarsel = useVisVarsling();
  const toggleSelectedRow = (stillingsId: string) =>
    setSelectedRows((list) =>
      list.includes(stillingsId)
        ? list.filter((id) => id !== stillingsId)
        : [...list, stillingsId],
    );

  const lagreKandidaterIKandidatliste = async () => {
    const kandidatnr = markerteKandidater
      ?.map((kandidat) => kandidat.arenaKandidatnr)
      .filter(
        (nr): nr is string => nr !== null && nr !== undefined && nr !== '',
      );
    if (kandidatnr && kandidatnr.length > 0) {
      setLaster(true);
      if (stillingsId) {
        try {
          await leggTilKandidater(kandidatnr, stillingsId);
          visVarsel({
            alertType: 'success',
            innhold: 'Kandidater lagret i kandidatliste',
          });
          fjernMarkerteKandidater();
          ref.current?.close();
        } catch (error) {
          logger.error('Feil ved lagring av kandidater i kandidatliste', error);
          visVarsel({
            alertType: 'error',
            innhold: 'Feil ved lagring av kandidater i kandidatliste',
          });
        }
      } else if (selectedRows.length !== 0) {
        const promises = selectedRows.map((stillingId) =>
          leggTilKandidater(kandidatnr, stillingId),
        );
        try {
          await Promise.all(promises);
          visVarsel({
            alertType: 'success',
            innhold: 'Kandidater lagret i kandidatliste',
          });
          fjernMarkerteKandidater();
          ref.current?.close();
        } catch (error) {
          logger.error('Feil ved lagring av kandidater i kandidatliste', error);
          visVarsel({
            alertType: 'error',
            innhold: 'Feil ved lagring av kandidater i kandidatliste',
          });
        }
      }

      setLaster(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          if (stillingsId) {
            lagreKandidaterIKandidatliste();
          } else {
            ref.current?.showModal();
          }
        }}
        size='small'
        variant='primary'
        icon={<PersonPlusIcon aria-hidden />}
        disabled={markerteKandidater?.length === 0}
      >
        {stillingsId
          ? 'Lagre i stillingen sin kandidatliste'
          : 'Lagre i kandidatliste'}
      </Button>
      <Modal
        width={600}
        ref={ref}
        header={{
          heading: `Lagre ${markerteKandidater?.length || 0} kandidat i kandidatlister`,
        }}
      >
        <Modal.Body>
          <SWRLaster hooks={[mineKandidatlisterHook]}>
            {(mineKandidatlister) => {
              const pageCount = Math.floor(mineKandidatlister.antall / 8);
              return laster ? (
                <Loader />
              ) : (
                <>
                  <Table zebraStripes>
                    <Table.Header>
                      <Table.Row>
                        <Table.DataCell>
                          <Checkbox
                            checked={
                              selectedRows.length ===
                              mineKandidatlister.liste.length
                            }
                            indeterminate={
                              selectedRows.length > 0 &&
                              selectedRows.length !==
                                mineKandidatlister.liste.length
                            }
                            onChange={() => {
                              if (selectedRows.length) {
                                setSelectedRows([]);
                              } else {
                                setSelectedRows(
                                  mineKandidatlister.liste.map(
                                    (stilling) => stilling.stillingId,
                                  ),
                                );
                              }
                            }}
                            hideLabel
                          >
                            Velg alle rader
                          </Checkbox>
                        </Table.DataCell>
                        <Table.HeaderCell scope='col'>
                          Stilling
                        </Table.HeaderCell>
                        <Table.HeaderCell scope='col'>
                          Organisasjon
                        </Table.HeaderCell>
                        <Table.HeaderCell scope='col'>
                          Antall stillinger
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {mineKandidatlister.liste?.map((kandidatliste, i) => {
                        return (
                          <Table.Row
                            key={kandidatliste.stillingId + i}
                            selected={selectedRows.includes(
                              kandidatliste.stillingId,
                            )}
                          >
                            <Table.DataCell>
                              <Checkbox
                                hideLabel
                                checked={selectedRows.includes(
                                  kandidatliste.stillingId,
                                )}
                                onChange={() =>
                                  toggleSelectedRow(kandidatliste.stillingId)
                                }
                                aria-labelledby={`id-${kandidatliste.stillingId}`}
                              >
                                {' '}
                              </Checkbox>
                            </Table.DataCell>
                            <Table.HeaderCell scope='row'>
                              <Link
                                href={`stilling/${kandidatliste.stillingId}`}
                              >
                                {kandidatliste.tittel ?? 'Ukjent tittel'}
                              </Link>
                            </Table.HeaderCell>
                            <Table.DataCell>
                              {kandidatliste.organisasjonNavn}
                            </Table.DataCell>
                            <Table.DataCell>
                              {kandidatliste.antallStillinger}
                            </Table.DataCell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                  <Pagination
                    className='my-8 flex justify-center'
                    size='small'
                    page={pageNumber}
                    onPageChange={setPageNumber}
                    count={pageCount > 0 ? pageCount : 1}
                  />
                </>
              );
            }}
          </SWRLaster>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={laster || selectedRows.length === 0}
            type='button'
            onClick={lagreKandidaterIKandidatliste}
          >
            Lagre
          </Button>
          <Button
            disabled={laster}
            type='button'
            variant='secondary'
            onClick={() => ref.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LagreIKandidatliste;
