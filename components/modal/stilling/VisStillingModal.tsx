import { useKandidatinformasjon } from '@/app/api/kandidat-sok/useKandidatinformasjon';
import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useKandidatlisteInfo } from '@/app/api/kandidat/useKandidatlisteInfo';
import LeggKandidatTilKandidatliste from '@/app/kandidat/[kandidatNr]/vis-kandidat/_ui/LeggKandidatTilKandidatliste';
import SWRLaster from '@/components/SWRLaster';
import KandidatVisningForModal from '@/components/modal/kandidat/KandidatVisningForModal';
import StillingVisningForModal from '@/components/modal/stilling/StillingVisningForModal';
import { Button, Heading, Modal, ToggleGroup } from '@navikt/ds-react';
import { ModalBody } from '@navikt/ds-react/Modal';
import { ArrowRightIcon } from 'lucide-react';
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
      className='flex flex-col h-[95vh]'
      closeOnBackdropClick
      width={'1280px'}
      open
      onClose={() => setVisStillingsId('')}
      aria-labelledby='modal-heading'
    >
      <SWRLaster
        hooks={[kandidatHook, kandidatlisteInfoHook]}
        skjulFeilmelding
        allowPartialData
      >
        {(kandidat, kandidatlisteInfo) => {
          return (
            <>
              <Modal.Header>
                <Heading level='1' size='large' id='modal-heading'>
                  <div className='flex justify-between items-center'>
                    {kandidatId
                      ? 'Stillingsoppdrag for jobbsøker'
                      : 'Viser stillingsoppdrag'}
                  </div>
                </Heading>
                <div className='pt-4 flex justify-between items-center'>
                  {kandidatId ? (
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
                  ) : (
                    <div />
                  )}
                  <div className='flex gap-2'>
                    {kandidatId &&
                      kandidatlisteInfo &&
                      kandidatlisteInfo?.kandidatlisteStatus ===
                        Kandidatlistestatus.Åpen && (
                        <LeggKandidatTilKandidatliste
                          kandidatId={kandidatId}
                          stillingId={visStillingsId}
                        />
                      )}
                    <Button
                      as='a'
                      size='small'
                      href={`/stilling/${visStillingsId}`}
                      icon={<ArrowRightIcon />}
                    >
                      Gå til stilling
                    </Button>
                  </div>
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
