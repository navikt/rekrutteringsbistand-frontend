import { useKandidatinformasjon } from '@/app/api/kandidat-sok/useKandidatinformasjon';
import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useKandidatlisteInfo } from '@/app/api/kandidat/useKandidatlisteInfo';
import LeggKandidatTilKandidatliste from '@/app/kandidat/vis-kandidat/_ui/LeggKandidatTilKandidatliste';
import SWRLaster from '@/components/SWRLaster';
import KandidatVisningForModal from '@/components/modal/kandidat/KandidatVisningForModal';
import StillingVisningForModal from '@/components/modal/stilling/StillingVisningForModal';
import { Heading, Modal, ToggleGroup } from '@navikt/ds-react';
import { ModalBody } from '@navikt/ds-react/Modal';
import { useState } from 'react';

export interface VisStillingModalProps {
  onClose: () => void;
  stillingsId: string;
  kandidatId: string;
}

export default function VisStillingModal({
  onClose,
  stillingsId,
  kandidatId,
}: VisStillingModalProps) {
  const kandidatHook = useKandidatinformasjon(kandidatId);
  const kandidatlisteInfoHook = useKandidatlisteInfo(stillingsId);
  const [fane, setFane] = useState<string>('stilling');
  return (
    <SWRLaster hooks={[kandidatHook, kandidatlisteInfoHook]}>
      {(kandidat, kandidatlisteInfo) => {
        return (
          <Modal
            closeOnBackdropClick
            width={'1280px'}
            open
            onClose={onClose}
            aria-labelledby='modal-heading'
          >
            <Modal.Header>
              <Heading level='1' size='large' id='modal-heading'>
                {'Stillingsoppdrag for jobbsøker'}
              </Heading>
              <div className='flex justify-between pt-4 items-center'>
                <ToggleGroup
                  defaultValue={fane}
                  onChange={setFane}
                  size='small'
                >
                  <ToggleGroup.Item
                    value='stilling'
                    label='Om stillingsoppdrag'
                  />
                  <ToggleGroup.Item
                    value='jobbsøker'
                    label={`Om ${kandidat.fornavn} ${kandidat.etternavn}`}
                  />
                </ToggleGroup>
                {kandidatlisteInfo.kandidatlisteStatus ===
                  Kandidatlistestatus.Åpen && (
                  <LeggKandidatTilKandidatliste
                    kandidatId={kandidatId}
                    stillingId={stillingsId}
                  />
                )}
              </div>
            </Modal.Header>
            <ModalBody>
              {fane === 'stilling' && (
                <StillingVisningForModal stillingsId={stillingsId} />
              )}
              {fane === 'jobbsøker' && (
                <KandidatVisningForModal kandidatId={kandidatId} />
              )}
            </ModalBody>
          </Modal>
        );
      }}
    </SWRLaster>
  );
}
