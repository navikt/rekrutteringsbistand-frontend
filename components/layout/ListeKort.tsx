import { Box } from '@navikt/ds-react';

export interface ListeKortProps {
  children: React.ReactNode;
  className?: string;
  varsel?: boolean;
}

export default function ListeKort({
  children,
  className,
  varsel,
}: ListeKortProps) {
  // Hvis vi vil styre kort basert på om det er besøkt:
  // const erBesokt = useWindowAnkerVisited();
  return (
    <Box
      tabIndex={0}
      background={varsel ? 'warning-soft' : 'neutral-softA'}
      borderColor={varsel ? 'warning-subtle' : 'neutral'}
      borderWidth={varsel ? '1' : '0'}
      padding='space-20'
      margin='space-4'
      borderRadius='12'
      data-testid='stillings-kort'
      className={`flex cursor-pointer flex-col focus:ring-1 focus:ring-[var(--ax-border-focus)] focus:ring-offset-2 focus:outline-none ${className ?? ''}`}
    >
      {children}
    </Box>
  );
}
