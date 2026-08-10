'use client';
import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { fordelIntervjuer } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import Intervjumatrise from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/Intervjumatrise';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/StegHeader';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/Stegnavigasjon';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/møtedagNavn';
import { useInteresseAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useInteresseAutolagring';
import type { MøtedagOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useMøtedagFane';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useRapporterLagringsstatus';
import { Button, Checkbox, LocalAlert, VStack } from '@navikt/ds-react';
import { FC, useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkere: JobbsøkerDTO[];
  onMøtedagOppdatert: MøtedagOppdatering;
  onLagringsstatusEndret: (lagrer: boolean) => void;
  onTilbake: () => void;
  onNeste: () => void;
}

const WorkOpØnsker: FC<Props> = ({
  rekrutteringstreffId,
  møtedag,
  arbeidsgivere,
  jobbsøkere,
  onMøtedagOppdatert,
  onLagringsstatusEndret,
  onTilbake,
  onNeste,
}) => {
  const {
    effektivMøtedag,
    erØnskeVentende,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreØnske,
    ventTilLagringerErFerdige,
  } = useInteresseAutolagring({
    rekrutteringstreffId,
    møtedag,
    onMøtedagOppdatert,
  });
  const [gårVidere, setGårVidere] = useState(false);
  const visNavn = lagNavnvisning(møtedag);
  const [fordelingsfeil, setFordelingsfeil] = useState<string | null>(null);
  useRapporterLagringsstatus(
    harVentendeLagring || gårVidere,
    onLagringsstatusEndret,
  );
  const harØnske = (personTreffId: string, arbeidsgiverTreffId: string) =>
    effektivMøtedag.interesser.some(
      (interesse) =>
        interesse.personTreffId === personTreffId &&
        interesse.arbeidsgiverTreffId === arbeidsgiverTreffId,
    );
  const antallØnsker = (personTreffId: string) =>
    effektivMøtedag.interesser.filter(
      (interesse) => interesse.personTreffId === personTreffId,
    ).length;

  const fordelFørsteGang = async (møtedagEtterLagring: MøtedagDTO) => {
    if (møtedagEtterLagring.intervjufordelinger.length > 0) return;

    await onMøtedagOppdatert(await fordelIntervjuer(rekrutteringstreffId));
  };

  const gåVidere = async () => {
    setGårVidere(true);
    const alleEndringerLagret = await ventTilLagringerErFerdige();
    if (!alleEndringerLagret) {
      setGårVidere(false);
      return;
    }

    try {
      await fordelFørsteGang(effektivMøtedag);
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
          disabled={effektivMøtedag.interesser.length === 0}
          loading={gårVidere}
        >
          Neste
        </Button>
      </Stegnavigasjon>

      <section
        aria-labelledby='møtedag-interesse-heading'
        aria-busy={harVentendeLagring}
      >
        <VStack gap='space-16'>
          <StegHeader
            id='møtedag-interesse-heading'
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
              idPrefiks='møtedag-interesse'
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
