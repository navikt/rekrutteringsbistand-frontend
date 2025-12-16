'use client';

import type { ArbeidsgivereDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Modal } from '@navikt/ds-react';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const [modalAction, setModalAction] = useState<'open' | 'close' | null>(null);

  const closeModal = useCallback(() => {
    setModalAction('close');
  }, []);

  const handleOpen = useCallback(() => {
    if (disabled || loading) {
      return;
    }
    onOpen?.();
    setModalAction('open');
  }, [disabled, loading, onOpen]);

  const handleConfirm = useCallback(async () => {
    await Promise.resolve(onConfirm());
    arbeidsgivereHook.mutate();
    closeModal();
  }, [onConfirm, arbeidsgivereHook, closeModal]);

  const handleCancel = useCallback(() => {
    if (loading) {
      return;
    }
    onCancel?.();
    closeModal();
  }, [loading, onCancel, closeModal]);

  const icon = useMemo(
    () =>
      variant === 'cross' ? (
        <XMarkIcon aria-hidden />
      ) : (
        <TrashIcon aria-hidden />
      ),
    [variant],
  );

  const buttonDisabled = !!loading || !!disabled;

  useEffect(() => {
    if (!modalAction) {
      return;
    }

    const modal = modalRef.current;
    const timer = setTimeout(() => {
      if (!modal) {
        setModalAction(null);
        return;
      }

      if (modalAction === 'open') {
        modal.showModal();
      } else {
        modal.close();
        onAfterClose?.();
      }

      setModalAction(null);
    }, 0);

    return () => clearTimeout(timer);
  }, [modalAction, onAfterClose]);

  const triggerElement = useMemo(() => {
    const trigger =
      variant === 'cross' ? (
        <Button
          type='button'
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
          type='button'
          size='small'
          variant='tertiary'
          icon={icon}
          onClick={handleOpen}
          disabled={buttonDisabled}
        >
          {triggerLabel || 'Slett'}
        </Button>
      );

    if (!renderTrigger) {
      return trigger;
    }

    return renderTrigger({
      button: trigger,
      open: handleOpen,
      disabled: buttonDisabled,
    });
  }, [
    renderTrigger,
    variant,
    icon,
    handleOpen,
    buttonDisabled,
    triggerAriaLabel,
    triggerLabel,
  ]);

  return (
    <>
      {triggerElement}
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
            type='button'
            variant='danger'
            onClick={handleConfirm}
            loading={!!loading}
            disabled={!!loading}
          >
            Slett
          </Button>
          <Button
            type='button'
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
