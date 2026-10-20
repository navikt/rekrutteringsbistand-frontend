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
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import {
  BodyShort,
  Button,
  InlineMessage,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  VStack,
} from '@navikt/ds-react';
import { useState } from 'react';

type Valg = 'nytt' | 'erstatt';

export interface LagreStandardsøkModalProps {
  domene: StandardsøkDomene;
  søk: StandardsøkDTO[];
  aktivtSøkId: string | null;
  gjeldendeFilter: string;
  gjeldendeFritekst: string[];
  onLagret: (søk: StandardsøkDTO, type: 'nytt' | 'erstattet') => void;
  onClose: () => void;
}

const feilmelding = (statuskode: number | undefined) => {
  switch (statuskode) {
    case 409:
      return `Du har allerede ${MAKS_ANTALL_STANDARDSØK} lagrede søk. Erstatt et søk, eller slett et i Administrer søk.`;
    case 404:
      return 'Fant ikke søket du ville erstatte. Det kan være slettet.';
    case 400:
      return 'Kunne ikke lagre søket. Sjekk navnet og prøv igjen.';
    default:
      return 'Kunne ikke lagre søket. Prøv igjen.';
  }
};

export default function LagreStandardsøkModal({
  domene,
  søk,
  aktivtSøkId,
  gjeldendeFilter,
  gjeldendeFritekst,
  onLagret,
  onClose,
}: LagreStandardsøkModalProps) {
  const { visVarsel } = useApplikasjonContext();
  const { mutate } = useStandardsøk(domene);

  const aktivtSøk = søk.find((s) => s.id === aktivtSøkId);
  const harMaksAntall = søk.length >= MAKS_ANTALL_STANDARDSØK;

  const [valg, setValg] = useState<Valg>(
    aktivtSøk || harMaksAntall ? 'erstatt' : 'nytt',
  );
  const [erstattId, setErstattId] = useState(aktivtSøk?.id ?? søk[0]?.id);
  const [navn, setNavn] = useState(aktivtSøk?.navn ?? '');
  const [navnefeil, setNavnefeil] = useState<string>();
  const [feil, setFeil] = useState<string>();
  const [lagrer, setLagrer] = useState(false);

  const velgSøkSomErstattes = (id: string) => {
    setErstattId(id);
    setNavn(søk.find((s) => s.id === id)?.navn ?? '');
  };

  const lagre = async () => {
    const trimmetNavn = navn.trim();
    if (trimmetNavn.length === 0) {
      setNavnefeil('Du må skrive et navn på søket.');
      return;
    }
    if (trimmetNavn.length > MAKS_NAVNELENGDE_STANDARDSØK) {
      setNavnefeil(
        `Navnet kan ha maks ${MAKS_NAVNELENGDE_STANDARDSØK} tegn.`,
      );
      return;
    }
    setNavnefeil(undefined);
    setFeil(undefined);
    setLagrer(true);

    const nyttInnhold = {
      navn: trimmetNavn,
      filter: gjeldendeFilter,
      fritekst: gjeldendeFritekst,
    };
    try {
      const lagret =
        valg === 'erstatt' && erstattId
          ? await erstattStandardsøk(domene, erstattId, nyttInnhold)
          : await opprettStandardsøk(domene, nyttInnhold);
      await mutate();
      visVarsel(
        lagret.fritekstFiltrert
          ? {
              type: 'warning',
              tekst:
                'Søket er lagret. Fødselsnummer ble fjernet fra navnet eller søkeordene.',
            }
          : { type: 'success', tekst: 'Søket er lagret.' },
      );
      onLagret(lagret, valg === 'erstatt' ? 'erstattet' : 'nytt');
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
    <Modal
      open
      onClose={onClose}
      header={{ heading: 'Lagre søk' }}
      width='small'
    >
      <Modal.Body>
        <VStack gap='space-16'>
          <RadioGroup
            legend='Hvordan vil du lagre søket?'
            hideLegend
            value={valg}
            onChange={(verdi: Valg) => setValg(verdi)}
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
            <Radio value='erstatt' disabled={søk.length === 0}>
              Erstatt et lagret søk
            </Radio>
          </RadioGroup>

          {valg === 'erstatt' && søk.length > 0 && (
            <Select
              label='Søk som skal erstattes'
              size='small'
              value={erstattId}
              onChange={(e) => velgSøkSomErstattes(e.target.value)}
            >
              {søk.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.navn}
                </option>
              ))}
            </Select>
          )}

          <TextField
            label='Navn på søket'
            description={`Maks ${MAKS_NAVNELENGDE_STANDARDSØK} tegn. Ikke skriv personopplysninger i navnet.`}
            size='small'
            autoComplete='off'
            value={navn}
            onChange={(e) => setNavn(e.target.value)}
            error={navnefeil}
          />

          <BodyShort size='small'>
            Søk du ikke har brukt på seks måneder, slettes.
          </BodyShort>

          {feil && (
            <InlineMessage status='error' role='alert'>
              {feil}
            </InlineMessage>
          )}
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button type='button' size='small' onClick={lagre} loading={lagrer}>
          Lagre
        </Button>
        <Button
          type='button'
          size='small'
          variant='secondary'
          onClick={onClose}
          disabled={lagrer}
        >
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
