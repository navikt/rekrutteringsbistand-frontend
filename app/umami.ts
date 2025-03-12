import { logger } from '@navikt/next-logger';

export enum UmamiDomene {
  Generell = 'Generell',
  Forside = 'Forside',
  Stilling = 'Stilling',
  Kandidat = 'Kandidat',
  Etterregistrering = 'Etterregistrering',
  Rekrutteringstreff = 'Rekrutteringstreff',
}

export interface UmamiProps {
  domene: UmamiDomene;
  event: string;
  data?: Record<string, string>;
}

const getScreenInfo = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};

  return {
    screenWidth: window.innerWidth.toString(),
    screenHeight: window.innerHeight.toString(),
  };
};

export const tilUmami = (props: UmamiProps) => {
  const { domene, event, data } = props;

  if (window.umami) {
    const screenInfo = getScreenInfo();
    window.umami.track(`[${domene}] ${event}`, {
      ...data,
      ...screenInfo,
      domene,
    });
  } else {
    logger.warn('Fant ikke umami i window', { url: window.location.href });
  }
};
