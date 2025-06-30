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

interface SjekklisteRadProps {
  erOppfylt: boolean;
  kanKlikkes: boolean;
  onClick: () => void;
  label: string;
  handlingstekst?: string;
  ariaLabel: string;
}

export const SjekklisteRad: React.FC<SjekklisteRadProps> = ({
  erOppfylt,
  kanKlikkes,
  onClick,
  label,
  handlingstekst,
  ariaLabel,
}) => (
  <div
    onClick={() => kanKlikkes && onClick()}
    onKeyDown={(e) => {
      if (kanKlikkes && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    }}
    className={`flex items-center justify-between my-4 ${
      kanKlikkes
        ? 'cursor-pointer hover:bg-[var(--ax-bg-neutral-moderate-hover)] rounded'
        : ''
    }`}
    role={kanKlikkes ? 'button' : undefined}
    tabIndex={kanKlikkes ? 0 : undefined}
    aria-label={ariaLabel}
  >
    <div className='flex items-center gap-2'>
      <div className='w-5 h-5 border-2 rounded-full flex items-center justify-center border-blue-400 text-blue-400'>
        {erOppfylt && <CheckmarkIcon fontSize='1rem' />}
      </div>
      <BodyShort>{label}</BodyShort>
    </div>
    {kanKlikkes && handlingstekst && (
      <BodyShort className='text-blue-400 px-1'>{handlingstekst}</BodyShort>
    )}
  </div>
);

export const SjekklisteSeparator = () => (
  <div className='border-b border-border-subtle my-4'></div>
);

export const SjekklisteInfoRad: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className='my-4'>{children}</div>;
