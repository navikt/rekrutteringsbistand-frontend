'use client';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { getMiljø, Miljø } from '@/util/miljø';

export interface RekrutteringstreffPilotTilgangProps {
  children: React.ReactNode;
  skjulInnhold?: boolean;
}

export default function RekrutteringstreffPilotTilgang({
  children,
  skjulInnhold,
}: RekrutteringstreffPilotTilgangProps) {
  const { valgtNavKontor, harRolle } = useApplikasjonContext();
  if(getMiljø() === Miljø.ProdGcp) {
    if(harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER])) {
      return children
    }
  } else if(getMiljø() === Miljø.DevGcp) {
    if(harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]) ||
      //((harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]) || harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET])) && (
      ((harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET])) && (
      valgtNavKontor?.navKontor === '1001' || // Kristiansand
      valgtNavKontor?.navKontor === '0403' || // Hamar
      valgtNavKontor?.navKontor === '0602' || // Drammen
      valgtNavKontor?.navKontor === '0135' || // Råde
      valgtNavKontor?.navKontor === '0211' || // Vestby
      valgtNavKontor?.navKontor === '0300'    // Oslo
    ))) {
      return children
    }
  }

  if (skjulInnhold) {
    return null;
  }
  return (
    <div className='mx-auto mt-15'>
      Du har ikke tilgang til rekrutteringstreff.
    </div>
  );
}
