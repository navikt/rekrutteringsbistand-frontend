/* eslint-disable @typescript-eslint/no-explicit-any */
import { RekbisError } from '@/util/rekbisError';
import { logger } from '@navikt/next-logger';
import {
  createFetcher,
  hentEsFørsteKilde,
  hentEsKilder,
  type ApiFeilinfo,
  type Nettverksfeilinfo,
  type ValideringsfeilInfo,
} from '@navikt/toi-next-frontend/api';
import { type z } from 'zod';

export interface fetchOptions {
  skjulFeilmelding?: boolean | number | number[]; // bool eller http kode(r)
  queryParams?: URLSearchParams;
}

const getErrorTitle = (statusCode: number): string => {
  switch (true) {
    case statusCode === 400:
      return 'Ugyldig forespørsel';
    case statusCode === 401:
      return 'Ikke autorisert';
    case statusCode === 403:
      return 'Ingen tilgang';
    case statusCode === 404:
      return 'Ressurs ikke funnet';
    case statusCode === 409:
      return 'Konflikt i dataene';
    case statusCode >= 500:
      return 'Serverfeil';
    default:
      return 'Ukjent feil';
  }
};

const fetcher = createFetcher({
  standardvalg: { credentials: 'include' },
  timeoutMs: 30000,
  maxForsøk: 3,
  lagFeil: (info: ApiFeilinfo) =>
    new RekbisError({
      message: getErrorTitle(info.status),
      url: info.url,
      statuskode: info.status,
      details:
        typeof info.detaljer === 'string'
          ? info.detaljer
          : JSON.stringify(info.detaljer),
      skjulLogger: info.skjulFeilmelding,
    }),
  lagNettverksfeil: (info: Nettverksfeilinfo) =>
    new RekbisError({
      message: 'Nettverksfeil: Kunne ikke koble til serveren',
      url: info.url,
      error: info.feil,
      details: `Error type: ${
        info.feil instanceof Error
          ? info.feil.constructor.name
          : typeof info.feil
      }, Message: ${
        info.feil instanceof Error ? info.feil.message : String(info.feil)
      }`,
    }),
  loggValidering: (info: ValideringsfeilInfo) =>
    logger.warn(
      {
        antallFeil: info.antallFeil,
        schema: info.schema,
        zodFeil: info.feil,
        zodFeilTekst: info.feil.map(
          (f) => `${f.sti} → ${f.melding} (kode=${f.kode}, verdi=${f.verdi})`,
        ),
      },
      'Zod-validering feilet',
    ),
});

const tilValg = (options?: fetchOptions) => ({
  queryParams: options?.queryParams,
  skjulFeilmelding: options?.skjulFeilmelding,
});

// Behold appens kontrakt: tomt svar (204/tom body) gir '', ikke undefined
const medTomStreng = (data: any): any => (data === undefined ? '' : data);

export const getAPI = async (
  url: string,
  options?: fetchOptions,
): Promise<any> => medTomStreng(await fetcher.get(url, tilValg(options)));

export const postApi = async (
  url: string,
  body: Record<string, any> | any[],
  options?: fetchOptions,
): Promise<any> =>
  medTomStreng(await fetcher.post(url, body, tilValg(options)));

export const putApi = async (
  url: string,
  body: Record<string, any> | unknown[],
  options?: fetchOptions,
): Promise<any> => medTomStreng(await fetcher.put(url, body, tilValg(options)));

export const deleteApi = async (
  url: string,
  body?: Record<string, any>,
  options?: fetchOptions,
): Promise<any> =>
  medTomStreng(await fetcher.delete(url, body, tilValg(options)));

export const getAPIwithSchema =
  <T>(schema: z.ZodType<T>, options?: fetchOptions) =>
  async (url: string): Promise<T> => {
    const data = await getAPI(url, options);
    return fetcher.validerSchema(schema, data);
  };

type postApiProps = {
  url: string;
  body?: Record<string, any> | any[];
  options?: fetchOptions;
};

export const postApiWithSchema =
  <T>(schema: z.ZodType<T>) =>
  async (props: postApiProps): Promise<T> => {
    const data = await postApi(props.url, props.body ?? {}, props.options);
    return fetcher.validerSchema(schema, data);
  };

export const postApiWithSchemaEs =
  <T>(schema: z.ZodType<T>) =>
  async (props: postApiProps): Promise<T> => {
    const data = await postApi(props.url, props.body ?? {}, props.options);
    return fetcher.validerSchema(schema, hentEsFørsteKilde(data));
  };

export const getApiWithSchemaEs =
  <T>(schema: z.ZodType<T>) =>
  async (props: postApiProps): Promise<T> => {
    const data = await getAPI(props.url);
    return fetcher.validerSchema(schema, hentEsKilder(data));
  };
