import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useFormidlingerForTreffgjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type {
  TreffgjennomføringDTO,
  VurderingDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { alleInnsatsgrupper } from '@/app/kandidat/_ui/innsatsgrupper';
import { RekrutteringstreffTabs } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import { FORMIDLING_ARBEIDSGIVERE_QUERY_PARAM } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/formidling/formidlingQuery';
import { AndregangsintervjuDato } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/AndregangsintervjuDato';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/StegHeader';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Stegnavigasjon';
import { VurderingsNotater } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/VurderingsNotater';
import { lagRegistreringAvStatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/registreringAvStatusHjelpere';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringNavn';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useRapporterLagringsstatus';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useTreffgjennomføringFane';
import { useVurderingAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useVurderingAutolagring';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import {
  BodyShort,
  Box,
  Button,
  Checkbox,
  ErrorMessage,
  ExpansionCard,
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

interface RegistreringAvStatusProps {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkere: JobbsøkerDTO[];
  onTilbake: () => void;
  onNeste: () => void;
  onTreffgjennomføringOppdatert: TreffgjennomføringOppdatering;
  onLagringsstatusEndret: (lagrer: boolean) => void;
}

const vurderingFraSkjemaverdi = (verdi: string): VurderingDTO['vurdering'] => {
  if (verdi === 'AKTUELL' || verdi === 'KANSKJE' || verdi === 'IKKE_AKTUELL') {
    return verdi;
  }
  return null;
};

const antallstekst = (antall: number) =>
  antall === 1 ? '1 jobbsøker' : `${antall} jobbsøkere`;

const innsatsbehovEtikett = (innsatsgruppe: string | null): string | null => {
  if (!innsatsgruppe) return null;
  const oppslag =
    alleInnsatsgrupper[innsatsgruppe as keyof typeof alleInnsatsgrupper];
  return oppslag?.label ?? null;
};

export default function RegistreringAvStatus({
  rekrutteringstreffId,
  treffgjennomføring,
  arbeidsgivere,
  jobbsøkere,
  onTilbake,
  onNeste,
  onTreffgjennomføringOppdatert,
  onLagringsstatusEndret,
}: RegistreringAvStatusProps) {
  const {
    data: formidlingerData,
    isLoading: henterFormidlinger,
    error: formidlingerFeil,
  } = useFormidlingerForTreffgjennomføring(rekrutteringstreffId);
  const {
    effektivTreffgjennomføring,
    feilForVurdering,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreVurdering,
  } = useVurderingAutolagring({
    rekrutteringstreffId,
    treffgjennomføring,
    onTreffgjennomføringOppdatert,
  });
  const kort = useMemo(
    () =>
      lagRegistreringAvStatus({
        treffgjennomføring: effektivTreffgjennomføring,
        arbeidsgivere,
        jobbsøkere,
        formidlinger: formidlingerData,
      }),
    [arbeidsgivere, effektivTreffgjennomføring, formidlingerData, jobbsøkere],
  );
  const visNavn = useMemo(
    () => lagNavnvisning(effektivTreffgjennomføring),
    [effektivTreffgjennomføring],
  );
  const [åpenStatusPerKort, setÅpenStatusPerKort] = useState<
    Partial<Record<string, boolean>>
  >({});
  useRapporterLagringsstatus(harVentendeLagring, onLagringsstatusEndret);

  return (
    <VStack gap='space-24'>
      <Stegnavigasjon>
        <Button
          type='button'
          variant='secondary'
          onClick={onTilbake}
          disabled={harVentendeLagring}
        >
          Tilbake
        </Button>
        <Button type='button' onClick={onNeste} disabled={harVentendeLagring}>
          Neste
        </Button>
      </Stegnavigasjon>

      <section
        aria-labelledby='workop-registrering-av-status-heading'
        aria-busy={harVentendeLagring}
      >
        <VStack gap='space-16'>
          <StegHeader
            id='workop-registrering-av-status-heading'
            tittel='Registrering av status'
            beskrivelse='Registrer vurdering og videre oppfølging for hver jobbsøker hos arbeidsgiverne. Endringer lagres med en gang.'
            lagrer={harVentendeLagring}
            feil={harLagringsfeil}
            statusmelding={statusmelding}
          />

          {henterFormidlinger && (
            <HStack gap='space-8' align='center'>
              <Loader size='small' title='Henter formidlinger' />
              <BodyShort size='small'>
                Henter status fra Formidlinger …
              </BodyShort>
            </HStack>
          )}

          {formidlingerFeil && (
            <LocalAlert as='div' status='warning'>
              <LocalAlert.Content>
                Fikk ikke hentet «Formidlet» fra Formidlinger. Du kan fortsatt
                registrere andre statuser.
              </LocalAlert.Content>
            </LocalAlert>
          )}
          <div className='grid grid-cols-[repeat(auto-fit,minmax(34rem,1fr))] items-start gap-4'>
            {kort.map(({ arbeidsgiver, rader }) => {
              const headingId = `registrering-av-status-${arbeidsgiver.arbeidsgiverTreffId}`;
              const formidlingerHref = `?visFane=${RekrutteringstreffTabs.FORMIDLINGER}&${FORMIDLING_ARBEIDSGIVERE_QUERY_PARAM}=${encodeURIComponent(arbeidsgiver.organisasjonsnummer)}`;

              return (
                <ExpansionCard
                  key={arbeidsgiver.arbeidsgiverTreffId}
                  aria-labelledby={headingId}
                  open={
                    åpenStatusPerKort[arbeidsgiver.arbeidsgiverTreffId] ??
                    rader.length > 0
                  }
                  onToggle={(åpen) =>
                    setÅpenStatusPerKort((forrige) => ({
                      ...forrige,
                      [arbeidsgiver.arbeidsgiverTreffId]: åpen,
                    }))
                  }
                >
                  <ExpansionCard.Header>
                    <ExpansionCard.Title id={headingId} as='h4'>
                      <AvkortetTekst>{arbeidsgiver.navn}</AvkortetTekst>
                    </ExpansionCard.Title>
                    <ExpansionCard.Description>
                      {antallstekst(rader.length)}
                    </ExpansionCard.Description>
                  </ExpansionCard.Header>
                  <ExpansionCard.Content className='[&>.aksel-expansioncard\_\_content-inner]:min-w-0'>
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
                          const jobbsøkernavn = visNavn(
                            rad.jobbsøker,
                            'Ukjent navn',
                          );
                          const innsatsbehov = innsatsbehovEtikett(
                            rad.jobbsøker.innsatsgruppe,
                          );
                          const lagringsfeil = feilForVurdering(rad.vurdering);
                          const radnøkkel = `${rad.jobbsøker.personTreffId}:${arbeidsgiver.arbeidsgiverTreffId}`;

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
                                  <BodyShort
                                    weight='semibold'
                                    className='min-w-0 flex-1 basis-64'
                                  >
                                    <AvkortetTekst>
                                      {jobbsøkernavn}
                                    </AvkortetTekst>
                                  </BodyShort>
                                  <HStack gap='space-8' wrap>
                                    {innsatsbehov && (
                                      <Tag
                                        size='small'
                                        variant='outline'
                                        data-color='neutral'
                                      >
                                        {innsatsbehov}
                                      </Tag>
                                    )}
                                    {rad.harInteresse && (
                                      <Tag
                                        size='small'
                                        variant='outline'
                                        data-color='info'
                                      >
                                        Interessert i å møte
                                      </Tag>
                                    )}
                                    {rad.sattOppTilIntervju && (
                                      <Tag
                                        size='small'
                                        variant='outline'
                                        data-color='meta-purple'
                                      >
                                        Satt opp til intervju
                                      </Tag>
                                    )}
                                    {rad.formidlet && (
                                      <Tag
                                        size='small'
                                        variant='moderate'
                                        data-color='success'
                                      >
                                        Formidlet
                                      </Tag>
                                    )}
                                  </HStack>
                                </HStack>

                                <HStack gap='space-16' align='end' wrap>
                                  <Box width='10rem' maxWidth='100%'>
                                    <Select
                                      label={
                                        <>
                                          Vurdering
                                          <span className='sr-only'>
                                            {' '}
                                            for {jobbsøkernavn} hos{' '}
                                            {arbeidsgiver.navn}
                                          </span>
                                        </>
                                      }
                                      size='small'
                                      value={rad.vurdering.vurdering ?? ''}
                                      onChange={(event) => {
                                        const nyVurdering =
                                          vurderingFraSkjemaverdi(
                                            event.target.value,
                                          );
                                        lagreVurdering(
                                          {
                                            ...rad.vurdering,
                                            vurdering: nyVurdering,
                                          },
                                          jobbsøkernavn,
                                        );
                                      }}
                                    >
                                      <option value=''>Ingen vurdering</option>
                                      <option value='AKTUELL'>Aktuell</option>
                                      <option value='KANSKJE'>Kanskje</option>
                                      <option value='IKKE_AKTUELL'>
                                        Ikke aktuell
                                      </option>
                                    </Select>
                                  </Box>
                                  <HStack gap='space-16' align='center' wrap>
                                    <Checkbox
                                      size='small'
                                      checked={rad.vurdering.andregangsintervju}
                                      onChange={(event) => {
                                        const påSlått =
                                          event.currentTarget.checked;
                                        lagreVurdering(
                                          {
                                            ...rad.vurdering,
                                            andregangsintervju: påSlått,
                                            // Datoen hører til avtalen om andre
                                            // intervju, så den skal ikke bli
                                            // liggende igjen når avtalen fjernes.
                                            andregangsintervjuDato: påSlått
                                              ? rad.vurdering
                                                  .andregangsintervjuDato
                                              : null,
                                          },
                                          jobbsøkernavn,
                                        );
                                      }}
                                    >
                                      2. intervju
                                      <span className='sr-only'>
                                        {' '}
                                        for {jobbsøkernavn} hos{' '}
                                        {arbeidsgiver.navn}
                                      </span>
                                    </Checkbox>
                                    <Checkbox
                                      size='small'
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
                                      <span className='sr-only'>
                                        {' '}
                                        for {jobbsøkernavn} hos{' '}
                                        {arbeidsgiver.navn}
                                      </span>
                                    </Checkbox>
                                    {rad.formidlet && (
                                      <Link
                                        as={NextLink}
                                        href={formidlingerHref}
                                        inlineText
                                      >
                                        Vis formidling
                                      </Link>
                                    )}
                                  </HStack>
                                </HStack>

                                {rad.vurdering.andregangsintervju && (
                                  <AndregangsintervjuDato
                                    key={radnøkkel}
                                    dato={rad.vurdering.andregangsintervjuDato}
                                    kontekst={`for ${jobbsøkernavn} hos ${arbeidsgiver.navn}`}
                                    onEndre={(nyDato) =>
                                      lagreVurdering(
                                        {
                                          ...rad.vurdering,
                                          andregangsintervjuDato: nyDato,
                                        },
                                        jobbsøkernavn,
                                      )
                                    }
                                  />
                                )}

                                <VurderingsNotater
                                  notater={rad.vurdering.notater}
                                  kontekst={`for ${jobbsøkernavn} hos ${arbeidsgiver.navn}`}
                                  onEndre={(nyeNotater) =>
                                    lagreVurdering(
                                      { ...rad.vurdering, notater: nyeNotater },
                                      jobbsøkernavn,
                                    )
                                  }
                                />
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
          </div>
        </VStack>
      </section>
    </VStack>
  );
}
