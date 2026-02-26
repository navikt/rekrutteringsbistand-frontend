import { Box } from '@navikt/ds-react';

export interface InfoBoksProps {
  children: React.ReactNode;
  className?: string;
}

export default function InfoBoks({ children, className }: InfoBoksProps) {
  return (
    <Box
      className={className}
      borderRadius='12'
      borderColor='info-subtleA'
      background='default'
      padding='space-20'
    >
      {children}
    </Box>
  );
}
