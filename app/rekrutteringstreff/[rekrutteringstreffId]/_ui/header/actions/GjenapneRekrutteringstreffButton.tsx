'use client';

import { gjenåpnRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/statushendelser/mutations';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { RekbisError } from '@/util/rekbisError';
import { Alert, BodyLong, Button, Modal } from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

const hentBackendFeilmelding = (error: unknown): string | null => {
  if (!(error instanceof Error)) return null;
  const details = (error as { details?: string }).details;
  if (!details) return null;
  try {
    const parsed = JSON.parse(details);
    if (typeof parsed?.detail === 'string') return parsed.detail;
    if (typeof parsed?.message === 'string') return parsed.message;
  } catch {
    // ikke gyldig JSON
  }
  return null;
};

const GjenapneRekrutteringstreffButton: FC = () => {
  const { rekrutteringstreffId, oppdaterData } = useRekrutteringstreffData();
  const [laster, setLaster] = useState(false);
  const [feilmelding, setFeilmelding] = useState<string | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const åpneModal = () => {
    setFeilmelding(null);
    modalRef.current?.showModal();
  };
  const lukkModal = () => {
    if (!laster) {
      modalRef.current?.close();
    }
  };

  const gjenåpne = async () => {
    if (laster) return;
    setLaster(true);
    setFeilmelding(null);
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
      setFeilmelding(
        hentBackendFeilmelding(error) ??
          'Kunne ikke gjenåpne rekrutteringstreffet. Prøv igjen senere.',
      );
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
          {feilmelding && (
            <Alert variant='error' size='small' className='mt-4'>
              {feilmelding}
            </Alert>
          )}
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
