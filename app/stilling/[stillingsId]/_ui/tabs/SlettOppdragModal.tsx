import { slettStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/slett-stilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { VisningsStatus } from '@/app/stilling/_util/stillingInfoUtil';
import { CircleSlashIcon, EyeSlashIcon, FileXMarkIcon, PersonCrossIcon, SpeakerSlashIcon, TableIcon, TrashIcon } from '@navikt/aksel-icons';
import {
  BodyLong,
  BodyShort,
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

  const modalHeaderTekst = omStilling.erFormidling
    ? 'Vil du slette etterregistreringen?'
    : 'Vil du slette stillingsoppdraget?';

  const slettKnappTekst = omStilling.erFormidling
    ? 'Ja, slett registreringen'
    : 'Ja, slett oppdraget';

  const ikkePublisertTekst = (
    <BodyShort>
      Oppdraget er ikke publisert enda, og kan slettes uten problemer.
    </BodyShort>
  );

  const etterregistreringTekst = (
    <>
      <BodyShort className='pb-2.5'>
        Du skal kun slette registreringen hvis den har feil arbeidsgiver eller
        feil jobbsøker.
      </BodyShort>
        <Box.New
          padding='6'
          borderRadius='xlarge'
          borderColor='info-subtleA'
          background='neutral-softA'
        >
          <VStack gap='4'>
            <Heading size='small'>
              Dette skjer når du sletter registreringen:
            </Heading>

            <div className='flex gap-2 items-center'>
              <EyeSlashIcon aria-hidden />
              <BodyLong>
                Registreringen fjernes for alle i Rekrutteringsbistand.
              </BodyLong>
            </div>
            <div className='flex gap-2 items-center'>
              <TrashIcon aria-hidden />
              <BodyLong>Listen over jobbsøkere slettes.</BodyLong>
            </div>
            <div className='flex gap-2 items-center'>
              <CircleSlashIcon aria-hidden />
              <BodyLong>
                Du kan ikke lenger gjenåpne etterregistreringen.
              </BodyLong>
            </div>
          </VStack>
        </Box.New>
    </>
  );

  return (
    <>
      <Modal
        onClose={() => setVisModal(false)}
        open={true}
        header={{
          heading: modalHeaderTekst,
          size: 'small',
        }}
        width='medium'
      >
        <Modal.Body>
          {omStilling.visningsStatus === VisningsStatus.IkkePublisert ? (
            ikkePublisertTekst
          ) : omStilling.erFormidling ? (
            etterregistreringTekst
          ) : (
            <VStack gap='6'>
              <BodyShort>
                Du skal kun slette oppdraget hvis det har feil arbeidsgiver.
              </BodyShort>
              <Box.New
                padding='6'
                borderRadius='xlarge'
                borderColor='info-subtleA'
                background='neutral-softA'
              >
                <VStack gap='4'>
                  <Heading size='small'>
                    Dette skjer når du sletter oppdraget:
                  </Heading>

                  <div className='flex gap-2 items-center'>
                    <EyeSlashIcon aria-hidden />
                    <BodyLong>
                      Oppdraget fjernes for alle i Rekrutteringsbistand.
                    </BodyLong>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <FileXMarkIcon aria-hidden />
                    <BodyLong>
                      Alle delte CVer og saker slettes fra arbeidsgivers
                      min-side.
                    </BodyLong>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <TrashIcon aria-hidden />
                    <BodyLong>Listen over jobbsøkere slettes.</BodyLong>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <CircleSlashIcon aria-hidden />
                    <BodyLong>Du kan ikke lenger gjenåpne oppdraget.</BodyLong>
                  </div>
                </VStack>
              </Box.New>
              <Box.New
                padding='6'
                borderRadius='xlarge'
                borderColor='info-subtleA'
                background='neutral-softA'
              >
                <VStack gap='4'>
                  <Heading size='small'>
                    Har du delt CVer til arbeidsgiver?
                  </Heading>
                  <div className='flex gap-2 items-center'>
                    <PersonCrossIcon aria-hidden />
                    <BodyLong>
                      Du kan fjerne CV-ene fra arbeidsgivers liste manuelt.
                    </BodyLong>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <TableIcon aria-hidden />
                    <BodyLong>
                      Jobbsøker og veileder vil fremdeles se kortet i
                      aktivitetsplanen med lenke til stillingen.
                    </BodyLong>
                  </div>
                  <div className='flex gap-2 items-center'>
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
            {slettKnappTekst}
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
