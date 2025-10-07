'use client';

import ArbeidsgiverListeItem from './ArbeidsgiverListeItem';
import LeggTilArbeidsgiverModal from './LeggTilArbeidsgiverModal';
import SlettArbeidsgiverModal from './SlettArbeidsgiverModal';
import { slettArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/mutations';
import {
  ArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/hendelser/useArbeidsgiverHendelser';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { PlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Tooltip } from '@navikt/ds-react';
import * as React from 'react';
import { useRef, useState } from 'react';

const Arbeidsgivere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);

  const leggTilModalRef = useRef<HTMLDialogElement>(null);

  const getLagtTilData = (arbeidsgiver: ArbeidsgiverDTO) => {
    const leggTilHendelse = arbeidsgiver.hendelser.find(
      ({ hendelsestype }: { hendelsestype: string }) =>
        hendelsestype === 'OPPRETT',
    );
    if (leggTilHendelse) {
      return {
        status: 'Lagt til',
      };
    }
    return {
      status: undefined,
    };
  };

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
      arbeidsgivereHook.mutate();
      hendelseHook.mutate();
    } finally {
      setSletterArbeidsgiver(false);
    }
  };

  return (
    <SWRLaster hooks={[arbeidsgivereHook]}>
      {(arbeidsgivere) => (
        <div className='p-4 flex flex-col gap-4'>
          {
            <div>
              <Button
                onClick={() => leggTilModalRef.current?.showModal()}
                variant='secondary'
                icon={<PlusIcon />}
              >
                Legg til arbeidsgiver
              </Button>
              <LeggTilArbeidsgiverModal modalRef={leggTilModalRef} />
            </div>
          }
          {arbeidsgivere.length === 0 ? (
            <BodyShort>Ingen arbeidsgivere lagt til</BodyShort>
          ) : (
            <ul>
              {arbeidsgivere.map((a, index) => {
                const { status } = getLagtTilData(a);
                const kunEnArbeidsgiver = arbeidsgivere.length === 1;
                const action = (
                  <SlettArbeidsgiverModal
                    navn={a.navn}
                    loading={sletterArbeidsgiver}
                    disabled={kunEnArbeidsgiver || sletterArbeidsgiver}
                    onConfirm={() => bekreftSlett(a)}
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
                );
                return (
                  <li key={index}>
                    <ArbeidsgiverListeItem
                      arbeidsgiver={a}
                      status={status}
                      actionSlot={action}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </SWRLaster>
  );
};

export default Arbeidsgivere;
