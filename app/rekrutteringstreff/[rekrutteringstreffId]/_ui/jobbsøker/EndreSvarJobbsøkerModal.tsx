'use client';

import { svarForJobbsøker } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/svarForJobbsøker';
import { RekbisError } from '@/util/rekbisError';
import { BodyShort, Button, Modal, Radio, RadioGroup } from '@navikt/ds-react';
import { useRef, useState } from 'react';

export interface EndreSvarJobbsøkerModalProps {
  rekrutteringstreffId: string;
  personTreffId: string;
  fornavn: string;
  etternavn: string;
  lukkModal: () => void;
  gjeldendeSvar: boolean | null;
}

const EndreSvarJobbsøkerModal = ({
  rekrutteringstreffId,
  personTreffId,
  lukkModal,
  fornavn,
  etternavn,
  gjeldendeSvar,
}: EndreSvarJobbsøkerModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [svar, setSvar] = useState<boolean | null>(gjeldendeSvar);
  const ref = useRef<HTMLDialogElement>(null);

  const endreSvarForJobbsøker = async (
    rekrutteringstreffId: string,
    personTreffId: string,
    svar: boolean | null,
  ) => {
    setLoading(true);
    setError(null);
    try {
      await svarForJobbsøker(rekrutteringstreffId, personTreffId, svar);
      lukkModal();
    } catch (error) {
      setError('Det skjedde en feil ved endring av svar. Prøv igjen senere.');
      new RekbisError({ message: 'Feil ved endring av utfall', error });
    }
    setLoading(false);
  };

  return (
    <Modal
      header={{
        heading: `Endre svar på vegne av ${fornavn} ${etternavn}`,
        closeButton: false,
      }}
      open={true}
      onClose={() => lukkModal()}
      size={'medium'}
      width={'medium'}
      ref={ref}
    >
      <Modal.Body>
        <RadioGroup
          legend='Kommer jobbsøker til rekrutteringstreffet?'
          value={svar}
          onChange={(value) => setSvar(value)}
          className='my-2'
        >
          <Radio value={true} size='small'>
            <span className='mr-2' aria-hidden='true'>
              👍
            </span>
            <span className='text-base'>Ja, hen kommer</span>
          </Radio>
          <Radio value={false} size='small'>
            <span className='mr-2' aria-hidden='true'>
              👎
            </span>
            <span className='text-base'>Nei, hen kommer ikke</span>
          </Radio>
          <Radio value={null} size='small'>
            <span className='mr-2' aria-hidden='true'>
              ❓
            </span>
            <span className='text-base'>Ikke svart</span>
          </Radio>
        </RadioGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={() =>
            endreSvarForJobbsøker(rekrutteringstreffId, personTreffId, svar)
          }
          loading={loading}
        >
          Endre
        </Button>
        <Button
          variant='secondary'
          onClick={() => lukkModal()}
          loading={loading}
        >
          Avbryt
        </Button>
        {error && <BodyShort className='text-red-500'>{error}</BodyShort>}
      </Modal.Footer>
    </Modal>
  );
};

export default EndreSvarJobbsøkerModal;
