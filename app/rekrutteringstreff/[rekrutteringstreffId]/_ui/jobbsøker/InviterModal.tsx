import { useHentRekrutteringstreffMeldingsmaler } from '@/app/api/kandidatvarsel/hentMeldingsmaler';
import { inviterJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/inviterJobbsøkere';
import { MeldingsmalVisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/MeldingsmalVisning';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import {
  BellIcon,
  NewspaperIcon,
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
import { useState } from 'react';

export type InviterInternalDto = {
  personTreffId: string;
  fornavn: string;
  etternavn: string;
  fødselsnummer: string;
  veilederNavIdent?: string | null;
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
  const { data: meldingsmaler } = useHentRekrutteringstreffMeldingsmaler();
  const [isLoading, setIsLoading] = useState(false);
  const antall = inviterInternalDtoer.length;
  const erFlereinvitasjon = antall > 1;
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
        <VStack gap='4'>
          <VStack gap='4'>
            <BodyShort>
              Sjekk at jobbsøker{erFlereinvitasjon ? 'ne' : 'en'} du har valgt
              stemmer, og send dem en invitasjon i aktivitetsplanen.
            </BodyShort>
            <div>
              <HStack
                className='border-border-subtle text-text-subtle border-b pb-2'
                gap='4'
              >
                <Detail className='flex-1'>Navn og fødselsnummer</Detail>
                <Detail className='w-36 flex-shrink-0'>Veileder</Detail>
                {erFlereinvitasjon && (
                  <div
                    style={{ width: '48px' }}
                    className='flex-shrink-0 text-right'
                  >
                    <Detail>Fjern</Detail>
                  </div>
                )}
              </HStack>
              <ul className='mt-2 space-y-2'>
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
                      <BodyShort className='w-36 flex-shrink-0'>
                        {jobbsøker.veilederNavIdent}
                      </BodyShort>
                      {erFlereinvitasjon && (
                        <div
                          style={{ width: '48px' }}
                          className='flex flex-shrink-0 justify-end'
                        >
                          <Button
                            variant='tertiary'
                            size='small'
                            icon={<XMarkIcon aria-hidden />}
                            onClick={() =>
                              onFjernJobbsøker(jobbsøker.fødselsnummer)
                            }
                            aria-label={`Fjern ${jobbsøker.fornavn} ${jobbsøker.etternavn}`}
                          />
                        </div>
                      )}
                    </HStack>
                  </li>
                ))}
              </ul>
            </div>
          </VStack>

          <VStack
            gap='4'
            data-color='bg-bg-subtle'
            className='bg-bg-subtle rounded-md p-4'
          >
            <Heading level='3' size='small'>
              Dette skjer videre
            </Heading>
            <VStack gap='3'>
              <HStack gap='2' align='start'>
                <div className='mt-[2px] w-6 flex-none'>
                  <TableIcon fontSize='1.5rem' aria-hidden />
                </div>
                <BodyShort className='flex-1'>
                  Jobbsøkeren får et kort i aktivitetsplanen i kolonnen
                  &quot;Forslag&quot;. Kortet inneholder navnet på treffet, tid,
                  sted og svarfrist.
                </BodyShort>
              </HStack>

              <HStack gap='2' align='start'>
                <div className='mt-[2px] w-6 flex-none'>
                  <NewspaperIcon fontSize='1.5rem' aria-hidden />
                </div>
                <BodyShort className='flex-1'>
                  Aktivitetskortet lenker til en informasjonsside om treffet.
                  Der ser de mer informasjon om treffet og svarer på
                  invitasjonen.
                </BodyShort>
              </HStack>

              <HStack gap='2' align='start'>
                <div className='mt-[2px] w-6 flex-none'>
                  <BellIcon fontSize='1.5rem' aria-hidden />
                </div>
                <BodyShort className='flex-1'>
                  [Fremtid] Veileder får beskjed i Modia Arbeidsrettet
                  Oppfølging.
                </BodyShort>
              </HStack>
            </VStack>
          </VStack>

          {meldingsmaler && (
            <MeldingsmalVisning
              tittel='Melding til jobbsøker'
              undertekst='Jobbsøkeren varsles på måten de har valgt (sms, epost, nav.no).'
              smsTekst={meldingsmaler.kandidatInvitertTreff.smsTekst}
              epostTittel={meldingsmaler.kandidatInvitertTreff.epostTittel}
              epostHtmlBody={meldingsmaler.kandidatInvitertTreff.epostHtmlBody}
            />
          )}
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
