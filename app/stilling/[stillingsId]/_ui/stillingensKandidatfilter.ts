import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

/** Sted og yrke fra stillingen som filtre i «Finn jobbsøkere», som query-streng. Tom når stillingen mangler begge. */
export const stillingensKandidatfilter = (stillingsData: StillingsDataDTO) => {
  const { locationList, categoryList } = stillingsData.stilling ?? {};

  const fylker =
    locationList
      ?.filter((location) => location.county)
      .map((location) => `${location.county} (Fylke)`) ?? [];
  const kommuner =
    locationList
      ?.filter((location) => location.municipal)
      .map((location) => `${location.municipal} (Kommune)`) ?? [];
  const sted = [...fylker, ...kommuner];
  const yrke =
    categoryList
      ?.filter((category) => category.categoryType === 'JANZZ')
      .map((category) => category.name)
      .filter((name): name is string => !!name) ?? [];

  const parametere = new URLSearchParams();
  if (sted.length > 0) parametere.set('sted', sted.join(','));
  if (yrke.length > 0) parametere.set('yrke', yrke.join(','));
  return parametere.toString();
};
