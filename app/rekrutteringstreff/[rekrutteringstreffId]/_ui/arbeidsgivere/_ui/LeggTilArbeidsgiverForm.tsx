'use client';

import ArbeidsgiverKort from './ArbeidsgiverKort';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import { ArbeidsgiverDTO as PamArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { leggtilNyArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/ny-arbeidsgiver/leggTilNyArbeidsgiver';
import { fjernArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/slett-arbeidsgiver/fjernArbeidsgiver';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, BodyShort, HStack, Modal } from '@navikt/ds-react';
import { useState, useMemo, useRef, FC, useEffect } from 'react';

interface Props {
  variant?: 'inline' | 'modal';
  onCompleted?: () => void; // called after successful backend adds
}

const LeggTilArbeidsgiverForm: FC<Props> = ({
  variant = 'inline',
  onCompleted,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);

  const [slette, setSlette] = useState<{ navn: string; orgnr: string } | null>(
    null,
  );
  const slettModalRef = useRef<HTMLDialogElement>(null);

  const åpneSlettModal = (navn: string, orgnr: string) => {
    setSlette({ navn, orgnr });
    slettModalRef.current?.showModal();
  };

  const bekreftSlett = async () => {
    if (!slette) return;
    try {
      await fjernArbeidsgiver(rekrutteringstreffId, slette.orgnr);
      await arbeidsgivereHook.mutate();
      await hendelseHook.mutate();
    } finally {
      setSlette(null);
      slettModalRef.current?.close();
    }
  };

  const [valgt, setValgt] = useState<PamArbeidsgiverDTO | null>(null);
  const [pending, setPending] = useState<PamArbeidsgiverDTO[]>([]);
  const [saving, setSaving] = useState(false);

  const eksisterendeOrgnr = useMemo(
    () =>
      new Set((arbeidsgivereHook.data ?? []).map((a) => a.organisasjonsnummer)),
    [arbeidsgivereHook.data],
  );

  const addSelectedToPending = async () => {
    if (!valgt) return;
    if (eksisterendeOrgnr.has(valgt.organisasjonsnummer)) {
      // Allerede lagt til – nullstill og returner
      setValgt(null);
      return;
    }

    if (variant === 'modal') {
      if (
        !pending.find(
          (p) => p.organisasjonsnummer === valgt.organisasjonsnummer,
        )
      ) {
        setPending((prev) => [...prev, valgt]);
      }
      setValgt(null);
      return;
    }

    // Inline-variant: legg til direkte mot backend
    try {
      await leggtilNyArbeidsgiver(
        { organisasjonsnummer: valgt.organisasjonsnummer, navn: valgt.navn },
        rekrutteringstreffId,
      );
      await arbeidsgivereHook.mutate();
      await hendelseHook.mutate();
    } catch (error) {
      throw new RekbisError({
        message: 'Feiler når prøver å legge til arbeidsgiver.',
        error,
      });
    } finally {
      setValgt(null);
    }
  };

  const removeFromPending = (orgnr: string) => {
    setPending((prev) => prev.filter((p) => p.organisasjonsnummer !== orgnr));
  };

  useEffect(() => {
    if (valgt) {
      // Auto-add on selection for both variants:
      // - modal: add to pending list
      // - inline: add directly to backend
      (async () => {
        await addSelectedToPending();
      })();
    }
  }, [valgt]);

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
      await arbeidsgivereHook.mutate();
      await hendelseHook.mutate();
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
              <BodyShort size='small'>Ingen arbeidsgivere valgt ennå</BodyShort>
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
          {Array.isArray(arbeidsgivereHook.data) &&
          arbeidsgivereHook.data.length > 0 ? (
            <ul>
              {arbeidsgivereHook.data.map((a, index) => {
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
                          onClick={() =>
                            åpneSlettModal(a.navn, a.organisasjonsnummer)
                          }
                          aria-label={`Fjern ${a.navn}`}
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

          <Modal ref={slettModalRef} header={{ heading: 'Slett arbeidsgiver' }}>
            <Modal.Body>
              {slette && (
                <BodyShort>
                  Er du sikker på at du vil slette {slette.navn} fra dette
                  rekrutteringstreffet?
                </BodyShort>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='danger' onClick={bekreftSlett}>
                Slett
              </Button>
              <Button
                variant='secondary'
                onClick={() => {
                  setSlette(null);
                  slettModalRef.current?.close();
                }}
              >
                Avbryt
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default LeggTilArbeidsgiverForm;
