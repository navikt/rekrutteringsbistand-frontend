import { RekbisError } from '../../util/rekbisError';
import { logger } from '@navikt/next-logger';
import { z, ZodSchema } from 'zod';

interface fetchOptions {
  skjulFeilmelding?: boolean | number | number[]; // bool eller http kode(r)
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

  // Clone the response before reading it to avoid the "Already read" error
  const responseClone = response.clone();

  // Extract error details from response
  if (contentType && contentType.includes('application/json')) {
    try {
      const errorData = await response.json();
      errorDetails = JSON.stringify(errorData);
    } catch (error) {
      logger.warn(
        {
          url: response.url,
          status: response.status,
          error: error instanceof Error ? error.message : String(error),
        },
        `Failed to parse error response as JSON despite content-type header, from endpoint ${response.url}`,
      );
      // Use the cloned response instead of the original which is already consumed
      errorDetails = await responseClone.text();
    }
  } else {
    errorDetails = await response.text();
  }

  // Determine if error should be hidden based on skjulFeilmelding
  const shouldHideError = (() => {
    const skjulFeilmelding = options?.skjulFeilmelding;

    if (typeof skjulFeilmelding === 'boolean') {
      return skjulFeilmelding; // If true, hide all errors
    } else if (typeof skjulFeilmelding === 'number') {
      return response.status === skjulFeilmelding; // Hide specific status code
    } else if (Array.isArray(skjulFeilmelding)) {
      return skjulFeilmelding.includes(response.status); // Hide if status is in array
    }

    return false; // Default: don't hide errors
  })();

  // IMPORTANT: Changed logic here! Always throw an error when the response is not ok
  // Only modify the error based on whether it should be hidden or not
  throw createRekbisError({
    url: response.url,
    statuskode: response.status,
    message: getErrorTitle(response.status),
    details: errorDetails,
    skjulLogger: shouldHideError,
  });
};

const createRekbisError = (params: {
  message: string;
  url: string;
  statuskode?: number;
  details?: string;
  error?: unknown;
  skjulLogger?: boolean;
}): RekbisError => {
  return new RekbisError({
    message: params.message,
    url: params.url,
    statuskode: params.statuskode,
    details: params.details,
    error: params.error,
    skjulLogger: params.skjulLogger || false,
  });
};

const extractResponseData = async (response: Response): Promise<any> => {
  // Clone the response to avoid "Already read" errors
  const responseClone = response.clone();

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch (error) {
      // If json parsing fails, try using the cloned response
      logger.warn(
        {
          url: response.url,
          status: response.status,
          error: error instanceof Error ? error.message : String(error),
        },
        'Failed to parse response as JSON despite content-type header',
      );
      return await responseClone.text();
    }
  } else if (contentType && contentType.includes('text/plain')) {
    return await response.text();
  } else {
    // For unknown content types, try JSON first then fall back to text
    try {
      return await response.json();
    } catch {
      try {
        return await responseClone.text();
      } catch (secondError) {
        throw createRekbisError({
          statuskode: response.status,
          message: 'Error extracting response data:',
          url: response.url,
          error:
            secondError instanceof Error
              ? secondError.message
              : String(secondError),
        });
      }
    }
  }
};
const validerSchema = <T>(schema: ZodSchema<T>, data: any) => {
  // return schema.parse(data);
  // TODO Midlertidig løsning for å unngå så mange feil ved feil schema:
  const zodResult = schema.safeParse(data);
  if (zodResult.error) {
    logger.info(
      {
        error: zodResult.error.message,
        issues: zodResult.error.issues.map((issue) => ({
          code: issue.code,
          path: issue.path,
          message: issue.message,
        })),
      },
      'ZodError encountered during schema validation',
    );
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

    // Only use extractResponseData, remove the response.ok check
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

    // Only use extractResponseData, remove the response.ok check
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

    // Only use extractResponseData, remove the response.ok check
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

    // Only use extractResponseData, remove the response.ok check
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
