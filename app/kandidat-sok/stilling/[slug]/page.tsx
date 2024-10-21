'use client';
import { useParams } from 'next/navigation';
import React from 'react';
import { useGeografi } from '../../../api/stilling/geografi/useGeografi';
import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStilling } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import {
  formaterStedsnavn,
  stedmappingFraGammeltNavn,
  stedmappingFraGammeltNummer,
} from '../../../api/stillings-sok/esFiltre/fylkeOgKommuneMapping';
import Loading from '../../../laoading';
import { FylkeDTO } from '../../../stillings-sok/components/StillingsSøkFilter/GeografiFilter';
import { useKandidatSøkFilter } from '../../KandidaSokContext';

const LISTEPARAMETER_SEPARATOR = ';';
const LISTEPARAMETER_SEPARATOR_REPLACEMENT = '·';

const hentØnsketStedFraStilling = (
  rekrutteringsbistandstilling: StillingsDataDTO,
  fylker: FylkeDTO[],
): string | null => {
  const { location } = rekrutteringsbistandstilling.stilling;

  if (location?.municipal && location?.municipalCode) {
    const nyttSted = stedmappingFraGammeltNummer.get(location.municipalCode);

    return nyttSted ? nyttSted.navn : formaterStedsnavn(location.municipal);
  } else if (location?.county) {
    const nåværendeCounty =
      stedmappingFraGammeltNavn
        .get(formaterStedsnavn(location.county))
        ?.navn?.toUpperCase() || location.county;

    const fylke = fylker?.find((f) => f.name.toUpperCase() === nåværendeCounty);

    return fylke?.capitalizedName || null;
  } else {
    return null;
  }
};

const hentØnsketYrkeFraStilling = (
  rekrutteringsbistandstilling: StillingsDataDTO,
): string[] => {
  const { categoryList } = rekrutteringsbistandstilling.stilling;

  if (!categoryList) {
    return [];
  }

  return categoryList
    .filter(
      (category) =>
        category.categoryType === 'STYRK08' ||
        category.categoryType === 'STYRK08NAV',
    )
    .map((category) => category.name)
    .filter((name): name is string => name !== null);
};

export default function KandidatSokStilling() {
  const params = useParams();
  const stillingsId = params.slug;

  const filter = useKandidatSøkFilter();

  if (typeof stillingsId !== 'string') {
    throw new Error('Stillings-ID må være en streng');
  }
  const stillingsData = useStilling(stillingsId);
  const geografi = useGeografi();

  React.useEffect(() => {
    if (stillingsData.data && geografi.data) {
      console.log('🎺 tillingsData.data', stillingsData.data);
      //   const ønsketYrke = hentØnsketYrkeFraStilling(stillingsData.data);
      const ønsketSted = hentØnsketStedFraStilling(
        stillingsData.data,
        geografi.data.fylker,
      );

      console.log('🎺 ønsketSted', ønsketSted);
      //   if (ønsketYrke && ønsketYrke !== filter.ønsketYrke) {
      //     filter.setØnsketYrke(ønsketYrke);
      //   }

      //   console.log('🎺 ønsketYrke', ønsketYrke);
      //   console.log('🎺  geografi.data.fylker,', geografi.data.fylker);

      //   ønsketSted && filter.setØnsketSted(ønsketSted);
    }
  }, [stillingsData.data, geografi.data, filter.ønsketYrke]);

  return <Loading />;
}
