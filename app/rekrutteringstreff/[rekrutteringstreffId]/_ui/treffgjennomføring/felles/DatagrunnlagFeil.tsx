import { Button, LocalAlert } from '@navikt/ds-react';

interface Props {
  henter: boolean;
  onHentPåNytt: () => void;
  tittel?: string;
  beskrivelse?: string;
}

export default function DatagrunnlagFeil({
  henter,
  onHentPåNytt,
  tittel = 'Kunne ikke hente komplett datagrunnlag',
  beskrivelse = 'Vi kunne ikke hente alle opplysningene som trengs for denne visningen.',
}: Props) {
  return (
    <LocalAlert status='error'>
      <LocalAlert.Header>
        <LocalAlert.Title as='h3'>{tittel}</LocalAlert.Title>
      </LocalAlert.Header>
      <LocalAlert.Content>{beskrivelse}</LocalAlert.Content>
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
