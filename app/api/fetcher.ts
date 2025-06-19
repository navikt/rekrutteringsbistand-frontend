import { RekbisError } from '../../util/rekbisError';
import { logger } from '@navikt/next-logger';
import { z, ZodSchema } from 'zod';

interface fetchOptions {
  skjulFeilmelding?: boolean | number; // bool eller http kode
  queryParams?: URLSearchParams;
}

export const getErrorTitle = (statusCode: number): string => {
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

const basePath = process.env.NAIS_CLUSTER_NAME === 'local' ? '' : '';

const buildUrl = (url: string, queryParams?: URLSearchParams): string => {
  if (queryParams) {
    const queryString = new URLSearchParams(queryParams).toString();
    return `${url}?${queryString}`;
  }
  return url;
};

const handleErrorResponse = async (
  response: Response,
  options?: fetchOptions,
): Promise<void> => {
  if (response.ok) return;

  let errorDetails = '';
  const contentType = response.headers.get('content-type');

  // Extract error details from response
  if (contentType && contentType.includes('application/json')) {
    try {
      const errorData = await response.json();
      errorDetails = JSON.stringify(errorData);
    } catch (error) {
      logger.warn(
        'Failed to parse error response as JSON despite content-type header',
        {
          url: response.url,
          status: response.status,
          error: error instanceof Error ? error.message : String(error),
        },
      );
      errorDetails = await response.text();
    }
  } else {
    errorDetails = await response.text();
  }

  // Determine if error should be hidden based on skjulFeilmelding
  const shouldHideError =
    typeof options?.skjulFeilmelding === 'number'
      ? response.status === options.skjulFeilmelding
      : !!options?.skjulFeilmelding;

  if (!shouldHideError) {
    throw createRekbisError({
      url: response.url,
      statuskode: response.status,
      message: getErrorTitle(response.status),
      details: errorDetails,
    });
  }
};

const createRekbisError = (params: {
  message: string;
  url: string;
  statuskode?: number;
  details?: string;
  error?: unknown;
}): RekbisError => {
  return new RekbisError({
    message: params.message,
    url: params.url,
    statuskode: params.statuskode,
    details: params.details,
    error: params.error,
  });
};

/**
 * Extracts response data based on content type
 */
const extractResponseData = async (response: Response): Promise<any> => {
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else if (contentType && contentType.includes('text/plain')) {
    return await response.text();
  } else {
    try {
      return await response.json();
    } catch (error) {
      throw createRekbisError({
        statuskode: response.status,
        message: 'Error extracting response data:',
        url: response.url,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
};

const validerSchema = <T>(schema: ZodSchema<T>, data: any) => {
  // return schema.parse(data);
  // TODO Midlertidig løsning for å unngå så mange feil ved feil schema:
  const zodResult = schema.safeParse(data);
  if (zodResult.error) {
    logger.warn('ZodError encountered during schema validation', {
      error: zodResult.error.message,
      issues: zodResult.error.issues.map((issue) => ({
        code: issue.code,
        path: issue.path,
        message: issue.message,
      })),
    });
  }
  return data;
};

export const getAPIwithSchema = <T>(
  schema: ZodSchema<T>,
  options?: fetchOptions,
): ((url: string) => Promise<T>) => {
  return async (url: string) => {
    const data = await getAPI(url, options);
    return validerSchema(schema, data);
  };
};

export const getAPI = async (url: string, options?: fetchOptions) => {
  try {
    const fullUrl = buildUrl(url, options?.queryParams);

    const response = await fetch(basePath + fullUrl, {
      method: 'GET',
      credentials: 'include',
    });

    await handleErrorResponse(response, options);

    if (response.ok) {
      return await response.json();
    }

    return response;
  } catch (error) {
    if (!(error instanceof RekbisError)) {
      throw createRekbisError({
        message: 'Nettverksfeil: Kunne ikke koble til serveren',
        url: basePath + url,
        error,
      });
    }
    throw error;
  }
};

export const postApi = async (
  url: string,
  body: any,
  options?: fetchOptions,
) => {
  try {
    const fullUrl = buildUrl(url, options?.queryParams);

    const response = await fetch(basePath + fullUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body, (_key, value) =>
        value instanceof Set ? [...value] : value,
      ),
    });

    await handleErrorResponse(response, options);
    return await extractResponseData(response);
  } catch (error) {
    if (!(error instanceof RekbisError)) {
      throw createRekbisError({
        message: 'Nettverksfeil: Kunne ikke koble til serveren',
        url: basePath + url,
        error,
      });
    }
    throw error;
  }
};

export const putApi = async (
  url: string,
  body: any,
  options?: fetchOptions,
) => {
  try {
    const fullUrl = buildUrl(url, options?.queryParams);

    const response = await fetch(basePath + fullUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body, (_key, value) =>
        value instanceof Set ? [...value] : value,
      ),
    });

    await handleErrorResponse(response, options);
    return await extractResponseData(response);
  } catch (error) {
    if (!(error instanceof RekbisError)) {
      throw createRekbisError({
        message: 'Nettverksfeil: Kunne ikke koble til serveren',
        url: basePath + url,
        error,
      });
    }
    throw error;
  }
};

export type postApiProps = {
  url: string;
  body?: any;
  options?: fetchOptions;
};

const esResponseDto = z.object({
  hits: z.object({
    hits: z.array(
      z.object({
        _source: z.any(),
      }),
    ),
  }),
});

export const postApiWithSchemaEs = <T>(
  schema: ZodSchema<T>,
): ((props: postApiProps) => Promise<T>) => {
  return async (props) => {
    const data: any = await postApi(props.url, props.body, props.options);
    const parsedData = esResponseDto.parse(data);
    return validerSchema(schema, parsedData.hits.hits[0]._source);
  };
};

export const getApiWithSchemaEs = <T>(
  schema: ZodSchema<T>,
): ((props: postApiProps) => Promise<T>) => {
  return async (props) => {
    const data: any = await getAPI(props.url);
    const parsedData = esResponseDto.parse(data);
    const mappedData = parsedData.hits.hits.map((hit) => hit._source);
    return validerSchema(schema, mappedData);
  };
};

export const postApiWithSchema = <T>(
  schema: ZodSchema<T>,
): ((props: postApiProps) => Promise<T>) => {
  return async (props) => {
    const data = await postApi(props.url, props.body, props.options);
    return validerSchema(schema, data);
  };
};

export const deleteApi = async (url: string, options?: fetchOptions) => {
  try {
    const fullUrl = buildUrl(url, options?.queryParams);

    const response = await fetch(basePath + fullUrl, {
      method: 'DELETE',
      credentials: 'include',
    });

    await handleErrorResponse(response, options);
    return response.ok;
  } catch (error) {
    if (!(error instanceof RekbisError)) {
      throw createRekbisError({
        message: 'Nettverksfeil: Kunne ikke koble til serveren',
        url: basePath + url,
        error,
      });
    }
    throw error;
  }
};
