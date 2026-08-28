import { useFormidlingerForTreffgjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { settGjeldendeSteg } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import { RekrutteringstreffTabs } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import { FORMIDLING_ARBEIDSGIVERE_QUERY_PARAM } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/formidling/formidlingQuery';
import { StatuskortRad } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/StatuskortRad';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/StegHeader';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Stegnavigasjon';
import { lagRegistreringAvStatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/registreringAvStatusHjelpere';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringNavn';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringStegProps';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useRapporterLagringsstatus';
import { useVurderingAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useVurderingAutolagring';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import {
  BodyShort,
  Button,
  ExpansionCard,
  HStack,
  Loader,
  LocalAlert,
  VStack,
} from '@navikt/ds-react';
import { useMemo, useState } from 'react';

type RegistreringAvStatusProps = StegBasisProps &
  StegLagringProps &
  StegNavigasjonProps & {
    jobbsøkere: JobbsøkerDTO[];
  };

const antallstekst = (antall: number) =>
  antall === 1 ? '1 jobbsøker' : `${antall} jobbsøkere`;

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

  const gåTilOppsummeringen = async () => {
    try {
      onTreffgjennomføringOppdatert(
        await settGjeldendeSteg(rekrutteringstreffId, 'OPPSUMMERING'),
      );
    } catch {
      // Oppsummeringen er lesbar uansett, så en feilet markering skal ikke stoppe navigeringen.
    }
    onNeste();
  };

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
        <Button
          type='button'
          onClick={gåTilOppsummeringen}
          disabled={harVentendeLagring}
        >
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
            tittel='Vurdering og oppfølging'
            beskrivelse='Se og registrer vurdering og videre oppfølging for hver jobbsøker hos arbeidsgiverne. Endringer lagres med en gang.'
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

                          return (
                            <StatuskortRad
                              key={`${rad.jobbsøker.personTreffId}:${arbeidsgiver.arbeidsgiverTreffId}`}
                              rad={rad}
                              jobbsøkernavn={jobbsøkernavn}
                              arbeidsgivernavn={arbeidsgiver.navn}
                              formidlingerHref={formidlingerHref}
                              lagringsfeil={feilForVurdering(rad.vurdering)}
                              onLagreVurdering={(vurdering) =>
                                lagreVurdering(vurdering, jobbsøkernavn)
                              }
                            />
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
