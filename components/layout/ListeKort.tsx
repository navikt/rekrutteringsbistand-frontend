import { Box } from '@navikt/ds-react';

export interface ListeKortProps {
  children: React.ReactNode;
  className?: string;
}

export default function ListeKort({ children, className }: ListeKortProps) {
  return (
    <Box.New
      tabIndex={0}
      background='neutral-softA'
      padding='5'
      margin='1'
      borderRadius='xlarge'
      data-testid='stillings-kort'
      className={
        `  flex flex-col min-w-fit
          focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[var(--ax-border-focus)]
   cursor-pointer ` + className
      }
    >
      {children}
    </Box.New>
  );
}
