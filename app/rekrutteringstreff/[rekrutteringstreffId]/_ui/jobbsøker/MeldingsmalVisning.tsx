import { EnvelopeClosedIcon, ChatIcon } from '@navikt/aksel-icons';
import {
  BodyLong,
  BodyShort,
  Box,
  Heading,
  HStack,
  Label,
  VStack,
} from '@navikt/ds-react';

interface MeldingsmalVisningProps {
  tittel: string;
  smsTekst: string;
  epostTittel: string;
  epostHtmlBody: string;
}

export const MeldingsmalVisning = ({
  tittel,
  smsTekst,
  epostTittel,
  epostHtmlBody,
}: MeldingsmalVisningProps) => {
  return (
    <VStack gap='4'>
      <Heading level='3' size='small'>
        {tittel}
      </Heading>

      <VStack gap='4'>
        {/* SMS-seksjon */}
        <Box.New background='neutral-softA' padding='4' borderRadius='xlarge'>
          <VStack gap='3'>
            <HStack gap='2' align='center'>
              <ChatIcon
                fontSize='1.25rem'
                aria-hidden
                color='var(--ax-text-neutral-subtle)'
              />
              <Label as='span' size='small'>
                SMS
              </Label>
            </HStack>
            <BodyLong size='small'>{smsTekst}</BodyLong>
          </VStack>
        </Box.New>

        {/* E-post-seksjon */}
        <Box.New background='neutral-softA' padding='4' borderRadius='xlarge'>
          <VStack gap='3'>
            <HStack gap='2' align='center'>
              <EnvelopeClosedIcon
                fontSize='1.25rem'
                aria-hidden
                color='var(--ax-text-neutral-subtle)'
              />
              <Label as='span' size='small'>
                E-post
              </Label>
            </HStack>
            <VStack gap='2'>
              <BodyShort size='small' weight='semibold'>
                Emne: {epostTittel}
              </BodyShort>
              <div
                dangerouslySetInnerHTML={{ __html: epostHtmlBody }}
                className='prose prose-sm max-w-none text-sm'
              />
            </VStack>
          </VStack>
        </Box.New>
      </VStack>
    </VStack>
  );
};
