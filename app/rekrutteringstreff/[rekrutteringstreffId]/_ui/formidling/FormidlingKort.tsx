import { Box } from '@navikt/ds-react';
import { ReactNode } from 'react';

export interface FormidlingKortProps {
  children: ReactNode;
  className?: string;
}

/**
 * Variant av ListeKort for formidlingsraden. Utvidelsen styres av en egen
 * knapp i raden, slik at kortet ikke inneholder nestede interaktive elementer.
 */
export default function FormidlingKort({
  children,
  className,
}: FormidlingKortProps) {
  return (
    <Box
      background='neutral-softA'
      borderColor='neutral'
      borderWidth='0'
      padding='space-20'
      margin='space-4'
      borderRadius='12'
      className={`flex flex-col ${className ?? ''}`}
    >
      {children}
    </Box>
  );
}
