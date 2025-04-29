import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useKandidatSøkFilterContext } from '../../../kandidat/KandidaSokFilterContext';
import { useEffect, useMemo, useRef } from 'react';

export const useFinnKandidatForStilling = (
  stillingsData?: StillingsDataDTO,
) => {
  const kandidatSøkFilter = useKandidatSøkFilterContext();
  const hasSetInitialData = useRef(false);
  const isDataLoading = !stillingsData;

  const processedData = useMemo(() => {
    if (!stillingsData) return null;

    const { locationList, categoryList } = stillingsData.stilling;

    const fylker: string[] =
      locationList
        ?.map((location) => location.county)
        .filter((county): county is string => county !== null) ?? [];

    const kommuner: string[] =
      locationList
        ?.map((location) => location.municipal)
        .filter((municipal): municipal is string => municipal !== null) ?? [];

    const arbeidsønsker =
      categoryList
        ?.filter((category) => category.categoryType === 'JANZZ')
        .map((category) => category.name)
        .filter((name): name is string => name !== null) ?? [];

    return {
      fylker,
      kommuner,
      arbeidsønsker,
    };
  }, [stillingsData]);

  useEffect(() => {
    if (processedData && !hasSetInitialData.current) {
      const { fylker, kommuner, arbeidsønsker } = processedData;

      kandidatSøkFilter.setØnsketSted([...fylker, ...kommuner]);
      kandidatSøkFilter.setØnsketYrke(arbeidsønsker);

      hasSetInitialData.current = true;
    }
  }, [processedData, kandidatSøkFilter]);

  const isLoading =
    isDataLoading ||
    (!hasSetInitialData.current && stillingsData !== undefined);

  return {
    kandidatSøkFilter,
    isLoading,
  };
};
