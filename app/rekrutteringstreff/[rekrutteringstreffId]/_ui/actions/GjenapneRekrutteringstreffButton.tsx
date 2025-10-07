'use client';

import { gjenåpnRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/statushendelser/mutations';
import { RekbisError } from '@/util/rekbisError';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

type Props = {
  rekrutteringstreffId: string;
  oppdaterData: () => void;
};

const GjenapneRekrutteringstreffButton: FC<Props> = ({
  rekrutteringstreffId,
  oppdaterData,
}) => {
  const [laster, setLaster] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const åpneModal = () => modalRef.current?.showModal();
  const lukkModal = () => {
    if (!laster) {
      modalRef.current?.close();
    }
  };

  const gjenåpne = async () => {
    if (laster) return;
    setLaster(true);
    let skalLukke = false;

    try {
      await gjenåpnRekrutteringstreff(rekrutteringstreffId);
      oppdaterData();
      skalLukke = true;
    } catch (error) {
      new RekbisError({
        message: 'Gjenåpning av rekrutteringstreff feilet',
        error,
      });
    } finally {
      setLaster(false);
      if (skalLukke) {
        modalRef.current?.close();
      }
    }
  };

  return (
    <>
      <Button
        type='button'
        size='small'
        variant='primary'
        loading={laster}
        onClick={åpneModal}
      >
        Gjenåpne
      </Button>

      <Modal
        ref={modalRef}
        onClose={() => {
          if (laster) {
            modalRef.current?.showModal();
          }
        }}
        header={{ heading: 'Gjenåpne rekrutteringstreffet?' }}
      >
        <Modal.Body>
          <BodyLong>
            Treffet blir aktivt igjen, og du kan gjøre endringer eller sende nye
            invitasjoner. Er du sikker på at du vil fortsette?
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            size='small'
            loading={laster}
            onClick={() => void gjenåpne()}
          >
            Gjenåpne
          </Button>
          <Button
            type='button'
            size='small'
            variant='secondary'
            disabled={laster}
            onClick={lukkModal}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GjenapneRekrutteringstreffButton;
