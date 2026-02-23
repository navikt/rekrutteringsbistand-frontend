import { lagreKandidaterIRekrutteringstreff } from './lagre-i-rekrutteringstreff';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useRekrutteringstreffMittKontor } from '@/app/api/rekrutteringstreff/mittkontor/useRekrutteringstreffMittKontor';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import SWRLaster from '@/components/SWRLaster';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Button, Checkbox, Link, Loader, Modal, Table } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface LagreIRekrutteringstreffModalProps {
  rekrutteringstreffId?: string;
  onClose: () => void;
}

export default function LagreIRekrutteringstreffModal({
  rekrutteringstreffId,
  onClose,
}: LagreIRekrutteringstreffModalProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [laster, setLaster] = useState(false);

  const router = useRouter();
  const { visVarsel } = useApplikasjonContext();
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();
  const jobbsøkerHook = useJobbsøkere(rekrutteringstreffId);
  const rekrutteringstreffOversiktHook = useRekrutteringstreffMittKontor();

  const toggleSelectedRow = (stillingsId: string) =>
    setSelectedRows((list) =>
      list.includes(stillingsId)
        ? list.filter((id) => id !== stillingsId)
        : [...list, stillingsId],
    );

  const lagreKandidater = async (valgteTreff?: string[]) => {
    if (!markerteKandidater || markerteKandidater.length === 0) return;
    if (laster) return;

    setLaster(true);

    const resultat = await lagreKandidaterIRekrutteringstreff(
      {
        markerteKandidater,
        rekrutteringstreffId,
        selectedRows: valgteTreff,
      },
      {
        visVarsel,
        fjernMarkerteKandidater,
        mutateJobbsøkere: jobbsøkerHook.mutate,
        mutateRekrutteringstreffOversikt: rekrutteringstreffOversiktHook.mutate,
      },
    );

    setLaster(false);

    if (resultat.suksess) {
      onClose();
      if (rekrutteringstreffId) {
        router.push(
          `/rekrutteringstreff/${rekrutteringstreffId}?visFane=jobbsøkere`,
        );
      }
    }
  };

  return (
    <Modal
      width={600}
      onClose={() => {
        if (!laster) {
          onClose();
        }
      }}
      open
      header={{
        heading: `Lagre ${markerteKandidater?.length || 0} kandidat i rekrutteringstreff`,
      }}
    >
      <Modal.Body>
        <SWRLaster hooks={[rekrutteringstreffOversiktHook]}>
          {(rekrutteringstreffOversikt) => {
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
              </>
            );
          }}
        </SWRLaster>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={laster || selectedRows.length === 0}
          type='button'
          size='small'
          loading={laster}
          onClick={() => void lagreKandidater(selectedRows)}
        >
          Lagre
        </Button>
        <Button
          disabled={laster}
          type='button'
          size='small'
          variant='secondary'
          onClick={onClose}
        >
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
