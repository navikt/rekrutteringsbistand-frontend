'use client';

import {
  mapToKandidatSokKandidat,
  mockKandidatDataList,
} from '../../../mocks/kandidat.mock';
import {
  IKandidaSokFilterContext,
  KandidatSøkPortefølje,
} from '../../kandidat/KandidaSokFilterContext';
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchema } from '../fetcher';
import { usePamGeografi } from '../pam-geografi/typehead/lokasjoner/usePamGeografi';
/**
 * Endepunkt /minebrukere
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

export const navigeringSchema = z.object({
  kandidatnumre: z.array(z.string()),
});

export const KandidatSøkKandidatSchema = z.object({
  yrkeJobbonskerObj: z.array(
    z.object({
      styrkBeskrivelse: z.string().optional(),
      sokeTitler: z.array(z.string()).optional(),
      primaertJobbonske: z.boolean().optional(),
      styrkKode: z.string().optional(),
    }),
  ),
  etternavn: z.string(),
  postnummer: z.string(),
  arenaKandidatnr: z.string(),
  kommuneNavn: z.string(),
  geografiJobbonsker: z.array(
    z.object({ geografiKodeTekst: z.string(), geografiKode: z.string() }),
  ),
  innsatsgruppe: z.string(),
  fornavn: z.string(),
  fodselsnummer: z.string(),
  poststed: z.string(),
});

export const kandidatSokSchema = z.object({
  kandidater: z.array(KandidatSøkKandidatSchema),
  navigering: navigeringSchema,
  antallTotalt: z.number(),
});

export type KandidatsokKandidat = z.infer<typeof KandidatSøkKandidatSchema>;

const kandidatSokEndepunkt = (
  type: KandidatSøkPortefølje | '*',
  side: number = 1,
  sortering: string = 'nyeste',
) =>
  `${KandidatSøkAPI.internUrl}/kandidatsok/${type}?side=${side}&sortering=${sortering}`;

export const useKandidatsøk = (
  type: KandidatSøkPortefølje,
  kandidatSøkFilter: IKandidaSokFilterContext,
) => {
  const { data: geografi, isLoading: isGeografiLoading } = usePamGeografi();
  const shouldFetch = !isGeografiLoading;

  const stedKoder = kandidatSøkFilter.ønsketSted.map((sted) => {
    if (sted.includes('(Kommune)')) {
      const kommuneSted = sted.split('(Kommune)')[0].trim();
      const kommunekode = geografi?.find(
        (g) => g.lokasjon.kommune?.toUpperCase() === kommuneSted.toUpperCase(),
      );

      if (kommunekode) {
        return `${kommuneSted}.NO${kommunekode?.lokasjon.fylkesnummer}.${kommunekode?.lokasjon.kommunenummer}`;
      }
    }
    if (sted.includes('(Fylke)')) {
      const fylkeSted = sted.split('(Fylke)')[0].trim();
      const fylkeMedKoder = geografi?.find(
        (g) => g.lokasjon.fylke?.toUpperCase() === fylkeSted.toUpperCase(),
      );

      if (fylkeMedKoder) {
        return `${fylkeSted}.NO${fylkeMedKoder?.lokasjon.fylkesnummer}`;
      }
    }

    return null;
  });

  const mapFilterTilpayload = {
    orgenhet: kandidatSøkFilter.orgenhet,
    fritekst: kandidatSøkFilter.fritekst,
    portefølje: kandidatSøkFilter.portefølje,
    valgtKontor: kandidatSøkFilter.valgtKontor,
    innsatsgruppe: kandidatSøkFilter.innsatsgruppe,
    side: kandidatSøkFilter.side,
    ønsketYrke: kandidatSøkFilter.ønsketYrke,
    ønsketSted: stedKoder.filter((sted) => sted !== null) ?? [],
    borPåØnsketSted: kandidatSøkFilter.borPåØnsketSted === 'ja',
    kompetanse: kandidatSøkFilter.kompetanse,
    førerkort: kandidatSøkFilter.førerkort,
    prioritertMålgruppe: kandidatSøkFilter.prioritertMålgruppe,
    hovedmål: kandidatSøkFilter.hovedmål,
    utdanningsnivå: kandidatSøkFilter.utdanningsnivå,
    arbeidserfaring: kandidatSøkFilter.arbeidserfaring,
    ferskhet: kandidatSøkFilter.ferskhet,
    språk: kandidatSøkFilter.språk,
    sortering: kandidatSøkFilter.sortering,
  };

  return useSWRImmutable(
    shouldFetch
      ? {
          url: kandidatSokEndepunkt(
            type,
            kandidatSøkFilter.side,
            kandidatSøkFilter.sortering,
          ),
          body: mapFilterTilpayload,
        }
      : null,
    (data) => {
      return postApiWithSchema(kandidatSokSchema)(data);
    },
  );
};

export const kandidatSokMirage = (server: any) => {
  return server.post(kandidatSokEndepunkt('*'), () => {
    const mappedKandidater = mockKandidatDataList
      .map(mapToKandidatSokKandidat)
      .filter((k): k is KandidatsokKandidat => k !== null);

    const antallTotalt = mappedKandidater.length;

    const kandidatnumreForNavigering = mappedKandidater
      .map((k) => k.arenaKandidatnr) // arenaKandidatnr is guaranteed here
      .filter(
        (arenaKandidatnr): arenaKandidatnr is string =>
          typeof arenaKandidatnr === 'string',
      ); // Filter still good practice

    return {
      kandidater: mappedKandidater, // Return the array of mapped (slimmer) candidate objects
      navigering: {
        kandidatnumre: kandidatnumreForNavigering,
      },
      antallTotalt: antallTotalt,
    };
  });
};
