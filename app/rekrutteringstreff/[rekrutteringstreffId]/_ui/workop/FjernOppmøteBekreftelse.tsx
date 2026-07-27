'use client';

import {
  beskrivRegistreringer,
  type Møtedagsregistreringer,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/møtedagsregistreringer';
import { BodyLong, Button, ErrorMessage, List, Modal } from '@navikt/ds-react';
import type { FC } from 'react';

interface Props {
  åpen: boolean;
  jobbsøkernavn: string;
  registreringer: Møtedagsregistreringer;
  lagrer: boolean;
  feil?: string | null;
  onBekreft: () => void;
  onAvbryt: () => void;
}

export const FjernOppmøteBekreftelse: FC<Props> = ({
  åpen,
  jobbsøkernavn,
  registreringer,
  lagrer,
  feil,
  onBekreft,
  onAvbryt,
}) => (
  <Modal
    open={åpen}
    onClose={onAvbryt}
    header={{ heading: `Fjerne oppmøtet for ${jobbsøkernavn}?` }}
    width='small'
  >
    <Modal.Body>
      <BodyLong spacing>
        Dette sletter registreringene for jobbsøkeren i møtedagen:
      </BodyLong>
      <List>
        {beskrivRegistreringer(registreringer).map((punkt) => (
          <List.Item key={punkt}>{punkt}</List.Item>
        ))}
      </List>
      <BodyLong>Handlingen kan ikke angres.</BodyLong>
      {feil && <ErrorMessage className='mt-4'>{feil}</ErrorMessage>}
    </Modal.Body>
    <Modal.Footer>
      <Button
        type='button'
        variant='danger'
        loading={lagrer}
        onClick={onBekreft}
      >
        Fjern oppmøtet
      </Button>
      <Button
        type='button'
        variant='secondary'
        disabled={lagrer}
        onClick={onAvbryt}
      >
        Avbryt
      </Button>
    </Modal.Footer>
  </Modal>
);
