import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';
import React from 'react';

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
        <VStack>
          <Heading level='4' size='xsmall' spacing>
            SMS
          </Heading>
          <Box.New background='neutral-softA' padding='3' borderRadius='xlarge'>
            <BodyLong>{smsTekst}</BodyLong>
          </Box.New>
        </VStack>
        <VStack>
          <Heading level='4' size='xsmall' spacing>
            E-post
          </Heading>
          <Box.New background='neutral-softA' padding='3' borderRadius='xlarge'>
            <VStack gap='2'>
              <BodyLong className='font-bold'>Emne: {epostTittel}</BodyLong>
              {React.createElement('div', {
                dangerouslySetInnerHTML: { __html: epostHtmlBody },
                className: 'prose prose-sm max-w-none',
              })}
            </VStack>
          </Box.New>
        </VStack>
      </VStack>
    </VStack>
  );
};
