import { HStack } from '@navikt/ds-react';
import { ReactNode } from 'react';

export default function Markeringsrad({ children }: { children: ReactNode }) {
  return (
    <HStack
      align='center'
      gap='space-4 space-8'
      marginInline='space-20 space-0'
      wrap
    >
      {children}
    </HStack>
  );
}
