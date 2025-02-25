'use client';
import * as React from 'react';
import { format } from 'date-fns';
import { RekrutteringstreffKort } from './components/RekrutteringstreffKort';
import { useRekrutteringstreffOversikt } from '@/app/api/rekrutteringstreff/useRekrutteringstreffOversikt';

export interface RekrutteringstreffSøkProps {
  children?: React.ReactNode;
}

const RekrutteringstreffSøk: React.FC<RekrutteringstreffSøkProps> = ({ children }) => {
  const { data: rekrutteringstreffOversikt, isLoading } = useRekrutteringstreffOversikt();

  if (isLoading || !rekrutteringstreffOversikt) {
    return <div>Laster...</div>;
  }

  return (
    <div>
      {rekrutteringstreffOversikt.map((rekrutteringstreff) => {
        const dato: Dato = datoFormatterer(
          rekrutteringstreff?.fraTid,
          rekrutteringstreff?.tilTid,
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
      })}
    </div>
  );
};

const datoFormatterer = (
  startTidspunkt: string | undefined,
  sluttTidspunkt: string | undefined,
) => {
  if (!startTidspunkt || !sluttTidspunkt) {
    return {
      startDato: 'Ukjent dato',
      startTidspunkt: 'Ukjent tidspunkt',
      sluttDato: 'Ukjent dato',
      sluttTidspunkt: 'Ukjent tidspunkt',
    };
  }
  const startDate = new Date(startTidspunkt);
  const sluttDate = new Date(sluttTidspunkt);

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
