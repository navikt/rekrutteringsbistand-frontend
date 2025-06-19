import { IFeilmelding } from '../app/components/feilhåndtering/Feilmelding';
import { logger } from '@navikt/next-logger';
import { customAlphabet } from 'nanoid';

const lagFeilkode = customAlphabet('1234567890abcdefghijklmnopqrstuvw', 10);

export class RekbisError extends Error {
  public tittel: string;
  public beskrivelse: string;
  public url: string;
  public feilkode: string;
  public originalError: unknown;

  constructor({
    tittel = 'Ukjent feil',
    stack,
    beskrivelse = '',
    error,
    feilkode,
    url = '', // Set default here
  }: IFeilmelding) {
    super(beskrivelse);

    if (!feilkode) {
      feilkode = lagFeilkode();
    }

    Object.setPrototypeOf(this, RekbisError.prototype);

    this.name = this.constructor.name;
    this.tittel = tittel;
    this.stack = stack || this.stack;
    this.beskrivelse = beskrivelse;
    this.url = url;
    this.originalError = error;
    this.feilkode = feilkode;

    logger.error({
      name: this.name,
      message:
        this.message ??
        `Feilkode: ${this.feilkode} - ${this.beskrivelse || 'Ukjent beskrivelse'}`,
      stack: this.stack,
      tittel: this.tittel,
      beskrivelse: this.beskrivelse,
      url: this.url,
      feilkode: this.feilkode,
      originalError:
        this.originalError instanceof Error
          ? {
              message: this.originalError.message,
              stack: this.originalError.stack,
            }
          : this.originalError,
    });
  }

  static ensure(error: unknown, defaultMessage?: string): RekbisError {
    if (error instanceof RekbisError) {
      return error;
    }

    let description = defaultMessage;
    if (!description) {
      if (error instanceof Error) {
        description = error.message;
      } else {
        description = 'En ukjent feil har oppstått.';
      }
    }

    return new RekbisError({
      beskrivelse: description,
      error: error,
    });
  }
}
