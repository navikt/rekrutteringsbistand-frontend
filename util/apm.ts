import type { InitOptions } from '@nais/apm';

const rapporterteFeil = new WeakSet<object>();

// Samme som CONSOLE_ERROR_PREFIX i @nais/apm: logger.error(objekt, melding) uten Error-objekt.
const SYNTETISK_LOGGERFEIL_PREFIX = 'console.error: {';

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

function lagEndepunktNøkkel(url: string): string {
  return skjermApmUrl(new URL(url, 'https://apm.invalid').pathname)
    .split('/')
    .map((segment) => (/\d/.test(segment) ? ':id' : segment))
    .join('/');
}

export function rapporterFeil(
  feil: unknown,
  kontekst?: { feilkode?: string; statuskode?: number; url?: string },
): void {
  if (typeof window === 'undefined') return;
  if (typeof feil === 'object' && feil !== null) {
    if (rapporterteFeil.has(feil)) return;
    rapporterteFeil.add(feil);
  }
  // Dynamisk import: SDK-et er ESM-only og skal ikke lastes på server eller i enhetstester.
  void import('@nais/apm').then(({ captureException }) =>
    captureException(feil, {
      context: {
        feilkode: kontekst?.feilkode,
        statuskode: kontekst?.statuskode,
        url: kontekst?.url ? skjermApmUrl(kontekst.url) : undefined,
      },
      fingerprint:
        kontekst?.statuskode && kontekst.url
          ? `${kontekst.statuskode} ${lagEndepunktNøkkel(kontekst.url)}`
          : undefined,
    }),
  );
}

export const skjermApmHendelse: NonNullable<InitOptions['beforeSend']> = (
  hendelse,
) => {
  if (
    hendelse.type === 'exception' &&
    'value' in hendelse.payload &&
    hendelse.payload.value.startsWith(SYNTETISK_LOGGERFEIL_PREFIX)
  ) {
    return null;
  }
  if (hendelse.type === 'exception' && 'context' in hendelse.payload) {
    // Loggmeldinger kan inneholde treff- og person-ID-er; de finnes uansett i Loki.
    delete hendelse.payload.context?.console_message;
  }
  skjermUrlVerdier(hendelse.meta);
  skjermUrlVerdier(hendelse.payload);
  return hendelse;
};
