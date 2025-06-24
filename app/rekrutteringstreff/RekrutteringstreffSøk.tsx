'use client';

import SWRLaster from '../components/SWRLaster';
import { RekrutteringstreffKort } from './components/RekrutteringstreffKort';
import { useRekrutteringstreffOversikt } from '@/app/api/rekrutteringstreff/useRekrutteringstreffOversikt';
import { format } from 'date-fns';
import * as React from 'react';

export interface RekrutteringstreffSøkProps {
  children?: React.ReactNode;
}

const RekrutteringstreffSøk: React.FC<RekrutteringstreffSøkProps> = () => {
  const rekrutteringstreffOversiktHook = useRekrutteringstreffOversikt();

  return (
    <SWRLaster hooks={[rekrutteringstreffOversiktHook]}>
      {(rekrutteringstreffOversikt) =>
        rekrutteringstreffOversikt.map((rekrutteringstreff) => {
          const dato: Dato = datoFormatterer(
            rekrutteringstreff.fraTid,
            rekrutteringstreff.tilTid,
          );

          return (
            <RekrutteringstreffKort
              key={rekrutteringstreff.id}
              id={rekrutteringstreff.id}
              dato={dato.startDato}
              tidspunkt={`${dato.startTidspunkt} - ${dato.sluttTidspunkt}`}
              antallArbeidsgivere={0}
              tittel={rekrutteringstreff.tittel}
              beskrivelse={rekrutteringstreff.beskrivelse}
              gateadresse={rekrutteringstreff.gateadresse || ''}
              postnummer={rekrutteringstreff.postnummer || ''}
              poststed={rekrutteringstreff.poststed || ''}
              opprettetAv={rekrutteringstreff.opprettetAvPersonNavident}
              opprettetDato='12. April'
              navKontor={rekrutteringstreff.opprettetAvNavkontorEnhetId}
            />
          );
        })
      }
    </SWRLaster>
  );
};

export const datoFormatterer = (startTid?: string, sluttTid?: string): Dato => {
  if (!startTid || !sluttTid) {
    return {
      startDato: 'Ukjent dato',
      startTidspunkt: 'Ukjent tidspunkt',
      sluttDato: 'Ukjent dato',
      sluttTidspunkt: 'Ukjent tidspunkt',
    };
  }
  const startDate = new Date(startTid);
  const sluttDate = new Date(sluttTid);

  return {
    startDato: format(startDate, 'dd.MM.yyyy'),
    startTidspunkt: format(startDate, 'HH:mm'),
    sluttDato: format(sluttDate, 'dd.MM.yyyy'),
    sluttTidspunkt: format(sluttDate, 'HH:mm'),
  };
};

export type Dato = {
  startDato: string;
  startTidspunkt: string;
  sluttDato: string;
  sluttTidspunkt: string;
};

export default RekrutteringstreffSøk;
