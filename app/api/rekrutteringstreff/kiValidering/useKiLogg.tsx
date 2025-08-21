'use client';

import { getAPI } from '../../fetcher';
import { kiLoggMock } from '../[...slug]/mocks/KiLoggMock';
import { Response } from 'miragejs';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

export const KI_BASE = '/api/rekrutteringstreff/ki';
export const kiLoggEndepunkt = `${KI_BASE}/logg`;

const KiLoggSchema = z.object({
  id: z.string(),
  opprettetTidspunkt: z.string(),
  treffId: z.string(),
  tittel: z.string().nullable(),
  feltType: z.string(),
  spørringFraFrontend: z.string(),
  spørringFiltrert: z.string(),
  systemprompt: z.string().nullable(),
  ekstraParametreJson: z.string().nullable(),
  bryterRetningslinjer: z.boolean(),
  begrunnelse: z.string().nullable(),
  kiNavn: z.string(),
  kiVersjon: z.string(),
  svartidMs: z.number(),
  lagret: z.boolean(),
  manuellKontrollBryterRetningslinjer: z.boolean().nullable(),
  manuellKontrollUtfortAv: z.string().nullable(),
  manuellKontrollTidspunkt: z.string().nullable(),
});

export type KiLogg = z.infer<typeof KiLoggSchema>;
const ListSchema = z.array(KiLoggSchema);

const listFetcher = async (url: string): Promise<KiLogg[]> => {
  const res = await getAPI(url);
  return ListSchema.parse(res);
};

type SetManuellArg = { id: string; bryterRetningslinjer: boolean };

// POST som ikke forventer respons-body (204 OK)
const postNoContent = async (url: string, body: unknown) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body ?? {}),
  });
  if (!res.ok) throw new Error('Serverfeil');
};

const postManuell = async (_: string, { arg }: { arg: SetManuellArg }) => {
  const { id, bryterRetningslinjer } = arg;
  await postNoContent(`${kiLoggEndepunkt}/${id}/manuell`, {
    bryterRetningslinjer,
  });
};

export const useKiLogg = (treffId?: string, feltType?: string) => {
  const query = new URLSearchParams();
  if (treffId) query.set('treffId', treffId);
  if (feltType) query.set('feltType', feltType);

  const key = treffId ? `${kiLoggEndepunkt}?${query.toString()}` : null;

  const swr = useSWR<KiLogg[]>(key, listFetcher, { revalidateOnFocus: false });

  const {
    trigger: setManuell,
    isMutating: settingManuell,
    error: manuellError,
  } = useSWRMutation(`${kiLoggEndepunkt}/manuell`, postManuell);

  const refresh = async () => {
    if (key) await swr.mutate();
  };

  const setManuellAndRefresh = async (arg: SetManuellArg) => {
    await setManuell(arg);
    await refresh();
  };

  return {
    ...swr,
    setManuell: setManuellAndRefresh,
    settingManuell,
    manuellError,
  };
};

// Mirage (forenklet, i samme fil)
export const manuellEndepunkt = (id: string | ':id' = ':id') =>
  `${kiLoggEndepunkt}/${id}/manuell`;
export const lagretEndepunkt = (id: string | ':id' = ':id') =>
  `${kiLoggEndepunkt}/${id}/lagret`;

export const listKiLoggMirage = (server: any) => {
  return server.get(kiLoggEndepunkt, () => kiLoggMock);
};

export const oppdaterKiLoggManuellMirage = (server: any) => {
  return server.post(manuellEndepunkt(':id'), () => new Response(204));
};

export const oppdaterKiLoggLagretMirage = (server: any) => {
  return server.post(lagretEndepunkt(':id'), () => new Response(204));
};
