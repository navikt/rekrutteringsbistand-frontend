import { slettStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/slett-stilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { VisningsStatus } from '@/app/stilling/_util/stillingInfoUtil';
import {
  CircleSlashIcon,
  EyeSlashIcon,
  FileXMarkIcon,
  PersonCrossIcon,
  SpeakerSlashIcon,
  TableIcon,
  TrashIcon,
} from '@navikt/aksel-icons';
import {
  BodyLong,
  Box,
  Button,
  Heading,
  Modal,
  VStack,
} from '@navikt/ds-react';
import { useState } from 'react';

export interface SlettOppdragModalProps {
  setVisModal: (val: boolean) => void;
}

export default function SlettOppdragModal({
  setVisModal,
}: SlettOppdragModalProps) {
  const { stillingsData, refetch, omStilling } = useStillingsContext();

  const [loading, setLoading] = useState(false);

  const slettStillingClick = async () => {
    setLoading(true);
    await slettStilling(stillingsData.stilling.uuid);
    setLoading(false);
    setVisModal(false);
    if (refetch) {
      refetch();
    }
  };

  const ikkePublisertTekst = (
    <BodyLong>
      Oppdraget er ikke publisert enda, og kan slettes uten problemer.
    </BodyLong>
  );

  return (
    <>
      <Modal
        onClose={() => setVisModal(false)}
        open={true}
        header={{
          heading: 'Vil du slette stillingsoppdraget?',
          size: 'small',
        }}
        width='medium'
      >
        <Modal.Body>
          {omStilling.visningsStatus === VisningsStatus.IkkePublisert ? (
            ikkePublisertTekst
          ) : (
            <VStack gap='6'>
              <Box.New
                padding='6'
                borderRadius='xlarge'
                borderColor='info-subtleA'
                background='default'
              >
                <VStack gap='4'>
                  <Heading size='small'>
                    Dette skjer når du sletter oppdraget
                  </Heading>

                  <div className='flex gap-2'>
                    <EyeSlashIcon aria-hidden />
                    <BodyLong>
                      Oppdraget fjernes for alle i Rekrutteringsbistand.
                    </BodyLong>
                  </div>
                  <div className='flex gap-2'>
                    <FileXMarkIcon aria-hidden />
                    <BodyLong>
                      Alle delte CVer og saker slettes fra arbeidsgivers
                      min-side.
                    </BodyLong>
                  </div>
                  <div className='flex gap-2'>
                    <TrashIcon aria-hidden />
                    <BodyLong>Listen over jobbsøkere slettes.</BodyLong>
                  </div>
                  <div className='flex gap-2'>
                    <CircleSlashIcon aria-hidden />
                    <BodyLong>Du kan ikke lenger gjenåpne oppdraget.</BodyLong>
                  </div>
                </VStack>
              </Box.New>
              <Box.New
                padding='6'
                borderRadius='xlarge'
                borderColor='info-subtleA'
                background='default'
              >
                <VStack gap='4'>
                  <Heading size='small'>
                    Har du delt CVer til arbeidsgiver?
                  </Heading>
                  <div className='flex gap-2'>
                    <PersonCrossIcon aria-hidden />
                    <BodyLong>
                      Du kan fjerne CV-ene fra arbeidsgivers liste manuelt.
                    </BodyLong>
                  </div>
                  <div className='flex gap-2'>
                    <TableIcon aria-hidden />
                    <BodyLong>
                      Jobbsøker og veileder vil fremdeles se kortet i
                      aktivitetsplanen med lenke til stillingen.
                    </BodyLong>
                  </div>
                  <div className='flex gap-2'>
                    <SpeakerSlashIcon aria-hidden />
                    <BodyLong>
                      Jobbsøker får ikke beskjed om at stillingsoppdraget er
                      slettet. Kontakt jobbsøker og/eller veileder for å
                      informere dem.
                    </BodyLong>
                  </div>
                </VStack>
              </Box.New>
            </VStack>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            variant='danger'
            onClick={slettStillingClick}
            loading={loading}
          >
            Slett oppdraget
          </Button>
          <Button
            type='button'
            variant='secondary'
            loading={loading}
            onClick={() => setVisModal(false)}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
