import { CheckmarkIcon } from '@navikt/aksel-icons';
import { Box, Heading } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

export const SjekklisteContainer: FC<{ children: ReactNode }> = ({
  children,
}) => (
  <div className='flex-1'>
    <Box.New padding='0' className='mb-4'>
      <Heading level='3' size='small' className='mb-2'>
        Sjekkliste
      </Heading>
      <div className='space-y-0'>{children}</div>
    </Box.New>
  </div>
);

export const SjekklisteRad: FC<{ erOppfylt: boolean; label: string }> = ({
  erOppfylt,
  label,
}) => (
  <div className='flex items-start justify-between my-3 text-sm'>
    <div className='flex items-start gap-2'>
      <span
        aria-hidden
        className={`mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full border ${erOppfylt ? 'bg-[var(--ax-bg-action-selected)] border-[var(--ax-bg-action-selected)] text-[var(--ax-fg-on-inverted)]' : 'border-[var(--ax-border-neutral-subtle)]'}`}
      >
        {erOppfylt && <CheckmarkIcon aria-hidden />}
      </span>
      <span
        className={`${erOppfylt ? 'line-through text-text-subtle' : ''} text-sm`}
      >
        {label}
      </span>
    </div>
  </div>
);

export const SjekklisteInfo: FC<{ children: ReactNode }> = ({ children }) => (
  <div className='my-8'>
    <Box.New background='neutral-soft' borderRadius='large' padding='3'>
      {children}
    </Box.New>
  </div>
);
