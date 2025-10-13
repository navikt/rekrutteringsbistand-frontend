import { KandidatContextProvider } from '@/app/kandidat/vis-kandidat/KandidatContext';
import KandidatSideLayout from '@/app/kandidat/vis-kandidat/KandidatsideLayout';
import KandidatlisteBoks from '@/app/kandidat/vis-kandidat/_ui/KandidatlisteBoks';
import KandidatOversikt from '@/app/kandidat/vis-kandidat/oversikt-fane/KandidatOversikt';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { Button, Modal } from '@navikt/ds-react';
import { ModalBody } from '@navikt/ds-react/Modal';
import NavigerTilAktivitetsplanenKnapp from '@/app/kandidat/_ui/ActionLinks/NavigerTilAktivitetsplanenKnapp';

export interface KandidatForhåndsvisningProps {
  kandidatNr: string;
  onClose: () => void;
}

export default function KandidatForhåndsvisning({
  kandidatNr,
  onClose,
}: KandidatForhåndsvisningProps) {
  const stilling = useNullableStillingsContext();

  return (
    <KandidatContextProvider kandidatId={kandidatNr}>
      <Modal
        width={'1280px'}
        open
        onClose={onClose}
        header={{ heading: stilling?.stillingsData?.stilling?.title ?? '' }}
      >
        <ModalBody>
          <KandidatSideLayout>
            {stilling?.stillingsId && (
              <KandidatlisteBoks kandidatnr={kandidatNr} />
            )}
          </KandidatSideLayout>
          <div className='my-5'>
            <NavigerTilAktivitetsplanenKnapp />
          </div>
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
