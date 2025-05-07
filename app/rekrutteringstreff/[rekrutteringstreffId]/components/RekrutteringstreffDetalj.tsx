import { Box, Heading } from '@navikt/ds-react';
import * as React from 'react';

interface RekrutteringstreffDetaljerProps {
  tittelIkon: React.ReactNode;
  tittel: string;
  knapp: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const RekrutteringstreffDetalj: React.FC<RekrutteringstreffDetaljerProps> = ({
  tittelIkon,
  tittel,
  knapp,
  className,
  children,
}) => {
  return (
    <Box.New
      background='raised'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='6'
      marginBlock='2'
      className={className}
    >
      <div className='flex items-center justify-between mb-4'>
        <div className='flex gap-2'>
          {tittelIkon}
          <Heading level='3' size='xsmall'>
            {tittel}
          </Heading>
        </div>
        <div>{knapp}</div>
      </div>
      <div>{children}</div>
    </Box.New>
  );
};

export default RekrutteringstreffDetalj;
