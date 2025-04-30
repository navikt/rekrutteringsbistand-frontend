import SWRLaster from '../../../components/SWRLaster';
import { useVisVarsling } from '../../../components/varsling/Varsling';
import { useKandidatSøkMarkerteContext } from '../../../kandidat/KandidatSøkMarkerteContext';
import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import {
  leggtilNyeJobbsøkere,
  LeggTilNyJobbsøkereDTO,
} from '@/app/api/rekrutteringstreff/ny-jobbsøker/leggTilNyjobbsøker';
import { useRekrutteringstreffOversikt } from '@/app/api/rekrutteringstreff/useRekrutteringstreffOversikt';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button, Checkbox, Link, Loader, Modal, Table } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import * as React from 'react';

interface LagreIRekrutteringstreffProps {
  rekrutteringstreffId?: string;
  kandidatsokKandidater: KandidatsokKandidat[];
}

const LagreIRekrutteringstreff = React.forwardRef<
  HTMLButtonElement,
  LagreIRekrutteringstreffProps
>(({ rekrutteringstreffId, kandidatsokKandidater }, triggerRef) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const rekrutteringstreffOversiktHook = useRekrutteringstreffOversikt();

  //const { track } = useUmami();
  const ref = React.useRef<HTMLDialogElement>(null);
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

  const lagreKandidaterIRekrutteringstreff = async () => {
    if (markerteKandidater && markerteKandidater.length > 0) {
      setLaster(true);
      const feil: string[] = [];
      const dto: LeggTilNyJobbsøkereDTO = markerteKandidater
        .map((kandidatnummer) => {
          const kandidat = kandidatsokKandidater.find(
            (k) => k.arenaKandidatnr === kandidatnummer,
          );

          if (!kandidat) {
            feil.push(
              `Fant ikke kandidat med kandidatnummer: ${kandidatnummer}`,
            );
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
            navkontor: kandidat.navkontor ?? null,
            veilederNavn: kandidat.veilederVisningsnavn ?? 'UKJENT',
            veilederNavIdent: kandidat.veilederIdent ?? 'UKJENT',
          };
        })
        .filter(
          (kandidat) => kandidat && kandidat.fødselsnummer,
        ) as LeggTilNyJobbsøkereDTO;

      if (rekrutteringstreffId) {
        //TODO: track(UmamiEvent...)

        try {
          await leggtilNyeJobbsøkere(dto, rekrutteringstreffId);
          visVarsel({
            alertType: 'success',
            innhold: 'Kandidater lagret i rekrutteringstreff',
          });
          fjernMarkerteKandidater();
          ref.current?.close();
        } catch (error) {
          logger.error(
            'Feil ved lagring av kandidater i rekrutteringstreff',
            error,
          );
          visVarsel({
            alertType: 'error',
            innhold: 'Feil ved lagring av kandidater i rekrutteringstreff',
          });
        }
      } else if (selectedRows.length !== 0) {
        // TODO unami
        const promises = selectedRows.map((rekrutteringstreffId) =>
          leggtilNyeJobbsøkere(dto, rekrutteringstreffId),
        );

        try {
          await Promise.all(promises);
          visVarsel({
            alertType: 'success',
            innhold: 'Kandidater lagret i rekrutteringstreff',
          });
          fjernMarkerteKandidater();
          ref.current?.close();
        } catch (error) {
          logger.error(
            'Feil ved lagring av kandidater i rekrutteringstreff',
            error,
          );
          visVarsel({
            alertType: 'error',
            innhold: 'Feil ved lagring av kandidater i rekrutteringstreff',
          });
        }
      }
      setLaster(false);
    }
  };

  return (
    <div>
      <Button
        ref={triggerRef}
        onClick={() => {
          if (rekrutteringstreffId) {
            lagreKandidaterIRekrutteringstreff();
          } else {
            ref.current?.showModal();
          }
        }}
        size='small'
        variant='primary'
        icon={<PersonPlusIcon aria-hidden />}
        disabled={markerteKandidater?.length === 0}
      >
        {rekrutteringstreffId
          ? 'Legg til markerte kandidater i rekrutteringstreffet'
          : 'Lagre i rekrutteringstreff'}
      </Button>
      <Modal
        width={600}
        ref={dialogRef}
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
            onClick={lagreKandidaterIRekrutteringstreff}
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
});

LagreIRekrutteringstreff.displayName = 'LagreIRekrutteringstreff';
export default LagreIRekrutteringstreff;
