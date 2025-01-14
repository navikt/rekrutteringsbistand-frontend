import * as React from 'react';
import { RekrutteringstreffKort } from './components/RekrutteringstreffKort';

export interface RekrutteringstreffSøkProps {
  children?: React.ReactNode | undefined;
}

const RekrutteringstreffSøk: React.FC<RekrutteringstreffSøkProps> = ({
  children,
}) => {
  return (
    <div>
      <RekrutteringstreffKort
        dato={'12. April'}
        tidspunkt={'10:00 - 14:00'}
        antallArbeidsgivere={0}
        tittel={'Rekrutteringstreff'}
        beskrivelse={'Rekrutteringstreff'}
        sted={'Oslo'}
        opprettetAv={'Nav'}
        opprettetDato={'12. April'}
        navKontor={'Oslo'}
        erPublisert={false}
      />
    </div>
  );
};

export default RekrutteringstreffSøk;
