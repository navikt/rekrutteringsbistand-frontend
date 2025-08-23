import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import * as React from 'react';

export interface IRekrutteringstreffFeatureToggle {
  children: React.ReactNode | undefined;
}

const RekrutteringstreffFeatureToggle: React.FC<
  IRekrutteringstreffFeatureToggle
> = ({ children }) => {
  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]}
    >
      {children}
    </TilgangskontrollForInnhold>
  );
};

export default RekrutteringstreffFeatureToggle;
