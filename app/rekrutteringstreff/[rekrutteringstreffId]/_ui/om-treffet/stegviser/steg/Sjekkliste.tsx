import { CheckmarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Box } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

export const SjekklisteContainer: FC<{ children: ReactNode }> = ({
  children,
}) => (
  <div className='flex-1'>
    <Box.New padding='6' borderRadius='large' className='mb-4'>
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

export const SjekklisteSeparator = () => (
  <div className='border-b border-border-subtle my-4'></div>
);

export const SjekklisteInfoRad: FC<{ children: ReactNode }> = ({
  children,
}) => <div className='my-4'>{children}</div>;
