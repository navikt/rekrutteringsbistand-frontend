import { Search } from '@navikt/ds-react';
import * as React from 'react';
import KandidatStedSøk from './KandidatStedSøk';

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
          placeholder='Søk i arbeidsønsker'
          hideLabel={false}
          label='Arbeidsønsker'
          variant='secondary'
        />
      </div>
      <div>
        <KandidatStedSøk />
      </div>
    </div>
  );
};

export default KandidatSøkSidebar;
