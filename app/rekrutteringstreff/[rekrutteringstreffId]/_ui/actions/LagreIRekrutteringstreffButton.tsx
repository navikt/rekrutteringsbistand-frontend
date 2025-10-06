'use client';

import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import {
  leggtilNyeJobbsøkere,
  LeggTilNyJobbsøkereDTO,
} from '@/app/api/rekrutteringstreff/ny-jobbsøker/leggTilNyjobbsøker';
import { useRekrutteringstreffOversikt } from '@/app/api/rekrutteringstreff/useRekrutteringstreffOversikt';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import SWRLaster from '@/components/SWRLaster';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button, Checkbox, Link, Loader, Modal, Table } from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

interface LagreIRekrutteringstreffButtonProps {
  rekrutteringstreffId?: string;
  kandidatsokKandidater: KandidatsokKandidat[];
}

const LagreIRekrutteringstreffButton: FC<
  LagreIRekrutteringstreffButtonProps
> = ({ rekrutteringstreffId, kandidatsokKandidater }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [laster, setLaster] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { visVarsel } = useApplikasjonContext();
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();
  const jobbsøkerHook = useJobbsøkere(rekrutteringstreffId);
  const rekrutteringstreffOversiktHook = useRekrutteringstreffOversikt();

  const åpneModal = () => modalRef.current?.showModal();
  const lukkModal = () => {
    if (!laster) {
      modalRef.current?.close();
    }
  };

  const toggleSelectedRow = (stillingsId: string) =>
    setSelectedRows((list) =>
      list.includes(stillingsId)
        ? list.filter((id) => id !== stillingsId)
        : [...list, stillingsId],
    );

  const lagreKandidater = async (selectedRows?: string[]) => {
    if (!markerteKandidater || markerteKandidater.length === 0) return;
    if (laster) return;

    setLaster(true);
    let skalLukke = false;

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
        };
      })
      .filter(
        (kandidat) => kandidat && kandidat.fødselsnummer,
      ) as LeggTilNyJobbsøkereDTO;

    try {
      if (rekrutteringstreffId) {
        // Direct save to specific rekrutteringstreff
        await leggtilNyeJobbsøkere(dto, rekrutteringstreffId);
        await jobbsøkerHook.mutate?.();
      } else if (selectedRows && selectedRows.length > 0) {
        // Save to selected rekrutteringstreff from modal
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
        tekst: `${markerteKandidater.length} kandidat${markerteKandidater.length > 1 ? 'er' : ''} lagret i rekrutteringstreff`,
      });
      fjernMarkerteKandidater();
      skalLukke = true;
    } catch (error) {
      new RekbisError({
        message: 'Feil ved lagring av kandidater i rekrutteringstreff',
        error,
      });
      visVarsel({
        type: 'error',
        tekst: 'Feil ved lagring av kandidater i rekrutteringstreff',
      });
    } finally {
      setLaster(false);
      if (skalLukke) {
        modalRef.current?.close();
      }
    }
  };

  const handleButtonClick = () => {
    if (rekrutteringstreffId) {
      void lagreKandidater();
    } else {
      åpneModal();
    }
  };

  return (
    <>
      <Button
        variant='tertiary'
        onClick={handleButtonClick}
        icon={<PersonPlusIcon aria-hidden />}
        disabled={markerteKandidater?.length === 0 || laster}
        loading={laster}
      >
        {rekrutteringstreffId
          ? 'Legg til markerte kandidater'
          : 'Lagre i rekrutteringstreff'}
      </Button>

      <Modal
        width={600}
        ref={modalRef}
        onClose={() => {
          if (laster) {
            modalRef.current?.showModal();
          }
        }}
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
            onClick={lukkModal}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LagreIRekrutteringstreffButton;
