'use client';

import type { Møtedagsregistreringer } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import { BodyLong, Button, ErrorMessage, List, Modal } from '@navikt/ds-react';
import type { FC } from 'react';

const entallEllerFlertall = (
  antall: number,
  entall: string,
  flertall: string,
) => `${antall} ${antall === 1 ? entall : flertall}`;

/**
 * Gjør registreringene om til punktene dialogen lister opp, for eksempel
 * «3 ønskede arbeidsgivere». Kategorier med null registreringer utelates, så
 * lista bare nevner det som faktisk slettes.
 *
 * Eksportert for å kunne testes uten å rendre modalen.
 */
export const beskrivRegistreringer = (
  registreringer: Møtedagsregistreringer,
): string[] => {
  const punkter: string[] = [];
  if (registreringer.ønsker > 0) {
    punkter.push(
      entallEllerFlertall(
        registreringer.ønsker,
        'ønsket arbeidsgiver',
        'ønskede arbeidsgivere',
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
        'vurdering etter speedintervju',
        'vurderinger etter speedintervju',
      ),
    );
  }
  return punkter;
};

interface Props {
  åpen: boolean;
  /**
   * Hvem oppmøtet fjernes for, bøyd så den passer i «for {omtale}» – enten et
   * navn eller en mengde, for eksempel «3 jobbsøkere».
   */
  omtale: string;
  registreringer: Møtedagsregistreringer;
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
        Dette sletter registreringene for {omtale} i møtedagen:
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
