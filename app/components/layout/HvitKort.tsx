import { Box } from '@navikt/ds-react';
import * as React from 'react';

export interface HvitKortProps {
  children?: React.ReactNode | undefined;
  className?: string;
  id?: string;
}

const HvitKort: React.FC<HvitKortProps> = ({
  id,
  children,
  className = '',
}) => {
  return (
    <div className='m-3'>
      <Box.New
        id={id}
        borderRadius='xlarge'
        borderColor='info-subtleA'
        background='default'
        className={`min-w-[320px] flex flex-col p-3 px-8 pb-8  w-full h-[98vh] overflow-auto  ${className} `}
      >
        <div className='max-w-[1440px] mx-auto w-full'>{children}</div>
      </Box.New>
    </div>
  );
};

export default HvitKort;
