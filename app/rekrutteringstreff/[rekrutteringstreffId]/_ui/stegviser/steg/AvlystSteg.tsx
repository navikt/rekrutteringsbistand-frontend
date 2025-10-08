'use client';

import { XMarkOctagonIcon, CheckmarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading, HStack, VStack } from '@navikt/ds-react';

const AvlystSteg = () => {
  return (
    <div className='flex-1 space-y-6'>
      <Heading level='2' size='medium' className='text-red-400'>
        Treffet er avlyst
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
              Legge til arbeidsgivere.
            </BodyShort>
          </HStack>
          <HStack gap='3' align='start'>
            <div className='flex-none w-6 mt-[2px]'>
              <XMarkOctagonIcon
                fontSize='1.5rem'
                aria-hidden
                color='var(--ax-text-neutral-subtle)'
              />
            </div>
            <BodyShort className='flex-1' textColor='subtle'>
              Legge til jobbsøkere.
            </BodyShort>
          </HStack>
          <HStack gap='3' align='start'>
            <div className='flex-none w-6 mt-[2px]'>
              <XMarkOctagonIcon
                fontSize='1.5rem'
                aria-hidden
                color='var(--ax-text-neutral-subtle)'
              />
            </div>
            <BodyShort className='flex-1' textColor='subtle'>
              Redigere informasjon om treffet.
            </BodyShort>
          </HStack>
        </VStack>
      </Box.New>

      <Box.New background='neutral-softA' borderRadius='xlarge' padding='3'>
        <Heading level='3' size='small' className='mb-2'>
          Hva kan du fortsatt gjøre?
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
              Se informasjon om treffet.
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
              Se hvem som var invitert og påmeldt.
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
              Kort i aktivitetsplanen for påmeldte flyttes til kolonnen Avbrutt.
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
              Treffet kan ikke reaktiveres. Lag et nytt rekrutteringstreff hvis
              du vil gjennomføre treffet.
            </BodyShort>
          </HStack>
        </VStack>
      </Box.New>
    </div>
  );
};

export default AvlystSteg;
