'use client';
import ForlengOppdrag from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/forleng-oppdrag/ForlengOppdrag';
import { BodyLong, Box, Heading, HStack } from '@navikt/ds-react';

export default function ForlengOppdragBanner() {
  return (
    <Box background='info-soft' borderRadius='12' padding='space-16'>
      <HStack justify='space-between' align='center' gap='space-16'>
        <div>
          <Heading size='small' level='3'>
            Siste visningsdato er passert
          </Heading>
          <BodyLong>
            Oppdraget er merket som stengt for søkere. Folk kan fortsatt finne
            det ved å filtrere i søket. Andre kan ikke foreslå jobbsøkere.
          </BodyLong>
        </div>
        <ForlengOppdrag />
      </HStack>
    </Box>
  );
}
