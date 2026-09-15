import { lagreKandidaterIRekrutteringstreff } from './lagre-i-rekrutteringstreff';
import { useOppdaterJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useOppdaterJobbsøkere';
import {
  useRekrutteringstreffSok,
  Visning,
} from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import {
  kanLeggeTilJobbsøkere,
  useKanLeggeTilJobbsøkere,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useKanLeggeTilJobbsøkere';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import SWRLaster from '@/components/SWRLaster';
import { Roller } from '@/components/tilgangskontroll/roller';
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
  const { brukerData, visVarsel, harRolle } = useApplikasjonContext();
  const kanLeggeTil = useKanLeggeTilJobbsøkere(rekrutteringstreffId);
  const erUtvikler = harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]);
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();
  const oppdaterJobbsøkere = useOppdaterJobbsøkere();
  const rekrutteringstreffOversiktHook = useRekrutteringstreffSok({
    visning: Visning.MITT_KONTOR,
    statuser: [RekrutteringstreffStatus.PUBLISERT],
  });
  const opprettetAvNavn =
    [brukerData.fornavn, brukerData.etternavn]
      .filter(Boolean)
      .join(' ')
      .trim() || null;
  const tilgjengeligeTreff =
    rekrutteringstreffOversiktHook.data?.treff.filter((treff) =>
      kanLeggeTilJobbsøkere(treff, brukerData.ident, erUtvikler),
    ) ?? [];
  const tilgjengeligeValg = selectedRows.filter((id) =>
    tilgjengeligeTreff.some((treff) => treff.id === id),
  );

  const toggleSelectedRow = (stillingsId: string) =>
    setSelectedRows((list) =>
      list.includes(stillingsId)
        ? list.filter((id) => id !== stillingsId)
        : [...list, stillingsId],
    );

  const lagreKandidater = async (valgteTreff?: string[]) => {
    if (rekrutteringstreffId && !kanLeggeTil) return;
    if (!markerteKandidater || markerteKandidater.length === 0) return;
    if (laster) return;

    setLaster(true);

    const resultat = await lagreKandidaterIRekrutteringstreff(
      {
        markerteKandidater,
        rekrutteringstreffId,
        selectedRows: valgteTreff?.filter((id) =>
          tilgjengeligeTreff.some((treff) => treff.id === id),
        ),
        opprettetAvNavn,
      },
      {
        visVarsel,
        fjernMarkerteKandidater,
        oppdaterJobbsøkere,
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

  if (rekrutteringstreffId && !kanLeggeTil) return null;

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
          {(sokRespons) => {
            const rekrutteringstreffOversikt = sokRespons.treff.filter(
              (treff) =>
                kanLeggeTilJobbsøkere(treff, brukerData.ident, erUtvikler),
            );
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
                            tilgjengeligeValg.length > 0 &&
                            tilgjengeligeValg.length ===
                              rekrutteringstreffOversikt.length
                          }
                          indeterminate={
                            tilgjengeligeValg.length > 0 &&
                            tilgjengeligeValg.length !==
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
          disabled={laster || tilgjengeligeValg.length === 0}
          type='button'
          size='small'
          loading={laster}
          onClick={() => void lagreKandidater(tilgjengeligeValg)}
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
