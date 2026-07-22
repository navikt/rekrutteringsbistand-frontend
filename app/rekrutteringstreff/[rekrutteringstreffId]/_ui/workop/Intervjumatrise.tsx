import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { formaterNavn } from '@/app/rekrutteringstreff/_utils/formaterNavn';
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
  antallForJobbsøker: (personTreffId: string) => number;
  antallForArbeidsgiver?: (arbeidsgiverTreffId: string) => number;
  renderCelle: (props: CelleProps) => ReactNode;
}

const Intervjumatrise: FC<Props> = ({
  caption,
  idPrefiks,
  arbeidsgivere,
  jobbsøkere,
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
    <div className='overflow-x-auto'>
      <Table size='small' zebraStripes>
        <caption className='sr-only'>{caption}</caption>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope='col'>Jobbsøker</Table.HeaderCell>
            {arbeidsgivereMedId.map((arbeidsgiver, arbeidsgiverIndeks) => (
              <Table.HeaderCell
                id={`${idPrefiks}-arbeidsgiver-${arbeidsgiverIndeks}`}
                scope='col'
                key={arbeidsgiver.arbeidsgiverTreffId}
                className='min-w-40'
              >
                <VStack gap='space-2'>
                  <span>{arbeidsgiver.navn}</span>
                  {antallForArbeidsgiver && (
                    <BodyShort as='span' size='small' weight='regular'>
                      {antallForArbeidsgiver(arbeidsgiver.arbeidsgiverTreffId)}{' '}
                      tildelt
                    </BodyShort>
                  )}
                </VStack>
              </Table.HeaderCell>
            ))}
            <Table.HeaderCell scope='col'>Totalt</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {jobbsøkere.map((jobbsøker, jobbsøkerIndeks) => {
            const radId = `${idPrefiks}-jobbsoker-${jobbsøkerIndeks}`;
            return (
              <Table.Row key={jobbsøker.personTreffId}>
                <Table.HeaderCell id={radId} scope='row'>
                  {formaterNavn(
                    jobbsøker.etternavn,
                    jobbsøker.fornavn,
                    jobbsøker.personTreffId,
                  )}
                </Table.HeaderCell>
                {arbeidsgivereMedId.map((arbeidsgiver, arbeidsgiverIndeks) => {
                  const kolonneId = `${idPrefiks}-arbeidsgiver-${arbeidsgiverIndeks}`;
                  return (
                    <Table.DataCell
                      key={arbeidsgiver.arbeidsgiverTreffId}
                      align='center'
                    >
                      {renderCelle({
                        personTreffId: jobbsøker.personTreffId,
                        arbeidsgiverTreffId: arbeidsgiver.arbeidsgiverTreffId,
                        ariaLabelledBy: `${radId} ${kolonneId}`,
                      })}
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
