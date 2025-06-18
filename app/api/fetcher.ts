import { rekbisError } from '../../util/rekbisError';
import { logger } from '@navikt/next-logger';
import { z, ZodSchema } from 'zod';

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
  skjulFeilmelding?: boolean,
): ((url: string) => Promise<T>) => {
  return async (url: string) => {
    const data = await getAPI(url, skjulFeilmelding);
    return validerSchema(schema, data);
  };
};

export const getAPI = async (url: string, skjulFeilmelding?: boolean) => {
  const response = await fetch(basePath + url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorDetails = '';
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      try {
        const errorData = await response.json();
        errorDetails = JSON.stringify(errorData);
      } catch (error) {
        // FIX: Properly structured metadata object
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

    if (!skjulFeilmelding) {
      throw new rekbisError({
        url: response.url,
        statuskode: response.status,
        tittel: getErrorTitle(response.status),
        beskrivelse: `Feil ved henting av data: ${response.status} ${response.statusText}`,
        stack: errorDetails,
      });
    }

    return response;
  }
  if (response.ok) {
    return await response.json();
  } else {
    throw new rekbisError({
      beskrivelse: `Feil respons fra server: (http-status: ${response.status})`,
    });
  }
};

export const postApi = async (
  url: string,
  body: any,
  queryParams?: URLSearchParams,
) => {
  try {
    // Build URL with query params
    if (queryParams) {
      const queryString = new URLSearchParams(queryParams).toString();
      url += `?${queryString}`;
    }

    const response = await fetch(basePath + url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body, (_key, value) =>
        value instanceof Set ? [...value] : value,
      ),
    });

    if (!response.ok) {
      let errorDetails = '';
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        try {
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
        } catch (error) {
          // JSON parsing failed, fall back to plain text
          logger.warn(
            'Failed to parse error response as JSON despite content-type header',
            error,
          );
          errorDetails = await response.text();
        }
      } else {
        errorDetails = await response.text();
      }

      throw new rekbisError({
        statuskode: response.status,
        tittel: getErrorTitle(response.status),
        beskrivelse: `Request failed with status: ${response.status} ${response.statusText}`,
        url: response.url,
        stack: errorDetails,
      });
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else if (contentType && contentType.includes('text/plain')) {
      return await response.text();
    } else {
      try {
        return await response.json();
      } catch (error) {
        throw new rekbisError({
          beskrivelse: 'Error in postApi response.json():',
          url: response.url,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
  } catch (error) {
    if (!(error instanceof rekbisError)) {
      throw new rekbisError({
        statuskode: 0,
        tittel: 'Nettverksfeil',
        beskrivelse: 'Kunne ikke koble til serveren',
        url: basePath + url,
        error: error,
      });
    }
    throw error;
  }
};

export const putApi = async (
  url: string,
  body: any,
  queryParams?: URLSearchParams,
) => {
  try {
    // Build URL with query params
    if (queryParams) {
      const queryString = new URLSearchParams(queryParams).toString();
      url += `?${queryString}`;
    }

    const response = await fetch(basePath + url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body, (_key, value) =>
        value instanceof Set ? [...value] : value,
      ),
    });

    if (!response.ok) {
      let errorDetails = '';
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        try {
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
        } catch (error) {
          // JSON parsing failed, fall back to plain text
          logger.warn(
            'Failed to parse error response as JSON despite content-type header',
            error,
          );
          errorDetails = await response.text();
        }
      } else {
        errorDetails = await response.text();
      }

      throw new rekbisError({
        statuskode: response.status,
        tittel: getErrorTitle(response.status),
        beskrivelse: `Request failed with status: ${response.status} ${response.statusText}`,
        url: response.url,
        stack: errorDetails,
      });
    }

    return response.json();
  } catch (error) {
    if (!(error instanceof rekbisError)) {
      throw new rekbisError({
        statuskode: 0,
        tittel: 'Nettverksfeil',
        beskrivelse: 'Kunne ikke koble til serveren',
        url: basePath + url,
        error: error,
      });
    }
    throw error;
  }
};

export const postApiResponse = (url: string, body: any) =>
  fetch(basePath + url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

export type postApiProps = {
  url: string;
  body?: any;
  queryParams?: string;
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
    const data: any = await postApi(props.url, props.body);
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
    const data = await postApi(
      props.queryParams ? props.url + `?${props.queryParams}` : props.url,
      props.body,
    );
    return validerSchema(schema, data);
  };
};

export const deleteApi = async (url: string) => {
  const response = await fetch(basePath + url, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    let errorDetails;

    if (contentType?.includes('application/json')) {
      const errorData = await response.json();
      errorDetails = JSON.stringify(errorData);
    } else {
      errorDetails = await response.text();
    }

    throw new rekbisError({
      url: response.url,
      statuskode: response.status,
      stack: errorDetails,
    });
  }

  return response.ok;
};
