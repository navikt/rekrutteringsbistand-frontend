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
          <div className='mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-[var(--ax-gray-900)]'>
            {ikon}
          </div>
        )}
        <Heading size='small'>{tittel}</Heading>
      </div>
      {children}
    </Box.New>
  );
};

export default GråBoks;
