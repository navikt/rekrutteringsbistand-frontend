'use client';

import { slettJobbsøker } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/mutations';
import { BodyShort, Button, Modal } from '@navikt/ds-react';
import { useState } from 'react';

export interface SlettJobbsøkerModalProps {
  rekrutteringstreffId: string;
  jobbsøkerId: string;
  jobbsøkerNavn?: string;
  setVisModal: (val: boolean) => void;
  onMutate?: () => void;
}

const SlettJobbsøkerModal = ({
  rekrutteringstreffId,
  jobbsøkerId,
  jobbsøkerNavn,
  setVisModal,
  onMutate,
}: SlettJobbsøkerModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const slettJobbsøkerKlikk = async () => {
    setLoading(true);
    setError(null);
    try {
      await slettJobbsøker(rekrutteringstreffId, jobbsøkerId);
      onMutate?.();
      setLoading(false);
      setVisModal(false);
    } catch {
      setError('Noe gikk galt ved sletting av jobbsøker');
      setLoading(false);
    }
  };

  return (
    <Modal
      header={{ heading: 'Slett jobbsøker' }}
      open={true}
      onClose={() => setVisModal(false)}
    >
      <Modal.Body>
        {jobbsøkerNavn && (
          <BodyShort>
            Er du sikker på at du vil slette {jobbsøkerNavn} fra dette
            rekrutteringstreffet?
          </BodyShort>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          data-color='danger'
          variant='primary'
          onClick={() => slettJobbsøkerKlikk()}
          loading={loading}
        >
          Slett
        </Button>
        <Button
          variant='secondary'
          onClick={() => setVisModal(false)}
          loading={loading}
        >
          Avbryt
        </Button>
        {error && <BodyShort className='text-red-500'>{error}</BodyShort>}
      </Modal.Footer>
    </Modal>
  );
};

export default SlettJobbsøkerModal;
