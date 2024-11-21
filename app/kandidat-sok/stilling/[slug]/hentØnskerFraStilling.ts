import { useEffect, useMemo, useRef } from 'react';
import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useKandidatSøkFilter } from '../../KandidaSokContext';

export const hentØnskerFraStilling = (stillingsData?: StillingsDataDTO) => {
  const kandidatSøkFilter = useKandidatSøkFilter();

  const hasSetInitialData = useRef(false);

  const processedData = useMemo(() => {
    if (!stillingsData) return null;

    const { locationList, categoryList } = stillingsData.stilling;

    const fylker: string[] =
      locationList
        ?.map((location) => location.county)
        .filter((county) => county !== null) ?? [];

    const kommuner: string[] =
      locationList
        ?.map((location) => location.municipal)
        .filter((municipal) => municipal !== null) ?? [];

    const arbeidsønsker = categoryList
      ?.filter(
        (category) =>
          category.categoryType === 'STYRK08' ||
          category.categoryType === 'STYRK08NAV',
      )
      .map((category) => category.name)
      .filter((name): name is string => name !== null);

    return {
      fylker: fylker,
      kommuner: kommuner,
      arbeidsønsker: arbeidsønsker ?? [],
    };
  }, [stillingsData]);

  useEffect(() => {
    if (processedData && !hasSetInitialData.current) {
      const { fylker, kommuner, arbeidsønsker } = processedData;

      kandidatSøkFilter.setØnsketSted([...fylker, ...kommuner]);
      kandidatSøkFilter.setØnsketYrke([...arbeidsønsker]);

      hasSetInitialData.current = true;
    }
  }, [processedData, kandidatSøkFilter]);

  return {
    kandidatSøkFilter,
    isLoading: !hasSetInitialData.current && !stillingsData,
  };
};
