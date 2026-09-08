import { Button, LocalAlert } from '@navikt/ds-react';

interface Props {
  henter: boolean;
  onHentPåNytt: () => void;
}

export default function DatagrunnlagFeil({ henter, onHentPåNytt }: Props) {
  return (
    <LocalAlert status='error'>
      <LocalAlert.Header>
        <LocalAlert.Title as='h3'>
          Kunne ikke hente komplett datagrunnlag
        </LocalAlert.Title>
      </LocalAlert.Header>
      <LocalAlert.Content>
        Vi kunne ikke hente alle opplysningene som trengs for denne visningen.
      </LocalAlert.Content>
      <LocalAlert.Content>
        <Button
          type='button'
          variant='secondary'
          loading={henter}
          onClick={onHentPåNytt}
        >
          Hent på nytt
        </Button>
      </LocalAlert.Content>
    </LocalAlert>
  );
}
