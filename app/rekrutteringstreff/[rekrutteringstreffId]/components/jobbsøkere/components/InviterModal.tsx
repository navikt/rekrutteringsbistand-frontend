import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import {
  BellIcon,
  FileTextIcon,
  LinkIcon,
  PersonSuitIcon,
  XMarkIcon,
} from '@navikt/aksel-icons';
import {
  BodyShort,
  Button,
  Detail,
  Heading,
  HStack,
  Modal,
  VStack,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import * as React from 'react';

export type InviterInternalDto = {
  fornavn: string;
  etternavn: string;
  fødselsnummer: string;
  veilederNavn?: string;
};

export interface InviterModalProps {
  modalref?: React.RefObject<HTMLDialogElement | null>;
  inviterInternalDto: InviterInternalDto[];
  onFjernJobbsøker: (fødselsnummer: string) => void;
}

const InviterModal: React.FC<InviterModalProps> = ({
  modalref,
  inviterInternalDto,
  onFjernJobbsøker,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const antall = inviterInternalDto.length;
  const header = `Inviter ${antall} ${
    antall > 1 ? 'jobbsøkere' : 'jobbsøker'
  } til treff`;

  const handleInviter = async () => {
    setIsLoading(true);
    const jobbsokerIder = inviterInternalDto.map((j) => j.fødselsnummer);
    try {
      logger.info(
        `Inviterer ${jobbsokerIder.length} jobbsøkere til treff ${rekrutteringstreffId}...`,
      );
    } catch (error) {
      logger.error('Feil ved invitasjon av jobbsøkere', error);
    } finally {
      setIsLoading(false);
    }
  };

  const lukkModal = () => {
    if (modalref && modalref.current) {
      modalref.current.close();
    }
  };

  return (
    <Modal
      ref={modalref}
      header={{ heading: header }}
      onClose={lukkModal}
      width='medium'
    >
      <Modal.Body>
        <VStack gap='8'>
          <VStack gap='4'>
            <BodyShort>
              Sjekk at jobbsøkerne du har valgt stemmer, og send dem en
              invitasjon i aktivitetsplanen.
            </BodyShort>
            <div>
              <HStack
                justify='space-between'
                className='border-b border-border-subtle pb-2 text-text-subtle'
              >
                <Detail uppercase>Navn og fødselsnummer</Detail>
                <Detail uppercase>Veileder</Detail>
                <Detail
                  uppercase
                  style={{ width: '48px' }}
                  className='text-right'
                >
                  Fjern
                </Detail>
              </HStack>
              <ul className='space-y-2 mt-2'>
                {inviterInternalDto.map((jobbsøker) => (
                  <li key={jobbsøker.fødselsnummer}>
                    <HStack
                      justify='space-between'
                      align='center'
                      className='py-2'
                    >
                      <VStack gap='0'>
                        <BodyShort>
                          {jobbsøker.fornavn} {jobbsøker.etternavn}
                        </BodyShort>
                        <Detail>{jobbsøker.fødselsnummer}</Detail>
                      </VStack>
                      <BodyShort>{jobbsøker.veilederNavn}</BodyShort>
                      <Button
                        variant='tertiary'
                        icon={<XMarkIcon aria-hidden />}
                        onClick={() =>
                          onFjernJobbsøker(jobbsøker.fødselsnummer)
                        }
                        aria-label={`Fjern ${jobbsøker.fornavn} ${jobbsøker.etternavn}`}
                      />
                    </HStack>
                  </li>
                ))}
              </ul>
            </div>
          </VStack>

          <VStack gap='4' className='bg-bg-subtle p-4 rounded-md'>
            <Heading level='3' size='small'>
              Dette skjer videre
            </Heading>
            <VStack gap='3'>
              <HStack gap='2' align='start'>
                <FileTextIcon fontSize='1.5rem' aria-hidden />
                <BodyShort>
                  Jobbsøkeren får et kort i aktivitetsplanen i kolonnen
                  “Forslag”. Kortet inneholder navnet på treffet, tid, sted og
                  svarfrist.
                </BodyShort>
              </HStack>
              <HStack gap='2' align='start'>
                <BellIcon fontSize='1.5rem' aria-hidden />
                <BodyShort>
                  Jobbsøkeren varsles på måten de har valgt (sms, epost,
                  nav.no).
                </BodyShort>
              </HStack>
              <HStack gap='2' align='start'>
                <LinkIcon fontSize='1.5rem' aria-hidden />
                <BodyShort>
                  Aktivitetskortet lenker til en informasjonsside om treffet.
                  Der ser de mer informasjon om treffet og svarer på
                  invitasjonen.
                </BodyShort>
              </HStack>
              <HStack gap='2' align='start'>
                <PersonSuitIcon fontSize='1.5rem' aria-hidden />
                <BodyShort>
                  [Fremtid] Veileder får beskjed i Modia Arbeidsrettet
                  Oppfølging.
                </BodyShort>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={handleInviter}
          loading={isLoading}
          disabled={antall === 0}
        >
          Inviter {antall} {antall > 1 ? 'jobbsøkere' : 'jobbsøker'}
        </Button>
        <Button variant='secondary' onClick={lukkModal}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InviterModal;
