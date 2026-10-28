'use client';

import {
  MAKS_ANTALL_STANDARDSØK,
  MAKS_NAVNELENGDE_STANDARDSØK,
  type StandardsøkDomene,
  type StandardsøkDTO,
} from '@/app/api/bruker/standardsok/standardsøkTyper';
import {
  erstattStandardsøk,
  opprettStandardsøk,
  useStandardsøk,
} from '@/app/api/bruker/standardsok/useStandardsøk';
import { inneholderFødselsnummer } from '@/components/lagrede-søk/fødselsnummer';
import { harSammeInnhold } from '@/components/lagrede-søk/harSammeInnhold';
import { validerSøkenavn } from '@/components/lagrede-søk/validerSøkenavn';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import {
  BodyShort,
  Button,
  Dialog,
  InlineMessage,
  Radio,
  RadioGroup,
  Select,
  TextField,
  VStack,
} from '@navikt/ds-react';
import { type FormEvent, type RefObject, useId, useRef, useState } from 'react';

type Valg = 'nytt' | 'erstatt';

interface LagreSøkDialogProps {
  domene: StandardsøkDomene;
  /** Det sist valgte lagrede søket. Forhåndsvelges som søket som skal erstattes. */
  forrigeSøkId?: string | null;
  gjeldendeFilter: string;
  gjeldendeFritekst: string[];
  onLagret: (søk: StandardsøkDTO, type: 'nytt' | 'erstattet') => void;
  onClose: () => void;
  returnFocusTo: RefObject<HTMLElement | null>;
}

const feilmelding = (statuskode: number | undefined) => {
  switch (statuskode) {
    case 409:
      return `Du har allerede ${MAKS_ANTALL_STANDARDSØK} lagrede søk. Erstatt et søk, eller slett et i Administrer søk.`;
    case 404:
      return 'Fant ikke søket du ville erstatte. Det kan være slettet.';
    case 400:
      return 'Kunne ikke lagre søket. Sjekk navnet og søkeordene, og prøv igjen.';
    default:
      return 'Kunne ikke lagre søket. Prøv igjen.';
  }
};

export default function LagreSøkDialog({
  domene,
  forrigeSøkId,
  gjeldendeFilter,
  gjeldendeFritekst,
  onLagret,
  onClose,
  returnFocusTo,
}: LagreSøkDialogProps) {
  const { visVarsel } = useApplikasjonContext();
  const { data: søk = [], mutate } = useStandardsøk(domene);
  const skjemaId = useId();
  const advarselId = useId();
  const søkeordId = useId();
  const navnRef = useRef<HTMLInputElement>(null);
  const skjemaRef = useRef<HTMLFormElement>(null);

  const harLagredeSøk = søk.length > 0;
  const harMaksAntall = søk.length >= MAKS_ANTALL_STANDARDSØK;

  // Navnet på et lagret søk endres i Administrer søk, så erstatting beholder navnet.
  const [valg, setValg] = useState<Valg>(harMaksAntall ? 'erstatt' : 'nytt');
  const [erstattId, setErstattId] = useState(
    søk.some((s) => s.id === forrigeSøkId) ? (forrigeSøkId ?? '') : '',
  );
  const [navn, setNavn] = useState('');
  const [navnefeil, setNavnefeil] = useState<string>();
  const [velgSøkFeil, setVelgSøkFeil] = useState<string>();
  const [feil, setFeil] = useState<string>();
  const [lagrer, setLagrer] = useState(false);

  // Første fokus går til det første valget i dialogen, ikke til lukkekrysset: det valgte alternativet
  // i radiogruppen, eller navnefeltet når veilederen ikke har lagrede søk.
  const førsteFokus = () =>
    skjemaRef.current?.querySelector<HTMLInputElement>(
      'input[type="radio"]:checked',
    ) ?? navnRef.current;

  const erstatter = valg === 'erstatt';
  const søkSomErstattes = søk.find((s) => s.id === erstattId);

  const byttValg = (nyttValg: Valg) => {
    setValg(nyttValg);
    setNavnefeil(undefined);
    setVelgSøkFeil(undefined);
  };

  const velgSøkSomErstattes = (id: string) => {
    setErstattId(id);
    setVelgSøkFeil(undefined);
  };

  const lagre = async (event: FormEvent) => {
    event.preventDefault();
    if (lagrer) return;
    if (erstatter && !søkSomErstattes) {
      setVelgSøkFeil('Du må velge søket som skal erstattes.');
      return;
    }
    const trimmetNavn =
      erstatter && søkSomErstattes ? søkSomErstattes.navn : navn.trim();
    if (!erstatter) {
      const navnefeiltekst = validerSøkenavn(trimmetNavn);
      if (navnefeiltekst) {
        setNavnefeil(navnefeiltekst);
        return;
      }
    }
    setNavnefeil(undefined);
    // Enter i dialogen kan sende skjemaet uten at noe er endret. Da skal ikke søket erstattes.
    if (
      erstatter &&
      søkSomErstattes &&
      harSammeInnhold(søkSomErstattes, gjeldendeFilter, gjeldendeFritekst)
    ) {
      setFeil('Søket er likt det du erstatter. Endre filtrene, eller avbryt.');
      return;
    }
    if (gjeldendeFritekst.some(inneholderFødselsnummer)) {
      setFeil(
        'Søkeordene inneholder noe som kan være et fødselsnummer. Fjern søkeordet før du lagrer.',
      );
      return;
    }
    setFeil(undefined);
    setLagrer(true);

    const nyttInnhold = {
      navn: trimmetNavn,
      filter: gjeldendeFilter,
      fritekst: gjeldendeFritekst,
    };
    try {
      const lagret =
        erstatter && søkSomErstattes
          ? await erstattStandardsøk(domene, søkSomErstattes.id, nyttInnhold)
          : await opprettStandardsøk(domene, nyttInnhold);
      await mutate();
      visVarsel({ type: 'success', tekst: 'Søket er lagret.' });
      onLagret(lagret, erstatter ? 'erstattet' : 'nytt');
      onClose();
    } catch (error) {
      const statuskode = RekbisError.ensure(error).statuskode;
      setFeil(feilmelding(statuskode));
      if (statuskode === 404 || statuskode === 409) await mutate();
    } finally {
      setLagrer(false);
    }
  };

  return (
    <Dialog
      open
      onOpenChange={(åpen) => {
        if (!åpen && !lagrer) onClose();
      }}
    >
      <Dialog.Popup
        width='small'
        closeOnOutsideClick={false}
        initialFocusTo={førsteFokus}
        returnFocusTo={returnFocusTo}
      >
        <Dialog.Header>
          <Dialog.Title>Lagre søk</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <form ref={skjemaRef} id={skjemaId} onSubmit={lagre} noValidate>
            <VStack gap='space-16'>
              {harLagredeSøk ? (
                <RadioGroup
                  legend='Hvordan vil du lagre søket?'
                  hideLegend
                  value={valg}
                  onChange={byttValg}
                >
                  <Radio
                    value='nytt'
                    disabled={harMaksAntall}
                    description={
                      harMaksAntall
                        ? `Du har ${MAKS_ANTALL_STANDARDSØK} lagrede søk. Erstatt et søk, eller slett et i Administrer søk.`
                        : undefined
                    }
                  >
                    Lagre som nytt søk
                  </Radio>
                  <Radio value='erstatt'>Erstatt et lagret søk</Radio>
                </RadioGroup>
              ) : (
                <BodyShort size='small'>
                  Vil du at søket skal brukes når du åpner siden, kan du gjøre
                  det til standard i Administrer søk.
                </BodyShort>
              )}

              {erstatter && (
                <Select
                  label='Søk som skal erstattes'
                  description='Filtrene og søkeordene i søket byttes ut med dem du har valgt nå. Navnet beholdes. Du kan endre det i Administrer søk.'
                  size='small'
                  value={erstattId}
                  onChange={(e) => velgSøkSomErstattes(e.target.value)}
                  error={velgSøkFeil}
                >
                  <option value='' disabled>
                    Velg søk
                  </option>
                  {søk.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.navn}
                    </option>
                  ))}
                </Select>
              )}

              {gjeldendeFritekst.length > 0 && (
                <BodyShort id={søkeordId} size='small'>
                  <span className='font-semibold'>Søkeord som lagres:</span>{' '}
                  {gjeldendeFritekst.map((ord) => `«${ord}»`).join(', ')}
                </BodyShort>
              )}

              <BodyShort id={advarselId} size='small'>
                {erstatter
                  ? 'Ikke skriv opplysninger om personer i søkeordene, for eksempel personnavn eller fødselsnummer.'
                  : 'Ikke skriv opplysninger om personer i navnet på søket eller i søkeordene, for eksempel personnavn eller fødselsnummer.'}
              </BodyShort>

              {/* Advarselen og søkeordene står over feltet, men kobles til det, så skjermlesere
                leser dem opp når feltet får fokus med en gang. */}
              {!erstatter && (
                <TextField
                  ref={navnRef}
                  label='Navn på søket'
                  aria-describedby={
                    gjeldendeFritekst.length > 0
                      ? `${advarselId} ${søkeordId}`
                      : advarselId
                  }
                  description={`Maks ${MAKS_NAVNELENGDE_STANDARDSØK} tegn.`}
                  size='small'
                  autoComplete='off'
                  value={navn}
                  onChange={(e) => setNavn(e.target.value)}
                  error={navnefeil}
                />
              )}

              <BodyShort size='small'>
                Søk du ikke har brukt på seks måneder, slettes.
              </BodyShort>

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
            onClick={onClose}
            disabled={lagrer}
          >
            Avbryt
          </Button>
          <Button type='submit' form={skjemaId} size='small' loading={lagrer}>
            {erstatter ? 'Erstatt søk' : 'Lagre'}
          </Button>
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog>
  );
}
