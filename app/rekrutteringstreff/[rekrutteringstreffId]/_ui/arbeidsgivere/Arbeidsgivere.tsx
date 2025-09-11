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
import SWRLaster from '@/components/SWRLaster';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Modal } from '@navikt/ds-react';
import { PlusIcon } from 'lucide-react';
import * as React from 'react';
import { useRef, useState } from 'react';

const RekrutteringstreffArbeidsgivere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);

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
  const slettModalRef = useRef<HTMLDialogElement>(null);

  const åpneSlettModal = (arbeidsgiver: ArbeidsgiverDTO) => {
    setSlette(arbeidsgiver);
    slettModalRef.current?.showModal();
  };

  const bekreftSlett = async () => {
    if (!slette) return;
    try {
      await fjernArbeidsgiver(
        rekrutteringstreffId,
        (slette as any).arbeidsgiverTreffId ?? slette.organisasjonsnummer,
      );
      await arbeidsgivereHook.mutate();
      await hendelseHook.mutate();
    } finally {
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
                return (
                  <li key={index}>
                    <ArbeidsgiverListeItem
                      arbeidsgiver={a}
                      status={status}
                      actionSlot={
                        <Button
                          size='small'
                          variant='tertiary'
                          onClick={() => åpneSlettModal(a)}
                          icon={<TrashIcon aria-hidden />}
                        >
                          Slett
                        </Button>
                      }
                    />
                  </li>
                );
              })}
            </ul>
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
        </div>
      )}
    </SWRLaster>
  );
};

export default RekrutteringstreffArbeidsgivere;
