import { Search } from '@navikt/ds-react';
import * as React from 'react';

export interface IKandidatSøkSidebar {
  children?: React.ReactNode | undefined;
}

const KandidatSøkSidebar: React.FC<IKandidatSøkSidebar> = ({ children }) => {
  return (
    <div className='grid gap-4'>
      <div>
        <Search
          hideLabel={false}
          label='Søk etter kandidat'
          variant='primary'
        />
      </div>
      <div>
        <Search
          description='Hva ønsker kandidaten å jobbe med?'
          hideLabel={false}
          label='Arbeidsønsker'
          variant='secondary'
        />
      </div>
      <div>
        <Search
          description='Hvor ønsker kandidaten å jobbe?'
          hideLabel={false}
          label='Sted'
          variant='secondary'
        />
      </div>
    </div>
  );
};

export default KandidatSøkSidebar;
