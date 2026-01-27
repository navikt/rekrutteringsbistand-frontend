import { Box } from '@navikt/ds-react';

export interface InfoBoksProps {
  children: React.ReactNode;
}

export default function InfoBoks({ children }: InfoBoksProps) {
  return (
    <Box
      borderRadius='12'
      borderColor='info-subtleA'
      background='default'
      padding='space-16'
    >
      {children}
    </Box>
  );
}
