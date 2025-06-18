import { IFeilmelding } from '../app/components/feilhåndtering/Feilmelding';
import { logger } from '@navikt/next-logger';
import { nanoid } from 'nanoid';

export class rekbisError extends Error {
  public statuskode: number;
  public tittel: string;
  public beskrivelse: string;
  public url: string;
  public id: string;
  public error: unknown;

  constructor({
    statuskode,
    tittel,
    stack,
    beskrivelse,
    url,
    error,
  }: IFeilmelding) {
    super(beskrivelse);
    this.name = this.constructor.name;
    this.statuskode = statuskode ?? 500;
    this.tittel = tittel ?? 'Ukjent feil';
    this.stack = stack || this.stack;
    this.beskrivelse = beskrivelse ?? this.message ?? '';
    this.url = url ?? '';
    this.error = error;
    this.id = nanoid();

    logger.error(
      {
        err: this,
        operationId: this.id,
        endpoint: this.url,
      },
      this.beskrivelse || 'Ukjent beskrivelse',
    );
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statuskode: this.statuskode,
      tittel: this.tittel,
      beskrivelse: this.beskrivelse,
      url: this.url,
      stack: this.stack,
      id: this.id,
    };
  }
}
