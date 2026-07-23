import { lagStatusOgOppfølging } from './statusOgOppfølgingHjelpere';
import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useFormidlingerForWorkOp } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { oppdaterVurdering } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
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
import { useMemo, useState } from 'react';

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

const erTomVurdering = (vurdering: VurderingDTO) =>
  vurdering.vurdering === null &&
  !vurdering.andreIntervju &&
  !vurdering.jobbtilbud;

const medOptimistiskVurdering = (
  møtedag: MøtedagDTO,
  vurdering: VurderingDTO,
): MøtedagDTO => {
  const øvrigeVurderinger = møtedag.vurderinger.filter(
    (eksisterende) =>
      eksisterende.personTreffId !== vurdering.personTreffId ||
      eksisterende.arbeidsgiverTreffId !== vurdering.arbeidsgiverTreffId,
  );

  return {
    ...møtedag,
    vurderinger: erTomVurdering(vurdering)
      ? øvrigeVurderinger
      : [...øvrigeVurderinger, vurdering],
  };
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
  const [optimistiskVurdering, setOptimistiskVurdering] =
    useState<VurderingDTO | null>(null);
  const [lagrerNøkkel, setLagrerNøkkel] = useState<string | null>(null);
  const [feil, setFeil] = useState<string | null>(null);
  const [kunngjøring, setKunngjøring] = useState('');
  const effektivMøtedag = useMemo(
    () =>
      optimistiskVurdering
        ? medOptimistiskVurdering(møtedag, optimistiskVurdering)
        : møtedag,
    [møtedag, optimistiskVurdering],
  );
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

  const lagre = async (nesteVurdering: VurderingDTO, jobbsøkernavn: string) => {
    const nøkkel = `${nesteVurdering.arbeidsgiverTreffId}-${nesteVurdering.personTreffId}`;
    setFeil(null);
    setKunngjøring('');
    setLagrerNøkkel(nøkkel);
    setOptimistiskVurdering(nesteVurdering);

    try {
      const oppdatertMøtedag = await oppdaterVurdering(
        rekrutteringstreffId,
        nesteVurdering,
      );
      await onMøtedagOppdatert(oppdatertMøtedag);
      setOptimistiskVurdering(null);
      setKunngjøring(`Status for ${jobbsøkernavn} er lagret.`);
    } catch {
      setOptimistiskVurdering(null);
      setFeil('Kunne ikke lagre statusen. Prøv igjen.');
    } finally {
      setLagrerNøkkel(null);
    }
  };

  return (
    <VStack gap='space-24'>
      <section
        aria-labelledby='workop-status-og-oppfølging-heading'
        aria-busy={lagrerNøkkel !== null}
      >
        <Heading
          id='workop-status-og-oppfølging-heading'
          level='3'
          size='small'
          spacing
        >
          Status og oppfølging
        </Heading>
        <BodyShort spacing>
          Oppsummer speedintervjuene og registrer videre oppfølging for hver
          arbeidsgiver. Endringer lagres med en gang.
        </BodyShort>

        {henterFormidlinger && (
          <HStack gap='space-8' align='center'>
            <Loader size='small' title='Henter formidlinger' />
            <BodyShort size='small'>Henter status fra Formidlinger …</BodyShort>
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

        <VStack gap='space-16'>
          {kort.map(({ arbeidsgiver, rader }) => {
            const headingId = `status-og-oppfølging-${arbeidsgiver.arbeidsgiverTreffId}`;
            const formidlingerHref = `?visFane=${RekrutteringstreffTabs.FORMIDLINGER}&${FORMIDLING_ARBEIDSGIVERE_QUERY_PARAM}=${encodeURIComponent(arbeidsgiver.organisasjonsnummer)}`;

            return (
              <ExpansionCard
                key={arbeidsgiver.arbeidsgiverTreffId}
                aria-labelledby={headingId}
                defaultOpen
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
                        const lagringsnøkkel = `${arbeidsgiver.arbeidsgiverTreffId}-${rad.jobbsøker.personTreffId}`;
                        const lagrerDenne = lagrerNøkkel === lagringsnøkkel;

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
                                    aria-label={`Vurdering etter speedintervju for ${jobbsøkernavn} hos ${arbeidsgiver.navn}`}
                                    value={rad.vurdering.vurdering ?? ''}
                                    disabled={lagrerNøkkel !== null}
                                    onChange={(event) =>
                                      void lagre(
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
                                    aria-label={`2. intervju for ${jobbsøkernavn} hos ${arbeidsgiver.navn}`}
                                    checked={rad.vurdering.andreIntervju}
                                    disabled={lagrerNøkkel !== null}
                                    onChange={(event) =>
                                      void lagre(
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
                                    aria-label={`Jobbtilbud for ${jobbsøkernavn} hos ${arbeidsgiver.navn}`}
                                    checked={rad.vurdering.jobbtilbud}
                                    disabled={lagrerNøkkel !== null}
                                    onChange={(event) =>
                                      void lagre(
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
                              {lagrerDenne && (
                                <BodyShort size='small'>Lagrer …</BodyShort>
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

      <div className='sr-only' aria-live='polite' aria-atomic='true'>
        {kunngjøring}
      </div>

      {feil && (
        <LocalAlert status='error'>
          <LocalAlert.Content>{feil}</LocalAlert.Content>
        </LocalAlert>
      )}

      <HStack>
        <Button
          type='button'
          variant='secondary'
          onClick={onTilbake}
          disabled={lagrerNøkkel !== null}
        >
          Tilbake
        </Button>
      </HStack>
    </VStack>
  );
}
