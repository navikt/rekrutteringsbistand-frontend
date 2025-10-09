'use client';

import { kiLoggMock } from './kiLoggMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPI, putApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';
import { Response } from 'miragejs';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

export const kiBase = (
  id: string | ':rekrutteringstreffId' = ':rekrutteringstreffId',
) => `${RekrutteringstreffAPI.internUrl}/${id}/ki`;
export const kiLoggEndepunkt = (
  id: string | ':rekrutteringstreffId' = ':rekrutteringstreffId',
) => `${kiBase(id)}/logg`;

const KiLoggSchema = z.object({
  id: z.string(),
  opprettetTidspunkt: z.string(),
  treffId: z.string(),
  tittel: z.string().nullable(),
  feltType: z.string(),
  spørringFraFrontend: z.string(),
  spørringFiltrert: z.string(),
  systemprompt: z.string().nullable(),
  bryterRetningslinjer: z.boolean(),
  begrunnelse: z.string().nullable(),
  kiNavn: z.string(),
  kiVersjon: z.string(),
  svartidMs: z.number(),
  lagret: z.boolean(),
  manuellKontrollBryterRetningslinjer: z.boolean().nullable(),
  manuellKontrollUtfortAv: z.string().nullable(),
  manuellKontrollTidspunkt: z.string().nullable(),
  promptVersjonsnummer: z.number().nullable(),
  promptEndretTidspunkt: z.string().nullable(),
  promptHash: z.string().nullable(),
});

export type KiLogg = z.infer<typeof KiLoggSchema>;
const ListSchema = z.array(KiLoggSchema);

const listFetcher = async (url: string): Promise<KiLogg[]> => {
  try {
    const res = await getAPI(url);
    return ListSchema.parse(res);
  } catch (error) {
    logger.error(error, `Feil ved henting av KI-logg fra ${url}`);
    throw error;
  }
};

type SetManuellArg = { id: string; bryterRetningslinjer: boolean | null };
const putManuell =
  (treffId: string) =>
  async (_: string, { arg }: { arg: SetManuellArg }) => {
    const { id, bryterRetningslinjer } = arg;
    try {
      await putApi(`${kiLoggEndepunkt(treffId)}/${id}/manuell`, {
        bryterRetningslinjer,
      });
    } catch (error) {
      logger.error(
        error,
        `Feil ved oppdatering av manuell vurdering for KI-logg ${id}`,
      );
      throw error;
    }
  };

type SetLagretArg = { id: string; lagret: boolean | null };
const putLagret =
  (treffId: string) =>
  async (_: string, { arg }: { arg: SetLagretArg }) => {
    const { id, lagret } = arg;
    try {
      await putApi(`${kiLoggEndepunkt(treffId)}/${id}/lagret`, { lagret });
    } catch (error) {
      logger.error(
        error,
        `Feil ved oppdatering av lagret-status for KI-logg ${id}`,
      );
      throw error;
    }
  };

export const useKiLogg = (treffId?: string, feltType?: string) => {
  const query = new URLSearchParams();
  if (feltType) query.set('feltType', feltType);

  const key = treffId
    ? `${kiLoggEndepunkt(treffId)}${query.toString() ? `?${query.toString()}` : ''}`
    : null;

  const swr = useSWR<KiLogg[]>(key, listFetcher, { revalidateOnFocus: false });

  const {
    trigger: setManuell,
    isMutating: settingManuell,
    error: manuellError,
  } = useSWRMutation(
    `${kiLoggEndepunkt(treffId ?? ':rekrutteringstreffId')}/manuell`,
    putManuell(treffId ?? ':rekrutteringstreffId'),
  );

  const {
    trigger: setLagret,
    isMutating: settingLagret,
    error: lagretError,
  } = useSWRMutation(
    `${kiLoggEndepunkt(treffId ?? ':rekrutteringstreffId')}/lagret`,
    putLagret(treffId ?? ':rekrutteringstreffId'),
  );

  const refresh = async (): Promise<KiLogg[] | undefined> => {
    return (await swr.mutate()) as KiLogg[] | undefined;
  };

  const setManuellAndRefresh = async (arg: SetManuellArg) => {
    await setManuell(arg);
    await refresh();
  };

  const setLagretAndRefresh = async (arg: SetLagretArg) => {
    await setLagret(arg);
    await refresh();
  };

  return {
    ...swr,
    setManuell: setManuellAndRefresh,
    settingManuell,
    manuellError,
    setLagret: setLagretAndRefresh,
    settingLagret,
    lagretError,
    refresh,
  };
};

export const manuellEndepunkt = (
  rekrutteringstreffId:
    | string
    | ':rekrutteringstreffId' = ':rekrutteringstreffId',
  id: string | ':id' = ':id',
) => `${kiLoggEndepunkt(rekrutteringstreffId)}/${id}/manuell`;
export const lagretEndepunkt = (
  rekrutteringstreffId:
    | string
    | ':rekrutteringstreffId' = ':rekrutteringstreffId',
  id: string | ':id' = ':id',
) => `${kiLoggEndepunkt(rekrutteringstreffId)}/${id}/lagret`;

export const listKiLoggMirage = (server: any) => {
  return server.get(kiLoggEndepunkt(':rekrutteringstreffId'), () => kiLoggMock);
};

export const oppdaterKiLoggManuellMirage = (server: any) => {
  return server.put(
    manuellEndepunkt(':rekrutteringstreffId', ':id'),
    () => new Response(204),
  );
};

export const oppdaterKiLoggLagretMirage = (server: any) => {
  return server.put(
    lagretEndepunkt(':rekrutteringstreffId', ':id'),
    () => new Response(204),
  );
};
