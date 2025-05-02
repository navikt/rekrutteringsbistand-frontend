import SWRLaster from '../../../components/SWRLaster';
import { useVisVarsling } from '../../../components/varsling/Varsling';
import { useKandidatSøkMarkerteContext } from '../../../kandidat/KandidatSøkMarkerteContext';
import { lagreKandidaterIRekrutteringstreff } from './LagreIRekrutteringstreffButton';
import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import { useRekrutteringstreffOversikt } from '@/app/api/rekrutteringstreff/useRekrutteringstreffOversikt';
import { Button, Checkbox, Link, Loader, Modal, Table } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import * as React from 'react';

interface LagreIRekrutteringstreffModalProps {
  rekrutteringstreffId?: string;
  kandidatsokKandidater: KandidatsokKandidat[];
  ref: React.RefObject<HTMLDialogElement>;
}

const LagreIRekrutteringstreffModal: React.FC<
  LagreIRekrutteringstreffModalProps
> = ({ rekrutteringstreffId, kandidatsokKandidater, ref }) => {
  const rekrutteringstreffOversiktHook = useRekrutteringstreffOversikt();

  //const { track } = useUmami();
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();
  /*const mineKandidatlisterHook = useMineKandidatlister(
    pageNumber > 1 ? pageNumber - 1 : 0,
  );*/

  //const kandidatlisteHook = useKandidatliste(stillingsId);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [laster, setLaster] = React.useState(false);
  const visVarsel = useVisVarsling();
  const toggleSelectedRow = (stillingsId: string) =>
    setSelectedRows((list) =>
      list.includes(stillingsId)
        ? list.filter((id) => id !== stillingsId)
        : [...list, stillingsId],
    );

  return (
    <div>
      <Modal
        width={600}
        ref={ref}
        header={{
          heading: `Lagre ${markerteKandidater?.length || 0} kandidat i kandidatlister`,
        }}
      >
        <Modal.Body>
          <SWRLaster hooks={[rekrutteringstreffOversiktHook]}>
            {(rekrutteringstreffOversikt) => {
              //const pageCount = Math.floor(mineKandidatlister.antall / 8);
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
                              rekrutteringstreffOversikt.length
                            }
                            indeterminate={
                              selectedRows.length > 0 &&
                              selectedRows.length !==
                                rekrutteringstreffOversikt.length
                            }
                            onChange={() => {
                              if (selectedRows.length) {
                                setSelectedRows([]);
                              } else {
                                setSelectedRows(
                                  rekrutteringstreffOversikt.map(
                                    (rekrutteringstreffOversikt) =>
                                      rekrutteringstreffOversikt.id,
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
                          Antall rekrutteringstreff
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {rekrutteringstreffOversikt.map(
                        (rekrutteringstreffOversikt, i) => {
                          return (
                            <Table.Row
                              key={rekrutteringstreffOversikt.id + i}
                              selected={selectedRows.includes(
                                rekrutteringstreffOversikt.id,
                              )}
                            >
                              <Table.DataCell>
                                <Checkbox
                                  hideLabel
                                  checked={selectedRows.includes(
                                    rekrutteringstreffOversikt.id,
                                  )}
                                  onChange={() =>
                                    toggleSelectedRow(
                                      rekrutteringstreffOversikt.id,
                                    )
                                  }
                                  aria-labelledby={`id-${rekrutteringstreffOversikt.id}`}
                                >
                                  {' '}
                                </Checkbox>
                              </Table.DataCell>
                              <Table.HeaderCell scope='row'>
                                <Link
                                  href={`rekrutteringstreff/${rekrutteringstreffOversikt.id}`}
                                >
                                  {rekrutteringstreffOversikt.tittel ??
                                    'Ukjent tittel'}
                                </Link>
                              </Table.HeaderCell>
                              <Table.DataCell>TODO</Table.DataCell>
                            </Table.Row>
                          );
                        },
                      )}
                    </Table.Body>
                  </Table>
                  {/*<Pagination
                    className='my-8 flex justify-center'
                    size='small'
                    page={pageNumber}
                    onPageChange={setPageNumber}
                    count={pageCount > 0 ? pageCount : 1}
                  />*/}
                </>
              );
            }}
          </SWRLaster>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={laster || selectedRows.length === 0}
            type='button'
            onClick={() =>
              lagreKandidaterIRekrutteringstreff({
                markerteKandidater,
                kandidatsokKandidater,
                rekrutteringstreffId,
                selectedRows,
                visVarsel,
                fjernMarkerteKandidater,
                closeModal: () => ref.current?.close(),
                setLaster,
                logger,
              })
            }
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

export default LagreIRekrutteringstreffModal;
