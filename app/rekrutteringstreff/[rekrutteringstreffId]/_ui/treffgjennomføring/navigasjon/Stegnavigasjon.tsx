import { HStack } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Stegnavigasjon: FC<Props> = ({ children }) => (
  <HStack gap='space-8' justify='end' wrap>
    {children}
  </HStack>
);

export default Stegnavigasjon;
