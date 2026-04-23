'use client';

import ArbeidsgiverListeItem from './ArbeidsgiverListeItem';
import BehovVisning from './BehovVisning';
import LeggTilArbeidsgiverKnapp from './LeggTilArbeidsgiverKnapp';
import RedigerBehovModal from './RedigerBehovModal';
import SlettArbeidsgiverModal from './SlettArbeidsgiverModal';
import { useErTreffEier } from '../useErTreffEier';
import { slettArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/mutations';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import {
  ArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import {
  ArbeidsgiverBehovDTO,
  useArbeidsgivereMedBehov,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { PencilIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack, Tooltip } from '@navikt/ds-react';
import * as React from 'react';
import { useMemo, useRef, useState } from 'react';

const Arbeidsgivere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const arbeidsgivereMedBehovHook =
    useArbeidsgivereMedBehov(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);
  const erEier = useErTreffEier();

  const [sletterArbeidsgiver, setSletterArbeidsgiver] = useState(false);
  const [aktivRedigering, setAktivRedigering] = useState<{
    arbeidsgiverTreffId: string;
    navn: string;
    behov: ArbeidsgiverBehovDTO | null;
  } | null>(null);
  const redigerBehovModalRef = useRef<HTMLDialogElement>(null);

  const behovPerArbeidsgiver = useMemo(() => {
    const m = new Map<string, ArbeidsgiverBehovDTO | null>();
    (arbeidsgivereMedBehovHook.data ?? []).forEach((a) =>
      m.set(a.arbeidsgiverTreffId, a.behov ?? null),
    );
    return m;
  }, [arbeidsgivereMedBehovHook.data]);

  const bekreftSlett = async (arbeidsgiver: ArbeidsgiverDTO) => {
    if (!arbeidsgiver) return;
    try {
      setSletterArbeidsgiver(true);
      await slettArbeidsgiver(
        rekrutteringstreffId,
        (arbeidsgiver as any).arbeidsgiverTreffId ??
          arbeidsgiver.organisasjonsnummer,
      );
      arbeidsgivereHook.mutate();
      arbeidsgivereMedBehovHook.mutate();
      hendelseHook.mutate();
    } finally {
      setSletterArbeidsgiver(false);
    }
  };

  const åpneRediger = (arbeidsgiver: ArbeidsgiverDTO) => {
    const id = arbeidsgiver.arbeidsgiverTreffId as string | undefined;
    if (!id) return;
    setAktivRedigering({
      arbeidsgiverTreffId: id,
      navn: arbeidsgiver.navn,
      behov: behovPerArbeidsgiver.get(id) ?? null,
    });
    redigerBehovModalRef.current?.showModal();
  };

  return (
    <SWRLaster hooks={[arbeidsgivereHook]}>
      {(arbeidsgivere) => (
        <div className='flex flex-col gap-4 p-4'>
          {
            <div className={'text-right'}>
              <LeggTilArbeidsgiverKnapp />
            </div>
          }
          {arbeidsgivere.length === 0 ? (
            <BodyShort>Ingen arbeidsgivere lagt til</BodyShort>
          ) : (
            <ul>
              {arbeidsgivere.map((arbeidsgiver, index) => {
                const kunEnArbeidsgiver = arbeidsgivere.length === 1;
                const id = arbeidsgiver.arbeidsgiverTreffId;
                const behov = id ? behovPerArbeidsgiver.get(id) : null;
                const action = (
                  <HStack gap='space-4' align='center'>
                    {erEier && id && (
                      <Button
                        type='button'
                        size='small'
                        variant='tertiary'
                        icon={<PencilIcon aria-hidden />}
                        onClick={() => åpneRediger(arbeidsgiver)}
                        aria-label={`Rediger behov for ${arbeidsgiver.navn}`}
                      >
                        {behov ? 'Rediger behov' : 'Legg til behov'}
                      </Button>
                    )}
                    <SlettArbeidsgiverModal
                      navn={arbeidsgiver.navn}
                      loading={sletterArbeidsgiver}
                      disabled={kunEnArbeidsgiver || sletterArbeidsgiver}
                      onConfirm={() => bekreftSlett(arbeidsgiver)}
                      arbeidsgivereHook={arbeidsgivereHook}
                      variant='trash'
                      renderTrigger={({ button }) =>
                        kunEnArbeidsgiver ? (
                          <Tooltip
                            content='Treffet må alltid ha en arbeidsgiver som deltar. Legg til en ny arbeidsgiver først.'
                            className='max-w-[200px] text-left'
                          >
                            <span>{button}</span>
                          </Tooltip>
                        ) : (
                          button
                        )
                      }
                    />
                  </HStack>
                );
                return (
                  <li key={index}>
                    <ArbeidsgiverListeItem
                      arbeidsgiver={arbeidsgiver}
                      actionSlot={action}
                    />
                    {erEier && behov && <BehovVisning behov={behov} />}
                  </li>
                );
              })}
            </ul>
          )}
          {aktivRedigering && (
            <RedigerBehovModal
              modalRef={redigerBehovModalRef}
              rekrutteringstreffId={rekrutteringstreffId}
              arbeidsgiverTreffId={aktivRedigering.arbeidsgiverTreffId}
              arbeidsgiverNavn={aktivRedigering.navn}
              initielleVerdier={aktivRedigering.behov}
              onLagret={() => {
                arbeidsgivereMedBehovHook.mutate();
                hendelseHook.mutate();
              }}
            />
          )}
        </div>
      )}
    </SWRLaster>
  );
};

export default Arbeidsgivere;
