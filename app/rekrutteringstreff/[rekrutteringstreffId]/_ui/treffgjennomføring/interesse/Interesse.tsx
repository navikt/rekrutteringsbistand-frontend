'use client';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { fordelIntervjuer } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import Feilvarsel from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/Feilvarsel';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/StegHeader';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useGåVidere } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useGåVidere';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useRapporterLagringsstatus';
import Interessematrise from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/interesse/Interessematrise';
import { lagInteresseoversikt } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/interesse/interesseoversikt';
import { useInteresseAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/interesse/useInteresseAutolagring';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Stegnavigasjon';
import { Checkbox, LocalAlert, Tooltip, VStack } from '@navikt/ds-react';
import { FC, useMemo } from 'react';

type Props = StegBasisProps &
  StegLagringProps &
  StegNavigasjonProps & {
    erWorkOp: boolean;
    jobbsøkere: JobbsøkerDTO[];
  };

const LÅST_FORKLARING =
  'Låst fordi jobbsøkeren har en registrert status hos arbeidsgiveren. Nullstill statusen i steg 5 før du fjerner interessen.';

const Interesse: FC<Props> = ({
  rekrutteringstreffId,
  erWorkOp,
  treffgjennomføring,
  arbeidsgivere,
  jobbsøkere,
  oppdatering,
  onLagringsstatusEndret,
  onTilbake,
  onNeste,
}) => {
  const {
    treffgjennomføringForVisning,
    erInteresseVentende,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreInteresse,
  } = useInteresseAutolagring({
    rekrutteringstreffId,
    treffgjennomføring,
    oppdatering,
  });
  const { gårVidere, feil: fordelingsfeil, gåVidere } = useGåVidere(onNeste);
  const visNavn = lagNavnvisning(treffgjennomføring);
  const lagrer = harVentendeLagring || gårVidere;
  useRapporterLagringsstatus(lagrer, onLagringsstatusEndret);
  const { harInteresse, harRegistrertStatus, antallInteresser } = useMemo(
    () => lagInteresseoversikt(treffgjennomføringForVisning),
    [treffgjennomføringForVisning],
  );

  // På WorkOp fordeles intervjuene automatisk første gang brukeren går videre.
  const fordelFørsteGang = async () => {
    if (
      !erWorkOp ||
      treffgjennomføringForVisning.intervjufordelinger.length > 0
    ) {
      return;
    }

    await oppdatering.brukLagretSvar(
      await fordelIntervjuer(rekrutteringstreffId),
    );
  };

  const gåTilIntervjufordeling = () =>
    gåVidere(
      fordelFørsteGang,
      'Kunne ikke fordele intervjuene. Prøv å gå videre på nytt.',
    );

  return (
    <VStack gap='space-24'>
      <Stegnavigasjon
        tilbake={{ onClick: onTilbake, deaktivert: lagrer }}
        neste={{
          onClick: () => void gåTilIntervjufordeling(),
          deaktivert:
            lagrer || treffgjennomføringForVisning.interesser.length === 0,
          laster: gårVidere,
        }}
      />

      <section
        aria-labelledby='treffgjennomføring-interesse-heading'
        aria-busy={harVentendeLagring}
      >
        <VStack gap='space-16'>
          <StegHeader
            id='treffgjennomføring-interesse-heading'
            tittel='Interesse'
            beskrivelse='Registrer hvilke arbeidsgivere de fremmøtte jobbsøkerne er interessert i å møte. '
            lagrer={lagrer}
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
            <Interessematrise
              caption='Hvilke arbeidsgivere jobbsøkerne er interessert i å møte'
              idPrefiks='treffgjennomføring-interesse'
              arbeidsgivere={arbeidsgivere}
              jobbsøkere={jobbsøkere}
              visNavn={visNavn}
              antallForJobbsøker={antallInteresser}
              renderCelle={({
                personTreffId,
                arbeidsgiverTreffId,
                ariaLabelledBy,
              }) => {
                const lagrerDenneInteressen = erInteresseVentende(
                  personTreffId,
                  arbeidsgiverTreffId,
                );
                const låstAvStatus = harRegistrertStatus(
                  personTreffId,
                  arbeidsgiverTreffId,
                );
                const avkrysning = (
                  <Checkbox
                    hideLabel
                    checked={harInteresse(personTreffId, arbeidsgiverTreffId)}
                    disabled={gårVidere || låstAvStatus}
                    aria-labelledby={ariaLabelledBy}
                    onChange={(event) =>
                      lagreInteresse(
                        personTreffId,
                        arbeidsgiverTreffId,
                        event.target.checked,
                      )
                    }
                  >
                    {låstAvStatus
                      ? LÅST_FORKLARING
                      : lagrerDenneInteressen
                        ? 'Lagrer interesse'
                        : 'Interessert i å møte'}
                  </Checkbox>
                );
                if (!låstAvStatus) return avkrysning;
                return (
                  <Tooltip content={LÅST_FORKLARING}>
                    <span tabIndex={0} className='inline-flex'>
                      {avkrysning}
                    </span>
                  </Tooltip>
                );
              }}
            />
          )}
        </VStack>
      </section>

      {harLagringsfeil && (
        <Feilvarsel>
          Én eller flere interesser kunne ikke lagres og ble tilbakestilt. Prøv
          igjen.
        </Feilvarsel>
      )}

      {fordelingsfeil && <Feilvarsel>{fordelingsfeil}</Feilvarsel>}
    </VStack>
  );
};

export default Interesse;
