import { logger } from '@navikt/next-logger';

export enum UmamiDomene {
  App = 'App',
  Forside = 'Forside',
  Stilling = 'Stilling',
  Kandidat = 'Kandidat',
  Formidling = 'Formidling',
  Rekrutteringstreff = 'Rekrutteringstreff',
}

interface UmamiProps {
  domene: UmamiDomene;
  event: string;
  data: Record<string, string>;
}

export const tilUmami = (props: UmamiProps) => {
  const { domene, event, data } = props;

  if (window.umami) {
    window.umami.track(`[${domene}] ${event}`, { ...data, domene: domene });
  } else {
    logger.warn('Fant ikke umami i window', { url: window.location.href });
  }
};
