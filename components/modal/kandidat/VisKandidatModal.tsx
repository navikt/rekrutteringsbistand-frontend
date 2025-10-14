import { KandidatContextProvider } from '@/app/kandidat/vis-kandidat/KandidatContext';
import KandidatSideLayout from '@/app/kandidat/vis-kandidat/KandidatsideLayout';
import KandidatlisteBoks from '@/app/kandidat/vis-kandidat/_ui/KandidatlisteBoks';
import KandidatOversikt from '@/app/kandidat/vis-kandidat/oversikt-fane/KandidatOversikt';
import { Button, Modal } from '@navikt/ds-react';
import { ModalBody } from '@navikt/ds-react/Modal';

export interface VisKandidatModalProps {
  kandidatNr: string;
  onClose: () => void;
  tittel: string;
  stillingsId?: string;
}

export default function VisKandidatModal({
  kandidatNr,
  onClose,
  tittel,
  stillingsId,
}: VisKandidatModalProps) {
  return (
    <KandidatContextProvider kandidatId={kandidatNr}>
      <Modal
        width={'1280px'}
        open
        onClose={onClose}
        header={{ heading: tittel }}
      >
        <ModalBody>
          <KandidatSideLayout>
            {stillingsId && <KandidatlisteBoks kandidatnr={kandidatNr} />}
          </KandidatSideLayout>
          <KandidatOversikt />
        </ModalBody>
        <Modal.Footer>
          <Button type='button' variant='tertiary' onClick={onClose}>
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </KandidatContextProvider>
  );
}
