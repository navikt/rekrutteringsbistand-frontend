import IntervjufordelingListe, {
  type IntervjufordelingListeProps,
} from './IntervjufordelingListe';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import { Box, ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import type { FC } from 'react';

type Props = Omit<IntervjufordelingListeProps, 'seksjon'>;

const IntervjufordelingKort: FC<Props> = (props) => {
  const { fordeling, arbeidsgiver } = props;
  const headingId = `intervjufordeling-${arbeidsgiver.arbeidsgiverTreffId}`;
  const antallJobbsøkere =
    fordeling.inkludertePersonTreffIder.length +
    fordeling.ekskludertePersonTreffIder.length;

  return (
    <ExpansionCard
      aria-labelledby={headingId}
      defaultOpen={antallJobbsøkere > 0}
    >
      <ExpansionCard.Header>
        <ExpansionCard.Title id={headingId} as='h4'>
          <AvkortetTekst maksLinjer={2}>{arbeidsgiver.navn}</AvkortetTekst>
        </ExpansionCard.Title>
        <ExpansionCard.Description>
          {fordeling.inkludertePersonTreffIder.length} med ·{' '}
          {fordeling.ekskludertePersonTreffIder.length} ikke med
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <ExpansionCard.Content className='[&>.aksel-expansioncard\_\_content-inner]:min-w-0'>
        <VStack gap='space-16'>
          <section aria-labelledby={`${headingId}-inkluderte`}>
            <Heading
              id={`${headingId}-inkluderte`}
              level='5'
              size='xsmall'
              spacing
            >
              Med på speedintervju
            </Heading>
            <IntervjufordelingListe {...props} seksjon='inkludert' />
          </section>
          <Box
            as='section'
            aria-labelledby={`${headingId}-ekskluderte`}
            borderColor='warning'
            borderWidth='2 0 0 0'
            paddingBlock='space-12 space-0'
          >
            <Heading
              id={`${headingId}-ekskluderte`}
              level='5'
              size='xsmall'
              spacing
            >
              Skal ikke delta på speedintervju
            </Heading>
            <IntervjufordelingListe {...props} seksjon='ekskludert' />
          </Box>
        </VStack>
      </ExpansionCard.Content>
    </ExpansionCard>
  );
};

export default IntervjufordelingKort;
