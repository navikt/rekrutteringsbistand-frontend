import { CheckmarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Box } from '@navikt/ds-react';
import * as React from 'react';

export const SjekklisteContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className='flex-1'>
    <Box.New padding='6' borderRadius='large' className='mb-4'>
      <div className='space-y-0'>{children}</div>
    </Box.New>
  </div>
);

export const SjekklisteRad: React.FC<{ erOppfylt: boolean; label: string }> = ({
  erOppfylt,
  label,
}) => (
  <div className='flex items-center justify-between my-4'>
    <div className='flex items-center gap-2'>
      <div className='w-5 h-5 border-2 rounded-full flex items-center justify-center border-blue-400 text-blue-400'>
        {erOppfylt && <CheckmarkIcon fontSize='1rem' />}
      </div>
      <BodyShort>{label}</BodyShort>
    </div>
  </div>
);

export const SjekklisteSeparator = () => (
  <div className='border-b border-border-subtle my-4'></div>
);

export const SjekklisteInfoRad: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className='my-4'>{children}</div>;
