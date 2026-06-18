import { Box } from '@navikt/ds-react';
import { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

export interface FormidlingKortProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  role?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
}

/**
 * Klikkbar variant av ListeKort med dropdown-oppførsel for formidlingsraden.
 * Holdt adskilt fra det delte ListeKort for å unngå å endre felleskomponenten.
 */
export default function FormidlingKort({
  children,
  className,
  onClick,
  onKeyDown,
  role,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
}: FormidlingKortProps) {
  return (
    <Box
      tabIndex={0}
      background='neutral-softA'
      borderColor='neutral'
      borderWidth='0'
      padding='space-20'
      margin='space-4'
      borderRadius='12'
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={`flex cursor-pointer flex-col focus:ring-2 focus:ring-[var(--ax-border-focus)] focus:ring-offset-2 focus:outline-none ${className ?? ''}`}
    >
      {children}
    </Box>
  );
}
