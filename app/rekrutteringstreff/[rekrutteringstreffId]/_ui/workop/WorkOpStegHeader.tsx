import WorkOpAutolagringsstatus from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/WorkOpAutolagringsstatus';
import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface Props {
  id: string;
  tittel: string;
  beskrivelse: ReactNode;
  lagrer: boolean;
  feil: boolean;
  kunngjøring?: string | null;
}

// Felles topptekst for WorkOp-stegene: overskrift på linje med en stabil
// autolagringsstatus, og en beskrivelse under. Samles her slik at alle steg
// ser like ut og statusen ikke forskyver innholdet når den endrer seg.
const WorkOpStegHeader: FC<Props> = ({
  id,
  tittel,
  beskrivelse,
  lagrer,
  feil,
  kunngjøring,
}) => (
  <VStack gap='space-8'>
    <HStack gap='space-16' align='center' justify='space-between'>
      <Heading id={id} level='3' size='small'>
        {tittel}
      </Heading>
      <WorkOpAutolagringsstatus
        lagrer={lagrer}
        feil={feil}
        kunngjøring={kunngjøring}
      />
    </HStack>
    <BodyShort>{beskrivelse}</BodyShort>
  </VStack>
);

export default WorkOpStegHeader;
