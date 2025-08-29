import { Box, Heading } from '@navikt/ds-react';
import React from 'react';

export interface RedigerBoksProps {
  children: React.ReactNode;
  tittel: string;
}

export default function RedigerBoks({ children, tittel }: RedigerBoksProps) {
  return (
    <Box.New className='p-4' borderRadius='xlarge' background='neutral-soft'>
      <Heading size='small' className='mb-4'>
        {tittel}
      </Heading>
      {children}
    </Box.New>
  );
}
