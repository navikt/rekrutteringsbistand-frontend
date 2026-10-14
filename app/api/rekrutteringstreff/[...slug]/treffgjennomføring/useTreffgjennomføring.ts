import { treffgjennomføringEndepunkt } from './treffgjennomføringEndepunkter';
import { TreffgjennomføringSchema } from './treffgjennomføringSchema';
import { useSWRGet } from '@/app/api/useSWRGet';

export const useTreffgjennomføring = (
  rekrutteringstreffId: string | undefined,
) =>
  useSWRGet(
    rekrutteringstreffId
      ? treffgjennomføringEndepunkt(rekrutteringstreffId)
      : null,
    TreffgjennomføringSchema,
  );
