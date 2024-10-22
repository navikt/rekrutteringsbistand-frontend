import { Search } from '@navikt/ds-react';
import * as React from 'react';
import Arbeidsønsker from './Arbeidsønsker';
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
        <Arbeidsønsker />
      </div>
      <div>
        <KandidatStedSøk />
      </div>
    </div>
  );
};

export default KandidatSøkSidebar;
