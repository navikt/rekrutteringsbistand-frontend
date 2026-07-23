'use client';

import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkereResponseDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { beregnRotasjonsplan } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import type {
  MøtedagDTO,
  RomDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { formaterNavn } from '@/app/rekrutteringstreff/_utils/formaterNavn';
import { PrinterSmallIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Bleed,
  Box,
  Button,
  HGrid,
  HStack,
  Heading,
  Modal,
  Table,
  VStack,
} from '@navikt/ds-react';
import { FC, Fragment, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const KLOKKESLETT_CELLE_STYLE = {
  paddingInlineEnd: 'var(--ax-space-32)',
};

interface Props {
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkereData: JobbsøkereResponseDTO;
  onTilbake: () => void;
  onNeste: () => void;
}

interface RomfordelingProps {
  rom: RomDTO[];
  navnPåJobbsøker: (personTreffId: string) => string;
  idPrefiks: string;
  utskrift?: boolean;
}

const Romfordeling: FC<RomfordelingProps> = ({
  rom,
  navnPåJobbsøker,
  idPrefiks,
  utskrift = false,
}) => {
  const romkort = rom.map((romdata) => {
    const headingId = `${idPrefiks}-rom-${romdata.romnummer}`;
    return (
      <Box
        as='section'
        aria-labelledby={headingId}
        key={romdata.romnummer}
        background='neutral-soft'
        borderRadius='8'
        padding='space-16'
        flexBasis={utskrift ? '14rem' : undefined}
        minWidth={utskrift ? '14rem' : undefined}
      >
        <VStack gap='space-8'>
          <Heading id={headingId} level='4' size='xsmall'>
            Rom {romdata.romnummer}
          </Heading>

          {romdata.jobbsøkere.length === 0 ? (
            <BodyShort>Ingen jobbsøkere</BodyShort>
          ) : (
            <VStack as='ul' gap='space-4'>
              {romdata.jobbsøkere.map((personTreffId) => (
                <Box
                  as='li'
                  key={personTreffId}
                  background='neutral-softA'
                  borderRadius='4'
                  padding='space-8'
                >
                  <BodyShort>{navnPåJobbsøker(personTreffId)}</BodyShort>
                </Box>
              ))}
            </VStack>
          )}
        </VStack>
      </Box>
    );
  });

  return utskrift ? (
    <HStack gap='space-16' align='stretch' wrap>
      {romkort}
    </HStack>
  ) : (
    <HGrid
      columns={{
        xs: 1,
        md: Math.max(1, Math.min(rom.length, 2)),
        xl: Math.max(1, Math.min(rom.length, 5)),
      }}
    >
      {romkort}
    </HGrid>
  );
};

const RomOgRotasjon: FC<Props> = ({
  møtedag,
  arbeidsgivere,
  jobbsøkereData,
  onTilbake,
  onNeste,
}) => {
  const [visRotasjonsplan, setVisRotasjonsplan] = useState(false);
  const utskriftsområdeRef = useRef<HTMLDivElement>(null);

  const jobbsøkereById = new Map(
    jobbsøkereData.jobbsøkere.map((jobbsøker) => [
      jobbsøker.personTreffId,
      jobbsøker,
    ]),
  );
  const arbeidsgivereById = new Map(
    arbeidsgivere.flatMap((arbeidsgiver) =>
      arbeidsgiver.arbeidsgiverTreffId
        ? [[arbeidsgiver.arbeidsgiverTreffId, arbeidsgiver] as const]
        : [],
    ),
  );

  const navnForJobbsøker = (personTreffId: string) => {
    const jobbsøker = jobbsøkereById.get(personTreffId);
    return jobbsøker
      ? formaterNavn(
          jobbsøker.etternavn,
          jobbsøker.fornavn,
          jobbsøker.personTreffId,
        )
      : 'Ukjent jobbsøker';
  };
  const navnForArbeidsgiver = (arbeidsgiverTreffId: string | null) =>
    arbeidsgiverTreffId
      ? (arbeidsgivereById.get(arbeidsgiverTreffId)?.navn ??
        'Ukjent arbeidsgiver')
      : 'Tomt';

  const rotasjonsplan = beregnRotasjonsplan(
    møtedag.arbeidsgiverRekkefølge,
    møtedag.antallRom,
    møtedag.starttidspunkt,
    møtedag.varighetPerMøteMinutter,
    møtedag.pauseMellomMøterMinutter,
  );
  const sisteRunde = rotasjonsplan.at(-1);
  const harVenteplasser = rotasjonsplan.some(
    (runde) => runde.ventendeArbeidsgivere.length > 0,
  );
  const harTommeRom = rotasjonsplan.some((runde) =>
    runde.rom.some((rom) => rom.arbeidsgiverTreffId === null),
  );

  const skrivUt = useReactToPrint({
    contentRef: utskriftsområdeRef,
    documentTitle: 'WorkOp-rom-og-rotasjonsplan',
    pageStyle: '@page { size: landscape; }',
  });

  return (
    <VStack gap='space-32'>
      <section aria-labelledby='workop-romfordeling-heading'>
        <Heading
          id='workop-romfordeling-heading'
          level='3'
          size='small'
          spacing
        >
          Romfordeling
        </Heading>
        <BodyShort spacing>
          De fremmøtte jobbsøkerne er fordelt automatisk og jevnt på{' '}
          {møtedag.rom.length} rom.
        </BodyShort>
        <Romfordeling
          rom={møtedag.rom}
          navnPåJobbsøker={navnForJobbsøker}
          idPrefiks='workop-oversikt'
        />
      </section>

      <section aria-labelledby='workop-rotasjon-heading'>
        <Heading id='workop-rotasjon-heading' level='3' size='small' spacing>
          Arbeidsgiverrotasjon
        </Heading>
        <Box background='neutral-soft' borderRadius='8' padding='space-6'>
          <VStack gap='space-12' align='start'>
            <BodyShort>
              {rotasjonsplan.length} runder fra{' '}
              {rotasjonsplan[0]?.startKlokkeslett ?? møtedag.starttidspunkt} til{' '}
              {sisteRunde?.sluttKlokkeslett ?? møtedag.starttidspunkt}. Hver
              arbeidsgiver besøker alle rom.
            </BodyShort>
            {harVenteplasser && (
              <BodyShort size='small'>
                Noen arbeidsgivere venter mellom rundene fordi det er færre rom
                enn arbeidsgivere.
              </BodyShort>
            )}
            {harTommeRom && (
              <BodyShort size='small'>
                Noen rom står tomme i enkelte runder fordi det er flere rom enn
                arbeidsgivere.
              </BodyShort>
            )}
            <Bleed marginInline='space-6'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => setVisRotasjonsplan(true)}
              >
                Vis rotasjonsplan
              </Button>
            </Bleed>
          </VStack>
        </Box>
      </section>

      <HStack gap='space-8'>
        <Button type='button' variant='secondary' onClick={onTilbake}>
          Tilbake
        </Button>
        <Button type='button' onClick={onNeste}>
          Neste
        </Button>
      </HStack>

      <Modal
        open={visRotasjonsplan}
        onClose={() => setVisRotasjonsplan(false)}
        header={{ heading: 'Rotasjonsplan', closeButton: true }}
        width='90vw'
        placement='top'
      >
        <Modal.Body>
          <div ref={utskriftsområdeRef}>
            <Heading
              level='1'
              size='medium'
              spacing
              className='hidden print:block'
            >
              WorkOp – rom og rotasjonsplan
            </Heading>

            <VStack gap='space-24'>
              <section aria-labelledby='workop-utskrift-rom-heading'>
                <Heading
                  id='workop-utskrift-rom-heading'
                  level='2'
                  size='small'
                  spacing
                >
                  Romfordeling
                </Heading>
                <Romfordeling
                  rom={møtedag.rom}
                  navnPåJobbsøker={navnForJobbsøker}
                  idPrefiks='workop-utskrift'
                  utskrift
                />
              </section>

              <section aria-labelledby='workop-utskrift-rotasjon-heading'>
                <Heading
                  id='workop-utskrift-rotasjon-heading'
                  level='2'
                  size='small'
                  spacing
                >
                  Arbeidsgiverrotasjon
                </Heading>
                <div className='overflow-x-auto'>
                  <Table size='small' zebraStripes>
                    <caption className='sr-only'>
                      Arbeidsgivernes rotasjonsplan per runde og rom
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
                        {møtedag.rom.map((rom) => (
                          <Table.HeaderCell scope='col' key={rom.romnummer}>
                            Rom {rom.romnummer}
                          </Table.HeaderCell>
                        ))}
                        {harVenteplasser && (
                          <Table.HeaderCell scope='col'>
                            Venter
                          </Table.HeaderCell>
                        )}
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {rotasjonsplan.map((runde, indeks) => {
                        const nesteRunde = rotasjonsplan[indeks + 1];
                        const visPause =
                          møtedag.pauseMellomMøterMinutter > 0 && nesteRunde;

                        return (
                          <Fragment key={runde.runde}>
                            <Table.Row>
                              <Table.HeaderCell
                                scope='row'
                                className='whitespace-nowrap'
                                style={KLOKKESLETT_CELLE_STYLE}
                              >
                                {runde.startKlokkeslett}–
                                {runde.sluttKlokkeslett}
                              </Table.HeaderCell>
                              {runde.rom.map((rom) => (
                                <Table.DataCell key={rom.romnummer}>
                                  {navnForArbeidsgiver(rom.arbeidsgiverTreffId)}
                                </Table.DataCell>
                              ))}
                              {harVenteplasser && (
                                <Table.DataCell>
                                  {runde.ventendeArbeidsgivere.length > 0
                                    ? runde.ventendeArbeidsgivere
                                        .map(navnForArbeidsgiver)
                                        .join(', ')
                                    : 'Ingen'}
                                </Table.DataCell>
                              )}
                            </Table.Row>
                            {visPause && (
                              <Table.Row>
                                <Table.HeaderCell
                                  scope='row'
                                  className='whitespace-nowrap'
                                  style={KLOKKESLETT_CELLE_STYLE}
                                >
                                  {runde.sluttKlokkeslett}–
                                  {nesteRunde.startKlokkeslett}
                                </Table.HeaderCell>
                                <Table.DataCell
                                  colSpan={
                                    runde.rom.length + Number(harVenteplasser)
                                  }
                                >
                                  <BodyShort size='small'>
                                    Pause og bytte av rom
                                  </BodyShort>
                                </Table.DataCell>
                              </Table.Row>
                            )}
                          </Fragment>
                        );
                      })}
                    </Table.Body>
                  </Table>
                </div>
              </section>
            </VStack>
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
          <Button
            type='button'
            variant='secondary'
            onClick={() => setVisRotasjonsplan(false)}
          >
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </VStack>
  );
};

export default RomOgRotasjon;
