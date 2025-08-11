import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import { inviterJobbsøkere } from '@/app/api/rekrutteringstreff/inviterJobbsokere/inviterJobbsokere';
import { RekbisError } from '@/util/rekbisError';
import {
  BellIcon,
  NewspaperIcon,
  PersonSuitIcon,
  TableIcon,
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
import * as React from 'react';

export type InviterInternalDto = {
  personTreffId: string;
  fornavn: string;
  etternavn: string;
  fødselsnummer: string;
  veilederNavIdent?: string;
};

export interface InviterModalProps {
  modalref?: React.RefObject<HTMLDialogElement | null>;
  inviterInternalDtoer: InviterInternalDto[];
  onFjernJobbsøker: (fødselsnummer: string) => void;
  onInvitasjonSendt: () => void;
}

export const InviterModal: React.FC<InviterModalProps> = ({
  modalref,
  inviterInternalDtoer,
  onFjernJobbsøker,
  onInvitasjonSendt,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const antall = inviterInternalDtoer.length;
  const header =
    antall === 1
      ? 'Inviter jobbsøkeren til treff'
      : `Inviter ${antall} jobbsøkere til treff`;

  const handleInviter = async () => {
    setIsLoading(true);
    const personTreffIder = inviterInternalDtoer.map((j) => j.personTreffId);

    try {
      await inviterJobbsøkere(rekrutteringstreffId, personTreffIder);
      onInvitasjonSendt();
    } catch (error) {
      throw new RekbisError({
        message: 'Feil ved invitasjon av jobbsøkere',
        error: error,
      });
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
                className='border-b border-border-subtle pb-2 text-text-subtle'
                gap='4'
              >
                <Detail className='flex-1'>Navn og fødselsnummer</Detail>
                <Detail className='w-70 flex-shrink-0'>Veileder</Detail>
                <div
                  style={{ width: '48px' }}
                  className='text-right flex-shrink-0'
                >
                  {antall > 1 && <Detail>Fjern</Detail>}
                </div>
              </HStack>
              <ul className='space-y-2 mt-2'>
                {inviterInternalDtoer.map((jobbsøker) => (
                  <li key={jobbsøker.fødselsnummer}>
                    <HStack align='center' className='py-2' gap='4'>
                      <VStack gap='0' className='flex-1'>
                        <BodyShort>
                          {jobbsøker.fornavn} {jobbsøker.etternavn}
                        </BodyShort>
                        <BodyShort textColor='subtle'>
                          {jobbsøker.fødselsnummer}
                        </BodyShort>
                      </VStack>
                      <BodyShort className='w-70 flex-shrink-0'>
                        {jobbsøker.veilederNavIdent}
                      </BodyShort>
                      <div
                        style={{ width: '48px' }}
                        className='flex justify-end flex-shrink-0'
                      >
                        {antall > 1 && (
                          <Button
                            variant='tertiary'
                            icon={<XMarkIcon aria-hidden />}
                            onClick={() =>
                              onFjernJobbsøker(jobbsøker.fødselsnummer)
                            }
                            aria-label={`Fjern ${jobbsøker.fornavn} ${jobbsøker.etternavn}`}
                          />
                        )}
                      </div>
                    </HStack>
                  </li>
                ))}
              </ul>
            </div>
          </VStack>

          <VStack
            gap='4'
            data-color='bg-bg-subtle'
            className='bg-bg-subtle p-4 rounded-md'
          >
            <Heading level='3' size='small'>
              Dette skjer videre
            </Heading>
            <VStack gap='3'>
              <HStack gap='2' align='start'>
                <div className='flex-none w-6 mt-[2px]'>
                  <TableIcon fontSize='1.5rem' aria-hidden />
                </div>
                <BodyShort className='flex-1'>
                  Jobbsøkeren får et kort i aktivitetsplanen i kolonnen
                  “Forslag”. Kortet inneholder navnet på treffet, tid, sted og
                  svarfrist.
                </BodyShort>
              </HStack>

              <HStack gap='2' align='start'>
                <div className='flex-none w-6 mt-[2px]'>
                  <BellIcon fontSize='1.5rem' aria-hidden />
                </div>
                <BodyShort className='flex-1'>
                  Jobbsøkeren varsles på måten de har valgt (sms, e-post,
                  nav.no).
                </BodyShort>
              </HStack>

              <HStack gap='2' align='start'>
                <div className='flex-none w-6 mt-[2px]'>
                  <NewspaperIcon fontSize='1.5rem' aria-hidden />
                </div>
                <BodyShort className='flex-1'>
                  Aktivitetskortet lenker til en informasjonsside om treffet.
                  Der ser de mer informasjon om treffet og svarer på
                  invitasjonen.
                </BodyShort>
              </HStack>

              <HStack gap='2' align='start'>
                <div className='flex-none w-6 mt-[2px]'>
                  <PersonSuitIcon fontSize='1.5rem' aria-hidden />
                </div>
                <BodyShort className='flex-1'>
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
          {antall === 1
            ? 'Inviter jobbsøkeren'
            : `Inviter ${antall} jobbsøkere`}
        </Button>
        <Button variant='secondary' onClick={lukkModal}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InviterModal;
