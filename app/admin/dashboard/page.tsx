'use client';

import {
  TilbakemeldingKategori,
  TilbakemeldingStatus,
} from '@/app/api/bruker/tilbakemeldinger/typer';
import {
  oppdaterTilbakemelding,
  useTilbakemeldinger,
} from '@/app/api/bruker/tilbakemeldinger/useTilbakemeldinger';
import SWRLaster from '@/components/SWRLaster';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { ChatIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Heading,
  Link,
  Modal,
  Pagination,
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
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const { harRolle } = useApplikasjonContext();
  const [valgtKategori, setValgtKategori] = useState<string>('alle');
  const [valgtId, setValgtId] = useState<string | null>(null);
  const [trelloInput, setTrelloInput] = useState('');
  const [visFerdige, setVisFerdige] = useState(false);
  const [side, setSide] = useState(1);
  const hook = useTilbakemeldinger(side);
  const modalRef = useRef<HTMLDialogElement>(null);

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

          <SWRLaster hooks={[hook]}>
            {({ tilbakemeldinger, side: gjeldendeSide, totalSider }) => {
              const skjulteStatuser = visFerdige
                ? []
                : [TilbakemeldingStatus.Avvist, TilbakemeldingStatus.Fullført];

              const filtrert = tilbakemeldinger
                .filter((t) => !skjulteStatuser.includes(t.status))
                .filter(
                  (t) =>
                    valgtKategori === 'alle' || t.kategori === valgtKategori,
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
                          <Table.HeaderCell>Navn</Table.HeaderCell>
                          <Table.HeaderCell>Tilbakemelding</Table.HeaderCell>
                          <Table.HeaderCell>Kategori</Table.HeaderCell>
                          <Table.HeaderCell>Dato</Table.HeaderCell>
                          <Table.HeaderCell>URL</Table.HeaderCell>
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
                              })}
                            </Table.DataCell>
                            <Table.DataCell>
                              <Link
                                href={t.url}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {t.url}
                              </Link>
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

                  <Button
                    variant='tertiary'
                    size='small'
                    onClick={() => setVisFerdige(!visFerdige)}
                  >
                    {visFerdige
                      ? 'Skjul avviste og fullførte'
                      : 'Vis avviste og fullførte'}
                  </Button>

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
                        </div>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        onClick={async () => {
                          if (!valgtId) return;
                          await oppdaterTilbakemelding(valgtId, {
                            trelloLenke: trelloInput || null,
                            status: TilbakemeldingStatus.Vurdering,
                          });
                          await hook.mutate();
                          modalRef.current?.close();
                          setValgtId(null);
                        }}
                      >
                        Lagre
                      </Button>
                      <Button
                        variant='secondary'
                        onClick={async () => {
                          if (!valgtId) return;
                          await oppdaterTilbakemelding(valgtId, {
                            status: TilbakemeldingStatus.Avvist,
                          });
                          await hook.mutate();
                          modalRef.current?.close();
                          setValgtId(null);
                        }}
                      >
                        Avvis
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
                </>
              );
            }}
          </SWRLaster>
        </div>
      </SideInnhold>
    </SideLayout>
  );
}
