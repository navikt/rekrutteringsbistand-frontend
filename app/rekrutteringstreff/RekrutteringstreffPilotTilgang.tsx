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

  if (getMiljø() !== Miljø.ProdGcp) {
    return children;
  }

  if (
    valgtNavKontor?.navKontor === '1001' || // Kristiansand
    valgtNavKontor?.navKontor === '1621' || // Ørland
    harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER])
  ) {
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
