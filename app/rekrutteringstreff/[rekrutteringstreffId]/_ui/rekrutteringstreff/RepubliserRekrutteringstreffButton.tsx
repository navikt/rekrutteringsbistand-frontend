'use client';

import { BodyLong, BodyShort, Button, Label, Modal } from '@navikt/ds-react';
import { FC, useMemo, useRef } from 'react';

export type Endring = {
  etikett: string;
  gammelVerdi: string;
  nyVerdi: string;
};

interface Props {
  disabled?: boolean;
  endringer: Endring[];
  onBekreft: () => Promise<void> | void;
}

const RepubliserRekrutteringstreffButton: FC<Props> = ({
  disabled,
  endringer,
  onBekreft,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const isDisabled = useMemo(() => {
    const manglerEndring = (endringer?.length ?? 0) === 0;
    return Boolean(disabled) || manglerEndring;
  }, [disabled, endringer]);

  const åpne = () => {
    if (!isDisabled) modalRef.current?.showModal();
  };
  const lukk = () => modalRef.current?.close();

  return (
    <>
      <Button
        type='button'
        variant='primary'
        size='small'
        disabled={isDisabled}
        onClick={åpne}
      >
        Publiser på nytt
      </Button>

      <Modal
        ref={modalRef}
        header={{ heading: 'Følgende endringer vil bli publisert' }}
      >
        <Modal.Body>
          <div className='space-y-3'>
            {endringer.length === 0 ? (
              <BodyLong>Ingen endringer oppdaget.</BodyLong>
            ) : (
              <div className='space-y-3'>
                {endringer.map((c, idx) => (
                  <div key={idx} className='border-b pb-2'>
                    <Label size='small'>{c.etikett}</Label>
                    <div className='flex gap-2'>
                      <BodyShort>Fra:</BodyShort>
                      <BodyShort className='text-gray-400'>
                        {c.gammelVerdi || '—'}
                      </BodyShort>
                    </div>
                    <div className='flex gap-2'>
                      <BodyShort>Til:</BodyShort>
                      <BodyShort className='text-gray-400'>
                        {c.nyVerdi || '—'}
                      </BodyShort>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <BodyShort className='text-gray-600'>
              Inviterte deltakere vil ikke bli informert om endringene på nytt
              av republiseringen
            </BodyShort>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            variant='primary'
            size='small'
            disabled={isDisabled}
            onClick={async () => {
              if (isDisabled) return;
              lukk();
              await onBekreft();
            }}
          >
            Publiser på nytt
          </Button>
          <Button type='button' variant='secondary' size='small' onClick={lukk}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RepubliserRekrutteringstreffButton;
