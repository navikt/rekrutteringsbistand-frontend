import { putApi } from '@/app/api/fetcher';
import { mockBaseStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { Server } from 'miragejs';

export const oppdaterStillingEndepunkt = '/api/stilling/oppdater-stilling';

export interface StillingBrukerInfo {
  eierNavident?: string;
  eierNavn?: string;
  eierNavKontorEnhetId?: string;
}

export const oppdaterStilling = (
  stillingsData: StillingsDataDTO,
  brukerInfo: StillingBrukerInfo,
) => {
  // Sørg for at properties.workhours/workday/tags sendes som strenger (Map<String, String> i backend)
  const sanitizedProperties = (() => {
    const props = stillingsData.stilling?.properties as
      | Record<string, unknown>
      | null
      | undefined;
    if (!props) return props as undefined;

    const next: Record<string, string> = {};

    const coerceArrayOrValueToString = (value: unknown): string | undefined => {
      if (value === null || value === undefined) return undefined;
      if (Array.isArray(value)) return JSON.stringify(value);
      if (typeof value === 'string') return value;
      // Fallback: stringify other primitive/object types
      try {
        return JSON.stringify(value);
      } catch {
        return String(value);
      }
    };

    // Kopiér og gjør om alle nøkler/verdier (backend forventer Map<String, String>)
    Object.entries(props).forEach(([key, value]) => {
      const coerced = coerceArrayOrValueToString(value);
      if (coerced !== undefined) {
        next[key] = coerced;
      }
    });

    // Normaliser spesifikke nøkler som backend forventer som strenger (arrayer -> JSON-streng)
    const workhours = coerceArrayOrValueToString(props['workhours']);
    const workday = coerceArrayOrValueToString(props['workday']);
    const tags = coerceArrayOrValueToString(props['tags']);
    const searchtags = coerceArrayOrValueToString(props['searchtags']);

    if (workhours !== undefined) next['workhours'] = workhours;
    if (workday !== undefined) next['workday'] = workday;
    if (tags !== undefined) next['tags'] = tags;
    if (searchtags !== undefined) next['searchtags'] = searchtags;

    return next;
  })();

  return putApi(oppdaterStillingEndepunkt, {
    ...stillingsData,
    stillingsinfo: {
      ...stillingsData.stillingsinfo,
      eierNavident: brukerInfo.eierNavident ?? null,
      eierNavn: brukerInfo.eierNavn ?? null,
      eierNavKontorEnhetId: brukerInfo.eierNavKontorEnhetId ?? null,
    },
    stilling: {
      ...stillingsData.stilling,
      // Overstyr properties med normaliserte verdier hvis de finnes
      ...(sanitizedProperties ? { properties: sanitizedProperties } : {}),
      administration: {
        ...stillingsData.stilling.administration,
        navIdent: brukerInfo.eierNavident ?? null,
        reportee: brukerInfo.eierNavn ?? null,
      },
    },
  });
};

export const oppdaterStillingMirage = (server: Server) => {
  return server.put(oppdaterStillingEndepunkt, () => mockBaseStilling);
};
