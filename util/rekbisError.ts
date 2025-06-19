import { IFeilmelding } from '../app/components/feilhåndtering/Feilmelding';
import { logger } from '@navikt/next-logger';
import { nanoid } from 'nanoid';

export class RekbisError extends Error {
  public tittel: string = 'Ukjent feil';
  public beskrivelse: string = '';
  public url: string = '';
  public feilkode: string = nanoid();
  public error: unknown;

  constructor({
    tittel,
    stack,
    beskrivelse,
    error,
    feilkode,
    url,
  }: IFeilmelding) {
    // If the error is already a RekbisError, don't wrap it
    if (error instanceof RekbisError) {
      return error;
    }

    super(beskrivelse || 'Ukjent feil');
    this.name = this.constructor.name;
    this.tittel = tittel ?? 'Ukjent feil';
    this.stack = stack || this.stack;
    this.beskrivelse = beskrivelse ?? this.message ?? '';
    this.url = url ?? '';
    this.error = error;
    this.feilkode = feilkode || nanoid();

    logger.error(
      {
        err: this,
        operationId: this.feilkode,
        endpoint: this.url,
        originalError:
          this.error instanceof Error
            ? { message: this.error.message, stack: this.error.stack }
            : this.error,
      },
      this.beskrivelse || 'Ukjent beskrivelse',
    );
  }

  // Helper method to ensure we have a RekbisError
  static ensure(error: unknown, defaultMessage?: string): RekbisError {
    if (error instanceof RekbisError) {
      return error;
    }

    return new RekbisError({
      beskrivelse:
        defaultMessage ||
        (error instanceof Error ? error.message : 'En feil har oppstått'),
      error: error,
    });
  }
}
