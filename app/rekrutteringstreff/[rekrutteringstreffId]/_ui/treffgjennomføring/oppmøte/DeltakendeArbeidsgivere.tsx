import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';

interface Props {
  arbeidsgivere: ArbeidsgiverDTO[];
}

export default function DeltakendeArbeidsgivere({ arbeidsgivere }: Props) {
  return (
    <section aria-labelledby='treffgjennomføring-arbeidsgivere-heading'>
      <Heading
        id='treffgjennomføring-arbeidsgivere-heading'
        level='3'
        size='small'
        spacing
      >
        Arbeidsgivere
      </Heading>
      <BodyShort spacing>
        {arbeidsgivere.length}{' '}
        {arbeidsgivere.length === 1
          ? 'arbeidsgiver deltar'
          : 'arbeidsgivere deltar'}
      </BodyShort>
      {arbeidsgivere.length > 0 && (
        <Box background='neutral-soft' borderRadius='8' padding='space-8'>
          <VStack as='ul' gap='space-4'>
            {arbeidsgivere.map((arbeidsgiver) => (
              <Box
                as='li'
                key={
                  arbeidsgiver.arbeidsgiverTreffId ??
                  arbeidsgiver.organisasjonsnummer
                }
                background='neutral-softA'
                padding='space-6'
                borderRadius='8'
              >
                <BodyShort weight='semibold'>
                  <AvkortetTekst>{arbeidsgiver.navn}</AvkortetTekst>
                </BodyShort>
                <BodyShort size='small' className='text-text-subtle'>
                  org.nr. {arbeidsgiver.organisasjonsnummer}
                </BodyShort>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </section>
  );
}
