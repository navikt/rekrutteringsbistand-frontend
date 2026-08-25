'use client';

import type { RomDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { KLOKKESLETT_CELLE_STYLE } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Rotasjonsmatrise';
import { useUtskrift } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useUtskrift';
import type {
  Arbeidsgiverplan,
  Romplan,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/utskriftsplan';
import { PrinterSmallIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Heading,
  Modal,
  Table,
  VStack,
} from '@navikt/ds-react';
import type { FC } from 'react';
import { useRef } from 'react';

export type Utskriftsvariant = 'arbeidsgivere' | 'jobbsøkere' | null;

const Utskriftsseksjon: FC<{
  headingId: string;
  tittel: string;
  children: React.ReactNode;
}> = ({ headingId, tittel, children }) => (
  <Box
    as='section'
    aria-labelledby={headingId}
    borderColor='neutral-subtle'
    borderWidth='1'
    borderRadius='8'
    padding='space-16'
    marginBlock='space-0 space-16'
    className='break-inside-avoid last:break-after-auto print:break-after-page'
  >
    <Heading id={headingId} level='2' size='medium' spacing>
      {tittel}
    </Heading>
    {children}
  </Box>
);

interface Props {
  variant: Utskriftsvariant;
  romplaner: Romplan[];
  arbeidsgiverplaner: Arbeidsgiverplan[];
  rom: RomDTO[];
  initialerForJobbsøker: (personTreffId: string) => string;
  navnForArbeidsgiver: (arbeidsgiverTreffId: string | null) => string;
  onLukk: () => void;
}

/** Utskrift av rotasjonsplanen, enten per rom (til jobbsøkere) eller per arbeidsgiver. */
const RomOgRotasjonUtskrift: FC<Props> = ({
  variant,
  romplaner,
  arbeidsgiverplaner,
  rom,
  initialerForJobbsøker,
  navnForArbeidsgiver,
  onLukk,
}) => {
  const utskriftsområdeRef = useRef<HTMLDivElement>(null);
  const skrivUt = useUtskrift({
    utskriftsområdeRef,
    dokumenttittel:
      variant === 'jobbsøkere'
        ? 'WorkOp-romplan-jobbsokere'
        : 'WorkOp-romplan-arbeidsgivere',
    sidestil: '@page { size: portrait; }',
  });

  return (
    <Modal
      open={variant !== null}
      onClose={onLukk}
      header={{
        heading:
          variant === 'jobbsøkere'
            ? 'Utskrift til jobbsøkere'
            : 'Utskrift til arbeidsgivere',
        closeButton: true,
      }}
      width='90vw'
      placement='top'
    >
      <Modal.Body>
        <div ref={utskriftsområdeRef}>
          {variant === 'jobbsøkere'
            ? romplaner.map((romplan) => {
                const jobbsøkereIRommet =
                  rom.find(({ romnummer }) => romnummer === romplan.romnummer)
                    ?.jobbsøkere ?? [];

                return (
                  <Utskriftsseksjon
                    key={romplan.romnummer}
                    headingId={`workop-utskrift-rom-${romplan.romnummer}`}
                    tittel={`Rom ${romplan.romnummer}`}
                  >
                    <BodyShort spacing={jobbsøkereIRommet.length === 0}>
                      {jobbsøkereIRommet.length === 0
                        ? 'Ingen jobbsøkere'
                        : 'Jobbsøkere:'}
                    </BodyShort>
                    {jobbsøkereIRommet.length > 0 && (
                      <VStack
                        as='ul'
                        gap='space-2'
                        marginBlock='space-0 space-16'
                      >
                        {jobbsøkereIRommet.map((personTreffId) => (
                          <BodyShort as='li' key={personTreffId}>
                            {initialerForJobbsøker(personTreffId)}
                          </BodyShort>
                        ))}
                      </VStack>
                    )}
                    <Table size='small'>
                      <caption className='sr-only'>
                        Arbeidsgivere som kommer til rom {romplan.romnummer}
                      </caption>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell
                            scope='col'
                            className='whitespace-nowrap'
                            style={KLOKKESLETT_CELLE_STYLE}
                          >
                            Klokkeslett
                          </Table.HeaderCell>
                          <Table.HeaderCell scope='col'>
                            Arbeidsgiver
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {romplan.poster.map((post) => (
                          <Table.Row key={post.startKlokkeslett}>
                            <Table.HeaderCell
                              scope='row'
                              className='whitespace-nowrap'
                              style={KLOKKESLETT_CELLE_STYLE}
                            >
                              {post.startKlokkeslett}–{post.sluttKlokkeslett}
                            </Table.HeaderCell>
                            <Table.DataCell>
                              {navnForArbeidsgiver(post.arbeidsgiverTreffId)}
                            </Table.DataCell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Utskriftsseksjon>
                );
              })
            : arbeidsgiverplaner.map((arbeidsgiverplan) => (
                <Utskriftsseksjon
                  key={arbeidsgiverplan.arbeidsgiverTreffId}
                  headingId={`workop-utskrift-arbeidsgiver-${arbeidsgiverplan.arbeidsgiverTreffId}`}
                  tittel={navnForArbeidsgiver(
                    arbeidsgiverplan.arbeidsgiverTreffId,
                  )}
                >
                  <Table size='small'>
                    <caption className='sr-only'>
                      Rom arbeidsgiveren skal til, per klokkeslett
                    </caption>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell
                          scope='col'
                          className='whitespace-nowrap'
                          style={KLOKKESLETT_CELLE_STYLE}
                        >
                          Klokkeslett
                        </Table.HeaderCell>
                        <Table.HeaderCell scope='col'>Rom</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {arbeidsgiverplan.poster.map((post) => (
                        <Table.Row key={post.startKlokkeslett}>
                          <Table.HeaderCell
                            scope='row'
                            className='whitespace-nowrap'
                            style={KLOKKESLETT_CELLE_STYLE}
                          >
                            {post.startKlokkeslett}–{post.sluttKlokkeslett}
                          </Table.HeaderCell>
                          <Table.DataCell>
                            {post.romnummer === null
                              ? 'Venter'
                              : `Rom ${post.romnummer}`}
                          </Table.DataCell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Utskriftsseksjon>
              ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type='button'
          icon={<PrinterSmallIcon aria-hidden />}
          onClick={() => skrivUt()}
        >
          Skriv ut
        </Button>
        <Button type='button' variant='secondary' onClick={onLukk}>
          Lukk
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RomOgRotasjonUtskrift;
