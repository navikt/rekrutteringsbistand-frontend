'use client';

import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Link } from '@navikt/ds-react';
import { FC } from 'react';

const KiLoggLenke: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]}
    >
      <Link href={`/rekrutteringstreff/${rekrutteringstreffId}/kilogg`}>
        KI Logg
      </Link>
    </TilgangskontrollForInnhold>
  );
};

export default KiLoggLenke;
