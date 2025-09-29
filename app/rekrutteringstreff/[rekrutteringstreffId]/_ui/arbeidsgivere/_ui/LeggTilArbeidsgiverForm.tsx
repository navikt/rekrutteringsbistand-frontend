'use client';

import ArbeidsgiverKort from './ArbeidsgiverKort';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import { ArbeidsgiverDTO as PamArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { leggtilNyArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/ny-arbeidsgiver/leggTilNyArbeidsgiver';
import { fjernArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/slett-arbeidsgiver/fjernArbeidsgiver';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import {
  ArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import SlettArbeidsgiverModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/arbeidsgivere/_ui/SlettArbeidsgiverModal';
import SWRLaster from '@/components/SWRLaster';
import { RekbisError } from '@/util/rekbisError';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, BodyShort, HStack } from '@navikt/ds-react';
import { useState, useMemo, useRef, FC, useEffect } from 'react';

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

  const [slette, setSlette] = useState<ArbeidsgiverDTO | null>(null);
  const [sletterArbeidsgiver, setSletterArbeidsgiver] = useState(false);
  const slettModalRef = useRef<HTMLDialogElement>(null);

  const åpneSlettModal = (arbeidsgiver: ArbeidsgiverDTO) => {
    setSlette(arbeidsgiver);
    slettModalRef.current?.showModal();
  };

  const bekreftSlett = async () => {
    if (!slette) return;
    try {
      setSletterArbeidsgiver(true);
      await fjernArbeidsgiver(
        rekrutteringstreffId,
        (slette as any).arbeidsgiverTreffId ?? slette.organisasjonsnummer,
      );
      await mutateArbeidsgivere();
      await mutateHendelser();
    } finally {
      setSletterArbeidsgiver(false);
      setSlette(null);
      slettModalRef.current?.close();
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
                            <Button
                              size='xsmall'
                              variant='tertiary'
                              onClick={() => åpneSlettModal(a)}
                              aria-label={`Fjern ${a.navn}`}
                              disabled={sletterArbeidsgiver}
                            >
                              <XMarkIcon aria-hidden />
                            </Button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <BodyShort>Ingen arbeidsgivere lagt til</BodyShort>
              )}

              <SlettArbeidsgiverModal
                ref={slettModalRef}
                navn={slette?.navn}
                loading={sletterArbeidsgiver}
                onConfirm={bekreftSlett}
                onCancel={() => {
                  setSlette(null);
                  slettModalRef.current?.close();
                }}
              />
            </>
          )}
        </div>
      )}
    </SWRLaster>
  );
};

export default LeggTilArbeidsgiverForm;
