'use client';

import {
  erstattLagretSøk,
  opprettLagretSøk,
  useHentLagredeSøk,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkApi';
import {
  MAKS_ANTALL_LAGREDE_SØK,
  MAKS_ANTALL_SØKEORD_LAGRET_SØK,
  MAKS_NAVNELENGDE_LAGRET_SØK,
  MAKS_SØKEORDTEGN_LAGRET_SØK,
  overstigerSøkeordgrensen,
  type LagredeSøkDomene,
  type LagretSøkDTO,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import {
  type FrieFilterverdier,
  inneholderFødselsnummer,
  verdierLignerFødselsnummer,
} from '@/components/lagrede-søk/fødselsnummer';
import { finnLiktSøk } from '@/components/lagrede-søk/harSammeInnhold';
import { validerSøkenavn } from '@/components/lagrede-søk/validerSøkenavn';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import {
  BodyShort,
  Button,
  Dialog,
  InlineMessage,
  Link,
  Radio,
  RadioGroup,
  Select,
  TextField,
  VStack,
} from '@navikt/ds-react';
import { type FormEvent, type RefObject, useId, useRef, useState } from 'react';

type Valg = 'nytt' | 'erstatt';

interface LagreSøkDialogProps {
  domene: LagredeSøkDomene;
  forrigeSøkId?: string | null;
  gjeldendeFilter: string;
  gjeldendeSøkeord: string[];
  normaliserFilter?: (filter: string) => string;
  frieFilterverdier?: FrieFilterverdier[];
  onLagret: (søk: LagretSøkDTO, type: 'nytt' | 'erstattet') => void;
  onÅpneAdministrer: () => void;
  onClose: () => void;
  returnFocusTo: RefObject<HTMLElement | null>;
}

const liktSøkMelding = (navn: string) =>
  `Du har allerede lagret dette søket som «${navn}». Endre filtrene eller søkeordene, eller avbryt.`;

const feilmelding = (statuskode: number | undefined) => {
  switch (statuskode) {
    case 409:
      return `Du har allerede ${MAKS_ANTALL_LAGREDE_SØK} lagrede søk. Erstatt et søk, eller slett et i Administrer søk.`;
    case 404:
      return 'Fant ikke søket du ville erstatte. Det kan være slettet.';
    // Navn, fødselsnummer og søkeord sjekkes før lagring, så 400 gjelder i praksis filteret.
    case 400:
      return 'Kunne ikke lagre søket. Prøv med færre filtre.';
    default:
      return 'Kunne ikke lagre søket. Prøv igjen.';
  }
};

export default function LagreSøkDialog({
  domene,
  forrigeSøkId,
  gjeldendeFilter,
  gjeldendeSøkeord,
  normaliserFilter,
  frieFilterverdier = [],
  onLagret,
  onÅpneAdministrer,
  onClose,
  returnFocusTo,
}: LagreSøkDialogProps) {
  const { visVarsel } = useApplikasjonContext();
  const { data: søk = [], mutate } = useHentLagredeSøk(domene);
  const skjemaId = useId();
  const advarselId = useId();
  const søkeordId = useId();
  const frieVerdierId = useId();
  const valgteFrieVerdier = frieFilterverdier.filter(
    ({ verdier }) => verdier.length > 0,
  );
  const navnRef = useRef<HTMLInputElement>(null);
  const skjemaRef = useRef<HTMLFormElement>(null);

  const harLagredeSøk = søk.length > 0;
  const harMaksAntall = søk.length >= MAKS_ANTALL_LAGREDE_SØK;

  const [valg, setValg] = useState<Valg>(harMaksAntall ? 'erstatt' : 'nytt');
  const forrigeSøk = søk.find((s) => s.id === forrigeSøkId);
  const [erstattId, setErstattId] = useState(forrigeSøk?.id ?? '');
  // Navnet for nytt søk og navnet ved erstatting holdes hver for seg. Ved erstatting fylles navnet
  // på søket inn, så veilederen kan beholde det eller gi søket et nytt navn i samme operasjon.
  const [navn, setNavn] = useState('');
  const [erstattNavn, setErstattNavn] = useState(forrigeSøk?.navn ?? '');
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
    setErstattNavn(søk.find((s) => s.id === id)?.navn ?? '');
    setVelgSøkFeil(undefined);
    setNavnefeil(undefined);
  };

  const lagre = async (event: FormEvent) => {
    event.preventDefault();
    if (lagrer) return;
    if (erstatter && !søkSomErstattes) {
      setVelgSøkFeil('Du må velge søket som skal erstattes.');
      return;
    }
    const trimmetNavn = (erstatter ? erstattNavn : navn).trim();
    const navnefeiltekst = validerSøkenavn(trimmetNavn);
    if (navnefeiltekst) {
      setNavnefeil(navnefeiltekst);
      return;
    }
    setNavnefeil(undefined);
    // Vi lagrer ikke et søk som finnes fra før. Enter i dialogen kan også sende skjemaet uten at noe er endret.
    // Backend sjekker ikke dette, så to faner som lagrer samtidig, kan gi to like søk. Administrer søk viser dem.
    const liktSøk = finnLiktSøk(
      søk,
      gjeldendeFilter,
      gjeldendeSøkeord,
      normaliserFilter,
    );
    if (liktSøk) {
      setFeil(
        erstatter && liktSøk.id === søkSomErstattes?.id
          ? 'Søket er likt det du erstatter. Endre filtrene, eller avbryt.'
          : liktSøkMelding(liktSøk.navn),
      );
      return;
    }
    if (gjeldendeSøkeord.some(inneholderFødselsnummer)) {
      setFeil(
        'Søkeordene inneholder noe som kan være et fødselsnummer. Fjern søkeordet før du lagrer.',
      );
      return;
    }
    // Teksten nevner bare feltet, ikke verdien.
    const feltMedFødselsnummer = valgteFrieVerdier.find(({ verdier }) =>
      verdierLignerFødselsnummer(verdier),
    );
    if (feltMedFødselsnummer) {
      setFeil(
        `En verdi i ${feltMedFødselsnummer.felt} ligner et fødselsnummer. Fjern den før du lagrer.`,
      );
      return;
    }
    if (overstigerSøkeordgrensen(gjeldendeSøkeord)) {
      setFeil(
        `Du kan lagre opptil ${MAKS_ANTALL_SØKEORD_LAGRET_SØK} søkeord med til sammen ${MAKS_SØKEORDTEGN_LAGRET_SØK} tegn. Fjern søkeord før du lagrer.`,
      );
      return;
    }
    setFeil(undefined);
    setLagrer(true);

    const nyttInnhold = {
      navn: trimmetNavn,
      filter: gjeldendeFilter,
      fritekst: gjeldendeSøkeord,
    };
    try {
      const lagret =
        erstatter && søkSomErstattes
          ? await erstattLagretSøk(domene, søkSomErstattes.id, nyttInnhold)
          : await opprettLagretSøk(domene, nyttInnhold);
      await mutate();
      visVarsel({ type: 'success', tekst: 'Søket er lagret.' });
      onLagret(lagret, erstatter ? 'erstattet' : 'nytt');
      onClose();
    } catch (error) {
      const statuskode = RekbisError.ensure(error).statuskode;
      setFeil(feilmelding(statuskode));
      // Listen kan være utdatert, for eksempel når et søk er slettet eller lagret i en annen fane.
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
              {harLagredeSøk && (
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
                        ? `Du har ${MAKS_ANTALL_LAGREDE_SØK} lagrede søk. Erstatt et søk, eller slett et først.`
                        : undefined
                    }
                  >
                    Lagre som nytt søk
                  </Radio>
                  <Radio value='erstatt'>Erstatt et lagret søk</Radio>
                </RadioGroup>
              )}

              {harMaksAntall && (
                <BodyShort size='small'>
                  <Link
                    as='button'
                    type='button'
                    disabled={lagrer}
                    onClick={onÅpneAdministrer}
                  >
                    Slett søk i Administrer søk
                  </Link>
                </BodyShort>
              )}

              {!harLagredeSøk && (
                <BodyShort size='small'>
                  Vil du at søket skal brukes når du åpner siden, kan du gjøre
                  det til standard i Administrer søk.
                </BodyShort>
              )}

              {erstatter && (
                <Select
                  label='Søk som skal erstattes'
                  description='Filtrene og søkeordene i søket byttes ut med dem du har valgt nå.'
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

              {gjeldendeSøkeord.length > 0 && (
                <BodyShort id={søkeordId} size='small'>
                  <span className='font-semibold'>Søkeord som lagres:</span>{' '}
                  {gjeldendeSøkeord.map((ord) => `«${ord}»`).join(', ')}
                </BodyShort>
              )}

              {valgteFrieVerdier.length > 0 && (
                <VStack id={frieVerdierId} gap='space-4'>
                  {valgteFrieVerdier.map(({ felt, verdier }) => (
                    <BodyShort key={felt} size='small'>
                      <span className='font-semibold'>{felt} som lagres:</span>{' '}
                      {verdier.map((verdi) => `«${verdi}»`).join(', ')}
                    </BodyShort>
                  ))}
                </VStack>
              )}

              <BodyShort id={advarselId} size='small'>
                {valgteFrieVerdier.length > 0
                  ? 'Ikke skriv opplysninger om personer i navnet på søket, i søkeordene eller i filtrene, for eksempel personnavn eller fødselsnummer.'
                  : 'Ikke skriv opplysninger om personer i navnet på søket eller i søkeordene, for eksempel personnavn eller fødselsnummer.'}
              </BodyShort>

              {/* Advarselen og søkeordene står over feltet, men kobles til det, så skjermlesere
                leser dem opp når feltet får fokus med en gang. */}
              {(!erstatter || søkSomErstattes) && (
                <TextField
                  ref={navnRef}
                  label='Navn på søket'
                  aria-describedby={[
                    advarselId,
                    gjeldendeSøkeord.length > 0 && søkeordId,
                    valgteFrieVerdier.length > 0 && frieVerdierId,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  description={`Maks ${MAKS_NAVNELENGDE_LAGRET_SØK} tegn.`}
                  size='small'
                  autoComplete='off'
                  value={erstatter ? erstattNavn : navn}
                  onChange={(e) =>
                    erstatter
                      ? setErstattNavn(e.target.value)
                      : setNavn(e.target.value)
                  }
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
