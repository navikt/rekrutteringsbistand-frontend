import { Loader } from '@navikt/ds-react';
import * as React from 'react';

export interface ISidelaster {
  children?: React.ReactNode | undefined;
}

const Sidelaster: React.FC<ISidelaster> = ({ children }) => {
  return (
    <div className='flex justify-center pt-10'>
      <Loader size='xlarge' title='Laster...' />
    </div>
  );
};

export default Sidelaster;
