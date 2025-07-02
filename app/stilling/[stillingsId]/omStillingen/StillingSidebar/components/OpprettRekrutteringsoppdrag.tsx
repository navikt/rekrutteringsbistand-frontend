import { RekbisError } from '../../../../../../util/rekbisError';
import { setStillingsinfo } from '../../../../../api/stilling/stillingsinfo/setStillingsinfo';
import { useApplikasjonContext } from '../../../../../providers/ApplikasjonContext';
import {
  FileTextIcon,
  PersonChatIcon,
  PlusCircleIcon,
  ShieldLockIcon,
} from '@navikt/aksel-icons';
import {
  Alert,
  BodyShort,
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  Modal,
  VStack,
} from '@navikt/ds-react';
import * as React from 'react';

interface OpprettRekrutteringsoppdragProps {
  arbeidsgiver: string;
  orgnr?: string | null;
  stillingstittel: string;
  stillingsId: string;
}

const OpprettRekrutteringsoppdrag: React.FC<
  OpprettRekrutteringsoppdragProps
> = ({ arbeidsgiver, orgnr, stillingstittel, stillingsId }) => {
  const { brukerData, valgtNavKontor } = useApplikasjonContext();
  const [loading, setLoading] = React.useState(false);
  const [avtaltMedArbeidsgiver, setAvtaltMedArbeidsgiver] =
    React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleFullfor = async () => {
    setLoading(true);
    try {
      await setStillingsinfo(opprettStillingInfo);
      window.location.reload();
    } catch (error) {
      new RekbisError({
        message: 'Feil under opprettelse av stillingsinfo',
        error: error,
      });
      alert('Noe gikk galt. Vennligst prøv igjen senere.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const opprettStillingInfo = {
    stillingsid: stillingsId,
    eierNavident: brukerData.ident,
    eierNavn: brukerData.navn,
    eierNavKontorEnhetId: valgtNavKontor?.navKontor,
  };

  return (
    <>
      <Button
        variant='primary'
        size='small'
        className='my-2 h-5 w-full'
        onClick={() => setOpen(true)}
      >
        Bruk til rekrutteringsoppdrag
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header={{
          heading: 'Bruk annonsen til rekrutteringsoppdrag',
          closeButton: true,
        }}
        width='medium'
      >
        {!orgnr ? (
          <Modal.Body>
            <Alert variant='error'>
              <Heading spacing size='small' level='3'>
                Annonsen kan dessverre ikke brukes til oppdrag
              </Heading>
              <BodyShort className='mb-4'>
                For å kunne bruke annonsen til rekrutteringsoppdrag trenger den
                :
              </BodyShort>
              <ul className='list-disc list-inside mb-4'>
                <li>et gyldig organisasjonsnummer.</li>
              </ul>
              <BodyShort>
                Har du et oppdrag med arbeidsgiveren kan du opprette en
                stillingsannonse selv her i Rekrutteringsbistand.
              </BodyShort>
            </Alert>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <VStack gap='6'>
              <BodyShort>
                Samarbeider du med en arbeidsgiver om å rekruttere, kan du bruke
                annonsen fra arbeidsplassen.no til det så slipper du å lage en
                ny annonsе.
              </BodyShort>

              <Box.New background='neutral-softA' className=' p-4 rounded-lg'>
                <VStack gap='2'>
                  <Heading size='medium' level='3'>
                    {stillingstittel}
                  </Heading>
                  <Heading size='small' level='3'>
                    {arbeidsgiver}
                  </Heading>
                  <BodyShort size='small'>Org.nr. {orgnr}</BodyShort>
                </VStack>
              </Box.New>

              <VStack gap='4'>
                <Heading size='small' level='3'>
                  Har du avtalt med arbeidsgiveren å bruke annonsen til
                  rekruttering?
                </Heading>

                <Checkbox
                  checked={avtaltMedArbeidsgiver}
                  onChange={(e) => setAvtaltMedArbeidsgiver(e.target.checked)}
                >
                  Ja, vi har avtalt å bruke annonsen.
                </Checkbox>
              </VStack>

              <VStack gap='4'>
                <Heading size='small' level='3'>
                  Hva som skjer
                </Heading>

                <VStack gap='3'>
                  <HStack gap='3' align='start' className='items-start'>
                    <ShieldLockIcon className='mt-1 flex-shrink-0' />
                    <BodyShort className='flex-1'>
                      Du settes som eier av annonsen.
                    </BodyShort>
                  </HStack>

                  <HStack gap='3' align='start' className='items-start'>
                    <PlusCircleIcon className='mt-1 flex-shrink-0' />
                    <BodyShort className='flex-1'>
                      Nav-ansatte kan foreslå jobbsøkere til stillingen.
                    </BodyShort>
                  </HStack>

                  <HStack gap='3' align='start' className='items-start'>
                    <PersonChatIcon className='mt-1  flex-shrink-0' />
                    <BodyShort className='flex-1'>
                      Du kan be jobbsøkere om samtykke til å dele CVen deres med
                      arbeidsgiveren.
                    </BodyShort>
                  </HStack>

                  <HStack gap='3' align='start' className='items-start'>
                    <FileTextIcon className='mt-1 flex-shrink-0' />
                    <BodyShort className='flex-1'>
                      Arbeidsgiveren får en oversikt over oppdraget og
                      foreslåtte jobbsøkere på arbeidsgivers min-side (nav.no).
                    </BodyShort>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
          </Modal.Body>
        )}

        {!orgnr ? (
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setOpen(false)}>
              Lukk
            </Button>
          </Modal.Footer>
        ) : (
          <Modal.Footer>
            <HStack gap='4'>
              <Button variant='secondary' onClick={() => setOpen(false)}>
                Avbryt
              </Button>
              <Button
                loading={loading}
                variant='primary'
                onClick={handleFullfor}
                disabled={!avtaltMedArbeidsgiver}
              >
                Fullfør
              </Button>
            </HStack>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default OpprettRekrutteringsoppdrag;
