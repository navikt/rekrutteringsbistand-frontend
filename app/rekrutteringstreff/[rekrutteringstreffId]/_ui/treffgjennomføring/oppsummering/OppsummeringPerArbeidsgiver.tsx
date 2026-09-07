import type { OppsummeringForArbeidsgiver } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppsummering/lagOppsummering';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import { BodyShort, Heading, Table } from '@navikt/ds-react';

export default function OppsummeringPerArbeidsgiver({
  rader,
}: {
  rader: OppsummeringForArbeidsgiver[];
}) {
  return (
    <section aria-labelledby='workop-oppsummering-arbeidsgivere-heading'>
      <Heading
        id='workop-oppsummering-arbeidsgivere-heading'
        level='4'
        size='xsmall'
        spacing
      >
        Per arbeidsgiver
      </Heading>
      {rader.length === 0 ? (
        <BodyShort>Ingen arbeidsgivere er registrert ennå.</BodyShort>
      ) : (
        <div className='overflow-x-auto'>
          <Table
            size='small'
            zebraStripes
            className='table-fixed'
            style={{ width: 'max-content' }}
          >
            <caption className='sr-only'>
              Vurderinger og formidlinger per arbeidsgiver
            </caption>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell scope='col' className='w-64 align-bottom'>
                  Arbeidsgiver
                </Table.HeaderCell>
                <Table.HeaderCell
                  scope='col'
                  align='center'
                  className='w-32 align-bottom'
                >
                  Vurdert
                </Table.HeaderCell>
                <Table.HeaderCell
                  scope='col'
                  align='center'
                  className='w-32 align-bottom'
                >
                  Aktuelle
                </Table.HeaderCell>
                <Table.HeaderCell
                  scope='col'
                  align='center'
                  className='w-32 align-bottom'
                >
                  Andre intervju
                </Table.HeaderCell>
                <Table.HeaderCell
                  scope='col'
                  align='center'
                  className='w-32 align-bottom'
                >
                  Formidlet
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rader.map((rad) => (
                <Table.Row key={rad.arbeidsgiverTreffId}>
                  <Table.HeaderCell scope='row' className='max-w-64'>
                    <AvkortetTekst>{rad.navn}</AvkortetTekst>
                  </Table.HeaderCell>
                  <Table.DataCell align='center'>
                    {rad.antallVurdert}
                  </Table.DataCell>
                  <Table.DataCell align='center'>{rad.aktuelle}</Table.DataCell>
                  <Table.DataCell align='center'>
                    {rad.avtaltIntervju}
                  </Table.DataCell>
                  <Table.DataCell align='center'>
                    {rad.formidlet}
                  </Table.DataCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </section>
  );
}
