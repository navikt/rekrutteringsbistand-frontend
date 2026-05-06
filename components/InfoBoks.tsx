import { Box } from '@navikt/ds-react';

export interface InfoBoksProps {
  children: React.ReactNode;
  className?: string;
  varsel?: boolean;
}

export default function InfoBoks({
  children,
  className,
  varsel,
}: InfoBoksProps) {
  return (
    <Box
      className={className}
      borderRadius='12'
      background={varsel ? 'warning-soft' : 'default'}
      borderColor={varsel ? 'warning-subtle' : 'info-subtleA'}
      borderWidth={varsel ? '1' : '0'}
      padding='space-20'
    >
      {children}
    </Box>
  );
}
