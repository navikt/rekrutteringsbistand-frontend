import { Box, Heading } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

export interface GråBoksProps {
  children?: ReactNode | undefined;
  ikon?: ReactNode | undefined;
  tittel: string;
  className?: string;
}

const GråBoks: FC<GråBoksProps> = ({ children, ikon, tittel, className }) => {
  return (
    <Box.New
      background='neutral-softA'
      borderRadius='xlarge'
      padding='4'
      className={className}
    >
      <div className='mb-4 flex items-center'>
        {ikon && (
          <Box.New
            borderRadius={'full'}
            background={'brand-blue-moderate'}
            className='mr-3 flex h-10 w-10 items-center justify-center p-2.5 text-(--ax-text-accent)'
          >
            {ikon}
          </Box.New>
        )}
        <Heading size='small'>{tittel}</Heading>
      </div>
      {children}
    </Box.New>
  );
};

export default GråBoks;
