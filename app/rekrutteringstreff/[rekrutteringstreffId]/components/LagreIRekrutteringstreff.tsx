import SWRLaster from '../../../components/SWRLaster';
import { useVisVarsling } from '../../../components/varsling/Varsling';
import { useKandidatSøkMarkerteContext } from '../../../kandidat/KandidatSøkMarkerteContext';
import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import {
  leggtilNyeJobbsøkere,
  LeggTilNyJobbsøkereDTO,
} from '@/app/api/rekrutteringstreff/ny-jobbsøker/leggTilNyjobbsøker';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffOversikt } from '@/app/api/rekrutteringstreff/useRekrutteringstreffOversikt';
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

interface LagreIRekrutteringstreffProps {
  rekrutteringstreffId?: string;
  kandidatsokKandidater: KandidatsokKandidat[];
}

const LagreIRekrutteringstreff: React.FC<LagreIRekrutteringstreffProps> = ({
  rekrutteringstreffId,
  kandidatsokKandidater,
}) => {
  const rekrutteringstreffOversiktHook = useRekrutteringstreffOversikt();

  //const { track } = useUmami();
  const ref = React.useRef<HTMLDialogElement>(null);
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();
  const [pageNumber, setPageNumber] = React.useState(1);
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
      const dto: LeggTilNyJobbsøkereDTO = markerteKandidater
        .map((kandidatnummer) =>
          kandidatsokKandidater.find((k) => k.kandidatnr === kandidatnummer),
        )
        .filter(
          // sørg for at både fødselsnummer og veilederIdent finnes
          (
            k,
          ): k is KandidatsokKandidat & {
            fodselsnummer: string;
            veilederIdent: string;
          } =>
            !!k &&
            typeof k.fodselsnummer === 'string' &&
            typeof k.veilederIdent === 'string',
        )
        .map((k) => ({
          fødselsnummer: k.fodselsnummer,
          fornavn: k.fornavn ?? null,
          etternavn: k.etternavn ?? null,
          kandidatnummer: k.kandidatnr ?? null,
          navkontor: k.navkontor ?? null,
          veilederNavn: k.veilederVisningsnavn ?? null,
          veilederNavIdent: k.veilederIdent,
        }));

      if (rekrutteringstreffId) {
        //TODO: track(UmamiEvent...)

        try {
          await leggtilNyeJobbsøkere(dto, rekrutteringstreffId);
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
        // TODO unami
        const promises = selectedRows.map((rekrutteringstreffId) =>
          leggtilNyeJobbsøkere(dto, rekrutteringstreffId),
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
          ? 'Legg til markerte kandidater'
          : 'Lagre i rekrutteringstreff'}
      </Button>
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
};

export default LagreIRekrutteringstreff;
