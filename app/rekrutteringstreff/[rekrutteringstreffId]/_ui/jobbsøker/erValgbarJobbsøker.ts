import { JobbsøkerSøkTreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';

export const erValgbarJobbsøker = (
  jobbsøker: Pick<JobbsøkerSøkTreffDTO, 'status'>,
) => jobbsøker.status === JobbsøkerStatus.LAGT_TIL;
