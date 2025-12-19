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
  undertekst?: string;
  smsTekst: string;
  epostTittel: string;
  epostHtmlBody: string;
}

export const MeldingsmalVisning = ({
  tittel,
  undertekst,
  smsTekst,
  epostTittel,
  epostHtmlBody,
}: MeldingsmalVisningProps) => {
  return (
    <VStack gap='4'>
      {(tittel || undertekst) && (
        <VStack gap='1'>
          {tittel && (
            <Heading level='3' size='small'>
              {tittel}
            </Heading>
          )}
          {undertekst && <BodyShort textColor='subtle'>{undertekst}</BodyShort>}
        </VStack>
      )}

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
            <BodyLong size='small' className='whitespace-pre-line'>
              {smsTekst}
            </BodyLong>
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
            <BodyShort size='small' weight='semibold'>
              Emne: {epostTittel}
            </BodyShort>
            {/* Overskriver uønskede defaults for p-elementer i HTML-innholdet */}
            <div
              dangerouslySetInnerHTML={{ __html: epostHtmlBody }}
              className='text-sm [&_p]:mt-2 [&_p]:mb-0 [&_p:first-child]:mt-0'
            />
          </VStack>
        </Box.New>
      </VStack>
    </VStack>
  );
};
