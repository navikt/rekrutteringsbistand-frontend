import { Box } from '@navikt/ds-react';
import * as React from 'react';

export interface HvitKortProps {
  children?: React.ReactNode | undefined;
  className?: string;
}

const HvitKort: React.FC<HvitKortProps> = ({ children, className = '' }) => {
  return (
    <Box.New
      borderRadius='xlarge'
      borderColor='info-subtleA'
      background='default'
      className={`min-w-[320px] flex flex-col p-3 px-8 pb-8 m-3 max-w-[1440px] mx-auto w-full ${className} `}
    >
      {children}
    </Box.New>
  );
};

export default HvitKort;
