'use client';

/**
 * Endepunkt /minebrukere
 */
import {
  IKandidaSokFilterContext,
  KandidatSøkPortefølje,
} from '../../kandidat/KandidaSokFilterContext';
import { konverterStederTilNåværendeKoder } from '../../kandidat/[kandidatId]/forslag-til-stilling/useStillingForKandidat';
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchema } from '../fetcher';
import { usePamGeografi } from '../pam-geografi/typehead/lokasjoner/usePamGeografi';
import { kandidatSøkMock } from './mocks/kandidatsøkMock';
import { KandidatDataSchema } from './schema/cvSchema.zod';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

export const navigeringSchema = z.object({
  kandidatnumre: z.array(z.string()),
});

export const kandidatSokSchema = z.object({
  kandidater: z.array(KandidatDataSchema),
  navigering: navigeringSchema,
  antallTotalt: z.number(),
});

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

  const kommuneKoder = kandidatSøkFilter.ønsketSted.map((sted) => {
    const kommuneMedKoder = geografi?.find(
      (g) => g.lokasjon.kommune?.toUpperCase() === sted.toUpperCase(),
    );
    if (kommuneMedKoder) {
      return `NO${kommuneMedKoder?.lokasjon.fylkesnummer}.${kommuneMedKoder?.lokasjon.kommunenummer}`;
    }
    return null;
  });

  const fylkeKoder = kandidatSøkFilter.ønsketSted.map((sted) => {
    const fylkeMedKoder = geografi?.find(
      (g) => g.lokasjon.fylke?.toUpperCase() === sted.toUpperCase(),
    );
    if (fylkeMedKoder) {
      return `NO${fylkeMedKoder?.lokasjon.fylkesnummer}`;
    }
    return null;
  });

  const ønsketSted = konverterStederTilNåværendeKoder([
    ...fylkeKoder,
    ...kommuneKoder,
  ]);

  const mapFilterTilpayload = {
    orgenhet: kandidatSøkFilter.orgenhet,
    fritekst: kandidatSøkFilter.fritekst,
    portefølje: kandidatSøkFilter.portefølje,
    valgtKontor: kandidatSøkFilter.valgtKontor,
    innsatsgruppe: kandidatSøkFilter.innsatsgruppe,
    side: kandidatSøkFilter.side,
    ønsketYrke: kandidatSøkFilter.ønsketYrke,
    ønsketSted: ønsketSted,
    borPåØnsketSted: kandidatSøkFilter.borPåØnsketSted,
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
  return server.post(kandidatSokEndepunkt('*'), () => kandidatSøkMock);
};
