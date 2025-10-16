import { useKandidatinformasjon } from '@/app/api/kandidat-sok/useKandidatinformasjon';
import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useKandidatlisteInfo } from '@/app/api/kandidat/useKandidatlisteInfo';
import LeggKandidatTilKandidatliste from '@/app/kandidat/vis-kandidat/_ui/LeggKandidatTilKandidatliste';
import SWRLaster from '@/components/SWRLaster';
import KandidatVisningForModal from '@/components/modal/kandidat/KandidatVisningForModal';
import StillingVisningForModal from '@/components/modal/stilling/StillingVisningForModal';
import { Heading, Modal, ToggleGroup } from '@navikt/ds-react';
import { ModalBody } from '@navikt/ds-react/Modal';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

export interface VisStillingModalProps {
  kandidatId?: string;
}

export default function VisStillingModal({
  kandidatId,
}: VisStillingModalProps) {
  const kandidatHook = useKandidatinformasjon(kandidatId);
  const [visStillingsId, setVisStillingsId] = useQueryState('visStillingsId', {
    defaultValue: '',
    clearOnDefault: true,
  });
  const kandidatlisteInfoHook = useKandidatlisteInfo(visStillingsId);
  const [fane, setFane] = useState<string>('stilling');
  return (
    <Modal
      closeOnBackdropClick
      width={'1280px'}
      open
      onClose={() => setVisStillingsId('')}
      aria-labelledby='modal-heading'
    >
      <SWRLaster hooks={[kandidatHook, kandidatlisteInfoHook]}>
        {(kandidat, kandidatlisteInfo) => {
          return (
            <>
              <Modal.Header>
                <Heading level='1' size='large' id='modal-heading'>
                  {'Stillingsoppdrag for jobbsøker'}
                </Heading>
                <div className='pt-4 flex justify-between items-center'>
                  {kandidatId && (
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
                  )}
                  {kandidatId &&
                    kandidatlisteInfo.kandidatlisteStatus ===
                      Kandidatlistestatus.Åpen && (
                      <LeggKandidatTilKandidatliste
                        kandidatId={kandidatId}
                        stillingId={visStillingsId}
                      />
                    )}
                </div>
              </Modal.Header>
              <ModalBody>
                {fane === 'stilling' && (
                  <StillingVisningForModal stillingsId={visStillingsId} />
                )}
                {kandidatId && fane === 'jobbsøker' && (
                  <KandidatVisningForModal kandidatId={kandidatId} />
                )}
              </ModalBody>
            </>
          );
        }}
      </SWRLaster>
    </Modal>
  );
}
