import { logger } from '@navikt/next-logger';
import { customAlphabet } from 'nanoid';

const lagFeilkode = customAlphabet('1234567890abcdefghijklmnopqrstuvw', 10);

/**
 * Error class for handling application errors
 * Can be used with simple message like: new RekbisError('Something failed')
 * Or with options: new RekbisError({ message: 'Failed', url: '/path', feilkode: 'ABC123' })
 */
export class RekbisError extends Error {
  public feilkode: string;
  public details: string;
  public url: string;
  public statuskode?: number;
  public originalError?: unknown;
  public skjulLogger: boolean;

  constructor(
    messageOrOptions:
      | string
      | {
          message: string;
          details?: string;
          feilkode?: string;
          url?: string;
          error?: unknown;
          statuskode?: number;
          skjulLogger?: boolean;
        },
  ) {
    // Håndter både streng- og objekt-konstruktørmønstre
    const isString = typeof messageOrOptions === 'string';
    const message = isString ? messageOrOptions : messageOrOptions.message;
    const options = isString
      ? ({} as {
          feilkode?: string;
          url?: string;
          details?: string;
          error?: unknown;
          statuskode?: number;
          skjulLogger?: boolean;
        })
      : messageOrOptions;

    // Generer feilkode hvis ikke oppgitt
    const feilkode = options.feilkode || lagFeilkode();

    // Kall super med melding
    super(message);

    // Fiks prototypekjeden for instanceof-sjekker
    Object.setPrototypeOf(this, RekbisError.prototype);

    // Fang opp stack trace korrekt
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RekbisError);
    }

    // Sett egenskaper
    this.name = 'RekbisError';
    this.feilkode = feilkode;
    // Hvis url ikke er satt, bruk current location i browser (unngå crash på SSR)
    this.url =
      options.url ??
      (typeof window !== 'undefined' && window.location
        ? window.location.href
        : '');
    this.details = options.details || '';
    this.originalError = options.error;
    this.statuskode = options.statuskode;
    this.skjulLogger = options.skjulLogger || false;

    // Logg feilen
    if (!this.skjulLogger) {
      const logData = {
        feilkode: this.feilkode,
        url: this.url,
        statuskode: this.statuskode,
        details: this.details,
        error:
          this.originalError instanceof Error
            ? {
                message: this.originalError.message,
                stack: this.originalError.stack,
                name: this.originalError.name,
              }
            : this.originalError,
      };
      const logMelding = `${message} (${feilkode})`;

      if (this.statuskode === 401 || this.statuskode === 403) {
        logger.info(logData, logMelding);
      } else {
        logger.error(logData, logMelding);
      }
    }
  }

  /**
   * Ensures that an error is a RekbisError
   * @param error Any error object
   * @param defaultMessage Optional default message if error doesn't have a message
   */
  static ensure(
    error: unknown,
    defaultMessage = 'En ukjent feil har oppstått',
  ): RekbisError {
    if (error instanceof RekbisError) {
      return error;
    }

    let statuskode: number | undefined;
    if (error instanceof Response) {
      statuskode = error.status;
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error
    ) {
      statuskode = Number(error.status) || undefined;
    }

    if (error instanceof Error) {
      return new RekbisError({
        message: error.message,
        error,
        statuskode,
      });
    }

    return new RekbisError({
      message: defaultMessage,
      error,
      statuskode,
    });
  }
}
