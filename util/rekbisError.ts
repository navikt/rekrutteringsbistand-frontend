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
        },
  ) {
    // Handle both string and object constructor patterns
    const isString = typeof messageOrOptions === 'string';
    const message = isString ? messageOrOptions : messageOrOptions.message;
    const options = isString
      ? ({} as {
          feilkode?: string;
          url?: string;
          details?: string;
          error?: unknown;
          statuskode?: number;
        })
      : messageOrOptions;

    // Generate feilkode if not provided
    const feilkode = options.feilkode || lagFeilkode();

    // Call super with message
    super(message);

    // Fix prototype chain for instanceof checks
    Object.setPrototypeOf(this, RekbisError.prototype);

    // Capture stack trace properly
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RekbisError);
    }

    // Set properties
    this.name = 'RekbisError';
    this.feilkode = feilkode;
    this.url = options.url || '';
    this.details = options.details || '';
    this.originalError = options.error;
    this.statuskode = options.statuskode;

    // Log the error
    logger.error(
      {
        feilkode: this.feilkode,
        url: this.url,
        statuskode: this.statuskode,
        originalError:
          this.originalError instanceof Error
            ? {
                message: this.originalError.message,
                stack: this.originalError.stack,
              }
            : this.originalError,
      },
      `${message} (${feilkode})`,
    );
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
