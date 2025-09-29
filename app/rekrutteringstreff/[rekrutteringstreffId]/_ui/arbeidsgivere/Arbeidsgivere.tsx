'use client';

import ArbeidsgiverListeItem from './_ui/ArbeidsgiverListeItem';
import { fjernArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/slett-arbeidsgiver/fjernArbeidsgiver';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import {
  ArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import LeggTilArbeidsgiverModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/LeggTilArbeidsgiverModal';
import SlettArbeidsgiverModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/arbeidsgivere/_ui/SlettArbeidsgiverModal';
import SWRLaster from '@/components/SWRLaster';
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Tooltip } from '@navikt/ds-react';
import * as React from 'react';
import { useRef, useState } from 'react';

const RekrutteringstreffArbeidsgivere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);
  const { mutate: mutateArbeidsgivere } = arbeidsgivereHook;
  const { mutate: mutateHendelser } = hendelseHook;

  const leggTilModalRef = useRef<HTMLDialogElement>(null);

  const getLagtTilData = (arbeidsgiver: ArbeidsgiverDTO) => {
    const leggTilHendelse = arbeidsgiver.hendelser.find(
      ({ hendelsestype }) => hendelsestype === 'OPPRETT',
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

  const [slette, setSlette] = useState<ArbeidsgiverDTO | null>(null);
  const [sletterArbeidsgiver, setSletterArbeidsgiver] = useState(false);
  const slettModalRef = useRef<HTMLDialogElement>(null);

  const handleSlettClick = (arbeidsgiver: ArbeidsgiverDTO) => {
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
                const deleteButton = (
                  <Button
                    size='small'
                    variant='tertiary'
                    disabled={kunEnArbeidsgiver || sletterArbeidsgiver}
                    onClick={() => handleSlettClick(a)}
                    icon={<TrashIcon aria-hidden />}
                  >
                    Slett
                  </Button>
                );
                const action = kunEnArbeidsgiver ? (
                  <Tooltip
                    content='Treffet må alltid ha en arbeidsgiver som deltar. Legg til en ny arbeidsgiver først.'
                    className='max-w-[200px] text-left'
                  >
                    <span>
                      <Button
                        size='small'
                        variant='tertiary'
                        disabled={kunEnArbeidsgiver || sletterArbeidsgiver}
                        onClick={() => handleSlettClick(a)}
                        icon={<TrashIcon aria-hidden />}
                      >
                        Slett
                      </Button>
                    </span>
                  </Tooltip>
                ) : (
                  deleteButton
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
        </div>
      )}
    </SWRLaster>
  );
};

export default RekrutteringstreffArbeidsgivere;
