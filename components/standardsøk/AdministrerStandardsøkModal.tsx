'use client';

import {
  MAKS_ANTALL_STANDARDSØK,
  type StandardsøkDomene,
  type StandardsøkDTO,
} from '@/app/api/bruker/standardsok/standardsøkTyper';
import {
  settSomStandardsøk,
  slettStandardsøk,
  useStandardsøk,
} from '@/app/api/bruker/standardsok/useStandardsøk';
import { formaterStandardsøkDato } from '@/components/standardsøk/standardsøkDato';
import { RekbisError } from '@/util/rekbisError';
import { TrashIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Detail,
  HStack,
  InlineMessage,
  Link,
  Modal,
  VStack,
} from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';

export interface AdministrerStandardsøkModalProps {
  domene: StandardsøkDomene;
  søk: StandardsøkDTO[];
  onBrukSøk: (søk: StandardsøkDTO) => void;
  onSattSomStandard: (søk: StandardsøkDTO) => void;
  onSlettet: (søk: StandardsøkDTO) => void;
  onClose: () => void;
}

export default function AdministrerStandardsøkModal({
  domene,
  søk,
  onBrukSøk,
  onSattSomStandard,
  onSlettet,
  onClose,
}: AdministrerStandardsøkModalProps) {
  const { mutate } = useStandardsøk(domene);
  const [søkSomSkalSlettes, setSøkSomSkalSlettes] =
    useState<StandardsøkDTO | null>(null);
  const [feil, setFeil] = useState<string>();
  const [kvittering, setKvittering] = useState<string>();
  const [venter, setVenter] = useState(false);

  const avbrytRef = useRef<HTMLButtonElement>(null);
  const lukkRef = useRef<HTMLButtonElement>(null);
  const slettknapper = useRef(new Map<string, HTMLButtonElement>());
  // Innholdet i dialogen byttes ut mellom listen og bekreftelsen. Fokus flyttes etter at det nye innholdet er tegnet.
  const nesteFokus = useRef<(() => HTMLElement | null | undefined) | null>(
    null,
  );
  useEffect(() => {
    if (!nesteFokus.current) return;
    nesteFokus.current()?.focus();
    nesteFokus.current = null;
  });

  const utfør = async (handling: () => Promise<void>, feiltekst: string) => {
    setFeil(undefined);
    setKvittering(undefined);
    setVenter(true);
    try {
      await handling();
    } catch (error) {
      setFeil(
        RekbisError.ensure(error).statuskode === 404
          ? 'Fant ikke søket. Det kan være slettet.'
          : feiltekst,
      );
    } finally {
      await mutate();
      setVenter(false);
    }
  };

  const gjørTilStandard = (valgt: StandardsøkDTO) =>
    utfør(async () => {
      await settSomStandardsøk(domene, valgt.id);
      onSattSomStandard(valgt);
      setKvittering(`«${valgt.navn}» er nå standardsøket.`);
      // Knappen forsvinner når søket blir standard, så vi flytter fokus til slettknappen på samme rad.
      nesteFokus.current = () => slettknapper.current.get(valgt.id);
    }, 'Kunne ikke endre standardsøket. Prøv igjen.');

  const startSletting = (valgt: StandardsøkDTO) => {
    setFeil(undefined);
    setKvittering(undefined);
    nesteFokus.current = () => avbrytRef.current;
    setSøkSomSkalSlettes(valgt);
  };

  const avbrytSletting = () => {
    const id = søkSomSkalSlettes?.id;
    setFeil(undefined);
    nesteFokus.current = () => (id ? slettknapper.current.get(id) : null);
    setSøkSomSkalSlettes(null);
  };

  const slett = (valgt: StandardsøkDTO) =>
    utfør(async () => {
      await slettStandardsøk(domene, valgt.id);
      onSlettet(valgt);
      setKvittering(`«${valgt.navn}» er slettet.`);
      nesteFokus.current = () => lukkRef.current;
      setSøkSomSkalSlettes(null);
    }, 'Kunne ikke slette søket. Prøv igjen.');

  // Lukkeknappen og Esc i bekreftelsen går tilbake til listen i stedet for å lukke hele dialogen.
  const førLukking = () => {
    if (venter) return false;
    if (søkSomSkalSlettes) {
      avbrytSletting();
      return false;
    }
    return true;
  };

  return (
    <Modal
      open
      onClose={onClose}
      onBeforeClose={førLukking}
      header={{
        heading: søkSomSkalSlettes
          ? 'Slett lagret søk'
          : `Administrer søk (${søk.length} av ${MAKS_ANTALL_STANDARDSØK})`,
      }}
      width={søkSomSkalSlettes ? 'small' : 'medium'}
    >
      {søkSomSkalSlettes ? (
        <>
          <Modal.Body>
            <VStack gap='space-16'>
              <BodyShort>Vil du slette «{søkSomSkalSlettes.navn}»?</BodyShort>
              {feil && (
                <InlineMessage status='error' role='alert'>
                  {feil}
                </InlineMessage>
              )}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='button'
              size='small'
              data-color='danger'
              loading={venter}
              onClick={() => slett(søkSomSkalSlettes)}
            >
              Slett
            </Button>
            <Button
              ref={avbrytRef}
              type='button'
              size='small'
              variant='secondary'
              disabled={venter}
              onClick={avbrytSletting}
            >
              Avbryt
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Body>
            <VStack gap='space-16'>
              <BodyShort size='small'>
                Velg et navn for å bruke søket. Standardsøket brukes når du går
                hit fra hovedmenyen. Søk du ikke har brukt på seks måneder,
                slettes.
              </BodyShort>
              {søk.length === 0 ? (
                <BodyShort>Du har ingen lagrede søk.</BodyShort>
              ) : (
                // Liste i stedet for tabell, så handlingene kan brytes under navnet på smale skjermer.
                <ul
                  aria-label='Lagrede søk'
                  className='divide-y divide-[var(--ax-border-neutral-subtle)] border-y border-[var(--ax-border-neutral-subtle)]'
                >
                  {søk.map((s) => (
                    <Box as='li' key={s.id} paddingBlock='space-8'>
                      <HStack
                        gap='space-8'
                        justify='space-between'
                        align='center'
                      >
                        <VStack gap='space-2' align='start'>
                          <Link
                            as='button'
                            type='button'
                            className='text-left'
                            disabled={venter}
                            onClick={() => onBrukSøk(s)}
                          >
                            <span className='sr-only'>Bruk søket </span>
                            {s.navn}
                          </Link>
                          <Detail textColor='subtle'>
                            Sist brukt {formaterStandardsøkDato(s.sistAktiv)}
                            {s.erStandard && (
                              <>
                                {' · '}
                                <Detail
                                  as='span'
                                  weight='semibold'
                                  textColor='default'
                                >
                                  Standard
                                </Detail>
                              </>
                            )}
                            {s.visSlettevarsel &&
                              ` · Slettes ${formaterStandardsøkDato(s.slettes)}`}
                          </Detail>
                        </VStack>
                        <HStack gap='space-4' wrap={false}>
                          {!s.erStandard && (
                            <Button
                              type='button'
                              size='xsmall'
                              variant='tertiary'
                              disabled={venter}
                              aria-label={`Gjør til standard: ${s.navn}`}
                              onClick={() => gjørTilStandard(s)}
                            >
                              Gjør til standard
                            </Button>
                          )}
                          <Button
                            ref={(knapp) => {
                              if (knapp) slettknapper.current.set(s.id, knapp);
                              else slettknapper.current.delete(s.id);
                            }}
                            type='button'
                            size='xsmall'
                            variant='tertiary'
                            data-color='danger'
                            disabled={venter}
                            icon={<TrashIcon aria-hidden />}
                            aria-label={`Slett: ${s.navn}`}
                            onClick={() => startSletting(s)}
                          >
                            Slett
                          </Button>
                        </HStack>
                      </HStack>
                    </Box>
                  ))}
                </ul>
              )}
              <div aria-live='polite'>
                {kvittering && (
                  <InlineMessage status='success'>{kvittering}</InlineMessage>
                )}
              </div>
              {feil && (
                <InlineMessage status='error' role='alert'>
                  {feil}
                </InlineMessage>
              )}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button ref={lukkRef} type='button' size='small' onClick={onClose}>
              Lukk
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
