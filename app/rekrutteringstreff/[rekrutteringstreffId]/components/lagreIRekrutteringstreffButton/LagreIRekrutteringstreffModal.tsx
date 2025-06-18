import { RekbisError } from '../../../../../util/rekbisError';
import SWRLaster from '../../../../components/SWRLaster';
import { useKandidatSøkMarkerteContext } from '../../../../kandidat/KandidatSøkMarkerteContext';
import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import {
  leggtilNyeJobbsøkere,
  LeggTilNyJobbsøkereDTO,
} from '@/app/api/rekrutteringstreff/ny-jobbsøker/leggTilNyjobbsøker';
import { useRekrutteringstreffOversikt } from '@/app/api/rekrutteringstreff/useRekrutteringstreffOversikt';
import { useApplikasjonContext } from '@/app/providers/ApplikasjonContext';
import { Button, Checkbox, Link, Loader, Modal, Table } from '@navikt/ds-react';
import * as React from 'react';

interface LagreIRekrutteringstreffModalProps {
  kandidatsokKandidater: KandidatsokKandidat[];
  modalRef: React.RefObject<HTMLDialogElement>;
}

const LagreIRekrutteringstreffModal: React.FC<
  LagreIRekrutteringstreffModalProps
> = ({ kandidatsokKandidater, modalRef }) => {
  const rekrutteringstreffOversiktHook = useRekrutteringstreffOversikt();

  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [laster, setLaster] = React.useState(false);
  const toggleSelectedRow = (stillingsId: string) =>
    setSelectedRows((list) =>
      list.includes(stillingsId)
        ? list.filter((id) => id !== stillingsId)
        : [...list, stillingsId],
    );

  const { visVarsel } = useApplikasjonContext();
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  return (
    <div>
      <Modal
        width={600}
        ref={modalRef}
        header={{
          heading: `Lagre ${markerteKandidater?.length || 0} kandidat i rekrutteringstreff`,
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
                          Rekrutteringstreff
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
                              <Table.DataCell className='w-3'>
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
              lagreKandidater(
                selectedRows,
                () => modalRef.current?.close(),
                setLaster,
              )
            }
          >
            Lagre
          </Button>
          <Button
            disabled={laster}
            type='button'
            variant='secondary'
            onClick={() => modalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  async function lagreKandidater(
    selectedRows: string[],
    closeModal: () => void,
    setLaster: (val: boolean) => void,
  ) {
    if (!markerteKandidater || markerteKandidater.length === 0) return;

    setLaster(true);
    const feil: string[] = [];
    const dto: LeggTilNyJobbsøkereDTO = markerteKandidater
      .map((kandidatnummer) => {
        const kandidat = kandidatsokKandidater.find(
          (k) => k.arenaKandidatnr === kandidatnummer,
        );
        if (!kandidat) {
          feil.push(`Fant ikke kandidat med kandidatnummer: ${kandidatnummer}`);
          return null;
        }
        if (!kandidat.fodselsnummer) {
          feil.push(`Kandidat mangler fødselsnummer (${kandidatnummer})`);
        }
        return {
          fødselsnummer: kandidat.fodselsnummer,
          fornavn: kandidat.fornavn ?? null,
          etternavn: kandidat.etternavn ?? null,
          kandidatnummer: kandidat.arenaKandidatnr ?? null,
          // navkontor: kandidat.navkontor ?? null,
          // veilederNavn: kandidat.veilederVisningsnavn ?? 'UKJENT',
          // veilederNavIdent: kandidat.veilederIdent ?? 'UKJENT',
        };
      })
      .filter(
        (kandidat) => kandidat && kandidat.fødselsnummer,
      ) as LeggTilNyJobbsøkereDTO;

    try {
      if (selectedRows.length !== 0) {
        await Promise.all(
          selectedRows.map((id) => leggtilNyeJobbsøkere(dto, id)),
        );
      } else {
        visVarsel({
          type: 'info',
          tekst: 'Velg minst ett rekrutteringstreff',
        });
        setLaster(false);
        return;
      }
      visVarsel({
        type: 'success',
        tekst: `${markerteKandidater.length}  kandidat${markerteKandidater.length > 1 ? 'er' : ''} lagret i rekrutteringstreff`,
      });
      fjernMarkerteKandidater();
      closeModal();
    } catch (error) {
      new RekbisError({
        beskrivelse: 'Feil ved lagring av kandidater i rekrutteringstreff',
        error,
      });
      visVarsel({
        type: 'error',
        tekst: 'Feil ved lagring av kandidater i rekrutteringstreff',
      });
    }
    setLaster(false);
  }
};

export default LagreIRekrutteringstreffModal;
