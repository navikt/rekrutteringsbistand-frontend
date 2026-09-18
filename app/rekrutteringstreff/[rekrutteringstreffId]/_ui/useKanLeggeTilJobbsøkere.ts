import {
  type RekrutteringstreffDTO,
  useRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { erEierAvTreff } from '@/app/rekrutteringstreff/_utils/eiere';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';

export function kanLeggeTilJobbsøkere(
  treff: Pick<RekrutteringstreffDTO, 'kategori' | 'eierOgKontor'>,
  ident: string,
  erUtvikler: boolean,
) {
  return (
    treff.kategori !== RekrutteringstreffKategori.WORKOP ||
    erEierAvTreff(treff.eierOgKontor, ident) ||
    erUtvikler
  );
}

export function useKanLeggeTilJobbsøkere(rekrutteringstreffId?: string) {
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const { brukerData, harRolle } = useApplikasjonContext();

  return (
    !!treff &&
    kanLeggeTilJobbsøkere(
      treff,
      brukerData.ident,
      harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]),
    )
  );
}
