import { useFormidlingerForTreffgjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { settGjeldendeSteg } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/StegHeader';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useRapporterLagringsstatus';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Stegnavigasjon';
import Vurderingskort from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/vurderingOgOppfølging/Vurderingskort';
import { useVurderingAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/vurderingOgOppfølging/useVurderingAutolagring';
import { lagVurderingsoversikt } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/vurderingOgOppfølging/vurderingsoversikt';
import {
  BodyShort,
  Button,
  HStack,
  Loader,
  LocalAlert,
  VStack,
} from '@navikt/ds-react';
import { useMemo, useState } from 'react';

type VurderingOgOppfølgingProps = StegBasisProps &
  StegLagringProps &
  StegNavigasjonProps & {
    jobbsøkere: JobbsøkerDTO[];
  };

export default function VurderingOgOppfølging({
  rekrutteringstreffId,
  treffgjennomføring,
  arbeidsgivere,
  jobbsøkere,
  onTilbake,
  onNeste,
  oppdatering,
  onLagringsstatusEndret,
}: VurderingOgOppfølgingProps) {
  const {
    data: formidlingerData,
    isLoading: henterFormidlinger,
    error: formidlingerFeil,
  } = useFormidlingerForTreffgjennomføring(rekrutteringstreffId);
  const {
    treffgjennomføringForVisning,
    feilForVurdering,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreVurdering,
  } = useVurderingAutolagring({
    rekrutteringstreffId,
    treffgjennomføring,
    oppdatering,
  });
  const vurderingsoversikt = useMemo(
    () =>
      lagVurderingsoversikt({
        treffgjennomføring: treffgjennomføringForVisning,
        arbeidsgivere,
        jobbsøkere,
        formidlinger: formidlingerData,
      }),
    [arbeidsgivere, treffgjennomføringForVisning, formidlingerData, jobbsøkere],
  );
  const visNavn = useMemo(
    () => lagNavnvisning(treffgjennomføringForVisning),
    [treffgjennomføringForVisning],
  );
  const [åpenStatusPerKort, setÅpenStatusPerKort] = useState<
    Partial<Record<string, boolean>>
  >({});
  const [gårVidere, setGårVidere] = useState(false);
  const [oppsummeringsfeil, setOppsummeringsfeil] = useState<string | null>(
    null,
  );
  const lagrer = harVentendeLagring || gårVidere;
  useRapporterLagringsstatus(lagrer, onLagringsstatusEndret);

  const gåTilOppsummeringen = async () => {
    setGårVidere(true);
    setOppsummeringsfeil(null);
    try {
      await oppdatering.brukLagretSvar(
        await settGjeldendeSteg(rekrutteringstreffId, 'OPPSUMMERING'),
      );
      onNeste();
    } catch {
      setOppsummeringsfeil('Kunne ikke åpne oppsummeringen. Prøv igjen.');
      setGårVidere(false);
    }
  };

  return (
    <VStack gap='space-24'>
      <Stegnavigasjon>
        <Button
          type='button'
          variant='secondary'
          onClick={onTilbake}
          disabled={lagrer}
        >
          Tilbake
        </Button>
        <Button
          type='button'
          onClick={() => void gåTilOppsummeringen()}
          disabled={lagrer}
          loading={gårVidere}
        >
          Neste
        </Button>
      </Stegnavigasjon>

      {oppsummeringsfeil && (
        <LocalAlert as='div' status='error'>
          <LocalAlert.Content>{oppsummeringsfeil}</LocalAlert.Content>
        </LocalAlert>
      )}

      <section
        aria-labelledby='workop-registrering-av-status-heading'
        aria-busy={lagrer}
      >
        <VStack gap='space-16'>
          <StegHeader
            id='workop-registrering-av-status-heading'
            tittel='Vurdering og oppfølging'
            beskrivelse='Se og registrer vurdering og videre oppfølging for hver jobbsøker hos arbeidsgiverne. Endringer lagres med en gang.'
            lagrer={lagrer}
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
          <fieldset
            disabled={gårVidere}
            className='m-0 grid min-w-0 grid-cols-[repeat(auto-fit,minmax(34rem,1fr))] items-start gap-4 border-0 p-0'
          >
            <legend className='sr-only'>Vurderinger per arbeidsgiver</legend>
            {vurderingsoversikt.map(({ arbeidsgiver, rader }) => (
              <Vurderingskort
                key={arbeidsgiver.arbeidsgiverTreffId}
                arbeidsgiver={arbeidsgiver}
                rader={rader}
                visNavn={visNavn}
                åpen={
                  åpenStatusPerKort[arbeidsgiver.arbeidsgiverTreffId] ??
                  rader.length > 0
                }
                onToggle={(åpen) =>
                  setÅpenStatusPerKort((forrige) => ({
                    ...forrige,
                    [arbeidsgiver.arbeidsgiverTreffId]: åpen,
                  }))
                }
                feilForVurdering={feilForVurdering}
                onLagreVurdering={lagreVurdering}
              />
            ))}
          </fieldset>
        </VStack>
      </section>
    </VStack>
  );
}
