import { registrerIkkeOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/registrerOppmøte/registrerIkkeOppmøte';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { TableIcon, XMarkIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Button,
  Detail,
  Heading,
  HStack,
  Modal,
  VStack,
} from '@navikt/ds-react';
import { useState } from 'react';
import * as React from 'react';

export type IkkeOppmøteInternalDto = {
  personTreffId: string;
  fornavn: string;
  etternavn: string;
  fødselsnummer: string;
  veilederNavIdent?: string;
};

export interface IkkeOppmøteModalProps {
  modalref?: React.RefObject<HTMLDialogElement | null>;
  ikkeOppmøteInternalDtoer: IkkeOppmøteInternalDto[];
  onFjernJobbsøker: (fødselsnummer: string) => void;
  onIkkeOppmøteSendt: () => void;
}

export const IkkeOppmøteModal: React.FC<IkkeOppmøteModalProps> = ({
  modalref,
  ikkeOppmøteInternalDtoer,
  onFjernJobbsøker,
  onIkkeOppmøteSendt,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const [isLoading, setIsLoading] = useState(false);
  const antall = ikkeOppmøteInternalDtoer.length;
  const header =
    antall === 1
      ? 'Legg inn ikke oppmøte for jobbsøkeren til treff'
      : `Legg inn ikke oppmøte for ${antall} jobbsøkere til treff`;

  const handleIkkeOppmøteRegistrering = async () => {
    setIsLoading(true);
    const personTreffIder = ikkeOppmøteInternalDtoer.map(
      (j) => j.personTreffId,
    );

    try {
      await registrerIkkeOppmøte(rekrutteringstreffId, personTreffIder);
      onIkkeOppmøteSendt();
    } catch (error) {
      throw new RekbisError({
        message: 'Feil ved ikke-oppmøte-registrering av jobbsøkere',
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
              Sjekk at jobbsøkerne du har valgt stemmer, og legg inn
              ikke-oppmøte for dem i aktivitetsplanen.
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
                {ikkeOppmøteInternalDtoer.map((jobbsøker) => (
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
                  Jobbsøkeren får flyttet kort i aktivitetsplanen til kolonnen
                  Avbrutt.
                </BodyShort>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={handleIkkeOppmøteRegistrering}
          loading={isLoading}
          disabled={antall === 0}
        >
          {antall === 1
            ? 'Registrer ikke oppmøte for jobbsøkeren'
            : `Registrer ikke oppmøte for ${antall} jobbsøkere`}
        </Button>
        <Button variant='secondary' onClick={lukkModal}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IkkeOppmøteModal;
