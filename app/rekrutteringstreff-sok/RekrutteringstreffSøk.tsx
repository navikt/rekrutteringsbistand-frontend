'use client';
import * as React from 'react';
import { RekrutteringstreffKort } from './components/RekrutteringstreffKort';
import { useRekrutteringstreffOversikt } from '@/app/api/rekrutteringstreff/useRekrutteringstreffOversikt';

export interface RekrutteringstreffSøkProps {
  children?: React.ReactNode | undefined;
}

const RekrutteringstreffSøk: React.FC<RekrutteringstreffSøkProps> = ({
  children,
}) => {
  const { data: rekrutteringstreffOversikt, isLoading } =
    useRekrutteringstreffOversikt();

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
            beskrivelse={'Rekrutteringstreff'}
            sted={'Oslo'}
            opprettetAv={rekrutteringstreff.opprettetAvPersonNavident}
            opprettetDato={'12. April'}
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
  const startDato = new Date(startTidspunkt); // Konverter til millisekund
  const sluttDato = new Date(sluttTidspunkt); // Konverter til millisekund

  const formatertStartDato = startDato.toLocaleDateString('no-NO'); // Formater dato til norsk format
  const formatertStartTid = startDato.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' }); // Formater dato til norsk format

  const formatertSluttDato = sluttDato.toLocaleDateString('no-NO'); // Formater dato til norsk format
  const formatertSluttTid = sluttDato.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' }); // Formater dato til norsk format

  return {
    startDato: formatertStartDato,
    startTidspunkt: formatertStartTid,
    sluttDato: formatertSluttDato,
    sluttTidspunkt: formatertSluttTid,
  };
};

type Dato = {
  startDato: string;
  startTidspunkt: string;
  sluttDato: string;
  sluttTidspunkt: string;
};

export default RekrutteringstreffSøk;
