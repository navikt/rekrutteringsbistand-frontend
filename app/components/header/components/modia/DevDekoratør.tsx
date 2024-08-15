import { InternalHeader, Spacer } from '@navikt/ds-react';
import * as React from 'react';

export interface IDevDekoratør {
  children?: React.ReactNode | undefined;
}

const DevDekoratør: React.FC<IDevDekoratør> = ({ children }) => {
  return (
    <InternalHeader>
      <InternalHeader.Title as='h1'>
        Rekrutteringsbistand - DEV
      </InternalHeader.Title>
      <Spacer />
      <InternalHeader.User name='Developer' />
    </InternalHeader>
  );
};

export default DevDekoratør;
