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
  const {data: rekrutteringstreffOversikt, isLoading} = useRekrutteringstreffOversikt();
  const dato: Dato = datoFormatterer(rekrutteringstreffOversikt?.fraTid, rekrutteringstreffOversikt?.tilTid)
  return (
    <div>
      <RekrutteringstreffKort
        dato={dato.startDato}
        tidspunkt={`${dato.startTidspunkt} - ${dato.sluttTidspunkt}`}
        antallArbeidsgivere={0}
        tittel={rekrutteringstreffOversikt?.tittel ? rekrutteringstreffOversikt.tittel : 'Ukjent tittel'}
        beskrivelse={'Rekrutteringstreff'}
        sted={'Oslo'}
        opprettetAv={rekrutteringstreffOversikt?.opprettetAvPersonNavident ? rekrutteringstreffOversikt.opprettetAvPersonNavident : 'Ukjent Nav-ident'}
        opprettetDato={'12. April'}
        navKontor={rekrutteringstreffOversikt?.opprettetAvNavkontorEnhetId ? rekrutteringstreffOversikt.opprettetAvNavkontorEnhetId : 'Ukjent Nav-kontor'}
        erPublisert={false}
      />
    </div>
  );
};

const datoFormatterer = (startTidspunkt: number | undefined, sluttTidspunkt: number | undefined) => {
  if (!startTidspunkt || !sluttTidspunkt) {
    return {
      startDato: 'Ukjent dato',
      startTidspunkt: 'Ukjent tidspunkt',
      sluttDato: 'Ukjent dato',
      sluttTidspunkt: 'Ukjent tidspunkt',
    }
  }
  const startDato = new Date(startTidspunkt * 1000); // Konverter til millisekund
  const sluttDato = new Date(sluttTidspunkt * 1000); // Konverter til millisekund

  const formatertStartDato = startDato.toLocaleDateString('no-NO'); // Formater dato til norsk format
  const formatertStartTid = startDato.toLocaleTimeString('no-NO'); // Formater dato til norsk format

  const formatertSluttDato = sluttDato.toLocaleDateString('no-NO'); // Formater dato til norsk format
  const formatertSluttTid = sluttDato.toLocaleTimeString('no-NO'); // Formater dato til norsk format

  return {
    startDato: formatertStartDato,
    startTidspunkt: formatertStartTid,
    sluttDato: formatertSluttDato,
    sluttTidspunkt: formatertSluttTid,
  }
}

type Dato = {
  startDato: string,
  startTidspunkt: string,
  sluttDato: string,
  sluttTidspunkt: string,
}

export default RekrutteringstreffSøk;
