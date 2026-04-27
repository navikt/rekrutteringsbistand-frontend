'use client';

import ArbeidsgiverKort from './ArbeidsgiverKort';
import BehovForm, { tomtBehov, validerBehov } from './BehovForm';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import { ArbeidsgiverDTO as PamArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import {
  ArbeidsgiverBehovDTO,
  opprettArbeidsgiverMedBehov,
  useArbeidsgivereMedBehov,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack } from '@navikt/ds-react';
import { FC, useEffect, useMemo, useState } from 'react';

interface Props {
  onCompleted?: () => void;
}

const LeggTilArbeidsgiverForm: FC<Props> = ({ onCompleted }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const arbeidsgivereMedBehovHook =
    useArbeidsgivereMedBehov(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);
  const { data: arbeidsgivere } = arbeidsgivereHook;

  const [valgt, setValgt] = useState<PamArbeidsgiverDTO | null>(null);
  const [behov, setBehov] = useState<ArbeidsgiverBehovDTO>(tomtBehov());
  const [behovFeil, setBehovFeil] = useState<
    Partial<Record<keyof ArbeidsgiverBehovDTO, string>>
  >({});
  const [valgtFeil, setValgtFeil] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  const eksisterendeOrgnr = useMemo(
    () => new Set((arbeidsgivere ?? []).map((a) => a.organisasjonsnummer)),
    [arbeidsgivere],
  );

  useEffect(() => {
    if (!valgt) return;
    if (eksisterendeOrgnr.has(valgt.organisasjonsnummer)) {
      setValgtFeil('Denne arbeidsgiveren er allerede lagt til');
      setValgt(null);
    } else {
      setValgtFeil(undefined);
    }
  }, [valgt, eksisterendeOrgnr]);

  const submitMedBehov = async () => {
    if (!valgt) {
      setValgtFeil('Velg arbeidsgiver');
      return;
    }
    const feil = validerBehov(behov);
    setBehovFeil(feil);
    if (Object.keys(feil).length > 0) return;

    setSaving(true);
    try {
      await opprettArbeidsgiverMedBehov(rekrutteringstreffId, {
        organisasjonsnummer: valgt.organisasjonsnummer,
        navn: valgt.navn,
        behov,
      });
      arbeidsgivereHook.mutate();
      arbeidsgivereMedBehovHook.mutate();
      hendelseHook.mutate();
      setValgt(null);
      setBehov(tomtBehov());
      setBehovFeil({});
      onCompleted?.();
    } catch (error) {
      throw new RekbisError({
        message: 'Feiler når prøver å legge til arbeidsgiver med behov.',
        error,
      });
    } finally {
      setSaving(false);
    }
  };

  const erBehovUgyldig = Object.keys(validerBehov(behov)).length > 0;
  const submitDisabled = !valgt || saving || erBehovUgyldig;

  return (
    <div className='space-y-4'>
      {!valgt && (
        <div>
          <VelgArbeidsgiver
            arbeidsgiverCallback={setValgt}
            valgtArbeidsgiver={valgt}
            labelText={'Finn arbeidsgiver'}
            placeholder={'Søk på navn, organisasjonsnummer'}
          />
          {valgtFeil && (
            <BodyShort size='small' className='text-text-danger mt-1'>
              {valgtFeil}
            </BodyShort>
          )}
        </div>
      )}

      {valgt && (
        <div className='relative'>
          <ArbeidsgiverKort
            navn={valgt.navn}
            organisasjonsnummer={valgt.organisasjonsnummer}
            gateadresse={valgt.adresse?.adresse}
            postnummer={valgt.adresse?.postnummer}
            poststed={valgt.adresse?.poststed}
          />
          <div className='absolute top-2 right-2'>
            <Button
              type='button'
              size='xsmall'
              variant='tertiary'
              onClick={() => {
                setValgt(null);
                setBehov(tomtBehov());
                setBehovFeil({});
              }}
              aria-label={`Fjern ${valgt.navn}`}
            >
              <XMarkIcon aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {valgt && (
        <BehovForm
          verdi={behov}
          onChange={setBehov}
          feilmeldinger={behovFeil}
        />
      )}

      <HStack gap='space-8' justify='end'>
        <Button
          type='button'
          variant='secondary'
          onClick={() => onCompleted?.()}
        >
          Avbryt
        </Button>
        <Button
          type='button'
          onClick={submitMedBehov}
          disabled={submitDisabled}
          loading={saving}
        >
          Legg til
        </Button>
      </HStack>
    </div>
  );
};

export default LeggTilArbeidsgiverForm;
