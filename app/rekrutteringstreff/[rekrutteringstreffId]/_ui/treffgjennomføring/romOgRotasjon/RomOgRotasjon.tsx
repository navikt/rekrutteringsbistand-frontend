'use client';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import BekreftFordelPåNyttModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/BekreftFordelPåNyttModal';
import Feilvarsel from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/Feilvarsel';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/StegHeader';
import { lagJobbsøkeroppslag } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useFokusEtterLagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useFokusEtterLagring';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useRapporterLagringsstatus';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Stegnavigasjon';
import Arbeidsgiverrotasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/Arbeidsgiverrotasjon';
import Møteoppsettpanel from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/Møteoppsettpanel';
import Romfordeling from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/Romfordeling';
import type { Romhandlinger } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/Romkort';
import { useRomDragOgSlipp } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/useRomDragOgSlipp';
import { useRomfordelingLagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/useRomfordelingLagring';
import { BodyLong, BodyShort, Button, HStack, VStack } from '@navikt/ds-react';
import type { FC } from 'react';
import { useMemo, useState } from 'react';

type Props = StegBasisProps &
  StegLagringProps &
  StegNavigasjonProps & {
    jobbsøkere: JobbsøkerDTO[];
  };

const RomOgRotasjon: FC<Props> = ({
  rekrutteringstreffId,
  treffgjennomføring,
  arbeidsgivere,
  jobbsøkere,
  oppdatering,
  onLagringsstatusEndret,
  onTilbake,
  onNeste,
}) => {
  const [visFordelPåNytt, setVisFordelPåNytt] = useState(false);
  const [lagrerMøteoppsett, setLagrerMøteoppsett] = useState(false);
  const { navnPåJobbsøker, initialerPåJobbsøker } = useMemo(
    () => lagJobbsøkeroppslag(jobbsøkere, treffgjennomføring),
    [jobbsøkere, treffgjennomføring],
  );
  const {
    lagrerRom,
    feil,
    statusmelding,
    flyttOgLagre,
    fordelPåNytt,
    nullstillFeil,
  } = useRomfordelingLagring({
    rekrutteringstreffId,
    navnPåJobbsøker,
    oppdatering,
  });
  const navnPåStartarbeidsgiver = (romnummer: number) => {
    const rotasjon = treffgjennomføring.arbeidsgiverRekkefølge.find(
      ({ førsteRomnummer }) => førsteRomnummer === romnummer,
    );
    if (!rotasjon) return undefined;
    return (
      arbeidsgivere.find(
        ({ arbeidsgiverTreffId }) =>
          arbeidsgiverTreffId === rotasjon.arbeidsgiverTreffId,
      )?.navn ?? 'Ukjent arbeidsgiver'
    );
  };

  const lagrer = lagrerRom || lagrerMøteoppsett;
  useRapporterLagringsstatus(lagrer, onLagringsstatusEndret);

  const huskFokus = useFokusEtterLagring(
    'data-flytt-person',
    lagrer,
    treffgjennomføring.rom,
  );

  const drag = useRomDragOgSlipp(lagrer, (personTreffId, målromnummer) => {
    void flyttOgLagre(personTreffId, målromnummer);
  });

  const romhandlinger: Romhandlinger = {
    aktivtMålromnummer: drag.aktivtMålromnummer,
    aktivPersonTreffId: drag.aktivPersonTreffId,
    deaktivert: lagrer,
    onDraStart: drag.onDraStart,
    onDraSlutt: drag.tilbakestillDrag,
    onDraOver: drag.onDraOver,
    onDraUt: drag.onDraUt,
    onSlipp: drag.onSlipp,
    onFlytt: (personTreffId, målromnummer) => {
      huskFokus(personTreffId);
      void flyttOgLagre(personTreffId, målromnummer);
    },
  };

  return (
    <VStack gap='space-32'>
      <Stegnavigasjon
        tilbake={{ onClick: onTilbake, deaktivert: lagrer }}
        neste={{ onClick: onNeste, deaktivert: lagrer }}
      />

      <Møteoppsettpanel
        rekrutteringstreffId={rekrutteringstreffId}
        treffgjennomføring={treffgjennomføring}
        oppdatering={oppdatering}
        onLagringsstatusEndret={setLagrerMøteoppsett}
        deaktivert={lagrerRom}
      />

      <section aria-labelledby='workop-romfordeling-heading'>
        <VStack gap='space-16'>
          <StegHeader
            id='workop-romfordeling-heading'
            tittel='Romfordeling'
            beskrivelse='Dra en jobbsøker til et annet rom, eller bruk «Flytt til rom».'
            lagrer={lagrerRom}
            feil={feil !== null}
            statusmelding={statusmelding}
          />

          {feil && <Feilvarsel>{feil}</Feilvarsel>}

          <Romfordeling
            rom={treffgjennomføring.rom}
            navnPåJobbsøker={navnPåJobbsøker}
            navnPåStartarbeidsgiver={navnPåStartarbeidsgiver}
            idPrefiks='workop-oversikt'
            romhandlinger={romhandlinger}
          />
        </VStack>
      </section>

      <HStack gap='space-8' wrap>
        <Button
          type='button'
          variant='secondary'
          disabled={lagrer}
          onClick={() => {
            nullstillFeil();
            setVisFordelPåNytt(true);
          }}
        >
          Fordel på nytt
        </Button>
      </HStack>

      <Arbeidsgiverrotasjon
        treffgjennomføring={treffgjennomføring}
        arbeidsgivere={arbeidsgivere}
        rom={treffgjennomføring.rom}
        initialerPåJobbsøker={initialerPåJobbsøker}
        deaktivert={lagrer}
      />

      <BekreftFordelPåNyttModal
        åpen={visFordelPåNytt}
        tittel='Fordele alle på nytt?'
        width='medium'
        lagrer={lagrer}
        onBekreft={() => {
          setVisFordelPåNytt(false);
          void fordelPåNytt();
        }}
        onAvbryt={() => {
          setVisFordelPåNytt(false);
          nullstillFeil();
        }}
      >
        <VStack gap='space-16'>
          <BodyLong>
            Alle manuelle romplasseringer erstattes. De fremmøtte fordeles på
            nytt i registrert rekkefølge, så flere kan få et annet rom.
          </BodyLong>
          <BodyShort weight='semibold'>
            Interesser, intervjufordeling og vurderinger beholdes.
          </BodyShort>
        </VStack>
      </BekreftFordelPåNyttModal>
    </VStack>
  );
};

export default RomOgRotasjon;
