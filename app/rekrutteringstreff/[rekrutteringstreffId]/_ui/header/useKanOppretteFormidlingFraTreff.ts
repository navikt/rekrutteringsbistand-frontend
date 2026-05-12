import { useErTreffEier } from '../useErTreffEier';
import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { useAntallEgneJobbsøkereForFormidling } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkereForFormidling';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';

export const useKanOppretteFormidlingFraTreff = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffData();
  const erEier = useErTreffEier();
  const { harRolle } = useApplikasjonContext();
  const harFormidlingRolle = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
  ]);
  const { data: egneData } = useAntallEgneJobbsøkereForFormidling(
    rekrutteringstreffId,
    !erEier && harFormidlingRolle,
  );

  return erEier || ((egneData?.totalt ?? 0) > 0 && harFormidlingRolle);
};
