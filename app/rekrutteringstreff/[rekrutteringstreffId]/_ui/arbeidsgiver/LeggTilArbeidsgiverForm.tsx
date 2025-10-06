'use client';

import ArbeidsgiverKort from './ArbeidsgiverKort';
import SlettArbeidsgiverModal from './SlettArbeidsgiverModal';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import { ArbeidsgiverDTO as PamArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { leggtilNyArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/ny-arbeidsgiver/leggTilNyArbeidsgiver';
import { fjernArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/slett-arbeidsgiver/fjernArbeidsgiver';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import {
  ArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { RekbisError } from '@/util/rekbisError';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, BodyShort, HStack } from '@navikt/ds-react';
import { useState, useMemo, FC, useEffect } from 'react';

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
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);
  const { data: arbeidsgivere, mutate: mutateArbeidsgivere } =
    arbeidsgivereHook;
  const { mutate: mutateHendelser } = hendelseHook;

  const [sletterArbeidsgiver, setSletterArbeidsgiver] = useState(false);
  const bekreftSlett = async (arbeidsgiver: ArbeidsgiverDTO) => {
    if (!arbeidsgiver) return;
    try {
      setSletterArbeidsgiver(true);
      await fjernArbeidsgiver(
        rekrutteringstreffId,
        (arbeidsgiver as any).arbeidsgiverTreffId ??
          arbeidsgiver.organisasjonsnummer,
      );
      await mutateHendelser();
    } finally {
      setSletterArbeidsgiver(false);
    }
  };

  const [valgt, setValgt] = useState<PamArbeidsgiverDTO | null>(null);
  const [pending, setPending] = useState<PamArbeidsgiverDTO[]>([]);
  const [saving, setSaving] = useState(false);

  const eksisterendeOrgnr = useMemo(
    () => new Set((arbeidsgivere ?? []).map((a) => a.organisasjonsnummer)),
    [arbeidsgivere],
  );

  const removeFromPending = (orgnr: string) => {
    setPending((prev) => prev.filter((p) => p.organisasjonsnummer !== orgnr));
  };

  useEffect(() => {
    if (!arbeidsgivere || !valgt) return;
    (async () => {
      try {
        if (eksisterendeOrgnr.has(valgt.organisasjonsnummer)) {
          setValgt(null);
          return;
        }

        if (variant === 'modal') {
          setPending((prev) => {
            const finnes = prev.some(
              (p) => p.organisasjonsnummer === valgt.organisasjonsnummer,
            );
            return finnes ? prev : [...prev, valgt];
          });
          setValgt(null);
          return;
        }

        // Inline-variant: legg til direkte mot backend
        await leggtilNyArbeidsgiver(
          { organisasjonsnummer: valgt.organisasjonsnummer, navn: valgt.navn },
          rekrutteringstreffId,
        );
        await mutateArbeidsgivere();
        await mutateHendelser();
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
    mutateArbeidsgivere,
    mutateHendelser,
    arbeidsgivere,
  ]);

  const submit = async () => {
    if (pending.length === 0) return;
    setSaving(true);
    try {
      for (const p of pending) {
        await leggtilNyArbeidsgiver(
          { organisasjonsnummer: p.organisasjonsnummer, navn: p.navn },
          rekrutteringstreffId,
        );
      }
      await mutateArbeidsgivere();
      await mutateHendelser();
      setPending([]);
      onCompleted?.();
    } catch (error) {
      throw new RekbisError({
        message: 'Feiler når prøver å legge til arbeidsgiver(e).',
        error,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <SWRLaster hooks={[arbeidsgivereHook]}>
      {(arbeidsgivereData) => (
        <div className={variant === 'modal' ? 'space-y-3' : 'space-y-4'}>
          <div>
            <VelgArbeidsgiver
              arbeidsgiverCallback={setValgt}
              valgtArbeidsgiver={valgt}
              labelText={'Finn arbeidsgiver'}
              placeholder={'Søk på navn, organisasjonsnummer'}
            />
          </div>

          {variant === 'modal' && (
            <>
              <div className='space-y-2'>
                {pending.map((p) => (
                  <div key={p.organisasjonsnummer} className='relative'>
                    <ArbeidsgiverKort
                      navn={p.navn}
                      organisasjonsnummer={p.organisasjonsnummer}
                      adresse={p.adresse ?? undefined}
                    />
                    <div className='absolute right-2 top-2'>
                      <Button
                        size='xsmall'
                        variant='tertiary'
                        onClick={() => removeFromPending(p.organisasjonsnummer)}
                        aria-label={`Fjern ${p.navn}`}
                      >
                        <XMarkIcon aria-hidden />
                      </Button>
                    </div>
                  </div>
                ))}
                {pending.length === 0 && (
                  <BodyShort size='small'>
                    Ingen arbeidsgivere valgt ennå
                  </BodyShort>
                )}
              </div>

              <HStack gap='2' justify='end'>
                <Button
                  type='button'
                  onClick={submit}
                  disabled={pending.length === 0 || saving}
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
                            adresse={{
                              adresse:
                                'TODO: adresse må lagres i backend for å kunne hentes her',
                            }}
                          />
                          <div className='absolute right-2 top-2'>
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
