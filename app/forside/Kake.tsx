import * as React from 'react';
import { useForesporselOmdelingAvCV } from '../api/foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV';
import SWRLaster from '../../components/SWRLaster';
import { Button } from '@navikt/ds-react';

export interface KakeProps {
  children?: React.ReactNode | undefined;
}

const Kake: React.FC<KakeProps> = ({ children }) => {
  const hook = useForesporselOmdelingAvCV({
    navKontor: '123',
    fraOgMed: new Date(),
    tilOgMed: new Date(),
  });

  return (
    <SWRLaster hook={hook} skeleton={null}>
      {(data) => (
        <div>
          {' '}
          <Button> {data.antallSvartJa} </Button>
        </div>
      )}
    </SWRLaster>
  );
};

export default Kake;
