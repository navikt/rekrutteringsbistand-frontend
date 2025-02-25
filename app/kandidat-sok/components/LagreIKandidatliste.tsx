import { PersonPlusIcon } from '@navikt/aksel-icons';
import {
  Button,
  Checkbox,
  Link,
  Modal,
  Pagination,
  Table,
} from '@navikt/ds-react';
import * as React from 'react';
import { useMineKandidatlister } from '../../api/kandidat/useMineKandidatlister';
import SWRLaster from '../../components/SWRLaster';
import { useKandidatSøkMarkerteContext } from '../KandidatSøkMarkerteContext';

const LagreIKandidatliste: React.FC = () => {
  const ref = React.useRef<HTMLDialogElement>(null);
  const { markerteKandidater } = useKandidatSøkMarkerteContext();
  const [pageNumber, setPageNumber] = React.useState(1);
  const mineKandidatlisterHook = useMineKandidatlister(pageNumber - 1);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const toggleSelectedRow = (stillingsId: string) =>
    setSelectedRows((list) =>
      list.includes(stillingsId)
        ? list.filter((id) => id !== stillingsId)
        : [...list, stillingsId],
    );

  return (
    <div>
      <Button
        onClick={() => ref.current?.showModal()}
        size='small'
        variant='primary'
        icon={<PersonPlusIcon aria-hidden />}
        disabled={markerteKandidater?.length === 0}
      >
        Lagre i kandidatliste
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
              return (
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
                              selectedRows.length
                                ? setSelectedRows([])
                                : setSelectedRows(
                                    mineKandidatlister.liste.map(
                                      (stilling) => stilling.stillingId,
                                    ),
                                  );
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
                    className='flex justify-center my-8'
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
          <Button type='button' onClick={() => ref.current?.close()}>
            Lagre
          </Button>
          <Button
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
