'use client';

import type { Treffgjennomføringsregistreringer } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import { BodyLong, Button, ErrorMessage, List, Modal } from '@navikt/ds-react';
import type { FC } from 'react';

const entallEllerFlertall = (
  antall: number,
  entall: string,
  flertall: string,
) => `${antall} ${antall === 1 ? entall : flertall}`;

export const beskrivRegistreringer = (
  registreringer: Treffgjennomføringsregistreringer,
): string[] => {
  const punkter: string[] = [];
  if (registreringer.interesser > 0) {
    punkter.push(
      entallEllerFlertall(
        registreringer.interesser,
        'registrert interesse',
        'registrerte interesser',
      ),
    );
  }
  if (registreringer.intervjuplasser > 0) {
    punkter.push(
      entallEllerFlertall(
        registreringer.intervjuplasser,
        'plass i intervjufordelingen',
        'plasser i intervjufordelingen',
      ),
    );
  }
  if (registreringer.vurderinger > 0) {
    punkter.push(
      entallEllerFlertall(
        registreringer.vurderinger,
        'vurdering',
        'vurderinger',
      ),
    );
  }
  return punkter;
};

interface Props {
  åpen: boolean;
  omtale: string;
  registreringer: Treffgjennomføringsregistreringer;
  lagrer: boolean;
  feil?: string | null;
  onBekreft: () => void;
  onAvbryt: () => void;
}

export const FjernOppmøteBekreftelse: FC<Props> = ({
  åpen,
  omtale,
  registreringer,
  lagrer,
  feil,
  onBekreft,
  onAvbryt,
}) => (
  <Modal
    open={åpen}
    onClose={onAvbryt}
    header={{ heading: `Fjerne oppmøtet for ${omtale}?` }}
    width='small'
  >
    <Modal.Body>
      <BodyLong spacing>
        Dette sletter registreringene for {omtale} i treffgjennomføringen:
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
