import KandidatlisteTittel from './KandidatlisteTittel';
import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { useMineKandidatlister } from '@/app/api/kandidat/useMineKandidatlister';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import SWRLaster from '@/components/SWRLaster';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import {
  Button,
  Checkbox,
  Loader,
  Modal,
  Pagination,
  Table,
} from '@navikt/ds-react';
import * as React from 'react';

interface LagreIKandidatlisteProps {
  onClose: () => void;
}

const LagreIKandidatlisteModal: React.FC<LagreIKandidatlisteProps> = ({
  onClose,
}) => {
  const { track } = useUmami();

  const { visVarsel } = useApplikasjonContext();
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();
  const [pageNumber, setPageNumber] = React.useState(1);
  const mineKandidatlisterHook = useMineKandidatlister(
    pageNumber > 1 ? pageNumber - 1 : 0,
  );

  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [laster, setLaster] = React.useState(false);
  const toggleSelectedRow = (stillingsId: string) =>
    setSelectedRows((list) =>
      list.includes(stillingsId)
        ? list.filter((id) => id !== stillingsId)
        : [...list, stillingsId],
    );

  return (
    <Modal
      onClose={onClose}
      open={true}
      width={800}
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
                      <Table.HeaderCell scope='col'>Stilling</Table.HeaderCell>
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
                            <KandidatlisteTittel
                              stillingsId={kandidatliste.stillingId}
                            />
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
          onClick={() => {
            lagreKandidater(selectedRows, onClose, setLaster);
          }}
        >
          Lagre
        </Button>
        <Button
          disabled={laster}
          type='button'
          variant='secondary'
          onClick={onClose}
        >
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );

  async function lagreKandidater(
    selectedRows: string[],
    closeModal: () => void,
    setLaster: (val: boolean) => void,
  ) {
    if (!markerteKandidater || markerteKandidater.length === 0) return;

    setLaster(true);
    if (selectedRows.length !== 0) {
      track(UmamiEvent.Stilling.legg_til_markerte_kandidater, {
        antallKandidater: markerteKandidater?.length,
        kilde: 'Kandidatsøk',
        antallStillinger: selectedRows.length,
      });
      const promises = selectedRows.map((stillingId) =>
        leggTilKandidater(markerteKandidater, stillingId),
      );
      try {
        await Promise.all(promises);
        visVarsel({
          type: 'success',
          tekst: `${markerteKandidater.length}  kandidat${markerteKandidater.length > 1 ? 'er' : ''} lagret i rekrutteringstreff`,
        });
        fjernMarkerteKandidater();
        closeModal();
      } catch (error) {
        new RekbisError({
          message: 'Feil ved lagring av kandidater i kandidatliste',
          error,
        });
        visVarsel({
          type: 'error',
          tekst: 'Feil ved lagring av kandidater i kandidatliste',
        });
      }
    }
    setLaster(false);
  }
};

export default LagreIKandidatlisteModal;
