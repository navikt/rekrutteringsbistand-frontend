import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import * as React from 'react';

export interface layoutProps {
  children?: React.ReactNode | undefined;
}

const FormidlingerLayout: React.FC<layoutProps> = ({ children }) => {
  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      {children}
    </TilgangskontrollForInnhold>
  );
};

export default FormidlingerLayout;
