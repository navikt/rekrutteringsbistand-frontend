import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Modal } from '@navikt/ds-react';

interface FeilDialogProps {
  isOpen: boolean;
  onRetry: () => void;
  errorMessage?: string;
  heading?: string;
}

const FeilDialog = ({
  isOpen,
  onRetry,
  errorMessage,
  heading,
}: FeilDialogProps) => {
  return (
    <Modal
      width={500}
      open={isOpen}
      onClose={() => {}}
      header={{
        icon: <ExclamationmarkTriangleIcon aria-hidden />,
        heading: heading ?? 'Det er oppstått en feil',
      }}
    >
      <Modal.Body>
        <BodyLong>
          {errorMessage ??
            'Beklager, det oppstod en feil. Vennligst prøv igjen eller rapporter feilen til oss.'}
        </BodyLong>
      </Modal.Body>
      <Modal.Footer>
        <Button type='button' onClick={onRetry}>
          Prøv igjen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeilDialog;
