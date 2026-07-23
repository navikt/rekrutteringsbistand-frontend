import WorkOpAutolagringsstatus from './WorkOpAutolagringsstatus';
import { lagStatusOgOppfølging } from './statusOgOppfølgingHjelpere';
import { useVurderingAutolagring } from './useVurderingAutolagring';
import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useFormidlingerForWorkOp } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type {
  MøtedagDTO,
  VurderingDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { RekrutteringstreffTabs } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import { FORMIDLING_ARBEIDSGIVERE_QUERY_PARAM } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/formidling/formidlingQuery';
import { formaterNavn } from '@/app/rekrutteringstreff/_utils/formaterNavn';
import {
  BodyShort,
  Box,
  Button,
  Checkbox,
  ErrorMessage,
  ExpansionCard,
  Heading,
  HStack,
  Link,
  Loader,
  LocalAlert,
  Select,
  Tag,
  VStack,
} from '@navikt/ds-react';
import NextLink from 'next/link';
import { useMemo } from 'react';

interface StatusOgOppfølgingProps {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkere: JobbsøkerDTO[];
  onTilbake: () => void;
  onMøtedagOppdatert: (møtedag: MøtedagDTO) => void | Promise<void>;
}

const vurderingFraSkjemaverdi = (verdi: string): VurderingDTO['vurdering'] => {
  if (verdi === 'AKTUELL' || verdi === 'KANSKJE' || verdi === 'KLADD') {
    return verdi;
  }
  return null;
};

const antallstekst = (antall: number) =>
  antall === 1 ? '1 jobbsøker' : `${antall} jobbsøkere`;

export default function StatusOgOppfølging({
  rekrutteringstreffId,
  møtedag,
  arbeidsgivere,
  jobbsøkere,
  onTilbake,
  onMøtedagOppdatert,
}: StatusOgOppfølgingProps) {
  const {
    data: formidlingerData,
    isLoading: henterFormidlinger,
    error: formidlingerFeil,
  } = useFormidlingerForWorkOp(rekrutteringstreffId);
  const {
    effektivMøtedag,
    feilForVurdering,
    harLagringsfeil,
    harVentendeLagring,
    kunngjøring,
    lagreVurdering,
  } = useVurderingAutolagring({
    rekrutteringstreffId,
    møtedag,
    onMøtedagOppdatert,
  });
  const kort = useMemo(
    () =>
      lagStatusOgOppfølging({
        møtedag: effektivMøtedag,
        arbeidsgivere,
        jobbsøkere,
        formidlinger: formidlingerData,
      }),
    [arbeidsgivere, effektivMøtedag, formidlingerData, jobbsøkere],
  );
  const førsteKortMedJobbsøkere =
    kort.find(({ rader }) => rader.length > 0) ?? kort[0];

  return (
    <VStack gap='space-24'>
      <section
        aria-labelledby='workop-status-og-oppfølging-heading'
        aria-busy={harVentendeLagring}
      >
        <VStack gap='space-16'>
          <VStack gap='space-8'>
            <HStack gap='space-16' align='center' justify='space-between'>
              <Heading
                id='workop-status-og-oppfølging-heading'
                level='3'
                size='small'
              >
                Status og oppfølging
              </Heading>
              <WorkOpAutolagringsstatus
                lagrer={harVentendeLagring}
                feil={harLagringsfeil}
                kunngjøring={kunngjøring}
              />
            </HStack>
            <BodyShort>
              Oppsummer speedintervjuene og registrer videre oppfølging for hver
              arbeidsgiver. Endringer lagres med en gang.
            </BodyShort>
          </VStack>

          {henterFormidlinger && (
            <HStack gap='space-8' align='center'>
              <Loader size='small' title='Henter formidlinger' />
              <BodyShort size='small'>
                Henter status fra Formidlinger …
              </BodyShort>
            </HStack>
          )}

          {formidlingerFeil && (
            <LocalAlert status='warning'>
              <LocalAlert.Content>
                Fikk ikke hentet «Fått jobben» fra Formidlinger. Du kan fortsatt
                registrere andre statuser.
              </LocalAlert.Content>
            </LocalAlert>
          )}

          {kort.map(({ arbeidsgiver, rader }) => {
            const headingId = `status-og-oppfølging-${arbeidsgiver.arbeidsgiverTreffId}`;
            const formidlingerHref = `?visFane=${RekrutteringstreffTabs.FORMIDLINGER}&${FORMIDLING_ARBEIDSGIVERE_QUERY_PARAM}=${encodeURIComponent(arbeidsgiver.organisasjonsnummer)}`;

            return (
              <ExpansionCard
                key={arbeidsgiver.arbeidsgiverTreffId}
                aria-labelledby={headingId}
                defaultOpen={
                  arbeidsgiver.arbeidsgiverTreffId ===
                  førsteKortMedJobbsøkere?.arbeidsgiver.arbeidsgiverTreffId
                }
              >
                <ExpansionCard.Header>
                  <ExpansionCard.Title id={headingId} as='h4'>
                    {arbeidsgiver.navn}
                  </ExpansionCard.Title>
                  <ExpansionCard.Description>
                    {antallstekst(rader.length)}
                  </ExpansionCard.Description>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                  {rader.length === 0 ? (
                    <BodyShort>
                      Ingen jobbsøkere med status hos denne arbeidsgiveren.
                    </BodyShort>
                  ) : (
                    <VStack
                      as='ul'
                      gap='space-12'
                      className='m-0 list-none p-0'
                    >
                      {rader.map((rad) => {
                        const jobbsøkernavn = formaterNavn(
                          rad.jobbsøker.etternavn,
                          rad.jobbsøker.fornavn,
                          'Ukjent navn',
                        );
                        const lagringsfeil = feilForVurdering(rad.vurdering);

                        return (
                          <Box
                            as='li'
                            key={rad.jobbsøker.personTreffId}
                            background='neutral-soft'
                            borderColor='neutral-subtle'
                            borderWidth='1'
                            borderRadius='8'
                            padding={{ xs: 'space-12', md: 'space-16' }}
                          >
                            <VStack gap='space-12'>
                              <HStack
                                gap='space-8'
                                justify='space-between'
                                align='center'
                                wrap
                              >
                                <BodyShort weight='semibold'>
                                  {jobbsøkernavn}
                                </BodyShort>
                                <HStack gap='space-8' wrap>
                                  {rad.ønsketIntervju && (
                                    <Tag
                                      size='small'
                                      variant='outline'
                                      data-color='info'
                                    >
                                      Ønsket intervju
                                    </Tag>
                                  )}
                                  {rad.sattOppTilSpeedintervju && (
                                    <Tag
                                      size='small'
                                      variant='outline'
                                      data-color='meta-purple'
                                    >
                                      Satt opp til speedintervju
                                    </Tag>
                                  )}
                                  {rad.fåttJobben && (
                                    <Tag size='small' variant='success'>
                                      Fått jobben
                                    </Tag>
                                  )}
                                </HStack>
                              </HStack>

                              {rad.fåttJobben && (
                                <Link as={NextLink} href={formidlingerHref}>
                                  Se formidling
                                </Link>
                              )}

                              <HStack gap='space-16' align='end' wrap>
                                <Box width='18rem' maxWidth='100%'>
                                  <Select
                                    label='Vurdering etter speedintervju'
                                    size='small'
                                    aria-label={`Vurdering etter speedintervju for ${jobbsøkernavn} hos ${arbeidsgiver.navn}`}
                                    value={rad.vurdering.vurdering ?? ''}
                                    onChange={(event) =>
                                      lagreVurdering(
                                        {
                                          ...rad.vurdering,
                                          vurdering: vurderingFraSkjemaverdi(
                                            event.target.value,
                                          ),
                                        },
                                        jobbsøkernavn,
                                      )
                                    }
                                  >
                                    <option value=''>Ingen vurdering</option>
                                    <option value='AKTUELL'>Aktuell</option>
                                    <option value='KANSKJE'>Kanskje</option>
                                    <option value='KLADD'>Kladd</option>
                                  </Select>
                                </Box>
                                <HStack gap='space-16' align='center' wrap>
                                  <Checkbox
                                    size='small'
                                    aria-label={`2. intervju for ${jobbsøkernavn} hos ${arbeidsgiver.navn}`}
                                    checked={rad.vurdering.andreIntervju}
                                    onChange={(event) =>
                                      lagreVurdering(
                                        {
                                          ...rad.vurdering,
                                          andreIntervju:
                                            event.currentTarget.checked,
                                        },
                                        jobbsøkernavn,
                                      )
                                    }
                                  >
                                    2. intervju
                                  </Checkbox>
                                  <Checkbox
                                    size='small'
                                    aria-label={`Jobbtilbud for ${jobbsøkernavn} hos ${arbeidsgiver.navn}`}
                                    checked={rad.vurdering.jobbtilbud}
                                    onChange={(event) =>
                                      lagreVurdering(
                                        {
                                          ...rad.vurdering,
                                          jobbtilbud:
                                            event.currentTarget.checked,
                                        },
                                        jobbsøkernavn,
                                      )
                                    }
                                  >
                                    Jobbtilbud
                                  </Checkbox>
                                </HStack>
                              </HStack>
                              {lagringsfeil && (
                                <ErrorMessage>{lagringsfeil}</ErrorMessage>
                              )}
                            </VStack>
                          </Box>
                        );
                      })}
                    </VStack>
                  )}
                </ExpansionCard.Content>
              </ExpansionCard>
            );
          })}
        </VStack>
      </section>

      <HStack>
        <Button
          type='button'
          variant='secondary'
          onClick={onTilbake}
          disabled={harVentendeLagring}
        >
          Tilbake
        </Button>
      </HStack>
    </VStack>
  );
}
