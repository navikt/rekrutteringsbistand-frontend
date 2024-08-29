import { Search } from '@navikt/ds-react';
import * as React from 'react';

export interface IKandidatSøkSidebar {
  children?: React.ReactNode | undefined;
}

const KandidatSøkSidebar: React.FC<IKandidatSøkSidebar> = ({ children }) => {
  return (
    <React.Fragment>
      <div className='mb-4'>
        <Search
          hideLabel={false}
          label='Søk etter kandidat'
          variant='primary'
        />
      </div>
      <div className='mb-4'>
        <Search
          description='Hva ønsker kandidaten å jobbe med?'
          hideLabel={false}
          label='Arbeidsønsker'
          variant='secondary'
        />
      </div>
      <div className='mb-4'>
        <Search
          description='Hvor ønsker kandidaten å jobbe?'
          hideLabel={false}
          label='Sted'
          variant='secondary'
        />
      </div>
    </React.Fragment>
  );
};

export default KandidatSøkSidebar;
