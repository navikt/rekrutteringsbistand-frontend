import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface StandardsøkProps {
  children?: React.ReactNode | undefined;
}

const StandardsøkKnapp: React.FC<StandardsøkProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Button variant='secondary' className='w-full'>
        Bruk mitt standardsøk
      </Button>
    </React.Fragment>
  );
};

export default StandardsøkKnapp;
