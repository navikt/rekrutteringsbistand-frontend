import Autolagringsstatus from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Autolagringsstatus';
import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface Props {
  id: string;
  tittel: string;
  beskrivelse: ReactNode;
  lagrer?: boolean;
  feil?: boolean;
  statusmelding?: string | null;
}

const StegHeader: FC<Props> = ({
  id,
  tittel,
  beskrivelse,
  lagrer = false,
  feil = false,
  statusmelding,
}) => (
  <VStack gap='space-8'>
    <HStack gap='space-16' align='center' justify='space-between'>
      <Heading id={id} level='3' size='small'>
        {tittel}
      </Heading>
      <Autolagringsstatus
        lagrer={lagrer}
        feil={feil}
        statusmelding={statusmelding}
      />
    </HStack>
    <BodyShort>{beskrivelse}</BodyShort>
  </VStack>
);

export default StegHeader;
