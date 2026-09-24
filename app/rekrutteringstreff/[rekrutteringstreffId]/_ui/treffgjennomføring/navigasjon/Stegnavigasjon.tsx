import { Button, HStack } from '@navikt/ds-react';
import { FC } from 'react';

interface Tilbakeknapp {
  onClick: () => void;
  deaktivert?: boolean;
}

interface Nesteknapp {
  /** Utelates for innsendingsknapper i skjema. */
  onClick?: () => void;
  tekst?: string;
  deaktivert?: boolean;
  laster?: boolean;
  type?: 'button' | 'submit';
}

interface Props {
  tilbake?: Tilbakeknapp;
  neste?: Nesteknapp;
}

const Stegnavigasjon: FC<Props> = ({ tilbake, neste }) => (
  <HStack gap='space-8' justify='end' wrap>
    {tilbake && (
      <Button
        type='button'
        variant='secondary'
        disabled={tilbake.deaktivert}
        onClick={tilbake.onClick}
      >
        Tilbake
      </Button>
    )}
    {neste && (
      <Button
        type={neste.type ?? 'button'}
        disabled={neste.deaktivert}
        loading={neste.laster}
        onClick={neste.onClick}
      >
        {neste.tekst ?? 'Neste'}
      </Button>
    )}
  </HStack>
);

export default Stegnavigasjon;
