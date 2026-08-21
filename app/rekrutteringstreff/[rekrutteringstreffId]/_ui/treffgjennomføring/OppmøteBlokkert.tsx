'use client';

import type { Treffgjennomføringsregistreringer } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import { BodyLong, Button, List, Modal } from '@navikt/ds-react';
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
      `${entallEllerFlertall(
        registreringer.interesser,
        'registrert interesse',
        'registrerte interesser',
      )} (steg 3)`,
    );
  }
  if (registreringer.vurderinger > 0) {
    punkter.push(
      `${entallEllerFlertall(
        registreringer.vurderinger,
        'registrert status',
        'registrerte statuser',
      )} (steg 5)`,
    );
  }
  return punkter;
};

interface Props {
  åpen: boolean;
  omtale: string;
  registreringer: Treffgjennomføringsregistreringer;
  onLukk: () => void;
}

export const OppmøteBlokkert: FC<Props> = ({
  åpen,
  omtale,
  registreringer,
  onLukk,
}) =>
  !åpen ? null : (
    <Modal
      open
      onClose={onLukk}
      header={{ heading: `Kan ikke fjerne oppmøtet for ${omtale}` }}
      width='small'
    >
      <Modal.Body>
        <BodyLong spacing>
          Dette er registrert i treffgjennomføringen og må fjernes først:
        </BodyLong>
        <List>
          {beskrivRegistreringer(registreringer).map((punkt) => (
            <List.Item key={punkt}>{punkt}</List.Item>
          ))}
        </List>
        <BodyLong>
          Rydd nedenfra og opp: nullstill statusen i steg 5 og fjern interessene
          i steg 3. Intervjuplassene forsvinner sammen med interessene, og da
          kan oppmøtet fjernes.
        </BodyLong>
      </Modal.Body>
      <Modal.Footer>
        <Button type='button' variant='secondary' onClick={onLukk}>
          Lukk
        </Button>
      </Modal.Footer>
    </Modal>
  );
