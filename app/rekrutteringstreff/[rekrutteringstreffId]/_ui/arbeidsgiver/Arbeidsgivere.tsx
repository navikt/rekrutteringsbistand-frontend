'use client';

import { useErTreffEier } from '../useErTreffEier';
import ArbeidsgiverListeItem from './ArbeidsgiverListeItem';
import LeggTilArbeidsgiverKnapp from './LeggTilArbeidsgiverKnapp';
import SlettArbeidsgiverModal from './SlettArbeidsgiverModal';
import { useRedigerBehov } from './useRedigerBehov';
import { slettArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/mutations';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import {
  ArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { PencilIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack, Tooltip } from '@navikt/ds-react';
import { useState } from 'react';

const Arbeidsgivere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);
  const erEier = useErTreffEier();

  const {
    åpneRediger,
    behovPerArbeidsgiver,
    oppdaterArbeidsgivereMedBehov,
    aktivRedigeringArbeidsgiverTreffId,
    redigerBehovDialogId,
    dialog,
  } = useRedigerBehov();

  const [sletterArbeidsgiver, setSletterArbeidsgiver] = useState(false);

  const bekreftSlett = async (arbeidsgiver: ArbeidsgiverDTO) => {
    if (!arbeidsgiver) return;
    try {
      setSletterArbeidsgiver(true);
      await slettArbeidsgiver(
        rekrutteringstreffId,
        arbeidsgiver.arbeidsgiverTreffId ?? arbeidsgiver.organisasjonsnummer,
      );
      arbeidsgivereHook.mutate();
      oppdaterArbeidsgivereMedBehov();
      hendelseHook.mutate();
    } finally {
      setSletterArbeidsgiver(false);
    }
  };

  return (
    <SWRLaster hooks={[arbeidsgivereHook]}>
      {(arbeidsgivere) => (
        <div className='flex flex-col gap-4 p-4'>
          <div className='text-right'>
            <LeggTilArbeidsgiverKnapp størrelse={'small'} />
          </div>
          {arbeidsgivere.length === 0 ? (
            <BodyShort>Ingen arbeidsgivere lagt til</BodyShort>
          ) : (
            <div className='space-y-2'>
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
                        aria-haspopup='dialog'
                        aria-controls={
                          aktivRedigeringArbeidsgiverTreffId === id
                            ? redigerBehovDialogId
                            : undefined
                        }
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
                  <div key={index}>
                    <ArbeidsgiverListeItem
                      arbeidsgiver={arbeidsgiver}
                      actionSlot={action}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {dialog}
        </div>
      )}
    </SWRLaster>
  );
};

export default Arbeidsgivere;
