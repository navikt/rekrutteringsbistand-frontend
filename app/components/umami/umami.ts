import { logger } from '@navikt/next-logger';
import { useRouter } from 'next/navigation';

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

export const tilUmamiNavigate = async (
  props: UmamiProps,
  url: string,
  router: ReturnType<typeof useRouter>,
) => {
  tilUmami(props);
  setTimeout(() => {
    if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      router.push(url);
    }
  }, 150);
};

export const tilUmami = async (props: UmamiProps): Promise<void> => {
  const { domene, event, data } = props;

  if (window.umami) {
    const screenInfo = getScreenInfo();
    return new Promise<void>((resolve, reject) => {
      try {
        const timeoutId = setTimeout(() => {
          console.warn('Umami tracking timed out');
          resolve();
        }, 150);

        if (window.umami)
          window.umami.track(event, {
            ...data,
            ...screenInfo,
            domene,
          });

        clearTimeout(timeoutId);
        resolve();
      } catch (error) {
        logger.error('Kunne ikke logge til umami', error);
        reject(error);
      }
    });
  } else {
    logger.warn('Fant ikke umami i window', { url: window.location.href });
    return Promise.resolve();
  }
};
