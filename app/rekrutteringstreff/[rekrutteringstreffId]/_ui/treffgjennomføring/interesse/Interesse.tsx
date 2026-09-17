'use client';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/StegHeader';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useRapporterLagringsstatus';
import Interessematrise from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/interesse/Interessematrise';
import { lagInteresseoversikt } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/interesse/interesseoversikt';
import { useInteresseAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/interesse/useInteresseAutolagring';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Stegnavigasjon';
import { useTreffgjennomføringNavigasjon } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/TreffgjennomføringNavigasjon';
import { erStegTilgjengelig } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/treffgjennomføringSteg';
import {
  Button,
  Checkbox,
  LocalAlert,
  Tooltip,
  VStack,
} from '@navikt/ds-react';
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
  const { lagrerSteg: gårVidere } = useTreffgjennomføringNavigasjon();
  const visNavn = lagNavnvisning(treffgjennomføring);
  const fremmøtteJobbsøkere = useMemo(() => {
    const oppmøte = new Set(treffgjennomføringForVisning.oppmøte);
    return jobbsøkere.filter((jobbsøker) =>
      oppmøte.has(jobbsøker.personTreffId),
    );
  }, [jobbsøkere, treffgjennomføringForVisning.oppmøte]);
  useRapporterLagringsstatus(harVentendeLagring, onLagringsstatusEndret);
  const { harInteresse, harRegistrertStatus, antallInteresser } = useMemo(
    () => lagInteresseoversikt(treffgjennomføringForVisning),
    [treffgjennomføringForVisning],
  );

  const nesteStegId = erWorkOp ? 4 : 5;
  const kanGåTilNeste = erStegTilgjengelig(
    nesteStegId,
    treffgjennomføringForVisning,
    erWorkOp,
  );

  return (
    <VStack gap='space-24'>
      <Stegnavigasjon>
        <Button
          type='button'
          variant='secondary'
          onClick={onTilbake}
          disabled={harVentendeLagring || gårVidere}
        >
          Tilbake
        </Button>
        <Button
          type='button'
          onClick={onNeste}
          disabled={!kanGåTilNeste || harVentendeLagring || gårVidere}
          loading={gårVidere}
        >
          Neste
        </Button>
      </Stegnavigasjon>

      <section
        aria-labelledby='treffgjennomføring-interesse-heading'
        aria-busy={harVentendeLagring}
      >
        <VStack gap='space-16'>
          <StegHeader
            id='treffgjennomføring-interesse-heading'
            tittel='Interesse'
            beskrivelse='Registrer hvilke arbeidsgivere de fremmøtte jobbsøkerne er interessert i å møte. '
            lagrer={harVentendeLagring || gårVidere}
            feil={harLagringsfeil}
            statusmelding={statusmelding}
          />

          {fremmøtteJobbsøkere.length === 0 ? (
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
              jobbsøkere={fremmøtteJobbsøkere}
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
        <LocalAlert as='div' status='error'>
          <LocalAlert.Content>
            Én eller flere interesser kunne ikke lagres og ble tilbakestilt.
            Prøv igjen.
          </LocalAlert.Content>
        </LocalAlert>
      )}
    </VStack>
  );
};

export default Interesse;
