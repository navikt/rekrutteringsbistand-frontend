'use client';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { getMiljø, Miljø } from '@/util/miljø';

export interface RekrutteringstreffPilotTilgangProps {
  children: React.ReactNode;
  skjulInnhold?: boolean;
}

const pilotkontorDev = [
  '1001', // Kristiansand
  '0403', // Hamar
  //'0602', // Drammen
  '0135', // Råde
  '0211', // Vestby
  '0300', // Oslo
]

export default function RekrutteringstreffPilotTilgang({
  children,
  skjulInnhold,
}: RekrutteringstreffPilotTilgangProps) {
  const { valgtNavKontor, harRolle } = useApplikasjonContext();
  const pilotTilgang = (harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]) || harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET])) &&
    (valgtNavKontor?.navKontor && pilotkontorDev.includes(valgtNavKontor.navKontor));

  if (getMiljø() === Miljø.ProdGcp) {
    if (harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER])) {
      return children;
    }
  } else if (getMiljø() === Miljø.DevGcp) {
      if (harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]) || pilotTilgang) {
        return children;
      }
  } else if (getMiljø() === Miljø.Lokalt) {
    return children;
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
