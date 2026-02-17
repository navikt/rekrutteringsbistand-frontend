'use client';

import {
  TilbakemeldingKategori,
  TilbakemeldingStatus,
} from '@/app/api/bruker/tilbakemeldinger/typer';
import {
  oppdaterTilbakemelding,
  slettTilbakemelding,
  useTilbakemeldinger,
} from '@/app/api/bruker/tilbakemeldinger/useTilbakemeldinger';
import SWRLaster from '@/components/SWRLaster';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { ChatIcon, LinkIcon, TrashIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Checkbox,
  Heading,
  Link,
  Modal,
  Pagination,
  Select,
  Table,
  Tag,
  TextField,
  ToggleGroup,
} from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const kategoriTilLabel: Record<TilbakemeldingKategori, string> = {
  [TilbakemeldingKategori.Rekrutteringstreff]: 'Rekrutteringstreff',
  [TilbakemeldingKategori.Stillingsoppdrag]: 'Stillingsoppdrag',
  [TilbakemeldingKategori.Etterregistreringer]: 'Etterregistreringer',
  [TilbakemeldingKategori.Jobbsøker]: 'Jobbsøker',
  [TilbakemeldingKategori.Annet]: 'Annet',
};

const kategoriTilVariant = (
  kategori: TilbakemeldingKategori,
): 'info' | 'success' | 'warning' | 'alt1' => {
  switch (kategori) {
    case TilbakemeldingKategori.Rekrutteringstreff:
      return 'info';
    case TilbakemeldingKategori.Stillingsoppdrag:
      return 'success';
    case TilbakemeldingKategori.Etterregistreringer:
      return 'warning';
    case TilbakemeldingKategori.Jobbsøker:
      return 'alt1';
    case TilbakemeldingKategori.Annet:
      return 'info';
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const { harRolle } = useApplikasjonContext();
  const [valgtKategori, setValgtKategori] = useState<string>('alle');
  const [valgtId, setValgtId] = useState<string | null>(null);
  const [trelloInput, setTrelloInput] = useState('');
  const [modalStatus, setModalStatus] = useState<TilbakemeldingStatus>(
    TilbakemeldingStatus.Ny,
  );
  const [modalKategori, setModalKategori] = useState<TilbakemeldingKategori>(
    TilbakemeldingKategori.Annet,
  );
  const [visFerdige, setVisFerdige] = useState(false);
  const [side, setSide] = useState(1);
  const hook = useTilbakemeldinger(side, visFerdige);
  const modalRef = useRef<HTMLDialogElement>(null);
  const slettModalRef = useRef<HTMLDialogElement>(null);
  const [slettId, setSlettId] = useState<string | null>(null);

  const erUtvikler = harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]);

  useEffect(() => {
    if (!erUtvikler) {
      router.replace('/');
    }
  }, [erUtvikler, router]);

  if (!erUtvikler) return null;

  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section
            skjulBrødsmuler
            title={
              <div className='flex items-center gap-2'>
                <ChatIcon /> Dashboard
              </div>
            }
          />
        </PanelHeader>
      }
    >
      <SideInnhold>
        <div className='flex flex-col gap-6'>
          <Box>
            <Heading level='2' size='medium' spacing>
              Tilbakemeldinger
            </Heading>
            <BodyShort spacing>
              Oversikt over tilbakemeldinger fra brukere.
            </BodyShort>
          </Box>

          <div className='flex items-center gap-4'>
            <ToggleGroup
              defaultValue='alle'
              onChange={setValgtKategori}
              size='small'
            >
              <ToggleGroup.Item value='alle'>Alle</ToggleGroup.Item>
              {Object.entries(kategoriTilLabel).map(([verdi, label]) => (
                <ToggleGroup.Item key={verdi} value={verdi}>
                  {label}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup>
            <Checkbox
              size='small'
              checked={visFerdige}
              onChange={(e) => setVisFerdige(e.target.checked)}
            >
              Vis avviste og fullførte
            </Checkbox>
          </div>

          <SWRLaster hooks={[hook]}>
            {({ tilbakemeldinger, side: gjeldendeSide, totalSider }) => {
              const filtrert = tilbakemeldinger.filter(
                (t) => valgtKategori === 'alle' || t.kategori === valgtKategori,
              );

              const valgtTilbakemelding = tilbakemeldinger.find(
                (t) => t.id === valgtId,
              );

              return (
                <>
                  <Box
                    borderRadius='8'
                    background='neutral-soft'
                    padding='space-16'
                  >
                    <Table>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Status</Table.HeaderCell>
                          <Table.HeaderCell>Trello</Table.HeaderCell>
                          <Table.HeaderCell>Navn</Table.HeaderCell>
                          <Table.HeaderCell>Tilbakemelding</Table.HeaderCell>
                          <Table.HeaderCell>Kategori</Table.HeaderCell>
                          <Table.HeaderCell>Dato</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {filtrert.map((t) => (
                          <Table.Row
                            key={t.id}
                            className={`cursor-pointer ${t.status === TilbakemeldingStatus.Ny ? 'font-semibold' : ''}`}
                            onClick={() => {
                              setValgtId(t.id);
                              setTrelloInput(t.trelloLenke ?? '');
                              setModalStatus(t.status);
                              setModalKategori(t.kategori);
                              modalRef.current?.showModal();
                            }}
                          >
                            <Table.DataCell>
                              {t.status === TilbakemeldingStatus.Avvist ? (
                                <Tag variant='error' size='small'>
                                  Avvist
                                </Tag>
                              ) : t.status === TilbakemeldingStatus.Fullført ? (
                                <Tag variant='success' size='small'>
                                  Fullført
                                </Tag>
                              ) : t.status ===
                                TilbakemeldingStatus.Vurdering ? (
                                <Tag variant='info' size='small'>
                                  Vurdering
                                </Tag>
                              ) : (
                                <Tag variant='warning' size='small'>
                                  Ny
                                </Tag>
                              )}
                            </Table.DataCell>
                            <Table.DataCell>
                              {t.trelloLenke && (
                                <Link
                                  href={t.trelloLenke}
                                  target='_blank'
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <LinkIcon title='Trello' />
                                </Link>
                              )}
                            </Table.DataCell>
                            <Table.DataCell>{t.navn}</Table.DataCell>
                            <Table.DataCell className='max-w-xs truncate'>
                              {t.tilbakemelding}
                            </Table.DataCell>
                            <Table.DataCell>
                              <Tag
                                variant={kategoriTilVariant(t.kategori)}
                                size='small'
                              >
                                {kategoriTilLabel[t.kategori]}
                              </Tag>
                            </Table.DataCell>
                            <Table.DataCell>
                              {new Date(t.dato).toLocaleDateString('nb-NO', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </Table.DataCell>
                            <Table.DataCell>
                              <Button
                                variant='tertiary-neutral'
                                size='small'
                                icon={<TrashIcon title='Slett' />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSlettId(t.id);
                                  slettModalRef.current?.showModal();
                                }}
                              />
                            </Table.DataCell>
                          </Table.Row>
                        ))}
                        {filtrert.length === 0 && (
                          <Table.Row>
                            <Table.DataCell colSpan={6}>
                              <BodyShort className='py-4 text-center'>
                                Ingen tilbakemeldinger
                              </BodyShort>
                            </Table.DataCell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>
                  </Box>

                  {totalSider > 1 && (
                    <Pagination
                      className='flex justify-center'
                      size='small'
                      page={gjeldendeSide}
                      onPageChange={(nySide) => {
                        setSide(nySide);
                        hook.mutate();
                      }}
                      count={totalSider}
                    />
                  )}

                  <Modal
                    ref={modalRef}
                    header={{ heading: 'Håndter tilbakemelding' }}
                    onClose={() => setValgtId(null)}
                    width='medium'
                  >
                    <Modal.Body>
                      {valgtTilbakemelding && (
                        <div className='flex flex-col gap-4'>
                          <div>
                            <Heading level='4' size='xsmall'>
                              Tilbakemelding
                            </Heading>
                            <BodyShort>
                              {valgtTilbakemelding.tilbakemelding}
                            </BodyShort>
                          </div>
                          <TextField
                            label='Trello-lenke'
                            description='Lim inn lenke til Trello-kort'
                            value={trelloInput}
                            onChange={(e) => setTrelloInput(e.target.value)}
                            placeholder='https://trello.com/c/...'
                          />
                          <Select
                            label='Status'
                            size='small'
                            value={modalStatus}
                            onChange={(e) =>
                              setModalStatus(
                                e.target.value as TilbakemeldingStatus,
                              )
                            }
                          >
                            {Object.entries(TilbakemeldingStatus).map(
                              ([nøkkel, verdi]) => (
                                <option key={verdi} value={verdi}>
                                  {nøkkel}
                                </option>
                              ),
                            )}
                          </Select>
                          <Select
                            label='Kategori'
                            size='small'
                            value={modalKategori}
                            onChange={(e) =>
                              setModalKategori(
                                e.target.value as TilbakemeldingKategori,
                              )
                            }
                          >
                            {Object.entries(kategoriTilLabel).map(
                              ([verdi, label]) => (
                                <option key={verdi} value={verdi}>
                                  {label}
                                </option>
                              ),
                            )}
                          </Select>
                        </div>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        onClick={async () => {
                          if (!valgtId) return;
                          await oppdaterTilbakemelding(valgtId, {
                            trelloLenke: trelloInput || null,
                            status: modalStatus,
                            kategori: modalKategori,
                          });
                          await hook.mutate();
                          modalRef.current?.close();
                          setValgtId(null);
                        }}
                      >
                        Lagre
                      </Button>
                      <Button
                        variant='danger'
                        onClick={() => {
                          if (!valgtId) return;
                          modalRef.current?.close();
                          setSlettId(valgtId);
                          setValgtId(null);
                          slettModalRef.current?.showModal();
                        }}
                      >
                        Slett
                      </Button>
                      <Button
                        variant='tertiary'
                        onClick={() => {
                          modalRef.current?.close();
                          setValgtId(null);
                        }}
                      >
                        Avbryt
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal
                    ref={slettModalRef}
                    header={{ heading: 'Bekreft sletting' }}
                    onClose={() => setSlettId(null)}
                    width='small'
                  >
                    <Modal.Body>
                      <BodyShort>
                        Er du sikker på at du vil slette denne tilbakemeldingen?
                      </BodyShort>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant='danger'
                        onClick={async () => {
                          if (!slettId) return;
                          await slettTilbakemelding(slettId);
                          await hook.mutate();
                          slettModalRef.current?.close();
                          setSlettId(null);
                        }}
                      >
                        Slett
                      </Button>
                      <Button
                        variant='tertiary'
                        onClick={() => {
                          slettModalRef.current?.close();
                          setSlettId(null);
                        }}
                      >
                        Avbryt
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              );
            }}
          </SWRLaster>
        </div>
      </SideInnhold>
    </SideLayout>
  );
}
