import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import OmStillingenHeader from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingenHeader';
import { Button, Modal } from '@navikt/ds-react';
import { ModalBody } from '@navikt/ds-react/Modal';

export interface VisStillingModalProps {
  onClose: () => void;
  tittel: string;
  stillingsId: string;
}

export default function VisStillingModal({
  onClose,
  tittel,
  stillingsId,
}: VisStillingModalProps) {
  return (
    <Modal width={'1280px'} open onClose={onClose} header={{ heading: tittel }}>
      <ModalBody>
        <StillingsContextProvider stillingsId={stillingsId}>
          <OmStillingenHeader />
          <OmStillingen printRef={null} />
        </StillingsContextProvider>
      </ModalBody>
      <Modal.Footer>
        <Button type='button' variant='tertiary' onClick={onClose}>
          Lukk
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
