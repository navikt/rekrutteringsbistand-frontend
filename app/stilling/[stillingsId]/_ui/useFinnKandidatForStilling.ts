import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';

export const useFinnKandidatForStilling = (
  stillingsData?: StillingsDataDTO | null,
) => {
  const kandidatSøkFilter = useKandidatSøkFilterContext();
  const hasSetInitialData = useRef(false);
  const isDataLoading = !stillingsData;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const processedData = useMemo(() => {
    if (!stillingsData || !stillingsData.stilling) return null;

    const locationList = stillingsData.stilling.locationList;
    const categoryList = stillingsData.stilling.categoryList;

    const fylker: string[] =
      locationList
        ?.filter((location) => location.county && location.county !== null)
        ?.map((location) => `${location.county} (Fylke)`) ?? [];

    const kommuner: string[] =
      locationList
        ?.filter(
          (location) => location.municipal && location.municipal !== null,
        )
        ?.map((location) => `${location.municipal} (Kommune)`) ?? [];

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
    if (!processedData || hasSetInitialData.current) return;

    const { fylker, kommuner, arbeidsønsker } = processedData;
    const stedListe = [...fylker, ...kommuner];
    if (stedListe.length === 0 && arbeidsønsker.length === 0) {
      hasSetInitialData.current = true;
      return;
    }

    const currentParams = new URLSearchParams(searchParams?.toString());
    const alreadyHasSted = currentParams.has('sted');
    const alreadyHasYrke = currentParams.has('yrke');

    if (!alreadyHasSted && stedListe.length > 0) {
      currentParams.set('sted', stedListe.join(','));
    }
    if (!alreadyHasYrke && arbeidsønsker.length > 0) {
      currentParams.set('yrke', arbeidsønsker.join(','));
    }

    const nextSearch = currentParams.toString();
    const nowSearch = searchParams?.toString() || '';
    if (nextSearch !== nowSearch) {
      // Én samlet replace for å unngå race mellom flere settere
      router.replace(`${pathname}?${nextSearch}`, { scroll: false });
    }
    hasSetInitialData.current = true;
  }, [processedData, searchParams, router, pathname]);

  const isLoading =
    isDataLoading ||
    (!hasSetInitialData.current && stillingsData !== undefined);

  return {
    kandidatSøkFilter,
    isLoading,
  };
};
