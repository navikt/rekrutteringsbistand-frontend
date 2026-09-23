'use client';

import type { RomDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import Utskriftsmodal, {
  Utskriftsseksjon,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/Utskriftsmodal';
import { KLOKKESLETT_CELLE_STYLE } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/Rotasjonsmatrise';
import type {
  Arbeidsgiverplan,
  Romplan,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/utskriftsplan';
import { BodyShort, Table, VStack } from '@navikt/ds-react';
import type { FC } from 'react';

export type Utskriftsvariant = 'arbeidsgivere' | 'jobbsøkere' | null;

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
  const tilJobbsøkere = variant === 'jobbsøkere';

  return (
    <Utskriftsmodal
      åpen={variant !== null}
      tittel={
        tilJobbsøkere ? 'Utskrift til jobbsøkere' : 'Utskrift til arbeidsgivere'
      }
      dokumenttittel={
        tilJobbsøkere
          ? 'WorkOp-romplan-jobbsokere'
          : 'WorkOp-romplan-arbeidsgivere'
      }
      sidestil='@page { size: portrait; }'
      onLukk={onLukk}
    >
      {tilJobbsøkere
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
                  <VStack as='ul' gap='space-2' marginBlock='space-0 space-16'>
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
              tittel={navnForArbeidsgiver(arbeidsgiverplan.arbeidsgiverTreffId)}
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
    </Utskriftsmodal>
  );
};

export default RomOgRotasjonUtskrift;
