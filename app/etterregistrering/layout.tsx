import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = { title: sidetittel('Etterregistreringer') };

export interface layoutProps {
  children?: ReactNode | undefined;
}

const FormidlingerLayout: FC<layoutProps> = ({ children }) => {
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
