'use client';
import * as React from 'react';
import { format } from 'date-fns';
import { RekrutteringstreffKort } from './components/RekrutteringstreffKort';
import { useRekrutteringstreffOversikt } from '@/app/api/rekrutteringstreff/useRekrutteringstreffOversikt';
import SWRLaster from '../components/SWRLaster';

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
            rekrutteringstreff.tilTid
          );
          return (
            <RekrutteringstreffKort
              key={rekrutteringstreff.id}
              dato={dato.startDato}
              tidspunkt={`${dato.startTidspunkt} - ${dato.sluttTidspunkt}`}
              antallArbeidsgivere={0}
              tittel={rekrutteringstreff.tittel}
              beskrivelse="Rekrutteringstreff"
              sted="Oslo"
              opprettetAv={rekrutteringstreff.opprettetAvPersonNavident}
              opprettetDato="12. April"
              navKontor={rekrutteringstreff.opprettetAvNavkontorEnhetId}
              erPublisert={false}
            />
          );
        })
      }
    </SWRLaster>
  );
};

const datoFormatterer = (
  startTid: number | undefined,
  sluttTid: number | undefined
): Dato => {
  if (startTid === undefined || sluttTid === undefined) {
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

type Dato = {
  startDato: string;
  startTidspunkt: string;
  sluttDato: string;
  sluttTidspunkt: string;
};

export default RekrutteringstreffSøk;
