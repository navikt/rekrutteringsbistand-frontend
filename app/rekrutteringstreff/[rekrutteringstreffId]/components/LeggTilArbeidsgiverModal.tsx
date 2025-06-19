'use client';

import { RekbisError } from '../../../../util/rekbisError';
import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { leggtilNyArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/ny-arbeidsgiver/leggTilNyArbeidsgiver';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import VelgArbeidsgiver from '@/app/stilling/ny-stilling/components/VelgArbeidsgiver';
import { Button, Modal } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface Props {
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

const LeggTilArbeidsgiverModal: React.FC<Props> = ({ modalRef }) => {
  const [arbeidsgiver, setArbeidsgiver] =
    React.useState<ArbeidsgiverDTO | null>(null);

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const router = useRouter();
  const arbeidsgiverHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);

  const leggTil = async () => {
    if (!arbeidsgiver) return;
    try {
      await leggtilNyArbeidsgiver(
        {
          organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
          navn: arbeidsgiver.navn,
        },
        rekrutteringstreffId,
      );
      arbeidsgiverHook.mutate();
      hendelseHook.mutate();
      router.push(
        `/rekrutteringstreff/${rekrutteringstreffId}?visFane=${RekrutteringstreffTabs.ARBEIDSGIVERE}`,
      );
    } catch (error) {
      throw new RekbisError({
        message: 'Feiler når prøver å legge til ny arbeidsgiver:',
        error,
      });
    } finally {
      setArbeidsgiver(null);
      modalRef.current?.close();
    }
  };

  const lukk = () => {
    setArbeidsgiver(null);
    modalRef.current?.close();
  };

  return (
    <Modal
      ref={modalRef}
      className='overflow-visible'
      onClose={lukk}
      header={{ heading: 'Legg til arbeidsgiver' }}
    >
      <Modal.Body className='overflow-visible'>
        <VelgArbeidsgiver
          key={modalRef.current?.open ? 'open' : 'closed'}
          arbeidsgiverCallback={setArbeidsgiver}
          valgtArbeidsgiver={arbeidsgiver}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={leggTil} disabled={!arbeidsgiver}>
          Legg til
        </Button>
        <Button variant='secondary' onClick={lukk}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeggTilArbeidsgiverModal;
