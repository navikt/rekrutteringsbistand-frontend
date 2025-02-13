'use client';
/**
 * Endepunkt /minebrukere
 */
import useSWRImmutable from 'swr/immutable';
import { KandidatSøkPortefølje } from '../../kandidat-sok/components/PorteføljeTabs';
import { IKandidatSøkContext } from '../../kandidat-sok/KandidaSokContext';
import { konverterStederTilNåværendeKoder } from '../../kandidat/[kandidatId]/forslag-fane/useStillingForKandidat';
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchema } from '../fetcher';
import { usePamGeografi } from '../pam-geografi/usePamGeografi';
import { useGeografi } from '../stilling/geografi/useGeografi';
import { kandidatSøkMock } from './mocks/kandidatsøkMock';
import { kandidatSokSchema } from './types';

const kandidatSokEndepunkt = (type: KandidatSøkPortefølje | '*') =>
  `${KandidatSøkAPI.internUrl}/kandidatsok/${type}`;

export const useKandidatsøk = (
  type: KandidatSøkPortefølje,
  kandidatSøkFilter: IKandidatSøkContext,
) => {
  const { data: geografi, isLoading: isGeografiLoading } = useGeografi();
  const shouldFetch = !isGeografiLoading;
  const geografiHook = usePamGeografi();
  console.log('🎺 geografiHook', geografiHook);
  const kommuneKoder = kandidatSøkFilter.ønsketSted.map((sted) => {
    const kommuneMedKoder = geografi?.kommuner.find(
      (g) => g.name.toUpperCase() === sted.toUpperCase(),
    );
    if (kommuneMedKoder) {
      return `NO${kommuneMedKoder?.countyCode}.${kommuneMedKoder?.code}`;
    }
    return null;
  });

  const fylkeKoder = kandidatSøkFilter.ønsketSted.map((sted) => {
    const fylkeMedKoder = geografi?.fylker.find(
      (g) => g.name.toUpperCase() === sted.toUpperCase(),
    );
    if (fylkeMedKoder) {
      return `NO${fylkeMedKoder?.code}`;
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
          url: kandidatSokEndepunkt(type),
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
