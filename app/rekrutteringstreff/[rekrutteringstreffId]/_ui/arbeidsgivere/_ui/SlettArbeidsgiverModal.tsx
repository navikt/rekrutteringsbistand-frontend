'use client';

import { BodyShort, Button, Modal } from '@navikt/ds-react';
import { ForwardedRef, forwardRef } from 'react';

export interface SlettArbeidsgiverModalProps {
  navn?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const SlettArbeidsgiverModal = forwardRef<
  HTMLDialogElement,
  SlettArbeidsgiverModalProps
>(
  (
    { navn, loading, onConfirm, onCancel },
    ref: ForwardedRef<HTMLDialogElement>,
  ) => {
    return (
      <Modal ref={ref} header={{ heading: 'Slett arbeidsgiver' }}>
        <Modal.Body>
          {navn && (
            <BodyShort>
              Er du sikker på at du vil slette {navn} fra dette
              rekrutteringstreffet?
            </BodyShort>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='danger'
            onClick={onConfirm}
            loading={!!loading}
            disabled={!!loading}
          >
            Slett
          </Button>
          <Button variant='secondary' onClick={onCancel} disabled={!!loading}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    );
  },
);

SlettArbeidsgiverModal.displayName = 'SlettArbeidsgiverModal';

export default SlettArbeidsgiverModal;
