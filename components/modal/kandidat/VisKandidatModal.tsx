import { useKandidatinformasjon } from '@/app/api/kandidat-sok/useKandidatinformasjon';
// import KandidatlisteBoks from '@/app/kandidat/vis-kandidat/_ui/KandidatlisteBoks';
import SWRLaster from '@/components/SWRLaster';
import KandidatVisningForModal from '@/components/modal/kandidat/KandidatVisningForModal';
import StillingVisningForModal from '@/components/modal/stilling/StillingVisningForModal';
import { Heading, Modal, ToggleGroup } from '@navikt/ds-react';
import { ModalBody } from '@navikt/ds-react/Modal';
import { useState } from 'react';

export interface VisKandidatModalProps {
  kandidatId: string;
  onClose: () => void;
  tittel?: string;
  stillingsId: string;
  forKandidatliste?: string;
}

export default function VisKandidatModal({
  kandidatId,
  onClose,
  tittel,
  stillingsId,
  forKandidatliste,
}: VisKandidatModalProps) {
  const [fane, setFane] = useState<string>('jobbsøker');

  const kandidatHook = useKandidatinformasjon(kandidatId);

  return (
    <SWRLaster hooks={[kandidatHook]}>
      {(kandidat) => {
        return (
          <Modal
            width={'1280px'}
            open
            onClose={onClose}
            aria-labelledby='modal-heading'
            closeOnBackdropClick
          >
            <Modal.Header>
              <Heading level='1' size='large' id='modal-heading'>
                {tittel}
              </Heading>
              <div className='pt-4'>
                <ToggleGroup
                  defaultValue={fane}
                  onChange={setFane}
                  size='small'
                >
                  <ToggleGroup.Item
                    value='jobbsøker'
                    label={`Om ${kandidat.fornavn} ${kandidat.etternavn}`}
                  />
                  <ToggleGroup.Item
                    value='stilling'
                    label='Om stillingsoppdrag'
                  />
                </ToggleGroup>
              </div>
            </Modal.Header>

            <ModalBody>
              {fane === 'stilling' && (
                <StillingVisningForModal stillingsId={stillingsId} />
              )}
              {fane === 'jobbsøker' && (
                <KandidatVisningForModal
                  forKandidatliste={forKandidatliste}
                  kandidatId={kandidatId}
                />
              )}
            </ModalBody>
          </Modal>
        );
      }}
    </SWRLaster>
  );
}
