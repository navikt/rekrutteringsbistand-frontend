'use client';

import {
  erstattLagretSøk,
  slettLagretSøk,
  useHentLagredeSøk,
  velgStandard,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkApi';
import {
  MAKS_ANTALL_LAGREDE_SØK,
  MAKS_NAVNELENGDE_LAGRET_SØK,
  type LagredeSøkDomene,
  type LagretSøkDTO,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import { validerSøkenavn } from '@/components/lagrede-søk/validerSøkenavn';
import { NORSK_DATO_FORMAT } from '@/util/dato';
import { RekbisError } from '@/util/rekbisError';
import { PencilIcon, TrashIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Detail,
  Dialog,
  HStack,
  InlineMessage,
  Link,
  TextField,
  VStack,
} from '@navikt/ds-react';
import { format, parseISO } from 'date-fns';
import {
  type FormEvent,
  type ReactNode,
  type Ref,
  type RefObject,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

interface AdministrerSøkDialogProps {
  domene: LagredeSøkDomene;
  onBrukSøk: (søk: LagretSøkDTO) => void;
  onBrukVanligSøk: () => void;
  onVanligSøkSattSomStandard: () => void;
  onSattSomStandard: (søk: LagretSøkDTO) => void;
  onSlettet: (søk: LagretSøkDTO) => void;
  onClose: () => void;
  returnFocusTo: RefObject<HTMLElement | null>;
}

const formaterDato = (dato: string) =>
  format(parseISO(dato), NORSK_DATO_FORMAT);

interface SøkRadProps {
  as?: 'div' | 'li';
  navn: string;
  /** Leses av skjermlesere foran navnet, så lenken beskriver handlingen. */
  skjultPrefiks: string;
  onBruk: () => void;
  disabled: boolean;
  lenkeRef?: Ref<HTMLButtonElement>;
  merknad?: ReactNode;
  handlinger?: ReactNode;
  kantlinje?: boolean;
}

function SøkRad({
  as = 'div',
  navn,
  skjultPrefiks,
  onBruk,
  disabled,
  lenkeRef,
  merknad,
  handlinger,
  kantlinje = false,
}: SøkRadProps) {
  return (
    <Box
      as={as}
      paddingBlock='space-8'
      borderWidth={kantlinje ? '1 0' : undefined}
      borderColor={kantlinje ? 'neutral-subtle' : undefined}
    >
      <HStack gap='space-8' justify='space-between' align='center'>
        <VStack gap='space-2' align='start'>
          <Link
            ref={lenkeRef}
            as='button'
            type='button'
            className='text-left'
            disabled={disabled}
            onClick={onBruk}
          >
            <span className='sr-only'>{skjultPrefiks}</span>
            {navn}
          </Link>
          {merknad}
        </VStack>
        {handlinger && (
          <HStack gap='space-4' wrap={false}>
            {handlinger}
          </HStack>
        )}
      </HStack>
    </Box>
  );
}

export default function AdministrerSøkDialog({
  domene,
  onBrukSøk,
  onBrukVanligSøk,
  onVanligSøkSattSomStandard,
  onSattSomStandard,
  onSlettet,
  onClose,
  returnFocusTo,
}: AdministrerSøkDialogProps) {
  const endreSkjemaId = useId();
  const advarselId = useId();
  const { data: søk = [], mutate } = useHentLagredeSøk(domene);
  const [søkSomSkalSlettes, setSøkSomSkalSlettes] =
    useState<LagretSøkDTO | null>(null);
  const [søkSomSkalEndres, setSøkSomSkalEndres] = useState<LagretSøkDTO | null>(
    null,
  );
  const [nyttNavn, setNyttNavn] = useState('');
  const [navnefeil, setNavnefeil] = useState<string>();
  const [feil, setFeil] = useState<string>();
  const [kvittering, setKvittering] = useState<string>();
  const [venter, setVenter] = useState(false);

  const vanligSøkErStandard = !søk.some((s) => s.erStandard);

  const avbrytRef = useRef<HTMLButtonElement>(null);
  const lukkRef = useRef<HTMLButtonElement>(null);
  const vanligSøkRef = useRef<HTMLButtonElement>(null);
  const slettknapper = useRef(new Map<string, HTMLButtonElement>());
  const endreknapper = useRef(new Map<string, HTMLButtonElement>());
  const navnRef = useRef<HTMLInputElement>(null);
  // Innholdet i dialogen byttes ut mellom listen og bekreftelsen. Fokus flyttes etter at det nye innholdet er tegnet,
  // og ikke mens knappene er deaktivert av en pågående handling.
  const nesteFokus = useRef<(() => HTMLElement | null | undefined) | null>(
    null,
  );
  useEffect(() => {
    if (!nesteFokus.current || venter) return;
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

  const gjørTilStandard = (valgt: LagretSøkDTO) =>
    utfør(async () => {
      await velgStandard(domene, valgt.id);
      onSattSomStandard(valgt);
      setKvittering(`«${valgt.navn}» er nå standardsøket.`);
      // Knappen forsvinner når søket blir standard, så vi flytter fokus til slettknappen på samme rad.
      nesteFokus.current = () => slettknapper.current.get(valgt.id);
    }, 'Kunne ikke endre standardsøket. Prøv igjen.');

  const gjørVanligSøkTilStandard = () =>
    utfør(async () => {
      await velgStandard(domene, null);
      onVanligSøkSattSomStandard();
      setKvittering('Vanlig søk er nå standard.');
      // Knappen forsvinner, så vi flytter fokus til navnet på samme rad.
      nesteFokus.current = () => vanligSøkRef.current;
    }, 'Kunne ikke endre standardsøket. Prøv igjen.');

  const startEndring = (valgt: LagretSøkDTO) => {
    setFeil(undefined);
    setKvittering(undefined);
    setNavnefeil(undefined);
    setNyttNavn(valgt.navn);
    nesteFokus.current = () => navnRef.current;
    setSøkSomSkalEndres(valgt);
  };

  const avbrytEndring = () => {
    const id = søkSomSkalEndres?.id;
    setFeil(undefined);
    setNavnefeil(undefined);
    nesteFokus.current = () => (id ? endreknapper.current.get(id) : null);
    setSøkSomSkalEndres(null);
  };

  const endreNavn = (event: FormEvent, valgt: LagretSøkDTO) => {
    event.preventDefault();
    if (venter) return;
    const trimmet = nyttNavn.trim();
    const feiltekst = validerSøkenavn(trimmet);
    if (feiltekst) {
      setNavnefeil(feiltekst);
      return;
    }
    setNavnefeil(undefined);
    if (trimmet === valgt.navn) {
      avbrytEndring();
      return;
    }
    return utfør(async () => {
      await erstattLagretSøk(domene, valgt.id, {
        navn: trimmet,
        filter: valgt.filter,
        fritekst: valgt.fritekst,
      });
      setKvittering(`«${valgt.navn}» heter nå «${trimmet}».`);
      nesteFokus.current = () => endreknapper.current.get(valgt.id);
      setSøkSomSkalEndres(null);
    }, 'Kunne ikke endre navnet. Prøv igjen.');
  };

  const startSletting = (valgt: LagretSøkDTO) => {
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

  const slett = (valgt: LagretSøkDTO) =>
    utfør(async () => {
      await slettLagretSøk(domene, valgt.id);
      onSlettet(valgt);
      setKvittering(
        valgt.erStandard
          ? `«${valgt.navn}» er slettet. Vanlig søk er nå standard.`
          : `«${valgt.navn}» er slettet.`,
      );
      nesteFokus.current = () => lukkRef.current;
      setSøkSomSkalSlettes(null);
    }, 'Kunne ikke slette søket. Prøv igjen.');

  // Lukkeknappen og Esc i bekreftelsen går tilbake til listen i stedet for å lukke hele dialogen.
  const lukk = () => {
    if (venter) return;
    if (søkSomSkalEndres) avbrytEndring();
    else if (søkSomSkalSlettes) avbrytSletting();
    else onClose();
  };

  return (
    <Dialog
      open
      onOpenChange={(åpen) => {
        if (!åpen) lukk();
      }}
    >
      <Dialog.Popup
        width={søkSomSkalSlettes || søkSomSkalEndres ? 'small' : 'medium'}
        closeOnOutsideClick={false}
        returnFocusTo={returnFocusTo}
      >
        <Dialog.Header>
          <Dialog.Title>
            {søkSomSkalEndres
              ? 'Endre navn på søket'
              : søkSomSkalSlettes
                ? 'Slett lagret søk'
                : `Administrer søk (${søk.length} av ${MAKS_ANTALL_LAGREDE_SØK})`}
          </Dialog.Title>
        </Dialog.Header>
        {søkSomSkalEndres ? (
          <>
            <Dialog.Body>
              <form
                id={endreSkjemaId}
                onSubmit={(e) => endreNavn(e, søkSomSkalEndres)}
                noValidate
              >
                <VStack gap='space-16'>
                  <BodyShort id={advarselId} size='small'>
                    Ikke skriv opplysninger om personer i navnet på søket, for
                    eksempel personnavn eller fødselsnummer.
                  </BodyShort>
                  <TextField
                    ref={navnRef}
                    label='Navn på søket'
                    aria-describedby={advarselId}
                    description={`Maks ${MAKS_NAVNELENGDE_LAGRET_SØK} tegn.`}
                    size='small'
                    autoComplete='off'
                    value={nyttNavn}
                    onChange={(e) => setNyttNavn(e.target.value)}
                    error={navnefeil}
                  />
                  {feil && (
                    <InlineMessage status='error' role='alert'>
                      {feil}
                    </InlineMessage>
                  )}
                </VStack>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                type='button'
                size='small'
                variant='secondary'
                disabled={venter}
                onClick={avbrytEndring}
              >
                Avbryt
              </Button>
              <Button
                type='submit'
                form={endreSkjemaId}
                size='small'
                loading={venter}
              >
                Lagre navn
              </Button>
            </Dialog.Footer>
          </>
        ) : søkSomSkalSlettes ? (
          <>
            <Dialog.Body>
              <VStack gap='space-16'>
                <BodyShort>Vil du slette «{søkSomSkalSlettes.navn}»?</BodyShort>
                {feil && (
                  <InlineMessage status='error' role='alert'>
                    {feil}
                  </InlineMessage>
                )}
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
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
              <Button
                type='button'
                size='small'
                data-color='danger'
                loading={venter}
                onClick={() => slett(søkSomSkalSlettes)}
              >
                Slett
              </Button>
            </Dialog.Footer>
          </>
        ) : (
          <>
            <Dialog.Body>
              <VStack gap='space-16'>
                <BodyShort size='small'>
                  Velg navnet på et søk for å bruke det. Du kan også endre navn
                  eller slette søk. Standardsøket brukes når du åpner siden.
                  Vanlig søk viser siden uten filtrene du har valgt selv. Hvis
                  du sletter standardsøket, blir vanlig søk standard. Vi sletter
                  søk du ikke har brukt på seks måneder.
                </BodyShort>
                {/* Egen blokk utenfor listen, så listen bare har lagrede søk og stemmer med antallet i overskriften. */}
                <SøkRad
                  navn='Vanlig søk'
                  skjultPrefiks='Bruk '
                  onBruk={onBrukVanligSøk}
                  disabled={venter}
                  lenkeRef={vanligSøkRef}
                  kantlinje
                  merknad={
                    vanligSøkErStandard && (
                      <Detail weight='semibold'>Standard</Detail>
                    )
                  }
                  handlinger={
                    !vanligSøkErStandard && (
                      <Button
                        type='button'
                        size='xsmall'
                        variant='tertiary'
                        disabled={venter}
                        aria-label='Gjør til standard: Vanlig søk'
                        onClick={gjørVanligSøkTilStandard}
                      >
                        Gjør til standard
                      </Button>
                    )
                  }
                />
                {søk.length === 0 ? (
                  <BodyShort>Du har ingen lagrede søk.</BodyShort>
                ) : (
                  // Liste i stedet for tabell, så handlingene kan brytes under navnet på smale skjermer.
                  <ul
                    aria-label='Lagrede søk'
                    className='divide-y divide-[var(--ax-border-neutral-subtle)] border-y border-[var(--ax-border-neutral-subtle)]'
                  >
                    {søk.map((s) => {
                      const merknad = (
                        <Detail textColor='subtle'>
                          Sist brukt {formaterDato(s.sistAktiv)}
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
                            ` · Slettes ${formaterDato(s.slettes)}`}
                        </Detail>
                      );

                      return (
                        <SøkRad
                          as='li'
                          key={s.id}
                          navn={s.navn}
                          skjultPrefiks='Bruk søket '
                          onBruk={() => onBrukSøk(s)}
                          disabled={venter}
                          merknad={merknad}
                          handlinger={
                            <>
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
                                  if (knapp)
                                    endreknapper.current.set(s.id, knapp);
                                  else endreknapper.current.delete(s.id);
                                }}
                                type='button'
                                size='xsmall'
                                variant='tertiary'
                                disabled={venter}
                                icon={<PencilIcon aria-hidden />}
                                aria-label={`Endre navn: ${s.navn}`}
                                onClick={() => startEndring(s)}
                              >
                                Endre navn
                              </Button>
                              <Button
                                ref={(knapp) => {
                                  if (knapp)
                                    slettknapper.current.set(s.id, knapp);
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
                            </>
                          }
                        />
                      );
                    })}
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
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                ref={lukkRef}
                type='button'
                size='small'
                onClick={onClose}
              >
                Lukk
              </Button>
            </Dialog.Footer>
          </>
        )}
      </Dialog.Popup>
    </Dialog>
  );
}
