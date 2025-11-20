import { Box } from '@navikt/ds-react';

export interface ListeKortProps {
  children: React.ReactNode;
  className?: string;
}

export default function ListeKort({ children, className }: ListeKortProps) {
  // Hvis vi vil styre kort basert på om det er besøkt:
  // const erBesokt = useWindowAnkerVisited();
  return (
    <Box.New
      tabIndex={0}
      background='neutral-softA'
      padding='5'
      margin='1'
      borderRadius='xlarge'
      data-testid='stillings-kort'
      className={`flex min-w-fit cursor-pointer flex-col focus:ring-1 focus:ring-[var(--ax-border-focus)] focus:ring-offset-2 focus:outline-none ${className ?? ''}`}
    >
      {children}
    </Box.New>
  );
}
