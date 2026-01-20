import { Box, Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';

export interface RedigerBoksProps {
  children: ReactNode;
  tittel: string;
}

export default function RedigerBoks({ children, tittel }: RedigerBoksProps) {
  return (
    <Box className='p-4' borderRadius='12' background='neutral-soft'>
      <Heading size='small' className='mb-4'>
        {tittel}
      </Heading>
      {children}
    </Box>
  );
}
