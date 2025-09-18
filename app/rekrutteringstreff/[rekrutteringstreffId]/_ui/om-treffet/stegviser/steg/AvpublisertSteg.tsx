'use client';

import { XMarkOctagonIcon, CheckmarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading, HStack, VStack } from '@navikt/ds-react';

const AvpublisertSteg = () => {
  return (
    <div className='flex-1 space-y-6'>
      <Heading level='2' size='medium'>
        Treffet er avpublisert
      </Heading>

      <Box.New background='neutral-softA' borderRadius='xlarge' padding='3'>
        <Heading level='3' size='small' className='mb-2'>
          Hva kan du ikke gjøre nå?
        </Heading>
        <VStack gap='3'>
          <HStack gap='3' align='start'>
            <div className='flex-none w-6 mt-[2px]'>
              <XMarkOctagonIcon
                fontSize='1.5rem'
                aria-hidden
                color='var(--ax-text-neutral-subtle)'
              />
            </div>
            <BodyShort className='flex-1' textColor='subtle'>
              Invitere jobbsøkere.
            </BodyShort>
          </HStack>
        </VStack>
      </Box.New>

      <Box.New background='neutral-softA' borderRadius='xlarge' padding='3'>
        <Heading level='3' size='small' className='mb-2'>
          Hva kan du fremdeles gjøre?
        </Heading>
        <VStack gap='3'>
          <HStack gap='3' align='start'>
            <div className='flex-none w-6 mt-[2px]'>
              <CheckmarkIcon
                fontSize='1.5rem'
                aria-hidden
                color='var(--ax-text-neutral-subtle)'
              />
            </div>
            <BodyShort className='flex-1' textColor='subtle'>
              Redigere informasjonen i treffet.
            </BodyShort>
          </HStack>
          <HStack gap='3' align='start'>
            <div className='flex-none w-6 mt-[2px]'>
              <CheckmarkIcon
                fontSize='1.5rem'
                aria-hidden
                color='var(--ax-text-neutral-subtle)'
              />
            </div>
            <BodyShort className='flex-1' textColor='subtle'>
              Legge til deltakere, både arbeidsgivere og jobbsøkere.
            </BodyShort>
          </HStack>
          <HStack gap='3' align='start'>
            <div className='flex-none w-6 mt-[2px]'>
              <CheckmarkIcon
                fontSize='1.5rem'
                aria-hidden
                color='var(--ax-text-neutral-subtle)'
              />
            </div>
            <BodyShort className='flex-1' textColor='subtle'>
              Aktiver på nytt med knappen «Aktiver på nytt».
            </BodyShort>
          </HStack>
        </VStack>
      </Box.New>
      <Box.New background='neutral-softA' borderRadius='xlarge' padding='3'>
        <Heading level='3' size='small' className='mb-2'>
          Hva innebærer det at treffet er avlyst?
        </Heading>
        <VStack gap='3'>
          <HStack gap='3' align='start'>
            <div className='flex-none w-6 mt-[2px]'>
              <CheckmarkIcon
                fontSize='1.5rem'
                aria-hidden
                color='var(--ax-text-neutral-subtle)'
              />
            </div>
            <BodyShort className='flex-1' textColor='subtle'>
              Ingen endringer mot aktivitestplanen når vi avpubliserer.
            </BodyShort>
          </HStack>
          <HStack gap='3' align='start'>
            <div className='flex-none w-6 mt-[2px]'>
              <CheckmarkIcon
                fontSize='1.5rem'
                aria-hidden
                color='var(--ax-text-neutral-subtle)'
              />
            </div>
            <BodyShort className='flex-1' textColor='subtle'>
              Treffet kan publiseres på nytt ved å trykke på
              &quot;publiser&quot; knappen om du vil gjennomføre treffet.
            </BodyShort>
          </HStack>
        </VStack>
      </Box.New>
    </div>
  );
};

export default AvpublisertSteg;
