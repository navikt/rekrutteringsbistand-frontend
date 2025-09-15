import { Box, Heading } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface RekrutteringstreffDetaljerProps {
  tittelIkon: ReactNode;
  tittel: string;
  knapp: ReactNode;
  headingLevel?: '1' | '2' | '3' | '4' | '5' | '6';
  className?: string;
  children?: ReactNode;
}

const RekrutteringstreffDetalj: FC<RekrutteringstreffDetaljerProps> = ({
  tittelIkon,
  tittel,
  knapp,
  headingLevel = '2',
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
          <Heading level={headingLevel} size='small' className='mb-4 text-left'>
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
