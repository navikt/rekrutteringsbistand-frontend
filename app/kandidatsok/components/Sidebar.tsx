import { Search } from '@navikt/ds-react';
import * as React from 'react';

export interface ISidebar {
  children?: React.ReactNode | undefined;
}

const Sidebar: React.FC<ISidebar> = ({ children }) => {
  return (
    <React.Fragment>
      <form role='search'>
        <Search label='Søk i kandidater' variant='secondary' />
      </form>
    </React.Fragment>
  );
};

export default Sidebar;
