'use client';

import type { RotasjonsRunde } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import { Heading, Table } from '@navikt/ds-react';
import type { FC } from 'react';

/** Luft mellom klokkeslettkolonnen og resten av tabellen. */
export const KLOKKESLETT_CELLE_STYLE = {
  paddingInlineEnd: 'var(--ax-space-32)',
};

interface Props {
  rotasjonsplan: RotasjonsRunde[];
  /** Vis «Venter»-kolonnen, dvs. når det er flere arbeidsgivere enn rom. */
  harVenteplasser: boolean;
  navnForArbeidsgiver: (arbeidsgiverTreffId: string | null) => string;
}

const Rotasjonsmatrise: FC<Props> = ({
  rotasjonsplan,
  harVenteplasser,
  navnForArbeidsgiver,
}) => {
  const romIRotasjonen = rotasjonsplan[0]?.rom ?? [];

  return (
    <section aria-labelledby='workop-rotasjonsmatrise-heading'>
      <Heading
        id='workop-rotasjonsmatrise-heading'
        level='4'
        size='xsmall'
        spacing
      >
        Hvem er i hvilket rom
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
              {romIRotasjonen.map((rom) => (
                <Table.HeaderCell scope='col' key={rom.romnummer}>
                  Rom {rom.romnummer}
                </Table.HeaderCell>
              ))}
              {harVenteplasser && (
                <Table.HeaderCell scope='col'>Venter</Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rotasjonsplan.map((runde) => (
              <Table.Row key={runde.runde}>
                <Table.HeaderCell
                  scope='row'
                  className='whitespace-nowrap'
                  style={KLOKKESLETT_CELLE_STYLE}
                >
                  {runde.startKlokkeslett}–{runde.sluttKlokkeslett}
                </Table.HeaderCell>
                {runde.rom.map((rom) => (
                  <Table.DataCell key={rom.romnummer} className='max-w-48'>
                    <AvkortetTekst>
                      {navnForArbeidsgiver(rom.arbeidsgiverTreffId)}
                    </AvkortetTekst>
                  </Table.DataCell>
                ))}
                {harVenteplasser && (
                  <Table.DataCell className='max-w-48'>
                    <AvkortetTekst>
                      {runde.ventendeArbeidsgivere.length > 0
                        ? runde.ventendeArbeidsgivere
                            .map(navnForArbeidsgiver)
                            .join(', ')
                        : 'Ingen'}
                    </AvkortetTekst>
                  </Table.DataCell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </section>
  );
};

export default Rotasjonsmatrise;
