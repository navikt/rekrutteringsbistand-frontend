import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useFormidlingerForWorkOp } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/StegHeader';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/Stegnavigasjon';
import { lagOppsummering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/oppsummeringHjelpere';
import { lagRegistreringAvStatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/registreringAvStatusHjelpere';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import {
  BodyShort,
  Box,
  Button,
  HGrid,
  HStack,
  Heading,
  Loader,
  LocalAlert,
  Table,
  VStack,
} from '@navikt/ds-react';
import { useMemo } from 'react';

interface OppsummeringProps {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkere: JobbsøkerDTO[];
  antallPåmeldte: number;
  onTilbake: () => void;
}

const Nøkkeltall = ({
  etikett,
  verdi,
  forklaring,
}: {
  etikett: string;
  verdi: number;
  forklaring?: string;
}) => (
  <Box
    role='group'
    aria-label={`${etikett}: ${verdi}`}
    background='neutral-soft'
    borderRadius='8'
    padding='space-16'
    className='h-full'
  >
    <VStack gap='space-2'>
      <BodyShort as='span' className='text-3xl font-semibold'>
        {verdi}
      </BodyShort>
      <BodyShort weight='semibold'>{etikett}</BodyShort>
      {forklaring && <BodyShort size='small'>{forklaring}</BodyShort>}
    </VStack>
  </Box>
);

export default function Oppsummering({
  rekrutteringstreffId,
  møtedag,
  arbeidsgivere,
  jobbsøkere,
  antallPåmeldte,
  onTilbake,
}: OppsummeringProps) {
  const {
    data: formidlingerData,
    isLoading: henterFormidlinger,
    error: formidlingerFeil,
  } = useFormidlingerForWorkOp(rekrutteringstreffId);

  const oppsummering = useMemo(
    () =>
      lagOppsummering({
        registreringer: lagRegistreringAvStatus({
          møtedag,
          arbeidsgivere,
          jobbsøkere,
          formidlinger: formidlingerData,
        }),
        antallMøtt: møtedag.oppmøte.length,
        antallPåmeldte,
        antallIntervjuer: møtedag.intervjufordelinger.reduce(
          (sum, fordeling) => sum + fordeling.inkludertePersonTreffIder.length,
          0,
        ),
      }),
    [møtedag, arbeidsgivere, jobbsøkere, formidlingerData, antallPåmeldte],
  );

  return (
    <VStack gap='space-32'>
      <Stegnavigasjon>
        <Button type='button' variant='secondary' onClick={onTilbake}>
          Tilbake
        </Button>
      </Stegnavigasjon>

      <section aria-labelledby='workop-oppsummering-heading'>
        <VStack gap='space-16'>
          <StegHeader
            id='workop-oppsummering-heading'
            tittel='Oppsummering'
            beskrivelse='Nøkkeltall for hele treffet. Hver kandidat telles én gang, med den mest positive vurderinga hen har fått.'
          />

          {formidlingerFeil && (
            <LocalAlert as='div' status='warning'>
              <LocalAlert.Content>
                Klarte ikke å hente formidlinger. Tallet for formidlede
                kandidater kan være for lavt.
              </LocalAlert.Content>
            </LocalAlert>
          )}

          {henterFormidlinger ? (
            <HStack gap='space-8' align='center'>
              <Loader size='small' aria-hidden />
              <BodyShort>Henter oppsummering …</BodyShort>
            </HStack>
          ) : (
            <VStack gap='space-24'>
              <section aria-labelledby='workop-oppsummering-nokkeltall-heading'>
                <Heading
                  id='workop-oppsummering-nokkeltall-heading'
                  level='4'
                  size='xsmall'
                  spacing
                >
                  Nøkkeltall
                </Heading>
                <HGrid columns={{ xs: 1, sm: 2, lg: 4 }} gap='space-16'>
                  <Nøkkeltall
                    etikett='Aktuelle kandidater'
                    verdi={oppsummering.aktuelle}
                    forklaring='Aktuell hos minst én arbeidsgiver'
                  />
                  <Nøkkeltall
                    etikett='Til andre intervju'
                    verdi={oppsummering.andregangsintervju}
                  />
                  <Nøkkeltall etikett='Kanskje' verdi={oppsummering.kanskje} />
                  <Nøkkeltall
                    etikett='Ikke aktuelle'
                    verdi={oppsummering.ikkeAktuelle}
                  />
                  <Nøkkeltall
                    etikett='Ikke vurdert'
                    verdi={oppsummering.ikkeVurdert}
                    forklaring='Registrert, men uten vurdering'
                  />
                  <Nøkkeltall
                    etikett='Formidlet'
                    verdi={oppsummering.formidlet}
                  />
                  <Nøkkeltall
                    etikett='Møtt'
                    verdi={oppsummering.antallMøtt}
                    forklaring={`Av ${oppsummering.antallPåmeldte} påmeldte`}
                  />
                  <Nøkkeltall
                    etikett='Intervjuer'
                    verdi={oppsummering.antallIntervjuer}
                    forklaring={`Fordelt på ${oppsummering.antallArbeidsgivere} arbeidsgivere`}
                  />
                </HGrid>
              </section>

              <section aria-labelledby='workop-oppsummering-arbeidsgivere-heading'>
                <Heading
                  id='workop-oppsummering-arbeidsgivere-heading'
                  level='4'
                  size='xsmall'
                  spacing
                >
                  Per arbeidsgiver
                </Heading>
                {oppsummering.perArbeidsgiver.length === 0 ? (
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
                          <Table.HeaderCell
                            scope='col'
                            className='w-64 align-bottom'
                          >
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
                        {oppsummering.perArbeidsgiver.map((rad) => (
                          <Table.Row key={rad.arbeidsgiverTreffId}>
                            <Table.HeaderCell scope='row' className='max-w-64'>
                              <AvkortetTekst>{rad.navn}</AvkortetTekst>
                            </Table.HeaderCell>
                            <Table.DataCell align='center'>
                              {rad.antallVurdert}
                            </Table.DataCell>
                            <Table.DataCell align='center'>
                              {rad.aktuelle}
                            </Table.DataCell>
                            <Table.DataCell align='center'>
                              {rad.andregangsintervju}
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
            </VStack>
          )}
        </VStack>
      </section>
    </VStack>
  );
}
