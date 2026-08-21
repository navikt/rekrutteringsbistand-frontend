import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type { Navnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringNavn';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import { BodyShort, Table, VStack } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface CelleProps {
  personTreffId: string;
  arbeidsgiverTreffId: string;
  ariaLabelledBy: string;
}

interface Props {
  caption: string;
  idPrefiks: string;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkere: JobbsøkerDTO[];
  visNavn: Navnvisning;
  antallForJobbsøker: (personTreffId: string) => number;
  antallForArbeidsgiver?: (arbeidsgiverTreffId: string) => number;
  renderCelle: (props: CelleProps) => ReactNode;
}

const Intervjumatrise: FC<Props> = ({
  caption,
  idPrefiks,
  arbeidsgivere,
  jobbsøkere,
  visNavn,
  antallForJobbsøker,
  antallForArbeidsgiver,
  renderCelle,
}) => {
  const arbeidsgivereMedId = arbeidsgivere.filter(
    (
      arbeidsgiver,
    ): arbeidsgiver is ArbeidsgiverDTO & { arbeidsgiverTreffId: string } =>
      Boolean(arbeidsgiver.arbeidsgiverTreffId),
  );

  return (
    <div className='max-h-[60vh] overflow-auto'>
      <Table
        size='small'
        zebraStripes
        stickyHeader
        style={{ width: 'max-content' }}
      >
        <caption className='sr-only'>{caption}</caption>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope='col' className='w-48 align-bottom'>
              Jobbsøker
            </Table.HeaderCell>
            {arbeidsgivereMedId.map((arbeidsgiver, arbeidsgiverIndeks) => (
              <Table.HeaderCell
                id={`${idPrefiks}-arbeidsgiver-${arbeidsgiverIndeks}`}
                scope='col'
                key={arbeidsgiver.arbeidsgiverTreffId}
                className='max-w-56 min-w-32 align-bottom'
              >
                <VStack gap='space-2'>
                  <span className='line-clamp-2' title={arbeidsgiver.navn}>
                    {arbeidsgiver.navn}
                  </span>
                  {antallForArbeidsgiver && (
                    <BodyShort as='span' size='small' weight='regular'>
                      {antallForArbeidsgiver(arbeidsgiver.arbeidsgiverTreffId)}{' '}
                      tildelt
                    </BodyShort>
                  )}
                </VStack>
              </Table.HeaderCell>
            ))}
            <Table.HeaderCell scope='col' className='w-20 align-bottom'>
              Totalt
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {jobbsøkere.map((jobbsøker, jobbsøkerIndeks) => {
            const radId = `${idPrefiks}-jobbsoker-${jobbsøkerIndeks}`;
            return (
              <Table.Row key={jobbsøker.personTreffId}>
                <Table.HeaderCell id={radId} scope='row'>
                  <AvkortetTekst className='max-w-44'>
                    {visNavn(jobbsøker, jobbsøker.personTreffId)}
                  </AvkortetTekst>
                </Table.HeaderCell>
                {arbeidsgivereMedId.map((arbeidsgiver, arbeidsgiverIndeks) => {
                  const kolonneId = `${idPrefiks}-arbeidsgiver-${arbeidsgiverIndeks}`;
                  return (
                    <Table.DataCell
                      key={arbeidsgiver.arbeidsgiverTreffId}
                      align='center'
                    >
                      <div className='flex justify-center'>
                        {renderCelle({
                          personTreffId: jobbsøker.personTreffId,
                          arbeidsgiverTreffId: arbeidsgiver.arbeidsgiverTreffId,
                          ariaLabelledBy: `${radId} ${kolonneId}`,
                        })}
                      </div>
                    </Table.DataCell>
                  );
                })}
                <Table.DataCell align='center'>
                  {antallForJobbsøker(jobbsøker.personTreffId)}
                </Table.DataCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Intervjumatrise;
