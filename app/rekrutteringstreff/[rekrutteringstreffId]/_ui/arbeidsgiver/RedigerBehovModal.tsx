'use client';

import BehovForm, { tomtBehov, validerBehov } from './BehovForm';
import {
  ArbeidsgiverBehovDTO,
  oppdaterBehov,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { Alert, Button, HStack, Modal } from '@navikt/ds-react';
import { FC, RefObject, useEffect, useState } from 'react';

interface Props {
  modalRef: RefObject<HTMLDialogElement | null>;
  rekrutteringstreffId: string;
  arbeidsgiverTreffId: string;
  arbeidsgiverNavn: string;
  initielleVerdier: ArbeidsgiverBehovDTO | null;
  onLagret: () => void;
  onLukk: () => void;
}

const RedigerBehovModal: FC<Props> = ({
  modalRef,
  rekrutteringstreffId,
  arbeidsgiverTreffId,
  arbeidsgiverNavn,
  initielleVerdier,
  onLagret,
  onLukk,
}) => {
  const [behov, setBehov] = useState<ArbeidsgiverBehovDTO>(
    initielleVerdier ?? tomtBehov(),
  );
  const [feil, setFeil] = useState<
    Partial<Record<keyof ArbeidsgiverBehovDTO, string>>
  >({});
  const [saving, setSaving] = useState(false);
  const [serverFeil, setServerFeil] = useState<string | null>(null);

  useEffect(() => {
    setBehov(initielleVerdier ?? tomtBehov());
    setFeil({});
    setServerFeil(null);
  }, [initielleVerdier, arbeidsgiverTreffId]);

  const lukk = () => modalRef.current?.close();

  const lagre = async () => {
    const v = validerBehov(behov);
    setFeil(v);
    setServerFeil(null);
    if (Object.keys(v).length > 0) return;
    setSaving(true);
    try {
      await oppdaterBehov(rekrutteringstreffId, arbeidsgiverTreffId, behov);
      onLagret();
      lukk();
    } catch {
      setServerFeil('Klarte ikke å oppdatere behov. Prøv igjen.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      ref={modalRef}
      className='overflow-visible'
      onClose={() => {
        // Nullstill lokal state slik at endringer ikke 'henger igjen' når modalen åpnes på nytt.
        setBehov(initielleVerdier ?? tomtBehov());
        setFeil({});
        setServerFeil(null);
        onLukk();
      }}
      header={{ heading: `Rediger behov – ${arbeidsgiverNavn}` }}
    >
      <Modal.Body className='min-w-[500px] overflow-y-auto'>
        <BehovForm verdi={behov} onChange={setBehov} feilmeldinger={feil} />
        {serverFeil && (
          <Alert variant='error' className='mt-4'>
            {serverFeil}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <HStack gap='space-8' justify='end'>
          <Button type='button' variant='secondary' onClick={lukk}>
            Avbryt
          </Button>
          <Button type='button' onClick={lagre} loading={saving}>
            Lagre
          </Button>
        </HStack>
      </Modal.Footer>
    </Modal>
  );
};

export default RedigerBehovModal;
