import { logger } from '@navikt/next-logger';
import { IFeilmelding } from '../app/components/feilhåndtering/Feilmelding';

export class rekbisError extends Error {
  public statuskode: number;
  public tittel: string;
  public beskrivelse: string;
  public url: string;

  constructor({ statuskode, tittel, stack, beskrivelse, url }: IFeilmelding) {
    super(beskrivelse);
    this.name = this.constructor.name;
    this.statuskode = statuskode ?? 500;
    this.tittel = tittel ?? 'Ukjent feil';
    this.stack = stack || this.stack;
    this.beskrivelse = beskrivelse ?? '';
    this.url = url ?? '';

    logger.error(`RekBis Error: ${this.tittel} (${this.statuskode})`, {
      beskrivelse: this.beskrivelse,
      url: this.url,
      stack: this.stack,
    });
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
    };
  }
}
