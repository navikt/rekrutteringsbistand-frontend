import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import {
  bareTotaltAntallParams,
  useJobbsøkereForFormidling,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkereForFormidling';

export const useKanOppretteFormidlingFraTreff = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffData();
  const { data } = useJobbsøkereForFormidling(
    rekrutteringstreffId,
    bareTotaltAntallParams,
    { skjulFeilmelding: 403 },
  );
  return (data?.totalt ?? 0) > 0;
};
