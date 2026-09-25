'use client';

import { postApiWithSchema } from '@/app/api/fetcher';
import {
  byggKandidatsøkPayload,
  kandidatSokEndepunkt,
  kandidatSokSchema,
  KandidatsokKandidat,
  useStedKoderForKandidatsøk,
} from '@/app/api/kandidat-sok/useKandidatsøk';
import {
  IKandidaSokFilterContext,
  KandidatSøkPortefølje,
} from '@/app/kandidat/KandidaSokFilterContext';

export const KANDIDATSØK_SIDESTØRRELSE = 25;
const SAMTIDIGE_FORESPØRSLER = 5;

export interface HentMangeKandidaterResultat {
  kandidater: KandidatsokKandidat[];
  antallTotalt: number;
}

/**
 * Henter mange sider med kandidatsøk-resultater samtidig (i batcher) for å kunne
 * markere store batcher av jobbsøkere på én gang, uten å måtte bla side for side.
 */
export const useHentMangeKandidater = (
  type: KandidatSøkPortefølje,
  kandidatSøkFilter: IKandidaSokFilterContext,
) => {
  const { stedKoder, isGeografiLoading } =
    useStedKoderForKandidatsøk(kandidatSøkFilter);

  const hentMange = async (
    ønsketAntall: number,
  ): Promise<HentMangeKandidaterResultat> => {
    if (isGeografiLoading) {
      throw new Error('Geografidata er ikke klar ennå');
    }

    const hentSide = (side: number) =>
      postApiWithSchema(kandidatSokSchema)({
        url: kandidatSokEndepunkt(type, side, kandidatSøkFilter.sortering),
        body: byggKandidatsøkPayload(kandidatSøkFilter, stedKoder, side),
      });

    const førsteSide = await hentSide(1);
    const antallTotalt = førsteSide.antallTotalt;
    const antallSomSkalHentes = Math.min(ønsketAntall, antallTotalt);
    const antallSider = Math.ceil(
      antallSomSkalHentes / KANDIDATSØK_SIDESTØRRELSE,
    );

    const kandidaterPerId = new Map<string, KandidatsokKandidat>();
    for (const kandidat of førsteSide.kandidater) {
      kandidaterPerId.set(kandidat.arenaKandidatnr, kandidat);
    }

    const gjenværendeSider = Array.from(
      { length: Math.max(0, antallSider - 1) },
      (_, i) => i + 2,
    );

    for (let i = 0; i < gjenværendeSider.length; i += SAMTIDIGE_FORESPØRSLER) {
      const batch = gjenværendeSider.slice(i, i + SAMTIDIGE_FORESPØRSLER);
      const resultater = await Promise.all(batch.map(hentSide));
      for (const resultat of resultater) {
        for (const kandidat of resultat.kandidater) {
          kandidaterPerId.set(kandidat.arenaKandidatnr, kandidat);
        }
      }
    }

    return {
      kandidater: [...kandidaterPerId.values()].slice(0, ønsketAntall),
      antallTotalt,
    };
  };

  return { hentMange };
};
