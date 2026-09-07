import { treffgjennomføringEndepunkt } from './treffgjennomføringEndepunkter';
import { TreffgjennomføringSchema } from './treffgjennomføringSchema';
import { treffgjennomføringErAktivert } from './treffgjennomføringTilgjengelighet';
import { useSWRGet } from '@/app/api/useSWRGet';

export const useTreffgjennomføring = (
  rekrutteringstreffId: string | undefined,
) =>
  useSWRGet(
    rekrutteringstreffId && treffgjennomføringErAktivert()
      ? treffgjennomføringEndepunkt(rekrutteringstreffId)
      : null,
    TreffgjennomføringSchema,
  );
