'use client';
import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { fordelIntervjuer } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/mutations';
import type { TreffgjennomforingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/useTreffgjennomforing';
import Intervjumatrise from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/Intervjumatrise';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/StegHeader';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/Stegnavigasjon';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/treffgjennomforingNavn';
import { useInteresseAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/useInteresseAutolagring';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/useRapporterLagringsstatus';
import type { TreffgjennomforingOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/useTreffgjennomforingFane';
import { Button, Checkbox, LocalAlert, VStack } from '@navikt/ds-react';
import { FC, useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  treffgjennomforing: TreffgjennomforingDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkere: JobbsøkerDTO[];
  onTreffgjennomforingOppdatert: TreffgjennomforingOppdatering;
  onLagringsstatusEndret: (lagrer: boolean) => void;
  onTilbake: () => void;
  onNeste: () => void;
}

const WorkOpØnsker: FC<Props> = ({
  rekrutteringstreffId,
  treffgjennomforing,
  arbeidsgivere,
  jobbsøkere,
  onTreffgjennomforingOppdatert,
  onLagringsstatusEndret,
  onTilbake,
  onNeste,
}) => {
  const {
    effektivTreffgjennomforing,
    erØnskeVentende,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreØnske,
    ventTilLagringerErFerdige,
  } = useInteresseAutolagring({
    rekrutteringstreffId,
    treffgjennomforing,
    onTreffgjennomforingOppdatert,
  });
  const [gårVidere, setGårVidere] = useState(false);
  const visNavn = lagNavnvisning(treffgjennomforing);
  const [fordelingsfeil, setFordelingsfeil] = useState<string | null>(null);
  useRapporterLagringsstatus(
    harVentendeLagring || gårVidere,
    onLagringsstatusEndret,
  );
  const harØnske = (personTreffId: string, arbeidsgiverTreffId: string) =>
    effektivTreffgjennomforing.interesser.some(
      (interesse) =>
        interesse.personTreffId === personTreffId &&
        interesse.arbeidsgiverTreffId === arbeidsgiverTreffId,
    );
  const antallØnsker = (personTreffId: string) =>
    effektivTreffgjennomforing.interesser.filter(
      (interesse) => interesse.personTreffId === personTreffId,
    ).length;

  const fordelFørsteGang = async (
    treffgjennomforingEtterLagring: TreffgjennomforingDTO,
  ) => {
    if (treffgjennomforingEtterLagring.intervjufordelinger.length > 0) return;

    await onTreffgjennomforingOppdatert(
      await fordelIntervjuer(rekrutteringstreffId),
    );
  };

  const gåVidere = async () => {
    setGårVidere(true);
    const alleEndringerLagret = await ventTilLagringerErFerdige();
    if (!alleEndringerLagret) {
      setGårVidere(false);
      return;
    }

    try {
      await fordelFørsteGang(effektivTreffgjennomforing);
      onNeste();
    } catch {
      setFordelingsfeil(
        'Kunne ikke fordele intervjuene. Prøv å gå videre på nytt.',
      );
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
          disabled={harVentendeLagring}
        >
          Tilbake
        </Button>
        <Button
          type='button'
          onClick={() => void gåVidere()}
          disabled={effektivTreffgjennomforing.interesser.length === 0}
          loading={gårVidere}
        >
          Neste
        </Button>
      </Stegnavigasjon>

      <section
        aria-labelledby='treffgjennomforing-interesse-heading'
        aria-busy={harVentendeLagring}
      >
        <VStack gap='space-16'>
          <StegHeader
            id='treffgjennomforing-interesse-heading'
            tittel='Interesse'
            beskrivelse='Registrer hvilke arbeidsgivere de fremmøtte jobbsøkerne er interessert i å møte.'
            lagrer={harVentendeLagring || gårVidere}
            feil={harLagringsfeil}
            statusmelding={statusmelding}
          />

          {jobbsøkere.length === 0 ? (
            <LocalAlert as='div' status='announcement'>
              <LocalAlert.Content>
                Ingen jobbsøkere er registrert som møtt.
              </LocalAlert.Content>
            </LocalAlert>
          ) : (
            <Intervjumatrise
              caption='Hvilke arbeidsgivere jobbsøkerne er interessert i å møte'
              idPrefiks='treffgjennomforing-interesse'
              arbeidsgivere={arbeidsgivere}
              jobbsøkere={jobbsøkere}
              visNavn={visNavn}
              antallForJobbsøker={antallØnsker}
              renderCelle={({
                personTreffId,
                arbeidsgiverTreffId,
                ariaLabelledBy,
              }) => {
                const lagrerDetteØnsket = erØnskeVentende(
                  personTreffId,
                  arbeidsgiverTreffId,
                );
                return (
                  <Checkbox
                    hideLabel
                    checked={harØnske(personTreffId, arbeidsgiverTreffId)}
                    disabled={gårVidere}
                    aria-labelledby={ariaLabelledBy}
                    onChange={(event) =>
                      lagreØnske(
                        personTreffId,
                        arbeidsgiverTreffId,
                        event.target.checked,
                      )
                    }
                  >
                    {lagrerDetteØnsket ? 'Lagrer ønske' : 'Ønsker intervju'}
                  </Checkbox>
                );
              }}
            />
          )}
        </VStack>
      </section>

      {harLagringsfeil && (
        <LocalAlert as='div' status='error'>
          <LocalAlert.Content>
            Én eller flere interesser kunne ikke lagres og ble tilbakestilt.
            Prøv igjen.
          </LocalAlert.Content>
        </LocalAlert>
      )}

      {fordelingsfeil && (
        <LocalAlert as='div' status='error'>
          <LocalAlert.Content>{fordelingsfeil}</LocalAlert.Content>
        </LocalAlert>
      )}
    </VStack>
  );
};

export default WorkOpØnsker;
