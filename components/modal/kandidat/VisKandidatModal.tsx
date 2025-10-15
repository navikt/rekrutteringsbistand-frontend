import { KandidatContextProvider } from '@/app/kandidat/vis-kandidat/KandidatContext';
import KandidatSideLayout from '@/app/kandidat/vis-kandidat/KandidatsideLayout';
import KandidatlisteBoks from '@/app/kandidat/vis-kandidat/_ui/KandidatlisteBoks';
import KandidatAktivitet from '@/app/kandidat/vis-kandidat/aktivitet-fane/KandidatAktivitet';
import KandidatOversikt from '@/app/kandidat/vis-kandidat/oversikt-fane/KandidatOversikt';
import { Button, Modal, Tabs } from '@navikt/ds-react';
import { ModalBody } from '@navikt/ds-react/Modal';
import { useState } from 'react';

enum Fane {
  OVERSIKT = 'oversikt',
  AKTIVITET = 'aktivitet',
}

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
  const [fane, setFane] = useState<string>(Fane.OVERSIKT);

  return (
    <Tabs value={fane} onChange={(val) => setFane(val)} className=' w-full'>
      <KandidatContextProvider kandidatId={kandidatNr}>
        <Modal
          width={'1280px'}
          open
          onClose={onClose}
          header={{ heading: tittel }}
        >
          <ModalBody>
            <div className='mb-4'>
              <Tabs.Tab value={Fane.OVERSIKT} label='Oversikt' />
              <Tabs.Tab value={Fane.AKTIVITET} label='Aktiviteter' />
            </div>
            <Tabs.Panel value={Fane.OVERSIKT}>
              <KandidatSideLayout>
                {stillingsId && <KandidatlisteBoks kandidatnr={kandidatNr} />}
              </KandidatSideLayout>
              <KandidatOversikt />
            </Tabs.Panel>
            <Tabs.Panel value={Fane.AKTIVITET}>
              <div className='w-full'>
                <KandidatAktivitet />
              </div>
            </Tabs.Panel>
          </ModalBody>
          <Modal.Footer>
            <Button type='button' variant='tertiary' onClick={onClose}>
              Lukk
            </Button>
          </Modal.Footer>
        </Modal>
      </KandidatContextProvider>
    </Tabs>
  );
}
