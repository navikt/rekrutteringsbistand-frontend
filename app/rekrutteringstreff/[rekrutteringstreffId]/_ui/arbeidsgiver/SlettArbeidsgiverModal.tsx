'use client';

import type { ArbeidsgivereDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Modal } from '@navikt/ds-react';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import type { SWRResponse } from 'swr';

export interface SlettArbeidsgiverModalProps {
  navn?: string;
  loading?: boolean;
  disabled?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  onAfterClose?: () => void;
  onOpen?: () => void;
  arbeidsgivereHook: Pick<SWRResponse<ArbeidsgivereDTO>, 'mutate'>;
  variant?: 'trash' | 'cross';
  triggerLabel?: string;
  triggerAriaLabel?: string;
  renderTrigger?: (args: {
    button: ReactNode;
    open: () => void;
    disabled: boolean;
  }) => ReactNode;
}

const SlettArbeidsgiverModal = ({
  navn,
  loading,
  disabled,
  onConfirm,
  onCancel,
  onAfterClose,
  onOpen,
  arbeidsgivereHook,
  variant = 'trash',
  triggerLabel,
  triggerAriaLabel,
  renderTrigger,
}: SlettArbeidsgiverModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const closeModal = () => {
    modalRef.current?.close();
    onAfterClose?.();
  };

  const handleOpen = () => {
    if (disabled || loading) {
      return;
    }
    onOpen?.();
    modalRef.current?.showModal();
  };

  const handleConfirm = async () => {
    await Promise.resolve(onConfirm());
    arbeidsgivereHook.mutate();
    closeModal();
  };

  const handleCancel = () => {
    if (loading) {
      return;
    }
    onCancel?.();
    closeModal();
  };

  const icon =
    variant === 'cross' ? <XMarkIcon aria-hidden /> : <TrashIcon aria-hidden />;

  const buttonDisabled = !!loading || !!disabled;

  const defaultTrigger =
    variant === 'cross' ? (
      <Button
        size='xsmall'
        variant='tertiary'
        icon={icon}
        onClick={handleOpen}
        aria-label={
          triggerAriaLabel || triggerLabel || 'Fjern arbeidsgiver fra treffet'
        }
        disabled={buttonDisabled}
      />
    ) : (
      <Button
        size='small'
        variant='tertiary'
        icon={icon}
        onClick={handleOpen}
        disabled={buttonDisabled}
      >
        {triggerLabel || 'Slett'}
      </Button>
    );

  return (
    <>
      {renderTrigger
        ? renderTrigger({
            button: defaultTrigger,
            open: handleOpen,
            disabled: buttonDisabled,
          })
        : defaultTrigger}
      <Modal ref={modalRef} header={{ heading: 'Slett arbeidsgiver' }}>
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
            onClick={handleConfirm}
            loading={!!loading}
            disabled={!!loading}
          >
            Slett
          </Button>
          <Button
            variant='secondary'
            onClick={handleCancel}
            disabled={!!loading}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SlettArbeidsgiverModal;
