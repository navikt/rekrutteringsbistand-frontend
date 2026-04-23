'use client';

import ArbeidsgiverKort from './ArbeidsgiverKort';
import BehovForm, { tomtBehov, validerBehov } from './BehovForm';
import SlettArbeidsgiverModal from './SlettArbeidsgiverModal';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import { ArbeidsgiverDTO as PamArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import {
  opprettArbeidsgiver,
  slettArbeidsgiver,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/mutations';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import {
  ArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import {
  ArbeidsgiverBehovDTO,
  opprettArbeidsgiverMedBehov,
  useArbeidsgivereMedBehov,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { RekbisError } from '@/util/rekbisError';
import { XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack } from '@navikt/ds-react';
import { FC, useEffect, useMemo, useState } from 'react';

interface Props {
  variant?: 'inline' | 'modal';
  onCompleted?: () => void;
}

const LeggTilArbeidsgiverForm: FC<Props> = ({
  variant = 'inline',
  onCompleted,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const arbeidsgivereMedBehovHook =
    useArbeidsgivereMedBehov(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);
  const { data: arbeidsgivere } = arbeidsgivereHook;

  const [sletterArbeidsgiver, setSletterArbeidsgiver] = useState(false);
  const bekreftSlett = async (arbeidsgiver: ArbeidsgiverDTO) => {
    if (!arbeidsgiver) return;
    try {
      setSletterArbeidsgiver(true);
      await slettArbeidsgiver(
        rekrutteringstreffId,
        (arbeidsgiver as any).arbeidsgiverTreffId ??
          arbeidsgiver.organisasjonsnummer,
      );
      hendelseHook.mutate();
    } finally {
      setSletterArbeidsgiver(false);
    }
  };

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
    if (!arbeidsgivere || !valgt || variant === 'modal') return;
    (async () => {
      try {
        if (eksisterendeOrgnr.has(valgt.organisasjonsnummer)) {
          setValgt(null);
          return;
        }

        // Inline-variant: legg til direkte mot backend uten behov (eldre flyt)
        await opprettArbeidsgiver(rekrutteringstreffId, {
          organisasjonsnummer: valgt.organisasjonsnummer,
          navn: valgt.navn,
          næringskoder: valgt.naringskoder,
          gateadresse: valgt.adresse?.adresse,
          postnummer: valgt.adresse?.postnummer,
          poststed: valgt.adresse?.poststed,
        });
        arbeidsgivereHook.mutate();
        hendelseHook.mutate();
      } catch (error) {
        throw new RekbisError({
          message: 'Feiler når prøver å legge til arbeidsgiver.',
          error,
        });
      } finally {
        setValgt(null);
      }
    })();
  }, [
    valgt,
    variant,
    eksisterendeOrgnr,
    rekrutteringstreffId,
    arbeidsgivereHook,
    hendelseHook,
    arbeidsgivere,
  ]);

  // I modal-variant: ikke legg til i pending-liste, men vis valgt + behovskjema
  useEffect(() => {
    if (variant !== 'modal' || !valgt) return;
    if (eksisterendeOrgnr.has(valgt.organisasjonsnummer)) {
      setValgtFeil('Denne arbeidsgiveren er allerede lagt til');
      setValgt(null);
    } else {
      setValgtFeil(undefined);
    }
  }, [valgt, variant, eksisterendeOrgnr]);

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

  return (
    <SWRLaster hooks={[arbeidsgivereHook]}>
      {(arbeidsgivereData) => (
        <div className={variant === 'modal' ? 'space-y-4' : 'space-y-4'}>
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

          {variant === 'modal' && (
            <>
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
                  onClick={submitMedBehov}
                  disabled={!valgt || saving}
                  loading={saving}
                >
                  Legg til
                </Button>
              </HStack>
            </>
          )}

          {variant === 'inline' && (
            <>
              {Array.isArray(arbeidsgivereData) &&
              arbeidsgivereData.length > 0 ? (
                <ul>
                  {arbeidsgivereData.map((a, index) => {
                    return (
                      <li key={index}>
                        <div className='relative'>
                          <ArbeidsgiverKort
                            navn={a.navn}
                            organisasjonsnummer={a.organisasjonsnummer}
                            gateadresse={a.gateadresse}
                            postnummer={a.postnummer}
                            poststed={a.poststed}
                          />
                          <div className='absolute top-2 right-2'>
                            <SlettArbeidsgiverModal
                              navn={a.navn}
                              loading={sletterArbeidsgiver}
                              disabled={sletterArbeidsgiver}
                              onConfirm={() => bekreftSlett(a)}
                              arbeidsgivereHook={arbeidsgivereHook}
                              variant='cross'
                              triggerAriaLabel={`Fjern ${a.navn}`}
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <BodyShort>Ingen arbeidsgivere lagt til</BodyShort>
              )}
            </>
          )}
        </div>
      )}
    </SWRLaster>
  );
};

export default LeggTilArbeidsgiverForm;
