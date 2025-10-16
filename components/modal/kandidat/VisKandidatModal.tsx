import { useKandidatinformasjon } from '@/app/api/kandidat-sok/useKandidatinformasjon';
// import KandidatlisteBoks from '@/app/kandidat/vis-kandidat/_ui/KandidatlisteBoks';
import SWRLaster from '@/components/SWRLaster';
import KandidatVisningForModal from '@/components/modal/kandidat/KandidatVisningForModal';
import StillingVisningForModal from '@/components/modal/stilling/StillingVisningForModal';
import { useNullableKandidatNavigeringContext } from '@/providers/KandidatNavigeringContext';
import { Button, Heading, Modal, ToggleGroup } from '@navikt/ds-react';
import { ModalBody } from '@navikt/ds-react/Modal';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

export interface VisKandidatModalProps {
  tittel?: string;
  stillingsId?: string;
  forKandidatliste?: string;
}

export default function VisKandidatModal({
  tittel,
  stillingsId,
  forKandidatliste,
}: VisKandidatModalProps) {
  const [fane, setFane] = useState<string>('jobbsøker');

  const navigering = useNullableKandidatNavigeringContext();
  const [visKandidatId, setVisKandidatId] = useQueryState('visKandidatId', {
    defaultValue: '',
    clearOnDefault: true,
  });
  const kandidatHook = useKandidatinformasjon(visKandidatId);

  if (!visKandidatId) {
    return null;
  }

  return (
    <Modal
      width={'1280px'}
      open
      onClose={() => setVisKandidatId('')}
      aria-labelledby='modal-heading'
      closeOnBackdropClick
      className='flex flex-col h-[95vh]'
    >
      <SWRLaster hooks={[kandidatHook]}>
        {(kandidat) => {
          return (
            <>
              <Modal.Header>
                <div className='flex justify-between '>
                  <Heading level='1' size='large' id='modal-heading'>
                    {tittel}
                  </Heading>
                  {navigering && (
                    <div className={'-mt-[10px]'}>
                      <Button
                        variant='tertiary'
                        disabled={!navigering.harForrigeKandidat}
                        icon={<ChevronUpIcon />}
                        onClick={navigering.forrigeKandidat}
                      />
                      <Button
                        variant='tertiary'
                        icon={<ChevronDownIcon />}
                        disabled={!navigering.harNesteKandidat}
                        onClick={navigering.nesteKandidat}
                      />
                    </div>
                  )}
                </div>

                {stillingsId && (
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
                )}
              </Modal.Header>
              <ModalBody>
                {stillingsId && fane === 'stilling' && (
                  <StillingVisningForModal stillingsId={stillingsId} />
                )}
                {fane === 'jobbsøker' && (
                  <KandidatVisningForModal
                    forKandidatliste={forKandidatliste}
                    kandidatId={visKandidatId}
                  />
                )}
              </ModalBody>{' '}
            </>
          );
        }}
      </SWRLaster>
    </Modal>
  );
}
