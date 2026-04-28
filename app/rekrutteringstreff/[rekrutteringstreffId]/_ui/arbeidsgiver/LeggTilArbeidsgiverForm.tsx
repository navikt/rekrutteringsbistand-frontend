'use client';

import ArbeidsgiverKort from './ArbeidsgiverKort';
import BehovForm, {
  ArbeidsgiverBehovFormData,
  BehovFormEndringsMeta,
  behovFeilTilErrorSummaryItems,
  tilArbeidsgiverBehovDTO,
  tomtBehov,
  validerBehov,
} from './BehovForm';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import { ArbeidsgiverDTO as PamArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import {
  opprettArbeidsgiverMedBehov,
  useArbeidsgivereMedBehov,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Box, Button, ErrorSummary, HStack } from '@navikt/ds-react';
import { FC, FormEvent, useEffect, useId, useMemo, useRef, useState } from 'react';

interface Props {
  onCompleted?: () => void;
}

const FINN_ARBEIDSGIVER_ID = 'legg-til-arbeidsgiver-sok';

const LeggTilArbeidsgiverForm: FC<Props> = ({ onCompleted }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const arbeidsgivereMedBehovHook =
    useArbeidsgivereMedBehov(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);
  const { data: arbeidsgivere } = arbeidsgivereHook;

  const [valgt, setValgt] = useState<PamArbeidsgiverDTO | null>(null);
  const [behov, setBehov] = useState<ArbeidsgiverBehovFormData>(tomtBehov());
  const [behovFeil, setBehovFeil] = useState<
    ReturnType<typeof validerBehov>
  >({});
  const [valgtFeil, setValgtFeil] = useState<string | undefined>();
  const [harForsoktLagre, setHarForsoktLagre] = useState(false);
  const [submitForsøk, setSubmitForsøk] = useState(0);
  const [saving, setSaving] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const formId = useId();

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

  const errorSummaryItems = useMemo(
    () => [
      ...(valgtFeil
        ? [{ href: `#${FINN_ARBEIDSGIVER_ID}`, melding: valgtFeil }]
        : []),
      ...behovFeilTilErrorSummaryItems(behovFeil),
    ],
    [behovFeil, valgtFeil],
  );

  useEffect(() => {
    if (submitForsøk > 0 && errorSummaryItems.length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [errorSummaryItems.length, submitForsøk]);

  const håndterBehovEndring = (
    neste: ArbeidsgiverBehovFormData,
    meta?: BehovFormEndringsMeta,
  ) => {
    setBehov(neste);
    if (!harForsoktLagre) return;
    if (meta?.type === 'toggle' || meta?.type === 'blur') {
      setBehovFeil(validerBehov(neste));
    }
  };

  const submitMedBehov = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHarForsoktLagre(true);

    const arbeidsgiverFeil = valgt ? undefined : (valgtFeil ?? 'Velg arbeidsgiver');
    setValgtFeil(arbeidsgiverFeil);

    const feil = validerBehov(behov);
    setBehovFeil(feil);
    if (arbeidsgiverFeil || Object.keys(feil).length > 0) {
      setSubmitForsøk((antall) => antall + 1);
      return;
    }

    const behovDto = tilArbeidsgiverBehovDTO(behov);
    if (!valgt || !behovDto) return;

    setSaving(true);
    try {
      await opprettArbeidsgiverMedBehov(rekrutteringstreffId, {
        organisasjonsnummer: valgt.organisasjonsnummer,
        navn: valgt.navn,
        behov: behovDto,
      });
      arbeidsgivereHook.mutate();
      arbeidsgivereMedBehovHook.mutate();
      hendelseHook.mutate();
      setValgt(null);
      setBehov(tomtBehov());
      setBehovFeil({});
      setValgtFeil(undefined);
      setHarForsoktLagre(false);
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

  return (
    <form id={formId} className='space-y-4' onSubmit={submitMedBehov} noValidate>
      {!valgt && (
        <Box
          background='neutral-soft'
          borderRadius='8'
          padding='space-16'
        >
          <VelgArbeidsgiver
            id={FINN_ARBEIDSGIVER_ID}
            arbeidsgiverCallback={setValgt}
            valgtArbeidsgiver={valgt}
            labelText={'Finn arbeidsgiver'}
            description={'Søk på navn eller organisasjonsnummer'}
            error={valgtFeil}
          />
        </Box>
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
        <Box
          background='neutral-soft'
          borderRadius='8'
          padding='space-16'
        >
          <BehovForm
            verdi={behov}
            onChange={håndterBehovEndring}
            feilmeldinger={behovFeil}
          />
        </Box>
      )}

      {harForsoktLagre && errorSummaryItems.length > 0 && (
        <ErrorSummary ref={errorSummaryRef} headingTag='h3'>
          {errorSummaryItems.map((item) => (
            <ErrorSummary.Item key={item.href} href={item.href}>
              {item.melding}
            </ErrorSummary.Item>
          ))}
        </ErrorSummary>
      )}

      <HStack gap='space-8' justify='end'>
        <Button
          type='button'
          variant='secondary'
          onClick={() => onCompleted?.()}
        >
          Avbryt
        </Button>
        <Button type='submit' loading={saving}>
          Legg til
        </Button>
      </HStack>
    </form>
  );
};

export default LeggTilArbeidsgiverForm;
