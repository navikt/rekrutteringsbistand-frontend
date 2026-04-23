'use client';

import BehovForm, { tomtBehov, validerBehov } from './BehovForm';
import {
  ArbeidsgiverBehovDTO,
  oppdaterBehov,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { RekbisError } from '@/util/rekbisError';
import { Button, HStack, Modal } from '@navikt/ds-react';
import { FC, RefObject, useEffect, useState } from 'react';

interface Props {
  modalRef: RefObject<HTMLDialogElement | null>;
  rekrutteringstreffId: string;
  arbeidsgiverTreffId: string;
  arbeidsgiverNavn: string;
  initielleVerdier: ArbeidsgiverBehovDTO | null;
  onLagret: () => void;
}

const RedigerBehovModal: FC<Props> = ({
  modalRef,
  rekrutteringstreffId,
  arbeidsgiverTreffId,
  arbeidsgiverNavn,
  initielleVerdier,
  onLagret,
}) => {
  const [behov, setBehov] = useState<ArbeidsgiverBehovDTO>(
    initielleVerdier ?? tomtBehov(),
  );
  const [feil, setFeil] = useState<
    Partial<Record<keyof ArbeidsgiverBehovDTO, string>>
  >({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setBehov(initielleVerdier ?? tomtBehov());
    setFeil({});
  }, [initielleVerdier, arbeidsgiverTreffId]);

  const lukk = () => modalRef.current?.close();

  const lagre = async () => {
    const v = validerBehov(behov);
    setFeil(v);
    if (Object.keys(v).length > 0) return;
    setSaving(true);
    try {
      await oppdaterBehov(rekrutteringstreffId, arbeidsgiverTreffId, behov);
      onLagret();
      lukk();
    } catch (error) {
      throw new RekbisError({
        message: 'Klarte ikke å oppdatere behov.',
        error,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      ref={modalRef}
      className='overflow-visible'
      onClose={lukk}
      header={{ heading: `Rediger behov – ${arbeidsgiverNavn}` }}
    >
      <Modal.Body className='min-w-[500px] overflow-y-auto'>
        <BehovForm verdi={behov} onChange={setBehov} feilmeldinger={feil} />
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
