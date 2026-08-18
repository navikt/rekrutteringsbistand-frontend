'use client';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { fordelIntervjuer } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import Intervjumatrise from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Intervjumatrise';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/StegHeader';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Stegnavigasjon';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringNavn';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringStegProps';
import { useInteresseAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useInteresseAutolagring';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useRapporterLagringsstatus';
import { Button, Checkbox, LocalAlert, VStack } from '@navikt/ds-react';
import { FC, useState } from 'react';

type Props = StegBasisProps &
  StegLagringProps &
  StegNavigasjonProps & {
    erWorkOp: boolean;
    jobbsøkere: JobbsøkerDTO[];
  };

const Interesse: FC<Props> = ({
  rekrutteringstreffId,
  erWorkOp,
  treffgjennomføring,
  arbeidsgivere,
  jobbsøkere,
  onTreffgjennomføringOppdatert,
  onLagringsstatusEndret,
  onTilbake,
  onNeste,
}) => {
  const {
    effektivTreffgjennomføring,
    erInteresseVentende,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreInteresse,
    ventTilLagringerErFerdige,
  } = useInteresseAutolagring({
    rekrutteringstreffId,
    treffgjennomføring,
    onTreffgjennomføringOppdatert,
  });
  const [gårVidere, setGårVidere] = useState(false);
  const visNavn = lagNavnvisning(treffgjennomføring);
  const [fordelingsfeil, setFordelingsfeil] = useState<string | null>(null);
  useRapporterLagringsstatus(
    harVentendeLagring || gårVidere,
    onLagringsstatusEndret,
  );
  const harInteresse = (personTreffId: string, arbeidsgiverTreffId: string) =>
    effektivTreffgjennomføring.interesser.some(
      (interesse) =>
        interesse.personTreffId === personTreffId &&
        interesse.arbeidsgiverTreffId === arbeidsgiverTreffId,
    );
  const antallInteresser = (personTreffId: string) =>
    effektivTreffgjennomføring.interesser.filter(
      (interesse) => interesse.personTreffId === personTreffId,
    ).length;

  const fordelFørsteGang = async (
    treffgjennomføringEtterLagring: TreffgjennomføringDTO,
  ) => {
    if (
      !erWorkOp ||
      treffgjennomføringEtterLagring.intervjufordelinger.length > 0
    ) {
      return;
    }

    await onTreffgjennomføringOppdatert(
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
      await fordelFørsteGang(effektivTreffgjennomføring);
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
          disabled={effektivTreffgjennomføring.interesser.length === 0}
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
                return (
                  <Checkbox
                    hideLabel
                    checked={harInteresse(personTreffId, arbeidsgiverTreffId)}
                    disabled={gårVidere}
                    aria-labelledby={ariaLabelledBy}
                    onChange={(event) =>
                      lagreInteresse(
                        personTreffId,
                        arbeidsgiverTreffId,
                        event.target.checked,
                      )
                    }
                  >
                    {lagrerDenneInteressen
                      ? 'Lagrer interesse'
                      : 'Interessert i å møte'}
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

export default Interesse;
