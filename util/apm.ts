import type { InitOptions } from '@nais/apm';

export function skjermApmUrl(verdi: string): string {
  try {
    const erRelativ = verdi.startsWith('/');
    const url = new URL(verdi, 'https://apm.invalid');
    if (!erRelativ && !/^https?:\/\//i.test(verdi)) return verdi;

    url.pathname = url.pathname
      .replace(
        /(\/(?:kandidat|kandidater|finn-kandidater)\/)(?!veileder(?:\/|$))[^/]+/g,
        '$1[kandidatId]',
      )
      .replace(/(\/stilling\/[^/]+\/kandidatliste\/)[^/]+/g, '$1[kandidatId]')
      .replace(
        /(\/(?:person|personbruker|personbrukere|jobbsoker)\/)[^/]+/g,
        '$1[personbrukerId]',
      )
      .replace(
        /(\/romfordeling\/)(?!fordel(?:\/|$))[^/]+/g,
        '$1[personbrukerId]',
      );
    url.search = '';
    url.hash = '';
    return erRelativ ? url.pathname : url.toString();
  } catch {
    return verdi;
  }
}

function skjermUrlVerdier(verdi: object): void {
  const felter = verdi as Record<string, unknown>;
  for (const [navn, innhold] of Object.entries(felter)) {
    if (typeof innhold === 'string') {
      felter[navn] = innhold.replace(
        /https?:\/\/[^\s"'<>]+|\/[^\s"'<>]+/g,
        (url) => skjermApmUrl(url),
      );
    } else if (innhold !== null && typeof innhold === 'object') {
      skjermUrlVerdier(innhold);
    }
  }
}

export const skjermApmHendelse: NonNullable<InitOptions['beforeSend']> = (
  hendelse,
) => {
  skjermUrlVerdier(hendelse.meta);
  skjermUrlVerdier(hendelse.payload);
  return hendelse;
};
