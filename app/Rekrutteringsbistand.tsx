'use client';
import * as React from 'react';
import { useBruker } from './api/bruker/useBruker';
import { useDecoratorData } from './api/decorator/useDecoratorData';
import MirageInitializer from './components/MirageInitializer';
import Sidelaster from './components/Sidelaster';

export interface RekrutteringsbistandProps {
  children?: React.ReactNode | undefined;
}

const Rekrutteringsbistand: React.FC<RekrutteringsbistandProps> = ({
  children,
}) => {
  const brukerHook = useBruker();
  const dekoratørHook = useDecoratorData();

  if (brukerHook.isLoading || dekoratørHook.isLoading) {
    return <Sidelaster />;
  }

  return <MirageInitializer>kake</MirageInitializer>;
};

export default Rekrutteringsbistand;
