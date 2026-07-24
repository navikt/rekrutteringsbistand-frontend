'use client';

import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import Intervjumatrise from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/Intervjumatrise';
import WorkOpStegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/WorkOpStegHeader';
import { useWorkOpØnskeAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/useWorkOpØnskeAutolagring';
import { Button, Checkbox, HStack, LocalAlert, VStack } from '@navikt/ds-react';
import { FC, useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkere: JobbsøkerDTO[];
  onMøtedagOppdatert: (møtedag: MøtedagDTO) => void | Promise<void>;
  onTilbake: () => void;
  onNeste: () => void;
}

const WorkOpØnsker: FC<Props> = ({
  rekrutteringstreffId,
  møtedag,
  arbeidsgivere,
  jobbsøkere,
  onMøtedagOppdatert,
  onTilbake,
  onNeste,
}) => {
  const {
    effektivMøtedag,
    erØnskeVentende,
    harLagringsfeil,
    harVentendeLagring,
    kunngjøring,
    lagreØnske,
    ventTilLagringerErFerdige,
  } = useWorkOpØnskeAutolagring({
    rekrutteringstreffId,
    møtedag,
    onMøtedagOppdatert,
  });
  const [gårVidere, setGårVidere] = useState(false);
  const harØnske = (personTreffId: string, arbeidsgiverTreffId: string) =>
    effektivMøtedag.ønsker.some(
      (ønske) =>
        ønske.personTreffId === personTreffId &&
        ønske.arbeidsgiverTreffId === arbeidsgiverTreffId,
    );
  const antallØnsker = (personTreffId: string) =>
    effektivMøtedag.ønsker.filter(
      (ønske) => ønske.personTreffId === personTreffId,
    ).length;

  const gåVidere = async () => {
    setGårVidere(true);
    const alleEndringerLagret = await ventTilLagringerErFerdige();
    if (alleEndringerLagret) {
      onNeste();
    } else {
      setGårVidere(false);
    }
  };

  return (
    <VStack gap='space-24'>
      <section
        aria-labelledby='workop-onsker-heading'
        aria-busy={harVentendeLagring}
      >
        <VStack gap='space-16'>
          <WorkOpStegHeader
            id='workop-onsker-heading'
            tittel='Ønsker'
            beskrivelse='Registrer hvilke arbeidsgivere de fremmøtte jobbsøkerne ønsker å møte.'
            lagrer={harVentendeLagring || gårVidere}
            feil={harLagringsfeil}
            kunngjøring={kunngjøring}
          />

          {jobbsøkere.length === 0 ? (
            <LocalAlert as='div' status='announcement'>
              <LocalAlert.Content>
                Ingen jobbsøkere er registrert som møtt.
              </LocalAlert.Content>
            </LocalAlert>
          ) : (
            <Intervjumatrise
              caption='Jobbsøkernes ønsker om speedintervju med arbeidsgivere'
              idPrefiks='workop-onsker'
              arbeidsgivere={arbeidsgivere}
              jobbsøkere={jobbsøkere}
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
            Ett eller flere ønsker kunne ikke lagres og ble tilbakestilt. Prøv
            igjen.
          </LocalAlert.Content>
        </LocalAlert>
      )}

      <HStack gap='space-8'>
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
          disabled={effektivMøtedag.ønsker.length === 0}
          loading={gårVidere}
        >
          Neste
        </Button>
      </HStack>
    </VStack>
  );
};

export default WorkOpØnsker;
